module.exports = [
"[externals]/stream [external] (stream, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}),
"[project]/src/assets/backgrounds/not-found.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/not-found.ba991ad6.png");}),
"[project]/src/assets/backgrounds/not-found.png.mjs { IMAGE => \"[project]/src/assets/backgrounds/not-found.png (static in ecmascript, tag client)\" } [app-ssr] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$backgrounds$2f$not$2d$found$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/src/assets/backgrounds/not-found.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$backgrounds$2f$not$2d$found$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 1344,
    height: 768,
    blurWidth: 8,
    blurHeight: 5,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAIAAAD38zoCAAAAiElEQVR42gF9AIL/AEk6OTgyPERBUVRSZ15ZbT82XENAW3F8jQBrSzwpICc/M0JcX5JiXXs+LkA1MTx8i5AAQzxNVkJRZE5WSTdORjhLVTFAWD5TYG1zAColO2dXfXRba350gHlia2M7SVk9W01MbQAgIDFkZ4V4c4arsbqqmZmNhY2BeYRIQlVauCoNt4S/6AAAAABJRU5ErkJggg=="
};
}),
"[project]/src/app/not-found.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NotFound
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/styled-components/dist/styled-components.esm.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$backgrounds$2f$not$2d$found$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$backgrounds$2f$not$2d$found$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/src/assets/backgrounds/not-found.png.mjs { IMAGE => "[project]/src/assets/backgrounds/not-found.png (static in ecmascript, tag client)" } [app-ssr] (structured image object with data url, ecmascript)');
'use client';
;
;
;
// === Animações ===
const fadeInUp = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyframes"]`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;
const subtlePulse = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["keyframes"]`
  0%,100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;
// === Layout principal ===
const PageWrapper = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "not-found__PageWrapper",
    componentId: "sc-9c524d7a-0"
})`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;     /* vertical centralizado */
  justify-content: center; /* horizontal centralizado */
  overflow: hidden;
  z-index: 9999;
  margin: 0;
  padding: 0;
  font-family: 'Poppins', sans-serif;

  background-color: #09090b8b;
  background-image: url('${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$assets$2f$backgrounds$2f$not$2d$found$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$src$2f$assets$2f$backgrounds$2f$not$2d$found$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$ssr$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"].src}'); 
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.66);
    backdrop-filter: blur(2px);
    z-index: 1;
  }
`;
// === Conteúdo ===
const Content = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].main.withConfig({
    displayName: "not-found__Content",
    componentId: "sc-9c524d7a-1"
})`
  position: relative;
  z-index: 2;
  text-align: center;
  color: #fff;
  max-width: 720px;
  padding: 28px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center; /* centraliza verticalmente o conteúdo */
  gap: 18px;
  height: 100%; /* ocupa toda altura do PageWrapper */

  ${__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["css"]`
    animation: ${fadeInUp} 0.5s ease forwards;
  `}
`;
const Title404 = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].h1.withConfig({
    displayName: "not-found__Title404",
    componentId: "sc-9c524d7a-2"
})`
  font-size: clamp(4rem, 12vw, 9rem);
  font-weight: 800;
  margin: 0;
  line-height: 1;
  text-shadow: 0 6px 30px rgba(0, 0, 0, 0.6);
`;
const Subtitle = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].h2.withConfig({
    displayName: "not-found__Subtitle",
    componentId: "sc-9c524d7a-3"
})`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 600;
  margin: 0;
  color: #e4e4e8;
`;
const Description = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].p.withConfig({
    displayName: "not-found__Description",
    componentId: "sc-9c524d7a-4"
})`
  max-width: 640px;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(230, 230, 234, 0.9);
  margin: 0 0 20px;
`;
const ButtonRow = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "not-found__ButtonRow",
    componentId: "sc-9c524d7a-5"
})`
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  width: 100%;
`;
const Button = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].button.withConfig({
    displayName: "not-found__Button",
    componentId: "sc-9c524d7a-6"
})`
  min-width: 160px;
  padding: 12px 22px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  font-size: 1rem;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  ${(p)=>p.variant === 'ghost' ? __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["css"]`
          background: transparent;
          color: rgba(255, 255, 255, 0.95);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
          }
        ` : __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["css"]`
          background: #6c5f8d;
          color: #fff;
          box-shadow: 0 6px 24px rgba(108, 95, 141, 0.18);
          animation: ${subtlePulse} 4s ease-in-out infinite;
          &:hover {
            background-color: #5a4e7a;
            transform: translateY(-3px);
            box-shadow: 0 18px 40px rgba(108, 95, 141, 0.25);
          }
        `}
`;
const Footer = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$esm$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["default"].footer.withConfig({
    displayName: "not-found__Footer",
    componentId: "sc-9c524d7a-7"
})`
  position: absolute;
  bottom: 15px;
  left: 0;
  right: 0;
  z-index: 2;
  text-align: center;
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.6);
`;
function NotFound() {
    const goHome = ()=>window.location.href = '/';
    const goBack = ()=>window.history.back();
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(PageWrapper, {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Content, {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Title404, {
                        children: "404"
                    }, void 0, false, {
                        fileName: "[project]/src/app/not-found.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Subtitle, {
                        children: "Página não encontrada"
                    }, void 0, false, {
                        fileName: "[project]/src/app/not-found.tsx",
                        lineNumber: 156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Description, {
                        children: "Oops — não conseguimos encontrar a página que procuras. Podes voltar ao início ou regressar à página anterior."
                    }, void 0, false, {
                        fileName: "[project]/src/app/not-found.tsx",
                        lineNumber: 157,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ButtonRow, {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                onClick: goHome,
                                children: "Voltar ao Início"
                            }, void 0, false, {
                                fileName: "[project]/src/app/not-found.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                                variant: "ghost",
                                onClick: goBack,
                                children: "Página Anterior"
                            }, void 0, false, {
                                fileName: "[project]/src/app/not-found.tsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/not-found.tsx",
                        lineNumber: 162,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/not-found.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(Footer, {
                children: [
                    "© ",
                    new Date().getFullYear(),
                    " Multischool Angola"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/not-found.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/not-found.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__25e6bc6d._.js.map