import{R as m,a as u}from"./style.5b79529b.js";import{q as _,_ as x,h as v,s as y,m as g,t as E,o as C,v as R,x as f}from"../app.0f4232ef.js";const c=JSON.parse('{"helloworld":{"index.html":"<!DOCTYPE html>\\n<html lang=\\"en\\">\\n  <head>\\n    <meta charset=\\"UTF-8\\" />\\n    <meta http-equiv=\\"X-UA-Compatible\\" content=\\"IE=edge\\" />\\n    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />\\n    <title>Document</title>\\n  </head>\\n  <body>\\n    hello word\\n  </body>\\n</html>\\n"}}');function d(e,i,s){for(const t in i)typeof i[t]!="string"?d(e+"/"+t,i[t],s):s[e+"/"+t]=i[t]}function h(e,i,s){const{"index.html":t,"script.js":o,"style.css":l}=e;for(const n in e)n!=="index.html"&&n!=="script.js"&&n!=="style.css"&&n!=="description.txt"&&typeof e[n]=="string"?i[n]=e[n]:typeof e[n]!="string"&&d(n,e[n],i);s({template:t,script:o,style:l})}function j(e,i){const s={};return h(e,s,({template:t,script:o,style:l})=>{const n=e["description.txt"];let r=n?`<!--
${n.trim()}
-->

`:"";l&&(t=t.replace(/<link(.*?)href=("|')(.*?)style.css("|')(.*?)>/g,`<style>

	${l}

</style>`)),o&&(t=t.replace(/<script(.*?)src=("|')\.\/script.js("|')(.*?)>(.*?)<\/script>/g,`<script>

	${o}

<\/script>`)),r+=t,s["index.html"]=r}),s}function w(e,i){const s={},t=e["description.txt"];let o=t?`<!--
${t.trim()}
-->

`:"",l="",n="";return s["index.html"]=o,h(e,s,({template:r,script:p,style:a})=>{a&&(l+=a),r&&(o+=r.replace(/<script(.*?)src=("|')\.\/script.js("|')(.*?)>(.*?)<\/script>/g,`
		<script type="module" >
      import "./script.js"
    <\/script>`)),p&&(n+=p)}),s["index.html"]=o,l&&(s["style.css"]=l),n&&(s["script.js"]=n),s}function O(e){window.addEventListener("hashchange",e),_(()=>{window.removeEventListener("hashchange",e)})}const S=v({__name:"ExampleRepl",setup(e){let i=y("prefer-html")||g();const s=new m({serializedState:"",defaultVueRuntimeURL:"",defaultVueServerRendererURL:"",showOutput:!1,outputMode:"preview"});E(t),O(t);function t(){let o=location.hash.slice(1);c.hasOwnProperty(o)||(o="helloworld",location.hash=`#${o}`),s.setFiles(i.value?j(c[o]):w(c[o]),"index.html")}return(o,l)=>(C(),R(f(u),{store:f(s),showImportMap:!1,showCompileOutput:!1,clearConsole:!1},null,8,["store"]))}});var B=x(S,[["__scopeId","data-v-10510d2a"]]);export{B as default};
