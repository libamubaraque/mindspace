/* =========================================================
   TO THE ETHER — HOMEPAGE JAVASCRIPT
   20 open spaces • filters • optional Supabase accounts
   Mobile navigation
   ========================================================= */

"use strict";

/* 01. SUPABASE CONFIGURATION
========================================================= */

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

/* 02. WEBSITE SPACES — ALL 20
========================================================= */

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

/* 03. ELEMENT REFERENCES
========================================================= */

const grid = document.getElementById("featureGrid");

const authModal = document.getElementById("authModal");
const authBackdrop = document.getElementById("authBackdrop");
const authClose = document.getElementById("authClose");

const authForm = document.getElementById("authForm");
const authEmail = document.getElementById("authEmail");
const authPassword = document.getElementById("authPassword");
const authMessage = document.getElementById("authMessage");
const authTitle = document.getElementById("authTitle");
const authDescription = document.getElementById("authDescription");
const authSubmit = document.getElementById("authSubmit");
const authSwitch = document.getElementById("authSwitch");

const loginButton = document.getElementById("loginButton");
const signupButton = document.getElementById("signupButton");

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

let authMode = "login";

/* 04. ACCESS — EVERY SPACE IS OPEN
========================================================= */

function canOpenSpace() {
  // Visitors never need an account to explore.
  return true;
}

/* 05. CREATE AND DISPLAY SPACE CARDS
========================================================= */

function renderSpaces(filter = "all") {
  if (!grid) return;

  const filteredSpaces = filter === "all"
    ? spaces
    : spaces.filter(space => space.category === filter);

  grid.innerHTML = "";

  filteredSpaces.forEach(space => {
    const originalIndex = spaces.indexOf(space) + 1;

    const card = document.createElement("a");

    card.className = "feature-card";
    card.href = `feature.html?id=${encodeURIComponent(space.id)}`;
    card.dataset.space = space.id;
    card.setAttribute("aria-label", `Explore ${space.name}`);

    const image = document.createElement("img");
    image.src = space.image;
    image.alt = "";
    image.loading = "lazy";

    image.addEventListener("error", () => {
      image.style.display = "none";
    });

    const cardContent = document.createElement("div");
    cardContent.className = "card-content";

    const cardNumber = document.createElement("span");
    cardNumber.className = "card-number";
    cardNumber.textContent =
      `${String(originalIndex).padStart(2, "0")} / 20`;

    const cardBottom = document.createElement("div");
    cardBottom.className = "card-bottom";

    const heading = document.createElement("h3");
    heading.textContent = space.name;

    const description = document.createElement("p");
    description.textContent = space.desc;

    const cardLink = document.createElement("span");
    cardLink.className = "card-link";
    cardLink.textContent = "Explore this space ↗";

    cardBottom.append(
      heading,
      description,
      cardLink
    );

    cardContent.append(
      cardNumber,
      cardBottom
    );

    card.append(
      image,
      cardContent
    );

    // No login or registration check is performed.
    card.addEventListener("click", () => {
      canOpenSpace(space.id);
    });

    grid.appendChild(card);
  });
}

/* 06. CATEGORY FILTERS
========================================================= */

const filterButtons = document.querySelectorAll(".filter-button");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(item => {
      item.classList.remove("active");
      item.setAttribute("aria-pressed", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-pressed", "true");

    renderSpaces(button.dataset.filter || "all");
  });
});

/* 07. OPTIONAL AUTHENTICATION MODAL
========================================================= */

function showAuthModal(
  mode = "login",
  title = "",
  description = ""
) {
  if (!authModal) return;

  setAuthMode(mode);

  if (authTitle) {
    authTitle.textContent =
      title || (mode === "login" ? "Come on in." : "Join our space.");
  }

  if (authDescription) {
    authDescription.textContent =
      description ||
      "Create an optional account for your personal collection.";
  }

  authModal.hidden = false;
  authModal.setAttribute("aria-hidden", "false");

  document.body.classList.add("modal-open");

  if (authMessage) {
    authMessage.textContent = "";
    authMessage.className = "";
  }

  authEmail?.focus();
}

function closeAuthModal() {
  if (!authModal) return;

  authModal.hidden = true;
  authModal.setAttribute("aria-hidden", "true");

  document.body.classList.remove("modal-open");
}

function setAuthMode(mode) {
  authMode = mode === "signup" ? "signup" : "login";

  if (authSubmit) {
    authSubmit.textContent =
      authMode === "login" ? "Log in" : "Create account";
  }

  if (authPassword) {
    authPassword.autocomplete =
      authMode === "login"
        ? "current-password"
        : "new-password";
  }

  if (authSwitch) {
    authSwitch.textContent =
      authMode === "login"
        ? "New here? Create an account"
        : "Already have an account? Log in";
  }

  if (authTitle) {
    authTitle.textContent =
      authMode === "login" ? "Come on in." : "Join our space.";
  }

  if (authDescription) {
    authDescription.textContent =
      authMode === "login"
        ? "Log in to access your personal account."
        : "Create an account for your personal collection.";
  }

  if (authMessage) {
    authMessage.textContent = "";
    authMessage.className = "";
  }
}

loginButton?.addEventListener("click", () => {
  showAuthModal("login");
});

signupButton?.addEventListener("click", () => {
  showAuthModal("signup");
});

authClose?.addEventListener("click", closeAuthModal);
authBackdrop?.addEventListener("click", closeAuthModal);

authSwitch?.addEventListener("click", () => {
  setAuthMode(authMode === "login" ? "signup" : "login");
});

document.addEventListener("keydown", event => {
  if (event.key === "Escape" && authModal && !authModal.hidden) {
    closeAuthModal();
  }
});

/* 08. AUTHENTICATION MESSAGES
========================================================= */

function showAuthMessage(message, isError = false) {
  if (!authMessage) return;

  authMessage.textContent = message;
  authMessage.classList.toggle("error", isError);
  authMessage.classList.toggle("success", !isError);
}

/* 09. SUPABASE LOGIN AND SIGNUP
========================================================= */

authForm?.addEventListener("submit", async event => {
  event.preventDefault();

  if (!supabaseClient) {
    showAuthMessage(
      "Authentication could not load. Check your internet connection and Supabase setup.",
      true
    );
    return;
  }

  const email = authEmail?.value.trim();
  const password = authPassword?.value;

  if (!email || !password) {
    showAuthMessage(
      "Please enter your email address and password.",
      true
    );
    return;
  }

  if (password.length < 8) {
    showAuthMessage(
      "Your password must contain at least 8 characters.",
      true
    );
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

    if (result.error) {
      throw result.error;
    }

    if (authMode === "signup" && !result.data.session) {
      showAuthMessage(
        "Your account has been created. Check your email for the confirmation link before logging in."
      );
      return;
    }

    currentSession = result.data.session;

    showAuthMessage("You're signed in. Welcome to To the Ether.");

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

/* 10. RESTORE SIGN-IN SESSION
========================================================= */

async function initialiseAuth() {
  if (!supabaseClient) return;

  try {
    const { data, error } =
      await supabaseClient.auth.getSession();

    if (error) throw error;

    currentSession = data.session;

    supabaseClient.auth.onAuthStateChange(
      (_event, session) => {
        currentSession = session;
      }
    );

  } catch (error) {
    console.error("Could not restore Supabase session:", error);
  }
}

/* 11. MOBILE NAVIGATION
========================================================= */

menuToggle?.addEventListener("click", () => {
  const isOpen = mainNav?.classList.toggle("open") || false;

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "×" : "☰";
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");

    menuToggle?.setAttribute("aria-expanded", "false");

    if (menuToggle) {
      menuToggle.textContent = "☰";
    }
  });
});

/* 12. FOOTER YEAR
========================================================= */

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* 13. STARTUP
========================================================= */

function startWebsite() {
  if (authModal) {
    authModal.hidden = true;
    authModal.setAttribute("aria-hidden", "true");
  }

  document.body.classList.remove("modal-open");

  // All twenty spaces are available immediately.
  renderSpaces("all");

  filterButtons.forEach(button => {
    const isAll = button.dataset.filter === "all";

    button.classList.toggle("active", isAll);
    button.setAttribute("aria-pressed", String(isAll));
  });

  // Restore an optional login session without blocking the site.
  initialiseAuth();
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", startWebsite);
} else {
  startWebsite();
}
