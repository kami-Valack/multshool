"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
  ReactNode,
} from "react";
import {
  authService,
  User,
  LoginCredentials,
  ProfileInfo,
} from "@/lib/api/services/auth.service";
import {
  profileService,
  ProfileCompletionStatus,
} from "@/lib/api/services/profile.service";

const USER_CACHE_KEY = "auth_user_cache";
const SCHOOL_CACHE_KEY = "auth_school_cache";

export type SchoolProfile = {
  name?: string;
  acronym?: string;
  logo_path?: string;
  [key: string]: any;
};

interface AuthContextType {
  user: User | null;
  schoolProfile: SchoolProfile | null;
  loading: boolean;
  isAuthenticated: boolean;
  profileComplete: boolean | null;
  profileStatus: ProfileCompletionStatus | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  checkProfileCompletion: (userToCheck?: User | null) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function readCache<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : null;
  } catch {
    return null;
  }
}

function writeCache(key: string, value: unknown) {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors
  }
}

function clearSessionCaches() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(USER_CACHE_KEY);
  localStorage.removeItem(SCHOOL_CACHE_KEY);
  localStorage.removeItem("user_role");
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [schoolProfile, setSchoolProfile] = useState<SchoolProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [profileComplete, setProfileComplete] = useState<boolean | null>(null);
  const [profileStatus, setProfileStatus] = useState<ProfileCompletionStatus | null>(
    null
  );
  const profileCheckInFlight = useRef(false);
  const hydrated = useRef(false);

  const persistUser = useCallback((next: User | null) => {
    setUser(next);
    if (next) {
      writeCache(USER_CACHE_KEY, next);
      if (typeof window !== "undefined" && next.role) {
        localStorage.setItem("user_role", next.role);
      }
    } else {
      if (typeof window !== "undefined") {
        localStorage.removeItem(USER_CACHE_KEY);
      }
    }
  }, []);

  const persistSchool = useCallback((next: SchoolProfile | null) => {
    setSchoolProfile(next);
    if (next) writeCache(SCHOOL_CACHE_KEY, next);
    else if (typeof window !== "undefined") localStorage.removeItem(SCHOOL_CACHE_KEY);
  }, []);

  const loadSchoolProfile = useCallback(async () => {
    try {
      const profile = await profileService.getProfile();
      if (profile) {
        persistSchool(profile);
        // Manter o nome da escola no user para sidebar/navbar
        setUser((prev) => {
          if (!prev) return prev;
          const merged: User = {
            ...prev,
            name: profile.name || prev.name,
            school: {
              ...(prev.school || {}),
              ...profile,
              name: profile.name || prev.school?.name,
              logo_path: profile.logo_path || prev.school?.logo_path,
            },
          };
          writeCache(USER_CACHE_KEY, merged);
          return merged;
        });
      }
    } catch (error) {
      console.warn("[AuthContext] Não foi possível carregar perfil da escola:", error);
    }
  }, [persistSchool]);

  const checkProfileCompletion = useCallback(
    async (userToCheck?: User | null) => {
      if (profileCheckInFlight.current) return;
      profileCheckInFlight.current = true;
      try {
        const userToVerify = userToCheck || user;

        if (userToVerify?.role !== "school") {
          setProfileComplete(true);
          return;
        }

        const status = await profileService.checkCompletion();
        setProfileStatus(status);
        setProfileComplete(status.is_complete);
      } catch (error: any) {
        if (
          error.error_code === "INCOMPLETE_PROFILE" ||
          (error.status === 403 && error.message?.includes("obrigatório preencher"))
        ) {
          setProfileComplete(false);
          if (error.missing_fields) {
            setProfileStatus({
              is_complete: false,
              missing_fields: error.missing_fields,
              completion_percentage: 0,
              message: error.message || "Perfil incompleto",
            });
          }
        } else {
          console.warn("[AuthContext] Erro ao verificar perfil:", error);
          setProfileComplete((prev) => (prev === null ? true : prev));
        }
      } finally {
        profileCheckInFlight.current = false;
      }
    },
    [user]
  );

  useEffect(() => {
    if (hydrated.current) return;
    hydrated.current = true;

    const cachedUser = readCache<User>(USER_CACHE_KEY);
    const cachedSchool = readCache<SchoolProfile>(SCHOOL_CACHE_KEY);
    if (cachedUser) setUser(cachedUser);
    if (cachedSchool) setSchoolProfile(cachedSchool);

    const boot = async () => {
      try {
        if (!authService.isAuthenticated()) {
          persistUser(null);
          persistSchool(null);
          setProfileComplete(null);
          setProfileStatus(null);
          return;
        }

        const userData = await authService.getMe();
        persistUser(userData);

        if (userData.role === "school") {
          await Promise.all([
            checkProfileCompletion(userData),
            loadSchoolProfile(),
          ]);
        } else {
          setProfileComplete(true);
        }
      } catch (error) {
        console.error("Erro ao verificar autenticação:", error);
        if (typeof window !== "undefined") {
          localStorage.removeItem("auth_token");
          localStorage.removeItem("refresh_token");
        }
        clearSessionCaches();
        persistUser(null);
        persistSchool(null);
      } finally {
        setLoading(false);
      }
    };

    void boot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const login = async (credentials: LoginCredentials) => {
    const response = await authService.login(credentials);

    const userData: User = {
      id: response.user.id,
      name: response.user.name,
      email: response.user.email,
      role: response.user.role,
      email_verified: response.user.email_verified || false,
      is_active: true,
    };

    persistUser(userData);

    if (userData.role === "school") {
      if (response.profile) {
        const profileInfo = response.profile as ProfileInfo;
        setProfileComplete(profileInfo.is_complete);
        setProfileStatus({
          is_complete: profileInfo.is_complete,
          missing_fields: profileInfo.missing_fields || [],
          completion_percentage: profileInfo.completion_percentage || 0,
          message: profileInfo.message || "Perfil incompleto",
        });
      } else {
        await checkProfileCompletion(userData);
      }
      await loadSchoolProfile();
    } else {
      setProfileComplete(true);
    }
  };

  const logout = async () => {
    try {
      await authService.logout();
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    } finally {
      persistUser(null);
      persistSchool(null);
      setProfileComplete(null);
      setProfileStatus(null);
      clearSessionCaches();
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    }
  };

  const refreshUser = async () => {
    const userData = await authService.getMe();
    persistUser(userData);
    if (userData.role === "school") {
      await Promise.all([checkProfileCompletion(userData), loadSchoolProfile()]);
    }
  };

  // Manter autenticação estável: não depender de `loading`, para o nome não desaparecer
  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        schoolProfile,
        loading,
        isAuthenticated,
        profileComplete,
        profileStatus,
        login,
        logout,
        refreshUser,
        checkProfileCompletion,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }
  return context;
}
