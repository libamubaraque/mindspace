
// ============================================================
// TO THE ETHER.
// COMPLETE FEATURE ENGINE — 20 FEATURE EXPERIENCES
//
// JUDGE EXPLANATION:
//
// This file powers all twenty individual feature pages.
//
// It uses:
// 1. Structured JavaScript objects to store feature content.
// 2. URL parameters to identify the selected feature.
// 3. DOM manipulation to display individual experiences.
// 4. Event listeners for interactive activities.
// 5. Local storage for this prototype's saved entries.
// 6. External links for tutorials and educational resources.
//
// Each feature has a separate image, introduction,
// learning content, facts, activities and tutorial searches.
// ============================================================


// 01. SHARED STORAGE

const SAVED_KEY = "toTheEtherSavedPages";
const PROGRESS_KEY = "toTheEtherProgress";

function readStorage(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function writeStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function safeText(value) {
  return String(value ?? "").replace(/[&<>"']/g, char => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  })[char]);
}

function notify(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window.featureToastTimer);

  window.featureToastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}


// 02. COMPLETE FEATURE CONTENT DATABASE

const FEATURE_DATA = {

  // ----------------------------------------------------------
  // 01. MOOD JOURNAL
  // ----------------------------------------------------------

  mood: {
    number: "01",
    name: "Mood Journal",
    subtitle: "Understand your feelings, one day at a time.",
    image: "images/features/mood.jpg",

    introduction: `
      <p>
        Emotions are part of everyday life. Happiness,
        excitement, frustration, sadness and uncertainty
        can all be experienced by students.
      </p>
      <p>
        A mood journal provides a private space to recognise
        emotions, reflect on experiences and notice patterns
        over time. It is not a diagnostic or medical tool.
      </p>
    `,

    lessons: [
      {
        title: "Understanding emotions",
        text: "Emotions provide information about our experiences and needs. Learning to identify them can make reflection and communication easier."
      },
      {
        title: "Recognising patterns",
        text: "You may notice connections between your mood and sleep, school experiences, relationships, rest or daily activities. Patterns are observations, not proof of a cause."
      },
      {
        title: "Emotional vocabulary",
        text: "Instead of describing every difficult feeling as simply bad, try words such as disappointed, overwhelmed, uncertain, frustrated or lonely."
      },
      {
        title: "Responding with kindness",
        text: "A journal should never become another performance target. You can write a sentence, a paragraph or nothing at all on a particular day."
      }
    ],

    facts: [
      "Emotions can be mixed. Someone can feel excited and nervous about the same event.",
      "Naming an emotion can help people communicate their experiences more clearly.",
      "A journal is a reflection tool, not a substitute for support from a trusted adult or qualified professional."
    ],

    activities: [
      "Describe three words that represent your day.",
      "Notice one moment that made you feel comfortable or uncomfortable.",
      "Write down one thing you would like someone to understand about your day.",
      "Reflect on something that helped you feel supported."
    ],

    videos: [
      "how to start a mood journal for beginners",
      "emotional awareness and understanding feelings",
      "guided journaling prompts for students"
    ],

    resources: [
      {
        name: "WHO — Mental Health",
        url: "https://www.who.int/health-topics/mental-health"
      },
      {
        name: "UNICEF — Adolescent Mental Health",
        url: "https://www.unicef.org/health/mental-health"
      }
    ],

    prompts: [
      "How am I feeling today?",
      "What happened today that stayed in my mind?",
      "What do I need more of tomorrow?",
      "What would I say to a friend feeling this way?"
    ]
  },


  // ----------------------------------------------------------
  // 02. BREATHING SPACE
  // ----------------------------------------------------------

  breathing: {
    number: "02",
    name: "Breathing Space",
    subtitle: "A quiet moment in a busy day.",
    image: "images/features/breathing.jpg",

    introduction: `
      <p>
        Schoolwork, responsibilities and everyday experiences
        can make days feel busy. Breathing Space introduces
        simple breathing and mindfulness activities.
      </p>
      <p>
        These exercises are optional relaxation activities.
        They are not medical treatment and should never
        involve forcing or holding your breath uncomfortably.
      </p>
    `,

    lessons: [
      {
        title: "What is mindful breathing?",
        text: "Mindful breathing means gently noticing the natural movement of your breath without trying to control every part of it."
      },
      {
        title: "Creating a calming environment",
        text: "A comfortable position, a quiet environment and a few uninterrupted moments can make an exercise easier to follow."
      },
      {
        title: "Different breathing exercises",
        text: "Explore gentle natural breathing, relaxed counting and guided breathing. Choose an approach that feels comfortable."
      },
      {
        title: "Mindfulness beyond breathing",
        text: "Mindfulness can also involve noticing sounds, observing nature, paying attention to ordinary activities or taking a quiet pause."
      }
    ],

    facts: [
      "Breathing is an automatic body function, although people can also pay attention to it voluntarily.",
      "Mindfulness programmes have been studied for their possible benefits, but results differ between individuals.",
      "Relaxation activities should feel comfortable. Stop if you feel dizzy or uncomfortable."
    ],

    activities: [
      "Notice five things around you.",
      "Listen carefully to three different sounds.",
      "Take a comfortable pause without looking at a screen.",
      "Write down how you feel before and after a relaxation activity."
    ],

    videos: [
      "guided breathing exercises for beginners",
      "five minute mindfulness for students",
      "gentle beginner yoga breathing tutorial",
      "guided nature meditation for beginners"
    ],

    resources: [
      {
        name: "NHS — Breathing exercises",
        url: "https://www.nhs.uk/mental-health/self-help/guides-tools-and-activities/breathing-exercises-for-stress/"
      },
      {
        name: "WHO — Mental Wellbeing",
        url: "https://www.who.int/health-topics/mental-health"
      }
    ],

    prompts: [
      "What does a peaceful environment look like to me?",
      "What sounds help me feel comfortable?",
      "When would I like to take a quiet break?"
    ]
  },


  // ----------------------------------------------------------
  // 03. GRATITUDE JOURNAL
  // ----------------------------------------------------------

  gratitude: {
    number: "03",
    name: "Gratitude Journal",
    subtitle: "Notice the little things that matter.",
    image: "images/features/gratitude.jpg",

    introduction: `
      <p>
        Gratitude means recognising and appreciating people,
        experiences and things that bring meaning or support
        into our lives.
      </p>
      <p>
        It does not mean pretending that difficult situations
        are good. You can appreciate something while also
        acknowledging that life can be challenging.
      </p>
    `,

    lessons: [
      {
        title: "Understanding gratitude",
        text: "Gratitude involves noticing what we value. It can include relationships, opportunities, ordinary experiences, personal strengths and acts of kindness."
      },
      {
        title: "The science of gratitude",
        text: "Researchers have studied gratitude practices and their relationship with wellbeing. Some studies report positive effects, although outcomes vary and gratitude is not a cure for mental health difficulties."
      },
      {
        title: "Different ways to practise",
        text: "You can write a gratitude list, create a gratitude jar, send a thank-you message or reflect on one meaningful moment."
      },
      {
        title: "Gratitude during difficult days",
        text: "Gratitude should never be forced. A difficult day does not require a positive interpretation. You can simply record something small that mattered, or skip the activity."
      },
      {
        title: "The 30-day challenge",
        text: "Explore a gentle month-long practice. Try different prompts rather than repeating the same exercise every day."
      }
    ],

    facts: [
      "Gratitude is studied in positive psychology and wellbeing research.",
      "A gratitude letter is one way to express appreciation to another person.",
      "Gratitude and recognising difficulties can exist together."
    ],

    activities: [
      "Create a list of three small things you appreciate.",
      "Write a letter of appreciation to someone.",
      "Start a digital gratitude jar.",
      "Record a moment you would like to remember.",
      "Try a seven-day gratitude reflection challenge."
    ],

    videos: [
      "how to start a gratitude journal",
      "gratitude jar DIY tutorial",
      "gratitude letter writing tutorial",
      "guided gratitude journaling for beginners"
    ],

    resources: [
      {
        name: "Greater Good Science Center",
        url: "https://greatergood.berkeley.edu/"
      },
      {
        name: "Harvard Health — Gratitude",
        url: "https://www.health.harvard.edu/"
      }
    ],

    prompts: [
      "What is one ordinary thing that made today better?",
      "Who has helped me recently?",
      "What opportunity am I grateful to have?",
      "What is something about myself I appreciate?",
      "What is a memory I want to keep?"
    ]
  },


  // ----------------------------------------------------------
  // 04. FITNESS AND WELLNESS
  // ----------------------------------------------------------

  fitness: {
    number: "04",
    name: "Fitness & Wellness",
    subtitle: "Movement, health and discovering what your body can do.",
    image: "images/features/fitness.jpg",

    introduction: `
      <p>
        Fitness is not limited to professional athletes or
        competitive sports. Everyday movement, enjoyable
        physical activities and participation in sports
        can all be meaningful experiences.
      </p>
      <p>
        This space introduces running, walking, cycling,
        swimming, yoga, mobility and general physical wellbeing.
        Activities should be appropriate for your age, ability
        and circumstances.
      </p>
    `,

    lessons: [
      {
        title: "Understanding physical activity",
        text: "Physical activity includes movement during sports, games, walking, cycling, dancing and everyday life."
      },
      {
        title: "Running for beginners",
        text: "Learn about comfortable pacing, suitable footwear, gradual preparation, rest and safe routes. Running should be adapted to individual ability."
      },
      {
        title: "Cycling",
        text: "Cycling can be a recreational activity, a means of transport or a competitive sport. Learn about road awareness, helmets and responsible participation."
      },
      {
        title: "Swimming",
        text: "Swimming is a skill-based activity. Beginners should learn with qualified supervision in an appropriate swimming environment."
      },
      {
        title: "Yoga and mobility",
        text: "Beginner-friendly yoga can introduce balance, flexibility, coordination and body awareness. Choose appropriate instruction and avoid movements that cause pain."
      },
      {
        title: "Screen-time breaks",
        text: "Long periods of sitting and screen use can be interrupted with comfortable movement breaks, outdoor activities and changes in posture."
      }
    ],

    facts: [
      "WHO guidelines recommend regular physical activity for children and adolescents, with activities suited to their development and abilities.",
      "Physical activity can support physical health, sleep and wellbeing.",
      "Rest, hydration and suitable recovery are important parts of an active lifestyle.",
      "Fitness is not measured only through speed, appearance or competition results."
    ],

    activities: [
      "Explore a beginner walking or running programme.",
      "Try a comfortable beginner yoga class.",
      "Learn basic cycling safety.",
      "Explore swimming lessons with qualified supervision.",
      "Plan an enjoyable outdoor activity.",
      "Research a local marathon or sporting event."
    ],

    videos: [
      "beginner running technique and warm up",
      "beginner yoga full body tutorial",
      "beginner cycling safety lessons",
      "beginner swimming lessons with instructor",
      "beginner mobility and stretching tutorial"
    ],

    resources: [
      {
        name: "WHO — Physical Activity",
        url: "https://www.who.int/news-room/fact-sheets/detail/physical-activity"
      },
      {
        name: "Strava",
        url: "https://www.strava.com/"
      },
      {
        name: "Olympics",
        url: "https://olympics.com/"
      }
    ],

    prompts: [
      "Which physical activities do I enjoy?",
      "What new sport would I like to learn?",
      "What makes an activity enjoyable for me?",
      "What safety information should I know before participating?"
    ]
  },


  // ----------------------------------------------------------
  // 05. DAILY CHECK-IN
  // ----------------------------------------------------------

  checkin: {
    number: "05",
    name: "Daily Check-in",
    subtitle: "Small moments deserve to be noticed.",
    image: "images/features/checkin.jpg",

    introduction: `
      <p>
        A day can contain achievements, unexpected moments,
        challenges, conversations and ordinary experiences.
      </p>
      <p>
        Daily Check-in provides a simple place to reflect
        without turning personal growth into another competition.
      </p>
    `,

    lessons: [
      {
        title: "Why reflect on your day?",
        text: "Reflection can help you recognise experiences, remember important moments and identify what you may want to change."
      },
      {
        title: "Recognising little wins",
        text: "Little wins may include completing a task, helping someone, asking a question or trying something new."
      },
      {
        title: "Small conversations",
        text: "Sometimes a meaningful conversation or a simple act of connection can be an important part of the day."
      }
    ],

    facts: [
      "Reflection can help people identify patterns in their daily experiences.",
      "Small achievements can be meaningful even when they are not publicly recognised.",
      "A check-in can be completed in a few words."
    ],

    activities: [
      "Record your little win of the day.",
      "Write about one interesting conversation.",
      "Describe something unexpected.",
      "Choose one intention for tomorrow."
    ],

    videos: [
      "daily reflection journaling tutorial",
      "how to start a daily check in journal",
      "simple daily journaling routine"
    ],

    resources: [
      {
        name: "UNICEF",
        url: "https://www.unicef.org/"
      }
    ],

    prompts: [
      "What was the most memorable part of today?",
      "What did I learn?",
      "What made me laugh or smile?",
      "What would I like to do differently tomorrow?"
    ]
  },


  // ----------------------------------------------------------
  // 06. STUDY AND FOCUS
  // ----------------------------------------------------------

  study: {
    number: "06",
    name: "Study & Focus",
    subtitle: "Learn at your own pace.",
    image: "images/features/study.jpg",

    introduction: `
      <p>
        Learning does not happen in exactly the same way
        for everyone. Different subjects and tasks may
        require different approaches.
      </p>
      <p>
        This space explores study methods, organisation,
        concentration, revision and balanced breaks.
      </p>
    `,

    lessons: [
      {
        title: "Active recall",
        text: "Active recall involves trying to remember information without immediately looking at the answer. Flashcards and self-testing are examples."
      },
      {
        title: "Spaced practice",
        text: "Spaced practice means revisiting material over multiple sessions instead of relying entirely on one long revision session."
      },
      {
        title: "The Pomodoro method",
        text: "The traditional Pomodoro technique uses focused work periods followed by short breaks. You can adapt the timing to your task."
      },
      {
        title: "Study environments",
        text: "A suitable study space can reduce distractions. This might be a desk, library or quiet corner."
      },
      {
        title: "Balanced learning",
        text: "Sleep, rest and time away from academic work are also important parts of learning."
      }
    ],

    facts: [
      "Retrieval practice has been studied as a learning technique.",
      "Spaced repetition can support long-term retention.",
      "Different tasks may benefit from different study strategies."
    ],

    activities: [
      "Create a weekly revision plan.",
      "Turn a chapter into five recall questions.",
      "Create a flashcard set.",
      "Try a focused 10-minute study session followed by a break.",
      "Explore nature sounds or quiet study environments."
    ],

    videos: [
      "active recall study technique tutorial",
      "spaced repetition explained for students",
      "how to use the pomodoro study technique",
      "how to make effective revision notes"
    ],

    resources: [
      {
        name: "CBSE",
        url: "https://www.cbse.gov.in/"
      },
      {
        name: "Khan Academy",
        url: "https://www.khanacademy.org/"
      },
      {
        name: "YouTube Music",
        url: "https://music.youtube.com/"
      },
      {
        name: "Spotify",
        url: "https://open.spotify.com/"
      },
      {
        name: "Apple Music",
        url: "https://music.apple.com/"
      }
    ],

    prompts: [
      "What is my main learning goal today?",
      "Which topic needs more attention?",
      "What method will I try?",
      "What did I understand better today?"
    ]
  },


  // ----------------------------------------------------------
  // 07. SELF-CARE CORNER
  // ----------------------------------------------------------

  selfcare: {
    number: "07",
    name: "Self-care Corner",
    subtitle: "Everyday care is part of everyday life.",
    image: "images/features/selfcare.jpg",

    introduction: `
      <p>
        Self-care includes ordinary actions that support
        physical health, emotional wellbeing and daily life.
      </p>
      <p>
        It is not about buying expensive products or
        following unrealistic routines. It is about learning
        what helps you care for yourself.
      </p>
    `,

    lessons: [
      {
        title: "Physical self-care",
        text: "Physical self-care can involve hygiene, nutritious meals, appropriate movement, sleep and seeking healthcare when needed."
      },
      {
        title: "Emotional self-care",
        text: "Recognising emotions, setting reasonable boundaries and talking to trusted people can support emotional wellbeing."
      },
      {
        title: "Social self-care",
        text: "Healthy relationships, supportive surroundings and meaningful conversations can contribute to wellbeing."
      },
      {
        title: "Digital self-care",
        text: "Digital self-care can include managing notifications, taking screen breaks and thinking about how online spaces affect your day."
      },
      {
        title: "Menstrual health education",
        text: "Learn about the menstrual cycle, common experiences, hygiene and when it is appropriate to ask a healthcare professional for advice."
      }
    ],

    facts: [
      "Self-care is not a replacement for professional healthcare.",
      "Good hygiene is a basic part of everyday health.",
      "People experience menstruation differently. Severe or concerning symptoms deserve medical attention."
    ],

    activities: [
      "Create a realistic morning routine.",
      "Prepare a simple self-care checklist.",
      "Identify one digital habit you would like to change.",
      "Learn about menstrual health from reliable medical resources.",
      "Create a list of people you can approach for support."
    ],

    videos: [
      "simple self care routine for students",
      "beginner hygiene education",
      "digital wellbeing and screen time",
      "menstrual health education for teenagers"
    ],

    resources: [
      {
        name: "WHO — Adolescent Health",
        url: "https://www.who.int/health-topics/adolescent-health"
      },
      {
        name: "UNICEF",
        url: "https://www.unicef.org/"
      }
    ],

    prompts: [
      "What does taking care of myself mean?",
      "What support do I need?",
      "Which routine makes my day easier?",
      "What boundary would help me?"
    ]
  },


  // ----------------------------------------------------------
  // 08. THE WORLD BEYOND YOU
  // ----------------------------------------------------------

  stories: {
    number: "08",
    name: "The World Beyond You",
    subtitle: "Understand the world through real experiences.",
    image: "images/features/stories.jpg",

    introduction: `
      <p>
        The world contains stories of resilience, injustice,
        discovery, humanitarian action and social change.
      </p>
      <p>
        This section encourages students to explore
        real-world issues with curiosity, empathy and
        responsible research.
      </p>
    `,

    lessons: [
      {
        title: "Understanding human rights",
        text: "Human rights belong to all people. Explore children's rights, access to education, equality and protection."
      },
      {
        title: "Children affected by conflict",
        text: "Learn about the educational, social and humanitarian challenges faced by children in conflict-affected areas through credible reporting and humanitarian organisations."
      },
      {
        title: "Education around the world",
        text: "Explore differences in access to schooling, educational opportunities and learning resources."
      },
      {
        title: "Environmental challenges",
        text: "Investigate climate change, biodiversity, pollution, conservation and community action."
      },
      {
        title: "Humanitarian work",
        text: "Understand how aid organisations work in healthcare, emergency assistance, education and protection."
      }
    ],

    facts: [
      "The Universal Declaration of Human Rights was adopted by the United Nations in 1948.",
      "UNICEF works on children's rights, health, education and protection.",
      "Humanitarian organisations work in emergencies and long-term development."
    ],

    activities: [
      "Research a global issue using three credible sources.",
      "Create a timeline of an important humanitarian event.",
      "Compare two countries' education challenges.",
      "Explore a verified story of community action.",
      "Write a reflection on how young people can contribute."
    ],

    videos: [
      "human rights explained for students",
      "how humanitarian organisations work",
      "children's rights explained UNICEF",
      "climate change explained for students"
    ],

    resources: [
      {
        name: "United Nations",
        url: "https://www.un.org/en/"
      },
      {
        name: "UNICEF",
        url: "https://www.unicef.org/"
      },
      {
        name: "International Committee of the Red Cross",
        url: "https://www.icrc.org/"
      },
      {
        name: "World Food Programme",
        url: "https://www.wfp.org/"
      }
    ],

    prompts: [
      "What global issue did I learn about?",
      "Whose perspective should I understand?",
      "Which facts can I verify?",
      "What positive action is taking place?"
    ]
  },


  // ----------------------------------------------------------
  // 09. FIND YOUR DIRECTION
  // ----------------------------------------------------------

  career: {
    number: "09",
    name: "Find Your Direction",
    subtitle: "Your future can contain more than one possibility.",
    image: "images/features/career.jpg",

    introduction: `
      <p>
        Choosing a career can feel confusing, especially
        when someone has many interests or does not yet
        know what they want to do.
      </p>
      <p>
        This space introduces career exploration, education
        pathways, different job families and opportunities
        in India and internationally.
      </p>
    `,

    lessons: [
      {
        title: "Discover your interests",
        text: "Explore what subjects, activities and real-world problems interest you. Interests can change as you gain experience."
      },
      {
        title: "Career families",
        text: "Explore healthcare, education, engineering, public service, science, creative work, law, business, humanitarian work and many other fields."
      },
      {
        title: "Understanding qualifications",
        text: "Different jobs require different qualifications. Research the relevant degrees, entrance examinations, licensing and professional training."
      },
      {
        title: "India and international pathways",
        text: "Compare course duration, admission systems, professional recognition and training requirements in different countries."
      },
      {
        title: "Dreams beyond careers",
        text: "A fulfilling future can also include volunteering, travel, hobbies, family, friendships and meaningful personal goals."
      }
    ],

    facts: [
      "Many careers require continuous learning after graduation.",
      "Professional licensing requirements can differ between countries.",
      "Salary information varies by experience, location, organisation and qualifications."
    ],

    activities: [
      "Complete a career-interest reflection.",
      "Explore five different job titles.",
      "Research degrees and entrance examinations.",
      "Compare Indian and international study pathways.",
      "Create a future vision board.",
      "Research humanitarian and volunteering opportunities."
    ],

    videos: [
      "career exploration for students",
      "how to choose a career after school",
      "how to research university degrees",
      "career planning for teenagers"
    ],

    resources: [
      {
        name: "National Career Service India",
        url: "https://www.ncs.gov.in/"
      },
      {
        name: "Study in India",
        url: "https://studyinindia.gov.in/"
      },
      {
        name: "National Testing Agency",
        url: "https://nta.ac.in/"
      }
    ],

    prompts: [
      "Which subjects interest me?",
      "What problems would I like to help solve?",
      "Which careers would I like to research?",
      "What kind of life do I hope to build?"
    ]
  },


  // ----------------------------------------------------------
  // 10. MY LITTLE WORLD
  // ----------------------------------------------------------

  world: {
    number: "10",
    name: "My Little World",
    subtitle: "A personal collection of memories and experiences.",
    image: "images/features/world.jpg",

    introduction: `
      <p>
        My Little World is a personal scrapbook and
        reflection space where you can collect memories,
        photographs, ideas and important experiences.
      </p>
      <p>
        It makes room for happy, ordinary and difficult
        memories without requiring everything to be perfect.
      </p>
    `,

    lessons: [
      {
        title: "What is scrapbooking?",
        text: "Scrapbooking combines photographs, written memories, artwork and meaningful objects into a personal collection."
      },
      {
        title: "Building a memory timeline",
        text: "A timeline can help organise important experiences by date or period."
      },
      {
        title: "Creative storytelling",
        text: "Captions, letters, short descriptions and drawings can add context to a photograph or memory."
      },
      {
        title: "Privacy matters",
        text: "Personal photographs and writing should be stored carefully. Avoid uploading sensitive information to public spaces."
      }
    ],

    facts: [
      "Scrapbooks have long been used to preserve photographs, letters and personal memories.",
      "Visual storytelling combines images and words.",
      "Digital storage and account privacy should be considered when saving personal material."
    ],

    activities: [
      "Create a memory page.",
      "Write a letter to your future self.",
      "Build a personal timeline.",
      "Collect meaningful photographs.",
      "Create a page about an important experience."
    ],

    videos: [
      "digital scrapbook tutorial for beginners",
      "how to create a memory journal",
      "creative journaling and collage tutorial"
    ],

    resources: [
      {
        name: "Canva",
        url: "https://www.canva.com/"
      },
      {
        name: "Pinterest",
        url: "https://www.pinterest.com/"
      }
    ],

    prompts: [
      "What memory do I want to preserve?",
      "What would I tell my future self?",
      "What experience changed my perspective?",
      "What ordinary moment matters to me?"
    ]
  },


  // ----------------------------------------------------------
  // 11. MOVIE THEATRE
  // ----------------------------------------------------------

  movies: {
    number: "11",
    name: "Movie Theatre",
    subtitle: "Explore stories, cinema and imagination.",
    image: "images/features/movies.jpg",

    introduction: `
      <p>
        Films can introduce audiences to different cultures,
        historical periods, social questions and imaginative
        worlds.
      </p>
      <p>
        This section explores cinema as entertainment,
        storytelling and an art form.
      </p>
    `,

    lessons: [
      {
        title: "Elements of storytelling",
        text: "Characters, setting, conflict, dialogue and resolution help build a film's narrative."
      },
      {
        title: "Film genres",
        text: "Explore drama, documentary, animation, comedy, historical films, science fiction and other genres."
      },
      {
        title: "Understanding cinematography",
        text: "Camera framing, lighting, colour, editing and sound influence how viewers experience a film."
      },
      {
        title: "Critical viewing",
        text: "Think about the evidence, perspectives and messages presented in a film. Fiction should not automatically be treated as historical fact."
      }
    ],

    facts: [
      "Film is a combination of visual storytelling, sound and performance.",
      "Documentaries and fictional films use different storytelling approaches.",
      "Films can influence cultural conversations and public awareness."
    ],

    activities: [
      "Create a film review.",
      "Analyse a favourite character.",
      "Explore a film's historical background.",
      "Create a watchlist with age-appropriate content."
    ],

    videos: [
      "film analysis for beginners",
      "cinematography explained",
      "how to write a movie review",
      "storytelling techniques in cinema"
    ],

    resources: [
      {
        name: "BFI",
        url: "https://www.bfi.org.uk/"
      },
      {
        name: "IMDb",
        url: "https://www.imdb.com/"
      }
    ],

    prompts: [
      "What made the story memorable?",
      "What message did the film communicate?",
      "Which character interested me most?",
      "What would I change about the ending?"
    ]
  },


  // ----------------------------------------------------------
  // 12. THE COMMONS
  // ----------------------------------------------------------

  commons: {
    number: "12",
    name: "The Commons",
    subtitle: "Find communities, clubs and shared interests.",
    image: "images/features/commons.jpg",

    introduction: `
      <p>
        The Commons introduces the idea of student
        communities, shared interests, clubs and
        collaborative learning.
      </p>
      <p>
        Students can discover opportunities to participate
        in meaningful activities beyond regular classes.
      </p>
    `,

    lessons: [
      {
        title: "Why communities matter",
        text: "Communities provide opportunities for learning, collaboration, communication and shared interests."
      },
      {
        title: "Types of student clubs",
        text: "Explore science clubs, literature circles, debate societies, environmental groups, sports clubs and volunteering communities."
      },
      {
        title: "Organising activities",
        text: "Events often involve planning, responsibilities, communication and teamwork."
      },
      {
        title: "Responsible participation",
        text: "Use appropriate supervision and privacy practices when joining online or offline groups."
      }
    ],

    facts: [
      "Student clubs can develop teamwork and leadership skills.",
      "Volunteering groups may connect students with local community projects.",
      "Participation can be adapted to different interests and schedules."
    ],

    activities: [
      "Research a local student club.",
      "Plan a small school activity.",
      "Create a club proposal.",
      "Explore online educational communities."
    ],

    videos: [
      "how to start a school club",
      "teamwork skills for students",
      "how to organise a student event"
    ],

    resources: [
      {
        name: "UN Volunteers",
        url: "https://www.unv.org/"
      },
      {
        name: "UNICEF",
        url: "https://www.unicef.org/"
      }
    ],

    prompts: [
      "Which community would I like to join?",
      "What interests could I share with others?",
      "What activity could I organise?"
    ]
  },


  // ----------------------------------------------------------
  // 13. SPORTS AND EVENTS
  // ----------------------------------------------------------

  sports: {
    number: "13",
    name: "Sports & Events",
    subtitle: "Discover competitions, challenges and opportunities.",
    image: "images/features/sports.jpg",

    introduction: `
      <p>
        Sports and competitions offer opportunities to
        learn new skills, participate, meet people and
        experience teamwork.
      </p>
      <p>
        This section helps students discover marathon races,
        cycling competitions, swimming events, athletics,
        school tournaments and other sporting activities.
      </p>
      <p>
        Event information should always be verified through
        the organiser's official website before registration.
      </p>
    `,

    lessons: [
      {
        title: "Marathon races",
        text: "Explore road races and running events, including different distances, eligibility rules, age categories, registration information and beginner preparation. Younger participants must check minimum-age rules."
      },
      {
        title: "Cycling competitions",
        text: "Learn about road cycling, mountain biking, track cycling and recreational cycling events. Explore equipment, safety and competition formats."
      },
      {
        title: "Swimming competitions",
        text: "Discover swimming events, stroke categories, age groups, pool competitions and the role of qualified coaching and safe aquatic environments."
      },
      {
        title: "Athletics and track events",
        text: "Explore running, jumping and throwing disciplines, school athletics and organised sporting competitions."
      },
      {
        title: "Other sporting opportunities",
        text: "Discover football, basketball, badminton, tennis, volleyball, cricket and other sports."
      },
      {
        title: "Preparing for an event",
        text: "Learn about registration, age eligibility, event rules, appropriate preparation, hydration, recovery and adult supervision."
      },
      {
        title: "Participation and achievements",
        text: "Participation can be meaningful whether someone wins, improves a skill or simply experiences a new activity."
      }
    ],

    facts: [
      "The Olympic Games include summer and winter sporting events.",
      "Marathon distance is 42.195 kilometres.",
      "Cycling competitions include road, track, mountain bike and BMX disciplines.",
      "Swimming competitions have different strokes and distances.",
      "Age restrictions vary by event and organiser."
    ],

    activities: [
      "Research an upcoming local running event.",
      "Compare marathon and shorter-distance races.",
      "Explore a cycling competition.",
      "Research a swimming competition.",
      "Create a list of school sports events.",
      "Learn about athlete safety and event eligibility."
    ],

    videos: [
      "beginner running and marathon education",
      "cycling competition explained",
      "swimming competition rules explained",
      "athletics events explained for beginners",
      "how to prepare safely for a sports event"
    ],

    resources: [
      {
        name: "World Athletics",
        url: "https://worldathletics.org/"
      },
      {
        name: "World Aquatics",
        url: "https://www.worldaquatics.com/"
      },
      {
        name: "Union Cycliste Internationale",
        url: "https://www.uci.org/"
      },
      {
        name: "Sports Authority of India",
        url: "https://sportsauthorityofindia.nic.in/"
      },
      {
        name: "Athletics Federation of India",
        url: "https://indianathletics.in/"
      },
      {
        name: "Strava",
        url: "https://www.strava.com/"
      }
    ],

    prompts: [
      "Which sporting event interests me?",
      "What are the minimum age requirements?",
      "Where can I find official registration information?",
      "What safety arrangements are necessary?",
      "What new sport would I like to explore?"
    ]
  },


  // ----------------------------------------------------------
  // 14. DAY PLANNER
  // ----------------------------------------------------------

  planner: {
    number: "14",
    name: "Day Planner",
    subtitle: "Make room for what matters today.",
    image: "images/features/planner.jpg",

    introduction: `
      <p>
        A day planner helps organise tasks, activities,
        appointments and personal goals.
      </p>
      <p>
        Its purpose is to make everyday responsibilities
        easier to understand, not to fill every minute
        with work.
      </p>
    `,

    lessons: [
      {
        title: "Prioritising tasks",
        text: "Identify which tasks are important, which are time-sensitive and which can wait."
      },
      {
        title: "Breaking down goals",
        text: "Large tasks can feel easier when divided into smaller steps."
      },
      {
        title: "Flexible planning",
        text: "A useful plan allows room for unexpected events, breaks and changes."
      },
      {
        title: "Reviewing your day",
        text: "A short reflection can help you understand what worked and what needs adjustment."
      }
    ],

    facts: [
      "Planning can reduce the mental effort of remembering multiple tasks.",
      "Breaking a large task into smaller steps can make it easier to begin.",
      "Rest and flexibility are important parts of realistic planning."
    ],

    activities: [
      "Create a daily schedule.",
      "Choose three priorities.",
      "Break one large task into smaller actions.",
      "Plan a screen-free break.",
      "Review your completed tasks."
    ],

    videos: [
      "how to use a daily planner",
      "time management for students",
      "weekly planning tutorial",
      "how to prioritise tasks"
    ],

    resources: [
      {
        name: "Google Calendar",
        url: "https://calendar.google.com/"
      },
      {
        name: "Microsoft To Do",
        url: "https://www.microsoft.com/en-us/microsoft-365/microsoft-to-do-list-app"
      }
    ],

    prompts: [
      "What matters most today?",
      "What can wait?",
      "Where will I make room for rest?",
      "What did I complete today?"
    ]
  },


  // ----------------------------------------------------------
  // 15. THE CREATIVE STUDIO
  // ----------------------------------------------------------

  creative: {
    number: "15",
    name: "The Creative Studio",
    subtitle: "Create without worrying about perfection.",
    image: "images/features/creative.jpg",

    introduction: `
      <p>
        Creativity can take many forms: writing, drawing,
        photography, design, music, craft and storytelling.
      </p>
      <p>
        This section encourages experimentation and
        expression without requiring professional skills.
      </p>
    `,

    lessons: [
      {
        title: "Creative exploration",
        text: "Creative activities allow people to experiment with ideas, materials and different ways of communicating."
      },
      {
        title: "Visual storytelling",
        text: "Photography, colour, composition and visual details can communicate meaning."
      },
      {
        title: "Writing and expression",
        text: "Poetry, short stories, essays and personal writing are different ways to explore ideas."
      },
      {
        title: "Learning through practice",
        text: "Trying different techniques can help develop creative skills over time."
      }
    ],

    facts: [
      "Creative activities can combine problem-solving and self-expression.",
      "Photography uses elements such as lighting, framing and composition.",
      "There is no single correct way to begin a creative project."
    ],

    activities: [
      "Write a short poem.",
      "Create a photography theme.",
      "Make a simple mood board.",
      "Sketch something from your surroundings.",
      "Write a short fictional story."
    ],

    videos: [
      "beginner creative writing tutorial",
      "beginner photography composition",
      "digital mood board tutorial",
      "beginner drawing exercises"
    ],

    resources: [
      {
        name: "Canva",
        url: "https://www.canva.com/"
      },
      {
        name: "Behance",
        url: "https://www.behance.net/"
      },
      {
        name: "National Gallery of Art",
        url: "https://www.nga.gov/"
      }
    ],

    prompts: [
      "What would I create if I had no restrictions?",
      "Which creative skill interests me?",
      "What inspires my ideas?"
    ]
  },


  // ----------------------------------------------------------
  // 16. THE KINDNESS PROJECT
  // ----------------------------------------------------------

  kindness: {
    number: "16",
    name: "The Kindness Project",
    subtitle: "Small actions can contribute to meaningful change.",
    image: "images/features/kindness.jpg",

    introduction: `
      <p>
        Kindness can appear in ordinary interactions,
        community service, volunteering and efforts to
        improve the lives of others.
      </p>
      <p>
        This space introduces social responsibility,
        empathy and opportunities to contribute safely
        to the community.
      </p>
    `,

    lessons: [
      {
        title: "Everyday kindness",
        text: "Kindness can include listening, helping, sharing information and treating others with respect."
      },
      {
        title: "Volunteering",
        text: "Volunteering involves contributing time or skills to support a cause or community."
      },
      {
        title: "Understanding social needs",
        text: "Responsible community action begins with understanding what people actually need rather than making assumptions."
      },
      {
        title: "Planning a project",
        text: "A project can have a clear goal, responsible adult supervision, a realistic plan and an evaluation of its impact."
      }
    ],

    facts: [
      "Volunteering can support community organisations and public initiatives.",
      "The United Nations recognises volunteering as a contribution to sustainable development.",
      "Respecting privacy and obtaining appropriate permission are important in community projects."
    ],

    activities: [
      "Research a local volunteering organisation.",
      "Plan a school kindness initiative.",
      "Create an awareness poster.",
      "Explore environmental volunteering.",
      "Research child welfare and humanitarian organisations."
    ],

    videos: [
      "how to start a community service project",
      "volunteering explained for students",
      "how to organise a school awareness campaign"
    ],

    resources: [
      {
        name: "UN Volunteers",
        url: "https://www.unv.org/"
      },
      {
        name: "UNICEF",
        url: "https://www.unicef.org/"
      },
      {
        name: "GiveIndia",
        url: "https://give.do/"
      }
    ],

    prompts: [
      "What issue matters to my community?",
      "What skills could I contribute?",
      "Who should I contact before organising a project?",
      "How can I make my project responsible?"
    ]
  },


  // ----------------------------------------------------------
  // 17. THE LEARNING LIBRARY
  // ----------------------------------------------------------

  learning: {
    number: "17",
    name: "The Learning Library",
    subtitle: "Knowledge does not end with the classroom.",
    image: "images/features/learning.jpg",

    introduction: `
      <p>
        Learning can happen through books, documentaries,
        courses, research, conversations and exploration.
      </p>
      <p>
        This library encourages students to discover
        subjects beyond their regular syllabus.
      </p>
    `,

    lessons: [
      {
        title: "Independent learning",
        text: "Independent learning means exploring a subject through reliable resources and self-directed activities."
      },
      {
        title: "Research skills",
        text: "Compare sources, check publication dates, distinguish evidence from opinion and look for original references."
      },
      {
        title: "Exploring new subjects",
        text: "Science, history, geography, philosophy, literature, technology and the arts offer many directions for discovery."
      },
      {
        title: "Digital learning",
        text: "Online courses and educational videos can supplement classroom learning, but their quality should be evaluated."
      }
    ],

    facts: [
      "Libraries provide access to books, information and educational materials.",
      "Reliable research requires evaluating the credibility of sources.",
      "Learning can be formal, informal or self-directed."
    ],

    activities: [
      "Choose a new subject to explore.",
      "Research a topic using three reliable sources.",
      "Create a personal reading list.",
      "Complete an educational online lesson.",
      "Write a short summary of something new you learned."
    ],

    videos: [
      "how to research effectively",
      "critical thinking for students",
      "how to learn independently",
      "how to identify reliable information online"
    ],

    resources: [
      {
        name: "Khan Academy",
        url: "https://www.khanacademy.org/"
      },
      {
        name: "National Digital Library of India",
        url: "https://ndl.iitkgp.ac.in/"
      },
      {
        name: "SWAYAM",
        url: "https://swayam.gov.in/"
      },
      {
        name: "Google Scholar",
        url: "https://scholar.google.com/"
      }
    ],

    prompts: [
      "What subject would I like to understand?",
      "Which sources can verify my information?",
      "What question do I want to investigate?"
    ]
  },


  // ----------------------------------------------------------
  // 18. THE SLEEP SANCTUARY
  // ----------------------------------------------------------

  sleep: {
    number: "18",
    name: "The Sleep Sanctuary",
    subtitle: "Understand the importance of rest.",
    image: "images/features/sleep.jpg",

    introduction: `
      <p>
        Sleep is an important part of physical health,
        learning, memory and everyday wellbeing.
      </p>
      <p>
        This section introduces sleep education and
        practical routines that may support healthy rest.
      </p>
    `,

    lessons: [
      {
        title: "Why sleep matters",
        text: "Sleep supports many body functions and is important for learning, attention, memory and development."
      },
      {
        title: "Understanding sleep routines",
        text: "Consistent sleep and wake times can help establish a regular routine."
      },
      {
        title: "Preparing for bedtime",
        text: "A comfortable environment, relaxing activities and reduced evening distractions may support a bedtime routine."
      },
      {
        title: "Sleep and screens",
        text: "Electronic devices and stimulating activities can interfere with bedtime for some people. Explore habits that make it easier to wind down."
      }
    ],

    facts: [
      "Sleep supports memory and learning.",
      "Sleep needs vary by age and individual circumstances.",
      "Persistent sleep difficulties should be discussed with a qualified healthcare professional."
    ],

    activities: [
      "Create a relaxing bedtime routine.",
      "Prepare a sleep-friendly environment.",
      "Record your bedtime and wake time.",
      "Explore a calming audio routine."
    ],

    videos: [
      "sleep education for teenagers",
      "how to create a bedtime routine",
      "sleep hygiene explained",
      "guided relaxation before sleep"
    ],

    resources: [
      {
        name: "CDC — Sleep",
        url: "https://www.cdc.gov/sleep/"
      },
      {
        name: "National Sleep Foundation",
        url: "https://www.thensf.org/"
      }
    ],

    prompts: [
      "What helps me relax before bedtime?",
      "What distractions affect my evening?",
      "What would make my bedroom more comfortable?"
    ]
  },


  // ----------------------------------------------------------
  // 19. MONEY MATTERS
  // ----------------------------------------------------------

  money: {
    number: "19",
    name: "Money Matters",
    subtitle: "Build financial knowledge for everyday life.",
    image: "images/features/money.jpg",

    introduction: `
      <p>
        Financial literacy means understanding money,
        saving, spending, budgeting and responsible
        financial decisions.
      </p>
      <p>
        Learning these concepts early can help students
        understand everyday financial choices.
      </p>
    `,

    lessons: [
      {
        title: "Understanding a budget",
        text: "A budget records money coming in and money going out over a particular period."
      },
      {
        title: "Needs and wants",
        text: "Needs are essential expenses, while wants are additional purchases. The distinction depends on the situation."
      },
      {
        title: "Saving",
        text: "Saving involves setting aside money for future needs or goals."
      },
      {
        title: "Digital financial safety",
        text: "Learn to recognise suspicious messages, protect passwords and never share banking credentials or one-time passwords."
      },
      {
        title: "Understanding interest",
        text: "Interest is money paid or earned in connection with borrowing or saving, according to the relevant terms."
      }
    ],

    facts: [
      "A budget can help people understand spending patterns.",
      "Compound interest means interest can accumulate on previously earned interest.",
      "Financial decisions should be based on reliable information, not unrealistic promises."
    ],

    activities: [
      "Create a sample monthly budget.",
      "Compare needs and wants.",
      "Create a savings goal.",
      "Learn how interest works.",
      "Identify common online financial scams."
    ],

    videos: [
      "financial literacy for students",
      "budgeting basics explained",
      "compound interest explained for beginners",
      "online financial safety education"
    ],

    resources: [
      {
        name: "RBI",
        url: "https://www.rbi.org.in/"
      },
      {
        name: "NCFE India",
        url: "https://www.ncfe.org.in/"
      },
      {
        name: "National Financial Education",
        url: "https://www.nism.ac.in/"
      }
    ],

    prompts: [
      "What would I like to save for?",
      "What is the difference between a need and a want?",
      "What financial concept do I want to learn?",
      "How can I recognise an online financial scam?"
    ]
  },


  // ----------------------------------------------------------
  // 20. THE OPEN MIC
  // ----------------------------------------------------------

  openmic: {
    number: "20",
    name: "The Open Mic",
    subtitle: "Words, voices and stories deserve a space.",
    image: "images/features/openmic.jpg",

    introduction: `
      <p>
        The Open Mic is a creative space for poetry,
        storytelling, spoken word, personal expression
        and communication.
      </p>
      <p>
        It celebrates different voices and encourages
        students to explore language and creative expression.
      </p>
    `,

    lessons: [
      {
        title: "Understanding spoken word",
        text: "Spoken word combines written language and oral performance, often using rhythm, repetition and expressive delivery."
      },
      {
        title: "Writing poetry",
        text: "Poetry can use imagery, rhythm, sound and metaphor to communicate ideas and emotions."
      },
      {
        title: "Storytelling",
        text: "Stories often include a setting, characters, events and a central idea."
      },
      {
        title: "Public speaking",
        text: "Clear communication can be developed through practice, preparation and feedback."
      }
    ],

    facts: [
      "Oral storytelling has been used across cultures for generations.",
      "Spoken word poetry combines literary techniques with performance.",
      "A strong presentation does not require a particular accent."
    ],

    activities: [
      "Write a short poem.",
      "Create a two-minute story.",
      "Practise reading aloud.",
      "Write a speech about an issue you care about.",
      "Create an anonymous creative-writing prompt."
    ],

    videos: [
      "spoken word poetry for beginners",
      "how to write poetry tutorial",
      "public speaking tips for students",
      "storytelling techniques for beginners"
    ],

    resources: [
      {
        name: "Poetry Foundation",
        url: "https://www.poetryfoundation.org/"
      },
      {
        name: "National Poetry Foundation",
        url: "https://www.poetrysociety.org/"
      },
      {
        name: "TED-Ed",
        url: "https://ed.ted.com/"
      }
    ],

    prompts: [
      "What story would I like to tell?",
      "What issue matters enough for me to speak about?",
      "Which words describe my current ideas?",
      "What would I like my audience to remember?"
    ]
  }

};


// 03. FIND SELECTED FEATURE

const params = new URLSearchParams(window.location.search);

const selectedId = params.get("card") || "mood";

const feature = FEATURE_DATA[selectedId];


// 04. HANDLE INVALID CARD LINKS

if (!feature) {

  document.getElementById("featureMain").innerHTML = `
    <section class="feature-section">
      <h2>Space not found.</h2>
      <p>Please return to the homepage and choose a valid feature.</p>
      <a class="back-link" href="index.html">Return home</a>
    </section>
  `;

} else {

  loadFeature(feature);

}


// 05. DISPLAY FEATURE INFORMATION

function loadFeature(data) {

  document.title = `${data.name} | To the Ether.`;

  document.getElementById("featureTitle").textContent = data.name;

  document.getElementById("featureNumber").textContent =
    `${data.number} / 20 — TO THE ETHER`;

  document.getElementById("featureDescription").textContent =
    data.subtitle;

  document.getElementById("featureHero").style.backgroundImage =
    `url("${data.image}")`;

  document.getElementById("featureIntroduction").innerHTML =
    data.introduction;

  renderLessons(data);

  renderFacts(data);

  renderActivities(data);

  renderTools(data);

  renderVideos(data);

  renderResources(data);

  renderSaved(data);

  renderProgress(data);

}


// 06. EDUCATIONAL LESSONS

function renderLessons(data) {

  const container = document.getElementById("learningContent");

  container.innerHTML = data.lessons.map((lesson, index) => `

    <article class="lesson-item">

      <span class="eyebrow">
        LESSON ${String(index + 1).padStart(2, "0")}
      </span>

      <h3>${safeText(lesson.title)}</h3>

      <p>${safeText(lesson.text)}</p>

    </article>

  `).join("");

}


// 07. FACTS

function renderFacts(data) {

  const container = document.getElementById("factContent");

  container.innerHTML = `
    <ul>
      ${data.facts.map(fact => `
        <li>${safeText(fact)}</li>
      `).join("")}
    </ul>
  `;

}


// 08. PRACTICAL ACTIVITIES

function renderActivities(data) {

  const container = document.getElementById("activityContent");

  container.innerHTML = `
    <div class="feature-grid-small">
      ${data.activities.map((activity, index) => `

        <div class="tool-box">

          <span class="eyebrow">
            ACTIVITY ${index + 1}
          </span>

          <p>${safeText(activity)}</p>

          <label>
            <input
              type="checkbox"
              class="activity-check"
              data-activity="${index}"
            >
            Mark as explored
          </label>

        </div>

      `).join("")}
    </div>
  `;

  container.querySelectorAll(".activity-check").forEach(check => {

    check.addEventListener("change", () => {

      updateProgress(data.id, check.checked);

      renderProgress(data);

    });

  });

}


// 09. INTERACTIVE PERSONAL TOOLS

function renderTools(data) {

  const container = document.getElementById("toolsContent");

  const prompt = data.prompts[
    Math.floor(Math.random() * data.prompts.length)
  ];

  container.innerHTML = `

    <div class="tool-box">

      <span class="eyebrow">YOUR PERSONAL REFLECTION</span>

      <h3>${safeText(prompt)}</h3>

      <label for="personalTitle">Entry title</label>

      <input
        id="personalTitle"
        type="text"
        maxlength="100"
        placeholder="Give your entry a title"
      >

      <label for="personalEntry">Your thoughts and ideas</label>

      <textarea
        id="personalEntry"
        maxlength="10000"
        placeholder="Write, reflect, plan or explore your ideas..."
      ></textarea>

      <button id="saveFeatureEntry">
        Save to My Pages
      </button>

      <p id="saveMessage" role="status"></p>

    </div>

    <div class="tool-box">

      <span class="eyebrow">EXPLORE ANOTHER PROMPT</span>

      <p id="extraPrompt">
        ${safeText(data.prompts[0])}
      </p>

      <button id="newPrompt">
        Give me another prompt
      </button>

    </div>

    ${data.id === "breathing" ? `

      <div class="tool-box">

        <span class="eyebrow">GENTLE PAUSE</span>

        <h3>One-minute breathing reminder</h3>

        <p>
          Sit comfortably and notice your natural breathing.
          There is no need to hold your breath or force a rhythm.
        </p>

        <p id="breathTimer">60 seconds</p>

        <button id="breathStart">Start gentle pause</button>

      </div>

    ` : ""}

    ${data.id === "planner" ? `

      <div class="tool-box">

        <span class="eyebrow">DAILY TASK LIST</span>

        <input
          id="taskInput"
          type="text"
          maxlength="150"
          placeholder="Add a task"
        >

        <button id="addTask">Add task</button>

        <ul id="taskList"></ul>

      </div>

    ` : ""}

    ${data.id === "gratitude" ? `

      <div class="tool-box">

        <span class="eyebrow">GRATITUDE JAR</span>

        <p>
          Add a small moment, person or experience to your jar.
        </p>

        <input
          id="jarInput"
          type="text"
          maxlength="300"
          placeholder="Something I appreciate..."
        >

        <button id="addJar">Add to my jar</button>

        <ul id="jarList"></ul>

      </div>

    ` : ""}

    ${data.id === "career" ? `

      <div class="tool-box">

        <span class="eyebrow">CAREER EXPLORATION</span>

        <h3>What interests you?</h3>

        <label for="careerInterest">Choose an interest</label>

        <select id="careerInterest">
          <option value="">Choose an area</option>
          <option value="healthcare">Healthcare and medicine</option>
          <option value="science">Science and research</option>
          <option value="humanitarian">Humanitarian work</option>
          <option value="creative">Creative fields</option>
          <option value="education">Education</option>
          <option value="law">Law and public service</option>
          <option value="environment">Environment</option>
          <option value="business">Business and finance</option>
        </select>

        <button id="careerExplore">Explore career ideas</button>

        <div id="careerResult"></div>

        <p class="small-note">
          This is an exploration tool, not a scientifically
          validated career assessment.
        </p>

      </div>

    ` : ""}

    ${data.id === "mood" ? `

      <div class="tool-box">

        <span class="eyebrow">MOOD CHECK-IN</span>

        <label for="moodChoice">Choose a word for today</label>

        <select id="moodChoice">
          <option>Calm</option>
          <option>Happy</option>
          <option>Excited</option>
          <option>Uncertain</option>
          <option>Frustrated</option>
          <option>Tired</option>
          <option>Sad</option>
          <option>Mixed feelings</option>
        </select>

        <p>
          There is no right or wrong answer.
          You do not need to explain a feeling if you don't want to.
        </p>

      </div>

    ` : ""}

    ${data.id === "sports" ? `

      <div class="tool-box">

        <span class="eyebrow">SPORTS EVENT RESEARCH</span>

        <h3>Research an event</h3>

        <label for="eventType">Sport or event type</label>

        <select id="eventType">
          <option>Marathon and running races</option>
          <option>Cycling competitions</option>
          <option>Swimming competitions</option>
          <option>Athletics</option>
          <option>School sports</option>
          <option>Other sporting events</option>
        </select>

        <label for="eventLocation">Location</label>

        <input
          id="eventLocation"
          type="text"
          placeholder="City, state or country"
        >

        <button id="searchEvent">
          Search event information
        </button>

        <div id="eventSearchResult"></div>

        <p class="small-note">
          Search results are research links, not verified
          live registration listings.
        </p>

      </div>

    ` : ""}

  `;


  // SAVE ENTRY

  document.getElementById("saveFeatureEntry")
    ?.addEventListener("click", () => {

      const title =
        document.getElementById("personalTitle").value.trim();

      const content =
        document.getElementById("personalEntry").value.trim();

      if (!content) {
        notify("Please write something before saving.");
        return;
      }

      const saved = readStorage(SAVED_KEY);

      saved.unshift({

        id: Date.now(),

        feature: data.name,

        featureId: data.id,

        title: title || "My reflection",

        content,

        date: new Date().toLocaleString()

      });

      writeStorage(SAVED_KEY, saved);

      document.getElementById("saveMessage").textContent =
        "Your entry has been saved in this browser.";

      notify("Entry saved.");

      renderSaved(data);

    });


  // PROMPT GENERATOR

  document.getElementById("newPrompt")
    ?.addEventListener("click", () => {

      const randomPrompt =
        data.prompts[Math.floor(Math.random() * data.prompts.length)];

      document.getElementById("extraPrompt").textContent =
        randomPrompt;

    });


  // BREATHING REMINDER

  let breathingInterval = null;

  document.getElementById("breathStart")
    ?.addEventListener("click", () => {

      if (breathingInterval) return;

      let seconds = 60;

      const timer = document.getElementById("breathTimer");

      const button = document.getElementById("breathStart");

      button.disabled = true;

      timer.textContent = `${seconds} seconds`;

      breathingInterval = setInterval(() => {

        seconds--;

        timer.textContent = `${seconds} seconds`;

        if (seconds <= 0) {

          clearInterval(breathingInterval);

          breathingInterval = null;

          timer.textContent = "Pause complete.";

          button.disabled = false;

        }

      }, 1000);

    });


  // DAY PLANNER TASKS

  const taskInput = document.getElementById("taskInput");

  document.getElementById("addTask")
    ?.addEventListener("click", () => {

      const value = taskInput.value.trim();

      if (!value) return;

      const li = document.createElement("li");

      const label = document.createElement("label");

      const checkbox = document.createElement("input");

      checkbox.type = "checkbox";

      const text = document.createTextNode(" " + value);

      label.append(checkbox, text);

      li.appendChild(label);

      document.getElementById("taskList").appendChild(li);

      taskInput.value = "";

    });


  // GRATITUDE JAR

  document.getElementById("addJar")
    ?.addEventListener("click", () => {

      const input = document.getElementById("jarInput");

      const value = input.value.trim();

      if (!value) return;

      const li = document.createElement("li");

      li.textContent = value;

      document.getElementById("jarList").appendChild(li);

      input.value = "";

    });


  // CAREER EXPLORATION

  const careerIdeas = {

    healthcare: [
      "Doctor",
      "Nurse",
      "Physiotherapist",
      "Public health professional",
      "Medical researcher"
    ],

    science: [
      "Research scientist",
      "Biologist",
      "Chemist",
      "Environmental scientist"
    ],

    humanitarian: [
      "Humanitarian medical professional",
      "Emergency response professional",
      "Human rights specialist",
      "Aid programme professional"
    ],

    creative: [
      "Writer",
      "Graphic designer",
      "Photographer",
      "Filmmaker"
    ],

    education: [
      "Teacher",
      "Education researcher",
      "Academic counsellor"
    ],

    law: [
      "Lawyer",
      "Legal researcher",
      "Public service professional"
    ],

    environment: [
      "Environmental researcher",
      "Conservation professional",
      "Climate specialist"
    ],

    business: [
      "Accountant",
      "Financial analyst",
      "Entrepreneur",
      "Business manager"
    ]

  };

  document.getElementById("careerExplore")
    ?.addEventListener("click", () => {

      const interest =
        document.getElementById("careerInterest").value;

      const result =
        document.getElementById("careerResult");

      if (!interest) {
        result.textContent = "Choose an interest first.";
        return;
      }

      result.innerHTML = `
        <h3>Career ideas to investigate</h3>
        <ul>
          ${careerIdeas[interest].map(item =>
            `<li>${safeText(item)}</li>`
          ).join("")}
        </ul>
        <p>
          Research the relevant degrees, entrance
          requirements, professional recognition and
          employment pathways before choosing a course.
        </p>
      `;

    });


  // SPORTS EVENT RESEARCH

  document.getElementById("searchEvent")
    ?.addEventListener("click", () => {

      const type = document.getElementById("eventType").value;

      const location =
        document.getElementById("eventLocation").value.trim();

      if (!location) {
        notify("Enter a location to research.");
        return;
      }

      const query = encodeURIComponent(`${type} events ${location}`);

      const url = `https://www.google.com/search?q=${query}`;

      const result =
        document.getElementById("eventSearchResult");

      result.innerHTML = `
        <p>
          Search for ${safeText(type)} in
          ${safeText(location)}.
        </p>
        <a href="${url}" target="_blank" rel="noopener">
          Open event research results ↗
        </a>
      `;

    });

}


// 10. VIDEO TUTORIAL LINKS
//
// These links open YouTube search results for relevant
// tutorial topics. They are not claimed to be individually
// verified videos or embedded playback.

function renderVideos(data) {

  const container = document.getElementById("videoContent");

  container.innerHTML = data.videos.map((video, index) => {

    const url =
      "https://www.youtube.com/results?search_query=" +
      encodeURIComponent(video);

    return `

      <article class="video-card">

        <span class="eyebrow">
          VIDEO GUIDE ${index + 1}
        </span>

        <h3>${safeText(video)}</h3>

        <p>
          Explore tutorials and demonstrations related
          to this topic.
        </p>

        <a href="${url}" target="_blank" rel="noopener">
          Find tutorial videos ↗
        </a>

      </article>

    `;

  }).join("");

}


// 11. EXTERNAL RESOURCES

function renderResources(data) {

  const container = document.getElementById("resourceContent");

  container.innerHTML = data.resources.map(resource => `

    <article class="saved-entry">

      <h3>${safeText(resource.name)}</h3>

      <a href="${safeText(resource.url)}"
         target="_blank"
         rel="noopener">
        Visit resource ↗
      </a>

    </article>

  `).join("");

}


// 12. SAVE AND DISPLAY PERSONAL PAGES

function renderSaved(data) {

  const container = document.getElementById("featureSavedPages");

  const saved = readStorage(SAVED_KEY).filter(item =>
    item.featureId === data.id
  );

  if (!saved.length) {

    container.innerHTML = `
      <p>
        No entries saved in this feature yet.
        Your saved entries will appear here.
      </p>
    `;

    return;

  }

  container.innerHTML = saved.map(item => `

    <article class="saved-entry">

      <h3>${safeText(item.title)}</h3>

      <p>${safeText(item.content)}</p>

      <small>${safeText(item.date)}</small>

    </article>

  `).join("");

}


// 13. PROGRESS TRACKING

function updateProgress(id, checked) {

  const progress = readStorage(PROGRESS_KEY);

  const current = progress.find(item => item.id === id);

  if (current) {

    current.completed = Math.max(
      0,
      current.completed + (checked ? 1 : -1)
    );

  } else if (checked) {

    progress.push({
      id,
      completed: 1
    });

  }

  writeStorage(PROGRESS_KEY, progress);

}


function renderProgress(data) {

  const container = document.getElementById("progressContent");

  const progress = readStorage(PROGRESS_KEY);

  const current = progress.find(item => item.id === data.id);

  const completed = current ? current.completed : 0;

  const total = data.activities.length;

  const percentage = Math.round((completed / total) * 100);

  container.innerHTML = `

    <h3>${completed} of ${total} activities explored</h3>

    <div style="
      width:100%;
      height:12px;
      border-radius:20px;
      background:rgba(255,255,255,.12);
      overflow:hidden;
      margin:20px 0;
    ">

      <div style="
        width:${percentage}%;
        height:100%;
        background:#E8D5B5;
        transition:width .3s;
      "></div>

    </div>

    <p>${percentage}% of activities marked as explored.</p>

    <p>
      Progress is a personal record, not a competition.
    </p>

  `;

}


// 14. INITIALISE

console.info(
  "To the Ether feature engine loaded:",
  Object.keys(FEATURE_DATA).length,
  "feature experiences."
);
