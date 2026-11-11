
/* =====================================================
   TO THE ETHER. — HOMEPAGE JAVASCRIPT
   20 cards | Supabase Auth | Saved Pages
   ===================================================== */

/* PASTE YOUR SUPABASE PUBLIC ANON KEY BELOW.
   Never use your service_role key in website code. */

const SUPABASE_URL = "https://sckcrrriiatfxcafabmh.supabase.co";
const SUPABASE_ANON_KEY = "PASTE_YOUR_SUPABASE_ANON_KEY_HERE";

let supabaseClient = null;

if (window.supabase && SUPABASE_ANON_KEY !== "PASTE_YOUR_SUPABASE_ANON_KEY_HERE") {
  supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
}

const cards = [
  { id:"mood-journal", name:"Mood Journal", description:"Understand your feelings and give your thoughts a place to land.", color:"rgba(84,45,57,.72)" },
  { id:"breathing-space", name:"Breathing Space", description:"Pause, breathe, and find a little calm in your day.", color:"rgba(65,75,45,.8)" },
  { id:"gratitude-journal", name:"Gratitude Journal", description:"Collect little moments, memories and things worth appreciating.", color:"rgba(117,73,87,.72)" },
  { id:"fitness-wellness", name:"Fitness & Wellness", description:"Build gentle movement habits and celebrate your progress.", color:"rgba(75,91,62,.8)" },
  { id:"daily-checkin", name:"Daily Check-in", description:"Notice your small wins, thoughts and everyday moments.", color:"rgba(84,45,57,.55)" },
  { id:"study-focus", name:"Study & Focus", description:"Create focused study sessions and healthier study breaks.", color:"rgba(65,75,45,.65)" },
  { id:"self-care", name:"Self-care Corner", description:"Make room for simple routines that support your wellbeing.", color:"rgba(117,73,87,.6)" },
  { id:"world-beyond-you", name:"The World Beyond You", description:"Explore real stories, human rights, global issues and hope.", color:"rgba(65,75,45,.75)" },
  { id:"find-direction", name:"Find Your Direction", description:"Explore interests, careers, pathways and dreams beyond work.", color:"rgba(84,45,57,.75)" },
  { id:"my-little-world", name:"My Little World", description:"Create a personal scrapbook of memories, thoughts and growth.", color:"rgba(75,91,62,.72)" },
  { id:"movie-theatre", name:"Movie Theatre", description:"Build a watchlist and keep your film thoughts in one place.", color:"rgba(84,45,57,.8)" },
  { id:"the-commons", name:"The Commons", description:"Discover clubs, shared interests and community activities.", color:"rgba(65,75,45,.75)" },
  { id:"sports-events", name:"Sports & Events", description:"Keep track of sports, events and activities you care about.", color:"rgba(117,73,87,.7)" },
  { id:"day-planner", name:"Day Planner", description:"Organise your day into realistic, manageable steps.", color:"rgba(65,75,45,.85)" },
  { id:"creative-studio", name:"The Creative Studio", description:"Make space for poetry, writing, ideas and creative challenges.", color:"rgba(84,45,57,.7)" },
  { id:"kindness-project", name:"The Kindness Project", description:"Find small ways to help people and contribute to your community.", color:"rgba(75,91,62,.8)" },
  { id:"learning-library", name:"The Learning Library", description:"Collect useful resources and track the things you learn.", color:"rgba(65,75,45,.7)" },
  { id:"sleep-sanctuary", name:"The Sleep Sanctuary", description:"Build a peaceful bedtime routine and reflect on your rest.", color:"rgba(84,45,57,.8)" },
  { id:"money-matters", name:"Money Matters", description:"Learn budgeting, saving and everyday money skills.", color:"rgba(75,91,62,.8)" },
  { id:"open-mic", name:"The Open Mic", description:"A space for poems, stories, words and self-expression.", color:"rgba(117,73,87,.75)" }
];

const cardGrid = document.getElementById("cardGrid");

function renderCards() {
  if (!cardGrid) return;

  cardGrid.innerHTML = cards.map((card, index) => `
    <a class="feature-card"
       href="feature.html?card=${encodeURIComponent(card.id)}"
       style="--card-color:${card.color}">
      <span class="card-number">${String(index + 1).padStart(2, "0")} / 20</span>
      <div>
        <h3>${card.name}</h3>
        <p>${card.description}</p>
        <span class="card-link">Enter this space ↗</span>
      </div>
    </a>
  `).join("");
}

function getSavedPages() {
  try {
    return JSON.parse(localStorage.getItem("etherSavedPages") || "[]");
  } catch {
    return [];
  }
}

function renderSavedPages() {
  const container = document.getElementById("savedPages");
  if (!container) return;

  const pages = getSavedPages();

  if (!pages.length) {
    container.innerHTML = `<p class="muted">Your saved pages will appear here when you create them.</p>`;
    return;
  }

  container.innerHTML = pages.slice().reverse().map((page, index) => `
    <article class="saved-card">
      <small>${escapeHTML(page.cardName || "Saved page")}</small>
      <h3>${escapeHTML(page.title || "Untitled")}</h3>
      <p>${escapeHTML(page.content || "")}</p>
      <small>${escapeHTML(page.date || "")}</small>
      <div class="feature-actions">
        <button class="button button-outline delete-saved" data-id="${escapeHTML(page.id)}">Delete</button>
      </div>
    </article>
  `).join("");

  container.querySelectorAll(".delete-saved").forEach(button => {
    button.addEventListener("click", () => {
      const updated = getSavedPages().filter(page => page.id !== button.dataset.id);
      localStorage.setItem("etherSavedPages", JSON.stringify(updated));
      renderSavedPages();
    });
  });
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#039;"
  })[char]);
}

/* ---------------- AUTHENTICATION ---------------- */

const authDialog = document.getElementById("authDialog");
const authForm = document.getElementById("authForm");
const authMessage = document.getElementById("authMessage");
let authMode = "login";

function openAuth(mode) {
  authMode = mode;
  document.getElementById("authTitle").textContent = mode === "signup" ? "Create an account" : "Log in";
  document.getElementById("authEyebrow").textContent = mode === "signup" ? "Your space begins here" : "Welcome back";
  document.getElementById("authSubmit").textContent = mode === "signup" ? "Create account" : "Log in";
  authMessage.textContent = "";
  authDialog.showModal();
}

document.getElementById("loginButton")?.addEventListener("click", () => openAuth("login"));
document.getElementById("signupButton")?.addEventListener("click", () => openAuth("signup"));
document.getElementById("closeAuth")?.addEventListener("click", () => authDialog.close());

authForm?.addEventListener("submit", async event => {
  event.preventDefault();

  if (!supabaseClient) {
    authMessage.textContent = "Add your Supabase public anon key in script.js first.";
    return;
  }

  const email = document.getElementById("authEmail").value.trim();
  const password = document.getElementById("authPassword").value;

  authMessage.textContent = "Please wait...";

  try {
    const result = authMode === "signup"
      ? await supabaseClient.auth.signUp({ email, password })
      : await supabaseClient.auth.signInWithPassword({ email, password });

    if (result.error) throw result.error;

    authMessage.textContent = authMode === "signup"
      ? "Account created. Check your email if confirmation is enabled."
      : "You are logged in!";

    if (authMode === "login") {
      setTimeout(() => authDialog.close(), 1000);
    }
  } catch (error) {
    authMessage.textContent = error.message || "Authentication failed.";
  }
});

async function checkLogin() {
  if (!supabaseClient) return;

  const { data } = await supabaseClient.auth.getSession();
  const loggedIn = Boolean(data.session);

  const loginButton = document.getElementById("loginButton");
  const signupButton = document.getElementById("signupButton");

  if (loggedIn) {
    loginButton.textContent = "Logged in";
    signupButton.textContent = "Log out";
    signupButton.onclick = async () => {
      await supabaseClient.auth.signOut();
      location.reload();
    };
  }
}

renderCards();
renderSavedPages();
checkLogin();
