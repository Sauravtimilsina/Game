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
const gameOrder = ["memory", "logic", "attention", "math", "tugOfWar", "codeBreaker", "words", "science", "typing", "colorCode", "storyOrder", "shapeLab", "treasurePath", "quickCount", "xoGame", "numberSort", "nepaliLetters", "nepaliWords", "nepaliNumbers"];
const icons = ["SUN", "MOON", "STAR", "TREE", "BELL", "KEY", "BOAT", "BOOK", "KITE", "HEART", "LEAF", "CUP", "RING", "CUBE", "FLAG", "NOTE", "ROCKET", "CROWN", "DRUM", "PEAR"];
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
  { word: "सूर्य", meaning: "sun" }, { word: "चन्द्रमा", meaning: "moon" }, { word: "नदी", meaning: "river" }, { word: "जंगल", meaning: "forest" },
  { word: "विज्ञान", meaning: "science" }, { word: "गणित", meaning: "math" }, { word: "प्रश्न", meaning: "question" }, { word: "उत्तर", meaning: "answer" },
];
const wordSets = {
  little: ["SUN", "CAT", "MAP", "RED", "BUS", "HAT", "CUP", "PEN", "FISH", "TREE", "MOON", "BALL"],
  junior: ["BRAIN", "PLANET", "SMILE", "OCEAN", "TRAIN", "BRAVE", "LIGHT", "QUEST", "PUZZLE", "ROCKET", "FOREST", "NUMBER"],
  senior: ["ALGORITHM", "FRACTION", "EQUATION", "MEMORY", "SIGNAL", "VECTOR", "PATTERN", "LOGICAL", "BALANCE", "STRATEGY", "DISCOVERY", "CREATIVE"],
};
const typingPrompts = {
  little: ["sun and moon", "red bus goes", "I can read", "big star", "cat on a mat"],
  junior: [
    "happy learners solve bright puzzles",
    "focus first then answer with care",
    "the rocket needs a clever pilot",
    "small clues can unlock big ideas",
  ],
  senior: [
    "Practice builds skill when you notice each mistake and try again.",
    "Curiosity makes learning fun because every answer opens a new question.",
    "Solve the pattern, check the evidence, and explain your reasoning clearly.",
    "A calm mind can handle hard puzzles one careful step at a time.",
  ],
};
const scienceQuestions = [
  { q: "Which planet do we live on?", a: "Earth", options: ["Earth", "Mars", "Jupiter", "Venus"] },
  { q: "What do plants need to make food?", a: "Sunlight", options: ["Sunlight", "Plastic", "Smoke", "Sand only"] },
  { q: "How many legs does an insect have?", a: "6", options: ["4", "6", "8", "10"] },
  { q: "What gas do humans breathe in to live?", a: "Oxygen", options: ["Oxygen", "Helium", "Steam", "Dust"] },
  { q: "Which part of your body helps you think?", a: "Brain", options: ["Brain", "Knee", "Elbow", "Hair"] },
  { q: "What tool helps us see tiny things?", a: "Microscope", options: ["Microscope", "Spoon", "Ladder", "Mirror only"] },
  { q: "What force pulls objects toward Earth?", a: "Gravity", options: ["Gravity", "Magnet color", "Friction only", "Sound"] },
  { q: "Which state of matter keeps its own shape?", a: "Solid", options: ["Solid", "Liquid", "Gas", "Steam"] },
  { q: "What organ pumps blood around the body?", a: "Heart", options: ["Heart", "Lung", "Stomach", "Bone"] },
  { q: "Which simple machine is a ramp?", a: "Inclined plane", options: ["Inclined plane", "Pulley", "Wheel", "Screw"] },
  { q: "What process changes liquid water into vapor?", a: "Evaporation", options: ["Evaporation", "Freezing", "Melting", "Condensing"] },
  { q: "Which particle has a negative electric charge?", a: "Electron", options: ["Electron", "Proton", "Neutron", "Molecule"] },
  { q: "What do we call animals that eat both plants and animals?", a: "Omnivores", options: ["Omnivores", "Herbivores", "Carnivores", "Minerals"] },
  { q: "Which body system carries oxygen in blood?", a: "Circulatory", options: ["Circulatory", "Digestive", "Skeletal", "Nervous only"] },
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
  little: { pairs: 5, logicLength: 5, focusSize: 18, mathMax: 18, nepaliChoices: 4, storySteps: 3 },
  junior: { pairs: 9, logicLength: 7, focusSize: 28, mathMax: 55, nepaliChoices: 5, storySteps: 4 },
  senior: { pairs: 12, logicLength: 8, focusSize: 42, mathMax: 120, nepaliChoices: 6, storySteps: 4 },
};
const gameInfo = {
  memory: { title: "Memory Match", skill: "Memory", text: "Flip cards and find every matching pair." },
  logic: { title: "Pattern Logic", skill: "Logic", text: "Study the sequence, then choose the missing piece." },
  attention: { title: "Focus Finder", skill: "Attention", text: "Find every highlighted target before your focus slips." },
  math: { title: "Number Quest", skill: "Numbers", text: "Solve multi-step arithmetic that gets sharper as your level climbs." },
  tugOfWar: { title: "Math Tug of War", skill: "Numbers", text: "Answer on your turn. Correct answers pull the rope; timeouts pass. First to 10 wins." },
  codeBreaker: { title: "Code Breaker", skill: "Logic", text: "Guess the secret number code using exact and close-position clues." },
  words: { title: "Word Builder", skill: "Words", text: "Tap letters in order to rebuild the hidden word." },
  science: { title: "Science Spark", skill: "Learning", text: "Answer a friendly science question and learn one fact at a time." },
  typing: { title: "Typing Trail", skill: "Learning", text: "Type the phrase exactly to practice reading, focus, and keyboard confidence." },
  colorCode: { title: "Color Code", skill: "Attention", text: "Ignore the word meaning. Choose the ink color you see." },
  storyOrder: { title: "Story Order", skill: "Problem Solving", text: "Tap the steps in the correct order to complete the mini story." },
  shapeLab: { title: "Shape Lab", skill: "Creativity", text: "Find the shape or color that matches the mission." },
  treasurePath: { title: "Path Quest", skill: "Planning", text: "Choose the next move to reach the treasure." },
  quickCount: { title: "Quick Count", skill: "Maths", text: "Count the targets quickly and choose the number." },
  xoGame: { title: "X O Challenge", skill: "Strategy", text: "Place X, block O, and try to win the board." },
  numberSort: { title: "Number Sort", skill: "Logic", text: "Tap the numbers from smallest to biggest." },
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
let audioContext = null;
let audioOscillator = null;
let audioGain = null;

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
    pairs: clamp(base.pairs + Math.floor(boost / 2), 3, 16),
    logicLength: clamp(base.logicLength + Math.floor(boost / 2), 3, 10),
    focusSize: clamp(base.focusSize + boost * 4, 9, 64),
    mathMax: base.mathMax + boost * (state.age === "senior" ? 18 : 8),
    nepaliChoices: clamp(base.nepaliChoices + Math.floor(boost / 3), 3, 6),
    storySteps: clamp(base.storySteps + Math.floor(boost / 4), 3, 4),
  };
}
function speak() {}

function updateAudioButton(enabled) {
  audioToggle.setAttribute("aria-pressed", String(enabled));
  const marker = audioToggle.querySelector(".audio-check");
  if (marker) marker.textContent = enabled ? "ON" : "[ ]";
}

function setBackgroundAudio(enabled) {
  updateAudioButton(enabled);
  if (!enabled) {
    if (audioOscillator) audioOscillator.stop();
    audioOscillator = null;
    audioGain = null;
    return;
  }

  audioContext = audioContext || new (window.AudioContext || window.webkitAudioContext)();
  audioOscillator = audioContext.createOscillator();
  audioGain = audioContext.createGain();
  audioOscillator.type = "sine";
  audioOscillator.frequency.value = 220;
  audioGain.gain.value = 0.035;
  audioOscillator.connect(audioGain).connect(audioContext.destination);
  audioOscillator.start();
}
function setFeedback(message, good = true) {
  feedback.textContent = message;
  feedback.style.color = good ? "#126b5b" : "#bb3158";
  if (message) speak(message);
}
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
  state.storyEntry = [];
  board.className = "game-board";
  board.innerHTML = "";
  setFeedback("");
  updateStats();
  speak(info.text);

  if (state.game === "memory") renderMemory();
  if (state.game === "logic") renderLogic();
  if (state.game === "attention") renderAttention();
  if (state.game === "math") renderMath();
  if (state.game === "tugOfWar") renderTugOfWar();
  if (state.game === "codeBreaker") renderCodeBreaker();
  if (state.game === "words") renderWords();
  if (state.game === "science") renderScience();
  if (state.game === "typing") renderTyping();
  if (state.game === "colorCode") renderColorCode();
  if (state.game === "storyOrder") renderStoryOrder();
  if (state.game === "shapeLab") renderShapeLab();
  if (state.game === "treasurePath") renderTreasurePath();
  if (state.game === "quickCount") renderQuickCount();
  if (state.game === "xoGame") renderXOGame();
  if (state.game === "numberSort") renderNumberSort();
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
  const cols = state.age === "little" ? 4 : state.age === "junior" ? 5 : 6;
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
  const targetCount = clamp((state.age === "little" ? 3 : state.age === "junior" ? 6 : 9) + Math.floor(getChallengeTier() / 2), 3, 16);
  const target = shuffle(["STAR", "KEY", "LEAF"])[0];
  const targetPositions = new Set(shuffle([...Array(cfg.focusSize).keys()]).slice(0, targetCount));
  let found = 0;
  board.className = "game-board focus-grid";
  board.style.setProperty("--cols", state.age === "little" ? 4 : state.age === "junior" ? 6 : 8);
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
function getChallengeTier() {
  const ageTier = state.age === "little" ? 0 : state.age === "junior" ? 1 : 2;
  return clamp(ageTier + Math.floor(currentLevel() / 80) + Math.floor(state.streak / 4), 0, 9);
}
function makeArithmeticChallenge() {
  const tier = getChallengeTier();
  const max = config().mathMax + tier * 12;
  const a = randomInt(max) + 2;
  const b = randomInt(max) + 2;
  const c = randomInt(Math.max(6, Math.floor(max / 3))) + 2;
  const variantLimit = state.age === "little" ? 3 : state.age === "junior" ? 6 : 8;
  const variant = (currentLevel() + tier + randomInt(variantLimit)) % variantLimit;
  if (variant === 1) {
    const big = Math.max(a, b) + c;
    const small = Math.min(a, b);
    return { prompt: `${big} - ${small} = ?`, answer: big - small };
  }
  if (variant === 2) {
    const x = randomInt(state.age === "little" ? 5 : 11) + 2;
    const y = randomInt(state.age === "little" ? 5 : 12) + 2;
    return { prompt: `${x} x ${y} = ?`, answer: x * y };
  }
  if (variant === 3) return { prompt: `? + ${b} = ${a + b}`, answer: a };
  if (variant === 4) {
    const divisor = randomInt(10) + 2;
    const quotient = randomInt(12 + tier) + 2;
    return { prompt: `${divisor * quotient} / ${divisor} = ?`, answer: quotient };
  }
  if (variant === 5) return { prompt: `(${a} + ${c}) - ${b} = ?`, answer: a + c - b };
  if (variant === 6) {
    const x = randomInt(9) + 2;
    const y = randomInt(9) + 2;
    return { prompt: `${x} x ${y} + ${c} = ?`, answer: x * y + c };
  }
  if (variant === 7) {
    const divisor = randomInt(8) + 2;
    const quotient = randomInt(14) + 3;
    return { prompt: `? / ${divisor} = ${quotient}`, answer: divisor * quotient };
  }
  return { prompt: `${a} + ${b} = ?`, answer: a + b };
}
function makeHardNumberOptions(answer, count = 5) {
  const options = new Set([answer]);
  const offsets = shuffle([-24, -18, -12, -9, -6, -4, -3, -2, -1, 1, 2, 3, 4, 6, 9, 12, 18, 24]);
  offsets.forEach((offset) => {
    if (options.size < count) options.add(answer + offset);
  });
  while (options.size < count) options.add(answer + randomInt(41) - 20);
  return shuffle([...options]);
}
function renderMath() {
  const challenge = makeArithmeticChallenge();
  const optionCount = state.age === "little" ? 4 : getChallengeTier() > 3 ? 6 : 5;
  board.innerHTML = `<div class="quiz-panel challenge-panel"><p class="question-text">${challenge.prompt}</p><p class="micro-copy">Level pressure: ${getChallengeTier() + 1}</p><div class="answer-row">${makeHardNumberOptions(challenge.answer, optionCount).map((item) => `<button class="answer-button" data-answer="${item}">${item}</button>`).join("")}</div></div>`;
  wireAnswers(String(challenge.answer), "math", "Number quest complete. Math star earned!");
}
function renderTugOfWar() {
  state.completed = false;
  const winningScore = 10;
  const questionSeconds = 20;
  const botDelay = clamp(5600 - getChallengeTier() * 300 - state.streak * 70, 2200, 5600);
  let scores = { 1: 0, 2: 0 };
  let activePlayer = 1;
  let mode = "single";
  let questionTimer = null;
  let botTimer = null;
  state.tugSession = (state.tugSession || 0) + 1;
  const session = state.tugSession;

  board.className = "game-board tug-panel";
  board.innerHTML = `<div class="mode-row"><button class="answer-button active" data-mode="single">Single vs Bot</button><button class="answer-button" data-mode="multi">Two Players</button></div><div class="tug-scoreboard"><span class="p1-score">Player 1: 0 / ${winningScore}</span><span>Center line</span><span class="p2-score">Bot: 0 / ${winningScore}</span></div><div class="tug-arena"><div class="tug-side p1"><span class="tug-person left-person"></span><strong>Player 1</strong></div><div class="rope-track" aria-label="Tug of war rope"><span class="win-line left-win">P1 WIN</span><span class="center-line">CENTER</span><span class="win-line right-win">P2 WIN</span><span class="rope-hand left-hand"></span><span class="rope-hand right-hand"></span><span class="rope-marker" style="--rope:0"><span class="rope-knot"></span></span></div><div class="tug-side p2"><span class="tug-person right-person"></span><strong>Bot</strong></div></div><div class="tug-question split"></div>`;

  const modeButtons = [...board.querySelectorAll("[data-mode]")];
  const marker = board.querySelector(".rope-marker");
  const leftHand = board.querySelector(".left-hand");
  const rightHand = board.querySelector(".right-hand");
  const p1ScoreLabel = board.querySelector(".p1-score");
  const p2ScoreLabel = board.querySelector(".p2-score");
  const p2Name = board.querySelector(".p2 strong");
  const rightWin = board.querySelector(".right-win");
  const questionBox = board.querySelector(".tug-question");

  function isLive() { return !state.completed && state.game === "tugOfWar" && state.tugSession === session; }
  function clearTugTimers() {
    clearInterval(questionTimer);
    clearTimeout(botTimer);
    questionTimer = null;
    botTimer = null;
  }
  function playerName(player) { return player === 1 ? "Player 1" : mode === "single" ? "Bot" : "Player 2"; }
  function ropeOffset() { return clamp((scores[1] - scores[2]) / winningScore, -1, 1); }
  function updateMatchView() {
    const offset = ropeOffset();
    marker.style.setProperty("--rope", offset);
    leftHand.style.setProperty("--rope", offset);
    rightHand.style.setProperty("--rope", offset);
    p1ScoreLabel.textContent = `Player 1: ${scores[1]} / ${winningScore}`;
    p2ScoreLabel.textContent = `${playerName(2)}: ${scores[2]} / ${winningScore}`;
    board.querySelector(".p1").classList.toggle("active-side", activePlayer === 1);
    board.querySelector(".p2").classList.toggle("active-side", activePlayer === 2);
  }
  function showWinner(player) {
    clearTugTimers();
    state.completed = true;
    const name = playerName(player);
    board.classList.add(player === 1 ? "p1-won" : "p2-won");
        const celebrationPieces = Array.from({ length: 34 }, (_, index) => `<span class="celebration-piece piece-${index % 6}" style="--x:${(index % 11) * 9 - 45}%; --delay:${(index % 9) * 0.12}s; --spin:${index % 2 === 0 ? 1 : -1};"></span>`).join("");
    questionBox.innerHTML = `<section class="tug-winner ${player === 1 ? "blue-win" : "red-win"}"><div class="celebration-field" aria-hidden="true">${celebrationPieces}</div><h3>${name} wins!</h3><p>${name} answered ${winningScore} questions correctly.</p><button class="primary-button" data-action="restart-tug">Restart match</button></section>`;
    setFeedback(`${name} wins the Math Tug of War!`);
    state.attempted.tugOfWar += 1;
    state.correct.tugOfWar += 1;
    state.streak += 1;
    state.score += 25 + getChallengeTier() * 3;
    state.stars.tugOfWar += 1;
    if (state.levels.tugOfWar < TOTAL_LEVELS) state.levels.tugOfWar += 1;
    updateStats();
    board.querySelector("[data-action='restart-tug']").addEventListener("click", renderTugOfWar);
  }
  function awardPoint(player) {
    scores[player] += 1;
    activePlayer = player === 1 ? 2 : 1;
    setFeedback(`${playerName(player)} correct. Rope moves to ${playerName(player)}.`);
    state.moves += 1;
    updateMatchView();
    updateStats();
    if (scores[player] >= winningScore) showWinner(player);
    else setTimeout(startTurn, 650);
  }
  function passTurn(reason) {
    setFeedback(`${reason} Turn passes to ${playerName(activePlayer === 1 ? 2 : 1)}. Rope stays where it is.`, false);
    activePlayer = activePlayer === 1 ? 2 : 1;
    updateMatchView();
    setTimeout(startTurn, 650);
  }
  function makePlayerPanel(player, active) {
    const panel = document.createElement("section");
    panel.className = `tug-player-panel player-${player} ${active ? "active-turn" : "waiting-turn"}`;
    panel.innerHTML = `<div class="tug-panel-head"><strong>${playerName(player)}</strong><span class="timer">${active ? `${questionSeconds}s` : "Waiting"}</span><span class="mistakes">Wrong: 0/3</span></div><p class="question-text small-question"></p><div class="answer-row"></div>`;
    questionBox.append(panel);
    return panel;
  }
  function renderWaiting(panel, player) {
    panel.querySelector(".question-text").textContent = `${playerName(player)} waits for the pass.`;
    panel.querySelector(".answer-row").innerHTML = `<span class="bot-status">No move until your turn</span>`;
    panel.querySelector(".mistakes").textContent = "Wrong: 0/3";
  }
  function startBotTurn(panel) {
    panel.querySelector(".question-text").textContent = `Bot is solving. You get the next question if it misses the clock.`;
    panel.querySelector(".answer-row").innerHTML = `<span class="bot-status">Bot thinking...</span>`;
    botTimer = setTimeout(() => {
      if (!isLive()) return;
      awardPoint(2);
    }, botDelay);
    questionTimer = setTimeout(() => {
      if (!isLive()) return;
      clearTimeout(botTimer);
      passTurn("Bot ran out of time.");
    }, questionSeconds * 1000);
  }
  function startHumanTurn(panel, player) {
    let seconds = questionSeconds;
    let wrong = 0;
    const challenge = makeArithmeticChallenge();
    const options = makeHardNumberOptions(challenge.answer, state.age === "little" ? 4 : 5);
    const question = panel.querySelector(".question-text");
    const timer = panel.querySelector(".timer");
    const mistakes = panel.querySelector(".mistakes");
    const row = panel.querySelector(".answer-row");
    question.textContent = challenge.prompt;
    timer.textContent = `${seconds}s`;
    timer.classList.remove("danger");
    mistakes.textContent = "Wrong: 0/3";
    row.innerHTML = options.map((item) => `<button class="answer-button" data-answer="${item}">${item}</button>`).join("");
    questionTimer = setInterval(() => {
      if (!isLive()) { clearInterval(questionTimer); return; }
      seconds -= 1;
      timer.textContent = `${seconds}s`;
      timer.classList.toggle("danger", seconds <= 5);
      if (seconds <= 0) {
        clearInterval(questionTimer);
        passTurn(`${playerName(player)} ran out of time.`);
      }
    }, 1000);
    row.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", () => {
        if (!isLive() || button.disabled) return;
        if (Number(button.dataset.answer) === challenge.answer) {
          clearInterval(questionTimer);
          row.querySelectorAll("button").forEach((item) => item.disabled = true);
          awardPoint(player);
          return;
        }
        wrong += 1;
        button.classList.add("wrong");
        button.disabled = true;
        mistakes.textContent = `Wrong: ${wrong}/3`;
        if (wrong >= 3) {
          clearInterval(questionTimer);
          passTurn(`${playerName(player)} had 3 wrong answers.`);
        } else setFeedback("Wrong answer. Try again before time runs out.", false);
      });
    });
  }
  function startTurn() {
    if (!isLive()) return;
    clearTugTimers();
    updateMatchView();
    questionBox.innerHTML = "";
    const p1Panel = makePlayerPanel(1, activePlayer === 1);
    const p2Panel = makePlayerPanel(2, activePlayer === 2);
    if (activePlayer === 1) {
      startHumanTurn(p1Panel, 1);
      renderWaiting(p2Panel, 2);
    } else {
      renderWaiting(p1Panel, 1);
      if (mode === "single") startBotTurn(p2Panel);
      else startHumanTurn(p2Panel, 2);
    }
  }
  function resetMatch() {
    state.completed = false;
    clearTugTimers();
    scores = { 1: 0, 2: 0 };
    activePlayer = 1;
    board.classList.remove("p1-won", "p2-won");
    updateMatchView();
    startTurn();
  }

  modeButtons.forEach((button) => button.addEventListener("click", () => {
    mode = button.dataset.mode;
    modeButtons.forEach((item) => item.classList.toggle("active", item === button));
    p2Name.textContent = mode === "single" ? "Bot" : "Player 2";
    rightWin.textContent = mode === "single" ? "BOT WIN" : "P2 WIN";
    resetMatch();
  }));
  resetMatch();
}
function renderCodeBreaker() {
  const length = state.age === "little" ? 3 : getChallengeTier() > 4 ? 5 : 4;
  const maxDigit = state.age === "little" ? 5 : 9;
  const secret = Array.from({ length }, () => String(randomInt(maxDigit + 1))).join("");
  const maxGuesses = state.age === "little" ? 7 : getChallengeTier() > 4 ? 5 : 6;
  let guesses = 0;
  board.className = "game-board code-panel";
  board.innerHTML = `<div class="quiz-panel"><p class="question-text small-question">Secret ${length}-digit code</p><input class="typing-input code-input" inputmode="numeric" maxlength="${length}" aria-label="Code guess" autocomplete="off" /><div class="answer-row"><button class="answer-button" data-action="guess">Guess</button></div><div class="code-history"></div></div>`;
  const input = board.querySelector(".code-input");
  const history = board.querySelector(".code-history");
  const button = board.querySelector("[data-action='guess']");
  function scoreGuess(guess) {
    let exact = 0;
    let close = 0;
    const secretLeft = [];
    const guessLeft = [];
    for (let i = 0; i < length; i += 1) {
      if (guess[i] === secret[i]) exact += 1;
      else { secretLeft.push(secret[i]); guessLeft.push(guess[i]); }
    }
    guessLeft.forEach((digit) => {
      const index = secretLeft.indexOf(digit);
      if (index >= 0) { close += 1; secretLeft.splice(index, 1); }
    });
    return { exact, close };
  }
  function submit() {
    if (state.completed) return;
    const guess = input.value.replace(/\D/g, "").slice(0, length);
    if (guess.length !== length) { setFeedback(`Enter ${length} digits.`, false); return; }
    guesses += 1;
    state.moves += 1;
    const result = scoreGuess(guess);
    const row = document.createElement("div");
    const guessLabel = document.createElement("strong");
    const exactLabel = document.createElement("span");
    const closeLabel = document.createElement("span");
    row.className = "code-row";
    guessLabel.textContent = guess;
    exactLabel.textContent = `${result.exact} exact`;
    closeLabel.textContent = `${result.close} close`;
    row.append(guessLabel, exactLabel, closeLabel);
    history.prepend(row);
    input.value = "";
    if (result.exact === length) finishRound("codeBreaker", "Code cracked. Logic star earned!");
    else if (guesses >= maxGuesses) { miss(`Code escaped: ${secret}. Try the next one.`); setTimeout(renderCodeBreaker, 1200); }
    else setFeedback(`${maxGuesses - guesses} guesses left.`);
    updateStats();
  }
  button.addEventListener("click", submit);
  input.addEventListener("keydown", (event) => { if (event.key === "Enter") submit(); });
  input.focus();
}
function renderWords() {
  const answer = shuffle(wordSets[state.age])[0];
  const tier = getChallengeTier();
  const decoys = tier > 2 ? shuffle("ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").filter((letter) => !answer.includes(letter))).slice(0, state.age === "senior" ? 4 : 2) : [];
  const letters = shuffle([...answer.split(""), ...decoys]);
  state.word = { answer, entry: "" };
  board.innerHTML = `<div class="word-panel"><p class="question-text small-question">Build: ${shuffle(answer.split("")).join("")}</p><div class="word-slots">${answer.split("").map(() => `<div class="slot"></div>`).join("")}</div><div class="letter-bank">${letters.map((letter, index) => `<button class="letter" data-index="${index}" data-letter="${letter}">${letter}</button>`).join("")}</div></div>`;
  board.querySelectorAll(".letter").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.completed || button.disabled) return;
      const nextIndex = state.word.entry.length;
      state.word.entry += button.dataset.letter;
      board.querySelectorAll(".slot")[nextIndex].textContent = button.dataset.letter;
      button.disabled = true;
      state.moves += 1;
      if (!answer.startsWith(state.word.entry)) {
        miss("That build went off track. The word resets with new letter order.");
        setTimeout(renderWords, 760);
      } else if (state.word.entry === answer) {
        board.querySelectorAll(".letter").forEach((item) => item.disabled = true);
        finishRound("words", `You built ${answer}. Word star earned!`);
      } else setFeedback("Good build. Keep going.");
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
  const tier = getChallengeTier();
  const size = state.age === "little" ? 4 : tier > 4 ? 6 : 5;
  const treasure = { row: size - 1, col: size - 1 };
  let player = { row: 0, col: 0 };
  const route = new Set(["0-0"]);
  let walker = { row: 0, col: 0 };
  while (walker.row !== treasure.row || walker.col !== treasure.col) {
    const canDown = walker.row < treasure.row;
    const canRight = walker.col < treasure.col;
    if (canDown && (!canRight || random() < 0.5)) walker.row += 1;
    else if (canRight) walker.col += 1;
    route.add(`${walker.row}-${walker.col}`);
  }
  const rocks = new Set();
  const rockTarget = clamp((state.age === "little" ? 3 : 6) + tier, 3, Math.floor(size * size * 0.38));
  while (rocks.size < rockTarget) {
    const row = randomInt(size);
    const col = randomInt(size);
    const key = `${row}-${col}`;
    if (route.has(key) || key === "0-0" || key === `${treasure.row}-${treasure.col}`) continue;
    rocks.add(key);
  }
  const moveLimit = route.size + (state.age === "little" ? 5 : tier > 4 ? 2 : 4);
  board.className = "game-board path-panel";
  board.innerHTML = `<p class="micro-copy">Reach treasure in ${moveLimit} moves. Rocks block the route.</p><div class="path-grid" style="--path-size:${size}"></div><div class="path-controls" aria-label="Path controls"><button class="answer-button up" data-move="up">↑</button><button class="answer-button left" data-move="left">←</button><button class="answer-button right" data-move="right">→</button><button class="answer-button down" data-move="down">↓</button></div>`;
  const grid = board.querySelector(".path-grid");
  function draw() {
    grid.innerHTML = "";
    for (let row = 0; row < size; row += 1) {
      for (let col = 0; col < size; col += 1) {
        const cell = document.createElement("div");
        cell.className = "path-cell";
        if (rocks.has(`${row}-${col}`)) { cell.classList.add("rock"); cell.textContent = "X"; }
        if (row === treasure.row && col === treasure.col) { cell.classList.add("treasure"); cell.textContent = "STAR"; }
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
        miss("Blocked. Plan around rocks before moving.");
      } else {
        player = next;
        draw();
        if (player.row === treasure.row && player.col === treasure.col) finishRound("treasurePath", "Treasure found with smart planning!");
        else if (state.moves >= moveLimit) { miss("Move limit reached. New path challenge coming."); setTimeout(renderTreasurePath, 900); }
        else setFeedback(`${moveLimit - state.moves} moves left.`);
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
function renderXOGame() {
  const cells = Array(9).fill("");
  const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
  const aiHard = state.age !== "little" || currentLevel() > 120;
  board.className = "game-board xo-panel";
  board.innerHTML = `<div class="xo-board"></div>`;
  const xoBoard = board.querySelector(".xo-board");

  function winner(mark) { return wins.some((line) => line.every((index) => cells[index] === mark)); }
  function openCells() { return cells.map((value, index) => value ? null : index).filter((value) => value !== null); }
  function draw() {
    xoBoard.innerHTML = cells.map((value, index) => `<button class="xo-cell ${value.toLowerCase()}" data-index="${index}">${value}</button>`).join("");
    xoBoard.querySelectorAll(".xo-cell").forEach((cell) => cell.addEventListener("click", () => playMove(Number(cell.dataset.index))));
  }
  function pickWinningMove(mark) {
    return openCells().find((index) => {
      cells[index] = mark;
      const isWin = winner(mark);
      cells[index] = "";
      return isWin;
    });
  }
  function aiMove() {
    const choices = openCells();
    if (!choices.length) return;
    let move = aiHard ? pickWinningMove("O") ?? pickWinningMove("X") : undefined;
    if (move === undefined && aiHard && getChallengeTier() > 3) {
      let bestScore = -Infinity;
      choices.forEach((choice) => {
        cells[choice] = "O";
        const score = minimax(false, 0);
        cells[choice] = "";
        if (score > bestScore) { bestScore = score; move = choice; }
      });
    }
    if (move === undefined && choices.includes(4)) move = 4;
    if (move === undefined) move = shuffle(choices)[0];
    cells[move] = "O";
  }
  function minimax(isBotTurn, depth) {
    if (winner("O")) return 10 - depth;
    if (winner("X")) return depth - 10;
    const choices = openCells();
    if (!choices.length) return 0;
    const scores = choices.map((choice) => {
      cells[choice] = isBotTurn ? "O" : "X";
      const score = minimax(!isBotTurn, depth + 1);
      cells[choice] = "";
      return score;
    });
    return isBotTurn ? Math.max(...scores) : Math.min(...scores);
  }
  function playMove(index) {
    if (state.completed || cells[index]) return;
    state.moves += 1;
    cells[index] = "X";
    if (winner("X")) { draw(); finishRound("xoGame", "X O won!"); return; }
    if (!openCells().length) { draw(); finishRound("xoGame", "Board draw. Strategy star earned!"); return; }
    aiMove();
    draw();
    if (winner("O")) {
      miss("O blocked you. Try a sharper strategy.");
      setTimeout(resetRound, 900);
      return;
    }
    if (!openCells().length) finishRound("xoGame", "Board draw. Strategy star earned!");
    else setFeedback("Your turn.");
    updateStats();
  }
  draw();
}

function renderNumberSort() {
  const cfg = config();
  const count = state.age === "little" ? 4 : state.age === "junior" ? 5 : 6;
  const max = cfg.mathMax + currentLevel();
  const numbers = Array.from({ length: count }, () => randomInt(max) + 1);
  const answer = [...numbers].sort((a, b) => a - b);
  const picked = [];
  board.className = "game-board sort-panel";
  board.innerHTML = `<div class="sort-slots">${answer.map(() => `<span class="slot"></span>`).join("")}</div><div class="answer-row">${shuffle(numbers).map((number, index) => `<button class="answer-button" data-index="${index}" data-number="${number}">${number}</button>`).join("")}</div>`;
  board.querySelectorAll(".answer-button").forEach((button) => {
    button.addEventListener("click", () => {
      if (state.completed || button.disabled) return;
      const next = Number(button.dataset.number);
      state.moves += 1;
      if (next !== answer[picked.length]) {
        button.classList.add("wrong");
        miss("Sort from smallest to biggest.");
        return;
      }
      picked.push(next);
      button.disabled = true;
      button.classList.add("correct");
      board.querySelectorAll(".slot")[picked.length - 1].textContent = String(next);
      if (picked.length === answer.length) finishRound("numberSort", "Number Sort complete!");
      else setFeedback("Good. Keep sorting.");
      updateStats();
    });
  });
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
  const count = clamp((state.age === "little" ? 3 : state.age === "junior" ? 5 : 6) + Math.floor(getChallengeTier() / 4), 3, 8);
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
    math: "Break big numbers into smaller friendly parts.", tugOfWar: "Use inverse operations: addition and subtraction undo each other; multiplication and division undo each other.", codeBreaker: "Exact means right digit and right spot. Close means the digit exists but is in another spot.", words: `The word begins with ${state.word.answer ? state.word.answer[0] : "a strong letter"}.`,
    science: "Read every option before choosing.", typing: "Check spaces and spelling before pressing Enter.",
    colorCode: "Look at the color of the letters, not the word.", storyOrder: "Think first, next, last.",
    shapeLab: "Check the mission, then match either the shape or color.",
    treasurePath: "Move around blocked squares and plan two steps ahead.",
    quickCount: "Count only the target symbol and ignore the distractors.",
    xoGame: "Take the center or block O before it makes three.",
    numberSort: "Look for the smallest remaining number each time.",
    nepaliLetters: "Say the Nepali alphabet out loud from the first shown letter.",
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

