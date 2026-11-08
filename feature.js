
/* =========================================================
   TO THE ETHER — FEATURE PAGE JAVASCRIPT

   This file controls all ten individual feature spaces.
   It loads the correct tools, saves writing and displays
   the saved pages for the selected feature.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  // 01. SHORTCUTS AND SELECT THE FEATURE FROM THE URL
  const $ = id => document.getElementById(id);
  const params = new URLSearchParams(window.location.search);
  const feature = params.get("feature");

  // 02. FEATURE NAMES AND DESCRIPTIONS
  const features = {
    mood: ["UNDERSTAND", "Mood Journal", "A space to put your thoughts into words."],
    breathing: ["SLOW DOWN", "Breathing Space", "Pause, breathe and reconnect with the present."],
    gratitude: ["APPRECIATE", "Gratitude Journal", "Collect little moments worth remembering."],
    fitness: ["MOVE & FEEL", "Fitness & Wellness", "Explore movement and everyday wellbeing."],
    checkin: ["CONNECT", "Daily Check-in", "Celebrate little wins and small steps."],
    study: ["FOCUS", "Study & Focus", "Make studying feel calmer and more manageable."],
    selfcare: ["CARE", "Self-care Corner", "Small acts of care count."],
    stories: ["THE WORLD", "Stories & Reality", "Understand real-world issues and positive change."],
    career: ["DREAM", "Career Exploration", "Explore possibilities beyond what you already know."],
    world: ["YOUR WORLD", "My Little World", "Your memories, diary and scrapbook."]
  };

  // 03. CHECK THAT THE SELECTED FEATURE EXISTS
  if (!features[feature]) {
    window.location.replace("index.html#explore");
    return;
  }

  // 04. PUT THE CORRECT TITLE AND DESCRIPTION ON THE PAGE
  $("featureEyebrow").textContent = features[feature][0];
  $("featureTitle").textContent = features[feature][1];
  $("featureDescription").textContent = features[feature][2];
  document.title = features[feature][1] + " | To the Ether.";

  const content = $("featureContent");
  const savedContainer = $("featureSavedPages");

  // 05. SMALL HELPER TO CREATE A TOOL CARD
  function makeCard(title, description = "", fullWidth = false) {
    const card = document.createElement("section");
    card.className = "tool-card" + (fullWidth ? " full" : "");

    const heading = document.createElement("h2");
    heading.textContent = title;
    card.appendChild(heading);

    if (description) {
      const paragraph = document.createElement("p");
      paragraph.textContent = description;
      card.appendChild(paragraph);
    }

    content.appendChild(card);
    return card;
  }

  // 06. SMALL HELPER TO CREATE A BUTTON
  function makeButton(parent, text, action, secondary = false) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tool-button" + (secondary ? " secondary" : "");
    button.textContent = text;
    button.addEventListener("click", action);
    parent.appendChild(button);
    return button;
  }

  // 07. SMALL HELPER TO CREATE A TEXT AREA
  function makeTextArea(parent, placeholder, rows = 5) {
    const area = document.createElement("textarea");
    area.placeholder = placeholder;
    area.rows = rows;
    parent.appendChild(area);
    return area;
  }

  // 08. SMALL HELPER TO CREATE A TEXT INPUT
  function makeInput(parent, placeholder) {
    const input = document.createElement("input");
    input.type = "text";
    input.placeholder = placeholder;
    parent.appendChild(input);
    return input;
  }

  // 09. SAVE A PAGE TO LOCAL BROWSER STORAGE
  // Saved entries remain in this browser on this device.
  let pages = [];

  function loadPages() {
    try {
      pages = JSON.parse(localStorage.getItem("etherSavedPages")) || [];
    } catch {
      pages = [];
    }
  }

  function savePage(title, text) {
    if (!text.trim()) {
      alert("Write something before saving.");
      return;
    }

    const page = {
      id: Date.now() + Math.random(),
      feature,
      title: title.trim() || features[feature][1],
      content: text.trim(),
      date: new Date().toLocaleString()
    };

    pages.push(page);

    try {
      localStorage.setItem("etherSavedPages", JSON.stringify(pages));
      renderSaved();
      alert("Your page has been saved!");
    } catch {
      pages.pop();
      alert("Browser storage is full. Try removing some saved content.");
    }
  }

  // 10. DISPLAY SAVED PAGES FOR THIS FEATURE ONLY
  function renderSaved() {
    savedContainer.innerHTML = "";

    const currentPages = pages.filter(page => page.feature === feature);

    if (!currentPages.length) {
      const empty = document.createElement("p");
      empty.textContent = "Nothing saved here yet. Your creations will appear here.";
      savedContainer.appendChild(empty);
      return;
    }

    currentPages.slice().reverse().forEach(page => {
      const item = document.createElement("article");
      item.className = "saved-item";

      const heading = document.createElement("h3");
      heading.textContent = page.title;

      const text = document.createElement("p");
      text.textContent = page.content;

      const date = document.createElement("small");
      date.textContent = page.date;

      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "Delete";

      remove.addEventListener("click", () => {
        pages = pages.filter(savedPage => savedPage.id !== page.id);

        try {
          localStorage.setItem("etherSavedPages", JSON.stringify(pages));
          renderSaved();
        } catch {
          alert("Could not update your saved pages.");
        }
      });

      item.append(heading, text, date, remove);
      savedContainer.appendChild(item);
    });
  }

  loadPages();
  renderSaved();

  // 11. FEATURE PAGE BACKGROUND COLOUR PICKER
  const colourPicker = $("featureColour");
  const resetColour = $("resetColour");
  const defaultBackground = "#364333";
  const backgroundKey = "etherPageBackground_" + feature;

  const savedBackground = localStorage.getItem(backgroundKey);

  if (savedBackground && /^#[0-9a-f]{6}$/i.test(savedBackground)) {
    content.style.backgroundColor = savedBackground;
    colourPicker.value = savedBackground;
  }

  colourPicker.addEventListener("input", () => {
    content.style.backgroundColor = colourPicker.value;

    try {
      localStorage.setItem(backgroundKey, colourPicker.value);
    } catch {
      // Colour still changes for the current visit.
    }
  });

  resetColour.addEventListener("click", () => {
    content.style.backgroundColor = "";
    colourPicker.value = defaultBackground;
    localStorage.removeItem(backgroundKey);
  });

  // 12. MOOD JOURNAL
  function moodJournal() {
    const card = makeCard(
      "A little check-in with yourself",
      "You don't have to explain everything. Write whatever feels comfortable.",
      true
    );

    const ideas = [
      "What has been on my mind today?",
      "What is one thing I wish someone understood?",
      "What made today a little easier?",
      "What do I need more of right now?",
      "What would I tell a friend in my situation?"
    ];

    const select = document.createElement("select");
    ideas.forEach(idea => {
      const option = document.createElement("option");
      option.textContent = idea;
      option.value = idea;
      select.appendChild(option);
    });

    const area = makeTextArea(card, "Write freely here...");
    card.insertBefore(select, area);

    const title = makeInput(card, "Give this entry a title");
    makeButton(card, "Save my entry", () => {
      savePage(title.value || "Mood journal", select.value + "\n\n" + area.value);
    });

    const feelings = makeCard("Choose a word for today", "There is no right or wrong answer.");

    const words = ["Calm", "Happy", "Tired", "Unsure", "Hopeful", "Overwhelmed", "Curious", "Okay"];
    const result = document.createElement("p");
    result.className = "tool-result";

    const choices = document.createElement("div");
    choices.className = "choice-list";

    words.forEach(word => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = word;

      button.addEventListener("click", () => {
        result.textContent = "Today, I feel: " + word;
        choices.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
        button.classList.add("selected");
      });

      choices.appendChild(button);
    });

    feelings.append(choices, result);
  }

  // 13. BREATHING SPACE
  function breathingSpace() {
    const card = makeCard(
      "A gentle breathing guide",
      "This is optional. Breathe normally if following a pattern feels uncomfortable.",
      true
    );

    const circle = document.createElement("div");
    circle.className = "breath-circle";
    circle.textContent = "Ready?";
    card.appendChild(circle);

    const note = document.createElement("p");
    note.className = "breath-note";
    note.textContent = "Choose a comfortable exercise and stop whenever you want.";
    card.appendChild(note);

    const result = document.createElement("p");
    result.className = "tool-result";
    card.appendChild(result);

    let timer = null;
    let step = 0;
    let cycles = 0;
    let running = false;

    const patterns = {
      gentle: [
        ["Breathe in", 3, true],
        ["Breathe out", 4, false]
      ],
      steady: [
        ["Breathe in", 4, true],
        ["Breathe out", 4, false]
      ],
      box: [
        ["Breathe in", 4, true],
        ["Pause gently", 4, true],
        ["Breathe out", 4, false],
        ["Pause gently", 4, false]
      ]
    };

    const patternSelect = document.createElement("select");
    [
      ["gentle", "Gentle breathing"],
      ["steady", "Steady breathing"],
      ["box", "Box breathing"]
    ].forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      patternSelect.appendChild(option);
    });

    card.insertBefore(patternSelect, circle);

    function stopBreathing() {
      if (timer) clearInterval(timer);
      timer = null;
      running = false;
      circle.classList.remove("expand");
      circle.textContent = "Paused";
      note.textContent = "Take your time. You can stop here.";
    }

    function nextBreathStep() {
      const pattern = patterns[patternSelect.value];
      const current = pattern[step];

      note.textContent = current[0];
      circle.textContent = current[0];
      circle.classList.toggle("expand", current[2]);

      step++;

      if (step >= pattern.length) {
        step = 0;
        cycles++;

        if (cycles >= 5) {
          stopBreathing();
          result.textContent = "You completed five gentle cycles. Well done for taking a pause.";
        }
      }
    }

    makeButton(card, "Start", () => {
      if (running) return;
      running = true;
      step = 0;
      cycles = 0;
      result.textContent = "";
      nextBreathStep();
      timer = setInterval(nextBreathStep, 4000);
    });

    makeButton(card, "Pause", stopBreathing, true);

    const reflection = makeCard("After your pause", "How was that experience? You can skip this.");

    const reflectionArea = makeTextArea(reflection, "I noticed...");
    makeButton(reflection, "Save reflection", () => {
      savePage("Breathing reflection", reflectionArea.value);
    });

    const links = makeCard("Gentle movement and yoga", "Choose a class that feels comfortable. You can stop whenever you need.");

    const yogaLink = document.createElement("a");
    yogaLink.href = "https://www.youtube.com/results?search_query=beginner+gentle+yoga+class";
    yogaLink.target = "_blank";
    yogaLink.rel = "noopener";
    yogaLink.textContent = "Find beginner gentle yoga classes ↗";
    links.appendChild(yogaLink);

    const soundLink = document.createElement("a");
    soundLink.href = "https://www.youtube.com/results?search_query=nature+sounds+forest+rain";
    soundLink.target = "_blank";
    soundLink.rel = "noopener";
    soundLink.textContent = "Find nature sounds ↗";
    links.appendChild(document.createElement("br"));
    links.appendChild(soundLink);
  }

  // 14. GRATITUDE JOURNAL
  function gratitudeJournal() {
    const card = makeCard(
      "Little things worth keeping",
      "Gratitude does not mean pretending everything is perfect.",
      true
    );

    const prompts = [
      "Something small that made me smile",
      "A person who helped me",
      "Something I learned",
      "A moment I want to remember",
      "Something I appreciate about my surroundings"
    ];

    const select = document.createElement("select");
    prompts.forEach(prompt => {
      const option = document.createElement("option");
      option.value = prompt;
      option.textContent = prompt;
      select.appendChild(option);
    });

    const title = makeInput(card, "Entry title");
    const area = makeTextArea(card, "Write your little moment...");
    card.insertBefore(select, title);

    makeButton(card, "Save gratitude page", () => {
      savePage(title.value || "Gratitude journal", select.value + "\n\n" + area.value);
    });
  }

  // 15. FITNESS AND WELLNESS
  function fitnessWellness() {
    const card = makeCard(
      "Movement without pressure",
      "Movement can be a walk, a stretch, a cycle or simply taking a break from your screen.",
      true
    );

    const activities = [
      "Take a comfortable walk",
      "Stretch gently",
      "Cycle at a comfortable pace",
      "Take a screen break",
      "Play a favourite outdoor game",
      "Rest and recharge"
    ];

    const choices = document.createElement("div");
    choices.className = "choice-list";

    const result = document.createElement("p");
    result.className = "tool-result";

    activities.forEach(activity => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = activity;

      button.addEventListener("click", () => {
        result.textContent = "Today's idea: " + activity;
      });

      choices.appendChild(button);
    });

    card.append(choices, result);

    const journal = makeCard("My movement notes", "Record what you tried or how you felt afterwards.");
    const area = makeTextArea(journal, "Today I...");
    makeButton(journal, "Save my notes", () => {
      savePage("Fitness and wellness notes", area.value);
    });

    const links = makeCard("Running and activity links");
    const strava = document.createElement("a");
    strava.href = "https://www.strava.com/";
    strava.target = "_blank";
    strava.rel = "noopener";
    strava.textContent = "Visit Strava ↗";
    links.appendChild(strava);

    const note = document.createElement("p");
    note.textContent = "This is an external link only. A real Strava account connection would require an approved API integration.";
    links.appendChild(note);
  }

  // 16. DAILY CHECK-IN
  function dailyCheckin() {
    const card = makeCard(
      "How is today going?",
      "Choose anything you feel comfortable sharing."
    );

    const questions = [
      ["What is one little win today?", "A small win counts too."],
      ["What would make today easier?", "It can be something very simple."],
      ["What do you want to remember?", "A moment, thought or conversation."]
    ];

    const answers = [];

    questions.forEach(([question, hint], index) => {
      const label = document.createElement("label");
      label.textContent = question;

      const area = makeTextArea(card, hint, 3);
      card.appendChild(label);
      card.appendChild(area);
      answers.push(area);
    });

    makeButton(card, "Save my check-in", () => {
      const text = questions.map((q, i) => q[0] + "\n" + answers[i].value).join("\n\n");
      savePage("Daily check-in", text);
    });

    const fun = makeCard("A tiny idea wheel", "Press the button for a gentle idea.");

    const ideas = [
      "Drink some water.",
      "Look outside for a minute.",
      "Organise one small thing.",
      "Message someone you trust.",
      "Take a quiet break.",
      "Write down one thought."
    ];

    const output = document.createElement("p");
    output.className = "tool-result";
    fun.appendChild(output);

    makeButton(fun, "Give me an idea ✨", () => {
      output.textContent = ideas[Math.floor(Math.random() * ideas.length)];
    });
  }

  // 17. STUDY AND FOCUS
  function studyFocus() {
    const card = makeCard(
      "A little focus session",
      "Try a short study period followed by a proper break."
    );

    const duration = document.createElement("select");

    [
      ["10", "10 minutes"],
      ["15", "15 minutes"],
      ["20", "20 minutes"],
      ["25", "25 minutes"]
    ].forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      duration.appendChild(option);
    });

    card.appendChild(duration);

    const display = document.createElement("div");
    display.className = "timer-display";
    display.textContent = "10:00";
    card.appendChild(display);

    const status = document.createElement("p");
    status.className = "tool-result";
    card.appendChild(status);

    let remaining = 600;
    let timer = null;
    let isBreak = false;

    function showTime() {
      const minutes = Math.floor(remaining / 60);
      const seconds = remaining % 60;
      display.textContent =
        String(minutes).padStart(2, "0") + ":" +
        String(seconds).padStart(2, "0");
    }

    function stopTimer() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    function startTimer() {
      if (timer) return;

      timer = setInterval(() => {
        remaining--;
        showTime();

        if (remaining <= 0) {
          stopTimer();

          if (!isBreak) {
            isBreak = true;
            remaining = 300;
            status.textContent = "Study session complete. Your five-minute rest is ready.";
            showTime();
          } else {
            status.textContent = "Break complete. You can start another session whenever you want.";
            isBreak = false;
            remaining = Number(duration.value) * 60;
            showTime();
          }
        }
      }, 1000);
    }

    function resetTimer() {
      stopTimer();
      isBreak = false;
      remaining = Number(duration.value) * 60;
      status.textContent = "Timer reset.";
      showTime();
    }

    duration.addEventListener("change", resetTimer);

    makeButton(card, "Start", startTimer);
    makeButton(card, "Pause", stopTimer, true);
    makeButton(card, "Reset", resetTimer, true);

    const music = makeCard("Choose your study atmosphere");

    const musicLinks = [
      ["Nature sounds", "https://www.youtube.com/results?search_query=nature+sounds+study"],
      ["Spotify", "https://open.spotify.com/"],
      ["YouTube Music", "https://music.youtube.com/"],
      ["Apple Music", "https://music.apple.com/"],
      ["Quran recitation", "https://www.youtube.com/results?search_query=quran+recitation"]
    ];

    musicLinks.forEach(([label, url]) => {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = label + " ↗";
      link.style.display = "block";
      link.style.margin = "10px 0";
      music.appendChild(link);
    });

    const plan = makeCard("My small study plan");
    const area = makeTextArea(plan, "What would you like to work on?");
    makeButton(plan, "Save study plan", () => {
      savePage("Study plan", area.value);
    });
  }

  // 18. SELF-CARE CORNER
  function selfCare() {
    const card = makeCard(
      "Everyday care",
      "Choose what is useful for you. You do not need to complete every item."
    );

    const habits = [
      "Take a comfortable rest",
      "Have a regular meal",
      "Drink water",
      "Spend a little time away from screens",
      "Talk to someone I trust",
      "Make time for something I enjoy"
    ];

    const checklist = document.createElement("div");

    habits.forEach(habit => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.style.width = "auto";
      checkbox.style.marginRight = "10px";

      label.append(checkbox, document.createTextNode(habit));
      checklist.appendChild(label);
    });

    card.appendChild(checklist);

    const journal = makeCard("A note to myself");
    const area = makeTextArea(journal, "What kind thing would I like to remind myself?");
    makeButton(journal, "Save my note", () => {
      savePage("Self-care note", area.value);
    });

    const cycle = makeCard(
      "Optional cycle notes",
      "You can privately record dates or general notes if this is useful to you. This is not a medical tracker or a diagnosis."
    );

    const dateLabel = document.createElement("label");
    dateLabel.textContent = "Date";
    const dateInput = document.createElement("input");
    dateInput.type = "date";
    cycle.append(dateLabel, dateInput);

    const cycleNotes = makeTextArea(cycle, "Optional notes...");
    makeButton(cycle, "Save private note", () => {
      savePage("Personal cycle note", dateInput.value + "\n" + cycleNotes.value);
    });

    const support = makeCard(
      "When you need more support",
      "If something is worrying you, consider talking to a trusted adult, school counsellor or qualified health professional."
    );

    const text = document.createElement("p");
    text.textContent = "This website is not a counselling or emergency service. If you feel unsafe or need urgent help, contact a trusted adult or local emergency service.";
    support.appendChild(text);
  }

  // 19. STORIES AND REALITY
  function storiesReality() {
    const stories = [
      {
        title: "Education for every child",
        description: "Learn about barriers to education, school access and programmes supporting children's learning.",
        link: "https://www.unicef.org/education",
        label: "UNICEF education information"
      },
      {
        title: "Humanitarian support",
        description: "Explore how humanitarian organisations coordinate assistance during emergencies.",
        link: "https://www.unocha.org/",
        label: "United Nations OCHA"
      },
      {
        title: "Global health",
        description: "Read about public health challenges, healthcare access and international health work.",
        link: "https://www.who.int/",
        label: "World Health Organization"
      },
      {
        title: "Refugees and displacement",
        description: "Understand why people are forced to leave home and how protection and support work.",
        link: "https://www.unhcr.org/",
        label: "UN Refugee Agency"
      }
    ];

    stories.forEach(story => {
      const card = makeCard(story.title, story.description);

      const link = document.createElement("a");
      link.href = story.link;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = story.label + " ↗";
      card.appendChild(link);
    });

    const reflection = makeCard(
      "What did I learn?",
      "Write a thought, question or action you want to remember.",
      true
    );

    const area = makeTextArea(reflection, "Today I learned...");
    makeButton(reflection, "Save reflection", () => {
      savePage("Stories and reality reflection", area.value);
    });
  }

  // 20. CAREER EXPLORATION QUIZ
  function careerExploration() {
    const card = makeCard(
      "Discover what interests you",
      "This short quiz gives starting points, not fixed answers about your future.",
      true
    );

    const questions = [
      {
        question: "Which kind of activity interests you most?",
        answers: [
          ["help", "Helping people"],
          ["science", "Understanding science"],
          ["create", "Creating or designing"],
          ["lead", "Organising and leading"],
          ["discover", "Researching and discovering"]
        ]
      },
      {
        question: "Which environment sounds interesting?",
        answers: [
          ["help", "Hospitals or communities"],
          ["science", "Laboratories or research centres"],
          ["create", "Studios or creative spaces"],
          ["lead", "Organisations or institutions"],
          ["discover", "Fieldwork or universities"]
        ]
      },
      {
        question: "What would you like your work to contribute?",
        answers: [
          ["help", "Better health and wellbeing"],
          ["science", "New knowledge and discoveries"],
          ["create", "Useful ideas and designs"],
          ["lead", "Positive change in society"],
          ["discover", "Understanding difficult questions"]
        ]
      }
    ];

    const selected = [];

    questions.forEach((question, index) => {
      const block = document.createElement("div");
      block.className = "career-question";

      const heading = document.createElement("h3");
      heading.textContent = (index + 1) + ". " + question.question;
      block.appendChild(heading);

      question.answers.forEach(([value, label]) => {
        const labelElement = document.createElement("label");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "careerQuestion" + index;
        radio.value = value;

        radio.addEventListener("change", () => {
          selected[index] = value;
        });

        labelElement.append(radio, document.createTextNode(" " + label));
        block.appendChild(labelElement);
      });

      card.appendChild(block);
    });

    const result = document.createElement("p");
    result.className = "tool-result";
    card.appendChild(result);

    makeButton(card, "Show my interest areas", () => {
      if (selected.length !== questions.length || selected.some(item => !item)) {
        result.textContent = "Please choose one answer for each question first.";
        return;
      }

      const counts = {};
      selected.forEach(value => {
        counts[value] = (counts[value] || 0) + 1;
      });

      const top = Object.keys(counts).sort((a, b) => counts[b] - counts[a])[0];

      const careerIdeas = {
        help: "Explore roles such as doctor, nurse, physiotherapist, public health worker, social worker and humanitarian programme officer.",
        science: "Explore roles such as biomedical researcher, biotechnologist, laboratory scientist, environmental scientist and medical researcher.",
        create: "Explore roles such as architect, graphic designer, product designer, animator and user-experience designer.",
        lead: "Explore roles such as teacher, project manager, public administrator, lawyer and community programme coordinator.",
        discover: "Explore roles such as researcher, archaeologist, data analyst, historian, psychologist and environmental researcher."
      };

      result.textContent =
        "An area you may enjoy exploring: " + top.toUpperCase() +
        "\n\nSome possible careers:\n" + careerIdeas[top] +
        "\n\nThese are ideas to research, not a decision about your future.";
    });

    const pathway = makeCard(
      "Research a career pathway",
      "Use these trusted starting points to check courses, exams and career information."
    );

    const links = [
      ["National Career Service — India", "https://www.ncs.gov.in/"],
      ["National Testing Agency — exam information", "https://nta.ac.in/"],
      ["Study in India", "https://studyinindia.gov.in/"],
      ["U.S. Bureau of Labor Statistics — career information", "https://www.bls.gov/ooh/"]
    ];

    links.forEach(([label, url]) => {
      const link = document.createElement("a");
      link.href = url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = label + " ↗";
      link.style.display = "block";
      link.style.margin = "10px 0";
      pathway.appendChild(link);
    });

    const dreams = makeCard("Dreams beyond a career", "Your life can hold many ambitions, not just a job.");
    const area = makeTextArea(dreams, "Places I want to see, things I want to learn, people I want to help...");
    makeButton(dreams, "Save my dreams", () => {
      savePage("Dreams beyond a career", area.value);
    });
  }

  // 21. MY LITTLE WORLD — DIARY AND SCRAPBOOK
  function myLittleWorld() {
    const card = makeCard(
      "A page from my world",
      "Write a memory, a letter to your future self or anything you want to keep.",
      true
    );

    const title = makeInput(card, "Give your page a title");
    const area = makeTextArea(card, "Dear diary...");
    makeButton(card, "Save my diary page", () => {
      savePage(title.value || "My little world", area.value);
    });

    const photoCard = makeCard(
      "Add a memory photo",
      "Choose an image from your own device. The preview is temporary; this demo does not upload it to a server."
    );

    const photoInput = document.createElement("input");
    photoInput.type = "file";
    photoInput.accept = "image/*";
    photoCard.appendChild(photoInput);

    const preview = document.createElement("img");
    preview.className = "image-preview";
    preview.alt = "Your selected photo preview";
    preview.hidden = true;
    photoCard.appendChild(preview);

    const photoNote = document.createElement("p");
    photoNote.className = "tool-result";
    photoCard.appendChild(photoNote);

    let selectedPhoto = "";

    photoInput.addEventListener("change", () => {
      const file = photoInput.files && photoInput.files[0];

      if (!file) return;

      if (!file.type.startsWith("image/")) {
        photoNote.textContent = "Please choose an image file.";
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        photoNote.textContent = "Please choose an image smaller than 2 MB for this demo.";
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        selectedPhoto = reader.result;
        preview.src = selectedPhoto;
        preview.hidden = false;
        photoNote.textContent = "Photo preview ready.";
      };

      reader.onerror = () => {
        photoNote.textContent = "The photo could not be opened.";
      };

      reader.readAsDataURL(file);
    });

    makeButton(photoCard, "Save photo as a memory", () => {
      if (!selectedPhoto) {
        photoNote.textContent = "Choose a photo first.";
        return;
      }

      // Save a small photo record separately from the journal text.
      let photos = [];

      try {
        photos = JSON.parse(localStorage.getItem("etherPhotos")) || [];
      } catch {
        photos = [];
      }

      photos.push({
        id: Date.now() + Math.random(),
        image: selectedPhoto,
        date: new Date().toLocaleString()
      });

      try {
        localStorage.setItem("etherPhotos", JSON.stringify(photos));
        photoNote.textContent = "Your photo was saved in this browser.";
      } catch {
        photos.pop();
        photoNote.textContent = "Browser storage is full. Try a smaller photo.";
      }
    });

    const gallery = makeCard("My saved photos", "Photos saved in this browser on this device.", true);

    let photos = [];

    try {
      photos = JSON.parse(localStorage.getItem("etherPhotos")) || [];
    } catch {
      photos = [];
    }

    if (!photos.length) {
      const empty = document.createElement("p");
      empty.textContent = "Your photo memories will appear here.";
      gallery.appendChild(empty);
    } else {
      photos.slice().reverse().forEach(photo => {
        const wrapper = document.createElement("div");
        wrapper.className = "memory-card";

        const image = document.createElement("img");
        image.src = photo.image;
        image.alt = "Saved memory";

        const date = document.createElement("p");
        date.textContent = photo.date;

        wrapper.append(image, date);
        gallery.appendChild(wrapper);
      });
    }

    const letter = makeCard("A letter to my future self");
    const letterArea = makeTextArea(letter, "Dear future me...");
    makeButton(letter, "Save my letter", () => {
      savePage("A letter to my future self", letterArea.value);
    });
  }

  // 22. LOAD THE CORRECT FEATURE TOOLS
  // Each feature name calls only its own function.
  const featureLoaders = {
    mood: moodJournal,
    breathing: breathingSpace,
    gratitude: gratitudeJournal,
    fitness: fitnessWellness,
    checkin: dailyCheckin,
    study: studyFocus,
    selfcare: selfCare,
    stories: storiesReality,
    career: careerExploration,
    world: myLittleWorld
  };

  featureLoaders[feature]();
});
