import{R as d,a as u}from"./style.8c5f2fd7.js";import{q as _,_ as x,h as v,s as y,m as g,t as E,o as C,v as R,x as f}from"../app.61dc51ed.js";const c=JSON.parse('{"helloword":{"index.html":"<!DOCTYPE html>\\n<html lang=\\"en\\">\\n  <head>\\n    <meta charset=\\"UTF-8\\" />\\n    <meta http-equiv=\\"X-UA-Compatible\\" content=\\"IE=edge\\" />\\n    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />\\n    <title>Document</title>\\n  </head>\\n  <body>\\n    hello word\\n  </body>\\n</html>\\n"}}');function h(e,i,s){for(const t in i)typeof i[t]!="string"?h(e+"/"+t,i[t],s):s[e+"/"+t]=i[t]}function m(e,i,s){const{"index.html":t,"script.js":o,"style.css":l}=e;for(const n in e)n!=="index.html"&&n!=="script.js"&&n!=="style.css"&&typeof e[n]=="string"?i[n]=e[n]:typeof e[n]!="string"&&h(n,e[n],i);s({template:t,script:o,style:l})}function j(e,i){const s={};return m(e,s,({template:t,script:o,style:l})=>{const n=e["description.txt"];let r=n?`<!--
${n.trim()}
-->

`:"";l&&(t=t.replace(/<link(.*?)href=("|')(.*?)style.css("|')(.*?)>/g,`<style>

	${l}

</style>`)),o&&(t=t.replace(/<script(.*?)src=("|')\.\/script.js("|')(.*?)>(.*?)<\/script>/g,`<script>

	${o}

<\/script>`)),r+=t,s["index.html"]=r}),s}function w(e,i){const s={},t=e["description.txt"];let o=t?`<!--
${t.trim()}
-->

`:"",l="",n="";return s["index.html"]=o,m(e,s,({template:r,script:a,style:p})=>{p&&(l+=p),r&&(o+=r.replace(/<script(.*?)src=("|')\.\/script.js("|')(.*?)>(.*?)<\/script>/g,`
		<script type="module" >
      import "./script.js"
    <\/script>`)),a&&(n+=a)}),s["index.html"]=o,l&&(s["style.css"]=l),n&&(s["script.js"]=n),s}function O(e){window.addEventListener("hashchange",e),_(()=>{window.removeEventListener("hashchange",e)})}const S=v({__name:"ExampleRepl",setup(e){let i=y("prefer-html")||g();const s=new d({serializedState:"",defaultVueRuntimeURL:"",defaultVueServerRendererURL:"",showOutput:!1,outputMode:"preview"});E(t),O(t);function t(){let o=location.hash.slice(1);c.hasOwnProperty(o)||(o="helloword",location.hash=`#${o}`),s.setFiles(i.value?j(c[o]):w(c[o]),"index.html")}return(o,l)=>(C(),R(f(u),{store:f(s),showImportMap:!1,showCompileOutput:!1,clearConsole:!1},null,8,["store"]))}});var B=x(S,[["__scopeId","data-v-169ab6a0"]]);export{B as default};
