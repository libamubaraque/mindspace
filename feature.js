
/* TO THE ETHER. — SHARED FEATURE PAGE ENGINE
   Each card has its own guided content and usable frontend interactions.
   Entries are stored locally in this browser. No Supabase connection yet. */

(() => {
 const data=[
 ["mood-journal","Mood Journal","wellbeing","A gentle place to name what is going on inside. You do not need to explain everything perfectly.","Mood check-in","Choose the feeling that is closest to yours, then write as much or as little as you like.","mood"],
 ["breathing-space","Breathing Space","wellbeing","Step away from the rush for a moment. Follow a simple breathing rhythm or choose quiet instead.","Guided breathing","Let the circle guide a comfortable rhythm. Stop whenever you want; never force or hold your breath.","breathing"],
 ["gratitude-journal","Gratitude Journal","wellbeing","Notice the ordinary moments that bring comfort, meaning or connection.","Three little things","They do not have to be big. A kind message, a favourite song or a peaceful moment all count.","gratitude"],
 ["fitness-wellness","Fitness & Wellness","wellbeing","Movement is not a punishment or a competition. Explore activities that feel enjoyable, accessible and balanced.","Movement & wellbeing log","Record a walk, a run, cycling, swimming, stretching or rest. Choose what feels right for your day.","fitness"],
 ["daily-checkin","Daily Check-in","wellbeing","A quick pause to notice your day — the good, the difficult and everything between.","How is today going?","Check in without scoring yourself. Small wins and difficult moments can exist together.","checkin"],
 ["study-focus","Study & Focus","growth","Create a realistic study session with a clear focus and a proper break.","Focus session","Try 10 minutes of focused work followed by a 5-minute screen-free rest. Adjust the plan to suit you.","study"],
 ["self-care","Self-care Corner","wellbeing","Self-care can be practical and ordinary: rest, boundaries, asking for help and looking after your surroundings.","A small care plan","Choose one gentle action for your mind, body or environment. This is not medical advice.","selfcare"],
 ["stories-hope","Stories & Hope","growth","Explore real stories of people and communities working towards a more compassionate world.","A thought to carry","Use this space to reflect on a story, a person or an act of courage that inspired you.","stories"],
 ["career-exploration","Career Exploration","growth","Your interests can lead in many directions. Explore possibilities without needing to decide your whole future today.","Interests and possibilities","Write down what you enjoy, what matters to you and what you would like to learn more about.","career"],
 ["my-little-world","My Little World","creative","A personal scrapbook for the memories, thoughts, photographs and milestones that make your world yours.","Add to your little world","Write a memory or a note to your future self. You can also attach an image from your device.","scrapbook"],
 ["movie-theatre","Movie Theatre","community","A thoughtful watchlist for films, documentaries and stories you would like to explore or discuss.","Your watchlist","Save a title and a thought about why you want to watch it. This page does not stream copyrighted films.","movie"],
 ["the-commons","The Commons","community","A shared-ideas corner for clubs, student interests, collaboration and community projects.","An idea for the commons","Suggest a club, activity, discussion topic or student-led project. Keep personal contact details private.","commons"],
 ["sports-events","Sports & Events","growth","Celebrate participation, teamwork and movement — from local fun runs to cycling, swimming and athletics events.","Sports goals and event ideas","Add an event or personal goal. Check official organisers for dates, age rules, safety requirements and registration.","sports"],
 ["day-planner","Day Planner","growth","Give your day a shape without filling every minute. Leave room for meals, rest and unexpected things.","Plan your day","Write one priority, a few manageable tasks and a break. A plan is a guide, not a test.","planner"],
 ["creative-studio","The Creative Studio","creative","Make something just because you want to: a poem, a story seed, a colour idea or a tiny design concept.","Create a little something","Save your original writing, idea or creative prompt. Your work belongs to you.","creative"],
 ["kindness-project","The Kindness Project","community","Kindness is not about grand gestures. It can be thoughtful, practical and respectful.","A small act of kindness","Plan one safe, realistic act of kindness. Respect boundaries and do not share another person's private story without permission.","kindness"],
 ["learning-library","The Learning Library","growth","Follow your curiosity into useful skills, new subjects and questions worth exploring.","What would you like to learn?","Choose a topic and write one question you want to answer. Find reliable sources and compare information.","learning"],
 ["sleep-sanctuary","The Sleep Sanctuary","wellbeing","Build a calm wind-down routine that supports rest. Everyone's sleep needs and circumstances are different.","Wind-down notes","Choose a relaxing activity and note what helps you feel settled. This is general wellbeing information, not medical advice.","sleep"],
 ["money-matters","Money Matters","growth","Learn the basics of planning, saving and making thoughtful choices with money.","Simple budget practice","Use pretend amounts for this learning activity. Never enter bank details, passwords or private financial information.","money"],
 ["open-mic","The Open Mic","creative","A stage for your original words: poetry, spoken-word pieces, short reflections and creative experiments.","Your open-mic page","Write something original. Share it only with people you trust and only when you feel comfortable.","openmic"]
 ];

 const featureId=new URLSearchParams(location.search).get("feature")||"mood-journal";
 const feature=data.find(item=>item[0]===featureId)||data[0];
 const [id,title,category,description,panelTitle,instruction,type]=feature;

 const titleEl=document.getElementById("featureTitle");
 const catEl=document.getElementById("featureCategory");
 const descEl=document.getElementById("featureDescription");
 const content=document.getElementById("featureContent");

 document.title=title+" | To the Ether.";
 titleEl.textContent=title;
 catEl.textContent=category+" · YOUR SPACE";
 descEl.textContent=description;

 const store=window.EtherStore||{
  get:(k,d=[])=>JSON.parse(localStorage.getItem("ether:"+k)||"null")??d,
  add(k,v){
   let a=this.get(k);
   a.unshift({...v,id:Date.now(),createdAt:new Date().toISOString()});
   localStorage.setItem("ether:"+k,JSON.stringify(a));
   return a;
  }
 };

 const esc=s=>String(s??"").replace(/[&<>"']/g,c=>({
  "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"
 }[c]));

 function baseForm(){
  return `
  <section class="feature-panel">
   <h2>${panelTitle}</h2>
   <p>${instruction}</p>

   <form id="entryForm">
    <label for="entryTitle">A title or short note</label>
    <input id="entryTitle" maxlength="100" placeholder="Give this entry a name...">

    <label for="entryText">Your thoughts</label>
    <textarea id="entryText" maxlength="5000" placeholder="Start wherever you are..."></textarea>

    ${type==="mood"?`
     <label for="moodSelect">Today's feeling</label>
     <select id="moodSelect">
      <option>Calm</option><option>Happy</option><option>Hopeful</option>
      <option>Tired</option><option>Worried</option><option>Overwhelmed</option>
      <option>Unsure</option><option>Other</option>
     </select>`:""}

    ${type==="fitness"?`
     <label for="activitySelect">Activity</label>
     <select id="activitySelect">
      <option>Walking</option><option>Running</option><option>Cycling</option>
      <option>Swimming</option><option>Stretching</option><option>Rest day</option>
      <option>Other</option>
     </select>`:""}

    ${type==="scrapbook"?`
     <label for="entryImage">Optional image</label>
     <input id="entryImage" type="file" accept="image/*">`:""}

    <button class="action-button" type="submit">Save this page</button>
   </form>

   <p id="saveMessage" role="status"></p>
  </section>

  <section class="feature-panel">
   <h2>My Saved Pages</h2>
   <p>Your entries stay in this browser on this device in this frontend version.</p>
   <div class="saved-list" id="savedList"></div>
  </section>`;
 }

 function renderSaved(){
  const list=document.getElementById("savedList");
  if(!list)return;

  const entries=store.get(id,[]);

  list.innerHTML=entries.length?entries.map(e=>`
   <article class="saved-entry">
    <small>${new Date(e.createdAt).toLocaleString()}${e.mood?" · "+esc(e.mood):""}${e.activity?" · "+esc(e.activity):""}</small>
    <h3>${esc(e.title||"Untitled entry")}</h3>
    <p>${esc(e.text||"")}</p>
    ${e.image?`<img src="${e.image}" alt="Saved scrapbook image" style="max-width:100%;max-height:240px;margin-top:12px">`:""}
   </article>`).join("")
   :`<p>No saved pages yet. Your first entry can be small.</p>`;
 }

 function renderBreathing(){
  return `
  <section class="feature-panel">
   <h2>A breathing pause</h2>
   <p>Follow a comfortable rhythm: breathe in gently as the circle grows, then breathe out as it settles. Keep breathing naturally and stop if you feel uncomfortable.</p>
   <div class="breath-orb" id="breathOrb"></div>
   <div class="breath-label" id="breathLabel">Ready when you are</div>
   <div style="text-align:center;margin-top:18px">
    <button class="action-button" id="breathStart">Begin</button>
    <button class="action-button secondary" id="breathStop">Pause</button>
   </div>
   <p style="text-align:center;margin-top:15px">You can also simply sit quietly. There is no right way to use this space.</p>
  </section>
  ${baseForm()}`;
 }

 function renderTimer(){
  return `
  <section class="feature-panel">
   <h2>Focus timer</h2>
   <p>Start with a short, manageable session. You can stop at any time.</p>
   <div class="timer-display" id="timerDisplay">10:00</div>
   <div style="text-align:center">
    <button class="action-button" id="timerStart">Start 10 minutes</button>
    <button class="action-button secondary" id="timerReset">Reset</button>
   </div>
   <p id="timerStatus" style="text-align:center"></p>
  </section>
  ${baseForm()}`;
 }

 function renderSports(){
  return `
  <section class="feature-panel">
   <h2>Explore sporting events</h2>
   <p>Use this as a place to note events you may want to learn about. Always check official event organisers for current dates, eligibility, registration, supervision and safety guidance.</p>
   <ul>
    <li>Running: community runs, fun runs and marathon events</li>
    <li>Cycling: organised rides and cycling competitions</li>
    <li>Swimming: school, club and community swimming meets</li>
    <li>Athletics: track, field and multi-sport events</li>
    <li>Other: inclusive sports days and local activity events</li>
   </ul>
   <p>For young participants, involve a parent, guardian or trusted adult when researching or registering.</p>
   ${baseForm()}
  </section>`;
 }

 function renderCareer(){
  return `
  <section class="feature-panel">
   <h2>Start with what interests you</h2>
   <p>Choose any interests that sound meaningful. This is a reflection activity, not a scientific career test.</p>

   <label><input type="checkbox" class="interest" value="Health and helping people"> Health and helping people</label>
   <label><input type="checkbox" class="interest" value="Science and discovery"> Science and discovery</label>
   <label><input type="checkbox" class="interest" value="Art and communication"> Art and communication</label>
   <label><input type="checkbox" class="interest" value="Environment and animals"> Environment and animals</label>
   <label><input type="checkbox" class="interest" value="Law, society and public service"> Law, society and public service</label>
   <label><input type="checkbox" class="interest" value="Technology and design"> Technology and design</label>
   <label><input type="checkbox" class="interest" value="Business and entrepreneurship"> Business and entrepreneurship</label>

   <button class="action-button" id="interestSave">Save my interests</button>
   <p id="interestResult"></p>
  </section>
  ${baseForm()}`;
 }

 function renderPlanner(){
  return `
  <section class="feature-panel">
   <h2>Today's plan</h2>
   <p>Keep your plan kind and realistic. Add tasks one at a time.</p>
   <form id="taskForm">
    <input id="taskInput" placeholder="One thing to do..." maxlength="120" required>
    <button class="action-button">Add task</button>
   </form>
   <div id="taskList" class="saved-list"></div>
  </section>
  ${baseForm()}`;
 }

 if(type==="breathing")content.innerHTML=renderBreathing();
 else if(type==="study")content.innerHTML=renderTimer();
 else if(type==="sports")content.innerHTML=renderSports();
 else if(type==="career")content.innerHTML=renderCareer();
 else if(type==="planner")content.innerHTML=renderPlanner();
 else content.innerHTML=baseForm();

 const form=document.getElementById("entryForm");

 form?.addEventListener("submit",async e=>{
  e.preventDefault();

  const file=document.getElementById("entryImage")?.files?.[0];
  let image="";

  if(file){
   if(file.size>1200000){
    alert("Please choose an image smaller than 1.2 MB for this browser demo.");
    return;
   }

   image=await new Promise(resolve=>{
    const r=new FileReader();
    r.onload=()=>resolve(r.result);
    r.readAsDataURL(file);
   });
  }

  const value={
   title:document.getElementById("entryTitle").value.trim(),
   text:document.getElementById("entryText").value.trim(),
   mood:document.getElementById("moodSelect")?.value||"",
   activity:document.getElementById("activitySelect")?.value||"",
   image
  };

  store.add(id,value);
  document.getElementById("saveMessage").textContent="Saved in this browser. You can find it under My Saved Pages.";
  form.reset();
  renderSaved();
 });

 renderSaved();

 /* Breathing guide */
 let breathInterval=null,phase=0;
 const orb=document.getElementById("breathOrb");
 const label=document.getElementById("breathLabel");

 document.getElementById("breathStart")?.addEventListener("click",()=>{
  if(breathInterval)return;

  const tick=()=>{
   phase=1-phase;
   orb.classList.toggle("inhale",phase===1);
   label.textContent=phase?"Breathe in gently":"Breathe out gently";
  };

  tick();
  breathInterval=setInterval(tick,4000);
 });

 document.getElementById("breathStop")?.addEventListener("click",()=>{
  clearInterval(breathInterval);
  breathInterval=null;
  orb?.classList.remove("inhale");
  if(label)label.textContent="Paused. Take your time.";
 });

 /* Study timer */
 let timer=null,remaining=600;
 const display=document.getElementById("timerDisplay");
 const status=document.getElementById("timerStatus");

 function paint(){
  if(display){
   display.textContent=
    `${String(Math.floor(remaining/60)).padStart(2,"0")}:${String(remaining%60).padStart(2,"0")}`;
  }
 }

 document.getElementById("timerStart")?.addEventListener("click",()=>{
  if(timer)return;
  status.textContent="Focus gently. A break is allowed.";

  timer=setInterval(()=>{
   remaining--;
   paint();

   if(remaining<=0){
    clearInterval(timer);
    timer=null;
    status.textContent="Session complete. Take a screen-free break.";
   }
  },1000);
 });

 document.getElementById("timerReset")?.addEventListener("click",()=>{
  clearInterval(timer);
  timer=null;
  remaining=600;
  paint();
  status.textContent="Ready for a fresh session.";
 });

 /* Career interests */
 document.getElementById("interestSave")?.addEventListener("click",()=>{
  const values=[...document.querySelectorAll(".interest:checked")].map(x=>x.value);
  store.set("career-interests",values);

  document.getElementById("interestResult").textContent=
   values.length
    ?"Your interests have been saved: "+values.join(", ")
    :"Choose any interests that feel right for you.";
 });

 /* Day planner */
 const taskKey="planner-tasks";

 function paintTasks(){
  const el=document.getElementById("taskList");
  if(!el)return;

  const tasks=store.get(taskKey,[]);

  el.innerHTML=tasks.length
   ?tasks.map(t=>`
    <label class="saved-entry">
     <input type="checkbox" data-task="${t.id}" ${t.done?"checked":""}>
     ${esc(t.text)}
    </label>`).join("")
   :"<p>No tasks yet. Add one small step.</p>";

  el.querySelectorAll("[data-task]").forEach(box=>{
   box.addEventListener("change",()=>{
    const a=store.get(taskKey,[]).map(t=>
     t.id===Number(box.dataset.task)?{...t,done:box.checked}:t
    );
    store.set(taskKey,a);
   });
  });
 }

 document.getElementById("taskForm")?.addEventListener("submit",e=>{
  e.preventDefault();

  const input=document.getElementById("taskInput");
  const tasks=store.get(taskKey,[]);

  tasks.push({
   id:Date.now(),
   text:input.value.trim(),
   done:false
  });

  store.set(taskKey,tasks);
  input.value="";
  paintTasks();
 });

 paintTasks();

})();
