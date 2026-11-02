(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/sistema-akaedem-ms/src/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center rounded-full border px-2 py-0.5 text-xs font-medium w-fit whitespace-nowrap shrink-0 [&>svg]:size-3 gap-1 [&>svg]:pointer-events-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive transition-[color,box-shadow] overflow-hidden", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground [a&]:hover:bg-primary/90",
            secondary: "border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90",
            destructive: "border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
            outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(13);
    if ($[0] !== "5e40a1e1d60b0e75e80bd19c2f360b0ae0f0c5c6cd6fa4aa9f6ea52efc052339") {
        for(let $i = 0; $i < 13; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "5e40a1e1d60b0e75e80bd19c2f360b0ae0f0c5c6cd6fa4aa9f6ea52efc052339";
    }
    let className;
    let props;
    let t1;
    let variant;
    if ($[1] !== t0) {
        ({ className, variant, asChild: t1, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
        $[4] = t1;
        $[5] = variant;
    } else {
        className = $[2];
        props = $[3];
        t1 = $[4];
        variant = $[5];
    }
    const asChild = t1 === undefined ? false : t1;
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "span";
    let t2;
    if ($[6] !== className || $[7] !== variant) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className);
        $[6] = className;
        $[7] = variant;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    let t3;
    if ($[9] !== Comp || $[10] !== props || $[11] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
            "data-slot": "badge",
            className: t2,
            ...props
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/badge.tsx",
            lineNumber: 64,
            columnNumber: 10
        }, this);
        $[9] = Comp;
        $[10] = props;
        $[11] = t2;
        $[12] = t3;
    } else {
        t3 = $[12];
    }
    return t3;
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sistema-akaedem-ms/src/components/ui/checkbox.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Checkbox",
    ()=>Checkbox
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/@radix-ui/react-checkbox/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function Checkbox(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "de9b68a389bbbf916aff170fe6bca57ec2367e9edde43ed6ea1e564c5175d614") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "de9b68a389bbbf916aff170fe6bca57ec2367e9edde43ed6ea1e564c5175d614";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("peer border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive size-4 shrink-0 rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Indicator"], {
            "data-slot": "checkbox-indicator",
            className: "grid place-content-center text-current transition-none",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                className: "size-3.5"
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/ui/checkbox.tsx",
                lineNumber: 40,
                columnNumber: 137
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/checkbox.tsx",
            lineNumber: 40,
            columnNumber: 10
        }, this);
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    let t3;
    if ($[7] !== props || $[8] !== t1) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$checkbox$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
            "data-slot": "checkbox",
            className: t1,
            ...props,
            children: t2
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/checkbox.tsx",
            lineNumber: 47,
            columnNumber: 10
        }, this);
        $[7] = props;
        $[8] = t1;
        $[9] = t3;
    } else {
        t3 = $[9];
    }
    return t3;
}
_c = Checkbox;
;
var _c;
__turbopack_context__.k.register(_c, "Checkbox");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sistema-akaedem-ms/src/components/ui/label.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Label",
    ()=>Label
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/@radix-ui/react-label/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
function Label(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "80487155de3819238091a57bcd4b823ff65ef6e3025954fe014de2ca9d4c327d") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "80487155de3819238091a57bcd4b823ff65ef6e3025954fe014de2ca9d4c327d";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$label$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
            "data-slot": "label",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/label.tsx",
            lineNumber: 39,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c = Label;
;
var _c;
__turbopack_context__.k.register(_c, "Label");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sistema-akaedem-ms/src/components/ui/select.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Select",
    ()=>Select,
    "SelectContent",
    ()=>SelectContent,
    "SelectGroup",
    ()=>SelectGroup,
    "SelectItem",
    ()=>SelectItem,
    "SelectLabel",
    ()=>SelectLabel,
    "SelectScrollDownButton",
    ()=>SelectScrollDownButton,
    "SelectScrollUpButton",
    ()=>SelectScrollUpButton,
    "SelectSeparator",
    ()=>SelectSeparator,
    "SelectTrigger",
    ()=>SelectTrigger,
    "SelectValue",
    ()=>SelectValue
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/@radix-ui/react-select/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as CheckIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDownIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/chevron-up.js [app-client] (ecmascript) <export default as ChevronUpIcon>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
;
;
function Select(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "42d8c245e4656998fe3a1272d8bf37e08f0971c38948b53c572c66cd44c81842") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "42d8c245e4656998fe3a1272d8bf37e08f0971c38948b53c572c66cd44c81842";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
            "data-slot": "select",
            ...props
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
            lineNumber: 28,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c = Select;
function SelectGroup(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "42d8c245e4656998fe3a1272d8bf37e08f0971c38948b53c572c66cd44c81842") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "42d8c245e4656998fe3a1272d8bf37e08f0971c38948b53c572c66cd44c81842";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Group"], {
            "data-slot": "select-group",
            ...props
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
            lineNumber: 56,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c1 = SelectGroup;
function SelectValue(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(5);
    if ($[0] !== "42d8c245e4656998fe3a1272d8bf37e08f0971c38948b53c572c66cd44c81842") {
        for(let $i = 0; $i < 5; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "42d8c245e4656998fe3a1272d8bf37e08f0971c38948b53c572c66cd44c81842";
    }
    let props;
    if ($[1] !== t0) {
        ({ ...props } = t0);
        $[1] = t0;
        $[2] = props;
    } else {
        props = $[2];
    }
    let t1;
    if ($[3] !== props) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Value"], {
            "data-slot": "select-value",
            ...props
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
            lineNumber: 84,
            columnNumber: 10
        }, this);
        $[3] = props;
        $[4] = t1;
    } else {
        t1 = $[4];
    }
    return t1;
}
_c2 = SelectValue;
function SelectTrigger(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(14);
    if ($[0] !== "42d8c245e4656998fe3a1272d8bf37e08f0971c38948b53c572c66cd44c81842") {
        for(let $i = 0; $i < 14; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "42d8c245e4656998fe3a1272d8bf37e08f0971c38948b53c572c66cd44c81842";
    }
    let children;
    let className;
    let props;
    let t1;
    if ($[1] !== t0) {
        ({ className, size: t1, children, ...props } = t0);
        $[1] = t0;
        $[2] = children;
        $[3] = className;
        $[4] = props;
        $[5] = t1;
    } else {
        children = $[2];
        className = $[3];
        props = $[4];
        t1 = $[5];
    }
    const size = t1 === undefined ? "default" : t1;
    let t2;
    if ($[6] !== className) {
        t2 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4", className);
        $[6] = className;
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    let t3;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Icon"], {
            asChild: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
                className: "size-4 opacity-50"
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
                lineNumber: 133,
                columnNumber: 47
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
            lineNumber: 133,
            columnNumber: 10
        }, this);
        $[8] = t3;
    } else {
        t3 = $[8];
    }
    let t4;
    if ($[9] !== children || $[10] !== props || $[11] !== size || $[12] !== t2) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Trigger"], {
            "data-slot": "select-trigger",
            "data-size": size,
            className: t2,
            ...props,
            children: [
                children,
                t3
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
            lineNumber: 140,
            columnNumber: 10
        }, this);
        $[9] = children;
        $[10] = props;
        $[11] = size;
        $[12] = t2;
        $[13] = t4;
    } else {
        t4 = $[13];
    }
    return t4;
}
_c3 = SelectTrigger;
function SelectContent(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(23);
    if ($[0] !== "42d8c245e4656998fe3a1272d8bf37e08f0971c38948b53c572c66cd44c81842") {
        for(let $i = 0; $i < 23; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "42d8c245e4656998fe3a1272d8bf37e08f0971c38948b53c572c66cd44c81842";
    }
    let children;
    let className;
    let props;
    let t1;
    let t2;
    if ($[1] !== t0) {
        ({ className, children, position: t1, align: t2, ...props } = t0);
        $[1] = t0;
        $[2] = children;
        $[3] = className;
        $[4] = props;
        $[5] = t1;
        $[6] = t2;
    } else {
        children = $[2];
        className = $[3];
        props = $[4];
        t1 = $[5];
        t2 = $[6];
    }
    const position = t1 === undefined ? "popper" : t1;
    const align = t2 === undefined ? "center" : t2;
    const t3 = position === "popper" && "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1";
    let t4;
    if ($[7] !== className || $[8] !== t3) {
        t4 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-select-content-available-height) min-w-[8rem] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md", t3, className);
        $[7] = className;
        $[8] = t3;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    let t5;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollUpButton, {}, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
            lineNumber: 199,
            columnNumber: 10
        }, this);
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    const t6 = position === "popper" && "h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1";
    let t7;
    if ($[11] !== t6) {
        t7 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-1", t6);
        $[11] = t6;
        $[12] = t7;
    } else {
        t7 = $[12];
    }
    let t8;
    if ($[13] !== children || $[14] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
            className: t7,
            children: children
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
            lineNumber: 215,
            columnNumber: 10
        }, this);
        $[13] = children;
        $[14] = t7;
        $[15] = t8;
    } else {
        t8 = $[15];
    }
    let t9;
    if ($[16] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SelectScrollDownButton, {}, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
            lineNumber: 224,
            columnNumber: 10
        }, this);
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    let t10;
    if ($[17] !== align || $[18] !== position || $[19] !== props || $[20] !== t4 || $[21] !== t8) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Portal"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Content"], {
                "data-slot": "select-content",
                className: t4,
                position: position,
                align: align,
                ...props,
                children: [
                    t5,
                    t8,
                    t9
                ]
            }, void 0, true, {
                fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
                lineNumber: 231,
                columnNumber: 35
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
            lineNumber: 231,
            columnNumber: 11
        }, this);
        $[17] = align;
        $[18] = position;
        $[19] = props;
        $[20] = t4;
        $[21] = t8;
        $[22] = t10;
    } else {
        t10 = $[22];
    }
    return t10;
}
_c4 = SelectContent;
function SelectLabel(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "42d8c245e4656998fe3a1272d8bf37e08f0971c38948b53c572c66cd44c81842") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "42d8c245e4656998fe3a1272d8bf37e08f0971c38948b53c572c66cd44c81842";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground px-2 py-1.5 text-xs", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            "data-slot": "select-label",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
            lineNumber: 275,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c5 = SelectLabel;
function SelectItem(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(14);
    if ($[0] !== "42d8c245e4656998fe3a1272d8bf37e08f0971c38948b53c572c66cd44c81842") {
        for(let $i = 0; $i < 14; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "42d8c245e4656998fe3a1272d8bf37e08f0971c38948b53c572c66cd44c81842";
    }
    let children;
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, children, ...props } = t0);
        $[1] = t0;
        $[2] = children;
        $[3] = className;
        $[4] = props;
    } else {
        children = $[2];
        className = $[3];
        props = $[4];
    }
    let t1;
    if ($[5] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2", className);
        $[5] = className;
        $[6] = t1;
    } else {
        t1 = $[6];
    }
    let t2;
    if ($[7] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "absolute right-2 flex size-3.5 items-center justify-center",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemIndicator"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckIcon$3e$__["CheckIcon"], {
                    className: "size-4"
                }, void 0, false, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
                    lineNumber: 320,
                    columnNumber: 118
                }, this)
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
                lineNumber: 320,
                columnNumber: 87
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
            lineNumber: 320,
            columnNumber: 10
        }, this);
        $[7] = t2;
    } else {
        t2 = $[7];
    }
    let t3;
    if ($[8] !== children) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ItemText"], {
            children: children
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
            lineNumber: 327,
            columnNumber: 10
        }, this);
        $[8] = children;
        $[9] = t3;
    } else {
        t3 = $[9];
    }
    let t4;
    if ($[10] !== props || $[11] !== t1 || $[12] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Item"], {
            "data-slot": "select-item",
            className: t1,
            ...props,
            children: [
                t2,
                t3
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
            lineNumber: 335,
            columnNumber: 10
        }, this);
        $[10] = props;
        $[11] = t1;
        $[12] = t3;
        $[13] = t4;
    } else {
        t4 = $[13];
    }
    return t4;
}
_c6 = SelectItem;
function SelectSeparator(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "42d8c245e4656998fe3a1272d8bf37e08f0971c38948b53c572c66cd44c81842") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "42d8c245e4656998fe3a1272d8bf37e08f0971c38948b53c572c66cd44c81842";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-border pointer-events-none -mx-1 my-1 h-px", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Separator"], {
            "data-slot": "select-separator",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
            lineNumber: 377,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c7 = SelectSeparator;
function SelectScrollUpButton(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "42d8c245e4656998fe3a1272d8bf37e08f0971c38948b53c572c66cd44c81842") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "42d8c245e4656998fe3a1272d8bf37e08f0971c38948b53c572c66cd44c81842";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronUpIcon$3e$__["ChevronUpIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
            lineNumber: 418,
            columnNumber: 10
        }, this);
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    let t3;
    if ($[7] !== props || $[8] !== t1) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollUpButton"], {
            "data-slot": "select-scroll-up-button",
            className: t1,
            ...props,
            children: t2
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
            lineNumber: 425,
            columnNumber: 10
        }, this);
        $[7] = props;
        $[8] = t1;
        $[9] = t3;
    } else {
        t3 = $[9];
    }
    return t3;
}
_c8 = SelectScrollUpButton;
function SelectScrollDownButton(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(10);
    if ($[0] !== "42d8c245e4656998fe3a1272d8bf37e08f0971c38948b53c572c66cd44c81842") {
        for(let $i = 0; $i < 10; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "42d8c245e4656998fe3a1272d8bf37e08f0971c38948b53c572c66cd44c81842";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex cursor-default items-center justify-center py-1", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDownIcon$3e$__["ChevronDownIcon"], {
            className: "size-4"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
            lineNumber: 466,
            columnNumber: 10
        }, this);
        $[6] = t2;
    } else {
        t2 = $[6];
    }
    let t3;
    if ($[7] !== props || $[8] !== t1) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$select$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollDownButton"], {
            "data-slot": "select-scroll-down-button",
            className: t1,
            ...props,
            children: t2
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/select.tsx",
            lineNumber: 473,
            columnNumber: 10
        }, this);
        $[7] = props;
        $[8] = t1;
        $[9] = t3;
    } else {
        t3 = $[9];
    }
    return t3;
}
_c9 = SelectScrollDownButton;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "Select");
__turbopack_context__.k.register(_c1, "SelectGroup");
__turbopack_context__.k.register(_c2, "SelectValue");
__turbopack_context__.k.register(_c3, "SelectTrigger");
__turbopack_context__.k.register(_c4, "SelectContent");
__turbopack_context__.k.register(_c5, "SelectLabel");
__turbopack_context__.k.register(_c6, "SelectItem");
__turbopack_context__.k.register(_c7, "SelectSeparator");
__turbopack_context__.k.register(_c8, "SelectScrollUpButton");
__turbopack_context__.k.register(_c9, "SelectScrollDownButton");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sistema-akaedem-ms/src/components/ui/table.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Table",
    ()=>Table,
    "TableBody",
    ()=>TableBody,
    "TableCaption",
    ()=>TableCaption,
    "TableCell",
    ()=>TableCell,
    "TableFooter",
    ()=>TableFooter,
    "TableHead",
    ()=>TableHead,
    "TableHeader",
    ()=>TableHeader,
    "TableRow",
    ()=>TableRow
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/lib/utils.ts [app-client] (ecmascript)");
"use client";
;
;
;
function Table(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "6b1689ef4b83c1b20469a8b61a9f52fce7fcc007b8a86e04878abd4c52a1d7a0") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6b1689ef4b83c1b20469a8b61a9f52fce7fcc007b8a86e04878abd4c52a1d7a0";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("w-full caption-bottom text-sm", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            "data-slot": "table-container",
            className: "relative w-full overflow-x-auto",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                "data-slot": "table",
                className: t1,
                ...props
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/ui/table.tsx",
                lineNumber: 38,
                columnNumber: 87
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/table.tsx",
            lineNumber: 38,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c = Table;
function TableHeader(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "6b1689ef4b83c1b20469a8b61a9f52fce7fcc007b8a86e04878abd4c52a1d7a0") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6b1689ef4b83c1b20469a8b61a9f52fce7fcc007b8a86e04878abd4c52a1d7a0";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("[&_tr]:border-b", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
            "data-slot": "table-header",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/table.tsx",
            lineNumber: 79,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c1 = TableHeader;
function TableBody(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "6b1689ef4b83c1b20469a8b61a9f52fce7fcc007b8a86e04878abd4c52a1d7a0") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6b1689ef4b83c1b20469a8b61a9f52fce7fcc007b8a86e04878abd4c52a1d7a0";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("[&_tr:last-child]:border-0", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
            "data-slot": "table-body",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/table.tsx",
            lineNumber: 120,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c2 = TableBody;
function TableFooter(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "6b1689ef4b83c1b20469a8b61a9f52fce7fcc007b8a86e04878abd4c52a1d7a0") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6b1689ef4b83c1b20469a8b61a9f52fce7fcc007b8a86e04878abd4c52a1d7a0";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("bg-muted/50 border-t font-medium [&>tr]:last:border-b-0", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tfoot", {
            "data-slot": "table-footer",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/table.tsx",
            lineNumber: 161,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c3 = TableFooter;
function TableRow(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "6b1689ef4b83c1b20469a8b61a9f52fce7fcc007b8a86e04878abd4c52a1d7a0") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6b1689ef4b83c1b20469a8b61a9f52fce7fcc007b8a86e04878abd4c52a1d7a0";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
            "data-slot": "table-row",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/table.tsx",
            lineNumber: 202,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c4 = TableRow;
function TableHead(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "6b1689ef4b83c1b20469a8b61a9f52fce7fcc007b8a86e04878abd4c52a1d7a0") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6b1689ef4b83c1b20469a8b61a9f52fce7fcc007b8a86e04878abd4c52a1d7a0";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
            "data-slot": "table-head",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/table.tsx",
            lineNumber: 243,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c5 = TableHead;
function TableCell(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "6b1689ef4b83c1b20469a8b61a9f52fce7fcc007b8a86e04878abd4c52a1d7a0") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6b1689ef4b83c1b20469a8b61a9f52fce7fcc007b8a86e04878abd4c52a1d7a0";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
            "data-slot": "table-cell",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/table.tsx",
            lineNumber: 284,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c6 = TableCell;
function TableCaption(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(9);
    if ($[0] !== "6b1689ef4b83c1b20469a8b61a9f52fce7fcc007b8a86e04878abd4c52a1d7a0") {
        for(let $i = 0; $i < 9; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6b1689ef4b83c1b20469a8b61a9f52fce7fcc007b8a86e04878abd4c52a1d7a0";
    }
    let className;
    let props;
    if ($[1] !== t0) {
        ({ className, ...props } = t0);
        $[1] = t0;
        $[2] = className;
        $[3] = props;
    } else {
        className = $[2];
        props = $[3];
    }
    let t1;
    if ($[4] !== className) {
        t1 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-muted-foreground mt-4 text-sm", className);
        $[4] = className;
        $[5] = t1;
    } else {
        t1 = $[5];
    }
    let t2;
    if ($[6] !== props || $[7] !== t1) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("caption", {
            "data-slot": "table-caption",
            className: t1,
            ...props
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/ui/table.tsx",
            lineNumber: 325,
            columnNumber: 10
        }, this);
        $[6] = props;
        $[7] = t1;
        $[8] = t2;
    } else {
        t2 = $[8];
    }
    return t2;
}
_c7 = TableCaption;
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7;
__turbopack_context__.k.register(_c, "Table");
__turbopack_context__.k.register(_c1, "TableHeader");
__turbopack_context__.k.register(_c2, "TableBody");
__turbopack_context__.k.register(_c3, "TableFooter");
__turbopack_context__.k.register(_c4, "TableRow");
__turbopack_context__.k.register(_c5, "TableHead");
__turbopack_context__.k.register(_c6, "TableCell");
__turbopack_context__.k.register(_c7, "TableCaption");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sistema-akaedem-ms/src/components/data-table.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "DynamicDocentesTable",
    ()=>DynamicDocentesTable,
    "default",
    ()=>DynamicTable,
    "docentesSchema",
    ()=>docentesSchema,
    "schema",
    ()=>schema
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/@dnd-kit/core/dist/core.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$modifiers$2f$dist$2f$modifiers$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/@dnd-kit/modifiers/dist/modifiers.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/@dnd-kit/sortable/dist/sortable.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/@dnd-kit/utilities/dist/utilities.esm.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/@tanstack/react-table/build/lib/index.mjs [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/@tanstack/table-core/build/lib/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/circle-check-big.js [app-client] (ecmascript) <export default as CheckCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/chevron-left.js [app-client] (ecmascript) <export default as ChevronLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsLeft$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/chevrons-left.js [app-client] (ecmascript) <export default as ChevronsLeft>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsRight$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/chevrons-right.js [app-client] (ecmascript) <export default as ChevronsRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$columns$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Columns$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/columns-2.js [app-client] (ecmascript) <export default as Columns>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/grip-vertical.js [app-client] (ecmascript) <export default as GripVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/ellipsis-vertical.js [app-client] (ecmascript) <export default as MoreVertical>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/plus.js [app-client] (ecmascript) <export default as Plus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/circle-x.js [app-client] (ecmascript) <export default as XCircle>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/zod/v4/classic/external.js [app-client] (ecmascript) <export * as z>");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/components/ui/checkbox.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/components/ui/dropdown-menu.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/components/ui/label.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/components/ui/sheet.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/components/ui/table.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature(), _s5 = __turbopack_context__.k.signature(), _s6 = __turbopack_context__.k.signature(), _s7 = __turbopack_context__.k.signature(), _s8 = __turbopack_context__.k.signature(), _s9 = __turbopack_context__.k.signature(), _s10 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const schema = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    photo: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    enrollmentNumber: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    course: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    class: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    enrollmentDate: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
});
function DragHandle(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "7a207b2878bf145b8b2a7d62cede4d8c9d09d03c82eeb3f3f485678f9e6bfa48") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "7a207b2878bf145b8b2a7d62cede4d8c9d09d03c82eeb3f3f485678f9e6bfa48";
    }
    const { id } = t0;
    let t1;
    if ($[1] !== id) {
        t1 = {
            id
        };
        $[1] = id;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const { attributes, listeners } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"])(t1);
    let t2;
    let t3;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$grip$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__GripVertical$3e$__["GripVertical"], {
            className: "size-3 text-muted-foreground"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 88,
            columnNumber: 10
        }, this);
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "sr-only",
            children: "Arrastar para reordenar"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 89,
            columnNumber: 10
        }, this);
        $[3] = t2;
        $[4] = t3;
    } else {
        t2 = $[3];
        t3 = $[4];
    }
    let t4;
    if ($[5] !== attributes || $[6] !== listeners) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            ...attributes,
            ...listeners,
            variant: "ghost",
            size: "icon",
            className: "size-7 text-muted-foreground hover:bg-transparent",
            children: [
                t2,
                t3
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 98,
            columnNumber: 10
        }, this);
        $[5] = attributes;
        $[6] = listeners;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    return t4;
}
_s(DragHandle, "mIDXOWwk3wEB4Pq4LRV+KGWo41Y=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"]
    ];
});
_c = DragHandle;
function StudentViewerSheet({ item, open, onOpenChange, initialEditMode = false, fieldLabels = {}, onSave }) {
    _s1();
    const [isEditing, setIsEditing] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](initialEditMode);
    const [formData, setFormData] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        class: item.class || '',
        student_phone: item.phone || '',
        student_name: item.name || '',
        student_email: item.email || ''
    });
    const [saving, setSaving] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"]({
        "StudentViewerSheet.useEffect": ()=>{
            setIsEditing(initialEditMode);
            setFormData({
                class: item.class || '',
                student_phone: item.phone || '',
                student_name: item.name || '',
                student_email: item.email || ''
            });
        }
    }["StudentViewerSheet.useEffect"], [
        initialEditMode,
        open,
        item
    ]);
    const labels = {
        name: fieldLabels?.name || "Nome Completo",
        enrollmentNumber: fieldLabels?.enrollmentNumber || "Número de Candidatura",
        course: fieldLabels?.course || "Curso",
        class: fieldLabels?.class || "Turma",
        enrollmentDate: fieldLabels?.enrollmentDate || "Data de Candidatura",
        status: fieldLabels?.status || "Estado",
        phone: fieldLabels?.phone || "Telefone",
        email: fieldLabels?.email || "Email"
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sheet"], {
        open: open,
        onOpenChange: onOpenChange,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetContent"], {
            side: "right",
            className: "flex w-full flex-col sm:max-w-lg",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetHeader"], {
                    className: "gap-3 pb-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTitle"], {
                                children: isEditing ? "Editar Registro" : "Detalhes do Registro"
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 153,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetDescription"], {
                                className: "mt-1.5",
                                children: isEditing ? "Editar informações" : "Informações completas"
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 154,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                        lineNumber: 152,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 151,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-1 flex-col gap-6 overflow-y-auto py-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "relative size-20 overflow-hidden rounded-full bg-muted",
                                    children: item.photo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                        src: item.photo,
                                        alt: item.name,
                                        className: "size-full object-cover"
                                    }, void 0, false, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 162,
                                        columnNumber: 29
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex size-full items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                            className: "size-8 text-muted-foreground"
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 163,
                                            columnNumber: 19
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 162,
                                        columnNumber: 107
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 161,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            className: "text-lg font-semibold",
                                            children: item.name
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 167,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm text-muted-foreground",
                                            children: item.enrollmentNumber
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 168,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 166,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 160,
                            columnNumber: 11
                        }, this),
                        isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "name",
                                            children: labels.name
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 173,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "name",
                                            value: formData.student_name,
                                            onChange: (e)=>setFormData({
                                                    ...formData,
                                                    student_name: e.target.value
                                                })
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 174,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 172,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "enrollment",
                                            children: labels.enrollmentNumber
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 180,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "enrollment",
                                            value: item.enrollmentNumber,
                                            readOnly: true
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 181,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 179,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: "course",
                                                    children: labels.course
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 185,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    id: "course",
                                                    value: item.course,
                                                    readOnly: true
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 184,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-3",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    htmlFor: "class",
                                                    children: labels.class
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                    id: "class",
                                                    value: formData.class,
                                                    onChange: (e_0)=>setFormData({
                                                            ...formData,
                                                            class: e_0.target.value
                                                        }),
                                                    placeholder: "Ex: EI-3A"
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 190,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 188,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 183,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "phone",
                                            children: labels.phone
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 197,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "phone",
                                            type: "tel",
                                            value: formData.student_phone,
                                            onChange: (e_1)=>setFormData({
                                                    ...formData,
                                                    student_phone: e_1.target.value
                                                }),
                                            placeholder: "+244 923 456 789"
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 198,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 196,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            htmlFor: "email",
                                            children: labels.email
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 204,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                            id: "email",
                                            type: "email",
                                            value: formData.student_email,
                                            onChange: (e_2)=>setFormData({
                                                    ...formData,
                                                    student_email: e_2.target.value
                                                }),
                                            placeholder: "estudante@email.com"
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 205,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 203,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 171,
                            columnNumber: 24
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            className: "text-xs text-muted-foreground",
                                            children: labels.name
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 212,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm",
                                            children: item.name
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 213,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 211,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            className: "text-xs text-muted-foreground",
                                            children: labels.enrollmentNumber
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 216,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "font-mono text-sm",
                                            children: item.enrollmentNumber
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 217,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 215,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-xs text-muted-foreground",
                                                    children: labels.course
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 221,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm",
                                                    children: item.course
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 222,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 220,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-xs text-muted-foreground",
                                                    children: labels.class
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 225,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: "outline",
                                                    className: "w-fit px-2 font-mono",
                                                    children: item.class
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 224,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 219,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid grid-cols-2 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-xs text-muted-foreground",
                                                    children: labels.enrollmentDate
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 231,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                    className: "text-sm",
                                                    children: new Date(item.enrollmentDate).toLocaleDateString('pt-PT', {
                                                        day: '2-digit',
                                                        month: 'long',
                                                        year: 'numeric'
                                                    })
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 232,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 230,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex flex-col gap-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                                    className: "text-xs text-muted-foreground",
                                                    children: labels.status
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 241,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                    variant: item.status === "Ativa" ? "default" : "secondary",
                                                    className: "flex w-fit gap-1 px-2",
                                                    children: [
                                                        item.status === "Ativa" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                            className: "size-3"
                                                        }, void 0, false, {
                                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                            lineNumber: 243,
                                                            columnNumber: 49
                                                        }, this),
                                                        item.status
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 242,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 240,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 229,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            className: "text-xs text-muted-foreground",
                                            children: labels.phone
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 249,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm",
                                            children: item.phone
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 250,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 248,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex flex-col gap-2",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                            className: "text-xs text-muted-foreground",
                                            children: labels.email
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 253,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "text-sm",
                                            children: item.email
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 254,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 252,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 210,
                            columnNumber: 22
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 159,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetFooter"], {
                    className: "mt-auto flex gap-2 pt-4 sm:flex-col sm:space-x-0",
                    children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                className: "w-full",
                                onClick: async ()=>{
                                    if (onSave) {
                                        setSaving(true);
                                        try {
                                            await onSave(item, formData);
                                            setIsEditing(false);
                                        } catch (error) {
                                        // Erro já é tratado na função onSave
                                        } finally{
                                            setSaving(false);
                                        }
                                    } else {
                                        setIsEditing(false);
                                    }
                                },
                                disabled: saving,
                                children: saving ? 'A guardar...' : 'Guardar Alterações'
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 260,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                className: "w-full",
                                onClick: ()=>{
                                    setIsEditing(false);
                                    setFormData({
                                        class: item.class || '',
                                        student_phone: item.phone || '',
                                        student_name: item.name || '',
                                        student_email: item.email || ''
                                    });
                                },
                                disabled: saving,
                                children: "Cancelar"
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 277,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                className: "w-full",
                                onClick: ()=>setIsEditing(true),
                                children: "Editar"
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 289,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetClose"], {
                                asChild: true,
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                    className: "w-full",
                                    children: "Fechar"
                                }, void 0, false, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 293,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 292,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true)
                }, void 0, false, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 258,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 150,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
        lineNumber: 149,
        columnNumber: 10
    }, this);
}
_s1(StudentViewerSheet, "TX7Wu66X2RTZ/8SvffYUCtcnDoY=");
_c1 = StudentViewerSheet;
function StudentViewer(t0) {
    _s2();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(22);
    if ($[0] !== "7a207b2878bf145b8b2a7d62cede4d8c9d09d03c82eeb3f3f485678f9e6bfa48") {
        for(let $i = 0; $i < 22; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "7a207b2878bf145b8b2a7d62cede4d8c9d09d03c82eeb3f3f485678f9e6bfa48";
    }
    const { item, fieldLabels } = t0;
    const [open, setOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "StudentViewer[<Button>.onClick]": ()=>setOpen(true)
        })["StudentViewer[<Button>.onClick]"];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== item.name || $[3] !== item.photo) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative size-10 overflow-hidden rounded-full bg-muted",
            children: item.photo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: item.photo,
                alt: item.name,
                className: "size-full object-cover"
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 324,
                columnNumber: 96
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex size-full items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                    className: "size-5 text-muted-foreground"
                }, void 0, false, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 324,
                    columnNumber: 234
                }, this)
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 324,
                columnNumber: 174
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 324,
            columnNumber: 10
        }, this);
        $[2] = item.name;
        $[3] = item.photo;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== item.name) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "font-medium",
            children: item.name
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 333,
            columnNumber: 10
        }, this);
        $[5] = item.name;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] !== item.enrollmentNumber) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-muted-foreground",
            children: item.enrollmentNumber
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 341,
            columnNumber: 10
        }, this);
        $[7] = item.enrollmentNumber;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    if ($[9] !== t3 || $[10] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-left",
            children: [
                t3,
                t4
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 349,
            columnNumber: 10
        }, this);
        $[9] = t3;
        $[10] = t4;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    let t6;
    if ($[12] !== t2 || $[13] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "ghost",
            className: "flex w-fit items-center gap-3 px-2",
            onClick: t1,
            children: [
                t2,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 358,
            columnNumber: 10
        }, this);
        $[12] = t2;
        $[13] = t5;
        $[14] = t6;
    } else {
        t6 = $[14];
    }
    let t7;
    if ($[15] !== fieldLabels || $[16] !== item || $[17] !== open) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StudentViewerSheet, {
            item: item,
            fieldLabels: fieldLabels,
            open: open,
            onOpenChange: setOpen
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 367,
            columnNumber: 10
        }, this);
        $[15] = fieldLabels;
        $[16] = item;
        $[17] = open;
        $[18] = t7;
    } else {
        t7 = $[18];
    }
    let t8;
    if ($[19] !== t6 || $[20] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                t6,
                t7
            ]
        }, void 0, true);
        $[19] = t6;
        $[20] = t7;
        $[21] = t8;
    } else {
        t8 = $[21];
    }
    return t8;
}
_s2(StudentViewer, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c2 = StudentViewer;
function DraggableRow(t0) {
    _s3();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(18);
    if ($[0] !== "7a207b2878bf145b8b2a7d62cede4d8c9d09d03c82eeb3f3f485678f9e6bfa48") {
        for(let $i = 0; $i < 18; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "7a207b2878bf145b8b2a7d62cede4d8c9d09d03c82eeb3f3f485678f9e6bfa48";
    }
    const { row } = t0;
    let t1;
    if ($[1] !== row.original.id) {
        t1 = {
            id: row.original.id
        };
        $[1] = row.original.id;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const { transform, transition, setNodeRef, isDragging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"])(t1);
    let t2;
    if ($[3] !== row) {
        t2 = row.getIsSelected() && "selected";
        $[3] = row;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== transform) {
        t3 = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSS"].Transform.toString(transform);
        $[5] = transform;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] !== t3 || $[8] !== transition) {
        t4 = {
            transform: t3,
            transition
        };
        $[7] = t3;
        $[8] = transition;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    let t5;
    if ($[10] !== row) {
        t5 = row.getVisibleCells().map(_DraggableRowAnonymous);
        $[10] = row;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    let t6;
    if ($[12] !== isDragging || $[13] !== setNodeRef || $[14] !== t2 || $[15] !== t4 || $[16] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
            "data-state": t2,
            "data-dragging": isDragging,
            ref: setNodeRef,
            className: "relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80",
            style: t4,
            children: t5
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 451,
            columnNumber: 10
        }, this);
        $[12] = isDragging;
        $[13] = setNodeRef;
        $[14] = t2;
        $[15] = t4;
        $[16] = t5;
        $[17] = t6;
    } else {
        t6 = $[17];
    }
    return t6;
}
_s3(DraggableRow, "fb4uIuBajdyi+YzaiH8csjH7Iq4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"]
    ];
});
_c3 = DraggableRow;
function _DraggableRowAnonymous(cell) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(cell.column.columnDef.cell, cell.getContext())
    }, cell.id, false, {
        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
        lineNumber: 464,
        columnNumber: 10
    }, this);
}
function NewRecordSheet(t0) {
    _s4();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(90);
    if ($[0] !== "7a207b2878bf145b8b2a7d62cede4d8c9d09d03c82eeb3f3f485678f9e6bfa48") {
        for(let $i = 0; $i < 90; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "7a207b2878bf145b8b2a7d62cede4d8c9d09d03c82eeb3f3f485678f9e6bfa48";
    }
    const { buttonText, fieldLabels: t1, onSave } = t0;
    let t2;
    if ($[1] !== t1) {
        t2 = t1 === undefined ? {} : t1;
        $[1] = t1;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const fieldLabels = t2;
    const [open, setOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const t3 = fieldLabels?.name || "Nome Completo";
    const t4 = fieldLabels?.enrollmentNumber || "N\xFAmero";
    const t5 = fieldLabels?.course || "Curso";
    const t6 = fieldLabels?.class || "Turma";
    const t7 = fieldLabels?.enrollmentDate || "Data";
    const t8 = fieldLabels?.status || "Estado";
    const t9 = fieldLabels?.phone || "Telefone";
    const t10 = fieldLabels?.email || "Email";
    let t11;
    if ($[3] !== t10 || $[4] !== t3 || $[5] !== t4 || $[6] !== t5 || $[7] !== t6 || $[8] !== t7 || $[9] !== t8 || $[10] !== t9) {
        t11 = {
            name: t3,
            enrollmentNumber: t4,
            course: t5,
            class: t6,
            enrollmentDate: t7,
            status: t8,
            phone: t9,
            email: t10
        };
        $[3] = t10;
        $[4] = t3;
        $[5] = t4;
        $[6] = t5;
        $[7] = t6;
        $[8] = t7;
        $[9] = t8;
        $[10] = t9;
        $[11] = t11;
    } else {
        t11 = $[11];
    }
    const labels = t11;
    let t12;
    if ($[12] !== onSave) {
        t12 = ({
            "NewRecordSheet[handleSave]": ()=>{
                setOpen(false);
                onSave?.({});
            }
        })["NewRecordSheet[handleSave]"];
        $[12] = onSave;
        $[13] = t12;
    } else {
        t12 = $[13];
    }
    const handleSave = t12;
    let t13;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {}, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 538,
            columnNumber: 11
        }, this);
        $[14] = t13;
    } else {
        t13 = $[14];
    }
    let t14;
    if ($[15] !== buttonText) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTrigger"], {
            asChild: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                size: "sm",
                children: [
                    t13,
                    buttonText
                ]
            }, void 0, true, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 545,
                columnNumber: 40
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 545,
            columnNumber: 11
        }, this);
        $[15] = buttonText;
        $[16] = t14;
    } else {
        t14 = $[16];
    }
    let t15;
    if ($[17] !== buttonText) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTitle"], {
            children: buttonText
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 553,
            columnNumber: 11
        }, this);
        $[17] = buttonText;
        $[18] = t15;
    } else {
        t15 = $[18];
    }
    let t16;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetDescription"], {
            className: "mt-1.5",
            children: "Preencha os dados para criar um novo registro"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 561,
            columnNumber: 11
        }, this);
        $[19] = t16;
    } else {
        t16 = $[19];
    }
    let t17;
    if ($[20] !== t15) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetHeader"], {
            className: "gap-3 pb-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    t15,
                    t16
                ]
            }, void 0, true, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 568,
                columnNumber: 47
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 568,
            columnNumber: 11
        }, this);
        $[20] = t15;
        $[21] = t17;
    } else {
        t17 = $[21];
    }
    let t18;
    if ($[22] !== labels.name) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "new-name",
            children: labels.name
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 576,
            columnNumber: 11
        }, this);
        $[22] = labels.name;
        $[23] = t18;
    } else {
        t18 = $[23];
    }
    let t19;
    if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
            id: "new-name",
            placeholder: "Digite o nome completo"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 584,
            columnNumber: 11
        }, this);
        $[24] = t19;
    } else {
        t19 = $[24];
    }
    let t20;
    if ($[25] !== t18) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                t18,
                t19
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 591,
            columnNumber: 11
        }, this);
        $[25] = t18;
        $[26] = t20;
    } else {
        t20 = $[26];
    }
    let t21;
    if ($[27] !== labels.enrollmentNumber) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "new-enrollment",
            children: labels.enrollmentNumber
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 599,
            columnNumber: 11
        }, this);
        $[27] = labels.enrollmentNumber;
        $[28] = t21;
    } else {
        t21 = $[28];
    }
    let t22;
    if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
            id: "new-enrollment",
            placeholder: "Digite o n\xFAmero"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 607,
            columnNumber: 11
        }, this);
        $[29] = t22;
    } else {
        t22 = $[29];
    }
    let t23;
    if ($[30] !== t21) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                t21,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 614,
            columnNumber: 11
        }, this);
        $[30] = t21;
        $[31] = t23;
    } else {
        t23 = $[31];
    }
    let t24;
    if ($[32] !== labels.course) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "new-course",
            children: labels.course
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 622,
            columnNumber: 11
        }, this);
        $[32] = labels.course;
        $[33] = t24;
    } else {
        t24 = $[33];
    }
    let t25;
    if ($[34] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
            id: "new-course",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                placeholder: "Selecione"
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 630,
                columnNumber: 42
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 630,
            columnNumber: 11
        }, this);
        $[34] = t25;
    } else {
        t25 = $[34];
    }
    let t26;
    if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
            children: [
                t25,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Engenharia Inform\xE1tica",
                            children: "Engenharia Informática"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 637,
                            columnNumber: 39
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Gest\xE3o de Empresas",
                            children: "Gestão de Empresas"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 637,
                            columnNumber: 122
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Medicina",
                            children: "Medicina"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 637,
                            columnNumber: 197
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Direito",
                            children: "Direito"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 637,
                            columnNumber: 247
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Arquitectura",
                            children: "Arquitectura"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 637,
                            columnNumber: 295
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Engenharia Civil",
                            children: "Engenharia Civil"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 637,
                            columnNumber: 353
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Psicologia",
                            children: "Psicologia"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 637,
                            columnNumber: 419
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Economia",
                            children: "Economia"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 637,
                            columnNumber: 473
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 637,
                    columnNumber: 24
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 637,
            columnNumber: 11
        }, this);
        $[35] = t26;
    } else {
        t26 = $[35];
    }
    let t27;
    if ($[36] !== t24) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                t24,
                t26
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 644,
            columnNumber: 11
        }, this);
        $[36] = t24;
        $[37] = t27;
    } else {
        t27 = $[37];
    }
    let t28;
    if ($[38] !== labels.class) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "new-class",
            children: labels.class
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 652,
            columnNumber: 11
        }, this);
        $[38] = labels.class;
        $[39] = t28;
    } else {
        t28 = $[39];
    }
    let t29;
    if ($[40] === Symbol.for("react.memo_cache_sentinel")) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
            id: "new-class",
            placeholder: "Ex: EI-3A"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 660,
            columnNumber: 11
        }, this);
        $[40] = t29;
    } else {
        t29 = $[40];
    }
    let t30;
    if ($[41] !== t28) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                t28,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 667,
            columnNumber: 11
        }, this);
        $[41] = t28;
        $[42] = t30;
    } else {
        t30 = $[42];
    }
    let t31;
    if ($[43] !== t27 || $[44] !== t30) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-4",
            children: [
                t27,
                t30
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 675,
            columnNumber: 11
        }, this);
        $[43] = t27;
        $[44] = t30;
        $[45] = t31;
    } else {
        t31 = $[45];
    }
    let t32;
    if ($[46] !== labels.enrollmentDate) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "new-date",
            children: labels.enrollmentDate
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 684,
            columnNumber: 11
        }, this);
        $[46] = labels.enrollmentDate;
        $[47] = t32;
    } else {
        t32 = $[47];
    }
    let t33;
    if ($[48] === Symbol.for("react.memo_cache_sentinel")) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
            id: "new-date",
            type: "date"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 692,
            columnNumber: 11
        }, this);
        $[48] = t33;
    } else {
        t33 = $[48];
    }
    let t34;
    if ($[49] !== t32) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                t32,
                t33
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 699,
            columnNumber: 11
        }, this);
        $[49] = t32;
        $[50] = t34;
    } else {
        t34 = $[50];
    }
    let t35;
    if ($[51] !== labels.status) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "new-status",
            children: labels.status
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 707,
            columnNumber: 11
        }, this);
        $[51] = labels.status;
        $[52] = t35;
    } else {
        t35 = $[52];
    }
    let t36;
    if ($[53] === Symbol.for("react.memo_cache_sentinel")) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
            id: "new-status",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 715,
                columnNumber: 42
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 715,
            columnNumber: 11
        }, this);
        $[53] = t36;
    } else {
        t36 = $[53];
    }
    let t37;
    if ($[54] === Symbol.for("react.memo_cache_sentinel")) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
            defaultValue: "Pendente",
            children: [
                t36,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Ativa",
                            children: "Ativa"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 722,
                            columnNumber: 63
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Pendente",
                            children: "Pendente"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 722,
                            columnNumber: 107
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Suspensa",
                            children: "Suspensa"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 722,
                            columnNumber: 157
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Cancelada",
                            children: "Cancelada"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 722,
                            columnNumber: 207
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 722,
                    columnNumber: 48
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 722,
            columnNumber: 11
        }, this);
        $[54] = t37;
    } else {
        t37 = $[54];
    }
    let t38;
    if ($[55] !== t35) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                t35,
                t37
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 729,
            columnNumber: 11
        }, this);
        $[55] = t35;
        $[56] = t38;
    } else {
        t38 = $[56];
    }
    let t39;
    if ($[57] !== t34 || $[58] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-4",
            children: [
                t34,
                t38
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 737,
            columnNumber: 11
        }, this);
        $[57] = t34;
        $[58] = t38;
        $[59] = t39;
    } else {
        t39 = $[59];
    }
    let t40;
    if ($[60] !== labels.phone) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "new-phone",
            children: labels.phone
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 746,
            columnNumber: 11
        }, this);
        $[60] = labels.phone;
        $[61] = t40;
    } else {
        t40 = $[61];
    }
    let t41;
    if ($[62] === Symbol.for("react.memo_cache_sentinel")) {
        t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
            id: "new-phone",
            type: "tel",
            placeholder: "+244 923 456 789"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 754,
            columnNumber: 11
        }, this);
        $[62] = t41;
    } else {
        t41 = $[62];
    }
    let t42;
    if ($[63] !== t40) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                t40,
                t41
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 761,
            columnNumber: 11
        }, this);
        $[63] = t40;
        $[64] = t42;
    } else {
        t42 = $[64];
    }
    let t43;
    if ($[65] !== labels.email) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "new-email",
            children: labels.email
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 769,
            columnNumber: 11
        }, this);
        $[65] = labels.email;
        $[66] = t43;
    } else {
        t43 = $[66];
    }
    let t44;
    if ($[67] === Symbol.for("react.memo_cache_sentinel")) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
            id: "new-email",
            type: "email",
            placeholder: "email@exemplo.com"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 777,
            columnNumber: 11
        }, this);
        $[67] = t44;
    } else {
        t44 = $[67];
    }
    let t45;
    if ($[68] !== t43) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                t43,
                t44
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 784,
            columnNumber: 11
        }, this);
        $[68] = t43;
        $[69] = t45;
    } else {
        t45 = $[69];
    }
    let t46;
    if ($[70] !== t20 || $[71] !== t23 || $[72] !== t31 || $[73] !== t39 || $[74] !== t42 || $[75] !== t45) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-1 flex-col gap-6 overflow-y-auto py-2",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4",
                children: [
                    t20,
                    t23,
                    t31,
                    t39,
                    t42,
                    t45
                ]
            }, void 0, true, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 792,
                columnNumber: 76
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 792,
            columnNumber: 11
        }, this);
        $[70] = t20;
        $[71] = t23;
        $[72] = t31;
        $[73] = t39;
        $[74] = t42;
        $[75] = t45;
        $[76] = t46;
    } else {
        t46 = $[76];
    }
    let t47;
    if ($[77] !== handleSave) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            className: "w-full",
            onClick: handleSave,
            children: "Criar Registro"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 805,
            columnNumber: 11
        }, this);
        $[77] = handleSave;
        $[78] = t47;
    } else {
        t47 = $[78];
    }
    let t48;
    if ($[79] === Symbol.for("react.memo_cache_sentinel")) {
        t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetClose"], {
            asChild: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "outline",
                className: "w-full",
                children: "Cancelar"
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 813,
                columnNumber: 38
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 813,
            columnNumber: 11
        }, this);
        $[79] = t48;
    } else {
        t48 = $[79];
    }
    let t49;
    if ($[80] !== t47) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetFooter"], {
            className: "mt-auto flex gap-2 pt-4 sm:flex-col sm:space-x-0",
            children: [
                t47,
                t48
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 820,
            columnNumber: 11
        }, this);
        $[80] = t47;
        $[81] = t49;
    } else {
        t49 = $[81];
    }
    let t50;
    if ($[82] !== t17 || $[83] !== t46 || $[84] !== t49) {
        t50 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetContent"], {
            side: "right",
            className: "flex w-full flex-col sm:max-w-lg",
            children: [
                t17,
                t46,
                t49
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 828,
            columnNumber: 11
        }, this);
        $[82] = t17;
        $[83] = t46;
        $[84] = t49;
        $[85] = t50;
    } else {
        t50 = $[85];
    }
    let t51;
    if ($[86] !== open || $[87] !== t14 || $[88] !== t50) {
        t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sheet"], {
            open: open,
            onOpenChange: setOpen,
            children: [
                t14,
                t50
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 838,
            columnNumber: 11
        }, this);
        $[86] = open;
        $[87] = t14;
        $[88] = t50;
        $[89] = t51;
    } else {
        t51 = $[89];
    }
    return t51;
}
_s4(NewRecordSheet, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c4 = NewRecordSheet;
function DynamicTable({ title, description, addButtonText, searchPlaceholder = "Buscar por nome...", data: initialData, onAddNew, onSave, onApprove, onReject, fieldLabels = {} }) {
    _s5();
    var _s = __turbopack_context__.k.signature();
    const [data, setData] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "DynamicTable.useState": ()=>initialData
    }["DynamicTable.useState"]);
    const [rowSelection, setRowSelection] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({});
    const [columnVisibility, setColumnVisibility] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({});
    const [columnFilters, setColumnFilters] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [sorting, setSorting] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [pagination, setPagination] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        pageIndex: 0,
        pageSize: 10
    });
    const sortableId = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]();
    const sensors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MouseSensor"], {}), (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TouchSensor"], {}), (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyboardSensor"], {}));
    const dataIds = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "DynamicTable.useMemo[dataIds]": ()=>data?.map({
                "DynamicTable.useMemo[dataIds]": ({ id })=>id
            }["DynamicTable.useMemo[dataIds]"]) || []
    }["DynamicTable.useMemo[dataIds]"], [
        data
    ]);
    const columns = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "DynamicTable.useMemo[columns]": ()=>[
                {
                    id: "drag",
                    header: {
                        "DynamicTable.useMemo[columns]": ()=>null
                    }["DynamicTable.useMemo[columns]"],
                    cell: {
                        "DynamicTable.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DragHandle, {
                                id: row.original.id
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 879,
                                columnNumber: 11
                            }, this)
                    }["DynamicTable.useMemo[columns]"]
                },
                {
                    id: "select",
                    header: {
                        "DynamicTable.useMemo[columns]": ({ table })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                checked: table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected() && "indeterminate",
                                onCheckedChange: {
                                    "DynamicTable.useMemo[columns]": (value)=>table.toggleAllPageRowsSelected(!!value)
                                }["DynamicTable.useMemo[columns]"],
                                "aria-label": "Selecionar todos"
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 884,
                                columnNumber: 11
                            }, this)
                    }["DynamicTable.useMemo[columns]"],
                    cell: {
                        "DynamicTable.useMemo[columns]": ({ row: row_0 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                checked: row_0.getIsSelected(),
                                onCheckedChange: {
                                    "DynamicTable.useMemo[columns]": (value_0)=>row_0.toggleSelected(!!value_0)
                                }["DynamicTable.useMemo[columns]"],
                                "aria-label": "Selecionar linha"
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 887,
                                columnNumber: 11
                            }, this)
                    }["DynamicTable.useMemo[columns]"],
                    enableSorting: false,
                    enableHiding: false
                },
                {
                    accessorKey: "student",
                    header: fieldLabels?.name || "Estudante",
                    cell: {
                        "DynamicTable.useMemo[columns]": ({ row: row_1 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StudentViewer, {
                                item: row_1.original,
                                fieldLabels: fieldLabels
                            }, `view-${row_1.original.id}`, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 895,
                                columnNumber: 11
                            }, this)
                    }["DynamicTable.useMemo[columns]"],
                    enableHiding: false
                },
                {
                    accessorKey: "enrollmentNumber",
                    header: fieldLabels?.enrollmentNumber || "Nº Candidatura",
                    cell: {
                        "DynamicTable.useMemo[columns]": ({ row: row_2 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-sm",
                                children: row_2.original.enrollmentNumber
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 902,
                                columnNumber: 11
                            }, this)
                    }["DynamicTable.useMemo[columns]"]
                },
                {
                    accessorKey: "course",
                    header: fieldLabels?.course || "Curso",
                    cell: {
                        "DynamicTable.useMemo[columns]": ({ row: row_3 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-[200px] truncate",
                                children: row_3.original.course
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 908,
                                columnNumber: 11
                            }, this)
                    }["DynamicTable.useMemo[columns]"]
                },
                {
                    accessorKey: "class",
                    header: fieldLabels?.class || "Turma",
                    cell: {
                        "DynamicTable.useMemo[columns]": ({ row: row_4 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "outline",
                                className: "px-2 font-mono",
                                children: row_4.original.class
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 914,
                                columnNumber: 11
                            }, this)
                    }["DynamicTable.useMemo[columns]"]
                },
                {
                    accessorKey: "enrollmentDate",
                    header: fieldLabels?.enrollmentDate || "Data",
                    cell: {
                        "DynamicTable.useMemo[columns]": ({ row: row_5 })=>{
                            const date = new Date(row_5.original.enrollmentDate);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm",
                                children: date.toLocaleDateString('pt-PT', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                })
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 922,
                                columnNumber: 14
                            }, this);
                        }
                    }["DynamicTable.useMemo[columns]"]
                },
                {
                    accessorKey: "status",
                    header: fieldLabels?.status || "Estado",
                    cell: {
                        "DynamicTable.useMemo[columns]": ({ row: row_6 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: row_6.original.status === "Ativa" ? "default" : "secondary",
                                className: "flex w-fit gap-1 px-2",
                                children: [
                                    row_6.original.status === "Ativa" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                        className: "size-3"
                                    }, void 0, false, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 936,
                                        columnNumber: 49
                                    }, this),
                                    row_6.original.status
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 935,
                                columnNumber: 11
                            }, this)
                    }["DynamicTable.useMemo[columns]"]
                },
                {
                    id: "actions",
                    cell: _s({
                        "DynamicTable.useMemo[columns]": ({ row: row_7 })=>{
                            _s();
                            const [sheetOpen, setSheetOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
                            const [editMode, setEditMode] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
                            const item = row_7.original;
                            const isPending = item.status === 'Pendente';
                            const hasApproveAction = onApprove && isPending;
                            const hasRejectAction = onReject && isPending;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                                asChild: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    className: "flex size-8 text-muted-foreground data-[state=open]:bg-muted",
                                                    size: "icon",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__["MoreVertical"], {}, void 0, false, {
                                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                            lineNumber: 954,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "sr-only",
                                                            children: "Abrir menu"
                                                        }, void 0, false, {
                                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                            lineNumber: 955,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 953,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 952,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                                align: "end",
                                                className: "w-40",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                        onClick: {
                                                            "DynamicTable.useMemo[columns]": ()=>{
                                                                setEditMode(false);
                                                                setSheetOpen(true);
                                                            }
                                                        }["DynamicTable.useMemo[columns]"],
                                                        children: "Ver detalhes"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                        lineNumber: 959,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                        onClick: {
                                                            "DynamicTable.useMemo[columns]": ()=>{
                                                                setEditMode(true);
                                                                setSheetOpen(true);
                                                            }
                                                        }["DynamicTable.useMemo[columns]"],
                                                        children: "Editar"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                        lineNumber: 965,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                        children: "Imprimir ficha"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                        lineNumber: 971,
                                                        columnNumber: 17
                                                    }, this),
                                                    (hasApproveAction || hasRejectAction) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                        lineNumber: 972,
                                                        columnNumber: 59
                                                    }, this),
                                                    hasApproveAction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                        onClick: {
                                                            "DynamicTable.useMemo[columns]": async ()=>{
                                                                if (onApprove) {
                                                                    await onApprove(item);
                                                                }
                                                            }
                                                        }["DynamicTable.useMemo[columns]"],
                                                        className: "text-green-600 focus:text-green-600",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                                                className: "mr-2 h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                                lineNumber: 978,
                                                                columnNumber: 21
                                                            }, this),
                                                            "Aprovar"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                        lineNumber: 973,
                                                        columnNumber: 38
                                                    }, this),
                                                    hasRejectAction && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                        onClick: {
                                                            "DynamicTable.useMemo[columns]": async ()=>{
                                                                if (onReject) {
                                                                    await onReject(item);
                                                                }
                                                            }
                                                        }["DynamicTable.useMemo[columns]"],
                                                        className: "text-destructive focus:text-destructive",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__XCircle$3e$__["XCircle"], {
                                                                className: "mr-2 h-4 w-4"
                                                            }, void 0, false, {
                                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                                lineNumber: 986,
                                                                columnNumber: 21
                                                            }, this),
                                                            "Rejeitar"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                        lineNumber: 981,
                                                        columnNumber: 37
                                                    }, this),
                                                    !isPending && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                        lineNumber: 989,
                                                        columnNumber: 32
                                                    }, this),
                                                    !isPending && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                        className: "text-destructive",
                                                        children: "Cancelar"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                        lineNumber: 990,
                                                        columnNumber: 32
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 958,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 951,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StudentViewerSheet, {
                                        item: row_7.original,
                                        open: sheetOpen,
                                        onOpenChange: setSheetOpen,
                                        initialEditMode: editMode,
                                        fieldLabels: fieldLabels,
                                        onSave: onSave
                                    }, `sheet-${row_7.original.id}-${sheetOpen}`, false, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 993,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true);
                        }
                    }["DynamicTable.useMemo[columns]"], "ttEc9vSxxgay2HmPObG/l0+oEgQ=")
                }
            ]
    }["DynamicTable.useMemo[columns]"], [
        fieldLabels,
        onSave,
        onApprove,
        onReject
    ]);
    const table_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"])({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination
        },
        getRowId: {
            "DynamicTable.useReactTable[table_0]": (row_8)=>row_8.id.toString()
        }["DynamicTable.useReactTable[table_0]"],
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCoreRowModel"])(),
        getFilteredRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFilteredRowModel"])(),
        getPaginationRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaginationRowModel"])(),
        getSortedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSortedRowModel"])(),
        getFacetedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFacetedRowModel"])(),
        getFacetedUniqueValues: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFacetedUniqueValues"])()
    });
    function handleDragEnd(event) {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setData((data_0)=>{
                const oldIndex = dataIds.indexOf(active.id);
                const newIndex = dataIds.indexOf(over.id);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayMove"])(data_0, oldIndex, newIndex);
            });
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen w-full flex-col gap-6 bg-background p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold mt-12",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                        lineNumber: 1036,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                        lineNumber: 1037,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 1035,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex-1 sm:max-w-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 1041,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                placeholder: searchPlaceholder,
                                value: table_0.getColumn("student")?.getFilterValue() ?? "",
                                onChange: (event_0)=>table_0.getColumn("student")?.setFilterValue(event_0.target.value),
                                className: "pl-9"
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 1042,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                        lineNumber: 1040,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            size: "sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$columns$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Columns$3e$__["Columns"], {}, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 1048,
                                                    columnNumber: 17
                                                }, this),
                                                "Colunas",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {}, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 1050,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 1047,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 1046,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                        align: "end",
                                        className: "w-48",
                                        children: table_0.getAllColumns().filter((column)=>typeof column.accessorFn !== "undefined" && column.getCanHide()).map((column_0)=>{
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuCheckboxItem"], {
                                                className: "capitalize",
                                                checked: column_0.getIsVisible(),
                                                onCheckedChange: (value_1)=>column_0.toggleVisibility(!!value_1),
                                                children: column_0.id
                                            }, column_0.id, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 1055,
                                                columnNumber: 22
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 1053,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 1045,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NewRecordSheet, {
                                buttonText: addButtonText,
                                fieldLabels: fieldLabels,
                                onSave: onAddNew
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 1061,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                        lineNumber: 1044,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 1039,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-hidden rounded-lg border",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DndContext"], {
                    collisionDetection: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["closestCenter"],
                    modifiers: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$modifiers$2f$dist$2f$modifiers$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["restrictToVerticalAxis"]
                    ],
                    onDragEnd: handleDragEnd,
                    sensors: sensors,
                    id: sortableId,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                                className: "sticky top-0 z-10 bg-muted",
                                children: table_0.getHeaderGroups().map((headerGroup)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                        children: headerGroup.headers.map((header)=>{
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                colSpan: header.colSpan,
                                                children: header.isPlaceholder ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(header.column.columnDef.header, header.getContext())
                                            }, header.id, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 1070,
                                                columnNumber: 24
                                            }, this);
                                        })
                                    }, headerGroup.id, false, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 1068,
                                        columnNumber: 61
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 1067,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                                children: table_0.getRowModel().rows?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableContext"], {
                                    items: dataIds,
                                    strategy: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verticalListSortingStrategy"],
                                    children: table_0.getRowModel().rows.map((row_9)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DraggableRow, {
                                            row: row_9,
                                            fieldLabels: fieldLabels
                                        }, row_9.id, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 1078,
                                            columnNumber: 60
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 1077,
                                    columnNumber: 53
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                        colSpan: columns.length,
                                        className: "h-24 text-center",
                                        children: "Nenhum resultado encontrado."
                                    }, void 0, false, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 1080,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 1079,
                                    columnNumber: 38
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 1076,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                        lineNumber: 1066,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 1065,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 1064,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 text-sm text-muted-foreground",
                        children: [
                            table_0.getFilteredSelectedRowModel().rows.length,
                            " de ",
                            table_0.getFilteredRowModel().rows.length,
                            " linha(s) selecionada(s)."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                        lineNumber: 1089,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "rows-per-page",
                                        className: "text-sm font-medium",
                                        children: "Linhas por página"
                                    }, void 0, false, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 1094,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: `${table_0.getState().pagination.pageSize}`,
                                        onValueChange: (value_2)=>table_0.setPageSize(Number(value_2)),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                className: "w-20",
                                                id: "rows-per-page",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: table_0.getState().pagination.pageSize
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 1099,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 1098,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                side: "top",
                                                children: [
                                                    10,
                                                    20,
                                                    30,
                                                    40,
                                                    50
                                                ].map((pageSize)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: `${pageSize}`,
                                                        children: pageSize
                                                    }, pageSize, false, {
                                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                        lineNumber: 1102,
                                                        columnNumber: 55
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 1101,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 1097,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 1093,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center text-sm font-medium",
                                children: [
                                    "Página ",
                                    table_0.getState().pagination.pageIndex + 1,
                                    " de ",
                                    table_0.getPageCount()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 1108,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "hidden size-8 sm:flex",
                                        size: "icon",
                                        onClick: ()=>table_0.setPageIndex(0),
                                        disabled: !table_0.getCanPreviousPage(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: "Primeira página"
                                            }, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 1113,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsLeft$3e$__["ChevronsLeft"], {}, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 1114,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 1112,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "icon",
                                        className: "size-8",
                                        onClick: ()=>table_0.previousPage(),
                                        disabled: !table_0.getCanPreviousPage(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: "Página anterior"
                                            }, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 1117,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {}, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 1118,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 1116,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "icon",
                                        className: "size-8",
                                        onClick: ()=>table_0.nextPage(),
                                        disabled: !table_0.getCanNextPage(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: "Próxima página"
                                            }, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 1121,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {}, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 1122,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 1120,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "hidden size-8 sm:flex",
                                        size: "icon",
                                        onClick: ()=>table_0.setPageIndex(table_0.getPageCount() - 1),
                                        disabled: !table_0.getCanNextPage(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: "Última página"
                                            }, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 1125,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsRight$3e$__["ChevronsRight"], {}, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 1126,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 1124,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 1111,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                        lineNumber: 1092,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 1088,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
        lineNumber: 1034,
        columnNumber: 10
    }, this);
}
_s5(DynamicTable, "kPziOGGK0TIl88BDW42ksFcUgVg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"],
        __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"]
    ];
});
_c5 = DynamicTable;
const docentesSchema = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].object({
    id: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].number(),
    photo: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    name: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    employeeNumber: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    department: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    role: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    hireDate: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    status: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    phone: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string(),
    email: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$zod$2f$v4$2f$classic$2f$external$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__$2a$__as__z$3e$__["z"].string()
});
function DocenteViewerSheet(t0) {
    _s6();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(68);
    if ($[0] !== "7a207b2878bf145b8b2a7d62cede4d8c9d09d03c82eeb3f3f485678f9e6bfa48") {
        for(let $i = 0; $i < 68; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "7a207b2878bf145b8b2a7d62cede4d8c9d09d03c82eeb3f3f485678f9e6bfa48";
    }
    const { item, open, onOpenChange, initialEditMode: t1, fieldLabels: t2 } = t0;
    const initialEditMode = t1 === undefined ? false : t1;
    let t3;
    if ($[1] !== t2) {
        t3 = t2 === undefined ? {} : t2;
        $[1] = t2;
        $[2] = t3;
    } else {
        t3 = $[2];
    }
    const fieldLabels = t3;
    const [isEditing, setIsEditing] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](initialEditMode);
    let t4;
    if ($[3] !== initialEditMode) {
        t4 = ({
            "DocenteViewerSheet[useEffect()]": ()=>{
                setIsEditing(initialEditMode);
            }
        })["DocenteViewerSheet[useEffect()]"];
        $[3] = initialEditMode;
        $[4] = t4;
    } else {
        t4 = $[4];
    }
    let t5;
    if ($[5] !== initialEditMode || $[6] !== open) {
        t5 = [
            initialEditMode,
            open
        ];
        $[5] = initialEditMode;
        $[6] = open;
        $[7] = t5;
    } else {
        t5 = $[7];
    }
    __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"](t4, t5);
    const t6 = fieldLabels?.name || "Nome Completo";
    const t7 = fieldLabels?.employeeNumber || "N\xFAmero de Funcion\xE1rio";
    const t8 = fieldLabels?.department || "Departamento";
    const t9 = fieldLabels?.role || "Cargo";
    const t10 = fieldLabels?.hireDate || "Data de Admiss\xE3o";
    const t11 = fieldLabels?.status || "Estado";
    const t12 = fieldLabels?.phone || "Telefone";
    const t13 = fieldLabels?.email || "Email";
    let t14;
    if ($[8] !== t10 || $[9] !== t11 || $[10] !== t12 || $[11] !== t13 || $[12] !== t6 || $[13] !== t7 || $[14] !== t8 || $[15] !== t9) {
        t14 = {
            name: t6,
            employeeNumber: t7,
            department: t8,
            role: t9,
            hireDate: t10,
            status: t11,
            phone: t12,
            email: t13
        };
        $[8] = t10;
        $[9] = t11;
        $[10] = t12;
        $[11] = t13;
        $[12] = t6;
        $[13] = t7;
        $[14] = t8;
        $[15] = t9;
        $[16] = t14;
    } else {
        t14 = $[16];
    }
    const labels = t14;
    const t15 = isEditing ? "Editar Docente" : "Detalhes do Docente";
    let t16;
    if ($[17] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTitle"], {
            children: t15
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1251,
            columnNumber: 11
        }, this);
        $[17] = t15;
        $[18] = t16;
    } else {
        t16 = $[18];
    }
    const t17 = isEditing ? "Editar informa\xE7\xF5es do docente" : "Informa\xE7\xF5es completas do docente";
    let t18;
    if ($[19] !== t17) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetDescription"], {
            className: "mt-1.5",
            children: t17
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1260,
            columnNumber: 11
        }, this);
        $[19] = t17;
        $[20] = t18;
    } else {
        t18 = $[20];
    }
    let t19;
    if ($[21] !== t16 || $[22] !== t18) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetHeader"], {
            className: "gap-3 pb-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    t16,
                    t18
                ]
            }, void 0, true, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 1268,
                columnNumber: 47
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1268,
            columnNumber: 11
        }, this);
        $[21] = t16;
        $[22] = t18;
        $[23] = t19;
    } else {
        t19 = $[23];
    }
    let t20;
    if ($[24] !== item.name || $[25] !== item.photo) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative size-20 overflow-hidden rounded-full bg-muted",
            children: item.photo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: item.photo,
                alt: item.name,
                className: "size-full object-cover"
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 1277,
                columnNumber: 97
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex size-full items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                    className: "size-8 text-muted-foreground"
                }, void 0, false, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 1277,
                    columnNumber: 235
                }, this)
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 1277,
                columnNumber: 175
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1277,
            columnNumber: 11
        }, this);
        $[24] = item.name;
        $[25] = item.photo;
        $[26] = t20;
    } else {
        t20 = $[26];
    }
    let t21;
    if ($[27] !== item.name) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
            className: "text-lg font-semibold",
            children: item.name
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1286,
            columnNumber: 11
        }, this);
        $[27] = item.name;
        $[28] = t21;
    } else {
        t21 = $[28];
    }
    let t22;
    if ($[29] !== item.employeeNumber) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "text-sm text-muted-foreground",
            children: item.employeeNumber
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1294,
            columnNumber: 11
        }, this);
        $[29] = item.employeeNumber;
        $[30] = t22;
    } else {
        t22 = $[30];
    }
    let t23;
    if ($[31] !== t21 || $[32] !== t22) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t21,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1302,
            columnNumber: 11
        }, this);
        $[31] = t21;
        $[32] = t22;
        $[33] = t23;
    } else {
        t23 = $[33];
    }
    let t24;
    if ($[34] !== t20 || $[35] !== t23) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-4",
            children: [
                t20,
                t23
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1311,
            columnNumber: 11
        }, this);
        $[34] = t20;
        $[35] = t23;
        $[36] = t24;
    } else {
        t24 = $[36];
    }
    let t25;
    if ($[37] !== isEditing || $[38] !== item.department || $[39] !== item.email || $[40] !== item.employeeNumber || $[41] !== item.hireDate || $[42] !== item.name || $[43] !== item.phone || $[44] !== item.role || $[45] !== item.status || $[46] !== labels.department || $[47] !== labels.email || $[48] !== labels.employeeNumber || $[49] !== labels.hireDate || $[50] !== labels.name || $[51] !== labels.phone || $[52] !== labels.role || $[53] !== labels.status) {
        t25 = isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                            htmlFor: "name",
                            children: labels.name
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1320,
                            columnNumber: 97
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                            id: "name",
                            defaultValue: item.name
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1320,
                            columnNumber: 140
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 1320,
                    columnNumber: 60
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                            htmlFor: "employee",
                            children: labels.employeeNumber
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1320,
                            columnNumber: 227
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                            id: "employee",
                            defaultValue: item.employeeNumber,
                            readOnly: true
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1320,
                            columnNumber: 284
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 1320,
                    columnNumber: 190
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "department",
                                    children: labels.department
                                }, void 0, false, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 1320,
                                    columnNumber: 441
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                    defaultValue: item.department,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                            id: "department",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 1320,
                                                columnNumber: 566
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 1320,
                                            columnNumber: 535
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "Engenharia Inform\xE1tica",
                                                    children: "Engenharia Informática"
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 1320,
                                                    columnNumber: 612
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "Gest\xE3o de Empresas",
                                                    children: "Gestão de Empresas"
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 1320,
                                                    columnNumber: 695
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "Medicina",
                                                    children: "Medicina"
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 1320,
                                                    columnNumber: 770
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "Direito",
                                                    children: "Direito"
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 1320,
                                                    columnNumber: 820
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "Arquitectura",
                                                    children: "Arquitectura"
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 1320,
                                                    columnNumber: 868
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "Engenharia Civil",
                                                    children: "Engenharia Civil"
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 1320,
                                                    columnNumber: 926
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "Psicologia",
                                                    children: "Psicologia"
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 1320,
                                                    columnNumber: 992
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "Economia",
                                                    children: "Economia"
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 1320,
                                                    columnNumber: 1046
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 1320,
                                            columnNumber: 597
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 1320,
                                    columnNumber: 496
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1320,
                            columnNumber: 404
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "role",
                                    children: labels.role
                                }, void 0, false, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 1320,
                                    columnNumber: 1164
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    id: "role",
                                    defaultValue: item.role
                                }, void 0, false, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 1320,
                                    columnNumber: 1207
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1320,
                            columnNumber: 1127
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 1320,
                    columnNumber: 364
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "date",
                                    children: labels.hireDate
                                }, void 0, false, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 1320,
                                    columnNumber: 1340
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    id: "date",
                                    type: "date",
                                    defaultValue: item.hireDate
                                }, void 0, false, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 1320,
                                    columnNumber: 1387
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1320,
                            columnNumber: 1303
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-3",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    htmlFor: "status",
                                    children: labels.status
                                }, void 0, false, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 1320,
                                    columnNumber: 1490
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                    defaultValue: item.status,
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                            id: "status",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 1320,
                                                columnNumber: 1599
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 1320,
                                            columnNumber: 1572
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "Ativo",
                                                    children: "Ativo"
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 1320,
                                                    columnNumber: 1645
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "Pendente",
                                                    children: "Pendente"
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 1320,
                                                    columnNumber: 1689
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "Inativo",
                                                    children: "Inativo"
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 1320,
                                                    columnNumber: 1739
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                    value: "Aposentado",
                                                    children: "Aposentado"
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 1320,
                                                    columnNumber: 1787
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 1320,
                                            columnNumber: 1630
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 1320,
                                    columnNumber: 1537
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1320,
                            columnNumber: 1453
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 1320,
                    columnNumber: 1263
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                            htmlFor: "phone",
                            children: labels.phone
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1320,
                            columnNumber: 1915
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                            id: "phone",
                            type: "tel",
                            defaultValue: item.phone
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1320,
                            columnNumber: 1960
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 1320,
                    columnNumber: 1878
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-3",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                            htmlFor: "email",
                            children: labels.email
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1320,
                            columnNumber: 2060
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                            id: "email",
                            type: "email",
                            defaultValue: item.email
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1320,
                            columnNumber: 2105
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 1320,
                    columnNumber: 2023
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1320,
            columnNumber: 23
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-4",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                            className: "text-xs text-muted-foreground",
                            children: labels.name
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1320,
                            columnNumber: 2253
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm",
                            children: item.name
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1320,
                            columnNumber: 2323
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 1320,
                    columnNumber: 2216
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                            className: "text-xs text-muted-foreground",
                            children: labels.employeeNumber
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1320,
                            columnNumber: 2404
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-mono text-sm",
                            children: item.employeeNumber
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1320,
                            columnNumber: 2484
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 1320,
                    columnNumber: 2367
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    className: "text-xs text-muted-foreground",
                                    children: labels.department
                                }, void 0, false, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 1320,
                                    columnNumber: 2625
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm",
                                    children: item.department
                                }, void 0, false, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 1320,
                                    columnNumber: 2701
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1320,
                            columnNumber: 2588
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    className: "text-xs text-muted-foreground",
                                    children: labels.role
                                }, void 0, false, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 1320,
                                    columnNumber: 2788
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                    variant: "outline",
                                    className: "w-fit px-2 font-mono",
                                    children: item.role
                                }, void 0, false, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 1320,
                                    columnNumber: 2858
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1320,
                            columnNumber: 2751
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 1320,
                    columnNumber: 2548
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "grid grid-cols-2 gap-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    className: "text-xs text-muted-foreground",
                                    children: labels.hireDate
                                }, void 0, false, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 1320,
                                    columnNumber: 3024
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-sm",
                                    children: new Date(item.hireDate).toLocaleDateString("pt-PT", {
                                        day: "2-digit",
                                        month: "long",
                                        year: "numeric"
                                    })
                                }, void 0, false, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 1320,
                                    columnNumber: 3098
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1320,
                            columnNumber: 2987
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                    className: "text-xs text-muted-foreground",
                                    children: labels.status
                                }, void 0, false, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 1324,
                                    columnNumber: 63
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                    variant: item.status === "Ativo" ? "default" : "secondary",
                                    className: "flex w-fit gap-1 px-2",
                                    children: [
                                        item.status === "Ativo" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                            className: "size-3"
                                        }, void 0, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 1324,
                                            columnNumber: 264
                                        }, this),
                                        item.status
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 1324,
                                    columnNumber: 135
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1324,
                            columnNumber: 26
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 1320,
                    columnNumber: 2947
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                            className: "text-xs text-muted-foreground",
                            children: labels.phone
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1324,
                            columnNumber: 369
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm",
                            children: item.phone
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1324,
                            columnNumber: 440
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 1324,
                    columnNumber: 332
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                            className: "text-xs text-muted-foreground",
                            children: labels.email
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1324,
                            columnNumber: 522
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-sm",
                            children: item.email
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1324,
                            columnNumber: 593
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 1324,
                    columnNumber: 485
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1320,
            columnNumber: 2179
        }, this);
        $[37] = isEditing;
        $[38] = item.department;
        $[39] = item.email;
        $[40] = item.employeeNumber;
        $[41] = item.hireDate;
        $[42] = item.name;
        $[43] = item.phone;
        $[44] = item.role;
        $[45] = item.status;
        $[46] = labels.department;
        $[47] = labels.email;
        $[48] = labels.employeeNumber;
        $[49] = labels.hireDate;
        $[50] = labels.name;
        $[51] = labels.phone;
        $[52] = labels.role;
        $[53] = labels.status;
        $[54] = t25;
    } else {
        t25 = $[54];
    }
    let t26;
    if ($[55] !== t24 || $[56] !== t25) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-1 flex-col gap-6 overflow-y-auto py-2",
            children: [
                t24,
                t25
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1348,
            columnNumber: 11
        }, this);
        $[55] = t24;
        $[56] = t25;
        $[57] = t26;
    } else {
        t26 = $[57];
    }
    let t27;
    if ($[58] !== isEditing) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetFooter"], {
            className: "mt-auto flex gap-2 pt-4 sm:flex-col sm:space-x-0",
            children: isEditing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        className: "w-full",
                        onClick: {
                            "DocenteViewerSheet[<Button>.onClick]": ()=>setIsEditing(false)
                        }["DocenteViewerSheet[<Button>.onClick]"],
                        children: "Guardar Alterações"
                    }, void 0, false, {
                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                        lineNumber: 1357,
                        columnNumber: 100
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        className: "w-full",
                        onClick: {
                            "DocenteViewerSheet[<Button>.onClick]": ()=>setIsEditing(false)
                        }["DocenteViewerSheet[<Button>.onClick]"],
                        children: "Cancelar"
                    }, void 0, false, {
                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                        lineNumber: 1359,
                        columnNumber: 79
                    }, this)
                ]
            }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                        variant: "outline",
                        className: "w-full",
                        onClick: {
                            "DocenteViewerSheet[<Button>.onClick]": ()=>setIsEditing(true)
                        }["DocenteViewerSheet[<Button>.onClick]"],
                        children: "Editar"
                    }, void 0, false, {
                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                        lineNumber: 1361,
                        columnNumber: 77
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetClose"], {
                        asChild: true,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            className: "w-full",
                            children: "Fechar"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1363,
                            columnNumber: 94
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                        lineNumber: 1363,
                        columnNumber: 67
                    }, this)
                ]
            }, void 0, true)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1357,
            columnNumber: 11
        }, this);
        $[58] = isEditing;
        $[59] = t27;
    } else {
        t27 = $[59];
    }
    let t28;
    if ($[60] !== t19 || $[61] !== t26 || $[62] !== t27) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetContent"], {
            side: "right",
            className: "flex w-full flex-col sm:max-w-lg",
            children: [
                t19,
                t26,
                t27
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1371,
            columnNumber: 11
        }, this);
        $[60] = t19;
        $[61] = t26;
        $[62] = t27;
        $[63] = t28;
    } else {
        t28 = $[63];
    }
    let t29;
    if ($[64] !== onOpenChange || $[65] !== open || $[66] !== t28) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sheet"], {
            open: open,
            onOpenChange: onOpenChange,
            children: t28
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1381,
            columnNumber: 11
        }, this);
        $[64] = onOpenChange;
        $[65] = open;
        $[66] = t28;
        $[67] = t29;
    } else {
        t29 = $[67];
    }
    return t29;
}
_s6(DocenteViewerSheet, "s5CqcM02EQlODtrngtsLv+CwDb4=");
_c6 = DocenteViewerSheet;
function DocenteViewer(t0) {
    _s7();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(22);
    if ($[0] !== "7a207b2878bf145b8b2a7d62cede4d8c9d09d03c82eeb3f3f485678f9e6bfa48") {
        for(let $i = 0; $i < 22; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "7a207b2878bf145b8b2a7d62cede4d8c9d09d03c82eeb3f3f485678f9e6bfa48";
    }
    const { item, fieldLabels } = t0;
    const [open, setOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = ({
            "DocenteViewer[<Button>.onClick]": ()=>setOpen(true)
        })["DocenteViewer[<Button>.onClick]"];
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== item.name || $[3] !== item.photo) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative size-10 overflow-hidden rounded-full bg-muted",
            children: item.photo ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: item.photo,
                alt: item.name,
                className: "size-full object-cover"
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 1415,
                columnNumber: 96
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex size-full items-center justify-center",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                    className: "size-5 text-muted-foreground"
                }, void 0, false, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 1415,
                    columnNumber: 234
                }, this)
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 1415,
                columnNumber: 174
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1415,
            columnNumber: 10
        }, this);
        $[2] = item.name;
        $[3] = item.photo;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== item.name) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "font-medium",
            children: item.name
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1424,
            columnNumber: 10
        }, this);
        $[5] = item.name;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] !== item.employeeNumber) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-muted-foreground",
            children: item.employeeNumber
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1432,
            columnNumber: 10
        }, this);
        $[7] = item.employeeNumber;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    if ($[9] !== t3 || $[10] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-left",
            children: [
                t3,
                t4
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1440,
            columnNumber: 10
        }, this);
        $[9] = t3;
        $[10] = t4;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    let t6;
    if ($[12] !== t2 || $[13] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            variant: "ghost",
            className: "flex w-fit items-center gap-3 px-2",
            onClick: t1,
            children: [
                t2,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1449,
            columnNumber: 10
        }, this);
        $[12] = t2;
        $[13] = t5;
        $[14] = t6;
    } else {
        t6 = $[14];
    }
    let t7;
    if ($[15] !== fieldLabels || $[16] !== item || $[17] !== open) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DocenteViewerSheet, {
            item: item,
            fieldLabels: fieldLabels,
            open: open,
            onOpenChange: setOpen
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1458,
            columnNumber: 10
        }, this);
        $[15] = fieldLabels;
        $[16] = item;
        $[17] = open;
        $[18] = t7;
    } else {
        t7 = $[18];
    }
    let t8;
    if ($[19] !== t6 || $[20] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                t6,
                t7
            ]
        }, void 0, true);
        $[19] = t6;
        $[20] = t7;
        $[21] = t8;
    } else {
        t8 = $[21];
    }
    return t8;
}
_s7(DocenteViewer, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c7 = DocenteViewer;
function DraggableDocenteRow(t0) {
    _s8();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(18);
    if ($[0] !== "7a207b2878bf145b8b2a7d62cede4d8c9d09d03c82eeb3f3f485678f9e6bfa48") {
        for(let $i = 0; $i < 18; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "7a207b2878bf145b8b2a7d62cede4d8c9d09d03c82eeb3f3f485678f9e6bfa48";
    }
    const { row } = t0;
    let t1;
    if ($[1] !== row.original.id) {
        t1 = {
            id: row.original.id
        };
        $[1] = row.original.id;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const { transform, transition, setNodeRef, isDragging } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"])(t1);
    let t2;
    if ($[3] !== row) {
        t2 = row.getIsSelected() && "selected";
        $[3] = row;
        $[4] = t2;
    } else {
        t2 = $[4];
    }
    let t3;
    if ($[5] !== transform) {
        t3 = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$utilities$2f$dist$2f$utilities$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CSS"].Transform.toString(transform);
        $[5] = transform;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] !== t3 || $[8] !== transition) {
        t4 = {
            transform: t3,
            transition
        };
        $[7] = t3;
        $[8] = transition;
        $[9] = t4;
    } else {
        t4 = $[9];
    }
    let t5;
    if ($[10] !== row) {
        t5 = row.getVisibleCells().map(_DraggableDocenteRowAnonymous);
        $[10] = row;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    let t6;
    if ($[12] !== isDragging || $[13] !== setNodeRef || $[14] !== t2 || $[15] !== t4 || $[16] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
            "data-state": t2,
            "data-dragging": isDragging,
            ref: setNodeRef,
            className: "relative z-0 data-[dragging=true]:z-10 data-[dragging=true]:opacity-80",
            style: t4,
            children: t5
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1542,
            columnNumber: 10
        }, this);
        $[12] = isDragging;
        $[13] = setNodeRef;
        $[14] = t2;
        $[15] = t4;
        $[16] = t5;
        $[17] = t6;
    } else {
        t6 = $[17];
    }
    return t6;
}
_s8(DraggableDocenteRow, "fb4uIuBajdyi+YzaiH8csjH7Iq4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSortable"]
    ];
});
_c8 = DraggableDocenteRow;
function _DraggableDocenteRowAnonymous(cell) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
        children: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(cell.column.columnDef.cell, cell.getContext())
    }, cell.id, false, {
        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
        lineNumber: 1555,
        columnNumber: 10
    }, this);
}
function NewDocenteSheet(t0) {
    _s9();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(90);
    if ($[0] !== "7a207b2878bf145b8b2a7d62cede4d8c9d09d03c82eeb3f3f485678f9e6bfa48") {
        for(let $i = 0; $i < 90; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "7a207b2878bf145b8b2a7d62cede4d8c9d09d03c82eeb3f3f485678f9e6bfa48";
    }
    const { buttonText, fieldLabels: t1, onSave } = t0;
    let t2;
    if ($[1] !== t1) {
        t2 = t1 === undefined ? {} : t1;
        $[1] = t1;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    const fieldLabels = t2;
    const [open, setOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
    const t3 = fieldLabels?.name || "Nome Completo";
    const t4 = fieldLabels?.employeeNumber || "N\xFAmero de Funcion\xE1rio";
    const t5 = fieldLabels?.department || "Departamento";
    const t6 = fieldLabels?.role || "Cargo";
    const t7 = fieldLabels?.hireDate || "Data de Admiss\xE3o";
    const t8 = fieldLabels?.status || "Estado";
    const t9 = fieldLabels?.phone || "Telefone";
    const t10 = fieldLabels?.email || "Email";
    let t11;
    if ($[3] !== t10 || $[4] !== t3 || $[5] !== t4 || $[6] !== t5 || $[7] !== t6 || $[8] !== t7 || $[9] !== t8 || $[10] !== t9) {
        t11 = {
            name: t3,
            employeeNumber: t4,
            department: t5,
            role: t6,
            hireDate: t7,
            status: t8,
            phone: t9,
            email: t10
        };
        $[3] = t10;
        $[4] = t3;
        $[5] = t4;
        $[6] = t5;
        $[7] = t6;
        $[8] = t7;
        $[9] = t8;
        $[10] = t9;
        $[11] = t11;
    } else {
        t11 = $[11];
    }
    const labels = t11;
    let t12;
    if ($[12] !== onSave) {
        t12 = ({
            "NewDocenteSheet[handleSave]": ()=>{
                setOpen(false);
                onSave?.({});
            }
        })["NewDocenteSheet[handleSave]"];
        $[12] = onSave;
        $[13] = t12;
    } else {
        t12 = $[13];
    }
    const handleSave = t12;
    let t13;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$plus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Plus$3e$__["Plus"], {}, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1629,
            columnNumber: 11
        }, this);
        $[14] = t13;
    } else {
        t13 = $[14];
    }
    let t14;
    if ($[15] !== buttonText) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTrigger"], {
            asChild: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                size: "sm",
                children: [
                    t13,
                    buttonText
                ]
            }, void 0, true, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 1636,
                columnNumber: 40
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1636,
            columnNumber: 11
        }, this);
        $[15] = buttonText;
        $[16] = t14;
    } else {
        t14 = $[16];
    }
    let t15;
    if ($[17] !== buttonText) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetTitle"], {
            children: buttonText
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1644,
            columnNumber: 11
        }, this);
        $[17] = buttonText;
        $[18] = t15;
    } else {
        t15 = $[18];
    }
    let t16;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetDescription"], {
            className: "mt-1.5",
            children: "Preencha os dados para criar um novo docente"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1652,
            columnNumber: 11
        }, this);
        $[19] = t16;
    } else {
        t16 = $[19];
    }
    let t17;
    if ($[20] !== t15) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetHeader"], {
            className: "gap-3 pb-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    t15,
                    t16
                ]
            }, void 0, true, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 1659,
                columnNumber: 47
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1659,
            columnNumber: 11
        }, this);
        $[20] = t15;
        $[21] = t17;
    } else {
        t17 = $[21];
    }
    let t18;
    if ($[22] !== labels.name) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "new-name",
            children: labels.name
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1667,
            columnNumber: 11
        }, this);
        $[22] = labels.name;
        $[23] = t18;
    } else {
        t18 = $[23];
    }
    let t19;
    if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
            id: "new-name",
            placeholder: "Digite o nome completo"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1675,
            columnNumber: 11
        }, this);
        $[24] = t19;
    } else {
        t19 = $[24];
    }
    let t20;
    if ($[25] !== t18) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                t18,
                t19
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1682,
            columnNumber: 11
        }, this);
        $[25] = t18;
        $[26] = t20;
    } else {
        t20 = $[26];
    }
    let t21;
    if ($[27] !== labels.employeeNumber) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "new-employee",
            children: labels.employeeNumber
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1690,
            columnNumber: 11
        }, this);
        $[27] = labels.employeeNumber;
        $[28] = t21;
    } else {
        t21 = $[28];
    }
    let t22;
    if ($[29] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
            id: "new-employee",
            placeholder: "Digite o n\xFAmero de funcion\xE1rio"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1698,
            columnNumber: 11
        }, this);
        $[29] = t22;
    } else {
        t22 = $[29];
    }
    let t23;
    if ($[30] !== t21) {
        t23 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                t21,
                t22
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1705,
            columnNumber: 11
        }, this);
        $[30] = t21;
        $[31] = t23;
    } else {
        t23 = $[31];
    }
    let t24;
    if ($[32] !== labels.department) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "new-department",
            children: labels.department
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1713,
            columnNumber: 11
        }, this);
        $[32] = labels.department;
        $[33] = t24;
    } else {
        t24 = $[33];
    }
    let t25;
    if ($[34] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
            id: "new-department",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                placeholder: "Selecione"
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 1721,
                columnNumber: 46
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1721,
            columnNumber: 11
        }, this);
        $[34] = t25;
    } else {
        t25 = $[34];
    }
    let t26;
    if ($[35] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
            children: [
                t25,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Engenharia Inform\xE1tica",
                            children: "Engenharia Informática"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1728,
                            columnNumber: 39
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Gest\xE3o de Empresas",
                            children: "Gestão de Empresas"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1728,
                            columnNumber: 122
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Medicina",
                            children: "Medicina"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1728,
                            columnNumber: 197
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Direito",
                            children: "Direito"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1728,
                            columnNumber: 247
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Arquitectura",
                            children: "Arquitectura"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1728,
                            columnNumber: 295
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Engenharia Civil",
                            children: "Engenharia Civil"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1728,
                            columnNumber: 353
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Psicologia",
                            children: "Psicologia"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1728,
                            columnNumber: 419
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Economia",
                            children: "Economia"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1728,
                            columnNumber: 473
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 1728,
                    columnNumber: 24
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1728,
            columnNumber: 11
        }, this);
        $[35] = t26;
    } else {
        t26 = $[35];
    }
    let t27;
    if ($[36] !== t24) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                t24,
                t26
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1735,
            columnNumber: 11
        }, this);
        $[36] = t24;
        $[37] = t27;
    } else {
        t27 = $[37];
    }
    let t28;
    if ($[38] !== labels.role) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "new-role",
            children: labels.role
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1743,
            columnNumber: 11
        }, this);
        $[38] = labels.role;
        $[39] = t28;
    } else {
        t28 = $[39];
    }
    let t29;
    if ($[40] === Symbol.for("react.memo_cache_sentinel")) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
            id: "new-role",
            placeholder: "Ex: Professor Assistente"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1751,
            columnNumber: 11
        }, this);
        $[40] = t29;
    } else {
        t29 = $[40];
    }
    let t30;
    if ($[41] !== t28) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                t28,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1758,
            columnNumber: 11
        }, this);
        $[41] = t28;
        $[42] = t30;
    } else {
        t30 = $[42];
    }
    let t31;
    if ($[43] !== t27 || $[44] !== t30) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-4",
            children: [
                t27,
                t30
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1766,
            columnNumber: 11
        }, this);
        $[43] = t27;
        $[44] = t30;
        $[45] = t31;
    } else {
        t31 = $[45];
    }
    let t32;
    if ($[46] !== labels.hireDate) {
        t32 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "new-date",
            children: labels.hireDate
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1775,
            columnNumber: 11
        }, this);
        $[46] = labels.hireDate;
        $[47] = t32;
    } else {
        t32 = $[47];
    }
    let t33;
    if ($[48] === Symbol.for("react.memo_cache_sentinel")) {
        t33 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
            id: "new-date",
            type: "date"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1783,
            columnNumber: 11
        }, this);
        $[48] = t33;
    } else {
        t33 = $[48];
    }
    let t34;
    if ($[49] !== t32) {
        t34 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                t32,
                t33
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1790,
            columnNumber: 11
        }, this);
        $[49] = t32;
        $[50] = t34;
    } else {
        t34 = $[50];
    }
    let t35;
    if ($[51] !== labels.status) {
        t35 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "new-status",
            children: labels.status
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1798,
            columnNumber: 11
        }, this);
        $[51] = labels.status;
        $[52] = t35;
    } else {
        t35 = $[52];
    }
    let t36;
    if ($[53] === Symbol.for("react.memo_cache_sentinel")) {
        t36 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
            id: "new-status",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {}, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 1806,
                columnNumber: 42
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1806,
            columnNumber: 11
        }, this);
        $[53] = t36;
    } else {
        t36 = $[53];
    }
    let t37;
    if ($[54] === Symbol.for("react.memo_cache_sentinel")) {
        t37 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
            defaultValue: "Pendente",
            children: [
                t36,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Ativo",
                            children: "Ativo"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1813,
                            columnNumber: 63
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Pendente",
                            children: "Pendente"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1813,
                            columnNumber: 107
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Inativo",
                            children: "Inativo"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1813,
                            columnNumber: 157
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                            value: "Aposentado",
                            children: "Aposentado"
                        }, void 0, false, {
                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                            lineNumber: 1813,
                            columnNumber: 205
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 1813,
                    columnNumber: 48
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1813,
            columnNumber: 11
        }, this);
        $[54] = t37;
    } else {
        t37 = $[54];
    }
    let t38;
    if ($[55] !== t35) {
        t38 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                t35,
                t37
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1820,
            columnNumber: 11
        }, this);
        $[55] = t35;
        $[56] = t38;
    } else {
        t38 = $[56];
    }
    let t39;
    if ($[57] !== t34 || $[58] !== t38) {
        t39 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "grid grid-cols-2 gap-4",
            children: [
                t34,
                t38
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1828,
            columnNumber: 11
        }, this);
        $[57] = t34;
        $[58] = t38;
        $[59] = t39;
    } else {
        t39 = $[59];
    }
    let t40;
    if ($[60] !== labels.phone) {
        t40 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "new-phone",
            children: labels.phone
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1837,
            columnNumber: 11
        }, this);
        $[60] = labels.phone;
        $[61] = t40;
    } else {
        t40 = $[61];
    }
    let t41;
    if ($[62] === Symbol.for("react.memo_cache_sentinel")) {
        t41 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
            id: "new-phone",
            type: "tel",
            placeholder: "+244 923 456 789"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1845,
            columnNumber: 11
        }, this);
        $[62] = t41;
    } else {
        t41 = $[62];
    }
    let t42;
    if ($[63] !== t40) {
        t42 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                t40,
                t41
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1852,
            columnNumber: 11
        }, this);
        $[63] = t40;
        $[64] = t42;
    } else {
        t42 = $[64];
    }
    let t43;
    if ($[65] !== labels.email) {
        t43 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
            htmlFor: "new-email",
            children: labels.email
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1860,
            columnNumber: 11
        }, this);
        $[65] = labels.email;
        $[66] = t43;
    } else {
        t43 = $[66];
    }
    let t44;
    if ($[67] === Symbol.for("react.memo_cache_sentinel")) {
        t44 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
            id: "new-email",
            type: "email",
            placeholder: "email@universidade.edu.ao"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1868,
            columnNumber: 11
        }, this);
        $[67] = t44;
    } else {
        t44 = $[67];
    }
    let t45;
    if ($[68] !== t43) {
        t45 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3",
            children: [
                t43,
                t44
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1875,
            columnNumber: 11
        }, this);
        $[68] = t43;
        $[69] = t45;
    } else {
        t45 = $[69];
    }
    let t46;
    if ($[70] !== t20 || $[71] !== t23 || $[72] !== t31 || $[73] !== t39 || $[74] !== t42 || $[75] !== t45) {
        t46 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-1 flex-col gap-6 overflow-y-auto py-2",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4",
                children: [
                    t20,
                    t23,
                    t31,
                    t39,
                    t42,
                    t45
                ]
            }, void 0, true, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 1883,
                columnNumber: 76
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1883,
            columnNumber: 11
        }, this);
        $[70] = t20;
        $[71] = t23;
        $[72] = t31;
        $[73] = t39;
        $[74] = t42;
        $[75] = t45;
        $[76] = t46;
    } else {
        t46 = $[76];
    }
    let t47;
    if ($[77] !== handleSave) {
        t47 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
            className: "w-full",
            onClick: handleSave,
            children: "Criar Docente"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1896,
            columnNumber: 11
        }, this);
        $[77] = handleSave;
        $[78] = t47;
    } else {
        t47 = $[78];
    }
    let t48;
    if ($[79] === Symbol.for("react.memo_cache_sentinel")) {
        t48 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetClose"], {
            asChild: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                variant: "outline",
                className: "w-full",
                children: "Cancelar"
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 1904,
                columnNumber: 38
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1904,
            columnNumber: 11
        }, this);
        $[79] = t48;
    } else {
        t48 = $[79];
    }
    let t49;
    if ($[80] !== t47) {
        t49 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetFooter"], {
            className: "mt-auto flex gap-2 pt-4 sm:flex-col sm:space-x-0",
            children: [
                t47,
                t48
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1911,
            columnNumber: 11
        }, this);
        $[80] = t47;
        $[81] = t49;
    } else {
        t49 = $[81];
    }
    let t50;
    if ($[82] !== t17 || $[83] !== t46 || $[84] !== t49) {
        t50 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SheetContent"], {
            side: "right",
            className: "flex w-full flex-col sm:max-w-lg",
            children: [
                t17,
                t46,
                t49
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1919,
            columnNumber: 11
        }, this);
        $[82] = t17;
        $[83] = t46;
        $[84] = t49;
        $[85] = t50;
    } else {
        t50 = $[85];
    }
    let t51;
    if ($[86] !== open || $[87] !== t14 || $[88] !== t50) {
        t51 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$sheet$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Sheet"], {
            open: open,
            onOpenChange: setOpen,
            children: [
                t14,
                t50
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
            lineNumber: 1929,
            columnNumber: 11
        }, this);
        $[86] = open;
        $[87] = t14;
        $[88] = t50;
        $[89] = t51;
    } else {
        t51 = $[89];
    }
    return t51;
}
_s9(NewDocenteSheet, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c9 = NewDocenteSheet;
function DynamicDocentesTable({ title, description, addButtonText, searchPlaceholder = "Buscar por nome...", data: initialData, onAddNew, fieldLabels = {} }) {
    _s10();
    var _s = __turbopack_context__.k.signature();
    const [data, setData] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        "DynamicDocentesTable.useState": ()=>initialData
    }["DynamicDocentesTable.useState"]);
    const [rowSelection, setRowSelection] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({});
    const [columnVisibility, setColumnVisibility] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({});
    const [columnFilters, setColumnFilters] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [sorting, setSorting] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]([]);
    const [pagination, setPagination] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"]({
        pageIndex: 0,
        pageSize: 10
    });
    const sortableId = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useId"]();
    const sensors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MouseSensor"], {}), (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TouchSensor"], {}), (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensor"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["KeyboardSensor"], {}));
    const dataIds = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "DynamicDocentesTable.useMemo[dataIds]": ()=>data?.map({
                "DynamicDocentesTable.useMemo[dataIds]": ({ id })=>id
            }["DynamicDocentesTable.useMemo[dataIds]"]) || []
    }["DynamicDocentesTable.useMemo[dataIds]"], [
        data
    ]);
    const columns = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"]({
        "DynamicDocentesTable.useMemo[columns]": ()=>[
                {
                    id: "drag",
                    header: {
                        "DynamicDocentesTable.useMemo[columns]": ()=>null
                    }["DynamicDocentesTable.useMemo[columns]"],
                    cell: {
                        "DynamicDocentesTable.useMemo[columns]": ({ row })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DragHandle, {
                                id: row.original.id
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 1967,
                                columnNumber: 11
                            }, this)
                    }["DynamicDocentesTable.useMemo[columns]"]
                },
                {
                    id: "select",
                    header: {
                        "DynamicDocentesTable.useMemo[columns]": ({ table })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                checked: table.getIsAllPageRowsSelected() || table.getIsSomePageRowsSelected() && "indeterminate",
                                onCheckedChange: {
                                    "DynamicDocentesTable.useMemo[columns]": (value)=>table.toggleAllPageRowsSelected(!!value)
                                }["DynamicDocentesTable.useMemo[columns]"],
                                "aria-label": "Selecionar todos"
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 1972,
                                columnNumber: 11
                            }, this)
                    }["DynamicDocentesTable.useMemo[columns]"],
                    cell: {
                        "DynamicDocentesTable.useMemo[columns]": ({ row: row_0 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$checkbox$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Checkbox"], {
                                checked: row_0.getIsSelected(),
                                onCheckedChange: {
                                    "DynamicDocentesTable.useMemo[columns]": (value_0)=>row_0.toggleSelected(!!value_0)
                                }["DynamicDocentesTable.useMemo[columns]"],
                                "aria-label": "Selecionar linha"
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 1975,
                                columnNumber: 11
                            }, this)
                    }["DynamicDocentesTable.useMemo[columns]"],
                    enableSorting: false,
                    enableHiding: false
                },
                {
                    accessorKey: "docente",
                    header: fieldLabels?.name || "Docente",
                    cell: {
                        "DynamicDocentesTable.useMemo[columns]": ({ row: row_1 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DocenteViewer, {
                                item: row_1.original,
                                fieldLabels: fieldLabels
                            }, `view-${row_1.original.id}`, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 1983,
                                columnNumber: 11
                            }, this)
                    }["DynamicDocentesTable.useMemo[columns]"],
                    enableHiding: false
                },
                {
                    accessorKey: "employeeNumber",
                    header: fieldLabels?.employeeNumber || "Nº Funcionário",
                    cell: {
                        "DynamicDocentesTable.useMemo[columns]": ({ row: row_2 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "font-mono text-sm",
                                children: row_2.original.employeeNumber
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 1990,
                                columnNumber: 11
                            }, this)
                    }["DynamicDocentesTable.useMemo[columns]"]
                },
                {
                    accessorKey: "department",
                    header: fieldLabels?.department || "Departamento",
                    cell: {
                        "DynamicDocentesTable.useMemo[columns]": ({ row: row_3 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-[200px] truncate",
                                children: row_3.original.department
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 1996,
                                columnNumber: 11
                            }, this)
                    }["DynamicDocentesTable.useMemo[columns]"]
                },
                {
                    accessorKey: "role",
                    header: fieldLabels?.role || "Cargo",
                    cell: {
                        "DynamicDocentesTable.useMemo[columns]": ({ row: row_4 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: "outline",
                                className: "px-2 font-mono",
                                children: row_4.original.role
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 2002,
                                columnNumber: 11
                            }, this)
                    }["DynamicDocentesTable.useMemo[columns]"]
                },
                {
                    accessorKey: "hireDate",
                    header: fieldLabels?.hireDate || "Data Admissão",
                    cell: {
                        "DynamicDocentesTable.useMemo[columns]": ({ row: row_5 })=>{
                            const date = new Date(row_5.original.hireDate);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-sm",
                                children: date.toLocaleDateString('pt-PT', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                })
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 2010,
                                columnNumber: 14
                            }, this);
                        }
                    }["DynamicDocentesTable.useMemo[columns]"]
                },
                {
                    accessorKey: "status",
                    header: fieldLabels?.status || "Estado",
                    cell: {
                        "DynamicDocentesTable.useMemo[columns]": ({ row: row_6 })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                variant: row_6.original.status === "Ativo" ? "default" : "secondary",
                                className: "flex w-fit gap-1 px-2",
                                children: [
                                    row_6.original.status === "Ativo" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$check$2d$big$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CheckCircle$3e$__["CheckCircle"], {
                                        className: "size-3"
                                    }, void 0, false, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 2024,
                                        columnNumber: 49
                                    }, this),
                                    row_6.original.status
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 2023,
                                columnNumber: 11
                            }, this)
                    }["DynamicDocentesTable.useMemo[columns]"]
                },
                {
                    id: "actions",
                    cell: _s({
                        "DynamicDocentesTable.useMemo[columns]": ({ row: row_7 })=>{
                            _s();
                            const [sheetOpen, setSheetOpen] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
                            const [editMode, setEditMode] = __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"](false);
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                                asChild: true,
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    className: "flex size-8 text-muted-foreground data-[state=open]:bg-muted",
                                                    size: "icon",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$ellipsis$2d$vertical$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MoreVertical$3e$__["MoreVertical"], {}, void 0, false, {
                                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                            lineNumber: 2038,
                                                            columnNumber: 19
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "sr-only",
                                                            children: "Abrir menu"
                                                        }, void 0, false, {
                                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                            lineNumber: 2039,
                                                            columnNumber: 19
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 2037,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 2036,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                                align: "end",
                                                className: "w-40",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                        onClick: {
                                                            "DynamicDocentesTable.useMemo[columns]": ()=>{
                                                                setEditMode(false);
                                                                setSheetOpen(true);
                                                            }
                                                        }["DynamicDocentesTable.useMemo[columns]"],
                                                        children: "Ver detalhes"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                        lineNumber: 2043,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                        onClick: {
                                                            "DynamicDocentesTable.useMemo[columns]": ()=>{
                                                                setEditMode(true);
                                                                setSheetOpen(true);
                                                            }
                                                        }["DynamicDocentesTable.useMemo[columns]"],
                                                        children: "Editar"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                        lineNumber: 2049,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                        children: "Imprimir ficha"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                        lineNumber: 2055,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuSeparator"], {}, void 0, false, {
                                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                        lineNumber: 2056,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuItem"], {
                                                        className: "text-destructive",
                                                        children: "Desativar"
                                                    }, void 0, false, {
                                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                        lineNumber: 2057,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 2042,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 2035,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DocenteViewerSheet, {
                                        item: row_7.original,
                                        open: sheetOpen,
                                        onOpenChange: setSheetOpen,
                                        initialEditMode: editMode,
                                        fieldLabels: fieldLabels
                                    }, `sheet-${row_7.original.id}-${sheetOpen}`, false, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 2060,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true);
                        }
                    }["DynamicDocentesTable.useMemo[columns]"], "ttEc9vSxxgay2HmPObG/l0+oEgQ=")
                }
            ]
    }["DynamicDocentesTable.useMemo[columns]"], [
        fieldLabels
    ]);
    const table_0 = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"])({
        data,
        columns,
        state: {
            sorting,
            columnVisibility,
            rowSelection,
            columnFilters,
            pagination
        },
        getRowId: {
            "DynamicDocentesTable.useReactTable[table_0]": (row_8)=>row_8.id.toString()
        }["DynamicDocentesTable.useReactTable[table_0]"],
        enableRowSelection: true,
        onRowSelectionChange: setRowSelection,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        onPaginationChange: setPagination,
        getCoreRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCoreRowModel"])(),
        getFilteredRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFilteredRowModel"])(),
        getPaginationRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getPaginationRowModel"])(),
        getSortedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getSortedRowModel"])(),
        getFacetedRowModel: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFacetedRowModel"])(),
        getFacetedUniqueValues: (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$table$2d$core$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getFacetedUniqueValues"])()
    });
    function handleDragEnd(event) {
        const { active, over } = event;
        if (active && over && active.id !== over.id) {
            setData((data_0)=>{
                const oldIndex = dataIds.indexOf(active.id);
                const newIndex = dataIds.indexOf(over.id);
                return (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["arrayMove"])(data_0, oldIndex, newIndex);
            });
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex h-screen w-full flex-col gap-6 bg-background p-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: "text-3xl font-bold mt-12",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                        lineNumber: 2103,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-muted-foreground",
                        children: description
                    }, void 0, false, {
                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                        lineNumber: 2104,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 2102,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "relative flex-1 sm:max-w-md",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {
                                className: "absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 2108,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                placeholder: searchPlaceholder,
                                value: table_0.getColumn("docente")?.getFilterValue() ?? "",
                                onChange: (event_0)=>table_0.getColumn("docente")?.setFilterValue(event_0.target.value),
                                className: "pl-9"
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 2109,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                        lineNumber: 2107,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenu"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuTrigger"], {
                                        asChild: true,
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                            variant: "outline",
                                            size: "sm",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$columns$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Columns$3e$__["Columns"], {}, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 2115,
                                                    columnNumber: 17
                                                }, this),
                                                "Colunas",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {}, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 2117,
                                                    columnNumber: 17
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 2114,
                                            columnNumber: 15
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 2113,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuContent"], {
                                        align: "end",
                                        className: "w-48",
                                        children: table_0.getAllColumns().filter((column)=>typeof column.accessorFn !== "undefined" && column.getCanHide()).map((column_0)=>{
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$dropdown$2d$menu$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DropdownMenuCheckboxItem"], {
                                                className: "capitalize",
                                                checked: column_0.getIsVisible(),
                                                onCheckedChange: (value_1)=>column_0.toggleVisibility(!!value_1),
                                                children: column_0.id
                                            }, column_0.id, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 2122,
                                                columnNumber: 22
                                            }, this);
                                        })
                                    }, void 0, false, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 2120,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 2112,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NewDocenteSheet, {
                                buttonText: addButtonText,
                                fieldLabels: fieldLabels,
                                onSave: onAddNew
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 2128,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                        lineNumber: 2111,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 2106,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-hidden rounded-lg border",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DndContext"], {
                    collisionDetection: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["closestCenter"],
                    modifiers: [
                        __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$modifiers$2f$dist$2f$modifiers$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["restrictToVerticalAxis"]
                    ],
                    onDragEnd: handleDragEnd,
                    sensors: sensors,
                    id: sortableId,
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Table"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHeader"], {
                                className: "sticky top-0 z-10 bg-muted",
                                children: table_0.getHeaderGroups().map((headerGroup)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                        children: headerGroup.headers.map((header)=>{
                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableHead"], {
                                                colSpan: header.colSpan,
                                                children: header.isPlaceholder ? null : (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["flexRender"])(header.column.columnDef.header, header.getContext())
                                            }, header.id, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 2137,
                                                columnNumber: 24
                                            }, this);
                                        })
                                    }, headerGroup.id, false, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 2135,
                                        columnNumber: 61
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 2134,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableBody"], {
                                children: table_0.getRowModel().rows?.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SortableContext"], {
                                    items: dataIds,
                                    strategy: __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$sortable$2f$dist$2f$sortable$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["verticalListSortingStrategy"],
                                    children: table_0.getRowModel().rows.map((row_9)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(DraggableDocenteRow, {
                                            row: row_9,
                                            fieldLabels: fieldLabels
                                        }, row_9.id, false, {
                                            fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                            lineNumber: 2145,
                                            columnNumber: 60
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 2144,
                                    columnNumber: 53
                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableRow"], {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["TableCell"], {
                                        colSpan: columns.length,
                                        className: "h-24 text-center",
                                        children: "Nenhum docente encontrado."
                                    }, void 0, false, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 2147,
                                        columnNumber: 19
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                    lineNumber: 2146,
                                    columnNumber: 38
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 2143,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                        lineNumber: 2133,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                    lineNumber: 2132,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 2131,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex-1 text-sm text-muted-foreground",
                        children: [
                            table_0.getFilteredSelectedRowModel().rows.length,
                            " de ",
                            table_0.getFilteredRowModel().rows.length,
                            " linha(s) selecionada(s)."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                        lineNumber: 2156,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$label$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Label"], {
                                        htmlFor: "rows-per-page",
                                        className: "text-sm font-medium",
                                        children: "Linhas por página"
                                    }, void 0, false, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 2161,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                                        value: `${table_0.getState().pagination.pageSize}`,
                                        onValueChange: (value_2)=>table_0.setPageSize(Number(value_2)),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
                                                className: "w-20",
                                                id: "rows-per-page",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                                                    placeholder: table_0.getState().pagination.pageSize
                                                }, void 0, false, {
                                                    fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                    lineNumber: 2166,
                                                    columnNumber: 17
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 2165,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
                                                side: "top",
                                                children: [
                                                    10,
                                                    20,
                                                    30,
                                                    40,
                                                    50
                                                ].map((pageSize)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
                                                        value: `${pageSize}`,
                                                        children: pageSize
                                                    }, pageSize, false, {
                                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                        lineNumber: 2169,
                                                        columnNumber: 55
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 2168,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 2164,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 2160,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-center text-sm font-medium",
                                children: [
                                    "Página ",
                                    table_0.getState().pagination.pageIndex + 1,
                                    " de ",
                                    table_0.getPageCount()
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 2175,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "hidden size-8 sm:flex",
                                        size: "icon",
                                        onClick: ()=>table_0.setPageIndex(0),
                                        disabled: !table_0.getCanPreviousPage(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: "Primeira página"
                                            }, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 2180,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsLeft$3e$__["ChevronsLeft"], {}, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 2181,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 2179,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "icon",
                                        className: "size-8",
                                        onClick: ()=>table_0.previousPage(),
                                        disabled: !table_0.getCanPreviousPage(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: "Página anterior"
                                            }, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 2184,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$left$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronLeft$3e$__["ChevronLeft"], {}, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 2185,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 2183,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "icon",
                                        className: "size-8",
                                        onClick: ()=>table_0.nextPage(),
                                        disabled: !table_0.getCanNextPage(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: "Próxima página"
                                            }, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 2188,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {}, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 2189,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 2187,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        className: "hidden size-8 sm:flex",
                                        size: "icon",
                                        onClick: ()=>table_0.setPageIndex(table_0.getPageCount() - 1),
                                        disabled: !table_0.getCanNextPage(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "sr-only",
                                                children: "Última página"
                                            }, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 2192,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevrons$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronsRight$3e$__["ChevronsRight"], {}, void 0, false, {
                                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                                lineNumber: 2193,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                        lineNumber: 2191,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                                lineNumber: 2178,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                        lineNumber: 2159,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
                lineNumber: 2155,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/sistema-akaedem-ms/src/components/data-table.tsx",
        lineNumber: 2101,
        columnNumber: 10
    }, this);
}
_s10(DynamicDocentesTable, "kPziOGGK0TIl88BDW42ksFcUgVg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$dnd$2d$kit$2f$core$2f$dist$2f$core$2e$esm$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSensors"],
        __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f40$tanstack$2f$react$2d$table$2f$build$2f$lib$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["useReactTable"]
    ];
});
_c10 = DynamicDocentesTable;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_context__.k.register(_c, "DragHandle");
__turbopack_context__.k.register(_c1, "StudentViewerSheet");
__turbopack_context__.k.register(_c2, "StudentViewer");
__turbopack_context__.k.register(_c3, "DraggableRow");
__turbopack_context__.k.register(_c4, "NewRecordSheet");
__turbopack_context__.k.register(_c5, "DynamicTable");
__turbopack_context__.k.register(_c6, "DocenteViewerSheet");
__turbopack_context__.k.register(_c7, "DocenteViewer");
__turbopack_context__.k.register(_c8, "DraggableDocenteRow");
__turbopack_context__.k.register(_c9, "NewDocenteSheet");
__turbopack_context__.k.register(_c10, "DynamicDocentesTable");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sistema-akaedem-ms/src/lib/api/services/enrollment.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "enrollmentService",
    ()=>enrollmentService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/lib/api/config.ts [app-client] (ecmascript)");
;
;
class EnrollmentService {
    /**
   * Lista matrículas de um curso
   */ async listEnrollments(courseId, status) {
        const endpoint = status ? `${__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ENROLLMENTS.LIST(courseId)}?status=${status}` : __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ENROLLMENTS.LIST(courseId);
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["schoolApiClient"].get(endpoint);
        if (response.status === 'success' && response.data) {
            // A API retorna { status: 'success', enrollments: [...], statistics: {...} }
            // O client.ts já envolve em { status: 'success', data: {...} }
            const data = response.data;
            return {
                enrollments: Array.isArray(data.enrollments) ? data.enrollments : [],
                statistics: data.statistics
            };
        }
        throw new Error(response.message || 'Erro ao listar matrículas');
    }
    /**
   * Aprova uma matrícula
   */ async approveEnrollment(enrollmentId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["schoolApiClient"].post(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ENROLLMENTS.APPROVE(enrollmentId), {});
        if (response.status !== 'success') {
            throw new Error(response.message || 'Erro ao aprovar matrícula');
        }
    }
    /**
   * Rejeita uma matrícula
   */ async rejectEnrollment(enrollmentId, reason) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["schoolApiClient"].post(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ENROLLMENTS.REJECT(enrollmentId), {
            reason
        });
        if (response.status !== 'success') {
            throw new Error(response.message || 'Erro ao rejeitar matrícula');
        }
    }
    /**
   * Atualiza dados da matrícula
   */ async updateEnrollment(enrollmentId, data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["schoolApiClient"].put(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].ENROLLMENTS.UPDATE(enrollmentId), data);
        if (response.status === 'success' && response.data) {
            const enrollmentData = response.data;
            return enrollmentData.enrollment || enrollmentData;
        }
        throw new Error(response.message || 'Erro ao atualizar matrícula');
    }
    /**
   * Aprova uma inscrição em exame
   */ async approveExamRegistration(registrationId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["schoolApiClient"].post(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].EXAM_REGISTRATIONS.APPROVE(registrationId), {});
        if (response.status !== 'success') {
            throw new Error(response.message || 'Erro ao aprovar inscrição');
        }
    }
    /**
   * Rejeita uma inscrição em exame
   */ async rejectExamRegistration(registrationId, reason) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["schoolApiClient"].post(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].EXAM_REGISTRATIONS.REJECT(registrationId), {
            reason
        });
        if (response.status !== 'success') {
            throw new Error(response.message || 'Erro ao rejeitar inscrição');
        }
    }
    /**
   * Lista inscrições em exames de admissão
   */ async listExamRegistrations(courseId, examId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["schoolApiClient"].get(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].COURSES.EXAM_REGISTRATIONS(courseId, examId));
        if (response.status === 'success' && response.data) {
            return response.data;
        }
        throw new Error(response.message || 'Erro ao listar inscrições');
    }
}
const enrollmentService = new EnrollmentService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sistema-akaedem-ms/src/hooks/useEnrollments.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useEnrollments",
    ()=>useEnrollments
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$services$2f$enrollment$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/lib/api/services/enrollment.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function useEnrollments(options = {}) {
    _s();
    const { courseId, autoFetch = true, status } = options;
    const [enrollments, setEnrollments] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [statistics, setStatistics] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchEnrollments = async ()=>{
        if (!courseId) {
            setError('courseId é obrigatório');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$services$2f$enrollment$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enrollmentService"].listEnrollments(courseId, status);
            // Garante que enrollments seja sempre um array
            const enrollmentsList = data.enrollments || [];
            setEnrollments(Array.isArray(enrollmentsList) ? enrollmentsList : []);
            setStatistics(data.statistics);
        } catch (err) {
            const errorMessage = err.message || 'Erro ao carregar matrículas';
            setError(errorMessage);
            __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorMessage);
            // Em caso de erro, garante que enrollments seja um array vazio
            setEnrollments([]);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useEnrollments.useEffect": ()=>{
            if (autoFetch && courseId) {
                fetchEnrollments();
            }
        // eslint-disable-next-line react-hooks/exhaustive-deps
        }
    }["useEnrollments.useEffect"], [
        courseId,
        autoFetch,
        status
    ]);
    const approveEnrollment = async (enrollmentId)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$services$2f$enrollment$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enrollmentService"].approveEnrollment(enrollmentId);
            __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Matrícula aprovada com sucesso!');
            // Atualiza a lista
            if (courseId) {
                await fetchEnrollments();
            }
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err.message || 'Erro ao aprovar matrícula');
            throw err;
        }
    };
    const rejectEnrollment = async (enrollmentId, reason)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$services$2f$enrollment$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enrollmentService"].rejectEnrollment(enrollmentId, reason);
            __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Matrícula rejeitada');
            // Atualiza a lista
            if (courseId) {
                await fetchEnrollments();
            }
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err.message || 'Erro ao rejeitar matrícula');
            throw err;
        }
    };
    const updateEnrollment = async (enrollmentId, data)=>{
        try {
            await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$services$2f$enrollment$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["enrollmentService"].updateEnrollment(enrollmentId, data);
            __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].success('Matrícula atualizada com sucesso!');
            // Atualiza a lista
            if (courseId) {
                await fetchEnrollments();
            }
        } catch (err) {
            __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(err.message || 'Erro ao atualizar matrícula');
            throw err;
        }
    };
    return {
        enrollments,
        statistics,
        loading,
        error,
        fetchEnrollments,
        approveEnrollment,
        rejectEnrollment,
        updateEnrollment
    };
}
_s(useEnrollments, "dzqKdSbfptqwwC6UZRZu4Izkojc=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sistema-akaedem-ms/src/lib/api/services/course.service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "courseService",
    ()=>courseService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/lib/api/client.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/lib/api/config.ts [app-client] (ecmascript)");
;
;
class CourseService {
    /**
   * Lista todos os cursos
   */ async listCourses() {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["schoolApiClient"].get(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].COURSES.LIST);
        if (response.status === 'success' && response.data) {
            // A API retorna { status: 'success', courses: [...] }
            // O client.ts já envolve em { status: 'success', data: {...} }
            const data = response.data;
            return data.courses || data || [];
        }
        throw new Error(response.message || 'Erro ao listar cursos');
    }
    /**
   * Obtém detalhes de um curso
   */ async getCourse(id, includeSubjects = false, includeExams = false) {
        const params = new URLSearchParams();
        if (includeSubjects) params.append('include_subjects', 'true');
        if (includeExams) params.append('include_exams', 'true');
        const queryString = params.toString();
        const endpoint = `${__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].COURSES.SHOW(id)}${queryString ? `?${queryString}` : ''}`;
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["schoolApiClient"].get(endpoint);
        if (response.status === 'success' && response.data) {
            return response.data;
        }
        throw new Error(response.message || 'Erro ao obter curso');
    }
    /**
   * Lista disciplinas de um curso
   */ async getCourseSubjects(courseId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["schoolApiClient"].get(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].COURSES.SUBJECTS(courseId));
        if (response.status === 'success' && response.data) {
            const data = response.data;
            // A API retorna { status: 'success', subjects: [...] }
            // O client.ts já envolve em { status: 'success', data: {...} }
            const subjects = data.subjects || data || [];
            return Array.isArray(subjects) ? subjects : [];
        }
        throw new Error(response.message || 'Erro ao listar disciplinas');
    }
    /**
   * Lista exames de admissão de um curso
   */ async getAdmissionExams(courseId) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["schoolApiClient"].get(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].COURSES.ADMISSION_EXAMS(courseId));
        if (response.status === 'success' && response.data) {
            return response.data;
        }
        throw new Error(response.message || 'Erro ao listar exames');
    }
    /**
   * Cria um novo curso
   */ async createCourse(data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["schoolApiClient"].post(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].COURSES.LIST, data);
        if (response.status === 'success' && response.data) {
            const data = response.data;
            return {
                ...data.course,
                tuition_info: data.tuition_info
            };
        }
        throw new Error(response.message || 'Erro ao criar curso');
    }
    /**
   * Atualiza um curso existente
   */ async updateCourse(id, data) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["schoolApiClient"].put(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].COURSES.SHOW(id), data);
        if (response.status === 'success' && response.data) {
            return response.data;
        }
        throw new Error(response.message || 'Erro ao atualizar curso');
    }
    /**
   * Deleta um curso
   */ async deleteCourse(id) {
        const response = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$client$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["schoolApiClient"].delete(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_ENDPOINTS"].COURSES.SHOW(id));
        if (response.status !== 'success') {
            throw new Error(response.message || 'Erro ao deletar curso');
        }
    }
}
const courseService = new CourseService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sistema-akaedem-ms/src/hooks/useCourses.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useCourses",
    ()=>useCourses
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$services$2f$course$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/lib/api/services/course.service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
;
;
function useCourses() {
    _s();
    const [courses, setCourses] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const fetchCourses = async ()=>{
        setLoading(true);
        setError(null);
        try {
            const data = await __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$lib$2f$api$2f$services$2f$course$2e$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["courseService"].listCourses();
            // Garante que sempre seja um array
            setCourses(Array.isArray(data) ? data : []);
        } catch (err) {
            const errorMessage = err.message || 'Erro ao carregar cursos';
            setError(errorMessage);
            __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].error(errorMessage);
            // Em caso de erro, garante que courses seja um array vazio
            setCourses([]);
        } finally{
            setLoading(false);
        }
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useCourses.useEffect": ()=>{
            fetchCourses();
        }
    }["useCourses.useEffect"], []);
    return {
        courses,
        loading,
        error,
        fetchCourses
    };
}
_s(useCourses, "68c9TCSmiSxH5klMRObY7MUSW04=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Matriculas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$data$2d$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/components/data-table.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/components/ui/select.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$hooks$2f$useEnrollments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/hooks/useEnrollments.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$hooks$2f$useCourses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/src/hooks/useCourses.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/sonner/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__ = __turbopack_context__.i("[project]/sistema-akaedem-ms/node_modules/lucide-react/dist/esm/icons/loader-circle.js [app-client] (ecmascript) <export default as Loader2>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
function Matriculas() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(30);
    if ($[0] !== "e9eb2e0ff7d11999deb635f6939997a8481b61b39e1c6977b6609e9cd9ea9032") {
        for(let $i = 0; $i < 30; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "e9eb2e0ff7d11999deb635f6939997a8481b61b39e1c6977b6609e9cd9ea9032";
    }
    const { courses, loading: coursesLoading } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$hooks$2f$useCourses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCourses"])();
    const [selectedCourseId, setSelectedCourseId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const t0 = selectedCourseId || undefined;
    const t1 = !!selectedCourseId;
    let t2;
    if ($[1] !== t0 || $[2] !== t1) {
        t2 = {
            courseId: t0,
            autoFetch: t1,
            status: "approved"
        };
        $[1] = t0;
        $[2] = t1;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    const { enrollments, loading, error, updateEnrollment } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$hooks$2f$useEnrollments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnrollments"])(t2);
    let t3;
    if ($[4] !== courses) {
        t3 = Array.isArray(courses) ? courses : [];
        $[4] = courses;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    const coursesArray = t3;
    let t4;
    if ($[6] !== enrollments) {
        t4 = enrollments.map(_MatriculasEnrollmentsMap);
        $[6] = enrollments;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    const tableData = t4;
    let t5;
    if ($[8] !== updateEnrollment) {
        t5 = ({
            "Matriculas[handleSaveFromTable]": async (item, formData)=>{
                const extendedItem = item;
                if (extendedItem.enrollment) {
                    ;
                    try {
                        await updateEnrollment(extendedItem.enrollment.id, formData);
                    } catch (t6) {
                        const error_0 = t6;
                    }
                }
            }
        })["Matriculas[handleSaveFromTable]"];
        $[8] = updateEnrollment;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    const handleSaveFromTable = t5;
    let t6;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "text-sm font-medium mb-2 block",
            children: "Filtrar por Curso"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
            lineNumber: 100,
            columnNumber: 10
        }, this);
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    let t7;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectTrigger"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectValue"], {
                placeholder: "Selecione um curso"
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
                lineNumber: 107,
                columnNumber: 25
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
            lineNumber: 107,
            columnNumber: 10
        }, this);
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    let t8;
    if ($[12] !== coursesArray || $[13] !== coursesLoading) {
        t8 = coursesLoading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
            value: "loading",
            disabled: true,
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                        className: "h-4 w-4 animate-spin"
                    }, void 0, false, {
                        fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
                        lineNumber: 114,
                        columnNumber: 112
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Carregando cursos..."
                    }, void 0, false, {
                        fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
                        lineNumber: 114,
                        columnNumber: 156
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
                lineNumber: 114,
                columnNumber: 71
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
            lineNumber: 114,
            columnNumber: 27
        }, this) : coursesArray.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
            value: "no-courses",
            disabled: true,
            children: "Nenhum curso disponível"
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
            lineNumber: 114,
            columnNumber: 239
        }, this) : coursesArray.map(_MatriculasCoursesArrayMap);
        $[12] = coursesArray;
        $[13] = coursesLoading;
        $[14] = t8;
    } else {
        t8 = $[14];
    }
    let t9;
    if ($[15] !== t8) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectContent"], {
            children: t8
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
            lineNumber: 123,
            columnNumber: 10
        }, this);
        $[15] = t8;
        $[16] = t9;
    } else {
        t9 = $[16];
    }
    let t10;
    if ($[17] !== coursesLoading || $[18] !== selectedCourseId || $[19] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-4",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 max-w-xs",
                children: [
                    t6,
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Select"], {
                        value: selectedCourseId,
                        onValueChange: setSelectedCourseId,
                        disabled: coursesLoading,
                        children: [
                            t7,
                            t9
                        ]
                    }, void 0, true, {
                        fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
                        lineNumber: 131,
                        columnNumber: 89
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
                lineNumber: 131,
                columnNumber: 52
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
            lineNumber: 131,
            columnNumber: 11
        }, this);
        $[17] = coursesLoading;
        $[18] = selectedCourseId;
        $[19] = t9;
        $[20] = t10;
    } else {
        t10 = $[20];
    }
    let t11;
    if ($[21] !== error || $[22] !== handleSaveFromTable || $[23] !== loading || $[24] !== selectedCourseId || $[25] !== tableData) {
        t11 = !selectedCourseId ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-12 text-muted-foreground",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Selecione um curso para visualizar as matrículas aprovadas"
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
                lineNumber: 141,
                columnNumber: 88
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
            lineNumber: 141,
            columnNumber: 31
        }, this) : loading ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-center py-12",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$loader$2d$circle$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Loader2$3e$__["Loader2"], {
                    className: "h-8 w-8 animate-spin text-muted-foreground"
                }, void 0, false, {
                    fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
                    lineNumber: 141,
                    columnNumber: 228
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "ml-2 text-muted-foreground",
                    children: "Carregando matrículas..."
                }, void 0, false, {
                    fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
                    lineNumber: 141,
                    columnNumber: 294
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
            lineNumber: 141,
            columnNumber: 172
        }, this) : error ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-12 text-destructive",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: [
                    "Erro ao carregar matrículas: ",
                    error
                ]
            }, void 0, true, {
                fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
                lineNumber: 141,
                columnNumber: 439
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
            lineNumber: 141,
            columnNumber: 387
        }, this) : tableData.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-center py-12 text-muted-foreground",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                children: "Nenhuma matrícula aprovada encontrada para este curso"
            }, void 0, false, {
                fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
                lineNumber: 141,
                columnNumber: 573
            }, this)
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
            lineNumber: 141,
            columnNumber: 516
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$data$2d$table$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
            title: "Matr\xEDculas - Ano lectivo 2025/26",
            description: "Gerencie e visualize as matr\xEDculas aprovadas",
            addButtonText: "Nova matr\xEDcula",
            searchPlaceholder: "Buscar por nome ou n\xBA de matr\xEDcula...",
            data: tableData,
            fieldLabels: {
                name: "Nome Completo",
                enrollmentNumber: "N\xBA Matr\xEDcula",
                course: "Curso",
                class: "Turma",
                enrollmentDate: "Data de matr\xEDcula",
                status: "Estado",
                phone: "Telefone",
                email: "Email"
            },
            onAddNew: _MatriculasDynamicTableOnAddNew,
            onSave: handleSaveFromTable
        }, void 0, false, {
            fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
            lineNumber: 141,
            columnNumber: 642
        }, this);
        $[21] = error;
        $[22] = handleSaveFromTable;
        $[23] = loading;
        $[24] = selectedCourseId;
        $[25] = tableData;
        $[26] = t11;
    } else {
        t11 = $[26];
    }
    let t12;
    if ($[27] !== t10 || $[28] !== t11) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container mx-auto p-6 space-y-6",
            children: [
                t10,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
            lineNumber: 162,
            columnNumber: 11
        }, this);
        $[27] = t10;
        $[28] = t11;
        $[29] = t12;
    } else {
        t12 = $[29];
    }
    return t12;
}
_s(Matriculas, "rKacQWE3z2c7928rbOgwd1cZlmM=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$hooks$2f$useCourses$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCourses"],
        __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$hooks$2f$useEnrollments$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEnrollments"]
    ];
});
_c = Matriculas;
function _MatriculasDynamicTableOnAddNew() {
    return __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["toast"].info("Funcionalidade em desenvolvimento");
}
function _MatriculasCoursesArrayMap(course) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$sistema$2d$akaedem$2d$ms$2f$src$2f$components$2f$ui$2f$select$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SelectItem"], {
        value: course.id,
        children: course.name
    }, course.id, false, {
        fileName: "[project]/sistema-akaedem-ms/src/app/admin/academica/matriculas/page.tsx",
        lineNumber: 175,
        columnNumber: 10
    }, this);
}
function _MatriculasEnrollmentsMap(enrollment, index) {
    return {
        id: parseInt(enrollment.id, 10) || index + 1,
        photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${enrollment.student?.name || enrollment.student_name || enrollment.id}`,
        name: enrollment.student?.name || enrollment.student_name || "N/A",
        enrollmentNumber: enrollment.student_id || enrollment.id,
        course: enrollment.course?.name || "N/A",
        class: enrollment.class || "",
        enrollmentDate: enrollment.enrollment_date || enrollment.created_at,
        status: "Ativa",
        phone: enrollment.student?.phone || enrollment.student_phone || "N/A",
        email: enrollment.student?.email || enrollment.student_email || "N/A",
        enrollment
    };
}
var _c;
__turbopack_context__.k.register(_c, "Matriculas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=sistema-akaedem-ms_src_de2e5daf._.js.map