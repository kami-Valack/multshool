(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,16568,e=>{"use strict";var a=e.i(46989),t=e.i(31322),s=e.i(29392),o=e.i(79749),d=e.i(55885),n=e.i(59352),l=e.i(83214),r=e.i(33981),i=e.i(33077),c=e.i(98692),m=e.i(34004);let x=(0,m.default)("map-pin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);var h=e.i(12213),p=e.i(63682),u=e.i(53165),f=e.i(29911),g=e.i(1012),j=e.i(27447);let v=r.default.div.withConfig({displayName:"access-exams__ExamCard",componentId:"sc-62d1a188-0"})`
  background: #18181bff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
  border: 1px solid #979797ff;

  &:hover {
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
    transform: translateY(-2px);
  }
`,b=r.default.div.withConfig({displayName:"access-exams__ExamHeader",componentId:"sc-62d1a188-1"})`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 16px;
`,_=r.default.h3.withConfig({displayName:"access-exams__ExamTitle",componentId:"sc-62d1a188-2"})`
  font-size: 18px;
  font-weight: 600;
  color: #ebebebff;
  margin: 0;
`,C=r.default.span.withConfig({displayName:"access-exams__ExamBadge",componentId:"sc-62d1a188-3"})`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>{switch(e.status){case"agendado":return"#dbeafe";case"em-andamento":return"#fef3c7";case"concluido":return"#d1fae5";default:return"#f3f4f6"}}};
  color: ${e=>{switch(e.status){case"agendado":return"#1e40af";case"em-andamento":return"#92400e";case"concluido":return"#065f46";default:return"#374151"}}};
`,y=r.default.div.withConfig({displayName:"access-exams__ExamInfo",componentId:"sc-62d1a188-4"})`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,S=r.default.div.withConfig({displayName:"access-exams__InfoRow",componentId:"sc-62d1a188-5"})`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #c1c1c1ff;

  svg {
    width: 16px;
    height: 16px;
  }
`,N=r.default.div.withConfig({displayName:"access-exams__ExamsGrid",componentId:"sc-62d1a188-6"})`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 20px;
`,w=r.default.div.withConfig({displayName:"access-exams__SectionHeader",componentId:"sc-62d1a188-7"})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,I=r.default.h2.withConfig({displayName:"access-exams__SectionTitle",componentId:"sc-62d1a188-8"})`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
`;function T(){let e,s,o,d,n,r,m,T,E,k,D,A,L,F,M,B,P,R,z,H,G,V,$,O,K,U,q,X=(0,l.c)(60);X[0]===Symbol.for("react.memo_cache_sentinel")?(e=[{id:"1",nome:"Exame de Matemática",data:"2025-11-15",hora:"09:00",local:"Campus Principal - Sala 101",vagas:50,inscritos:42,status:"agendado"},{id:"2",nome:"Exame de Português",data:"2025-11-16",hora:"14:00",local:"Campus Principal - Sala 102",vagas:50,inscritos:38,status:"agendado"}],X[0]=e):e=X[0];let[Y,J]=(0,t.useState)(e);X[1]===Symbol.for("react.memo_cache_sentinel")?(s={nome:"",data:"",hora:"",local:"",vagas:""},X[1]=s):s=X[1];let[Q,W]=(0,t.useState)(s);X[2]!==Y||X[3]!==Q.data||X[4]!==Q.hora||X[5]!==Q.local||X[6]!==Q.nome||X[7]!==Q.vagas?(o=()=>{Q.nome&&Q.data&&Q.hora&&Q.local&&Q.vagas&&(J([...Y,{id:Date.now().toString(),nome:Q.nome,data:Q.data,hora:Q.hora,local:Q.local,vagas:parseInt(Q.vagas),inscritos:0,status:"agendado"}]),W({nome:"",data:"",hora:"",local:"",vagas:""}))},X[2]=Y,X[3]=Q.data,X[4]=Q.hora,X[5]=Q.local,X[6]=Q.nome,X[7]=Q.vagas,X[8]=o):o=X[8];let Z=o;if(X[9]===Symbol.for("react.memo_cache_sentinel")?(d={padding:"20px"},X[9]=d):d=X[9],X[10]===Symbol.for("react.memo_cache_sentinel")?(n=(0,a.jsx)(I,{children:"Exames de Acesso"}),X[10]=n):n=X[10],X[11]===Symbol.for("react.memo_cache_sentinel")?(r=(0,a.jsx)(u.SheetTrigger,{asChild:!0,children:(0,a.jsxs)(f.Button,{children:[(0,a.jsx)(p.Plus,{className:"mr-2 h-4 w-4"}),"Novo Exame"]})}),X[11]=r):r=X[11],X[12]===Symbol.for("react.memo_cache_sentinel")?(m=(0,a.jsxs)(u.SheetHeader,{children:[(0,a.jsx)(u.SheetTitle,{children:"Criar Novo Exame"}),(0,a.jsx)(u.SheetDescription,{children:"Preencha os detalhes do exame de acesso"})]}),X[12]=m):m=X[12],X[13]===Symbol.for("react.memo_cache_sentinel")?(T=(0,a.jsx)(j.Label,{htmlFor:"nome",children:"Nome do Exame"}),X[13]=T):T=X[13],X[14]!==Q?(E=e=>W({...Q,nome:e.target.value}),X[14]=Q,X[15]=E):E=X[15],X[16]!==Q.nome||X[17]!==E?(k=(0,a.jsxs)("div",{className:"grid gap-2",children:[T,(0,a.jsx)(g.Input,{id:"nome",value:Q.nome,onChange:E,placeholder:"Ex: Exame de Matemática"})]}),X[16]=Q.nome,X[17]=E,X[18]=k):k=X[18],X[19]===Symbol.for("react.memo_cache_sentinel")?(D=(0,a.jsx)(j.Label,{htmlFor:"data",children:"Data"}),X[19]=D):D=X[19],X[20]!==Q?(A=e=>W({...Q,data:e.target.value}),X[20]=Q,X[21]=A):A=X[21],X[22]!==Q.data||X[23]!==A?(L=(0,a.jsxs)("div",{className:"grid gap-2",children:[D,(0,a.jsx)(g.Input,{id:"data",type:"date",value:Q.data,onChange:A})]}),X[22]=Q.data,X[23]=A,X[24]=L):L=X[24],X[25]===Symbol.for("react.memo_cache_sentinel")?(F=(0,a.jsx)(j.Label,{htmlFor:"hora",children:"Hora"}),X[25]=F):F=X[25],X[26]!==Q?(M=e=>W({...Q,hora:e.target.value}),X[26]=Q,X[27]=M):M=X[27],X[28]!==Q.hora||X[29]!==M?(B=(0,a.jsxs)("div",{className:"grid gap-2",children:[F,(0,a.jsx)(g.Input,{id:"hora",type:"time",value:Q.hora,onChange:M})]}),X[28]=Q.hora,X[29]=M,X[30]=B):B=X[30],X[31]===Symbol.for("react.memo_cache_sentinel")?(P=(0,a.jsx)(j.Label,{htmlFor:"local",children:"Local"}),X[31]=P):P=X[31],X[32]!==Q?(R=e=>W({...Q,local:e.target.value}),X[32]=Q,X[33]=R):R=X[33],X[34]!==Q.local||X[35]!==R?(z=(0,a.jsxs)("div",{className:"grid gap-2",children:[P,(0,a.jsx)(g.Input,{id:"local",value:Q.local,onChange:R,placeholder:"Ex: Campus Principal - Sala 101"})]}),X[34]=Q.local,X[35]=R,X[36]=z):z=X[36],X[37]===Symbol.for("react.memo_cache_sentinel")?(H=(0,a.jsx)(j.Label,{htmlFor:"vagas",children:"Número de Vagas"}),X[37]=H):H=X[37],X[38]!==Q?(G=e=>W({...Q,vagas:e.target.value}),X[38]=Q,X[39]=G):G=X[39],X[40]!==Q.vagas||X[41]!==G?(V=(0,a.jsxs)("div",{className:"grid gap-2",children:[H,(0,a.jsx)(g.Input,{id:"vagas",type:"number",value:Q.vagas,onChange:G,placeholder:"Ex: 50"})]}),X[40]=Q.vagas,X[41]=G,X[42]=V):V=X[42],X[43]!==Z?($=(0,a.jsx)(f.Button,{onClick:Z,className:"w-full",children:"Criar Exame"}),X[43]=Z,X[44]=$):$=X[44],X[45]!==L||X[46]!==B||X[47]!==z||X[48]!==V||X[49]!==$||X[50]!==k?(O=(0,a.jsxs)(w,{children:[n,(0,a.jsxs)(u.Sheet,{children:[r,(0,a.jsxs)(u.SheetContent,{children:[m,(0,a.jsxs)("div",{className:"grid gap-4 py-4",children:[k,L,B,z,V,$]})]})]})]}),X[45]=L,X[46]=B,X[47]=z,X[48]=V,X[49]=$,X[50]=k,X[51]=O):O=X[51],X[52]!==Y){let e;X[54]===Symbol.for("react.memo_cache_sentinel")?(e=e=>(0,a.jsxs)(v,{children:[(0,a.jsxs)(b,{children:[(0,a.jsx)(_,{children:e.nome}),(0,a.jsxs)(C,{status:e.status,children:["agendado"===e.status&&"Agendado","em-andamento"===e.status&&"Em Andamento","concluido"===e.status&&"Concluído"]})]}),(0,a.jsxs)(y,{children:[(0,a.jsxs)(S,{children:[(0,a.jsx)(i.Calendar,{}),(0,a.jsx)("span",{children:function(e){return new Date(e).toLocaleDateString("pt-PT",{day:"2-digit",month:"long",year:"numeric"})}(e.data)})]}),(0,a.jsxs)(S,{children:[(0,a.jsx)(c.Clock,{}),(0,a.jsx)("span",{children:e.hora})]}),(0,a.jsxs)(S,{children:[(0,a.jsx)(x,{}),(0,a.jsx)("span",{children:e.local})]}),(0,a.jsxs)(S,{children:[(0,a.jsx)(h.Users,{}),(0,a.jsxs)("span",{children:[e.inscritos," / ",e.vagas," inscritos"]})]})]})]},e.id),X[54]=e):e=X[54],K=Y.map(e),X[52]=Y,X[53]=K}else K=X[53];return X[55]!==K?(U=(0,a.jsx)(N,{children:K}),X[55]=K,X[56]=U):U=X[56],X[57]!==O||X[58]!==U?(q=(0,a.jsxs)("div",{style:d,children:[O,U]}),X[57]=O,X[58]=U,X[59]=q):q=X[59],q}var E=e.i(18159),k=e.i(93311),D=e.i(54047),A=e.i(38992),L=e.i(88179),F=e.i(57656),M=e.i(85865),B=e.i(89597),P=e.i(19167),R=e.i(32799),z=e.i(13983),H=e.i(16774);let G=[{course:"Engenharia",approved:120,failed:30},{course:"Direito",approved:95,failed:50},{course:"Medicina",approved:80,failed:20},{course:"Gestão",approved:70,failed:40},{course:"Informática",approved:60,failed:25}],V={approved:{label:"Aprovados",color:"var(--chart-1)"},failed:{label:"Reprovados",color:"var(--chart-2)"}};function $(){let e,t,s,o,d,n=(0,l.c)(5);return n[0]===Symbol.for("react.memo_cache_sentinel")?(e=(0,a.jsxs)(z.CardHeader,{children:[(0,a.jsx)(z.CardTitle,{children:"Alunos por Curso"}),(0,a.jsx)(z.CardDescription,{children:"Quantidade de aprovados e reprovados"})]}),n[0]=e):e=n[0],n[1]===Symbol.for("react.memo_cache_sentinel")?(t=(0,a.jsx)(P.CartesianGrid,{vertical:!1}),s=(0,a.jsx)(R.XAxis,{dataKey:"course",tickLine:!1,tickMargin:10,axisLine:!1}),n[1]=t,n[2]=s):(t=n[1],s=n[2]),n[3]===Symbol.for("react.memo_cache_sentinel")?(o=(0,a.jsx)(z.CardContent,{children:(0,a.jsx)(H.ChartContainer,{config:V,children:(0,a.jsxs)(B.BarChart,{accessibilityLayer:!0,data:G,children:[t,s,(0,a.jsx)(H.ChartTooltip,{cursor:!1,content:(0,a.jsx)(H.ChartTooltipContent,{indicator:"dashed"})}),(0,a.jsx)(M.Bar,{dataKey:"approved",fill:"var(--color-approved)",radius:4}),(0,a.jsx)(M.Bar,{dataKey:"failed",fill:"var(--color-failed)",radius:4})]})})}),n[3]=o):o=n[3],n[4]===Symbol.for("react.memo_cache_sentinel")?(d=(0,a.jsxs)(z.Card,{children:[e,o,(0,a.jsxs)(z.CardFooter,{className:"flex-col items-start gap-2 text-sm",children:[(0,a.jsxs)("div",{className:"flex gap-2 leading-none font-medium",children:["Desempenho por curso ",(0,a.jsx)(F.TrendingUp,{className:"h-4 w-4"})]}),(0,a.jsx)("div",{className:"text-muted-foreground leading-none",children:"Mostrando alunos aprovados e reprovados"})]})]}),n[4]=d):d=n[4],d}let O=r.default.div.withConfig({displayName:"exam-results__ResultsContainer",componentId:"sc-7d7c4d52-0"})`
  background: transparent;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
`,K=r.default.div.withConfig({displayName:"exam-results__Header",componentId:"sc-7d7c4d52-1"})`
  margin-bottom: 24px;
`,U=r.default.h2.withConfig({displayName:"exam-results__Title",componentId:"sc-7d7c4d52-2"})`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16px;
`,q=r.default.div.withConfig({displayName:"exam-results__FiltersRow",componentId:"sc-7d7c4d52-3"})`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`,X=r.default.div.withConfig({displayName:"exam-results__SearchWrapper",componentId:"sc-7d7c4d52-4"})`
  flex: 1;
  min-width: 250px;
  position: relative;

  svg {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    width: 16px;
    height: 16px;
    color: #9ca3af;
  }

  input {
    padding-left: 40px;
  }
`,Y=r.default.div.withConfig({displayName:"exam-results__StatsGrid",componentId:"sc-7d7c4d52-5"})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`,J=r.default.div.withConfig({displayName:"exam-results__StatCard",componentId:"sc-7d7c4d52-6"})`
  background: #18181bff;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #979797ff;
`,Q=r.default.div.withConfig({displayName:"exam-results__StatLabel",componentId:"sc-7d7c4d52-7"})`
  font-size: 14px;
  color: #979797ff;
  margin-bottom: 4px;
`,W=r.default.div.withConfig({displayName:"exam-results__StatValue",componentId:"sc-7d7c4d52-8"})`
  font-size: 24px;
  font-weight: 600;
  color: #d1d1d1ff;
`,Z=r.default.div.withConfig({displayName:"exam-results__StatusBadge",componentId:"sc-7d7c4d52-9"})`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${e=>{switch(e.status){case"aprovado":return"#d1fae5";case"reprovado":return"#fee2e2";case"pendente":return"#fef3c7";default:return"#f3f4f6"}}};
  color: ${e=>{switch(e.status){case"aprovado":return"#065f46";case"reprovado":return"#991b1b";case"pendente":return"#92400e";default:return"#374151"}}};

  svg {
    width: 14px;
    height: 14px;
  }
`;function ee(){let e,s,o,d,n,r,i,m,x,h,p,u=(0,l.c)(76),[f,j]=(0,t.useState)(""),[v,b]=(0,t.useState)("todos"),[_,C]=(0,t.useState)("todos");if(u[0]!==_||u[1]!==f||u[2]!==v){let t,l,i,m,x,h,p,y,S,N,w,I,T,F,M,B,P,R,z,H,G,V,$,ee,ed,en,el,er=[{id:"1",candidatoNome:"João Silva",candidatoBI:"123456789LA",exame:"Exame de Matemática",nota:16.5,notaMaxima:20,status:"aprovado",data:"2025-11-15"},{id:"2",candidatoNome:"Maria Santos",candidatoBI:"987654321LA",exame:"Exame de Matemática",nota:14,notaMaxima:20,status:"aprovado",data:"2025-11-15"},{id:"3",candidatoNome:"Pedro Costa",candidatoBI:"456789123LA",exame:"Exame de Português",nota:8.5,notaMaxima:20,status:"reprovado",data:"2025-11-16"},{id:"4",candidatoNome:"Ana Oliveira",candidatoBI:"321654987LA",exame:"Exame de Português",nota:0,notaMaxima:20,status:"pendente",data:"2025-11-16"}],ei=er.filter(e=>{let a=e.candidatoNome.toLowerCase().includes(f.toLowerCase())||e.candidatoBI.toLowerCase().includes(f.toLowerCase()),t="todos"===v||e.status===v,s="todos"===_||e.exame===_;return a&&t&&s}),ec=er.length,em=er.filter(eo),ex=em.length,eh=er.filter(es),ep=eh.length,eu=er.filter(et),ef=eu.length,eg=er.reduce(ea,0)/er.length;u[9]!==eg?(t=eg.toFixed(1),u[9]=eg,u[10]=t):t=u[10],u[11]!==er||u[12]!==t||u[13]!==em||u[14]!==eh||u[15]!==eu?(l={total:ec,aprovados:ex,reprovados:ep,pendentes:ef,mediaGeral:t},u[11]=er,u[12]=t,u[13]=em,u[14]=eh,u[15]=eu,u[16]=l):l=u[16];let ej=l;o=O,u[17]===Symbol.for("react.memo_cache_sentinel")?(i=(0,a.jsx)(U,{children:"Resultados dos Exames"}),u[17]=i):i=u[17],u[18]===Symbol.for("react.memo_cache_sentinel")?(m=(0,a.jsx)(Q,{children:"Total de Candidatos"}),u[18]=m):m=u[18],u[19]!==ej.total?(x=(0,a.jsxs)(J,{children:[m,(0,a.jsx)(W,{children:ej.total})]}),u[19]=ej.total,u[20]=x):x=u[20],u[21]===Symbol.for("react.memo_cache_sentinel")?(h=(0,a.jsx)(Q,{children:"Aprovados"}),u[21]=h):h=u[21],u[22]===Symbol.for("react.memo_cache_sentinel")?(p={color:"#059669"},u[22]=p):p=u[22],u[23]!==ej.aprovados?(y=(0,a.jsxs)(J,{children:[h,(0,a.jsx)(W,{style:p,children:ej.aprovados})]}),u[23]=ej.aprovados,u[24]=y):y=u[24],u[25]===Symbol.for("react.memo_cache_sentinel")?(S=(0,a.jsx)(Q,{children:"Reprovados"}),u[25]=S):S=u[25],u[26]===Symbol.for("react.memo_cache_sentinel")?(N={color:"#dc2626"},u[26]=N):N=u[26],u[27]!==ej.reprovados?(w=(0,a.jsxs)(J,{children:[S,(0,a.jsx)(W,{style:N,children:ej.reprovados})]}),u[27]=ej.reprovados,u[28]=w):w=u[28],u[29]===Symbol.for("react.memo_cache_sentinel")?(I=(0,a.jsx)(Q,{children:"Pendentes"}),u[29]=I):I=u[29],u[30]===Symbol.for("react.memo_cache_sentinel")?(T={color:"#d97706"},u[30]=T):T=u[30],u[31]!==ej.pendentes?(F=(0,a.jsxs)(J,{children:[I,(0,a.jsx)(W,{style:T,children:ej.pendentes})]}),u[31]=ej.pendentes,u[32]=F):F=u[32],u[33]===Symbol.for("react.memo_cache_sentinel")?(M=(0,a.jsx)(Q,{children:"Média Geral"}),u[33]=M):M=u[33],u[34]!==ej.mediaGeral?(B=(0,a.jsxs)(J,{children:[M,(0,a.jsx)(W,{children:ej.mediaGeral})]}),u[34]=ej.mediaGeral,u[35]=B):B=u[35],u[36]!==x||u[37]!==y||u[38]!==w||u[39]!==F||u[40]!==B?(P=(0,a.jsxs)(Y,{children:[x,y,w,F,B]}),u[36]=x,u[37]=y,u[38]=w,u[39]=F,u[40]=B,u[41]=P):P=u[41],u[42]===Symbol.for("react.memo_cache_sentinel")?(R=(0,a.jsx)(E.Search,{}),u[42]=R):R=u[42],u[43]===Symbol.for("react.memo_cache_sentinel")?(z=e=>j(e.target.value),u[43]=z):z=u[43],u[44]!==f?(H=(0,a.jsxs)(X,{children:[R,(0,a.jsx)(g.Input,{placeholder:"Pesquisar por nome ou BI...",value:f,onChange:z})]}),u[44]=f,u[45]=H):H=u[45],u[46]===Symbol.for("react.memo_cache_sentinel")?(G=(0,a.jsx)(A.SelectTrigger,{className:"w-[200px]",children:(0,a.jsx)(A.SelectValue,{placeholder:"Filtrar por exame"})}),u[46]=G):G=u[46],u[47]===Symbol.for("react.memo_cache_sentinel")?(V=(0,a.jsxs)(A.SelectContent,{children:[(0,a.jsx)(A.SelectItem,{value:"todos",children:"Todos os exames"}),(0,a.jsx)(A.SelectItem,{value:"Exame de Matemática",children:"Matemática"}),(0,a.jsx)(A.SelectItem,{value:"Exame de Português",children:"Português"})]}),u[47]=V):V=u[47],u[48]!==_?($=(0,a.jsxs)(A.Select,{value:_,onValueChange:C,children:[G,V]}),u[48]=_,u[49]=$):$=u[49],u[50]===Symbol.for("react.memo_cache_sentinel")?(ee=(0,a.jsx)(A.SelectTrigger,{className:"w-[180px]",children:(0,a.jsx)(A.SelectValue,{placeholder:"Filtrar por status"})}),u[50]=ee):ee=u[50],u[51]===Symbol.for("react.memo_cache_sentinel")?(ed=(0,a.jsxs)(A.SelectContent,{children:[(0,a.jsx)(A.SelectItem,{value:"todos",children:"Todos"}),(0,a.jsx)(A.SelectItem,{value:"aprovado",children:"Aprovados"}),(0,a.jsx)(A.SelectItem,{value:"reprovado",children:"Reprovados"}),(0,a.jsx)(A.SelectItem,{value:"pendente",children:"Pendentes"})]}),u[51]=ed):ed=u[51],u[52]!==v?(en=(0,a.jsxs)(A.Select,{value:v,onValueChange:b,children:[ee,ed]}),u[52]=v,u[53]=en):en=u[53],u[54]!==H||u[55]!==$||u[56]!==en?(el=(0,a.jsxs)(q,{children:[H,$,en]}),u[54]=H,u[55]=$,u[56]=en,u[57]=el):el=u[57],u[58]!==P||u[59]!==el?(r=(0,a.jsxs)(K,{children:[i,P,el]}),u[58]=P,u[59]=el,u[60]=r):r=u[60],s=L.Table,u[61]===Symbol.for("react.memo_cache_sentinel")?(n=(0,a.jsx)(L.TableHeader,{children:(0,a.jsxs)(L.TableRow,{children:[(0,a.jsx)(L.TableHead,{children:"Candidato"}),(0,a.jsx)(L.TableHead,{children:"BI"}),(0,a.jsx)(L.TableHead,{children:"Exame"}),(0,a.jsx)(L.TableHead,{children:"Nota"}),(0,a.jsx)(L.TableHead,{children:"Data"}),(0,a.jsx)(L.TableHead,{children:"Status"})]})}),u[61]=n):n=u[61],e=L.TableBody,d=ei.map(e=>(0,a.jsxs)(L.TableRow,{children:[(0,a.jsx)(L.TableCell,{className:"font-medium",children:e.candidatoNome}),(0,a.jsx)(L.TableCell,{children:e.candidatoBI}),(0,a.jsx)(L.TableCell,{children:e.exame}),(0,a.jsx)(L.TableCell,{children:"pendente"===e.status?"-":`${e.nota} / ${e.notaMaxima}`}),(0,a.jsx)(L.TableCell,{children:new Date(e.data).toLocaleDateString("pt-PT")}),(0,a.jsx)(L.TableCell,{children:(0,a.jsxs)(Z,{status:e.status,children:[function(e){switch(e){case"aprovado":return(0,a.jsx)(k.CheckCircle,{});case"reprovado":return(0,a.jsx)(D.XCircle,{});case"pendente":return(0,a.jsx)(c.Clock,{});default:return null}}(e.status),e.status.charAt(0).toUpperCase()+e.status.slice(1)]})})]},e.id)),u[0]=_,u[1]=f,u[2]=v,u[3]=e,u[4]=s,u[5]=o,u[6]=d,u[7]=n,u[8]=r}else e=u[3],s=u[4],o=u[5],d=u[6],n=u[7],r=u[8];return u[62]!==e||u[63]!==d?(i=(0,a.jsx)(e,{children:d}),u[62]=e,u[63]=d,u[64]=i):i=u[64],u[65]!==s||u[66]!==n||u[67]!==i?(m=(0,a.jsxs)(s,{children:[n,i]}),u[65]=s,u[66]=n,u[67]=i,u[68]=m):m=u[68],u[69]!==o||u[70]!==r||u[71]!==m?(x=(0,a.jsxs)(o,{children:[r,m]}),u[69]=o,u[70]=r,u[71]=m,u[72]=x):x=u[72],u[73]===Symbol.for("react.memo_cache_sentinel")?(h=(0,a.jsx)("div",{style:{width:"600px",marginTop:"89px"},children:(0,a.jsx)($,{})}),u[73]=h):h=u[73],u[74]!==x?(p=(0,a.jsxs)(a.Fragment,{children:[x,h]}),u[74]=x,u[75]=p):p=u[75],p}function ea(e,a){return e+a.nota}function et(e){return"pendente"===e.status}function es(e){return"reprovado"===e.status}function eo(e){return"aprovado"===e.status}var ed=e.i(82004),en=e.i(11984);let el=(0,m.default)("file-spreadsheet",[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]]);var er=e.i(8295);let ei=r.default.div.withConfig({displayName:"export-data__ExportContainer",componentId:"sc-ae54cd92-0"})`
  max-width: 800px;
  margin: 0 auto;
`,ec=r.default.div.withConfig({displayName:"export-data__FormatGrid",componentId:"sc-ae54cd92-1"})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`,em=r.default.div.withConfig({displayName:"export-data__FormatCard",componentId:"sc-ae54cd92-2"})`
  padding: 20px;
  border-radius: 8px;
  border: 2px solid ${e=>e.selected?"#2563eb":"#e5e7eb"};
  background: ${e=>e.selected?"#eff6ff":"white"};
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  &:hover {
    border-color: #2563eb;
    background: #eff6ff;
  }

  svg {
    width: 32px;
    height: 32px;
    color: ${e=>e.selected?"#2563eb":"#6b7280"};
  }
`,ex=r.default.div.withConfig({displayName:"export-data__FormatName",componentId:"sc-ae54cd92-3"})`
  font-weight: 500;
  color: #1f2937;
`,eh=r.default.div.withConfig({displayName:"export-data__FormatDescription",componentId:"sc-ae54cd92-4"})`
  font-size: 12px;
  color: #6b7280;
  text-align: center;
`,ep=r.default.div.withConfig({displayName:"export-data__OptionsSection",componentId:"sc-ae54cd92-5"})`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,eu=r.default.div.withConfig({displayName:"export-data__CheckboxGroup",componentId:"sc-ae54cd92-6"})`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,ef=r.default.div.withConfig({displayName:"export-data__CheckboxItem",componentId:"sc-ae54cd92-7"})`
  display: flex;
  align-items: center;
  gap: 8px;
`;function eg(){let e,s,o,d,n,r,i,c,m,x,h,p,u,g,v,b,_,C,y=(0,l.c)(31),[S,N]=(0,t.useState)(null),[w,I]=(0,t.useState)("todos");y[0]===Symbol.for("react.memo_cache_sentinel")?(e={includeCandidatos:!0,includeExames:!0,includeResultados:!0,includeEstatisticas:!1},y[0]=e):e=y[0];let[T,E]=(0,t.useState)(e),[k,D]=(0,t.useState)(!1);y[1]===Symbol.for("react.memo_cache_sentinel")?(s={id:"csv",name:"CSV",description:"Compatível com Excel e Google Sheets",icon:el},y[1]=s):s=y[1],y[2]===Symbol.for("react.memo_cache_sentinel")?(o={id:"xlsx",name:"Excel",description:"Formato Microsoft Excel",icon:el},y[2]=o):o=y[2],y[3]===Symbol.for("react.memo_cache_sentinel")?(d=[s,o,{id:"pdf",name:"PDF",description:"Documento formatado para impressão",icon:en.FileText}],y[3]=d):d=y[3];let L=d;y[4]!==S?(n=()=>{if(!S)return void alert("Por favor, selecione um formato de exportação.");D(!0);let e=`candidaturas_${new Date().toISOString().split("T")[0]}.${S}`;setTimeout(()=>{alert(`Exporta\xe7\xe3o conclu\xedda: ${e}`),D(!1)},2e3)},y[4]=S,y[5]=n):n=y[5];let F=n;y[6]===Symbol.for("react.memo_cache_sentinel")?(r=e=>{E(a=>({...a,[e]:!a[e]}))},y[6]=r):r=y[6];let M=r;y[7]===Symbol.for("react.memo_cache_sentinel")?(i=(0,a.jsxs)(z.CardHeader,{children:[(0,a.jsx)(z.CardTitle,{children:"Exportar Dados"}),(0,a.jsx)(z.CardDescription,{children:"Escolha o formato e os dados que deseja exportar"})]}),y[7]=i):i=y[7],y[8]===Symbol.for("react.memo_cache_sentinel")?(c=(0,a.jsx)(j.Label,{className:"mb-3 block",children:"Formato de Exportação"}),y[8]=c):c=y[8],y[9]!==S?(m=(0,a.jsxs)("div",{children:[c,(0,a.jsx)(ec,{children:L.map(e=>(0,a.jsxs)(em,{selected:S===e.id,onClick:()=>N(e.id),children:[(0,a.jsx)(e.icon,{}),(0,a.jsx)(ex,{children:e.name}),(0,a.jsx)(eh,{children:e.description})]},e.id))})]}),y[9]=S,y[10]=m):m=y[10],y[11]===Symbol.for("react.memo_cache_sentinel")?(x=(0,a.jsx)(j.Label,{htmlFor:"data-type",className:"mb-2 block",children:"Tipo de Dados"}),y[11]=x):x=y[11],y[12]===Symbol.for("react.memo_cache_sentinel")?(h=(0,a.jsx)(A.SelectTrigger,{id:"data-type",children:(0,a.jsx)(A.SelectValue,{placeholder:"Selecione o tipo de dados"})}),y[12]=h):h=y[12],y[13]===Symbol.for("react.memo_cache_sentinel")?(p=(0,a.jsxs)(A.SelectContent,{children:[(0,a.jsx)(A.SelectItem,{value:"todos",children:"Todos os dados"}),(0,a.jsx)(A.SelectItem,{value:"candidatos",children:"Apenas Candidatos"}),(0,a.jsx)(A.SelectItem,{value:"exames",children:"Apenas Exames"}),(0,a.jsx)(A.SelectItem,{value:"resultados",children:"Apenas Resultados"})]}),y[13]=p):p=y[13],y[14]!==w?(u=(0,a.jsxs)("div",{children:[x,(0,a.jsxs)(A.Select,{value:w,onValueChange:I,children:[h,p]})]}),y[14]=w,y[15]=u):u=y[15],y[16]!==w||y[17]!==T?(g="todos"===w&&(0,a.jsxs)("div",{children:[(0,a.jsx)(j.Label,{className:"mb-3 block",children:"Incluir nas Exportações"}),(0,a.jsxs)(eu,{children:[(0,a.jsxs)(ef,{children:[(0,a.jsx)(er.Checkbox,{id:"candidatos",checked:T.includeCandidatos,onCheckedChange:()=>M("includeCandidatos")}),(0,a.jsx)(j.Label,{htmlFor:"candidatos",className:"cursor-pointer",children:"Lista de Candidatos"})]}),(0,a.jsxs)(ef,{children:[(0,a.jsx)(er.Checkbox,{id:"exames",checked:T.includeExames,onCheckedChange:()=>M("includeExames")}),(0,a.jsx)(j.Label,{htmlFor:"exames",className:"cursor-pointer",children:"Dados dos Exames de Acesso"})]}),(0,a.jsxs)(ef,{children:[(0,a.jsx)(er.Checkbox,{id:"resultados",checked:T.includeResultados,onCheckedChange:()=>M("includeResultados")}),(0,a.jsx)(j.Label,{htmlFor:"resultados",className:"cursor-pointer",children:"Resultados dos Exames"})]}),(0,a.jsxs)(ef,{children:[(0,a.jsx)(er.Checkbox,{id:"estatisticas",checked:T.includeEstatisticas,onCheckedChange:()=>M("includeEstatisticas")}),(0,a.jsx)(j.Label,{htmlFor:"estatisticas",className:"cursor-pointer",children:"Estatísticas e Gráficos"})]})]})]}),y[16]=w,y[17]=T,y[18]=g):g=y[18],y[19]===Symbol.for("react.memo_cache_sentinel")?(v=(0,a.jsx)(ed.Download,{className:"mr-2 h-4 w-4"}),y[19]=v):v=y[19];let B=k?"Exportando...":"Exportar Dados";return y[20]!==k||y[21]!==F||y[22]!==B?(b=(0,a.jsxs)(f.Button,{onClick:F,className:"w-full mt-4",size:"lg",disabled:k,children:[v,B]}),y[20]=k,y[21]=F,y[22]=B,y[23]=b):b=y[23],y[24]!==u||y[25]!==g||y[26]!==b?(_=(0,a.jsxs)(ep,{children:[u,g,b]}),y[24]=u,y[25]=g,y[26]=b,y[27]=_):_=y[27],y[28]!==_||y[29]!==m?(C=(0,a.jsx)(ei,{children:(0,a.jsxs)(z.Card,{children:[i,(0,a.jsxs)(z.CardContent,{children:[m,_]})]})}),y[28]=_,y[29]=m,y[30]=C):C=y[30],C}var ej=e.i(85576),ev=e.i(24498),eb=e.i(51935),e_=e.i(17624),eC=e.i(82264);function ey(){let{courses:e,loading:l}=(0,e_.useCourses)(),[r,i]=(0,t.useState)(""),{enrollments:c,loading:m,error:x,approveEnrollment:h,rejectEnrollment:p,updateEnrollment:u}=(0,eb.useEnrollments)({courseId:r||void 0,autoFetch:!!r}),[v,b]=(0,t.useState)(null),[_,C]=(0,t.useState)({class:"",student_phone:"",student_name:"",student_email:""}),[y,S]=(0,t.useState)(!1),[N,w]=(0,t.useState)(null),[I,E]=(0,t.useState)(""),k=Array.isArray(e)?e:[],D=c.map(e=>({id:e.id,photo:`https://api.dicebear.com/7.x/avataaars/svg?seed=${e.student?.name||e.student_name||e.id}`,name:e.student?.name||e.student_name||"N/A",enrollmentNumber:e.student_id||e.id,course:e.course?.name||"N/A",class:e.class||"",enrollmentDate:e.enrollment_date||e.created_at,status:"pending"===e.status?"Pendente":"approved"===e.status?"Aprovada":"Rejeitada",phone:e.student?.phone||e.student_phone||"N/A",email:e.student?.email||e.student_email||"N/A",enrollment:e})),L=async e=>{try{await h(e)}catch(e){}},F=async e=>{w(e),S(!0)},M=async()=>{if(N)try{await p(N,I||void 0),S(!1),w(null),E("")}catch(e){}},B=async(e,a)=>{e.enrollment&&await u(e.enrollment.id,a)};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsxs)(o.SidebarProvider,{style:{"--sidebar-width":"calc(var(--spacing) * 72)","--header-height":"calc(var(--spacing) * 12)"},children:[(0,a.jsx)(s.AppSidebar,{variant:"sidebar"}),(0,a.jsx)(o.SidebarInset,{children:(0,a.jsx)("div",{className:"flex flex-1 flex-col",children:(0,a.jsxs)("div",{className:"@container/main flex flex-1 flex-col gap-2",children:[(0,a.jsx)(d.default,{}),(0,a.jsx)("div",{className:"flex-1 p-6",children:(0,a.jsxs)(ej.Tabs,{defaultValue:"candidatos",className:"w-full",children:[(0,a.jsxs)(ej.TabsList,{className:"grid w-full grid-cols-4 mb-6",children:[(0,a.jsx)(ej.TabsTrigger,{value:"candidatos",children:"Candidatos"}),(0,a.jsx)(ej.TabsTrigger,{value:"exames",children:"Exames de Acesso"}),(0,a.jsx)(ej.TabsTrigger,{value:"resultados",children:"Resultados"}),(0,a.jsx)(ej.TabsTrigger,{value:"exportar",children:"Exportar Dados"})]}),(0,a.jsx)(ej.TabsContent,{value:"candidatos",children:(0,a.jsxs)("div",{className:"space-y-4",children:[(0,a.jsxs)("div",{className:"flex items-center gap-4",children:[(0,a.jsx)("label",{className:"text-sm font-medium",children:"Selecione o curso:"}),(0,a.jsxs)(A.Select,{value:r,onValueChange:i,children:[(0,a.jsx)(A.SelectTrigger,{className:"w-[300px]",children:(0,a.jsx)(A.SelectValue,{placeholder:"Selecione um curso"})}),(0,a.jsx)(A.SelectContent,{children:l?(0,a.jsx)(A.SelectItem,{value:"loading",disabled:!0,children:"Carregando cursos..."}):0===k.length?(0,a.jsx)(A.SelectItem,{value:"empty",disabled:!0,children:"Nenhum curso disponível"}):k.map(e=>(0,a.jsx)(A.SelectItem,{value:e.id,children:e.name},e.id))})]})]}),r?m?(0,a.jsxs)("div",{className:"text-center py-12",children:[(0,a.jsx)("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto"}),(0,a.jsx)("p",{className:"mt-4 text-gray-600 dark:text-gray-400",children:"Carregando candidaturas..."})]}):x?(0,a.jsxs)("div",{className:"text-center py-12 text-red-500",children:["Erro: ",x]}):0===D.length?(0,a.jsx)("div",{className:"text-center py-12 text-gray-500",children:"Nenhuma candidatura encontrada para este curso"}):(0,a.jsx)(n.default,{title:"Candidaturas Recentes",description:"Gerencie e visualize as candidaturas mais recentes",addButtonText:"Nova Candidatura",searchPlaceholder:"Buscar por nome ou candidatura...",data:D,fieldLabels:{name:"Nome do Candidato",enrollmentNumber:"Nº Candidatura",course:"Curso",class:"Turma",enrollmentDate:"Data de Candidatura",status:"Estado",phone:"Telefone",email:"Email de Contacto"},onAddNew:()=>eC.toast.info("Funcionalidade em desenvolvimento"),onSave:B,onApprove:async e=>{e.enrollment&&await L(e.enrollment.id)},onReject:async e=>{e.enrollment&&await F(e.enrollment.id)}}):(0,a.jsx)("div",{className:"text-center py-12 text-gray-500",children:"Selecione um curso para visualizar as candidaturas"})]})}),(0,a.jsx)(ej.TabsContent,{value:"exames",children:(0,a.jsx)(T,{})}),(0,a.jsx)(ej.TabsContent,{value:"resultados",children:(0,a.jsx)(ee,{})}),(0,a.jsx)(ej.TabsContent,{value:"exportar",children:(0,a.jsx)(eg,{})})]})})]})})})]}),(0,a.jsx)(ev.Dialog,{open:y,onOpenChange:S,children:(0,a.jsxs)(ev.DialogContent,{children:[(0,a.jsxs)(ev.DialogHeader,{children:[(0,a.jsx)(ev.DialogTitle,{children:"Rejeitar Candidatura"}),(0,a.jsx)(ev.DialogDescription,{children:"Tem certeza que deseja rejeitar esta candidatura? Você pode adicionar um motivo (opcional)."})]}),(0,a.jsx)("div",{className:"space-y-4 py-4",children:(0,a.jsxs)("div",{className:"space-y-2",children:[(0,a.jsx)(j.Label,{htmlFor:"reject-reason",children:"Motivo da rejeição (opcional)"}),(0,a.jsx)(g.Input,{id:"reject-reason",placeholder:"Digite o motivo da rejeição...",value:I,onChange:e=>E(e.target.value)})]})}),(0,a.jsxs)(ev.DialogFooter,{children:[(0,a.jsx)(f.Button,{variant:"outline",onClick:()=>{S(!1),w(null),E("")},children:"Cancelar"}),(0,a.jsx)(f.Button,{variant:"destructive",onClick:M,children:"Confirmar Rejeição"})]})]})})]})}e.s(["default",()=>ey],16568)}]);