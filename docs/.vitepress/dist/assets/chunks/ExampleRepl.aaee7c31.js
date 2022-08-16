import{R as h,a as y}from"./style.a373d090.js";import{q as x,_,h as j,s as v,m as E,t as g,o as C,v as R,x as u}from"../app.8a696aaa.js";const p=JSON.parse(`{"helloword":{"description.txt":"\u5185\u7F6Ejquery \u53EF\u76F4\u63A5\u8F93\u8840jquery \u4EE3\u7801","import-map.json":"{\\n  \\"imports\\": {\\n    \\"jquery\\": \\"https://unpkg.com/jquery@3.6.0/dist/jquery.min.js\\"\\n  }\\n}","index.html":"<!DOCTYPE html>\\n<html lang=\\"en\\">\\n  <head>\\n    <meta charset=\\"UTF-8\\" />\\n    <meta http-equiv=\\"X-UA-Compatible\\" content=\\"IE=edge\\" />\\n    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />\\n    <title>Document</title>\\n    <link rel=\\"stylesheet\\" href=\\"./style.css\\" />\\n  </head>\\n  <body>\\n    <script src=\\"./script.js\\"><\/script>\\n  </body>\\n</html>\\n","script.js":"$(document.body).append('123')\\n","style.css":""}}`);function m(t,i,e){for(const s in i)typeof i[s]!="string"?m(t+"/"+s,i[s],e):e[t+"/"+s]=i[s]}function f(t,i,e){const{"index.html":s,"script.js":o,"style.css":r}=t;for(const n in t)n!=="index.html"&&n!=="script.js"&&n!=="style.css"&&n!=="description.txt"&&typeof t[n]=="string"?i[n]=t[n]:typeof t[n]!="string"&&m(n,t[n],i);e({template:s,script:o,style:r})}function q(t,i){const e={};return f(t,e,({template:s,script:o,style:r})=>{const n=t["description.txt"];let l=n?`<!--
${n.trim()}
-->

`:"";r&&(s=s.replace(/<link(.*?)href=("|')(.*?)style.css("|')(.*?)>/g,`<style>

	${r}

</style>`)),o&&(s=s.replace(/<script(.*?)src=("|')\.\/script.js("|')(.*?)>(.*?)<\/script>/g,`<script type="module">
			import 'jquery' 

			${o}
		<\/script>`)),l+=s,e["index.html"]=l}),e}function $(t,i){const e={},s=t["description.txt"];let o=s?`<!--
${s.trim()}
-->

`:"",r="",n="";return e["index.html"]=o,f(t,e,({template:l,script:c,style:a})=>{a&&(r+=a),l&&(o+=l.replace(/<script(.*?)src=("|')\.\/script.js("|')(.*?)>(.*?)<\/script>/g,`
		<script type="module" >
      import "./script.js"
    <\/script>`)),c&&(c=c.replace(/(\$|jQuery)/g,function(k,d){return`window.${d}`}),n+=`import 'jquery'

${c}`)}),e["index.html"]=o,r&&(e["style.css"]=r),n&&(e["script.js"]=n),e}function w(t){window.addEventListener("hashchange",t),x(()=>{window.removeEventListener("hashchange",t)})}const F=j({__name:"ExampleRepl",setup(t){let i=v("prefer-html")||E();const e=new h({serializedState:"",defaultVueRuntimeURL:"",defaultVueServerRendererURL:"",showOutput:!1,outputMode:"preview"});e.options={},console.log(e),g(s),w(s);function s(){let o=location.hash.slice(1);p.hasOwnProperty(o)||(o="helloword",location.hash=`#${o}`),e.setFiles(i.value?q(p[o]):$(p[o]),"index.html")}return(o,r)=>(C(),R(u(y),{store:u(e),showImportMap:!1,showCompileOutput:!1,clearConsole:!1},null,8,["store"]))}});var U=_(F,[["__scopeId","data-v-14189880"]]);export{U as default};
