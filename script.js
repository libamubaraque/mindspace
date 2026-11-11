
// =========================================================
// TO THE ETHER.
// HOMEPAGE JAVASCRIPT
//
// JUDGE EXPLANATION:
// JavaScript makes the homepage interactive.
// It generates cards from structured data, filters categories,
// opens feature pages and manages the saved-pages display.
//
// STORAGE NOTE:
// This version uses browser localStorage for saved-page
// prototypes. It is not a replacement for Supabase cloud sync.
// =========================================================


// 01. FEATURE CATALOGUE
// Every card has its own name, category, description and image.

const FEATURES = [

  {
    id: "mood",
    number: "01",
    name: "Mood Journal",
    category: "wellbeing",
    description: "Understand your feelings and recognise emotional patterns.",
    image: "images/cards/mood.jpg"
  },

  {
    id: "breathing",
    number: "02",
    name: "Breathing Space",
    category: "wellbeing",
    description: "Pause, breathe and explore calming exercises.",
    image: "images/cards/breathing.jpg"
  },

  {
    id: "gratitude",
    number: "03",
    name: "Gratitude Journal",
    category: "wellbeing",
    description: "Notice little things and practise appreciation.",
    image: "images/cards/gratitude.jpg"
  },

  {
    id: "fitness",
    number: "04",
    name: "Fitness & Wellness",
    category: "wellbeing",
    description: "Explore movement, running, yoga and healthy routines.",
    image: "images/cards/fitness.jpg"
  },

  {
    id: "checkin",
    number: "05",
    name: "Daily Check-in",
    category: "wellbeing",
    description: "Reflect on your day, little wins and experiences.",
    image: "images/cards/checkin.jpg"
  },

  {
    id: "study",
    number: "06",
    name: "Study & Focus",
    category: "discovery",
    description: "Build manageable study habits and discover learning methods.",
    image: "images/cards/study.jpg"
  },

  {
    id: "selfcare",
    number: "07",
    name: "Self-care Corner",
    category: "wellbeing",
    description: "Explore physical, emotional and everyday self-care.",
    image: "images/cards/selfcare.jpg"
  },

  {
    id: "stories",
    number: "08",
    name: "The World Beyond You",
    category: "discovery",
    description: "Discover real stories, global issues and human experiences.",
    image: "images/cards/stories.jpg"
  },

  {
    id: "career",
    number: "09",
    name: "Find Your Direction",
    category: "discovery",
    description: "Explore careers, education and possibilities beyond school.",
    image: "images/cards/career.jpg"
  },

  {
    id: "world",
    number: "10",
    name: "My Little World",
    category: "creativity",
    description: "Create a personal collection of memories and reflections.",
    image: "images/cards/world.jpg"
  },

  {
    id: "movies",
    number: "11",
    name: "Movie Theatre",
    category: "creativity",
    description: "Discover films, storytelling and meaningful cinema.",
    image: "images/cards/movies.jpg"
  },

  {
    id: "commons",
    number: "12",
    name: "The Commons",
    category: "opportunities",
    description: "Explore student communities, clubs and collaboration.",
    image: "images/cards/commons.jpg"
  },

  {
    id: "sports",
    number: "13",
    name: "Sports & Events",
    category: "opportunities",
    description: "Discover marathons, cycling, swimming and sporting competitions.",
    image: "images/cards/sports.jpg"
  },

  {
    id: "planner",
    number: "14",
    name: "Day Planner",
    category: "discovery",
    description: "Organise your time, goals, tasks and daily priorities.",
    image: "images/cards/planner.jpg"
  },

  {
    id: "creative",
    number: "15",
    name: "The Creative Studio",
    category: "creativity",
    description: "Explore writing, drawing, photography and creative ideas.",
    image: "images/cards/creative.jpg"
  },

  {
    id: "kindness",
    number: "16",
    name: "The Kindness Project",
    category: "opportunities",
    description: "Discover meaningful ways to contribute to your community.",
    image: "images/cards/kindness.jpg"
  },

  {
    id: "learning",
    number: "17",
    name: "The Learning Library",
    category: "discovery",
    description: "Explore knowledge, subjects, resources and learning challenges.",
    image: "images/cards/learning.jpg"
  },

  {
    id: "sleep",
    number: "18",
    name: "The Sleep Sanctuary",
    category: "wellbeing",
    description: "Learn about rest, sleep routines and healthy habits.",
    image: "images/cards/sleep.jpg"
  },

  {
    id: "money",
    number: "19",
    name: "Money Matters",
    category: "discovery",
    description: "Learn financial literacy, saving and responsible budgeting.",
    image: "images/cards/money.jpg"
  },

  {
    id: "openmic",
    number: "20",
    name: "The Open Mic",
    category: "creativity",
    description: "Discover spoken word, poetry, storytelling and expression.",
    image: "images/cards/openmic.jpg"
  }

];


// 02. HOMEPAGE CARD GENERATION

const featureGrid = document.getElementById("featureGrid");

function renderCards(category = "all") {

  if (!featureGrid) return;

  const selected = FEATURES.filter(feature =>
    category === "all" || feature.category === category
  );

  featureGrid.innerHTML = selected.map(feature => `

    <article class="feature-card"
      style="--card-image: url('${feature.image}')">

      <div class="feature-card-content">

        <span class="card-number">
          ${feature.number} / 20
        </span>

        <h3>${feature.name}</h3>

        <p>${feature.description}</p>

        <a class="card-open"
          href="feature.html?card=${encodeURIComponent(feature.id)}">
          Explore this space ↗
        </a>

      </div>

    </article>

  `).join("");

}

renderCards();


// 03. CARD FILTERING

document.querySelectorAll(".filter-btn").forEach(button => {

  button.addEventListener("click", () => {

    document.querySelectorAll(".filter-btn").forEach(item => {
      item.classList.remove("active");
    });

    button.classList.add("active");

    renderCards(button.dataset.filter);

  });

});


// 04. SAVED PAGES
// Browser storage prototype.
// The feature page uses the same storage key.

const STORAGE_KEY = "toTheEtherSavedPages";

function getSavedPages() {

  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch (error) {
    console.error("Could not read saved pages:", error);
    return [];
  }

}


function renderSavedPages() {

  const container = document.getElementById("savedPageList");

  if (!container) return;

  const pages = getSavedPages();

  if (!pages.length) {

    container.innerHTML = `
      <p class="empty-message">
        Your saved pages will appear here when you save
        activities, reflections or personal entries.
      </p>
    `;

    return;

  }

  container.innerHTML = pages.map((page, index) => `

    <article class="saved-item">

      <span class="eyebrow">${page.feature || "Saved page"}</span>

      <h3>${escapeHTML(page.title || "Untitled")}</h3>

      <p>${escapeHTML(page.content || "")}</p>

      <small>${escapeHTML(page.date || "")}</small>

      <br>

      <button class="delete-saved" data-index="${index}">
        Delete saved entry
      </button>

    </article>

  `).join("");


  container.querySelectorAll(".delete-saved").forEach(button => {

    button.addEventListener("click", () => {

      const updated = getSavedPages();

      updated.splice(Number(button.dataset.index), 1);

      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

      renderSavedPages();

      showToast("Saved entry deleted.");

    });

  });

}


// 05. SAFE TEXT DISPLAY

function escapeHTML(value) {

  return String(value ?? "").replace(/[&<>"']/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[character]);

}


// 06. NOTIFICATION

let toastTimer;

function showToast(message) {

  const toast = document.getElementById("toast");

  if (!toast) return;

  toast.textContent = message;

  toast.classList.add("show");

  clearTimeout(toastTimer);

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);

}


// 07. ACCOUNT DIALOG

const accountDialog = document.getElementById("accountDialog");

document.getElementById("accountBtn")?.addEventListener("click", () => {
  accountDialog?.showModal();
});


// 08. SAVED PAGES NAVIGATION

document.getElementById("savedNav")?.addEventListener("click", () => {

  document.getElementById("savedPages")?.scrollIntoView({
    behavior: "smooth"
  });

});


// 09. SUPABASE AUTHENTICATION
//
// IMPORTANT:
// Replace the placeholders with your actual Supabase
// project URL and publishable key.
//
// This enables authentication only. It does not automatically
// make saved entries cloud-based. That requires database tables
// and matching Row Level Security policies.

const SUPABASE_URL = "YOUR_SUPABASE_PROJECT_URL";

const SUPABASE_KEY = "YOUR_SUPABASE_PUBLISHABLE_KEY";

let supabaseClient = null;

const supabaseReady =
  SUPABASE_URL.startsWith("https://") &&
  SUPABASE_KEY !== "YOUR_SUPABASE_PUBLISHABLE_KEY" &&
  typeof window.supabase !== "undefined";


if (supabaseReady) {

  supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
  );

}


// 10. SIGN IN / SIGN UP

let isSignUp = false;

const toggleAuth = document.getElementById("toggleAuth");

const authForm = document.getElementById("authForm");

const authMessage = document.getElementById("authMessage");


toggleAuth?.addEventListener("click", () => {

  isSignUp = !isSignUp;

  document.getElementById("authSubmit").textContent =
    isSignUp ? "Create account" : "Sign in";

  toggleAuth.textContent =
    isSignUp
      ? "Already have an account? Sign in"
      : "New here? Create an account";

});


authForm?.addEventListener("submit", async event => {

  event.preventDefault();

  if (!supabaseClient) {

    authMessage.textContent =
      "Supabase is not configured yet. Add your project URL and publishable key.";

    return;

  }

  const email = document.getElementById("authEmail").value;

  const password = document.getElementById("authPassword").value;

  const button = document.getElementById("authSubmit");

  button.disabled = true;

  try {

    const result = isSignUp
      ? await supabaseClient.auth.signUp({ email, password })
      : await supabaseClient.auth.signInWithPassword({ email, password });

    if (result.error) throw result.error;

    authMessage.textContent = isSignUp
      ? "Account created. Check your email if confirmation is enabled."
      : "Successfully signed in.";

  } catch (error) {

    authMessage.textContent = error.message;

  } finally {

    button.disabled = false;

  }

});


// 11. INITIAL PAGE SETUP

document.addEventListener("DOMContentLoaded", () => {

  renderCards();

  renderSavedPages();

});


// 12. JUDGE EXPLANATION
//
// This JavaScript file demonstrates:
// - Data-driven rendering.
// - DOM manipulation.
// - Event listeners.
// - Category filtering.
// - Browser storage.
// - Basic authentication integration.
// - Reusable functions.

console.info("To the Ether homepage initialised.");
