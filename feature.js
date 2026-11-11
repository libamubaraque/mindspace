
/* =====================================================
   TO THE ETHER. — FEATURE PAGE JAVASCRIPT
   All 20 feature spaces | Local saving | Custom colours
   ===================================================== */

const featureCards = {
  "mood-journal": {
    name: "Mood Journal",
    description: "Your feelings deserve space. Write honestly, without judging yourself.",
    heading: "How are you feeling today?",
    prompt: "What has been on your mind today? What happened, and what do you need right now?",
    placeholder: "Start writing here...",
    label: "Your journal entry"
  },
  "breathing-space": {
    name: "Breathing Space",
    description: "Take a pause. There is no pressure to do anything perfectly.",
    heading: "A moment to breathe",
    prompt: "Choose a comfortable position. Follow the gentle breathing guide below, or simply enjoy a quiet moment.",
    placeholder: "How do you feel after your pause?",
    label: "Your reflection"
  },
  "gratitude-journal": {
    name: "Gratitude Journal",
    description: "Collect the little things that made your day meaningful.",
    heading: "Three things from today",
    prompt: "They can be tiny moments, people, places, achievements or something you usually overlook.",
    placeholder: "1. Today I appreciated...\n2. I was happy when...\n3. Something I want to remember...",
    label: "Today's gratitude"
  },
  "fitness-wellness": {
    name: "Fitness & Wellness",
    description: "Focus on feeling active, rested and well. Progress does not have to be perfect.",
    heading: "Your movement log",
    prompt: "Record a walk, run, cycle, stretch or any movement you enjoyed. Rest days count too.",
    placeholder: "Activity, duration, distance (optional), and how it felt...",
    label: "Activity details"
  },
  "daily-checkin": {
    name: "Daily Check-in",
    description: "A small check-in can help you notice what you need.",
    heading: "How has today been?",
    prompt: "What was one little win? What felt difficult? What is one kind thing you can do for yourself?",
    placeholder: "My little win...\nSomething on my mind...\nOne thing I need...",
    label: "Today's check-in"
  },
  "study-focus": {
    name: "Study & Focus",
    description: "Build a study routine that includes real breaks.",
    heading: "Your focus session",
    prompt: "What are you studying? Choose one realistic task. Try 10 minutes of focus followed by a 5-minute screen-free break.",
    placeholder: "Subject, task and what you completed...",
    label: "Study notes"
  },
  "self-care": {
    name: "Self-care Corner",
    description: "Simple ways to care for yourself, your surroundings and your everyday wellbeing.",
    heading: "What do you need today?",
    prompt: "Think about rest, hygiene, movement, friendships, family, your surroundings or asking a trusted person for support.",
    placeholder: "A small thing I can do for myself...",
    label: "Self-care note"
  },
  "world-beyond-you": {
    name: "The World Beyond You",
    description: "Learn about real people, human rights, global challenges and meaningful efforts to make things better.",
    heading: "Look beyond your everyday world",
    prompt: "Choose an issue you want to understand. What did you learn? Whose experiences should be heard? What positive action is possible?",
    placeholder: "Topic, facts I learned, questions and possible actions...",
    label: "My learning reflection"
  },
  "find-direction": {
    name: "Find Your Direction",
    description: "Explore what interests you. Your future can have more than one possibility.",
    heading: "Discover what matters to you",
    prompt: "What subjects interest you? What problems would you like to help solve? What kind of working life sounds meaningful?",
    placeholder: "My interests...\nThings I am curious about...\nCareers I want to explore...",
    label: "My direction notes"
  },
  "my-little-world": {
    name: "My Little World",
    description: "A personal scrapbook for memories, photographs, letters and everyday thoughts.",
    heading: "A page from your little world",
    prompt: "Save a memory, a letter to your future self, a moment you want to keep or a thought you need to let out.",
    placeholder: "Write your memory or letter here...",
    label: "Your page"
  },
  "movie-theatre": {
    name: "Movie Theatre",
    description: "Keep your watchlist and remember what you thought about each film.",
    heading: "Your movie notes",
    prompt: "Add a film to your watchlist, record whether you watched it and write a short review.",
    placeholder: "Movie title, watched or to-watch, and your thoughts...",
    label: "Movie details"
  },
  "the-commons": {
    name: "The Commons",
    description: "A place to explore clubs, shared interests and community ideas.",
    heading: "Community corner",
    prompt: "Write an idea for a club, an activity you would like to organise or a topic you would like to discuss.",
    placeholder: "My club idea or community activity...",
    label: "Your idea"
  },
  "sports-events": {
    name: "Sports & Events",
    description: "Keep track of sports, school activities and events you are interested in.",
    heading: "Your events notebook",
    prompt: "Record an event, match, activity or personal sports goal. Add its date and your notes.",
    placeholder: "Event name, date, place and notes...",
    label: "Event details"
  },
  "day-planner": {
    name: "Day Planner",
    description: "Turn a busy day into small, manageable steps.",
    heading: "Plan your day",
    prompt: "Write your priorities. Keep your plan realistic and leave room for meals, breaks and rest.",
    placeholder: "1. Most important task...\n2. Another task...\n3. A little time for myself...",
    label: "Today's plan"
  },
  "creative-studio": {
    name: "The Creative Studio",
    description: "A notebook for poems, stories, sketches, ideas and experiments.",
    heading: "Make something",
    prompt: "Start with a line, a title, a thought or an idea. It does not need to be perfect.",
    placeholder: "Your poem, story, idea or creative notes...",
    label: "Your creation"
  },
  "kindness-project": {
    name: "The Kindness Project",
    description: "Small actions can make a real difference in a community.",
    heading: "A little kindness",
    prompt: "Think of a realistic, safe way to help: supporting a classmate, caring for a shared space or learning about a local organisation.",
    placeholder: "What I would like to do, who it could help and what I learned...",
    label: "Kindness activity"
  },
  "learning-library": {
    name: "The Learning Library",
    description: "Collect resources, new skills and things you want to learn.",
    heading: "What are you learning?",
    prompt: "Record a book, lesson, course, useful website or skill you are exploring.",
    placeholder: "Resource or skill, link (if any), and what I learned...",
    label: "Learning notes"
  },
  "sleep-sanctuary": {
    name: "The Sleep Sanctuary",
    description: "Create a gentle wind-down routine and notice what helps you rest.",
    heading: "A calmer evening",
    prompt: "What could help you wind down tonight? Consider putting away screens, preparing for tomorrow or reading something relaxing.",
    placeholder: "My bedtime routine and how I felt...",
    label: "Sleep reflection"
  },
  "money-matters": {
    name: "Money Matters",
    description: "Learn everyday money skills through simple budgeting and savings practice.",
    heading: "Your practice budget",
    prompt: "Use pretend amounts or general examples to practise planning spending and savings. Do not enter bank details or private financial information.",
    placeholder: "Example income or allowance...\nPlanned spending...\nSavings goal...",
    label: "Budget notes"
  },
  "open-mic": {
    name: "The Open Mic",
    description: "A quiet stage for your poems, stories, thoughts and words.",
    heading: "Your words belong here",
    prompt: "Write something original. It can be a poem, a short story, a reflection or a few lines you want to express.",
    placeholder: "Start writing...",
    label: "Your writing"
  }
};

const params = new URLSearchParams(window.location.search);
const cardId = params.get("card") || "mood-journal";
const card = featureCards[cardId] || featureCards["mood-journal"];

const titleElement = document.getElementById("featureTitle");
const descriptionElement = document.getElementById("featureDescription");
const contentElement = document.getElementById("featureContent");

titleElement.textContent = card.name;
descriptionElement.textContent = card.description;
document.title = `${card.name} | To the Ether.`;

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  })[char]);
}

function renderFeature() {
  contentElement.innerHTML = `
    <h2>${escapeHTML(card.heading)}</h2>
    <p class="muted">${escapeHTML(card.prompt)}</p>

    ${cardId === "breathing-space" ? `
      <div class="feature-item">
        <h3 id="breathText">Ready when you are</h3>
        <p id="breathCount">Choose start for a gentle breathing guide.</p>
        <div class="feature-actions">
          <button class="button" id="startBreathing">Start guide</button>
          <button class="button button-outline" id="stopBreathing">Stop</button>
        </div>
        <p class="notice">Breathe comfortably. Stop if you feel dizzy or uncomfortable. You can simply sit quietly instead.</p>
      </div>
    ` : ""}

    ${cardId === "study-focus" ? `
      <div class="feature-item">
        <h3>10-minute focus timer</h3>
        <p id="focusTimer">10:00</p>
        <div class="feature-actions">
          <button class="button" id="startFocus">Start</button>
          <button class="button button-outline" id="resetFocus">Reset</button>
        </div>
        <p class="notice">After your focus session, take a 5-minute screen-free break.</p>
      </div>
      <div class="feature-actions">
        <a class="button button-outline" href="https://www.youtube.com/results?search_query=gentle+study+music" target="_blank" rel="noopener">Study music ↗</a>
        <a class="button button-outline" href="https://www.youtube.com/results?search_query=beginner+gentle+yoga" target="_blank" rel="noopener">Gentle yoga ↗</a>
        <a class="button button-outline" href="https://www.youtube.com/results?search_query=Quran+recitation" target="_blank" rel="noopener">Quran recitation ↗</a>
      </div>
    ` : ""}

    ${cardId === "fitness-wellness" ? `
      <div class="feature-actions">
        <a class="button button-outline" href="https://www.strava.com/" target="_blank" rel="noopener">Visit Strava ↗</a>
        <a class="button button-outline" href="https://www.youtube.com/results?search_query=beginner+stretching+routine" target="_blank" rel="noopener">Stretching ideas ↗</a>
      </div>
      <p class="notice">These are external links, not an automatic Strava account connection.</p>
    ` : ""}

    ${cardId === "world-beyond-you" ? `
      <div class="feature-list">
        <article class="feature-item"><h3>Human rights</h3><p>Explore dignity, equality, education and freedom.</p></article>
        <article class="feature-item"><h3>Our environment</h3><p>Learn about climate, biodiversity and conservation.</p></article>
        <article class="feature-item"><h3>Humanitarian work</h3><p>Discover how aid organisations support communities.</p></article>
        <article class="feature-item"><h3>People making a difference</h3><p>Explore real initiatives and positive change.</p></article>
      </div>
      <div class="feature-actions">
        <a class="button button-outline" href="https://www.un.org/en/" target="_blank" rel="noopener">United Nations ↗</a>
        <a class="button button-outline" href="https://www.unicef.org/" target="_blank" rel="noopener">UNICEF ↗</a>
        <a class="button button-outline" href="https://www.unhcr.org/" target="_blank" rel="noopener">UNHCR ↗</a>
      </div>
    ` : ""}

    ${cardId === "find-direction" ? `
      <div class="feature-item">
        <h3>Quick interests reflection</h3>
        <p>Which kinds of activities interest you most? You can choose more than one in your notes.</p>
        <ul>
          <li>Helping people and communities</li>
          <li>Science, health and discovery</li>
          <li>Art, design and communication</li>
          <li>Nature, animals and the environment</li>
          <li>Leadership, law and public service</li>
          <li>Teaching, research and learning</li>
        </ul>
        <p class="notice">This is a reflection activity, not a test that decides your future.</p>
      </div>
    ` : ""}

    ${cardId === "the-commons" || cardId === "open-mic" ? `
      <p class="notice">This version saves your writing privately on this device. It does not publish public posts or connect you to strangers.</p>
    ` : ""}

    ${cardId === "money-matters" ? `
      <div class="feature-item">
        <h3>Practice savings calculator</h3>
        <label class="field-label">Practice amount<input class="feature-input" type="number" id="moneyAmount" min="0" placeholder="Example: 500"></label>
        <label class="field-label">Amount you want to save<input class="feature-input" type="number" id="moneySaving" min="0" placeholder="Example: 100"></label>
        <button class="button" id="calculateMoney">Calculate</button>
        <p id="moneyResult" class="notice" aria-live="polite"></p>
      </div>
    ` : ""}

    ${cardId === "day-planner" ? `
      <div class="feature-item">
        <h3>Remember your priorities</h3>
        <p>Try choosing just three important tasks. You can include breaks and rest as part of your plan.</p>
      </div>
    ` : ""}

    <form id="saveEntryForm">
      <label>${escapeHTML(card.label)}
        <textarea class="feature-textarea" id="entryContent" required placeholder="${escapeHTML(card.placeholder)}"></textarea>
      </label>
      <label>Page title
        <input class="feature-input" id="entryTitle" maxlength="80" placeholder="Give this page a title">
      </label>
      <div class="feature-actions">
        <button class="button" type="submit">Save this page</button>
        <button class="button button-outline" type="button" id="clearEntry">Clear</button>
      </div>
      <p id="saveMessage" class="form-message" aria-live="polite"></p>
    </form>
  `;

  document.getElementById("saveEntryForm").addEventListener("submit", saveEntry);
  document.getElementById("clearEntry").addEventListener("click", () => {
    document.getElementById("entryContent").value = "";
    document.getElementById("entryTitle").value = "";
    document.getElementById("saveMessage").textContent = "";
  });

  if (cardId === "breathing-space") setupBreathing();
  if (cardId === "study-focus") setupFocusTimer();
  if (cardId === "money-matters") setupMoneyCalculator();
}

function getSavedPages() {
  try {
    return JSON.parse(localStorage.getItem("etherSavedPages") || "[]");
  } catch {
    return [];
  }
}

function saveEntry(event) {
  event.preventDefault();

  const content = document.getElementById("entryContent").value.trim();
  const title = document.getElementById("entryTitle").value.trim() || card.name;

  if (!content) {
    document.getElementById("saveMessage").textContent = "Write something before saving.";
    return;
  }

  const pages = getSavedPages();
  pages.push({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    cardId,
    cardName: card.name,
    title,
    content,
    date: new Date().toLocaleString()
  });

  try {
    localStorage.setItem("etherSavedPages", JSON.stringify(pages));
    document.getElementById("saveMessage").textContent = "Your page has been saved on this device.";
    document.getElementById("entryContent").value = "";
    document.getElementById("entryTitle").value = "";
    renderFeatureSavedPages();
  } catch {
    document.getElementById("saveMessage").textContent = "Storage is full. Try removing older saved pages.";
  }
}

function renderFeatureSavedPages() {
  const container = document.getElementById("featureSavedPages");
  const pages = getSavedPages().filter(page => page.cardId === cardId);

  if (!pages.length) {
    container.innerHTML = `<p class="muted">You haven't saved a page in this space yet.</p>`;
    return;
  }

  container.innerHTML = pages.slice().reverse().map(page => `
    <article class="saved-card">
      <h3>${escapeHTML(page.title)}</h3>
      <p>${escapeHTML(page.content)}</p>
      <small>${escapeHTML(page.date)}</small>
      <div class="feature-actions">
        <button class="button button-outline delete-entry" data-id="${escapeHTML(page.id)}">Delete</button>
      </div>
    </article>
  `).join("");

  container.querySelectorAll(".delete-entry").forEach(button => {
    button.addEventListener("click", () => {
      const updated = getSavedPages().filter(page => page.id !== button.dataset.id);
      localStorage.setItem("etherSavedPages", JSON.stringify(updated));
      renderFeatureSavedPages();
    });
  });
}

/* ---------------- CUSTOM BACKGROUND ---------------- */

const backgroundInput = document.getElementById("cardBackground");
const resetBackground = document.getElementById("resetBackground");
const originalBackground = "#414B2D";
const backgroundKey = `etherBackground-${cardId}`;

function applyBackground(colour) {
  document.querySelector(".feature-main").style.background =
    `linear-gradient(135deg, ${colour}22, transparent 75%)`;
  backgroundInput.value = colour;
}

const storedBackground = localStorage.getItem(backgroundKey);
applyBackground(storedBackground || originalBackground);

backgroundInput.addEventListener("input", event => {
  applyBackground(event.target.value);
  localStorage.setItem(backgroundKey, event.target.value);
});

resetBackground.addEventListener("click", () => {
  localStorage.removeItem(backgroundKey);
  applyBackground(originalBackground);
});

/* ---------------- BREATHING GUIDE ---------------- */

let breathingInterval = null;
let breathingStep = 0;
const breathingSteps = [
  { text: "Breathe in gently", seconds: 4 },
  { text: "Breathe out slowly", seconds: 6 }
];

function setupBreathing() {
  const text = document.getElementById("breathText");
  const count = document.getElementById("breathCount");

  document.getElementById("startBreathing").addEventListener("click", () => {
    if (breathingInterval) return;

    let remaining = breathingSteps[breathingStep].seconds;
    text.textContent = breathingSteps[breathingStep].text;
    count.textContent = `${remaining} seconds`;

    breathingInterval = setInterval(() => {
      remaining--;

      if (remaining <= 0) {
        breathingStep = (breathingStep + 1) % breathingSteps.length;
        remaining = breathingSteps[breathingStep].seconds;
        text.textContent = breathingSteps[breathingStep].text;
      }

      count.textContent = `${remaining} seconds`;
    }, 1000);
  });

  document.getElementById("stopBreathing").addEventListener("click", () => {
    clearInterval(breathingInterval);
    breathingInterval = null;
    breathingStep = 0;
    text.textContent = "Pause complete";
    count.textContent = "Take your time. You can return whenever you want.";
  });
}

/* ---------------- STUDY TIMER ---------------- */

let focusInterval = null;
let focusRemaining = 600;

function setupFocusTimer() {
  const display = document.getElementById("focusTimer");
  const start = document.getElementById("startFocus");
  const reset = document.getElementById("resetFocus");

  function updateDisplay() {
    const minutes = Math.floor(focusRemaining / 60);
    const seconds = focusRemaining % 60;
    display.textContent = `${String(minutes).padStart(2,"0")}:${String(seconds).padStart(2,"0")}`;
  }

  start.addEventListener("click", () => {
    if (focusInterval) return;

    focusInterval = setInterval(() => {
      focusRemaining--;
      updateDisplay();

      if (focusRemaining <= 0) {
        clearInterval(focusInterval);
        focusInterval = null;
        display.textContent = "Time for a break!";
      }
    }, 1000);
  });

  reset.addEventListener("click", () => {
    clearInterval(focusInterval);
    focusInterval = null;
    focusRemaining = 600;
    updateDisplay();
  });
}

/* ---------------- PRACTICE BUDGET ---------------- */

function setupMoneyCalculator() {
  document.getElementById("calculateMoney").addEventListener("click", () => {
    const amount = Number(document.getElementById("moneyAmount").value);
    const saving = Number(document.getElementById("moneySaving").value);
    const result = document.getElementById("moneyResult");

    if (!Number.isFinite(amount) || !Number.isFinite(saving) || amount < 0 || saving < 0) {
      result.textContent = "Enter valid positive amounts.";
      return;
    }

    if (saving > amount) {
      result.textContent = "Your savings amount is greater than the practice amount.";
      return;
    }

    result.textContent = `After saving ₹${saving.toFixed(2)}, you would have ₹${(amount - saving).toFixed(2)} left.`;
  });
}

renderFeature();
renderFeatureSavedPages();
   
