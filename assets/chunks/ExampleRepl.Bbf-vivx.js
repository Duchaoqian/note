import{u,_ as x,a as _}from"./monaco-editor.DQ1eln8c.js";import{$ as y,d as g,L as v,p as l,s as C,b as E,o as j,k as p,_ as $}from"./framework.CgAj5nG9.js";const a=JSON.parse('{"helloworld":{"index.html":"<!DOCTYPE html>\\r\\n<html lang=\\"en\\">\\r\\n  <head>\\r\\n    <meta charset=\\"UTF-8\\" />\\r\\n    <meta http-equiv=\\"X-UA-Compatible\\" content=\\"IE=edge\\" />\\r\\n    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />\\r\\n    <title>Document</title>\\r\\n  </head>\\r\\n  <body>\\r\\n    hello world\\r\\n  </body>\\r\\n</html>\\r\\n"}}');function m(e,i,s){for(const t in i)typeof i[t]!="string"?m(e+"/"+t,i[t],s):s[e+"/"+t]=i[t]}function d(e,i,s){const{"index.html":t,"script.js":o,"style.css":r}=e;for(const n in e)n!=="index.html"&&n!=="script.js"&&n!=="style.css"&&n!=="description.txt"&&typeof e[n]=="string"?i[n]=e[n]:typeof e[n]!="string"&&m(n,e[n],i);s({template:t,script:o,style:r})}function w(e,i){const s={};return d(e,s,({template:t,script:o,style:r})=>{const n=e["description.txt"];let c=n?`<!--
${n.trim()}
-->

`:"";r&&(t=t.replace(/<link(.*?)href=("|')(.*?)style.css("|')(.*?)>/g,`<style>

	${r}

</style>`)),o&&(t=t.replace(/<script(.*?)src=("|')\.\/script.js("|')(.*?)>(.*?)<\/script>/g,`<script>

	${o}

<\/script>`)),c+=t,s["index.html"]=c}),s}function O(e,i){const s={},t=e["description.txt"];let o=t?`<!--
${t.trim()}
-->

`:"",r="",n="";return s["index.html"]=o,d(e,s,({template:c,script:f,style:h})=>{h&&(r+=h),c&&(o+=c.replace(/<script(.*?)src=("|')\.\/script.js("|')(.*?)>(.*?)<\/script>/g,`
		<script type="module" >
      import "./script.js"
    <\/script>`)),f&&(n+=f)}),s["index.html"]=o,r&&(s["style.css"]=r),n&&(s["script.js"]=n),s}function b(e){window.addEventListener("hashchange",e),y(()=>{window.removeEventListener("hashchange",e)})}const k=g({__name:"ExampleRepl",setup(e){let i=v("prefer-html")||l();const s=u({showOutput:l(!1),outputMode:l("preview")});C(t),b(t);function t(){let o=location.hash.slice(1);a.hasOwnProperty(o)||(o="helloworld",location.hash=`#${o}`),s.setFiles(i.value?w(a[o]):O(a[o]),"index.html")}return(o,r)=>(j(),E(p(_),{store:p(s),editor:p(x),showImportMap:!1,showCompileOutput:!1,clearConsole:!1},null,8,["store","editor"]))}}),I=$(k,[["__scopeId","data-v-4687db22"]]);export{I as default};
