/* =====================================================
   TO THE ETHER — HOMEPAGE
   20 spaces, filters and navigation
   ===================================================== */

const spaces = [
  { id:"mood", name:"Mood Journal", category:"wellbeing", image:"images/mood.jpg", desc:"A gentle place to understand your feelings and make space for your thoughts." },
  { id:"breathing", name:"Breathing Space", category:"wellbeing", image:"images/breathing.jpg", desc:"Pause, breathe and discover simple ways to find a moment of calm." },
  { id:"gratitude", name:"Gratitude Journal", category:"wellbeing", image:"images/gratitude.jpg", desc:"Collect the little moments, people and experiences that matter to you." },
  { id:"fitness", name:"Fitness & Wellness", category:"wellbeing", image:"images/fitness.jpg", desc:"Explore movement, healthy habits, rest and everyday wellbeing." },
  { id:"checkin", name:"Daily Check-in", category:"wellbeing", image:"images/checkin.jpg", desc:"A little space for daily reflections, small wins and fresh starts." },
  { id:"study", name:"Study & Focus", category:"growth", image:"images/study.jpg", desc:"Build manageable study habits and make room for focused learning." },
  { id:"selfcare", name:"Self-care Corner", category:"wellbeing", image:"images/selfcare.jpg", desc:"Explore everyday care, healthy routines and looking after yourself." },
  { id:"stories", name:"Stories & Hope", category:"community", image:"images/stories.jpg", desc:"Discover real stories, human rights, challenges and meaningful change." },
  { id:"career", name:"Career Exploration", category:"growth", image:"images/career.jpg", desc:"Explore interests, career paths, courses and possibilities beyond school." },
  { id:"scrapbook", name:"My Little World", category:"creative", image:"images/scrapbook.jpg", desc:"A personal corner for memories, photographs, letters and reflections." },
  { id:"movies", name:"Movie Theatre", category:"creative", image:"images/movies.jpg", desc:"Build your watchlist, explore genres and collect your favourite films." },
  { id:"commons", name:"The Commons", category:"community", image:"images/commons.jpg", desc:"Discover clubs, shared interests and ways to work together." },
  { id:"sports", name:"Sports & Events", category:"community", image:"images/sports.jpg", desc:"Explore sports, events, participation and inspiring sporting stories." },
  { id:"planner", name:"Day Planner", category:"growth", image:"images/planner.jpg", desc:"Organise your day with realistic plans, breaks and room to restart." },
  { id:"creative", name:"The Creative Studio", category:"creative", image:"images/creative.jpg", desc:"Write, imagine, experiment and bring your ideas to life." },
  { id:"kindness", name:"The Kindness Project", category:"community", image:"images/kindness.jpg", desc:"Discover small acts of kindness and ways to contribute to your community." },
  { id:"library", name:"The Learning Library", category:"growth", image:"images/library.jpg", desc:"Explore knowledge, explainers, learning resources and new ideas." },
  { id:"sleep", name:"The Sleep Sanctuary", category:"wellbeing", image:"images/sleep.jpg", desc:"Learn about rest, bedtime routines and creating space to unwind." },
  { id:"money", name:"Money Matters", category:"growth", image:"images/money.jpg", desc:"Learn about saving, budgeting, needs, wants and financial basics." },
  { id:"openmic", name:"The Open Mic", category:"creative", image:"images/openmic.jpg", desc:"A place for poetry, spoken word, personal writing and expression." }
];

const grid = document.getElementById("featureGrid");

function renderSpaces(filter = "all") {
  if (!grid) return;

  const filtered = filter === "all"
    ? spaces
    : spaces.filter(space => space.category === filter);

  grid.innerHTML = filtered.map((space, index) => `
    <a class="feature-card" href="feature.html?id=${space.id}">
      <img
        src="${space.image}"
        alt="${space.name}"
        loading="lazy"
        onerror="this.style.display='none'"
      >
      <div class="card-content">
        <span class="card-number">${String(spaces.indexOf(space) + 1).padStart(2,"0")} / 20</span>
        <div class="card-bottom">
          <h3>${space.name}</h3>
          <p>${space.desc}</p>
          <span class="card-link">Explore this space ↗</span>
        </div>
      </div>
    </a>
  `).join("");
}

document.querySelectorAll(".filter-chip").forEach(button => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".filter-chip").forEach(item =>
      item.classList.remove("active")
    );

    button.classList.add("active");
    renderSpaces(button.dataset.filter);
  });
});

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle?.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => mainNav.classList.remove("open"));
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

renderSpaces();
