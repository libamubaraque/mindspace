/* =========================================================
   TO THE ETHER — FEATURE ENGINE
   20 open spaces • detailed content • activities
   Optional accounts • saved entries • nested pages
   ========================================================= */

"use strict";

/* 01. SUPABASE
========================================================= */

const SUPABASE_URL = "https://sckcrrriiatfxcafabmh.supabase.co";
const SUPABASE_KEY =
  "sb_publishable_dQ_yskeZUEm8rCEjbz_1Lw_ftYCDmdo";

const db = window.supabase?.createClient
  ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)
  : null;

let activeSession = null;

/* 02. STORAGE
========================================================= */

const PLANNER_KEY = "ether_planner_tasks_v2";

function currentStorageId() {
  return activeSession?.user?.id || "guest";
}

function savedStorageKey() {
  return `ether_saved_pages_v2_${currentStorageId()}`;
}

function readStore(key, fallback = []) {
  try {
    const value = JSON.parse(localStorage.getItem(key) || "null");
    return value ?? fallback;
  } catch (error) {
    console.warn("Could not read saved information:", error);
    return fallback;
  }
}

function writeStore(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error("Could not save information:", error);
    return false;
  }
}

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function makeId() {
  return window.crypto?.randomUUID?.()
    || `${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

/* 03. ALL TWENTY SPACES
========================================================= */

const data = {

  mood: {
    title: "Mood Journal",
    category: "WELLBEING",
    image: "images/mood.jpg",
    description: "Understand your feelings and make space for your thoughts without judgement.",
    sections: [
      ["Understanding your emotions", "Emotions are information about how you experience the world. Happiness, frustration, sadness, excitement and uncertainty are all part of being human. Different feelings can appear together, and they can change throughout a day."],
      ["Putting feelings into words", "Try describing an emotion with a few simple words. You might feel calm, disappointed, nervous, hopeful, confused or excited. You do not need to find the perfect word. The purpose is to notice what is happening inside you."],
      ["Five ways to begin writing", "Write about a moment you want to remember, something that challenged you, a person who helped you, something you wish people understood or one thing you would like to try tomorrow. A few honest sentences are enough."],
      ["Difficult days deserve space too", "You do not have to turn every difficult experience into a lesson immediately. You can describe what happened, what you needed and what might make the next step easier. Your journal does not need to sound positive all the time."],
      ["Notice patterns gently", "Looking back at entries may help you notice which situations, routines or experiences affect your mood. This is personal reflection, not a diagnosis or a test. Avoid judging yourself for having a particular feeling."],
      ["When you do not know what to write", "Begin with a sentence such as 'Today felt different because…' or 'One thing I wish I could explain is…'. You can also write a list, draw a small picture or leave the page blank until you feel ready."],
      ["Privacy and your journal", "Your thoughts can be personal. Use a device you trust, avoid sharing private entries publicly and remember that browser-based storage is not the same as a secure private diary service. Do not save passwords or highly sensitive information here."],
      ["A gentle closing thought", "Your feelings do not have to be perfectly organised to deserve attention. Use this space to notice, reflect and understand yourself a little better, one entry at a time."]
    ],
    topics: [
      ["understanding-emotions", "Understanding Emotions", "Learn to name and understand different feelings."],
      ["journal-prompts", "Five Journal Prompts", "Explore thoughtful prompts for different kinds of days."],
      ["mood-reflection", "Mood Reflection", "Reflect on feelings without judging yourself."]
    ]
  },

  breathing: {
    title: "Breathing Space",
    category: "WELLBEING",
    image: "images/breathing.jpg",
    description: "Take a comfortable pause and explore simple mindfulness activities.",
    sections: [
      ["What is mindful breathing?", "Mindful breathing means paying attention to the natural movement of your breath. It is not about forcing yourself to breathe in a particular way or trying to achieve a perfect result."],
      ["Finding a comfortable position", "Sit or rest somewhere comfortable if you can. Let your shoulders and hands relax naturally. You can keep your eyes open or look at a calm point in the room."],
      ["Notice without forcing", "Pay attention to the ordinary movement of breathing. If your attention wanders, that is normal. You can simply notice the room around you instead of trying to control your breath."],
      ["Four ways to pause", "Try natural breathing, noticing a comfortable exhale, counting a few ordinary breaths or sitting quietly. You do not need to hold your breath, breathe deeply or follow a strict rhythm."],
      ["Mindfulness beyond breathing", "You can notice sounds outside, the feeling of your feet resting on the floor, the colours around you or the sensation of your hands. Mindfulness can involve the world around you, not only breathing."],
      ["Nature sounds and silence", "Some people enjoy gentle rain, birds or flowing water in the background. Others prefer silence. Neither choice is better. Choose what feels comfortable and stop the activity whenever you wish."],
      ["After your pause", "Ask yourself whether the activity felt comfortable, whether you noticed anything around you and whether you would choose the same activity again. There is no score or performance target."],
      ["A note about comfort", "Stop if an exercise makes you dizzy, uncomfortable or worried. Return to your ordinary breathing and surroundings. This activity is a simple pause, not a treatment or replacement for professional support."]
    ],
    topics: [
      ["mindful-breathing", "What Is Mindful Breathing?", "Understand the basics of paying attention to your natural breath."],
      ["breathing-exercises", "Breathing Activities", "Explore comfortable, gentle ways to pause."],
      ["nature-sounds", "Nature Sounds & Silence", "Choose between a quiet moment and nature-inspired listening."]
    ]
  },

  gratitude: {
    title: "Gratitude Journal",
    category: "WELLBEING",
    image: "images/gratitude.jpg",
    description: "Collect the little moments, people and experiences that matter.",
    sections: [
      ["What gratitude means", "Gratitude is noticing something you appreciate. It does not mean pretending that difficult experiences do not exist or forcing yourself to feel happy when you do not."],
      ["Small things count", "A good conversation, a favourite song, a comfortable place, a helpful teacher or a moment outdoors can be worth remembering. Ordinary moments can be meaningful without being extraordinary."],
      ["People who matter", "Think about someone who encouraged you or made an ordinary day better. You can write a letter to that person without sending it. You can also appreciate something about a friendship or family relationship."],
      ["Five prompts to try", "What made me smile today? What did I learn? Who supported me? What place feels comfortable? What ordinary thing do I appreciate? Choose one question rather than trying to answer all of them."],
      ["Gratitude on difficult days", "You can appreciate one thing while still being upset about something else. Gratitude should never be used to dismiss a real problem or tell someone that their difficulties do not matter."],
      ["Create a collection", "Keep short notes about moments you want to remember. You might collect kind words, places you visited, things you learned or small experiences that made a difference."],
      ["Say thank you thoughtfully", "A meaningful thank-you does not need to be long. Be specific about what someone did and why it mattered. You can write a note privately if you do not want to send it."],
      ["Look back with kindness", "When you revisit old entries, remember that every day is different. Your collection is not a competition to find the happiest moments. It is simply a record of things you chose to notice."]
    ],
    topics: [
      ["daily-gratitude", "Daily Gratitude", "Find small, meaningful moments to appreciate."],
      ["letters-of-thanks", "Letters of Thanks", "Write a thoughtful letter to someone who matters."],
      ["gratitude-prompts", "Gratitude Prompts", "Try different reflection questions."]
    ]
  },

  fitness: {
    title: "Fitness & Wellness",
    category: "WELLBEING",
    image: "images/fitness.jpg",
    description: "Explore movement, running, rest and everyday wellbeing.",
    sections: [
      ["Movement belongs to everyone", "Movement can be walking, playing, cycling, dancing, stretching or participating in a sport you enjoy. It does not have to look the same for everyone."],
      ["Taking a screen break", "After a long period of screen use, consider looking away from the screen, changing position or taking a comfortable break. A short pause can make a screen-heavy day feel less continuous."],
      ["Running and walking", "Running and walking can be ways to explore movement outdoors. Begin at a comfortable level, pay attention to your surroundings and allow time for rest. Your activity should suit your age, ability and circumstances."],
      ["Enjoyment matters", "Choose activities because you enjoy them, want to learn a skill or like spending time with others. Movement should not be a punishment or a way to compare your body with somebody else's."],
      ["Rest is part of wellbeing", "Rest, sleep, hydration and enjoyable activities all matter. Taking a break is not a failure and does not mean you have lost progress."],
      ["Finding an activity", "You might enjoy a school sport, cycling with family, dancing, walking with a friend or trying a beginner-friendly class. Consider safety, access, supervision and what feels comfortable."],
      ["Reflect on the experience", "Instead of focusing only on numbers, notice what you enjoyed, what felt comfortable and whether you would like to try the activity again. Your reflection can be about the experience itself."],
      ["Using activity platforms", "Strava is an external activity platform. This website provides a link to Strava, not a live account connection. A real connection requires a separately configured developer application and permission from the account holder."]
    ],
    topics: [
      ["movement-breaks", "Movement Breaks", "Explore simple ways to move between study sessions."],
      ["running-journal", "Running & Activity Journal", "Record personal activity notes and reflections."],
      ["strava-space", "Strava Connection", "Learn about activity tracking and the external Strava platform."]
    ]
  },

  checkin: {
    title: "Daily Check-in",
    category: "WELLBEING",
    image: "images/checkin.jpg",
    description: "A small place for daily reflections, little wins and fresh starts.",
    sections: [
      ["A moment for yourself", "A check-in can be as simple as noticing how your day is going. You do not need a long questionnaire or a perfect answer."],
      ["Little wins", "A small achievement can be finishing a task, asking a question, trying something new, helping someone or taking a break when you needed one."],
      ["Small talks", "Think about one person you could talk to when you want company or support. A conversation can begin with an ordinary question or a simple hello."],
      ["Fresh starts", "You can begin again without having to make a perfect plan. One manageable next step is often more useful than a long list of promises."],
      ["Questions for today", "What was one memorable moment? What felt easier than expected? What would you like to understand better? What is one thing you want to make time for?"],
      ["A little celebration", "Notice effort as well as outcomes. Trying, practising, asking for help and returning to something after a break are all experiences worth recognising."],
      ["When the day feels complicated", "You do not need to force a positive answer. You can write 'I am not sure yet' or leave a question unanswered. A check-in should feel like an invitation, not another school task."],
      ["End with one next step", "Choose one small thing that might help tomorrow feel more manageable. It could be preparing a book, asking a question, resting or making time for something you enjoy."]
    ],
    topics: [
      ["daily-reflection", "Daily Reflection", "A short reflection about your day."],
      ["little-wins", "Little Wins", "Collect the small things you accomplished."],
      ["question-wheel", "Question Wheel", "Explore a playful set of reflection prompts."]
    ]
  },

  study: {
    title: "Study & Focus",
    category: "GROWTH",
    image: "images/study.jpg",
    description: "Build manageable study habits and make room for focused learning.",
    sections: [
      ["Start with one task", "Choose one manageable task instead of trying to complete everything at once. A clear starting point can make a large assignment feel easier to approach."],
      ["The 10 and 5 method", "Try ten minutes of focused study followed by five minutes away from your screen. The aim is to make a short, manageable beginning, not to measure your worth by how much you finish."],
      ["Make a study space", "Keep the materials you need nearby and reduce distractions where possible. Your study space does not have to be perfect or expensive."],
      ["Different ways to learn", "Reading, practice questions, teaching a concept aloud, drawing a diagram and spaced revision can all support learning. Different subjects may need different methods."],
      ["Use breaks well", "During a five-minute break, stand up if comfortable, drink water, look away from your screen or simply rest. A break does not need another task."],
      ["Beginner, steady and advanced sessions", "A beginner session can focus on opening the book and understanding one idea. A steady session can include practice questions. A more challenging session can involve explaining a topic or reviewing mistakes."],
      ["When focus is difficult", "Try reducing the task, changing your environment or asking for help with a confusing concept. If you are tired, a break may be more useful than forcing yourself to continue."],
      ["Review without judgement", "At the end of a session, note what you worked on, what you understood and what you want to revisit. Learning is a process, and mistakes can show you what to practise next."]
    ],
    topics: [
      ["focus-session", "Focus Sessions", "Try a short, manageable study session."],
      ["study-methods", "Study Methods", "Explore different ways of learning."],
      ["study-reflection", "Study Reflection", "Review what worked and what you might change."]
    ]
  },

  selfcare: {
    title: "Self-care Corner",
    category: "WELLBEING",
    image: "images/selfcare.jpg",
    description: "Explore everyday care, healthy routines and looking after yourself.",
    sections: [
      ["Self-care is personal", "Self-care can include rest, connection, enjoyable activities, asking for help and looking after everyday needs. It is not one fixed routine that everyone must follow."],
      ["Physical wellbeing", "Regular meals, hydration, comfortable movement, sleep and appropriate healthcare all matter. Everyday care should be realistic for your circumstances."],
      ["Mental wellbeing", "You can make room for feelings, talk to someone you trust and take breaks when needed. Asking for support is a normal part of looking after yourself."],
      ["Your surroundings", "A comfortable study corner, a short walk, a tidy surface or a conversation with someone supportive may help make everyday life feel more manageable."],
      ["Personal care without pressure", "Skincare and grooming routines are personal choices. You do not need expensive products or a complicated routine. If a product causes irritation, stop using it and ask a trusted adult or healthcare professional for guidance."],
      ["Different needs and experiences", "People may have different health, hygiene and personal-care needs. Choose information that is relevant to you and avoid comparing your routines with other people's."],
      ["Periods and health questions", "If you menstruate, keeping a simple private note of dates or symptoms may help you describe patterns to a healthcare professional. Do not use a tracker to diagnose a condition. Ask a trusted adult or clinician about concerns or severe discomfort."],
      ["Support when you need it", "If you have a health concern, speak with a trusted adult or qualified healthcare professional. This website does not diagnose or treat conditions."]
    ],
    topics: [
      ["self-care-basics", "Everyday Self-care", "Explore practical everyday care."],
      ["support-network", "Your Support Network", "Think about trusted people and places where you can ask for help."],
      ["healthy-routines", "Healthy Routines", "Build gentle routines that suit your everyday life."]
    ]
  },

  stories: {
    title: "Stories & Realities",
    category: "COMMUNITY",
    image: "images/stories.jpg",
    description: "Discover real stories, human rights, challenges and meaningful change.",
    sections: [
      ["Understanding realities", "The world contains serious challenges. Learning about them can help us understand people and communities without reducing their experiences to headlines."],
      ["Human rights", "Human rights belong to every person. They include dignity, education, safety, equality and the freedom to participate in society."],
      ["People and communities", "Listen to people's experiences with respect. Avoid reducing a person's life to one event, one photograph or one label."],
      ["Looking beyond headlines", "When reading about a difficult issue, check the date, source and context. Look for reporting from reliable organisations and distinguish verified information from opinion."],
      ["Hope and change", "Positive change can come from education, community support, public services, advocacy and sustained efforts. Progress is often gradual and involves many people."],
      ["Understand different perspectives", "People may experience the same event in different ways. Listening carefully and checking evidence can help you understand an issue more fully."],
      ["What young people can learn", "Students can explore rights, history, geography, public health and community action through reliable educational resources. Learning does not require putting yourself in unsafe situations."],
      ["Respond with care", "When discussing difficult realities, use respectful language and avoid sharing graphic material. Thoughtful learning can build understanding while protecting the dignity of the people involved."]
    ],
    topics: [
      ["human-rights", "Human Rights", "Explore dignity, equality and fundamental rights."],
      ["true-stories", "True Stories", "Read carefully researched accounts of real experiences."],
      ["change-makers", "People Creating Change", "Discover examples of community action."]
    ]
  },

  career: {
    title: "Career Exploration",
    category: "GROWTH",
    image: "images/career.jpg",
    description: "Explore interests, career paths, courses and possibilities beyond school.",
    sections: [
      ["There is no single path", "Different careers involve different subjects, training, skills and experiences. A career choice does not have to be final while you are still discovering what interests you."],
      ["Start with curiosity", "Think about the subjects, problems and activities that interest you. You might enjoy helping people, investigating questions, designing, teaching, organising or building things."],
      ["Explore career families", "Career families can include healthcare, education, science, public service, technology, creative work, business, environment and community development. Each family contains many different roles."],
      ["Compare pathways", "Look at the degrees, diplomas, training routes and entrance requirements associated with a role. Requirements can differ between institutions and countries, so use official course information."],
      ["Think about the everyday work", "A job title tells you only part of the story. Explore the daily responsibilities, working environment, teamwork, study requirements and challenges involved."],
      ["India and international options", "Qualifications and professional registration can differ between India and other countries. A degree earned in one place may require additional recognition, exams or training elsewhere."],
      ["Consider lifestyle and values", "Think about the kind of contribution, environment, stability, flexibility and learning opportunities that matter to you. No career offers every advantage all the time."],
      ["Dreams beyond career", "Your interests, relationships, learning, creativity and contributions matter beyond your future job. Your life is bigger than a single career decision."]
    ],
    topics: [
      ["career-quiz", "Discover Your Interests", "Try a ten-question interest exploration quiz."],
      ["career-pathways", "Career Pathways", "Compare study routes and possible qualifications."],
      ["dreams-beyond-career", "Dreams Beyond Career", "Reflect on the life you want to build."]
    ]
  },

  scrapbook: {
    title: "My Little World",
    category: "CREATIVE",
    image: "images/scrapbook.jpg",
    description: "A personal corner for memories, photographs, letters and reflections.",
    sections: [
      ["Your personal collection", "Keep memories, thoughts, photographs and meaningful moments together. Your collection can be simple, colourful, organised or completely unfiltered."],
      ["Good and difficult days", "Your memories do not have to be perfect or polished. You can write honestly about an ordinary day, a disappointment, a funny moment or something you are still trying to understand."],
      ["Photographs and captions", "A photograph can remind you of a place, person, event or feeling. Add a short caption so that you remember why the moment mattered."],
      ["Letters to yourself", "Write a letter to your future self or record something you want to remember. You can include hopes, questions, reminders and things you are learning."],
      ["A timeline of moments", "Collect entries over time and look back at what you have experienced. A timeline can include school milestones, new interests, trips, projects and everyday moments."],
      ["Keep your own style", "You can organise memories by date, theme, people or mood. There is no required layout and no need to make every page look the same."],
      ["Privacy matters", "Think carefully before saving photographs or personal details about other people. Ask permission before sharing someone else's image or private story."],
      ["Your collection belongs to you", "This scrapbook prototype saves entries in the browser on the device you use. Clearing browser data or changing devices can remove access to those entries, so do not treat it as your only backup."]
    ],
    topics: [
      ["memory-gallery", "Memory Gallery", "Collect photographs and captions."],
      ["letters-to-self", "Letters to Myself", "Write letters for another time."],
      ["personal-timeline", "Personal Timeline", "Record meaningful moments as they happen."]
    ]
  },

  movies: {
    title: "Movies & Reflections",
    category: "CREATIVE",
    image: "images/movies.jpg",
    description: "Explore films, ideas, watchlists and thoughtful reflections.",
    sections: [
      ["Stories on screen", "Films can introduce different places, experiences and perspectives. They can entertain, ask questions and help audiences imagine lives different from their own."],
      ["Watch with curiosity", "Notice the characters, themes, choices and ideas in a story. Ask what the filmmaker wants the audience to consider."],
      ["Your watchlist", "Keep a list of films you would like to explore. You can organise it by genre, topic, language or the people who recommended it."],
      ["Reflect afterwards", "Think about what stayed with you and what questions the story raised. You might write about a character, a setting, a decision or an idea."],
      ["Stories and representation", "Consider whose perspectives are included and whose experiences may be missing. Media can shape how audiences understand people and communities."],
      ["Fact and fiction", "A film may be inspired by real events without showing every detail accurately. Check reliable sources when you want to learn about the history behind a story."],
      ["Discuss respectfully", "People can interpret the same film differently. Explain your view, listen to others and remember that disagreement does not need to become an argument."],
      ["Your film journal", "Save a title, a short reflection and one question you want to explore further. Your notes can focus on ideas rather than ratings."]
    ],
    topics: [
      ["watchlist", "My Watchlist", "Keep a personal list of films to explore."],
      ["film-reflections", "Film Reflections", "Write about themes and ideas."],
      ["storytelling", "Storytelling on Screen", "Explore how stories are built."]
    ]
  },

  commons: {
    title: "The Commons",
    category: "COMMUNITY",
    image: "images/commons.jpg",
    description: "Discover clubs, shared interests and ways to work together.",
    sections: [
      ["Shared interests", "Communities can form around books, science, art, sports, volunteering, languages and many other interests. A shared activity can help people learn from one another."],
      ["Working together", "Good collaboration includes listening, sharing responsibilities and respecting different ideas. A group works better when people understand what they are contributing."],
      ["Find your people", "Look for school clubs, supervised community activities and positive shared interests. You do not need to join everything to find a place where you feel comfortable."],
      ["Make room for everyone", "A welcoming community values different experiences and perspectives. People should be able to participate without being mocked or pressured."],
      ["Plan a small project", "A project might involve a reading group, a school display, a science activity or a community information campaign. Begin with a clear purpose and manageable steps."],
      ["Communication matters", "Ask questions, explain your ideas clearly and listen before responding. If a disagreement happens, focus on the issue rather than attacking a person."],
      ["Online and offline safety", "Use supervised spaces and trusted groups. Avoid sharing private details with strangers or meeting people from online groups without a trusted adult's involvement."],
      ["A community can grow", "Groups change as people learn and interests develop. Reflect on what worked, what could be improved and how everyone can feel included."]
    ],
    topics: [
      ["interest-clubs", "Interest Clubs", "Explore ideas for clubs and shared activities."],
      ["teamwork", "Teamwork", "Learn about communication and collaboration."],
      ["community-projects", "Community Projects", "Explore positive ways to contribute."]
    ]
  },

  sports: {
    title: "Sports & Movement",
    category: "COMMUNITY",
    image: "images/sports.jpg",
    description: "Explore sports, movement, participation and inspiring sporting stories.",
    sections: [
      ["Sport is for participation", "Sport can build friendships, teamwork, confidence and enjoyment. People take part for many different reasons and at many different levels."],
      ["Try different activities", "Explore activities that are accessible and appropriate for you. School teams, casual games, cycling, swimming and recreational clubs can all offer different experiences."],
      ["Teamwork", "Communication, fair play and respect are important parts of sport. A team includes people with different strengths and learning styles."],
      ["Sporting stories", "Learn about athletes, teams and the communities around sport. Their stories may include practice, setbacks, teamwork and important decisions."],
      ["Respect and inclusion", "Everyone deserves to participate in a respectful environment. Encourage others, follow agreed rules and avoid making fun of someone's ability."],
      ["Learning a skill", "A new sport can feel unfamiliar at first. Learn the basic rules, listen to qualified coaches and allow yourself time to understand the activity."],
      ["Safety and rest", "Use appropriate equipment and supervision. Take breaks when needed and tell a trusted adult if an activity causes pain or discomfort."],
      ["Reflect on participation", "Record what you tried, what you enjoyed and what you learned. You do not need to compare your performance with another person's."]
    ],
    topics: [
      ["sports-discovery", "Discover a Sport", "Explore different sports and activities."],
      ["team-challenges", "Teamwork Challenges", "Try safe, cooperative activities."],
      ["sports-journal", "Sports Journal", "Record participation and reflections."]
    ]
  },

  planner: {
    title: "Planner",
    category: "GROWTH",
    image: "images/planner.jpg",
    description: "Organise your day with realistic plans, breaks and room to restart.",
    sections: [
      ["Make a realistic plan", "A useful plan makes room for school, rest, family and personal interests. It should support your day rather than fill every available minute."],
      ["Choose priorities", "Pick one or two important tasks instead of filling your schedule with too many commitments. A clear priority can make it easier to begin."],
      ["Break tasks into steps", "A large task may become easier when divided into smaller actions. For example, opening your notes, reading one section and answering a question are separate steps."],
      ["Leave room to change", "Plans can change because of school, family, health or unexpected events. Adjusting a plan is not failure."],
      ["Remember breaks", "Short breaks can help you switch activities and return with a fresh perspective. Include meals, movement, rest and screen-free time where possible."],
      ["Avoid overplanning", "A planner is a tool, not a measure of personal value. If the plan becomes stressful, simplify it and keep only the most useful parts."],
      ["Review your day", "Notice what worked and what you might make easier tomorrow. You can move unfinished tasks to another day without blaming yourself."],
      ["Make it your own", "Some people prefer a short list, while others like a weekly view. Choose a format that is easy to understand and realistic for your routine."]
    ],
    topics: [
      ["daily-planner", "Daily Planner", "Create a simple task list."],
      ["weekly-reflection", "Weekly Reflection", "Review your week and plan gently."],
      ["break-planner", "Break Planner", "Remember to make space for rest."]
    ]
  },

  creative: {
    title: "Creative Studio",
    category: "CREATIVE",
    image: "images/creative.jpg",
    description: "Write, imagine, experiment and bring your ideas to life.",
    sections: [
      ["Make something", "Creativity can begin with a sentence, sketch, melody, photograph, design or idea. You do not need special equipment to begin exploring."],
      ["Experiment", "Try different approaches without expecting everything to be perfect. An unfinished draft can still be a useful step in the creative process."],
      ["Collect inspiration", "Notice colours, places, conversations, books, nature and ideas that inspire you. Keep a note of things you might want to explore later."],
      ["Keep creating", "You can return to an unfinished idea whenever you want. Taking a break from a project does not mean you have failed."],
      ["Explore different forms", "Writing, illustration, photography, crafts, design and storytelling all offer different ways to communicate. You can try more than one."],
      ["Learn from feedback", "Helpful feedback is specific and respectful. You can listen to suggestions while still deciding which changes fit your own idea."],
      ["Give credit", "If another person's work inspires you, acknowledge it. Do not present someone else's writing, art or photographs as your own."],
      ["Keep a record of ideas", "Save a short description of what you made, what you learned and what you might try next. Your collection can show how your ideas develop over time."]
    ],
    topics: [
      ["writing-studio", "Writing Studio", "Explore creative writing prompts."],
      ["idea-workshop", "Idea Workshop", "Develop an idea step by step."],
      ["creative-challenges", "Creative Challenges", "Try small creative activities."]
    ]
  },

  kindness: {
    title: "Kindness Corner",
    category: "COMMUNITY",
    image: "images/kindness.jpg",
    description: "Discover small acts of kindness and ways to contribute to your community.",
    sections: [
      ["Everyday kindness", "Kindness can be listening, including someone, sharing useful information or offering help when appropriate. Small actions can make shared spaces more welcoming."],
      ["Respect boundaries", "Kindness should respect other people's comfort, privacy and choices. Helping someone does not mean deciding what they need without listening."],
      ["Community care", "Small contributions can make a difference in a classroom, neighbourhood or shared space. Consider activities that are safe, supervised and suitable for your circumstances."],
      ["Notice the good", "Reflect on kind actions you have seen or experienced. You can also write a note of appreciation for someone who made a difference."],
      ["Kindness to yourself", "Treat yourself with the same patience you would offer another person. Making mistakes and needing help are ordinary parts of learning."],
      ["Include others", "A simple invitation to join a group activity can help someone feel welcome. Be respectful if they prefer not to participate."],
      ["Kindness without pressure", "You do not have to say yes to every request. Healthy boundaries matter, and kindness should never require you to put yourself in an unsafe situation."],
      ["Build a thoughtful habit", "Choose one realistic action you can take, reflect on how it felt and consider what you learned. The goal is genuine care, not collecting points."]
    ],
    topics: [
      ["kindness-challenge", "Kindness Challenge", "Try thoughtful, safe acts of kindness."],
      ["gratitude-notes", "Gratitude Notes", "Write an appreciation note."],
      ["community-care", "Community Care", "Explore ways to help locally."]
    ]
  },

  library: {
    title: "Little Library",
    category: "GROWTH",
    image: "images/library.jpg",
    description: "Explore knowledge, explainers, learning resources and new ideas.",
    sections: [
      ["Follow your curiosity", "Learning can begin with a question about science, history, nature, culture, language or society. A question can lead you towards a subject you had never considered."],
      ["Check your sources", "Look for reliable sources, clear evidence and more than one perspective. Check who published the information and when it was updated."],
      ["Keep a reading list", "Save books, articles and topics you want to explore. A reading list can include school subjects as well as personal interests."],
      ["Share what you learn", "Explain an idea in your own words to strengthen your understanding. If you cannot explain a concept yet, identify which part you want to revisit."],
      ["Separate fact and opinion", "An opinion expresses a viewpoint, while a factual claim should be supported by evidence. Some topics contain both, so look carefully at how information is presented."],
      ["Ask better questions", "Try questions that begin with how, why, when and what evidence. Clear questions can make research more focused."],
      ["Use information responsibly", "Respect copyright, credit creators and avoid copying entire articles or books. Summarise ideas in your own words and link to original sources."],
      ["Keep discovering", "You do not need to learn everything at once. Choose one interesting question and follow it as far as your time and curiosity allow."]
    ],
    topics: [
      ["reading-list", "Reading List", "Collect books and articles to explore."],
      ["curiosity-cards", "Curiosity Cards", "Explore questions across different subjects."],
      ["research-basics", "Research Basics", "Learn to evaluate information."]
    ]
  },

  sleep: {
    title: "Sleep & Rest",
    category: "WELLBEING",
    image: "images/sleep.jpg",
    description: "Learn about rest, bedtime routines and creating space to unwind.",
    sections: [
      ["Why rest matters", "Sleep supports learning, memory, mood and everyday functioning. Rest is part of health and should not be treated as something you have to earn."],
      ["A calmer evening", "A predictable evening routine may help you transition from busy activities to rest. Keep it realistic for your family and school schedule."],
      ["Make your space comfortable", "Consider light, noise, temperature and comfort. You may not be able to control every part of your environment, so focus on what is practical."],
      ["Screen habits", "Some people find it useful to step away from screens before bedtime. If that is difficult, try a small change that fits your routine rather than expecting perfection."],
      ["Rest during the day", "Quiet activities, a short pause and time away from demanding tasks can also support everyday wellbeing. Rest does not always mean sleeping."],
      ["When routines change", "Schoolwork, travel, family responsibilities and other events can affect routines. Return to familiar habits when possible without blaming yourself."],
      ["When sleep is difficult", "If sleep problems continue or affect daily life, talk with a trusted adult or healthcare professional. This page is educational and cannot diagnose a sleep condition."],
      ["Make room for recovery", "A balanced routine includes learning, relationships, enjoyable activities and rest. Your day does not have to be productive every minute."]
    ],
    topics: [
      ["rest-routine", "A Restful Routine", "Create a gentle evening routine."],
      ["sleep-environment", "Your Sleep Environment", "Explore comfort and quiet."],
      ["rest-reflection", "Rest Reflection", "Notice how your routines feel."]
    ]
  },

  money: {
    title: "Money Matters",
    category: "GROWTH",
    image: "images/money.jpg",
    description: "Learn about saving, budgeting, needs, wants and financial basics.",
    sections: [
      ["Money basics", "Understanding income, spending, saving and budgeting can help with everyday decisions. These are useful ideas to learn gradually."],
      ["Needs and wants", "A need is something important for everyday life. A want is something you would like to have. The difference can depend on a person's circumstances."],
      ["Plan before spending", "A simple budget can help you understand where money goes. Start with an example amount and list the things it may need to cover."],
      ["Saving goals", "A saving goal gives you a reason to set aside money over time. Make the goal realistic and remember that not everyone has the same financial circumstances."],
      ["Compare choices", "When comparing products or services, consider quality, usefulness, total cost and whether the purchase is necessary. Do not rely only on advertising."],
      ["Understand digital payments", "Digital payments can be convenient, but account details, passwords and one-time codes must remain private. Never share them with someone who contacts you unexpectedly."],
      ["Ask before making decisions", "If you are unsure about a financial decision, discuss it with a trusted adult. Avoid sending money or personal details to people you do not know."],
      ["Build financial knowledge", "Learning about money is a gradual process. Start with basic concepts and use reliable educational information rather than promises of quick earnings."]
    ],
    topics: [
      ["budget-basics", "Budget Basics", "Learn how a simple budget works."],
      ["needs-and-wants", "Needs & Wants", "Explore everyday spending choices."],
      ["saving-goals", "Saving Goals", "Set a simple savings target."]
    ]
  },

  openmic: {
    title: "Open Mic",
    category: "CREATIVE",
    image: "images/openmic.jpg",
    description: "A place for poetry, spoken word, personal writing and expression.",
    sections: [
      ["Find your voice", "Writing can be a way to explore ideas, feelings and imagination. You do not need to sound like another writer to create something meaningful."],
      ["Poetry starts anywhere", "A poem can begin with a place, a sound, a memory, a colour or a question. A first line can be simple and still lead somewhere interesting."],
      ["Write without pressure", "Your first draft does not have to be polished. Try writing freely, then return later if you want to edit or rearrange it."],
      ["Spoken word", "Spoken word combines writing with voice and performance. Think about rhythm, pauses and the way a sentence might sound when read aloud."],
      ["Explore different forms", "You might write a short poem, a personal reflection, a dialogue, a letter or a piece of spoken word. Different forms offer different ways to express an idea."],
      ["Editing your work", "Read your writing again and notice which lines feel clear or important. Editing can involve removing words, changing the order or choosing a more precise expression."],
      ["Share thoughtfully", "Only share writing publicly when you feel comfortable and have considered your privacy. You can keep work private or share it with someone you trust."],
      ["Keep a creative record", "Save drafts and finished pieces if you want to see how your writing develops. Every piece does not need to be published or shown to anyone."]
    ],
    topics: [
      ["poetry-corner", "Poetry Corner", "Explore poetry prompts."],
      ["spoken-word", "Spoken Word", "Build a short spoken-word piece."],
      ["writing-prompts", "Writing Prompts", "Find a starting point for a new piece."]
    ]
  }
};

/* 03A. ADDITIONAL READING — TWO EXTRA CHAPTERS FOR EACH SPACE */
const additionalChapters = {
  "mood": [
    [
      "Feelings, needs and boundaries",
      "Sometimes a feeling points towards something you need: rest, reassurance, space, connection or help with a problem. You can ask yourself what might be underneath the feeling without assuming there is one simple explanation. If a situation involves pressure or makes you feel unsafe, consider speaking with a trusted adult."
    ],
    [
      "A journal that grows with you",
      "Your entries may change as your experiences change. You might write in full paragraphs one day and make a short list the next. There is no required schedule, word count or perfect way to use this journal."
    ]
  ],
  "breathing": [
    [
      "Choose comfort over perfection",
      "Breathing exercises are optional. Keep your breathing natural and comfortable, and stop if you feel dizzy, uncomfortable or more anxious. You can simply notice the room around you, listen to a familiar sound or take a quiet break instead."
    ],
    [
      "Build a pause into an ordinary day",
      "A pause can happen before homework, after a busy conversation or when you move from one task to another. You do not need special equipment or a perfect setting. The point is to give yourself a little space."
    ]
  ],
  "gratitude": [
    [
      "Appreciation without comparison",
      "Your list does not need to resemble anyone else's. A moment that matters to you may seem ordinary to another person, and that is completely fine. Keep your attention on your own experience rather than comparing lives."
    ],
    [
      "Make room for mixed feelings",
      "You can be grateful for a person and still disagree with them. You can appreciate a good moment while wishing something had gone differently. Honest reflection makes room for more than one feeling."
    ]
  ],
  "fitness": [
    [
      "Make movement accessible",
      "Consider your surroundings, energy, health needs and available support when choosing an activity. You can adapt movement, take breaks or choose a different activity. If you have a health concern, ask a trusted adult or healthcare professional for advice."
    ],
    [
      "Notice what supports your wellbeing",
      "After an activity, reflect on enjoyment, comfort, confidence, connection and rest. Numbers and records are optional; they are not a measure of your value or a requirement for taking part."
    ]
  ],
  "checkin": [
    [
      "A check-in is not a score",
      "There is no grade for having a good day or a difficult one. You can skip questions, write a few words or simply notice that you are unsure. The activity is here to help you pause, not to judge your answers."
    ],
    [
      "Carry one kind thought forward",
      "Choose a small, realistic intention for the next part of your day. It might be asking a question, taking a break, preparing something you need or spending time on an interest. Let it be flexible."
    ]
  ],
  "study": [
    [
      "Make a plan that can bend",
      "Unexpected tasks, family responsibilities, tiredness and changing priorities are part of life. A useful plan can be adjusted. Choose what matters most, leave some breathing room and ask for help when a subject feels confusing."
    ],
    [
      "Learning is more than finishing",
      "Understanding a concept, correcting a mistake, asking a question and returning to a difficult topic are all meaningful parts of learning. Progress is not always visible as a completed checklist."
    ]
  ],
  "selfcare": [
    [
      "Care can be small and practical",
      "Self-care does not need to look like a perfect morning routine. It may mean eating when you are hungry, preparing for tomorrow, taking a screen break, talking to someone or making time for an activity you enjoy."
    ],
    [
      "Know when to ask for support",
      "Online information can be useful, but it cannot understand your full circumstances or replace individual care. If a health or emotional concern is affecting daily life, speak with a trusted adult and an appropriately qualified professional."
    ]
  ],
  "stories": [
    [
      "Read with context and care",
      "Look for the original source, publication date, evidence and voices directly affected by an issue. Be cautious with dramatic headlines, edited images and posts that do not explain where their information came from."
    ],
    [
      "From awareness to thoughtful action",
      "Learning can lead to respectful conversations, school projects, volunteering through trusted organisations and supporting community initiatives with adult guidance. You do not have to put yourself at risk to care about an issue."
    ]
  ],
  "career": [
    [
      "Talk to people who know the field",
      "Teachers, career counsellors, professionals and people studying a subject can help you understand what a pathway is really like. Prepare questions about daily work, training, costs, opportunities and challenges."
    ],
    [
      "Let your interests keep developing",
      "You may discover new subjects and change your mind as you learn more. Keep notes about what you enjoy and what you want to investigate. Exploration is useful even when it does not lead immediately to a decision."
    ]
  ],
  "scrapbook": [
    [
      "Remember the details that matter",
      "A date, a place, a song, a small conversation or a sentence someone said can help bring a memory back later. You do not need to document everything; choose the details you want to keep."
    ],
    [
      "Keep digital memories thoughtfully",
      "Use images you have permission to keep, avoid uploading private information about others and remember that this prototype stores entries in your browser. Save a separate backup of anything important."
    ]
  ],
  "movies": [
    [
      "Notice the choices behind a film",
      "Think about music, editing, colour, dialogue and point of view. These choices shape how a story feels and what the audience notices. You can explore them without needing technical film knowledge."
    ],
    [
      "Build a watchlist with intention",
      "Choose films that suit your interests and age guidance, and take breaks when you need them. A watchlist is a personal collection, not a challenge to finish as many titles as possible."
    ]
  ],
  "commons": [
    [
      "Shared spaces need respect",
      "A welcoming community makes room for different experiences, communication styles and interests. Listen, give others a chance to contribute and avoid sharing someone's personal information without permission."
    ],
    [
      "Start with one shared idea",
      "A club or group project can begin with a simple interest: reading, art, science, environment, sport or community service. Agree on a clear purpose and involve a responsible adult when organising activities."
    ]
  ],
  "sports": [
    [
      "Teamwork is part of sport",
      "Sport can involve communication, patience, practice and learning how to support teammates. People participate at different levels, and every role can contribute to a shared experience."
    ],
    [
      "Safety and enjoyment come first",
      "Choose age-appropriate activities, use suitable supervision and equipment, follow local safety guidance and rest when needed. The goal is a positive experience, not pushing through discomfort."
    ]
  ],
  "planner": [
    [
      "Separate priorities from pressure",
      "A planner should help you see what matters, not make every hour feel occupied. Choose a small number of priorities, include breaks and allow tasks to move when plans change."
    ],
    [
      "Review and adjust",
      "At the end of the day, notice what worked and what needs a different approach. Move unfinished tasks thoughtfully rather than treating them as a personal failure."
    ]
  ],
  "creative": [
    [
      "Experiment before judging the result",
      "Try a rough draft, a quick sketch, a few lines of poetry or an unusual combination of ideas. Early attempts are allowed to be unfinished. Experimenting helps you discover what you want to make."
    ],
    [
      "Create in your own voice",
      "You can learn from artists and writers while still developing your own perspective. Give credit when you use someone else's work, respect copyright and treat your first ideas as a starting point."
    ]
  ],
  "kindness": [
    [
      "Kindness includes boundaries",
      "Being kind does not mean agreeing to everything or accepting treatment that makes you uncomfortable. Respectful boundaries help people care for themselves and others."
    ],
    [
      "Notice the needs around you",
      "A thoughtful action might be listening, including someone in a conversation, sharing useful information or helping with an agreed task. Choose actions that are safe, appropriate and welcomed."
    ]
  ],
  "library": [
    [
      "Follow a question beyond the first answer",
      "When something interests you, look for a second reliable source and compare how each explains it. Check dates and distinguish evidence from opinion. Curiosity becomes stronger when it is paired with careful thinking."
    ],
    [
      "Keep a record of what you learn",
      "Write down the question, the most useful idea and one thing you still want to understand. Your notes can become a personal map of interests that grows over time."
    ]
  ],
  "sleep": [
    [
      "Create a gentle wind-down",
      "A calmer evening may include preparing school materials, dimming bright screens, reading or doing a quiet activity. Choose what is realistic for your home and routine; there is no single perfect bedtime ritual."
    ],
    [
      "When rest is difficult",
      "If sleep problems continue or affect your everyday life, speak with a trusted adult and a healthcare professional. This page offers general information, not a diagnosis or treatment plan."
    ]
  ],
  "money": [
    [
      "Understand needs, wants and choices",
      "A budget is a way to understand choices, not a reason to feel guilty. Needs and priorities differ between people and households. Start with simple examples and ask a trusted adult before making financial decisions."
    ],
    [
      "Be careful with online money claims",
      "Promises of quick income, guaranteed returns or easy rewards can be misleading or unsafe. Do not share passwords, one-time codes, bank details or personal documents with strangers. Ask a trusted adult before using a financial service."
    ]
  ],
  "openmic": [
    [
      "Find the form that fits your voice",
      "Expression can take the form of poetry, spoken word, a short story, a letter, a song you wrote or a small reflection. You can create privately without performing or sharing it."
    ],
    [
      "Share with care and permission",
      "If you choose to present your work, consider the audience and the privacy of anyone mentioned. You can use fictional details, change identifying information or keep a piece entirely to yourself."
    ]
  ]
};
Object.entries(additionalChapters).forEach(([spaceId, chapters]) => {
  if (data[spaceId]) data[spaceId].sections.push(...chapters);
});

/* 03B. EXTENDED READING — THREE MORE DISTINCT CHAPTERS FOR EVERY SPACE */
const extendedChapters = {
  "mood": [
    [
      "The difference between a feeling and a fact",
      "A feeling is real because you are experiencing it, but the first explanation that comes to mind may not tell the whole story. If you feel left out, for example, you might pause and ask what happened, what you know for certain and what you are still unsure about. This gentle distinction can help you respond with care rather than rushing to judge yourself or someone else."
    ],
    [
      "Writing when words feel difficult",
      "You can begin with fragments, a list of words, a question or a description of what is happening around you. Try writing, “Right now I notice…” or “I wish I had someone to talk to about…”. You are allowed to stop after a sentence. The value of a journal is not measured by how much you write."
    ],
    [
      "Support beyond the page",
      "A journal can help organise thoughts, but it cannot provide every kind of support. If something feels too heavy to manage alone, consider speaking with a trusted adult, school counsellor or qualified professional. You deserve to be listened to, and asking for help is a valid next step."
    ]
  ],
  "breathing": [
    [
      "Mindfulness can be ordinary",
      "Mindfulness does not need candles, music or a special room. It can be noticing the temperature of the air, the sounds nearby, the texture of a book cover or the feeling of sitting in a chair. These ordinary details can help bring attention back to the present moment."
    ],
    [
      "Choose an activity that suits the moment",
      "A quiet listening exercise may feel useful in one setting, while looking around the room may be more comfortable in another. You can choose silence, a familiar sound or no exercise at all. Your preferences and comfort are more important than following a particular technique."
    ],
    [
      "Make the space your own",
      "You might return to this page before studying, after travelling or during a transition between activities. Keep the experience simple and optional. If focusing on breathing feels unpleasant, leave that exercise and choose an external point of attention instead."
    ]
  ],
  "gratitude": [
    [
      "Collect moments, not achievements",
      "A meaningful entry does not have to describe a prize, a perfect result or a major event. It might be a familiar meal, a funny conversation, a kind message or a few minutes spent outdoors. Small observations can make a personal collection feel genuine and specific."
    ],
    [
      "Appreciation and honesty can coexist",
      "You can appreciate the people who support you while recognising that a relationship may sometimes be complicated. You can value an opportunity while feeling nervous about it. Gratitude is not a demand to ignore problems or excuse hurtful behaviour."
    ],
    [
      "Turn a reflection into a kind action",
      "If you notice that someone has helped you, you may choose to thank them, return a favour or pass along encouragement. Keep the action appropriate and comfortable for both people. A private note is just as meaningful as a message sent aloud."
    ]
  ],
  "fitness": [
    [
      "Find movement that fits your day",
      "The best activity is not necessarily the most intense or impressive one. It may be a walk with family, a game with friends, cycling in a safe place, dancing at home or a sport you enjoy. Access, comfort, health needs and supervision all matter when choosing an activity."
    ],
    [
      "Rest, recovery and flexibility",
      "Energy can vary from day to day. Rest is a normal part of wellbeing, and changing or skipping an activity when you need to is sensible. Avoid treating movement as punishment or feeling that you must make up for a rest day."
    ],
    [
      "Build a positive relationship with activity",
      "Notice whether an activity helps you feel engaged, connected, relaxed or curious. Avoid comparing your body, ability or progress with other people. If you have pain, dizziness or a health concern, stop and talk with a trusted adult or healthcare professional."
    ]
  ],
  "checkin": [
    [
      "A question can be enough",
      "You do not need to answer every prompt. One question such as “What do I need for the next hour?” may be enough to help you choose a manageable next step. You can also decide that you do not know yet."
    ],
    [
      "Notice what is within your control",
      "Some parts of a day depend on other people, circumstances or unexpected events. You can still consider one small choice available to you, such as asking a question, preparing a resource, taking a pause or reaching out to someone supportive."
    ],
    [
      "Make check-ins welcoming",
      "Try using this page at a time that suits you rather than turning it into another daily obligation. Missing a day does not create a task to catch up on. You can return whenever a moment of reflection feels useful."
    ]
  ],
  "study": [
    [
      "Understand before you memorise",
      "When possible, connect a new idea to something you already know. Explain it in your own words, draw a simple diagram or create an example. If you cannot explain a step, mark it as a question to revisit rather than assuming you should already understand it."
    ],
    [
      "Use mistakes as information",
      "A wrong answer can show which part of a method needs more practice. Look at the question, identify the step where your understanding changed and try a similar example. If the explanation is still unclear, ask a teacher or classmate for help."
    ],
    [
      "Protect time for life outside study",
      "Schoolwork is one part of a student's life, not the whole of it. Leave room for meals, sleep, movement, friendships, family responsibilities and interests. A realistic routine should support learning without making every free moment feel like an unfinished assignment."
    ]
  ],
  "selfcare": [
    [
      "Care is more than appearance",
      "Self-care includes physical comfort, emotional support, rest, relationships, safety and access to appropriate healthcare. It does not require buying products or following trends. Choose routines that are practical, safe and suitable for your circumstances."
    ],
    [
      "Listen to your own needs",
      "You might need quiet, company, help with a task, a break from a screen or a conversation with someone you trust. Needs can change, and it is fine to adjust a routine rather than forcing yourself to follow it exactly."
    ],
    [
      "Use reliable health information",
      "Online advice can be incomplete or misleading, especially when it makes dramatic promises. For medical questions, ongoing symptoms or personal health concerns, speak with a trusted adult and a qualified healthcare professional instead of relying on this website."
    ]
  ],
  "stories": [
    [
      "Look for the people behind the headlines",
      "News about a community or crisis can become a collection of numbers and headlines. Responsible learning also asks whose voices are included, what context is missing and how people directly affected describe their own experiences. Treat individuals with dignity rather than reducing them to a single story."
    ],
    [
      "Check information before sharing",
      "Look for the original report, date, author, evidence and other credible sources. Images and short clips can be taken out of context. If you cannot verify a claim, it is better to pause than to pass it along as fact."
    ],
    [
      "Hope can be thoughtful and realistic",
      "Recognising harm does not mean ignoring the people working towards solutions. Community organisations, educators, health workers, researchers and local volunteers may contribute to change in different ways. Learn about their work while remembering that complex problems rarely have one simple answer."
    ]
  ],
  "career": [
    [
      "Explore the work behind a job title",
      "A career name can sound exciting, but daily responsibilities may be very different from what you imagine. Look at typical tasks, working environments, training routes, required skills, challenges and the people a role serves. Reliable course and professional-body information can help you build a realistic picture."
    ],
    [
      "Compare pathways, not just destinations",
      "Different countries and institutions may have different entrance requirements, costs, qualifications and licensing rules. Check current official sources before making plans, and remember that a pathway can change as you learn more about yourself and the opportunities available."
    ],
    [
      "Keep more than one possibility open",
      "You do not have to choose a permanent future from a short quiz. Keep a list of subjects, activities and problems that interest you. Try projects, conversations and age-appropriate experiences that help you learn what the work actually involves."
    ]
  ],
  "scrapbook": [
    [
      "A collection can hold ordinary days",
      "Not every memory needs to be a milestone. You might keep a description of a rainy afternoon, a page about a school event, a favourite place or a message that made you feel appreciated. These details can become meaningful when you look back."
    ],
    [
      "Write letters for different moments",
      "You could write a letter to your future self, a thank-you note you may or may not send, or a reflection about something you have learned. Be thoughtful about names and private details if the device is shared with other people."
    ],
    [
      "Protect the memories you choose to keep",
      "This website's scrapbook prototype stores entries in the browser on the device you use. Browser data can be cleared, and entries may not appear on another device. Keep separate copies of important photographs or writing in a secure place you control."
    ]
  ],
  "movies": [
    [
      "Watch actively, not just quickly",
      "Notice what a film asks you to care about, whose perspective is centred and how the story presents difficult choices. You can pause, revisit a scene or write down a question. There is no need to turn every film into an assignment."
    ],
    [
      "Stories reflect choices and context",
      "Films are created by people working within particular times, cultures and industries. Consider how setting, casting, music, dialogue and editing influence the story. You can appreciate a film while still questioning its messages."
    ],
    [
      "Make room for different opinions",
      "Two viewers may interpret the same scene differently because they bring different experiences and expectations. Explain what led you to your view, listen to another interpretation and remember that disagreement can be respectful."
    ]
  ],
  "commons": [
    [
      "A community is made through participation",
      "Clubs and shared-interest groups grow when people have a reason to gather and a welcoming way to take part. A small reading circle, science activity, art exchange or environmental project can begin with a few interested people."
    ],
    [
      "Make participation accessible",
      "Think about timing, location, costs, communication and whether people with different needs can take part. Offer clear information and more than one way to contribute. Ask permission before sharing photographs, names or personal stories."
    ],
    [
      "Work together with clear expectations",
      "Agree on a purpose, simple responsibilities and a way to resolve misunderstandings. For school or community activities, involve a responsible adult and follow the relevant rules. Collaboration should be safe and respectful."
    ]
  ],
  "sports": [
    [
      "Sport can teach more than technique",
      "Playing a sport may involve patience, communication, teamwork, problem-solving and learning how to respond when plans change. These skills can be useful in many parts of life, whether or not someone wants to compete."
    ],
    [
      "Respect different ways of participating",
      "People may enjoy playing, coaching, organising, analysing matches, supporting a team or learning about sports history. Ability and access differ, and no single role makes someone more valuable than another."
    ],
    [
      "Keep safety at the centre",
      "Use age-appropriate activities, suitable supervision and appropriate equipment. Follow local guidance, respect personal limits and take breaks when needed. If something feels unsafe or causes pain, stop and seek appropriate help."
    ]
  ],
  "planner": [
    [
      "Give your plan breathing room",
      "A useful plan includes space for tasks to take longer than expected, unexpected responsibilities and proper breaks. If every minute is filled, one delay can make the whole day feel impossible. Leave room to adjust."
    ],
    [
      "Choose the next useful action",
      "When a task feels too large, write the smallest practical first step. It might be finding a textbook, opening a document, listing questions or asking someone to explain an instruction. A clear beginning can make the rest easier to approach."
    ],
    [
      "Review without turning it into judgement",
      "At the end of a planning period, notice which estimates were realistic and what interrupted your plans. Change the method if needed. A planner is a tool to support you, not a scorecard for your day."
    ]
  ],
  "creative": [
    [
      "Collect ideas before they disappear",
      "Keep a note of interesting phrases, colours, questions, images you are allowed to use or conversations that inspire you. Ideas can arrive at inconvenient times, and a rough note is enough to return to later."
    ],
    [
      "Learn from references responsibly",
      "Studying other creators can help you understand technique and style. Give credit, respect copyright and avoid presenting someone else's work as your own. Use references as a way to learn while developing your own choices."
    ],
    [
      "Finish something small",
      "A complete short poem, sketch, paragraph, collage or melody can teach you about your process. It does not need to be shared publicly or judged by likes. Making something for yourself is a valid creative outcome."
    ]
  ],
  "kindness": [
    [
      "Kindness begins with attention",
      "Notice whether someone wants advice, practical help, company or simply to be heard. Asking what would be useful can be more respectful than assuming you know what another person needs."
    ],
    [
      "Include people without making assumptions",
      "A welcoming gesture might be inviting someone into a group activity, explaining a shared task or making room for another person's contribution. Avoid putting someone on the spot or expecting them to respond in a particular way."
    ],
    [
      "Care for yourself while caring for others",
      "You are allowed to have limits. If a situation feels unsafe, overwhelming or beyond your role, involve a trusted adult. Kindness should not require you to ignore your own safety or wellbeing."
    ]
  ],
  "library": [
    [
      "Follow curiosity across subjects",
      "A question about nature might lead to science, geography, history and art. A question about a community might lead to law, public health, economics and personal stories. Learning becomes richer when you allow connections between subjects."
    ],
    [
      "Check the quality of a source",
      "Consider who published the information, when it was updated, what evidence is provided and whether other reliable sources agree. For important facts, prefer official institutions, educational organisations and reputable research sources."
    ],
    [
      "Keep questions as well as answers",
      "A useful reading note can include the question you began with, one idea you learned, a source to revisit and something that remains unclear. Curiosity does not end when you reach one answer."
    ]
  ],
  "sleep": [
    [
      "Notice your evening environment",
      "Light, noise, temperature, screen use, routines and daily responsibilities can all influence how restful an evening feels. Some factors are within your control and others are not. Focus on practical adjustments that are possible in your home."
    ],
    [
      "Build a routine that can change",
      "A wind-down routine might involve preparing for tomorrow, reading, listening to something calm or doing a quiet activity. Keep it flexible; a routine should help you, not become another reason to feel pressured."
    ],
    [
      "Ask for help when rest stays difficult",
      "If sleep concerns continue, affect school or everyday life, or leave you worried, talk with a trusted adult and a healthcare professional. This page offers general educational information and cannot diagnose or treat sleep problems."
    ]
  ],
  "money": [
    [
      "Learn the language of money",
      "Income, spending, saving, needs, wants and budgeting are useful words to understand. A budget simply helps organise available money and planned expenses. Examples can be imaginary; you do not need to share your family's financial details here."
    ],
    [
      "Think carefully about online offers",
      "Be cautious of messages promising easy money, guaranteed rewards or quick returns. Do not share passwords, one-time codes, bank details or identity documents with strangers. Ask a trusted adult before signing up for a financial service or making a payment."
    ],
    [
      "Small decisions need context",
      "Financial choices depend on personal and family circumstances. A simple calculator can demonstrate arithmetic, but it cannot decide what someone should spend or save. For real decisions, use reliable information and advice from a trusted adult."
    ]
  ],
  "openmic": [
    [
      "Find a subject that matters to you",
      "A piece of writing can begin with a memory, a question, a place, an idea or something you wish people understood. You can write from your own point of view or invent a fictional speaker. There is no requirement to share personal experiences."
    ],
    [
      "Try different forms of expression",
      "A short poem, spoken-word draft, monologue, letter, story or reflective paragraph can all be a starting point. Read it aloud privately if that helps you hear the rhythm, then revise only what you want to change."
    ],
    [
      "Your voice does not need an audience",
      "You can keep your writing private, share it with someone you trust or take part in an appropriate school activity. If a piece includes other people, protect their privacy and avoid sharing details without permission."
    ]
  ]
};
Object.entries(extendedChapters).forEach(([spaceId, chapters]) => {
  if (data[spaceId]) data[spaceId].sections.push(...chapters);
});


/* 03B. ADDITIONAL READING FOR EVERY SPACE */
const additionalReading = {
  mood: ["When you do not have the words yet", "You can begin with a colour, a single word, a question or a description of what is happening around you. It is fine if your thoughts do not make sense immediately. Writing can be a place to notice what you are experiencing, not a test you have to pass. If a concern feels too difficult to manage alone, reach out to a trusted person."],
  breathing: ["Find a pause that suits the moment", "A pause can be as simple as looking out of a window, noticing the sounds around you or sitting quietly before beginning another activity. You do not need to follow a particular breathing pattern or complete a long exercise. If focusing inward feels uncomfortable, choose an external point of attention or leave the activity."],
  gratitude: ["Remember the details, not just the headline", "Instead of writing only that something was good, capture one detail that made it meaningful: a helpful explanation, a familiar meal, a kind message or a moment outdoors. You can appreciate these things while still being honest about difficult parts of your day. Gratitude should never be used to silence your feelings."],
  fitness: ["Make movement enjoyable and safe", "Movement can include walking, dancing, cycling in a safe place, playing a game or trying a sport. It does not need to be measured, posted or compared with anyone else's activity. Choose age-appropriate options, follow safety guidance and make room for rest. If you have health concerns, ask a trusted adult and healthcare professional."],
  checkin: ["What would make the next hour easier?", "A useful check-in does not need many questions. Consider whether you need information, a break, help with a task, a conversation or time to think. You may not be able to change the whole situation, but identifying one realistic next step can make it feel less tangled. It is also okay if you do not know yet."],
  study: ["Learn actively, not just repeatedly", "After reading a section, close the book and explain the main idea in your own words. Try a question from memory, draw a simple diagram or work through an example. Then check your notes and identify what needs more practice. When you are stuck, write down the exact step that is confusing and ask for help."],
  selfcare: ["Care should fit your real circumstances", "Self-care is not a shopping list or a perfect routine. It can mean getting enough rest, eating regular meals, keeping comfortable, spending time with supportive people or asking for help. Be cautious of online advice that makes dramatic promises. For personal medical questions, speak with a qualified healthcare professional."],
  stories: ["Check the context before sharing", "A headline or short video rarely explains a whole issue. Look for the original report, its date, the evidence and perspectives from credible sources. Notice whose voices are missing and avoid treating one person's experience as representative of an entire community. If you cannot verify a claim, pause before passing it along."],
  career: ["Explore the work behind the job title", "Find out what people in a field actually do each day, which skills they use and what challenges they face. Compare official course requirements, entrance routes, duration, costs and licensing rules in the places where you might study or work. A short quiz can suggest interests, but it cannot decide your future for you."],
  scrapbook: ["Keep memories with care", "A page can preserve an ordinary detail, a favourite place, a school event or a thought you want to revisit. Ask permission before saving or sharing another person's photograph or story, and avoid storing sensitive details on a shared device. This prototype saves entries in the browser on the device you use, so keep separate copies of important work."],
  movies: ["Look at the choices behind the story", "Notice whose perspective is centred, how music and editing shape your reaction and what the story leaves unexplained. Films can introduce unfamiliar histories and cultures, but one film cannot represent every person's experience. Enjoy the story while staying curious about its messages and checking background information when needed."],
  commons: ["Help make shared spaces welcoming", "Clear expectations, friendly introductions and more than one way to participate can help people feel included. Respect privacy, ask before taking photographs and do not pressure anyone to share personal experiences. For school or community activities, involve responsible adults and agree on safe ways to communicate and resolve problems."],
  sports: ["Respect the people playing the game", "Sport can teach cooperation, patience, fairness and respect for opponents. People participate in different ways—as players, organisers, coaches, supporters or learners—and no single role makes someone more valuable. Follow age-appropriate rules, use suitable equipment and stop if an activity feels unsafe."],
  planner: ["Leave room for plans to change", "A useful plan includes breaks, unexpected responsibilities and enough time for tasks to take longer than expected. Choose what genuinely needs attention first, divide larger tasks into clear actions and ask for help when instructions are unclear. Revising a plan is not failure; it is using what you learned."],
  creative: ["Let early ideas stay unfinished", "Try a rough sketch, a short paragraph, a colour collection or a small prototype before deciding what works. Experimenting helps you discover what you enjoy. If you share a project, respect copyright, credit references and get permission before using another person's photographs, music or writing."],
  kindness: ["Listening is also a way to help", "Sometimes a person needs to be heard before they are ready for advice. You can ask whether they want you to listen, help think through options or find a trusted adult. Respect their boundaries, and remember that you are not responsible for solving every problem. Your own boundaries matter too."],
  library: ["Build a reading trail of your own", "Keep a list of books, articles and questions you want to revisit. After reading, note one idea that stayed with you, one thing you questioned or a subject you want to explore further. Reading does not need to become an assignment; a few personal notes can make an interesting idea easier to remember."],
  sleep: ["Notice what supports your rest", "A calmer evening might include preparing school materials earlier, lowering screen brightness or choosing a quiet activity. Family schedules and living arrangements differ, so focus on realistic changes rather than expecting a perfect routine. If tiredness or sleep difficulties continue, talk with a trusted adult and healthcare professional."],
  money: ["Pause before trusting money promises", "Online posts that promise quick earnings or guaranteed returns may hide important risks. Never share passwords, one-time codes, bank details or identity documents with strangers. Practise budgeting with imaginary amounts while learning, and involve a trusted adult before signing up for financial services or spending money."],
  openmic: ["Expression does not have to mean performing", "You can contribute through writing, drawing, asking a question, listening or sharing an idea when you feel ready. A welcoming creative space respects different confidence levels and perspectives. Do not record or repost another person's contribution without permission, and seek adult support if a discussion becomes unsafe."]
};
Object.entries(additionalReading).forEach(([spaceId, chapter]) => {
  if (data[spaceId]) data[spaceId].sections.push(chapter);
});


/* MORE TEXT + PHOTO GALLERY UPDATE */
const additionalReadingRoundTwo = {
  "mood": [
    "A page without pressure",
    "There is no required length, style or schedule for a personal journal. You might write a paragraph, make a list, record a question or simply name one thing that has been on your mind. If you return to an old entry, read it with the understanding that you were doing the best you could with what you knew at the time."
  ],
  "breathing": [
    "Grounding through your surroundings",
    "If focusing on breathing is not comfortable, turn your attention outward. Notice the colours, shapes, sounds or textures around you. You can name a few things you see, listen to a familiar sound or feel your feet resting on the floor. Choose an activity that feels comfortable and stop whenever you want."
  ],
  "gratitude": [
    "A collection of ordinary moments",
    "You might remember a helpful explanation, a favourite meal, a message from someone you care about or a moment when the weather changed. These details do not need to be extraordinary to matter. Keep your entries honest: appreciating one part of a day does not mean every other part was easy."
  ],
  "fitness": [
    "Wellbeing is more than a workout",
    "Everyday wellbeing includes movement you enjoy, enough rest, regular meals, hydration, supportive relationships and time away from screens. There is no single activity or routine that suits everyone. Choose safe, age-appropriate movement and avoid comparing your body, ability or progress with other people."
  ],
  "checkin": [
    "One small next step is enough",
    "When a day feels crowded, choose one action that is realistic for the time and energy you have. It might be asking a teacher to explain something, preparing one item for tomorrow or taking a short break. A check-in is not a demand to fix everything; it is a chance to notice what could help."
  ],
  "study": [
    "Build understanding one connection at a time",
    "When learning a new idea, connect it to something you already know. Explain the concept in your own words, draw a simple diagram or create an example. After practising, check the textbook or class notes for gaps. Understanding often develops through several small attempts rather than one perfect study session."
  ],
  "selfcare": [
    "Support can be part of self-care",
    "Sometimes the most useful form of care is telling a trusted adult that something is difficult. You can ask for help with school pressure, health questions, relationships or a routine that is not working. You do not need to manage every concern independently, and online information cannot replace personal professional advice."
  ],
  "stories": [
    "Make room for context and different voices",
    "When exploring a real-world issue, look for reliable reporting, original sources and perspectives from people directly affected. Check when information was published and distinguish confirmed facts from commentary. Avoid sharing images or personal stories without permission, especially when they involve children or people in vulnerable situations."
  ],
  "career": [
    "A career choice can remain a work in progress",
    "Interests often develop as you meet new subjects, people and experiences. Compare official course information and professional requirements, but also learn about the everyday responsibilities of a job. A quiz or list of careers can offer ideas; it cannot predict what you must become."
  ],
  "scrapbook": [
    "Your memories deserve thoughtful privacy",
    "Before saving a photograph or a story involving another person, ask whether they are comfortable with it. Be careful when using a shared device, and remember that locally saved browser entries may be lost if browser data is cleared. Keep a separate copy of anything you would be upset to lose."
  ],
  "movies": [
    "A film can be a starting point for questions",
    "After watching, consider what the story made you notice, which characters had a voice and what the film left unexplored. If it depicts real events, compare it with reliable sources. A creative work can invite discussion, but it is not automatically a complete or accurate account of history."
  ],
  "commons": [
    "A community grows through participation and respect",
    "A welcoming group makes room for people who are new, quiet or still finding their interests. Share tasks fairly, communicate clearly and make sure people can choose how much they participate. Respect privacy and involve responsible adults when organising activities or handling difficult situations."
  ],
  "sports": [
    "Teamwork is built in small moments",
    "Encouraging a teammate, listening to instructions, respecting rules and accepting different skill levels all contribute to a positive sporting environment. Enjoyment and safety matter more than winning every time. Choose activities with appropriate supervision and equipment."
  ],
  "planner": [
    "Make your plan useful, not intimidating",
    "Write tasks as clear actions rather than broad worries. Instead of 'study science', you might note 'review the diagram' or 'try three practice questions'. Leave room for breaks and unexpected changes. If a task repeatedly feels too large, divide it again or ask someone to help clarify it."
  ],
  "creative": [
    "Collect ideas before judging them",
    "Keep a small list of interesting words, images, questions, colours or observations. Later, combine two ideas and see what happens. Early drafts are allowed to be messy. If you use references or materials created by others, respect copyright and credit or request permission where needed."
  ],
  "kindness": [
    "Care for others without forgetting your own boundaries",
    "You can be considerate while still saying no, asking for space or seeking help from an adult. Listening does not mean agreeing with everything, and helping does not mean taking responsibility for another person's safety alone. Healthy communities make room for mutual respect."
  ],
  "library": [
    "Let curiosity guide your next book",
    "Choose something that answers a question you already have or introduces a subject you have never explored. Keep track of useful sources and check who wrote them, when they were published and what evidence they use. You can read for enjoyment as well as for school."
  ],
  "sleep": [
    "Rest routines should be realistic",
    "A calm evening might include preparing a school bag earlier, dimming a screen or choosing a quiet activity. Your home and schedule may not allow the same routine every day, so small practical changes are enough to begin. If sleep problems continue, speak with a trusted adult and healthcare professional."
  ],
  "money": [
    "Learn financial language before making decisions",
    "Understand basic ideas such as income, spending, saving, needs and wants using examples or imaginary amounts. Be cautious of online promises of easy money. Never share passwords, one-time codes or bank details, and involve a trusted adult before using financial services."
  ],
  "openmic": [
    "Your words can take many forms",
    "A contribution might be a poem, a short paragraph, a question, a drawing or a thoughtful response to someone else's work. You can keep your writing private or share it in a safe, respectful setting. Always ask before recording or reposting another person's contribution."
  ]
};
Object.entries(additionalReadingRoundTwo).forEach(([spaceId, chapter]) => {
  if (data[spaceId]) data[spaceId].sections.push(chapter);
});

const featurePhotoSets = {
  "mood": [
    "https://images.unsplash.com/photo-1761322572550-967ea8c0bfd9?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1654356709115-3f68998bead4?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1761464508925-f421635ea61b?auto=format&fit=crop&w=1200&q=85"
  ],
  "breathing": [
    "https://images.unsplash.com/photo-1770750869369-5968806bbd82?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1761464508925-f421635ea61b?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1654356709115-3f68998bead4?auto=format&fit=crop&w=1200&q=85"
  ],
  "gratitude": [
    "https://images.unsplash.com/photo-1761322572550-967ea8c0bfd9?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1654356709115-3f68998bead4?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1771366629879-8b3128ee62ca?auto=format&fit=crop&w=1200&q=85"
  ],
  "fitness": [
    "https://images.unsplash.com/photo-1774145617910-d29a5a07119c?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1770750869369-5968806bbd82?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1761464508925-f421635ea61b?auto=format&fit=crop&w=1200&q=85"
  ],
  "checkin": [
    "https://images.unsplash.com/photo-1761322572550-967ea8c0bfd9?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1747515203898-2df8f083f417?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1654356709115-3f68998bead4?auto=format&fit=crop&w=1200&q=85"
  ],
  "study": [
    "https://images.unsplash.com/photo-1747515203898-2df8f083f417?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1761322572550-967ea8c0bfd9?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1771366629879-8b3128ee62ca?auto=format&fit=crop&w=1200&q=85"
  ],
  "selfcare": [
    "https://images.unsplash.com/photo-1654356709115-3f68998bead4?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1761464508925-f421635ea61b?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1761322572550-967ea8c0bfd9?auto=format&fit=crop&w=1200&q=85"
  ],
  "stories": [
    "https://images.unsplash.com/photo-1770750869369-5968806bbd82?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1747515203898-2df8f083f417?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1654356709115-3f68998bead4?auto=format&fit=crop&w=1200&q=85"
  ],
  "career": [
    "https://images.unsplash.com/photo-1747515203898-2df8f083f417?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1771366629879-8b3128ee62ca?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1761322572550-967ea8c0bfd9?auto=format&fit=crop&w=1200&q=85"
  ],
  "scrapbook": [
    "https://images.unsplash.com/photo-1761322572550-967ea8c0bfd9?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1771366629879-8b3128ee62ca?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1654356709115-3f68998bead4?auto=format&fit=crop&w=1200&q=85"
  ],
  "movies": [
    "https://images.unsplash.com/photo-1747515203898-2df8f083f417?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1770750869369-5968806bbd82?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1771366629879-8b3128ee62ca?auto=format&fit=crop&w=1200&q=85"
  ],
  "commons": [
    "https://images.unsplash.com/photo-1770750869369-5968806bbd82?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1654356709115-3f68998bead4?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1747515203898-2df8f083f417?auto=format&fit=crop&w=1200&q=85"
  ],
  "sports": [
    "https://images.unsplash.com/photo-1774145617910-d29a5a07119c?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1770750869369-5968806bbd82?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1761464508925-f421635ea61b?auto=format&fit=crop&w=1200&q=85"
  ],
  "planner": [
    "https://images.unsplash.com/photo-1761322572550-967ea8c0bfd9?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1747515203898-2df8f083f417?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1771366629879-8b3128ee62ca?auto=format&fit=crop&w=1200&q=85"
  ],
  "creative": [
    "https://images.unsplash.com/photo-1771366629879-8b3128ee62ca?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1761322572550-967ea8c0bfd9?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1654356709115-3f68998bead4?auto=format&fit=crop&w=1200&q=85"
  ],
  "kindness": [
    "https://images.unsplash.com/photo-1654356709115-3f68998bead4?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1770750869369-5968806bbd82?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1761322572550-967ea8c0bfd9?auto=format&fit=crop&w=1200&q=85"
  ],
  "library": [
    "https://images.unsplash.com/photo-1747515203898-2df8f083f417?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1761322572550-967ea8c0bfd9?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1771366629879-8b3128ee62ca?auto=format&fit=crop&w=1200&q=85"
  ],
  "sleep": [
    "https://images.unsplash.com/photo-1761464508925-f421635ea61b?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1770750869369-5968806bbd82?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1654356709115-3f68998bead4?auto=format&fit=crop&w=1200&q=85"
  ],
  "money": [
    "https://images.unsplash.com/photo-1761322572550-967ea8c0bfd9?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1747515203898-2df8f083f417?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1771366629879-8b3128ee62ca?auto=format&fit=crop&w=1200&q=85"
  ],
  "openmic": [
    "https://images.unsplash.com/photo-1771366629879-8b3128ee62ca?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1761322572550-967ea8c0bfd9?auto=format&fit=crop&w=1200&q=85",
    "https://images.unsplash.com/photo-1770750869369-5968806bbd82?auto=format&fit=crop&w=1200&q=85"
  ]
};

/* 04. PAGE ELEMENTS
========================================================= */

const params = new URLSearchParams(window.location.search);
const featureId = params.get("id");
const nestedId = params.get("page");

const feature = data[featureId];

const titleElement = document.getElementById("featureTitle");
const categoryElement = document.getElementById("featureCategory");
const descriptionElement = document.getElementById("featureDescription");
const imageElement = document.getElementById("featureImage");
const contentElement = document.getElementById("featureContent");
const breadcrumb = document.getElementById("breadcrumbCurrent");
const sidebarElement = document.getElementById("featureSavedPages");

const yearElement = document.getElementById("year");

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

/* 05. OPTIONAL SESSION CHECK — NEVER BLOCK ACCESS
========================================================= */

async function initialiseFeatureSession() {
  if (!db) return;

  try {
    const { data: sessionData, error } = await db.auth.getSession();
    if (error) throw error;
    activeSession = sessionData.session;
  } catch (error) {
    console.warn("Could not restore account session:", error);
  }
}

async function loadMoodJournalEntries() {
  if (featureId !== "mood" || !db || !activeSession?.user?.id) return;

  const { data: rows, error } = await db
    .from("journal_entries")
    .select("id, title, content, created_at")
    .eq("user_id", activeSession.user.id)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Mood Journal Supabase load failed:", error);
    return;
  }

  const otherSpaces = getSavedPages().filter(entry => entry.space !== "mood");
  const journalEntries = (rows || []).map(row => ({
    id: row.id,
    space: "mood",
    title: row.title || "Untitled entry",
    content: row.content || "",
    photo: "",
    date: row.created_at || new Date().toISOString()
  }));

  writeStore(savedStorageKey(), [...journalEntries, ...otherSpaces]);
}

/* 06. CONTENT RENDERING
========================================================= */


/* CARD_INTERIOR_EXPANSION */
const cardInteriorNotes = {
  mood: "Try describing a specific moment, what you noticed and what you wish someone understood. You can write honestly without needing to reach a conclusion.",
  breathing: "Adapt this idea to the place you are in and the time you have. Choose a comfortable approach and stop if the activity does not feel right.",
  gratitude: "Look for the detail that made this moment meaningful. It might be a person's effort, a small comfort or something you learned.",
  fitness: "Make choices that respect your comfort, safety and circumstances. Enjoyment, rest and support are important parts of wellbeing.",
  checkin: "A few words can be enough to notice what matters today. Your next step can change when your circumstances change.",
  study: "Connect the idea to a real example, explain it in your own words and check what you have understood. Ask a teacher if something remains unclear.",
  selfcare: "Think about what is practical in your daily life and what support is available. A trusted adult can help with concerns that feel too big to manage alone.",
  stories: "Check the context, source and date before drawing a conclusion. Consider whose voices are included and whether the information respects the people involved.",
  career: "Compare real responsibilities, official course requirements and different pathways. Interests and plans can develop over time.",
  scrapbook: "Add details that help you remember why the moment matters, while protecting your privacy and the privacy of others.",
  movies: "Support your interpretation with a scene or creative choice. If the story is based on real events, compare it with reliable sources.",
  commons: "Think about how different people could take part and feel respected. Clear expectations, shared responsibility and privacy help a group.",
  sports: "Focus on learning, teamwork, fair play and safe participation. Ask for guidance when trying something new and remember that rest matters.",
  planner: "Make the next action specific and realistic. Leave space for changes and ask for clarification if you are unsure what a task requires.",
  creative: "Experiment, collect ideas and allow early attempts to be imperfect. Notice what you learned and respect other creators' work.",
  kindness: "Consider what the other person actually needs, respect their choices and keep healthy boundaries.",
  library: "Check who created the source, when it was published and what evidence supports it. Keep useful notes so you can return to reliable information.",
  sleep: "Choose realistic changes that fit your home and schedule. If difficulties continue, discuss them with a trusted adult and healthcare professional.",
  money: "Use trusted information, protect personal details and ask a trusted adult before making financial decisions.",
  openmic: "Choose the form and level of sharing that feels right to you. Your work can be private, and sharing should respect everyone's privacy."
};

function renderSections(sections) {
  return sections.map(([heading, paragraph], index) => `
    <section class="feature-text-section">
      <p class="eyebrow">CHAPTER ${String(index + 1).padStart(2, "0")}</p>
      <h2>${escapeHTML(heading)}</h2>
      <p>${escapeHTML(paragraph)}</p>
      <p>${escapeHTML(cardInteriorNotes[featureId] || "Take a moment to explore this idea in a way that feels useful and comfortable for you.")}</p>
      <p class="chapter-note">A thought to carry with you: take what is useful, leave what is not, and return whenever you feel ready.</p>
    </section>
  `).join("");
}

function renderNestedCards(item) {
  return `
    <section class="nested-topics-section">
      <p class="eyebrow">GO A LITTLE DEEPER</p>
      <h2>Explore inside this space.</h2>
      <p class="topic-intro">Each part of this space has its own little world. Choose a photograph and follow the subject that interests you.</p>

      <div class="nested-grid">
        ${item.topics.map(([id, title, description], index) => `
          <a
            class="nested-card"
            href="feature.html?id=${encodeURIComponent(featureId)}&page=${encodeURIComponent(id)}"
          >
            <img class="topic-image" src="${(featurePhotoSets[featureId] || [item.image])[index % (featurePhotoSets[featureId] || [item.image]).length]}" alt="${escapeHTML(title)}" loading="lazy">
            <div class="topic-card-copy">
              <span class="card-number">DISCOVER ↗</span>
              <h3>${escapeHTML(title)}</h3>
            </div>
            <p>${escapeHTML(description)}</p>
            <p class="nested-detail">Explore the ideas, examples and small practical steps in this part of the space. Take your time, follow what interests you and return to the main space whenever you wish.</p>
          </a>
        `).join("")}
      </div>
    </section>
  `;
}

/* 07. SAVED ENTRIES
========================================================= */

function getSavedPages() {
  const entries = readStore(savedStorageKey(), []);
  return Array.isArray(entries) ? entries : [];
}

async function savePage(entry) {
  const title = String(entry.title || "Untitled entry");
  const content = String(entry.content || "");

  if (featureId === "mood" && db && activeSession?.user?.id) {
    const { data: row, error } = await db
      .from("journal_entries")
      .insert({
        user_id: activeSession.user.id,
        title,
        content,
        entry_date: new Date().toISOString().slice(0, 10)
      })
      .select("id, title, content, created_at")
      .single();

    if (error) {
      console.error("Mood Journal Supabase save failed:", error);
      return false;
    }

    const entries = getSavedPages().filter(item => item.id !== row.id);
    entries.unshift({
      id: row.id,
      space: "mood",
      title: row.title || title,
      content: row.content || content,
      photo: "",
      date: row.created_at || new Date().toISOString()
    });
    return writeStore(savedStorageKey(), entries);
  }

  const entries = getSavedPages();
  entries.unshift({
    id: makeId(),
    space: featureId,
    title,
    content,
    photo: entry.photo || "",
    date: new Date().toISOString()
  });
  return writeStore(savedStorageKey(), entries);
}

function renderSavedPages() {
  const entries = getSavedPages().filter(entry =>
    entry.space === featureId
  );

  return `
    <section class="saved-panel" id="savedPages">
      <p class="eyebrow">YOUR PERSONAL LIBRARY</p>
      <h2>My Saved Pages</h2>

      ${
        entries.length
          ? entries.map(entry => `
              <article class="saved-entry" data-entry="${escapeHTML(entry.id)}">
                <h3>${escapeHTML(entry.title)}</h3>

                ${
                  entry.photo
                    ? `<img class="saved-photo" src="${escapeHTML(entry.photo)}" alt="Saved memory photograph" loading="lazy">`
                    : ""
                }

                <p>${escapeHTML(entry.content).replace(/\n/g, "<br>")}</p>
                <small>${new Date(entry.date).toLocaleDateString()}</small>

                <div class="saved-entry-actions">
                  <button type="button" data-edit="${escapeHTML(entry.id)}">Edit</button>
                  <button type="button" data-delete="${escapeHTML(entry.id)}">Delete</button>
                </div>
              </article>
            `).join("")
          : "<p>Your saved entries will appear here.</p>"
      }
    </section>
  `;
}

function renderSidebarSavedPages() {
  if (!sidebarElement) return;

  const entries = getSavedPages().slice(0, 3);

  sidebarElement.innerHTML = entries.length
    ? entries.map(entry => `
        <article class="saved-entry">
          <h3>${escapeHTML(entry.title)}</h3>
          <p>${escapeHTML(entry.content).slice(0, 120)}${entry.content.length > 120 ? "…" : ""}</p>
          <small>${new Date(entry.date).toLocaleDateString()}</small>
        </article>
      `).join("")
    : "<p>Your saved work will appear here.</p>";
}

function connectSavedPageActions() {
  if (!contentElement) return;

  contentElement.querySelectorAll("[data-delete]").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.delete;

      const updated = getSavedPages().filter(entry => entry.id !== id);

      if (!writeStore(savedStorageKey(), updated)) {
        alert("Your changes could not be saved on this device.");
        return;
      }

      renderPage();
    });
  });

  contentElement.querySelectorAll("[data-edit]").forEach(button => {
    button.addEventListener("click", () => {
      const id = button.dataset.edit;
      const entry = getSavedPages().find(item => item.id === id);

      if (!entry) return;

      const newTitle = prompt("Edit your title:", entry.title);
      if (newTitle === null) return;

      const newContent = prompt("Edit your entry:", entry.content);
      if (newContent === null) return;

      if (!newTitle.trim()) {
        alert("Please enter a title.");
        return;
      }

      const updated = getSavedPages().map(item =>
        item.id === id
          ? { ...item, title: newTitle.trim(), content: newContent }
          : item
      );

      if (!writeStore(savedStorageKey(), updated)) {
        alert("Your changes could not be saved on this device.");
        return;
      }

      renderPage();
    });
  });
}

function renderSavedArea() {
  const old = document.getElementById("savedPages");

  if (old) {
    old.outerHTML = renderSavedPages();
  } else if (contentElement) {
    contentElement.insertAdjacentHTML("beforeend", renderSavedPages());
  }

  connectSavedPageActions();
  renderSidebarSavedPages();
}

/* 08. JOURNAL ACTIVITY
========================================================= */

function journalActivity() {
  return `
    <section class="journal-panel">
      <p class="eyebrow">MAKE SOMETHING OF YOUR OWN</p>
      <h2>Your journal</h2>

      <form id="journalForm">
        <label for="journalTitle">Entry title</label>
        <input
          id="journalTitle"
          maxlength="100"
          required
          placeholder="Give this entry a title"
        >

        <label for="journalText">Your thoughts</label>
        <textarea
          id="journalText"
          maxlength="10000"
          required
          placeholder="Write whatever you would like to remember..."
        ></textarea>

        <button type="submit">Save entry</button>
        <p id="journalMessage" role="status"></p>
      </form>
    </section>
  `;
}

function connectJournal() {
  const form = document.getElementById("journalForm");
  if (!form) return;

  form.addEventListener("submit", async event => {
    event.preventDefault();

    const title = document.getElementById("journalTitle").value.trim();
    const content = document.getElementById("journalText").value.trim();
    const message = document.getElementById("journalMessage");

    if (!title || !content) {
      message.textContent = "Please complete both fields.";
      return;
    }

    const saved = await savePage({ title, content });

    if (!saved) {
      message.textContent = activeSession?.user?.id
        ? "Your entry could not be saved to your account. Please try again."
        : "Your entry could not be saved on this device.";
      return;
    }

    message.textContent = featureId === "mood" && activeSession?.user?.id
      ? "Your entry has been saved to your account."
      : "Your entry has been saved on this device.";
    form.reset();
    renderSavedArea();
  });
}

/* 09. BREATHING ACTIVITY
========================================================= */

function breathingActivity() {
  return `
    <section class="activity-panel">
      <p class="eyebrow">A GENTLE PAUSE</p>
      <h2>Take a comfortable moment.</h2>

      <p>
        Let your breathing remain natural. You do not need to hold
        your breath or follow a strict pattern.
      </p>

      <div class="breathing-orb" id="breathingOrb">
        <span id="breathingText">Begin</span>
      </div>

      <button type="button" id="breathingStart">Begin pause</button>
      <button type="button" id="breathingStop">Stop</button>

      <p id="breathingMessage" role="status">
        Stop whenever you want. Choose silence if that feels better.
      </p>
    </section>
  `;
}

function connectBreathing() {
  const orb = document.getElementById("breathingOrb");
  const start = document.getElementById("breathingStart");
  const stop = document.getElementById("breathingStop");
  const text = document.getElementById("breathingText");
  const message = document.getElementById("breathingMessage");

  if (!orb || !start || !stop || !text || !message) return;

  let interval = null;
  let phase = 0;

  function stopActivity() {
    if (interval) clearInterval(interval);

    interval = null;
    orb.classList.remove("active");
    text.textContent = "Rest";
    message.textContent = "Your pause has ended. Take your time.";
  }

  start.addEventListener("click", () => {
    if (interval) return;

    phase = 0;

    const labels = [
      "Notice your breath",
      "Rest naturally"
    ];

    text.textContent = labels[0];
    message.textContent =
      "No need to change or force your breathing.";

    interval = setInterval(() => {
      phase = 1 - phase;
      orb.classList.toggle("active", phase === 0);
      text.textContent = labels[phase];
    }, 5000);
  });

  stop.addEventListener("click", stopActivity);
}

/* 10. STUDY TIMER — 10 MINUTES + 5 MINUTE BREAK
========================================================= */

function studyActivity() {
  return `
    <section class="activity-panel">
      <p class="eyebrow">FOCUS SESSION</p>
      <h2 id="studyHeading">10 minutes of focus.</h2>
      <p id="studyDescription">
        Choose one task. When the session ends, take five minutes away from your screen.
      </p>

      <h2 id="studyClock">10:00</h2>

      <button type="button" id="studyStart">Start</button>
      <button type="button" id="studyPause">Pause</button>
      <button type="button" id="studyReset">Reset</button>

      <p id="studyMessage" role="status"></p>
    </section>
  `;
}

function connectStudyTimer() {
  const clock = document.getElementById("studyClock");
  const start = document.getElementById("studyStart");
  const pause = document.getElementById("studyPause");
  const reset = document.getElementById("studyReset");
  const heading = document.getElementById("studyHeading");
  const description = document.getElementById("studyDescription");
  const message = document.getElementById("studyMessage");

  if (!clock || !start || !pause || !reset) return;

  let seconds = 600;
  let timer = null;
  let mode = "focus";

  function display() {
    const minutes = Math.floor(seconds / 60);
    const remainder = seconds % 60;

    clock.textContent =
      `${String(minutes).padStart(2, "0")}:${String(remainder).padStart(2, "0")}`;
  }

  function finishFocus() {
    clearInterval(timer);
    timer = null;
    mode = "break";
    seconds = 300;

    heading.textContent = "Five-minute break.";
    description.textContent =
      "Step away from your screen, rest or move comfortably.";
    message.textContent =
      "Your focus session is complete. Your break is ready.";
    display();
  }

  function finishBreak() {
    clearInterval(timer);
    timer = null;
    mode = "focus";
    seconds = 600;

    heading.textContent = "Ready for another focus session?";
    description.textContent =
      "Your break is complete. Start again whenever you are ready.";
    message.textContent = "Break complete.";
    display();
  }

  start.addEventListener("click", () => {
    if (timer) return;

    message.textContent =
      mode === "focus" ? "Your focus session has started." : "Your break has started.";

    timer = setInterval(() => {
      seconds--;
      display();

      if (seconds <= 0) {
        if (mode === "focus") {
          finishFocus();
        } else {
          finishBreak();
        }
      }
    }, 1000);
  });

  pause.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    message.textContent = "Timer paused.";
  });

  reset.addEventListener("click", () => {
    clearInterval(timer);
    timer = null;
    mode = "focus";
    seconds = 600;

    heading.textContent = "10 minutes of focus.";
    description.textContent =
      "Choose one task. When the session ends, take five minutes away from your screen.";
    message.textContent = "Timer reset.";

    display();
  });

  display();
}

/* 11. PLANNER
========================================================= */

function plannerActivity() {
  return `
    <section class="activity-panel">
      <p class="eyebrow">MAKE A REALISTIC PLAN</p>
      <h2>My tasks</h2>

      <form id="plannerForm">
        <label for="plannerTask">Add a task</label>
        <input id="plannerTask" maxlength="120" required>
        <button type="submit">Add task</button>
      </form>

      <div id="plannerList"></div>
      <p id="plannerMessage" role="status"></p>
    </section>
  `;
}

function connectPlanner() {
  const form = document.getElementById("plannerForm");
  const list = document.getElementById("plannerList");
  const message = document.getElementById("plannerMessage");

  if (!form || !list) return;

  function getTasks() {
    const tasks = readStore(PLANNER_KEY, []);
    return Array.isArray(tasks) ? tasks : [];
  }

  function renderTasks() {
    const tasks = getTasks();

    list.innerHTML = tasks.length
      ? tasks.map(task => `
          <div class="saved-entry">
            <label>
              <input
                type="checkbox"
                data-task="${escapeHTML(task.id)}"
                ${task.done ? "checked" : ""}
              >
              ${escapeHTML(task.text)}
            </label>

            <button
              type="button"
              data-remove-task="${escapeHTML(task.id)}"
            >
              Delete
            </button>
          </div>
        `).join("")
      : "<p>Your task list is empty. Add a task when you are ready.</p>";
  }

  form.addEventListener("submit", event => {
    event.preventDefault();

    const input = document.getElementById("plannerTask");
    const text = input.value.trim();

    if (!text) return;

    const tasks = getTasks();

    tasks.push({
      id: makeId(),
      text,
      done: false
    });

    if (!writeStore(PLANNER_KEY, tasks)) {
      message.textContent = "Could not save this task on your device.";
      return;
    }

    form.reset();
    message.textContent = "Task added.";
    renderTasks();
  });

  list.addEventListener("change", event => {
    if (!event.target.matches("[data-task]")) return;

    const id = event.target.dataset.task;

    const tasks = getTasks().map(task =>
      task.id === id
        ? { ...task, done: event.target.checked }
        : task
    );

    writeStore(PLANNER_KEY, tasks);
    renderTasks();
  });

  list.addEventListener("click", event => {
    const button = event.target.closest("[data-remove-task]");
    if (!button) return;

    const tasks = getTasks().filter(
      task => task.id !== button.dataset.removeTask
    );

    writeStore(PLANNER_KEY, tasks);
    renderTasks();
  });

  renderTasks();
}

/* 12. SCRAPBOOK
========================================================= */

function scrapbookActivity() {
  return `
    <section class="journal-panel">
      <p class="eyebrow">YOUR LITTLE WORLD</p>
      <h2>Add a memory</h2>

      <form id="scrapbookForm">
        <label for="memoryTitle">Memory title</label>
        <input id="memoryTitle" maxlength="100" required>

        <label for="memoryText">Your memory</label>
        <textarea id="memoryText" maxlength="5000"></textarea>

        <label for="memoryPhoto">Add a photograph</label>
        <input id="memoryPhoto" type="file" accept="image/*">

        <button type="submit">Save memory</button>
        <p id="memoryMessage" role="status"></p>
      </form>
    </section>
  `;
}

function connectScrapbook() {
  const form = document.getElementById("scrapbookForm");
  if (!form) return;

  form.addEventListener("submit", async event => {
    event.preventDefault();

    const title = document.getElementById("memoryTitle").value.trim();
    const content = document.getElementById("memoryText").value.trim();
    const fileInput = document.getElementById("memoryPhoto");
    const file = fileInput.files?.[0];
    const message = document.getElementById("memoryMessage");

    if (!title) {
      message.textContent = "Please give your memory a title.";
      return;
    }

    if (file && !file.type.startsWith("image/")) {
      message.textContent = "Please choose an image file.";
      return;
    }

    // Keep browser storage manageable.
    if (file && file.size > 500000) {
      message.textContent =
        "Please choose a photograph smaller than 500 KB.";
      return;
    }

    let photoText = "";

    if (file) {
      try {
        photoText = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(String(reader.result));
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      } catch (error) {
        message.textContent = "The photograph could not be read.";
        return;
      }
    }

    const entries = getSavedPages();

    entries.unshift({
      id: makeId(),
      space: "scrapbook",
      title,
      content,
      photo: photoText,
      date: new Date().toISOString()
    });

    if (!writeStore(savedStorageKey(), entries)) {
      message.textContent =
        "Could not save this memory. Your browser storage may be full.";
      return;
    }

    message.textContent = "Your memory has been saved on this device.";
    form.reset();
    renderSavedArea();
  });
}

/* 13. CAREER QUIZ — TEN QUESTIONS
========================================================= */

function careerActivity() {
  const questions = [
    ["Which activity interests you most?", ["Helping people", "Understanding science", "Creating things", "Organising projects"]],
    ["Which subject would you explore further?", ["Biology", "History", "Mathematics", "Art and design"]],
    ["Which task sounds interesting?", ["Supporting a community", "Investigating a question", "Making something", "Leading a team"]],
    ["What matters most in a project?", ["Its human impact", "Its discoveries", "Its originality", "Its organisation"]],
    ["Which environment appeals to you?", ["A healthcare or community setting", "A research environment", "A creative studio", "A collaborative workplace"]],
    ["Which challenge would you enjoy?", ["Helping someone solve a problem", "Finding an explanation", "Designing a new idea", "Coordinating a group"]],
    ["Which skill would you like to develop?", ["Communication and care", "Analysis and research", "Creative expression", "Planning and leadership"]],
    ["Which project would you choose?", ["A community health project", "A science investigation", "A design or writing project", "A school event"]],
    ["What kind of learning interests you?", ["Learning about people", "Learning how things work", "Learning to create", "Learning to organise"]],
    ["What would make work meaningful?", ["Helping others", "Discovering something", "Making something original", "Bringing people together"]]
  ];

  return `
    <section class="activity-panel">
      <p class="eyebrow">EXPLORE YOUR INTERESTS</p>
      <h2>A ten-question starting point</h2>
      <p>
        This is an informal exploration activity, not a scientific
        assessment or a final career recommendation. Choose what
        genuinely interests you.
      </p>

      <form id="careerForm">
        ${questions.map((question, index) => `
          <fieldset>
            <legend>${index + 1}. ${escapeHTML(question[0])}</legend>

            ${question[1].map((option, optionIndex) => `
              <label>
                <input
                  type="radio"
                  name="career${index}"
                  value="${optionIndex}"
                  required
                >
                ${escapeHTML(option)}
              </label>
            `).join("")}
          </fieldset>
        `).join("")}

        <button type="submit">Explore my interests</button>
      </form>

      <div id="careerResult" class="nested-card" role="status"></div>
    </section>
  `;
}

function connectCareerQuiz() {
  const form = document.getElementById("careerForm");
  if (!form) return;

  form.addEventListener("submit", event => {
    event.preventDefault();

    const totals = [0, 0, 0, 0];

    for (let i = 0; i < 10; i++) {
      const answer = form.querySelector(
        `input[name="career${i}"]:checked`
      );

      if (answer) {
        totals[Number(answer.value)]++;
      }
    }

    const labels = [
      {
        name: "People, health and community",
        examples: "healthcare, education, social services, public health and community work"
      },
      {
        name: "Science, research and discovery",
        examples: "scientific research, laboratory work, environmental studies and analysis"
      },
      {
        name: "Creativity and design",
        examples: "design, writing, media, architecture and creative communication"
      },
      {
        name: "Organisation and collaboration",
        examples: "management, public administration, project coordination and operations"
      }
    ];

    const highest = Math.max(...totals);
    const matches = labels.filter((item, index) => totals[index] === highest);

    const result = document.getElementById("careerResult");

    result.innerHTML = `
      <h3>Your strongest interest areas</h3>
      ${matches.map(item => `
        <p><strong>${escapeHTML(item.name)}</strong></p>
        <p>Some fields to explore: ${escapeHTML(item.examples)}.</p>
      `).join("")}
      <p>
        Use this as a starting point. Explore actual job responsibilities,
        qualifications, course requirements and professional pathways
        before making decisions.
      </p>
    `;
  });
}

/* 14. MONEY CALCULATOR
========================================================= */

function moneyActivity() {
  return `
    <section class="activity-panel">
      <p class="eyebrow">MONEY BASICS</p>
      <h2>A simple budget example</h2>

      <label for="budgetAmount">Amount available (₹)</label>
      <input id="budgetAmount" type="number" min="0" max="1000000">

      <label for="budgetSaving">Amount you plan to save (₹)</label>
      <input id="budgetSaving" type="number" min="0" max="1000000">

      <button type="button" id="budgetCalculate">Calculate</button>
      <p id="budgetResult" role="status"></p>
    </section>
  `;
}

function connectMoney() {
  const button = document.getElementById("budgetCalculate");
  if (!button) return;

  button.addEventListener("click", () => {
    const total = Number(document.getElementById("budgetAmount").value);
    const saving = Number(document.getElementById("budgetSaving").value);
    const result = document.getElementById("budgetResult");

    if (
      !Number.isFinite(total) ||
      !Number.isFinite(saving) ||
      total < 0 ||
      saving < 0 ||
      saving > total
    ) {
      result.textContent =
        "Enter valid amounts. Savings cannot exceed the total.";
      return;
    }

    result.textContent =
      `Amount remaining after planned savings: ₹${(total - saving).toFixed(2)}.`;
  });
}

/* 15. FITNESS AND STRAVA
========================================================= */

function fitnessActivity() {
  return `
    <section class="activity-panel">
      <p class="eyebrow">MOVEMENT JOURNAL</p>
      <h2>Record an activity</h2>

      <form id="fitnessForm">
        <label for="activityName">Activity</label>
        <select id="activityName">
          <option>Walking</option>
          <option>Running</option>
          <option>Cycling</option>
          <option>Yoga</option>
          <option>Playing a sport</option>
          <option>Other movement</option>
        </select>

        <label for="activityReflection">How did it feel?</label>
        <textarea id="activityReflection" maxlength="1000"></textarea>

        <button type="submit">Save reflection</button>
        <p id="fitnessMessage" role="status"></p>
      </form>

      <div class="nested-card">
        <h3>Strava</h3>
        <p>
          Strava is an external activity platform. This link opens its
          website; it does not connect your account to To the Ether.
          A real connection needs a configured Strava developer app.
        </p>
        <a href="https://www.strava.com/"
           target="_blank" rel="noopener noreferrer">
          Visit Strava ↗
        </a>
      </div>
    </section>
  `;
}

function connectFitness() {
  const form = document.getElementById("fitnessForm");
  if (!form) return;

  form.addEventListener("submit", async event => {
    event.preventDefault();

    const activity = document.getElementById("activityName").value;
    const reflection = document.getElementById("activityReflection").value.trim();
    const message = document.getElementById("fitnessMessage");

    const saved = await savePage({
      title: activity,
      content: reflection || "Activity recorded."
    });

    if (!saved) {
      message.textContent = "Could not save your reflection on this device.";
      return;
    }

    message.textContent = "Your activity reflection has been saved.";
    form.reset();
    renderSavedArea();
  });
}

/* 16. SELECT THE ACTIVITY FOR EACH SPACE
========================================================= */

function activityForSpace(id) {
  switch (id) {
    case "mood":
    case "gratitude":
    case "checkin":
    case "openmic":
      return journalActivity();

    case "breathing":
      return breathingActivity();

    case "study":
      return studyActivity();

    case "planner":
      return plannerActivity();

    case "scrapbook":
      return scrapbookActivity();

    case "career":
      return careerActivity();

    case "money":
      return moneyActivity();

    case "fitness":
      return fitnessActivity();

    default:
      return journalActivity();
  }
}

function connectActivity() {
  connectJournal();
  connectBreathing();
  connectStudyTimer();
  connectPlanner();
  connectScrapbook();
  connectCareerQuiz();
  connectMoney();
  connectFitness();
  connectSavedPageActions();
}

/* 17. NESTED PAGE RENDERING
========================================================= */

function renderNestedPage(item, topic) {
  const topicTitle = topic[1];
  const topicDescription = topic[2];

  document.title = `${topicTitle} | To the Ether.`;

  titleElement.textContent = topicTitle;
  categoryElement.textContent = item.category;
  descriptionElement.textContent = topicDescription;
  breadcrumb.textContent = topicTitle;

  imageElement.src = featurePhotoSets[featureId]?.[0] || item.image;
  imageElement.alt = topicTitle;

  contentElement.innerHTML = `
    <p class="eyebrow">${escapeHTML(item.title)}</p>

    <a class="text-link"
      href="feature.html?id=${encodeURIComponent(featureId)}">
      ← Back to ${escapeHTML(item.title)}
    </a>

    <section class="feature-text-section">
      <p class="eyebrow">EXPLORE THIS TOPIC</p>
      <h2>${escapeHTML(topicTitle)}</h2>
      <p>${escapeHTML(topicDescription)}</p>
      <p>
        This page is part of ${escapeHTML(item.title)}. Explore the
        topic at your own pace, consider the ideas and use the
        reflection activity below if it feels useful.
      </p>
    </section>

    ${renderSections(item.sections)}

    ${journalActivity()}

    <a class="button button-primary"
      href="feature.html?id=${encodeURIComponent(featureId)}">
      Return to this space ↗
    </a>

    ${renderSavedPages()}
  `;

  connectJournal();
  connectSavedPageActions();
  renderSidebarSavedPages();
}

/* 18. MAIN PAGE RENDERING
========================================================= */

function renderPage() {
  if (!contentElement) return;

  if (!feature) {
    document.title = "Space not found | To the Ether.";

    contentElement.innerHTML = `
      <section class="feature-text-section">
        <h2>We couldn't find that space.</h2>
        <p>It may have moved, or the link may be incorrect.</p>
        <a class="button button-primary" href="index.html#explore">
          Return to Explore
        </a>
      </section>
    `;

    return;
  }

  titleElement.textContent = feature.title;
  categoryElement.textContent = feature.category;
  descriptionElement.textContent = feature.description;
  imageElement.src = featurePhotoSets[featureId]?.[0] || feature.image;
  imageElement.alt = feature.title;
  breadcrumb.textContent = feature.title;

  document.title = `${feature.title} | To the Ether.`;

  if (nestedId) {
    const topic = feature.topics.find(item => item[0] === nestedId);

    if (!topic) {
      contentElement.innerHTML = `
        <section class="feature-text-section">
          <h2>Topic not found.</h2>
          <a href="feature.html?id=${encodeURIComponent(featureId)}">
            Return to the space →
          </a>
        </section>
      `;
      return;
    }

    renderNestedPage(feature, topic);
    return;
  }

  contentElement.innerHTML = `
    <section>
      <p class="eyebrow">WELCOME TO YOUR SPACE</p>
      <h2>${escapeHTML(feature.title)}</h2>
      <p>${escapeHTML(feature.description)}</p>
    </section>

    ${renderSections(feature.sections)}

    <section class="feature-photo-strip" aria-label="Photographs from this space">
      ${(featurePhotoSets[featureId] || [feature.image, feature.image, feature.image]).map((photo, index) => `
        <figure><img src="${photo}" alt="${escapeHTML(feature.title)} — related photograph ${index + 1}" loading="lazy"><figcaption>${escapeHTML(feature.title)}</figcaption></figure>
      `).join("")}
    </section>

    ${renderNestedCards(feature)}

    ${activityForSpace(featureId)}

    ${renderSavedPages()}
  `;

  connectActivity();
  renderSidebarSavedPages();
}

/* 19. MOBILE NAVIGATION
========================================================= */

const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

menuToggle?.addEventListener("click", () => {
  const open = mainNav?.classList.toggle("open") || false;

  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});

mainNav?.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    mainNav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");

    if (menuToggle) {
      menuToggle.textContent = "☰";
    }
  });
});

/* 20. START
========================================================= */

(async function startFeaturePage() {
  // Account restoration is optional and never blocks a visitor.
  await initialiseFeatureSession();
  await loadMoodJournalEntries();

  if (!contentElement) {
    console.error("Feature content container was not found.");
    return;
  }

  // No three-space limit. No sign-up gate. All spaces are open.
  renderPage();
})();
