const siteSettings = {
  github: "https://github.com/Sauravtimilsina/Game",
  issues: "https://github.com/Sauravtimilsina/Game/issues",
  email: "mailto:your-email@example.com",
  linkedin: "https://www.linkedin.com/in/your-linkedin-profile",
};

const ageSelect = document.querySelector("#age-select");
const endlessToggle = document.querySelector("#endless-toggle");
const tabs = [...document.querySelectorAll(".tab")];
const board = document.querySelector("#game-board");
const title = document.querySelector("#game-title");
const skillLabel = document.querySelector("#skill-label");
const instructions = document.querySelector("#game-instructions");
const movesLabel = document.querySelector("#moves-label");
const scoreLabel = document.querySelector("#score-label");
const streakLabel = document.querySelector("#streak-label");
const comboLabel = document.querySelector("#combo-label");
const feedback = document.querySelector("#feedback");
const newRound = document.querySelector("#new-round");
const hintButton = document.querySelector("#hint-button");
const totalStars = document.querySelector("#total-stars");
const contactLinks = document.querySelector("#contact-links");
const missionText = document.querySelector("#mission-text");
const levelLabel = document.querySelector("#level-label");
const rewardToast = document.querySelector("#reward-toast");

const icons = ["SUN", "MOON", "STAR", "TREE", "BELL", "KEY", "BOAT", "BOOK", "KITE", "HEART", "LEAF", "CUP"];
const distractorIcons = ["DOT", "BOX", "TRI", "GEM", "PLUS"];
const nepaliLetters = "क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह क्ष त्र ज्ञ".split(" ");
const nepaliNumbers = [
  { np: "१", en: "1" },
  { np: "२", en: "2" },
  { np: "३", en: "3" },
  { np: "४", en: "4" },
  { np: "५", en: "5" },
  { np: "६", en: "6" },
  { np: "७", en: "7" },
  { np: "८", en: "8" },
  { np: "९", en: "9" },
  { np: "१०", en: "10" },
];
const nepaliWords = [
  { word: "घर", meaning: "home" },
  { word: "पानी", meaning: "water" },
  { word: "फूल", meaning: "flower" },
  { word: "किताब", meaning: "book" },
  { word: "आमा", meaning: "mother" },
  { word: "बुबा", meaning: "father" },
  { word: "साथी", meaning: "friend" },
  { word: "विद्यालय", meaning: "school" },
];
const wordSets = {
  little: ["SUN", "CAT", "MAP", "RED", "BUS"],
  junior: ["BRAIN", "PLANT", "SMILE", "OCEAN", "TRAIN"],
  senior: ["PUZZLE", "PLANET", "MEMORY", "SIGNAL", "VECTOR"],
};
const typingPrompts = {
  little: ["sun", "cat", "red", "book"],
  junior: ["happy learner", "bright mind", "focus and play"],
  senior: ["practice builds skill", "curiosity makes learning fun", "solve problems step by step"],
};
const scienceQuestions = [
  { q: "Which planet do we live on?", a: "Earth", options: ["Earth", "Mars", "Jupiter", "Venus"] },
  { q: "What do plants need to make food?", a: "Sunlight", options: ["Sunlight", "Plastic", "Smoke", "Sand only"] },
  { q: "How many legs does an insect have?", a: "6", options: ["4", "6", "8", "10"] },
  { q: "What gas do humans breathe in to live?", a: "Oxygen", options: ["Oxygen", "Helium", "Steam", "Dust"] },
  { q: "Which part of your body helps you think?", a: "Brain", options: ["Brain", "Knee", "Elbow", "Hair"] },
];

const oddOneSets = [
  { group: ["2", "4", "6", "9"], odd: "9", reason: "9 is odd; the others are even." },
  { group: ["CAT", "DOG", "COW", "CAR"], odd: "CAR", reason: "CAR is not an animal." },
  { group: ["RED", "BLUE", "GREEN", "TABLE"], odd: "TABLE", reason: "TABLE is not a color." },
  { group: ["क", "ख", "ग", "7"], odd: "7", reason: "7 is a number; the others are Nepali letters." },
  { group: ["SUN", "MOON", "STAR", "PENCIL"], odd: "PENCIL", reason: "PENCIL is not in the sky." },
];
const colorChallenges = [
  { word: "RED", ink: "blue", answer: "BLUE" },
  { word: "GREEN", ink: "orange", answer: "ORANGE" },
  { word: "BLUE", ink: "pink", answer: "PINK" },
  { word: "YELLOW", ink: "green", answer: "GREEN" },
];
const storySets = [
  { title: "Plant a seed", steps: ["Dig soil", "Plant seed", "Water it"] },
  { title: "Get ready for school", steps: ["Pack bag", "Wear shoes", "Go to school"] },
  { title: "Make a drawing", steps: ["Pick pencil", "Draw picture", "Color it"] },
  { title: "Read a book", steps: ["Open book", "Read pages", "Close book"] },
];
const missionLines = [
  "Win any 3 rounds and try a Nepali challenge next.",
  "Build a streak of 3 to power up your combo.",
  "Try one brain game, one school game, and one Nepali game.",
  "Use Hint only when you are truly stuck.",
  "Switch age levels to find the perfect challenge.",
];
const config = {
  little: { pairs: 4, logicLength: 4, focusSize: 12, mathMax: 9, distractors: distractorIcons.slice(0, 3), nepaliChoices: 3 },
  junior: { pairs: 6, logicLength: 5, focusSize: 20, mathMax: 25, distractors: distractorIcons.slice(0, 4), nepaliChoices: 4 },
  senior: { pairs: 8, logicLength: 6, focusSize: 30, mathMax: 60, distractors: distractorIcons, nepaliChoices: 5 },
};

const gameInfo = {
  memory: { title: "Memory Match", skill: "Memory", text: "Flip cards and find every matching pair." },
  logic: { title: "Pattern Logic", skill: "Logic", text: "Study the sequence, then choose the missing piece." },
  attention: { title: "Focus Finder", skill: "Attention", text: "Find every highlighted target before your focus slips." },
  math: { title: "Number Quest", skill: "Numbers", text: "Solve the challenge and choose the correct answer." },
  words: { title: "Word Builder", skill: "Words", text: "Tap letters in order to rebuild the hidden word." },
  science: { title: "Science Spark", skill: "Learning", text: "Answer friendly science questions and learn one fact at a time." },
  typing: { title: "Typing Trail", skill: "Learning", text: "Type the phrase exactly to practice reading, focus, and keyboard confidence." },
  oddOne: { title: "Odd One Out", skill: "Reasoning", text: "Find the item that does not belong with the others." },
  colorCode: { title: "Color Code", skill: "Attention", text: "Ignore the word meaning. Choose the ink color you see." },
  storyOrder: { title: "Story Order", skill: "Problem Solving", text: "Tap the steps in the correct order to complete the mini story." },
  nepaliLetters: { title: "नेपाली अक्षर", skill: "Nepali", text: "Choose the letter that comes next in the Nepali alphabet sequence." },
  nepaliWords: { title: "नेपाली शब्द", skill: "Nepali", text: "Match Nepali words with their English meaning." },
  nepaliNumbers: { title: "नेपाली अंक", skill: "Nepali", text: "Match Nepali numbers with English numbers." },
};

const state = {
  game: "memory",
  age: "junior",
  moves: 0,
  score: 0,
  streak: 0,
  completed: false,
  stars: {
    memory: 0,
    logic: 0,
    attention: 0,
    math: 0,
    words: 0,
    science: 0,
    typing: 0,
    oddOne: 0,
    colorCode: 0,
    storyOrder: 0,
    nepaliLetters: 0,
    nepaliWords: 0,
    nepaliNumbers: 0,
  },
  memory: { first: null, lock: false, matched: 0 },
  word: { answer: "", entry: "" },
  selectedMatch: null,
  storyEntry: [],
};

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function makeNumberOptions(answer) {
  const options = new Set([answer]);
  const offsets = shuffle([-7, -4, -2, -1, 1, 2, 3, 5, 8]);
  offsets.forEach((offset) => {
    if (options.size < 4) options.add(Math.max(0, answer + offset));
  });
  return shuffle([...options]);
}

function setFeedback(message, good = true) {
  feedback.textContent = message;
  feedback.style.color = good ? "#126b5b" : "#bb3158";
}

function updateStats() {
  movesLabel.textContent = `Moves: ${state.moves}`;
  scoreLabel.textContent = `Score: ${state.score}`;
  streakLabel.textContent = `Streak: ${state.streak}`;
  const total = Object.values(state.stars).reduce((sum, value) => sum + value, 0);
  const combo = 1 + Math.floor(state.streak / 3);
  comboLabel.textContent = `Combo: x${combo}`;
  levelLabel.textContent = String(1 + Math.floor(total / 5));
  missionText.textContent = missionLines[total % missionLines.length];
  totalStars.textContent = total;
  Object.entries(state.stars).forEach(([game, count]) => {
    document.querySelector(`#${game}-stars`).textContent = `${count} ${count === 1 ? "star" : "stars"}`;
  });
}

function finishRound(game, message) {
  if (state.completed) return;
  state.completed = true;
  const combo = 1 + Math.floor(state.streak / 3);
  const reward = 10 * combo;
  state.score += reward;
  state.streak += 1;
  state.stars[game] += 1;
  updateStats();
  showReward(`+${reward} points | Combo x${combo}`);
  setFeedback(`${message} Next round starts soon.`);
  if (endlessToggle.checked) {
    setTimeout(resetRound, 1150);
  }
}

function miss(message) {
  state.streak = 0;
  setFeedback(message, false);
  updateStats();
}

function resetRound() {
  const info = gameInfo[state.game];
  title.textContent = info.title;
  skillLabel.textContent = info.skill;
  instructions.textContent = info.text;
  state.moves = 0;
  state.score = 0;
  state.completed = false;
  state.selectedMatch = null;
  board.className = "game-board";
  board.innerHTML = "";
  setFeedback("");
  updateStats();

  if (state.game === "memory") renderMemory();
  if (state.game === "logic") renderLogic();
  if (state.game === "attention") renderAttention();
  if (state.game === "math") renderMath();
  if (state.game === "words") renderWords();
  if (state.game === "science") renderScience();
  if (state.game === "typing") renderTyping();
  if (state.game === "oddOne") renderOddOne();
  if (state.game === "colorCode") renderColorCode();
  if (state.game === "storyOrder") renderStoryOrder();
  if (state.game === "nepaliLetters") renderNepaliLetters();
  if (state.game === "nepaliWords") renderNepaliWords();
  if (state.game === "nepaliNumbers") renderNepaliNumbers();
}

function renderMemory() {
  const pairs = config[state.age].pairs;
  const cards = shuffle(icons.slice(0, pairs).flatMap((symbol) => [symbol, symbol]));
  const cols = state.age === "little" ? 4 : state.age === "junior" ? 4 : 8;
  board.className = "game-board memory-grid";
  board.style.setProperty("--cols", cols);
  state.memory = { first: null, lock: false, matched: 0 };

  cards.forEach((symbol, index) => {
    const button = document.createElement("button");
    button.className = "card hidden";
    button.type = "button";
    button.dataset.symbol = symbol;
    button.dataset.index = index;
    button.setAttribute("aria-label", "Hidden card");
    button.textContent = symbol;
    button.addEventListener("click", () => flipCard(button));
    board.append(button);
  });
}

function flipCard(card) {
  if (state.completed || state.memory.lock || !card.classList.contains("hidden")) return;
  card.classList.remove("hidden");
  card.setAttribute("aria-label", `Card ${card.dataset.symbol}`);

  if (!state.memory.first) {
    state.memory.first = card;
    return;
  }

  state.moves += 1;
  updateStats();
  const first = state.memory.first;
  state.memory.first = null;

  if (first.dataset.symbol === card.dataset.symbol) {
    first.classList.add("matched");
    card.classList.add("matched");
    state.memory.matched += 1;
    setFeedback("Nice match!");
    if (state.memory.matched === config[state.age].pairs) finishRound("memory", "Memory mastered. You earned a star!");
    return;
  }

  state.memory.lock = true;
  miss("Try again. Remember where those were.");
  setTimeout(() => {
    first.classList.add("hidden");
    card.classList.add("hidden");
    state.memory.lock = false;
  }, 760);
}

function renderLogic() {
  const length = config[state.age].logicLength;
  const pattern = shuffle(icons.slice(0, 4)).slice(0, state.age === "little" ? 2 : 3);
  const sequence = Array.from({ length }, (_, index) => pattern[index % pattern.length]);
  const answer = pattern[length % pattern.length];
  const options = shuffle([answer, ...shuffle(icons.filter((icon) => !pattern.includes(icon))).slice(0, 3)]);

  board.innerHTML = `
    <div class="logic-panel">
      <div class="sequence">${sequence.map((item) => `<div class="seq-item">${item}</div>`).join("")}<div class="seq-item">?</div></div>
      <div class="answer-row">${options.map((item) => `<button class="answer-button" data-answer="${item}">${item}</button>`).join("")}</div>
    </div>
  `;
  wireAnswers(answer, "logic", "Pattern solved. Logic star earned!");
}

function renderAttention() {
  const size = config[state.age].focusSize;
  const targetCount = state.age === "little" ? 3 : state.age === "junior" ? 5 : 7;
  const target = "STAR";
  const targetPositions = new Set(shuffle([...Array(size).keys()]).slice(0, targetCount));
  let found = 0;
  board.className = "game-board focus-grid";
  board.style.setProperty("--cols", state.age === "little" ? 4 : state.age === "junior" ? 5 : 6);

  Array.from({ length: size }).forEach((_, index) => {
    const isTarget = targetPositions.has(index);
    const button = document.createElement("button");
    button.className = isTarget ? "tile target" : "tile";
    button.type = "button";
    button.textContent = isTarget ? target : shuffle(config[state.age].distractors)[0];
    button.addEventListener("click", () => {
      if (state.completed) return;
      state.moves += 1;
      if (isTarget && !button.disabled) {
        button.disabled = true;
        button.style.opacity = "0.38";
        found += 1;
        setFeedback(`Found ${found} of ${targetCount}.`);
        if (found === targetCount) finishRound("attention", "Fantastic focus. Attention star earned!");
      } else {
        miss("Careful eyes. Only tap STAR tiles.");
      }
      updateStats();
    });
    board.append(button);
  });
}

function renderMath() {
  const max = config[state.age].mathMax;
  const a = Math.floor(Math.random() * max) + 1;
  const b = Math.floor(Math.random() * max) + 1;
  const isSenior = state.age === "senior";
  const operator = isSenior && Math.random() > 0.5 ? "*" : Math.random() > 0.45 ? "+" : "-";
  const left = operator === "-" ? Math.max(a, b) : a;
  const right = operator === "-" ? Math.min(a, b) : isSenior && operator === "*" ? Math.floor(Math.random() * 9) + 2 : b;
  const answer = operator === "+" ? left + right : operator === "-" ? left - right : left * right;
  const options = makeNumberOptions(answer);

  board.innerHTML = `
    <div class="quiz-panel">
      <p class="question-text">${left} ${operator} ${right} = ?</p>
      <div class="answer-row">${options.map((item) => `<button class="answer-button" data-answer="${item}">${item}</button>`).join("")}</div>
    </div>
  `;
  wireAnswers(String(answer), "math", "Number quest complete. Math star earned!");
}

function renderWords() {
  const answer = shuffle(wordSets[state.age])[0];
  const letters = shuffle(answer.split(""));
  state.word = { answer, entry: "" };

  board.innerHTML = `
    <div class="word-panel">
      <div class="word-slots">${answer.split("").map(() => `<div class="slot"></div>`).join("")}</div>
      <div class="letter-bank">${letters.map((letter, index) => `<button class="letter" data-index="${index}" data-letter="${letter}">${letter}</button>`).join("")}</div>
    </div>
  `;

  board.querySelectorAll(".letter").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.completed || button.disabled) return;
      const nextIndex = state.word.entry.length;
      state.word.entry += button.dataset.letter;
      board.querySelectorAll(".slot")[nextIndex].textContent = button.dataset.letter;
      button.disabled = true;
      state.moves += 1;

      if (!answer.startsWith(state.word.entry)) {
        miss("That word starts differently. New letters coming up.");
        setTimeout(renderWords, 760);
      } else if (state.word.entry === answer) {
        board.querySelectorAll(".letter").forEach((item) => item.disabled = true);
        finishRound("words", `You built ${answer}. Word star earned!`);
      } else {
        setFeedback("Good start. Keep building.");
      }
      updateStats();
    });
  });
}

function renderScience() {
  const question = shuffle(scienceQuestions)[0];
  board.innerHTML = `
    <div class="quiz-panel">
      <p class="question-text">${question.q}</p>
      <div class="answer-row">${shuffle(question.options).map((item) => `<button class="answer-button" data-answer="${item}">${item}</button>`).join("")}</div>
    </div>
  `;
  wireAnswers(question.a, "science", "Science spark unlocked!");
}

function renderTyping() {
  const prompt = shuffle(typingPrompts[state.age])[0];
  board.innerHTML = `
    <div class="typing-panel">
      <p class="question-text">${prompt}</p>
      <input class="typing-input" type="text" aria-label="Type the phrase" autocomplete="off" />
      <div class="answer-row"><button class="answer-button" data-action="check">Check</button></div>
    </div>
  `;
  const input = board.querySelector(".typing-input");
  const check = board.querySelector("[data-action='check']");
  input.focus();
  function submit() {
    if (state.completed) return;
    state.moves += 1;
    if (input.value.trim().toLowerCase() === prompt.toLowerCase()) {
      finishRound("typing", "Typing trail complete!");
    } else {
      miss("Almost. Type the phrase exactly and try again.");
    }
  }
  check.addEventListener("click", submit);
  input.addEventListener("keydown", (event) => {
    if (event.key === "Enter") submit();
  });
}

function renderOddOne() {
  const challenge = shuffle(oddOneSets)[0];
  board.innerHTML = `
    <div class="quiz-panel">
      <p class="question-text">Which one is different?</p>
      <div class="answer-row">${shuffle(challenge.group).map((item) => `<button class="answer-button" data-answer="${item}">${item}</button>`).join("")}</div>
    </div>
  `;
  wireAnswers(challenge.odd, "oddOne", `${challenge.reason} Reasoning star earned!`);
}

function renderColorCode() {
  const challenge = shuffle(colorChallenges)[0];
  const options = shuffle(["RED", "BLUE", "GREEN", "ORANGE", "PINK", "YELLOW"]).slice(0, 4);
  if (!options.includes(challenge.answer)) options[0] = challenge.answer;
  board.innerHTML = `
    <div class="quiz-panel">
      <p class="question-text color-word" style="color:${challenge.ink}">${challenge.word}</p>
      <div class="answer-row">${shuffle(options).map((item) => `<button class="answer-button" data-answer="${item}">${item}</button>`).join("")}</div>
    </div>
  `;
  wireAnswers(challenge.answer, "colorCode", "Sharp focus! Color Code star earned!");
}

function renderStoryOrder() {
  const story = shuffle(storySets)[0];
  state.storyEntry = [];
  board.innerHTML = `
    <div class="quiz-panel">
      <p class="question-text">${story.title}</p>
      <div class="word-slots">${story.steps.map(() => `<div class="slot"></div>`).join("")}</div>
      <div class="answer-row">${shuffle(story.steps).map((step) => `<button class="answer-button" data-step="${step}">${step}</button>`).join("")}</div>
    </div>
  `;
  board.querySelectorAll(".answer-button").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.completed || button.disabled) return;
      const next = state.storyEntry.length;
      state.moves += 1;
      if (button.dataset.step === story.steps[next]) {
        state.storyEntry.push(button.dataset.step);
        board.querySelectorAll(".slot")[next].textContent = button.dataset.step;
        button.disabled = true;
        button.classList.add("correct");
        if (state.storyEntry.length === story.steps.length) finishRound("storyOrder", "Story solved! Sequencing star earned!");
      } else {
        button.classList.add("wrong");
        miss("That step comes later. Think first, middle, last.");
      }
      updateStats();
    });
  });
}

function renderNepaliLetters() {
  const start = Math.floor(Math.random() * (nepaliLetters.length - 4));
  const sequence = nepaliLetters.slice(start, start + 3);
  const answer = nepaliLetters[start + 3];
  const options = shuffle([answer, ...shuffle(nepaliLetters.filter((letter) => !sequence.includes(letter) && letter !== answer)).slice(0, config[state.age].nepaliChoices)]);
  board.innerHTML = `
    <div class="logic-panel nepali-text">
      <div class="sequence">${sequence.map((item) => `<div class="seq-item">${item}</div>`).join("")}<div class="seq-item">?</div></div>
      <div class="answer-row">${options.map((item) => `<button class="answer-button nepali-text" data-answer="${item}">${item}</button>`).join("")}</div>
    </div>
  `;
  wireAnswers(answer, "nepaliLetters", "राम्रो! नेपाली अक्षर सिक्दै छौ!");
}

function renderNepaliWords() {
  renderMatchGame(nepaliWords, "word", "meaning", "nepaliWords", "Great match! नेपाली शब्द star earned!");
}

function renderNepaliNumbers() {
  renderMatchGame(nepaliNumbers, "np", "en", "nepaliNumbers", "Great number match! नेपाली अंक star earned!");
}

function renderMatchGame(items, leftKey, rightKey, game, successMessage) {
  const count = state.age === "little" ? 3 : state.age === "junior" ? 4 : 5;
  const pairs = shuffle(items).slice(0, count);
  const cards = shuffle(pairs.flatMap((item, pair) => [
    { pair, side: "left", label: item[leftKey] },
    { pair, side: "right", label: item[rightKey] },
  ]));
  let matched = 0;
  board.className = "game-board match-grid nepali-text";
  board.style.setProperty("--cols", state.age === "little" ? 3 : 5);
  cards.forEach((card) => {
    const button = document.createElement("button");
    button.className = "match-card";
    button.type = "button";
    button.dataset.pair = card.pair;
    button.dataset.side = card.side;
    button.textContent = card.label;
    button.addEventListener("click", () => {
      if (state.completed || button.disabled) return;
      if (!state.selectedMatch) {
        state.selectedMatch = button;
        button.classList.add("selected");
        return;
      }
      const first = state.selectedMatch;
      state.selectedMatch = null;
      state.moves += 1;
      if (first !== button && first.dataset.pair === button.dataset.pair && first.dataset.side !== button.dataset.side) {
        first.disabled = true;
        button.disabled = true;
        first.classList.add("matched");
        button.classList.add("matched");
        matched += 1;
        setFeedback(`Matched ${matched} of ${count}.`);
        if (matched === count) finishRound(game, successMessage);
      } else {
        first.classList.remove("selected");
        button.classList.add("wrong");
        miss("Not that pair. Look carefully and try again.");
        setTimeout(() => button.classList.remove("wrong"), 500);
      }
      updateStats();
    });
    board.append(button);
  });
}

function showReward(message) {
  rewardToast.textContent = message;
  rewardToast.classList.add("show");
  setTimeout(() => rewardToast.classList.remove("show"), 900);
}

function wireAnswers(answer, game, successMessage) {
  board.querySelectorAll(".answer-button").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.completed) return;
      state.moves += 1;
      if (button.dataset.answer === String(answer)) {
        button.classList.add("correct");
        board.querySelectorAll(".answer-button").forEach((item) => item.disabled = true);
        finishRound(game, successMessage);
      } else {
        button.classList.add("wrong");
        miss("Good try. Choose another answer.");
      }
      updateStats();
    });
  });
}

function showHint() {
  const hints = {
    memory: "Flip slowly and say each symbol out loud.",
    logic: "Look at what repeats from the beginning.",
    attention: "Scan row by row instead of jumping around.",
    math: "Break big numbers into smaller friendly parts.",
    words: `The word begins with ${state.word.answer ? state.word.answer[0] : "a strong letter"}.`,
    science: "Read every option before choosing.",
    typing: "Check spaces and spelling before pressing Enter.",
    oddOne: "Ask: what category do most items share?",
    colorCode: "Look at the color of the letters, not the word.",
    storyOrder: "Think first, next, last.",
    nepaliLetters: "Say the Nepali alphabet out loud from the first shown letter.",
    nepaliWords: "Try saying the Nepali word, then match its meaning.",
    nepaliNumbers: "Count from १ to १० and compare the shapes.",
  };
  setFeedback(hints[state.game]);
}

function renderContactLinks() {
  const links = [
    { label: "GitHub", href: siteSettings.github },
    { label: "Report bug", href: siteSettings.issues },
    { label: "Email", href: siteSettings.email },
    { label: "LinkedIn", href: siteSettings.linkedin },
  ];
  contactLinks.innerHTML = links.map((link) => `<a href="${link.href}" target="_blank" rel="noopener noreferrer">${link.label}</a>`).join("");
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    state.game = tab.dataset.game;
    resetRound();
  });
});

ageSelect.addEventListener("change", () => {
  state.age = ageSelect.value;
  resetRound();
});

newRound.addEventListener("click", resetRound);
hintButton.addEventListener("click", showHint);

renderContactLinks();
resetRound();

