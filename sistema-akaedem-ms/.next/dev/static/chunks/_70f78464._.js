(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/components/theme-provider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)");
"use client";
;
;
;
function ThemeProvider(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(7);
    if ($[0] !== "53b782a6d583967dda0d6516c4bad14c45f7604819df3871250d423c09200d8b") {
        for(let $i = 0; $i < 7; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "53b782a6d583967dda0d6516c4bad14c45f7604819df3871250d423c09200d8b";
    }
    let children;
    let props;
    if ($[1] !== t0) {
        ({ children, ...props } = t0);
        $[1] = t0;
        $[2] = children;
        $[3] = props;
    } else {
        children = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== children || $[5] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThemeProvider"], {
            ...props,
            children: children
        }, void 0, false, {
            fileName: "[project]/src/components/theme-provider.tsx",
            lineNumber: 30,
            columnNumber: 10
        }, this);
        $[4] = children;
        $[5] = props;
        $[6] = t1;
    } else {
        t1 = $[6];
    }
    return t1;
}
_c = ThemeProvider;
var _c;
__turbopack_context__.k.register(_c, "ThemeProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api/config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/**
 * Configuração das APIs
 */ __turbopack_context__.s([
    "API_CONFIG",
    ()=>API_CONFIG,
    "API_ENDPOINTS",
    ()=>API_ENDPOINTS
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_CONFIG = {
    // URLs das APIs (podem ser configuradas via variáveis de ambiente)
    USERS_API_URL: ("TURBOPACK compile-time value", "http://localhost:8000/api") || 'http://localhost:8001/api',
    SCHOOL_API_URL: ("TURBOPACK compile-time value", "http://localhost:8003/api") || 'http://localhost:8002/api',
    STUDENT_API_URL: ("TURBOPACK compile-time value", "http://localhost:8001/api") || 'http://localhost:8003/api',
    ADMIN_API_URL: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_ADMIN_API_URL || 'http://localhost:8004/api',
    // API Secret para comunicação entre serviços
    API_SECRET: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_SECRET || '',
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
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api/client.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/config.ts [app-client] (ecmascript)");
;
class ApiClient {
    baseURL;
    timeout;
    defaultHeaders;
    constructor(baseURL, timeout = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].TIMEOUT){
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
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return localStorage.getItem('auth_token');
    }
    /**
   * Obtém o refresh token do localStorage
   */ getRefreshToken() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return localStorage.getItem('refresh_token');
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
        if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].API_SECRET) {
            headers['X-API-Secret'] = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].API_SECRET;
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
                const error = await this.handleError(response);
                // Se for erro de perfil incompleto (403) e estiver no browser, redirecionar
                // Mas apenas se for especificamente INCOMPLETE_PROFILE, não qualquer 403
                // E apenas se não estiver já na página de completar perfil
                // NOTA: Removemos o redirecionamento automático para permitir que os componentes tratem o erro
                // O ProtectedRoute já cuida do redirecionamento quando necessário
                if (error.status === 403 && error.error_code === 'INCOMPLETE_PROFILE' && ("TURBOPACK compile-time value", "object") !== 'undefined' && !window.location.pathname.includes('/completar-perfil') && !window.location.pathname.includes('/admin/completar-perfil')) {
                    // Log apenas, não redirecionar automaticamente
                    console.warn('[API Client] Perfil incompleto detectado, mas deixando o componente tratar o redirecionamento');
                }
                throw error;
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
        let errorCode;
        try {
            const data = await response.json();
            message = data.message || data.error || message;
            errors = data.errors;
            errorCode = data.error_code; // Capturar error_code para INCOMPLETE_PROFILE
            // Se for erro de perfil incompleto, incluir informações adicionais
            if (data.error_code === 'INCOMPLETE_PROFILE') {
                return {
                    message,
                    status: response.status,
                    errors,
                    error_code: errorCode,
                    missing_fields: data.missing_fields,
                    profile_completion_url: data.profile_completion_url
                };
            }
        } catch  {
            message = response.statusText || message;
        }
        return {
            message,
            status: response.status,
            errors,
            error_code: errorCode
        };
    }
    /**
   * Atualiza o token de autenticação
   */ async refreshAuthToken() {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) return false;
        try {
            const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].USERS_API_URL}/auth/refresh-token`, {
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
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        localStorage.removeItem('auth_token');
        localStorage.removeItem('refresh_token');
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
const usersApiClient = new ApiClient(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].USERS_API_URL);
const schoolApiClient = new ApiClient(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].SCHOOL_API_URL);
const studentApiClient = new ApiClient(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].STUDENT_API_URL);
const adminApiClient = new ApiClient(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].ADMIN_API_URL);
const apiClient = schoolApiClient;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api/services/auth.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authService",
    ()=>authService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/config.ts [app-client] (ecmascript)");
;
;
class AuthService {
    /**
   * Faz login
   */ async login(credentials) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usersApiClient"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].AUTH.LOGIN, credentials, false // Não usa auth para login
        );
        // A API retorna { status: 'success', accessToken, refreshToken, ... }
        // O client.ts já envolve em { status: 'success', data: {...} }
        if (response.status === 'success' && response.data) {
            const authData = response.data;
            console.log('AuthService.login - Dados recebidos:', {
                hasAccessToken: !!authData.accessToken,
                hasUser: !!authData.user,
                hasProfile: !!authData.profile,
                profile: authData.profile,
                userRole: authData.user?.role
            });
            // Salva tokens e role no localStorage para acesso imediato
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem('auth_token', authData.accessToken);
                localStorage.setItem('refresh_token', authData.refreshToken);
                // Salvar role para acesso imediato sem aguardar carregamento do user
                if (authData.user?.role) {
                    localStorage.setItem('user_role', authData.user.role);
                    console.log('[AuthService] Role salva no localStorage:', authData.user.role);
                }
            }
            const result = {
                accessToken: authData.accessToken,
                refreshToken: authData.refreshToken,
                expiresIn: authData.expiresIn,
                user: authData.user,
                profile: authData.profile
            };
            console.log('AuthService.login - Retornando:', {
                hasProfile: !!result.profile,
                profile: result.profile
            });
            return result;
        }
        throw new Error(response.message || 'Erro ao fazer login');
    }
    /**
   * Faz logout
   */ async logout() {
        const refreshToken = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('refresh_token') : "TURBOPACK unreachable";
        if (refreshToken) {
            try {
                await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usersApiClient"].post(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].AUTH.LOGOUT, {
                    refreshToken: refreshToken
                }, false);
            } catch (error) {
                console.error('Erro ao fazer logout na API:', error);
            }
        }
        // Limpa tokens e role do localStorage
        if ("TURBOPACK compile-time truthy", 1) {
            localStorage.removeItem('auth_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user_role');
        }
    }
    /**
   * Obtém dados do usuário autenticado
   */ async getMe() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usersApiClient"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].AUTH.ME);
        if (response.status === 'success' && response.data) {
            const userData = response.data;
            // Salvar role no localStorage para acesso imediato
            if (("TURBOPACK compile-time value", "object") !== 'undefined' && userData.role) {
                localStorage.setItem('user_role', userData.role);
                console.log('[AuthService] Role atualizada no localStorage:', userData.role);
            }
            return userData;
        }
        throw new Error(response.message || 'Erro ao obter dados do usuário');
    }
    /**
   * Verifica se o usuário está autenticado
   */ isAuthenticated() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return !!localStorage.getItem('auth_token');
    }
    /**
   * Obtém o token de autenticação
   */ getToken() {
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        return localStorage.getItem('auth_token');
    }
}
const authService = new AuthService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api/services/profile.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "profileService",
    ()=>profileService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/config.ts [app-client] (ecmascript)");
;
;
class ProfileService {
    /**
   * Verifica se o perfil está completo
   */ async checkCompletion() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["schoolApiClient"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PROFILE.CHECK_COMPLETION);
        if (response.status === 'success' && response.data) {
            return response.data;
        }
        throw new Error(response.message || 'Erro ao verificar perfil');
    }
    /**
   * Obtém dados do perfil atual
   */ async getProfile() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["schoolApiClient"].get(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PROFILE.ME);
        if (response.status === 'success' && response.data) {
            // A API retorna { status: 'success', user: {...} }
            return response.data.user || response.data;
        }
        throw new Error(response.message || 'Erro ao obter perfil');
    }
    /**
   * Atualiza dados do perfil
   */ async updateProfile(data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["schoolApiClient"].put(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PROFILE.UPDATE, data);
        if (response.status !== 'success') {
            throw new Error(response.message || 'Erro ao atualizar perfil');
        }
    }
    /**
   * Faz upload do logotipo
   */ async uploadLogo(file) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["schoolApiClient"].upload(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PROFILE.UPLOAD_LOGO, file, 'logo');
        if (response.status === 'success' && response.data) {
            return response.data.logo_path;
        }
        throw new Error(response.message || 'Erro ao fazer upload do logotipo');
    }
    /**
   * Faz upload de fotografias (mínimo 2)
   */ async uploadPhotos(files) {
        if (files.length < 2) {
            throw new Error('É necessário fazer upload de pelo menos 2 fotografias');
        }
        const formData = new FormData();
        files.forEach((file, index)=>{
            formData.append(`photos[${index}]`, file);
        });
        const token = ("TURBOPACK compile-time truthy", 1) ? localStorage.getItem('auth_token') : "TURBOPACK unreachable";
        const headers = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        try {
            const response = await fetch(`${("TURBOPACK compile-time value", "http://localhost:8003/api") || 'http://localhost:8003/api'}${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PROFILE.UPLOAD_PHOTOS}`, {
                method: 'POST',
                headers,
                body: formData
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'Erro ao fazer upload das fotografias');
            }
            const data = await response.json();
            if (data.status === 'success' && data.photos) {
                return data.photos;
            }
            throw new Error('Erro ao processar upload das fotografias');
        } catch (error) {
            throw new Error(error.message || 'Erro ao fazer upload das fotografias');
        }
    }
    /**
   * Faz upload do vídeo de apresentação
   */ async uploadVideo(file) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["schoolApiClient"].upload(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PROFILE.UPLOAD_VIDEO, file, 'video');
        if (response.status === 'success' && response.data) {
            return response.data.presentation_video_path;
        }
        throw new Error(response.message || 'Erro ao fazer upload do vídeo');
    }
}
const profileService = new ProfileService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/contexts/AuthContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/services/auth.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$services$2f$profile$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api/services/profile.service.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function AuthProvider({ children }) {
    _s();
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const [profileComplete, setProfileComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [profileStatus, setProfileStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    /**
   * Verifica autenticação ao carregar
   */ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AuthProvider.useEffect": ()=>{
            checkAuth();
        }
    }["AuthProvider.useEffect"], []);
    const checkAuth = async ()=>{
        try {
            if (__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].isAuthenticated()) {
                // Buscar dados completos do usuário
                // A role já está no localStorage e será usada pelo useRoleCheck enquanto aguarda
                const userData = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getMe();
                setUser(userData);
                // Se for escola, verificar perfil completo
                if (userData.role === 'school') {
                    await checkProfileCompletion();
                }
            }
        } catch (error) {
            console.error('Erro ao verificar autenticação:', error);
            // Limpa tokens e role inválidos
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('user_role');
            }
        } finally{
            setLoading(false);
        }
    };
    /**
   * Verifica se o perfil está completo (apenas para escolas)
   */ const checkProfileCompletion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "AuthProvider.useCallback[checkProfileCompletion]": async (userToCheck)=>{
            try {
                const userToVerify = userToCheck || user;
                if (userToVerify?.role !== 'school') {
                    setProfileComplete(true); // Não é escola, não precisa verificar
                    return;
                }
                const status_0 = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$services$2f$profile$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["profileService"].checkCompletion();
                setProfileStatus(status_0);
                setProfileComplete(status_0.is_complete);
            } catch (error_0) {
                // Se o erro for INCOMPLETE_PROFILE (403) com código específico, significa que o perfil está incompleto
                if (error_0.error_code === 'INCOMPLETE_PROFILE' || error_0.status === 403 && error_0.message?.includes('obrigatório preencher')) {
                    setProfileComplete(false);
                    // Tentar extrair dados do erro
                    if (error_0.missing_fields) {
                        setProfileStatus({
                            is_complete: false,
                            missing_fields: error_0.missing_fields,
                            completion_percentage: 0,
                            message: error_0.message || 'Perfil incompleto'
                        });
                    } else {
                        // Se não tiver missing_fields no erro, tentar buscar do endpoint
                        try {
                            const status = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$services$2f$profile$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["profileService"].checkCompletion();
                            setProfileStatus(status);
                            setProfileComplete(status.is_complete);
                        } catch (innerError) {
                            // Se falhar novamente, verificar se é realmente INCOMPLETE_PROFILE
                            if (innerError.error_code === 'INCOMPLETE_PROFILE' || innerError.status === 403 && innerError.message?.includes('obrigatório preencher')) {
                                setProfileComplete(false);
                            } else {
                                // Se for outro tipo de erro (rede, servidor, etc), não assumir incompleto
                                // Manter o estado atual ou assumir completo para não bloquear acesso
                                console.warn('Erro ao verificar perfil (não é INCOMPLETE_PROFILE):', innerError);
                            // Não alterar profileComplete para não bloquear acesso indevidamente
                            }
                        }
                    }
                } else {
                    console.warn('[AuthContext] Erro ao verificar perfil (não relacionado a perfil incompleto):', error_0);
                    // Em caso de erro que não seja INCOMPLETE_PROFILE, não assumir que está incompleto
                    // Isso evita bloquear acesso por erros de rede ou servidor
                    // Se profileComplete ainda não foi setado (null), assumir true para não bloquear acesso
                    if (profileComplete === null) {
                        console.log('[AuthContext] Erro na verificação de perfil, assumindo completo para não bloquear acesso');
                        setProfileComplete(true);
                    } else {
                        // Se já foi setado antes, manter o valor atual (não alterar)
                        console.log('[AuthContext] Mantendo estado atual de profileComplete:', profileComplete);
                    }
                }
            }
        }
    }["AuthProvider.useCallback[checkProfileCompletion]"], [
        user
    ]);
    const login = async (credentials)=>{
        try {
            console.log('AuthContext.login - Iniciando login...');
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].login(credentials);
            console.log('AuthContext.login - Resposta do login:', {
                hasProfile: !!response.profile,
                profile: response.profile,
                user: response.user
            });
            // Usar o user da resposta do login ao invés de chamar getMe() novamente
            // Isso garante que temos os dados corretos e evita uma requisição extra
            const userData_0 = {
                id: response.user.id,
                name: response.user.name,
                email: response.user.email,
                role: response.user.role,
                email_verified: response.user.email_verified || false,
                is_active: true
            };
            console.log('AuthContext.login - Dados do usuário:', {
                role: userData_0.role
            });
            // Salvar role no localStorage para acesso imediato
            if (("TURBOPACK compile-time value", "object") !== 'undefined' && userData_0.role) {
                localStorage.setItem('user_role', userData_0.role);
                console.log('[AuthContext] Role salva no localStorage após login:', userData_0.role);
            }
            setUser(userData_0);
            // Se for escola, usar informações de perfil da resposta do login
            if (userData_0.role === 'school') {
                console.log('AuthContext.login - É escola, verificando perfil...');
                // Se a resposta do login já contém informações de perfil, usar diretamente
                if (response.profile) {
                    const profileInfo = response.profile;
                    console.log('AuthContext.login - Perfil recebido da API:', profileInfo);
                    console.log('AuthContext.login - is_complete:', profileInfo.is_complete);
                    setProfileComplete(profileInfo.is_complete);
                    setProfileStatus({
                        is_complete: profileInfo.is_complete,
                        missing_fields: profileInfo.missing_fields || [],
                        completion_percentage: profileInfo.completion_percentage || 0,
                        message: profileInfo.message || 'Perfil incompleto'
                    });
                    console.log('AuthContext.login - profileComplete setado para:', profileInfo.is_complete);
                } else {
                    // Se não tiver na resposta, verificar manualmente (fallback)
                    console.log('AuthContext.login - Perfil não veio na resposta, verificando manualmente...');
                    await checkProfileCompletion(userData_0);
                }
            } else {
                console.log('AuthContext.login - Não é escola, setando profileComplete = true');
                setProfileComplete(true); // Não é escola, não precisa verificar
            }
        } catch (error_1) {
            console.error('AuthContext.login - Erro no login:', error_1);
            throw error_1;
        }
    };
    const logout = async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].logout();
            // Limpar estados
            setUser(null);
            setProfileComplete(null);
            setProfileStatus(null);
            // Limpar role do localStorage
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.removeItem('user_role');
            }
            // Redirecionar para login
            if ("TURBOPACK compile-time truthy", 1) {
                window.location.href = '/';
            }
        } catch (error_2) {
            console.error('Erro ao fazer logout:', error_2);
            // Mesmo com erro, limpar estados e redirecionar
            setUser(null);
            setProfileComplete(null);
            setProfileStatus(null);
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.removeItem('user_role');
                window.location.href = '/';
            }
        }
    };
    const refreshUser = async ()=>{
        try {
            const userData_1 = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["authService"].getMe();
            setUser(userData_1);
            // Se for escola, verificar perfil completo após atualizar
            if (userData_1.role === 'school') {
                await checkProfileCompletion();
            }
        } catch (error_3) {
            console.error('Erro ao atualizar dados do usuário:', error_3);
            throw error_3;
        }
    };
    // isAuthenticated deve ser true apenas se user existir E não estiver carregando
    const isAuthenticated = !!user && !loading;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            loading,
            isAuthenticated,
            profileComplete,
            profileStatus,
            login,
            logout,
            refreshUser,
            checkProfileCompletion
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/contexts/AuthContext.tsx",
        lineNumber: 225,
        columnNumber: 10
    }, this);
}
_s(AuthProvider, "gOQlQYuvkpM8NbzV4lsrk2lSgAU=");
_c = AuthProvider;
function useAuth() {
    _s1();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(1);
    if ($[0] !== "f3c6faf0535ad37663ead06af816dd2e77eee6d7aca66e1a18bf5a3a1e749027") {
        for(let $i = 0; $i < 1; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "f3c6faf0535ad37663ead06af816dd2e77eee6d7aca66e1a18bf5a3a1e749027";
    }
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
}
_s1(useAuth, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "AuthProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/next/dist/compiled/react/cjs/react-compiler-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * @license React
 * react-compiler-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
"use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    var ReactSharedInternals = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)").__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
    exports.c = function(size) {
        var dispatcher = ReactSharedInternals.H;
        null === dispatcher && console.error("Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem.");
        return dispatcher.useMemoCache(size);
    };
}();
}),
"[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

/**
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/compiled/react/cjs/react-compiler-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/node_modules/next-themes/dist/index.mjs [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>J,
    "useTheme",
    ()=>z
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
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
], I = "(prefers-color-scheme: dark)", O = typeof window == "undefined", x = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"](void 0), U = {
    setTheme: (e)=>{},
    themes: []
}, z = ()=>{
    var e;
    return (e = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](x)) != null ? e : U;
}, J = (e)=>__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"](x) ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], null, e.children) : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](V, {
        ...e
    }), N = [
    "light",
    "dark"
], V = ({ forcedTheme: e, disableTransitionOnChange: i = !1, enableSystem: s = !0, enableColorScheme: u = !0, storageKey: m = "theme", themes: a = N, defaultTheme: l = s ? "system" : "light", attribute: h = "data-theme", value: d, children: w, nonce: p, scriptProps: R })=>{
    let [c, n] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "V.useState": ()=>H(m, l)
    }["V.useState"]), [T, y] = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "V.useState": ()=>c === "system" ? E() : c
    }["V.useState"]), k = d ? Object.values(d) : a, S = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "V.useCallback[S]": (o)=>{
            let r = o;
            if (!r) return;
            o === "system" && s && (r = E());
            let v = d ? d[r] : r, C = i ? W(p) : null, P = document.documentElement, L = {
                "V.useCallback[S].L": (g)=>{
                    g === "class" ? (P.classList.remove(...k), v && P.classList.add(v)) : g.startsWith("data-") && (v ? P.setAttribute(g, v) : P.removeAttribute(g));
                }
            }["V.useCallback[S].L"];
            if (Array.isArray(h) ? h.forEach(L) : L(h), u) {
                let g = b.includes(l) ? l : null, D = b.includes(r) ? r : g;
                P.style.colorScheme = D;
            }
            C == null || C();
        }
    }["V.useCallback[S]"], [
        p
    ]), f = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "V.useCallback[f]": (o)=>{
            let r = typeof o == "function" ? o(c) : o;
            n(r);
            try {
                localStorage.setItem(m, r);
            } catch (v) {}
        }
    }["V.useCallback[f]"], [
        c
    ]), A = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"]({
        "V.useCallback[A]": (o)=>{
            let r = E(o);
            y(r), c === "system" && s && !e && S("system");
        }
    }["V.useCallback[A]"], [
        c,
        e
    ]);
    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "V.useEffect": ()=>{
            let o = window.matchMedia(I);
            return o.addListener(A), A(o), ({
                "V.useEffect": ()=>o.removeListener(A)
            })["V.useEffect"];
        }
    }["V.useEffect"], [
        A
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "V.useEffect": ()=>{
            let o = {
                "V.useEffect.o": (r)=>{
                    r.key === m && (r.newValue ? n(r.newValue) : f(l));
                }
            }["V.useEffect.o"];
            return window.addEventListener("storage", o), ({
                "V.useEffect": ()=>window.removeEventListener("storage", o)
            })["V.useEffect"];
        }
    }["V.useEffect"], [
        f
    ]), __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "V.useEffect": ()=>{
            S(e != null ? e : c);
        }
    }["V.useEffect"], [
        e,
        c
    ]);
    let Q = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "V.useMemo[Q]": ()=>({
                theme: c,
                setTheme: f,
                forcedTheme: e,
                resolvedTheme: c === "system" ? T : c,
                themes: s ? [
                    ...a,
                    "system"
                ] : a,
                systemTheme: s ? T : void 0
            })
    }["V.useMemo[Q]"], [
        c,
        f,
        e,
        T,
        s,
        a
    ]);
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](x.Provider, {
        value: Q
    }, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"](_, {
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
}, _ = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["memo"](({ forcedTheme: e, storageKey: i, attribute: s, enableSystem: u, enableColorScheme: m, defaultTheme: a, value: l, themes: h, nonce: d, scriptProps: w })=>{
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
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createElement"]("script", {
        ...w,
        suppressHydrationWarning: !0,
        nonce: typeof window == "undefined" ? d : "",
        dangerouslySetInnerHTML: {
            __html: `(${M.toString()})(${p})`
        }
    });
}), H = (e, i)=>{
    if (O) return;
    let s;
    try {
        s = localStorage.getItem(e) || void 0;
    } catch (u) {}
    return s || i;
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
]);

//# sourceMappingURL=_70f78464._.js.map