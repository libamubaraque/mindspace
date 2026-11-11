
/* =========================================================
   TO THE ETHER. — FEATURE PAGE ENGINE
   20 individual spaces | Local browser storage
   ========================================================= */

"use strict";

const $ = id => document.getElementById(id);

const featureData = {
  "mood-journal": {
    title:"Mood Journal", category:"WELLBEING",
    description:"Your feelings deserve space. Write without judging yourself.",
    heading:"A page for how you feel",
    prompt:"What's on your mind today?",
    placeholder:"Write whatever comes to you. There is no right or wrong way...",
    fields:[["Feeling","select",["Happy","Calm","Hopeful","Tired","Worried","Frustrated","Confused","Other"]],["Something that affected my day","text"]],
    extra:"Your journal is yours. You don't have to explain every feeling."
  },

  "breathing-space": {
    title:"Breathing Space",category:"WELLBEING",
    description:"A gentle pause with guided breathing, quiet sounds and reflection.",
    heading:"Take a little pause",
    prompt:"How would you like to feel?",
    placeholder:"What would help you feel more settled?",
    fields:[["Before the session","select",["Busy","Tired","Restless","Overwhelmed","Just exploring"]],["After the session","text"]],
    extra:"Try a comfortable, natural breathing rhythm. Stop if you feel dizzy or uncomfortable."
  },

  "gratitude-journal": {
    title:"Gratitude Journal",category:"WELLBEING",
    description:"Collect little things, kind moments and details worth remembering.",
    heading:"Three little things",
    prompt:"What are three things you appreciated today?",
    placeholder:"1. A kind conversation...\n2. A peaceful moment...\n3. Something I learned...",
    fields:[["Today's date","date"]]
  },

  "fitness-wellness": {
    title:"Fitness & Wellness",category:"WELLBEING",
    description:"Explore movement, rest, everyday energy and activities you enjoy.",
    heading:"Movement and wellbeing log",
    prompt:"What activity did you enjoy?",
    placeholder:"Write about your experience...",
    fields:[["Activity","select",["Walking","Running","Cycling","Swimming","Stretching","Sports","Rest day","Other"]],["Duration in minutes","number"],["How did it feel?","select",["Enjoyable","Refreshing","Challenging","Relaxing","I need more rest"]]],
    extra:"Movement should support your wellbeing, not become a competition. Rest days matter too."
  },

  "daily-checkin": {
    title:"Daily Check-in",category:"WELLBEING",
    description:"A little check-in for small wins, hard moments and today's feelings.",
    heading:"How was today?",
    prompt:"Tell us about your day.",
    placeholder:"One thing that happened today...",
    fields:[["Today's highlight","text"],["Something I learned","text"],["One thing I need tomorrow","text"]]
  },

  "study-focus": {
    title:"Study & Focus",category:"GROWTH",
    description:"Make room for focused study, breaks and learning at your own pace.",
    heading:"Your focus corner",
    prompt:"What would you like to work on?",
    placeholder:"Subject or task...",
    fields:[["Study duration in minutes","number"],["My next small step","text"]],
    extra:"Try 10 minutes of study followed by a 5-minute screen-free break."
  },

  "self-care": {
    title:"Self-care Corner",category:"WELLBEING",
    description:"Explore practical ways to care for your mind, body and surroundings.",
    heading:"A little care for yourself",
    prompt:"What would you like to do?",
    placeholder:"Write a small self-care intention...",
    fields:[["Area","select",["Rest","Skincare","Hygiene","Emotional wellbeing","Family and friendships","Outdoor time","Organisation","Other"]],["My small action","text"]],
    extra:"Self-care is not about looking a certain way. It is about caring for yourself."
  },

  "stories-hope": {
    title:"Stories & Hope",category:"GROWTH",
    description:"Discover stories about courage, compassion, human rights and change.",
    heading:"Stories worth exploring",
    prompt:"A story or issue I want to understand",
    placeholder:"Write about a person, event or issue...",
    fields:[["Topic","select",["Human rights","Children's rights","Environment","Healthcare","Education","Community action","Science","Other"]],["What I learned","text"]],
    extra:"Look for reliable reporting, first-hand accounts and credible organisations."
  },

  "career-exploration": {
    title:"Career Exploration",category:"GROWTH",
    description:"Explore interests, careers, degrees and possibilities beyond one job title.",
    heading:"Discover your direction",
    prompt:"What subjects or activities interest you?",
    placeholder:"For example: medicine, art, science, writing, helping people...",
    fields:[["What matters most?","select",["Helping people","Creativity","Research","Travel","Leadership","Stability","Discovery","A combination"]],["My questions about careers","text"]],
    extra:"Career paths can change. Explore job roles, qualifications, entrance exams and realistic pathways before making decisions."
  },

  "my-little-world": {
    title:"My Little World",category:"CREATIVE",
    description:"A personal scrapbook for memories, photographs, thoughts and milestones.",
    heading:"Your personal scrapbook",
    prompt:"Give this memory a title",
    placeholder:"A day I want to remember...",
    fields:[["Memory type","select",["Happy memory","Achievement","Adventure","Friendship","A difficult day","A lesson","A dream","Other"]],["Your memory","text"]]
  },

  "movie-theatre": {
    title:"Movie Theatre",category:"COMMUNITY",
    description:"Discover films and documentaries that make you think, feel and discuss.",
    heading:"Your watchlist",
    prompt:"Which film or documentary?",
    placeholder:"Enter a title...",
    fields:[["Type","select",["Film","Documentary","Short film","Educational video"]],["Why I want to watch it","text"],["My thoughts after watching","text"]]
  },

  "the-commons": {
    title:"The Commons",category:"COMMUNITY",
    description:"A welcoming place for clubs, shared interests and student-led ideas.",
    heading:"Find your community",
    prompt:"What kind of club would you create?",
    placeholder:"Describe your club idea...",
    fields:[["Interest","select",["Books","Environment","Sports","Science","Art","Volunteering","Debate","Music","Other"]],["What could members do?","text"]]
  },

  "sports-events": {
    title:"Sports & Events",category:"GROWTH",
    description:"Explore running, cycling, swimming, athletics and community events.",
    heading:"Your activity and event log",
    prompt:"Record an activity or event",
    placeholder:"Name of event or activity...",
    fields:[["Activity","select",["Running","Marathon","Cycling","Cycling marathon","Swimming","Swimming competition","Athletics","Other"]],["Date","date"],["Location","text"],["Notes","text"]],
    extra:"For organised events, check age eligibility, safety rules and guardian permission. Progress at a comfortable pace."
  },

  "day-planner": {
    title:"Day Planner",category:"GROWTH",
    description:"Organise your day with realistic priorities, breaks and small steps.",
    heading:"Plan your day",
    prompt:"What needs your attention?",
    placeholder:"Your task...",
    fields:[["Date","date"],["Priority","select",["Important","Normal","Whenever possible"]],["Time or reminder","text"]]
  },

  "creative-studio": {
    title:"The Creative Studio",category:"CREATIVE",
    description:"Make something with words, colour, ideas and imagination.",
    heading:"Your creative canvas",
    prompt:"What are you creating?",
    placeholder:"Start writing, sketching ideas or collecting inspiration...",
    fields:[["Creative form","select",["Poetry","Story","Drawing idea","Photography","Design","Other"]],["Title","text"]]
  },

  "kindness-project": {
    title:"The Kindness Project",category:"COMMUNITY",
    description:"Turn empathy into small, practical acts of kindness.",
    heading:"Small actions matter",
    prompt:"What kind thing would you like to do?",
    placeholder:"An idea for helping someone or your community...",
    fields:[["Kindness area","select",["Family","Friendship","School","Environment","Community","Animals","Other"]],["My reflection","text"]],
    extra:"Kindness can be simple. Respect other people's boundaries and never put yourself at risk."
  },

  "learning-library": {
    title:"The Learning Library",category:"GROWTH",
    description:"A collection of learning prompts, useful skills and curiosity-led topics.",
    heading:"Something new to learn",
    prompt:"What would you like to explore?",
    placeholder:"Write your topic or question...",
    fields:[["Subject","select",["Science","History","Geography","Technology","Languages","Literature","Finance","Human rights","Other"]],["What I discovered","text"]]
  },

  "sleep-sanctuary": {
    title:"The Sleep Sanctuary",category:"WELLBEING",
    description:"Create a calming wind-down routine and notice what helps you rest.",
    heading:"Your wind-down routine",
    prompt:"What helps you relax before bedtime?",
    placeholder:"Write a comfortable evening routine...",
    fields:[["One thing to prepare","text"],["Something I can put aside","text"]],
    extra:"Rest looks different for everyone. Focus on habits that help you feel comfortable."
  },

  "money-matters": {
    title:"Money Matters",category:"GROWTH",
    description:"Learn budgeting, saving and thoughtful money habits.",
    heading:"Learn to manage money",
    prompt:"What would you like to understand?",
    placeholder:"Write your question about saving or budgeting...",
    fields:[["Topic","select",["Budgeting","Saving","Needs and wants","Planning a purchase","Understanding banks","Financial literacy"]],["My learning notes","text"]],
    extra:"This is an educational space, not financial advice. Ask a trusted adult before making financial decisions."
  },

  "open-mic": {
    title:"The Open Mic",category:"CREATIVE",
    description:"Explore poems, short writing, spoken-word ideas and original creations.",
    heading:"Your words belong here",
    prompt:"Give your creation a title",
    placeholder:"Write your original poem, story or spoken-word piece...",
    fields:[["Form","select",["Poem","Short story","Spoken word","Reflection","Other"]],["Title","text"]]
  }
};

const params = new URLSearchParams(window.location.search);
const featureId = params.get("feature");
const feature = featureData[featureId];

const content = $("featureContent");
const title = $("featureTitle");
const category = $("featureCategory");
const description = $("featureDescription");

const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
  "&":"&amp;",
  "<":"&lt;",
  ">":"&gt;",
  '"':"&quot;",
  "'":"&#39;"
}[char]));

if (!feature || !content) {
  if (title) title.textContent = "Space not found";
  if (category) category.textContent = "EXPLORE";
  if (description) description.textContent = "This space could not be found. Return to Explore to choose another.";
  if (content) content.innerHTML = `
    <section class="feature-panel">
      <a class="action-button" href="index.html#explore">Back to Explore</a>
    </section>`;
} else {
  title.textContent = feature.title;
  category.textContent = feature.category;
  description.textContent = feature.description;
  document.title = feature.title + " | To the Ether.";
  renderFeature();
}

/* FORM GENERATOR */

function createField(field, index) {
  const [label, type, options] = field;
  const id = "field" + index;

  let control = "";

  if (type === "select") {
    control = `
      <select id="${id}">
        <option value="">Choose one</option>
        ${options.map(option => `<option value="${escapeHTML(option)}">${escapeHTML(option)}</option>`).join("")}
      </select>`;
  } else if (type === "text" && label.toLowerCase().includes("memory")) {
    control = `<textarea id="${id}" placeholder="Write here..."></textarea>`;
  } else {
    control = `<input id="${id}" type="${type}" placeholder="${type === "number" ? "Enter a number" : ""}" ${type === "number" ? 'min="0"' : ""}>`;
  }

  return `
    <label for="${id}">${escapeHTML(label)}</label>
    ${control}`;
}

/* FEATURE CONTENT */

function renderFeature() {
  const fields = feature.fields || [];

  content.innerHTML = `
    <section class="feature-panel">
      <h2>${escapeHTML(feature.heading)}</h2>

      ${feature.extra ? `<p>${escapeHTML(feature.extra)}</p>` : ""}

      <form id="entryForm">
        <label for="entryTitle">${escapeHTML(feature.prompt)}</label>
        <input id="entryTitle" type="text" placeholder="${escapeHTML(feature.placeholder)}" required>

        ${fields.map(createField).join("")}

        <button class="action-button" type="submit">Save my entry ✧</button>
        <button class="action-button secondary" type="reset">Clear form</button>
      </form>

      <p id="saveMessage" aria-live="polite"></p>
    </section>

    ${featureId === "breathing-space" ? breathingHTML() : ""}
    ${featureId === "study-focus" ? studyHTML() : ""}
    ${featureId === "fitness-wellness" ? fitnessHTML() : ""}
    ${featureId === "career-exploration" ? careerHTML() : ""}
    ${featureId === "my-little-world" ? scrapbookHTML() : ""}
    ${featureId === "sports-events" ? sportsHTML() : ""}
    ${featureId === "movie-theatre" ? movieHTML() : ""}
    ${featureId === "the-commons" ? communityHTML() : ""}
    ${featureId === "self-care" ? selfCareHTML() : ""}
    ${featureId === "learning-library" ? learningHTML() : ""}
    ${featureId === "sleep-sanctuary" ? sleepHTML() : ""}

    <section class="feature-panel">
      <h2>My Saved Pages</h2>
      <p>Your saved entries appear here on this device.</p>
      <div class="saved-list" id="savedEntries"></div>
    </section>
  `;

  $("entryForm")?.addEventListener("submit", saveEntry);
  renderSaved();
  attachSpecialFeatures();
}

/* SAVE AND DISPLAY ENTRIES */

function saveEntry(event) {
  event.preventDefault();

  const values = {};
  feature.fields.forEach((field, index) => {
    const control = $("field" + index);
    if (control) values[field[0]] = control.value;
  });

  const entry = {
    title: $("entryTitle").value.trim(),
    values,
    date: new Date().toLocaleString()
  };

  if (!entry.title) return;

  const entries = window.EtherStore.add(featureId, entry);

  if (entries) {
    $("saveMessage").textContent = "Your entry has been saved ✧";
    $("entryForm").reset();
    renderSaved();
  }
}

function renderSaved() {
  const target = $("savedEntries");
  if (!target) return;

  const entries = window.EtherStore.get(featureId, []);

  if (!entries.length) {
    target.innerHTML = `<p>No saved entries yet. Your first one can start here.</p>`;
    return;
  }

  target.innerHTML = entries.map(entry => `
    <article class="saved-entry">
      <small>${escapeHTML(entry.date || "")}</small>
      <h3>${escapeHTML(entry.title)}</h3>
      ${Object.entries(entry.values || {}).map(([key,value]) => `
        <p><strong>${escapeHTML(key)}:</strong> ${escapeHTML(value)}</p>
      `).join("")}
      <button class="action-button secondary delete-entry" data-id="${escapeHTML(entry.id)}">
        Delete entry
      </button>
    </article>
  `).join("");

  target.querySelectorAll(".delete-entry").forEach(button => {
    button.addEventListener("click", () => {
      if (confirm("Delete this saved entry?")) {
        window.EtherStore.remove(featureId, Number(button.dataset.id));
        renderSaved();
      }
    });
  });
}

/* BREATHING SPACE */

function breathingHTML() {
  return `
    <section class="feature-panel">
      <h2>Guided breathing</h2>
      <p>Follow a gentle rhythm if it feels comfortable. You can stop at any time.</p>
      <div class="breath-orb" id="breathOrb"></div>
      <div class="breath-label" id="breathLabel">Ready?</div>
      <div class="timer-display" id="breathTimer">01:00</div>
      <div style="text-align:center">
        <button class="action-button" id="startBreathing">Start</button>
        <button class="action-button secondary" id="stopBreathing">Stop</button>
      </div>
      <p>Optional: <a href="https://www.youtube.com/results?search_query=calm+nature+sounds" target="_blank" rel="noopener">Nature sounds ↗</a></p>
    </section>`;
}

/* STUDY TIMER */

function studyHTML() {
  return `
    <section class="feature-panel">
      <h2>Focus timer</h2>
      <p>Choose a comfortable focus session. Remember to take breaks.</p>
      <div class="timer-display" id="studyTimer">10:00</div>
      <div style="text-align:center">
        <button class="action-button" id="startStudy">Start 10 minutes</button>
        <button class="action-button secondary" id="stopStudy">Pause</button>
        <button class="action-button secondary" id="resetStudy">Reset</button>
      </div>
      <h3>Music and quiet</h3>
      <div class="feature-tools">
        <a href="https://www.youtube.com/results?search_query=study+music" target="_blank" rel="noopener">YouTube study music ↗</a>
        <a href="https://open.spotify.com/search/focus" target="_blank" rel="noopener">Spotify ↗</a>
        <a href="https://music.youtube.com/" target="_blank" rel="noopener">YouTube Music ↗</a>
        <a href="https://www.apple.com/apple-music/" target="_blank" rel="noopener">Apple Music ↗</a>
        <a href="https://www.youtube.com/results?search_query=Quran+recitation" target="_blank" rel="noopener">Quran recitation ↗</a>
      </div>
    </section>`;
}

/* FITNESS */

function fitnessHTML() {
  return `
    <section class="feature-panel">
      <h2>Movement ideas</h2>
      <ul>
        <li>Take a comfortable walk outdoors.</li>
        <li>Try a beginner-friendly stretching session.</li>
        <li>Explore a swimming session with appropriate supervision.</li>
        <li>Enjoy cycling in a safe, permitted place.</li>
        <li>Try an easy run or walk-run session if suitable for you.</li>
      </ul>
      <h3>Find movement inspiration</h3>
      <div class="feature-tools">
        <a href="https://www.youtube.com/results?search_query=beginner+yoga+for+students" target="_blank" rel="noopener">Beginner yoga ↗</a>
        <a href="https://www.youtube.com/results?search_query=gentle+stretching" target="_blank" rel="noopener">Gentle stretching ↗</a>
        <a href="https://www.strava.com/" target="_blank" rel="noopener">Strava ↗</a>
      </div>
      <p>Strava is an external link, not an account integration in this demo.</p>
    </section>`;
}

/* CAREER EXPLORATION */

function careerHTML() {
  return `
    <section class="feature-panel">
      <h2>Explore career families</h2>
      <p>Start with broad interests, then research specific roles and qualifications.</p>
      <div class="feature-tools">
        <a href="https://www.ncs.gov.in/" target="_blank" rel="noopener">India National Career Service ↗</a>
        <a href="https://www.careeronestop.org/" target="_blank" rel="noopener">Career exploration ↗</a>
        <a href="https://www.coursera.org/" target="_blank" rel="noopener">Explore courses ↗</a>
      </div>
      <h3>Questions to consider</h3>
      <ul>
        <li>What problems would I enjoy helping solve?</li>
        <li>Which subjects make me curious?</li>
        <li>What qualifications and entrance exams are needed?</li>
        <li>What does a normal working day look like?</li>
        <li>What are the opportunities in India and internationally?</li>
      </ul>
      <p>There is more to your future than one job title.</p>
    </section>`;
}

/* SCRAPBOOK */

function scrapbookHTML() {
  return `
    <section class="feature-panel">
      <h2>Add a photograph</h2>
      <p>Choose a picture from your device for your personal scrapbook.</p>
      <input type="file" id="scrapbookPhoto" accept="image/*">
      <div class="photo-preview" id="photoPreview"></div>
      <p>Photos are stored in this browser only. Avoid uploading private photographs on shared devices.</p>
    </section>`;
}

/* SPORTS */

function sportsHTML() {
  return `
    <section class="feature-panel">
      <h2>Sports and event discovery</h2>
      <div class="feature-tools">
        <a href="https://worldathletics.org/" target="_blank" rel="noopener">World Athletics ↗</a>
        <a href="https://www.worldathletics.org/competitions" target="_blank" rel="noopener">Athletics competitions ↗</a>
        <a href="https://www.olympics.com/" target="_blank" rel="noopener">Olympics ↗</a>
        <a href="https://www.swimming.org/" target="_blank" rel="noopener">Swimming information ↗</a>
      </div>
      <h3>Explore different activities</h3>
      <ul>
        <li>Community running events</li>
        <li>Junior athletics opportunities</li>
        <li>Swimming competitions</li>
        <li>Community cycling events</li>
        <li>School sports festivals</li>
      </ul>
      <p>Always check age categories, event rules, supervision and registration requirements.</p>
    </section>`;
}

/* MOVIE THEATRE */

function movieHTML() {
  return `
    <section class="feature-panel">
      <h2>Explore films and documentaries</h2>
      <div class="feature-tools">
        <a href="https://www.youtube.com/" target="_blank" rel="noopener">YouTube ↗</a>
        <a href="https://www.bbc.com/reel" target="_blank" rel="noopener">BBC Reel ↗</a>
        <a href="https://www.ted.com/talks" target="_blank" rel="noopener">TED Talks ↗</a>
      </div>
      <p>Check age ratings and content descriptions before watching.</p>
    </section>`;
}

/* COMMONS */

function communityHTML() {
  return `
    <section class="feature-panel">
      <h2>Student club ideas</h2>
      <ul>
        <li>Book and reading club</li>
        <li>Environment and sustainability club</li>
        <li>Science and discovery club</li>
        <li>Creative writing circle</li>
        <li>Sports and outdoor activities club</li>
        <li>Volunteering and kindness group</li>
        <li>Debate and MUN club</li>
      </ul>
      <p>Use this space to develop an idea. Real clubs need appropriate adult supervision and school permission.</p>
    </section>`;
}

/* SELF CARE */

function selfCareHTML() {
  return `
    <section class="feature-panel">
      <h2>Everyday care checklist</h2>
      <p>Choose small, comfortable actions. There is no requirement to complete everything.</p>
      <div id="careChecklist">
        ${["Drink water","Take a comfortable break","Spend time outdoors if possible","Organise one small area","Connect with someone I trust","Make time for something enjoyable"].map((item,i) => `
          <p><label><input type="checkbox" class="care-check" data-index="${i}"> ${item}</label></p>
        `).join("")}
      </div>
      <p id="careProgress">Your progress: 0 / 6</p>
    </section>`;
}

/* LEARNING LIBRARY */

function learningHTML() {
  return `
    <section class="feature-panel">
      <h2>Curiosity prompts</h2>
      <ul>
        <li>How do satellites communicate?</li>
        <li>How do ecosystems recover?</li>
        <li>What makes a human right universal?</li>
        <li>How does the brain learn?</li>
        <li>How do communities respond to disasters?</li>
        <li>How do languages change over time?</li>
      </ul>
      <p>Choose a question, research it using reliable sources, and save what you discover.</p>
    </section>`;
}

/* SLEEP */

function sleepHTML() {
  return `
    <section class="feature-panel">
      <h2>A gentle wind-down</h2>
      <ul>
        <li>Put away unnecessary distractions.</li>
        <li>Prepare your things for tomorrow.</li>
        <li>Choose a quiet activity such as reading.</li>
        <li>Make your room comfortable.</li>
        <li>Give yourself time to rest.</li>
      </ul>
      <div class="feature-tools">
        <a href="https://www.youtube.com/results?search_query=calm+rain+nature+sounds" target="_blank" rel="noopener">Rain and nature sounds ↗</a>
      </div>
    </section>`;
}

/* TIMER ENGINE */

function makeTimer(display, seconds, onFinish) {
  let remaining = seconds;
  let interval = null;

  function update() {
    const mins = Math.floor(remaining / 60);
    const secs = remaining % 60;
    display.textContent =
      String(mins).padStart(2,"0") + ":" +
      String(secs).padStart(2,"0");
  }

  function stop() {
    clearInterval(interval);
    interval = null;
  }

  function start() {
    if (interval) return;

    interval = setInterval(() => {
      remaining--;
      update();

      if (remaining <= 0) {
        stop();
        if (onFinish) onFinish();
      }
    },1000);
  }

  function reset(value) {
    stop();
    remaining = value;
    update();
  }

  update();
  return {start,stop,reset};
}

/* CONNECT SPECIAL ACTIVITIES */

function attachSpecialFeatures() {

  /* BREATHING */

  if (featureId === "breathing-space") {
    const orb = $("breathOrb");
    const label = $("breathLabel");
    const display = $("breathTimer");
    let timer = null;
    let phase = null;
    let seconds = 60;

    function stopBreathing() {
      clearInterval(timer);
      clearTimeout(phase);
      timer = null;
      orb.classList.remove("inhale");
      label.textContent = "Paused. Take your time.";
    }

    $("startBreathing").addEventListener("click", () => {
      if (timer) return;

      let inhale = true;
      label.textContent = "Breathe in gently";
      orb.classList.add("inhale");

      phase = setInterval(() => {
        inhale = !inhale;
        orb.classList.toggle("inhale", inhale);
        label.textContent = inhale ? "Breathe in gently" : "Breathe out gently";
      },4000);

      timer = setInterval(() => {
        seconds--;
        display.textContent = "00:" + String(seconds).padStart(2,"0");

        if (seconds <= 0) {
          stopBreathing();
          label.textContent = "Session complete ✧";
        }
      },1000);
    });

    $("stopBreathing").addEventListener("click", () => {
      stopBreathing();
      seconds = 60;
      display.textContent = "01:00";
    });
  }

  /* STUDY TIMER */

  if (featureId === "study-focus") {
    const display = $("studyTimer");
    const timer = makeTimer(display,600,() => {
      alert("Your focus session is complete. Enjoy a break!");
    });

    $("startStudy").addEventListener("click",() => timer.start());
    $("stopStudy").addEventListener("click",() => timer.stop());
    $("resetStudy").addEventListener("click",() => timer.reset(600));
  }

  /* SCRAPBOOK PHOTO */

  if (featureId === "my-little-world") {
    const input = $("scrapbookPhoto");
    const preview = $("photoPreview");

    const photos = window.EtherStore.get("scrapbook-photos",[]);

    function showPhotos() {
      preview.innerHTML = photos.map((photo,index) => `
        <div>
          <img src="${photo}" alt="Scrapbook photograph">
          <button class="action-button secondary remove-photo" data-index="${index}">Remove</button>
        </div>
      `).join("");

      preview.querySelectorAll(".remove-photo").forEach(button => {
        button.addEventListener("click",() => {
          const index = Number(button.dataset.index);
          photos.splice(index,1);
          window.EtherStore.set("scrapbook-photos",photos);
          showPhotos();
        });
      });
    }

    showPhotos();

    input.addEventListener("change",() => {
      const file = input.files[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        alert("Please choose an image.");
        return;
      }

      if (file.size > 1200000) {
        alert("Please choose an image smaller than 1.2 MB.");
        input.value = "";
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        if (photos.length >= 15) {
          alert("This demo allows up to 15 scrapbook photos.");
          return;
        }

        photos.push(reader.result);
        if (window.EtherStore.set("scrapbook-photos",photos)) {
          showPhotos();
        }
      };

      reader.readAsDataURL(file);
    });
  }

  /* SELF CARE CHECKLIST */

  if (featureId === "self-care") {
    const checks = [...document.querySelectorAll(".care-check")];
    const saved = window.EtherStore.get("care-checks",[]);

    checks.forEach((check,index) => {
      check.checked = saved.includes(index);

      check.addEventListener("change",() => {
        const current = checks
          .filter(item => item.checked)
          .map(item => Number(item.dataset.index));

        window.EtherStore.set("care-checks",current);
        $("careProgress").textContent =
          "Your progress: " + current.length + " / " + checks.length;
      });
    });

    $("careProgress").textContent =
      "Your progress: " + saved.length + " / " + checks.length;
  }
}

/* PERSONAL BACKGROUND COLOUR */

const backgroundInput = $("backgroundColour");
const saveBackground = $("saveBackground");
const resetBackground = $("resetBackground");

if (backgroundInput && featureId) {
  const savedColour = window.EtherStore.get("background-" + featureId,null);

  if (savedColour) {
    document.body.style.background = savedColour;
    backgroundInput.value = savedColour;
  }

  saveBackground.addEventListener("click",() => {
    const colour = backgroundInput.value;
    window.EtherStore.set("background-" + featureId,colour);
    document.body.style.background = colour;
  });

  resetBackground.addEventListener("click",() => {
    window.EtherStore.remove("background-" + featureId,"");
    localStorage.removeItem("ether:background-" + featureId);
    document.body.style.background = "#414B2D";
    backgroundInput.value = "#414B2D";
  });
}

/* FOOTER YEAR */

if ($("year")) {
  $("year").textContent = new Date().getFullYear();
}
