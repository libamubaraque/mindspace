/* =========================================================
   TO THE ETHER. — ALL 20 FEATURE SPACES
   Activities | Learning | Tutorials | Saved Pages | Progress
   Browser-storage prototype. Supabase sync comes later.
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  const params = new URLSearchParams(window.location.search);
  const slug = params.get("feature");

  const titleElement = document.getElementById("featureTitle");
  const categoryElement = document.getElementById("featureCategory");
  const descriptionElement = document.getElementById("featureDescription");
  const contentElement = document.getElementById("featureContent");
  const savedElement = document.getElementById("featureSavedPages");

  const SAVED_KEY = "etherSavedPages";
  const PROGRESS_KEY = "etherFeatureProgress";

  if (!contentElement) return;

  /* ---------- HELPERS ---------- */

  function escapeHTML(value = "") {
    return String(value).replace(/[&<>"']/g, character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    })[character]);
  }

  function readData(key, fallback = []) {
    try {
      return JSON.parse(localStorage.getItem(key)) ?? fallback;
    } catch {
      return fallback;
    }
  }

  function writeData(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error("Storage error:", error);
      alert("Your browser could not save this item. Try using a smaller photo or clearing some browser storage.");
      return false;
    }
  }

  function today() {
    return new Date().toLocaleDateString(undefined, {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  function youtubeSearch(query) {
    return "https://www.youtube.com/results?search_query=" +
      encodeURIComponent(query);
  }

  function section(heading, body, extraClass = "") {
    return `
      <section class="tool-section ${extraClass}">
        <h2>${heading}</h2>
        ${body}
      </section>
    `;
  }

  function textField(id, label, placeholder = "", rows = 4) {
    return `
      <label class="field-label" for="${id}">${label}</label>
      <textarea
        id="${id}"
        class="feature-textarea"
        rows="${rows}"
        placeholder="${placeholder}"
      ></textarea>
    `;
  }

  function inputField(id, label, placeholder = "", type = "text") {
    return `
      <label class="field-label" for="${id}">${label}</label>
      <input
        id="${id}"
        class="feature-input"
        type="${type}"
        placeholder="${placeholder}"
      >
    `;
  }

  function selectField(id, label, options) {
    return `
      <label class="field-label" for="${id}">${label}</label>
      <select id="${id}" class="feature-select">
        ${options.map(option => `
          <option value="${escapeHTML(option)}">${escapeHTML(option)}</option>
        `).join("")}
      </select>
    `;
  }

  function button(label, action, className = "primary-button") {
    return `
      <button type="button" class="${className}" data-action="${action}">
        ${label}
      </button>
    `;
  }

  function checklist(items, group = "task") {
    return `
      <div class="feature-checklist">
        ${items.map((item, index) => `
          <label class="check-item">
            <input type="checkbox" data-progress="${group}" value="${index}">
            <span>${item}</span>
          </label>
        `).join("")}
      </div>
    `;
  }

  function linkCard(title, description, url, label = "Explore ↗") {
    return `
      <a class="resource-card" href="${url}" target="_blank" rel="noopener noreferrer">
        <h3>${title}</h3>
        <p>${description}</p>
        <span>${label}</span>
      </a>
    `;
  }

  function tutorialBlock(query, description) {
    return `
      <div class="tutorial-card">
        <div>
          <p class="eyebrow">LEARN SOMETHING NEW</p>
          <h3>Watch and learn</h3>
          <p>${description}</p>
        </div>
        <a href="${youtubeSearch(query)}" target="_blank" rel="noopener noreferrer">
          Find tutorials on YouTube ↗
        </a>
      </div>
    `;
  }

  function saveButton() {
    return `
      <button type="button" class="primary-button" data-action="save-entry">
        Save to My Saved Pages
      </button>
    `;
  }

  function savedPages() {
    return readData(SAVED_KEY, []);
  }

  function saveEntry(title, content, extra = {}) {
    if (!String(content || "").trim()) {
      alert("Write something first, then save your page.");
      return;
    }

    const pages = savedPages();

    pages.unshift({
      id: Date.now(),
      feature: feature.title,
      slug,
      title: title || feature.title,
      content: String(content).trim(),
      date: today(),
      ...extra
    });

    if (writeData(SAVED_KEY, pages)) {
      renderSavedPages();
      alert("Saved! You can find it in My Saved Pages.");
    }
  }

  function renderSavedPages() {
    if (!savedElement) return;

    const pages = savedPages().filter(page => page.slug === slug);

    if (!pages.length) {
      savedElement.innerHTML = `
        <p class="empty-saved-message">
          Nothing saved here yet. Your saved work will appear in this collection.
        </p>
      `;
      return;
    }

    savedElement.innerHTML = pages.map(page => `
      <article class="saved-page-card">
        <p class="eyebrow">${escapeHTML(page.date || "")}</p>
        <h3>${escapeHTML(page.title || "Saved page")}</h3>
        <p>${escapeHTML((page.content || "").slice(0, 110))}${page.content?.length > 110 ? "..." : ""}</p>
        <button type="button" class="text-button" data-action="view-saved" data-id="${page.id}">
          Read saved page
        </button>
        <button type="button" class="text-button delete-saved-page" data-action="delete-saved" data-id="${page.id}">
          Delete
        </button>
      </article>
    `).join("");
  }

  function markProgress(name) {
    const progress = readData(PROGRESS_KEY, {});
    progress[slug] = progress[slug] || [];
    if (!progress[slug].includes(name)) {
      progress[slug].push(name);
    }
    writeData(PROGRESS_KEY, progress);
    renderProgress();
  }

  function renderProgress() {
    const progress = readData(PROGRESS_KEY, {});
    const completed = progress[slug] || [];
    const progressElement = document.getElementById("featureProgress");

    if (!progressElement) return;

    progressElement.innerHTML = `
      <p>${completed.length} activities completed in this space.</p>
      <div class="progress-track">
        <div class="progress-fill" style="width:${Math.min(completed.length * 20, 100)}%"></div>
      </div>
    `;
  }

  function getText(id) {
    return document.getElementById(id)?.value?.trim() || "";
  }

  function getValue(id) {
    return document.getElementById(id)?.value || "";
  }

  /* ---------- ALL 20 SPACES ---------- */

  const features = {

    "mood-journal": {
      title: "Mood Journal",
      category: "REFLECTION & EMOTIONAL WELLBEING",
      description: "A gentle place to notice how you feel, without judging yourself.",
      image: "journal",
      intro: "Your feelings deserve space. You do not need to explain everything perfectly or have the right words. This journal is a place to pause, notice what is happening inside, and understand yourself a little better.",
      sections: [
        ["Understanding your mood", "A mood is an emotional state that can change throughout the day. It can be influenced by sleep, school, friendships, family, physical health and things that happen around you. One difficult moment does not define your whole day."],
        ["There is no wrong feeling", "Happiness, anger, sadness, excitement, confusion and even feeling nothing are all experiences people can have. You do not have to force yourself to feel positive. Try naming what you notice instead of criticising yourself for it."],
        ["Writing can help you reflect", "A journal does not have to be beautiful or lengthy. A few honest sentences can help you recognise patterns, identify what matters to you, and think about what support might be useful."],
        ["When you need support", "A journal is not a replacement for help. If a feeling is overwhelming, lasts a long time, or affects everyday life, consider speaking with a trusted adult, school counsellor or qualified health professional."]
      ],
      fact: "Emotions are information, not instructions. You can notice a feeling and still choose how you respond.",
      advice: "Try describing your feeling as a passing experience: “I am noticing that I feel worried today.”",
      tutorial: "guided journaling for students",
      tool: `
        ${selectField("moodChoice", "How are you feeling today?", ["Choose a feeling", "Calm", "Happy", "Excited", "Hopeful", "Tired", "Worried", "Sad", "Frustrated", "Confused", "Overwhelmed", "Not sure"]) }
        ${textField("moodReason", "What might have influenced this feeling?", "You can write as much or as little as you want.")}
        ${textField("moodNeed", "What would help you right now?", "Rest, talking, a break, support, or something else?")}
        ${textField("moodExtra", "Anything else on your mind?", "This space belongs to you.")}
        ${saveButton()}
      `
    },

    "breathing-space": {
      title: "Breathing Space",
      category: "PAUSE & RESET",
      description: "Take a small pause. Find a comfortable rhythm and give yourself a moment.",
      intro: "Sometimes a short pause can make a busy day feel more manageable. This space offers simple breathing activities, quiet moments and reflections. You can stop whenever you want. Never force your breathing or continue if you feel uncomfortable.",
      sections: [
        ["Why pause?", "When schoolwork, notifications and everyday responsibilities build up, it can be useful to step away for a moment. A pause gives you a chance to notice your surroundings and decide what you need next."],
        ["Breathing at your own pace", "Slow, comfortable breathing may help some people feel settled. There is no perfect rhythm. Choose a pattern that feels natural, breathe normally if you prefer, and stop if you feel dizzy or uncomfortable."],
        ["Silence is an option", "You do not need music, instructions or a perfect environment. You can sit quietly, notice sounds around you, look outside or simply take a break from your screen."],
        ["A gentle reminder", "Breathing activities are general wellbeing exercises, not medical treatment. If you are having persistent anxiety or breathing difficulties, talk to a trusted adult or health professional."]
      ],
      fact: "A wellbeing break does not need to be long or perfectly organised to be worthwhile.",
      advice: "Keep your shoulders comfortable. Do not hold your breath or try to breathe more deeply than feels natural.",
      tutorial: "beginner guided breathing exercise",
      tool: `
        ${selectField("breathNeed", "What kind of pause would you like?", ["Choose a pathway", "I want a quiet moment", "I feel overwhelmed", "I need a study break", "I want to relax before sleep", "I want to reset my attention"])}
        ${selectField("breathLength", "Choose a short session", ["1 minute", "2 minutes", "3 minutes"])}
        <div class="breathing-orb" id="breathingOrb"><span id="breathingInstruction">Ready?</span></div>
        <p id="breathingStatus" class="activity-status">Choose a session and begin when comfortable.</p>
        <div class="button-row">
          ${button("Begin breathing guide", "start-breathing")}
          ${button("Stop", "stop-breathing", "secondary-button")}
        </div>
        <p class="small-note">Follow only a comfortable rhythm. You can stop at any time.</p>
        ${textField("breathReflection", "After your pause, how do you feel?", "No right or wrong answer.")}
        ${saveButton()}
      `
    },

    "gratitude-journal": {
      title: "Gratitude Journal",
      category: "NOTICE THE LITTLE THINGS",
      description: "Collect small moments, people and experiences that matter to you.",
      intro: "Gratitude is not pretending that everything is perfect. It is noticing something meaningful even when life is complicated. It might be a kind message, a safe place, a meal, a funny moment or someone who listened.",
      sections: [
        ["What gratitude means", "Gratitude means recognising something you appreciate. It can be directed towards people, experiences, opportunities, nature or small everyday comforts."],
        ["It is not toxic positivity", "You can appreciate something and still admit that another part of life is difficult. You never have to write something positive just to make a difficult situation sound better."],
        ["Small moments count", "A peaceful walk, a helpful teacher, a favourite song or a good conversation can be worth remembering. Meaning does not have to come from expensive experiences or major achievements."],
        ["Make it personal", "Your journal can be messy, creative, short or detailed. Add a memory, a sentence, a list or a letter. The important part is that it feels honest to you."]
      ],
      fact: "Gratitude can include ordinary moments. It does not need to be a list of major achievements.",
      advice: "Try to describe why a moment mattered instead of simply listing it.",
      tutorial: "gratitude journaling ideas",
      tool: `
        ${inputField("gratitudeTitle", "Give this page a title", "A little moment I want to remember")}
        ${textField("gratitudeOne", "One thing I appreciated today", "It could be something very small.")}
        ${textField("gratitudeTwo", "Someone I am thankful for", "What would you like to appreciate about them?")}
        ${textField("gratitudeThree", "A moment I want to keep", "Describe a memory, place or experience.")}
        ${textField("gratitudeLetter", "A little thank-you letter", "Write a few words to someone or something.")}
        ${saveButton()}
      `
    },

    "fitness-wellness": {
      title: "Fitness & Wellness",
      category: "MOVEMENT & EVERYDAY HEALTH",
      description: "Explore enjoyable movement, everyday wellbeing and habits that support you.",
      intro: "Movement is not a punishment and it is not a competition. It can be walking, dancing, cycling, swimming, playing a sport or simply stretching after sitting for a long time. The aim is to find activities that feel enjoyable and fit your life.",
      sections: [
        ["Movement for everyday life", "Regular movement supports general health, energy, mobility and wellbeing. Different activities suit different people. You do not need expensive equipment or a complicated routine to begin."],
        ["Running, cycling and swimming", "Running and walking can help you explore your surroundings. Cycling can be a practical way to travel and enjoy the outdoors. Swimming offers a different kind of movement. Learn safely, use suitable supervision and build skills gradually."],
        ["Screen breaks matter", "Long periods looking at a screen can leave you feeling tired or distracted. Try changing position, looking away from the screen, drinking water and taking a comfortable movement break."],
        ["Rest is part of wellness", "Sleep, recovery, enjoyable food, hydration and time with other people all matter. You do not need to exercise when you are ill, injured or exhausted. Listen to your body and ask a qualified professional about health concerns."]
      ],
      fact: "Walking, cycling, dancing, games and sports can all count as enjoyable movement.",
      advice: "Choose an activity you enjoy. Start gently, take breaks and avoid comparing your routine with someone else's.",
      tutorial: "beginner stretching and mobility routine",
      tool: `
        ${selectField("fitnessActivity", "What would you like to try?", ["Choose an activity", "Walking", "Running", "Cycling", "Swimming", "Yoga or stretching", "Dancing", "Team sport", "Outdoor exploration"])}
        ${selectField("fitnessTime", "How much time do you have?", ["5 minutes", "10 minutes", "15 minutes", "20 minutes", "30 minutes", "Just exploring"])}
        ${selectField("fitnessFeeling", "How are you feeling today?", ["Comfortable and ready", "A little tired", "Need a gentle activity", "Prefer a rest day"])}
        ${textField("fitnessNotes", "Movement notes", "What did you enjoy? What would you like to try another day?")}
        <h3>Everyday wellbeing reminders</h3>
        ${checklist(["Take a screen break", "Drink water when thirsty", "Change position after sitting", "Spend a little time outdoors if possible", "Make time for rest"], "wellness")}
        <div class="resource-grid">
          ${linkCard("Strava", "Explore activity tracking and community features.", "https://www.strava.com/")}
          ${linkCard("NHS movement guide", "Read general guidance about physical activity.", "https://www.nhs.uk/live-well/exercise/")}
          ${linkCard("Yoga for beginners", "Find gentle beginner yoga tutorials.", youtubeSearch("beginner gentle yoga"))}
        </div>
        <p class="small-note">This is a wellbeing space, not a weight-loss or performance programme. Strava is an external service; this prototype does not connect to your account.</p>
        ${saveButton()}
      `
    },

    "daily-check-in": {
      title: "Daily Check-in",
      category: "A MOMENT FOR YOURSELF",
      description: "Notice your little wins, your energy and what you might need today.",
      intro: "A check-in is a small moment to notice how your day is going. You do not need to have achieved something impressive. Getting through a difficult morning, asking a question or taking a break can all matter.",
      sections: [
        ["Little wins are still wins", "A little win might be finishing one task, helping someone, trying something unfamiliar or getting out of bed on a difficult morning. You get to decide what counts."],
        ["Notice your energy", "Energy changes for many reasons. Sleep, food, stress, activity and the demands of the day can all influence how you feel. A low-energy day is not a personal failure."],
        ["Make room for honest answers", "You can say that today was difficult. You can say that you are unsure. This check-in is not a test and there is no score."],
        ["Choose one next step", "A next step can be very small: organising your desk, asking for help, taking a break or preparing for tomorrow. It is okay if your next step is rest."]
      ],
      fact: "Progress can be quiet. It is not always visible to other people.",
      advice: "Choose one realistic next step rather than making a long list of things you must do.",
      tutorial: "daily reflection journal for students",
      tool: `
        ${selectField("checkMood", "How is your day going?", ["Choose one", "Good", "Okay", "Difficult", "Mixed", "Not sure"])}
        ${selectField("checkEnergy", "How is your energy?", ["Choose one", "High", "Medium", "Low", "Changing"])}
        ${textField("checkWin", "One little win today", "It can be something simple.")}
        ${textField("checkThought", "Something on my mind", "What would you like to acknowledge?")}
        ${textField("checkNext", "One small next step", "Keep it realistic and kind.")}
        ${button("Give me a gentle reminder", "random-reminder", "secondary-button")}
        <p id="randomReminder" class="activity-status"></p>
        ${saveButton()}
      `
    },

    "study-focus": {
      title: "Study & Focus",
      category: "LEARNING WITHOUT BURNOUT",
      description: "Organise your study time, try focus sessions and make space for breaks.",
      intro: "Studying is not about sitting at a desk for as many hours as possible. It is about understanding, practising, reviewing and allowing your mind time to rest. Find a method that suits the task and your energy.",
      sections: [
        ["Start with one clear task", "A vague plan such as “study science” can feel overwhelming. A smaller task such as “revise two diagrams” or “solve five questions” gives you a clearer starting point."],
        ["Use active learning", "Try explaining a topic in your own words, answering questions without looking at the book, drawing a diagram or teaching the idea to someone else. Re-reading alone may not show what you truly understand."],
        ["Breaks support learning", "A short break can help you reset your attention. Stand up, stretch gently, drink water or look away from your screen. You can adjust the length of your study session to the task."],
        ["Mistakes are useful information", "When an answer is wrong, identify which step caused the problem. Correct it, try a similar question and revisit it later. Understanding grows through practice."]
      ],
      fact: "Retrieval practice means trying to remember information before checking your notes.",
      advice: "Choose a small target for this session. Put away distractions where possible, and take a break when you need one.",
      tutorial: "active recall and spaced repetition study techniques",
      tool: `
        ${inputField("studyTask", "What are you studying?", "Example: Class 9 Mathematics — Coordinate Geometry")}
        ${selectField("studyLevel", "Choose a session", ["10-minute starter", "20-minute study session", "25-minute focus session"])}
        <div class="timer-display" id="studyTimer">10:00</div>
        <p id="studyTimerStatus" class="activity-status">Your timer is ready.</p>
        <div class="button-row">
          ${button("Start timer", "start-study")}
          ${button("Pause", "pause-study", "secondary-button")}
          ${button("Reset", "reset-study", "secondary-button")}
        </div>
        <h3>After studying</h3>
        ${textField("studyLearned", "What did you understand?", "Write the main idea in your own words.")}
        ${textField("studyDifficult", "What needs more practice?", "Write down one question or doubt.")}
        <h3>Choose your background sound</h3>
        <div class="resource-grid">
          ${linkCard("Nature sounds", "Find gentle nature sounds.", youtubeSearch("nature sounds study background"))}
          ${linkCard("Instrumental music", "Explore music without lyrics.", youtubeSearch("instrumental study music"))}
          ${linkCard("Silence", "No sound is also a good choice.", "https://www.google.com/search?q=study+focus+tips")}
          ${linkCard("Qur'an recitation", "Find recitations from trusted channels.", youtubeSearch("Quran recitation"))}
        </div>
        <p class="small-note">The timer runs in this browser tab. Music and video links open external websites.</p>
        ${saveButton()}
      `
    },

    "self-care": {
      title: "Self-care Corner",
      category: "CARE FOR YOURSELF",
      description: "Explore simple ways to care for your physical, emotional and everyday needs.",
      intro: "Self-care is not only skincare, shopping or expensive routines. It can mean sleeping enough, asking for help, taking a break, keeping your surroundings comfortable or setting a boundary. It looks different for every person.",
      sections: [
        ["Physical care", "Everyday care includes rest, hygiene, hydration, balanced meals, movement you enjoy and seeking medical advice when needed. Small routines can make daily life easier."],
        ["Emotional care", "You might need quiet time, a conversation, creative expression, prayer, time outdoors or support from someone you trust. There is no single routine that works for everyone."],
        ["Your surroundings matter", "A tidy corner, a comfortable study area or a little fresh air can make a space feel more manageable. You do not have to organise everything at once."],
        ["Personal care is personal", "Different people have different needs. Menstrual health, skin care, accessibility, culture and personal preferences can all influence what care looks like. Seek reliable health information rather than relying on online myths."]
      ],
      fact: "Rest and asking for support are valid parts of self-care.",
      advice: "Choose one small action that meets a real need instead of trying to follow a perfect routine.",
      tutorial: "simple self care routine for students",
      tool: `
        <h3>My gentle self-care checklist</h3>
        ${checklist(["Take a comfortable break", "Freshen up or brush my teeth", "Drink water when thirsty", "Eat a regular meal or snack", "Talk to someone I trust", "Spend time on something I enjoy", "Prepare a comfortable space", "Allow myself to rest"], "selfcare")}
        ${selectField("selfCareType", "What do you need most today?", ["Choose one", "Physical rest", "Emotional support", "A little organisation", "Time away from screens", "A health question", "Time with someone"])}
        ${textField("selfCareNote", "My care note", "What is one kind thing you can do for yourself?")}
        <div class="resource-grid">
          ${linkCard("WHO — Mental health", "Reliable general information about mental wellbeing.", "https://www.who.int/health-topics/mental-health")}
          ${linkCard("UNICEF — Adolescent health", "Information about young people's wellbeing.", "https://www.unicef.org/health/adolescent-health-and-well-being")}
        </div>
        <p class="small-note">If you have a health concern, speak with a trusted adult and a qualified health professional. This page is not a medical tracker or diagnosis tool.</p>
        ${saveButton()}
      `
    },

    "stories-hope": {
      title: "Stories & Hope",
      category: "REAL STORIES. REAL PEOPLE.",
      description: "Learn about the world, humanitarian work, challenges and meaningful progress.",
      intro: "The world contains difficult realities as well as courage, solidarity and change. Learning about humanitarian issues should help us understand people with dignity, not reduce them to headlines or statistics.",
      sections: [
        ["Look beyond the headline", "A headline rarely explains the full history of a crisis. Look for context, reliable reporting, dates and multiple credible sources before forming an opinion."],
        ["Remember the people", "Behind every statistic are individuals, families and communities with their own experiences, choices and hopes. Use respectful language and avoid sharing images that violate someone's dignity."],
        ["Understand humanitarian work", "Humanitarian organisations may provide emergency healthcare, food, shelter, education, protection and support for displaced communities. Their work can be difficult and long-term."],
        ["Hope does not erase reality", "A positive outcome does not mean that a crisis is over or that everyone is safe. Hope can mean recognising progress while continuing to pay attention to people who still need support."]
      ],
      fact: "Reliable humanitarian information should identify its source, date and the people or communities it describes.",
      advice: "When reading a story, ask: Who published it? When? What evidence supports it? Whose voices are missing?",
      tutorial: "how to identify reliable news and misinformation",
      tool: `
        <h3>Explore reliable organisations</h3>
        <div class="resource-grid">
          ${linkCard("UNICEF", "Children's rights, education, health and protection.", "https://www.unicef.org/")}
          ${linkCard("UNHCR", "Refugees, displacement and protection.", "https://www.unhcr.org/")}
          ${linkCard("World Food Programme", "Food assistance and food security.", "https://www.wfp.org/")}
          ${linkCard("World Health Organization", "Global health and emergency response.", "https://www.who.int/")}
          ${linkCard("International Committee of the Red Cross", "Humanitarian protection in armed conflict.", "https://www.icrc.org/")}
          ${linkCard("United Nations", "International cooperation and global issues.", "https://www.un.org/")}
        </div>
        ${selectField("storyTopic", "Choose a topic to learn about", ["Children's rights", "Refugees and displacement", "Food security", "Global health", "Education in emergencies", "Humanitarian action"])}
        ${textField("storyReflection", "What did you learn?", "Write about the issue, the people affected and what reliable sources say.")}
        ${textField("storyQuestion", "What would you like to understand better?", "Write a question for further research.")}
        ${saveButton()}
      `
    },

    "career-exploration": {
      title: "Career Exploration",
      category: "DREAMS, OPTIONS & DIRECTION",
      description: "Explore different paths, discover what matters to you and learn how careers work.",
      intro: "You do not need to decide your entire future while you are still in school. Career exploration is about learning what different people do, what skills they use and what education or training may be needed.",
      sections: [
        ["Interests can change", "You might enjoy science today and art tomorrow. Having several interests is not a problem. They can help you discover combinations of subjects, skills and careers."],
        ["Look at the actual work", "A job title does not tell you everything. Learn about everyday responsibilities, working conditions, challenges, training and the people a role serves."],
        ["Understand the pathway", "Some careers require a university degree, professional training, licensing or competitive entrance exams. Requirements differ by country and can change, so check official institutions."],
        ["A life is bigger than a job", "Family, health, friendships, creativity, service, travel and rest can all matter. Your future should include the kind of life and contribution that feel meaningful to you."]
      ],
      fact: "Career decisions are easier when you compare real responsibilities and pathways, not just job titles or salaries.",
      advice: "Choose a subject or career you are curious about and research one real person's workday.",
      tutorial: "how to explore careers as a student",
      tool: `
        <h3>Quick direction quiz</h3>
        <p>Choose the answer that feels closest to your interests. This is a reflection activity, not a scientific career test.</p>
        <form id="careerQuiz">
          <label class="field-label">1. Which activity sounds interesting?</label>
          <select class="feature-select" name="q1">
            <option value="people">Helping people directly</option>
            <option value="science">Understanding science and health</option>
            <option value="creative">Making or designing things</option>
            <option value="ideas">Researching ideas and problems</option>
          </select>

          <label class="field-label">2. What kind of challenge do you enjoy?</label>
          <select class="feature-select" name="q2">
            <option value="people">Listening and supporting others</option>
            <option value="science">Solving technical questions</option>
            <option value="creative">Expressing ideas creatively</option>
            <option value="ideas">Understanding complex issues</option>
          </select>

          <label class="field-label">3. Which environment interests you?</label>
          <select class="feature-select" name="q3">
            <option value="people">Community or care settings</option>
            <option value="science">Laboratories or clinical settings</option>
            <option value="creative">Studios or creative teams</option>
            <option value="ideas">Research or learning environments</option>
          </select>

          <button class="primary-button" type="submit">Explore my interests</button>
        </form>
        <div id="careerResult" class="activity-status" aria-live="polite"></div>
        <h3>Useful official starting points</h3>
        <div class="resource-grid">
          ${linkCard("National Career Service", "Explore career information in India.", "https://www.ncs.gov.in/")}
          ${linkCard("National Testing Agency", "Check official entrance examination information.", "https://nta.ac.in/")}
          ${linkCard("University Grants Commission", "Find higher education information in India.", "https://www.ugc.gov.in/")}
        </div>
        ${textField("careerDream", "Dreams beyond a career", "What kind of life, contribution or experiences matter to you?")}
        ${textField("careerNotes", "Careers I want to research", "Write down job titles, degrees or questions.")}
        ${saveButton()}
      `
    },

    "my-little-world": {
      title: "My Little World",
      category: "MEMORIES & PERSONAL EXPRESSION",
      description: "A scrapbook-style space for memories, ideas, photographs and letters to yourself.",
      intro: "Your life is made of many moments: exciting days, ordinary routines, new friendships, difficult experiences and things you are still figuring out. This space lets you collect memories in your own words.",
      sections: [
        ["Keep the moments that matter", "A memory can be a photograph, a sentence, a ticket, a place or a small detail you do not want to forget. It does not need to look perfect."],
        ["Make space for every kind of day", "Not every memory is happy. You can record a difficult day honestly without making yourself relive anything you are not ready to write about. You can also choose not to save something."],
        ["Letters to your future self", "Writing to your future self can help you notice what you care about now, what you are learning and what you hope to remember later."],
        ["Think about digital safety", "This prototype stores entries and photos in this browser. It is not a secure private cloud diary. Avoid saving sensitive information or photographs you would not want someone with access to this device to see."]
      ],
      fact: "A scrapbook can be made from words and memories. It does not need expensive materials.",
      advice: "Give each memory a date and a title so it is easier to find later.",
      tutorial: "digital scrapbook ideas for beginners",
      tool: `
        ${inputField("memoryTitle", "Memory title", "A day I want to remember")}
        ${selectField("memoryType", "What kind of memory is this?", ["Everyday moment", "A happy memory", "A challenge I learned from", "A friendship", "A place", "A personal achievement", "A random thought"])}
        ${textField("memoryText", "Write your memory", "Describe what happened and why it matters to you.")}
        <label class="field-label" for="memoryPhoto">Add a photograph (optional)</label>
        <input class="feature-input" id="memoryPhoto" type="file" accept="image/*">
        <div id="memoryPreview" class="memory-preview"></div>
        ${textField("futureLetter", "A letter to my future self", "What do you hope you remember?")}
        ${saveButton()}
        <p class="small-note">Photo entries are stored in this browser only. Avoid uploading private or sensitive photographs on a shared device.</p>
      `
    },

    "movie-theatre": {
      title: "Movie Theatre",
      category: "STORIES ON SCREEN",
      description: "Discover films, reflect on stories and make room for thoughtful entertainment.",
      intro: "Films can entertain, introduce unfamiliar places, explore human experiences and raise questions. A good movie night does not have to be expensive or complicated. Choose content that is appropriate for your age and comfortable for you.",
      sections: [
        ["Stories help us explore ideas", "A film can show different perspectives, relationships, cultures and historical events. Remember that fictional stories may simplify or change real events."],
        ["Watch critically", "Notice whose perspective the story follows, what assumptions it makes and whether the events are represented fairly. For historical films, compare the story with reliable sources."],
        ["Choose thoughtfully", "Check age ratings, content descriptions and reviews before watching. You can stop watching something that makes you uncomfortable."],
        ["Share the experience", "Discussing a film can be as enjoyable as watching it. Talk about a character's choices, the message, the soundtrack or the ending."]
      ],
      fact: "A film inspired by real events is not automatically a fully accurate historical account.",
      advice: "Before watching, check its age rating and content information.",
      tutorial: "how to write a film review for students",
      tool: `
        ${inputField("movieName", "Film title", "What did you watch?")}
        ${selectField("movieGenre", "Genre", ["Drama", "Documentary", "Animation", "Adventure", "Comedy", "History", "Science fiction", "Other"])}
        ${selectField("movieRating", "How did you find it?", ["Loved it", "Interesting", "It was okay", "Not for me"])}
        ${textField("movieThought", "What stood out to you?", "A scene, character, idea or question.")}
        ${textField("movieReview", "Write a short review", "Would you recommend it? Why or why not?")}
        <div class="resource-grid">
          ${linkCard("Common Sense Media", "Check age guidance and content reviews.", "https://www.commonsensemedia.org/")}
          ${linkCard("IMDb", "Look up film information and credits.", "https://www.imdb.com/")}
        </div>
        ${saveButton()}
      `
    },

    "the-commons": {
      title: "The Commons",
      category: "COMMUNITY & CONVERSATION",
      description: "A place to explore ideas, thoughtful questions and respectful conversations.",
      intro: "A community becomes stronger when people can ask questions, listen and disagree respectfully. The Commons is a guided space for thinking about everyday issues and learning from different perspectives.",
      sections: [
        ["Listen before responding", "People may have experiences that are different from yours. Listening carefully can help you understand why someone sees an issue differently."],
        ["Disagreement can be respectful", "You can challenge an idea without insulting the person who shared it. Explain your reasons, use evidence and be willing to reconsider."],
        ["Protect personal information", "Do not share your address, phone number, passwords, school timetable or private details in public spaces. Be careful about sharing photographs and identifying information."],
        ["Make room for everyone", "A thoughtful discussion does not need to be loud or competitive. Give others time to speak and avoid jokes that target someone's identity or circumstances."]
      ],
      fact: "A strong argument explains its reasons and evidence rather than attacking the person who disagrees.",
      advice: "Try beginning with: “I see it differently because…” or “Can you explain what you mean?”",
      tutorial: "how to have respectful discussions and debates",
      tool: `
        ${selectField("commonsTopic", "Choose a discussion topic", ["Education and learning", "Environment", "Technology and society", "Books and ideas", "Community wellbeing", "Human rights", "Everyday life"])}
        ${textField("commonsQuestion", "A question worth discussing", "What would you like people to think about?")}
        ${textField("commonsView", "Your point of view", "Explain your idea and why you think this.")}
        ${textField("commonsOther", "Another perspective to consider", "What might someone with a different view say?")}
        <p class="small-note">This is a private reflection activity, not a public discussion board. Do not enter personal contact details.</p>
        ${saveButton()}
      `
    },

    "sports-events": {
      title: "Sports & Events",
      category: "MOVEMENT, TEAMWORK & PARTICIPATION",
      description: "Explore sports, local activities, running, cycling, swimming and event planning.",
      intro: "Sport can bring people together, build skills and create a sense of belonging. You do not have to be a professional athlete to enjoy it. Participation, teamwork, curiosity and safe practice all matter.",
      sections: [
        ["Find your kind of movement", "Some people enjoy team sports, while others prefer running, cycling, swimming, dance or individual activities. Try different options when it is safe and accessible."],
        ["Train with patience", "Skills develop through practice and recovery. Avoid sudden increases in activity and take breaks when you need them. Ask a qualified coach or health professional for guidance if you have concerns."],
        ["Events bring communities together", "A school sports day, charity walk, local tournament or cycling event can create shared experiences. Check event rules, age requirements, supervision and safety arrangements."],
        ["Celebrate participation", "Personal progress is not measured only by winning. Learning a skill, encouraging a teammate and completing an activity can all be meaningful."]
      ],
      fact: "Teamwork includes communication, encouragement and respect, not only performance.",
      advice: "Before joining an event, check the organiser, route, age rules, safety arrangements and whether an adult needs to accompany you.",
      tutorial: "beginner running technique and warm up",
      tool: `
        ${selectField("sportType", "Choose an activity", ["Running", "Cycling", "Swimming", "Football", "Basketball", "Badminton", "Athletics", "Walking event", "Other"])}
        ${inputField("sportEvent", "Event or activity name", "Example: School sports day")}
        ${inputField("sportDate", "Date", "", "date")}
        ${selectField("sportRole", "Your role", ["Participant", "Volunteer with permission", "Spectator", "Organiser with adult support", "Still exploring"])}
        ${textField("sportPlan", "Preparation and safety notes", "What do you need to check before taking part?")}
        <div class="resource-grid">
          ${linkCard("World Athletics", "Explore athletics and running information.", "https://worldathletics.org/")}
          ${linkCard("Strava", "External activity tracking service.", "https://www.strava.com/")}
          ${linkCard("Beginner cycling skills", "Find beginner cycling tutorials.", youtubeSearch("beginner cycling safety skills"))}
          ${linkCard("Swimming basics", "Find swimming guidance and lessons.", youtubeSearch("beginner swimming lessons safety"))}
        </div>
        <p class="small-note">This page does not register you for events or connect to Strava. Ask a parent or trusted adult before attending events or sharing location information.</p>
        ${saveButton()}
      `
    },

    "day-planner": {
      title: "Day Planner",
      category: "A LITTLE STRUCTURE",
      description: "Make a flexible plan for your day, with space for rest and unexpected things.",
      intro: "A planner should support your day, not control it. You can use it to organise schoolwork, activities, family responsibilities and time for yourself. A plan can change when life changes.",
      sections: [
        ["Choose priorities", "Start by identifying what genuinely needs attention. A short list of priorities can be more useful than writing down every possible task."],
        ["Make tasks manageable", "Break larger tasks into smaller actions. “Complete the introduction” is easier to begin than “finish the whole project”."],
        ["Leave room for breaks", "Rest, meals, movement and sleep are not wasted time. A realistic plan includes space for them."],
        ["Adjust without guilt", "If something takes longer than expected, move tasks around. A planner is a tool, not a measure of your worth."]
      ],
      fact: "A flexible plan can be more useful than a perfect timetable that leaves no room for change.",
      advice: "Choose three priorities at most for a busy day, then add smaller tasks if you have time.",
      tutorial: "simple daily planning for students",
      tool: `
        ${inputField("planDate", "Plan date", "", "date")}
        ${inputField("planPriority1", "Priority one", "The most important task")}
        ${inputField("planPriority2", "Priority two", "Another useful task")}
        ${inputField("planPriority3", "Priority three", "A smaller task")}
        ${textField("planSchedule", "My flexible timetable", "Morning:\nAfternoon:\nEvening:")}
        ${textField("planBreaks", "Breaks and personal time", "When can you rest, eat, move or enjoy something?")}
        ${textField("planTomorrow", "Something for tomorrow", "What can wait until another day?")}
        ${saveButton()}
      `
    },

    "creative-studio": {
      title: "The Creative Studio",
      category: "MAKE SOMETHING YOURS",
      description: "Experiment with writing, art, design, photography and creative ideas.",
      intro: "Creativity is not limited to people who draw perfectly or write beautifully. It can be a sketch, a story, a collage, a melody, a photograph, a design or an unusual question.",
      sections: [
        ["Start before you feel ready", "You do not need a perfect idea to begin. Try making a rough version, collecting references or writing down a few possibilities."],
        ["Experiment with materials", "Use what you have: paper, a phone camera, colours, words, shapes or recycled materials. Creative work can be simple and still meaningful."],
        ["Inspiration is everywhere", "Nature, architecture, music, conversations and everyday objects can inspire ideas. Keep a small collection of things that make you curious."],
        ["Your work can change", "A first draft is allowed to be imperfect. Edit, rearrange, try a different approach or decide that the experiment taught you something."]
      ],
      fact: "Creative practice grows through experimenting, observing and trying again.",
      advice: "Set a small creative challenge and give yourself permission to make a rough first version.",
      tutorial: "beginner creative journaling and art ideas",
      tool: `
        ${selectField("creativeType", "Choose your creative medium", ["Writing", "Poetry", "Drawing", "Photography", "Graphic design", "Crafts", "Storytelling", "Other"])}
        ${inputField("creativeTitle", "Project title", "Give your idea a name")}
        ${textField("creativeIdea", "Your idea", "What would you like to create?")}
        ${textField("creativeDraft", "First draft or sketch notes", "Describe it or write your first version.")}
        ${textField("creativeNext", "What will you try next?", "One small improvement or experiment.")}
        <div class="resource-grid">
          ${linkCard("Canva Design School", "Explore design lessons and creative ideas.", "https://www.canva.com/designschool/")}
          ${linkCard("Khan Academy Art", "Explore art history and visual arts.", "https://www.khanacademy.org/humanities/art-history")}
        </div>
        ${saveButton()}
      `
    },

    "kindness-project": {
      title: "The Kindness Project",
      category: "SMALL ACTIONS, REAL CARE",
      description: "Explore thoughtful ways to support people and make your community kinder.",
      intro: "Kindness is not always a grand gesture. It can mean including someone, listening without interrupting, helping with a task or treating people with dignity. Small actions can make shared spaces more welcoming.",
      sections: [
        ["Notice what people need", "Kindness begins with paying attention. Someone may need practical help, a listening ear, inclusion or simply respect for their space."],
        ["Respect boundaries", "Helping does not mean deciding what is best for someone without asking. Offer support and respect their answer."],
        ["Make kindness practical", "You could help a classmate understand a lesson, thank a school worker, share useful information or take part in a supervised community activity."],
        ["Keep yourself safe too", "Do not meet strangers, share private information or organise donations alone. Involve a trusted adult and use established organisations for volunteering or fundraising."]
      ],
      fact: "Respecting someone's boundaries is also an act of kindness.",
      advice: "Choose an action that is safe, realistic and genuinely useful to the person receiving it.",
      tutorial: "simple kindness project ideas for students",
      tool: `
        ${selectField("kindnessArea", "Where would you like to make a difference?", ["At school", "At home", "With friends", "In my neighbourhood", "Online", "Environment and animals"])}
        ${textField("kindnessIdea", "Your kindness idea", "What small action could help?")}
        ${textField("kindnessSteps", "How will you do it safely?", "Who needs to be involved? What permission might you need?")}
        ${textField("kindnessReflection", "Afterwards", "What did you learn from the experience?")}
        <h3>Small ideas to consider</h3>
        ${checklist(["Include someone in a group activity", "Thank someone for their work", "Help with a school task", "Share a useful learning resource", "Take part in an adult-supervised community activity", "Care for a shared space"], "kindness")}
        ${saveButton()}
      `
    },

    "learning-library": {
      title: "The Learning Library",
      category: "CURIOSITY & KNOWLEDGE",
      description: "Find reliable learning resources, explore new subjects and build useful skills.",
      intro: "Learning does not stop when a class ends. You can explore science, history, languages, mathematics, art, technology and the world around you. The best resource is one that helps you understand, not just memorise.",
      sections: [
        ["Follow your curiosity", "Start with a question you genuinely want answered. It can lead you to a book, lesson, documentary, experiment or conversation."],
        ["Check your sources", "Look for the author, organisation, date and evidence behind information. Be cautious with anonymous posts and claims that sound too dramatic to be true."],
        ["Learn actively", "Take notes in your own words, test yourself, solve examples and explain what you learned. Try connecting new information to something you already know."],
        ["Build a learning habit", "You do not need to study everything at once. A short, regular session can help you explore a topic over time."]
      ],
      fact: "Explaining a topic in your own words is a useful way to check your understanding.",
      advice: "Write one question before opening a resource. Look for an answer, then summarise it in your own words.",
      tutorial: "how to research a topic and take effective notes",
      tool: `
        ${selectField("learningSubject", "Choose a subject", ["Science", "Mathematics", "History", "Geography", "Languages", "Literature", "Environment", "Health", "Arts", "Other"])}
        ${inputField("learningQuestion", "What do you want to learn?", "Write one question")}
        ${textField("learningNotes", "Learning notes", "Write what you discovered in your own words.")}
        ${textField("learningSources", "Sources used", "List the websites, books or videos you checked.")}
        <h3>Free learning resources</h3>
        <div class="resource-grid">
          ${linkCard("Khan Academy", "Lessons and practice across many subjects.", "https://www.khanacademy.org/")}
          ${linkCard("NCERT", "Official school textbooks and resources.", "https://ncert.nic.in/")}
          ${linkCard("SWAYAM", "Online courses and learning resources in India.", "https://swayam.gov.in/")}
          ${linkCard("National Digital Library", "Explore digital learning resources.", "https://ndl.iitkgp.ac.in/")}
          ${linkCard("NASA", "Space, science and exploration resources.", "https://www.nasa.gov/")}
          ${linkCard("UNESCO", "Education, culture and science resources.", "https://www.unesco.org/")}
        </div>
        ${saveButton()}
      `
    },

    "sleep-sanctuary": {
      title: "The Sleep Sanctuary",
      category: "REST & ROUTINE",
      description: "Understand sleep and create a comfortable routine that supports rest.",
      intro: "Sleep is an important part of everyday health, learning and wellbeing. A good routine is not about being perfect. It is about making it easier for yourself to wind down and get enough rest for your needs.",
      sections: [
        ["Why sleep matters", "Sleep supports attention, memory, mood and physical health. When you are regularly tired, school and everyday activities can feel more difficult."],
        ["Build a wind-down routine", "A calm activity before bed may help you transition away from a busy day. You could read, prepare for tomorrow, listen to quiet audio or spend time away from bright screens."],
        ["Make your environment comfortable", "A comfortable, quiet and suitably dark sleeping space can help. Not everyone controls their home environment, so focus on changes that are realistic for you."],
        ["When sleep is difficult", "If sleep problems continue or affect your daily life, speak with a trusted adult and a qualified health professional. Avoid taking sleep medicines or supplements without appropriate medical advice."]
      ],
      fact: "A regular, relaxing routine can help signal that the day is winding down.",
      advice: "Try choosing one calm activity to repeat before bedtime. Keep the routine flexible.",
      tutorial: "relaxing bedtime routine for students",
      tool: `
        <h3>My wind-down checklist</h3>
        ${checklist(["Prepare what I need for tomorrow", "Put away school materials", "Choose a calm activity", "Reduce unnecessary screen use", "Make my sleeping space comfortable", "Give myself time to wind down"], "sleep")}
        ${selectField("sleepRoutine", "What helps you relax?", ["Reading", "Quiet music", "Prayer or reflection", "Gentle stretching", "Writing in a journal", "A calm conversation", "Something else"])}
        ${textField("sleepNote", "My evening routine", "What would make evenings feel calmer?")}
        <div class="resource-grid">
          ${linkCard("NHS — Sleep tips", "General information about sleep.", "https://www.nhs.uk/every-mind-matters/mental-wellbeing-tips/how-to-fall-asleep-faster-and-sleep-better/")}
          ${linkCard("National Sleep Foundation", "Explore sleep education resources.", "https://www.thensf.org/")}
        </div>
        ${saveButton()}
      `
    },

    "money-matters": {
      title: "Money Matters",
      category: "EVERYDAY FINANCIAL LITERACY",
      description: "Learn about budgeting, saving, needs, wants and responsible money decisions.",
      intro: "Understanding money is a useful life skill. You can begin with simple ideas such as planning how to use pocket money, comparing prices, setting a savings goal and recognising unsafe financial offers.",
      sections: [
        ["Needs and wants", "Needs are things required for everyday life, while wants are things you would like to have. The difference can depend on circumstances, so think carefully rather than judging yourself or others."],
        ["A simple budget", "A budget is a plan for money coming in and money going out. Even a small plan can help you understand spending and decide what you want to save."],
        ["Saving takes time", "A savings goal can be something small and realistic. You do not need to save every rupee or feel guilty about reasonable spending."],
        ["Stay safe online", "Be cautious of promises of quick money, suspicious links, requests for passwords and offers that require you to pay first. Never share banking details or one-time passwords."]
      ],
      fact: "A budget is a plan, not a judgement about how much money someone has.",
      advice: "Start by recording a few purchases and noticing where your money goes.",
      tutorial: "budgeting and saving money for teenagers",
      tool: `
        ${inputField("moneyAmount", "Money available (₹)", "Example: 500", "number")}
        ${inputField("moneySaving", "Savings goal (₹)", "Example: 200", "number")}
        ${inputField("moneySpent", "Money spent so far (₹)", "Example: 100", "number")}
        ${textField("moneyNeeds", "Needs and planned expenses", "What do you need to pay for?")}
        ${textField("moneyWants", "Wants and optional spending", "What would you like to save for?")}
        <div id="moneyResult" class="activity-status"></div>
        ${button("Calculate my remaining amount", "money-calculate")}
        <p class="small-note">This is a learning exercise, not financial advice. Ask a trusted adult before making financial decisions or using financial services.</p>
        ${saveButton()}
      `
    },

    "open-mic": {
      title: "The Open Mic",
      category: "WORDS, VOICES & EXPRESSION",
      description: "A quiet stage for poetry, stories, speeches, reflections and ideas.",
      intro: "Your voice does not have to sound like anyone else's. You can write a poem, practise a speech, tell a story or express an idea. You can keep your work private or share it with people you trust.",
      sections: [
        ["Find your own voice", "Writing and speaking are ways to organise thoughts and communicate experiences. You do not need complicated vocabulary to say something meaningful."],
        ["Try different forms", "A poem, a short story, a speech, a letter and a spoken-word piece each have different possibilities. Experiment and see what feels natural."],
        ["Edit without losing your meaning", "Read your work aloud, notice where the rhythm changes and remove words that do not help. Keep the parts that sound honest to you."],
        ["Share safely", "You do not have to publish personal writing online. If you perform or share something publicly, think about privacy, audience, permission and whether you are comfortable with it."]
      ],
      fact: "A clear, honest sentence can be more powerful than complicated language.",
      advice: "Write a first draft without editing every line. You can improve it afterwards.",
      tutorial: "spoken word poetry and public speaking for beginners",
      tool: `
        ${selectField("micType", "Choose your form", ["Poetry", "Spoken word", "Short story", "Speech", "Personal reflection", "Letter", "Other"])}
        ${inputField("micTitle", "Title", "Give your piece a title")}
        ${textField("micDraft", "Your writing space", "Begin wherever you like...", 9)}
        ${textField("micEdit", "What would you like to improve?", "Think about rhythm, clarity, emotion or structure.")}
        <h3>Before sharing</h3>
        ${checklist(["I am comfortable with the audience", "I have checked for private details", "I have permission if someone else's work or image is included", "I know I can choose not to share"], "openmic")}
        ${saveButton()}
      `
    }

  };

  const feature = features[slug];

  if (!feature) {
    document.title = "Space not found | To the Ether.";
    titleElement && (titleElement.textContent = "We couldn't find that space.");
    descriptionElement && (descriptionElement.textContent = "Return to the homepage and choose one of the 20 spaces.");
    contentElement.innerHTML = `
      <section class="tool-section">
        <h2>This space does not exist yet.</h2>
        <p>Please return to the homepage and choose a feature card.</p>
        <a class="primary-button" href="index.html#explore">Back to Explore</a>
      </section>
    `;
    return;
  }

  /* ---------- PAGE HEADER ---------- */

  document.title = `${feature.title} | To the Ether.`;

  if (titleElement) titleElement.textContent = feature.title;
  if (categoryElement) categoryElement.textContent = feature.category;
  if (descriptionElement) descriptionElement.textContent = feature.description;

  document.body.classList.add(`feature-${slug}`);

  /* ---------- PAGE CONTENT ---------- */

  contentElement.innerHTML = `
    <section class="feature-introduction">
      <p class="eyebrow">WELCOME TO YOUR SPACE</p>
      <p class="feature-lead">${feature.intro}</p>
    </section>

    ${feature.sections.map((item, index) => `
      <section class="feature-reading-block">
        <span class="reading-number">0${index + 1}</span>
        <div>
          <h2>${item[0]}</h2>
          <p>${item[1]}</p>
        </div>
      </section>
    `).join("")}

    <section class="feature-insight">
      <p class="eyebrow">A LITTLE SOMETHING TO REMEMBER</p>
      <h2>${feature.fact}</h2>
      <p>${feature.advice}</p>
    </section>

    ${section("Explore and try", `
      <p>Use this activity space at your own pace. You can save your work when you are ready.</p>
      ${feature.tool}
    `)}

    ${section("Learn a little more", `
      <p>Explore a tutorial related to this space. External videos and websites open in a new tab.</p>
      ${tutorialBlock(feature.tutorial, "Find a beginner-friendly explanation or demonstration. Choose content that is suitable for you.")}
    `)}

    ${section("Your progress", `
      <p>Keep track of activities you have completed in this browser.</p>
      <div id="featureProgress"></div>
    `)}

    <section class="feature-closing">
      <p class="script-note">A gentle reminder</p>
      <h2>You do not have to do everything today.</h2>
      <p>Take what is useful, leave what is not, and return whenever you feel ready.</p>
    </section>
  `;

  /* ---------- SAVE CURRENT PAGE ---------- */

  function collectCurrentContent() {
    const fields = contentElement.querySelectorAll(
      "input:not([type='checkbox']):not([type='file']), textarea, select"
    );

    const values = [];

    fields.forEach(field => {
      if (field.value?.trim()) {
        const label = contentElement.querySelector(`label[for="${field.id}"]`);
        values.push(`${label?.textContent || field.id || "Answer"}: ${field.value.trim()}`);
      }
    });

    const checked = contentElement.querySelectorAll("input[type='checkbox']:checked");
    checked.forEach(item => {
      const label = item.closest("label");
      if (label) values.push(`Completed: ${label.textContent.trim()}`);
    });

    return values.join("\n\n");
  }

  contentElement.addEventListener("click", event => {
    const actionButton = event.target.closest("[data-action]");
    if (!actionButton) return;

    const action = actionButton.dataset.action;

    if (action === "save-entry") {
      const title =
        getText("memoryTitle") ||
        getText("gratitudeTitle") ||
        getText("movieName") ||
        getText("creativeTitle") ||
        getText("micTitle") ||
        getText("studyTask") ||
        getText("sportEvent") ||
        getText("planDate") ||
        feature.title;

      const content = collectCurrentContent();

      let photoData = null;
      if (slug === "my-little-world") {
        photoData = window.currentMemoryPhoto || null;
      }

      saveEntry(title, content, photoData ? { photo: photoData } : {});
    }

    if (action === "view-saved") {
      const page = savedPages().find(item => String(item.id) === actionButton.dataset.id);
      if (!page) return;

      const viewer = document.getElementById("savedPageViewer");
      if (viewer) viewer.remove();

      const panel = document.createElement("section");
      panel.id = "savedPageViewer";
      panel.className = "tool-section saved-page-viewer";
      panel.innerHTML = `
        <h2>${escapeHTML(page.title)}</h2>
        <p class="eyebrow">${escapeHTML(page.date || "")}</p>
        <p class="saved-page-content">${escapeHTML(page.content || "").replace(/\n/g, "<br>")}</p>
        ${page.photo ? `<img src="${page.photo}" alt="Saved scrapbook memory" class="saved-memory-photo">` : ""}
        <button type="button" class="secondary-button" data-action="close-viewer">Close</button>
      `;
      contentElement.prepend(panel);
      panel.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    if (action === "close-viewer") {
      document.getElementById("savedPageViewer")?.remove();
    }

    if (action === "delete-saved") {
      const id = actionButton.dataset.id;
      const updated = savedPages().filter(item => String(item.id) !== id);
      writeData(SAVED_KEY, updated);
      renderSavedPages();
    }

    if (action === "random-reminder") {
      const reminders = [
        "You are allowed to take things one step at a time.",
        "A small beginning is still a beginning.",
        "You do not have to compare your day with someone else's.",
        "Rest is a useful part of a full day.",
        "It is okay to ask someone for help.",
        "Your worth is not measured by your productivity."
      ];
      const target = document.getElementById("randomReminder");
      if (target) target.textContent = reminders[Math.floor(Math.random() * reminders.length)];
      markProgress("reminder");
    }

    if (action === "start-breathing") startBreathing();
    if (action === "stop-breathing") stopBreathing();

    if (action === "start-study") startStudyTimer();
    if (action === "pause-study") pauseStudyTimer();
    if (action === "reset-study") resetStudyTimer();

    if (action === "money-calculate") calculateMoney();
  });

  /* ---------- CHECKLIST PROGRESS ---------- */

  contentElement.addEventListener("change", event => {
    if (event.target.matches("[data-progress]")) {
      const group = event.target.dataset.progress;
      const checked = contentElement.querySelectorAll(
        `[data-progress="${group}"]:checked`
      ).length;

      if (checked > 0) markProgress(`${group}-${checked}`);
    }

    if (event.target.id === "studyLevel") {
      const minutes = event.target.value.includes("10") ? 10 :
        event.target.value.includes("20") ? 20 : 25;

      const display = document.getElementById("studyTimer");
      if (display && !studyInterval) {
        display.textContent = `${String(minutes).padStart(2, "0")}:00`;
        studySeconds = minutes * 60;
      }
    }

    if (event.target.id === "memoryPhoto") {
      handleMemoryPhoto(event.target.files?.[0]);
    }
  });

  /* ---------- BREATHING GUIDE ---------- */

  let breathingInterval = null;
  let breathingCount = 0;

  function startBreathing() {
    stopBreathing();

    const orb = document.getElementById("breathingOrb");
    const instruction = document.getElementById("breathingInstruction");
    const status = document.getElementById("breathingStatus");

    if (!orb || !instruction) return;

    const phases = [
      { label: "Breathe in gently", className: "inhale", seconds: 4 },
      { label: "Breathe out gently", className: "exhale", seconds: 4 }
    ];

    breathingCount = 0;
    let phase = 0;
    let elapsed = 0;

    function updatePhase() {
      const current = phases[phase];
      instruction.textContent = current.label;
      orb.classList.remove("inhale", "exhale");
      orb.classList.add(current.className);
      if (status) status.textContent = "Follow only if this rhythm feels comfortable.";
    }

    updatePhase();

    breathingInterval = setInterval(() => {
      elapsed++;

      if (elapsed >= phases[phase].seconds) {
        elapsed = 0;
        phase = (phase + 1) % phases.length;
        breathingCount++;
        updatePhase();

        if (breathingCount >= 12) {
          stopBreathing();
          if (instruction) instruction.textContent = "Well done";
          if (status) status.textContent = "Your short breathing session is complete. Take your time.";
          markProgress("breathing-session");
        }
      }
    }, 1000);
  }

  function stopBreathing() {
    if (breathingInterval) clearInterval(breathingInterval);
    breathingInterval = null;

    const orb = document.getElementById("breathingOrb");
    const instruction = document.getElementById("breathingInstruction");
    const status = document.getElementById("breathingStatus");

    orb?.classList.remove("inhale", "exhale");

    if (instruction) instruction.textContent = "Ready?";
    if (status) status.textContent = "Session stopped. You can begin again whenever you like.";
  }

  /* ---------- STUDY TIMER ---------- */

  let studySeconds = 600;
  let studyInterval = null;

  function updateStudyDisplay() {
    const display = document.getElementById("studyTimer");
    if (!display) return;

    const minutes = Math.floor(studySeconds / 60);
    const seconds = studySeconds % 60;

    display.textContent =
      `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function startStudyTimer() {
    if (studyInterval) return;

    const status = document.getElementById("studyTimerStatus");
    if (status) status.textContent = "Focus session in progress. Remember to take a break afterwards.";

    studyInterval = setInterval(() => {
      if (studySeconds <= 0) {
        pauseStudyTimer();
        if (status) status.textContent = "Session complete. Take a comfortable break.";
        markProgress("study-timer");
        alert("Your study session is complete. Time for a break!");
        return;
      }

      studySeconds--;
      updateStudyDisplay();
    }, 1000);
  }

  function pauseStudyTimer() {
    if (studyInterval) clearInterval(studyInterval);
    studyInterval = null;

    const status = document.getElementById("studyTimerStatus");
    if (status) status.textContent = "Timer paused.";
  }

  function resetStudyTimer() {
    pauseStudyTimer();

    const selected = getValue("studyLevel");
    const minutes = selected.includes("10") ? 10 :
      selected.includes("20") ? 20 : 25;

    studySeconds = minutes * 60;
    updateStudyDisplay();

    const status = document.getElementById("studyTimerStatus");
    if (status) status.textContent = "Timer reset. Ready when you are.";
  }

  /* ---------- SCRAPBOOK PHOTO ---------- */

  window.currentMemoryPhoto = null;

  function handleMemoryPhoto(file) {
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please choose an image file.");
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      alert("Please choose an image smaller than 3 MB.");
      return;
    }

    const reader = new FileReader();

    reader.onload = event => {
      const image = new Image();

      image.onload = () => {
        const maxDimension = 1000;
        const scale = Math.min(
          1,
          maxDimension / Math.max(image.width, image.height)
        );

        const canvas = document.createElement("canvas");
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);

        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        window.currentMemoryPhoto = canvas.toDataURL("image/jpeg", 0.78);

        const preview = document.getElementById("memoryPreview");
        if (preview) {
          preview.innerHTML = `
            <img src="${window.currentMemoryPhoto}" alt="Scrapbook photo preview">
            <button type="button" class="text-button" id="removeMemoryPhoto">Remove photo</button>
          `;

          document.getElementById("removeMemoryPhoto")?.addEventListener("click", () => {
            window.currentMemoryPhoto = null;
            preview.innerHTML = "";
            const input = document.getElementById("memoryPhoto");
            if (input) input.value = "";
          });
        }
      };

      image.src = event.target.result;
    };

    reader.readAsDataURL(file);
  }

  /* ---------- CAREER QUIZ ---------- */

  contentElement.addEventListener("submit", event => {
    if (event.target.id !== "careerQuiz") return;

    event.preventDefault();

    const formData = new FormData(event.target);
    const counts = {};

    ["q1", "q2", "q3"].forEach(key => {
      const answer = formData.get(key);
      counts[answer] = (counts[answer] || 0) + 1;
    });

    const winner = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0];

    const results = {
      people: "You may enjoy exploring people-focused fields such as medicine, teaching, counselling, social work, community development or humanitarian support.",
      science: "You may enjoy exploring science-focused fields such as medicine, research, engineering, laboratory science or environmental science.",
      creative: "You may enjoy exploring creative fields such as design, writing, architecture, media, animation or the performing arts.",
      ideas: "You may enjoy exploring research and ideas-focused fields such as law, history, policy, economics, journalism or academic research."
    };

    const result = document.getElementById("careerResult");

    if (result) {
      result.innerHTML = `
        <h3>Your starting point</h3>
        <p>${results[winner] || "Explore different fields and see what interests you."}</p>
        <p><strong>Remember:</strong> This is only a reflection activity. It does not predict your future or limit your options.</p>
      `;
    }

    markProgress("career-quiz");
  });

  /* ---------- MONEY CALCULATOR ---------- */

  function calculateMoney() {
    const available = Number(getValue("moneyAmount"));
    const spent = Number(getValue("moneySpent"));
    const target = document.getElementById("moneyResult");

    if (!target) return;

    if (!Number.isFinite(available) || !Number.isFinite(spent) ||
        available < 0 || spent < 0 || !getValue("moneyAmount")) {
      target.textContent = "Enter a valid amount and spending figure.";
      return;
    }

    const remaining = available - spent;

    target.textContent = remaining >= 0
      ? `You have ₹${remaining.toFixed(2)} remaining from your planned amount.`
      : `You have spent ₹${Math.abs(remaining).toFixed(2)} more than the amount entered.`;

    markProgress("money-calculation");
  }

  /* ---------- INITIALISE ---------- */

  renderSavedPages();
  renderProgress();

});
