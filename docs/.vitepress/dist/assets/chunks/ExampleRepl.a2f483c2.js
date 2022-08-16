import{R as f,a as v}from"./style.1521d431.js";import{q as g,_ as x,h as b,s as y,m as w,t as j,o as $,v as E,x as p}from"../app.63f13be3.js";const c=JSON.parse(`{"accordion":{"index.html":"<!DOCTYPE html>\\n<html lang=\\"en\\">\\n  <head>\\n    <meta charset=\\"UTF-8\\" />\\n    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />\\n    <meta http-equiv=\\"X-UA-Compatible\\" content=\\"ie=edge\\" />\\n    <title>Document</title>\\n    <link rel=\\"stylesheet\\" href=\\"./style.css\\" />\\n  </head>\\n\\n  <body>\\n    <div class=\\"view clearfix\\">\\n      <div class=\\"item\\">\\n        <div class=\\"title\\">\\n          <font>\u7535\u8BDD</font>\\n        </div>\\n        <div class=\\"concent\\"></div>\\n      </div>\\n      <div class=\\"item\\" style=\\"background: rgb(146, 255, 146)\\">\\n        <div class=\\"title\\">\\n          <font>WIFI</font>\\n        </div>\\n        <div class=\\"concent\\"></div>\\n      </div>\\n      <div class=\\"item\\" style=\\"background: rgb(105, 133, 255)\\">\\n        <div class=\\"title\\">\\n          <font>\u624B\u673A</font>\\n        </div>\\n        <div class=\\"concent\\"></div>\\n      </div>\\n      <div class=\\"item\\" style=\\"background: rgb(255, 78, 87)\\">\\n        <div class=\\"title\\">\\n          <font>\u4E91\u76D8</font>\\n        </div>\\n        <div class=\\"concent\\"></div>\\n      </div>\\n      <div class=\\"item\\" style=\\"background: rgb(141, 232, 255)\\">\\n        <div class=\\"title\\">\\n          <font>\u4E92\u8054\u7F51</font>\\n        </div>\\n        <div class=\\"concent\\"></div>\\n      </div>\\n      <div class=\\"item\\" style=\\"background: rgb(183, 233, 0)\\">\\n        <div class=\\"title\\">\\n          <font>\u8BED\u97F3</font>\\n        </div>\\n        <div class=\\"concent\\"></div>\\n      </div>\\n    </div>\\n  </body>\\n  <script src=\\"./script.js\\"><\/script>\\n</html>\\n","script.js":"var x = 0\\nvar flag = true\\n\\n$('.item').eq(x).css('width', 300)\\nfor (var j = 1; j < 7; j++) {\\n  $('.title')\\n    .eq(j - 1)\\n    .css('backgroundImage', 'url(./accordion/img' + j + '.png)')\\n  $('.concent')\\n    .eq(j - 1)\\n    .css('backgroundImage', 'url(./accordion/img0' + j + '.png)')\\n}\\n\\n$('.title').click(function () {\\n  var index = $(this).parent().index()\\n  console.log(index)\\n  if (flag) {\\n    flag = false\\n\\n    $('.item')\\n      .eq(index)\\n      .animate(\\n        {\\n          width: 300\\n        },\\n        function () {\\n          flag = true\\n        }\\n      )\\n    $('.item')\\n      .eq(x)\\n      .animate(\\n        {\\n          width: 50\\n        },\\n        function () {\\n          x = index\\n        }\\n      )\\n  }\\n})\\n","style.css":"* {\\n  margin: 0;\\n  padding: 0;\\n}\\n\\n.clearfix {\\n  zoom: 1;\\n}\\n\\n.clearfix::after {\\n  content: \\"\\";\\n  display: block;\\n  clear: both;\\n  visibility: hidden;\\n}\\n\\n.item {\\n  width: 50px;\\n  float: left;\\n  height: 250px;\\n  overflow: hidden;\\n  background: goldenrod;\\n  /* transition: all .5s; */\\n  position: relative;\\n}\\n\\n.title {\\n  width: 50px;\\n  height: 250px;\\n  background-size: 100% auto;\\n  background-repeat: no-repeat;\\n  background-position: center 90px;\\n  font-size: 12px;\\n  color: white;\\n  font-weight: bolder;\\n  text-align: center;\\n  line-height: 150px;\\n}\\n\\n.concent {\\n  background-size: 80% auto;\\n  background-position: center;\\n  width: 250px;\\n  height: 250px;\\n  background-repeat: no-repeat;\\n  background-position: center center;\\n  position: absolute;\\n  top: 0;\\n  left: 50px;\\n}"},"ball-collision":{"index.html":"<!DOCTYPE html>\\r\\n<html lang=\\"en\\">\\r\\n  <head>\\r\\n    <meta charset=\\"UTF-8\\" />\\r\\n    <meta http-equiv=\\"X-UA-Compatible\\" content=\\"IE=edge\\" />\\r\\n    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />\\r\\n    <title>Document</title>\\r\\n    <link rel=\\"stylesheet\\" href=\\"./style.css\\" />\\r\\n  </head>\\r\\n  <body>\\r\\n    <div class=\\"ball\\"></div>\\r\\n    <div class=\\"slipper\\"></div>\\r\\n    <script src=\\"./script.js\\"><\/script>\\r\\n  </body>\\r\\n</html>\\r\\n","script.js":"// \u8BBE\u7F6E\u79FB\u52A8\u901F\u5EA6\u521D\u59CB\u503C\\nvar speedX = 8\\nvar speedY = 8\\nvar x = 0\\nvar y = 0\\nvar clr = 0\\n// \u83B7\u53D6\u6D4F\u89C8\u5668\u7A97\u53E3\u7684\u5BBD\u9AD8\\nvar w = $(window).width()\\nvar h = $(window).height()\\nvar pagex = 0\\n\\n$(window).resize(function () {\\n  w = $(window).width()\\n  h = $(window).height()\\n})\\n$(\\".ball\\").html(\\"\\")\\nsetInterval(function () {\\n  clr++\\n  clr = clr > 360 ? 0 : clr\\n  if (x + 50 > w || x < 0) {\\n    speedX *= -1\\n  }\\n  if (y + 50 > h || y < 0) {\\n    speedY *= -1\\n  }\\n  if (y + 50 > h - 62 && x > pagex && x < pagex + 200) {\\n    speedY *= -1\\n    $('.slipper')\\n      .css({\\n        border: \`1px solid hsla(\${clr}, 80%, 80% ,1)\`,\\n        color: \`hsla(\${clr}, 80%, 80% ,1)\`\\n      })\\n      .addClass('slipperAni')\\n    $('.slipper').on('animationend', function () {\\n      $(this).removeClass('slipperAni')\\n    })\\n  }\\n  var div = document.createElement('div')\\n  $(div).css({\\n    width: '50px',\\n    height: '50px',\\n    borderRadius: '50%',\\n    border: \`1px solid hsla(\${clr}, 80%, 80%, 1)\`,\\n    backgroundColor: \`hsla(\${clr}, 80%, 80%, 1)\`,\\n    position: 'fixed',\\n    top: (y += speedY) + 'px',\\n    left: (x += speedX) + 'px'\\n  })\\n  $(div).addClass('ballAni')\\n  setTimeout(function () {\\n    $(div).remove()\\n  }, 1000)\\n  $('.ball').append(div)\\n}, 20)\\n$(window).mousemove(function (e) {\\n  // console.log(e.pageX, e.pageY);\\n  // var pagex = e.pageX - 100 > w ? w - 100 : e.pageX - 50;\\n  pagex = e.pageX - 100\\n  if (e.pageX + 100 > w) {\\n    pagex = w - 200\\n  } else if (e.pageX - 100 < 0) {\\n    pagex = 0\\n  }\\n  $('.slipper').css({ left: pagex + 'px' })\\n})\\n","style.css":"body {\\n  background-color: #000;\\n  height: 100vh;\\n  margin: 0;\\n}\\n\\n.slipper {\\n  width: 200px;\\n  height: 10px;\\n  border: 1px solid red;\\n  position: fixed;\\n  bottom: 50px;\\n  left: 0;\\n  border-radius: 8px;\\n}\\n\\n.ballAni {\\n  animation: ballMove 1.1s linear;\\n}\\n\\n@keyframes ballMove {\\n  0% {\\n    transform: scale(1);\\n  }\\n\\n  50% {\\n    transform: scale(0.6);\\n    background-color: rgba(0, 0, 0, 0);\\n  }\\n\\n  100% {\\n    transform: scale(0.2);\\n    opacity: 0;\\n  }\\n}\\n\\n.slipperAni {\\n  animation: slipperMove 0.5s;\\n}\\n\\n@keyframes slipperMove {\\n  0% {\\n    /* box-shadow \u6CA1\u6709\u5199\u989C\u8272\u5C31\u7EE7\u627F\u5B57\u4F53\u7684\u989C\u8272 */\\n    box-shadow: 0 0 0 20px;\\n  }\\n\\n  100% {\\n    box-shadow: 0 0 0 0;\\n  }\\n}"},"helloworld":{"description.txt":"\u5185\u7F6Ejquery\u5E93 \u53EF\u76F4\u63A5\u4E66\u5199JQ\u4EE3\u7801","index.html":"<!DOCTYPE html>\\n<html lang=\\"en\\">\\n  <head>\\n    <meta charset=\\"UTF-8\\" />\\n    <meta http-equiv=\\"X-UA-Compatible\\" content=\\"IE=edge\\" />\\n    <meta name=\\"viewport\\" content=\\"width=device-width, initial-scale=1.0\\" />\\n    <title>Document</title>\\n    <link rel=\\"stylesheet\\" href=\\"./style.css\\" />\\n  </head>\\n  <body>\\n    <script src=\\"./script.js\\"><\/script>\\n  </body>\\n</html>\\n","script.js":"$(document.body).append('Hello World')\\n","style.css":""}}`);function u(n,o,e){for(const t in o)typeof o[t]!="string"?u(n+"/"+t,o[t],e):e[n+"/"+t]=o[t]}function m(n,o,e){const{"index.html":t,"script.js":s,"style.css":r}=n;for(const i in n)i!=="index.html"&&i!=="script.js"&&i!=="style.css"&&i!=="description.txt"&&typeof n[i]=="string"?o[i]=n[i]:typeof n[i]!="string"&&u(i,n[i],o);e({template:t,script:s,style:r})}function k(n,o){const e={};return n["import-map.json"]=n["import-map.json"]?n["import-map.json"]:"",m(n,e,({template:t,script:s,style:r})=>{const i=n["description.txt"];let l=i?`<!--
${i.trim()}
-->

`:"";r&&(t=t.replace(/<link(.*?)href=("|')(.*?)style.css("|')(.*?)>/g,`<style>

	${r}

</style>`)),s&&(t=t.replace(/<script(.*?)src=("|')\.\/script.js("|')(.*?)>(.*?)<\/script>/g,`<script type="module">
			import 'jquery' 

			${s}
		<\/script>`)),l+=t,e["index.html"]=l}),e}function C(n,o){const e={};n["import-map.json"]=n["import-map.json"]?n["import-map.json"]:"";const t=n["description.txt"];let s=t?`<!--
${t.trim()}
-->

`:"",r="",i="";return e["index.html"]=s,m(n,e,({template:l,script:a,style:d})=>{d&&(r+=d),l&&(s+=l.replace(/<script(.*?)src=("|')\.\/script.js("|')(.*?)>(.*?)<\/script>/g,`
		<script type="module" >
      import "./script.js"
    <\/script>`)),a&&(a=a.replace(/(\$|jQuery)/g,function(q,h){return`window.${h}`}),i+=`import 'jquery'

${a}`)}),e["index.html"]=s,r&&(e["style.css"]=r),i&&(e["script.js"]=i),e}function _(n){window.addEventListener("hashchange",n),g(()=>{window.removeEventListener("hashchange",n)})}const F=b({__name:"ExampleRepl",setup(n){let o=y("prefer-html")||w();const e=new f({serializedState:"",defaultVueRuntimeURL:"",defaultVueServerRendererURL:"",showOutput:!1,outputMode:"preview"});e.setImportMap({imports:{jquery:"https://unpkg.com/jquery@3.6.0/dist/jquery.min.js"}}),j(t),_(t);function t(){let s=location.hash.slice(1);c.hasOwnProperty(s)||(s="helloword",location.hash=`#${s}`),e.setFiles(o.value?k(c[s]):C(c[s]),"index.html")}return(s,r)=>($(),E(p(v),{store:p(e),showImportMap:!0,showCompileOutput:!1,clearConsole:!1},null,8,["store"]))}});var D=x(F,[["__scopeId","data-v-706e4a90"]]);export{D as default};
