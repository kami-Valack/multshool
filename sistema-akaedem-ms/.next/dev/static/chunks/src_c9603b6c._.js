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
]);

//# sourceMappingURL=src_c9603b6c._.js.map