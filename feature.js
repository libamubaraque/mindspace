
document.addEventListener("DOMContentLoaded", () => {

    const params = new URLSearchParams(window.location.search);
    const card = params.get("card");

    const title = document.getElementById("feature-title");
    const description = document.getElementById("feature-description");
    const content = document.getElementById("feature-content");

    const features = {

        mood: {
            title: "Mood Journal ☁",
            description: "A place to understand your emotions without judging yourself.",
            html: `
                <h2>How are you feeling?</h2>
                <p>Choose what describes your day.</p>

                <div class="choice-list" id="moods">
                    <button>Happy ☀</button>
                    <button>Calm 🌿</button>
                    <button>Tired 🌙</button>
                    <button>Overwhelmed ☁</button>
                    <button>Unsure 🪷</button>
                </div>

                <h3>What is on your mind?</h3>
                <textarea id="mood-note" placeholder="Write anything you want..."></textarea>

                <button class="tool-button" id="save-mood">Save Entry</button>

                <div id="mood-result" class="tool-message"></div>
                <div id="mood-history"></div>
            `
        },

        breathing: {
            title: "Breathing Space ◌",
            description: "A quiet moment to pause and reconnect with yourself.",
            html: `
                <h2>Let's take a little pause.</h2>
                <p>Follow the gentle breathing guide. Stop whenever you need to.</p>

                <div id="breath-circle">Ready?</div>

                <p id="breath-instruction" class="tool-message">
                    Press start when you feel ready.
                </p>

                <button class="tool-button" id="start-breath">Start</button>
                <button class="tool-button" id="stop-breath">Stop</button>

                <div class="tool-section">
                    <h3>Choose your environment</h3>
                    <div class="choice-list">
                        <button class="sound-choice">Nature sounds</button>
                        <button class="sound-choice">Silence</button>
                    </div>
                    <p id="sound-message"></p>
                </div>

                <div class="tool-section">
                    <h3>After your session</h3>
                    <textarea id="breath-reflection"
                        placeholder="How do you feel now?"></textarea>
                    <button class="tool-button" id="save-breath">
                        Save reflection
                    </button>
                    <p id="breath-result"></p>
                </div>
            `
        },

        gratitude: {
            title: "Gratitude Journal ✿",
            description: "Collect the little things that make life meaningful.",
            html: `
                <h2>Three little things.</h2>
                <p>They don't have to be extraordinary.</p>

                <textarea id="gratitude-one" placeholder="Something that made me smile..."></textarea>
                <textarea id="gratitude-two" placeholder="Someone I appreciate..."></textarea>
                <textarea id="gratitude-three" placeholder="Something I am looking forward to..."></textarea>

                <h3>Choose your journal style</h3>

                <select id="journal-style">
                    <option>Olive Garden</option>
                    <option>Champagne Dreams</option>
                    <option>Walnut Memories</option>
                    <option>Midnight Thoughts</option>
                </select>

                <button class="tool-button" id="save-gratitude">Save Journal</button>

                <div id="gratitude-result"></div>
                <div id="gratitude-history"></div>
            `
        },

        fitness: {
            title: "Fitness & Wellness ♡",
            description: "Movement, rest and small habits that support your wellbeing.",
            html: `
                <h2>Move because it feels good.</h2>
                <p>No competition. No pressure. Choose what feels comfortable.</p>

                <div class="tool-section">
                    <h3>Choose an activity</h3>

                    <div class="choice-list" id="fitness-options">
                        <button>Gentle stretching</button>
                        <button>Walking</button>
                        <button>Cycling</button>
                        <button>Dancing</button>
                        <button>Outdoor time</button>
                        <button>Rest day</button>
                    </div>
                </div>

                <div class="tool-section">
                    <h3>How is your energy today?</h3>

                    <select id="energy">
                        <option>Low energy</option>
                        <option>Some energy</option>
                        <option>Feeling energetic</option>
                        <option>I need rest</option>
                    </select>
                </div>

                <div class="tool-section">
                    <h3>A little wellness reflection</h3>

                    <textarea id="fitness-note"
                        placeholder="What did you enjoy today?"></textarea>

                    <button class="tool-button" id="save-fitness">Save</button>

                    <p id="fitness-result"></p>
                </div>
            `
        },

        checkin: {
            title: "Daily Check-in ☀",
            description: "A small conversation with yourself.",
            html: `
                <h2>Let's check in.</h2>

                <div class="tool-section">
                    <h3>What is one little win today?</h3>
                    <textarea id="little-win" placeholder="Anything counts..."></textarea>
                </div>

                <div class="tool-section">
                    <h3>What do you need right now?</h3>

                    <div class="choice-list" id="needs">
                        <button>Rest</button>
                        <button>Encouragement</button>
                        <button>Quiet</button>
                        <button>Company</button>
                        <button>A fresh start</button>
                    </div>
                </div>

                <div class="tool-section">
                    <h3>One thing I want to try tomorrow...</h3>
                    <textarea id="tomorrow-plan"></textarea>
                </div>

                <button class="tool-button" id="save-checkin">Save Check-in</button>

                <p id="checkin-result"></p>
            `
        },

        focus: {
            title: "Study & Focus ⌛",
            description: "Build a study rhythm that leaves space for rest.",
            html: `
                <h2>Your study corner.</h2>

                <p>Choose a comfortable focus session.</p>

                <select id="focus-duration">
                    <option value="10">10 minutes study</option>
                    <option value="15">15 minutes study</option>
                    <option value="25">25 minutes study</option>
                    <option value="40">40 minutes study</option>
                </select>

                <div class="timer-display" id="timer">10:00</div>

                <button class="tool-button" id="start-timer">Start</button>
                <button class="tool-button" id="pause-timer">Pause</button>
                <button class="tool-button" id="reset-timer">Reset</button>

                <p id="timer-message"></p>

                <div class="tool-section">
                    <h3>What are you studying?</h3>
                    <input id="study-subject" placeholder="Your subject">
                    <textarea id="study-task" placeholder="What do you want to finish?"></textarea>
                    <button class="tool-button" id="save-study">Save Study Plan</button>
                    <p id="study-result"></p>
                </div>

                <div class="tool-section">
                    <h3>Your break ideas</h3>
                    <p>Stretch, drink water, look outside or simply rest.</p>
                    <button class="tool-button" id="break-button">Start 5-minute break</button>
                    <p id="break-result"></p>
                </div>

                <div class="tool-section">
                    <h3>Your study soundtrack</h3>
                    <p>Choose a music service or use silence.</p>
                    <a href="https://open.spotify.com/" target="_blank" rel="noopener">Spotify ↗</a><br>
                    <a href="https://music.youtube.com/" target="_blank" rel="noopener">YouTube Music ↗</a><br>
                    <a href="https://music.apple.com/" target="_blank" rel="noopener">Apple Music ↗</a>
                </div>
            `
        },

        selfcare: {
            title: "Self-care Corner ❀",
            description: "Care for yourself in little ways, inside and out.",
            html: `
                <h2>Your self-care checklist.</h2>

                <p>Pick what feels useful today. You don't have to complete everything.</p>

                <div class="tool-section">
                    <h3>Everyday care</h3>

                    <div id="selfcare-list">
                        <label><input type="checkbox"> Drink enough water</label><br>
                        <label><input type="checkbox"> Take a comfortable break</label><br>
                        <label><input type="checkbox"> Spend time away from screens</label><br>
                        <label><input type="checkbox"> Get some fresh air</label><br>
                        <label><input type="checkbox"> Follow a gentle skincare routine</label><br>
                        <label><input type="checkbox"> Make time for something I enjoy</label><br>
                        <label><input type="checkbox"> Get enough rest</label>
                    </div>
                </div>

                <div class="tool-section">
                    <h3>How are things around you?</h3>
                    <textarea id="selfcare-note"
                        placeholder="Write about your surroundings, relationships or what you need..."></textarea>
                </div>

                <button class="tool-button" id="save-selfcare">Save</button>
                <p id="selfcare-result"></p>
            `
        },

        health: {
            title: "Health & Support ♧",
            description: "Reliable information, everyday wellbeing and trusted support.",
            html: `
                <h2>Your wellbeing matters.</h2>

                <div class="tool-section">
                    <h3>What would you like to explore?</h3>

                    <div class="choice-list" id="health-topics">
                        <button>Sleep</button>
                        <button>Stress</button>
                        <button>Screen-time habits</button>
                        <button>Nutrition</button>
                        <button>Emotional wellbeing</button>
                        <button>Menstrual health</button>
                    </div>

                    <p id="health-result"></p>
                </div>

                <div class="tool-section">
                    <h3>Questions for a healthcare professional</h3>

                    <textarea id="health-questions"
                        placeholder="Write down questions you might want to ask a doctor..."></textarea>

                    <button class="tool-button" id="save-health">Save questions</button>

                    <p id="health-save-result"></p>
                </div>

                <div class="tool-section">
                    <h3>Finding support</h3>

                    <p>
                        Talk to a trusted adult, school counsellor,
                        doctor or qualified mental-health professional.
                        This website is not a medical service.
                    </p>

                    <p>
                        If you need urgent help, contact a trusted adult
                        or local emergency services.
                    </p>
                </div>
            `
        },

        career: {
            title: "Find Your Direction ✧",
            description: "You can have many interests. Explore possibilities without rushing.",
            html: `
                <h2>Discover what interests you.</h2>

                <p>Choose the areas you would like to explore.</p>

                <div class="tool-section">
                    <h3>1. What subjects interest you?</h3>

                    <div class="choice-list" id="career-subjects">
                        <button>Science</button>
                        <button>Biology</button>
                        <button>History</button>
                        <button>Politics</button>
                        <button>Literature</button>
                        <button>Art</button>
                        <button>Mathematics</button>
                        <button>Geography</button>
                    </div>
                </div>

                <div class="tool-section">
                    <h3>2. What kind of work sounds interesting?</h3>

                    <div class="choice-list" id="career-work">
                        <button>Helping people</button>
                        <button>Research</button>
                        <button>Travelling</button>
                        <button>Teaching</button>
                        <button>Creating</button>
                        <button>Leading projects</button>
                        <button>Solving problems</button>
                    </div>
                </div>

                <div class="tool-section">
                    <h3>3. What matters most to you?</h3>

                    <div class="choice-list" id="career-values">
                        <button>Making a difference</button>
                        <button>Financial stability</button>
                        <button>Free time</button>
                        <button>Travel</button>
                        <button>Learning</button>
                        <button>Creativity</button>
                    </div>
                </div>

                <div class="tool-section">
                    <h3>Dreams beyond a career</h3>

                    <textarea id="career-dream"
                        placeholder="What kind of life would you like to build?"></textarea>

                    <button class="tool-button" id="career-result-button">
                        Explore My Interests
                    </button>

                    <p id="career-result"></p>
                </div>
            `
        },

        reflection: {
            title: "My Little World 📖",
            description: "A personal scrapbook for memories, thoughts and moments.",
            html: `
                <h2>A little collection of you.</h2>

                <p>Keep the memories you want to remember, even the ordinary ones.</p>

                <div class="tool-section">
                    <h3>Write a memory</h3>

                    <input id="memory-title" placeholder="Give this memory a title">

                    <select id="memory-type">
                        <option>Happy memory</option>
                        <option>A lesson I learned</option>
                        <option>A difficult day</option>
                        <option>A little achievement</option>
                        <option>A letter to myself</option>
                        <option>Something random</option>
                    </select>

                    <textarea id="memory-text"
                        placeholder="Write anything you want to keep..."></textarea>

                    <label>Attach a photograph (optional)</label>
                    <input type="file" id="memory-photo" accept="image/*">

                    <button class="tool-button" id="save-memory">
                        Save to My World
                    </button>

                    <p id="memory-result"></p>
                </div>

                <div class="tool-section">
                    <h3>Your memories</h3>
                    <div id="memory-gallery"></div>
                </div>
            `
        }

    };


    // CHECK FEATURE

    const feature = features[card];

    if (!feature) {

        title.textContent = "Space not found";
        description.textContent = "Please return and choose another space.";

        content.innerHTML = `
            <a href="index.html#explore" class="tool-button">
                Return to Explore
            </a>
        `;

        return;
    }


    // DISPLAY FEATURE

    title.textContent = feature.title;
    description.textContent = feature.description;
    content.innerHTML = feature.html;


    // STORAGE HELPERS

    function getEntries(key) {
        try {
            return JSON.parse(localStorage.getItem(key)) || [];
        } catch {
            return [];
        }
    }

    function saveEntry(key, entry) {
        const entries = getEntries(key);
        entries.unshift(entry);
        localStorage.setItem(key, JSON.stringify(entries));
    }

    function escapeHTML(value) {
        return String(value).replace(/[&<>"']/g, char => ({
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        })[char]);
    }

    function showResult(id, message) {
        const element = document.getElementById(id);
        if (element) element.textContent = message;
    }

    function setupChoices(id, multiple = false) {
        const container = document.getElementById(id);
        if (!container) return;

        container.querySelectorAll("button").forEach(button => {
            button.addEventListener("click", () => {

                if (!multiple) {
                    container.querySelectorAll("button")
                        .forEach(item => item.classList.remove("selected"));
                }

                button.classList.toggle("selected");

            });
        });
    }

    function selectedChoices(id) {
        const container = document.getElementById(id);
        if (!container) return [];

        return [...container.querySelectorAll("button.selected")]
            .map(button => button.textContent.trim());
    }


    // MOOD JOURNAL

    if (card === "mood") {

        setupChoices("moods");

        document.getElementById("save-mood").addEventListener("click", () => {

            const mood = selectedChoices("moods")[0];
            const note = document.getElementById("mood-note").value.trim();

            if (!mood) {
                showResult("mood-result", "Choose a mood first.");
                return;
            }

            saveEntry("etherMoods", {
                mood,
                note,
                date: new Date().toLocaleDateString()
            });

            showResult("mood-result", "Your entry has been saved. 🌿");
            document.getElementById("mood-note").value = "";

            renderMoods();
        });

        function renderMoods() {
            const history = document.getElementById("mood-history");
            history.innerHTML = "<h3>Your previous entries</h3>";

            getEntries("etherMoods").forEach(entry => {
                const div = document.createElement("div");
                div.className = "saved-entry";
                div.textContent = `${entry.date} — ${entry.mood}: ${entry.note}`;
                history.appendChild(div);
            });
        }

        renderMoods();
    }


    // BREATHING SPACE

    if (card === "breathing") {

        let interval;
        let phase = 0;

        const circle = document.getElementById("breath-circle");
        const instruction = document.getElementById("breath-instruction");

        const phases = [
            { text: "Breathe in", duration: 4, expand: true },
            { text: "Breathe out", duration: 6, expand: false }
        ];

        function stopBreathing() {
            clearInterval(interval);
            interval = null;
            circle.classList.remove("breathing");
            circle.textContent = "Paused";
            instruction.textContent = "Take your time. You can stop whenever you want.";
        }

        document.getElementById("start-breath").addEventListener("click", () => {

            if (interval) return;

            phase = 0;

            function nextPhase() {
                const current = phases[phase];

                instruction.textContent = current.text;
                circle.textContent = current.text;

                circle.classList.toggle("breathing", current.expand);

                phase = (phase + 1) % phases.length;
            }

            nextPhase();
            interval = setInterval(nextPhase, 4000);

        });

        document.getElementById("stop-breath").addEventListener("click", stopBreathing);

        document.querySelectorAll(".sound-choice").forEach(button => {
            button.addEventListener("click", () => {
                showResult("sound-message",
                    button.textContent + " selected. No audio is playing in this demo.");
            });
        });

        document.getElementById("save-breath").addEventListener("click", () => {
            const note = document.getElementById("breath-reflection").value.trim();

            if (!note) {
                showResult("breath-result", "Write a little reflection first.");
                return;
            }

            saveEntry("etherBreathing", {
                note,
                date: new Date().toLocaleDateString()
            });

            showResult("breath-result", "Your reflection is saved.");
            document.getElementById("breath-reflection").value = "";
        });
    }


    // GRATITUDE JOURNAL

    if (card === "gratitude") {

        document.getElementById("save-gratitude").addEventListener("click", () => {

            const one = document.getElementById("gratitude-one").value.trim();
            const two = document.getElementById("gratitude-two").value.trim();
            const three = document.getElementById("gratitude-three").value.trim();
            const style = document.getElementById("journal-style").value;

            if (!one && !two && !three) {
                showResult("gratitude-result", "Write at least one little thing.");
                return;
            }

            saveEntry("etherGratitude", {
                one, two, three, style,
                date: new Date().toLocaleDateString()
            });

            showResult("gratitude-result", "Your gratitude page is saved. ✿");

            document.getElementById("gratitude-one").value = "";
            document.getElementById("gratitude-two").value = "";
            document.getElementById("gratitude-three").value = "";

            renderGratitude();
        });

        function renderGratitude() {
            const history = document.getElementById("gratitude-history");
            history.innerHTML = "<h3>Previous pages</h3>";

            getEntries("etherGratitude").forEach(entry => {
                const div = document.createElement("div");
                div.className = "saved-entry";
                div.textContent = `${entry.date} | ${entry.style} | ${entry.one} | ${entry.two} | ${entry.three}`;
                history.appendChild(div);
            });
        }

        renderGratitude();
    }


    // FITNESS AND WELLNESS

    if (card === "fitness") {

        setupChoices("fitness-options");

        document.getElementById("save-fitness").addEventListener("click", () => {

            const activity = selectedChoices("fitness-options");
            const energy = document.getElementById("energy").value;
            const note = document.getElementById("fitness-note").value.trim();

            if (!activity.length) {
                showResult("fitness-result", "Choose an activity first.");
                return;
            }

            saveEntry("etherFitness", {
                activity,
                energy,
                note,
                date: new Date().toLocaleDateString()
            });

            showResult("fitness-result", "Your wellness entry is saved. ♡");
        });
    }


    // DAILY CHECK-IN

    if (card === "checkin") {

        setupChoices("needs");

        document.getElementById("save-checkin").addEventListener("click", () => {

            const win = document.getElementById("little-win").value.trim();
            const needs = selectedChoices("needs");
            const tomorrow = document.getElementById("tomorrow-plan").value.trim();

            if (!win && !needs.length && !tomorrow) {
                showResult("checkin-result", "Add something to your check-in first.");
                return;
            }

            saveEntry("etherCheckins", {
                win, needs, tomorrow,
                date: new Date().toLocaleDateString()
            });

            showResult("checkin-result", "Check-in complete. Well done for taking a moment for yourself!");
        });
    }


    // STUDY TIMER

    if (card === "focus") {

        let remaining = 600;
        let timerInterval = null;

        const display = document.getElementById("timer");
        const duration = document.getElementById("focus-duration");

        function updateTimer() {
            const minutes = Math.floor(remaining / 60);
            const seconds = remaining % 60;

            display.textContent =
                String(minutes).padStart(2, "0") + ":" +
                String(seconds).padStart(2, "0");
        }

        duration.addEventListener("change", () => {
            clearInterval(timerInterval);
            timerInterval = null;
            remaining = Number(duration.value) * 60;
            updateTimer();
            showResult("timer-message", "Your timer is ready.");
        });

        document.getElementById("start-timer").addEventListener("click", () => {

            if (timerInterval) return;

            if (remaining <= 0) {
                showResult("timer-message", "Reset your timer first.");
                return;
            }

            timerInterval = setInterval(() => {
                remaining--;
                updateTimer();

                if (remaining <= 0) {
                    clearInterval(timerInterval);
                    timerInterval = null;
                    showResult("timer-message", "Your focus session is complete. Time for a break!");
                }

            }, 1000);

        });

        document.getElementById("pause-timer").addEventListener("click", () => {
            clearInterval(timerInterval);
            timerInterval = null;
            showResult("timer-message", "Timer paused.");
        });

        document.getElementById("reset-timer").addEventListener("click", () => {
            clearInterval(timerInterval);
            timerInterval = null;
            remaining = Number(duration.value) * 60;
            updateTimer();
            showResult("timer-message", "Timer reset.");
        });

        document.getElementById("save-study").addEventListener("click", () => {

            const subject = document.getElementById("study-subject").value.trim();
            const task = document.getElementById("study-task").value.trim();

            if (!subject && !task) {
                showResult("study-result", "Add a subject or study task first.");
                return;
            }

            saveEntry("etherStudy", {
                subject, task,
                date: new Date().toLocaleDateString()
            });

            showResult("study-result", "Study plan saved.");
        });

        document.getElementById("break-button").addEventListener("click", () => {
            showResult("break-result", "Your five-minute break is ready. Set a separate timer and enjoy your rest.");
        });

        updateTimer();
    }


    // SELF-CARE

    if (card === "selfcare") {

        document.getElementById("save-selfcare").addEventListener("click", () => {

            const checks = [...document.querySelectorAll("#selfcare-list input:checked")]
                .map(input => input.parentElement.textContent.trim());

            const note = document.getElementById("selfcare-note").value.trim();

            saveEntry("etherSelfcare", {
                checks,
                note,
                date: new Date().toLocaleDateString()
            });

            showResult("selfcare-result", "Your self-care reflection is saved.");
        });
    }


    // HEALTH AND SUPPORT

    if (card === "health") {

        setupChoices("health-topics");

        document.querySelectorAll("#health-topics button").forEach(button => {

            button.addEventListener("click", () => {

                const messages = {
                    "Sleep": "Try a consistent sleep routine and a relaxing bedtime environment.",
                    "Stress": "Break tasks into smaller steps and talk to someone you trust.",
                    "Screen-time habits": "Try regular screen breaks and make time for offline activities.",
                    "Nutrition": "Aim for varied, regular meals and seek professional advice for individual concerns.",
                    "Emotional wellbeing": "Your feelings matter. Talking with a trusted adult or professional can help.",
                    "Menstrual health": "Learn about cycle patterns and discuss unusual or worrying symptoms with a healthcare professional."
                };

                showResult("health-result", messages[button.textContent]);
            });

        });

        document.getElementById("save-health").addEventListener("click", () => {

            const note = document.getElementById("health-questions").value.trim();

            if (!note) {
                showResult("health-save-result", "Write a question first.");
                return;
            }

            saveEntry("etherHealth", {
                note,
                date: new Date().toLocaleDateString()
            });

            showResult("health-save-result", "Your questions have been saved on this device.");
        });
    }


    // CAREER EXPLORATION

    if (card === "career") {

        setupChoices("career-subjects", true);
        setupChoices("career-work", true);
        setupChoices("career-values", true);

        document.getElementById("career-result-button").addEventListener("click", () => {

            const subjects = selectedChoices("career-subjects");
            const work = selectedChoices("career-work");
            const values = selectedChoices("career-values");
            const dream = document.getElementById("career-dream").value.trim();

            if (!subjects.length || !work.length || !values.length) {
                showResult("career-result", "Choose at least one option in each section.");
                return;
            }

            const result = `
                Your interests:
                Subjects: ${subjects.join(", ")}.
                Work: ${work.join(", ")}.
                Values: ${values.join(", ")}.
                Dreams: ${dream || "Still exploring."}
            `;

            saveEntry("etherCareer", {
                subjects, work, values, dream,
                date: new Date().toLocaleDateString()
            });

            showResult("career-result", result + " Keep exploring! This is a reflection, not a career prediction.");
        });
    }


    // MY LITTLE WORLD

    if (card === "reflection") {

        function renderMemories() {

            const gallery = document.getElementById("memory-gallery");
            gallery.innerHTML = "";

            getEntries("etherMemories").forEach((entry, index) => {

                const div = document.createElement("div");
                div.className = "saved-entry";

                const heading = document.createElement("h3");
                heading.textContent = entry.title || "Untitled memory";

                const category = document.createElement("p");
                category.textContent = entry.type + " | " + entry.date;

                const note = document.createElement("p");
                note.textContent = entry.text;

                div.append(heading, category, note);

                if (entry.photo) {
                    const img = document.createElement("img");
                    img.src = entry.photo;
                    img.alt = "Saved memory";
                    img.style.width = "100%";
                    img.style.maxHeight = "250px";
                    img.style.objectFit = "contain";
                    img.style.marginTop = "12px";
                    div.appendChild(img);
                }

                const remove = document.createElement("button");
                remove.className = "tool-button";
                remove.textContent = "Delete";
                remove.addEventListener("click", () => {
                    const entries = getEntries("etherMemories");
                    entries.splice(index, 1);
                    localStorage.setItem("etherMemories", JSON.stringify(entries));
                    renderMemories();
                });

                div.appendChild(remove);
                gallery.appendChild(div);
            });
        }

        document.getElementById("save-memory").addEventListener("click", () => {

            const memoryTitle = document.getElementById("memory-title").value.trim();
            const type = document.getElementById("memory-type").value;
            const text = document.getElementById("memory-text").value.trim();
            const file = document.getElementById("memory-photo").files[0];

            if (!memoryTitle && !text && !file) {
                showResult("memory-result", "Add a memory first.");
                return;
            }

            function saveMemory(photo) {

                saveEntry("etherMemories", {
                    title: memoryTitle,
                    type,
                    text,
                    photo,
                    date: new Date().toLocaleDateString()
                });

                showResult("memory-result", "Your memory has been saved. 📖");

                document.getElementById("memory-title").value = "";
                document.getElementById("memory-text").value = "";
                document.getElementById("memory-photo").value = "";

                renderMemories();
            }

            if (file) {

                if (!file.type.startsWith("image/")) {
                    showResult("memory-result", "Please select an image.");
                    return;
                }

                if (file.size > 1024 * 1024) {
                    showResult("memory-result", "Please choose an image smaller than 1 MB.");
                    return;
                }

                const reader = new FileReader();

                reader.onload = () => saveMemory(reader.result);
                reader.onerror = () => showResult("memory-result", "The image could not be read.");

                reader.readAsDataURL(file);

            } else {
                saveMemory("");
            }

        });

        renderMemories();
    }

});

