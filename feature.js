
/* =========================================================
   TO THE ETHER — FEATURE ENGINE
   20 spaces • nested pages • activities • saved work
   Supabase authentication • guest access
   ========================================================= */

"use strict";

/* ---------------- SUPABASE ---------------- */

const SUPABASE_URL = "https://sckcrrriiatfxcafabmh.supabase.co";
const SUPABASE_KEY =
  "sb_publishable_dQ_yskeZUEm8rCEjb_1Lw_ftYCDmdo";

const db = window.supabase?.createClient
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

let activeSession = null;

/* ---------------- STORAGE ---------------- */

const GUEST_KEY = "ether_guest_spaces_v1";
const SAVED_KEY = "ether_saved_pages_v1";
const PLANNER_KEY = "ether_planner_tasks_v1";

function readStore(key, fallback = []) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch {
    return fallback;
  }
}

function writeStore(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

/* ---------------- ALL 20 SPACES ---------------- */

const data = {
  mood: {
    title: "Mood Journal",
    category: "WELLBEING",
    image: "images/mood.jpg",
    description: "Understand your feelings and make space for your thoughts without judgement.",
    sections: [
      ["Understanding your emotions", "Emotions are information about how you experience the world. Happiness, frustration, sadness, excitement and uncertainty are all part of being human."],
      ["Name what you feel", "Try using a few words to describe your day. Calm, disappointed, nervous, hopeful, confused or excited are all valid descriptions."],
      ["Five journal ideas", "Write about a moment you want to remember, something that challenged you, a person who helped you, something you wish people understood or one thing you want to try tomorrow."],
      ["Difficult days", "You do not have to turn every difficult experience into a lesson immediately. You can simply describe what happened and what support you might need."],
      ["Notice patterns gently", "Looking back may help you notice which situations or routines affect your mood. A journal is for reflection, not diagnosis."]
    ],
    topics: [
      ["understanding-emotions", "Understanding Emotions", "Learn to name and understand different feelings."],
      ["journal-prompts", "Five Journal Prompts", "Explore thoughtful prompts for different kinds of days."],
      ["mood-reflection", "Mood Reflection", "Reflect on feelings without judging yourself."]
    ]
  },

  breathing: {
    title: "Breathing Space",
    category: "WELLBEING",
    image: "images/breathing.jpg",
    description: "Take a comfortable pause and explore simple mindfulness activities.",
    sections: [
      ["What is mindful breathing?", "Mindful breathing means paying attention to the natural movement of your breath. It is not about forcing yourself to breathe in a particular way."],
      ["A comfortable pause", "Sit somewhere comfortable. Let your breathing remain natural. Notice the air moving in and out. If your attention wanders, gently return to the present."],
      ["Four ways to pause", "Try natural breathing, a gentle longer exhale, counting comfortable breaths or simply sitting quietly. Never force a breath or hold it."],
      ["Mindfulness beyond breathing", "Notice five things around you, listen to nearby sounds or feel your feet resting on the floor."],
      ["Reflect afterwards", "Ask whether the activity felt comfortable and whether you would prefer another activity next time. Stop if you feel dizzy or uncomfortable."]
    ],
    topics: [
      ["mindful-breathing", "What Is Mindful Breathing?", "Understand the basics of paying attention to your natural breath."],
      ["breathing-exercises", "Breathing Activities", "Explore comfortable, gentle ways to pause."],
      ["nature-sounds", "Nature Sounds & Silence", "Choose between a quiet moment and nature-inspired listening."]
    ]
  },

  gratitude: {
    title: "Gratitude Journal",
    category: "WELLBEING",
    image: "images/gratitude.jpg",
    description: "Collect the little moments, people and experiences that matter.",
    sections: [
      ["What gratitude means", "Gratitude is noticing something you appreciate. It does not mean pretending that difficult experiences do not exist."],
      ["Small things count", "A good conversation, a favourite song, a comfortable place or a moment outdoors can be worth remembering."],
      ["People who matter", "Think about someone who encouraged you or made an ordinary day better. You can write a letter without sending it."],
      ["Five prompts", "What made me smile? What did I learn? Who supported me? What place feels comfortable? What ordinary thing do I appreciate?"],
      ["Gratitude and difficult days", "You can appreciate one thing while still being upset about something else."]
    ],
    topics: [
      ["daily-gratitude", "Daily Gratitude", "Find small, meaningful moments to appreciate."],
      ["letters-of-thanks", "Letters of Thanks", "Write a thoughtful letter to someone who matters."],
      ["gratitude-prompts", "Gratitude Prompts", "Try different reflection questions."]
    ]
  },

  fitness: {
    title: "Fitness & Wellness",
    category: "WELLBEING",
    image: "images/fitness.jpg",
    description: "Explore movement, running, rest and everyday wellbeing.",
    sections: [
      ["Movement belongs to everyone", "Movement can be walking, playing, cycling, dancing, stretching or participating in a sport you enjoy."],
      ["Screen-time breaks", "After a long period of screen use, consider looking away from the screen, changing position or taking a comfortable break."],
      ["Running and walking", "Start with comfortable movement and give yourself time to rest. Your activity should suit your age, ability and circumstances."],
      ["Rest matters", "Rest, sleep, hydration and enjoyable activities are important parts of wellbeing."],
      ["Strava", "Strava is an external activity platform. This website can link to it, but a real account connection requires a separately configured Strava developer application and OAuth."]
    ],
    topics: [
      ["movement-breaks", "Movement Breaks", "Explore simple ways to move between study sessions."],
      ["running-journal", "Running & Activity Journal", "Record personal activity notes and reflections."],
      ["strava-space", "Strava Connection", "Learn about activity tracking and the external Strava platform."]
    ]
  },

  checkin: {
    title: "Daily Check-in",
    category: "WELLBEING",
    image: "images/checkin.jpg",
    description: "A small place for daily reflections, little wins and fresh starts.",
    sections: [
      ["A moment for yourself", "A check-in can be as simple as noticing how your day is going."],
      ["Little wins", "A small achievement can be finishing a task, asking a question, trying something new or taking a break."],
      ["Small talks", "Think about one person you could talk to when you want company or support."],
      ["Fresh starts", "You can begin again without having to make a perfect plan."]
    ],
    topics: [
      ["daily-reflection", "Daily Reflection", "A short reflection about your day."],
      ["little-wins", "Little Wins", "Collect the small things you accomplished."],
      ["question-wheel", "Question Wheel", "Explore a playful set of reflection prompts."]
    ]
  },

  study: {
    title: "Study & Focus",
    category: "GROWTH",
    image: "images/study.jpg",
    description: "Build manageable study habits and make room for focused learning.",
    sections: [
      ["Start small", "Choose one manageable task instead of trying to complete everything at once."],
      ["The 10 and 5 method", "Try ten minutes of focused study followed by five minutes away from your screen."],
      ["Make a study space", "Keep the materials you need nearby and reduce distractions where possible."],
      ["Different approaches", "Reading, practice questions, teaching a concept aloud and spaced revision can all support learning."],
      ["Rest is part of learning", "Breaks help you change activities and return with a fresh perspective."]
    ],
    topics: [
      ["focus-session", "Focus Sessions", "Try a short, manageable study session."],
      ["study-methods", "Study Methods", "Explore different ways of learning."],
      ["study-reflection", "Study Reflection", "Review what worked and what you might change."]
    ]
  },

  selfcare: {
    title: "Self-care Corner",
    category: "WELLBEING",
    image: "images/selfcare.jpg",
    description: "Explore everyday care, healthy routines and looking after yourself.",
    sections: [
      ["Self-care is personal", "Self-care can include rest, connection, enjoyable activities, asking for help and looking after everyday needs."],
      ["Physical wellbeing", "Regular meals, hydration, comfortable movement, sleep and appropriate healthcare all matter."],
      ["Mental wellbeing", "You can make room for feelings, talk to someone you trust and take breaks when needed."],
      ["Your surroundings", "A comfortable study corner, a short walk or a conversation with someone supportive may help."],
      ["Support", "If you have a health concern, speak with a trusted adult or qualified healthcare professional. This website does not diagnose or treat conditions."]
    ],
    topics: [
      ["self-care-basics", "Everyday Self-care", "Explore practical everyday care."],
      ["support-network", "Your Support Network", "Think about trusted people and places where you can ask for help."],
      ["healthy-routines", "Healthy Routines", "Build gentle routines that suit your everyday life."]
    ]
  },

  stories: {
    title: "Stories & Realities",
    category: "COMMUNITY",
    image: "images/stories.jpg",
    description: "Discover real stories, human rights, challenges and meaningful change.",
    sections: [
      ["Understanding realities", "The world contains serious challenges. Learning about them can help us understand people and communities."],
      ["Human rights", "Human rights belong to every person. They include dignity, education, safety and equal treatment."],
      ["People and communities", "Listen to people's experiences with respect and avoid reducing a person's life to one event."],
      ["Hope and change", "Positive change can come from education, community support, public services and sustained efforts."]
    ],
    topics: [
      ["human-rights", "Human Rights", "Explore dignity, equality and fundamental rights."],
      ["true-stories", "True Stories", "Read carefully researched accounts of real experiences."],
      ["change-makers", "People Creating Change", "Discover examples of community action."]
    ]
  },

  career: {
    title: "Career Exploration",
    category: "GROWTH",
    image: "images/career.jpg",
    description: "Explore interests, career paths, courses and possibilities beyond school.",
    sections: [
      ["There is no single path", "Different careers involve different subjects, training, skills and experiences."],
      ["Start with curiosity", "Think about the subjects, problems and activities that interest you."],
      ["Explore pathways", "Compare courses, degrees, entrance requirements and the time involved."],
      ["Beyond a job title", "Consider the lifestyle, values, working environment and opportunities associated with a career."],
      ["Dreams beyond career", "Your interests, relationships, learning and contributions matter beyond your future job."]
    ],
    topics: [
      ["career-quiz", "Discover Your Interests", "Try a short interest exploration quiz."],
      ["career-pathways", "Career Pathways", "Compare study routes and possible qualifications."],
      ["dreams-beyond-career", "Dreams Beyond Career", "Reflect on the life you want to build."]
    ]
  },

  scrapbook: {
    title: "My Little World",
    category: "CREATIVE",
    image: "images/scrapbook.jpg",
    description: "A personal corner for memories, photographs, letters and reflections.",
    sections: [
      ["Your personal collection", "Keep memories, thoughts, photographs and meaningful moments together."],
      ["Good and difficult days", "Your memories do not have to be perfect or polished. You can write honestly."],
      ["Letters to yourself", "Write a letter to your future self or record something you want to remember."],
      ["A timeline of moments", "Collect entries over time and look back at what you have experienced."]
    ],
    topics: [
      ["memory-gallery", "Memory Gallery", "Collect photographs and captions."],
      ["letters-to-self", "Letters to Myself", "Write letters for another time."],
      ["personal-timeline", "Personal Timeline", "Record meaningful moments as they happen."]
    ]
  },

  movies: {
    title: "Movies & Reflections",
    category: "CREATIVE",
    image: "images/movies.jpg",
    description: "Explore films, ideas, watchlists and thoughtful reflections.",
    sections: [
      ["Stories on screen", "Films can introduce different places, experiences and perspectives."],
      ["Watch with curiosity", "Notice the characters, themes, choices and ideas in a story."],
      ["Your watchlist", "Keep a list of films you want to explore."],
      ["Reflect afterwards", "Think about what stayed with you and what questions the story raised."]
    ],
    topics: [
      ["watchlist", "My Watchlist", "Keep a personal list of films to explore."],
      ["film-reflections", "Film Reflections", "Write about themes and ideas."],
      ["storytelling", "Storytelling on Screen", "Explore how stories are built."]
    ]
  },

  commons: {
    title: "The Commons",
    category: "COMMUNITY",
    image: "images/commons.jpg",
    description: "Discover clubs, shared interests and ways to work together.",
    sections: [
      ["Shared interests", "Communities can form around books, science, art, sports, volunteering and many other interests."],
      ["Working together", "Good collaboration includes listening, sharing responsibilities and respecting different ideas."],
      ["Find your people", "Look for school clubs, supervised community activities and positive shared interests."],
      ["Make room for everyone", "A welcoming community values different experiences and perspectives."]
    ],
    topics: [
      ["interest-clubs", "Interest Clubs", "Explore ideas for clubs and shared activities."],
      ["teamwork", "Teamwork", "Learn about communication and collaboration."],
      ["community-projects", "Community Projects", "Explore positive ways to contribute."]
    ]
  },

  sports: {
    title: "Sports & Movement",
    category: "COMMUNITY",
    image: "images/sports.jpg",
    description: "Explore sports, movement, participation and inspiring sporting stories.",
    sections: [
      ["Sport is for participation", "Sport can build friendships, teamwork and enjoyment."],
      ["Try different activities", "Explore activities that are accessible and appropriate for you."],
      ["Teamwork", "Communication, fair play and respect are important parts of sport."],
      ["Sporting stories", "Learn about athletes, teams and the communities around sport."]
    ],
    topics: [
      ["sports-discovery", "Discover a Sport", "Explore different sports and activities."],
      ["team-challenges", "Teamwork Challenges", "Try safe, cooperative activities."],
      ["sports-journal", "Sports Journal", "Record participation and reflections."]
    ]
  },

  planner: {
    title: "Planner",
    category: "GROWTH",
    image: "images/planner.jpg",
    description: "Organise your day with realistic plans, breaks and room to restart.",
    sections: [
      ["Make a realistic plan", "A useful plan makes room for school, rest, family and personal interests."],
      ["Choose priorities", "Pick one or two important tasks instead of filling every minute."],
      ["Leave room to change", "Plans can change. Adjusting a plan is not failure."],
      ["Review your day", "Notice what worked and what you might make easier tomorrow."]
    ],
    topics: [
      ["daily-planner", "Daily Planner", "Create a simple task list."],
      ["weekly-reflection", "Weekly Reflection", "Review your week and plan gently."],
      ["break-planner", "Break Planner", "Remember to make space for rest."]
    ]
  },

  creative: {
    title: "Creative Studio",
    category: "CREATIVE",
    image: "images/creative.jpg",
    description: "Write, imagine, experiment and bring your ideas to life.",
    sections: [
      ["Make something", "Creativity can begin with a sentence, sketch, melody, photograph or idea."],
      ["Experiment", "Try different approaches without expecting everything to be perfect."],
      ["Collect inspiration", "Notice colours, places, conversations and ideas that inspire you."],
      ["Keep creating", "You can return to an unfinished idea whenever you want."]
    ],
    topics: [
      ["writing-studio", "Writing Studio", "Explore creative writing prompts."],
      ["idea-workshop", "Idea Workshop", "Develop an idea step by step."],
      ["creative-challenges", "Creative Challenges", "Try small creative activities."]
    ]
  },

  kindness: {
    title: "Kindness Corner",
    category: "COMMUNITY",
    image: "images/kindness.jpg",
    description: "Discover small acts of kindness and ways to contribute to your community.",
    sections: [
      ["Everyday kindness", "Kindness can be listening, including someone or offering help when appropriate."],
      ["Respect boundaries", "Kindness should respect other people's comfort, privacy and choices."],
      ["Community care", "Small contributions can make shared spaces more welcoming."],
      ["Notice the good", "Reflect on kind actions you have seen or experienced."]
    ],
    topics: [
      ["kindness-challenge", "Kindness Challenge", "Try thoughtful, safe acts of kindness."],
      ["gratitude-notes", "Gratitude Notes", "Write an appreciation note."],
      ["community-care", "Community Care", "Explore ways to help locally."]
    ]
  },

  library: {
    title: "Little Library",
    category: "GROWTH",
    image: "images/library.jpg",
    description: "Explore knowledge, explainers, learning resources and new ideas.",
    sections: [
      ["Follow your curiosity", "Learning can begin with a question about science, history, nature, culture or society."],
      ["Check your sources", "Look for reliable sources, clear evidence and more than one perspective."],
      ["Keep a reading list", "Save books, articles and topics you want to explore."],
      ["Share what you learn", "Explain an idea in your own words to strengthen your understanding."]
    ],
    topics: [
      ["reading-list", "Reading List", "Collect books and articles to explore."],
      ["curiosity-cards", "Curiosity Cards", "Explore questions across different subjects."],
      ["research-basics", "Research Basics", "Learn to evaluate information."]
    ]
  },

  sleep: {
    title: "Sleep & Rest",
    category: "WELLBEING",
    image: "images/sleep.jpg",
    description: "Learn about rest, bedtime routines and creating space to unwind.",
    sections: [
      ["Why rest matters", "Sleep supports learning, memory, mood and everyday functioning."],
      ["A calmer evening", "A predictable evening routine may help you transition from busy activities to rest."],
      ["Make your space comfortable", "Consider light, noise, comfort and a routine that suits your home."],
      ["When sleep is difficult", "If sleep problems continue or affect daily life, talk with a trusted adult or healthcare professional."]
    ],
    topics: [
      ["rest-routine", "A Restful Routine", "Create a gentle evening routine."],
      ["sleep-environment", "Your Sleep Environment", "Explore comfort and quiet."],
      ["rest-reflection", "Rest Reflection", "Notice how your routines feel."]
    ]
  },

  money: {
    title: "Money Matters",
    category: "GROWTH",
    image: "images/money.jpg",
    description: "Learn about saving, budgeting, needs, wants and financial basics.",
    sections: [
      ["Money basics", "Understanding income, spending, saving and budgeting can help with everyday decisions."],
      ["Needs and wants", "A need is something important for everyday life. A want is something you would like to have."],
      ["Plan before spending", "A simple budget can help you understand where money goes."],
      ["Build financial knowledge", "Learn about safe saving habits and ask a trusted adult when you need guidance."]
    ],
    topics: [
      ["budget-basics", "Budget Basics", "Learn how a simple budget works."],
      ["needs-and-wants", "Needs & Wants", "Explore everyday spending choices."],
      ["saving-goals", "Saving Goals", "Set a simple savings target."]
    ]
  },

  openmic: {
    title: "Open Mic",
    category: "CREATIVE",
    image: "images/openmic.jpg",
    description: "A place for poetry, spoken word, personal writing and expression.",
    sections: [
      ["Find your voice", "Writing can be a way to explore ideas, feelings and imagination."],
      ["Poetry starts anywhere", "A poem can begin with a place, a sound, a memory or a question."],
      ["Write without pressure", "Your first draft does not have to be polished."],
      ["Share thoughtfully", "Only share writing publicly when you feel comfortable and have considered your privacy."]
    ],
    topics: [
      ["poetry-corner", "Poetry Corner", "Explore poetry prompts."],
      ["spoken-word", "Spoken Word", "Build a short spoken-word piece."],
      ["writing-prompts", "Writing Prompts", "Find a starting point for a new piece."]
    ]
  }
};

/* ---------------- PAGE ELEMENTS ---------------- */

const params = new URLSearchParams(window.location.search);
const featureId = params.get("id");
const nestedId = params.get("page");

const feature = data[featureId];

const titleElement = document.getElementById("featureTitle");
const categoryElement = document.getElementById("featureCategory");
const descriptionElement = document.getElementById("featureDescription");
const imageElement = document.getElementById("featureImage");
const contentElement = document.getElementById("featureContent");
const breadcrumb = document.getElementById("breadcrumbCurrent");

document.getElementById("year").textContent =
  new Date().getFullYear();

/* ---------------- GUEST ACCESS ---------------- */

function getGuestSpaces() {
  const stored = readStore(GUEST_KEY, []);
  return Array.isArray(stored) ? [...new Set(stored)] : [];
}

function saveGuestSpaces(list) {
  writeStore(GUEST_KEY, list);
}

function showAccessGate() {
  document.querySelector("main").innerHTML = `
    <section class="feature-content">
      <div class="activity-panel">
        <p class="eyebrow">YOUR NEXT CHAPTER</p>
        <h1>Continue exploring.</h1>
        <p>
          You've used your three guest spaces. Log in or create
          an account to continue exploring all twenty spaces.
        </p>

        <form id="featureAuthForm">
          <label for="gateEmail">Email address</label>
          <input id="gateEmail" type="email" required>

          <label for="gatePassword">Password</label>
          <input id="gatePassword" type="password" minlength="8" required>

          <button type="submit" id="gateSubmit">Log in</button>
          <button type="button" id="gateSignup">Create account</button>

          <p id="gateMessage" role="status"></p>
        </form>

        <a class="text-link" href="index.html#explore">
          Return to the homepage →
        </a>
      </div>
    </section>
  `;

  const form = document.getElementById("featureAuthForm");
  const message = document.getElementById("gateMessage");
  const signup = document.getElementById("gateSignup");

  let mode = "login";

  signup.addEventListener("click", () => {
    mode = "signup";
    document.getElementById("gateSubmit").textContent = "Create account";
    signup.textContent = "Switch to log in";
    signup.onclick = () => {
      mode = "login";
      document.getElementById("gateSubmit").textContent = "Log in";
      signup.textContent = "Create account";
    };
  });

  form.addEventListener("submit", async event => {
    event.preventDefault();

    if (!db) {
      message.textContent = "Supabase could not load. Check your connection.";
      return;
    }

    const email = document.getElementById("gateEmail").value.trim();
    const password = document.getElementById("gatePassword").value;

    try {
      const result = mode === "signup"
        ? await db.auth.signUp({ email, password })
        : await db.auth.signInWithPassword({ email, password });

      if (result.error) throw result.error;

      if (mode === "signup" && !result.data.session) {
        message.textContent =
          "Check your email for the confirmation link, then log in.";
        return;
      }

      window.location.reload();

    } catch (error) {
      message.textContent = error.message || "Please try again.";
    }
  });
}

async function checkAccess() {
  if (!feature) return false;

  if (db) {
    try {
      const { data: sessionData } = await db.auth.getSession();
      activeSession = sessionData.session;
    } catch (error) {
      console.error("Could not check login:", error);
    }
  }

  if (activeSession) return true;

  const accessed = getGuestSpaces();

  if (accessed.includes(featureId)) return true;

  if (accessed.length >= 3) {
    showAccessGate();
    return false;
  }

  accessed.push(featureId);
  saveGuestSpaces(accessed);

  return true;
}

/* ---------------- MAIN FEATURE CONTENT ---------------- */

function renderSections(sections) {
  return sections.map(([heading, paragraph]) => `
    <section class="feature-text-section">
      <p class="eyebrow">EXPLORE THIS IDEA</p>
      <h2>${escapeHTML(heading)}</h2>
      <p>${escapeHTML(paragraph)}</p>
    </section>
  `).join("");
}

function renderNestedCards(item) {
  return `
    <section>
      <p class="eyebrow">GO A LITTLE DEEPER</p>
      <h2>Explore inside this space.</h2>

      <div class="nested-grid">
        ${item.topics.map(([id, title, description]) => `
          <a
            class="nested-card"
            href="feature.html?id=${encodeURIComponent(featureId)}&page=${encodeURIComponent(id)}"
          >
            <span class="card-number">DISCOVER ↗</span>
            <h3>${escapeHTML(title)}</h3>
            <p>${escapeHTML(description)}</p>
          </a>
        `).join("")}
      </div>
    </section>
  `;
}

/* ---------------- SAVED PAGES ---------------- */

function getSavedPages() {
  return readStore(SAVED_KEY, []);
}

function savePage(entry) {
  const entries = getSavedPages();

  entries.unshift({
    id: crypto.randomUUID
      ? crypto.randomUUID()
      : String(Date.now()),
    space: featureId,
    title: entry.title,
    content: entry.content,
    date: new Date().toISOString()
  });

  writeStore(SAVED_KEY, entries);
}

function renderSavedPages() {
  const entries = getSavedPages().filter(entry =>
    entry.space === featureId
  );

  return `
    <section class="saved-panel" id="savedPages">
      <p class="eyebrow">YOUR PERSONAL LIBRARY</p>
      <h2>My Saved Pages</h2>

      ${
        entries.length
          ? entries.map(entry => `
              <article class="saved-entry" data-entry="${escapeHTML(entry.id)}">
                <h3>${escapeHTML(entry.title)}</h3>
                <p>${escapeHTML(entry.content).replace(/\n/g, "<br>")}</p>
                <small>${new Date(entry.date).toLocaleDateString()}</small>

                <div>
                  <button type="button" data-edit="${escapeHTML(entry.id)}">
                    Edit
                  </button>
                  <button type="button" data-delete="${escapeHTML(entry.id)}">
                    Delete
                  </button>
                </div>
              </article>
            `).join("")
          : "<p>Your saved entries will appear here.</p>"
      }
    </section>
  `;
}

function connectSavedPageActions() {
  contentElement.querySelectorAll("[data-delete]").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.delete;
      const updated = getSavedPages().filter(entry => entry.id !== id);
      writeStore(SAVED_KEY, updated);
      renderPage();
    });
  });

  contentElement.querySelectorAll("[data-edit]").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.edit;
      const entry = getSavedPages().find(item => item.id === id);

      if (!entry) return;

      const newTitle = prompt("Edit your title:", entry.title);
      if (newTitle === null) return;

      const newContent = prompt("Edit your entry:", entry.content);
      if (newContent === null) return;

      const updated = getSavedPages().map(item =>
        item.id === id
          ? { ...item, title: newTitle.trim(), content: newContent }
          : item
      );

      writeStore(SAVED_KEY, updated);
      renderPage();
    });
  });
}

/* ---------------- JOURNAL ACTIVITY ---------------- */

function journalActivity() {
  return `
    <section class="journal-panel">
      <p class="eyebrow">MAKE SOMETHING OF YOUR OWN</p>
      <h2>Your journal</h2>

      <form id="journalForm">
        <label for="journalTitle">Entry title</label>
        <input id="journalTitle" maxlength="100" required
          placeholder="Give this entry a title">

        <label for="journalText">Your thoughts</label>
        <textarea id="journalText" maxlength="10000" required
          placeholder="Write whatever you would like to remember..."></textarea>

        <button type="submit">Save entry</button>
        <p id="journalMessage" role="status"></p>
      </form>
    </section>
  `;
}

function connectJournal() {
  const form = document.getElementById("journalForm");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const title = document.getElementById("journalTitle").value.trim();
    const content = document.getElementById("journalText").value.trim();

    if (!title || !content) return;

    savePage({ title, content });

    document.getElementById("journalMessage").textContent =
      "Your entry has been saved on this device.";

    form.reset();
    renderSavedArea();
  });
}

function renderSavedArea() {
  const old = document.getElementById("savedPages");
  if (old) old.outerHTML = renderSavedPages();
  else contentElement.insertAdjacentHTML("beforeend", renderSavedPages());

  connectSavedPageActions();
}

/* ---------------- BREATHING ACTIVITY ---------------- */

function breathingActivity() {
  return `
    <section class="activity-panel">
      <p class="eyebrow">A GENTLE PAUSE</p>
      <h2>Take a comfortable moment.</h2>
      <p>
        Let your breathing remain natural. You do not need to hold
        your breath or follow a strict pattern.
      </p>

      <div class="breathing-orb" id="breathingOrb">
        <span id="breathingText">Begin</span>
      </div>

      <button type="button" id="breathingStart">Begin pause</button>
      <button type="button" id="breathingStop">Stop</button>

      <p id="breathingMessage" role="status">
        Stop whenever you want. Choose silence if that feels better.
      </p>
    </section>
  `;
}

function connectBreathing() {
  const orb = document.getElementById("breathingOrb");
  const start = document.getElementById("breathingStart");
  const stop = document.getElementById("breathingStop");
  const text = document.getElementById("breathingText");
  const message = document.getElementById("breathingMessage");

  if (!orb || !start || !stop) return;

  let interval = null;
  let phase = 0;

  function stopActivity() {
    if (interval) clearInterval(interval);
    interval = null;
    orb.classList.remove("active");
    text.textContent = "Rest";
    message.textContent = "Your pause has ended. Take your time.";
  }

  start.addEventListener("click", () => {
    if (interval) return;

    phase = 0;
    const labels = ["Notice your breath", "Rest naturally"];

    text.textContent = labels[0];
    message.textContent = "No need to change or force your breathing.";

    interval = setInterval(() => {
      phase = 1 - phase;
      orb.classList.toggle("active", phase === 0);
      text.textContent = labels[phase];
    }, 5000);
  });

  stop.addEventListener("click", stopActivity);
}

/* ---------------- STUDY TIMER ---------------- */

function studyActivity() {
  return `
    <section class="activity-panel">
      <p class="eyebrow">FOCUS SESSION</p>
      <h2>10 minutes of focus.</h2>
      <p>Then take five minutes away from your screen.</p>

      <h2 id="studyClock">10:00</h2>

      <button type="button" id="studyStart">Start</button>
      <button type="button" id="studyPause">Pause</button>
      <button type="button" id="studyReset">Reset</button>

      <p id="studyMessage" role="status"></p>
    </section>
  `;
}

function connectStudyTimer() {
  const clock = document.getElementById("studyClock");
  if (!clock) return;

  let seconds = 600;
  let timer = null;

  function display() {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;
    clock.textContent =
      `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
  }

  document.getElementById("studyStart").addEventListener("click", () => {
    if (timer) return;

    timer = setInterval(() => {
      seconds--;
      display();

      if (seconds <= 0) {
        clearInterval(timer);
        timer = null;
        document.getElementById("studyMessage").textContent =
          "Focus session complete. Take a five-minute screen-free break.";
      }
    }, 1000);
  });

  document.getElementById("studyPause").addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
  });

  document.getElementById("studyReset").addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    seconds = 600;
    display();
    document.getElementById("studyMessage").textContent = "";
  });
}

/* ---------------- PLANNER ---------------- */

function plannerActivity() {
  return `
    <section class="activity-panel">
      <p class="eyebrow">MAKE A REALISTIC PLAN</p>
      <h2>My tasks</h2>

      <form id="plannerForm">
        <label for="plannerTask">Add a task</label>
        <input id="plannerTask" maxlength="120" required>
        <button type="submit">Add task</button>
      </form>

      <div id="plannerList"></div>
    </section>
  `;
}

function connectPlanner() {
  const form = document.getElementById("plannerForm");
  const list = document.getElementById("plannerList");
  if (!form || !list) return;

  function renderTasks() {
    const tasks = readStore(PLANNER_KEY, []);

    list.innerHTML = tasks.map(task => `
      <div class="saved-entry">
        <label>
          <input type="checkbox" data-task="${escapeHTML(task.id)}"
            ${task.done ? "checked" : ""}>
          ${escapeHTML(task.text)}
        </label>
        <button type="button" data-remove-task="${escapeHTML(task.id)}">
          Delete
        </button>
      </div>
    `).join("");
  }

  form.addEventListener("submit", event => {
    event.preventDefault();

    const input = document.getElementById("plannerTask");
    const text = input.value.trim();
    if (!text) return;

    const tasks = readStore(PLANNER_KEY, []);
    tasks.push({
      id: String(Date.now()),
      text,
      done: false
    });

    writeStore(PLANNER_KEY, tasks);
    form.reset();
    renderTasks();
  });

  list.addEventListener("change", event => {
    if (!event.target.matches("[data-task]")) return;

    const id = event.target.dataset.task;
    const tasks = readStore(PLANNER_KEY, []).map(task =>
      task.id === id ? { ...task, done: event.target.checked } : task
    );

    writeStore(PLANNER_KEY, tasks);
    renderTasks();
  });

  list.addEventListener("click", event => {
    const button = event.target.closest("[data-remove-task]");
    if (!button) return;

    const tasks = readStore(PLANNER_KEY, []).filter(
      task => task.id !== button.dataset.removeTask
    );

    writeStore(PLANNER_KEY, tasks);
    renderTasks();
  });

  renderTasks();
}

/* ---------------- SCRAPBOOK ---------------- */

function scrapbookActivity() {
  return `
    <section class="journal-panel">
      <p class="eyebrow">YOUR LITTLE WORLD</p>
      <h2>Add a memory</h2>

      <form id="scrapbookForm">
        <label for="memoryTitle">Memory title</label>
        <input id="memoryTitle" maxlength="100" required>

        <label for="memoryText">Your memory</label>
        <textarea id="memoryText" maxlength="5000"></textarea>

        <label for="memoryPhoto">Add a photograph</label>
        <input id="memoryPhoto" type="file" accept="image/*">

        <button type="submit">Save memory</button>
        <p id="memoryMessage" role="status"></p>
      </form>
    </section>
  `;
}

function connectScrapbook() {
  const form = document.getElementById("scrapbookForm");
  if (!form) return;

  form.addEventListener("submit", async event => {
    event.preventDefault();

    const title = document.getElementById("memoryTitle").value.trim();
    const content = document.getElementById("memoryText").value.trim();
    const file = document.getElementById("memoryPhoto").files[0];

    if (file && file.size > 1200000) {
      document.getElementById("memoryMessage").textContent =
        "Please choose an image smaller than 1.2 MB.";
      return;
    }

    let photoText = "";

    if (file) {
      photoText = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result));
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    }

    const entries = getSavedPages();

    entries.unshift({
      id: String(Date.now()),
      space: "scrapbook",
      title,
      content,
      photo: photoText,
      date: new Date().toISOString()
    });

    writeStore(SAVED_KEY, entries);

    document.getElementById("memoryMessage").textContent =
      "Your memory has been saved on this device.";

    form.reset();
    renderSavedArea();
  });
}

/* ---------------- CAREER QUIZ ---------------- */

function careerActivity() {
  const questions = [
    ["Which activity interests you most?", ["Helping people", "Understanding science", "Creating things", "Organising projects"]],
    ["Which subject would you explore further?", ["Biology", "History", "Mathematics", "Art and design"]],
    ["Which task sounds interesting?", ["Supporting a community", "Investigating a question", "Making something", "Leading a team"]],
    ["What matters most in a project?", ["Its human impact", "Its discoveries", "Its originality", "Its organisation"]],
    ["Which environment appeals to you?", ["A healthcare or community setting", "A research environment", "A creative studio", "A collaborative workplace"]]
  ];

  return `
    <section class="activity-panel">
      <p class="eyebrow">EXPLORE YOUR INTERESTS</p>
      <h2>A starting-point quiz</h2>
      <p>This is for exploration, not a scientific career assessment.</p>

      <form id="careerForm">
        ${questions.map((question, index) => `
          <fieldset>
            <legend>${index + 1}. ${escapeHTML(question[0])}</legend>

            ${question[1].map((option, optionIndex) => `
              <label>
                <input type="radio" name="career${index}"
                  value="${optionIndex}" required>
                ${escapeHTML(option)}
              </label>
            `).join("")}
          </fieldset>
        `).join("")}

        <button type="submit">Explore my interests</button>
      </form>

      <p id="careerResult" role="status"></p>
    </section>
  `;
}

function connectCareerQuiz() {
  const form = document.getElementById("careerForm");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const totals = [0, 0, 0, 0];

    for (let i = 0; i < 5; i++) {
      const answer = form.querySelector(
        `input[name="career${i}"]:checked`
      );

      if (answer) totals[Number(answer.value)]++;
    }

    const labels = [
      "People, health and community",
      "Science, research and discovery",
      "Creativity and design",
      "Organisation and collaboration"
    ];

    const highest = Math.max(...totals);
    const matches = labels.filter((label, index) => totals[index] === highest);

    document.getElementById("careerResult").textContent =
      `Your strongest interest areas: ${matches.join(" · ")}. ` +
      "Explore different subjects and pathways before making decisions.";
  });
}

/* ---------------- MONEY CALCULATOR ---------------- */

function moneyActivity() {
  return `
    <section class="activity-panel">
      <p class="eyebrow">MONEY BASICS</p>
      <h2>A simple budget example</h2>

      <label for="budgetAmount">Amount available (₹)</label>
      <input id="budgetAmount" type="number" min="0" max="1000000">

      <label for="budgetSaving">Amount you plan to save (₹)</label>
      <input id="budgetSaving" type="number" min="0" max="1000000">

      <button type="button" id="budgetCalculate">Calculate</button>
      <p id="budgetResult" role="status"></p>
    </section>
  `;
}

function connectMoney() {
  document.getElementById("budgetCalculate")?.addEventListener("click", () => {
    const total = Number(document.getElementById("budgetAmount").value);
    const saving = Number(document.getElementById("budgetSaving").value);
    const result = document.getElementById("budgetResult");

    if (!Number.isFinite(total) || !Number.isFinite(saving) ||
        total < 0 || saving < 0 || saving > total) {
      result.textContent = "Enter valid amounts. Savings cannot exceed the total.";
      return;
    }

    result.textContent =
      `Amount remaining after planned savings: ₹${(total - saving).toFixed(2)}.`;
  });
}

/* ---------------- FITNESS AND STRAVA ---------------- */

function fitnessActivity() {
  return `
    <section class="activity-panel">
      <p class="eyebrow">MOVEMENT JOURNAL</p>
      <h2>Record an activity</h2>

      <form id="fitnessForm">
        <label for="activityName">Activity</label>
        <select id="activityName">
          <option>Walking</option>
          <option>Running</option>
          <option>Cycling</option>
          <option>Yoga</option>
          <option>Playing a sport</option>
          <option>Other movement</option>
        </select>

        <label for="activityReflection">How did it feel?</label>
        <textarea id="activityReflection" maxlength="1000"></textarea>

        <button type="submit">Save reflection</button>
        <p id="fitnessMessage" role="status"></p>
      </form>

      <div class="nested-card">
        <h3>Strava</h3>
        <p>
          Strava is an external activity platform. This link opens its
          website; it does not connect your account to To the Ether.
          A real connection needs a configured Strava developer app.
        </p>
        <a href="https://www.strava.com/"
           target="_blank" rel="noopener noreferrer">
          Visit Strava ↗
        </a>
      </div>
    </section>
  `;
}

function connectFitness() {
  const form = document.getElementById("fitnessForm");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    savePage({
      title: document.getElementById("activityName").value,
      content: document.getElementById("activityReflection").value
    });

    document.getElementById("fitnessMessage").textContent =
      "Your activity reflection has been saved on this device.";

    form.reset();
    renderSavedArea();
  });
}

/* ---------------- GENERIC TOPIC ACTIVITY ---------------- */

function activityForSpace(id) {
  switch (id) {
    case "mood":
    case "gratitude":
    case "checkin":
    case "openmic":
      return journalActivity();

    case "breathing":
      return breathingActivity();

    case "study":
      return studyActivity();

    case "planner":
      return plannerActivity();

    case "scrapbook":
      return scrapbookActivity();

    case "career":
      return careerActivity();

    case "money":
      return moneyActivity();

    case "fitness":
      return fitnessActivity();

    default:
      return `
        <section class="activity-panel">
          <p class="eyebrow">YOUR REFLECTION</p>
          <h2>Save a thought</h2>
          ${journalActivity()}
        </section>
      `;
  }
}

function connectActivity(id) {
  connectJournal();
  connectBreathing();
  connectStudyTimer();
  connectPlanner();
  connectScrapbook();
  connectCareerQuiz();
  connectMoney();
  connectFitness();
  connectSavedPageActions();
}

/* ---------------- NESTED PAGE RENDERING ---------------- */

function renderNestedPage(item, topic) {
  const topicTitle = topic[1];
  const topicDescription = topic[2];

  document.title = `${topicTitle} | To the Ether.`;

  titleElement.textContent = topicTitle;
  categoryElement.textContent = item.category;
  descriptionElement.textContent = topicDescription;
  breadcrumb.textContent = topicTitle;

  imageElement.src = item.image;
  imageElement.alt = topicTitle;

  contentElement.innerHTML = `
    <p class="eyebrow">${escapeHTML(item.title)}</p>

    <a class="text-link"
      href="feature.html?id=${encodeURIComponent(featureId)}">
      ← Back to ${escapeHTML(item.title)}
    </a>

    <section>
      <h2>${escapeHTML(topicTitle)}</h2>
      <p>${escapeHTML(topicDescription)}</p>
      <p>
        This page is part of ${escapeHTML(item.title)}. Explore the
        topic at your own pace, consider the questions and try the
        activity below if it feels useful.
      </p>
    </section>

    ${renderSections(item.sections)}

    <section class="activity-panel">
      <p class="eyebrow">THINK ABOUT IT</p>
      <h2>A small reflection</h2>
      ${journalActivity()}
    </section>

    <section>
      <a class="button button-primary"
        href="feature.html?id=${encodeURIComponent(featureId)}">
        Return to this space ↗
      </a>
    </section>
  `;

  connectJournal();
  connectSavedPageActions();
}

/* ---------------- MAIN PAGE RENDERING ---------------- */

function renderPage() {
  if (!feature) {
    document.title = "Space not found | To the Ether.";
    contentElement.innerHTML = `
      <section>
        <h2>We couldn't find that space.</h2>
        <p>It may have moved, or the link may be incorrect.</p>
        <a class="button button-primary" href="index.html#explore">
          Return to Explore
        </a>
      </section>
    `;
    return;
  }

  titleElement.textContent = feature.title;
  categoryElement.textContent = feature.category;
  descriptionElement.textContent = feature.description;
  imageElement.src = feature.image;
  imageElement.alt = feature.title;
  breadcrumb.textContent = feature.title;

  document.title = `${feature.title} | To the Ether.`;

  if (nestedId) {
    const topic = feature.topics.find(item => item[0] === nestedId);

    if (!topic) {
      contentElement.innerHTML = `
        <section>
          <h2>Topic not found.</h2>
          <a href="feature.html?id=${encodeURIComponent(featureId)}">
            Return to the space →
          </a>
        </section>
      `;
      return;
    }

    renderNestedPage(feature, topic);
    return;
  }

  contentElement.innerHTML = `
    <section>
      <p class="eyebrow">WELCOME TO YOUR SPACE</p>
      <h2>${escapeHTML(feature.title)}</h2>
      <p>${escapeHTML(feature.description)}</p>
    </section>

    ${renderSections(feature.sections)}

    ${renderNestedCards(feature)}

    ${activityForSpace(featureId)}

    ${renderSavedPages()}
  `;

  connectActivity(featureId);
}

/* ---------------- MOBILE NAVIGATION ---------------- */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle?.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

/* ---------------- START ---------------- */

(async function startFeaturePage() {
  if (!feature) {
    renderPage();
    return;
  }

  const allowed = await checkAccess();

  if (allowed) {
    renderPage();
  }
})();
