
/* =========================================================
   TO THE ETHER — FEATURE JAVASCRIPT
   Controls all ten individual spaces.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const $ = id => document.getElementById(id);

  const params = new URLSearchParams(window.location.search);
  const feature = params.get("feature");

  const title = $("featureTitle");
  const description = $("featureDescription");
  const category = $("featureCategory");
  const content = $("featureContent");

  /* 01. FEATURE INFORMATION */
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
      intro: "Choose a comfortable breathing exercise. Stop whenever you feel uncomfortable.",
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
      intro: "Focus on energy, enjoyment, strength and rest. Every body deserves care.",
    },

    "daily-check-in": {
      title: "Daily Check-in",
      category: "CONNECT · 05",
      description: "A little conversation with yourself.",
      intro: "No long explanations needed. Just check in with yourself.",
    },

    "study-focus": {
      title: "Study & Focus",
      category: "LEARN · 06",
      description: "One small step at a time.",
      intro: "Create a study session that respects your attention and your need for breaks.",
    },

    "self-care": {
      title: "Self-care Corner",
      category: "CARE · 07",
      description: "Care is more than a routine.",
      intro: "Explore physical, emotional and everyday wellbeing.",
    },

    "stories-hope": {
      title: "Stories & Hope",
      category: "DISCOVER · 08",
      description: "Understand the world. Notice the change.",
      intro: "Learn about real challenges and the people and organisations working towards solutions.",
    },

    "career-exploration": {
      title: "Career Exploration",
      category: "DREAM · 09",
      description: "Your interests can lead in many directions.",
      intro: "Discover different career families and the education behind them.",
    },

    "my-little-world": {
      title: "My Little World",
      category: "REMEMBER · 10",
      description: "A collection of everything that makes you, you.",
      intro: "Keep memories, photographs, thoughts and letters in your own little corner.",
    }

  };

  /* 02. CHECK THE FEATURE NAME */
  if (!feature || !features[feature]) {
    title.textContent = "Space not found.";
    description.textContent = "Return home and choose one of the ten spaces.";
    category.textContent = "TO THE ETHER";
    content.innerHTML = '<a href="index.html" class="feature-action">Back to homepage ↗</a>';
    return;
  }

  const current = features[feature];

  document.title = current.title + " | To the Ether.";
  title.textContent = current.title;
  category.textContent = current.category;
  description.textContent = current.description;

  /* 03. COMMON SECTION BUILDER */
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

  /* 04. SAVE A CREATION */
  function savePage(pageTitle, pageContent) {
    try {
      const pages = JSON.parse(
        localStorage.getItem("etherSavedPages")
      ) || [];

      pages.push({
        id: Date.now(),
        title: pageTitle,
        content: pageContent,
        feature: feature,
        date: new Date().toISOString()
      });

      localStorage.setItem(
        "etherSavedPages",
        JSON.stringify(pages)
      );

      alert("Your creation has been saved!");
      renderSavedPages();

    } catch {
      alert("Your browser could not save this creation.");
    }
  }

  /* 05. JOURNAL FEATURES */
  function createJournal(prompts) {
    const box = section("Your journal", current.intro);

    const mood = addSelect(
      box,
      "Choose your mood",
      ["Choose one", "Happy", "Calm", "Excited", "Tired",
       "Worried", "Sad", "Frustrated", "Unsure", "Other"]
    );

    const fields = [];

    prompts.forEach((prompt, index) => {
      fields.push(
        addTextArea(box, (index + 1) + ". " + prompt)
      );
    });

    addButton(box, "Save my journal ↗", () => {
      const text = [
        "Mood: " + mood.value,
        ...prompts.map((p, i) => p + "\n" + fields[i].value)
      ].join("\n\n");

      if (!fields.some(field => field.value.trim())) {
        alert("Write something before saving.");
        return;
      }

      savePage(current.title, text);
    });

    content.appendChild(box);
  }

  /* 06. MOOD JOURNAL */
  if (feature === "mood-journal") {
    createJournal(current.prompts);
  }

  /* 07. GRATITUDE JOURNAL */
  else if (feature === "gratitude-journal") {
    createJournal(current.prompts);

    const extra = section("Make it yours", "You can decorate your journal entry with your own words and memories.");

    const font = addSelect(extra, "Choose a writing style", [
      "Simple", "Poetic", "Letter to myself", "Diary style"
    ]);

    addTextArea(extra, "A title for this page", "My little moments");

    content.appendChild(extra);
  }

  /* 08. BREATHING SPACE */
  else if (feature === "breathing-space") {

    const box = section(
      "Choose your breathing space",
      "Use a comfortable natural rhythm. Never force your breathing."
    );

    const exercises = [
      ["Gentle breathing", "Breathe in comfortably, then breathe out gently. Repeat at your own pace."],
      ["Box breathing", "If comfortable, breathe in for 4 counts, hold for 4, breathe out for 4, and pause for 4. Skip the holds if uncomfortable."],
      ["Longer exhale", "Breathe in gently, then let your exhale be a little longer, without straining."]
    ];

    const choice = addSelect(
      box,
      "Choose an exercise",
      exercises.map(item => item[0])
    );

    const explanation = document.createElement("p");
    explanation.className = "exercise-description";
    box.appendChild(explanation);

    const circle = document.createElement("div");
    circle.className = "breathing-circle";
    circle.textContent = "Breathe";

    box.appendChild(circle);

    let breathingTimer = null;
    let breathingStep = 0;

    const phases = [
      ["Breathe in gently", 4000],
      ["Breathe out gently", 5000]
    ];

    function startBreathing() {
      stopBreathing();
      breathingStep = 0;

      function nextPhase() {
        const phase = phases[breathingStep % phases.length];

        circle.textContent = phase[0];
        circle.classList.toggle(
          "breathing-in",
          breathingStep % 2 === 0
        );

        breathingStep++;

        breathingTimer = setTimeout(nextPhase, phase[1]);
      }

      nextPhase();
    }

    function stopBreathing() {
      clearTimeout(breathingTimer);
      breathingTimer = null;
      circle.textContent = "Paused";
      circle.classList.remove("breathing-in");
    }

    function updateExercise() {
      const selected = exercises.find(item => item[0] === choice.value);
      explanation.textContent = selected ? selected[1] : "";
    }

    choice.addEventListener("change", updateExercise);
    updateExercise();

    addButton(box, "Begin breathing", startBreathing);
    addButton(box, "Pause", stopBreathing);

    const sounds = section("Sounds for your space", "Choose silence or listen to natural sounds.");

    [
      ["Rain sounds", "https://www.youtube.com/results?search_query=rain+nature+sounds"],
      ["Forest sounds", "https://www.youtube.com/results?search_query=forest+birds+nature+sounds"],
      ["Ocean sounds", "https://www.youtube.com/results?search_query=ocean+waves+relaxing+sounds"]
    ].forEach(([name, url]) => {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener";
      link.className = "resource-button";
      link.textContent = name + " ↗";
      sounds.appendChild(link);
    });

    content.append(box, sounds);
  }

  /* 09. FITNESS AND WELLNESS */
  else if (feature === "fitness-wellness") {

    const box = section(
      "Your movement space",
      "There is no perfect routine. Choose activities you enjoy and give yourself rest when needed."
    );

    const activity = addSelect(box, "What would you like to do?", [
      "A gentle walk", "Running", "Cycling", "Stretching",
      "Yoga", "Dancing", "Outdoor games", "Rest day"
    ]);

    const duration = addSelect(box, "How much time do you have?", [
      "5 minutes", "10 minutes", "15 minutes",
      "20 minutes", "30 minutes", "Just resting"
    ]);

    const feeling = addSelect(box, "How do you feel afterwards?", [
      "Choose one", "Refreshed", "Relaxed", "Energised",
      "Tired", "No different"
    ]);

    addButton(box, "Save activity ↗", () => {
      savePage("Wellness activity",
        "Activity: " + activity.value +
        "\nTime: " + duration.value +
        "\nAfterwards: " + feeling.value
      );
    });

    const habits = section("Small habits", "Choose a habit you would like to practise.");

    [
      "Take a screen break",
      "Go outside for fresh air",
      "Drink water when thirsty",
      "Stretch after sitting",
      "Get enough rest",
      "Spend time doing something enjoyable"
    ].forEach(text => {
      const label = document.createElement("label");
      label.className = "check-line";

      const input = document.createElement("input");
      input.type = "checkbox";
      input.value = text;

      label.append(input, document.createTextNode(text));
      habits.appendChild(label);
    });

    addButton(habits, "Save my habits ↗", () => {
      const selected = [...habits.querySelectorAll("input:checked")]
        .map(input => input.value);

      savePage("My wellness habits", selected.join("\n") || "No habits selected.");
    });

    const running = section("Running inspiration", "Explore running communities and learn about building a comfortable running habit.");

    const strava = document.createElement("a");
    strava.href = "https://www.strava.com/";
    strava.target = "_blank";
    strava.rel = "noopener";
    strava.className = "resource-button";
    strava.textContent = "Explore Strava ↗";

    const yoga = document.createElement("a");
    yoga.href = "https://www.youtube.com/results?search_query=beginner+gentle+yoga";
    yoga.target = "_blank";
    yoga.rel = "noopener";
    yoga.className = "resource-button";
    yoga.textContent = "Beginner yoga classes ↗";

    running.append(strava, yoga);
    content.append(box, habits, running);
  }

  /* 10. DAILY CHECK-IN */
  else if (feature === "daily-check-in") {

    const box = section("How are you today?", current.intro);

    const mood = addSelect(box, "Today's mood", [
      "Choose one", "Good", "Okay", "Tired",
      "Excited", "Worried", "Confused", "Other"
    ]);

    const energy = addSelect(box, "How is your energy?", [
      "Choose one", "A little", "Somewhere in the middle", "Lots of energy"
    ]);

    const win = addTextArea(box, "One little win today");

    const thought = addTextArea(box, "Something on my mind");

    const next = addTextArea(box, "One small thing I want to do next");

    addButton(box, "Save my check-in ↗", () => {
      savePage("Daily check-in",
        "Mood: " + mood.value +
        "\nEnergy: " + energy.value +
        "\nLittle win: " + win.value +
        "\nOn my mind: " + thought.value +
        "\nNext step: " + next.value
      );
    });

    const game = section("A tiny reminder", "Choose a little reminder for today.");

    const reminders = [
      "Small steps still count.",
      "You are allowed to take breaks.",
      "You do not have to do everything today.",
      "Learning takes time.",
      "Your worth is not your grades."
    ];

    addButton(game, "Give me a reminder ✦", () => {
      game.querySelector(".reminder-result").textContent =
        reminders[Math.floor(Math.random() * reminders.length)];
    });

    const result = document.createElement("p");
    result.className = "reminder-result";
    game.appendChild(result);

    content.append(box, game);
  }

  /* 11. STUDY AND FOCUS */
  else if (feature === "study-focus") {

    const box = section("Your study session", "Choose a realistic task and work in a way that feels manageable.");

    const task = addTextArea(box, "What are you studying?", "Subject or chapter");

    const level = addSelect(box, "Choose your session", [
      "Beginner — 10 minutes",
      "Intermediate — 20 minutes",
      "Focused — 25 minutes"
    ]);

    const timerDisplay = document.createElement("h2");
    timerDisplay.className = "timer-display";
    timerDisplay.textContent = "10:00";
    box.appendChild(timerDisplay);

    let timer = null;
    let remaining = 600;

    function updateTimer() {
      const minutes = Math.floor(remaining / 60);
      const seconds = remaining % 60;

      timerDisplay.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
    }

    function setSession() {
      clearInterval(timer);

      remaining = level.selectedIndex === 0 ? 600 :
        level.selectedIndex === 1 ? 1200 : 1500;

      updateTimer();
    }

    function startTimer() {
      if (timer) return;

      timer = setInterval(() => {
        remaining--;
        updateTimer();

        if (remaining <= 0) {
          clearInterval(timer);
          timer = null;
          alert("Study session completed! Take a break.");
        }
      }, 1000);
    }

    function pauseTimer() {
      clearInterval(timer);
      timer = null;
    }

    level.addEventListener("change", setSession);

    addButton(box, "Start", startTimer);
    addButton(box, "Pause", pauseTimer);
    addButton(box, "Reset", () => {
      pauseTimer();
      setSession();
    });

    const breaks = section("Your rest matters too", "After your session, take a few minutes away from your screen.");

    [
      "Stretch gently",
      "Look outside",
      "Walk around",
      "Have a drink of water",
      "Sit quietly"
    ].forEach(text => {
      const p = document.createElement("p");
      p.textContent = "✦ " + text;
      breaks.appendChild(p);
    });

    const music = section("Your study atmosphere", "Choose music, nature sounds or silence.");

    [
      ["Spotify", "https://open.spotify.com/"],
      ["YouTube Music", "https://music.youtube.com/"],
      ["Apple Music", "https://music.apple.com/"],
      ["Nature sounds", "https://www.youtube.com/results?search_query=nature+sounds+study"],
      ["Quran recitation", "https://quran.com/"]
    ].forEach(([name, url]) => {
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "resource-button";
      a.textContent = name + " ↗";
      music.appendChild(a);
    });

    addButton(breaks, "Save study task ↗", () => {
      savePage("Study task", task.value || "My study session");
    });

    content.append(box, breaks, music);
  }

  /* 12. SELF-CARE CORNER */
  else if (feature === "self-care") {

    const box = section("Care for yourself", "Self-care can be simple. It can mean resting, asking for help or taking care of everyday needs.");

    const areas = [
      ["Physical care", [
        "Get enough sleep",
        "Eat regular meals",
        "Drink water",
        "Move in a way I enjoy"
      ]],
      ["Emotional care", [
        "Write down my thoughts",
        "Talk to someone I trust",
        "Take a quiet break",
        "Do something I enjoy"
      ]],
      ["Everyday care", [
        "Organise my surroundings",
        "Spend time outdoors",
        "Take a break from screens",
        "Make time for family or friends"
      ]]
    ];

    areas.forEach(([heading, items]) => {
      const group = section(heading);

      items.forEach(text => {
        const label = document.createElement("label");
        label.className = "check-line";

        const input = document.createElement("input");
        input.type = "checkbox";
        input.value = text;

        label.append(input, document.createTextNode(text));
        group.appendChild(label);
      });

      content.appendChild(group);
    });

    const extra = section("A note to myself");

    const note = addTextArea(extra, "What do I need today?");

    addButton(extra, "Save my self-care page ↗", () => {
      const checked = [...content.querySelectorAll("input:checked")]
        .map(item => item.value);

      savePage("Self-care page",
        checked.join("\n") + "\n\nMy note:\n" + note.value
      );
    });

    const support = section("Finding support", "If you are struggling, consider speaking with a trusted adult, school counsellor or healthcare professional.");

    const contact = document.createElement("a");
    contact.href = "https://www.mohfw.gov.in/";
    contact.target = "_blank";
    contact.rel = "noopener";
    contact.className = "resource-button";
    contact.textContent = "India health resources ↗";

    support.appendChild(contact);
    content.append(extra, support);
  }

  /* 13. STORIES AND HOPE */
  else if (feature === "stories-hope") {

    const box = section("Understand the world", "Real challenges deserve honest attention. Learn about the issues, the people affected and the work being done.");

    const stories = [
      {
        title: "Children in humanitarian crises",
        text: "Children affected by conflict and displacement need education, protection, healthcare and safe environments.",
        url: "https://www.unicef.org/emergencies"
      },
      {
        title: "Global health and healthcare access",
        text: "Access to essential healthcare remains unequal. Explore public health work and international responses.",
        url: "https://www.who.int/emergencies"
      },
      {
        title: "Education in emergencies",
        text: "Education can provide stability and opportunities for children affected by crises.",
        url: "https://www.unicef.org/education"
      },
      {
        title: "Humanitarian action",
        text: "Explore how humanitarian organisations provide emergency support and work with affected communities.",
        url: "https://www.unocha.org/"
      }
    ];

    stories.forEach(story => {
      const article = document.createElement("article");
      article.className = "story-card";

      const h = document.createElement("h3");
      h.textContent = story.title;

      const p = document.createElement("p");
      p.textContent = story.text;

      const a = document.createElement("a");
      a.href = story.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "resource-button";
      a.textContent = "Explore the source ↗";

      article.append(h, p, a);
      box.appendChild(article);
    });

    const reflection = section("Your reflection");
    const response = addTextArea(reflection, "What did you learn? What change would you like to see?");

    addButton(reflection, "Save reflection ↗", () => {
      savePage("Stories and hope reflection", response.value);
    });

    content.append(box, reflection);
  }

  /* 14. CAREER EXPLORATION */
  else if (feature === "career-exploration") {

    const box = section("Discover your interests", "This short quiz is a starting point, not a test or a fixed career decision.");

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
      ["What matters most in a career?", [
        "Helping people",
        "Stability",
        "Creativity",
        "Discovery",
        "Leadership",
        "Variety and travel"
      ]],
      ["Which subject do you enjoy?", [
        "Biology",
        "Social science",
        "Mathematics",
        "Languages",
        "Art",
        "Geography"
      ]]
    ];

    const answers = [];

    questions.forEach(([question, options], index) => {
      answers.push(addSelect(box, (index + 1) + ". " + question, [
        "Choose an answer", ...options
      ]));
    });

    const results = document.createElement("div");
    results.className = "career-results";
    box.appendChild(results);

    addButton(box, "Explore my interests ↗", () => {

      const selected = answers.map(a => a.value);

      if (selected.some(a => a === "Choose an answer")) {
        alert("Please answer all five questions first.");
        return;
      }

      const families = {
        "Science and healthcare": "Healthcare and medical sciences",
        "Helping communities": "Humanitarian and social development",
        "Art and creativity": "Creative and communication careers",
        "Nature and environment": "Environmental and conservation careers",
        "Technology and engineering": "Technology and engineering",
        "Business and leadership": "Business and management"
      };

      const family = families[selected[0]] || "Interdisciplinary careers";

      results.textContent =
        "Your first area to explore: " + family +
        ". Try researching specific job titles, qualifications, entrance exams and the work involved.";

      savePage("Career exploration results",
        "Interest area: " + family +
        "\nAnswers:\n" + selected.join("\n")
      );
    });

    const pathways = section("Career research library", "Explore these starting points. Requirements, duration and salaries vary by country and institution.");

    const careerLinks = [
      ["Medical careers", "https://neet.nta.nic.in/"],
      ["Study in India", "https://www.ncs.gov.in/"],
      ["International education", "https://www.studyinternational.com/"],
      ["United Nations careers", "https://careers.un.org/"]
    ];

    careerLinks.forEach(([name, url]) => {
      const a = document.createElement("a");
      a.href = url;
      a.target = "_blank";
      a.rel = "noopener";
      a.className = "resource-button";
      a.textContent = name + " ↗";
      pathways.appendChild(a);
    });

    const dreams = section("Dreams beyond a career", "Your future is not limited to a job title.");

    const dream = addTextArea(dreams, "What else would you like to experience in life?", "Places, causes, skills, adventures, people you want to help...");

    addButton(dreams, "Save my dreams ↗", () => {
      savePage("Dreams beyond career", dream.value);
    });

    content.append(box, pathways, dreams);
  }

  /* 15. MY LITTLE WORLD */
  else if (feature === "my-little-world") {

    const box = section("Your personal scrapbook", "Collect memories, thoughts, letters and moments. This prototype saves text locally in your browser.");

    const pageTitle = document.createElement("input");
    pageTitle.placeholder = "Give this memory a title";
    pageTitle.className = "feature-input";

    const entry = addTextArea(box, "Write your memory", "A moment, a letter, a thought or anything you want to remember...");

    const photoLabel = document.createElement("label");
    photoLabel.textContent = "Add a photograph (optional)";
    photoLabel.className = "field-group";

    const photo = document.createElement("input");
    photo.type = "file";
    photo.accept = "image/*";
    photoLabel.appendChild(photo);

    const preview = document.createElement("img");
    preview.className = "scrapbook-preview";
    preview.alt = "Your selected scrapbook photograph";
    preview.hidden = true;

    let photoData = "";

    photo.addEventListener("change", () => {
      const file = photo.files[0];

      if (!file) return;

      if (file.size > 1500000) {
        alert("Please choose a photo smaller than 1.5 MB.");
        photo.value = "";
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        photoData = reader.result;
        preview.src = photoData;
        preview.hidden = false;
      };

      reader.readAsDataURL(file);
    });

    box.append(pageTitle, photoLabel, preview);

    addButton(box, "Save to My Little World ↗", () => {
      const text = entry.value.trim();
      const heading = pageTitle.value.trim() || "A little memory";

      if (!text && !photoData) {
        alert("Add a memory or photograph first.");
        return;
      }

      savePage(
        heading,
        text + (photoData ? "\n\n[Photograph attached in this session]" : "")
      );

      if (photoData) {
        try {
          const photos = JSON.parse(
            localStorage.getItem("etherScrapbookPhotos")
          ) || [];

          photos.push({
            title: heading,
            image: photoData,
            date: new Date().toISOString()
          });

          localStorage.setItem(
            "etherScrapbookPhotos",
            JSON.stringify(photos)
          );
        } catch {
          alert("The photo could not be saved. Try a smaller image.");
        }
      }
    });

    const letter = section("A letter to my future self");
    const letterText = addTextArea(letter, "What would you like your future self to know?");

    addButton(letter, "Save my letter ↗", () => {
      savePage("Letter to my future self", letterText.value);
    });

    content.append(box, letter);
  }

  /* 16. SHARED SAVED PAGE LIBRARY */
  function renderSavedPages() {

    const container = $("featureSavedPages");
    if (!container) return;

    container.innerHTML = "";

    let pages = [];

    try {
      pages = JSON.parse(
        localStorage.getItem("etherSavedPages")
      ) || [];
    } catch {
      pages = [];
    }

    pages.filter(page => page.feature === feature)
      .slice(-5)
      .reverse()
      .forEach(page => {

        const item = document.createElement("article");
        item.className = "mini-saved-card";

        const h = document.createElement("h3");
        h.textContent = page.title;

        const p = document.createElement("p");
        p.textContent = page.content.slice(0, 150);

        item.append(h, p);
        container.appendChild(item);
      });

    if (!container.children.length) {
      const p = document.createElement("p");
      p.textContent = "Your saved pages will appear here.";
      container.appendChild(p);
    }
  }

  renderSavedPages();

});
