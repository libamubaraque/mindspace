
/* =========================================================
   TO THE ETHER. — FEATURE PAGE JAVASCRIPT
   Feature tools + Saved Pages + Activities
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const params = new URLSearchParams(window.location.search);
  const featureId = params.get("card") || "mood-journal";

  const features = {
    "mood-journal": {
      title: "Mood Journal",
      category: "UNDERSTAND YOURSELF",
      description: "A gentle space to understand your feelings."
    },
    "breathing-space": {
      title: "Breathing Space",
      category: "PAUSE AND RESET",
      description: "Slow down and give yourself a peaceful moment."
    },
    "gratitude-journal": {
      title: "Gratitude Journal",
      category: "NOTICE THE LITTLE THINGS",
      description: "Collect the moments that make life meaningful."
    },
    "fitness-wellness": {
      title: "Fitness & Wellness",
      category: "MOVE AND FEEL",
      description: "Build healthy habits through movement and rest."
    },
    "daily-checkin": {
      title: "Daily Check-in",
      category: "A MOMENT FOR YOU",
      description: "Celebrate little wins and acknowledge difficult days."
    },
    "study-focus": {
      title: "Study & Focus",
      category: "LEARN AT YOUR PACE",
      description: "Create a study routine that works for you."
    },
    "self-care": {
      title: "Self-care Corner",
      category: "CARE FOR YOURSELF",
      description: "Explore simple ways to care for yourself."
    },
    "health-support": {
      title: "Health & Support",
      category: "YOUR WELLBEING MATTERS",
      description: "Find helpful information and support resources."
    },
    "stories-hope": {
      title: "Stories & Hope",
      category: "REAL PEOPLE. REAL STORIES.",
      description: "Discover stories of courage, humanity and hope."
    },
    "career-exploration": {
      title: "Career Exploration",
      category: "DISCOVER YOUR DIRECTION",
      description: "Explore possibilities beyond what you already know."
    },
    "my-little-world": {
      title: "My Little World",
      category: "YOUR PERSONAL COLLECTION",
      description: "Keep your memories, ideas and personal moments."
    },
    "day-planner": {
      title: "Day Planner",
      category: "MAKE SPACE FOR YOUR DAY",
      description: "Organise your priorities and give yourself room to breathe."
    },
    "sports-events": {
      title: "Sports & Events",
      category: "MOVE. COMPETE. CONNECT.",
      description: "Discover sporting challenges, competitions and events."
    }
  };

  const feature = features[featureId] || {
    title: "Your Personal Space",
    category: "EXPLORE",
    description: "Create, discover and grow at your own pace."
  };

  document.title = feature.title + " | To the Ether.";

  document.getElementById("featureTitle").textContent =
    feature.title;

  document.getElementById("featureCategory").textContent =
    feature.category;

  document.getElementById("featureDescription").textContent =
    feature.description;

  const content = document.getElementById("featureContent");

  /* -------------------------------
     SHARED SAVED PAGE SYSTEM
  -------------------------------- */

  const STORAGE_KEY = "etherSavedPages";

  function getSavedPages() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function savePages(pages) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
    renderSavedPages();
  }

  function savePage(title, text) {
    if (!text.trim()) {
      alert("Write something before saving your page.");
      return;
    }

    const pages = getSavedPages();

    pages.unshift({
      id: Date.now(),
      feature: feature.title,
      title: title,
      text: text,
      date: new Date().toLocaleString()
    });

    savePages(pages);
    alert("Your page has been saved!");
  }

  function renderSavedPages() {
    const container =
      document.getElementById("featureSavedPages");

    if (!container) return;

    const pages = getSavedPages()
      .filter(page => page.feature === feature.title);

    container.innerHTML = "";

    if (!pages.length) {
      container.innerHTML =
        '<p class="empty-saved-message">Your saved pages will appear here.</p>';
      return;
    }

    pages.slice(0, 5).forEach(page => {
      const article = document.createElement("article");
      article.className = "mini-saved-card";

      const heading = document.createElement("h3");
      heading.textContent = page.title;

      const date = document.createElement("small");
      date.textContent = page.date;

      const text = document.createElement("p");
      text.textContent = page.text;

      article.append(heading, date, text);
      container.appendChild(article);
    });
  }

  /* -------------------------------
     REUSABLE SECTION CREATOR
  -------------------------------- */

  function createSection(title, description = "") {
    const section = document.createElement("section");
    section.className = "tool-section";

    const heading = document.createElement("h2");
    heading.textContent = title;
    section.appendChild(heading);

    if (description) {
      const paragraph = document.createElement("p");
      paragraph.textContent = description;
      section.appendChild(paragraph);
    }

    content.appendChild(section);
    return section;
  }

  function createInput(section, labelText, placeholder = "") {
    const group = document.createElement("div");
    group.className = "field-group";

    const label = document.createElement("label");
    label.textContent = labelText;

    const input = document.createElement("textarea");
    input.placeholder = placeholder;

    group.append(label, input);
    section.appendChild(group);

    return input;
  }

  function createButton(section, text, callback) {
    const button = document.createElement("button");
    button.className = "feature-action";
    button.textContent = text;
    button.type = "button";
    button.addEventListener("click", callback);

    section.appendChild(button);
    return button;
  }

  /* -------------------------------
     MOOD JOURNAL
  -------------------------------- */

  if (featureId === "mood-journal") {

    const section = createSection(
      "How are you feeling today?",
      "There is no right or wrong answer."
    );

    const mood = document.createElement("select");

    [
      "Choose your mood",
      "Happy",
      "Calm",
      "Excited",
      "Grateful",
      "Confused",
      "Tired",
      "Stressed",
      "Sad",
      "Not sure"
    ].forEach(value => {
      const option = document.createElement("option");
      option.textContent = value;
      mood.appendChild(option);
    });

    section.appendChild(mood);

    const reflection = createInput(
      section,
      "What is on your mind?",
      "Write freely. This space belongs to you..."
    );

    createButton(section, "Save My Reflection", () => {
      if (mood.selectedIndex === 0) {
        alert("Choose a mood first.");
        return;
      }

      savePage(
        "Mood: " + mood.value,
        reflection.value
      );
    });
  }

  /* -------------------------------
     GRATITUDE JOURNAL
  -------------------------------- */

  else if (featureId === "gratitude-journal") {

    const section = createSection(
      "Little Things Worth Remembering",
      "You don't need a perfect day to find something meaningful."
    );

    const prompts = [
      "Something that made me smile",
      "Someone I appreciate",
      "Something beautiful I noticed",
      "Something I learned",
      "Something I am looking forward to"
    ];

    const inputs = prompts.map(prompt =>
      createInput(section, prompt, "Write here...")
    );

    createButton(section, "Save My Gratitude Page", () => {
      const result = prompts.map((prompt, i) =>
        prompt + ":\n" + inputs[i].value
      ).join("\n\n");

      savePage("My Gratitude Journal", result);
    });
  }

  /* -------------------------------
     BREATHING SPACE
  -------------------------------- */

  else if (featureId === "breathing-space") {

    const section = createSection(
      "Your Breathing Space",
      "Follow a comfortable rhythm. You can stop whenever you wish."
    );

    const circle = document.createElement("div");
    circle.className = "breathing-circle";
    circle.textContent = "Ready?";

    section.appendChild(circle);

    const description = document.createElement("p");
    description.className = "exercise-description";
    description.textContent = "Choose start when you are ready.";

    section.appendChild(description);

    let running = false;
    let timeout = null;
    let phase = 0;

    const phases = [
      { name: "Breathe in", duration: 4000, class: "breathing-in" },
      { name: "Breathe out", duration: 4000, class: "breathing-out" }
    ];

    function nextPhase() {
      if (!running) return;

      const current = phases[phase];

      circle.textContent = current.name;
      circle.className = "breathing-circle " + current.class;

      description.textContent =
        "Take it gently. Follow your own comfortable pace.";

      timeout = setTimeout(() => {
        phase = (phase + 1) % phases.length;
        nextPhase();
      }, current.duration);
    }

    createButton(section, "Start Breathing", () => {
      if (running) return;
      running = true;
      phase = 0;
      nextPhase();
    });

    createButton(section, "Pause", () => {
      running = false;
      clearTimeout(timeout);
      circle.className = "breathing-circle";
      circle.textContent = "Paused";
      description.textContent = "Take your time.";
    });
  }

  /* -------------------------------
     DAILY CHECK-IN
  -------------------------------- */

  else if (featureId === "daily-checkin") {

    const section = createSection(
      "Today's Little Check-in",
      "Small things count too."
    );

    const questions = [
      "What was one good moment today?",
      "What was challenging?",
      "What is one thing you did for yourself?",
      "What would make tomorrow a little easier?"
    ];

    const answers = questions.map(q =>
      createInput(section, q, "Write your answer...")
    );

    createButton(section, "Save Today's Check-in", () => {
      const result = questions.map((q, i) =>
        q + "\n" + answers[i].value
      ).join("\n\n");

      savePage("Daily Check-in", result);
    });
  }

  /* -------------------------------
     STUDY & FOCUS
  -------------------------------- */

  else if (featureId === "study-focus") {

    const section = createSection(
      "Your Study Session",
      "Try a short study period followed by a proper break."
    );

    const display = document.createElement("div");
    display.className = "timer-display";
    display.textContent = "10:00";

    section.appendChild(display);

    let seconds = 600;
    let interval = null;

    function updateTimer() {
      const min = Math.floor(seconds / 60);
      const sec = seconds % 60;

      display.textContent =
        String(min).padStart(2, "0") + ":" +
        String(sec).padStart(2, "0");
    }

    createButton(section, "Start", () => {
      if (interval) return;

      interval = setInterval(() => {
        if (seconds > 0) {
          seconds--;
          updateTimer();
        } else {
          clearInterval(interval);
          interval = null;
          alert("Study session complete. Take a break!");
        }
      }, 1000);
    });

    createButton(section, "Pause", () => {
      clearInterval(interval);
      interval = null;
    });

    createButton(section, "Reset", () => {
      clearInterval(interval);
      interval = null;
      seconds = 600;
      updateTimer();
    });

    const breakSection = createSection(
      "Your Five-Minute Break",
      "Stretch, drink water, rest your eyes or simply relax."
    );

    createButton(breakSection, "Start 5-Minute Break", () => {
      seconds = 300;
      updateTimer();
    });

    const music = createSection("Choose Your Study Atmosphere");

    [
      ["Nature Sounds", "https://www.youtube.com/results?search_query=nature+sounds"],
      ["Instrumental Music", "https://www.youtube.com/results?search_query=instrumental+study+music"],
      ["Quran Recitation", "https://www.youtube.com/results?search_query=quran+recitation"],
      ["Silence", null]
    ].forEach(([label, url]) => {
      createButton(music, label, () => {
        if (url) window.open(url, "_blank", "noopener,noreferrer");
        else alert("Enjoy your quiet study time.");
      });
    });
  }

  /* -------------------------------
     FITNESS & WELLNESS
  -------------------------------- */

  else if (featureId === "fitness-wellness") {

    const section = createSection(
      "Move in Your Own Way",
      "Choose activities that feel enjoyable and comfortable."
    );

    const activities = [
      "Walking",
      "Running",
      "Cycling",
      "Swimming",
      "Stretching",
      "Yoga",
      "Dancing",
      "Rest and recovery"
    ];

    const checks = [];

    activities.forEach(activity => {
      const label = document.createElement("label");
      label.className = "check-line";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      label.append(checkbox, document.createTextNode(activity));
      section.appendChild(label);

      checks.push(checkbox);
    });

    createButton(section, "Save My Activity Log", () => {
      const selected = activities.filter((a, i) => checks[i].checked);

      savePage(
        "My Wellness Activities",
        selected.join("\n") || "No activities selected."
      );
    });

    const sports = createSection(
      "Sports & Running Communities",
      "Explore activities and discover events."
    );

    [
      ["Strava", "https://www.strava.com/"],
      ["World Athletics", "https://worldathletics.org/"],
      ["Olympics", "https://olympics.com/"]
    ].forEach(([name, url]) => {
      createButton(sports, name, () =>
        window.open(url, "_blank", "noopener,noreferrer")
      );
    });
  }

  /* -------------------------------
     SELF-CARE CORNER
  -------------------------------- */

  else if (featureId === "self-care") {

    const section = createSection(
      "My Self-care List",
      "Care can be simple. Choose what works for you."
    );

    const habits = [
      "Drink enough water",
      "Take a comfortable break",
      "Spend time outdoors",
      "Talk to someone I trust",
      "Enjoy a hobby",
      "Get enough rest",
      "Organise my surroundings"
    ];

    const checks = [];

    habits.forEach(habit => {
      const label = document.createElement("label");
      label.className = "check-line";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      label.append(checkbox, document.createTextNode(habit));
      section.appendChild(label);
      checks.push(checkbox);
    });

    createButton(section, "Save My Self-care List", () => {
      const selected = habits.filter((h, i) => checks[i].checked);
      savePage("My Self-care", selected.join("\n"));
    });
  }

  /* -------------------------------
     HEALTH & SUPPORT
  -------------------------------- */

  else if (featureId === "health-support") {

    const section = createSection(
      "Taking Care of Your Health",
      "General wellbeing information, not a substitute for medical advice."
    );

    const topics = [
      "Sleep and rest",
      "Nutrition and hydration",
      "Emotional wellbeing",
      "Physical activity",
      "Menstrual health",
      "Finding trusted support"
    ];

    topics.forEach(topic => {
      const article = document.createElement("article");
      article.className = "story-card";

      const heading = document.createElement("h3");
      heading.textContent = topic;

      const paragraph = document.createElement("p");
      paragraph.textContent =
        "Explore reliable health information and speak with a qualified professional when you need personal advice.";

      article.append(heading, paragraph);
      section.appendChild(article);
    });

    const note = createInput(
      section,
      "Questions I want to ask a health professional",
      "Write your questions here..."
    );

    createButton(section, "Save My Questions", () =>
      savePage("Health Questions", note.value)
    );
  }

  /* -------------------------------
     STORIES & HOPE
  -------------------------------- */

  else if (featureId === "stories-hope") {

    const section = createSection(
      "Stories That Matter",
      "Explore real stories about humanity, courage and change."
    );

    const stories = [
      {
        title: "Humanitarian Action",
        description: "Discover the work of people helping communities affected by crises.",
        link: "https://www.un.org/"
      },
      {
        title: "Children's Rights",
        description: "Learn about education, protection and children's wellbeing.",
        link: "https://www.unicef.org/"
      },
      {
        title: "Global Health",
        description: "Explore public health initiatives around the world.",
        link: "https://www.who.int/"
      }
    ];

    stories.forEach(story => {
      const article = document.createElement("article");
      article.className = "story-card";

      const heading = document.createElement("h3");
      heading.textContent = story.title;

      const paragraph = document.createElement("p");
      paragraph.textContent = story.description;

      const link = document.createElement("a");
      link.href = story.link;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = "Explore →";

      article.append(heading, paragraph, link);
      section.appendChild(article);
    });
  }

  /* -------------------------------
     CAREER EXPLORATION
  -------------------------------- */

  else if (featureId === "career-exploration") {

    const section = createSection(
      "Discover Your Interests",
      "Choose what you enjoy. There is no single correct career."
    );

    const interests = [
      "Medicine and healthcare",
      "Science and research",
      "Human rights and humanitarian work",
      "Arts and creativity",
      "Education",
      "Environment and nature",
      "Business and entrepreneurship",
      "Technology"
    ];

    const checks = [];

    interests.forEach(interest => {
      const label = document.createElement("label");
      label.className = "check-line";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";

      label.append(checkbox, document.createTextNode(interest));
      section.appendChild(label);
      checks.push(checkbox);
    });

    createButton(section, "Show My Interests", () => {
      const selected = interests.filter((i, n) => checks[n].checked);

      savePage(
        "My Career Interests",
        selected.join("\n") || "I am still exploring."
      );
    });

    const dreams = createSection(
      "Dreams Beyond Career",
      "What would you like to experience or contribute to the world?"
    );

    const dream = createInput(
      dreams,
      "My dreams",
      "Write about the life you hope to build..."
    );

    createButton(dreams, "Save My Dreams", () =>
      savePage("Dreams Beyond Career", dream.value)
    );
  }

  /* -------------------------------
     MY LITTLE WORLD
  -------------------------------- */

  else if (featureId === "my-little-world") {

    const section = createSection(
      "My Personal Diary",
      "A place for memories, thoughts and little moments."
    );

    const title = document.createElement("input");
    title.placeholder = "Give this memory a title";

    section.appendChild(title);

    const memory = createInput(
      section,
      "Your memory",
      "Write anything you want to remember..."
    );

    const photo = document.createElement("input");
    photo.type = "file";
    photo.accept = "image/*";

    section.appendChild(photo);

    createButton(section, "Save My Memory", () => {
      if (photo.files.length) {
        alert("Photo uploads require the cloud-storage integration. Save your text memory here for now.");
      }

      savePage(
        title.value || "A Little Memory",
        memory.value
      );
    });
  }

  /* -------------------------------
     DAY PLANNER
  -------------------------------- */

  else if (featureId === "day-planner") {

    const section = createSection(
      "Plan Your Day",
      "Make a realistic plan with room for breaks and unexpected moments."
    );

    const tasks = createInput(
      section,
      "Today's priorities",
      "Write one task per line..."
    );

    const notes = createInput(
      section,
      "Notes and reminders",
      "Anything else to remember..."
    );

    createButton(section, "Save My Day Plan", () => {
      savePage(
        "My Day Plan",
        "Priorities:\n" + tasks.value +
        "\n\nNotes:\n" + notes.value
      );
    });
  }

  /* -------------------------------
     SPORTS & EVENTS
  -------------------------------- */

  else if (featureId === "sports-events") {

    const section = createSection(
      "Discover Your Next Challenge",
      "Explore different sports and activities."
    );

    const sports = [
      "Marathon and running races",
      "Cycling competitions",
      "Swimming competitions",
      "Athletics",
      "School sports events",
      "Community sports festivals"
    ];

    sports.forEach(sport => {
      const article = document.createElement("article");
      article.className = "story-card";

      const heading = document.createElement("h3");
      heading.textContent = sport;

      const paragraph = document.createElement("p");
      paragraph.textContent =
        "Explore opportunities, learn about events and check eligibility and safety requirements.";

      article.append(heading, paragraph);
      section.appendChild(article);
    });

    const event = createInput(
      section,
      "My Event Wishlist",
      "Write the competitions or sporting events you would love to explore..."
    );

    createButton(section, "Save My Event Wishlist", () =>
      savePage("Sports Event Wishlist", event.value)
    );
  }

  /* -------------------------------
     GENERAL FEATURE FALLBACK
  -------------------------------- */

  else {

    const section = createSection(
      "Make This Space Yours",
      "Use this space to collect your thoughts and ideas."
    );

    const notes = createInput(
      section,
      "My Notes",
      "Start writing..."
    );

    createButton(section, "Save My Page", () =>
      savePage("My Notes", notes.value)
    );
  }

  /* -------------------------------
     MOBILE NAVIGATION
  -------------------------------- */

  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");

  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      mainNav.classList.toggle("active");
    });
  }

  /* INITIALISE */

  renderSavedPages();

});
