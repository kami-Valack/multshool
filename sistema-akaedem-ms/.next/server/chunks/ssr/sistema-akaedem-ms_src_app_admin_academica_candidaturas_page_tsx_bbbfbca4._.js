module.exports=[25920,a=>{"use strict";var b=a.i(72183),c=a.i(22540),d=a.i(44421),e=a.i(24928),f=a.i(10770),g=a.i(72538),h=a.i(23290),i=a.i(26629),j=a.i(9643),k=a.i(1857);let l=(0,k.default)("map-pin",[["path",{d:"M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",key:"1r0f0z"}],["circle",{cx:"12",cy:"10",r:"3",key:"ilqhr7"}]]);var m=a.i(81997),n=a.i(56735),o=a.i(17699),p=a.i(74495),q=a.i(51009),r=a.i(69329);let s=h.default.div.withConfig({displayName:"access-exams__ExamCard",componentId:"sc-f479bb46-0"})`
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
`,t=h.default.div.withConfig({displayName:"access-exams__ExamHeader",componentId:"sc-f479bb46-1"})`
  display: flex;
  justify-content: space-between;
  align-items: start;
  margin-bottom: 16px;
`,u=h.default.h3.withConfig({displayName:"access-exams__ExamTitle",componentId:"sc-f479bb46-2"})`
  font-size: 18px;
  font-weight: 600;
  color: #ebebebff;
  margin: 0;
`,v=h.default.span.withConfig({displayName:"access-exams__ExamBadge",componentId:"sc-f479bb46-3"})`
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 500;
  background: ${a=>{switch(a.status){case"agendado":return"#dbeafe";case"em-andamento":return"#fef3c7";case"concluido":return"#d1fae5";default:return"#f3f4f6"}}};
  color: ${a=>{switch(a.status){case"agendado":return"#1e40af";case"em-andamento":return"#92400e";case"concluido":return"#065f46";default:return"#374151"}}};
`,w=h.default.div.withConfig({displayName:"access-exams__ExamInfo",componentId:"sc-f479bb46-4"})`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,x=h.default.div.withConfig({displayName:"access-exams__InfoRow",componentId:"sc-f479bb46-5"})`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #c1c1c1ff;

  svg {
    width: 16px;
    height: 16px;
  }
`,y=h.default.div.withConfig({displayName:"access-exams__ExamsGrid",componentId:"sc-f479bb46-6"})`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
  margin-top: 20px;
`,z=h.default.div.withConfig({displayName:"access-exams__SectionHeader",componentId:"sc-f479bb46-7"})`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`,A=h.default.h2.withConfig({displayName:"access-exams__SectionTitle",componentId:"sc-f479bb46-8"})`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
`;function B(){let[a,d]=(0,c.useState)([{id:"1",nome:"Exame de Matemática",data:"2025-11-15",hora:"09:00",local:"Campus Principal - Sala 101",vagas:50,inscritos:42,status:"agendado"},{id:"2",nome:"Exame de Português",data:"2025-11-16",hora:"14:00",local:"Campus Principal - Sala 102",vagas:50,inscritos:38,status:"agendado"}]),[e,f]=(0,c.useState)({nome:"",data:"",hora:"",local:"",vagas:""});return(0,b.jsxs)("div",{style:{padding:"20px"},children:[(0,b.jsxs)(z,{children:[(0,b.jsx)(A,{children:"Exames de Acesso"}),(0,b.jsxs)(o.Sheet,{children:[(0,b.jsx)(o.SheetTrigger,{asChild:!0,children:(0,b.jsxs)(p.Button,{children:[(0,b.jsx)(n.Plus,{className:"mr-2 h-4 w-4"}),"Novo Exame"]})}),(0,b.jsxs)(o.SheetContent,{children:[(0,b.jsxs)(o.SheetHeader,{children:[(0,b.jsx)(o.SheetTitle,{children:"Criar Novo Exame"}),(0,b.jsx)(o.SheetDescription,{children:"Preencha os detalhes do exame de acesso"})]}),(0,b.jsxs)("div",{className:"grid gap-4 py-4",children:[(0,b.jsxs)("div",{className:"grid gap-2",children:[(0,b.jsx)(r.Label,{htmlFor:"nome",children:"Nome do Exame"}),(0,b.jsx)(q.Input,{id:"nome",value:e.nome,onChange:a=>f({...e,nome:a.target.value}),placeholder:"Ex: Exame de Matemática"})]}),(0,b.jsxs)("div",{className:"grid gap-2",children:[(0,b.jsx)(r.Label,{htmlFor:"data",children:"Data"}),(0,b.jsx)(q.Input,{id:"data",type:"date",value:e.data,onChange:a=>f({...e,data:a.target.value})})]}),(0,b.jsxs)("div",{className:"grid gap-2",children:[(0,b.jsx)(r.Label,{htmlFor:"hora",children:"Hora"}),(0,b.jsx)(q.Input,{id:"hora",type:"time",value:e.hora,onChange:a=>f({...e,hora:a.target.value})})]}),(0,b.jsxs)("div",{className:"grid gap-2",children:[(0,b.jsx)(r.Label,{htmlFor:"local",children:"Local"}),(0,b.jsx)(q.Input,{id:"local",value:e.local,onChange:a=>f({...e,local:a.target.value}),placeholder:"Ex: Campus Principal - Sala 101"})]}),(0,b.jsxs)("div",{className:"grid gap-2",children:[(0,b.jsx)(r.Label,{htmlFor:"vagas",children:"Número de Vagas"}),(0,b.jsx)(q.Input,{id:"vagas",type:"number",value:e.vagas,onChange:a=>f({...e,vagas:a.target.value}),placeholder:"Ex: 50"})]}),(0,b.jsx)(p.Button,{onClick:()=>{e.nome&&e.data&&e.hora&&e.local&&e.vagas&&(d([...a,{id:Date.now().toString(),nome:e.nome,data:e.data,hora:e.hora,local:e.local,vagas:parseInt(e.vagas),inscritos:0,status:"agendado"}]),f({nome:"",data:"",hora:"",local:"",vagas:""}))},className:"w-full",children:"Criar Exame"})]})]})]})]}),(0,b.jsx)(y,{children:a.map(a=>(0,b.jsxs)(s,{children:[(0,b.jsxs)(t,{children:[(0,b.jsx)(u,{children:a.nome}),(0,b.jsxs)(v,{status:a.status,children:["agendado"===a.status&&"Agendado","em-andamento"===a.status&&"Em Andamento","concluido"===a.status&&"Concluído"]})]}),(0,b.jsxs)(w,{children:[(0,b.jsxs)(x,{children:[(0,b.jsx)(i.Calendar,{}),(0,b.jsx)("span",{children:new Date(a.data).toLocaleDateString("pt-PT",{day:"2-digit",month:"long",year:"numeric"})})]}),(0,b.jsxs)(x,{children:[(0,b.jsx)(j.Clock,{}),(0,b.jsx)("span",{children:a.hora})]}),(0,b.jsxs)(x,{children:[(0,b.jsx)(l,{}),(0,b.jsx)("span",{children:a.local})]}),(0,b.jsxs)(x,{children:[(0,b.jsx)(m.Users,{}),(0,b.jsxs)("span",{children:[a.inscritos," / ",a.vagas," inscritos"]})]})]})]},a.id))})]})}var C=a.i(71501),D=a.i(62022),E=a.i(77828),F=a.i(59086),G=a.i(70290),H=a.i(62257),I=a.i(27224),J=a.i(13048),K=a.i(24321),L=a.i(50308),M=a.i(47833),N=a.i(57696);let O=[{course:"Engenharia",approved:120,failed:30},{course:"Direito",approved:95,failed:50},{course:"Medicina",approved:80,failed:20},{course:"Gestão",approved:70,failed:40},{course:"Informática",approved:60,failed:25}],P={approved:{label:"Aprovados",color:"var(--chart-1)"},failed:{label:"Reprovados",color:"var(--chart-2)"}};function Q(){return(0,b.jsxs)(M.Card,{children:[(0,b.jsxs)(M.CardHeader,{children:[(0,b.jsx)(M.CardTitle,{children:"Alunos por Curso"}),(0,b.jsx)(M.CardDescription,{children:"Quantidade de aprovados e reprovados"})]}),(0,b.jsx)(M.CardContent,{children:(0,b.jsx)(N.ChartContainer,{config:P,children:(0,b.jsxs)(J.BarChart,{accessibilityLayer:!0,data:O,children:[(0,b.jsx)(K.CartesianGrid,{vertical:!1}),(0,b.jsx)(L.XAxis,{dataKey:"course",tickLine:!1,tickMargin:10,axisLine:!1}),(0,b.jsx)(N.ChartTooltip,{cursor:!1,content:(0,b.jsx)(N.ChartTooltipContent,{indicator:"dashed"})}),(0,b.jsx)(I.Bar,{dataKey:"approved",fill:"var(--color-approved)",radius:4}),(0,b.jsx)(I.Bar,{dataKey:"failed",fill:"var(--color-failed)",radius:4})]})})}),(0,b.jsxs)(M.CardFooter,{className:"flex-col items-start gap-2 text-sm",children:[(0,b.jsxs)("div",{className:"flex gap-2 leading-none font-medium",children:["Desempenho por curso ",(0,b.jsx)(H.TrendingUp,{className:"h-4 w-4"})]}),(0,b.jsx)("div",{className:"text-muted-foreground leading-none",children:"Mostrando alunos aprovados e reprovados"})]})]})}let R=h.default.div.withConfig({displayName:"exam-results__ResultsContainer",componentId:"sc-74a3a4b-0"})`
  background: transparent;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  border: 1px solid #e5e7eb;
`,S=h.default.div.withConfig({displayName:"exam-results__Header",componentId:"sc-74a3a4b-1"})`
  margin-bottom: 24px;
`,T=h.default.h2.withConfig({displayName:"exam-results__Title",componentId:"sc-74a3a4b-2"})`
  font-size: 24px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16px;
`,U=h.default.div.withConfig({displayName:"exam-results__FiltersRow",componentId:"sc-74a3a4b-3"})`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`,V=h.default.div.withConfig({displayName:"exam-results__SearchWrapper",componentId:"sc-74a3a4b-4"})`
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
`,W=h.default.div.withConfig({displayName:"exam-results__StatsGrid",componentId:"sc-74a3a4b-5"})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`,X=h.default.div.withConfig({displayName:"exam-results__StatCard",componentId:"sc-74a3a4b-6"})`
  background: #18181bff;
  border-radius: 8px;
  padding: 16px;
  border: 1px solid #979797ff;
`,Y=h.default.div.withConfig({displayName:"exam-results__StatLabel",componentId:"sc-74a3a4b-7"})`
  font-size: 14px;
  color: #979797ff;
  margin-bottom: 4px;
`,Z=h.default.div.withConfig({displayName:"exam-results__StatValue",componentId:"sc-74a3a4b-8"})`
  font-size: 24px;
  font-weight: 600;
  color: #d1d1d1ff;
`,$=h.default.div.withConfig({displayName:"exam-results__StatusBadge",componentId:"sc-74a3a4b-9"})`
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
`;function _(){let[a,d]=(0,c.useState)(""),[e,f]=(0,c.useState)("todos"),[g,h]=(0,c.useState)("todos"),i=[{id:"1",candidatoNome:"João Silva",candidatoBI:"123456789LA",exame:"Exame de Matemática",nota:16.5,notaMaxima:20,status:"aprovado",data:"2025-11-15"},{id:"2",candidatoNome:"Maria Santos",candidatoBI:"987654321LA",exame:"Exame de Matemática",nota:14,notaMaxima:20,status:"aprovado",data:"2025-11-15"},{id:"3",candidatoNome:"Pedro Costa",candidatoBI:"456789123LA",exame:"Exame de Português",nota:8.5,notaMaxima:20,status:"reprovado",data:"2025-11-16"},{id:"4",candidatoNome:"Ana Oliveira",candidatoBI:"321654987LA",exame:"Exame de Português",nota:0,notaMaxima:20,status:"pendente",data:"2025-11-16"}],k=i.filter(b=>{let c=b.candidatoNome.toLowerCase().includes(a.toLowerCase())||b.candidatoBI.toLowerCase().includes(a.toLowerCase()),d="todos"===e||b.status===e,f="todos"===g||b.exame===g;return c&&d&&f}),l={total:i.length,aprovados:i.filter(a=>"aprovado"===a.status).length,reprovados:i.filter(a=>"reprovado"===a.status).length,pendentes:i.filter(a=>"pendente"===a.status).length,mediaGeral:(i.reduce((a,b)=>a+b.nota,0)/i.length).toFixed(1)};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(R,{children:[(0,b.jsxs)(S,{children:[(0,b.jsx)(T,{children:"Resultados dos Exames"}),(0,b.jsxs)(W,{children:[(0,b.jsxs)(X,{children:[(0,b.jsx)(Y,{children:"Total de Candidatos"}),(0,b.jsx)(Z,{children:l.total})]}),(0,b.jsxs)(X,{children:[(0,b.jsx)(Y,{children:"Aprovados"}),(0,b.jsx)(Z,{style:{color:"#059669"},children:l.aprovados})]}),(0,b.jsxs)(X,{children:[(0,b.jsx)(Y,{children:"Reprovados"}),(0,b.jsx)(Z,{style:{color:"#dc2626"},children:l.reprovados})]}),(0,b.jsxs)(X,{children:[(0,b.jsx)(Y,{children:"Pendentes"}),(0,b.jsx)(Z,{style:{color:"#d97706"},children:l.pendentes})]}),(0,b.jsxs)(X,{children:[(0,b.jsx)(Y,{children:"Média Geral"}),(0,b.jsx)(Z,{children:l.mediaGeral})]})]}),(0,b.jsxs)(U,{children:[(0,b.jsxs)(V,{children:[(0,b.jsx)(C.Search,{}),(0,b.jsx)(q.Input,{placeholder:"Pesquisar por nome ou BI...",value:a,onChange:a=>d(a.target.value)})]}),(0,b.jsxs)(F.Select,{value:g,onValueChange:h,children:[(0,b.jsx)(F.SelectTrigger,{className:"w-[200px]",children:(0,b.jsx)(F.SelectValue,{placeholder:"Filtrar por exame"})}),(0,b.jsxs)(F.SelectContent,{children:[(0,b.jsx)(F.SelectItem,{value:"todos",children:"Todos os exames"}),(0,b.jsx)(F.SelectItem,{value:"Exame de Matemática",children:"Matemática"}),(0,b.jsx)(F.SelectItem,{value:"Exame de Português",children:"Português"})]})]}),(0,b.jsxs)(F.Select,{value:e,onValueChange:f,children:[(0,b.jsx)(F.SelectTrigger,{className:"w-[180px]",children:(0,b.jsx)(F.SelectValue,{placeholder:"Filtrar por status"})}),(0,b.jsxs)(F.SelectContent,{children:[(0,b.jsx)(F.SelectItem,{value:"todos",children:"Todos"}),(0,b.jsx)(F.SelectItem,{value:"aprovado",children:"Aprovados"}),(0,b.jsx)(F.SelectItem,{value:"reprovado",children:"Reprovados"}),(0,b.jsx)(F.SelectItem,{value:"pendente",children:"Pendentes"})]})]})]})]}),(0,b.jsxs)(G.Table,{children:[(0,b.jsx)(G.TableHeader,{children:(0,b.jsxs)(G.TableRow,{children:[(0,b.jsx)(G.TableHead,{children:"Candidato"}),(0,b.jsx)(G.TableHead,{children:"BI"}),(0,b.jsx)(G.TableHead,{children:"Exame"}),(0,b.jsx)(G.TableHead,{children:"Nota"}),(0,b.jsx)(G.TableHead,{children:"Data"}),(0,b.jsx)(G.TableHead,{children:"Status"})]})}),(0,b.jsx)(G.TableBody,{children:k.map(a=>(0,b.jsxs)(G.TableRow,{children:[(0,b.jsx)(G.TableCell,{className:"font-medium",children:a.candidatoNome}),(0,b.jsx)(G.TableCell,{children:a.candidatoBI}),(0,b.jsx)(G.TableCell,{children:a.exame}),(0,b.jsx)(G.TableCell,{children:"pendente"===a.status?"-":`${a.nota} / ${a.notaMaxima}`}),(0,b.jsx)(G.TableCell,{children:new Date(a.data).toLocaleDateString("pt-PT")}),(0,b.jsx)(G.TableCell,{children:(0,b.jsxs)($,{status:a.status,children:[(a=>{switch(a){case"aprovado":return(0,b.jsx)(D.CheckCircle,{});case"reprovado":return(0,b.jsx)(E.XCircle,{});case"pendente":return(0,b.jsx)(j.Clock,{});default:return null}})(a.status),a.status.charAt(0).toUpperCase()+a.status.slice(1)]})})]},a.id))})]})]}),(0,b.jsx)("div",{style:{width:"600px",marginTop:"89px"},children:(0,b.jsx)(Q,{})})]})}var aa=a.i(20417),ab=a.i(57292);let ac=(0,k.default)("file-spreadsheet",[["path",{d:"M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",key:"1oefj6"}],["path",{d:"M14 2v5a1 1 0 0 0 1 1h5",key:"wfsgrz"}],["path",{d:"M8 13h2",key:"yr2amv"}],["path",{d:"M14 13h2",key:"un5t4a"}],["path",{d:"M8 17h2",key:"2yhykz"}],["path",{d:"M14 17h2",key:"10kma7"}]]);var ad=a.i(73673);let ae=h.default.div.withConfig({displayName:"export-data__ExportContainer",componentId:"sc-a40c6b13-0"})`
  max-width: 800px;
  margin: 0 auto;
`,af=h.default.div.withConfig({displayName:"export-data__FormatGrid",componentId:"sc-a40c6b13-1"})`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
`,ag=h.default.div.withConfig({displayName:"export-data__FormatCard",componentId:"sc-a40c6b13-2"})`
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
`,ah=h.default.div.withConfig({displayName:"export-data__FormatName",componentId:"sc-a40c6b13-3"})`
  font-weight: 500;
  color: #1f2937;
`,ai=h.default.div.withConfig({displayName:"export-data__FormatDescription",componentId:"sc-a40c6b13-4"})`
  font-size: 12px;
  color: #6b7280;
  text-align: center;
`,aj=h.default.div.withConfig({displayName:"export-data__OptionsSection",componentId:"sc-a40c6b13-5"})`
  margin-top: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`,ak=h.default.div.withConfig({displayName:"export-data__CheckboxGroup",componentId:"sc-a40c6b13-6"})`
  display: flex;
  flex-direction: column;
  gap: 12px;
`,al=h.default.div.withConfig({displayName:"export-data__CheckboxItem",componentId:"sc-a40c6b13-7"})`
  display: flex;
  align-items: center;
  gap: 8px;
`;function am(){let[a,d]=(0,c.useState)(null),[e,f]=(0,c.useState)("todos"),[g,h]=(0,c.useState)({includeCandidatos:!0,includeExames:!0,includeResultados:!0,includeEstatisticas:!1}),[i,j]=(0,c.useState)(!1),k=[{id:"csv",name:"CSV",description:"Compatível com Excel e Google Sheets",icon:ac},{id:"xlsx",name:"Excel",description:"Formato Microsoft Excel",icon:ac},{id:"pdf",name:"PDF",description:"Documento formatado para impressão",icon:ab.FileText}],l=a=>{h(b=>({...b,[a]:!b[a]}))};return(0,b.jsx)(ae,{children:(0,b.jsxs)(M.Card,{children:[(0,b.jsxs)(M.CardHeader,{children:[(0,b.jsx)(M.CardTitle,{children:"Exportar Dados"}),(0,b.jsx)(M.CardDescription,{children:"Escolha o formato e os dados que deseja exportar"})]}),(0,b.jsxs)(M.CardContent,{children:[(0,b.jsxs)("div",{children:[(0,b.jsx)(r.Label,{className:"mb-3 block",children:"Formato de Exportação"}),(0,b.jsx)(af,{children:k.map(c=>(0,b.jsxs)(ag,{selected:a===c.id,onClick:()=>d(c.id),children:[(0,b.jsx)(c.icon,{}),(0,b.jsx)(ah,{children:c.name}),(0,b.jsx)(ai,{children:c.description})]},c.id))})]}),(0,b.jsxs)(aj,{children:[(0,b.jsxs)("div",{children:[(0,b.jsx)(r.Label,{htmlFor:"data-type",className:"mb-2 block",children:"Tipo de Dados"}),(0,b.jsxs)(F.Select,{value:e,onValueChange:f,children:[(0,b.jsx)(F.SelectTrigger,{id:"data-type",children:(0,b.jsx)(F.SelectValue,{placeholder:"Selecione o tipo de dados"})}),(0,b.jsxs)(F.SelectContent,{children:[(0,b.jsx)(F.SelectItem,{value:"todos",children:"Todos os dados"}),(0,b.jsx)(F.SelectItem,{value:"candidatos",children:"Apenas Candidatos"}),(0,b.jsx)(F.SelectItem,{value:"exames",children:"Apenas Exames"}),(0,b.jsx)(F.SelectItem,{value:"resultados",children:"Apenas Resultados"})]})]})]}),"todos"===e&&(0,b.jsxs)("div",{children:[(0,b.jsx)(r.Label,{className:"mb-3 block",children:"Incluir nas Exportações"}),(0,b.jsxs)(ak,{children:[(0,b.jsxs)(al,{children:[(0,b.jsx)(ad.Checkbox,{id:"candidatos",checked:g.includeCandidatos,onCheckedChange:()=>l("includeCandidatos")}),(0,b.jsx)(r.Label,{htmlFor:"candidatos",className:"cursor-pointer",children:"Lista de Candidatos"})]}),(0,b.jsxs)(al,{children:[(0,b.jsx)(ad.Checkbox,{id:"exames",checked:g.includeExames,onCheckedChange:()=>l("includeExames")}),(0,b.jsx)(r.Label,{htmlFor:"exames",className:"cursor-pointer",children:"Dados dos Exames de Acesso"})]}),(0,b.jsxs)(al,{children:[(0,b.jsx)(ad.Checkbox,{id:"resultados",checked:g.includeResultados,onCheckedChange:()=>l("includeResultados")}),(0,b.jsx)(r.Label,{htmlFor:"resultados",className:"cursor-pointer",children:"Resultados dos Exames"})]}),(0,b.jsxs)(al,{children:[(0,b.jsx)(ad.Checkbox,{id:"estatisticas",checked:g.includeEstatisticas,onCheckedChange:()=>l("includeEstatisticas")}),(0,b.jsx)(r.Label,{htmlFor:"estatisticas",className:"cursor-pointer",children:"Estatísticas e Gráficos"})]})]})]}),(0,b.jsxs)(p.Button,{onClick:()=>{if(!a)return void alert("Por favor, selecione um formato de exportação.");j(!0);let b=`candidaturas_${new Date().toISOString().split("T")[0]}.${a}`;setTimeout(()=>{alert(`Exporta\xe7\xe3o conclu\xedda: ${b}`),j(!1)},2e3)},className:"w-full mt-4",size:"lg",disabled:i,children:[(0,b.jsx)(aa.Download,{className:"mr-2 h-4 w-4"}),i?"Exportando...":"Exportar Dados"]})]})]})]})})}var an=a.i(10892),ao=a.i(52614),ap=a.i(32473),aq=a.i(97738),ar=a.i(21315);function as(){let{courses:a,loading:h}=(0,aq.useCourses)(),[i,j]=(0,c.useState)(""),{enrollments:k,loading:l,error:m,approveEnrollment:n,rejectEnrollment:o,updateEnrollment:s}=(0,ap.useEnrollments)({courseId:i||void 0,autoFetch:!!i}),[t,u]=(0,c.useState)(null),[v,w]=(0,c.useState)({class:"",student_phone:"",student_name:"",student_email:""}),[x,y]=(0,c.useState)(!1),[z,A]=(0,c.useState)(null),[C,D]=(0,c.useState)(""),E=Array.isArray(a)?a:[],G=k.map((a,b)=>({id:parseInt(a.id,10)||b+1,photo:`https://api.dicebear.com/7.x/avataaars/svg?seed=${a.student?.name||a.student_name||a.id}`,name:a.student?.name||a.student_name||"N/A",enrollmentNumber:a.student_id||a.id,course:a.course?.name||"N/A",class:a.class||"",enrollmentDate:a.enrollment_date||a.created_at,status:"pending"===a.status?"Pendente":"approved"===a.status?"Aprovada":"Rejeitada",phone:a.student?.phone||a.student_phone||"N/A",email:a.student?.email||a.student_email||"N/A",enrollment:a})),H=async a=>{try{await n(a)}catch(a){}},I=async a=>{A(a),y(!0)},J=async()=>{if(z)try{await o(z,C||void 0),y(!1),A(null),D("")}catch(a){}},K=async(a,b)=>{a.enrollment&&await s(a.enrollment.id,b)};return(0,b.jsxs)(b.Fragment,{children:[(0,b.jsxs)(e.SidebarProvider,{style:{"--sidebar-width":"calc(var(--spacing) * 72)","--header-height":"calc(var(--spacing) * 12)"},children:[(0,b.jsx)(d.AppSidebar,{variant:"sidebar"}),(0,b.jsx)(e.SidebarInset,{children:(0,b.jsx)("div",{className:"flex flex-1 flex-col",children:(0,b.jsxs)("div",{className:"@container/main flex flex-1 flex-col gap-2",children:[(0,b.jsx)(f.default,{}),(0,b.jsx)("div",{className:"flex-1 p-6",children:(0,b.jsxs)(an.Tabs,{defaultValue:"candidatos",className:"w-full",children:[(0,b.jsxs)(an.TabsList,{className:"grid w-full grid-cols-4 mb-6",children:[(0,b.jsx)(an.TabsTrigger,{value:"candidatos",children:"Candidatos"}),(0,b.jsx)(an.TabsTrigger,{value:"exames",children:"Exames de Acesso"}),(0,b.jsx)(an.TabsTrigger,{value:"resultados",children:"Resultados"}),(0,b.jsx)(an.TabsTrigger,{value:"exportar",children:"Exportar Dados"})]}),(0,b.jsx)(an.TabsContent,{value:"candidatos",children:(0,b.jsxs)("div",{className:"space-y-4",children:[(0,b.jsxs)("div",{className:"flex items-center gap-4",children:[(0,b.jsx)("label",{className:"text-sm font-medium",children:"Selecione o curso:"}),(0,b.jsxs)(F.Select,{value:i,onValueChange:j,children:[(0,b.jsx)(F.SelectTrigger,{className:"w-[300px]",children:(0,b.jsx)(F.SelectValue,{placeholder:"Selecione um curso"})}),(0,b.jsx)(F.SelectContent,{children:h?(0,b.jsx)(F.SelectItem,{value:"loading",disabled:!0,children:"Carregando cursos..."}):0===E.length?(0,b.jsx)(F.SelectItem,{value:"empty",disabled:!0,children:"Nenhum curso disponível"}):E.map(a=>(0,b.jsx)(F.SelectItem,{value:a.id,children:a.name},a.id))})]})]}),i?l?(0,b.jsxs)("div",{className:"text-center py-12",children:[(0,b.jsx)("div",{className:"animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white mx-auto"}),(0,b.jsx)("p",{className:"mt-4 text-gray-600 dark:text-gray-400",children:"Carregando candidaturas..."})]}):m?(0,b.jsxs)("div",{className:"text-center py-12 text-red-500",children:["Erro: ",m]}):0===G.length?(0,b.jsx)("div",{className:"text-center py-12 text-gray-500",children:"Nenhuma candidatura encontrada para este curso"}):(0,b.jsx)(g.default,{title:"Candidaturas Recentes",description:"Gerencie e visualize as candidaturas mais recentes",addButtonText:"Nova Candidatura",searchPlaceholder:"Buscar por nome ou candidatura...",data:G,fieldLabels:{name:"Nome do Candidato",enrollmentNumber:"Nº Candidatura",course:"Curso",class:"Turma",enrollmentDate:"Data de Candidatura",status:"Estado",phone:"Telefone",email:"Email de Contacto"},onAddNew:()=>ar.toast.info("Funcionalidade em desenvolvimento"),onSave:K,onApprove:async a=>{a.enrollment&&await H(a.enrollment.id)},onReject:async a=>{a.enrollment&&await I(a.enrollment.id)}}):(0,b.jsx)("div",{className:"text-center py-12 text-gray-500",children:"Selecione um curso para visualizar as candidaturas"})]})}),(0,b.jsx)(an.TabsContent,{value:"exames",children:(0,b.jsx)(B,{})}),(0,b.jsx)(an.TabsContent,{value:"resultados",children:(0,b.jsx)(_,{})}),(0,b.jsx)(an.TabsContent,{value:"exportar",children:(0,b.jsx)(am,{})})]})})]})})})]}),(0,b.jsx)(ao.Dialog,{open:x,onOpenChange:y,children:(0,b.jsxs)(ao.DialogContent,{children:[(0,b.jsxs)(ao.DialogHeader,{children:[(0,b.jsx)(ao.DialogTitle,{children:"Rejeitar Candidatura"}),(0,b.jsx)(ao.DialogDescription,{children:"Tem certeza que deseja rejeitar esta candidatura? Você pode adicionar um motivo (opcional)."})]}),(0,b.jsx)("div",{className:"space-y-4 py-4",children:(0,b.jsxs)("div",{className:"space-y-2",children:[(0,b.jsx)(r.Label,{htmlFor:"reject-reason",children:"Motivo da rejeição (opcional)"}),(0,b.jsx)(q.Input,{id:"reject-reason",placeholder:"Digite o motivo da rejeição...",value:C,onChange:a=>D(a.target.value)})]})}),(0,b.jsxs)(ao.DialogFooter,{children:[(0,b.jsx)(p.Button,{variant:"outline",onClick:()=>{y(!1),A(null),D("")},children:"Cancelar"}),(0,b.jsx)(p.Button,{variant:"destructive",onClick:J,children:"Confirmar Rejeição"})]})]})})]})}a.s(["default",()=>as],25920)}];

//# sourceMappingURL=sistema-akaedem-ms_src_app_admin_academica_candidaturas_page_tsx_bbbfbca4._.js.map