const ageSelect = document.querySelector("#age-select");
const audioToggle = document.querySelector("#audio-toggle");
const loadingScreen = document.querySelector("#loading-screen");
const tabs = [...document.querySelectorAll(".tab")];
const board = document.querySelector("#game-board");
const gameStage = document.querySelector(".game-stage");
const audioPlayer = document.querySelector("#audio-player");
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
const virtualLevel = document.querySelector("#virtual-level");
const accuracyLabel = document.querySelector("#accuracy-label");
const currentGameLabel = document.querySelector("#current-game-label");
const mapNodes = document.querySelector("#map-nodes");
const rewardToast = document.querySelector("#reward-toast");

const TOTAL_LEVELS = 2400;
const gameOrder = ["memory", "logic", "attention", "math", "words", "science", "typing", "oddOne", "colorCode", "storyOrder", "shapeLab", "treasurePath", "quickCount", "nepaliLetters", "nepaliWords", "nepaliNumbers"];
const icons = ["SUN", "MOON", "STAR", "TREE", "BELL", "KEY", "BOAT", "BOOK", "KITE", "HEART", "LEAF", "CUP", "RING", "CUBE", "FLAG", "NOTE"];
const distractorIcons = ["DOT", "BOX", "TRI", "GEM", "PLUS", "RAY", "ARC"];
const shapeItems = ["CIRCLE", "SQUARE", "TRIANGLE", "STAR", "DIAMOND", "HEART"];
const shapeColors = ["red", "blue", "green", "yellow", "purple", "orange"];
const nepaliLetters = "क ख ग घ ङ च छ ज झ ञ ट ठ ड ढ ण त थ द ध न प फ ब भ म य र ल व श ष स ह क्ष त्र ज्ञ".split(" ");
const nepaliNumbers = [
  { np: "१", en: "1" }, { np: "२", en: "2" }, { np: "३", en: "3" }, { np: "४", en: "4" }, { np: "५", en: "5" },
  { np: "६", en: "6" }, { np: "७", en: "7" }, { np: "८", en: "8" }, { np: "९", en: "9" }, { np: "१०", en: "10" },
  { np: "११", en: "11" }, { np: "१२", en: "12" }, { np: "१३", en: "13" }, { np: "१४", en: "14" }, { np: "१५", en: "15" },
];
const nepaliWords = [
  { word: "घर", meaning: "home" }, { word: "पानी", meaning: "water" }, { word: "फूल", meaning: "flower" }, { word: "किताब", meaning: "book" },
  { word: "आमा", meaning: "mother" }, { word: "बुबा", meaning: "father" }, { word: "साथी", meaning: "friend" }, { word: "विद्यालय", meaning: "school" },
  { word: "पहाड", meaning: "hill" }, { word: "आकाश", meaning: "sky" }, { word: "खेल", meaning: "game" }, { word: "ज्ञान", meaning: "knowledge" },
];
const wordSets = {
  little: ["SUN", "CAT", "MAP", "RED", "BUS", "HAT", "CUP", "PEN"],
  junior: ["BRAIN", "PLANT", "SMILE", "OCEAN", "TRAIN", "BRAVE", "LIGHT", "QUEST"],
  senior: ["PUZZLE", "PLANET", "MEMORY", "SIGNAL", "VECTOR", "PATTERN", "LOGICAL", "BALANCE"],
};
const typingPrompts = {
  little: ["sun", "cat", "red", "book", "big star"],
  junior: ["happy learner", "bright mind", "focus and play", "solve the puzzle"],
  senior: ["practice builds skill", "curiosity makes learning fun", "solve problems step by step", "logic grows with effort"],
};
const scienceQuestions = [
  { q: "Which planet do we live on?", a: "Earth", options: ["Earth", "Mars", "Jupiter", "Venus"] },
  { q: "What do plants need to make food?", a: "Sunlight", options: ["Sunlight", "Plastic", "Smoke", "Sand only"] },
  { q: "How many legs does an insect have?", a: "6", options: ["4", "6", "8", "10"] },
  { q: "What gas do humans breathe in to live?", a: "Oxygen", options: ["Oxygen", "Helium", "Steam", "Dust"] },
  { q: "Which part of your body helps you think?", a: "Brain", options: ["Brain", "Knee", "Elbow", "Hair"] },
  { q: "What tool helps us see tiny things?", a: "Microscope", options: ["Microscope", "Spoon", "Ladder", "Mirror only"] },
];
const oddOneSets = [
  { group: ["2", "4", "6", "9"], odd: "9", reason: "9 is odd; the others are even." },
  { group: ["CAT", "DOG", "COW", "CAR"], odd: "CAR", reason: "CAR is not an animal." },
  { group: ["RED", "BLUE", "GREEN", "TABLE"], odd: "TABLE", reason: "TABLE is not a color." },
  { group: ["क", "ख", "ग", "7"], odd: "7", reason: "7 is a number; the others are Nepali letters." },
  { group: ["SUN", "MOON", "STAR", "PENCIL"], odd: "PENCIL", reason: "PENCIL is not in the sky." },
  { group: ["3", "6", "9", "11"], odd: "11", reason: "11 is not a multiple of 3." },
];
const colorChallenges = [
  { word: "RED", ink: "blue", answer: "BLUE" }, { word: "GREEN", ink: "orange", answer: "ORANGE" },
  { word: "BLUE", ink: "pink", answer: "PINK" }, { word: "YELLOW", ink: "green", answer: "GREEN" },
  { word: "ORANGE", ink: "purple", answer: "PURPLE" }, { word: "PINK", ink: "teal", answer: "TEAL" },
];
const storySets = [
  { title: "Plant a seed", steps: ["Dig soil", "Plant seed", "Water it", "Watch it grow"] },
  { title: "Get ready for school", steps: ["Pack bag", "Wear shoes", "Go to school", "Start class"] },
  { title: "Make a drawing", steps: ["Pick pencil", "Draw picture", "Color it", "Share it"] },
  { title: "Read a book", steps: ["Open book", "Read pages", "Think about it", "Close book"] },
  { title: "Build a model", steps: ["Sort pieces", "Join base", "Add details", "Test it"] },
];
const baseConfig = {
  little: { pairs: 4, logicLength: 4, focusSize: 12, mathMax: 9, nepaliChoices: 3, storySteps: 3 },
  junior: { pairs: 6, logicLength: 5, focusSize: 20, mathMax: 25, nepaliChoices: 4, storySteps: 4 },
  senior: { pairs: 8, logicLength: 6, focusSize: 30, mathMax: 60, nepaliChoices: 5, storySteps: 4 },
};
const gameInfo = {
  memory: { title: "Memory Match", skill: "Memory", text: "Flip cards and find every matching pair." },
  logic: { title: "Pattern Logic", skill: "Logic", text: "Study the sequence, then choose the missing piece." },
  attention: { title: "Focus Finder", skill: "Attention", text: "Find every highlighted target before your focus slips." },
  math: { title: "Number Quest", skill: "Numbers", text: "Solve the generated number challenge and choose the answer." },
  words: { title: "Word Builder", skill: "Words", text: "Tap letters in order to rebuild the hidden word." },
  science: { title: "Science Spark", skill: "Learning", text: "Answer a friendly science question and learn one fact at a time." },
  typing: { title: "Typing Trail", skill: "Learning", text: "Type the phrase exactly to practice reading, focus, and keyboard confidence." },
  oddOne: { title: "Odd One Out", skill: "Reasoning", text: "Find the item that does not belong with the others." },
  colorCode: { title: "Color Code", skill: "Attention", text: "Ignore the word meaning. Choose the ink color you see." },
  storyOrder: { title: "Story Order", skill: "Problem Solving", text: "Tap the steps in the correct order to complete the mini story." },
  shapeLab: { title: "Shape Lab", skill: "Creativity", text: "Find the shape or color that matches the mission." },
  treasurePath: { title: "Path Quest", skill: "Planning", text: "Choose the next move to reach the treasure." },
  quickCount: { title: "Quick Count", skill: "Maths", text: "Count the targets quickly and choose the number." },
  nepaliLetters: { title: "नेपाली अक्षर", skill: "Nepali", text: "Choose the letter that comes next in the Nepali alphabet sequence." },
  nepaliWords: { title: "नेपाली शब्द", skill: "Nepali", text: "Match Nepali words with their English meaning." },
  nepaliNumbers: { title: "नेपाली अंक", skill: "Nepali", text: "Match Nepali numbers with English numbers." },
};
const state = {
  game: "memory", age: "junior", moves: 0, score: 0, streak: 0, completed: false,
  levels: Object.fromEntries(gameOrder.map((game) => [game, 1])),
  attempted: Object.fromEntries(gameOrder.map((game) => [game, 0])),
  correct: Object.fromEntries(gameOrder.map((game) => [game, 0])),
  stars: Object.fromEntries(gameOrder.map((game) => [game, 0])),
  memory: { first: null, lock: false, matched: 0 }, word: { answer: "", entry: "" }, selectedMatch: null, storyEntry: [],
};

let roundRandom = Math.random;

function hashSeed(text) {
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}

function createLevelRandom(seedText) {
  let seed = hashSeed(seedText) || 1;
  return function nextRandom() {
    seed = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    seed ^= seed + Math.imul(seed ^ (seed >>> 7), 61 | seed);
    return ((seed ^ (seed >>> 14)) >>> 0) / 4294967296;
  };
}

function random() { return roundRandom(); }
function randomInt(max) { return Math.floor(random() * max); }
function shuffle(items) {
  const result = [...items];
  for (let index = result.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(index + 1);
    [result[index], result[swapIndex]] = [result[swapIndex], result[index]];
  }
  return result;
}
function clamp(value, min, max) { return Math.max(min, Math.min(max, value)); }
function currentLevel() { return state.levels[state.game]; }
function accuracy() { const tried = state.attempted[state.game]; return tried === 0 ? 1 : state.correct[state.game] / tried; }
function getDifficultyBoost() {
  const levelBoost = 0;
  const performanceBoost = accuracy() > 0.86 && state.streak >= 3 ? 1 : accuracy() < 0.62 ? -1 : 0;
  return clamp(Math.floor(currentLevel() / 160) + levelBoost + performanceBoost, 0, 7);
}
function config() {
  const base = baseConfig[state.age];
  const boost = getDifficultyBoost();
  return {
    pairs: clamp(base.pairs + Math.floor(boost / 2), 3, 10),
    logicLength: clamp(base.logicLength + Math.floor(boost / 2), 3, 8),
    focusSize: clamp(base.focusSize + boost * 3, 9, 42),
    mathMax: base.mathMax + boost * (state.age === "senior" ? 18 : 8),
    nepaliChoices: clamp(base.nepaliChoices + Math.floor(boost / 3), 3, 6),
    storySteps: clamp(base.storySteps + Math.floor(boost / 4), 3, 4),
  };
}
function speak() {}

function setBackgroundAudio(enabled) {
  if (!audioPlayer) return;
  audioToggle.setAttribute("aria-pressed", String(enabled));
  const marker = audioToggle.querySelector(".audio-check");
  if (marker) marker.textContent = enabled ? "✓" : "□";
  audioPlayer.innerHTML = enabled
    ? `<iframe title="Background audio" src="https://www.youtube.com/embed/5jca-sWgemI?start=59&autoplay=1&loop=1&playlist=5jca-sWgemI&controls=1&modestbranding=1&playsinline=1" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
    : "";
}
function setFeedback(message, good = true) {
  feedback.textContent = message;
  feedback.style.color = good ? "#126b5b" : "#bb3158";
  if (message) speak(message);
}
function isTimeExpired() { return false; }
function renderMap() {
  const level = currentLevel();
  const windowStart = Math.max(1, level - 3);
  const nodes = Array.from({ length: 9 }, (_, index) => windowStart + index).filter((level) => level <= TOTAL_LEVELS);
  mapNodes.innerHTML = nodes.map((level) => `<span class="map-node ${level < currentLevel() ? "done" : level === currentLevel() ? "current" : ""}">${level}</span>`).join("");
}
function updateActiveTab() {
  tabs.forEach((tab) => tab.classList.toggle("active", tab.dataset.game === state.game));
}
function updateStats() {
  const level = currentLevel();
  movesLabel.textContent = `Moves: ${state.moves}`;
  scoreLabel.textContent = `Score: ${state.score}`;
  streakLabel.textContent = `Streak: ${state.streak}`;
  comboLabel.textContent = `Combo: x${1 + Math.floor(state.streak / 3)}`;
  virtualLevel.textContent = `${level} / ${TOTAL_LEVELS}`;
  accuracyLabel.textContent = `${Math.round(accuracy() * 100)}%`;
  currentGameLabel.textContent = gameInfo[state.game].skill;
  totalStars.textContent = Object.values(state.stars).reduce((sum, value) => sum + value, 0);
  renderMap();
}
function showReward(message) {
  rewardToast.textContent = message;
  rewardToast.classList.add("show");
  setTimeout(() => rewardToast.classList.remove("show"), 1000);
}
function finishRound(game, message) {
  if (state.completed) return;
  const finishedLevel = state.levels[game];
  state.completed = true;
  state.attempted[game] += 1;
  state.correct[game] += 1;
  const combo = 1 + Math.floor(state.streak / 3);
  const reward = 10 * combo + getDifficultyBoost() * 2;
  state.score += reward;
  state.streak += 1;
  state.stars[game] += 1;
  if (finishedLevel < TOTAL_LEVELS) state.levels[game] = finishedLevel + 1;
  updateStats();
  showReward(`+${reward} points | Combo x${combo}`);
  setFeedback(finishedLevel >= TOTAL_LEVELS ? `${message} You finished all 2400 levels for this game.` : `${message} Next level starts soon.`);
  if (finishedLevel < TOTAL_LEVELS) setTimeout(advanceRound, 1150);
}
function miss(message) {
  state.attempted[state.game] += 1;
  state.streak = 0;
  setFeedback(message, false);
  updateStats();
}
function advanceRound() { resetRound(); }
function resetRound() {
  roundRandom = createLevelRandom(`${state.game}|${state.age}|${currentLevel()}`);
  const info = gameInfo[state.game];
  title.textContent = info.title;
  skillLabel.textContent = info.skill;
  instructions.textContent = info.text;
  state.moves = 0;
  state.completed = false;
  state.selectedMatch = null;
  board.className = "game-board";
  board.innerHTML = "";
  setFeedback("");
  updateStats();
  speak(info.text);

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
  if (state.game === "shapeLab") renderShapeLab();
  if (state.game === "treasurePath") renderTreasurePath();
  if (state.game === "quickCount") renderQuickCount();
  if (state.game === "nepaliLetters") renderNepaliLetters();
  if (state.game === "nepaliWords") renderNepaliWords();
  if (state.game === "nepaliNumbers") renderNepaliNumbers();
}
function makeNumberOptions(answer) {
  const options = new Set([answer]);
  shuffle([-12, -7, -4, -2, -1, 1, 2, 3, 5, 8, 11, 14]).forEach((offset) => {
    if (options.size < 4) options.add(Math.max(0, answer + offset));
  });
  return shuffle([...options]);
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
function renderMemory() {
  const cfg = config();
  const cards = shuffle(icons.slice(0, cfg.pairs).flatMap((symbol) => [symbol, symbol]));
  const cols = state.age === "little" ? 4 : state.age === "junior" ? 4 : 5;
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
  if (!state.memory.first) { state.memory.first = card; return; }
  state.moves += 1;
  const first = state.memory.first;
  state.memory.first = null;
  if (first.dataset.symbol === card.dataset.symbol) {
    first.classList.add("matched");
    card.classList.add("matched");
    state.memory.matched += 1;
    setFeedback("Nice match!");
    if (state.memory.matched === config().pairs) finishRound("memory", "Memory mastered. You earned a star!");
    updateStats();
    return;
  }
  state.memory.lock = true;
  miss("Try again. Remember where those were.");
  setTimeout(() => { first.classList.add("hidden"); card.classList.add("hidden"); state.memory.lock = false; }, 760);
}
function renderLogic() {
  const cfg = config();
  const variant = currentLevel() % 3;
  let sequence;
  let answer;
  let options;
  if (variant === 0 && state.age !== "little") {
    const start = randomInt(8) + 2;
    const step = randomInt(5) + 2;
    sequence = Array.from({ length: cfg.logicLength }, (_, index) => String(start + index * step));
    answer = String(start + cfg.logicLength * step);
    options = makeNumberOptions(Number(answer)).map(String);
  } else {
    const pattern = shuffle(icons.slice(0, 5)).slice(0, state.age === "little" ? 2 : 3);
    sequence = Array.from({ length: cfg.logicLength }, (_, index) => pattern[index % pattern.length]);
    answer = pattern[cfg.logicLength % pattern.length];
    options = shuffle([answer, ...shuffle(icons.filter((icon) => !pattern.includes(icon))).slice(0, 3)]);
  }
  board.innerHTML = `<div class="logic-panel"><div class="sequence">${sequence.map((item) => `<div class="seq-item">${item}</div>`).join("")}<div class="seq-item">?</div></div><div class="answer-row">${options.map((item) => `<button class="answer-button" data-answer="${item}">${item}</button>`).join("")}</div></div>`;
  wireAnswers(answer, "logic", "Pattern solved. Logic star earned!");
}
function renderAttention() {
  const cfg = config();
  const targetCount = state.age === "little" ? 3 : state.age === "junior" ? 5 : 7;
  const target = shuffle(["STAR", "KEY", "LEAF"])[0];
  const targetPositions = new Set(shuffle([...Array(cfg.focusSize).keys()]).slice(0, targetCount));
  let found = 0;
  board.className = "game-board focus-grid";
  board.style.setProperty("--cols", state.age === "little" ? 4 : state.age === "junior" ? 5 : 6);
  Array.from({ length: cfg.focusSize }).forEach((_, index) => {
    const isTarget = targetPositions.has(index);
    const button = document.createElement("button");
    button.className = isTarget ? "tile target" : "tile";
    button.type = "button";
    button.textContent = isTarget ? target : shuffle(distractorIcons)[0];
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
        miss(`Careful eyes. Only tap ${target} tiles.`);
      }
      updateStats();
    });
    board.append(button);
  });
}
function renderMath() {
  const max = config().mathMax;
  const a = randomInt(max) + 1;
  const b = randomInt(max) + 1;
  const variant = currentLevel() % (state.age === "little" ? 2 : 4);
  let prompt;
  let answer;
  if (variant === 1) {
    answer = Math.max(a, b) - Math.min(a, b);
    prompt = `${Math.max(a, b)} - ${Math.min(a, b)} = ?`;
  } else if (variant === 2) {
    const factor = randomInt(9) + 2;
    answer = Math.min(12, Math.floor(a / 3) + 2) * factor;
    prompt = `${Math.min(12, Math.floor(a / 3) + 2)} x ${factor} = ?`;
  } else if (variant === 3) {
    answer = a;
    prompt = `? + ${b} = ${a + b}`;
  } else {
    answer = a + b;
    prompt = `${a} + ${b} = ?`;
  }
  board.innerHTML = `<div class="quiz-panel"><p class="question-text">${prompt}</p><div class="answer-row">${makeNumberOptions(answer).map((item) => `<button class="answer-button" data-answer="${item}">${item}</button>`).join("")}</div></div>`;
  wireAnswers(String(answer), "math", "Number quest complete. Math star earned!");
}
function renderWords() {
  const answer = shuffle(wordSets[state.age])[0];
  const letters = shuffle(answer.split(""));
  state.word = { answer, entry: "" };
  board.innerHTML = `<div class="word-panel"><div class="word-slots">${answer.split("").map(() => `<div class="slot"></div>`).join("")}</div><div class="letter-bank">${letters.map((letter, index) => `<button class="letter" data-index="${index}" data-letter="${letter}">${letter}</button>`).join("")}</div></div>`;
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
      } else setFeedback("Good start. Keep building.");
      updateStats();
    });
  });
}
function renderScience() {
  const question = shuffle(scienceQuestions)[0];
  board.innerHTML = `<div class="quiz-panel"><p class="question-text">${question.q}</p><div class="answer-row">${shuffle(question.options).map((item) => `<button class="answer-button" data-answer="${item}">${item}</button>`).join("")}</div></div>`;
  wireAnswers(question.a, "science", "Science spark unlocked!");
}
function renderTyping() {
  const prompt = shuffle(typingPrompts[state.age])[0];
  board.innerHTML = `<div class="typing-panel"><p class="question-text">${prompt}</p><input class="typing-input" type="text" aria-label="Type the phrase" autocomplete="off" maxlength="80" /><div class="answer-row"><button class="answer-button" data-action="check">Check</button></div></div>`;
  const input = board.querySelector(".typing-input");
  const check = board.querySelector("[data-action='check']");
  input.focus();
  function submit() {
    if (state.completed) return;
    state.moves += 1;
    if (input.value.trim().toLowerCase() === prompt.toLowerCase()) finishRound("typing", "Typing trail complete!");
    else miss("Almost. Type the phrase exactly and try again.");
  }
  check.addEventListener("click", submit);
  input.addEventListener("keydown", (event) => { if (event.key === "Enter") submit(); });
}
function renderOddOne() {
  const challenge = shuffle(oddOneSets)[0];
  board.innerHTML = `<div class="quiz-panel"><p class="question-text">Which one is different?</p><div class="answer-row">${shuffle(challenge.group).map((item) => `<button class="answer-button" data-answer="${item}">${item}</button>`).join("")}</div></div>`;
  wireAnswers(challenge.odd, "oddOne", `${challenge.reason} Reasoning star earned!`);
}
function renderColorCode() {
  const challenge = shuffle(colorChallenges)[0];
  const choices = ["RED", "BLUE", "GREEN", "ORANGE", "PINK", "YELLOW", "PURPLE", "TEAL"];
  const options = shuffle([challenge.answer, ...shuffle(choices.filter((item) => item !== challenge.answer)).slice(0, 3)]);
  board.innerHTML = `<div class="quiz-panel"><p class="question-text color-word" style="color:${challenge.ink}">${challenge.word}</p><div class="answer-row">${options.map((item) => `<button class="answer-button" data-answer="${item}">${item}</button>`).join("")}</div></div>`;
  wireAnswers(challenge.answer, "colorCode", "Sharp focus! Color Code star earned!");
}
function renderStoryOrder() {
  const cfg = config();
  const story = shuffle(storySets)[0];
  const steps = story.steps.slice(0, cfg.storySteps);
  state.storyEntry = [];
  board.innerHTML = `<div class="quiz-panel"><p class="question-text">${story.title}</p><div class="word-slots">${steps.map(() => `<div class="slot"></div>`).join("")}</div><div class="answer-row">${shuffle(steps).map((step) => `<button class="answer-button" data-step="${step}">${step}</button>`).join("")}</div></div>`;
  board.querySelectorAll(".answer-button").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.completed || button.disabled) return;
      const next = state.storyEntry.length;
      state.moves += 1;
      if (button.dataset.step === steps[next]) {
        state.storyEntry.push(button.dataset.step);
        board.querySelectorAll(".slot")[next].textContent = button.dataset.step;
        button.disabled = true;
        button.classList.add("correct");
        if (state.storyEntry.length === steps.length) finishRound("storyOrder", "Story solved! Sequencing star earned!");
      } else {
        button.classList.add("wrong");
        miss("That step comes later. Think first, middle, last.");
      }
      updateStats();
    });
  });
}
function renderShapeLab() {
  const targetShape = shuffle(shapeItems)[0];
  const targetColor = shuffle(shapeColors)[0];
  const askColor = currentLevel() % 2 === 0;
  const count = state.age === "little" ? 8 : state.age === "junior" ? 12 : 16;
  let hasAnswer = false;
  board.className = "game-board shape-grid";
  board.style.setProperty("--cols", state.age === "little" ? 4 : 4);
  instructions.textContent = askColor ? `Tap a ${targetColor} tile.` : `Tap the ${targetShape}.`;

  Array.from({ length: count }).forEach((_, index) => {
    const shape = index === count - 1 && !hasAnswer ? targetShape : shuffle(shapeItems)[0];
    const color = index === count - 1 && !hasAnswer ? targetColor : shuffle(shapeColors)[0];
    const isAnswer = askColor ? color === targetColor : shape === targetShape;
    if (isAnswer) hasAnswer = true;
    const button = document.createElement("button");
    button.className = `shape-tile ${color}`;
    button.type = "button";
    button.dataset.answer = String(isAnswer);
    button.innerHTML = `<span class="shape-icon ${shape.toLowerCase()}"></span><span>${shape}</span>`;
    button.addEventListener("click", () => {
      if (state.completed) return;
      state.moves += 1;
      if (button.dataset.answer === "true") {
        button.classList.add("correct");
        finishRound("shapeLab", "Shape Lab complete!");
      } else {
        button.classList.add("wrong");
        miss("Try another tile.");
      }
      updateStats();
    });
    board.append(button);
  });
}

function renderTreasurePath() {
  const size = state.age === "little" ? 4 : 5;
  const treasure = { row: size - 1, col: size - 1 };
  let player = { row: 0, col: 0 };
  const rocks = new Set();
  const rockCount = state.age === "little" ? 2 : state.age === "junior" ? 4 : 6;
  while (rocks.size < rockCount) {
    const row = randomInt(size);
    const col = randomInt(size);
    if ((row === 0 && col === 0) || (row === treasure.row && col === treasure.col) || row === col) continue;
    rocks.add(`${row}-${col}`);
  }
  board.className = "game-board path-panel";
  board.innerHTML = `<div class="path-grid" style="--path-size:${size}"></div><div class="path-controls" aria-label="Path controls"><button class="answer-button up" data-move="up">↑</button><button class="answer-button left" data-move="left">←</button><button class="answer-button right" data-move="right">→</button><button class="answer-button down" data-move="down">↓</button></div>`;
  const grid = board.querySelector(".path-grid");
  function draw() {
    grid.innerHTML = "";
    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        const cell = document.createElement("div");
        cell.className = "path-cell";
        if (rocks.has(`${row}-${col}`)) { cell.classList.add("rock"); cell.textContent = "X"; }
        if (row === treasure.row && col === treasure.col) { cell.classList.add("treasure"); cell.textContent = "★"; }
        if (row === player.row && col === player.col) { cell.classList.add("player"); cell.textContent = "GO"; }
        grid.append(cell);
      }
    }
  }
  draw();
  board.querySelectorAll("[data-move]").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.completed) return;
      const next = { ...player };
      if (button.dataset.move === "up") next.row -= 1;
      if (button.dataset.move === "down") next.row += 1;
      if (button.dataset.move === "left") next.col -= 1;
      if (button.dataset.move === "right") next.col += 1;
      state.moves += 1;
      if (next.row < 0 || next.col < 0 || next.row >= size || next.col >= size || rocks.has(`${next.row}-${next.col}`)) {
        miss("Blocked. Choose a clear path.");
      } else {
        player = next;
        draw();
        if (player.row === treasure.row && player.col === treasure.col) finishRound("treasurePath", "Treasure found!");
        else setFeedback("Good move.");
      }
      updateStats();
    });
  });
}

function renderQuickCount() {
  const cfg = config();
  const target = shuffle(["STAR", "DOT", "GEM"])[0];
  const count = clamp(randomInt((cfg.nepaliChoices + 3)) + 3, 3, 12);
  const total = count + (state.age === "little" ? 4 : state.age === "junior" ? 8 : 12);
  const items = shuffle([...Array(count).fill(target), ...Array(total - count).fill(null).map(() => shuffle(distractorIcons)[0])]);
  board.className = "game-board count-panel";
  board.innerHTML = `<p class="question-text small-question">How many ${target}?</p><div class="count-cloud">${items.map((item) => `<span>${item}</span>`).join("")}</div><div class="answer-row">${makeNumberOptions(count).map((item) => `<button class="answer-button" data-answer="${item}">${item}</button>`).join("")}</div>`;
  wireAnswers(String(count), "quickCount", "Quick Count complete!");
}
function renderNepaliLetters() {
  const cfg = config();
  const start = randomInt((nepaliLetters.length - 4));
  const sequence = nepaliLetters.slice(start, start + 3);
  const answer = nepaliLetters[start + 3];
  const options = shuffle([answer, ...shuffle(nepaliLetters.filter((letter) => !sequence.includes(letter) && letter !== answer)).slice(0, cfg.nepaliChoices)]);
  board.innerHTML = `<div class="logic-panel nepali-text"><div class="sequence">${sequence.map((item) => `<div class="seq-item">${item}</div>`).join("")}<div class="seq-item">?</div></div><div class="answer-row">${options.map((item) => `<button class="answer-button nepali-text" data-answer="${item}">${item}</button>`).join("")}</div></div>`;
  wireAnswers(answer, "nepaliLetters", "राम्रो! नेपाली अक्षर सिक्दै छौ!");
}
function renderMatchGame(items, leftKey, rightKey, game, successMessage) {
  const count = state.age === "little" ? 3 : state.age === "junior" ? 4 : 5;
  const pairs = shuffle(items).slice(0, count);
  const cards = shuffle(pairs.flatMap((item, pair) => [{ pair, side: "left", label: item[leftKey] }, { pair, side: "right", label: item[rightKey] }]));
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
      if (!state.selectedMatch) { state.selectedMatch = button; button.classList.add("selected"); return; }
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
function renderNepaliWords() { renderMatchGame(nepaliWords, "word", "meaning", "nepaliWords", "Great match! नेपाली शब्द star earned!"); }
function renderNepaliNumbers() { renderMatchGame(nepaliNumbers, "np", "en", "nepaliNumbers", "Great number match! नेपाली अंक star earned!"); }
function showHint() {
  const hints = {
    memory: "Flip slowly and say each symbol out loud.", logic: "Look at what repeats or what number step is changing.", attention: "Scan row by row instead of jumping around.",
    math: "Break big numbers into smaller friendly parts.", words: `The word begins with ${state.word.answer ? state.word.answer[0] : "a strong letter"}.`,
    science: "Read every option before choosing.", typing: "Check spaces and spelling before pressing Enter.", oddOne: "Ask: what category do most items share?",
    colorCode: "Look at the color of the letters, not the word.", storyOrder: "Think first, next, last.",
    shapeLab: "Check the mission, then match either the shape or color.",
    treasurePath: "Move around blocked squares and plan two steps ahead.",
    quickCount: "Count only the target symbol and ignore the distractors.", nepaliLetters: "Say the Nepali alphabet out loud from the first shown letter.",
    nepaliWords: "Try saying the Nepali word, then match its meaning.", nepaliNumbers: "Count from १ to १५ and compare the shapes.",
  };
  setFeedback(hints[state.game]);
}

tabs.forEach((tab) => {
  tab.addEventListener("click", () => { state.game = tab.dataset.game; updateActiveTab(); resetRound(); gameStage.scrollIntoView({ behavior: "smooth", block: "start" }); });
});
ageSelect.addEventListener("change", () => { state.age = ageSelect.value; resetRound(); });
newRound.addEventListener("click", resetRound);
hintButton.addEventListener("click", showHint);
audioToggle.addEventListener("click", () => setBackgroundAudio(audioToggle.getAttribute("aria-pressed") !== "true"));

window.addEventListener("load", () => {
  setTimeout(() => loadingScreen?.classList.add("hide"), 450);
});
setTimeout(() => loadingScreen?.classList.add("hide"), 1600);

updateActiveTab();
resetRound();

