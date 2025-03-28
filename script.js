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
                answers.push(answer || "NoAnswer");
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
                answers.push(answer || "NoAnswer");
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
document.addEventListener("DOMContentLoaded", function () {
    // Define all 30 questions with answer options and weights for each option
    const questions = [
        {
            question: "What type of compliments make you feel most appreciated?",
            options: ["Words of affirmation", "Acts of service", "Quality time"],
            weights: [10, 9, 8], category: "Love Languages"
        },
        {
            question: "What types of gifts do you appreciate most?",
            options: ["Practical Gifts", "Sentimental Gifts", "Surprise Gifts"],
            weights: [7, 10, 9], category: "Love Languages"
        },
        {
            question: "How do you express love to your partner?",
            options: ["Verbal expressions", "Doing things for them", "Giving gifts"],
            weights: [10, 7, 5], category: "Love Languages"
        },
        {
            question: "What is your Sleeping or Energy Level?",
            options: ["Early Bird", "Night owl", "Flexible"],
            weights: [8, 8, 10], category: "Lifestyle"
        },
        {
            question: "What’s your ideal way to spend time together?",
            options: ["Deep conversations", "Staying at home", "Adventuring together", "Traveling"],
            weights: [10, 8, 8, 8], category: "Lifestyle"
        },
        {
            question: "What does love mean to you in a relationship?",
            options: ["Trust & loyalty", "Passion & excitement", "Understanding & care"],
            weights: [10, 8, 9], category: "Core Compatibility"
        },
        {
            question: "What makes you feel the most secure in a relationship?",
            options: ["Emotional support", "Communication", "Loyalty & trust", "Respect"],
            weights: [10, 8, 9, 7], category: "Core Compatibility"
        },
        {
            question: "How do you feel about planning your life together?",
            options: ["Don't like planning much", "Love planning together", "Prefer taking things step-by-step"],
            weights: [5, 10, 7], category: "Lifestyle"
        },
        {
            question: "What is your Communication style?",
            options: ["Open and direct", "Emotional & expressive", "Silent & reserved", "Mood Dependent"],
            weights: [10, 8, 5, 7], category: "Communication"
        },
        {
            question: "How do you and your partner resolve misunderstandings?",
            options: ["Talking it out", "Avoid & ignore", "Wait for things to settle", "Seeking advice from others"],
            weights: [10, 3, 5, 6], category: "Conflict Resolution"
        },
        {
            question: "What is your Attachment style?",
            options: ["Secure", "Anxious", "Avoidant", "Wants Love But Scared of It"],
            weights: [10, 6, 4, 5], category: "Attachment"
        },
        {
            question: "What do you think is the key to a successful relationship?",
            options: ["Trust", "Communication", "Compromise", "Respect"],
            weights: [10, 9, 7, 8], category: "Core Compatibility"
        },
        {
            question: "Do you lean towards a more logical or emotional approach to decision-making?",
            options: ["Logical", "Emotional", "A mix of both"],
            weights: [7, 10, 8], category: "Core Compatibility"
        },
        {
            question: "What’s your ideal type of music?",
            options: ["Peaceful Music", "Romantic Songs", "Dancing Songs", "Deep Meaningful Songs"],
            weights: [7, 10, 6, 9], category: "Miscellaneous"
        },
        {
            question: "What does loyalty mean to you in a relationship?",
            options: ["Trust and support", "Being exclusive", "Always being there", "Respecting each other"],
            weights: [10, 8, 9, 8], category: "Core Compatibility"
        },
        {
            question: "How do you handle conflict in a relationship?",
            options: ["Talk it out immediately", "Take time to cool down", "Argue and Avoid confrontation", "Seek help from others"],
            weights: [10, 7, 5, 6], category: "Conflict Resolution"
        },
        {
            question: "How do you and your partner approach financial decisions in a relationship?",
            options: ["Discuss and decide together", "One person handles it", "Each handles their own finances", "Split everything evenly"],
            weights: [10, 5, 7, 8], category: "Lifestyle"
        },
        {
            question: "What's your partner's Zodiac Sign?",
            options: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"],
            weights: [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5], category: "Miscellaneous"
        },
        {
            question: "Do you prefer spontaneous surprises or planned experiences in a relationship?",
            options: ["Spontaneous Surprises", "Planned Experiences", "A mix of both"],
            weights: [10, 5, 7], category: "Lifestyle"
        },
        {
            question: "What is your Love Language?",
            options: ["Meaningful Conversations", "Doing Things for Love", "Small Thoughtful Gestures", "Remembering All Small Details", "Physical Closeness"],
            weights: [9, 9, 8, 10, 7], category: "Love Languages"
        },
        {
            question: "What kind of touch makes you feel most comforted or secure in a relationship?",
            options: ["Hugs", "Holding Hands", "Massage & Comforting Touch", "Touch-Based Affection"],
            weights: [10, 9, 9, 8], category: "Love Languages"
        },
        {
            question: "What is your stance on marriage?",
            options: ["Very important", "Somewhat important", "Not important", "Indifferent"],
            weights: [10, 7, 4, 5], category: "Core Compatibility"
        },
        {
            question: "How do you handle apologies in a relationship?",
            options: ["I apologize immediately", "I wait until I'm calm", "I struggle to apologize", "I expect the other person to apologize first"],
            weights: [10, 8, 5, 4], category: "Conflict Resolution"
        },
        {
            question: "What’s your biggest fear in a relationship?",
            options: ["Rejection", "Betrayal", "Being misunderstood", "Not being loved", "Casual dating"],
            weights: [10, 9, 10, 8, 6], category: "Core Compatibility"
        },
        {
            question: "How do you handle emotional pain?",
            options: ["Needing Reassurance", "Figure things out on my own", "Seek comfort from my partner"],
            weights: [10, 7, 9], category: "Core Compatibility"
        },
        {
            question: "How does your partner make you feel emotionally safe in the relationship?",
            options: ["Listening without judgment", "Offering reassurance", "Being patient and Understanding", "Always Cheering and Encouraging"],
            weights: [10, 9, 9, 9], category: "Core Compatibility"
        },
        {
            question: "How do you approach challenges in life?",
            options: ["Avoid them", "Face them head-on", "Take time to think and strategize", "Seek advice from others"],
            weights: [4, 10, 8, 6], category: "Lifestyle"
        },
        {
            question: "What describes your partner best?",
            options: ["Loyal and Trustworthy", "Realistic and Ambitious", "Paranoid in love"],
            weights: [10, 8, 4], category: "Core Compatibility"
        },
        {
            question: "How important is career or personal growth support in your relationship?",
            options: ["Very important", "Somewhat important", "Not important", "Indifferent"],
            weights: [10, 8, 4, 6], category: "Lifestyle"
        },
        {
            question: "Do you believe in love at first sight and unconditional love in a relationship?",
            options: ["Yes", "No", "I'm not sure"],
            weights: [10, 5, 7], category: "Core Compatibility"
        }
    ];
    // Love Score Calculation & Display
    
    // Display Love Score & Play Music
    if (document.getElementById("resultText")) {
        let name1 = localStorage.getItem("name1");
        let name2 = localStorage.getItem("name2");
        let partner1Answers = JSON.parse(localStorage.getItem("partner1Answers")) || [];
        let partner2Answers = JSON.parse(localStorage.getItem("partner2Answers")) || [];

        let totalScore = 0;
        let maxScore = 0;
        let NoAnswerPenalty = 0; // Penalty for missing answers

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
        
        questions.forEach((q, index) => {
            let answer1 = partner1Answers[index];
            let answer2 = partner2Answers[index];
        
            if (!answer1 || !answer2) {
                NoAnswerPenalty += 5; // Deduct 5% per missing answer
                return;
            }
        
            let answer1Index = q.options.indexOf(answer1);
            let answer2Index = q.options.indexOf(answer2);
        
            if (answer1Index !== -1 && answer2Index !== -1) {
                let weight1 = q.weights[answer1Index];
                let weight2 = q.weights[answer2Index];
        
                // 🔥 **Fuzzy Matching Logic**
                let scoreDiff = Math.abs(weight1 - weight2);
                let questionScore = 10 - scoreDiff; // Closer matches get higher scores
        
                // 🔥 **Advanced Scoring**
                if (q.category === "Love Languages") questionScore += 3;
                if (q.category === "Conflict Resolution") questionScore += 2;
                if (q.category === "Core Compatibility") questionScore += 4;
                if (q.category === "Lifestyle") questionScore += 2;
                if (q.category === "Fun & Preferences") questionScore += 1; // Lower weight for fun questions
                
                
                if (q.category === "Zodiac") {  
                if (perfectMatches[answer1]?.includes(answer2)) {
                        questionScore += 5; // 🔥 Perfect Zodiac Match Bonus
                    } else if (balancingPairs[answer1]?.includes(answer2)) {
                        questionScore += 3; // ⚖️ Balancing Pair Bonus
                    }
                }
        
                totalScore += questionScore;
                maxScore += 15; // Max possible score per question
            }
        });
        
        // Apply penalty
        let finalScore = Math.round(((totalScore - NoAnswerPenalty) / maxScore) * 100);
        if (finalScore < 0) finalScore = 0;
        let resultText = document.getElementById("resultText");
        document.getElementById("resultText").innerHTML = ` ${name1} & ${name2} Compatibility Percentage is ${finalScore}% ❤️`;


    function getLoveInsight(finalScore) {
    if (finalScore >= 95) {
        return "❤️🔥 You both are a perfect match! Your love and understanding are deep and unbreakable. Keep cherishing each other!";
    } else if (finalScore >= 80) {
        return "💖🔮 Your bond is strong and filled with love! A little more effort in communication will make it even more magical.";
    } else if (finalScore >= 75) {
        return "💞✨ You have a good connection, but there's room for growth. Work on understanding each other better!";
    } else if (finalScore >= 60) {
        return "💕💫A promising bond, but challenges exist. Work on understanding each other better, and your love will shine even brighter";
    }else if (finalScore >= 35) {
        return "🤔💬 There are significant differences in your personalities, but love is all about effort. If you both are willing to grow together, anything is possible.";
    } else if (finalScore >= 28) {
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
        document.getElementById("finalScore").classList.contains("heartbeat")
    


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

    let tryAgainBtn = document.getElementById("tryAgainBtn");
    if (tryAgainBtn) {
        tryAgainBtn.addEventListener("click", function () {
            window.location.href = "index.html"; 
        });
    }
}
});
