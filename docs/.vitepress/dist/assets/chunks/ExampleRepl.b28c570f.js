${C.trim()}
-->

`:"";D&&(t=t.replace(/<link(.*?)href=("|')(.*?)style.css("|')(.*?)>/g,`<style>

	${D}

</style>`)),F&&(t=t.replace(/<script(.*?)src=("|')\.\/script.js("|')(.*?)>(.*?)<\/script>/g,`<script type='module'>

	${F}

<\/script>`)),A+=t,E["index.html"]=A||""}),E}function y(u,B){const E={};u["import-map.json"]=u["import-map.json"]?u["import-map.json"]:"";const t=u["description.txt"];let F=t?`<!--
${t.trim()}
-->

`:"",D="",C="";return E["index.html"]=F,a(u,E,({template:A,script:r,style:e})=>{e&&(D+=e),A&&(F+=A.replace(/<script(.*?)src=("|')\.\/script.js("|')(.*?)>(.*?)<\/script>/g,`
		<script type="module" >
      import "./script.js"
    <\/script>`)),r&&(C+=r||"")}),E["index.html"]=F,D&&(E["style.css"]=D),C&&(E["script.js"]=C),E}function x(u){window.addEventListener("hashchange",u),c(()=>{window.removeEventListener("hashchange",u)})}const j=d({__name:"ExampleRepl",setup(u){let B=m("prefer-html")||g();const E=new l({serializedState:"",defaultVueRuntimeURL:"",defaultVueServerRendererURL:"",showOutput:!1,outputMode:"preview"});h(t),x(t);function t(){let F=location.hash.slice(1);n.hasOwnProperty(F)||(F="banner",location.hash=`#${F}`),E.setFiles(B.value?v(n[F]):y(n[F]),"index.html")}return(F,D)=>(b(),f(i(s),{store:i(E),showImportMap:!1,showCompileOutput:!1,clearConsole:!1},null,8,["store"]))}});var U=p(j,[["__scopeId","data-v-39205458"]]);export{U as default};