const posts = [
 {id:133742,date:"2026-09-28",title:"Why the old web felt more alive",cat:"web",desc:"Forums, ugly gradients, personal sites, animated GIFs, and the strange feeling that everyone was building their own little corner of the internet.",replies:27,featured:true},
 {id:133615,date:"2026-09-26",title:"The case for making tiny tools",cat:"code",desc:"A tiny script that solves one annoying problem can be more satisfying than a giant app nobody asked for.",replies:14},
 {id:133402,date:"2026-09-23",title:"Why every game needs one ridiculous weapon",cat:"games",desc:"A short design note on memorable weapons, absurd mechanics, and the joy of breaking the expected rules.",replies:31},
 {id:133188,date:"2026-09-20",title:"Manga pages as visual UI",cat:"manga",desc:"Panels, gutters, speech bubbles and pacing: what interface designers can learn from comics.",replies:19},
 {id:132991,date:"2026-09-16",title:"Building a personal site without a framework",cat:"code",desc:"HTML, CSS and a little JavaScript are enough to make a surprisingly capable site.",replies:22},
 {id:132744,date:"2026-09-12",title:"The strange comfort of obsolete technology",cat:"life",desc:"Old consoles, CRTs, physical manuals and hardware that had one job.",replies:11}
];

const $ = s => document.querySelector(s);
function renderList(target, list){
  if(!target)return;
  target.innerHTML=list.map(p=>`
    <article class="post">
      <div class="post-meta"><span class="post-id">No. ${p.id}</span> ${p.date} <span class="sage">${p.cat.toUpperCase()}</span></div>
      <h3><a href="${p.id===133742?'article.html':'article.html'}">${p.title}</a></h3>
      <p>${p.desc}</p>
      <div class="post-foot"><a href="article.html">read →</a><span>${p.replies} replies</span></div>
    </article>`).join("");
}
function renderArchive(){
  const target=$("#archive"); if(!target)return;
  let cat="all", query="";
  const draw=()=>renderArchiveList(target, posts.filter(p=>(cat==="all"||p.cat===cat)&&(!query||`${p.title} ${p.desc} ${p.cat}`.toLowerCase().includes(query))));
  window.renderArchiveList=(el,list)=>{el.innerHTML=list.map(p=>`
    <div class="archive-item">
      <div class="date">${p.date}<br>No. ${p.id}</div>
      <div><h3><a href="article.html">${p.title}</a></h3><p>${p.desc}</p></div>
      <div class="cat">/${p.cat}/ · ${p.replies} replies</div>
    </div>`).join("") || '<div class="post">No posts found.</div>'};
  draw();
  document.querySelectorAll("[data-cat]").forEach(btn=>btn.addEventListener("click",()=>{document.querySelectorAll("[data-cat]").forEach(b=>b.classList.remove("selected"));btn.classList.add("selected");cat=btn.dataset.cat;draw()}));
  $("#search")?.addEventListener("input",e=>{query=e.target.value.toLowerCase().trim();draw()});
}
renderList($("#latest"), posts.slice(1,5));
renderArchive();

function tick(){const el=$("#clock");if(el)el.textContent=new Date().toLocaleTimeString([], {hour12:false})}
tick();setInterval(tick,1000);
