
/* =========================================================
   TO THE ETHER — COMPLETE FEATURE JAVASCRIPT

   Controls all ten feature spaces:
   1. Mood Journal
   2. Breathing Space
   3. Gratitude Journal
   4. Fitness & Wellness
   5. Daily Check-in
   6. Study & Focus
   7. Self-care Corner
   8. Stories & Hope
   9. Career Exploration
   10. My Little World

   Saved pages use localStorage in this browser.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  /* =======================================================
     01. BASIC ELEMENTS AND FEATURE INFORMATION
     ======================================================= */

  const $ = id => document.getElementById(id);

  const params = new URLSearchParams(window.location.search);
  const feature = params.get("feature");

  const title = $("featureTitle");
  const description = $("featureDescription");
  const category = $("featureCategory");
  const content = $("featureContent");

  const STORAGE_KEY = "etherSavedPages";

  const features = {
    "mood-journal": {
      title: "Mood Journal",
      category: "REFLECT · 01",
      description: "Give your feelings a little space.",
      intro: "There is no right or wrong way to feel. Take a moment to understand your day.",
      prompts: [
        "What emotion describes your day?",
        "What made you feel this way?",
        "What was the most difficult part of today?",
        "What is something you wish someone understood?",
        "What is one kind thing you can tell yourself?"
      ]
    },

    "breathing-space": {
      title: "Breathing Space",
      category: "PAUSE · 02",
      description: "A quiet moment in a busy day.",
      intro: "Choose a comfortable exercise. Breathe naturally and stop whenever you feel uncomfortable."
    },

    "gratitude-journal": {
      title: "Gratitude Journal",
      category: "APPRECIATE · 03",
      description: "Small things can hold big meaning.",
      intro: "Collect the moments, people and experiences you want to remember.",
      prompts: [
        "Three things I appreciated today:",
        "Someone who made my day better:",
        "A moment I want to remember:",
        "Something about myself I appreciate:",
        "Something I am looking forward to:"
      ]
    },

    "fitness-wellness": {
      title: "Fitness & Wellness",
      category: "MOVE · 04",
      description: "Movement is a form of care.",
      intro: "Focus on enjoyment, energy, strength and rest. Every body deserves care."
    },

    "daily-check-in": {
      title: "Daily Check-in",
      category: "CONNECT · 05",
      description: "A little conversation with yourself.",
      intro: "No long explanations needed. Just check in with yourself."
    },

    "study-focus": {
      title: "Study & Focus",
      category: "LEARN · 06",
      description: "One small step at a time.",
      intro: "Create a study session that respects your attention and your need for breaks."
    },

    "self-care": {
      title: "Self-care Corner",
      category: "CARE · 07",
      description: "Care is more than a routine.",
      intro: "Explore physical, emotional and everyday wellbeing."
    },

    "stories-hope": {
      title: "Stories & Hope",
      category: "DISCOVER · 08",
      description: "Understand the world. Notice the change.",
      intro: "Learn about real challenges and the people and organisations working towards solutions."
    },

    "career-exploration": {
      title: "Career Exploration",
      category: "DREAM · 09",
      description: "Your interests can lead in many directions.",
      intro: "Discover different career families, job titles and educational pathways."
    },

    "my-little-world": {
      title: "My Little World",
      category: "REMEMBER · 10",
      description: "A collection of everything that makes you, you.",
      intro: "Keep memories, photographs, thoughts and letters in your own little corner."
    }
  };

  /* =======================================================
     02. CHECK THE FEATURE NAME
     ======================================================= */

  if (!feature || !features[feature]) {
    title.textContent = "Space not found.";
    description.textContent = "Return home and choose one of the ten spaces.";
    category.textContent = "TO THE ETHER";
    content.textContent = "";

    const back = document.createElement("a");
    back.href = "index.html";
    back.className = "feature-action";
    back.textContent = "Back to homepage ↗";
    content.appendChild(back);

    return;
  }

  const current = features[feature];

  document.title = current.title + " | To the Ether.";
  title.textContent = current.title;
  category.textContent = current.category;
  description.textContent = current.description;

  /* =======================================================
     03. REUSABLE PAGE BUILDERS
     These functions create the sections and fields used
     throughout all ten feature pages.
     ======================================================= */

  function section(heading, text = "") {
    const box = document.createElement("section");
    box.className = "tool-section";

    const h = document.createElement("h2");
    h.textContent = heading;
    box.appendChild(h);

    if (text) {
      const p = document.createElement("p");
      p.textContent = text;
      box.appendChild(p);
    }

    return box;
  }

  function addTextArea(parent, label, placeholder = "Write here...") {
    const wrapper = document.createElement("div");
    wrapper.className = "field-group";

    const lab = document.createElement("label");
    lab.textContent = label;

    const area = document.createElement("textarea");
    area.placeholder = placeholder;
    area.rows = 4;

    wrapper.append(lab, area);
    parent.appendChild(wrapper);

    return area;
  }

  function addInput(parent, label, placeholder = "", type = "text") {
    const wrapper = document.createElement("div");
    wrapper.className = "field-group";

    const lab = document.createElement("label");
    lab.textContent = label;

    const input = document.createElement("input");
    input.type = type;
    input.placeholder = placeholder;
    input.className = "feature-input";

    wrapper.append(lab, input);
    parent.appendChild(wrapper);

    return input;
  }

  function addSelect(parent, label, options) {
    const wrapper = document.createElement("div");
    wrapper.className = "field-group";

    const lab = document.createElement("label");
    lab.textContent = label;

    const select = document.createElement("select");

    options.forEach(option => {
      const item = document.createElement("option");
      item.value = option;
      item.textContent = option;
      select.appendChild(item);
    });

    wrapper.append(lab, select);
    parent.appendChild(wrapper);

    return select;
  }

  function addButton(parent, text, action) {
    const button = document.createElement("button");
    button.className = "feature-action";
    button.type = "button";
    button.textContent = text;
    button.addEventListener("click", action);

    parent.appendChild(button);
    return button;
  }

  function addLink(parent, name, url) {
    const link = document.createElement("a");

    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.className = "resource-button";
    link.textContent = name + " ↗";

    parent.appendChild(link);
    return link;
  }

  function addChecklist(parent, heading, items) {
    const group = section(heading);

    items.forEach(itemText => {
      const label = document.createElement("label");
      label.className = "check-line";

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.value = itemText;

      label.append(checkbox, document.createTextNode(itemText));
      group.appendChild(label);
    });

    parent.appendChild(group);
    return group;
  }

  /* =======================================================
     04. SAVED PAGE SYSTEM
     Saves creations and allows users to open or delete them.
     ======================================================= */

  function getSavedPages() {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }

  function savePage(pageTitle, pageContent, extra = {}) {
    const pages = getSavedPages();

    const newPage = {
      id: Date.now() + Math.random(),
      title: pageTitle,
      content: pageContent,
      feature: feature,
      date: new Date().toISOString(),
      ...extra
    };

    try {
      pages.push(newPage);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));

      alert("Your creation has been saved!");
      renderSavedPages();

      return true;

    } catch {
      alert(
        "Your browser could not save this creation. " +
        "If it contains a photo, try a smaller image."
      );

      return false;
    }
  }

  function deleteSavedPage(id) {
    const updated = getSavedPages().filter(page => String(page.id) !== String(id));

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      renderSavedPages();
    } catch {
      alert("This page could not be deleted.");
    }
  }

  function renderSavedPages() {
    const container = $("featureSavedPages");
    if (!container) return;

    container.innerHTML = "";

    const pages = getSavedPages()
      .filter(page => page.feature === feature)
      .reverse();

    if (!pages.length) {
      const empty = document.createElement("p");
      empty.textContent = "Your saved pages will appear here.";
      container.appendChild(empty);
      return;
    }

    pages.forEach(page => {
      const item = document.createElement("article");
      item.className = "mini-saved-card";

      const heading = document.createElement("h3");
      heading.textContent = page.title;

      const date = document.createElement("small");
      date.textContent = new Date(page.date).toLocaleDateString();

      const preview = document.createElement("p");
      preview.textContent = (page.content || "").slice(0, 180);

      item.append(heading, date, preview);

      // Display a saved scrapbook photograph, if present.
      if (page.image) {
        const image = document.createElement("img");
        image.src = page.image;
        image.alt = "Saved memory";
        image.className = "scrapbook-preview";
        item.appendChild(image);
      }

      // Expand the entry to read the complete saved content.
      const details = document.createElement("details");
      const summary = document.createElement("summary");
      summary.textContent = "Read full page";

      const fullText = document.createElement("p");
      fullText.textContent = page.content || "";

      details.append(summary, fullText);
      item.appendChild(details);

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "feature-action";
      remove.textContent = "Delete page";

      remove.addEventListener("click", () => {
        if (confirm("Delete this saved page?")) {
          deleteSavedPage(page.id);
        }
      });

      item.appendChild(remove);
      container.appendChild(item);
    });
  }

  /* =======================================================
     05. JOURNAL BUILDER
     Used by Mood Journal and Gratitude Journal.
     ======================================================= */

  function createJournal(prompts, pageName) {
    const box = section("Your journal", current.intro);

    const mood = addSelect(box, "Choose your mood", [
      "Choose one",
      "Happy",
      "Calm",
      "Excited",
      "Tired",
      "Worried",
      "Sad",
      "Frustrated",
      "Unsure",
      "Other"
    ]);

    const fields = [];

    prompts.forEach((prompt, index) => {
      fields.push(
        addTextArea(box, (index + 1) + ". " + prompt)
      );
    });

    addButton(box, "Save my journal ↗", () => {
      if (!fields.some(field => field.value.trim())) {
        alert("Write something before saving.");
        return;
      }

      const text = [
        "Mood: " + mood.value,
        ...prompts.map((prompt, index) =>
          prompt + "\n" + fields[index].value
        )
      ].join("\n\n");

      savePage(pageName, text);
    });

    content.appendChild(box);
  }

  /* =======================================================
     06. MOOD JOURNAL
     ======================================================= */

  if (feature === "mood-journal") {
    createJournal(current.prompts, "Mood Journal");
  }

  /* =======================================================
     07. GRATITUDE JOURNAL
     Includes a title, writing style and extra reflection.
     ======================================================= */

  else if (feature === "gratitude-journal") {
    const box = section(
      "Your gratitude journal",
      "Notice the little things without feeling pressured to be positive all the time."
    );

    const pageTitle = addInput(
      box,
      "Give this page a title",
      "A collection of little things"
    );

    const style = addSelect(box, "Choose your writing style", [
      "Simple",
      "Poetic",
      "Letter to myself",
      "Diary style",
      "A list of little moments"
    ]);

    const fields = [];

    current.prompts.forEach((prompt, index) => {
      fields.push(addTextArea(box, (index + 1) + ". " + prompt));
    });

    const extra = addTextArea(
      box,
      "Anything else you want to remember?",
      "A memory, a person, a place..."
    );

    addButton(box, "Save my gratitude page ↗", () => {
      const answers = fields.map((field, index) =>
        current.prompts[index] + "\n" + field.value
      );

      const allText = [
        "Writing style: " + style.value,
        ...answers,
        "Extra memory:\n" + extra.value
      ].join("\n\n");

      if (!fields.some(field => field.value.trim()) && !extra.value.trim()) {
        alert("Add at least one thought before saving.");
        return;
      }

      savePage(
        pageTitle.value.trim() || "My gratitude page",
        allText
      );
    });

    content.appendChild(box);
  }

  /* =======================================================
     08. BREATHING SPACE
     Four questions, suggested pathways, breathing guide,
     sounds, reflection and saved session history.
     ======================================================= */

  else if (feature === "breathing-space") {

    const questions = section(
      "Find your breathing space",
      "Answer these four gentle questions to find a starting point. You can choose any exercise you prefer."
    );

    const q1 = addSelect(questions, "1. What would help right now?", [
      "I want a quiet moment",
      "I feel overwhelmed",
      "I need a gentle reset",
      "I want to prepare for sleep",
      "I am just exploring"
    ]);

    const q2 = addSelect(questions, "2. How much time do you have?", [
      "1 minute",
      "3 minutes",
      "5 minutes",
      "10 minutes"
    ]);

    const q3 = addSelect(questions, "3. What kind of guide do you prefer?", [
      "A simple visual guide",
      "Written instructions",
      "A sound or nature background",
      "No guide — just silence"
    ]);

    const q4 = addSelect(questions, "4. What feels comfortable?", [
      "Natural, uncounted breathing",
      "A gentle rhythm",
      "A longer, relaxed exhale",
      "I am not sure yet"
    ]);

    const pathway = document.createElement("p");
    pathway.className = "exercise-description";
    questions.appendChild(pathway);

    addButton(questions, "Find my pathway ↗", () => {
      let suggestion = "Start with gentle natural breathing.";

      if (q1.value.includes("overwhelmed")) {
        suggestion = "Try a short, comfortable natural-breathing session. Keep your breathing unforced.";
      } else if (q1.value.includes("sleep")) {
        suggestion = "Try a quiet session with a comfortable, slightly longer exhale if that feels easy.";
      } else if (q3.value.includes("silence")) {
        suggestion = "Choose the silence option and follow your own natural breathing.";
      } else if (q4.value.includes("rhythm")) {
        suggestion = "Try the gentle visual breathing guide below.";
      }

      pathway.textContent = suggestion;
    });

    const exercises = section(
      "Choose an exercise",
      "You can pause or stop at any time. Do not force your breath or hold it if that feels uncomfortable."
    );

    const exerciseChoice = addSelect(exercises, "Breathing exercise", [
      "Natural breathing",
      "Gentle visual breathing",
      "Comfortable longer exhale",
      "Quiet breathing break"
    ]);

    const guide = document.createElement("div");
    guide.className = "breathing-circle";
    guide.textContent = "Ready when you are";
    exercises.appendChild(guide);

    const instruction = document.createElement("p");
    instruction.className = "exercise-description";
    exercises.appendChild(instruction);

    const exerciseDescriptions = {
      "Natural breathing": "Let your breathing happen naturally. Notice the air moving without changing it.",
      "Gentle visual breathing": "Follow the circle as it slowly expands and settles. Keep your breathing comfortable.",
      "Comfortable longer exhale": "If it feels comfortable, let your out-breath last a little longer than your in-breath.",
      "Quiet breathing break": "Sit comfortably and take a quiet pause. You do not need to change your breathing."
    };

    let breathingTimer = null;
    let phase = 0;

    function stopBreathing() {
      clearInterval(breathingTimer);
      breathingTimer = null;
      guide.textContent = "Paused";
      guide.classList.remove("breathing-in");
    }

    function startBreathing() {
      stopBreathing();

      if (exerciseChoice.value === "Natural breathing" ||
          exerciseChoice.value === "Quiet breathing break") {
        guide.textContent = "Breathe naturally";
        return;
      }

      phase = 0;

      const phases = [
        ["Breathe in gently", "breathing-in"],
        ["Breathe out gently", "breathing-out"]
      ];

      function showPhase() {
        const selected = phases[phase % 2];
        guide.textContent = selected[0];
        guide.classList.remove("breathing-in", "breathing-out");
        guide.classList.add(selected[1]);
        phase++;
      }

      showPhase();
      breathingTimer = setInterval(showPhase, 4500);
    }

    exerciseChoice.addEventListener("change", () => {
      stopBreathing();
      instruction.textContent = exerciseDescriptions[exerciseChoice.value];
    });

    instruction.textContent = exerciseDescriptions[exerciseChoice.value];

    addButton(exercises, "Begin", startBreathing);
    addButton(exercises, "Pause", stopBreathing);

    const sounds = section(
      "Sounds for your space",
      "Choose a nature sound or enjoy the silence."
    );

    addLink(sounds, "Rain sounds", "https://www.youtube.com/results?search_query=rain+nature+sounds");
    addLink(sounds, "Forest sounds", "https://www.youtube.com/results?search_query=forest+birds+nature+sounds");
    addLink(sounds, "Ocean sounds", "https://www.youtube.com/results?search_query=ocean+waves+sounds");
    addLink(sounds, "Gentle nature sounds", "https://www.youtube.com/results?search_query=gentle+nature+sounds");

    const reflection = section(
      "After your session",
      "There is no score. Just notice how the experience felt."
    );

    const reflectionText = addTextArea(
      reflection,
      "How was that experience?",
      "You can write a few words or leave this blank."
    );

    addButton(reflection, "Save my breathing session ↗", () => {
      const summary = [
        "Reason: " + q1.value,
        "Available time: " + q2.value,
        "Guide preference: " + q3.value,
        "Comfort preference: " + q4.value,
        "Exercise: " + exerciseChoice.value,
        "Reflection: " + reflectionText.value
      ].join("\n");

      savePage("Breathing Space session", summary);
    });

    content.append(questions, exercises, sounds, reflection);
  }

  /* =======================================================
     09. FITNESS AND WELLNESS
     Movement ideas, wellbeing habits, running notes,
     and links to external resources.
     ======================================================= */

  else if (feature === "fitness-wellness") {

    const box = section(
      "Your movement space",
      "Movement can be walking, dancing, cycling, stretching or resting. Choose what feels right today."
    );

    const activity = addSelect(box, "What would you like to do?", [
      "A gentle walk",
      "Running",
      "Cycling",
      "Stretching",
      "Yoga",
      "Dancing",
      "Outdoor games",
      "Rest day"
    ]);

    const time = addSelect(box, "What feels manageable today?", [
      "A few minutes",
      "5–10 minutes",
      "10–15 minutes",
      "15–20 minutes",
      "I would rather rest"
    ]);

    const feeling = addSelect(box, "How did you feel afterwards?", [
      "Not decided yet",
      "Refreshed",
      "Relaxed",
      "Enjoyed it",
      "Tired",
      "I needed more rest"
    ]);

    const notes = addTextArea(box, "Anything you want to remember?");

    addButton(box, "Save my activity ↗", () => {
      savePage(
        "Wellness activity",
        "Activity: " + activity.value +
        "\nTime: " + time.value +
        "\nAfterwards: " + feeling.value +
        "\nNotes: " + notes.value
      );
    });

    const habits = addChecklist(box, "Small wellbeing habits", [
      "Take a screen break",
      "Go outside for fresh air",
      "Drink water when thirsty",
      "Stretch after sitting",
      "Get enough rest",
      "Spend time doing something enjoyable",
      "Make time for a hobby",
      "Take a break when I need one"
    ]);

    addButton(habits, "Save my habits ↗", () => {
      const selected = [...habits.querySelectorAll("input:checked")]
        .map(input => input.value);

      savePage(
        "My wellness habits",
        selected.length ? selected.join("\n") : "No habits selected."
      );
    });

    const running = section(
      "Running and outdoor inspiration",
      "Explore running communities and keep your activity enjoyable. You do not need to compete with anyone."
    );

    addLink(running, "Explore Strava", "https://www.strava.com/");
    addLink(running, "Beginner running guidance", "https://www.nhs.uk/live-well/exercise/");
    addLink(running, "Beginner yoga classes", "https://www.youtube.com/results?search_query=beginner+gentle+yoga");
    addLink(running, "Outdoor walking ideas", "https://www.youtube.com/results?search_query=beginner+walking+fitness");

    const runningNote = addTextArea(
      running,
      "My running or outdoor activity notes",
      "A route I enjoyed, a place I visited, or something I learned..."
    );

    addButton(running, "Save my activity notes ↗", () => {
      savePage("Running and outdoor notes", runningNote.value);
    });

    const screen = section(
      "Screen-time reset",
      "Give your eyes and attention a change of scene."
    );

    [
      "Look away from your screen for a little while",
      "Stand up and move if you want to",
      "Spend a moment outdoors",
      "Listen to something without scrolling",
      "Rest your eyes"
    ].forEach(item => {
      const p = document.createElement("p");
      p.textContent = "✦ " + item;
      screen.appendChild(p);
    });

    content.append(box, running, screen);
  }

  /* =======================================================
     10. DAILY CHECK-IN
     Small questions, reminders and a simple activity wheel.
     ======================================================= */

  else if (feature === "daily-check-in") {

    const box = section("How are you today?", current.intro);

    const mood = addSelect(box, "Today's mood", [
      "Choose one",
      "Good",
      "Okay",
      "Tired",
      "Excited",
      "Worried",
      "Confused",
      "Frustrated",
      "Unsure"
    ]);

    const energy = addSelect(box, "How is your energy?", [
      "Choose one",
      "A little",
      "Somewhere in the middle",
      "Lots of energy"
    ]);

    const win = addTextArea(box, "One little win today");
    const thought = addTextArea(box, "Something on my mind");
    const next = addTextArea(box, "One small thing I want to do next");

    addButton(box, "Save my check-in ↗", () => {
      savePage(
        "Daily check-in",
        "Mood: " + mood.value +
        "\nEnergy: " + energy.value +
        "\nLittle win: " + win.value +
        "\nOn my mind: " + thought.value +
        "\nNext step: " + next.value
      );
    });

    const game = section(
      "A tiny reminder",
      "Choose a reminder for today."
    );

    const reminders = [
      "Small steps still count.",
      "You are allowed to take breaks.",
      "You do not have to do everything today.",
      "Learning takes time.",
      "Your worth is not your grades.",
      "It is okay to ask for help.",
      "You can begin again tomorrow."
    ];

    const reminderResult = document.createElement("p");
    reminderResult.className = "reminder-result";
    game.appendChild(reminderResult);

    addButton(game, "Give me a reminder ✦", () => {
      reminderResult.textContent =
        reminders[Math.floor(Math.random() * reminders.length)];
    });

    const activity = section(
      "A tiny activity",
      "Pick one small thing. You can skip it if you want."
    );

    const activities = [
      "Write down one thing you noticed today.",
      "Listen to a favourite song.",
      "Step outside for fresh air.",
      "Send a kind message to someone.",
      "Draw something for two minutes.",
      "Organise one small corner of your desk.",
      "Take a quiet break."
    ];

    const activityResult = document.createElement("p");
    activityResult.className = "reminder-result";
    activity.appendChild(activityResult);

    addButton(activity, "Give me a tiny activity ↗", () => {
      activityResult.textContent =
        activities[Math.floor(Math.random() * activities.length)];
    });

    content.append(box, game, activity);
  }

  /* =======================================================
     11. STUDY AND FOCUS
     Includes levels, study/rest timer, music and reflection.
     ======================================================= */

  else if (feature === "study-focus") {

    const box = section(
      "Your study session",
      "Choose a realistic task and work in a way that feels manageable."
    );

    const task = addTextArea(
      box,
      "What are you studying?",
      "Subject, chapter or assignment..."
    );

    const level = addSelect(box, "Choose your session", [
      "Beginner — 10 minutes",
      "Intermediate — 20 minutes",
      "Focused — 25 minutes"
    ]);

    const timerDisplay = document.createElement("h2");
    timerDisplay.className = "timer-display";
    timerDisplay.textContent = "10:00";
    box.appendChild(timerDisplay);

    const timerStatus = document.createElement("p");
    timerStatus.textContent = "Ready to begin.";
    box.appendChild(timerStatus);

    let timer = null;
    let remaining = 600;
    let isBreak = false;

    function updateTimer() {
      const minutes = Math.floor(remaining / 60);
      const seconds = remaining % 60;

      timerDisplay.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
    }

    function selectedStudyTime() {
      if (level.selectedIndex === 0) return 600;
      if (level.selectedIndex === 1) return 1200;
      return 1500;
    }

    function resetTimer() {
      clearInterval(timer);
      timer = null;
      isBreak = false;
      remaining = selectedStudyTime();
      timerStatus.textContent = "Ready to begin.";
      updateTimer();
    }

    function startTimer() {
      if (timer) return;

      timerStatus.textContent = isBreak
        ? "Rest time. Step away from your screen."
        : "Study session in progress.";

      timer = setInterval(() => {
        remaining--;
        updateTimer();

        if (remaining <= 0) {
          clearInterval(timer);
          timer = null;

          if (!isBreak) {
            isBreak = true;
            remaining = 300;
            timerStatus.textContent =
              "Study session complete. Your five-minute rest is ready.";
            updateTimer();
          } else {
            timerStatus.textContent =
              "Rest complete. You can finish here or begin another session.";
            remaining = 0;
            updateTimer();
          }
        }
      }, 1000);
    }

    function pauseTimer() {
      clearInterval(timer);
      timer = null;
      timerStatus.textContent = "Paused.";
    }

    level.addEventListener("change", resetTimer);

    addButton(box, "Start / Continue", startTimer);
    addButton(box, "Pause", pauseTimer);
    addButton(box, "Reset", resetTimer);

    const breaks = section(
      "Your five-minute rest",
      "A break is part of learning, not a reward you have to earn."
    );

    [
      "Stretch gently if you want to",
      "Look outside",
      "Walk around",
      "Have a drink of water",
      "Sit quietly",
      "Rest your eyes away from the screen"
    ].forEach(item => {
      const p = document.createElement("p");
      p.textContent = "✦ " + item;
      breaks.appendChild(p);
    });

    const music = section(
      "Your study atmosphere",
      "Choose music, nature sounds, devotional recitation or silence."
    );

    addLink(music, "Spotify", "https://open.spotify.com/");
    addLink(music, "YouTube Music", "https://music.youtube.com/");
    addLink(music, "Apple Music", "https://music.apple.com/");
    addLink(music, "Nature sounds", "https://www.youtube.com/results?search_query=nature+sounds+study");
    addLink(music, "Quran.com", "https://quran.com/");

    const reflection = section("After studying");

    const completed = addTextArea(
      reflection,
      "What did I work on?",
      "A few words about your session..."
    );

    const nextStep = addTextArea(
      reflection,
      "What would I like to do next?"
    );

    addButton(reflection, "Save my study page ↗", () => {
      savePage(
        "Study session",
        "Task: " + task.value +
        "\nSession: " + level.value +
        "\nWork completed: " + completed.value +
        "\nNext step: " + nextStep.value
      );
    });

    content.append(box, breaks, music, reflection);
  }

  /* =======================================================
     12. SELF-CARE CORNER
     Everyday care, personal notes, optional cycle log
     and support resources.
     ======================================================= */

  else if (feature === "self-care") {

    const box = section(
      "Care for yourself",
      "Self-care can mean resting, asking for help or taking care of everyday needs."
    );

    const physical = addChecklist(box, "Physical care", [
      "Get enough sleep",
      "Eat regular meals",
      "Drink water",
      "Move in a way I enjoy",
      "Take a screen break",
      "Rest when I need to"
    ]);

    const emotional = addChecklist(box, "Emotional care", [
      "Write down my thoughts",
      "Talk to someone I trust",
      "Take a quiet break",
      "Do something I enjoy",
      "Spend time with someone supportive"
    ]);

    const everyday = addChecklist(box, "Everyday care", [
      "Organise my surroundings",
      "Spend time outdoors",
      "Make time for a hobby",
      "Take a break from screens",
      "Make time for family or friends"
    ]);

    const note = section("A note to myself");
    const noteText = addTextArea(
      note,
      "What do I need today?",
      "Be honest. You do not have to make it sound perfect."
    );

    addButton(note, "Save my self-care page ↗", () => {
      const checked = [...content.querySelectorAll("input:checked")]
        .map(input => input.value);

      savePage(
        "Self-care page",
        "Things I chose:\n" + checked.join("\n") +
        "\n\nMy note:\n" + noteText.value
      );
    });

    const optional = section(
      "Optional personal cycle notes",
      "This section is optional. You can leave it blank. Entries are stored only in this browser."
    );

    const cycleDate = addInput(
      optional,
      "Date",
      "",
      "date"
    );

    const cycleNote = addTextArea(
      optional,
      "Notes (optional)",
      "For example, a general note about how you felt..."
    );

    addButton(optional, "Save my private note ↗", () => {
      if (!cycleDate.value && !cycleNote.value.trim()) {
        alert("Add a date or a note first.");
        return;
      }

      savePage(
        "Personal wellbeing note",
        "Date: " + cycleDate.value +
        "\nNotes: " + cycleNote.value
      );
    });

    const support = section(
      "Finding support",
      "If something is affecting your wellbeing, consider speaking with a trusted adult, school counsellor or healthcare professional."
    );

    addLink(support, "India Ministry of Health", "https://mohfw.gov.in/");
    addLink(support, "WHO mental health information", "https://www.who.int/health-topics/mental-health");

    content.append(physical, emotional, everyday, note, optional, support);
  }

  /* =======================================================
     13. STORIES AND HOPE
     Real-world topics with links to established organisations.
     ======================================================= */

  else if (feature === "stories-hope") {

    const box = section(
      "Understand the world",
      "Real challenges deserve honest attention. Learn about the issues, the people affected and the work being done."
    );

    const stories = [
      {
        title: "Children in humanitarian crises",
        text: "Children affected by conflict and displacement need education, protection, healthcare and safe environments.",
        url: "https://www.unicef.org/emergencies"
      },
      {
        title: "Education in emergencies",
        text: "When schools are disrupted, children can lose access to learning, routine and safe spaces.",
        url: "https://www.unicef.org/education"
      },
      {
        title: "Global health and healthcare access",
        text: "Access to essential healthcare remains unequal. Explore global health challenges and responses.",
        url: "https://www.who.int/emergencies"
      },
      {
        title: "Refugees and displacement",
        text: "Learn about people forced to leave their homes and the support available to displaced communities.",
        url: "https://www.unhcr.org/"
      },
      {
        title: "Food security",
        text: "Explore the work being done to address hunger and improve access to food.",
        url: "https://www.wfp.org/"
      },
      {
        title: "Humanitarian action",
        text: "Discover how organisations coordinate emergency assistance and work with affected communities.",
        url: "https://www.unocha.org/"
      }
    ];

    stories.forEach(story => {
      const article = document.createElement("article");
      article.className = "story-card";

      const heading = document.createElement("h3");
      heading.textContent = story.title;

      const paragraph = document.createElement("p");
      paragraph.textContent = story.text;

      article.append(heading, paragraph);
      addLink(article, "Explore the source", story.url);

      box.appendChild(article);
    });

    const reflection = section(
      "Your reflection",
      "You do not need to solve every problem. Start by understanding one."
    );

    const learned = addTextArea(
      reflection,
      "What did you learn?"
    );

    const change = addTextArea(
      reflection,
      "What change would you like to see?"
    );

    const action = addTextArea(
      reflection,
      "What is one constructive action people can take?"
    );

    addButton(reflection, "Save my reflection ↗", () => {
      if (!learned.value.trim() &&
          !change.value.trim() &&
          !action.value.trim()) {
        alert("Write something before saving.");
        return;
      }

      savePage(
        "Stories and hope reflection",
        "What I learned:\n" + learned.value +
        "\n\nChange I want to see:\n" + change.value +
        "\n\nConstructive action:\n" + action.value
      );
    });

    content.append(box, reflection);
  }

  /* =======================================================
     14. CAREER EXPLORATION
     Ten-question interest quiz and career pathway ideas.
     These are starting points, not fixed recommendations.
     ======================================================= */

  else if (feature === "career-exploration") {

    const box = section(
      "Discover your interests",
      "This quiz is a starting point, not a test. You can have several interests and change your mind."
    );

    const questions = [
      ["What interests you most?", [
        "Science and healthcare",
        "Helping communities",
        "Art and creativity",
        "Nature and environment",
        "Technology and engineering",
        "Business and leadership"
      ]],
      ["What kind of work sounds meaningful?", [
        "Helping individuals",
        "Solving complex problems",
        "Creating new things",
        "Research and discovery",
        "Working with communities",
        "Organising and leading"
      ]],
      ["Which environment appeals to you?", [
        "Hospitals and clinics",
        "Fieldwork and travel",
        "Laboratories",
        "Schools and communities",
        "Creative workplaces",
        "International organisations"
      ]],
      ["What matters to you in a career?", [
        "Helping people",
        "Stability",
        "Creativity",
        "Discovery",
        "Leadership",
        "Variety and travel"
      ]],
      ["Which subject do you enjoy most?", [
        "Biology",
        "Social science",
        "Mathematics",
        "Languages",
        "Art",
        "Geography"
      ]],
      ["What would you like to learn more about?", [
        "The human body",
        "Human rights and society",
        "Design and storytelling",
        "Climate and wildlife",
        "Machines and systems",
        "Business and organisations"
      ]],
      ["How would you like to contribute?", [
        "Care for patients",
        "Support communities",
        "Communicate ideas",
        "Protect the environment",
        "Build useful solutions",
        "Lead projects"
      ]],
      ["Which activity sounds interesting?", [
        "Clinical work",
        "Community projects",
        "Writing and design",
        "Outdoor research",
        "Technical problem-solving",
        "Planning and management"
      ]],
      ["What kind of challenge would you enjoy?", [
        "Understanding health problems",
        "Responding to social problems",
        "Making something original",
        "Solving environmental issues",
        "Designing systems",
        "Managing complex projects"
      ]],
      ["Which future experience appeals to you?", [
        "Working in healthcare",
        "Working in humanitarian support",
        "Creating a portfolio",
        "Working in conservation",
        "Inventing or building",
        "Working with organisations"
      ]]
    ];

    const answers = [];

    questions.forEach(([question, options], index) => {
      answers.push(
        addSelect(
          box,
          (index + 1) + ". " + question,
          ["Choose an answer", ...options]
        )
      );
    });

    const results = document.createElement("div");
    results.className = "career-results";
    box.appendChild(results);

    const pathways = {
      "Science and healthcare": {
        family: "Healthcare and medical sciences",
        careers: [
          "Doctor",
          "Nurse",
          "Physiotherapist",
          "Medical researcher",
          "Public health professional"
        ],
        route: "In India, many medical pathways begin after Class 12 with relevant science subjects. MBBS admission uses NEET-UG. Other health degrees have their own eligibility and entrance requirements."
      },
      "Helping communities": {
        family: "Humanitarian and social development",
        careers: [
          "Humanitarian programme officer",
          "Social worker",
          "Child protection specialist",
          "Development professional",
          "Disaster response coordinator"
        ],
        route: "Relevant study areas include social work, development studies, public policy, international relations and public health. Requirements vary by role."
      },
      "Art and creativity": {
        family: "Creative and communication careers",
        careers: [
          "Graphic designer",
          "Illustrator",
          "Writer",
          "Photographer",
          "Communication specialist"
        ],
        route: "Explore design, fine arts, media, communication and writing programmes. A portfolio can be important for many creative pathways."
      },
      "Nature and environment": {
        family: "Environmental and conservation careers",
        careers: [
          "Environmental scientist",
          "Wildlife biologist",
          "Conservation officer",
          "Climate researcher",
          "Environmental engineer"
        ],
        route: "Explore environmental science, biology, geography, ecology and engineering degrees. Course requirements differ."
      },
      "Technology and engineering": {
        family: "Technology and engineering",
        careers: [
          "Civil engineer",
          "Biomedical engineer",
          "Mechanical engineer",
          "Research engineer",
          "Data specialist"
        ],
        route: "Explore engineering and science degrees. In India, JEE is one route for many engineering institutions, but admission systems vary."
      },
      "Business and leadership": {
        family: "Business and management",
        careers: [
          "Project manager",
          "Entrepreneur",
          "Operations specialist",
          "Financial analyst",
          "Management professional"
        ],
        route: "Explore commerce, economics, business administration and management studies. Some professional routes require additional qualifications."
      }
    };

    const answerFamily = {
      "Science and healthcare": "Science and healthcare",
      "Helping communities": "Helping communities",
      "Art and creativity": "Art and creativity",
      "Nature and environment": "Nature and environment",
      "Technology and engineering": "Technology and engineering",
      "Business and leadership": "Business and leadership",

      "Helping individuals": "Helping communities",
      "Solving complex problems": "Technology and engineering",
      "Creating new things": "Art and creativity",
      "Research and discovery": "Science and healthcare",
      "Working with communities": "Helping communities",
      "Organising and leading": "Business and leadership",

      "Hospitals and clinics": "Science and healthcare",
      "Fieldwork and travel": "Nature and environment",
      "Laboratories": "Science and healthcare",
      "Schools and communities": "Helping communities",
      "Creative workplaces": "Art and creativity",
      "International organisations": "Helping communities",

      "Helping people": "Helping communities",
      "Stability": "Business and leadership",
      "Creativity": "Art and creativity",
      "Discovery": "Science and healthcare",
      "Leadership": "Business and leadership",
      "Variety and travel": "Helping communities",

      "Biology": "Science and healthcare",
      "Social science": "Helping communities",
      "Mathematics": "Technology and engineering",
      "Languages": "Art and creativity",
      "Art": "Art and creativity",
      "Geography": "Nature and environment",

      "The human body": "Science and healthcare",
      "Human rights and society": "Helping communities",
      "Design and storytelling": "Art and creativity",
      "Climate and wildlife": "Nature and environment",
      "Machines and systems": "Technology and engineering",
      "Business and organisations": "Business and leadership",

      "Care for patients": "Science and healthcare",
      "Support communities": "Helping communities",
      "Communicate ideas": "Art and creativity",
      "Protect the environment": "Nature and environment",
      "Build useful solutions": "Technology and engineering",
      "Lead projects": "Business and leadership",

      "Clinical work": "Science and healthcare",
      "Community projects": "Helping communities",
      "Writing and design": "Art and creativity",
      "Outdoor research": "Nature and environment",
      "Technical problem-solving": "Technology and engineering",
      "Planning and management": "Business and leadership",

      "Understanding health problems": "Science and healthcare",
      "Responding to social problems": "Helping communities",
      "Making something original": "Art and creativity",
      "Solving environmental issues": "Nature and environment",
      "Designing systems": "Technology and engineering",
      "Managing complex projects": "Business and leadership",

      "Working in healthcare": "Science and healthcare",
      "Working in humanitarian support": "Helping communities",
      "Creating a portfolio": "Art and creativity",
      "Working in conservation": "Nature and environment",
      "Inventing or building": "Technology and engineering",
      "Working with organisations": "Business and leadership"
    };

    addButton(box, "Explore my interests ↗", () => {
      const selected = answers.map(answer => answer.value);

      if (selected.some(answer => answer === "Choose an answer")) {
        alert("Please answer all ten questions first.");
        return;
      }

      const scores = {};

      selected.forEach(answer => {
        const family = answerFamily[answer];
        if (family) scores[family] = (scores[family] || 0) + 1;
      });

      const ranked = Object.entries(scores)
        .sort((a, b) => b[1] - a[1]);

      results.innerHTML = "";

      ranked.slice(0, 3).forEach(([familyName]) => {
        const pathway = pathways[familyName];
        if (!pathway) return;

        const article = document.createElement("article");
        article.className = "story-card";

        const heading = document.createElement("h3");
        heading.textContent = pathway.family;

        const careers = document.createElement("p");
        careers.textContent = "Careers to explore: " + pathway.careers.join(", ");

        const route = document.createElement("p");
        route.textContent = pathway.route;

        article.append(heading, careers, route);
        results.appendChild(article);
      });

      savePage(
        "Career exploration results",
        "My answers:\n" + selected.join("\n") +
        "\n\nMy career interests:\n" +
        ranked.slice(0, 3).map(item => item[0]).join("\n")
      );
    });

    const library = section(
      "Career research library",
      "Use these starting points to research courses, exams and official requirements. Always check current admission information."
    );

    addLink(library, "National Career Service — India", "https://www.ncs.gov.in/");
    addLink(library, "NEET-UG information", "https://neet.nta.nic.in/");
    addLink(library, "JEE information", "https://jeemain.nta.nic.in/");
    addLink(library, "Study in India", "https://studyinindia.gov.in/");
    addLink(library, "United Nations careers", "https://careers.un.org/");

    const dreams = section(
      "Dreams beyond a career",
      "Your future is not limited to a job title."
    );

    const dream = addTextArea(
      dreams,
      "What else would you like to experience in life?",
      "Places, causes, skills, adventures, people you want to help..."
    );

    addButton(dreams, "Save my dreams ↗", () => {
      if (!dream.value.trim()) {
        alert("Write something before saving.");
        return;
      }

      savePage("Dreams beyond career", dream.value);
    });

    content.append(box, library, dreams);
  }

  /* =======================================================
     15. MY LITTLE WORLD
     Scrapbook, letters, photos and saved memories.
     ======================================================= */

  else if (feature === "my-little-world") {

    const box = section(
      "Your personal scrapbook",
      "Collect memories, thoughts, letters and moments. Your entries are stored in this browser."
    );

    const pageTitle = addInput(
      box,
      "Give this memory a title",
      "A little memory"
    );

    const memoryType = addSelect(box, "What are you saving?", [
      "A happy memory",
      "A difficult day",
      "A letter",
      "A photograph",
      "A little achievement",
      "A random thought",
      "Something I do not want to forget"
    ]);

    const entry = addTextArea(
      box,
      "Write your memory",
      "A moment, a letter, a thought or anything you want to remember..."
    );

    const photoLabel = document.createElement("div");
    photoLabel.className = "field-group";

    const photoHeading = document.createElement("label");
    photoHeading.textContent = "Add a photograph (optional)";

    const photo = document.createElement("input");
    photo.type = "file";
    photo.accept = "image/*";

    photoLabel.append(photoHeading, photo);

    const preview = document.createElement("img");
    preview.className = "scrapbook-preview";
    preview.alt = "Your selected scrapbook photograph";
    preview.hidden = true;

    let photoData = "";

    photo.addEventListener("change", () => {
      const file = photo.files && photo.files[0];

      if (!file) return;

      if (!file.type.startsWith("image/")) {
        alert("Please choose an image file.");
        photo.value = "";
        return;
      }

      if (file.size > 3000000) {
        alert("Please choose a photo smaller than 3 MB.");
        photo.value = "";
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        const image = new Image();

        image.onload = () => {
          // Resize the photo to help it fit in browser storage.
          const canvas = document.createElement("canvas");
          const maxSide = 900;

          let width = image.width;
          let height = image.height;

          if (width > height && width > maxSide) {
            height = Math.round(height * maxSide / width);
            width = maxSide;
          } else if (height > maxSide) {
            width = Math.round(width * maxSide / height);
            height = maxSide;
          }

          canvas.width = width;
          canvas.height = height;

          const context = canvas.getContext("2d");
          context.drawImage(image, 0, 0, width, height);

          photoData = canvas.toDataURL("image/jpeg", 0.72);
          preview.src = photoData;
          preview.hidden = false;
        };

        image.onerror = () => {
          alert("This photo could not be opened. Try another image.");
        };

        image.src = reader.result;
      };

      reader.readAsDataURL(file);
    });

    box.append(photoLabel, preview);

    addButton(box, "Save to My Little World ↗", () => {
      const text = entry.value.trim();
      const heading = pageTitle.value.trim() || "A little memory";

      if (!text && !photoData) {
        alert("Add a memory or photograph first.");
        return;
      }

      savePage(
        heading,
        "Memory type: " + memoryType.value + "\n\n" + text,
        { image: photoData || "" }
      );
    });

    const letter = section(
      "A letter to my future self",
      "Write something you hope your future self will remember."
    );

    const letterTitle = addInput(
      letter,
      "Letter title",
      "Dear future me..."
    );

    const letterText = addTextArea(
      letter,
      "Your letter",
      "I hope you remember..."
    );

    addButton(letter, "Save my letter ↗", () => {
      if (!letterText.value.trim()) {
        alert("Write a little something before saving.");
        return;
      }

      savePage(
        letterTitle.value.trim() || "Letter to my future self",
        letterText.value
      );
    });

    const timeline = section(
      "A little timeline",
      "Write down moments you want to remember from different stages of your life."
    );

    const year = addInput(timeline, "Year or date", "For example, 2026");
    const moment = addTextArea(
      timeline,
      "What happened?",
      "What would you like to remember about this time?"
    );

    addButton(timeline, "Save this timeline memory ↗", () => {
      if (!moment.value.trim()) {
        alert("Write something about this memory first.");
        return;
      }

      savePage(
        "Timeline — " + (year.value || "A memory"),
        moment.value
      );
    });

    content.append(box, letter, timeline);
  }

  /* =======================================================
     16. SHOW SAVED PAGES
     Displays saved work for the currently open feature.
     ======================================================= */

  renderSavedPages();

});
