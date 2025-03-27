document.addEventListener("DOMContentLoaded", function () {
    // Partner 1 Answer Submission
    if (document.getElementById("partner1Form")) {
        document.getElementById("partner1Form").addEventListener("submit", function (event) {
            event.preventDefault();
            localStorage.setItem("name1", document.getElementById("name1").value);
            localStorage.setItem("zodiac1", document.getElementById("zodiac1").value);
            window.location.href = "partner2.html";
        });
    }

    // Partner 2 Answer Submission
    if (document.getElementById("partner2Form")) {
        document.getElementById("partner2Form").addEventListener("submit", function (event) {
            event.preventDefault();
            localStorage.setItem("name2", document.getElementById("name2").value);
            localStorage.setItem("zodiac2", document.getElementById("zodiac2").value);
            window.location.href = "questions.html";
        });
    }

    // Display Questions for Partner 1
    if (document.getElementById("questionsContainer")) {
        const questions = [
           ];

        localStorage.setItem("questions", JSON.stringify(questions)); // Store questions for Partner 2

        const questionsContainer = document.getElementById("questionsContainer");

        questions.forEach((q, index) => {
            let div = document.createElement("div");
            let optionsHTML = q.options.map(option => `<option value="${option}">${option}</option>`).join("");

            div.innerHTML = `
                <label>${q.question}</label>
                <select id="answer${index}" required>
                    <option value="" disabled selected>Select an option</option>
                    ${optionsHTML}
                </select>
            `;
            questionsContainer.appendChild(div);
        });

        // Save Partner 1's Answers & Redirect
        document.getElementById("questionsForm").addEventListener("submit", function (event) {
            event.preventDefault();
            let answers = [];

            questions.forEach((_, index) => {
                let answer = document.getElementById(`answer${index}`).value;
                answers.push(answer || "No Answer");
            });

            localStorage.setItem("partner1Answers", JSON.stringify(answers));
            window.location.href = "questions2.html";
        });
    }

    // Display Questions for Partner 2
    if (document.getElementById("questionsContainer2")) {
        const questionsContainer2 = document.getElementById("questionsContainer2");
        const questions = JSON.parse(localStorage.getItem("questions")) || [];

        questions.forEach((q, index) => {
            let div = document.createElement("div");
            let optionsHTML = q.options.map(option => `<option value="${option}">${option}</option>`).join("");

            div.innerHTML = `
                <label>${q.question}</label>
                <select id="p2q${index}" required>
                    <option value="" disabled selected>Select an option</option>
                    ${optionsHTML}
                </select>
            `;
            questionsContainer2.appendChild(div);
        });

        // Save Partner 2's Answers & Redirect
        document.getElementById("questionsForm2").addEventListener("submit", function (event) {
            event.preventDefault();
            let answers = [];

            questions.forEach((_, index) => {
                let answer = document.getElementById(`p2q${index}`).value;
                answers.push(answer || "No Answer");
            });

            localStorage.setItem("partner2Answers", JSON.stringify(answers));
            window.location.href = "results.html";
        });
    }

    // Display Love Score & Play Music
    if (document.getElementById("resultText")) {
        let name1 = localStorage.getItem("name1");
        let name2 = localStorage.getItem("name2");
    }
});

        function calculatePersonalityScore(answer1, answer2) {
            let similarityGroups = {
                // 🧑‍🤝‍🧑 Social & Interaction Style
                "Introvert": ["Ambivert", "Reserved", "Quiet", "Thoughtful", "Reflective", "Deep Thinker"],
                "Extrovert": ["Ambivert", "Outgoing", "Energetic", "Social", "Talkative", "Loud"],
                "Ambivert": ["Introvert", "Extrovert", "Balanced", "Adaptive", "Flexible"],
        
                // 🌙 Sleeping & Energy Levels
                "Night Owl": ["Flexible", "Late Sleeper", "Nocturnal", "Loves Late Nights"],
                "Early Bird": ["Flexible", "Disciplined", "Morning Person", "Rises Early", "Sunrise Lover"],
                "Flexible": ["Night Owl", "Early Bird", "Adaptable", "Can Do Both"],
        
                // 🧠 Thinking, Emotional & Decision-Making Style
                "Logical": ["Practical", "Analytical", "Rational", "Problem Solver", "Strategic"],
                "Practical": ["Logical", "Realistic", "Down-to-Earth", "Common Sense", "Realist"],
                "Emotional": ["Romantic", "Empathetic", "Sensitive", "Intuitive", "Compassionate"],
                "Romantic": ["Emotional", "Idealistic", "Affectionate", "Love-Driven"],
                "Balanced Thinker": ["Logical", "Emotional", "Rational", "Open-minded", "Adaptive"],
        
                // 🏡 Independence vs Dependency
                "Independent": ["Self-sufficient", "Confident", "Self-reliant", "Solo Thinker"],
                "Dependent": ["Emotional", "Support-Seeking", "Needing Reassurance", "Clingy"],
        
                // 🎭 Planning & Spontaneity
                "Spontaneous": ["Adventurous", "Impulsive", "Free-Spirited", "Go-with-the-flow"],
                "Adventurous": ["Spontaneous", "Outgoing", "Risk-Taker", "Thrill-Seeker", "Explorative"],
                "Planner": ["Organized", "Disciplined", "Structured", "Detail-Oriented", "Prepares Ahead"],
                "Organized": ["Planner", "Meticulous", "Careful", "Methodical", "Schedule-Lover"],
        
                // 🌞 Optimism vs Realism
                "Optimistic": ["Positive", "Hopeful", "Glass-half-full", "Cheerful", "Dreamer"],
                "Pessimistic": ["Realistic", "Cautious", "Worrier", "Skeptical", "Doubtful"],
                "Realistic": ["Balanced", "Grounded", "Rational", "Not Too Positive or Negative"],
        
                // 🎨 Creativity & Imagination
                "Creative": ["Artistic", "Imaginative", "Innovative", "Visionary", "Idea-Driven"],
                "Logical Thinker": ["Problem Solver", "Critical Thinker", "Strategic", "Analytical"],
        
                // 💖 Love Languages
                "Words of Affirmation": ["Verbal Reassurance", "Encouraging Words", "Love Through Speech"],
                "Physical Touch": ["Hugging", "Cuddling", "Close Proximity", "Comforting Touch"],
                "Quality Time": ["Spending Time", "Focused Attention", "Deep Conversations"],
                "Acts of Service": ["Doing Things for Partner", "Helping", "Caring Through Actions"],
                "Gift Giving": ["Surprising Partner", "Thoughtful Gifts", "Material Expressions of Love"],
        
                // ❤️ Relationship Expectations
                "Passionate Love": ["Romantic", "Fiery", "Strong Emotions", "Intense Love"],
                "Companionate Love": ["Deep Bond", "Emotional Security", "Comfortable Love"],
                "Slow-Building Love": ["Takes Time", "Steady", "Not Rushed Into Love"],
        
                // 🧘 Temperament & Emotional Stability
                "Calm": ["Easygoing", "Relaxed", "Patient", "Chill", "Level-headed"],
                "Energetic": ["Lively", "Hyperactive", "Excitable", "Always Moving", "Full of Energy"],
        
                // 🧠 Attachment Styles
                "Secure": ["Trusting", "Open", "Comfortable with Love", "Emotionally Stable"],
                "Anxious": ["Clingy", "Seeks Reassurance", "Worries About Love", "Emotional"],
                "Avoidant": ["Independent", "Detached", "Dislikes Emotional Closeness"],
                "Fearful-Avoidant": ["Conflicted", "Wants Love But Scared of It"],
        
                // 🎶 Music Taste Compatibility
                "Romantic Songs": ["Bollywood Love Songs", "Love Ballads", "Soft Music"],
                "Upbeat Pop": ["Energetic", "Dancing Songs", "Fun Music"],
                "Rock & Alternative": ["Deep Meaningful Songs", "Emotional Rock", "Soulful Music"],
                "Classical & Calm": ["Relaxing", "Soft & Gentle", "Peaceful Music"]
            };
                
            function fuzzyMatch(a, b) {
                a = a.toLowerCase();
                b = b.toLowerCase();
                return a.includes(b) || b.includes(a);
            }
        
            if (answer1 === answer2) return 5;

          // Fuzzy Matching for slight variations
    for (let key in similarityGroups) {
        if (fuzzyMatch(answer1, key)) {
            for (let similar of similarityGroups[key]) {
                if (fuzzyMatch(answer2, similar)) return 4;
            }
        }
        if (fuzzyMatch(answer2, key)) {
            for (let similar of similarityGroups[key]) {
                if (fuzzyMatch(answer1, similar)) return 4;
            }
        }
    }
            return 2;
        }
        
        function analyzeResponse(answer) {
            answer = answer.toLowerCase();

        // 🗣️ Communication & Conflict Resolution  
    if (answer.includes("talk") || answer.includes("communicate") || answer.includes("resolve") || 
    answer.includes("discussion") || answer.includes("understand") || answer.includes("listen") || 
    answer.includes("express feelings") || answer.includes("honest conversation")) {
    return 10; // ✅ Excellent communication skills
} 

     if (answer.includes("space") || answer.includes("think before reacting") || 
    answer.includes("cool down") || answer.includes("take a break") || answer.includes("process emotions") || 
    answer.includes("reflect before responding")) {
    return 8; // 🟡 Healthy emotional regulation
}

     if (answer.includes("compromise") || answer.includes("meet halfway") || answer.includes("find balance") || 
    answer.includes("work together") || answer.includes("understand both sides")) {
    return 9; // 🔵 Strong ability to maintain relationship harmony
}

     if (answer.includes("ignore") || answer.includes("avoid") || answer.includes("walk away") || 
    answer.includes("silent treatment") || answer.includes("don't talk") || 
    answer.includes("leave things unresolved")) {
    return 3; // ❌ Avoidant behavior, struggles with communication
}

     if (answer.includes("yell") || answer.includes("shout") || answer.includes("argue aggressively") || 
    answer.includes("fight back") || answer.includes("lash out") || 
    answer.includes("raise voice")) {
    return 2; // ❗ Negative conflict response, needs improvement
}

// ❤️ Relationship Expectations & Emotional Needs
     if (answer.includes("support") || answer.includes("reassure") || answer.includes("be there") || 
    answer.includes("comfort") || answer.includes("understand feelings") || 
    answer.includes("emotionally available") || answer.includes("be a rock for them")) {
    return 9; // ✅ Emotionally supportive partner
}

      if (answer.includes("independent") || answer.includes("handle alone") || answer.includes("don't need help") || 
    answer.includes("self-reliant") || answer.includes("figure things out on my own")) {
    return 6; // 🟡 Prefers independence but might struggle with emotional openness
}

     if (answer.includes("need attention") || answer.includes("validation") || 
    answer.includes("love reassurance") || answer.includes("appreciation") || 
    answer.includes("affection")) {
    return 7; // 🟢 Values emotional closeness and security
}

// 💕 Love Language & Emotional Expression
     if (answer.includes("show love") || answer.includes("express feelings") || 
    answer.includes("make them feel special") || answer.includes("little gestures") || 
    answer.includes("romantic surprises") || answer.includes("acts of service") || 
    answer.includes("doing things for my partner")) {
    return 10; // ❤️ Very affectionate and expressive partner
}

     if (answer.includes("struggle with emotions") || answer.includes("hard to express") || 
    answer.includes("not good with feelings") || answer.includes("not comfortable sharing")) {
    return 4; // 🟠 Needs some improvement in emotional openness
}

// 💑 Commitment & Long-Term Relationship View
      if (answer.includes("serious relationship") || answer.includes("long-term commitment") || 
    answer.includes("forever love") || answer.includes("build a future") || 
    answer.includes("marriage")) {
    return 10; // 💍 Strong commitment mindset
}

      if (answer.includes("see where it goes") || answer.includes("not rush things") || 
    answer.includes("take it slow") || answer.includes("explore feelings")) {
    return 7; // 🟡 Prefers gradual relationship development
}

     if (answer.includes("don't believe in commitment") || answer.includes("avoid relationships") || 
    answer.includes("not ready for long-term")) {
    return 3; // ❌ Not suited for deep, committed relationships

}

// 🌍 Lifestyle & Compatibility
      if (answer.includes("adventurous") || answer.includes("love to travel") || 
    answer.includes("explore new places") || answer.includes("spontaneous plans")) {
    return 9; // 🌍 Loves adventure and excitement
}

      if (answer.includes("homebody") || answer.includes("stay in") || 
    answer.includes("love cozy nights") || answer.includes("introverted dates")) {
    return 9; // 🏡 Prefers quiet, intimate moments
}

     if (answer.includes("balanced") || answer.includes("a bit of both") || 
    answer.includes("sometimes adventurous, sometimes chill")) {
    return 8; // 🎭 Adaptable lifestyle preferences
}

// 🔥 Passion & Romantic Chemistry
     if (answer.includes("strong attraction") || answer.includes("intense chemistry") || 
    answer.includes("passionate love") || answer.includes("love deeply")) {
    return 10; // 🔥 Very passionate lover
}

     if (answer.includes("slowly develop feelings") || answer.includes("takes time to love") || 
    answer.includes("gradual connection") || answer.includes("friendship first")) {
    return 7; // 💖 Romantic but at a slower pace
}

     if (answer.includes(["casual dating"]) || answer.includes("not intense feelings") || 
    answer.includes("not very emotional")) {
    return 4; // 🟠 Not highly romantic, but still capable of love
}

// 🔁 Handling Change & Adaptability
      if (answer.includes("go with the flow") || answer.includes("adapt easily") || 
    answer.includes("embrace change") || answer.includes("not afraid of new experiences")) {
    return 9; // 🔄 Very adaptable and open-minded
}

      if (answer.includes("like stability") || answer.includes("prefer routine") || 
    answer.includes("dislike sudden changes") || answer.includes("want things planned")) {
    return 7; // 🔵 Prefers stability, but can adapt
}

      if (answer.includes("struggle with change") || answer.includes("dislike surprises") || 
    answer.includes("prefer things the way they are")) {
    return 4; // 🟠 Needs consistency in life

}

// 👫 Trust & Loyalty in Relationships
      if (answer.includes("loyal") || answer.includes("faithful") || 
    answer.includes("trustworthy") || answer.includes("stand by my partner")) {
    return 10; // 🔒 Highly loyal and trustworthy
}

      if (answer.includes("jealous") || answer.includes("hard to trust") || 
    answer.includes("paranoid in love")) {
    return 5; // ⚠️ Trust issues present, needs reassurance
}

     if (answer.includes("not a big deal") || answer.includes("open to casual relationships") || 
    answer.includes("don’t believe in strict commitment")) {
    return 4; // ❗ Might not be fully committed in a relationship

}
      return 6; // Neutral score for unknown responses
        }

        // Love Language Compatibility Check
        function checkLoveLanguageMatch(loveLang1, loveLang2) {
            let loveLanguages = {
                "Words of Affirmation": [
                    "Verbal Praise", "Encouraging Words", "Compliments", "Sweet Texts",
                    "Reassuring Messages", "Love Letters", "I Love You Often", "Meaningful Conversations",
                    "Daily Check-ins", "Deep Emotional Words", "Morning & Night Messages"
                ],
                "Acts of Service": [
                    "Helping Partner", "Doing Things for Love", "Supportive Actions", "Making Life Easier",
                    "Cooking for Partner", "Fixing Things", "Acts of Kindness", "Caring Through Actions",
                    "Remembering Small Details", "Helping with Chores", "Driving Them Places"
                ],
                "Receiving Gifts": [
                    "Surprises", "Thoughtful Presents", "Symbolic Gifts", "Small Thoughtful Gestures",
                    "Handwritten Notes", "Flowers & Chocolates", "Custom-Made Gifts", "Memorable Souvenirs",
                    "Personalized Jewelry", "DIY Handmade Gifts", "Gift Giving on Random Days"
                ],
                "Quality Time": [
                    "Deep Conversations", "One-on-One Time", "Undivided Attention", "Being Present",
                    "Enjoying Shared Moments", "Traveling Together", "Watching Movies Together",
                    "Spending Meaningful Time", "Late-Night Talks", "Cooking Together", "Exploring New Places"
                ],
                "Physical Touch": [
                    "Hugs", "Cuddling", "Holding Hands", "Touch-Based Affection",
                    "Kisses", "Massage & Comforting Touch", "Physical Closeness", "Back Rubs & Snuggles",
                    "Running Fingers Through Hair", "Casual Touch in Public", "Sitting Close"
                ],
            
                // 👫 Emotional Connection & Expression Styles
                "Passionate Love": [
                    "Intense Emotions", "Deep Connection", "Strong Feelings", "Romantic Gestures",
                    "Expressive Affection", "Physical Attraction", "Fire & Chemistry", "Love at First Sight",
                    "Flirtatious Energy", "Can’t Keep Hands Off", "Always Excited Around Partner"
                ],
                "Companionate Love": [
                    "Steady Love", "Best Friends First", "Emotional Security", "Long-Term Stability",
                    "Comfortable Love", "Deep Bond", "Trust Over Passion", "Life Partner Energy",
                    "Feels Like Home", "Loyalty-Based Relationship", "Unbreakable Friendship"
                ],
                "Slow-Building Love": [
                    "Takes Time", "Develops Gradually", "Gets Stronger Over Time", "Not Rushed Into Love",
                    "Friendship Before Love", "Slow & Steady Feelings", "Trust Comes First",
                    "Deep Emotional Layers", "Needs Comfort to Open Up"
                ],
            
                // 🎭 Relationship & Communication Styles
                "Open": [
                    "Honest", "Expressive", "Direct", "Transparent",
                    "Shares Thoughts Freely", "Loves Deep Talks", "Emotionally Available",
                    "Never Hides Feelings", "Values Open Discussions"
                ],
                "Reserved": [
                    "Private", "Introverted", "Cautious", "Holds Back",
                    "Takes Time to Open Up", "Prefers Deep Over Frequent Conversations",
                    "Thinks Before Speaking", "Observant Before Sharing"
                ],
                "Supportive": [
                    "Encouraging", "Empathetic", "Understanding", "Good Listener",
                    "Emotionally Available", "Always There for Partner", "Nurturing",
                    "Knows When You Need Comfort", "Always Cheering for You"
                ],
                "Logical": [
                    "Analytical", "Rational", "Fact-Based", "Debater",
                    "Thinks Before Reacting", "Problem Solver", "Objective in Love",
                    "Practical & Realistic", "Seeks Reason Over Emotion"
                ],
            
                // 🔥 Trust & Emotional Stability
                "Loyal": [
                    "Faithful", "Committed", "Trustworthy", "Stands by Partner",
                    "Honest & Devoted", "Believes in Forever Love", "Won’t Betray",
                    "Never Lies", "Values Deep Trust"
                ],
                "Independent": [
                    "Self-Sufficient", "Confident", "Needs Personal Space", "Enjoys Alone Time",
                    "Not Clingy", "Thrives Alone & in a Relationship", "Values Freedom",
                    "Doesn’t Rely on Constant Attention"
                ],
                "Emotional": [
                    "Sensitive", "Expressive", "Feels Deeply", "Empathetic",
                    "Compassionate", "Easily Affected by Partner's Mood", "Wears Heart on Sleeve",
                    "Loves Deeply & Intensely", "Cries During Romantic Movies"
                ],
            
                // 🎭 Humor & Fun Preferences
                "Sarcastic": [
                    "Witty", "Playful", "Teasing", "Clever Jokes",
                    "Irony-Driven Humor", "Loves Friendly Banter", "Dry Humor Specialist",
                    "Loves Debating for Fun", "Playfully Mocks Partner"
                ],
                "Goofy": [
                    "Silly", "Fun-loving", "Lighthearted", "Carefree",
                    "Loves Laughing", "Jokes All the Time", "Finds Joy in the Simple Things",
                    "Random Funny Dances", "Always Smiling"
                ],
                "Dark Humor": [
                    "Edgy", "Cynical", "Irony-Based Humor", "Morbid Jokes",
                    "Finds Humor in the Dark Side", "Loves Twisted Jokes",
                    "Laughs at Inappropriate Moments"
                ],
            
                // 🎶 Music Taste Compatibility
                "Romantic Songs": [
                    "Bollywood Love Songs", "Love Ballads", "Soft Music",
                    "Slow & Meaningful Songs", "Loves Deep Lyrics", "Emotionally Attached to Songs",
                    "Sends Love Songs", "Creates Romantic Playlists"
                ],
                "Upbeat Pop": [
                    "Energetic", "Dancing Songs", "Feel-Good Music",
                    "Happy Vibes", "Loves Singing Along", "Loves Catchy Beats",
                    "Karaoke Enthusiast", "Dances in the Car"
                ],
                "Rock & Alternative": [
                    "Deep Meaningful Songs", "Soulful Rock", "Expressive Lyrics",
                    "Emotional Rock", "Guitar-Driven Music", "Loves Intense Melodies",
                    "Feels Music on a Spiritual Level"
                ],
                "Classical & Calm": [
                    "Relaxing", "Soft & Gentle", "Peaceful Music",
                    "Instrumentals", "Loves Background Music", "Enjoys Soothing Melodies",
                    "Appreciates Timeless Classics"
                ],
            
                // 🌟 Optimism vs Realism
                "Optimistic": [
                    "Positive", "Hopeful", "Dreamer", "Glass-Half-Full",
                    "Believes in Good Outcomes", "Always Sees the Bright Side",
                    "Loves Fairy Tale Romances"
                ],
                "Pessimistic": [
                    "Realistic", "Cautious", "Skeptical", "Glass-Half-Empty",
                    "Practical Mindset", "Thinks of Worst-Case Scenarios",
                    "Doesn’t Believe in Happy Endings"
                ],
                "Realistic": [
                    "Balanced", "Grounded", "Sees Both Positives & Negatives",
                    "Logical Thinker", "Pragmatic Approach to Life & Love",
                    "Believes Love is Built, Not Found"
                ],
            
                // 🔥 Planning vs Spontaneity
                "Spontaneous": [
                    "Adventurous", "Impulsive", "Free-Spirited", "Go-With-The-Flow",
                    "Loves Surprises", "Takes Life as It Comes", "Always Up for Something New",
                    "Never Plans, Just Does"
                ],
                "Planner": [
                    "Organized", "Disciplined", "Schedules Everything", "Detail-Oriented",
                    "Likes Predictability", "Always Plans Dates & Trips in Advance",
                    "Makes Lists for Everything"
                ]
            };
            if(loveLang1 === loveLang2) return 5;  
            if (loveLanguages[loveLang1]?.includes(loveLang2) || loveLanguages[loveLang2]?.includes(loveLang1)) return 4;  
        
            for (let key in loveLanguages) {
                if (fuzzyMatch(loveLang1, key)) {
                    for (let similar of loveLanguages[key]) {
                        if (fuzzyMatch(loveLang2, similar)) return 4;
                    }
                }
                if (fuzzyMatch(loveLang2, key)) {
                    for (let similar of loveLanguages[key]) {
                        if (fuzzyMatch(loveLang1, similar)) return 4;
                    }
                }
            }
        
            return 2;  
        }
          
        // Relationship Strength Calculation
        function calculateRelationshipStrength(
            emotionalBond, trust, communication, compatibility, intimacy, stability, 
            adaptability, fun, independence, longTermVision, support, financialCompatibility,
            socialCompatibility, conflictManagement, effort, spontaneity, romanticGestures, ambitionUnderstanding) {
            
            return (emotionalBond * 0.10) + (trust * 0.10) + (communication * 0.09) + 
                   (compatibility * 0.09) + (intimacy * 0.08) + (stability * 0.08) + 
                   (adaptability * 0.07) + (fun * 0.06) + (independence * 0.05) + 
                   (longTermVision * 0.05) + (support * 0.05) + (financialCompatibility * 0.04) +
                   (socialCompatibility * 0.04) +  (conflictManagement * 0.04) + (effort * 0.04) + (spontaneity * 0.03) + 
                   (romanticGestures * 0.03) + (ambitionUnderstanding * 0.03);
        }
let personalityScore = calculatePersonalityScore(); // Compare answers and assign score
let relationshipScore = calculateRelationshipStrength( 9, 10, 8, 9, 8, 9, 7, 10, 7, 10, 9, 8, 6, 9, 10, 8, 9, 8);
let loveLang1 = localStorage.getItem("loveLang1") || "";
let loveLang2 = localStorage.getItem("loveLang2") || "";
let zodiac1 = localStorage.getItem("zodiac1");
let zodiac2 = localStorage.getItem("zodiac2");

let finalScore = calculateTotalScore(personalityScore, relationshipScore, zodiac1, zodiac2, loveLang1, loveLang2);
 

        // Final Score Calculation
   
function calculateTotalScore(personalityScore, relationshipScore, zodiac1, zodiac2, loveLang1, loveLang2) {
    let valuesScore = relationshipScore * 0.25;
    let zodiacBonus = calculateZodiacCompatibility(localStorage.getItem("zodiac1"), localStorage.getItem("zodiac2"));
    let loveLanguageScore = checkLoveLanguageMatch(loveLang1, loveLang2) * 0.2;
   // Calculate total compatibility score with appropriate weights
    let finalScore = Math.round(personalityScore * 0.35 + valuesScore + zodiacBonus*0.3 + loveLanguageScore);

// Ensure the score does not exceed 100
     if (finalScore > 100) finalScore = 100;
     return finalScore;
}
// Display Result
document.getElementById("resultText").innerHTML = 
    `<strong>${name1} ❤️ ${name2}, your score is ${finalScore}%!</strong>`;

    function getLoveInsight(score) {
    if (score >= 95) {
        return "❤️🔥 You both are a perfect match! Your love and understanding are deep and unbreakable. Keep cherishing each other!";
    } else if (score >= 80) {
        return "💖🔮 Your bond is strong and filled with love! A little more effort in communication will make it even more magical.";
    } else if (score >= 75) {
        return "💞✨ You have a good connection, but there's room for growth. Work on understanding each other better!";
    } else if (score >= 60) {
        return "💕💫A promising bond, but challenges exist. Work on understanding each other better, and your love will shine even brighter";
    }else if (score >= 35) {
        return "🤔💬 There are significant differences in your personalities, but love is all about effort. If you both are willing to grow together, anything is possible.";
    } else if (score >= 28) {
        return "💔✨Your love needs some nurturing. Focus on building trust, communication, and shared interests!";
    } else {
        return "💔 Love is a journey, and yours needs more effort. Talk openly, understand each other, and let love grow!";
    }
}

// Example score
let InsightMessage = getLoveInsight(finalScore);
let scoreElement = document.getElementById("loveScore");
if (scoreElement) {
    scoreElement.innerText = `💖 Your Love Score: ${finalScore}%`;
}

// Get the insight message based on score
let insightMessage = getLoveInsight(finalScore);

// Ensure the result text element exists before setting text
let resultTextElement = document.getElementById("loveScore");
if (resultTextElement) {
    resultTextElement.innerText = insightMessage;
} else {
    console.error("Error: 'resultText' element not found.");
}

        let loveSong = document.getElementById("loveSong");

        if (finalScore >= 90) {
            loveSong.src = "song1.mp3"; 
        } else if (finalScore >= 80) {
            loveSong.src = "song2.mp3";  
        } else if (finalScore >= 75) {
            loveSong.src = "song3.mp3";  
        } else if (finalScore >= 60) {
            loveSong.src = "song4.mp3"; 
        } else if (finalScore >= 60) {
             loveSong.src = "song5.mp3"; 
        } else if (finalScore >= 35) {
            loveSong.src = "song6.mp3";
        } else if (finalScore >=28) {
            loveSong.src = "song7.mp3";   
        } else {
            loveSong.src = "song8.mp3";  
        }

        loveSong.play();

        if (finalScore >= 75) {
            startConfetti();
        }

        document.getElementById("loveScore").classList.add("heartbeat");
    


// Start Confetti for High Scores
    function startConfetti() {
        confetti({
            particleCount: 700,
            spread: 200,
            origin: { y: 0.3 }
        });
       var count = 1000;
var defaults = {
  origin: { y: 0.7 }
};

function fire(particleRatio, opts) {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio)
  });
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});
fire(0.2, {
  spread: 60,
});
fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8
});
fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2
});
fire(0.1, {
  spread: 120,
  startVelocity: 45,
}); 
    }    

    
// Zodiac Compatibility Calculation
function calculateZodiacCompatibility(sign1, sign2) {
    const perfectMatches = {
        "Aries": ["Leo", "Sagittarius", "Libra", "Cancer"],
        "Taurus": ["Virgo", "Capricorn", "Pisces", "Leo"],
        "Gemini": ["Libra", "Aquarius", "Aries", "Virgo"],
        "Cancer": ["Scorpio", "Pisces", "Taurus", "Gemini"],
        "Leo": ["Aries", "Sagittarius", "Gemini", "Taurus"],
        "Virgo": ["Taurus", "Capricorn", "Scorpio", "Gemini"],
        "Libra": ["Gemini", "Aquarius", "Leo", "Cancer"],
        "Scorpio": ["Cancer", "Pisces", "Capricorn", "Aries"],
        "Sagittarius": ["Aries", "Leo", "Aquarius", "Virgo"],
        "Capricorn": ["Taurus", "Virgo", "Scorpio", "Sagittarius"],
        "Aquarius": ["Gemini", "Libra", "Sagittarius", "Capricorn"],
        "Pisces": ["Cancer", "Scorpio", "Taurus", "Libra"]
    };

    const balancingPairs = {
        "Aries": ["Capricorn", "Scorpio"],  // Fire & Earth = Stability
        "Taurus": ["Libra", "Sagittarius"], // Earth & Air = Communication balance
        "Gemini": ["Pisces", "Cancer"],     // Air & Water = Emotional balance
        "Cancer": ["Leo", "Aquarius"],      // Water & Fire = Passion vs Nurturing
        "Leo": ["Virgo", "Pisces"],         // Fire & Earth = Strength + Softness
        "Virgo": ["Aries", "Aquarius"],     // Earth & Fire = Practicality vs Energy
        "Libra": ["Taurus", "Scorpio"],     // Air & Earth = Stability with Fun
        "Scorpio": ["Leo", "Gemini"],       // Water & Fire = Deep Passion
        "Sagittarius": ["Capricorn", "Taurus"], // Fire & Earth = Adventure vs Security
        "Capricorn": ["Cancer", "Libra"],   // Earth & Water = Stability vs Emotional
        "Aquarius": ["Scorpio", "Taurus"],  // Air & Water = Intellectual Depth
        "Pisces": ["Gemini", "Leo"]         // Water & Air = Dreamy vs Logic
    };

    if (perfectMatches[sign1]?.includes(sign2)) {
        return 30; // Perfect match
    } else if (balancingPairs[sign1]?.includes(sign2)) {
        return 20; // Balanced match
    } else if (sign1.charAt(0) === sign2.charAt(0)) {
        return 15; // Same element (Fire, Earth, Air, Water)
    }
    return 10; // Different signs, but love is possible!
}
function createHeart() {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    document.body.appendChild(heart);

    const leftPosition = Math.random() * window.innerWidth;
    heart.style.left = `${leftPosition}px`;

    setTimeout(() => {
        heart.remove();
    }, 4000);
}

setInterval(createHeart, 500);

document.addEventListener("DOMContentLoaded", function () {
    let tryAgainBtn = document.getElementById("tryAgainBtn");

    if (tryAgainBtn) {
        tryAgainBtn.addEventListener("click", function () {
            console.log("Try Again button clicked!"); // Debugging
            window.location.href = "index.html"; // Redirect to the main quiz page
        });
    } else {
        console.error("Try Again button not found!");
    }
});
