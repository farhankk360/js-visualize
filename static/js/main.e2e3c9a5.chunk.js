(this["webpackJsonpjs-visualize"]=this["webpackJsonpjs-visualize"]||[]).push([[0],{185:function(e,t,n){e.exports=n.p+"static/media/astar.024dd80b.gif"},186:function(e,t,n){e.exports=n.p+"static/media/bubble-sort.32c4295c.gif"},217:function(e,t,n){e.exports=n(359)},222:function(e,t,n){},357:function(e,t,n){},359:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),o=n(39),i=n.n(o),s=(n(222),n(46)),c=n(34),l=n(20),u=n(21),m=n(23),h=n(22),d=n(24),f=n(370),b=n(50),p=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(m.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={fixed:!0},n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this.state.fixed;return r.a.createElement(f.a,{fixed:e?"top":null,inverted:!e,pointing:!e,secondary:!e,size:"small"},r.a.createElement(f.a.Item,{onClick:this.props.handleToggle},r.a.createElement(b.a.Group,{size:"small"},r.a.createElement(b.a,{name:"sidebar"}))),r.a.createElement(f.a.Item,{as:s.b,to:"/js-visualize/",active:!0,style:{marginTop:0,fontSize:"18px"}},r.a.createElement(b.a.Group,{size:"large"},r.a.createElement(b.a,{name:"js"})),"Visualize"))}}]),t}(a.Component),g=n(374),v=n(364),E=n(373),y=function(e){function t(){return Object(l.a)(this,t),Object(m.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){return r.a.createElement(g.a,{textAlign:"center",inverted:!0,vertical:!0,style:{padding:"1em 0em"}},r.a.createElement(v.a,null,r.a.createElement("div",{className:"the-guy"},r.a.createElement(E.a.Subheader,null,"by \xa0",r.a.createElement("a",{href:"https://github.com/farhankk360",target:"_blank",without:"true",rel:"noopener noreferrer"},"Farhan Ullah"))),r.a.createElement(E.a.Subheader,null,"Powered by \xa0",r.a.createElement("a",{href:"https://reactjs.org/",target:"_blank",without:"true",rel:"noopener noreferrer"},"React"),"\xa0|\xa0",r.a.createElement("a",{href:"https://d3js.org/",target:"_blank",without:"true",rel:"noopener noreferrer"},"D3"),"\xa0|\xa0",r.a.createElement("a",{href:"https://react.semantic-ui.com/",target:"_blank",without:"true",rel:"noopener noreferrer"},"Semantic UI"))))}}]),t}(a.Component),w=n(375),k=n(369),x=n(368),S=n(49),j=n.n(S),C=n(59),P=n(371),O=n(365),A=n(367),M=n(14),N=30,z=65,T=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(m.a)(this,Object(h.a)(t).call(this,e))).removeFromArray=function(e,t){for(var n=e.length;n--;)e[n]===t&&e.splice(n,1)},n.heuristic=function(e,t){return Math.hypot(t.x-e.x,t.y-e.y)},n.addNeighbors=function(e,t,n,a){a[e-1]&&a[e-1][t]&&n.neighbors.push(a[e-1][t]),a[e+1]&&a[e+1][t]&&n.neighbors.push(a[e+1][t]),a[e]&&a[e][t-1]&&n.neighbors.push(a[e][t-1]),a[e]&&a[e][t+1]&&n.neighbors.push(a[e][t+1]),a[e-1]&&a[e-1][t-1]&&n.neighbors.push(a[e-1][t-1]),a[e+1]&&a[e+1][t-1]&&n.neighbors.push(a[e+1][t-1]),a[e-1]&&a[e-1][t+1]&&n.neighbors.push(a[e-1][t+1]),a[e+1]&&a[e+1][t+1]&&n.neighbors.push(a[e+1][t+1])},n.generateTiles=function(e,t){for(var a=[],r=1,o=1,i=0,s=0;s<e;s++){a.push([]);for(var c=0;c<t;c++)a[s].push({f:0,g:0,h:0,x:r,y:o,width:25,height:25,neighbors:[],previous:void 0,isobstacle:!1,id:"id-".concat(i+=1),col:c,row:s}),r+=25;r=1,o+=25}for(var l=0;l<e;l++)for(var u=0;u<t;u++)n.addNeighbors(l,u,a[l][u],a);var m=n.state,h=m.endPosIndex,d=m.startPosIndex,f=a[h.row][h.col];f.destination=!0;var b=a[d.row][d.col];return b.from=!0,b.h=n.heuristic(b,f),n.setState({startPosition:b,endPosition:f}),a},n.prepareTiles=function(e,t){var a=n.generateTiles(e,t);n.tilesMap.append("svg").attr("viewBox","0 0 1632 761").selectAll(".row").data(a).enter().append("g").attr("class","row").selectAll(".square").data((function(e){return e})).enter().append("rect").attr("class",(function(e){return e.from?"square from":e.destination?"square destination":"square"})).attr("id",(function(e){return e.id})).attr("x",(function(e){return e.x})).attr("y",(function(e){return e.y})).attr("width",(function(e){return e.width})).attr("height",(function(e){return e.height})).style("fill",(function(e){return e.from?"#2C93E8":e.destination?"#F56C4E":"#fff"})).style("stroke","#222").on("mousedown",(function(e,t,a){n.setState({isMouseDown:!0}),e.from||e.destination?n.setState({posChangeMode:e.from?"from":"destination"}):e.isobstacle?n.setState({obstacleMode:!1}):n.setState({obstacleMode:!0}),n.rectSelect(e,a[t])})).on("mousemove",(function(e,t,a){return n.rectSelect(e,a[t])})).on("mouseup",(function(){n.setState({isMouseDown:!1,posChangeMode:""})}))},n.rectSelect=function(e,t){var a=n.state,r=a.isMouseDown,o=a.posChangeMode,i=a.obstacleMode,s=a.startPosition,c=a.startPosIndex,l=a.endPosition,u=a.endPosIndex;r&&(n.setState({begin:!1}),e.from||e.destination||o||(!i&&e.isobstacle&&(M.m(t).style("fill","#fff"),e.isobstacle=!1),i&&!e.isobstacle&&(M.m(t).style("fill","#838690"),e.isobstacle=!0)),"from"!==o||e.isobstacle||e.destination||e.x===s.x&&e.y===s.y||(delete s.from,e.from=!0,n.setState({startPosition:e,startPosIndex:Object(C.a)({},c,{row:e.row,col:e.col})}),M.n(".from").classed("from",!1).style("fill","#fff"),M.m(t).classed("from",!0).style("fill","#2C93E8")),"destination"!==o||e.isobstacle||e.from||e.x===l.x&&e.y===l.y||(delete l.destination,e.destination=!0,n.setState({endPosition:e,endPosIndex:Object(C.a)({},u,{row:e.row,col:e.col})}),M.n(".destination").classed("destination",!1).style("fill","#fff"),M.m(t).classed("destination",!0).style("fill","#F56C4E")))},n.findPath=function(e,t){var a,r,o,i,s,c,l,u,m,h,d,f,b,p;return j.a.async((function(g){for(;;)switch(g.prev=g.next){case 0:r=[],(a=[]).push(e);case 3:if(!n.state.begin){g.next=30;break}if(!a.length){g.next=22;break}for(o=0,i=0;i<a.length;i++)a[i].f<a[o].f&&(o=i);if((s=a[o])!==t){g.next=16;break}for(console.log("done"),(c=[]).push(l=s);l.previous;)c.push(l.previous),l=l.previous;return c.forEach((function(e){e.from||e.destination||M.m("#".concat(e.id)).style("fill","#1667aa")})),g.abrupt("return",n.setState({begin:!1}));case 16:for(n.removeFromArray(a,s),r.push(s),u=s.neighbors,m=0;m<u.length;m++)h=u[m],r.includes(h)||h.isobstacle||(d=s.g+h.g,f=!1,a.includes(h)?d<h.g&&(h.g=d,f=!0):(h.g=d,f=!0,a.push(h)),f&&(h.h=n.heuristic(h,t),h.f=h.g+h.h,h.previous=s));g.next=24;break;case 22:return console.log("no solution"),g.abrupt("return",n.setState({begin:!1}));case 24:for(b=0;b<r.length;b++)r[b].from||M.m("#".concat(r[b].id)).style("fill","#E91E63");for(p=0;p<a.length;p++)a[p].destination||M.m("#".concat(a[p].id)).style("fill","#91f795");return g.next=28,j.a.awrap(new Promise((function(e){return setTimeout(e,5)})));case 28:g.next=3;break;case 30:case"end":return g.stop()}}))},n.reset=function(){n.setState({begin:!1}),n.tilesMap.select("svg").remove(),n.prepareTiles(N,z)},n.state={isMouseDown:!1,obstacleMode:!0,posChangeMode:"",startPosIndex:{row:Math.floor(N/2),col:Math.floor(z/4)},endPosIndex:{row:Math.floor(N/2),col:Math.floor(z/1.5)},startPosition:{},endPosition:{},begin:!1},n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.prepareTiles(N,z)}},{key:"render",value:function(){var e=this,t=this.state,n=t.startPosition,a=t.endPosition,o=t.begin;return r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a,{textAlign:"center",vertical:!0},r.a.createElement(E.a,{as:"h3",className:"title"},"Visualize A* path finding algorithm",r.a.createElement(E.a.Subheader,{className:"desc"},"Create obstacles by drawing on the grid. ",r.a.createElement("br",null),"Blue(start) and Orange(end) points can be moved around."," ",r.a.createElement("small",null,"Have fun"," ",r.a.createElement("span",{role:"img","aria-label":"Smile with glasses"},"\ud83d\ude0e")))),r.a.createElement("div",{className:"btns",style:{marginBottom:"20px"}},r.a.createElement(P.a,{icon:!0,labelPosition:"left",onClick:function(){o?e.setState({begin:!1}):e.setState({begin:!0},(function(){return e.findPath(n,a)}))}},r.a.createElement(b.a,{name:o?"stop":"play",color:"blue"}),o?"Stop":"Start"),o&&r.a.createElement(O.a,{active:!0,inline:!0,style:{margin:"0 10px 0 10px"}}),r.a.createElement(P.a,{icon:!0,labelPosition:"left",onClick:this.reset},r.a.createElement(b.a,{name:"refresh",color:"orange"}),"Reset")),r.a.createElement("div",{ref:function(t){return e.tilesMap=M.m(t)},className:"responsive-svg-container"})),r.a.createElement(A.a,{header:"Info",list:[r.a.createElement("a",{key:"source_code",href:"https://github.com/farhankk360/js-visualize/blob/master/src/components/PathFindingAlgos/Astar/Astart.js",target:"_blank",without:"true",rel:"noopener noreferrer"},"Source code"),r.a.createElement("p",{key:"wiki_link"},"More information on Astar Search Algorithm"," ",r.a.createElement("a",{href:"https://en.wikipedia.org/wiki/A*_search_algorithm ",target:"_blank",without:"true",rel:"noopener noreferrer"},"Wiki"))]}))}}]),t}(a.Component),B=function(e){function t(e){var n;Object(l.a)(this,t),(n=Object(m.a)(this,Object(h.a)(t).call(this,e))).bubleSort=function(e){var t,a,r,o,i,s;return j.a.async((function(c){for(;;)switch(c.prev=c.next){case 0:for(t=e.slice(),a=!1,r=1;r<t.length;r++)o=t[r-1],(i=t[r]).count>o.count&&(t[r]=o,t[r-1]=i,a=!0);return c.next=5,j.a.awrap(new Promise((function(e){return setTimeout(e,500)})));case 5:if(!a){c.next=13;break}return n.simulation.nodes(t),s=0,n.simulation.force("x",M.g((function(e){return s+=50})).strength(.3)).alphaTarget(.5).restart(),n.setState({sortedResult:t}),c.abrupt("return",n.bubleSort(t));case 13:return c.abrupt("return",t);case 14:case"end":return c.stop()}}))},n.charge=function(e){return.01*Math.pow(e.radius,2)},n.createNodes=function(e){var t=M.i(e,(function(e){return+e.count})),n=M.k().domain([0,t]).range([0,60]);return e.map((function(e){return Object(C.a)({},e,{radius:n(+e.count),size:+e.count})}))},n.drawBubbleChart=function(e){var t=n.state,a=t.width,r=t.height,o=M.j(M.l),i=n.createNodes(e),s=n.bubbleChart.append("svg").attr("viewBox","0 0 ".concat(a," ").concat(r)).selectAll(".bubble").data(i,(function(e){return e.name})).enter().append("g"),c=s.append("circle").classed("bubble",!0).attr("r",(function(e){return e.radius})).attr("fill",(function(e){return o(e.count)})).call(M.a().on("start",n.dragstarted).on("drag",n.dragged).on("end",n.dragended)),l=s.append("text").attr("dy",".3em").style("text-anchor","middle").style("font-size",14).style("user-select","none").text((function(e){return e.count}));n.simulation.nodes(i).on("tick",(function(){c.attr("cx",(function(e){return e.x})).attr("cy",(function(e){return e.y})),l.attr("x",(function(e){return e.x})).attr("y",(function(e){return e.y}))})).restart();var u=[];c.each((function(e){return u.push(e)})),n.setState({bubbles:u})},n.changeBubblePosition=function(e){var t=n.state,a=t.width,r=t.height,o=t.forceStrength,i=t.bubbles,s=(t.dataset,{x:a/2,y:r/2});if("split"===e){var c=M.i(i,(function(e){return+e.count})),l=Math.floor(Math.random()*c)+1;n.simulation.force("x",M.g((function(e){return e.count<l?1200:300})).strength(o)).alphaTarget(.2).restart()}"combine"===e&&n.simulation.force("x",M.g(a/2).strength(o).x(s.x)).alphaTarget(.2).restart()},n.dragstarted=function(e){M.b.active||n.simulation.alphaTarget(.03).restart(),e.fx=e.x,e.fy=e.y},n.dragged=function(e){e.fx=M.b.x,e.fy=M.b.y},n.dragended=function(e){M.b.active||n.simulation.alphaTarget(.03),e.fx=null,e.fy=null},n.state={width:1600,height:750,forceStrength:.03,sortedResult:null,dataset:[{name:"Milk",count:40},{name:"Olives",count:20},{name:"Boiled Potatoes",count:10},{name:"Baked Potatoes",count:180},{name:"Mashed Potatoes",count:30},{name:"Chocolate",count:100},{name:"Stewed Prunes",count:200},{name:"Vanilla Ice Cream",count:60},{name:"American Cheese",count:130},{name:"Chicken Salad",count:50},{name:"Green Peas",count:140},{name:"Lettuce Salad",count:80},{name:"Tea",count:210},{name:"Cocoa",count:70},{name:"Orange Juice",count:120},{name:"Black burgers",count:220},{name:"Apple Pie",count:110},{name:"Lobster Salad",count:90},{name:"French Fried Potatoes",count:160},{name:"Potato Salad",count:170},{name:"Assorted Cakes",count:150},{name:"Roquefort",count:190},{name:"Chicken Parata",count:230}]};var a=n.state,r=a.width,o=a.height,i=a.forceStrength,s={x:r/2,y:o/2};return n.simulation=M.f().force("center",M.c(s.x,s.y)).force("charge",M.e().strength(n.charge)).force("x",M.g().strength(i).x(s.x)).force("y",M.h().strength(i).y(s.y)).force("collision",M.d().radius((function(e){return e.radius+2}))),n.simulation.stop(),n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.drawBubbleChart(this.state.dataset)}},{key:"render",value:function(){var e=this,t=this.state,n=t.bubbles,a=t.sortedResult,o=a||n;return r.a.createElement(r.a.Fragment,null,r.a.createElement(g.a,{textAlign:"center",vertical:!0},r.a.createElement(E.a,{as:"h3",className:"title"},"Bubble sort",r.a.createElement(E.a.Subheader,{className:"desc"},"Visualize bubble sort algorithm with d3 force simulation. ",r.a.createElement("br",null),"Feel free to move around the bubbles.")),r.a.createElement("div",{className:"btns"},r.a.createElement(P.a,{onClick:function(t){return e.changeBubblePosition("split")}},"Split"),r.a.createElement(P.a,{onClick:function(t){return e.changeBubblePosition("combine")}},"Combine"),r.a.createElement(P.a,{primary:!0,onClick:function(t){return n&&e.bubleSort(n)}},"Bubble Sort")),r.a.createElement("div",{className:"responsive-svg-container",ref:function(t){return e.bubbleChart=M.m(t)}}),o&&r.a.createElement(A.a,{floating:!0,className:"visual-array"},r.a.createElement("pre",null,"[",o.map((function(e,t){return o.length-1>t?r.a.createElement(r.a.Fragment,{key:t},r.a.createElement("span",{className:"array-element"},e.count),r.a.createElement("span",null,", ")):r.a.createElement("span",{key:t,className:"array-element"},e.count)})),"]"))),r.a.createElement(A.a,{header:"Info",list:[r.a.createElement("a",{key:"source_code",href:"https://github.com/farhankk360/js-visualize/blob/master/src/components/SortingAlgos/BubbleSort/BubbleSort.js",target:"_blank",without:"true",rel:"noopener noreferrer"},"Source code"),r.a.createElement("p",{key:"wiki_link"},"More information on Bubble Sort Algorithm"," ",r.a.createElement("a",{href:"https://en.wikipedia.org/wiki/Bubble_sort",target:"_blank",without:"true",rel:"noopener noreferrer"},"Wiki"))]}))}}]),t}(a.Component),I=[{name:"Path finding algorithms",routes:[{name:"A-Star",path:"/astar",component:function(e){return r.a.createElement(T,e)}}]},{name:"Sorting algorithms",routes:[{name:"Bubble Sort",path:"/bubble-sort",component:function(e){return r.a.createElement(B,e)}}]}],W=n(372),_=n(188),F=n(185),R=n.n(F),D=n(186),V=n.n(D),q=function(e){function t(){return Object(l.a)(this,t),Object(m.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this;return r.a.createElement(r.a.Fragment,null,r.a.createElement(W.a,{stackable:!0,columns:2},r.a.createElement(W.a.Column,null,r.a.createElement(g.a,{textAlign:"center",onClick:function(){return e.props.history.push("/js-visualize/astar")},style:{cursor:"pointer"}},r.a.createElement(E.a,{as:"h3",className:"title"},"Visualize A* path finding algorithm",r.a.createElement(E.a.Subheader,{className:"desc"},"Create obstacles by drawing on the grid.")),r.a.createElement(_.a,{src:R.a,className:"main-grid-image"}))),r.a.createElement(W.a.Column,null,r.a.createElement(g.a,{textAlign:"center",onClick:function(){return e.props.history.push("/js-visualize/bubble-sort")},style:{cursor:"pointer"}},r.a.createElement(E.a,{as:"h3",className:"title"},"Bubble sort",r.a.createElement(E.a.Subheader,{className:"desc"},"Visualize bubble sort algorithm with d3 force simulation. ",r.a.createElement("br",null))),r.a.createElement(_.a,{src:V.a,className:"main-grid-image"})))))}}]),t}(a.Component),U=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,r=new Array(a),o=0;o<a;o++)r[o]=arguments[o];return(n=Object(m.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(r)))).state={sidebarOpened:!0,activeIndex:0},n.handleClick=function(e,t){var a=t.index,r=n.state.activeIndex===a?-1:a;n.setState({activeIndex:r})},n.handleToggle=function(){return n.setState({sidebarOpened:!n.state.sidebarOpened})},n.getWidth=function(){return"undefined"===typeof window?w.a.onlyTablet.minWidth:window.innerWidth},n}return Object(d.a)(t,e),Object(u.a)(t,[{key:"render",value:function(){var e=this,t=this.state,n=t.sidebarOpened,a=t.activeIndex,o=this.props.location;return r.a.createElement(w.a,{as:k.a.Pushable,getWidth:this.getWidth},r.a.createElement(k.a,{as:f.a,animation:"push",inverted:!0,vertical:!0,visible:n},r.a.createElement(f.a,{size:"large",className:"side-bar-header"},r.a.createElement(f.a.Item,{as:"h2",active:!0})),r.a.createElement(g.a,{inverted:!0,className:"accordion-segment"},r.a.createElement(x.a,{inverted:!0},I.map((function(t,n){return r.a.createElement(r.a.Fragment,{key:"".concat(n,"-").concat(t.name)},r.a.createElement(x.a.Title,{active:a===n,index:n,onClick:e.handleClick,className:"item"},t.name,r.a.createElement(b.a,{name:"dropdown"})),r.a.createElement(x.a.Content,{active:a===n},t.routes.map((function(e,t){return r.a.createElement(f.a.Item,{key:"".concat(t,"-").concat(e.path),as:s.b,to:"/js-visualize"+e.path,active:o.pathname.includes(e.path)},e.name)}))))}))))),r.a.createElement(k.a.Pusher,null,r.a.createElement(p,{handleToggle:this.handleToggle,getWidth:this.getWidth}),r.a.createElement(g.a,{style:n?{width:"calc(100% - 260px)"}:{marginTop:"61px",width:"100%"},className:"segmentWrapper"},r.a.createElement(c.c,null,r.a.createElement(c.a,{exact:!0,path:"/js-visualize/",render:function(){return r.a.createElement(q,e.props)}}),I.map((function(e){return e.routes.map((function(e){return r.a.createElement(c.a,{exact:!0,path:"/js-visualize"+e.path,render:function(t){return e.component(t)}})}))})))),r.a.createElement(y,null)))}}]),t}(a.Component),L=Object(c.f)(U);n(357),n(358);var G=function(){return r.a.createElement(s.a,null,r.a.createElement(c.c,null,r.a.createElement(L,{path:"/"})))},J=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function H(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var n=e.installing;null!=n&&(n.onstatechange=function(){"installed"===n.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}i.a.render(r.a.createElement(G,null),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL("/js-visualize",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat("/js-visualize","/service-worker.js");J?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(n){var a=n.headers.get("content-type");404===n.status||null!=a&&-1===a.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):H(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):H(t,e)}))}}()}},[[217,1,2]]]);
//# sourceMappingURL=main.e2e3c9a5.chunk.js.map