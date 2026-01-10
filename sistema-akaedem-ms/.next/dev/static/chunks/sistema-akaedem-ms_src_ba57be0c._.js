(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/sistema-akaedem-ms/src/assets/backgrounds/not-found.png (static in ecmascript, tag client)", ((__turbopack_context__) => {

__turbopack_context__.v("/_next/static/media/not-found.ba991ad6.png");}),
"[project]/sistema-akaedem-ms/src/assets/backgrounds/not-found.png.mjs { IMAGE => \"[project]/sistema-akaedem-ms/src/assets/backgrounds/not-found.png (static in ecmascript, tag client)\" } [app-client] (structured image object with data url, ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$assets$2f$backgrounds$2f$not$2d$found$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/assets/backgrounds/not-found.png (static in ecmascript, tag client)");
;
const __TURBOPACK__default__export__ = {
    src: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$assets$2f$backgrounds$2f$not$2d$found$2e$png__$28$static__in__ecmascript$2c$__tag__client$29$__["default"],
    width: 1344,
    height: 768,
    blurWidth: 8,
    blurHeight: 5,
    blurDataURL: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAIAAAD38zoCAAAAiElEQVR42gF9AIL/AEk6OTgyPERBUVRSZ15ZbT82XENAW3F8jQBrSzwpICc/M0JcX5JiXXs+LkA1MTx8i5AAQzxNVkJRZE5WSTdORjhLVTFAWD5TYG1zAColO2dXfXRba350gHlia2M7SVk9W01MbQAgIDFkZ4V4c4arsbqqmZmNhY2BeYRIQlVauCoNt4S/6AAAAABJRU5ErkJggg=="
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sistema-akaedem-ms/src/app/not-found.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>NotFound
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/styled-components/dist/styled-components.browser.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$assets$2f$backgrounds$2f$not$2d$found$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$assets$2f$backgrounds$2f$not$2d$found$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__ = __turbopack_context__.i('[project]/sistema-akaedem-ms/src/assets/backgrounds/not-found.png.mjs { IMAGE => "[project]/sistema-akaedem-ms/src/assets/backgrounds/not-found.png (static in ecmascript, tag client)" } [app-client] (structured image object with data url, ecmascript)');
'use client';
;
;
;
;
// === Animações ===
const fadeInUp = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
`;
const subtlePulse = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["keyframes"]`
  0%,100% { transform: scale(1); }
  50% { transform: scale(1.02); }
`;
// === Layout principal ===
const PageWrapper = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "not-found__PageWrapper",
    componentId: "sc-f320ad04-0"
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
  background-image: url('${__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$assets$2f$backgrounds$2f$not$2d$found$2e$png$2e$mjs__$7b$__IMAGE__$3d3e$__$225b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$assets$2f$backgrounds$2f$not$2d$found$2e$png__$28$static__in__ecmascript$2c$__tag__client$2922$__$7d$__$5b$app$2d$client$5d$__$28$structured__image__object__with__data__url$2c$__ecmascript$29$__["default"].src}'); 
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
_c = PageWrapper;
// === Conteúdo ===
const Content = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].main.withConfig({
    displayName: "not-found__Content",
    componentId: "sc-f320ad04-1"
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

  ${__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"]`
    animation: ${fadeInUp} 0.5s ease forwards;
  `}
`;
_c1 = Content;
const Title404 = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].h1.withConfig({
    displayName: "not-found__Title404",
    componentId: "sc-f320ad04-2"
})`
  font-size: clamp(4rem, 12vw, 9rem);
  font-weight: 800;
  margin: 0;
  line-height: 1;
  text-shadow: 0 6px 30px rgba(0, 0, 0, 0.6);
`;
_c2 = Title404;
const Subtitle = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].h2.withConfig({
    displayName: "not-found__Subtitle",
    componentId: "sc-f320ad04-3"
})`
  font-size: clamp(1.5rem, 4vw, 2.5rem);
  font-weight: 600;
  margin: 0;
  color: #e4e4e8;
`;
_c3 = Subtitle;
const Description = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].p.withConfig({
    displayName: "not-found__Description",
    componentId: "sc-f320ad04-4"
})`
  max-width: 640px;
  font-size: 1rem;
  line-height: 1.6;
  color: rgba(230, 230, 234, 0.9);
  margin: 0 0 20px;
`;
_c4 = Description;
const ButtonRow = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].div.withConfig({
    displayName: "not-found__ButtonRow",
    componentId: "sc-f320ad04-5"
})`
  display: flex;
  justify-content: center;
  gap: 14px;
  flex-wrap: wrap;
  width: 100%;
`;
_c5 = ButtonRow;
const Button = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].button.withConfig({
    displayName: "not-found__Button",
    componentId: "sc-f320ad04-6"
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

  ${(p)=>p.variant === 'ghost' ? __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"]`
          background: transparent;
          color: rgba(255, 255, 255, 0.95);
          box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1) inset;
          &:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.45);
          }
        ` : __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["css"]`
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
_c6 = Button;
const Footer = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$styled$2d$components$2f$dist$2f$styled$2d$components$2e$browser$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].footer.withConfig({
    displayName: "not-found__Footer",
    componentId: "sc-f320ad04-7"
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
_c7 = Footer;
function NotFound() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(6);
    if ($[0] !== "b0c6472f9d9edb4324f6ea0d49242e4144e3481df744654fb3d71646bc44a813") {
        for(let $i = 0; $i < 6; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "b0c6472f9d9edb4324f6ea0d49242e4144e3481df744654fb3d71646bc44a813";
    }
    const goHome = _NotFoundGoHome;
    const goBack = _NotFoundGoBack;
    let t0;
    let t1;
    let t2;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Title404, {
            children: "404"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/app/not-found.tsx",
            lineNumber: 155,
            columnNumber: 10
        }, this);
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Subtitle, {
            children: "Página não encontrada"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/app/not-found.tsx",
            lineNumber: 156,
            columnNumber: 10
        }, this);
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Description, {
            children: "Oops — não conseguimos encontrar a página que procuras. Podes voltar ao início ou regressar à página anterior."
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/app/not-found.tsx",
            lineNumber: 157,
            columnNumber: 10
        }, this);
        $[1] = t0;
        $[2] = t1;
        $[3] = t2;
    } else {
        t0 = $[1];
        t1 = $[2];
        t2 = $[3];
    }
    let t3;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Content, {
            children: [
                t0,
                t1,
                t2,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ButtonRow, {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                            onClick: goHome,
                            children: "Voltar ao Início"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/app/not-found.tsx",
                            lineNumber: 168,
                            columnNumber: 42
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Button, {
                            variant: "ghost",
                            onClick: goBack,
                            children: "Página Anterior"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/app/not-found.tsx",
                            lineNumber: 168,
                            columnNumber: 92
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sistema-akaedem-ms/src/app/not-found.tsx",
                    lineNumber: 168,
                    columnNumber: 31
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/app/not-found.tsx",
            lineNumber: 168,
            columnNumber: 10
        }, this);
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PageWrapper, {
            children: [
                t3,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Footer, {
                    children: [
                        "© ",
                        new Date().getFullYear(),
                        " Multischool Angola"
                    ]
                }, void 0, true, {
                    fileName: "[project]/sistema-akaedem-ms/src/app/not-found.tsx",
                    lineNumber: 175,
                    columnNumber: 27
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/app/not-found.tsx",
            lineNumber: 175,
            columnNumber: 10
        }, this);
        $[5] = t4;
    } else {
        t4 = $[5];
    }
    return t4;
}
_c8 = NotFound;
function _NotFoundGoBack() {
    return window.history.back();
}
function _NotFoundGoHome() {
    return window.location.href = "/";
}
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "PageWrapper");
__turbopack_context__.k.register(_c1, "Content");
__turbopack_context__.k.register(_c2, "Title404");
__turbopack_context__.k.register(_c3, "Subtitle");
__turbopack_context__.k.register(_c4, "Description");
__turbopack_context__.k.register(_c5, "ButtonRow");
__turbopack_context__.k.register(_c6, "Button");
__turbopack_context__.k.register(_c7, "Footer");
__turbopack_context__.k.register(_c8, "NotFound");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=sistema-akaedem-ms_src_ba57be0c._.js.map