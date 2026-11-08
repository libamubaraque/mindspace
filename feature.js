
// =====================================================
// 01. TO THE ETHER - FEATURE ENGINE
// This file controls all ten individual feature pages.
// =====================================================

const params = new URLSearchParams(window.location.search);
const feature = params.get("feature");

const content = document.getElementById("featureContent");
const featureTitle = document.getElementById("featureTitle");
const featureDescription = document.getElementById("featureDescription");
const featureEyebrow = document.getElementById("featureEyebrow");

// =====================================================
// 02. FEATURE INFORMATION
// =====================================================

const features = {
  mood: {
    title: "Mood Journal",
    eyebrow: "UNDERSTAND YOURSELF",
    description: "A place to put your feelings into words, without needing to explain everything.",
    icon: "☾"
  },
  breathing: {
    title: "Breathing Space",
    eyebrow: "SLOW DOWN",
    description: "Pause for a moment. Find a comfortable rhythm and give yourself a little space.",
    icon: "◌"
  },
  gratitude: {
    title: "Gratitude Journal",
    eyebrow: "NOTICE THE LITTLE THINGS",
    description: "Collect moments, memories and things you appreciate.",
    icon: "✿"
  },
  fitness: {
    title: "Fitness & Wellness",
    eyebrow: "MOVE & FEEL",
    description: "Explore movement, running, rest and everyday wellbeing.",
    icon: "↗"
  },
  checkin: {
    title: "Daily Check-in",
    eyebrow: "A MOMENT FOR YOURSELF",
    description: "Small wins matter. You do not need to have a perfect day.",
    icon: "♡"
  },
  study: {
    title: "Study & Focus",
    eyebrow: "ONE STEP AT A TIME",
    description: "Create a calm study session that fits your own pace.",
    icon: "⌁"
  },
  selfcare: {
    title: "Self-care Corner",
    eyebrow: "TAKE CARE",
    description: "Care can be simple, ordinary and different for everyone.",
    icon: "❋"
  },
  stories: {
    title: "Stories & Reality",
    eyebrow: "UNDERSTAND THE WORLD",
    description: "Learn about real challenges, human experiences and people creating change.",
    icon: "✧"
  },
  career: {
    title: "Career Exploration",
    eyebrow: "DREAM BEYOND LIMITS",
    description: "You can have many interests. Explore different directions before choosing.",
    icon: "☆"
  },
  world: {
    title: "My Little World",
    eyebrow: "YOUR OWN COLLECTION",
    description: "A private little place for your memories, photographs, thoughts and stories.",
    icon: "❧"
  }
};

// =====================================================
// 03. CHECK THE SELECTED FEATURE
// =====================================================

if (!features[feature]) {
  featureTitle.textContent = "Space not found";
  featureDescription.textContent = "Please return to the homepage and choose a feature.";
  content.innerHTML = `
    <section class="detail-section">
      <a class="primary-button" href="index.html#explore">Return to Explore</a>
    </section>`;
} else {
  const current = features[feature];
  document.title = current.title + " | To the Ether";
  featureTitle.textContent = current.icon + " " + current.title;
  featureEyebrow.textContent = current.eyebrow;
  featureDescription.textContent = current.description;
  renderFeature();
}

// =====================================================
// 04. STORAGE FUNCTIONS
// All entries are saved in this browser.
// =====================================================

function getData(key, fallback = []) {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : fallback;
  } catch {
    return fallback;
  }
}

function saveData(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch {
    alert("Storage is full. Please remove some photos or saved entries.");
    return false;
  }
}

// =====================================================
// 05. SHARED SAVE FUNCTION
// Adds entries to My Saved Pages on the homepage.
// =====================================================

function savePage(title, text, extra = {}) {
  if (!text || !String(text).trim()) {
    alert("Write something before saving.");
    return;
  }

  const pages = getData("etherSavedPages", []);

  pages.push({
    id: Date.now() + "-" + Math.random().toString(36).slice(2, 8),
    feature,
    title,
    content: String(text),
    date: new Date().toLocaleDateString(),
    ...extra
  });

  if (saveData("etherSavedPages", pages)) {
    alert("Your page has been saved in My Saved Pages.");
  }
}

// =====================================================
// 06. COMMON PAGE BUILDING BLOCKS
// =====================================================

function section(title, description, body) {
  return `
    <section class="detail-section">
      <h2>${title}</h2>
      ${description ? `<p>${description}</p>` : ""}
      ${body}
    </section>`;
}

function field(label, id, placeholder = "", multiline = true) {
  return `
    <label for="${id}">${label}</label>
    ${multiline
      ? `<textarea class="field" id="${id}" placeholder="${placeholder}"></textarea>`
      : `<input class="field" id="${id}" placeholder="${placeholder}">`
    }`;
}

function saveButton(id, title, sourceId = id) {
  return `
    <button class="small-button" type="button"
      onclick="saveFromField('${id}','${title}')">
      Save my page
    </button>`;
}

function saveFromField(id, title) {
  const input = document.getElementById(id);
  if (!input) return;

  savePage(title, input.value);
}

// =====================================================
// 07. MOOD JOURNAL
// Five different reflection ideas.
// =====================================================

function moodPage() {
  const prompts = [
    "What is taking up space in my mind today?",
    "What made me feel happy or peaceful?",
    "What has been difficult lately?",
    "What do I wish someone understood about me?",
    "What is one kind thing I can tell myself?"
  ];

  return section(
    "A little reflection",
    "Choose any question. You can skip any prompt you do not want to answer.",
    `
      <div class="tile-grid">
        ${prompts.map((prompt, i) => `
          <div class="tile">
            <h3>Reflection ${i + 1}</h3>
            <p>${prompt}</p>
          </div>`).join("")}
      </div>
      <label for="moodChoice">How are you feeling?</label>
      <select class="field" id="moodChoice">
        <option>Choose a feeling</option>
        <option>Happy</option>
        <option>Calm</option>
        <option>Hopeful</option>
        <option>Confused</option>
        <option>Worried</option>
        <option>Tired</option>
        <option>Not sure</option>
        <option>Prefer not to say</option>
      </select>
      ${field("Your thoughts", "moodWriting", "Write anything you want...")}
      ${saveButton("moodWriting", "Mood Journal")}
      `
  );
}

// =====================================================
// 08. BREATHING SPACE
// Includes a visual guide and different exercises.
// =====================================================

function breathingPage() {
  return `
    ${section(
      "Find your rhythm",
      "Choose a gentle activity. Stop if you feel uncomfortable or light-headed.",
      `
      <div class="tile-grid">
        <div class="tile">
          <h3>Gentle breathing</h3>
          <p>A comfortable, unforced breathing rhythm.</p>
          <button class="small-button" onclick="startBreathing(4,4)">Begin</button>
        </div>
        <div class="tile">
          <h3>Slow breathing</h3>
          <p>Try a gentle inhale and a slightly longer exhale.</p>
          <button class="small-button" onclick="startBreathing(3,5)">Begin</button>
        </div>
        <div class="tile">
          <h3>Quiet pause</h3>
          <p>Relax your shoulders and notice the room around you.</p>
          <button class="small-button" onclick="startBreathing(3,3)">Begin</button>
        </div>
      </div>

      <div class="breath-circle" id="breathCircle">
        <span id="breathText">Ready?</span>
      </div>

      <p class="result-text" id="breathStatus">Choose an exercise to begin.</p>
      <div class="action-row">
        <button class="small-button" onclick="stopBreathing()">Stop exercise</button>
      </div>`
    )}

    ${section(
      "Personalise your space",
      "What kind of atmosphere would you prefer?",
      `
      <div class="tile-grid">
        <div class="tile">
          <h3>Nature sounds</h3>
          <a class="resource-link" target="_blank" rel="noopener"
             href="https://www.youtube.com/results?search_query=rain+forest+nature+sounds">Rain and forest sounds ↗</a>
        </div>
        <div class="tile">
          <h3>Quiet music</h3>
          <a class="resource-link" target="_blank" rel="noopener"
             href="https://open.spotify.com/">Spotify ↗</a>
        </div>
        <div class="tile">
          <h3>Silence</h3>
          <p>Simply enjoy a quiet moment without audio.</p>
        </div>
      </div>
      <h3>Yoga and movement</h3>
      <p>Try a beginner-friendly session at your own pace.</p>
      <a class="resource-link" target="_blank" rel="noopener"
         href="https://www.youtube.com/results?search_query=beginner+gentle+yoga">Beginner yoga classes ↗</a>
      <a class="resource-link" target="_blank" rel="noopener"
         href="https://www.youtube.com/results?search_query=gentle+stretching">Gentle stretching ↗</a>
      `
    )}

    ${section(
      "After your pause",
      "You do not need to write anything if you do not want to.",
      field("How do you feel now?", "breathReflection", "Write a little reflection...")
      + saveButton("breathReflection", "Breathing Reflection")
    )}
  `;
}

let breathInterval = null;
let breathTimeout = null;

function startBreathing(inhale, exhale) {
  stopBreathing();

  const circle = document.getElementById("breathCircle");
  const text = document.getElementById("breathText");
  const status = document.getElementById("breathStatus");

  if (!circle || !text) return;

  circle.classList.add("active");
  let phase = "Inhale";

  function update() {
    text.textContent = phase;
    status.textContent = "Follow a comfortable rhythm. You can stop whenever you like.";
    phase = phase === "Inhale" ? "Exhale" : "Inhale";
  }

  update();

  breathInterval = setInterval(update, Math.max(inhale, exhale) * 1000);
  breathTimeout = setTimeout(() => stopBreathing(), 60000);
}

function stopBreathing() {
  clearInterval(breathInterval);
  clearTimeout(breathTimeout);

  const circle = document.getElementById("breathCircle");
  const text = document.getElementById("breathText");
  const status = document.getElementById("breathStatus");

  circle?.classList.remove("active");

  if (text) text.textContent = "Rest";
  if (status) status.textContent = "Exercise stopped. Take your time.";
}

// =====================================================
// 09. GRATITUDE JOURNAL
// Editable writing and design choices.
// =====================================================

function gratitudePage() {
  return `
    ${section(
      "Little things worth keeping",
      "They do not have to be big moments.",
      `
      <div class="tile-grid">
        <div class="tile"><h3>Today</h3><p>What was one good moment?</p></div>
        <div class="tile"><h3>People</h3><p>Who made your day better?</p></div>
        <div class="tile"><h3>Myself</h3><p>What did I do that I appreciate?</p></div>
        <div class="tile"><h3>Tomorrow</h3><p>What small thing am I looking forward to?</p></div>
      </div>
      <label for="gratitudeStyle">Choose a page background</label>
      <select class="field" id="gratitudeStyle">
        <option value="#414B35">Forest green</option>
        <option value="#655347">Warm brown</option>
        <option value="#4B5361">Evening blue</option>
        <option value="#65515C">Muted rose</option>
        <option value="#EDE2D0">Soft beige</option>
      </select>
      <label for="gratitudeFont">Choose your writing style</label>
      <select class="field" id="gratitudeFont">
        <option value="DM Sans">Simple</option>
        <option value="Playfair Display">Classic</option>
        <option value="Georgia">Handwritten-like serif</option>
      </select>
      ${field("My gratitude page", "gratitudeWriting", "Today I appreciate...")}
      <div class="action-row">
        <button class="small-button" onclick="styleJournal()">Apply design</button>
        ${saveButton("gratitudeWriting", "Gratitude Journal")}
      </div>
      <div id="gratitudePreview" class="tile">
        <h3>Your page preview</h3>
        <p>Your writing will appear here when you apply a design.</p>
      </div>`
    )}
  `;
}

function styleJournal() {
  const text = document.getElementById("gratitudeWriting");
  const colour = document.getElementById("gratitudeStyle")?.value;
  const font = document.getElementById("gratitudeFont")?.value;
  const preview = document.getElementById("gratitudePreview");

  if (!preview || !text) return;

  preview.style.background = colour;
  preview.style.fontFamily = font;
  preview.style.color = colour === "#EDE2D0" ? "#24271F" : "#F5EEDF";

  const heading = document.createElement("h3");
  heading.textContent = "My gratitude page";

  const paragraph = document.createElement("p");
  paragraph.textContent = text.value || "Your writing will appear here.";

  preview.replaceChildren(heading, paragraph);
}

// =====================================================
// 10. FITNESS AND WELLNESS
// Running, movement, rest and a simple activity log.
// =====================================================

function fitnessPage() {
  return `
    ${section(
      "Movement for everyday life",
      "Movement is about feeling comfortable and enjoying what your body can do. Rest is important too.",
      `
      <div class="tile-grid">
        <div class="tile">
          <h3>Walking</h3>
          <p>Take a relaxed walk outdoors or indoors.</p>
        </div>
        <div class="tile">
          <h3>Running</h3>
          <p>Explore a safe, comfortable running routine. Start gently and rest when needed.</p>
        </div>
        <div class="tile">
          <h3>Cycling</h3>
          <p>Enjoy a comfortable cycle in a safe place.</p>
        </div>
        <div class="tile">
          <h3>Stretching</h3>
          <p>Try gentle movement to loosen up after sitting.</p>
        </div>
      </div>
      <h3>Yoga classes</h3>
      <a class="resource-link" href="https://www.youtube.com/results?search_query=beginner+yoga" target="_blank" rel="noopener">Beginner yoga ↗</a>
      <a class="resource-link" href="https://www.youtube.com/results?search_query=gentle+stretching" target="_blank" rel="noopener">Gentle stretching ↗</a>
      `
    )}

    ${section(
      "My movement journal",
      "Record activities you enjoyed. There is no target or competition.",
      `
      <label for="activityType">Activity</label>
      <select class="field" id="activityType">
        <option>Walking</option>
        <option>Running</option>
        <option>Cycling</option>
        <option>Yoga</option>
        <option>Stretching</option>
        <option>Rest day</option>
        <option>Other</option>
      </select>
      ${field("What did I enjoy?", "fitnessWriting", "Today I tried...")}
      ${saveButton("fitnessWriting", "Movement Journal")}
      `
    )}

    ${section(
      "Connect with your activity community",
      "Strava can be used to record activities and connect with other people. Account connection is external to this website.",
      `<a class="resource-link" href="https://www.strava.com/" target="_blank" rel="noopener">Visit Strava ↗</a>
       <p class="small-note">This is a website link, not a live Strava account integration.</p>`
    )}
  `;
}

// =====================================================
// 11. DAILY CHECK-IN
// Little wins, small prompts and a random activity.
// =====================================================

function checkinPage() {
  return `
    ${section(
      "How is today going?",
      "No need to give your day a score. Just check in.",
      `
      <label for="checkinFeeling">What describes today?</label>
      <select class="field" id="checkinFeeling">
        <option>Choose one</option>
        <option>A good day</option>
        <option>A quiet day</option>
        <option>A difficult day</option>
        <option>An unusual day</option>
        <option>Not sure yet</option>
      </select>
      ${field("One little win", "littleWin", "Something I managed today...")}
      ${field("A thought I want to remember", "checkinThought", "Today I realised...")}
      <button class="small-button" onclick="saveCheckin()">Save today's check-in</button>
      `
    )}

    ${section(
      "A tiny activity",
      "Tap the button for a small idea. You can skip it.",
      `
      <div class="tile">
        <h3 id="randomActivity">Your little activity is waiting.</h3>
        <button class="small-button" onclick="spinActivity()">Give me an idea ↗</button>
      </div>`
    )}

    ${section(
      "Little conversations",
      "Choose a prompt for a small reflection.",
      `
      <div class="tile-grid">
        <div class="tile"><h3>Dreams</h3><p>What is something you hope to learn?</p></div>
        <div class="tile"><h3>Friendship</h3><p>What makes someone a good friend?</p></div>
        <div class="tile"><h3>Growth</h3><p>What is something you understand better now?</p></div>
      </div>`
    )}
  `;
}

function saveCheckin() {
  const feeling = document.getElementById("checkinFeeling")?.value || "";
  const win = document.getElementById("littleWin")?.value || "";
  const thought = document.getElementById("checkinThought")?.value || "";

  savePage(
    "Daily Check-in",
    "Today: " + feeling + "\nLittle win: " + win + "\nThought: " + thought
  );
}

function spinActivity() {
  const activities = [
    "Listen to a song you love.",
    "Write down one thing you learnt.",
    "Look outside and notice the sky.",
    "Organise one small corner of your desk.",
    "Read a page of something interesting.",
    "Send a kind message to someone.",
    "Take a comfortable break.",
    "Draw something without worrying about how it looks.",
    "Write a letter to your future self.",
    "Learn one new word."
  ];

  const target = document.getElementById("randomActivity");
  if (target) {
    target.textContent =
      activities[Math.floor(Math.random() * activities.length)];
  }
}

// =====================================================
// 12. STUDY AND FOCUS
// Levels, timer and music choices.
// =====================================================

function studyPage() {
  return `
    ${section(
      "Choose your study level",
      "Pick a session that fits the time and energy you have.",
      `
      <div class="tile-grid">
        <div class="tile">
          <h3>Beginner</h3>
          <p>10 minutes of study, followed by a 5-minute break.</p>
          <button class="small-button" onclick="startStudy(10)">Choose</button>
        </div>
        <div class="tile">
          <h3>Intermediate</h3>
          <p>20 minutes of study, followed by a 5-minute break.</p>
          <button class="small-button" onclick="startStudy(20)">Choose</button>
        </div>
        <div class="tile">
          <h3>Longer session</h3>
          <p>30 minutes of study, followed by a proper break.</p>
          <button class="small-button" onclick="startStudy(30)">Choose</button>
        </div>
      </div>
      <div class="tile">
        <h3 id="studyTimer">10:00</h3>
        <p id="studyStatus">Choose your session to begin.</p>
        <div class="action-row">
          <button class="small-button" onclick="pauseStudy()">Pause</button>
          <button class="delete-button" onclick="resetStudy()">Reset</button>
        </div>
      </div>`
    )}

    ${section(
      "Your study plan",
      "Write down the subject or task you want to focus on.",
      field("Today's study goal", "studyWriting", "For this session, I want to...")
      + saveButton("studyWriting", "Study Plan")
    )}

    ${section(
      "Choose your atmosphere",
      "Use music, natural sounds or silence.",
      `
      <div class="tile-grid">
        <div class="tile"><h3>Spotify</h3><a class="resource-link" target="_blank" rel="noopener" href="https://open.spotify.com/">Open Spotify ↗</a></div>
        <div class="tile"><h3>YouTube Music</h3><a class="resource-link" target="_blank" rel="noopener" href="https://music.youtube.com/">Open YouTube Music ↗</a></div>
        <div class="tile"><h3>Apple Music</h3><a class="resource-link" target="_blank" rel="noopener" href="https://music.apple.com/">Open Apple Music ↗</a></div>
        <div class="tile"><h3>Nature sounds</h3><a class="resource-link" target="_blank" rel="noopener" href="https://www.youtube.com/results?search_query=forest+rain+study+sounds">Listen ↗</a></div>
        <div class="tile"><h3>Quran</h3><a class="resource-link" target="_blank" rel="noopener" href="https://quran.com/">Read Quran ↗</a></div>
        <div class="tile"><h3>Silence</h3><p>Sometimes quiet is all you need.</p></div>
      </div>`
    )}
  `;
}

let studyInterval = null;
let studyRemaining = 600;

function updateStudyTimer() {
  const display = document.getElementById("studyTimer");
  if (display) {
    const minutes = Math.floor(studyRemaining / 60);
    const seconds = studyRemaining % 60;
    display.textContent =
      String(minutes).padStart(2, "0") + ":" +
      String(seconds).padStart(2, "0");
  }
}

function startStudy(minutes) {
  clearInterval(studyInterval);
  studyRemaining = minutes * 60;
  updateStudyTimer();

  const status = document.getElementById("studyStatus");
  if (status) status.textContent = "Your focus session has started.";

  studyInterval = setInterval(() => {
    studyRemaining--;
    updateStudyTimer();

    if (studyRemaining <= 0) {
      clearInterval(studyInterval);
      if (status) status.textContent = "Session complete. Time for a break!";
      alert("Your study session is complete. Take a break!");
    }
  }, 1000);
}

function pauseStudy() {
  clearInterval(studyInterval);
  studyInterval = null;

  const status = document.getElementById("studyStatus");
  if (status) status.textContent = "Session paused.";
}

function resetStudy() {
  clearInterval(studyInterval);
  studyInterval = null;
  studyRemaining = 600;
  updateStudyTimer();

  const status = document.getElementById("studyStatus");
  if (status) status.textContent = "Choose your session to begin.";
}

// =====================================================
// 13. SELF-CARE CORNER
// Simple wellbeing and habit tracker.
// =====================================================

function selfcarePage() {
  const habits = [
    "Had enough rest",
    "Drank water",
    "Took a comfortable break",
    "Spent time outdoors",
    "Talked to someone I trust",
    "Made time for something enjoyable",
    "Looked after my personal hygiene",
    "Allowed myself to rest"
  ];

  return `
    ${section(
      "A gentle self-care checklist",
      "These are ideas, not rules. You do not need to complete everything.",
      `
      <div class="tile-grid">
        ${habits.map((habit, i) => `
          <div class="tile">
            <label>
              <input type="checkbox" class="care-check" value="${habit}">
              ${habit}
            </label>
          </div>
        `).join("")}
      </div>
      <button class="small-button" onclick="saveCare()">Save my wellbeing check-in</button>
      `
    )}

    ${section(
      "Different kinds of care",
      "Your wellbeing includes many parts of everyday life.",
      `
      <div class="tile-grid">
        <div class="tile"><h3>Physical care</h3><p>Rest, hygiene, comfortable movement and everyday health.</p></div>
        <div class="tile"><h3>Mental care</h3><p>Space to reflect, take breaks and talk to trusted people.</p></div>
        <div class="tile"><h3>Social care</h3><p>Healthy friendships, family connections and boundaries.</p></div>
        <div class="tile"><h3>Personal care</h3><p>Choose routines that are comfortable and right for you.</p></div>
      </div>`
    )}

    ${section(
      "My personal notes",
      "Write down something that helps you feel supported.",
      field("A helpful reminder", "careWriting", "Something I want to remember...")
      + saveButton("careWriting", "Self-care Notes")
    )}

    ${section(
      "Finding support",
      "If you are worried about your wellbeing, consider talking with a trusted adult or a qualified health professional.",
      `
      <a class="resource-link" href="https://www.who.int/health-topics/mental-health" target="_blank" rel="noopener">WHO mental health information ↗</a>
      <a class="resource-link" href="https://www.mohfw.gov.in/" target="_blank" rel="noopener">India Ministry of Health ↗</a>
      `
    )}
  `;
}

function saveCare() {
  const checked = [...document.querySelectorAll(".care-check:checked")]
    .map(item => item.value);

  savePage("Wellbeing Check-in", checked.join("\n") || "I took time to check in with myself.");
}

// =====================================================
// 14. STORIES AND REALITY
// Real-world learning with credible organisations.
// =====================================================

function storiesPage() {
  return `
    ${section(
      "The world is bigger than our everyday lives",
      "Explore real challenges, the people affected and organisations working on solutions.",
      `
      <div class="tile-grid">
        <div class="tile">
          <h3>Children and education</h3>
          <p>Explore barriers to education, displacement and efforts to keep children learning.</p>
          <a class="resource-link" href="https://www.unicef.org/education" target="_blank" rel="noopener">UNICEF education ↗</a>
        </div>
        <div class="tile">
          <h3>Children in emergencies</h3>
          <p>Understand how crises affect children's access to safety, food, healthcare and education.</p>
          <a class="resource-link" href="https://www.unicef.org/emergencies" target="_blank" rel="noopener">UNICEF emergencies ↗</a>
        </div>
        <div class="tile">
          <h3>Humanitarian response</h3>
          <p>Learn how aid organisations coordinate support during emergencies.</p>
          <a class="resource-link" href="https://www.unocha.org/" target="_blank" rel="noopener">OCHA ↗</a>
        </div>
        <div class="tile">
          <h3>Global health</h3>
          <p>Discover health inequalities and work to improve access to care.</p>
          <a class="resource-link" href="https://www.who.int/" target="_blank" rel="noopener">WHO ↗</a>
        </div>
        <div class="tile">
          <h3>Food and hunger</h3>
          <p>Understand food insecurity and humanitarian food assistance.</p>
          <a class="resource-link" href="https://www.wfp.org/" target="_blank" rel="noopener">World Food Programme ↗</a>
        </div>
        <div class="tile">
          <h3>Refugees and displacement</h3>
          <p>Learn about displacement and the rights of refugees.</p>
          <a class="resource-link" href="https://www.unhcr.org/" target="_blank" rel="noopener">UNHCR ↗</a>
        </div>
      </div>`
    )}

    ${section(
      "Think beyond the headlines",
      "What did you learn? What would you like to understand better?",
      field("My reflection", "storyWriting", "One thing I learnt...")
      + saveButton("storyWriting", "Stories and Reality Reflection")
    )}

    ${section(
      "Positive change",
      "Explore people and organisations working towards a better world.",
      `
      <a class="resource-link" href="https://www.doctorswithoutborders.org/" target="_blank" rel="noopener">Doctors Without Borders ↗</a>
      <a class="resource-link" href="https://www.savethechildren.org/" target="_blank" rel="noopener">Save the Children ↗</a>
      <a class="resource-link" href="https://www.un.org/" target="_blank" rel="noopener">United Nations ↗</a>`
    )}
  `;
}

// =====================================================
// 15. CAREER EXPLORATION
// Ten-question interest quiz and career pathways.
// =====================================================

const careerQuestions = [
  {
    q: "What kind of problem interests you?",
    a: ["Helping someone become healthier","Understanding laws and society","Discovering how nature works","Creating something new","Helping communities"],
    scores: [0,1,2,3,4]
  },
  {
    q: "Which activity sounds interesting?",
    a: ["Learning about medicine","Debating social issues","Doing scientific experiments","Designing or building","Organising community projects"],
    scores: [0,1,2,3,4]
  },
  {
    q: "Where would you like to contribute?",
    a: ["Hospitals and clinics","Public institutions","Laboratories and research","Creative studios","Aid organisations"],
    scores: [0,1,2,3,4]
  },
  {
    q: "What would you like to learn more about?",
    a: ["Human health","History and politics","Science and technology","Art and communication","Humanitarian work"],
    scores: [0,1,2,3,4]
  },
  {
    q: "What is important in your future work?",
    a: ["Helping individual people","Improving society","Making discoveries","Creating original work","Supporting communities"],
    scores: [0,1,2,3,4]
  },
  {
    q: "Which subject attracts you most?",
    a: ["Biology","Political science","Physics or chemistry","Art or design","Geography or social science"],
    scores: [0,1,2,3,4]
  },
  {
    q: "What kind of environment interests you?",
    a: ["A healthcare environment","A policy or legal setting","A research environment","An independent creative setting","A field or community setting"],
    scores: [0,1,2,3,4]
  },
  {
    q: "What would you enjoy doing?",
    a: ["Working with patients","Studying social systems","Investigating questions","Making visual ideas","Working on community solutions"],
    scores: [0,1,2,3,4]
  },
  {
    q: "Which topic would you choose to research?",
    a: ["Diseases and treatments","Human rights and governance","Climate and scientific discoveries","Media and design","Poverty and humanitarian needs"],
    scores: [0,1,2,3,4]
  },
  {
    q: "What would make your work meaningful?",
    a: ["Improving someone's health","Making institutions fairer","Finding new knowledge","Sharing ideas creatively","Making life better for communities"],
    scores: [0,1,2,3,4]
  }
];

const careerGroups = [
  {
    title: "Health and Medicine",
    description: "For interests in health, science and patient care.",
    jobs: [
      "Doctor",
      "Paediatrician",
      "Neurologist",
      "Anaesthesiologist",
      "Public Health Specialist",
      "Medical Researcher"
    ],
    degree: "MBBS is the main undergraduate route to becoming a doctor in India. Specialisation requires further postgraduate training.",
    duration: "MBBS: 5.5 years including internship. Specialisation takes additional years.",
    exam: "NEET-UG for MBBS admission in India."
  },
  {
    title: "Law, Society and Policy",
    description: "For interests in rights, justice and public institutions.",
    jobs: [
      "Lawyer",
      "Human Rights Advocate",
      "Policy Researcher",
      "Civil Servant",
      "International Relations Specialist"
    ],
    degree: "BA LLB, LLB or degrees in political science, public policy and international relations.",
    duration: "BA LLB is generally 5 years after Class 12; other routes vary.",
    exam: "CLAT for participating national law universities; other universities have their own admissions."
  },
  {
    title: "Science and Research",
    description: "For curiosity about discoveries and the natural world.",
    jobs: [
      "Research Scientist",
      "Environmental Scientist",
      "Biologist",
      "Chemist",
      "Climate Researcher"
    ],
    degree: "BSc followed by MSc and, for research careers, possibly a PhD.",
    duration: "Often 3-4 years for undergraduate study, followed by further education.",
    exam: "University admission requirements vary; some institutions have entrance tests."
  },
  {
    title: "Creative and Communication",
    description: "For people who enjoy ideas, design and communication.",
    jobs: [
      "Graphic Designer",
      "Writer",
      "Journalist",
      "Photographer",
      "Communication Designer"
    ],
    degree: "Design, journalism, communication, media or related degrees.",
    duration: "Usually 3-4 years for undergraduate programmes.",
    exam: "Some design institutions use entrance tests such as UCEED or NID DAT."
  },
  {
    title: "Humanitarian and Community Work",
    description: "For interests in humanitarian support and community development.",
    jobs: [
      "Humanitarian Programme Officer",
      "Social Worker",
      "Emergency Response Coordinator",
      "Child Protection Specialist",
      "Community Development Worker"
    ],
    degree: "Social work, development studies, public health, international relations or medicine.",
    duration: "Varies by degree and specialisation.",
    exam: "Depends on the university and chosen course."
  }
];

function careerPage() {
  return `
    ${section(
      "Dreams beyond a single career",
      "You do not need to know your future job right now. Explore the different areas that interest you.",
      `
      <div class="tile-grid">
        ${careerGroups.map((group, index) => `
          <div class="tile">
            <h3>${group.title}</h3>
            <p>${group.description}</p>
            <button class="small-button" onclick="showCareerGroup(${index})">Explore careers ↗</button>
          </div>
        `).join("")}
      </div>
      <div id="careerDetails" class="tile"></div>`
    )}

    ${section(
      "Find your direction: 10-question quiz",
      "Choose the answer that interests you most. This is an exploration tool, not a test or a fixed career prediction.",
      `
      <div id="careerQuiz">
        <p id="careerQuestionCount">Question 1 of 10</p>
        <h3 id="careerQuestion"></h3>
        <div id="careerAnswers"></div>
        <div class="action-row">
          <button class="small-button" id="careerNext" onclick="nextCareerQuestion()">Next question ↗</button>
          <button class="delete-button" onclick="resetCareerQuiz()">Restart</button>
        </div>
        <p id="careerResult" class="result-text"></p>
      </div>`
    )}

    ${section(
      "Your dreams beyond your job",
      "A career is only one part of life. Think about the things you want to experience and contribute.",
      `
      ${field("Things I want to learn", "dreamLearning", "I would love to learn...")}
      ${field("Places I hope to visit", "dreamPlaces", "Somewhere I would like to explore...")}
      ${field("Ways I want to help", "dreamHelping", "I hope to contribute by...")}
      ${saveButton("dreamLearning", "My Dreams")}
      <button class="small-button" onclick="saveDreams()">Save all my dreams</button>`
    )}
  `;
}

function showCareerGroup(index) {
  const group = careerGroups[index];
  const target = document.getElementById("careerDetails");
  if (!group || !target) return;

  target.replaceChildren();

  const heading = document.createElement("h3");
  heading.textContent = group.title;

  const description = document.createElement("p");
  description.textContent = group.description;

  const jobs = document.createElement("p");
  jobs.textContent = "Possible jobs: " + group.jobs.join(", ");

  const degree = document.createElement("p");
  degree.textContent = "Degrees: " + group.degree;

  const duration = document.createElement("p");
  duration.textContent = "Duration: " + group.duration;

  const exam = document.createElement("p");
  exam.textContent = "Admissions: " + group.exam;

  const note = document.createElement("p");
  note.textContent = "Income and opportunities vary widely by country, employer, experience and qualifications. Check current official course and job information before making decisions.";

  target.append(heading, description, jobs, degree, duration, exam, note);
}

let careerIndex = 0;
let careerScores = [0,0,0,0,0];

function renderCareerQuestion() {
  const question = careerQuestions[careerIndex];
  const questionText = document.getElementById("careerQuestion");
  const answers = document.getElementById("careerAnswers");
  const count = document.getElementById("careerQuestionCount");

  if (!questionText || !answers || !count) return;

  count.textContent = "Question " + (careerIndex + 1) + " of 10";
  questionText.textContent = question.q;
  answers.replaceChildren();

  question.a.forEach((answer, index) => {
    const label = document.createElement("label");
    label.className = "tile";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "careerAnswer";
    radio.value = question.scores[index];

    label.append(radio, document.createTextNode(" " + answer));
    answers.appendChild(label);
  });
}

function nextCareerQuestion() {
  const selected = document.querySelector('input[name="careerAnswer"]:checked');

  if (!selected) {
    alert("Choose an answer first.");
    return;
  }

  careerScores[Number(selected.value)]++;

  if (careerIndex < careerQuestions.length - 1) {
    careerIndex++;
    renderCareerQuestion();
    return;
  }

  const highest = Math.max(...careerScores);
  const matches = careerGroups.filter((group, index) =>
    careerScores[index] === highest
  );

  const result = document.getElementById("careerResult");
  if (result) {
    result.textContent =
      "Your strongest interest areas: " +
      matches.map(group => group.title).join(", ") +
      ". Explore these paths, but remember that you can have interests in several areas.";
  }

  document.getElementById("careerQuestion").textContent = "Your exploration results";
  document.getElementById("careerAnswers").replaceChildren();
  document.getElementById("careerNext").classList.add("hidden");
}

function resetCareerQuiz() {
  careerIndex = 0;
  careerScores = [0,0,0,0,0];

  document.getElementById("careerResult").textContent = "";
  document.getElementById("careerNext").classList.remove("hidden");
  renderCareerQuestion();
}

function saveDreams() {
  const first = document.getElementById("dreamLearning")?.value || "";
  const second = document.getElementById("dreamPlaces")?.value || "";
  const third = document.getElementById("dreamHelping")?.value || "";

  savePage("Dreams Beyond Career",
    "Things I want to learn:\n" + first +
    "\nPlaces I hope to visit:\n" + second +
    "\nWays I want to help:\n" + third
  );
}

// =====================================================
// 16. MY LITTLE WORLD
// Diary, scrapbook, photos and personal memories.
// =====================================================

function worldPage() {
  return `
    ${section(
      "Welcome to your little world",
      "Collect moments without worrying about making everything perfect.",
      `
      <div class="tile-grid">
        <div class="tile"><h3>My diary</h3><p>Write about ordinary and extraordinary days.</p></div>
        <div class="tile"><h3>My memories</h3><p>Keep pictures and little stories.</p></div>
        <div class="tile"><h3>Letters</h3><p>Write letters to your future self.</p></div>
        <div class="tile"><h3>My timeline</h3><p>Remember moments from different stages of life.</p></div>
      </div>`
    )}

    ${section(
      "My private diary",
      "Write freely. Your entries are saved in this browser.",
      `
      <label for="diaryTitle">Page title</label>
      <input class="field" id="diaryTitle" placeholder="A day to remember">
      ${field("Your diary entry", "diaryWriting", "Today, I want to remember...")}
      <button class="small-button" onclick="saveDiary()">Save diary page</button>`
    )}

    ${section(
      "My scrapbook",
      "Add a photograph and a caption to remember a moment.",
      `
      <label for="scrapbookPhoto">Choose a photograph</label>
      <input class="field" id="scrapbookPhoto" type="file" accept="image/*">
      ${field("Photo caption", "photoCaption", "This reminds me of...")}
      <div id="photoPreview"></div>
      <button class="small-button" onclick="saveScrapbook()">Save scrapbook memory</button>
      `
    )}

    ${section(
      "Letters to myself",
      "A note for another day.",
      field("My letter", "futureLetter", "Dear future me...")
      + saveButton("futureLetter", "Letter to My Future Self")
    )}

    ${section(
      "My timeline",
      "Add a moment that matters to you.",
      `
      <label for="timelineDate">Date</label>
      <input class="field" id="timelineDate" type="date">
      ${field("What happened?", "timelineWriting", "I want to remember...")}
      <button class="small-button" onclick="saveTimeline()">Add to my timeline</button>
      <div id="timelineDisplay"></div>
      `
    )}
  `;
}

function saveDiary() {
  const title = document.getElementById("diaryTitle")?.value || "My diary";
  const writing = document.getElementById("diaryWriting")?.value || "";
  savePage(title, writing);
}

function saveScrapbook() {
  const file = document.getElementById("scrapbookPhoto")?.files?.[0];
  const caption = document.getElementById("photoCaption")?.value || "";

  if (!file && !caption.trim()) {
    alert("Add a photo or a caption first.");
    return;
  }

  if (file && file.size > 900000) {
    alert("Please choose a photograph smaller than 900 KB.");
    return;
  }

  if (!file) {
    savePage("Scrapbook Memory", caption);
    return;
  }

  const reader = new FileReader();

  reader.onload = () => {
    savePage("Scrapbook Memory", caption, { image: reader.result });
  };

  reader.readAsDataURL(file);
}

function saveTimeline() {
  const date = document.getElementById("timelineDate")?.value || "";
  const writing = document.getElementById("timelineWriting")?.value || "";

  if (!writing.trim()) {
    alert("Write a memory first.");
    return;
  }

  savePage("My Timeline", (date || "Date not added") + "\n" + writing);
}

// =====================================================
// 17. SHOW SAVED TIMELINE
// =====================================================

function displayTimeline() {
  const target = document.getElementById("timelineDisplay");
  if (!target) return;

  const pages = getData("etherSavedPages", [])
    .filter(page => page.feature === "world" && page.title === "My Timeline");

  target.replaceChildren();

  pages.forEach(page => {
    const item = document.createElement("div");
    item.className = "tile";

    const text = document.createElement("p");
    text.textContent = page.content;

    item.appendChild(text);
    target.appendChild(item);
  });
}

// =====================================================
// 18. BUILD THE SELECTED FEATURE
// =====================================================

function renderFeature() {
  const pageFunctions = {
    mood: moodPage,
    breathing: breathingPage,
    gratitude: gratitudePage,
    fitness: fitnessPage,
    checkin: checkinPage,
    study: studyPage,
    selfcare: selfcarePage,
    stories: storiesPage,
    career: careerPage,
    world: worldPage
  };

  content.innerHTML = pageFunctions[feature]();

  // Start the career quiz only after its page exists.
  if (feature === "career") {
    renderCareerQuestion();
  }

  if (feature === "world") {
    displayTimeline();
  }
}
