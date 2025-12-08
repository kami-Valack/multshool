(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,97060,e=>{e.v("/_next/static/media/bg_login.ba991ad6.png")},72724,e=>{"use strict";var t=e.i(46989),a=e.i(33981);let i={src:e.i(97060).default,width:1344,height:768,blurWidth:8,blurHeight:5,blurDataURL:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAIAAAD38zoCAAAAiElEQVR42gF9AIL/AEk6OTgyPERBUVRSZ15ZbT82XENAW3F8jQBrSzwpICc/M0JcX5JiXXs+LkA1MTx8i5AAQzxNVkJRZE5WSTdORjhLVTFAWD5TYG1zAColO2dXfXRba350gHlia2M7SVk9W01MbQAgIDFkZ4V4c4arsbqqmZmNhY2BeYRIQlVauCoNt4S/6AAAAABJRU5ErkJggg=="};var o=e.i(31322),r=e.i(32953);e.i(45123);var n=e.i(17673),s=e.i(82264);let d=a.keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`,l=a.keyframes`
  0%, 100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-10px);
  }
`;a.keyframes`
  0%, 100% {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
  }
  50% {
    box-shadow: 0 0 30px #6C5F8D;
  }
`;let c=a.default.div.withConfig({displayName:"page__Container",componentId:"sc-243b9587-0"})`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.9), #6c5f8d51),
    url(${i.src});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  color: #fff;
  font-family: "Inter", sans-serif;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: radial-gradient(
        circle at 20% 80%,
        rgba(0, 0, 0, 0.1) 0%,
        transparent 50%
      ),
      radial-gradient(circle at 80% 20%, rgba(0, 0, 0, 1) 0%, transparent 50%);
    pointer-events: none;
  }
`,f=a.default.div.withConfig({displayName:"page__Wrapper",componentId:"sc-243b9587-1"})`
  width: 100%;
  max-width: 1200px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 6rem;
  padding: 2rem;
  position: relative;
  z-index: 2;
  animation: ${d} 1s ease-out;

  @media (max-width: 968px) {
    flex-direction: column;
    gap: 3rem;
    text-align: center;
  }
`,p=a.default.div.withConfig({displayName:"page__Textos",componentId:"sc-243b9587-2"})`
  width: 45%;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 968px) {
    width: 100%;
  }
`,g=a.default.h1.withConfig({displayName:"page__Logo",componentId:"sc-243b9587-3"})`
  font-size: 1.5rem;
  font-weight: 800;
  letter-spacing: -1.5px;
  background: linear-gradient(135deg, #ffffffff, #6c5f8d, #6c5f8d);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 3s ease infinite, ${l} 6s ease-in-out infinite;
  margin-bottom: 1rem;

  @keyframes gradientShift {
    0%,
    100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
`,h=a.default.h2.withConfig({displayName:"page__Titulo",componentId:"sc-243b9587-4"})`
  font-size: 2.5rem;
  font-weight: 700;
  color: #ffffff;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
`,m=a.default.p.withConfig({displayName:"page__Subtitulo",componentId:"sc-243b9587-5"})`
  font-size: 1.2rem;
  color: #e3f2fd;
  line-height: 1.7;
  max-width: 500px;
  font-weight: 300;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
`;a.default.div.withConfig({displayName:"page__Features",componentId:"sc-243b9587-6"})`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin-top: 1rem;
`,a.default.div.withConfig({displayName:"page__Feature",componentId:"sc-243b9587-7"})`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  font-size: 0.95rem;
  color: #ffffffff;

  &::before {
    content: "✓";
    color: #6c5f8d;
    font-weight: bold;
    font-size: 1.1rem;
  }
`;let u=a.default.div.withConfig({displayName:"page__FormContainer",componentId:"sc-243b9587-8"})`
  width: 45%;
  background: rgba(173, 173, 173, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 24px;
  padding: 5rem 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 3.8rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: ${d} 1s ease-out 0.2s both;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      transparent,
      rgba(255, 255, 255, 0.1),
      transparent
    );
    transition: left 0.5s;
  }

  &:hover::before {
    left: 100%;
  }

  @media (max-width: 968px) {
    width: 100%;
    max-width: 450px;
  }
`,b=a.default.div.withConfig({displayName:"page__InputWrapper",componentId:"sc-243b9587-9"})`
  position: relative;
  width: 100%;
`,x=a.default.input.withConfig({displayName:"page__Input",componentId:"sc-243b9587-10"})`
  width: 100%;
  padding: 1.2rem 1rem 1.2rem 3rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 15px;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 1rem;
  outline: none;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &::placeholder {
    color: #dfdfdfff;
  }

  &:focus {
    background: rgba(255, 255, 255, 0.2);
    border-color: #6c5f8d;
    box-shadow: 0 0 0 3px rgba(108, 95, 141, 0.2);
    transform: translateY(-2px);
  }

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`,w=a.default.span.withConfig({displayName:"page__InputIcon",componentId:"sc-243b9587-11"})`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #888888ff;
  font-size: 1.2rem;
`,v=a.default.div.withConfig({displayName:"page__CheckboxRow",componentId:"sc-243b9587-12"})`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.95rem;
  color: #e3f2fd;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }
`,y=a.default.label.withConfig({displayName:"page__CheckboxLabel",componentId:"sc-243b9587-13"})`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #6c5f8d;
  }
`,k=a.default.div.withConfig({displayName:"page__CustomCheckbox",componentId:"sc-243b9587-14"})`
  width: 18px;
  height: 18px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  background: ${e=>e.$checked?"#6c5f8d":"transparent"};
  border-color: ${e=>e.$checked?"#6c5f8d":"rgba(255, 255, 255, 0.3)"};

  &::after {
    content: "✓";
    color: white;
    font-size: 12px;
    font-weight: bold;
    opacity: ${e=>+!!e.$checked};
    transition: opacity 0.3s ease;
  }
`,A=a.default.button.withConfig({displayName:"page__Button",componentId:"sc-243b9587-15"})`
  width: 100%;
  padding: 1.2rem;
  background: #6C5F8D;
  border: none;
  border-radius: 15px;
  color: white;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 25px rgba(108, 95, 141, 0.4);
    background: #5a4f75;
  }

  &:active {
    transform: translateY(0);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 50%;
    transform: translate(-50%, -50%);
    transition: width 0.3s, height 0.3s;
  }

  &:active::after {
    width: 300px;
    height: 300px;
  }
`,C=a.default.a.withConfig({displayName:"page__Link",componentId:"sc-243b9587-16"})`
  color: #C5A4DB;
  cursor: pointer;
  text-decoration: none;
  transition: all 0.3s ease;
  font-weight: 500;

  &:hover {
    color: #C5A4DB;
    text-decoration: underline;
    transform: translateX(2px);
  }
`,_=a.default.p.withConfig({displayName:"page__FooterText",componentId:"sc-243b9587-17"})`
  text-align: center;
  color: #ffffffff;
  font-size: 0.9rem;
  margin-top: 1rem;
  opacity: 0.8;
`;function j(){let[e,a]=(0,o.useState)(!1),[i,d]=(0,o.useState)(""),[l,j]=(0,o.useState)(""),[I,N]=(0,o.useState)(!1),z=(0,r.useRouter)(),{login:S,isAuthenticated:R,user:B,profileComplete:E,loading:T}=(0,n.useAuth)();o.default.useEffect(()=>{if(console.log("useEffect redirecionamento:",{isAuthenticated:R,user:B?.role,profileComplete:E,loading:!1}),!T&&!I&&R&&B){if("school"===B.role){if(null===E)return void console.log("Aguardando verificação de perfil... (profileComplete é null)");if(!1===E){console.log("Perfil incompleto, redirecionando para /admin/completar-perfil"),z.push("/admin/completar-perfil");return}return console.log("Perfil completo, redirecionando para /admin"),void z.push("/admin")}console.log("Não é escola, redirecionando para /admin"),z.push("/admin")}},[R,B,E,z,I]);let F=async e=>{if(e.preventDefault(),!i||!l)return void s.toast.error("Por favor, preencha todos os campos");N(!0);try{await S({email:i,password:l}),s.toast.success("Login realizado com sucesso!")}catch(e){s.toast.error(e.message||"Erro ao fazer login. Verifique suas credenciais.")}finally{N(!1)}};return(0,t.jsx)(c,{children:(0,t.jsxs)(f,{children:[(0,t.jsxs)(p,{children:[(0,t.jsxs)("div",{children:[(0,t.jsxs)(g,{children:["Akaedem ",(0,t.jsx)("span",{style:{fontWeight:300},children:"Multischool"})]}),(0,t.jsx)(h,{children:"Bem-vindo de volta"})]}),(0,t.jsx)(m,{children:"Inicia sessão para aceder à tua conta e gerir as tuas informações académicas, financeiras e administrativas de forma simples e segura."})]}),(0,t.jsx)(u,{children:(0,t.jsxs)("form",{onSubmit:F,children:[(0,t.jsxs)(b,{children:[(0,t.jsx)(w,{children:(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{fill:"none",stroke:"#ffffff",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:"2",d:"M17.217 19.332A6.982 6.982 0 0 0 12 17c-2.073 0-3.935.9-5.217 2.332M12 21a9 9 0 1 1 0-18a9 9 0 0 1 0 18Zm0-7a3 3 0 1 1 0-6a3 3 0 0 1 0 6Z"})})}),(0,t.jsx)(x,{type:"email",placeholder:"Email",value:i,onChange:e=>d(e.target.value),disabled:I})]}),(0,t.jsxs)(b,{children:[(0,t.jsx)(w,{children:(0,t.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",width:"20",height:"20",viewBox:"0 0 24 24",children:(0,t.jsx)("path",{fill:"#ffffff",d:"M17 9V7A5 5 0 0 0 7 7v2a3 3 0 0 0-3 3v7a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-7a3 3 0 0 0-3-3ZM9 7a3 3 0 0 1 6 0v2H9Zm9 12a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-7a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1Z"})})}),(0,t.jsx)(x,{type:"password",placeholder:"Palavra-passe",value:l,onChange:e=>j(e.target.value),disabled:I})]}),(0,t.jsxs)(v,{children:[(0,t.jsxs)(y,{onClick:()=>a(!e),children:[(0,t.jsx)(k,{$checked:e}),"Lembrar-me"]}),(0,t.jsx)(C,{href:"#",children:"Esqueceste-te da palavra-passe?"})]}),(0,t.jsx)(A,{type:"submit",disabled:I,children:I?"A iniciar sessão...":"Iniciar sessão"}),(0,t.jsxs)(_,{children:["Precisa de ajuda? ",(0,t.jsx)(C,{href:"#",children:"Contacte o suporte"})]})]})})]})})}e.s(["default",()=>j],72724)}]);