// ====== EDIT THIS PART ======
// Project format: title, desc, tags (used for filters), status ("In progress" or "Built"), done (true when finished),
// link (GitHub repo), demo (live URL, for example GitHub Pages, shown as a preview in the popup), learn (what you practiced)
var PROJECTS=[
{title:"Linux System Monitor",desc:"A shell script that reads and shows information about the system in Linux.",tags:["Bash","Linux"],status:"Built",done:true,link:"https://github.com/mgaraar/linux-system-monitor",demo:"",learn:["Writing shell scripts in Bash","Reading system information from the Linux command line","Working with Linux system data"]},
{title:"Python Game",desc:"A simple game built with Python.",tags:["Python"],status:"Built",done:true,link:"https://github.com/mgaraar/game-py",demo:"",learn:["Python basics: variables, branching, loops, and functions","Structuring a small project","Debugging step by step"]},
{title:"Personal Portfolio Website",desc:"This website: a portfolio built with plain HTML, CSS, and JavaScript, with filterable projects, an interactive terminal, and a light/dark theme.",tags:["JavaScript"],status:"In progress",done:false,link:"",demo:"",learn:["DOM manipulation and event handling","Responsive layout and light/dark themes","Keeping site content in editable data"]}
];
var PATH=[
{t:"IT Support Intern — PT Diantara Intermedia",s:"Internship",d:"Handled day-to-day technical needs of users."},
{t:"Network Technician — PT Awani Home Garut",s:"Contract",d:"Hands-on field work in networking."},
{t:"Informatics Engineering — UIN Sunan Kalijaga",s:"Semester 1, admitted through SNBT",d:"Learning programming fundamentals while keeping networking and security as the main direction."},
{t:"Cloud Engineer",s:"Long-term goal",d:"Building toward this with Linux, networking, and self-study.",next:1}
];
// Certificates: title, issuer, date, skills (list), link (verification URL), img (a data: URI or a file next to this page).
// A card opens a popup only when it has a link or an img. Replace the two samples with your own.
var CERTS=[
{title:"Certificate title (replace me)",issuer:"Issuer name",date:"Month Year",skills:["Skill"],link:"",img:""},
{title:"Another certificate (replace me)",issuer:"Issuer name",date:"Month Year",skills:["Skill"],link:"",img:""}
];
var CONTACT=[
{label:"Email",href:"mailto:YOUR_EMAIL@example.com"},
{label:"GitHub",href:"https://github.com/mgaraar"},
{label:"LinkedIn",href:"https://www.linkedin.com/in/YOUR_USERNAME"}
];
// ====== END ======

function el(t,c,x){var e=document.createElement(t);if(c)e.className=c;if(x)e.textContent=x;return e}
var $=function(i){return document.getElementById(i)};

/* typing role */
var roles=["Informatics student","Networking background","Future Cloud Engineer"],ri=0,ci=0,del=false,role=$("role");
if(matchMedia("(prefers-reduced-motion: reduce)").matches){role.textContent=roles[2]}else{(function tick(){
var w=roles[ri];ci+=del?-1:1;role.textContent=w.slice(0,ci);
var d=90;if(!del&&ci===w.length){del=true;d=1600}else if(del&&ci===0){del=false;ri=(ri+1)%roles.length;d=300}
setTimeout(tick,del?40:d)})()}

/* projects */
var grid=$("grid"),fil=$("filters"),cur="All";
function render(){
grid.textContent="";
PROJECTS.forEach(function(p,i){
if(cur!=="All"&&p.tags.indexOf(cur)<0)return;
var c=el("button","card");c.type="button";
c.appendChild(el("span","status"+(p.done?" done":""),p.status));
c.appendChild(el("h3","",p.title));c.appendChild(el("p","",p.desc));
var t=el("div","tags");p.tags.forEach(function(x){t.appendChild(el("span","",x))});c.appendChild(t);
c.appendChild(el("span","more",p.demo?"Details and live preview":"Details"));
c.onclick=function(){openP(i)};grid.appendChild(c)});
if(!grid.children.length)grid.appendChild(el("p","","No projects with this tag yet."))}
function setFilter(k){cur=k;fil.querySelectorAll("button").forEach(function(b){b.setAttribute("aria-pressed",b.textContent===k)});render()}
var tags=["All"];PROJECTS.forEach(function(p){p.tags.forEach(function(x){if(tags.indexOf(x)<0)tags.push(x)})});
tags.forEach(function(k){var b=el("button","",k);b.type="button";b.onclick=function(){setFilter(k)};fil.appendChild(b)});
setFilter("All");

/* dialog */
var dlg=$("dlg");
function openP(i){var p=PROJECTS[i];if(!p)return false;
$("ds").textContent=p.status;$("dt").textContent=p.title;$("dd").textContent=p.desc;
$("dl").textContent="";p.learn.forEach(function(x){$("dl").appendChild(el("li","",x))});
var a=$("dlink");a.style.display=p.link?"":"none";if(p.link)a.href=p.link;
var lv=$("dlive");lv.style.display=p.demo?"":"none";if(p.demo)lv.href=p.demo;
var pv=$("dprev");pv.textContent="";
if(p.demo){var fr=el("iframe");fr.src=p.demo;fr.title=p.title+" live preview";fr.loading="lazy";fr.setAttribute("sandbox","allow-scripts allow-same-origin allow-forms allow-popups");pv.appendChild(fr);pv.appendChild(el("p","prevnote","If the preview stays blank, the site may block embedding. Use Open live site instead."))}
dlg.showModal();return true}
$("dclose").onclick=function(){dlg.close()};
dlg.addEventListener("close",function(){$("dprev").textContent=""});
dlg.addEventListener("click",function(e){if(e.target===dlg)dlg.close()});

/* skill stack */
var cap=$("cap"),dflt=cap.textContent,goal=$("goal");
document.querySelectorAll(".pill").forEach(function(n){
function on(){document.querySelectorAll(".pill.on").forEach(function(x){x.classList.remove("on")});n.classList.add("on");goal.classList.add("lit");cap.textContent=n.dataset.t}
function off(){n.classList.remove("on");goal.classList.remove("lit");cap.textContent=dflt}
n.addEventListener("mouseenter",on);n.addEventListener("focus",on);n.addEventListener("mouseleave",off);n.addEventListener("blur",off);
n.addEventListener("click",function(){
if(n.dataset.tag){var has=PROJECTS.some(function(p){return p.tags.indexOf(n.dataset.tag)>-1});
if(has){setFilter(n.dataset.tag);$("projects").scrollIntoView()}else{cap.textContent=n.dataset.t+" No project with this tag yet."}}
else if(n.dataset.go){document.querySelector(n.dataset.go).scrollIntoView()}})});
function toPath(){$("path").scrollIntoView()}
goal.addEventListener("click",toPath);
goal.addEventListener("keydown",function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();toPath()}});

/* certificates */
var cdlg=$("cdlg");
function openC(x){
$("cs").textContent=x.issuer;$("ct").textContent=x.title;$("cm").textContent=x.date+(x.skills&&x.skills.length?" | "+x.skills.join(", "):"");
var im=$("cimg");im.textContent="";
if(x.img){var g=el("img");g.src=x.img;g.alt=x.title+" certificate";im.appendChild(g)}
var l=$("clink");l.style.display=x.link?"":"none";if(x.link)l.href=x.link;
cdlg.showModal()}
$("cclose").onclick=function(){cdlg.close()};
cdlg.addEventListener("click",function(e){if(e.target===cdlg)cdlg.close()});
CERTS.forEach(function(x){
var has=x.img||x.link,c=el(has?"button":"div","cert");if(has)c.type="button";
c.appendChild(el("span","iss",x.issuer));c.appendChild(el("h3","",x.title));c.appendChild(el("span","dt",x.date));
if(x.skills&&x.skills.length){var t=el("div","tags");x.skills.forEach(function(k){t.appendChild(el("span","",k))});c.appendChild(t)}
if(has){c.appendChild(el("span","more",x.img?"View certificate":"Verify credential"));c.onclick=function(){openC(x)}}
$("certs").appendChild(c)});
if(!CERTS.length)$("certs").appendChild(el("p","","Certificates will appear here."));

/* timeline */
PATH.forEach(function(x){var li=el("li",x.next?"next":"");li.tabIndex=0;li.setAttribute("role","button");
li.appendChild(el("b","",x.t));li.appendChild(el("span","sub",x.s));li.appendChild(el("span","det",x.d));
function tg(){li.classList.toggle("open")}li.onclick=tg;li.onkeydown=function(e){if(e.key==="Enter"||e.key===" "){e.preventDefault();tg()}};
$("tl").appendChild(li)});

/* terminal */
var out=$("out"),inp=$("in"),hist=[],hp=0;
function say(t,c){var d=el("div",c||"",t);out.appendChild(d);out.scrollTop=out.scrollHeight}
var CMD={
help:function(){return"Commands: whoami, skills, projects, path, goal, contact, theme, clear"},
skills:function(){return"networking, linux, bash, python, c, html/css/javascript"},
projects:function(){return PROJECTS.map(function(p,i){return(i+1)+". "+p.title+" ["+p.status+"]"}).join("\n")},
whoami:function(){return"magara_reyvandika\nInformatics Engineering student with a networking background, aiming to become a Cloud Engineer."},
path:function(){return PATH.map(function(x){return"- "+x.t}).join("\n")},
goal:function(){return"Cloud Engineer. Not there yet, building toward it."},
contact:function(){return CONTACT.map(function(c){return c.label+": "+c.href.replace("mailto:","")}).join("\n")},
theme:function(){$("theme").click();return"Theme toggled."},
clear:function(){out.textContent="";return null}};
function run(line){var p=line.trim().split(/\s+/),c=p[0].toLowerCase();if(!c)return;
say("$ "+line,"cmd");hist.push(line);hp=hist.length;
var r=CMD[c]?CMD[c](p[1]):"command not found: "+c+". Type help.";if(r)say(r)}
inp.addEventListener("keydown",function(e){
if(e.key==="Enter"){run(inp.value);inp.value=""}
else if(e.key==="ArrowUp"&&hist.length){hp=Math.max(0,hp-1);inp.value=hist[hp];e.preventDefault()}
else if(e.key==="ArrowDown"){hp=Math.min(hist.length,hp+1);inp.value=hist[hp]||"";e.preventDefault()}});
say("Welcome. Click a command below or type one here. Try: help");
["help","whoami","projects","goal","contact"].forEach(function(c){var b=el("button","",c);b.type="button";b.onclick=function(){run(c)};$("chips").appendChild(b)});

/* contact, year, theme */
CONTACT.forEach(function(c){var a=el("a","cc");a.href=c.href;if(c.href.indexOf("http")===0){a.target="_blank";a.rel="noopener"}
var d=el("div");d.appendChild(el("b","",c.label));d.appendChild(el("small","",c.href.replace(/^mailto:|^https?:\/\/(www\.)?/,"")));a.appendChild(d);
a.insertAdjacentHTML("beforeend",'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 17 17 7M8 7h9v9"/></svg>');
$("links").appendChild(a)});
$("yr").textContent=new Date().getFullYear();
$("theme").onclick=function(){var r=document.documentElement,d=r.getAttribute("data-theme");
var dark=d?d==="dark":matchMedia("(prefers-color-scheme: dark)").matches;r.setAttribute("data-theme",dark?"light":"dark")};

/* scroll progress + active nav */
addEventListener("scroll",function(){var h=document.documentElement;$("bar").style.width=(h.scrollTop/(h.scrollHeight-h.clientHeight)*100||0)+"%"},{passive:true});
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){document.querySelectorAll("#nav a").forEach(function(a){a.classList.toggle("act",a.getAttribute("href")==="#"+e.target.id)})}})},{rootMargin:"-40% 0px -55% 0px"});
document.querySelectorAll("section").forEach(function(s){io.observe(s)});
