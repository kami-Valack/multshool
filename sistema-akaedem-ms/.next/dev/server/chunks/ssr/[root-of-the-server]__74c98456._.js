module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/sistema-akaedem-ms/src/components/theme-provider.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThemeProvider",
    ()=>ThemeProvider
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
function ThemeProvider({ children, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ThemeProvider"], {
        ...props,
        children: children
    }, void 0, false, {
        fileName: "[project]/sistema-akaedem-ms/src/components/theme-provider.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
}),
"[project]/sistema-akaedem-ms/src/lib/api/config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
    USERS_API_URL: ("TURBOPACK compile-time value", "http://98.89.20.199:8000/api") || 'http://localhost:8001/api',
    SCHOOL_API_URL: ("TURBOPACK compile-time value", "http://98.89.20.199:8003/api") || 'http://localhost:8002/api',
    STUDENT_API_URL: ("TURBOPACK compile-time value", "http://98.89.20.199:8001/api") || 'http://localhost:8003/api',
    ADMIN_API_URL: ("TURBOPACK compile-time value", "http://98.89.20.199:8002/api") || 'http://localhost:8004/api',
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
    },
    // Financeiro
    TUITION_PLANS: {
        LIST: '/tuition-plans',
        SHOW: (id)=>`/tuition-plans/${id}`,
        CREATE: '/tuition-plans',
        UPDATE: (id)=>`/tuition-plans/${id}`,
        DELETE: (id)=>`/tuition-plans/${id}`
    },
    ADDITIONAL_FEES: {
        LIST: '/additional-fees',
        CREATE: '/additional-fees',
        UPDATE: (id)=>`/additional-fees/${id}`,
        DELETE: (id)=>`/additional-fees/${id}`
    },
    FEE_CHARGES: {
        LIST: '/fee-charges',
        CREATE: '/fee-charges',
        UPDATE: (id)=>`/fee-charges/${id}`,
        DELETE: (id)=>`/fee-charges/${id}`,
        MARK_PAID: (id)=>`/fee-charges/${id}/mark-paid`
    },
    PAYMENTS: {
        LIST: '/payments',
        CREATE: '/payments',
        UPDATE: (id)=>`/payments/${id}`,
        DELETE: (id)=>`/payments/${id}`
    },
    INVOICES: {
        LIST: '/invoices',
        CREATE: '/invoices',
        UPDATE: (id)=>`/invoices/${id}`,
        DELETE: (id)=>`/invoices/${id}`
    },
    FINANCE_REPORTS: {
        SUMMARY: '/finance/reports/summary'
    },
    // Comunicação
    ANNOUNCEMENTS: {
        LIST: '/announcements',
        CREATE: '/announcements',
        UPDATE: (id)=>`/announcements/${id}`,
        DELETE: (id)=>`/announcements/${id}`
    },
    // Definições
    ACTIVITY_LOGS: {
        LIST: '/activity-logs'
    },
    PERMISSION_PROFILES: {
        LIST: '/permission-profiles',
        CREATE: '/permission-profiles',
        UPDATE: (id)=>`/permission-profiles/${id}`,
        DELETE: (id)=>`/permission-profiles/${id}`
    }
};
}),
"[project]/sistema-akaedem-ms/src/lib/api/client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/lib/api/config.ts [app-ssr] (ecmascript)");
;
class ApiClient {
    baseURL;
    timeout;
    defaultHeaders;
    constructor(baseURL, timeout = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].TIMEOUT){
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
            ...customHeaders || {}
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
        if (__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].API_SECRET) {
            headers['X-API-Secret'] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].API_SECRET;
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
                if (error.status === 403 && error.error_code === 'INCOMPLETE_PROFILE' && ("TURBOPACK compile-time value", "undefined") !== 'undefined' && !window.location.pathname.includes('/completar-perfil') && !window.location.pathname.includes('/admin/completar-perfil')) //TURBOPACK unreachable
                ;
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
            // Mensagens específicas para códigos de status comuns
            if (!message || message === 'Erro ao processar requisição') {
                if (response.status === 401) {
                    message = 'Credenciais inválidas. Verifique o utilizador e a palavra-passe.';
                } else if (response.status === 403) {
                    message = 'Acesso negado. Você não tem permissão para realizar esta ação.';
                } else if (response.status === 404) {
                    message = 'Recurso não encontrado.';
                } else if (response.status === 500) {
                    message = 'Erro interno do servidor. Tente novamente mais tarde.';
                }
            }
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
            // Se não conseguir fazer parse do JSON, usar statusText ou mensagem padrão baseada no status
            if (response.status === 401) {
                message = 'Credenciais inválidas. Verifique o utilizador e a palavra-passe.';
            } else {
                message = response.statusText || message;
            }
        }
        // Garantir que sempre há uma mensagem
        if (!message || message.trim() === '') {
            if (response.status === 401) {
                message = 'Credenciais inválidas. Verifique o utilizador e a palavra-passe.';
            } else {
                message = 'Erro ao processar requisição';
            }
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
            const response = await fetch(`${__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].USERS_API_URL}/auth/refresh-token`, {
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
const usersApiClient = new ApiClient(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].USERS_API_URL);
const schoolApiClient = new ApiClient(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].SCHOOL_API_URL);
const studentApiClient = new ApiClient(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].STUDENT_API_URL);
const adminApiClient = new ApiClient(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_CONFIG"].ADMIN_API_URL);
const apiClient = schoolApiClient;
}),
"[project]/sistema-akaedem-ms/src/lib/api/services/auth.service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authService",
    ()=>authService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/lib/api/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/lib/api/config.ts [app-ssr] (ecmascript)");
;
;
class AuthService {
    /**
   * Faz login
   */ async login(credentials) {
        try {
            const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usersApiClient"].post(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].AUTH.LOGIN, credentials, false // Não usa auth para login
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
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
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
            // Se não foi sucesso, extrair mensagem de erro
            const errorMessage = response.message || 'Erro ao fazer login';
            throw new Error(errorMessage);
        } catch (error) {
            console.error('AuthService.login - Erro capturado:', error);
            // Extrair mensagem de erro de forma robusta
            let errorMessage = 'Credenciais inválidas. Verifique o utilizador e a palavra-passe.';
            if (error) {
                // Se for um ApiError (objeto com propriedades message, status, etc.)
                if (error.message) {
                    errorMessage = error.message;
                } else if (typeof error === 'string') {
                    errorMessage = error;
                } else if (error.status === 401) {
                    errorMessage = 'Credenciais inválidas. Verifique o utilizador e a palavra-passe.';
                }
            }
            // Lançar um novo Error com a mensagem extraída para garantir que seja propagado corretamente
            const loginError = new Error(errorMessage);
            // Preservar informações do erro original se disponível
            loginError.originalError = error;
            throw loginError;
        }
    }
    /**
   * Faz logout
   */ async logout() {
        const refreshToken = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        // Limpa tokens e role do localStorage
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }
    /**
   * Obtém dados do usuário autenticado
   */ async getMe() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["usersApiClient"].get(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].AUTH.ME);
        if (response.status === 'success' && response.data) {
            const userData = response.data;
            // Salvar role no localStorage para acesso imediato
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
            return userData;
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
"[project]/sistema-akaedem-ms/src/lib/api/services/profile.service.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "profileService",
    ()=>profileService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/lib/api/client.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/lib/api/config.ts [app-ssr] (ecmascript)");
;
;
class ProfileService {
    /**
   * Verifica se o perfil está completo
   */ async checkCompletion() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["schoolApiClient"].get(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PROFILE.CHECK_COMPLETION);
        if (response.status === 'success' && response.data) {
            return response.data;
        }
        throw new Error(response.message || 'Erro ao verificar perfil');
    }
    /**
   * Obtém dados do perfil atual
   */ async getProfile() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["schoolApiClient"].get(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PROFILE.ME);
        if (response.status === 'success' && response.data) {
            // A API retorna { status: 'success', user: {...} }
            return response.data.user || response.data;
        }
        throw new Error(response.message || 'Erro ao obter perfil');
    }
    /**
   * Atualiza dados do perfil
   */ async updateProfile(data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["schoolApiClient"].put(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PROFILE.UPDATE, data);
        if (response.status !== 'success') {
            throw new Error(response.message || 'Erro ao atualizar perfil');
        }
    }
    /**
   * Faz upload do logotipo
   */ async uploadLogo(file) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["schoolApiClient"].upload(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PROFILE.UPLOAD_LOGO, file, 'logo');
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
        const token = ("TURBOPACK compile-time falsy", 0) ? "TURBOPACK unreachable" : null;
        const headers = {};
        if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
        try {
            const response = await fetch(`${("TURBOPACK compile-time value", "http://98.89.20.199:8003/api") || 'http://localhost:8003/api'}${__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PROFILE.UPLOAD_PHOTOS}`, {
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
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["schoolApiClient"].upload(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].PROFILE.UPLOAD_VIDEO, file, 'video');
        if (response.status === 'success' && response.data) {
            return response.data.presentation_video_path;
        }
        throw new Error(response.message || 'Erro ao fazer upload do vídeo');
    }
}
const profileService = new ProfileService();
}),
"[project]/sistema-akaedem-ms/src/contexts/AuthContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AuthProvider",
    ()=>AuthProvider,
    "useAuth",
    ()=>useAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/lib/api/services/auth.service.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$services$2f$profile$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/lib/api/services/profile.service.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const USER_CACHE_KEY = "auth_user_cache";
const SCHOOL_CACHE_KEY = "auth_school_cache";
const AuthContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function readCache(key) {
    if ("TURBOPACK compile-time truthy", 1) return null;
    //TURBOPACK unreachable
    ;
}
function writeCache(key, value) {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function clearSessionCaches() {
    if ("TURBOPACK compile-time truthy", 1) return;
    //TURBOPACK unreachable
    ;
}
function AuthProvider({ children }) {
    const [user, setUser] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [schoolProfile, setSchoolProfile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [profileComplete, setProfileComplete] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [profileStatus, setProfileStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const profileCheckInFlight = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const hydrated = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useRef"])(false);
    const persistUser = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((next)=>{
        setUser(next);
        if (next) {
            writeCache(USER_CACHE_KEY, next);
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        } else {
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        }
    }, []);
    const persistSchool = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((next)=>{
        setSchoolProfile(next);
        if (next) writeCache(SCHOOL_CACHE_KEY, next);
        else if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
        ;
    }, []);
    const loadSchoolProfile = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async ()=>{
        try {
            const profile = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$services$2f$profile$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["profileService"].getProfile();
            if (profile) {
                persistSchool(profile);
                // Manter o nome da escola no user para sidebar/navbar
                setUser((prev)=>{
                    if (!prev) return prev;
                    const merged = {
                        ...prev,
                        name: profile.name || prev.name,
                        school: {
                            ...prev.school || {},
                            ...profile,
                            name: profile.name || prev.school?.name,
                            logo_path: profile.logo_path || prev.school?.logo_path
                        }
                    };
                    writeCache(USER_CACHE_KEY, merged);
                    return merged;
                });
            }
        } catch (error) {
            console.warn("[AuthContext] Não foi possível carregar perfil da escola:", error);
        }
    }, [
        persistSchool
    ]);
    const checkProfileCompletion = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(async (userToCheck)=>{
        if (profileCheckInFlight.current) return;
        profileCheckInFlight.current = true;
        try {
            const userToVerify = userToCheck || user;
            if (userToVerify?.role !== "school") {
                setProfileComplete(true);
                return;
            }
            const status = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$services$2f$profile$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["profileService"].checkCompletion();
            setProfileStatus(status);
            setProfileComplete(status.is_complete);
        } catch (error) {
            if (error.error_code === "INCOMPLETE_PROFILE" || error.status === 403 && error.message?.includes("obrigatório preencher")) {
                setProfileComplete(false);
                if (error.missing_fields) {
                    setProfileStatus({
                        is_complete: false,
                        missing_fields: error.missing_fields,
                        completion_percentage: 0,
                        message: error.message || "Perfil incompleto"
                    });
                }
            } else {
                console.warn("[AuthContext] Erro ao verificar perfil:", error);
                setProfileComplete((prev)=>prev === null ? true : prev);
            }
        } finally{
            profileCheckInFlight.current = false;
        }
    }, [
        user
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (hydrated.current) return;
        hydrated.current = true;
        const cachedUser = readCache(USER_CACHE_KEY);
        const cachedSchool = readCache(SCHOOL_CACHE_KEY);
        if (cachedUser) setUser(cachedUser);
        if (cachedSchool) setSchoolProfile(cachedSchool);
        const boot = async ()=>{
            try {
                if (!__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].isAuthenticated()) {
                    persistUser(null);
                    persistSchool(null);
                    setProfileComplete(null);
                    setProfileStatus(null);
                    return;
                }
                const userData = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].getMe();
                persistUser(userData);
                if (userData.role === "school") {
                    await Promise.all([
                        checkProfileCompletion(userData),
                        loadSchoolProfile()
                    ]);
                } else {
                    setProfileComplete(true);
                }
            } catch (error) {
                console.error("Erro ao verificar autenticação:", error);
                if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
                ;
                clearSessionCaches();
                persistUser(null);
                persistSchool(null);
            } finally{
                setLoading(false);
            }
        };
        void boot();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    const login = async (credentials)=>{
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].login(credentials);
        const userData = {
            id: response.user.id,
            name: response.user.name,
            email: response.user.email,
            role: response.user.role,
            email_verified: response.user.email_verified || false,
            is_active: true
        };
        persistUser(userData);
        if (userData.role === "school") {
            if (response.profile) {
                const profileInfo = response.profile;
                setProfileComplete(profileInfo.is_complete);
                setProfileStatus({
                    is_complete: profileInfo.is_complete,
                    missing_fields: profileInfo.missing_fields || [],
                    completion_percentage: profileInfo.completion_percentage || 0,
                    message: profileInfo.message || "Perfil incompleto"
                });
            } else {
                await checkProfileCompletion(userData);
            }
            await loadSchoolProfile();
        } else {
            setProfileComplete(true);
        }
    };
    const logout = async ()=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].logout();
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        } finally{
            persistUser(null);
            persistSchool(null);
            setProfileComplete(null);
            setProfileStatus(null);
            clearSessionCaches();
            if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
            ;
        }
    };
    const refreshUser = async ()=>{
        const userData = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$services$2f$auth$2e$service$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["authService"].getMe();
        persistUser(userData);
        if (userData.role === "school") {
            await Promise.all([
                checkProfileCompletion(userData),
                loadSchoolProfile()
            ]);
        }
    };
    // Manter autenticação estável: não depender de `loading`, para o nome não desaparecer
    const isAuthenticated = !!user;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(AuthContext.Provider, {
        value: {
            user,
            schoolProfile,
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
        fileName: "[project]/sistema-akaedem-ms/src/contexts/AuthContext.tsx",
        lineNumber: 282,
        columnNumber: 5
    }, this);
}
function useAuth() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
}
}),
"[project]/sistema-akaedem-ms/src/components/ui/sonner.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Toaster",
    ()=>Toaster
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheckIcon$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/circle-check.js [app-ssr] (ecmascript) <export default as CircleCheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoIcon$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/info.js [app-ssr] (ecmascript) <export default as InfoIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2Icon$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-ssr] (ecmascript) <export default as Loader2Icon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$octagon$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__OctagonXIcon$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/octagon-x.js [app-ssr] (ecmascript) <export default as OctagonXIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TriangleAlertIcon$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/triangle-alert.js [app-ssr] (ecmascript) <export default as TriangleAlertIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next-themes/dist/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/sonner/dist/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
;
;
const Toaster = ({ ...props })=>{
    const { theme = "system" } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2d$themes$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useTheme"])();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Toaster"], {
        theme: theme,
        className: "toaster group",
        icons: {
            success: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleCheckIcon$3e$__["CircleCheckIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/ui/sonner.tsx",
                lineNumber: 21,
                columnNumber: 18
            }, void 0),
            info: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$info$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__InfoIcon$3e$__["InfoIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/ui/sonner.tsx",
                lineNumber: 22,
                columnNumber: 15
            }, void 0),
            warning: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$triangle$2d$alert$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__TriangleAlertIcon$3e$__["TriangleAlertIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/ui/sonner.tsx",
                lineNumber: 23,
                columnNumber: 18
            }, void 0),
            error: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$octagon$2d$x$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__OctagonXIcon$3e$__["OctagonXIcon"], {
                className: "size-4"
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/ui/sonner.tsx",
                lineNumber: 24,
                columnNumber: 16
            }, void 0),
            loading: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2Icon$3e$__["Loader2Icon"], {
                className: "size-4 animate-spin"
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/ui/sonner.tsx",
                lineNumber: 25,
                columnNumber: 18
            }, void 0)
        },
        style: {
            "--normal-bg": "var(--popover)",
            "--normal-text": "var(--popover-foreground)",
            "--normal-border": "var(--border)",
            "--border-radius": "var(--radius)"
        },
        ...props
    }, void 0, false, {
        fileName: "[project]/sistema-akaedem-ms/src/components/ui/sonner.tsx",
        lineNumber: 17,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/dynamic-access-async-storage.external.js [external] (next/dist/server/app-render/dynamic-access-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/dynamic-access-async-storage.external.js", () => require("next/dist/server/app-render/dynamic-access-async-storage.external.js"));

module.exports = mod;
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__74c98456._.js.map