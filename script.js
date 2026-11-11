
/* TO THE ETHER. — HOMEPAGE INTERACTIONS
   Frontend demo storage only. Supabase will be connected later. */

const FEATURES = [
 {id:"mood-journal",name:"Mood Journal",icon:"☾",category:"wellbeing",desc:"Give your feelings a little room. Notice patterns without judging them."},
 {id:"breathing-space",name:"Breathing Space",icon:"◌",category:"wellbeing",desc:"A gentle pause with guided breathing, quiet sounds and reflection."},
 {id:"gratitude-journal",name:"Gratitude Journal",icon:"✧",category:"wellbeing",desc:"Collect the small things, kind moments and details worth remembering."},
 {id:"fitness-wellness",name:"Fitness & Wellness",icon:"⌁",category:"wellbeing",desc:"Build a balanced relationship with movement, rest and everyday energy."},
 {id:"daily-checkin",name:"Daily Check-in",icon:"♡",category:"wellbeing",desc:"A tiny check-in for little wins, hard moments and how today feels."},
 {id:"study-focus",name:"Study & Focus",icon:"✎",category:"growth",desc:"Make room for focused study, breaks and learning at your own pace."},
 {id:"self-care",name:"Self-care Corner",icon:"❀",category:"wellbeing",desc:"Explore practical ways to care for your mind, body and surroundings."},
 {id:"stories-hope",name:"Stories & Hope",icon:"✦",category:"growth",desc:"Read thoughtful stories about courage, compassion and real-world change."},
 {id:"career-exploration",name:"Career Exploration",icon:"⌘",category:"growth",desc:"Explore interests, career families, courses and paths beyond one job title."},
 {id:"my-little-world",name:"My Little World",icon:"▧",category:"creative",desc:"A personal scrapbook for memories, photos, thoughts and milestones."},
 {id:"movie-theatre",name:"Movie Theatre",icon:"▣",category:"community",desc:"Discover films and documentaries that make you think, feel and discuss."},
 {id:"the-commons",name:"The Commons",icon:"⌂",category:"community",desc:"A welcoming place for clubs, shared interests and student-led ideas."},
 {id:"sports-events",name:"Sports & Events",icon:"◎",category:"growth",desc:"Find inspiration in running, cycling, swimming, athletics and community events."},
 {id:"day-planner",name:"Day Planner",icon:"▦",category:"growth",desc:"Organise your day with realistic priorities, breaks and small steps."},
 {id:"creative-studio",name:"The Creative Studio",icon:"✿",category:"creative",desc:"Make something with words, colour, ideas and imagination."},
 {id:"kindness-project",name:"The Kindness Project",icon:"♡",category:"community",desc:"Turn empathy into small, practical acts of kindness."},
 {id:"learning-library",name:"The Learning Library",icon:"▤",category:"growth",desc:"A collection of learning prompts, useful skills and curiosity-led topics."},
 {id:"sleep-sanctuary",name:"The Sleep Sanctuary",icon:"☽",category:"wellbeing",desc:"Create a calming wind-down routine and notice what helps you rest."},
 {id:"money-matters",name:"Money Matters",icon:"◈",category:"growth",desc:"Learn budgeting, saving and thoughtful money habits with simple activities."},
 {id:"open-mic",name:"The Open Mic",icon:"♫",category:"creative",desc:"Share poems, short writing, spoken-word ideas and original creations."}
];

const grid=document.getElementById("featureGrid");

function renderCards(filter="all"){
 if(!grid)return;
 const items=FEATURES.filter(f=>filter==="all"||f.category===filter);
 grid.innerHTML=items.map(f=>`
  <a class="feature-card" href="feature.html?feature=${encodeURIComponent(f.id)}">
   <div class="card-top">
    <span class="card-icon">${f.icon}</span>
    <span class="card-number">${String(FEATURES.indexOf(f)+1).padStart(2,"0")}</span>
   </div>
   <div><h3>${f.name}</h3><p>${f.desc}</p></div>
   <div class="card-bottom">
    <span class="card-category">${f.category}</span>
    <span class="card-arrow">↗</span>
   </div>
  </a>`).join("");
}

renderCards();

document.querySelectorAll(".filter-chip").forEach(btn=>{
 btn.addEventListener("click",()=>{
  document.querySelectorAll(".filter-chip").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  renderCards(btn.dataset.filter);
 });
});

const menuToggle=document.getElementById("menuToggle");
const mainNav=document.getElementById("mainNav");

menuToggle?.addEventListener("click",()=>mainNav.classList.toggle("open"));
mainNav?.querySelectorAll("a").forEach(a=>
 a.addEventListener("click",()=>mainNav.classList.remove("open"))
);

const year=document.getElementById("year");
if(year)year.textContent=new Date().getFullYear();

/* Shared browser storage helpers used by feature.js. */
window.EtherStore={
 get(key,fallback=[]){
  try{return JSON.parse(localStorage.getItem("ether:"+key))??fallback}
  catch{return fallback}
 },
 set(key,value){
  localStorage.setItem("ether:"+key,JSON.stringify(value));
 },
 add(key,value){
  const list=this.get(key,[]);
  list.unshift({...value,id:Date.now(),createdAt:new Date().toISOString()});
  this.set(key,list);
  return list;
 },
 remove(key,id){
  this.set(key,this.get(key,[]).filter(item=>item.id!==id));
 }
};
