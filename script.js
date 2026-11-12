
/* =========================================================
   TO THE ETHER — HOMEPAGE CONTROLLER
   20 spaces • filters • guest access • Supabase Auth
   ========================================================= */

"use strict";

/* ---------------- SUPABASE CONFIGURATION ---------------- */

const SUPABASE_URL = "https://sckcrrriiatfxcafabmh.supabase.co";
const SUPABASE_PUBLISHABLE_KEY =
  "sb_publishable_dQ_yskeZUEm8rCEjb_1Lw_ftYCDmdo";

let supabaseClient = null;
let currentSession = null;

if (window.supabase?.createClient) {
  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
  );
}

/* ---------------- WEBSITE SPACES ---------------- */

const spaces = [
  {
    id: "mood",
    name: "Mood Journal",
    category: "wellbeing",
    image: "images/mood.jpg",
    desc: "Understand your feelings and make room for your thoughts."
  },
  {
    id: "breathing",
    name: "Breathing Space",
    category: "wellbeing",
    image: "images/breathing.jpg",
    desc: "Pause, breathe and discover gentle mindfulness activities."
  },
  {
    id: "gratitude",
    name: "Gratitude Journal",
    category: "wellbeing",
    image: "images/gratitude.jpg",
    desc: "Collect the little moments and people that matter."
  },
  {
    id: "fitness",
    name: "Fitness & Wellness",
    category: "wellbeing",
    image: "images/fitness.jpg",
    desc: "Explore movement, running, rest and everyday wellbeing."
  },
  {
    id: "checkin",
    name: "Daily Check-in",
    category: "wellbeing",
    image: "images/checkin.jpg",
    desc: "Reflect on small wins, feelings and fresh starts."
  },
  {
    id: "study",
    name: "Study & Focus",
    category: "growth",
    image: "images/study.jpg",
    desc: "Build manageable study habits and focus routines."
  },
  {
    id: "selfcare",
    name: "Self-care Corner",
    category: "wellbeing",
    image: "images/selfcare.jpg",
    desc: "Explore everyday care and healthy routines."
  },
  {
    id: "stories",
    name: "Stories & Realities",
    category: "community",
    image: "images/stories.jpg",
    desc: "Discover real stories, human rights and meaningful change."
  },
  {
    id: "career",
    name: "Career Exploration",
    category: "growth",
    image: "images/career.jpg",
    desc: "Explore interests, careers and possibilities beyond school."
  },
  {
    id: "scrapbook",
    name: "My Little World",
    category: "creative",
    image: "images/scrapbook.jpg",
    desc: "Keep memories, photographs, letters and reflections."
  },
  {
    id: "movies",
    name: "Movies & Reflections",
    category: "creative",
    image: "images/movies.jpg",
    desc: "Explore films, ideas, watchlists and thoughtful reflections."
  },
  {
    id: "commons",
    name: "The Commons",
    category: "community",
    image: "images/commons.jpg",
    desc: "Discover clubs, shared interests and collaboration."
  },
  {
    id: "sports",
    name: "Sports & Movement",
    category: "community",
    image: "images/sports.jpg",
    desc: "Explore sports, movement and inspiring sporting stories."
  },
  {
    id: "planner",
    name: "Planner",
    category: "growth",
    image: "images/planner.jpg",
    desc: "Organise your day with realistic plans and breaks."
  },
  {
    id: "creative",
    name: "Creative Studio",
    category: "creative",
    image: "images/creative.jpg",
    desc: "Write, imagine, experiment and bring ideas to life."
  },
  {
    id: "kindness",
    name: "Kindness Corner",
    category: "community",
    image: "images/kindness.jpg",
    desc: "Discover small acts of kindness and community care."
  },
  {
    id: "library",
    name: "Little Library",
    category: "growth",
    image: "images/library.jpg",
    desc: "Explore knowledge, explainers and new ideas."
  },
  {
    id: "sleep",
    name: "Sleep & Rest",
    category: "wellbeing",
    image: "images/sleep.jpg",
    desc: "Learn about rest and gentle bedtime routines."
  },
  {
    id: "money",
    name: "Money Matters",
    category: "growth",
    image: "images/money.jpg",
    desc: "Learn about saving, budgeting and financial basics."
  },
  {
    id: "openmic",
    name: "Open Mic",
    category: "creative",
    image: "images/openmic.jpg",
    desc: "A space for poetry, spoken word and expression."
  }
];

/* ---------------- ELEMENTS ---------------- */

const grid = document.getElementById("featureGrid");
const guestCounter = document.getElementById("guestCounter");

const authModal = document.getElementById("authModal");
const authForm = document.getElementById("authForm");
const authMessage = document.getElementById("authMessage");
const authTitle = document.getElementById("authTitle");
const authDescription = document.getElementById("authDescription");
const authSubmit = document.getElementById("authSubmit");

const loginTab = document.getElementById("loginTab");
const signupTab = document.getElementById("signupTab");

let authMode = "login";

/* ---------------- GUEST ACCESS ---------------- */

const GUEST_STORAGE_KEY = "ether_guest_spaces_v1";
const GUEST_SPACE_LIMIT = 3;

function getGuestSpaces() {
  try {
    const stored = JSON.parse(
      localStorage.getItem(GUEST_STORAGE_KEY) || "[]"
    );

    return Array.isArray(stored)
      ? [...new Set(stored.filter(id =>
          spaces.some(space => space.id === id)
        ))]
      : [];
  } catch {
    return [];
  }
}

function saveGuestSpaces(ids) {
  localStorage.setItem(
    GUEST_STORAGE_KEY,
    JSON.stringify(ids)
  );
}

function updateGuestCounter() {
  if (!guestCounter) return;

  if (currentSession) {
    guestCounter.textContent =
      "You're signed in. All 20 spaces are available.";
    return;
  }

  const used = getGuestSpaces().length;
  const remaining = Math.max(0, GUEST_SPACE_LIMIT - used);

  guestCounter.textContent =
    `${used} of ${GUEST_SPACE_LIMIT} guest spaces explored · ` +
    `${remaining} remaining`;
}

function canOpenSpace(spaceId) {
  if (currentSession) return true;

  const accessed = getGuestSpaces();

  if (accessed.includes(spaceId)) return true;

  if (accessed.length >= GUEST_SPACE_LIMIT) {
    showAuthModal(
      "login",
      "Your next chapter starts here.",
      "You've explored three guest spaces. Log in or create an account to continue exploring all twenty."
    );
    return false;
  }

  accessed.push(spaceId);
  saveGuestSpaces(accessed);
  updateGuestCounter();

  return true;
}

/* ---------------- RENDER SPACE CARDS ---------------- */

function renderSpaces(filter = "all") {
  if (!grid) return;

  const filtered = filter === "all"
    ? spaces
    : spaces.filter(space => space.category === filter);

  grid.innerHTML = "";

  filtered.forEach(space => {
    const originalIndex = spaces.indexOf(space) + 1;

    const card = document.createElement("a");
    card.className = "feature-card";
    card.href = `feature.html?id=${encodeURIComponent(space.id)}`;

    card.innerHTML = `
      <img
        src="${space.image}"
        alt="${space.name}"
        loading="lazy"
      >

      <div class="card-content">
        <span class="card-number">
          ${String(originalIndex).padStart(2, "0")} / 20
        </span>

        <div class="card-bottom">
          <h3>${space.name}</h3>
          <p>${space.desc}</p>
          <span class="card-link">Explore this space ↗</span>
        </div>
      </div>
    `;

    card.addEventListener("click", event => {
      if (!canOpenSpace(space.id)) {
        event.preventDefault();
      }
    });

    grid.appendChild(card);
  });
}

/* ---------------- CATEGORY FILTERS ---------------- */

document.querySelectorAll(".filter-chip").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-chip").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");
    renderSpaces(button.dataset.filter || "all");
  });
});

/* ---------------- AUTH MODAL ---------------- */

function showAuthModal(
  mode = "login",
  title = "",
  description = ""
) {
  if (!authModal) return;

  setAuthMode(mode);

  if (title && authTitle) {
    authTitle.textContent = title;
  }

  if (description && authDescription) {
    authDescription.textContent = description;
  }

  authModal.hidden = false;
  authModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");
  authMessage && (authMessage.textContent = "");
}

function closeAuthModal() {
  if (!authModal) return;

  authModal.hidden = true;
  authModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}

function setAuthMode(mode) {
  authMode = mode;

  if (loginTab) {
    loginTab.classList.toggle("active", mode === "login");
  }

  if (signupTab) {
    signupTab.classList.toggle("active", mode === "signup");
  }

  if (authSubmit) {
    authSubmit.textContent =
      mode === "login" ? "Log in" : "Create account";
  }

  const passwordInput = document.getElementById("authPassword");

  if (passwordInput) {
    passwordInput.autocomplete =
      mode === "login" ? "current-password" : "new-password";
  }

  if (authMessage) authMessage.textContent = "";
}

document.getElementById("openAuth")?.addEventListener("click", () => {
  showAuthModal();
});

document.getElementById("closeAuth")?.addEventListener("click", () => {
  closeAuthModal();
});

loginTab?.addEventListener("click", () => {
  setAuthMode("login");
});

signupTab?.addEventListener("click", () => {
  setAuthMode("signup");
});

authModal?.addEventListener("click", event => {
  if (event.target === authModal) {
    closeAuthModal();
  }
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && authModal && !authModal.hidden) {
    closeAuthModal();
  }
});

/* ---------------- SUPABASE AUTHENTICATION ---------------- */

function showAuthMessage(message, isError = false) {
  if (!authMessage) return;

  authMessage.textContent = message;
  authMessage.classList.toggle("error", isError);
  authMessage.classList.toggle("success", !isError);
}

authForm?.addEventListener("submit", async event => {
  event.preventDefault();

  if (!supabaseClient) {
    showAuthMessage(
      "Authentication could not load. Check your internet connection and Supabase script.",
      true
    );
    return;
  }

  const email = document.getElementById("authEmail")?.value.trim();
  const password = document.getElementById("authPassword")?.value;

  if (!email || !password) {
    showAuthMessage("Please enter your email and password.", true);
    return;
  }

  if (password.length < 8) {
    showAuthMessage("Your password must contain at least 8 characters.", true);
    return;
  }

  if (authSubmit) {
    authSubmit.disabled = true;
    authSubmit.textContent = "Please wait...";
  }

  try {
    let result;

    if (authMode === "signup") {
      result = await supabaseClient.auth.signUp({
        email,
        password
      });
    } else {
      result = await supabaseClient.auth.signInWithPassword({
        email,
        password
      });
    }

    if (result.error) throw result.error;

    if (authMode === "signup" && !result.data.session) {
      showAuthMessage(
        "Account created. Check your email for the confirmation link before logging in."
      );
      return;
    }

    currentSession = result.data.session;

    showAuthMessage("You're signed in. Welcome to To the Ether.");

    updateGuestCounter();

    window.setTimeout(() => {
      closeAuthModal();
      window.location.reload();
    }, 900);

  } catch (error) {
    showAuthMessage(
      error.message || "Something went wrong. Please try again.",
      true
    );
  } finally {
    if (authSubmit) {
      authSubmit.disabled = false;
      authSubmit.textContent =
        authMode === "login" ? "Log in" : "Create account";
    }
  }
});

/* ---------------- SESSION RESTORATION ---------------- */

async function initialiseAuth() {
  if (!supabaseClient) {
    updateGuestCounter();
    return;
  }

  try {
    const { data, error } = await supabaseClient.auth.getSession();

    if (error) throw error;

    currentSession = data.session;

    supabaseClient.auth.onAuthStateChange((_event, session) => {
      currentSession = session;
      updateGuestCounter();
    });

  } catch (error) {
    console.error("Supabase session error:", error);
  }

  updateGuestCounter();
}

/* ---------------- MOBILE NAVIGATION ---------------- */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav?.classList.toggle("open") || false;

  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
  });
});

/* ---------------- FOOTER YEAR ---------------- */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* ---------------- STARTUP ---------------- */

renderSpaces();
initialiseAuth();
