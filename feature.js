/* =====================================================
   TO THE ETHER — INDIVIDUAL FEATURE PAGES
   ===================================================== */

const data = {
  mood: {
    title:"Mood Journal", category:"WELLBEING", image:"images/mood.jpg",
    description:"Understand your feelings, make space for your thoughts and reflect without judgement.",
    type:"journal",
    sections:[
      ["Understanding your emotions","Emotions are information about how you experience the world. Happiness, frustration, sadness, excitement and uncertainty are all part of being human. You do not need to label a feeling as good or bad before you can understand it."],
      ["Name what you feel","Sometimes it is difficult to explain exactly how you feel. Try using a few words: calm, disappointed, nervous, hopeful, confused, lonely, excited or overwhelmed. More than one feeling can exist at the same time."],
      ["Five journal ideas","Write about one moment you want to remember; something that challenged you; a person who made your day better; something you wish people understood; or one thing you want to try tomorrow."],
      ["When a day feels difficult","You do not have to turn every difficult experience into a lesson immediately. Describe what happened, what you needed at that moment and whether there is someone you would feel comfortable talking to."],
      ["Notice patterns gently","Looking back at entries may help you notice what activities, situations or routines affect your mood. Patterns are clues, not rules. A journal cannot diagnose a health condition."],
      ["A small reflection habit","Try writing for three minutes. You can use a sentence, a list or a few words. You do not have to write every day for journaling to be meaningful."],
      ["Privacy and support","Your entries in this version are stored in this browser on this device. They are not a confidential counselling service. If something feels too difficult to manage alone, speak to a trusted adult or qualified professional."],
      ["Try this today","Complete the sentence: 'Right now, I wish I had a little more…' Then write one small, realistic thing that might help."]
    ]
  },

  breathing: {
    title:"Breathing Space", category:"WELLBEING", image:"images/breathing.jpg",
    description:"Take a comfortable pause. Explore breathing, quiet reflection and gentle mindfulness.",
    type:"breathing",
    sections:[
      ["What is mindful breathing?","Mindful breathing means paying attention to the natural movement of your breath. It is not about forcing yourself to breathe in a particular way or trying to make every thought disappear."],
      ["A comfortable breathing pause","Sit somewhere comfortable. Let your breathing remain natural. Notice the air moving in and out. If your attention wanders, gently bring it back. Stop if you feel dizzy or uncomfortable."],
      ["Four ways to pause","Try natural breathing, a slow gentle exhale, counting a comfortable number of breaths or simply sitting quietly. Choose the option that feels comfortable; you never need to hold your breath."],
      ["Mindfulness beyond breathing","You can notice five things around you, listen carefully to nearby sounds, feel your feet resting on the floor or observe the movement of leaves outside."],
      ["When to take a break","A short pause can be useful between study sessions, after a busy day or when you want to change activities. It is not a replacement for help with ongoing distress."],
      ["Nature and quiet","Some people enjoy soft rain, wind or forest sounds. Others prefer silence. Choose a calm environment that suits you and keep the volume comfortable."],
      ["Reflect afterwards","Ask yourself whether the pause felt comfortable, whether you would change anything and whether you would prefer another activity next time."],
      ["A no-pressure reminder","You do not have to complete a session or reach a particular result. You can stop whenever you want. If breathing exercises make you uncomfortable, simply rest or choose another activity."]
    ]
  },

  gratitude: {
    title:"Gratitude Journal", category:"WELLBEING", image:"images/gratitude.jpg",
    description:"Notice meaningful moments, appreciate people and collect memories worth keeping.",
    type:"journal",
    sections:[
      ["What gratitude means","Gratitude is noticing something you appreciate. It can be a person, an opportunity, a kind gesture or an ordinary moment. It does not mean pretending that difficult experiences do not exist."],
      ["Small things count","A comfortable place to sit, a good conversation, a favourite song or a moment outdoors can be worth remembering. Your examples do not need to sound impressive."],
      ["People who matter","Think about someone who has helped you, encouraged you or made an ordinary day better. You could write a letter of appreciation even if you decide not to send it."],
      ["Five gratitude prompts","What made me smile? What did I learn? Who supported me? What place makes me feel comfortable? What ordinary thing would I miss if it disappeared?"],
      ["Gratitude and difficult days","You can appreciate one thing while still being upset about something else. Gratitude should never be used to silence your feelings or make you feel guilty."],
      ["Create a memory collection","Save short notes about events, conversations, achievements and experiences. Over time, they can become a record of things you want to remember."],
      ["Make it a gentle habit","Try writing one or two observations when you feel like it. There is no need to force a daily routine or compare your entries with anyone else's."],
      ["Try this today","Write about one person, place or experience that has made a positive difference in your life."]
    ]
  },

  fitness: {
    title:"Fitness & Wellness", category:"WELLBEING", image:"images/fitness.jpg",
    description:"Explore movement, rest, healthy routines and ways to care for your everyday wellbeing.",
    type:"fitness",
    sections:[
      ["Movement is for wellbeing","Physical activity supports many aspects of health, including heart and muscle function, mobility and general wellbeing. Movement can include walking, cycling, dancing, games or organised sport."],
      ["Find an activity you enjoy","The best activity is one that is suitable, enjoyable and accessible to you. You do not need expensive equipment or a competitive goal to enjoy being active."],
      ["Running and walking","Walking and running can be ways to explore your surroundings and build a movement habit. Start at a comfortable level, take breaks and involve a trusted adult when planning outdoor activities."],
      ["Rest is part of wellness","Rest days, enough sleep, hydration and recovery matter. You do not have to exercise every day, and movement should never be used as punishment for eating or for how your body looks."],
      ["Screen-time breaks","Long periods sitting at a screen can make you feel tired or uncomfortable. Try changing position, looking away from the screen and taking a short movement break."],
      ["Explore different activities","Try a beginner-friendly yoga session, a walk, a dance routine, a cycle ride with appropriate supervision or a sport you have always wanted to learn."],
      ["Track experiences, not appearance","You can record activities you enjoyed, how they felt and what you learned. Avoid using measurements or comparisons as a judgement of your worth."],
      ["Try this today","Choose one comfortable activity you enjoy. Record what you did and whether you would like to do it again."]
    ]
  },

  checkin: {
    title:"Daily Check-in", category:"WELLBEING", image:"images/checkin.jpg",
    description:"Pause for a moment and notice how your day is going.",
    type:"journal",
    sections:[
      ["A moment for yourself","A check-in is a short opportunity to notice what is happening in your day. It is not a test and there are no correct answers."],
      ["Notice your energy","Ask whether you feel ready for an activity, need a break or are unsure what you need. Your energy can change during the day."],
      ["Celebrate small wins","A small win could be asking a question, finishing a task, helping someone or trying again after something did not work."],
      ["The power of reflection","Looking back at an experience can help you understand what went well, what was difficult and what you might do differently next time."],
      ["Ask yourself something new","What surprised you today? What would you like to learn? What made you laugh? What would make tomorrow a little easier?"],
      ["Connection matters","A short conversation with someone you trust can make a difference. You do not have to explain everything perfectly to ask for company or support."],
      ["A fresh start","If your day did not go as planned, choose one manageable next step. You can begin again without needing to fix everything at once."],
      ["Try this today","Write one thing you noticed, one thing you appreciated and one thing you want to do next."]
    ]
  },

  study: {
    title:"Study & Focus", category:"GROWTH", image:"images/study.jpg",
    description:"Make studying manageable with small goals, focused sessions and proper breaks.",
    type:"study",
    sections:[
      ["Understand your learning style","People learn in different ways and often benefit from combining reading, practice, discussion, diagrams and explanations. Experiment to find what helps you understand a topic."],
      ["Break down big tasks","A large assignment can feel difficult to begin. Divide it into smaller actions, such as reading one page, solving three questions or writing one paragraph."],
      ["The 10-minute start","Choose one task and work on it for ten minutes. When the timer ends, take a short break or continue if you feel ready. The purpose is to make starting easier."],
      ["Active recall","Instead of only rereading notes, close the book and try to explain the idea from memory. Then check what you missed and practise again."],
      ["Spaced practice","Returning to information over several study sessions can support long-term learning. A short review on different days is often more useful than leaving everything until the last minute."],
      ["A useful study environment","Keep the materials you need nearby, reduce unnecessary distractions and choose a comfortable place. Music or silence is a personal preference."],
      ["Breaks are important","A break gives you time to move, drink water and rest your attention. A study plan should include breaks rather than treating rest as failure."],
      ["Try this today","Write down one topic, one small task and one time you will take a break. Begin with the first ten minutes."]
    ]
  },

  selfcare: {
    title:"Self-care Corner", category:"WELLBEING", image:"images/selfcare.jpg",
    description:"Explore practical routines for personal care, rest, relationships and wellbeing.",
    type:"journal",
    sections:[
      ["Self-care is everyday care","Self-care is not limited to products or special routines. It can include sleep, hygiene, nutrition, movement, boundaries, asking for help and spending time with people who support you."],
      ["Basic personal care","Regular bathing, dental care, clean clothes and handwashing are everyday habits that support health. Routines should be practical and suitable for your needs."],
      ["Skin care basics","A simple routine may include gentle cleansing, moisturising and sun protection when appropriate. Skin differs from person to person, and online trends are not medical advice."],
      ["Mental and social wellbeing","Rest, enjoyable activities, supportive friendships and honest conversations can all be part of looking after yourself. It is okay to ask for help when something feels difficult."],
      ["Understanding periods","Menstruation is a normal part of many people's lives. Recording dates and symptoms may help someone understand their own cycle. Severe pain or worrying symptoms should be discussed with a healthcare professional."],
      ["Healthy boundaries","You can say no to something that makes you uncomfortable. You can ask for privacy, take a break from a conversation or speak to a trusted adult about a situation."],
      ["Care is not perfection","You do not need an elaborate routine. A few realistic habits that work for your life are more useful than trying to copy someone else's routine."],
      ["Try this today","Choose one small act of care that would make your day more comfortable. It could be organising your space, resting or talking to someone."]
    ]
  },

  stories: {
    title:"Stories & Hope", category:"COMMUNITY", image:"images/stories.jpg",
    description:"Explore real-world stories, human rights, humanitarian work and meaningful change.",
    type:"journal",
    sections:[
      ["Why stories matter","Stories can help us understand experiences beyond our own communities. They should be approached with respect for the people involved and care about accuracy."],
      ["Children's rights","Children have rights to protection, education, healthcare, identity and participation. The UN Convention on the Rights of the Child sets out important principles for these rights."],
      ["Education in emergencies","Conflict and disasters can interrupt schooling. Humanitarian organisations work with communities to support safe learning opportunities and access to education."],
      ["Displacement and refugees","People may be forced to leave their homes because of conflict, persecution or serious danger. Refugees and displaced people are individuals with rights, experiences and hopes."],
      ["Humanitarian work","Humanitarian assistance can include food, clean water, shelter, healthcare, education and protection. Effective support should respect the dignity and needs of affected communities."],
      ["Environmental challenges","Climate change, pollution and biodiversity loss affect communities differently. Learning about local and global responses helps us understand both challenges and possible solutions."],
      ["Check information carefully","Look for original reports, publication dates, named organisations and evidence. Be cautious with dramatic claims, edited images and posts that do not identify their sources."],
      ["Learn and contribute","You can learn about an issue, share reliable educational resources, support age-appropriate school initiatives or take part in supervised community activities."]
    ]
  },

  career: {
    title:"Career Exploration", category:"GROWTH", image:"images/career.jpg",
    description:"Discover interests, explore occupations and learn about different education pathways.",
    type:"career",
    sections:[
      ["You do not need one fixed dream","Interests can change as you learn more about yourself and the world. Exploring different possibilities is a normal part of making future plans."],
      ["Start with curiosity","Think about the subjects, problems and activities that hold your attention. Do you enjoy helping people, understanding science, communicating ideas, designing things or organising projects?"],
      ["Explore career families","Career areas include health, education, science, engineering, environment, law, public service, business, communication, design and creative work."],
      ["Look beyond job titles","Research what people actually do in a role, the environment they work in, the skills they use and the challenges they face."],
      ["Understand education pathways","Different careers require different qualifications. Check official university, college and professional-body information before making decisions about courses or entrance examinations."],
      ["Compare pathways thoughtfully","Consider course duration, fees, location, admission requirements, training, work opportunities and whether the everyday work suits your interests."],
      ["Dreams beyond a career","Your future can include relationships, hobbies, service, travel, learning and personal goals. A job is one part of a life, not the whole of it."],
      ["Try this today","Choose three areas that interest you. Write one question you want answered about each and research them using reliable sources."]
    ]
  },

  scrapbook: {
    title:"My Little World", category:"CREATIVE", image:"images/scrapbook.jpg",
    description:"Collect memories, photographs, personal letters and moments you want to remember.",
    type:"scrapbook",
    sections:[
      ["A personal collection","A scrapbook can hold photographs, short notes, meaningful dates, drawings and memories. It does not need to look perfect or follow a particular style."],
      ["Remember ordinary moments","A favourite meal, a day with friends, a school event or a quiet afternoon can become a meaningful memory later."],
      ["Letters to yourself","Write a letter about what matters to you today. You might revisit it in a few months and notice how your thoughts have changed."],
      ["Make room for every feeling","Personal reflection can include difficult days as well as happy ones. You do not have to turn every experience into something positive."],
      ["Create a timeline","Collect memories by month, year, school term or important event. A timeline can help you see experiences in context."],
      ["Photographs and consent","Think about other people's privacy before saving or sharing their photographs. Ask permission before posting images that include someone else."],
      ["Keep your collection safe","This version saves entries in your browser on this device. Clearing browser data or changing devices may remove access to them."],
      ["Try this today","Save one photograph or write one paragraph about a moment you do not want to forget."]
    ]
  },

  movies: {
    title:"Movie Theatre", category:"CREATIVE", image:"images/movies.jpg",
    description:"Explore films, discover genres and build your own movie collection.",
    type:"journal",
    sections:[
      ["Explore different genres","Films can include comedy, animation, drama, documentary, mystery, adventure, science fiction and historical storytelling."],
      ["Watch with curiosity","Notice how a film uses music, lighting, dialogue, editing and camera angles to create a mood or communicate an idea."],
      ["Build a watchlist","Keep a list of films you want to explore and note why they caught your attention."],
      ["Documentary and real life","Documentaries can introduce historical events, scientific questions and social issues. Check their sources and remember that a documentary still reflects choices made by its creators."],
      ["Film discussions","Ask what the main character learned, what the film wanted the audience to consider and whether the story represented different perspectives fairly."],
      ["Explore film history","Cinema has changed through silent films, sound, colour, animation, digital effects and new ways of distributing films."],
      ["Respectful recommendations","Consider age ratings, content guidance and the preferences of the people watching with you."],
      ["Try this today","Write a short review of a film you have watched: what worked, what surprised you and who might enjoy it."]
    ]
  },

  commons: {
    title:"The Commons", category:"COMMUNITY", image:"images/commons.jpg",
    description:"Find shared interests, discover clubs and explore collaboration.",
    type:"journal",
    sections:[
      ["Why communities matter","Communities bring people together around shared interests, goals, identities or experiences. They can create opportunities to learn and contribute."],
      ["Find your interests","Clubs can focus on books, science, art, debate, environment, sport, technology, volunteering or cultural activities."],
      ["Starting a club","Begin with a clear purpose, a few interested people, an adult supervisor where required and a realistic plan for meetings."],
      ["Working together","Good collaboration involves listening, sharing responsibilities, respecting different opinions and communicating clearly."],
      ["Make participation welcoming","People have different confidence levels and abilities. Offer different ways to take part rather than expecting everyone to contribute in the same way."],
      ["Plan a small project","A club might organise a book exchange, a learning session, a school garden activity or a supervised awareness event."],
      ["Online community safety","Protect personal information, use respectful communication and involve trusted adults when an online interaction feels unsafe."],
      ["Try this today","Write down one club you would join and one idea you would like that club to try."]
    ]
  },

  sports: {
    title:"Sports & Events", category:"COMMUNITY", image:"images/sports.jpg",
    description:"Discover sports, learn about events and explore participation.",
    type:"sports",
    sections:[
      ["Sport has many forms","Sport includes team games, individual activities, athletics, swimming, cycling, martial arts and recreational movement."],
      ["Participation matters","Sport can provide opportunities to practise cooperation, communication, persistence and respect for others."],
      ["Explore a new sport","Learn the basic rules, equipment, accessibility needs and safety guidance before trying an unfamiliar activity."],
      ["Events and calendars","School competitions, community events and international tournaments have different schedules. Always check the official organiser for current dates."],
      ["Respect and fair play","Fair play includes following rules, respecting opponents, accepting decisions and recognising effort."],
      ["Athletes and inspiration","Athlete stories can show different journeys, challenges and achievements. Remember that professional sport is not the only meaningful way to participate."],
      ["Safe participation","Use suitable equipment, follow qualified guidance and involve a parent or trusted adult when researching or registering for events."],
      ["Try this today","Choose one sport you want to understand better and write down three questions about it."]
    ]
  },

  planner: {
    title:"Day Planner", category:"GROWTH", image:"images/planner.jpg",
    description:"Plan your day with realistic tasks, useful breaks and room for change.",
    type:"planner",
    sections:[
      ["Plan around real life","A useful plan reflects your actual commitments, available time and energy. It should guide you, not make you feel guilty."],
      ["Choose priorities","Identify what needs attention first. Separate important tasks from activities that can wait."],
      ["Break tasks into steps","Instead of writing 'study science', write 'read the section', 'make five notes' or 'answer three questions'."],
      ["Include breaks","Plan time to eat, rest, move around and enjoy activities. A schedule without breaks is difficult to maintain."],
      ["Allow flexibility","Unexpected events happen. Leave some open time and adjust your plan when something changes."],
      ["My day did not go as planned","Choose the next useful step rather than trying to recover every missed task. You can move unfinished work to another day."],
      ["Reflect without judgement","At the end of the day, notice what worked and what made things difficult. Use that information to make tomorrow's plan more realistic."],
      ["Try this today","Add three manageable tasks to the planner below and tick them off as you complete them."]
    ]
  },

  creative: {
    title:"The Creative Studio", category:"CREATIVE", image:"images/creative.jpg",
    description:"Make room for imagination, writing, ideas and creative experiments.",
    type:"journal",
    sections:[
      ["Creativity is a process","Creative work can begin with curiosity, observation, experimentation and practice. It does not need to be perfect to be worthwhile."],
      ["Collect ideas","Keep notes about interesting conversations, images, questions, places and experiences that inspire you."],
      ["Writing experiments","Try poetry, short stories, personal essays, dialogue, descriptions or a fictional diary entry."],
      ["Visual expression","Drawing, collage, photography, design and crafts can communicate ideas in ways that words sometimes cannot."],
      ["Creative challenges","Try describing a place using five senses, writing a story from an unusual perspective or creating something using only a few materials."],
      ["Learn from feedback","Feedback can help you improve, but it should be specific and respectful. Keep your own goals in mind when deciding what to change."],
      ["Save your projects","Collect drafts and finished work. Looking back can help you notice how your skills and interests develop."],
      ["Try this today","Write for five minutes about something you noticed today. Do not edit while you are getting your first ideas down."]
    ]
  },

  kindness: {
    title:"The Kindness Project", category:"COMMUNITY", image:"images/kindness.jpg",
    description:"Explore everyday kindness, community contribution and thoughtful action.",
    type:"journal",
    sections:[
      ["What kindness looks like","Kindness can include listening, including someone, sharing knowledge, offering help or respecting another person's boundaries."],
      ["Small actions matter","A thoughtful message, helping with a task or thanking someone can make everyday interactions more positive."],
      ["Kindness and boundaries","Being kind does not mean agreeing to everything or ignoring your own needs. Respect and safety matter for everyone."],
      ["Community contribution","Communities benefit from people sharing skills, supporting local initiatives and taking part in supervised volunteering."],
      ["Make an idea practical","Choose an action that is safe, realistic and genuinely useful to the people involved. Ask what support is needed rather than assuming."],
      ["Notice the impact","Reflect on what you learned, what the other person wanted and whether the activity was helpful."],
      ["Work together","Group projects can include a school book exchange, a clean-up with adult supervision or a collection organised through a trusted organisation."],
      ["Try this today","Think of one respectful, manageable way to make someone's day a little easier."]
    ]
  },

  library: {
    title:"The Learning Library", category:"GROWTH", image:"images/library.jpg",
    description:"Follow your curiosity through learning resources, explainers and new ideas.",
    type:"journal",
    sections:[
      ["Learning beyond the classroom","Learning can happen through books, experiments, conversations, documentaries, museums, observation and practical projects."],
      ["Ask better questions","Start with what you already know, what you are unsure about and what evidence could help answer your question."],
      ["Check your sources","Look for the author, organisation, publication date, references and original evidence. Compare important claims with reliable sources."],
      ["Science and discovery","Scientific knowledge develops through observation, testing, evidence, peer review and revision when better information becomes available."],
      ["History and perspective","Historical events are understood through sources, context and different perspectives. Check who created a source and when."],
      ["Build a learning habit","Choose one topic, read a short explanation and write down what you learned in your own words."],
      ["Use tutorials thoughtfully","Follow reliable educational tutorials and practise the skills yourself. Pause, repeat and check your understanding."],
      ["Try this today","Choose a question you have always wondered about and write down what you would need to research it."]
    ]
  },

  sleep: {
    title:"The Sleep Sanctuary", category:"WELLBEING", image:"images/sleep.jpg",
    description:"Learn about rest, bedtime routines and making space to unwind.",
    type:"journal",
    sections:[
      ["Why sleep matters","Sleep supports learning, memory, mood, growth and general health. Sleep needs vary with age and individual circumstances."],
      ["A regular routine","A consistent wind-down routine may help your body prepare for rest. It can include reading, quiet music or preparing for the next day."],
      ["Create a comfortable space","A calm, comfortable and suitably dark environment may make it easier to rest. Adjust your space where possible."],
      ["Screens and rest","Bright screens and stimulating content can make it harder for some people to settle. Try a quieter activity before bedtime if that helps you."],
      ["Notice your habits","A sleep journal can record bedtime, wake time and how rested you feel. It is a way to notice patterns, not a medical diagnosis."],
      ["Rest is not a reward","You do not need to earn sleep by finishing every task. Rest is a basic part of looking after yourself."],
      ["When to ask for help","If sleep difficulties continue or affect everyday life, speak with a parent, trusted adult or healthcare professional."],
      ["Try this today","Choose one calming activity to include in your evening routine."]
    ]
  },

  money: {
    title:"Money Matters", category:"GROWTH", image:"images/money.jpg",
    description:"Learn the basics of budgeting, saving, spending and financial decisions.",
    type:"money",
    sections:[
      ["Understanding money","Money is used to exchange goods and services, save for future needs and plan for expenses. Learning basic money concepts can support informed decisions."],
      ["Needs and wants","Needs are essentials such as food and basic supplies. Wants are things people would like to have. The difference can depend on a person's circumstances."],
      ["What is a budget?","A budget is a plan for money coming in and money going out. It can help people understand spending and plan for future costs."],
      ["Saving goals","A savings goal identifies what you are setting money aside for and how much you may need. Small amounts can help you practise planning."],
      ["Compare before buying","Consider quality, usefulness, price and whether you really need an item. Advertisements and trends are not always reliable guides."],
      ["Basic money terms","Income is money received. Expenses are money spent. Savings are money kept for future use. A balance is what remains after money in and money out are considered."],
      ["Online money safety","Never share passwords, one-time codes, bank details or personal financial information. Ask a trusted adult before using financial services."],
      ["Try this today","Use the calculator below to practise a simple budget with imaginary amounts."]
    ]
  },

  openmic: {
    title:"The Open Mic", category:"CREATIVE", image:"images/openmic.jpg",
    description:"Explore poetry, personal writing, spoken word and the power of expression.",
    type:"journal",
    sections:[
      ["Every voice has a story","Writing can help people communicate ideas, experiences, imagination and questions. You do not need to publish your work for it to matter."],
      ["Poetry and rhythm","Poetry can use rhythm, repetition, imagery, sound and line breaks to create meaning. There is no single correct way to write a poem."],
      ["Spoken word","Spoken-word writing is created to be performed aloud. The writer may use pacing, pauses, emphasis and repetition to shape the experience."],
      ["Find your subject","Begin with a place, memory, question, feeling, person or everyday object. A small observation can become the start of a larger piece."],
      ["Experiment with form","Try free verse, a short monologue, a letter, a dialogue or a poem with repeated opening lines."],
      ["Edit with care","Read your work aloud. Notice unclear phrases, repeated ideas and lines that sound especially meaningful to you."],
      ["Share safely","Choose carefully where and with whom you share personal writing. You can keep drafts private or use a pen name where appropriate."],
      ["Try this today","Write six lines beginning with the words 'I remember…'"]
    ]
  }
};

/* ---------- STORAGE ---------- */

const Store = {
  get(key, fallback = []) {
    try {
      return JSON.parse(localStorage.getItem("ether:" + key)) ?? fallback;
    } catch {
      return fallback;
    }
  },

  set(key, value) {
    localStorage.setItem("ether:" + key, JSON.stringify(value));
  },

  add(key, value) {
    const entries = this.get(key);
    entries.unshift({
      ...value,
      id: Date.now(),
      createdAt: new Date().toISOString()
    });
    this.set(key, entries);
  }
};

const escapeHTML = value => String(value ?? "").replace(/[&<>"']/g, char => ({
  "&":"&amp;",
  "<":"&lt;",
  ">":"&gt;",
  '"':"&quot;",
  "'":"&#39;"
}[char]));

/* ---------- PAGE SETUP ---------- */

const params = new URLSearchParams(location.search);
const id = params.get("id");
const space = data[id] || data.mood;

document.title = space.title + " | To the Ether.";

document.getElementById("featureTitle").textContent = space.title;
document.getElementById("featureCategory").textContent = space.category;
document.getElementById("featureDescription").textContent = space.description;

const featureImage = document.getElementById("featureImage");
featureImage.src = space.image;
featureImage.alt = space.title;

/* ---------- EDUCATIONAL SECTIONS ---------- */

const content = document.getElementById("featureContent");

content.innerHTML = space.sections.map((section, index) => `
  <section class="feature-section">
    <p class="eyebrow">0${index + 1} / DISCOVER</p>
    <h2>${escapeHTML(section[0])}</h2>
    <p>${escapeHTML(section[1])}</p>
  </section>
`).join("");

/* ---------- ACTIVITIES ---------- */

function journalForm() {
  return `
    <section class="feature-panel">
      <p class="eyebrow">YOUR PERSONAL SPACE</p>
      <h2>Write a little.</h2>
      <p>Use this space for a thought, reflection, idea or memory.</p>

      <form id="entryForm">
        <label for="entryTitle">Give your entry a title</label>
        <input id="entryTitle" maxlength="100" placeholder="A little note..." required>

        <label for="entryText">Your entry</label>
        <textarea id="entryText" maxlength="5000" placeholder="Start wherever you are..." required></textarea>

        ${id === "mood" ? `
          <label for="moodSelect">How are you feeling?</label>
          <select id="moodSelect">
            <option>Calm</option>
            <option>Happy</option>
            <option>Hopeful</option>
            <option>Tired</option>
            <option>Worried</option>
            <option>Overwhelmed</option>
            <option>Unsure</option>
            <option>Other</option>
          </select>` : ""}

        ${id === "fitness" ? `
          <label for="activitySelect">Activity</label>
          <select id="activitySelect">
            <option>Walking</option>
            <option>Running</option>
            <option>Cycling</option>
            <option>Swimming</option>
            <option>Stretching</option>
            <option>Rest day</option>
            <option>Other</option>
          </select>` : ""}

        ${id === "scrapbook" ? `
          <label for="entryImage">Add a photograph</label>
          <input id="entryImage" type="file" accept="image/*">` : ""}

        <button class="action-button" type="submit">Save my entry</button>
      </form>

      <p id="saveMessage" role="status"></p>
    </section>
  `;
}

function savedPages() {
  return `
    <section class="feature-panel">
      <p class="eyebrow">YOUR COLLECTION</p>
      <h2>My Saved Pages</h2>
      <p>Your saved entries appear here on this device and browser.</p>
      <div id="savedList" class="saved-list"></div>
    </section>
  `;
}

function breathingActivity() {
  return `
    <section class="feature-panel">
      <p class="eyebrow">TAKE A PAUSE</p>
      <h2>A breathing moment</h2>
      <p>Let your breathing stay comfortable and natural. Follow the circle only if it feels helpful. Stop if you feel uncomfortable.</p>
      <div class="breath-orb" id="breathOrb"></div>
      <div class="breath-label" id="breathLabel">Ready when you are</div>
      <div style="text-align:center;margin-top:20px">
        <button class="action-button" id="breathStart">Begin</button>
        <button class="action-button secondary" id="breathStop">Pause</button>
      </div>
    </section>
  `;
}

function studyActivity() {
  return `
    <section class="feature-panel">
      <p class="eyebrow">FOCUS SESSION</p>
      <h2>Ten-minute study timer</h2>
      <p>Choose one manageable task. Take a break when the session finishes.</p>
      <div class="timer-display" id="timerDisplay">10:00</div>
      <div style="text-align:center">
        <button class="action-button" id="timerStart">Start</button>
        <button class="action-button secondary" id="timerReset">Reset</button>
      </div>
      <p id="timerStatus" style="text-align:center"></p>
    </section>
  `;
}

function plannerActivity() {
  return `
    <section class="feature-panel">
      <p class="eyebrow">MAKE A REALISTIC PLAN</p>
      <h2>My tasks today</h2>
      <form id="taskForm">
        <label for="taskInput">One task at a time</label>
        <input id="taskInput" maxlength="120" placeholder="What would you like to do?" required>
        <button class="action-button">Add task</button>
      </form>
      <div id="taskList" class="saved-list"></div>
    </section>
  `;
}

function careerActivity() {
  return `
    <section class="feature-panel">
      <p class="eyebrow">DISCOVER YOUR INTERESTS</p>
      <h2>What interests you?</h2>
      <p>This is a reflection activity, not a scientific career test.</p>
      ${[
        "Health and helping people",
        "Science and discovery",
        "Art and communication",
        "Environment and animals",
        "Law and public service",
        "Technology and design",
        "Business and entrepreneurship",
        "Education and research",
        "Writing and creative work",
        "Sports and physical activity"
      ].map(item => `
        <label>
          <input type="checkbox" class="interest" value="${item}">
          ${item}
        </label>
      `).join("")}
      <button class="action-button" id="interestSave">Save my interests</button>
      <p id="interestResult"></p>
    </section>
  `;
}

function moneyActivity() {
  return `
    <section class="feature-panel">
      <p class="eyebrow">PRACTISE WITH IMAGINARY AMOUNTS</p>
      <h2>Simple budget calculator</h2>
      <label for="budgetAmount">Starting amount (₹)</label>
      <input id="budgetAmount" type="number" min="0" placeholder="1000">
      <label for="spendAmount">Planned spending (₹)</label>
      <input id="spendAmount" type="number" min="0" placeholder="300">
      <button class="action-button" id="budgetCalculate">Calculate balance</button>
      <p id="budgetResult" role="status"></p>
    </section>
  `;
}

function sportsActivity() {
  return `
    <section class="feature-panel">
      <p class="eyebrow">EXPLORE AND LEARN</p>
      <h2>Sports to discover</h2>
      <p>Choose a sport you would like to learn about. Check official organisers for current event dates and registration details.</p>
      <ul>
        <li>Athletics and track events</li>
        <li>Football, basketball and volleyball</li>
        <li>Swimming and aquatic sports</li>
        <li>Cycling and recreational rides</li>
        <li>Badminton, tennis and table tennis</li>
      </ul>
      <p>For young participants, involve a parent, guardian or trusted adult when researching or registering for events.</p>
    </section>
  `;
}

function activityForSpace() {
  if (space.type === "breathing") return breathingActivity();
  if (space.type === "study") return studyActivity();
  if (space.type === "planner") return plannerActivity();
  if (space.type === "career") return careerActivity();
  if (space.type === "money") return moneyActivity();
  if (space.type === "sports") return sportsActivity();
  return "";
}

content.insertAdjacentHTML("beforeend", activityForSpace());
content.insertAdjacentHTML("beforeend", journalForm());
content.insertAdjacentHTML("beforeend", savedPages());

/* ---------- SAVE AND DISPLAY ENTRIES ---------- */

function renderSaved() {
  const list = document.getElementById("savedList");
  if (!list) return;

  const entries = Store.get(id, []);

  list.innerHTML = entries.length
    ? entries.map(entry => `
      <article class="saved-entry">
        <small>${new Date(entry.createdAt).toLocaleString()} ${entry.mood ? " · " + escapeHTML(entry.mood) : ""}</small>
        <h3>${escapeHTML(entry.title)}</h3>
        <p>${escapeHTML(entry.text)}</p>
        ${entry.image ? `<img src="${entry.image}" alt="Saved memory" style="max-height:240px;margin-top:12px">` : ""}
        <button class="action-button secondary" data-delete="${entry.id}">Delete entry</button>
      </article>
    `).join("")
    : "<p>No saved entries yet. Your first entry can be small.</p>";

  list.querySelectorAll("[data-delete]").forEach(button => {
    button.addEventListener("click", () => {
      const updated = Store.get(id, []).filter(
        entry => entry.id !== Number(button.dataset.delete)
      );
      Store.set(id, updated);
      renderSaved();
    });
  });
}

document.getElementById("entryForm")?.addEventListener("submit", async event => {
  event.preventDefault();

  const imageFile = document.getElementById("entryImage")?.files?.[0];
  let image = "";

  if (imageFile) {
    if (imageFile.size > 1200000) {
      alert("Choose an image smaller than 1.2 MB for this demo.");
      return;
    }

    image = await new Promise(resolve => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(imageFile);
    });
  }

  Store.add(id, {
    title: document.getElementById("entryTitle").value.trim(),
    text: document.getElementById("entryText").value.trim(),
    mood: document.getElementById("moodSelect")?.value || "",
    activity: document.getElementById("activitySelect")?.value || "",
    image
  });

  document.getElementById("saveMessage").textContent =
    "Your entry has been saved in this browser.";

  event.target.reset();
  renderSaved();
});

renderSaved();

/* ---------- BREATHING ACTIVITY ---------- */

let breathInterval = null;
let breathPhase = false;

document.getElementById("breathStart")?.addEventListener("click", () => {
  if (breathInterval) return;

  const orb = document.getElementById("breathOrb");
  const label = document.getElementById("breathLabel");

  const tick = () => {
    breathPhase = !breathPhase;
    orb.classList.toggle("inhale", breathPhase);
    label.textContent = breathPhase
      ? "Breathe in gently"
      : "Breathe out gently";
  };

  tick();
  breathInterval = setInterval(tick, 4000);
});

document.getElementById("breathStop")?.addEventListener("click", () => {
  clearInterval(breathInterval);
  breathInterval = null;

  document.getElementById("breathOrb")?.classList.remove("inhale");
  const label = document.getElementById("breathLabel");
  if (label) label.textContent = "Paused. Take your time.";
});

/* ---------- STUDY TIMER ---------- */

let timer = null;
let remaining = 600;

function updateTimer() {
  const display = document.getElementById("timerDisplay");
  if (display) {
    display.textContent =
      String(Math.floor(remaining / 60)).padStart(2, "0") + ":" +
      String(remaining % 60).padStart(2, "0");
  }
}

document.getElementById("timerStart")?.addEventListener("click", () => {
  if (timer) return;

  const status = document.getElementById("timerStatus");
  status.textContent = "Your session has started. Focus gently.";

  timer = setInterval(() => {
    remaining--;
    updateTimer();

    if (remaining <= 0) {
      clearInterval(timer);
      timer = null;
      status.textContent = "Session complete. Take a short break.";
    }
  }, 1000);
});

document.getElementById("timerReset")?.addEventListener("click", () => {
  clearInterval(timer);
  timer = null;
  remaining = 600;
  updateTimer();
  document.getElementById("timerStatus").textContent = "Ready for a fresh session.";
});

/* ---------- DAY PLANNER ---------- */

const taskKey = "planner-tasks";

function renderTasks() {
  const list = document.getElementById("taskList");
  if (!list) return;

  const tasks = Store.get(taskKey, []);

  list.innerHTML = tasks.length
    ? tasks.map(task => `
      <label class="saved-entry">
        <input type="checkbox" data-task="${task.id}" ${task.done ? "checked" : ""}>
        ${escapeHTML(task.text)}
      </label>
    `).join("")
    : "<p>No tasks yet. Add one small step.</p>";

  list.querySelectorAll("[data-task]").forEach(box => {
    box.addEventListener("change", () => {
      const updated = Store.get(taskKey, []).map(task =>
        task.id === Number(box.dataset.task)
          ? { ...task, done: box.checked }
          : task
      );
      Store.set(taskKey, updated);
    });
  });
}

document.getElementById("taskForm")?.addEventListener("submit", event => {
  event.preventDefault();

  const input = document.getElementById("taskInput");
  const tasks = Store.get(taskKey, []);

  tasks.push({
    id: Date.now(),
    text: input.value.trim(),
    done: false
  });

  Store.set(taskKey, tasks);
  input.value = "";
  renderTasks();
});

renderTasks();

/* ---------- CAREER INTERESTS ---------- */

document.getElementById("interestSave")?.addEventListener("click", () => {
  const selected = [...document.querySelectorAll(".interest:checked")]
    .map(input => input.value);

  Store.set("career-interests", selected);

  document.getElementById("interestResult").textContent =
    selected.length
      ? "Your interests have been saved: " + selected.join(", ")
      : "Choose at least one interest to save.";
});

/* ---------- MONEY CALCULATOR ---------- */

document.getElementById("budgetCalculate")?.addEventListener("click", () => {
  const amount = Number(document.getElementById("budgetAmount").value);
  const spending = Number(document.getElementById("spendAmount").value);
  const result = document.getElementById("budgetResult");

  if (amount < 0 || spending < 0 ||
      !Number.isFinite(amount) || !Number.isFinite(spending)) {
    result.textContent = "Enter valid amounts.";
    return;
  }

  result.textContent = spending > amount
    ? "Your planned spending is higher than your starting amount."
    : "Remaining balance: ₹" + (amount - spending).toFixed(2);
});

/* ---------- MOBILE NAVIGATION ---------- */

document.getElementById("menuToggle")?.addEventListener("click", () => {
  document.getElementById("mainNav")?.classList.toggle("open");
});

document.querySelectorAll(".main-nav a").forEach(link => {
  link.addEventListener("click", () => {
    document.getElementById("mainNav")?.classList.remove("open");
  });
});

const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();
