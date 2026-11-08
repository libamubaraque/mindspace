
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(location.search);
  const feature = params.get("feature") || "mood";
  const title = document.getElementById("featureTitle");
  const eyebrow = document.getElementById("featureEyebrow");
  const description = document.getElementById("featureDescription");
  const content = document.getElementById("featureContent");
  const savedContainer = document.getElementById("featureSavedPages");

  const names = {
    mood: ["UNDERSTAND YOURSELF", "Mood Journal", "A place to put your thoughts into words."],
    breathing: ["SLOW DOWN", "Breathing Space", "Pause for a moment. There is no rush."],
    gratitude: ["NOTICE THE LITTLE THINGS", "Gratitude Journal", "Collect moments you want to remember."],
    fitness: ["MOVE & FEEL", "Fitness & Wellness", "Movement is about wellbeing, not perfection."],
    checkin: ["A MOMENT FOR YOURSELF", "Daily Check-in", "How are things going today?"],
    study: ["MAKE SPACE TO FOCUS", "Study & Focus", "One small step at a time."],
    selfcare: ["CARE FOR YOURSELF", "Self-care Corner", "Small acts of care count."],
    stories: ["LEARN & UNDERSTAND", "Stories & Reality", "Understand the world and the people in it."],
    career: ["EXPLORE YOUR POSSIBILITIES", "Career Exploration", "Your interests can lead to many different paths."],
    world: ["A WORLD OF YOUR OWN", "My Little World", "A collection of memories, thoughts and moments."]
  };

  const current = names[feature] || names.mood;

  eyebrow.textContent = current[0];
  title.textContent = current[1];
  description.textContent = current[2];
  document.title = current[1] + " | To the Ether.";

  const css = document.createElement("style");
  css.textContent = `
    .feature-main { padding:65px 8%; max-width:1250px; margin:auto; }
    .feature-top { padding:35px 0 45px; }
    .feature-top h1 { font:500 clamp(45px,7vw,75px) var(--serif); margin:15px 0; }
    .feature-top p { color:var(--muted); font-size:14px; }
    .feature-content { display:grid; grid-template-columns:1fr 1fr; gap:22px; }
    .tool-card { padding:28px; background:#242d23; border:1px solid var(--border); border-radius:8px; min-width:0; }
    .tool-card h2 { font:500 34px var(--serif); margin-bottom:12px; color:var(--cream); }
    .tool-card p { font-size:13px; color:var(--muted); }
    .tool-card.full { grid-column:1/-1; }
    .tool-card label { display:block; color:var(--champagne); font-size:12px; margin:15px 0 7px; }
    .tool-card input:not([type=file]):not([type=checkbox]), .tool-card textarea, .tool-card select {
      width:100%; padding:13px; border:1px solid var(--border); border-radius:4px;
      background:#171b15; color:var(--cream); outline:none; margin-bottom:8px;
    }
    .tool-card textarea { min-height:115px; resize:vertical; }
    .tool-card input:focus,.tool-card textarea:focus { border-color:var(--champagne); }
    .tool-button { display:inline-block; border:1px solid var(--champagne); padding:10px 17px; margin:8px 5px 5px 0; background:var(--champagne); color:#171b15; border-radius:4px; font-size:12px; font-weight:600; }
    .tool-button.secondary { background:transparent; color:var(--champagne); }
    .tool-result { color:var(--champagne); font-size:13px; margin-top:12px; white-space:pre-wrap; }
    .choice-list { display:flex; flex-wrap:wrap; gap:9px; margin-top:15px; }
    .choice-list button { border:1px solid var(--border); background:#303b2b; color:var(--cream); padding:10px 15px; border-radius:30px; }
    .choice-list button.selected { background:var(--champagne); color:#171b15; }
    .breath-circle { width:160px; height:160px; border-radius:50%; background:radial-gradient(circle,#a5ad83,#40523b); margin:25px auto; display:grid; place-items:center; color:#171b15; font:27px var(--serif); transition:transform 4s ease-in-out; }
    .breath-circle.expand { transform:scale(1.35); }
    .timer-display { font:60px var(--serif); color:var(--champagne); text-align:center; margin:15px; }
    .save-section { margin-top:80px; padding-top:40px; border-top:1px solid var(--border); }
    .save-section h2 { font:40px var(--serif); margin:10px 0; }
    .save-section > div > p { color:var(--muted); font-size:12px; }
    .career-question { padding:20px 0; border-bottom:1px solid var(--border); }
    .career-question h3 { font:24px var(--serif); }
    .career-question label { display:inline-block; margin:10px 12px 0 0; color:var(--cream); }
    .career-question input { accent-color:var(--champagne); }
    .image-preview { width:100%; max-height:260px; object-fit:contain; margin-top:15px; }
    .memory-card { padding:15px; background:#303b2b; border-radius:5px; margin:12px 0; }
    .memory-card img { max-width:100%; max-height:250px; object-fit:contain; display:block; margin-top:10px; }
    .breath-note { text-align:center; color:var(--muted); font-size:12px; }
    .tool-card a { color:var(--champagne); text-decoration:underline; }
    .feature-page footer { margin-top:50px; }
    .background-settings { margin-bottom:25px; color:var(--muted); font-size:12px; }
    .background-settings input { vertical-align:middle; }
    @media(max-width:700px) {
      .feature-main { padding:35px 6%; }
      .feature-content { grid-template-columns:1fr; }
      .tool-card.full { grid-column:auto; }
    }
  `;
  document.head.appendChild(css);

  let savedPages = [];

  try {
    savedPages = JSON.parse(localStorage.getItem("etherSavedPages")) || [];
  } catch {
    savedPages = [];
  }

  function savePage(pageTitle, pageContent) {
    if (!pageContent.trim()) {
      alert("Write something before saving your page.");
      return;
    }

    savedPages.push({
      id: Date.now(),
      feature,
      title: pageTitle,
      content: pageContent,
      date: new Date().toLocaleString()
    });

    try {
      localStorage.setItem("etherSavedPages", JSON.stringify(savedPages));
      alert("Your page has been saved!");
      renderSaved();
    } catch {
      alert("Browser storage is full. Try removing some saved photos or pages.");
    }
  }

  function renderSaved() {
    savedContainer.innerHTML = "";

    const pages = savedPages.filter(page => page.feature === feature);

    if (!pages.length) {
      savedContainer.innerHTML = "<p>No saved pages in this space yet.</p>";
      return;
    }

    pages.slice().reverse().forEach(page => {
      const item = document.createElement("article");
      item.className = "saved-item";

      const heading = document.createElement("h3");
      heading.textContent = page.title;

      const text = document.createElement("p");
      text.textContent = page.content;

      const date = document.createElement("small");
      date.textContent = page.date;

      const remove = document.createElement("button");
      remove.textContent = "Delete";
      remove.onclick = () => {
        savedPages = savedPages.filter(p => p.id !== page.id);
        localStorage.setItem("etherSavedPages", JSON.stringify(savedPages));
        renderSaved();
      };

      item.append(heading, text, date, remove);
      savedContainer.appendChild(item);
    });
  }

  function card(heading, text, full = false) {
    const element = document.createElement("section");
    element.className = "tool-card" + (full ? " full" : "");
    element.innerHTML = `<h2>${heading}</h2><p>${text}</p>`;
    content.appendChild(element);
    return element;
  }

  function addSaveBox(parent, label = "Save your page") {
    const input = document.createElement("input");
    input.placeholder = "Give this page a title";

    const button = document.createElement("button");
    button.className = "tool-button";
    button.textContent = label;

    button.onclick = () => {
      const textareas = parent.querySelectorAll("textarea");
      const values = [...textareas].map(t => t.value).filter(Boolean);
      const text = values.join("\n\n");

      if (!text) {
        alert("Add something to your page first.");
        return;
      }

      savePage(input.value.trim() || current[1], text);
    };

    parent.append(input, button);
  }

  function createJournal(heading, intro, prompts) {
    const box = card(heading, intro, true);

    prompts.forEach((prompt, index) => {
      const label = document.createElement("label");
      label.textContent = prompt;

      const textarea = document.createElement("textarea");
      textarea.placeholder = "Write freely. There are no perfect answers.";
      textarea.id = "journal" + index;

      box.append(label, textarea);
    });

    addSaveBox(box);
  }

  function makeButton(parent, text, callback) {
    const button = document.createElement("button");
    button.className = "tool-button";
    button.textContent = text;
    button.addEventListener("click", callback);
    parent.appendChild(button);
    return button;
  }

  // 01 - MOOD JOURNAL
  function mood() {
    const box = card("How are you feeling?", "Choose whatever feels closest. You can always skip this.");

    const moods = ["Happy ☀", "Calm ☁", "Tired ◌", "Anxious ♡", "Frustrated ✧", "Unsure ☾", "Something else"];

    const choices = document.createElement("div");
    choices.className = "choice-list";

    let selected = "";

    moods.forEach(m => {
      const button = document.createElement("button");
      button.textContent = m;

      button.onclick = () => {
        selected = m;
        choices.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
        button.classList.add("selected");
      };

      choices.appendChild(button);
    });

    box.appendChild(choices);

    createJournal("A little reflection", "You can write as much or as little as you want.", [
      "What has been on my mind?",
      "What happened today?",
      "What would help me right now?",
      "Something I want to tell myself:"
    ]);

    const journalBox = content.lastElementChild;
    const save = journalBox.querySelector(".tool-button");

    save.onclick = () => {
      const answers = [...journalBox.querySelectorAll("textarea")].map(t => t.value).filter(Boolean);
      savePage("Mood Journal - " + (selected || "My reflection"), "Mood: " + (selected || "Not selected") + "\n\n" + answers.join("\n\n"));
    };
  }

  // 02 - BREATHING SPACE
  function breathing() {
    const guide = card("Guided breathing", "Choose a comfortable pattern. Breathe naturally and stop if you feel uncomfortable.");

    const patterns = {
      gentle: { name: "Gentle breathing", phases: [["Breathe in", 3], ["Breathe out", 4]] },
      balanced: { name: "Balanced breathing", phases: [["Breathe in", 4], ["Breathe out", 4]] },
      calming: { name: "Longer exhale", phases: [["Breathe in", 3], ["Breathe out", 5]] }
    };

    const select = document.createElement("select");
    select.innerHTML = `
      <option value="gentle">Gentle breathing</option>
      <option value="balanced">Balanced breathing</option>
      <option value="calming">Longer exhale</option>
    `;

    const circle = document.createElement("div");
    circle.className = "breath-circle";
    circle.textContent = "Ready";

    const status = document.createElement("p");
    status.className = "breath-note";
    status.textContent = "Choose a pattern and start whenever you're ready.";

    const start = makeButton(guide, "Begin", () => {
      if (breathInterval) clearInterval(breathInterval);

      const pattern = patterns[select.value];
      let phaseIndex = 0;
      let remaining = pattern.phases[0][1];

      function showPhase() {
        const phase = pattern.phases[phaseIndex];
        status.textContent = phase[0] + " · " + remaining + " seconds";
        circle.textContent = phase[0];
        circle.classList.toggle("expand", phaseIndex === 0);
      }

      showPhase();

      breathInterval = setInterval(() => {
        remaining--;

        if (remaining <= 0) {
          phaseIndex = (phaseIndex + 1) % pattern.phases.length;
          remaining = pattern.phases[phaseIndex][1];
        }

        showPhase();
      }, 1000);
    });

    let breathInterval = null;

    makeButton(guide, "Pause", () => {
      clearInterval(breathInterval);
      status.textContent = "Paused. Take your time.";
      circle.classList.remove("expand");
      circle.textContent = "Pause";
    });

    guide.append(select, circle, status);

    const ideas = card("Find another way to unwind", "Different activities work for different people.", true);
    ideas.innerHTML += `
      <div class="resource-links">
        <a href="https://www.youtube.com/results?search_query=beginner+gentle+yoga+class" target="_blank" rel="noopener">Beginner gentle yoga ↗</a>
        <a href="https://www.youtube.com/results?search_query=beginner+stretching+routine" target="_blank" rel="noopener">Gentle stretching ↗</a>
        <a href="https://www.youtube.com/results?search_query=guided+meditation+for+students" target="_blank" rel="noopener">Guided meditation ↗</a>
        <a href="https://www.youtube.com/results?search_query=nature+sounds+rain+forest" target="_blank" rel="noopener">Nature sounds ↗</a>
      </div>
      <label>After your session, how do you feel?</label>
      <textarea placeholder="A few words about your experience..."></textarea>
    `;
    addSaveBox(ideas);
  }

  // 03 - GRATITUDE JOURNAL
  function gratitude() {
    createJournal("Today's little things", "You don't need a perfect day to notice something meaningful.", [
      "Three things I appreciated today:",
      "Someone who made my day better:",
      "A moment I want to remember:",
      "Something good I did for myself:",
      "A hope for tomorrow:"
    ]);

    const ideas = card("Choose a writing mood", "Give your journal a theme.");
    const themes = ["Quiet morning", "Little joys", "A grateful heart", "Memories", "New beginnings"];

    const buttons = document.createElement("div");
    buttons.className = "choice-list";

    themes.forEach(theme => {
      makeButton(buttons, theme, () => {
        const input = content.querySelector(".tool-card input");
        if (input) input.value = theme;
      });
    });

    ideas.appendChild(buttons);
  }

  // 04 - FITNESS & WELLNESS
  function fitness() {
    const movement = card("Move in your own way", "Movement can support your mood, energy and general wellbeing. Choose something comfortable.");

    const options = [
      "A short walk",
      "A relaxed cycle",
      "A gentle stretch",
      "A fun dance",
      "A beginner yoga session",
      "A run or jog if comfortable",
      "A rest day"
    ];

    const choices = document.createElement("div");
    choices.className = "choice-list";

    options.forEach(option => {
      makeButton(choices, option, () => {
        movement.querySelector(".tool-result").textContent = "Today's idea: " + option;
      });
    });

    movement.appendChild(choices);

    const result = document.createElement("p");
    result.className = "tool-result";
    movement.appendChild(result);

    const activity = card("Movement reflection", "Record what you enjoyed, without comparing yourself with anyone.");

    activity.innerHTML += `
      <label>What did you do?</label>
      <input id="activityName" placeholder="Walk, cycle, yoga...">
      <label>How did it feel?</label>
      <textarea id="activityFeeling" placeholder="What did you notice?"></textarea>
    `;

    const save = makeButton(activity, "Save reflection", () => {
      savePage("Movement reflection", "Activity: " + document.getElementById("activityName").value + "\n" + document.getElementById("activityFeeling").value);
    });

    const running = card("Running & activity tracking", "Track your activities independently or explore these services.");

    running.innerHTML += `
      <p>Strava lets people record and review their activities. This link opens its official website; it does not connect your account to this prototype.</p>
      <p><a href="https://www.strava.com/" target="_blank" rel="noopener">Visit Strava ↗</a></p>
      <p><a href="https://www.youtube.com/results?search_query=beginner+running+tips" target="_blank" rel="noopener">Beginner running guidance ↗</a></p>
      <p><a href="https://www.youtube.com/results?search_query=beginner+yoga+for+students" target="_blank" rel="noopener">Beginner yoga classes ↗</a></p>
    `;

    const wellbeing = card("Everyday wellbeing", "Simple reminders for your everyday life.", true);
    wellbeing.innerHTML += `
      <ul>
        <li>Take breaks when needed.</li>
        <li>Eat regular, nourishing meals.</li>
        <li>Stay hydrated.</li>
        <li>Make room for sleep and rest.</li>
        <li>Choose movement that feels comfortable.</li>
      </ul>
    `;
  }

  // 05 - DAILY CHECK-IN
  function checkin() {
    const box = card("A small check-in", "You don't have to answer everything.");

    box.innerHTML += `
      <label>What kind of day has it been?</label>
      <select id="dayFeeling">
        <option>Quite good</option>
        <option>Ordinary</option>
        <option>Busy</option>
        <option>Challenging</option>
        <option>I'm not sure</option>
      </select>
      <label>One little thing I accomplished:</label>
      <textarea id="littleWin" placeholder="Even something small counts."></textarea>
      <label>Something I need:</label>
      <textarea id="needToday" placeholder="Rest, help, time, encouragement..."></textarea>
      <label>Something I want to try tomorrow:</label>
      <textarea id="tomorrowIdea" placeholder="A small, realistic step..."></textarea>
    `;

    makeButton(box, "Save my check-in", () => {
      savePage("Daily Check-in", [
        "Day: " + document.getElementById("dayFeeling").value,
        "Little win: " + document.getElementById("littleWin").value,
        "What I need: " + document.getElementById("needToday").value,
        "Tomorrow: " + document.getElementById("tomorrowIdea").value
      ].join("\n\n"));
    });

    const activity = card("A little inspiration", "Click for a gentle idea when you don't know where to start.");
    const prompts = [
      "Drink a glass of water.",
      "Spend a few minutes outside.",
      "Organise one small thing.",
      "Send someone a kind message.",
      "Read a few pages of a book.",
      "Listen to something you enjoy.",
      "Take a break without feeling guilty.",
      "Write down one thought."
    ];

    const result = document.createElement("p");
    result.className = "tool-result";
    activity.appendChild(result);

    makeButton(activity, "Give me an idea ✧", () => {
      result.textContent = prompts[Math.floor(Math.random() * prompts.length)];
    });
  }

  // 06 - STUDY & FOCUS
  function study() {
    const timer = card("Study timer", "Choose a study session and a break. You can stop whenever you need.");

    timer.innerHTML += `
      <label>Choose a session</label>
      <select id="studyLength">
        <option value="10">10 minutes study / 5 minutes break</option>
        <option value="20">20 minutes study / 5 minutes break</option>
        <option value="25">25 minutes study / 5 minutes break</option>
      </select>
      <div class="timer-display" id="timerDisplay">10:00</div>
      <p id="timerStatus" class="breath-note">Ready to begin?</p>
    `;

    let timerInterval = null;
    let remaining = 600;
    let onBreak = false;

    function displayTime() {
      const minutes = Math.floor(remaining / 60);
      const seconds = remaining % 60;
      document.getElementById("timerDisplay").textContent =
        String(minutes).padStart(2, "0") + ":" + String(seconds).padStart(2, "0");
    }

    document.getElementById("studyLength").addEventListener("change", event => {
      clearInterval(timerInterval);
      remaining = Number(event.target.value) * 60;
      onBreak = false;
      displayTime();
      document.getElementById("timerStatus").textContent = "Ready to begin?";
    });

    makeButton(timer, "Start", () => {
      if (timerInterval) return;

      document.getElementById("timerStatus").textContent =
        onBreak ? "Rest time" : "Study time";

      timerInterval = setInterval(() => {
        remaining--;
        displayTime();

        if (remaining <= 0) {
          clearInterval(timerInterval);
          timerInterval = null;

          if (!onBreak) {
            onBreak = true;
            remaining = 300;
            document.getElementById("timerStatus").textContent =
              "Study session finished! Enjoy your five-minute break.";
          } else {
            onBreak = false;
            remaining = Number(document.getElementById("studyLength").value) * 60;
            document.getElementById("timerStatus").textContent =
              "Break finished. Start another session when ready.";
          }

          displayTime();
        }
      }, 1000);
    });

    makeButton(timer, "Pause", () => {
      clearInterval(timerInterval);
      timerInterval = null;
      document.getElementById("timerStatus").textContent = "Paused.";
    });

    makeButton(timer, "Reset", () => {
      clearInterval(timerInterval);
      timerInterval = null;
      onBreak = false;
      remaining = Number(document.getElementById("studyLength").value) * 60;
      displayTime();
      document.getElementById("timerStatus").textContent = "Ready to begin?";
    });

    const plan = card("My study plan", "Break a large task into smaller steps.");

    plan.innerHTML += `
      <label>What am I studying?</label>
      <input id="studySubject" placeholder="Subject or topic">
      <label>My first small task</label>
      <textarea id="studyTask" placeholder="What will I complete first?"></textarea>
      <label>What will I do during my break?</label>
      <textarea id="studyBreak" placeholder="Stretch, walk, drink water..."></textarea>
    `;

    makeButton(plan, "Save study plan", () => {
      savePage("Study plan", [
        document.getElementById("studySubject").value,
        document.getElementById("studyTask").value,
        "Break: " + document.getElementById("studyBreak").value
      ].join("\n\n"));
    });

    const music = card("Your focus atmosphere", "Choose silence, nature sounds or music.");
    music.innerHTML += `
      <div class="resource-links">
        <a href="https://www.youtube.com/results?search_query=rain+sounds+for+studying" target="_blank" rel="noopener">Rain sounds ↗</a>
        <a href="https://www.youtube.com/results?search_query=forest+sounds+for+studying" target="_blank" rel="noopener">Forest sounds ↗</a>
        <a href="https://open.spotify.com/" target="_blank" rel="noopener">Spotify ↗</a>
        <a href="https://music.youtube.com/" target="_blank" rel="noopener">YouTube Music ↗</a>
        <a href="https://music.apple.com/" target="_blank" rel="noopener">Apple Music ↗</a>
      </div>
      <p>Silence is also a perfectly good choice. You can explore devotional or Quran recitations through your preferred trusted source.</p>
    `;
  }

  // 07 - SELF-CARE CORNER
  function selfcare() {
    const box = card("My gentle daily checklist", "Choose what is useful today. You don't need to complete everything.");

    const tasks = [
      "Drink water",
      "Eat regular meals",
      "Get enough rest",
      "Take a screen break",
      "Spend time outdoors",
      "Connect with someone",
      "Make time for something enjoyable"
    ];

    tasks.forEach(task => {
      const label = document.createElement("label");
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.style.width = "auto";
      checkbox.style.marginRight = "10px";

      label.append(checkbox, document.createTextNode(task));
      box.appendChild(label);
    });

    const reflection = card("A little care for myself", "What would make today a little easier?");
    reflection.innerHTML += `
      <label>Something I need more of:</label>
      <textarea id="careMore"></textarea>
      <label>Something I can ask for help with:</label>
      <textarea id="careHelp"></textarea>
      <label>Something I enjoy:</label>
      <textarea id="careEnjoy"></textarea>
    `;

    makeButton(reflection, "Save reflection", () => {
      savePage("Self-care reflection", [
        document.getElementById("careMore").value,
        document.getElementById("careHelp").value,
        document.getElementById("careEnjoy").value
      ].join("\n\n"));
    });

    const health = card("Understanding your health", "Information and resources to help you learn about everyday wellbeing.");

    health.innerHTML += `
      <div class="resource-links">
        <a href="https://www.who.int/health-topics/adolescent-health" target="_blank" rel="noopener">Adolescent health ↗</a>
        <a href="https://www.nhs.uk/conditions/periods/" target="_blank" rel="noopener">Understanding periods ↗</a>
        <a href="https://www.unicef.org/parenting/health" target="_blank" rel="noopener">Health and wellbeing ↗</a>
      </div>
      <p>Period tracking is optional. If you experience pain or symptoms that worry you, speak with a trusted adult or healthcare professional.</p>
    `;
  }

  // 08 - STORIES & REALITY
  function stories() {
    const box = card("Explore the real world", "These are real global issues. Learn from organisations that publish research, reports and verified information.", true);

    const storyData = [
      {
        title: "Children and education",
        text: "Millions of children face barriers to education because of poverty, conflict, displacement and unequal access.",
        link: "https://www.unicef.org/education",
        label: "UNICEF education"
      },
      {
        title: "Children in humanitarian emergencies",
        text: "Conflict and disasters can interrupt schooling, healthcare, food access and family life. Humanitarian organisations work to protect children and support communities.",
        link: "https://www.unicef.org/emergencies",
        label: "UNICEF emergencies"
      },
      {
        title: "Global hunger",
        text: "Food insecurity is affected by conflict, climate, poverty and economic conditions. Explore the evidence and the work to improve food security.",
        link: "https://www.wfp.org/",
        label: "World Food Programme"
      },
      {
        title: "Health for everyone",
        text: "Healthcare access varies greatly across communities. Learn about public health, prevention and global health programmes.",
        link: "https://www.who.int/",
        label: "World Health Organization"
      },
      {
        title: "People making a difference",
        text: "Discover how volunteers, doctors, teachers, aid workers and local organisations help communities.",
        link: "https://www.unv.org/",
        label: "United Nations Volunteers"
      }
    ];

    storyData.forEach(story => {
      const article = document.createElement("article");
      article.className = "memory-card";

      const h = document.createElement("h3");
      h.textContent = story.title;

      const p = document.createElement("p");
      p.textContent = story.text;

      const a = document.createElement("a");
      a.href = story.link;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = story.label + " ↗";

      article.append(h, p, a);
      box.appendChild(article);
    });

    const reflection = card("What did I learn?", "Think about what you discovered.", true);

    reflection.innerHTML += `
      <label>One fact that surprised me:</label>
      <textarea id="storyFact"></textarea>
      <label>What challenges did people face?</label>
      <textarea id="storyChallenge"></textarea>
      <label>What efforts or solutions did I discover?</label>
      <textarea id="storyHope"></textarea>
      <label>What would I like to learn next?</label>
      <textarea id="storyNext"></textarea>
    `;

    makeButton(reflection, "Save my learning", () => {
      savePage("Stories and Reality reflection", [
        "Fact: " + document.getElementById("storyFact").value,
        "Challenges: " + document.getElementById("storyChallenge").value,
        "Solutions: " + document.getElementById("storyHope").value,
        "Next: " + document.getElementById("storyNext").value
      ].join("\n\n"));
    });
  }

  // 09 - CAREER EXPLORATION
  function career() {
    const box = card("Discover your interests", "Choose the areas that interest you. This is an exploration tool, not a test that decides your future.", true);

    const questions = [
      ["What interests you most?", ["Healthcare", "Science", "People and society", "Nature", "Technology", "Art and creativity"]],
      ["Which activity sounds interesting?", ["Helping people", "Researching questions", "Teaching", "Solving problems", "Creating things"]],
      ["What topics do you enjoy?", ["Biology", "History and politics", "Physics and chemistry", "Literature", "Geography and environment"]],
      ["Which environment sounds appealing?", ["Hospitals and clinics", "Field work", "Classrooms", "Laboratories", "Offices and organisations"]],
      ["What kind of impact matters to you?", ["Improving health", "Supporting children", "Protecting rights", "Discovering knowledge", "Helping communities"]],
      ["What do you enjoy doing?", ["Listening and supporting", "Analysing information", "Explaining ideas", "Organising projects", "Making and designing"]],
      ["Which issue interests you?", ["Public health", "Climate change", "Education", "Human rights", "Scientific discovery"]],
      ["What would you like to explore?", ["Medicine", "Humanitarian work", "Law and justice", "Research", "Education", "Environment"]],
      ["How do you like to work?", ["With people", "Independently", "In a team", "A mixture"]],
      ["What matters most in a future career?", ["Helping others", "Learning new things", "Creativity", "Stability", "Travel and exploration"]]
    ];

    const fields = [
      { name: "Healthcare and Medicine", keywords: ["Healthcare", "Medicine", "Improving health", "hospitals", "Public health", "Biology"], jobs: ["Doctor", "Paediatrician", "Anaesthesiologist", "Public health physician", "Nurse", "Medical researcher"], degree: "MBBS, nursing or relevant health-science degrees", route: "In India, MBBS admission generally requires NEET-UG. Specialisation requires further training." },
      { name: "Humanitarian and Social Impact", keywords: ["Helping people", "Supporting children", "Humanitarian work", "Human rights", "communities", "Field work"], jobs: ["Humanitarian programme officer", "Child protection specialist", "Emergency response officer", "Community health worker", "Human rights researcher"], degree: "Social work, public health, international relations, law or relevant degrees", route: "Pathways vary by role and organisation. Relevant experience and specialist training are important." },
      { name: "Science and Research", keywords: ["Researching questions", "laboratories", "Scientific discovery", "Research", "Biology"], jobs: ["Research scientist", "Biomedical researcher", "Laboratory scientist", "Environmental researcher"], degree: "BSc followed by MSc or a research doctorate, depending on the role", route: "Build subject foundations and explore university research programmes." },
      { name: "Law and Public Affairs", keywords: ["History and politics", "Protecting rights", "Law and justice", "Human rights"], jobs: ["Lawyer", "Legal researcher", "Policy researcher", "Human rights advocate"], degree: "LLB or relevant social-science degrees", route: "In India, students can explore five-year integrated law degrees after Class 12 or other recognised routes." },
      { name: "Education and Communication", keywords: ["Teaching", "Explaining ideas", "Classrooms", "Education"], jobs: ["Teacher", "Education researcher", "Learning designer", "Science communicator"], degree: "Education, subject degrees or communication-related qualifications", route: "Requirements depend on the specific profession and location." },
      { name: "Environment and Conservation", keywords: ["Nature", "Climate change", "Geography and environment", "environment"], jobs: ["Environmental scientist", "Conservation researcher", "Climate analyst", "Wildlife educator"], degree: "Environmental science, ecology, geography or related degrees", route: "Explore undergraduate science and environmental programmes." },
      { name: "Technology and Design", keywords: ["Technology", "Solving problems", "Creating things", "Making and designing"], jobs: ["Product designer", "UX designer", "Software professional", "Data analyst"], degree: "Design, computer science or related qualifications", route: "Portfolio, academic qualifications and practical skills depend on the role." }
    ];

    questions.forEach((question, index) => {
      const section = document.createElement("div");
      section.className = "career-question";

      const h = document.createElement("h3");
      h.textContent = (index + 1) + ". " + question[0];
      section.appendChild(h);

      question[1].forEach(option => {
        const label = document.createElement("label");
        const input = document.createElement("input");
        input.type = "checkbox";
        input.name = "career" + index;
        input.value = option;
        label.append(input, document.createTextNode(" " + option));
        section.appendChild(label);
      });

      box.appendChild(section);
    });

    const result = document.createElement("div");
    result.className = "tool-result";
    result.id = "careerResult";
    box.appendChild(result);

    makeButton(box, "Explore my possibilities ↗", () => {
      const selected = [...box.querySelectorAll("input:checked")].map(input => input.value);

      if (selected.length === 0) {
        result.textContent = "Choose at least one interest to explore.";
        return;
      }

      const ranked = fields.map(field => ({
        ...field,
        score: field.keywords.filter(key =>
          selected.some(item => item.toLowerCase().includes(key.toLowerCase()) || key.toLowerCase().includes(item.toLowerCase()))
        ).length
      })).sort((a, b) => b.score - a.score);

      result.innerHTML = "";

      ranked.filter(field => field.score > 0).slice(0, 4).forEach(field => {
        const section = document.createElement("article");
        section.className = "memory-card";

        const heading = document.createElement("h3");
        heading.textContent = field.name;

        const jobs = document.createElement("p");
        jobs.textContent = "Possible careers: " + field.jobs.join(", ");

        const degree = document.createElement("p");
        degree.textContent = "Study areas: " + field.degree;

        const route = document.createElement("p");
        route.textContent = "Possible pathway: " + field.route;

        section.append(heading, jobs, degree, route);
        result.appendChild(section);
      });

      result.innerHTML += `
        <p>Explore the requirements of each career in your country. Course length, entrance exams, salaries and qualifications vary between universities and countries. Your answers are starting points, not a final decision.</p>
        <p><a href="https://www.ncs.gov.in/" target="_blank" rel="noopener">India National Career Service ↗</a></p>
        <p><a href="https://www.careers.govt.nz/" target="_blank" rel="noopener">Career information ↗</a></p>
      `;

      makeButton(box, "Save my career exploration", () => {
        savePage("Career exploration", "My interests: " + selected.join(", ") + "\n\n" + ranked.slice(0, 4).map(f => f.name + ": " + f.jobs.join(", ")).join("\n\n"));
      });
    });

    const dreams = card("Dreams beyond a career", "Your life is bigger than your job title.", true);
    dreams.innerHTML += `
      <label>A place I dream of visiting:</label>
      <textarea id="dreamPlace"></textarea>
      <label>Something I want to learn:</label>
      <textarea id="dreamLearn"></textarea>
      <label>Something I want to contribute to the world:</label>
      <textarea id="dreamContribution"></textarea>
      <label>A personal goal:</label>
      <textarea id="dreamGoal"></textarea>
    `;

    makeButton(dreams, "Save my dreams", () => {
      savePage("Dreams beyond career", [
        document.getElementById("dreamPlace").value,
        document.getElementById("dreamLearn").value,
        document.getElementById("dreamContribution").value,
        document.getElementById("dreamGoal").value
      ].join("\n\n"));
    });
  }

  // 10 - MY LITTLE WORLD
  function world() {
    const diary = card("My private diary", "A place for your unfiltered thoughts, memories and everyday moments.", true);

    diary.innerHTML += `
      <label>Give your entry a title:</label>
      <input id="diaryTitle" placeholder="A day to remember...">
      <label>Write your thoughts:</label>
      <textarea id="diaryText" placeholder="Write about anything. Good days, difficult days, funny moments..."></textarea>
    `;

    makeButton(diary, "Save diary entry", () => {
      savePage(
        document.getElementById("diaryTitle").value || "My diary",
        document.getElementById("diaryText").value
      );
    });

    const scrapbook = card("My scrapbook", "Add a memory, a caption or a photograph.", true);

    scrapbook.innerHTML += `
      <label>Memory title:</label>
      <input id="memoryTitle" placeholder="A special moment">
      <label>Write about it:</label>
      <textarea id="memoryText" placeholder="What happened? Why is it important?"></textarea>
      <label>Choose a photograph (optional):</label>
      <input id="memoryPhoto" type="file" accept="image/jpeg,image/png,image/webp">
      <img id="memoryPreview" class="image-preview" alt="Your selected memory" hidden>
      <p class="small-note">Photos are stored in your browser when saved. Large photos may exceed browser storage limits.</p>
    `;

    let photoData = "";

    document.getElementById("memoryPhoto").addEventListener("change", event => {
      const file = event.target.files[0];
      if (!file) return;

      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        alert("Please choose a JPG, PNG or WebP image.");
        event.target.value = "";
        return;
      }

      if (file.size > 800000) {
        alert("Please choose an image smaller than 800 KB for this browser prototype.");
        event.target.value = "";
        return;
      }

      const reader = new FileReader();

      reader.onload = () => {
        photoData = reader.result;
        const preview = document.getElementById("memoryPreview");
        preview.src = photoData;
        preview.hidden = false;
      };

      reader.readAsDataURL(file);
    });

    makeButton(scrapbook, "Save my memory", () => {
      const title = document.getElementById("memoryTitle").value || "My memory";
      const text = document.getElementById("memoryText").value;

      if (!text.trim() && !photoData) {
        alert("Add a description or photograph first.");
        return;
      }

      savePage(title, text + (photoData ? "\n\n[Photograph attached to this memory]" : ""));

      if (photoData) {
        try {
          const photos = JSON.parse(localStorage.getItem("etherPhotos") || "[]");
          photos.push({ title, image: photoData, date: new Date().toLocaleString() });
          localStorage.setItem("etherPhotos", JSON.stringify(photos));
          photoData = "";
        } catch {
          alert("The memory was saved, but there was not enough browser storage for the photograph.");
        }
      }
    });

    const gallery = card("My photo gallery", "Your saved scrapbook photographs.");

    function renderPhotos() {
      let photos = [];

      try {
        photos = JSON.parse(localStorage.getItem("etherPhotos")) || [];
      } catch {
        photos = [];
      }

      photos.forEach((photo, index) => {
        const item = document.createElement("div");
        item.className = "memory-card";

        const heading = document.createElement("h3");
        heading.textContent = photo.title;

        const image = document.createElement("img");
        image.src = photo.image;
        image.alt = photo.title;

        const date = document.createElement("small");
        date.textContent = photo.date;

        const remove = document.createElement("button");
        remove.className = "tool-button secondary";
        remove.textContent = "Remove photo";

        remove.onclick = () => {
          photos.splice(index, 1);
          localStorage.setItem("etherPhotos", JSON.stringify(photos));
          gallery.innerHTML = "<h2>My photo gallery</h2><p>Your saved scrapbook photographs.</p>";
          renderPhotos();
        };

        item.append(heading, image, date, remove);
        gallery.appendChild(item);
      });

      if (!photos.length) {
        const empty = document.createElement("p");
        empty.textContent = "Your photographs will appear here.";
        gallery.appendChild(empty);
      }
    }

    renderPhotos();

    const timeline = card("Letters to myself", "Write a message to your future self.", true);

    timeline.innerHTML += `
      <label>Dear future me...</label>
      <textarea id="futureLetter" placeholder="What do you hope you remember?"></textarea>
      <label>What am I proud of today?</label>
      <textarea id="proudToday"></textarea>
      <label>What do I hope changes?</label>
      <textarea id="hopeFuture"></textarea>
    `;

    makeButton(timeline, "Save my letter", () => {
      savePage("A letter to my future self", [
        document.getElementById("futureLetter").value,
        document.getElementById("proudToday").value,
        document.getElementById("hopeFuture").value
      ].join("\n\n"));
    });
  }

  // FEATURE BACKGROUND CUSTOMISATION
  const settings = document.createElement("div");
  settings.className = "background-settings";

  const label = document.createElement("label");
  label.textContent = "Customise this space's background: ";

  const picker = document.createElement("input");
  picker.type = "color";
  picker.value = localStorage.getItem("etherFeatureBg_" + feature) || "#242d23";

  picker.addEventListener("input", () => {
    content.style.background = picker.value;
    localStorage.setItem("etherFeatureBg_" + feature, picker.value);
  });

  label.appendChild(picker);
  settings.appendChild(label);
  content.before(settings);

  const background = localStorage.getItem("etherFeatureBg_" + feature);
  if (background && /^#[0-9a-f]{6}$/i.test(background)) {
    content.style.background = background;
  }

  // Load the selected feature.
  const featureFunctions = {
    mood,
    breathing,
    gratitude,
    fitness,
    checkin,
    study,
    selfcare,
    stories,
    career,
    world
  };

  if (featureFunctions[feature]) {
    featureFunctions[feature]();
  } else {
    content.innerHTML = "<p>This space could not be found. Please return to the homepage.</p>";
  }

  renderSaved();

});
