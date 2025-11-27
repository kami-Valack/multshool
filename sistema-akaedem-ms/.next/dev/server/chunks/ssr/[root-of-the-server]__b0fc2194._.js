module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/components/theme-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/components/theme-provider.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
}),
"[project]/src/lib/api/config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Configuração das APIs
 */ __turbopack_context__.s([
    "API_CONFIG",
    ()=>API_CONFIG,
    "API_ENDPOINTS",
    ()=>API_ENDPOINTS
]);
const API_CONFIG = {
    // URLs das APIs (podem ser configuradas via variáveis de ambiente)
    USERS_API_URL: ("TURBOPACK compile-time value", "http://localhost:8000/api") || 'http://localhost:8001/api',
    SCHOOL_API_URL: ("TURBOPACK compile-time value", "http://localhost:8003/api") || 'http://localhost:8002/api',
    STUDENT_API_URL: ("TURBOPACK compile-time value", "http://localhost:8001/api") || 'http://localhost:8003/api',
    ADMIN_API_URL: process.env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:8004/api',
    // API Secret para comunicação entre serviços
    API_SECRET: process.env.NEXT_PUBLIC_API_SECRET || '',
    // Timeout padrão para requisições (em ms)
    TIMEOUT: 30000
};
const API_ENDPOINTS = {
    // Autenticação
    AUTH: {
        LOGIN: '/auth/login',
        REGISTER: '/auth/register',
        LOGOUT: '/auth/logout',
        REFRESH_TOKEN: '/auth/refresh-token',
        ME: '/auth/me',
        VERIFY_EMAIL: '/auth/verify-email',
        FORGOT_PASSWORD: '/auth/password-reset/request',
        RESET_PASSWORD: '/auth/password-reset/reset'
    },
    // Escolas/Instituições
    SCHOOLS: {
        LIST: '/admin/schools',
        SHOW: (id)=>`/admin/schools/${id}`,
        COURSES: (id)=>`/admin/schools/${id}/courses`,
        APPROVE: (id)=>`/admin/schools/${id}/approve`,
        REJECT: (id)=>`/admin/schools/${id}/reject`
    },
    // Cursos
    COURSES: {
        LIST: '/courses',
        SHOW: (id)=>`/courses/${id}`,
        SUBJECTS: (id)=>`/courses/${id}/subjects`,
        ADMISSION_EXAMS: (id)=>`/courses/${id}/admission-exams`,
        EXAM_REGISTRATIONS: (courseId, examId)=>`/courses/${courseId}/admission-exams/${examId}/registrations`
    },
    // Matrículas
    ENROLLMENTS: {
        LIST: (courseId)=>`/courses/${courseId}/enrollments`,
        UPDATE: (id)=>`/enrollments/${id}`,
        APPROVE: (id)=>`/enrollments/${id}/approve`,
        REJECT: (id)=>`/enrollments/${id}/reject`
    },
    // Inscrições em Exames
    EXAM_REGISTRATIONS: {
        APPROVE: (id)=>`/exam-registrations/${id}/approve`,
        REJECT: (id)=>`/exam-registrations/${id}/reject`
    },
    // Docentes
    TEACHERS: {
        LIST: '/teachers',
        LINK_STUDENT: (teacherId, studentId)=>`/teachers/${teacherId}/students/${studentId}`,
        STUDENTS: (teacherId)=>`/teachers/${teacherId}/students`,
        UNLINK_STUDENT: (teacherId, studentId)=>`/teachers/${teacherId}/students/${studentId}`
    },
    // Atribuições de Professores a Turmas
    TEACHER_ASSIGNMENTS: {
        LIST: '/teacher-assignments',
        SHOW: (id)=>`/teacher-assignments/${id}`,
        CREATE: '/teacher-assignments',
        BULK_CREATE: '/teacher-assignments/bulk',
        UPDATE: (id)=>`/teacher-assignments/${id}`,
        DELETE: (id)=>`/teacher-assignments/${id}`
    },
    // Turmas (Classes)
    CLASSES: {
        LIST: '/classes',
        SHOW: (id)=>`/classes/${id}`,
        CREATE: '/classes',
        UPDATE: (id)=>`/classes/${id}`,
        DELETE: (id)=>`/classes/${id}`
    },
    // Estudantes
    STUDENTS: {
        TEACHERS: (studentId)=>`/students/${studentId}/teachers`
    },
    // Perfil
    PROFILE: {
        ME: '/me',
        UPDATE: '/profile',
        CHECK_COMPLETION: '/profile/check-completion',
        UPLOAD_LOGO: '/profile/upload-logo',
        UPLOAD_PHOTOS: '/profile/upload-photos',
        UPLOAD_VIDEO: '/profile/upload-video'
    }
};
}),
"[project]/src/lib/api/client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "adminApiClient",
    ()=>adminApiClient,
    "apiClient",
    ()=>apiClient,
    "schoolApiClient",
    ()=>schoolApiClient,
    "studentApiClient",
    ()=>studentApiClient,
    "usersApiClient",
    ()=>usersApiClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/config.ts [app-ssr] (ecmascript)");
;
class ApiClient {
    baseURL;
    timeout;
    defaultHeaders;
    constructor(baseURL, timeout = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].TIMEOUT){
        this.baseURL = baseURL;
        this.timeout = timeout;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
    }
    /**
   * Obtém o token de autenticação do localStorage
   */ getAuthToken() {
        if ("TURBOPACK compile-time truthy", 1) return null;
        //TURBOPACK unreachable
        ;
    }
    /**
   * Obtém o refresh token do localStorage
   */ getRefreshToken() {
        if ("TURBOPACK compile-time truthy", 1) return null;
        //TURBOPACK unreachable
        ;
    }
    /**
   * Configura os headers da requisição
   */ getHeaders(customHeaders, useAuth = true) {
        const headers = {
            ...this.defaultHeaders,
            ...customHeaders
        };
        if (useAuth) {
            const token = this.getAuthToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }
        return headers;
    }
    /**
   * Adiciona API Secret aos headers (para comunicação entre serviços)
   */ getHeadersWithSecret(customHeaders) {
        const headers = this.getHeaders(customHeaders, false);
        if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].API_SECRET) {
            headers['X-API-Secret'] = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].API_SECRET;
        }
        return headers;
    }
    /**
   * Faz uma requisição HTTP
   */ async request(endpoint, options = {}, useAuth = true, useApiSecret = false) {
        const url = `${this.baseURL}${endpoint}`;
        const headers = useApiSecret ? this.getHeadersWithSecret(options.headers) : this.getHeaders(options.headers, useAuth);
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), this.timeout);
        try {
            const response = await fetch(url, {
                ...options,
                headers,
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            // Se não autorizado, tenta fazer refresh do token
            // IMPORTANTE: Não tenta refresh se não houver refresh token ou se for uma rota de login
            const isLoginRoute = endpoint.includes('/auth/login') || endpoint.includes('/auth/register');
            if (response.status === 401 && useAuth && !isLoginRoute && this.getRefreshToken()) {
                const refreshed = await this.refreshAuthToken();
                if (refreshed) {
                    // Tenta novamente com o novo token
                    const retryHeaders = useApiSecret ? this.getHeadersWithSecret(options.headers) : this.getHeaders(options.headers, true);
                    const retryResponse = await fetch(url, {
                        ...options,
                        headers: retryHeaders,
                        signal: controller.signal
                    });
                    if (!retryResponse.ok) {
                        throw await this.handleError(retryResponse);
                    }
                    const data = await retryResponse.json();
                    return {
                        status: 'success',
                        data
                    };
                }
            }
            if (!response.ok) {
                throw await this.handleError(response);
            }
            const data = await response.json();
            return {
                status: 'success',
                data
            };
        } catch (error) {
            clearTimeout(timeoutId);
            if (error.name === 'AbortError') {
                throw {
                    message: 'Tempo de requisição excedido',
                    status: 408
                };
            }
            if (error.status) {
                throw error;
            }
            throw {
                message: error.message || 'Erro ao fazer requisição',
                status: 500
            };
        }
    }
    /**
   * Trata erros da API
   */ async handleError(response) {
        let message = 'Erro ao processar requisição';
        let errors;
        try {
            const data = await response.json();
            message = data.message || data.error || message;
            errors = data.errors;
        } catch  {
            message = response.statusText || message;
        }
        return {
            message,
            status: response.status,
            errors
        };
    }
    /**
   * Atualiza o token de autenticação
   */ async refreshAuthToken() {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) return false;
        try {
            const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].USERS_API_URL}/auth/refresh-token`, {
                method: 'POST',
                headers: this.defaultHeaders,
                body: JSON.stringify({
                    refreshToken: refreshToken
                })
            });
            if (!response.ok) {
                // Se o refresh falhar, limpa os tokens
                this.clearAuth();
                return false;
            }
            const data = await response.json();
            if (data.status === 'success' && data.accessToken) {
                localStorage.setItem('auth_token', data.accessToken);
                if (data.refreshToken) {
                    localStorage.setItem('refresh_token', data.refreshToken);
                }
                return true;
            }
            return false;
        } catch  {
            this.clearAuth();
            return false;
        }
    }
    /**
   * Limpa os tokens de autenticação
   */ clearAuth() {
        if ("TURBOPACK compile-time truthy", 1) return;
        //TURBOPACK unreachable
        ;
    }
    /**
   * GET request
   */ async get(endpoint, useAuth = true, useApiSecret = false) {
        return this.request(endpoint, {
            method: 'GET'
        }, useAuth, useApiSecret);
    }
    /**
   * POST request
   */ async post(endpoint, data, useAuth = true, useApiSecret = false) {
        return this.request(endpoint, {
            method: 'POST',
            body: data ? JSON.stringify(data) : undefined
        }, useAuth, useApiSecret);
    }
    /**
   * PUT request
   */ async put(endpoint, data, useAuth = true) {
        return this.request(endpoint, {
            method: 'PUT',
            body: data ? JSON.stringify(data) : undefined
        }, useAuth);
    }
    /**
   * PATCH request
   */ async patch(endpoint, data, useAuth = true) {
        return this.request(endpoint, {
            method: 'PATCH',
            body: data ? JSON.stringify(data) : undefined
        }, useAuth);
    }
    /**
   * DELETE request
   */ async delete(endpoint, useAuth = true) {
        return this.request(endpoint, {
            method: 'DELETE'
        }, useAuth);
    }
    /**
   * Upload de arquivo
   */ async upload(endpoint, file, fieldName = 'file', additionalData, useAuth = true) {
        const formData = new FormData();
        formData.append(fieldName, file);
        if (additionalData) {
            Object.entries(additionalData).forEach(([key, value])=>{
                if (value !== undefined && value !== null) {
                    formData.append(key, typeof value === 'string' ? value : JSON.stringify(value));
                }
            });
        }
        const headers = {};
        if (useAuth) {
            const token = this.getAuthToken();
            if (token) {
                headers['Authorization'] = `Bearer ${token}`;
            }
        }
        try {
            const response = await fetch(`${this.baseURL}${endpoint}`, {
                method: 'POST',
                headers,
                body: formData
            });
            if (!response.ok) {
                throw await this.handleError(response);
            }
            const data = await response.json();
            return {
                status: 'success',
                data
            };
        } catch (error) {
            if (error.status) {
                throw error;
            }
            throw {
                message: error.message || 'Erro ao fazer upload',
                status: 500
            };
        }
    }
}
const usersApiClient = new ApiClient(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].USERS_API_URL);
const schoolApiClient = new ApiClient(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].SCHOOL_API_URL);
const studentApiClient = new ApiClient(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].STUDENT_API_URL);
const adminApiClient = new ApiClient(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].ADMIN_API_URL);
const apiClient = schoolApiClient;
}),
"[project]/src/lib/api/services/auth.service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authService",
    ()=>authService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/config.ts [app-ssr] (ecmascript)");
;
;
class AuthService {
    /**
   * Faz login
   */ async login(credentials) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usersApiClient"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].AUTH.LOGIN, credentials, false // Não usa auth para login
        );
        // A API retorna { status: 'success', accessToken, refreshToken, ... }
        // O client.ts já envolve em { status: 'success', data: {...} }
        if (response.status === 'success' && response.data) {
            const authData = response.data;
            // Salva tokens no localStorage
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return {
                accessToken: authData.accessToken,
                refreshToken: authData.refreshToken,
                expiresIn: authData.expiresIn,
                user: authData.user
            };
        }
        throw new Error(response.message || 'Erro ao fazer login');
    }
    /**
   * Faz logout
   */ async logout() {
        const refreshToken = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        // Limpa tokens do localStorage
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    /**
   * Obtém dados do usuário autenticado
   */ async getMe() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usersApiClient"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].AUTH.ME);
        if (response.status === 'success' && response.data) {
            return response.data;
        }
        throw new Error(response.message || 'Erro ao obter dados do usuário');
    }
    /**
   * Verifica se o usuário está autenticado
   */ isAuthenticated() {
        if ("TURBOPACK compile-time truthy", 1) return false;
        //TURBOPACK unreachable
        ;
    }
    /**
   * Obtém o token de autenticação
   */ getToken() {
        if ("TURBOPACK compile-time truthy", 1) return null;
        //TURBOPACK unreachable
        ;
    }
}
const authService = new AuthService();
}),
"[project]/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/services/auth.service.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    /**
   * Verifica autenticação ao carregar
   */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        checkAuth();
    }, []);
    const checkAuth = async ()=>{
        try {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].isAuthenticated()) {
                const userData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].getMe();
                setUser(userData);
            }
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
            // Limpa tokens inválidos
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        } finally{
            setLoading(false);
        }
    };
    const login = async (credentials)=>{
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].login(credentials);
            const userData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].getMe();
            setUser(userData);
        } catch (error) {
            throw error;
        }
    };
    const logout = async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].logout();
        } catch (error) {
            console.error('Erro ao fazer logout:', error);
        } finally{
            setUser(null);
        }
    };
    const refreshUser = async ()=>{
        try {
            const userData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].getMe();
            setUser(userData);
        } catch (error) {
            console.error('Erro ao atualizar dados do usuário:', error);
            throw error;
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            loading,
            isAuthenticated: !!user,
            login,
            logout,
            refreshUser
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AuthContext.tsx",
        lineNumber: 77,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth deve ser usado dentro de um AuthProvider');
    }
    return context;
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
"[project]/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>J,
    "useTheme",
    ()=>z
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
var M = (e, i, s, u, m, a, l, h)=>{
    let d = document.documentElement, w = [
        "light",
        "dark"
    ];
    function p(n) {
        (Array.isArray(e) ? e : [
            e
        ]).forEach((y)=>{
            let k = y === "class", S = k && a ? m.map((f)=>a[f] || f) : m;
            k ? (d.classList.remove(...S), d.classList.add(a && a[n] ? a[n] : n)) : d.setAttribute(y, n);
        }), R(n);
    }
    function R(n) {
        h && w.includes(n) && (d.style.colorScheme = n);
    }
    function c() {
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    if (u) p(u);
    else try {
        let n = localStorage.getItem(i) || s, y = l && n === "system" ? c() : n;
        p(y);
    } catch (n) {}
};
var b = [
    "light",
    "dark"
], I = "(prefers-color-scheme: dark)", O = ("TURBOPACK compile-time value", "undefined") == "undefined", x = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"](void 0), U = {
    setTheme: (e)=>{},
    themes: []
}, z = ()=>{
    var e;
    return (e = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](x)) != null ? e : U;
}, J = (e)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"](x) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], null, e.children) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](V, {
        ...e
    }), N = [
    "light",
    "dark"
], V = ({ forcedTheme: e, disableTransitionOnChange: i = !1, enableSystem: s = !0, enableColorScheme: u = !0, storageKey: m = "theme", themes: a = N, defaultTheme: l = s ? "system" : "light", attribute: h = "data-theme", value: d, children: w, nonce: p, scriptProps: R })=>{
    let [c, n] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>H(m, l)), [T, y] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"](()=>c === "system" ? E() : c), k = d ? Object.values(d) : a, S = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((o)=>{
        let r = o;
        if (!r) return;
        o === "system" && s && (r = E());
        let v = d ? d[r] : r, C = i ? W(p) : null, P = document.documentElement, L = (g)=>{
            g === "class" ? (P.classList.remove(...k), v && P.classList.add(v)) : g.startsWith("data-") && (v ? P.setAttribute(g, v) : P.removeAttribute(g));
        };
        if (Array.isArray(h) ? h.forEach(L) : L(h), u) {
            let g = b.includes(l) ? l : null, D = b.includes(r) ? r : g;
            P.style.colorScheme = D;
        }
        C == null || C();
    }, [
        p
    ]), f = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((o)=>{
        let r = typeof o == "function" ? o(c) : o;
        n(r);
        try {
            localStorage.setItem(m, r);
        } catch (v) {}
    }, [
        c
    ]), A = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"]((o)=>{
        let r = E(o);
        y(r), c === "system" && s && !e && S("system");
    }, [
        c,
        e
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        let o = window.matchMedia(I);
        return o.addListener(A), A(o), ()=>o.removeListener(A);
    }, [
        A
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        let o = (r)=>{
            r.key === m && (r.newValue ? n(r.newValue) : f(l));
        };
        return window.addEventListener("storage", o), ()=>window.removeEventListener("storage", o);
    }, [
        f
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"](()=>{
        S(e != null ? e : c);
    }, [
        e,
        c
    ]);
    let Q = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"](()=>({
            theme: c,
            setTheme: f,
            forcedTheme: e,
            resolvedTheme: c === "system" ? T : c,
            themes: s ? [
                ...a,
                "system"
            ] : a,
            systemTheme: s ? T : void 0
        }), [
        c,
        f,
        e,
        T,
        s,
        a
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](x.Provider, {
        value: Q
    }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"](_, {
        forcedTheme: e,
        storageKey: m,
        attribute: h,
        enableSystem: s,
        enableColorScheme: u,
        defaultTheme: l,
        value: d,
        themes: a,
        nonce: p,
        scriptProps: R
    }), w);
}, _ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["memo"](({ forcedTheme: e, storageKey: i, attribute: s, enableSystem: u, enableColorScheme: m, defaultTheme: a, value: l, themes: h, nonce: d, scriptProps: w })=>{
    let p = JSON.stringify([
        s,
        i,
        a,
        e,
        h,
        l,
        u,
        m
    ]).slice(1, -1);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createElement"]("script", {
        ...w,
        suppressHydrationWarning: !0,
        nonce: ("TURBOPACK compile-time truthy", 1) ? d : "TURBOPACK unreachable",
        dangerouslySetInnerHTML: {
            __html: `(${M.toString()})(${p})`
        }
    });
}), H = (e, i)=>{
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
    let s;
}, W = (e)=>{
    let i = document.createElement("style");
    return e && i.setAttribute("nonce", e), i.appendChild(document.createTextNode("*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}")), document.head.appendChild(i), ()=>{
        window.getComputedStyle(document.body), setTimeout(()=>{
            document.head.removeChild(i);
        }, 1);
    };
}, E = (e)=>(e || (e = window.matchMedia(I)), e.matches ? "dark" : "light");
;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__b0fc2194._.js.map