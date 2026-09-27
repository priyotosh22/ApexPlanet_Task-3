// ================================
// TASK 3 - ADVANCED JAVASCRIPT
// ================================

// ---------- Mobile Navigation ----------
const menuBtn = document.getElementById("menuBtn");
const nav = document.querySelector(".nav");

menuBtn.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", isOpen);
});

document.querySelectorAll(".nav a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuBtn.setAttribute("aria-expanded", "false");
  });
});

// ---------- Interactive Frontend Quiz ----------
const quizQuestions = [
  {
    question: "Which CSS feature is primarily used to create two-dimensional page layouts?",
    options: ["Flexbox", "CSS Grid", "Position: absolute", "Float"],
    answer: 1,
    explanation: "CSS Grid is designed for two-dimensional layouts using rows and columns."
  },
  {
    question: "Which JavaScript method converts a JSON string into a JavaScript object?",
    options: ["JSON.parse()", "JSON.stringify()", "JSON.object()", "JSON.convert()"],
    answer: 0,
    explanation: "JSON.parse() reads a JSON string and converts it into a JavaScript value, usually an object."
  },
  {
    question: "Which HTML element is the semantic container for a website's main navigation links?",
    options: ["<header>", "<section>", "<nav>", "<menu>"],
    answer: 2,
    explanation: "The <nav> element represents a section containing navigation links."
  },
  {
    question: "Which CSS rule is used to apply styles based on the screen size?",
    options: ["@keyframes", "@media", "@supports", "@import"],
    answer: 1,
    explanation: "@media enables CSS rules to respond to conditions such as viewport width."
  },
  {
    question: "Which JavaScript keyword is commonly used with async functions to wait for a Promise?",
    options: ["defer", "pause", "await", "yield"],
    answer: 2,
    explanation: "await pauses execution inside an async function until the Promise settles."
  },
  {
    question: "Which browser API is commonly used to request data from a REST API?",
    options: ["fetch()", "requestData()", "getJSON()", "httpRequest()"],
    answer: 0,
    explanation: "The Fetch API provides the fetch() method for making HTTP requests."
  },
  {
    question: "Which CSS unit is relative to the root element's font size?",
    options: ["em", "vh", "rem", "%"],
    answer: 2,
    explanation: "rem is based on the font size of the root HTML element."
  },
  {
    question: "What does DOM stand for in web development?",
    options: [
      "Document Object Model",
      "Data Object Management",
      "Dynamic Output Method",
      "Document Orientation Module"
    ],
    answer: 0,
    explanation: "DOM stands for Document Object Model, the programming interface representing a web document."
  }
];

const quizProgress = document.getElementById("quizProgress");
const liveScore = document.getElementById("liveScore");
const quizProgressBar = document.getElementById("quizProgressBar");
const questionNumber = document.getElementById("questionNumber");
const questionText = document.getElementById("questionText");
const optionsContainer = document.getElementById("optionsContainer");
const quizFeedback = document.getElementById("quizFeedback");
const nextQuestion = document.getElementById("nextQuestion");
const restartQuiz = document.getElementById("restartQuiz");
const quizBody = document.getElementById("quizBody");
const quizResult = document.getElementById("quizResult");
const finalScore = document.getElementById("finalScore");
const resultTitle = document.getElementById("resultTitle");
const resultMessage = document.getElementById("resultMessage");
const tryAgain = document.getElementById("tryAgain");

let currentQuestion = 0;
let quizScore = 0;
let answered = false;

function renderQuestion() {
  const question = quizQuestions[currentQuestion];

  answered = false;
  quizProgress.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
  questionNumber.textContent = String(currentQuestion + 1).padStart(2, "0");
  questionText.textContent = question.question;
  quizProgressBar.style.width = `${((currentQuestion + 1) / quizQuestions.length) * 100}%`;

  optionsContainer.innerHTML = "";
  quizFeedback.className = "quiz-feedback";
  quizFeedback.textContent = "";
  nextQuestion.disabled = true;
  nextQuestion.innerHTML = currentQuestion === quizQuestions.length - 1
    ? 'See Result <span>→</span>'
    : 'Next Question <span>→</span>';

  question.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.className = "quiz-option";
    button.type = "button";
    button.innerHTML = `
      <span class="option-letter">${String.fromCharCode(65 + index)}</span>
      <span class="option-text">${option.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</span>
    `;

    button.addEventListener("click", () => selectAnswer(index));
    optionsContainer.appendChild(button);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;
  const question = quizQuestions[currentQuestion];
  const buttons = document.querySelectorAll(".quiz-option");

  buttons.forEach((button, index) => {
    button.disabled = true;

    if (index === question.answer) {
      button.classList.add("correct");
    }

    if (index === selectedIndex && selectedIndex !== question.answer) {
      button.classList.add("incorrect");
    }
  });

  if (selectedIndex === question.answer) {
    quizScore++;
    liveScore.textContent = quizScore;
    quizFeedback.textContent = `Correct! ${question.explanation}`;
    quizFeedback.classList.add("show", "correct-feedback");
  } else {
    quizFeedback.textContent = `Not quite. ${question.explanation}`;
    quizFeedback.classList.add("show", "incorrect-feedback");
  }

  nextQuestion.disabled = false;
}

function showResult() {
  quizBody.style.display = "none";
  quizResult.classList.add("show");
  finalScore.textContent = quizScore;

  const percentage = (quizScore / quizQuestions.length) * 100;

  if (percentage === 100) {
    resultTitle.textContent = "Perfect score!";
    resultMessage.textContent = "Excellent command of the frontend fundamentals covered in this quiz.";
  } else if (percentage >= 75) {
    resultTitle.textContent = "Great work!";
    resultMessage.textContent = "You have a strong grasp of the core HTML, CSS and JavaScript concepts.";
  } else if (percentage >= 50) {
    resultTitle.textContent = "Good progress!";
    resultMessage.textContent = "You have a solid starting point. Review the missed concepts and try again.";
  } else {
    resultTitle.textContent = "Keep practicing!";
    resultMessage.textContent = "Review the fundamentals and take the quiz again to strengthen your understanding.";
  }
}

nextQuestion.addEventListener("click", () => {
  if (!answered) return;

  if (currentQuestion < quizQuestions.length - 1) {
    currentQuestion++;
    renderQuestion();
  } else {
    showResult();
  }
});

function resetQuiz() {
  currentQuestion = 0;
  quizScore = 0;
  liveScore.textContent = "0";
  quizResult.classList.remove("show");
  quizBody.style.display = "block";
  renderQuestion();
}

restartQuiz.addEventListener("click", resetQuiz);
tryAgain.addEventListener("click", resetQuiz);

renderQuestion();

// ---------- Weather API: Open-Meteo ----------
const cityInput = document.getElementById("cityInput");
const weatherBtn = document.getElementById("weatherBtn");
const locationName = document.getElementById("locationName");
const weatherStatus = document.getElementById("weatherStatus");
const weatherIcon = document.getElementById("weatherIcon");
const temperature = document.getElementById("temperature");
const feelsLike = document.getElementById("feelsLike");
const windSpeed = document.getElementById("windSpeed");
const humidity = document.getElementById("humidity");
const apiMessage = document.getElementById("apiMessage");

const weatherDescriptions = {
  0: ["Clear sky", "☀"],
  1: ["Mainly clear", "🌤"],
  2: ["Partly cloudy", "⛅"],
  3: ["Overcast", "☁"],
  45: ["Fog", "🌫"],
  48: ["Rime fog", "🌫"],
  51: ["Light drizzle", "🌦"],
  53: ["Moderate drizzle", "🌦"],
  55: ["Dense drizzle", "🌧"],
  61: ["Slight rain", "🌦"],
  63: ["Moderate rain", "🌧"],
  65: ["Heavy rain", "🌧"],
  71: ["Slight snowfall", "🌨"],
  73: ["Moderate snowfall", "🌨"],
  75: ["Heavy snowfall", "❄"],
  80: ["Rain showers", "🌦"],
  81: ["Moderate showers", "🌧"],
  82: ["Heavy showers", "⛈"],
  95: ["Thunderstorm", "⛈"],
  96: ["Thunderstorm with hail", "⛈"],
  99: ["Thunderstorm with hail", "⛈"]
};

async function getWeather(city = "Kolkata") {
  const query = city.trim();

  if (!query) {
    apiMessage.textContent = "Please enter a city name.";
    return;
  }

  weatherBtn.disabled = true;
  weatherBtn.textContent = "Loading...";
  apiMessage.textContent = "Fetching live weather data...";

  try {
    const geoResponse = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=en&format=json`
    );

    if (!geoResponse.ok) throw new Error("Could not connect to the location service.");

    const geoData = await geoResponse.json();

    if (!geoData.results || geoData.results.length === 0) {
      throw new Error("City not found. Try another city.");
    }

    const place = geoData.results[0];

    const weatherResponse = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`
    );

    if (!weatherResponse.ok) throw new Error("Weather service is unavailable.");

    const data = await weatherResponse.json();
    const current = data.current;
    const weather = weatherDescriptions[current.weather_code] || ["Current conditions", "🌡"];

    locationName.textContent = `${place.name}, ${place.country_code}`;
    weatherStatus.textContent = weather[0];
    weatherIcon.textContent = weather[1];
    temperature.textContent = Math.round(current.temperature_2m);
    feelsLike.textContent = `${Math.round(current.apparent_temperature)}°C`;
    windSpeed.textContent = `${Math.round(current.wind_speed_10m)} km/h`;
    humidity.textContent = `${current.relative_humidity_2m}%`;
    apiMessage.textContent = `Updated: ${new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} • Open-Meteo`;
  } catch (error) {
    apiMessage.textContent = error.message;
  } finally {
    weatherBtn.disabled = false;
    weatherBtn.textContent = "Get Weather";
  }
}

weatherBtn.addEventListener("click", () => getWeather(cityInput.value));

cityInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") getWeather(cityInput.value);
});

getWeather();

// ---------- Joke API ----------
const jokeBtn = document.getElementById("jokeBtn");
const jokeText = document.getElementById("jokeText");
const jokeStatus = document.getElementById("jokeStatus");

async function getJoke() {
  jokeBtn.disabled = true;
  jokeBtn.textContent = "Fetching...";

  try {
    const response = await fetch(
      "https://v2.jokeapi.dev/joke/Programming?type=single&safe-mode"
    );

    if (!response.ok) throw new Error("Joke service is unavailable.");

    const data = await response.json();

    if (data.error) throw new Error("Could not load a joke.");

    jokeText.textContent = data.joke;
    jokeStatus.textContent = "Fresh joke loaded successfully.";
  } catch (error) {
    jokeText.textContent = "Why do programmers prefer dark mode? Because light attracts bugs.";
    jokeStatus.textContent = "Fallback joke displayed.";
  } finally {
    jokeBtn.disabled = false;
    jokeBtn.innerHTML = "Get New Joke <span>→</span>";
  }
}

jokeBtn.addEventListener("click", getJoke);
