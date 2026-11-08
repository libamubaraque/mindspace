
/* =========================================
   TO THE ETHER — TEN INTERACTIVE FEATURES
   ========================================= */

const FEATURE_CONTENT = {
    mood: {
        title: "Mood Journal",
        subtitle: "A little space to understand yourself.",
        intro: "There is no right or wrong way to feel. Take a moment to check in.",
        icon: "♡"
    },
    breathing: {
        title: "Breathing Space",
        subtitle: "Pause. Breathe. Begin again.",
        intro: "Choose a comfortable breathing rhythm. You can stop whenever you wish.",
        icon: "❋"
    },
    gratitude: {
        title: "Gratitude Journal",
        subtitle: "Collect the little things.",
        intro: "Your moments do not have to be extraordinary to matter.",
        icon: "✿"
    },
    fitness: {
        title: "Fitness & Wellness",
        subtitle: "Movement is a way to care for yourself.",
        intro: "Explore movement, running, cycling, rest and healthy routines without pressure.",
        icon: "✧"
    },
    checkin: {
        title: "Daily Check-in",
        subtitle: "How is today going?",
        intro: "A few little questions to reconnect with yourself.",
        icon: "☼"
    },
    study: {
        title: "Study & Focus",
        subtitle: "One thing at a time.",
        intro: "Make room for learning and proper breaks.",
        icon: "⌘"
    },
    selfcare: {
        title: "Self-care Corner",
        subtitle: "Care for yourself in everyday ways.",
        intro: "Rest, routines, relationships and little things that make life easier.",
        icon: "❀"
    },
    support: {
        title: "Health & Support",
        subtitle: "Knowledge, care and support.",
        intro: "Learn about well-being and find ways to ask for reliable help.",
        icon: "＋"
    },
    career: {
        title: "Find Your Direction",
        subtitle: "You are allowed to have a hundred dreams.",
        intro: "Explore your interests. You do not need to decide your entire future today.",
        icon: "✦"
    },
    myworld: {
        title: "My Little World",
        subtitle: "A little home for your memories.",
        intro: "Keep photographs, letters, thoughts and milestones together.",
        icon: "✧"
    }
};

const FEATURE_ID =
    new URLSearchParams(window.location.search).get("feature");

const root = document.getElementById("featureContent");

function makeElement(tag, className, text) {
    const element = document.createElement(tag);
    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;
    return element;
}

function heading(parent, text) {
    const h = makeElement("h3", "", text);
    parent.appendChild(h);
    return h;
}

function panel(title, description) {
    const box = makeElement("section", "tool-panel");
    heading(box, title);

    if (description) {
        box.appendChild(makeElement("p", "", description));
    }

    root.appendChild(box);
    return box;
}

function textInput(parent, labelText, placeholder = "") {
    const label = makeElement("label", "", labelText);
    const input = document.createElement("input");
    input.placeholder = placeholder;
    label.appendChild(input);
    parent.appendChild(label);
    return input;
}

function textArea(parent, labelText, placeholder = "") {
    const label = makeElement("label", "", labelText);
    const input = document.createElement("textarea");
    input.placeholder = placeholder;
    label.appendChild(input);
    parent.appendChild(label);
    return input;
}

function selectInput(parent, labelText, options) {
    const label = makeElement("label", "", labelText);
    const select = document.createElement("select");

    options.forEach(option => {
        const item = document.createElement("option");
        item.value = option;
        item.textContent = option;
        select.appendChild(item);
    });

    label.appendChild(select);
    parent.appendChild(label);
    return select;
}

function button(parent, label, action) {
    const btn = makeElement("button", "tool-button", label);
    btn.type = "button";
    btn.addEventListener("click", action);
    parent.appendChild(btn);
    return btn;
}

function saveButton(parent, title, input, category) {
    button(parent, "Save to My Pages ✨", () => {
        const value = input.value.trim();

        if (!value) {
            alert("Write something first, if you want to save it.");
            return;
        }

        ETHER.savePage(title, value, category);
        input.value = "";
    });
}

function savedEntries(parent, category) {
    const list = makeElement("div", "saved-list");
    heading(list, "Your saved entries");

    const entries = ETHER.data.savedPages.filter(
        item => item.category === category
    );

    if (!entries.length) {
        list.appendChild(
            makeElement("p", "small-note", "Nothing saved here yet.")
        );
    }

    entries.forEach(item => {
        const entry = makeElement("div", "saved-entry");
        entry.appendChild(makeElement("strong", "", item.title));
        entry.appendChild(makeElement("p", "", item.text));
        entry.appendChild(
            makeElement("small", "", new Date(item.date).toLocaleDateString())
        );
        list.appendChild(entry);
    });

    parent.appendChild(list);
}

function externalLink(parent, label, url) {
    const a = makeElement("a", "resource-card", label);
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    parent.appendChild(a);
}

/* =========================================
   1. MOOD JOURNAL
   ========================================= */

function initMood() {
    const box = panel(
        "Today's mood",
        "Choose the feeling that best describes this moment. You can also skip."
    );

    const moods = ["Happy", "Calm", "Tired", "Worried", "Sad", "Excited", "Confused", "Neutral"];
    const message = makeElement("p", "", "Your feelings deserve space.");

    const moodArea = makeElement("div", "");
    moods.forEach(mood => {
        button(moodArea, mood, () => {
            message.textContent = "You selected: " + mood + ". Thank you for checking in.";
        });
    });

    box.append(moodArea, message);

    const journal = panel(
        "A little about today",
        "You can answer any of these five prompts."
    );

    const prompts = [
        "What has been on my mind lately?",
        "What made me feel comfortable today?",
        "Was there something I found difficult?",
        "What do I wish someone understood?",
        "What is one thing I need right now?"
    ];

    prompts.forEach(question => {
        journal.appendChild(makeElement("p", "", question));
        const answer = textArea(journal, "Your thoughts", "Write here...");
        saveButton(journal, question, answer, "Mood Journal");
    });

    savedEntries(box, "Mood Journal");
}

/* =========================================
   2. BREATHING SPACE
   ========================================= */

function initBreathing() {
    const box = panel(
        "Choose your breathing guide",
        "Keep your breathing gentle and comfortable. Never force a breath or hold it if uncomfortable."
    );

    const pattern = selectInput(box, "Choose a rhythm", [
        "Gentle — breathe in 3 seconds, out 4 seconds",
        "Slow — breathe in 4 seconds, out 6 seconds",
        "Natural — follow your own comfortable rhythm"
    ]);

    const duration = selectInput(box, "Session length", [
        "1 minute", "2 minutes", "3 minutes"
    ]);

    const circle = makeElement("div", "breath-circle");
    circle.textContent = "Ready";
    box.appendChild(circle);

    const instruction = makeElement("p", "", "Choose Start whenever you feel ready.");
    box.appendChild(instruction);

    const display = makeElement("h2", "timer-display", "00:00");
    box.appendChild(display);

    let interval = null;
    let remaining = 60;
    let phase = "in";
    let phaseTime = 3;

    function stop() {
        clearInterval(interval);
        interval = null;
        circle.classList.remove("expand");
        instruction.textContent = "Session paused. You can rest here.";
    }

    button(box, "Start / Pause", () => {
        if (interval) {
            stop();
            return;
        }

        remaining = Number(duration.value.split(" ")[0]) * 60;

        const chosen = pattern.selectedIndex;
        const inhale = chosen === 0 ? 3 : chosen === 1 ? 4 : 4;
        const exhale = chosen === 0 ? 4 : chosen === 1 ? 6 : 4;

        phase = "in";
        phaseTime = inhale;
        instruction.textContent = "Breathe in gently.";

        interval = setInterval(() => {
            remaining--;

            display.textContent =
                String(Math.floor(remaining / 60)).padStart(2, "0") +
                ":" +
                String(remaining % 60).padStart(2, "0");

            phaseTime--;

            if (phaseTime <= 0) {
                if (phase === "in") {
                    phase = "out";
                    phaseTime = exhale;
                    circle.classList.add("expand");
                    instruction.textContent = "Breathe out slowly.";
                } else {
                    phase = "in";
                    phaseTime = inhale;
                    circle.classList.remove("expand");
                    instruction.textContent = "Breathe in gently.";
                }
            }

            if (remaining <= 0) {
                stop();
                instruction.textContent = "Your session is complete. Take your time.";
                display.textContent = "Done";
                ETHER.savePage(
                    "Breathing session",
                    "Completed a breathing session on " + new Date().toLocaleDateString(),
                    "Breathing Space"
                );
            }
        }, 1000);
    });

    const reflection = textArea(
        box,
        "After your session",
        "How did that feel? You can also leave this blank."
    );
    saveButton(box, "Breathing reflection", reflection, "Breathing Space");

    const options = panel("More ways to take a pause", "Choose your own comfortable way to relax.");

    externalLink(options, "Nature sounds on YouTube ↗", "https://www.youtube.com/results?search_query=nature+sounds+rain+forest");
    externalLink(options, "Gentle guided meditation ↗", "https://www.youtube.com/results?search_query=gentle+guided+meditation+beginners");
    externalLink(options, "Quiet yoga sessions ↗", "https://www.youtube.com/results?search_query=gentle+beginner+yoga");

    const silence = makeElement("p", "", "Or choose silence. You do not need music, a timer or an activity to take a break.");
    options.appendChild(silence);
}

/* =========================================
   3. GRATITUDE JOURNAL
   ========================================= */

function initGratitude() {
    const box = panel(
        "A few things worth remembering",
        "Gratitude does not mean ignoring difficult things. It simply gives small positive moments a place too."
    );

    const questions = [
        "Something small that made me happy:",
        "Someone I appreciate:",
        "Something I learned:",
        "A moment I want to remember:",
        "Something I am looking forward to:"
    ];

    questions.forEach(question => {
        const answer = textArea(box, question, "Write your answer...");
        saveButton(box, question, answer, "Gratitude Journal");
    });

    const design = panel("Make it yours", "Choose a writing style or background colour for your own journal page.");

    const colour = document.createElement("input");
    colour.type = "color";
    colour.value = "#786044";
    design.appendChild(colour);

    const font = selectInput(design, "Journal font", [
        "Playfair Display", "DM Sans", "Georgia", "Arial"
    ]);

    const preview = makeElement("div", "saved-entry", "Your journal design preview.");
    preview.style.padding = "25px";
    design.appendChild(preview);

    button(design, "Preview design", () => {
        preview.style.background = colour.value;
        preview.style.fontFamily = font.value;
    });

    savedEntries(box, "Gratitude Journal");
}

/* =========================================
   4. FITNESS & WELLNESS
   ========================================= */

function initFitness() {
    const box = panel(
        "Movement without pressure",
        "Movement can be enjoyable, social, relaxing or adventurous. Choose what feels comfortable for you."
    );

    const activity = selectInput(box, "What would you like to explore?", [
        "Running or jogging",
        "Cycling",
        "Walking outdoors",
        "Gentle yoga",
        "Stretching",
        "Dancing",
        "Rest day"
    ]);

    const duration = selectInput(box, "Optional activity time", [
        "5 minutes", "10 minutes", "15 minutes", "20 minutes", "My own pace"
    ]);

    const note = textArea(box, "My activity note", "What would you like to try?");

    button(box, "Save my activity", () => {
        ETHER.savePage(
            activity.value,
            duration.value + "\n" + note.value,
            "Fitness & Wellness"
        );
        note.value = "";
    });

    const resources = panel("Explore movement");

    externalLink(resources, "Beginner yoga classes on YouTube ↗", "https://www.youtube.com/results?search_query=beginner+yoga+class");
    externalLink(resources, "Gentle stretching on YouTube ↗", "https://www.youtube.com/results?search_query=gentle+stretching+routine");
    externalLink(resources, "Strava — activity tracking ↗", "https://www.strava.com/");

    resources.appendChild(makeElement(
        "p",
        "small-note",
        "Strava opens its website. A real account connection or automatic activity syncing is not included in this prototype."
    ));

    const habits = panel("Wellness reminders");

    [
        "Take a break from screens.",
        "Drink water when you are thirsty.",
        "Make time for rest and sleep.",
        "Enjoy movement without comparing yourself to others.",
        "Spend some time outdoors if possible."
    ].forEach(item => {
        const label = makeElement("label");
        const check = document.createElement("input");
        check.type = "checkbox";
        check.style.width = "auto";
        label.append(check, document.createTextNode(" " + item));
        habits.appendChild(label);
    });

    savedEntries(box, "Fitness & Wellness");
}

/* =========================================
   5. DAILY CHECK-IN
   ========================================= */

function initCheckin() {
    const box = panel(
        "Your little daily check-in",
        "No long questionnaire. Just a few small things."
    );

    const win = textArea(box, "One little win today", "It can be something very simple...");
    const thought = textArea(box, "Something on my mind", "Write anything you want...");
    const need = selectInput(box, "What would help right now?", [
        "A little rest",
        "Some encouragement",
        "A conversation",
        "A change of scenery",
        "A study break",
        "Some quiet time",
        "I am not sure yet"
    ]);

    button(box, "Save my check-in", () => {
        ETHER.savePage(
            "Daily Check-in",
            "My little win:\n" + win.value +
            "\n\nOn my mind:\n" + thought.value +
            "\n\nWhat I need: " + need.value,
            "Daily Check-in"
        );

        win.value = "";
        thought.value = "";
    });

    const games = panel("A little something fun");

    const prompts = [
        "What is one place you would love to visit?",
        "What skill would you like to learn?",
        "What song describes your day?",
        "What is something you have never tried?",
        "What is one thing you are curious about?",
        "If you had a free day, how would you spend it?",
        "What is something you want to thank yourself for?"
    ];

    const result = makeElement("p", "", "Tap for a little question.");
    games.appendChild(result);

    button(games, "Give me a random question ↗", () => {
        result.textContent = prompts[Math.floor(Math.random() * prompts.length)];
    });

    savedEntries(box, "Daily Check-in");
}

/* =========================================
   6. STUDY & FOCUS
   ========================================= */

function initStudy() {
    const box = panel(
        "Your focus corner",
        "Start with a manageable amount of time. You can change the session whenever you need."
    );

    const studyTime = selectInput(box, "Focus time", [
        "10", "15", "20", "25", "30"
    ]);

    const breakTime = selectInput(box, "Rest time", [
        "5", "10", "15"
    ]);

    const display = makeElement("h2", "timer-display", "10:00");
    box.appendChild(display);

    const status = makeElement("p", "", "Ready when you are.");
    box.appendChild(status);

    let remaining = 600;
    let timer = null;
    let mode = "study";

    function update() {
        display.textContent =
            String(Math.floor(remaining / 60)).padStart(2, "0") +
            ":" +
            String(remaining % 60).padStart(2, "0");
    }

    function stop() {
        clearInterval(timer);
        timer = null;
        status.textContent = "Session paused.";
    }

    const start = button(box, "Start focus session", () => {
        if (timer) {
            stop();
            start.textContent = "Resume session";
            return;
        }

        if (remaining <= 0) {
            mode = "study";
            remaining = Number(studyTime.value) * 60;
        }

        status.textContent = mode === "study"
            ? "Focus on one task at a time."
            : "Break time. Step away from your screen if you can.";

        timer = setInterval(() => {
            remaining--;
            update();

            if (remaining <= 0) {
                clearInterval(timer);
                timer = null;

                if (mode === "study") {
                    ETHER.savePage(
                        "Study session",
                        studyTime.value + " minutes of focus time completed.",
                        "Study & Focus"
                    );

                    mode = "break";
                    remaining = Number(breakTime.value) * 60;
                    status.textContent = "Focus session complete. Time for a break.";
                    start.textContent = "Start break";
                } else {
                    mode = "study";
                    remaining = Number(studyTime.value) * 60;
                    status.textContent = "Break complete. Start whenever you are ready.";
                    start.textContent = "Start next session";
                }

                update();
            }
        }, 1000);

        start.textContent = "Pause";
    });

    studyTime.addEventListener("change", () => {
        if (!timer && mode === "study") {
            remaining = Number(studyTime.value) * 60;
            update();
        }
    });

    const music = panel("Choose your listening space");

    externalLink(music, "Spotify ↗", "https://open.spotify.com/");
    externalLink(music, "YouTube Music ↗", "https://music.youtube.com/");
    externalLink(music, "Apple Music ↗", "https://music.apple.com/");
    externalLink(music, "Nature sounds ↗", "https://www.youtube.com/results?search_query=nature+sounds+for+studying");

    music.appendChild(makeElement(
        "p",
        "small-note",
        "You can also choose silence, or listen to a Quran recitation or another devotional audio that you prefer."
    ));

    const level = panel("Your study approach");

    const difficulty = selectInput(level, "Choose a starting level", [
        "Beginner — one small task",
        "Intermediate — a few focused tasks",
        "Advanced — longer independent work"
    ]);

    const subject = textInput(level, "What are you studying?", "Subject or topic");

    button(level, "Save my study plan", () => {
        ETHER.savePage(
            "Study plan",
            difficulty.value + "\nTopic: " + subject.value,
            "Study & Focus"
        );
    });

    savedEntries(box, "Study & Focus");
}

/* =========================================
   7. SELF-CARE CORNER
   ========================================= */

function initSelfCare() {
    const box = panel(
        "Everyday self-care",
        "Self-care is not only skincare. It can be rest, relationships, personal boundaries and asking for help."
    );

    const topic = selectInput(box, "Choose an area", [
        "Sleep and rest",
        "Personal hygiene",
        "Skincare",
        "Time outdoors",
        "Family and friendships",
        "Emotional well-being",
        "Managing school pressure",
        "Personal boundaries",
        "Period notes (optional)",
        "Something else"
    ]);

    const note = textArea(box, "My personal note", "Write a routine, reminder or question...");
    button(box, "Save my self-care note", () => {
        ETHER.savePage(topic.value, note.value, "Self-care Corner");
        note.value = "";
    });

    const routine = panel("Build a gentle routine");

    const tasks = [
        "Prepare things for tomorrow.",
        "Take a screen break.",
        "Make time for a hobby.",
        "Talk to someone I trust.",
        "Get enough rest."
    ];

    tasks.forEach(task => {
        const label = makeElement("label");
        const check = document.createElement("input");
        check.type = "checkbox";
        check.style.width = "auto";
        label.append(check, document.createTextNode(" " + task));
        routine.appendChild(label);
    });

    const period = panel(
        "Optional period notes",
        "A private space to record dates or questions. This is not a medical tracker or a diagnosis tool."
    );

    const date = document.createElement("input");
    date.type = "date";
    period.appendChild(date);

    const periodNote = textArea(period, "Optional note", "Any questions or reminders...");
    button(period, "Save period note", () => {
        if (!date.value && !periodNote.value.trim()) {
            alert("Add a date or note first.");
            return;
        }

        ETHER.savePage(
            "Period note",
            "Date: " + (date.value || "Not entered") +
            "\n" + periodNote.value,
            "Self-care Corner"
        );
    });

    savedEntries(box, "Self-care Corner");
}

/* =========================================
   8. HEALTH & SUPPORT
   ========================================= */

function initSupport() {
    const box = panel(
        "Health information and questions",
        "This is a learning and note-taking space, not a medical diagnosis service."
    );

    const topic = selectInput(box, "Choose a topic", [
        "Sleep and rest",
        "Stress and school pressure",
        "Everyday health",
        "First-aid learning",
        "Physical health questions",
        "Mental well-being",
        "Finding a counsellor",
        "Talking to a trusted adult"
    ]);

    const note = textArea(box, "What would you like to understand or ask?", "Write a question...");
    button(box, "Save my question", () => {
        ETHER.savePage("Health question: " + topic.value, note.value, "Health & Support");
        note.value = "";
    });

    const resources = panel("Reliable learning resources");

    externalLink(resources, "WHO — Health topics ↗", "https://www.who.int/health-topics");
    externalLink(resources, "WHO — Mental health ↗", "https://www.who.int/health-topics/mental-health");
    externalLink(resources, "UNICEF — Child rights and well-being ↗", "https://www.unicef.org/");
    externalLink(resources, "Government of India — Health Ministry ↗", "https://mohfw.gov.in/");

    const support = panel(
        "When you need support",
        "If something is worrying you, consider talking to a parent or guardian, a trusted teacher, a school counsellor or a qualified health professional. If there is immediate danger, seek help from a trusted adult or local emergency services."
    );

    support.appendChild(makeElement(
        "p",
        "",
        "You do not need to wait until a problem becomes serious before asking for support."
    ));

    const stories = panel(
        "Real stories and real-world issues",
        "Learn about challenges faced by children and communities, and the work being done to improve lives."
    );

    externalLink(stories, "UNICEF — Stories from around the world ↗", "https://www.unicef.org/stories");
    externalLink(stories, "UNICEF — Children in emergencies ↗", "https://www.unicef.org/emergencies");

    stories.appendChild(makeElement(
        "p",
        "small-note",
        "Read credible reporting with care. Real stories can include difficult realities; you can stop reading whenever you need."
    ));

    savedEntries(box, "Health & Support");
}

/* =========================================
   9. FIND YOUR DIRECTION
   ========================================= */

function initCareer() {
    const box = panel(
        "Discover your interests",
        "Answer these ten questions. This is an exploration activity, not a scientific career assessment."
    );

    const questions = [
        {
            q: "Which activity sounds interesting?",
            a: ["Helping people", "Solving puzzles", "Creating things", "Exploring the world", "Leading projects"]
        },
        {
            q: "Which subject interests you most?",
            a: ["Biology", "Physics and maths", "History and politics", "Arts and design", "Business"]
        },
        {
            q: "What kind of impact interests you?",
            a: ["Health and care", "Science and discovery", "Human rights", "Environment", "Technology"]
        },
        {
            q: "Which environment sounds appealing?",
            a: ["Hospital or clinic", "Research centre", "Field work", "Office or organisation", "Creative studio"]
        },
        {
            q: "Which activity would you enjoy learning?",
            a: ["First aid", "Research", "Writing", "Design", "Public speaking"]
        },
        {
            q: "What would you like to understand better?",
            a: ["Human body", "Nature and space", "Societies and laws", "Visual communication", "Money and organisations"]
        },
        {
            q: "How would you like to help others?",
            a: ["Direct care", "Scientific discoveries", "Advocacy", "Education", "Community projects"]
        },
        {
            q: "What kind of challenge interests you?",
            a: ["Solving health problems", "Understanding evidence", "Protecting rights", "Designing solutions", "Organising people"]
        },
        {
            q: "What would you like your work to include?",
            a: ["Meeting people", "Learning continuously", "Travel and field experiences", "Creative work", "Planning and leadership"]
        },
        {
            q: "Which statement feels closest?",
            a: ["I want to care for people", "I want to discover things", "I want to make change", "I want to create", "I want to build something"]
        }
    ];

    const answers = [];

    questions.forEach((item, index) => {
        const group = panel("Question " + (index + 1) + " of 10", item.q);
        const choice = selectInput(group, "Choose one", item.a);
        answers.push(choice);
    });

    const result = panel("Your possible career directions");
    const output = makeElement("div", "");
    result.appendChild(output);

    button(result, "Explore my answers ↗", () => {
        const values = answers.map(answer => answer.value);

        const categories = {
            "Health and care": 0,
            "Biology": 0,
            "Helping people": 0,
            "Direct care": 0,
            "Human body": 0,
            "Hospital or clinic": 0,
            "First aid": 0,
            "I want to care for people": 0,

            "Science and discovery": 0,
            "Research centre": 0,
            "Solving puzzles": 0,
            "Physics and maths": 0,
            "Scientific discoveries": 0,
            "I want to discover things": 0,

            "Human rights": 0,
            "History and politics": 0,
            "Advocacy": 0,
            "Societies and laws": 0,
            "I want to make change": 0,

            "Arts and design": 0,
            "Creative studio": 0,
            "Design": 0,
            "Visual communication": 0,
            "I want to create": 0,

            "Business": 0,
            "Leading projects": 0,
            "Organising people": 0,
            "I want to build something": 0
        };

        values.forEach(value => {
            if (categories[value] !== undefined) categories[value]++;
        });

        const ranked = Object.entries(categories).sort((a, b) => b[1] - a[1]);

        const suggestions = [
            {
                words: ["Health and care", "Biology", "Helping people", "Direct care", "Human body", "Hospital or clinic", "First aid", "I want to care for people"],
                jobs: "Doctor, nurse, physiotherapist, public-health professional, occupational therapist.",
                degree: "MBBS, BSc Nursing, BPT, BOT or public-health-related degrees.",
                route: "In India, MBBS generally requires NEET-UG. Other healthcare courses have their own admission requirements."
            },
            {
                words: ["Science and discovery", "Research centre", "Solving puzzles", "Physics and maths", "Scientific discoveries", "I want to discover things"],
                jobs: "Research scientist, physicist, biologist, environmental scientist, data researcher.",
                degree: "BSc, BS, integrated science programmes and later MSc or PhD where required.",
                route: "Explore university entrance requirements, subject combinations and research opportunities."
            },
            {
                words: ["Human rights", "History and politics", "Advocacy", "Societies and laws", "I want to make change"],
                jobs: "Lawyer, human-rights researcher, international-relations specialist, humanitarian programme officer.",
                degree: "BA Political Science, BA International Relations, BA LLB or related degrees.",
                route: "Explore CLAT for participating Indian law universities and individual university requirements."
            },
            {
                words: ["Arts and design", "Creative studio", "Design", "Visual communication", "I want to create"],
                jobs: "Graphic designer, illustrator, architect, animator, communication designer.",
                degree: "BDes, BArch, visual communication or fine arts programmes.",
                route: "Check portfolio, aptitude-test and university-specific requirements."
            },
            {
                words: ["Business", "Leading projects", "Organising people", "I want to build something"],
                jobs: "Entrepreneur, project manager, business analyst, operations specialist.",
                degree: "BBA, BCom, economics or management-related programmes.",
                route: "Compare university admission criteria and the skills each programme develops."
            }
        ];

        const matched = suggestions.map(s => ({
            ...s,
            score: values.filter(v => s.words.includes(v)).length
        })).sort((a, b) => b.score - a.score);

        output.innerHTML = "";

        matched.filter(item => item.score > 0).slice(0, 3).forEach(item => {
            const card = makeElement("div", "saved-entry");

            card.appendChild(makeElement("h3", "", item.jobs));
            card.appendChild(makeElement("p", "", "Possible degrees: " + item.degree));
            card.appendChild(makeElement("p", "", "Possible pathway: " + item.route));

            output.appendChild(card);
        });

        output.appendChild(makeElement(
            "p",
            "small-note",
            "These are starting points, not fixed recommendations. You can combine interests, change direction and explore careers in India or internationally. Salaries and course durations vary by country, institution and experience."
        ));

        ETHER.savePage(
            "Career exploration answers",
            values.map((value, i) => (i + 1) + ". " + value).join("\n"),
            "Find Your Direction"
        );
    });

    const dreams = panel("Dreams beyond careers");

    const dream = textArea(
        dreams,
        "What experiences do you want in life?",
        "Travel, volunteering, adventures, skills, family, learning..."
    );

    saveButton(dreams, "Dreams beyond careers", dream, "Find Your Direction");

    savedEntries(box, "Find Your Direction");
}

/* =========================================
   10. MY LITTLE WORLD
   ========================================= */

function initMyWorld() {
    const box = panel(
        "Your personal scrapbook",
        "A little home for photographs, memories, letters, good days and difficult days."
    );

    const memoryTitle = textInput(box, "Memory title", "Give this moment a name");
    const memory = textArea(box, "Your memory or diary entry", "Write without worrying about perfection...");

    button(box, "Save my memory", () => {
        if (!memory.value.trim()) {
            alert("Write something first.");
            return;
        }

        ETHER.savePage(
            memoryTitle.value.trim() || "A memory of mine",
            memory.value,
            "My Little World"
        );

        memoryTitle.value = "";
        memory.value = "";
    });

    const letters = panel("Letters to myself");

    const letterDate = selectInput(letters, "When should you read this?", [
        "My future self",
        "Next month",
        "Next year",
        "A special day",
        "Whenever I need it"
    ]);

    const letter = textArea(letters, "Write your letter", "Dear future me...");
    button(letters, "Save my letter", () => {
        ETHER.savePage(
            "Letter — " + letterDate.value,
            letter.value,
            "My Little World"
        );
        letter.value = "";
    });

    const gallery = panel("Add a photograph");

    const photo = document.createElement("input");
    photo.type = "file";
    photo.accept = "image/*";
    gallery.appendChild(photo);

    const caption = textInput(gallery, "Photo caption", "What does this picture mean to you?");
    const preview = makeElement("img");
    preview.style.cssText = "max-width:100%;max-height:260px;object-fit:contain;border-radius:14px;display:none;";
    gallery.appendChild(preview);

    let photoData = "";

    photo.addEventListener("change", () => {
        const file = photo.files[0];
        if (!file) return;

        if (!file.type.startsWith("image/")) {
            alert("Choose an image file.");
            return;
        }

        if (file.size > 700000) {
            alert("Choose a smaller image (under 700 KB) for this browser demo.");
            photo.value = "";
            return;
        }

        const reader = new FileReader();

        reader.onload = () => {
            photoData = reader.result;
            preview.src = photoData;
            preview.style.display = "block";
        };

        reader.readAsDataURL(file);
    });

    button(gallery, "Save photo memory", () => {
        if (!photoData) {
            alert("Choose a photograph first.");
            return;
        }

        ETHER.savePage(
            "Photo memory — " + (caption.value || "A moment"),
            "Image data: " + photoData,
            "My Little World"
        );

        photoData = "";
        preview.removeAttribute("src");
        preview.style.display = "none";
        photo.value = "";
        caption.value = "";
    });

    const timeline = panel("My milestones");

    const eventTitle = textInput(timeline, "Milestone", "Something you achieved or experienced");
    const eventDate = document.createElement("input");
    eventDate.type = "date";
    timeline.appendChild(eventDate);

    const eventNote = textArea(timeline, "Why this matters", "Write a little about it...");

    button(timeline, "Add to my timeline", () => {
        ETHER.savePage(
            "Timeline — " + eventTitle.value,
            "Date: " + eventDate.value + "\n" + eventNote.value,
            "My Little World"
        );
    });

    savedEntries(box, "My Little World");
}

/* =========================================
   START THE SELECTED FEATURE
   ========================================= */

function startFeature() {
    if (!root) return;

    const feature = FEATURE_CONTENT[FEATURE_ID];

    if (!feature) {
        root.innerHTML = `
            <h1>Space not found.</h1>
            <p>Please return to the homepage and choose a feature.</p>
            <a class="back-link" href="index.html">← Return home</a>
        `;
        return;
    }

    document.title = feature.title + " | To the Ether";

    const intro = makeElement("div", "");
    intro.appendChild(makeElement("span", "eyebrow", feature.icon + " YOUR SPACE"));
    const title = makeElement("h1");
    title.append(
        document.createTextNode(feature.title + " "),
        makeElement("span", "", " ")
    );
    intro.appendChild(title);
    intro.appendChild(makeElement("p", "", feature.subtitle));
    intro.appendChild(makeElement("p", "", feature.intro));
    root.appendChild(intro);

    const functions = {
        mood: initMood,
        breathing: initBreathing,
        gratitude: initGratitude,
        fitness: initFitness,
        checkin: initCheckin,
        study: initStudy,
        selfcare: initSelfCare,
        support: initSupport,
        career: initCareer,
        myworld: initMyWorld
    };

    functions[FEATURE_ID]();
}

document.addEventListener("DOMContentLoaded", startFeature);
