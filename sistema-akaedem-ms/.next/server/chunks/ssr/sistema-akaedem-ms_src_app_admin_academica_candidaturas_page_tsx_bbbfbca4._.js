module.exports=[25920,a=>{"use strict";var b=a.i(72183),c=a.i(22540),d=a.i(72538),e=a.i(23290),f=a.i(26629),g=a.i(9643),h=a.i(1857);let i=(0,h.default)("map-pin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);var j=a.i(81997),k=a.i(56735),l=a.i(17699),m=a.i(74495),n=a.i(51009),o=a.i(69329);let p=e.default.div.withConfig({displayName:"access-exams__ExamCard",componentId:"sc-f479bb46-0"})`
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
`,q=e.default.div.withConfig({displayName:"access-exams__ExamHeader",componentId:"sc-f479bb46-1"})`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 16px;
`,r=e.default.h3.withConfig({displayName:"access-exams__ExamTitle",componentId:"sc-f479bb46-2"})`
  font-size: 18px;
  font-weight: 600;
  color: #ebebebff;
  margin: 0;
`,s=e.default.span.withConfig({displayName:"access-exams__ExamBadge",componentId:"sc-f479bb46-3"})`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: ${a=>{switch(a.status){case"agendado":return"#dbeafe";case"em-andamento":return"#fef3c7";case"concluido":return"#d1fae5";default:return"#f3f4f6"}}};
  color: ${a=>{switch(a.status){case"agendado":return"#1e40af";case"em-andamento":return"#92400e";case"concluido":return"#065f46";default:return"#374151"}}};
`,t=e.default.div.withConfig({displayName:"access-exams__ExamInfo",componentId:"sc-f479bb46-4"})`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,u=e.default.div.withConfig({displayName:"access-exams__InfoRow",componentId:"sc-f479bb46-5"})`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #c1c1c1ff;

  svg {
    width: 16px;
    height: 16px;
  }
`,v=e.default.div.withConfig({displayName:"access-exams__ExamsGrid",componentId:"sc-f479bb46-6"})`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 20px;
`,w=e.default.div.withConfig({displayName:"access-exams__SectionHeader",componentId:"sc-f479bb46-7"})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,x=e.default.h2.withConfig({displayName:"access-exams__SectionTitle",componentId:"sc-f479bb46-8"})`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
`;function y(){let[a,d]=(0,c.useState)([]),[e,h]=(0,c.useState)({nome:"",data:"",hora:"",local:"",vagas:""});return(0,b.jsxs)("div",{style:{padding:"20px"},children:[(0,b.jsxs)(w,{children:[(0,b.jsx)(x,{children:"Exames de Acesso"}),(0,b.jsxs)(l.Sheet,{children:[(0,b.jsx)(l.SheetTrigger,{asChild:!0,children:(0,b.jsxs)(m.Button,{children:[(0,b.jsx)(k.Plus,{className:"mr-2 h-4 w-4"}),"Novo Exame"]})}),(0,b.jsxs)(l.SheetContent,{children:[(0,b.jsxs)(l.SheetHeader,{children:[(0,b.jsx)(l.SheetTitle,{children:"Criar Novo Exame"}),(0,b.jsx)(l.SheetDescription,{children:"Preencha os detalhes do exame de acesso"})]}),(0,b.jsxs)("div",{className:"grid gap-4 py-4",children:[(0,b.jsxs)("div",{className:"grid gap-2",children:[(0,b.jsx)(o.Label,{htmlFor:"nome",children:"Nome do Exame"}),(0,b.jsx)(n.Input,{id:"nome",value:e.nome,onChange:a=>h({...e,nome:a.target.value}),placeholder:"Ex: Exame de Matemática"})]}),(0,b.jsxs)("div",{className:"grid gap-2",children:[(0,b.jsx)(o.Label,{htmlFor:"data",children:"Data"}),(0,b.jsx)(n.Input,{id:"data",type:"date",value:e.data,onChange:a=>h({...e,data:a.target.value})})]}),(0,b.jsxs)("div",{className:"grid gap-2",children:[(0,b.jsx)(o.Label,{htmlFor:"hora",children:"Hora"}),(0,b.jsx)(n.Input,{id:"hora",type:"time",value:e.hora,onChange:a=>h({...e,hora:a.target.value})})]}),(0,b.jsxs)("div",{className:"grid gap-2",children:[(0,b.jsx)(o.Label,{htmlFor:"local",children:"Local"}),(0,b.jsx)(n.Input,{id:"local",value:e.local,onChange:a=>h({...e,local:a.target.value}),placeholder:"Ex: Campus Principal - Sala 101"})]}),(0,b.jsxs)("div",{className:"grid gap-2",children:[(0,b.jsx)(o.Label,{htmlFor:"vagas",children:"Número de Vagas"}),(0,b.jsx)(n.Input,{id:"vagas",type:"number",value:e.vagas,onChange:a=>h({...e,vagas:a.target.value}),placeholder:"Ex: 50"})]}),(0,b.jsx)(m.Button,{onClick:()=>{e.nome&&e.data&&e.hora&&e.local&&e.vagas&&(d([...a,{id:Date.now().toString(),nome:e.nome,data:e.data,hora:e.hora,local:e.local,vagas:parseInt(e.vagas),inscritos:0,status:"agendado"}]),h({nome:"",data:"",hora:"",local:"",vagas:""}))},className:"w-full",children:"Criar Exame"})]})]})]})]}),(0,b.jsx)(v,{children:a.map(a=>(0,b.jsxs)(p,{children:[(0,b.jsxs)(q,{children:[(0,b.jsx)(r,{children:a.nome}),(0,b.jsxs)(s,{status:a.status,children:["agendado"===a.status&&"Agendado","em-andamento"===a.status&&"Em Andamento","concluido"===a.status&&"Concluído"]})]}),(0,b.jsxs)(t,{children:[(0,b.jsxs)(u,{children:[(0,b.jsx)(f.Calendar,{}),(0,b.jsx)("span",{children:new Date(a.data).toLocaleDateString("pt-PT",{day:"2-digit",month:"long",year:"numeric"})})]}),(0,b.jsxs)(u,{children:[(0,b.jsx)(g.Clock,{}),(0,b.jsx)("span",{children:a.hora})]}),(0,b.jsxs)(u,{children:[(0,b.jsx)(i,{}),(0,b.jsx)("span",{children:a.local})]}),(0,b.jsxs)(u,{children:[(0,b.jsx)(j.Users,{}),(0,b.jsxs)("span",{children:[a.inscritos," / ",a.vagas," inscritos"]})]})]})]},a.id))})]})}var z=a.i(71501),A=a.i(62022),B=a.i(77828),C=a.i(59086),D=a.i(70290),E=a.i(62257),F=a.i(27224),G=a.i(13048),H=a.i(24321),I=a.i(50308),J=a.i(47833),K=a.i(57696);let L=[],M={approved:{label:"Aprovados",color:"var(--chart-1)"},failed:{label:"Reprovados",color:"var(--chart-2)"}};function N(){return(0,b.jsxs)(J.Card,{children:[(0,b.jsxs)(J.CardHeader,{children:[(0,b.jsx)(J.CardTitle,{children:"Alunos por Curso"}),(0,b.jsx)(J.CardDescription,{children:"Quantidade de aprovados e reprovados"})]}),(0,b.jsx)(J.CardContent,{children:(0,b.jsx)(K.ChartContainer,{config:M,children:(0,b.jsxs)(G.BarChart,{accessibilityLayer:!0,data:L,children:[(0,b.jsx)(H.CartesianGrid,{vertical:!1}),(0,b.jsx)(I.XAxis,{dataKey:"course",tickLine:!1,tickMargin:10,axisLine:!1}),(0,b.jsx)(K.ChartTooltip,{cursor:!1,content:(0,b.jsx)(K.ChartTooltipContent,{indicator:"dashed"})}),(0,b.jsx)(F.Bar,{dataKey:"approved",fill:"var(--color-approved)",radius:4}),(0,b.jsx)(F.Bar,{dataKey:"failed",fill:"var(--color-failed)",radius:4})]})})}),(0,b.jsxs)(J.CardFooter,{className:"flex-col items-start gap-2 text-sm",children:[(0,b.jsxs)("div",{className:"flex gap-2 leading-none font-medium",children:["Desempenho por curso ",(0,b.jsx)(E.TrendingUp,{className:"h-4 w-4"})]}),(0,b.jsx)("div",{className:"text-muted-foreground leading-none",children:"Mostrando alunos aprovados e reprovados"})]})]})}let O=e.default.div.withConfig({displayName:"exam-results__ResultsContainer",componentId:"sc-74a3a4b-0"})`
  background: transparent;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
`,P=e.default.div.withConfig({displayName:"exam-results__Header",componentId:"sc-74a3a4b-1"})`
  margin-bottom: 24px;
`,Q=e.default.h2.withConfig({displayName:"exam-results__Title",componentId:"sc-74a3a4b-2"})`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16px;
`,R=e.default.div.withConfig({displayName:"exam-results__FiltersRow",componentId:"sc-74a3a4b-3"})`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`,S=e.default.div.withConfig({displayName:"exam-results__SearchWrapper",componentId:"sc-74a3a4b-4"})`
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
`,T=e.default.div.withConfig({displayName:"exam-results__StatsGrid",componentId:"sc-74a3a4b-5"})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`,U=e.default.div.withConfig({displayName:"exam-results__StatCard",componentId:"sc-74a3a4b-6"})`
  background: #18181bff;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #979797ff;
`,V=e.default.div.withConfig({displayName:"exam-results__StatLabel",componentId:"sc-74a3a4b-7"})`
  font-size: 14px;
  color: #979797ff;
  margin-bottom: 4px;
`,W=e.default.div.withConfig({displayName:"exam-results__StatValue",componentId:"sc-74a3a4b-8"})`
  font-size: 24px;
  font-weight: 600;
  color: #d1d1d1ff;
`,X=e.default.div.withConfig({displayName:"exam-results__StatusBadge",componentId:"sc-74a3a4b-9"})`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 4px 8px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  background: ${a=>{switch(a.status){case"aprovado":return"#d1fae5";case"reprovado":return"#fee2e2";case"pendente":return"#fef3c7";default:return"#f3f4f6"}}};
  color: ${a=>{switch(a.status){case"aprovado":return"#065f46";case"reprovado":return"#991b1b";case"pendente":return"#92400e";default:return"#374151"}}};

  svg {
    width: 14px;
    height: 14px;
  }
`;function Y(){let[a,d]=(0,c.useState)(""),[e,f]=(0,c.useState)("todos"),[h,i]=(0,c.useState)("todos"),j=[],k=j.filter(b=>{let c=b.candidatoNome.toLowerCase().includes(a.toLowerCase())||b.candidatoBI.toLowerCase().includes(a.toLowerCase()),d="todos"===e||b.status===e,f="todos"===h||b.exame===h;return c&&d&&f}),l={total:j.length,aprovados:j.filter(a=>"aprovado"===a.status).length,reprovados:j.filter(a=>"reprovado"===a.status).length,pendentes:j.filter(a=>"pendente"===a.status).length,mediaGeral:(j.reduce((a,b)=>a+b.nota,0)/j.length).toFixed(1)};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(O,{children:[(0,b.jsxs)(P,{children:[(0,b.jsx)(Q,{children:"Resultados dos Exames"}),(0,b.jsxs)(T,{children:[(0,b.jsxs)(U,{children:[(0,b.jsx)(V,{children:"Total de Candidatos"}),(0,b.jsx)(W,{children:l.total})]}),(0,b.jsxs)(U,{children:[(0,b.jsx)(V,{children:"Aprovados"}),(0,b.jsx)(W,{style:{color:"#059669"},children:l.aprovados})]}),(0,b.jsxs)(U,{children:[(0,b.jsx)(V,{children:"Reprovados"}),(0,b.jsx)(W,{style:{color:"#dc2626"},children:l.reprovados})]}),(0,b.jsxs)(U,{children:[(0,b.jsx)(V,{children:"Pendentes"}),(0,b.jsx)(W,{style:{color:"#d97706"},children:l.pendentes})]}),(0,b.jsxs)(U,{children:[(0,b.jsx)(V,{children:"Média Geral"}),(0,b.jsx)(W,{children:l.mediaGeral})]})]}),(0,b.jsxs)(R,{children:[(0,b.jsxs)(S,{children:[(0,b.jsx)(z.Search,{}),(0,b.jsx)(n.Input,{placeholder:"Pesquisar por nome ou BI...",value:a,onChange:a=>d(a.target.value)})]}),(0,b.jsxs)(C.Select,{value:h,onValueChange:i,children:[(0,b.jsx)(C.SelectTrigger,{className:"w-[200px]",children:(0,b.jsx)(C.SelectValue,{placeholder:"Filtrar por exame"})}),(0,b.jsxs)(C.SelectContent,{children:[(0,b.jsx)(C.SelectItem,{value:"todos",children:"Todos os exames"}),(0,b.jsx)(C.SelectItem,{value:"Exame de Matemática",children:"Matemática"}),(0,b.jsx)(C.SelectItem,{value:"Exame de Português",children:"Português"})]})]}),(0,b.jsxs)(C.Select,{value:e,onValueChange:f,children:[(0,b.jsx)(C.SelectTrigger,{className:"w-[180px]",children:(0,b.jsx)(C.SelectValue,{placeholder:"Filtrar por status"})}),(0,b.jsxs)(C.SelectContent,{children:[(0,b.jsx)(C.SelectItem,{value:"todos",children:"Todos"}),(0,b.jsx)(C.SelectItem,{value:"aprovado",children:"Aprovados"}),(0,b.jsx)(C.SelectItem,{value:"reprovado",children:"Reprovados"}),(0,b.jsx)(C.SelectItem,{value:"pendente",children:"Pendentes"})]})]})]})]}),(0,b.jsxs)(D.Table,{children:[(0,b.jsx)(D.TableHeader,{children:(0,b.jsxs)(D.TableRow,{children:[(0,b.jsx)(D.TableHead,{children:"Candidato"}),(0,b.jsx)(D.TableHead,{children:"BI"}),(0,b.jsx)(D.TableHead,{children:"Exame"}),(0,b.jsx)(D.TableHead,{children:"Nota"}),(0,b.jsx)(D.TableHead,{children:"Data"}),(0,b.jsx)(D.TableHead,{children:"Status"})]})}),(0,b.jsx)(D.TableBody,{children:k.map(a=>(0,b.jsxs)(D.TableRow,{children:[(0,b.jsx)(D.TableCell,{className:"font-medium",children:a.candidatoNome}),(0,b.jsx)(D.TableCell,{children:a.candidatoBI}),(0,b.jsx)(D.TableCell,{children:a.exame}),(0,b.jsx)(D.TableCell,{children:"pendente"===a.status?"-":`${a.nota} / ${a.notaMaxima}`}),(0,b.jsx)(D.TableCell,{children:new Date(a.data).toLocaleDateString("pt-PT")}),(0,b.jsx)(D.TableCell,{children:(0,b.jsxs)(X,{status:a.status,children:[(a=>{switch(a){case"aprovado":return(0,b.jsx)(A.CheckCircle,{});case"reprovado":return(0,b.jsx)(B.XCircle,{});case"pendente":return(0,b.jsx)(g.Clock,{});default:return null}})(a.status),a.status.charAt(0).toUpperCase()+a.status.slice(1)]})})]},a.id))})]})]}),(0,b.jsx)("div",{style:{width:"600px",marginTop:"89px"},children:(0,b.jsx)(N,{})})]})}var Z=a.i(20417),$=a.i(57292);let _=(0,h.default)("file-spreadsheet",[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]]);var aa=a.i(73673);let ab=e.default.div.withConfig({displayName:"export-data__ExportContainer",componentId:"sc-a40c6b13-0"})`
  max-width: 800px;
  margin: 0 auto;
`,ac=e.default.div.withConfig({displayName:"export-data__FormatGrid",componentId:"sc-a40c6b13-1"})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`,ad=e.default.div.withConfig({displayName:"export-data__FormatCard",componentId:"sc-a40c6b13-2"})`
  padding: 20px;
  border-radius: 8px;
  border: 2px solid ${a=>a.selected?"#2563eb":"#e5e7eb"};
  background: ${a=>a.selected?"#eff6ff":"white"};
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
    color: ${a=>a.selected?"#2563eb":"#6b7280"};
  }
`,ae=e.default.div.withConfig({displayName:"export-data__FormatName",componentId:"sc-a40c6b13-3"})`
  font-weight: 500;
  color: #1f2937;
`,af=e.default.div.withConfig({displayName:"export-data__FormatDescription",componentId:"sc-a40c6b13-4"})`
  font-size: 12px;
  color: #6b7280;
  text-align: center;
`,ag=e.default.div.withConfig({displayName:"export-data__OptionsSection",componentId:"sc-a40c6b13-5"})`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,ah=e.default.div.withConfig({displayName:"export-data__CheckboxGroup",componentId:"sc-a40c6b13-6"})`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,ai=e.default.div.withConfig({displayName:"export-data__CheckboxItem",componentId:"sc-a40c6b13-7"})`
  display: flex;
  align-items: center;
  gap: 8px;
`;function aj(){let[a,d]=(0,c.useState)(null),[e,f]=(0,c.useState)("todos"),[g,h]=(0,c.useState)({includeCandidatos:!0,includeExames:!0,includeResultados:!0,includeEstatisticas:!1}),[i,j]=(0,c.useState)(!1),k=[{id:"csv",name:"CSV",description:"Compatível com Excel e Google Sheets",icon:_},{id:"xlsx",name:"Excel",description:"Formato Microsoft Excel",icon:_},{id:"pdf",name:"PDF",description:"Documento formatado para impressão",icon:$.FileText}],l=a=>{h(b=>({...b,[a]:!b[a]}))};return(0,b.jsx)(ab,{children:(0,b.jsxs)(J.Card,{children:[(0,b.jsxs)(J.CardHeader,{children:[(0,b.jsx)(J.CardTitle,{children:"Exportar Dados"}),(0,b.jsx)(J.CardDescription,{children:"Escolha o formato e os dados que deseja exportar"})]}),(0,b.jsxs)(J.CardContent,{children:[(0,b.jsxs)("div",{children:[(0,b.jsx)(o.Label,{className:"mb-3 block",children:"Formato de Exportação"}),(0,b.jsx)(ac,{children:k.map(c=>(0,b.jsxs)(ad,{selected:a===c.id,onClick:()=>d(c.id),children:[(0,b.jsx)(c.icon,{}),(0,b.jsx)(ae,{children:c.name}),(0,b.jsx)(af,{children:c.description})]},c.id))})]}),(0,b.jsxs)(ag,{children:[(0,b.jsxs)("div",{children:[(0,b.jsx)(o.Label,{htmlFor:"data-type",className:"mb-2 block",children:"Tipo de Dados"}),(0,b.jsxs)(C.Select,{value:e,onValueChange:f,children:[(0,b.jsx)(C.SelectTrigger,{id:"data-type",children:(0,b.jsx)(C.SelectValue,{placeholder:"Selecione o tipo de dados"})}),(0,b.jsxs)(C.SelectContent,{children:[(0,b.jsx)(C.SelectItem,{value:"todos",children:"Todos os dados"}),(0,b.jsx)(C.SelectItem,{value:"candidatos",children:"Apenas Candidatos"}),(0,b.jsx)(C.SelectItem,{value:"exames",children:"Apenas Exames"}),(0,b.jsx)(C.SelectItem,{value:"resultados",children:"Apenas Resultados"})]})]})]}),"todos"===e&&(0,b.jsxs)("div",{children:[(0,b.jsx)(o.Label,{className:"mb-3 block",children:"Incluir nas Exportações"}),(0,b.jsxs)(ah,{children:[(0,b.jsxs)(ai,{children:[(0,b.jsx)(aa.Checkbox,{id:"candidatos",checked:g.includeCandidatos,onCheckedChange:()=>l("includeCandidatos")}),(0,b.jsx)(o.Label,{htmlFor:"candidatos",className:"cursor-pointer",children:"Lista de Candidatos"})]}),(0,b.jsxs)(ai,{children:[(0,b.jsx)(aa.Checkbox,{id:"exames",checked:g.includeExames,onCheckedChange:()=>l("includeExames")}),(0,b.jsx)(o.Label,{htmlFor:"exames",className:"cursor-pointer",children:"Dados dos Exames de Acesso"})]}),(0,b.jsxs)(ai,{children:[(0,b.jsx)(aa.Checkbox,{id:"resultados",checked:g.includeResultados,onCheckedChange:()=>l("includeResultados")}),(0,b.jsx)(o.Label,{htmlFor:"resultados",className:"cursor-pointer",children:"Resultados dos Exames"})]}),(0,b.jsxs)(ai,{children:[(0,b.jsx)(aa.Checkbox,{id:"estatisticas",checked:g.includeEstatisticas,onCheckedChange:()=>l("includeEstatisticas")}),(0,b.jsx)(o.Label,{htmlFor:"estatisticas",className:"cursor-pointer",children:"Estatísticas e Gráficos"})]})]})]}),(0,b.jsxs)(m.Button,{onClick:()=>{if(!a)return void alert("Por favor, selecione um formato de exportação.");j(!0);let b=`candidaturas_${new Date().toISOString().split("T")[0]}.${a}`;setTimeout(()=>{alert(`Exporta\xe7\xe3o conclu\xedda: ${b}`),j(!1)},2e3)},className:"w-full mt-4",size:"lg",disabled:i,children:[(0,b.jsx)(Z.Download,{className:"mr-2 h-4 w-4"}),i?"Exportando...":"Exportar Dados"]})]})]})]})})}var ak=a.i(10892),al=a.i(52614),am=a.i(32473),an=a.i(97738),ao=a.i(21315);function ap(){let{courses:a,loading:e}=(0,an.useCourses)(),[f,g]=(0,c.useState)(""),{enrollments:h,loading:i,error:j,approveEnrollment:k,rejectEnrollment:l,updateEnrollment:p}=(0,am.useEnrollments)({courseId:f||void 0,autoFetch:!!f}),[q,r]=(0,c.useState)(null),[s,t]=(0,c.useState)({class:"",student_phone:"",student_name:"",student_email:""}),[u,v]=(0,c.useState)(!1),[w,x]=(0,c.useState)(null),[z,A]=(0,c.useState)(""),B=Array.isArray(a)?a:[],D=h.map((a,b)=>({id:parseInt(a.id,10)||b+1,photo:`https://api.dicebear.com/7.x/avataaars/svg?seed=${a.student?.name||a.student_name||a.id}`,name:a.student?.name||a.student_name||"N/A",enrollmentNumber:a.student_id||a.id,course:a.course?.name||"N/A",class:a.class||"",enrollmentDate:a.enrollment_date||a.created_at,status:"pending"===a.status?"Pendente":"approved"===a.status?"Aprovada":"Rejeitada",phone:a.student?.phone||a.student_phone||"N/A",email:a.student?.email||a.student_email||"N/A",enrollment:a})),E=async a=>{try{await k(a)}catch(a){}},F=async a=>{x(a),v(!0)},G=async()=>{if(w)try{await l(w,z||void 0),v(!1),x(null),A("")}catch(a){}},H=async(a,b)=>{a.enrollment&&await p(a.enrollment.id,b)};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsx)("div",{className:"flex flex-1 flex-col",children:(0,b.jsx)("div",{className:"@container/main flex flex-1 flex-col gap-2",children:(0,b.jsx)("div",{className:"flex-1 p-6",children:(0,b.jsxs)(ak.Tabs,{defaultValue:"candidatos",className:"w-full",children:[(0,b.jsxs)(ak.TabsList,{className:"grid w-full grid-cols-4 mb-6",children:[(0,b.jsx)(ak.TabsTrigger,{value:"candidatos",children:"Candidatos"}),(0,b.jsx)(ak.TabsTrigger,{value:"exames",children:"Exames de Acesso"}),(0,b.jsx)(ak.TabsTrigger,{value:"resultados",children:"Resultados"}),(0,b.jsx)(ak.TabsTrigger,{value:"exportar",children:"Exportar Dados"})]}),(0,b.jsx)(ak.TabsContent,{value:"candidatos",children:(0,b.jsxs)("div",{className:"space-y-4",children:[(0,b.jsxs)("div",{className:"flex items-center gap-4",children:[(0,b.jsx)("label",{className:"text-sm font-medium",children:"Selecione o curso:"}),(0,b.jsxs)(C.Select,{value:f,onValueChange:g,children:[(0,b.jsx)(C.SelectTrigger,{className:"w-[300px]",children:(0,b.jsx)(C.SelectValue,{placeholder:"Selecione um curso"})}),(0,b.jsx)(C.SelectContent,{children:e?(0,b.jsx)(C.SelectItem,{value:"loading",disabled:!0,children:"Carregando cursos..."}):0===B.length?(0,b.jsx)(C.SelectItem,{value:"empty",disabled:!0,children:"Nenhum curso disponível"}):B.map(a=>(0,b.jsx)(C.SelectItem,{value:a.id,children:a.name},a.id))})]})]}),f?i?(0,b.jsxs)("div",{className:"text-center py-12",children:[(0,b.jsx)("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto"}),(0,b.jsx)("p",{className:"mt-4 text-gray-600 dark:text-gray-400",children:"Carregando candidaturas..."})]}):j?(0,b.jsxs)("div",{className:"text-center py-12 text-red-500",children:["Erro: ",j]}):0===D.length?(0,b.jsx)("div",{className:"text-center py-12 text-gray-500",children:"Nenhuma candidatura encontrada para este curso"}):(0,b.jsx)(d.default,{title:"Candidaturas Recentes",description:"Gerencie e visualize as candidaturas mais recentes",addButtonText:"Nova Candidatura",searchPlaceholder:"Buscar por nome ou candidatura...",data:D,fieldLabels:{name:"Nome do Candidato",enrollmentNumber:"Nº Candidatura",course:"Curso",class:"Turma",enrollmentDate:"Data de Candidatura",status:"Estado",phone:"Telefone",email:"Email de Contacto"},onAddNew:()=>ao.toast.info("Funcionalidade em desenvolvimento"),onSave:H,onApprove:async a=>{a.enrollment&&await E(a.enrollment.id)},onReject:async a=>{a.enrollment&&await F(a.enrollment.id)}}):(0,b.jsx)("div",{className:"text-center py-12 text-gray-500",children:"Selecione um curso para visualizar as candidaturas"})]})}),(0,b.jsx)(ak.TabsContent,{value:"exames",children:(0,b.jsx)(y,{})}),(0,b.jsx)(ak.TabsContent,{value:"resultados",children:(0,b.jsx)(Y,{})}),(0,b.jsx)(ak.TabsContent,{value:"exportar",children:(0,b.jsx)(aj,{})})]})})})}),(0,b.jsx)(al.Dialog,{open:u,onOpenChange:v,children:(0,b.jsxs)(al.DialogContent,{children:[(0,b.jsxs)(al.DialogHeader,{children:[(0,b.jsx)(al.DialogTitle,{children:"Rejeitar Candidatura"}),(0,b.jsx)(al.DialogDescription,{children:"Tem certeza que deseja rejeitar esta candidatura? Você pode adicionar um motivo (opcional)."})]}),(0,b.jsx)("div",{className:"space-y-4 py-4",children:(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsx)(o.Label,{htmlFor:"reject-reason",children:"Motivo da rejeição (opcional)"}),(0,b.jsx)(n.Input,{id:"reject-reason",placeholder:"Digite o motivo da rejeição...",value:z,onChange:a=>A(a.target.value)})]})}),(0,b.jsxs)(al.DialogFooter,{children:[(0,b.jsx)(m.Button,{variant:"outline",onClick:()=>{v(!1),x(null),A("")},children:"Cancelar"}),(0,b.jsx)(m.Button,{variant:"destructive",onClick:G,children:"Confirmar Rejeição"})]})]})})]})}a.s(["default",()=>ap],25920)}];

//# sourceMappingURL=sistema-akaedem-ms_src_app_admin_academica_candidaturas_page_tsx_bbbfbca4._.js.map