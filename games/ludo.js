const ludoColors = ["blue", "red", "green", "yellow"];
const ludoLabels = { blue: "Blue", red: "Red", green: "Green", yellow: "Yellow" };
const ludoStartIndex = { blue: 0, red: 13, green: 26, yellow: 39 };
const ludoSafeSquares = new Set([0, 8, 13, 21, 26, 34, 39, 47]);
const ludoTrack = [
  [6,0],[6,1],[6,2],[6,3],[6,4],[6,5],[5,6],[4,6],[3,6],[2,6],[1,6],[0,6],[0,7],[0,8],
  [1,8],[2,8],[3,8],[4,8],[5,8],[6,9],[6,10],[6,11],[6,12],[6,13],[6,14],[7,14],
  [8,14],[8,13],[8,12],[8,11],[8,10],[8,9],[9,8],[10,8],[11,8],[12,8],[13,8],[14,8],[14,7],[14,6],
  [13,6],[12,6],[11,6],[10,6],[9,6],[8,5],[8,4],[8,3],[8,2],[8,1],[8,0],[7,0],
];
const ludoHomeLanes = {
  blue: [[7,1],[7,2],[7,3],[7,4],[7,5],[7,6]],
  red: [[1,7],[2,7],[3,7],[4,7],[5,7],[6,7]],
  green: [[7,13],[7,12],[7,11],[7,10],[7,9],[7,8]],
  yellow: [[13,7],[12,7],[11,7],[10,7],[9,7],[8,7]],
};
const ludoYards = {
  blue: [[1,1],[1,4],[4,1],[4,4]],
  red: [[1,10],[1,13],[4,10],[4,13]],
  green: [[10,10],[10,13],[13,10],[13,13]],
  yellow: [[10,1],[10,4],[13,1],[13,4]],
};

function createLudoState(options = {}) {
  const playerCount = Number(options.playerCount || 4);
  const mode = options.mode || "bot";
  const userColor = options.userColor || "blue";
  const colors = ludoColors.slice(0, playerCount);
  if (!colors.includes(userColor)) colors[0] = userColor;
  const orderedColors = [userColor, ...colors.filter((color) => color !== userColor)].slice(0, playerCount);
  return {
    mode,
    playerCount,
    userColor,
    players: orderedColors.map((color) => ({ color, type: mode === "bot" && color !== userColor ? "bot" : "human" })),
    current: 0,
    dice: null,
    rolled: false,
    message: "Roll the dice. You need a 6 to leave home.",
    pieces: Object.fromEntries(orderedColors.map((color) => [color, Array.from({ length: 4 }, (_, id) => ({ id, progress: -1 }))])),
    winner: null,
  };
}
function renderLudo() {
  if (!state.ludo || state.ludo.completed) state.ludo = createLudoState();
  board.className = "game-board ludo-panel";
  drawLudo();
}
function ludoCurrentPlayer() { return state.ludo.players[state.ludo.current]; }
function ludoGlobalPosition(color, progress) {
  if (progress < 0 || progress >= 52) return null;
  return (ludoStartIndex[color] + progress) % 52;
}
function ludoPieceCoord(color, piece) {
  if (piece.progress < 0) return ludoYards[color][piece.id];
  if (piece.progress >= 57) return [7, 7];
  if (piece.progress >= 52) return ludoHomeLanes[color][piece.progress - 52];
  return ludoTrack[ludoGlobalPosition(color, piece.progress)];
}
function ludoLegalMoves(color) {
  const dice = state.ludo.dice;
  if (!dice) return [];
  return state.ludo.pieces[color].filter((piece) => {
    if (piece.progress >= 57) return false;
    if (piece.progress < 0) return dice === 6;
    return piece.progress + dice <= 57;
  });
}
function ludoRoll() {
  const game = state.ludo;
  if (state.game !== "ludo" || game.rolled || game.completed) return;
  game.dice = randomInt(6) + 1;
  game.rolled = true;
  const player = ludoCurrentPlayer();
  const legal = ludoLegalMoves(player.color);
  game.message = `${ludoLabels[player.color]} rolled ${game.dice}. ${legal.length ? "Choose a token." : "No legal move."}`;
  drawLudo();
  if (!legal.length) setTimeout(ludoEndTurn, 850);
  else if (player.type === "bot") setTimeout(() => ludoBotMove(player.color), 850);
}
function ludoMovePiece(color, pieceId) {
  const game = state.ludo;
  if (state.game !== "ludo") return;
  const player = ludoCurrentPlayer();
  if (!game.rolled || player.color !== color || game.completed) return;
  const piece = game.pieces[color][pieceId];
  if (!ludoLegalMoves(color).includes(piece)) return;
  if (piece.progress < 0) piece.progress = 0;
  else piece.progress += game.dice;
  let captured = false;
  if (piece.progress < 52) {
    const landed = ludoGlobalPosition(color, piece.progress);
    if (!ludoSafeSquares.has(landed)) {
      game.players.forEach((opponent) => {
        if (opponent.color === color) return;
        game.pieces[opponent.color].forEach((other) => {
          if (other.progress >= 0 && other.progress < 52 && ludoGlobalPosition(opponent.color, other.progress) === landed) {
            other.progress = -1;
            captured = true;
          }
        });
      });
    }
  }
  const finished = piece.progress === 57;
  if (game.pieces[color].every((item) => item.progress >= 57)) {
    game.completed = true;
    game.winner = color;
    game.message = `${ludoLabels[color]} wins Ludo Royal Race!`;
    state.completed = true;
    state.attempted.ludo += 1;
    state.correct.ludo += 1;
    state.streak += 1;
    state.score += 35 + getChallengeTier() * 3;
    state.stars.ludo += 1;
    if (state.levels.ludo < TOTAL_LEVELS) state.levels.ludo += 1;
    updateStats();
    drawLudo();
    return;
  }
  game.message = captured ? `${ludoLabels[color]} captured a token! Extra turn.` : finished ? `${ludoLabels[color]} reached home! Extra turn.` : `${ludoLabels[color]} moved.`;
  drawLudo();
  if (game.dice === 6 || captured || finished) {
    game.dice = null;
    game.rolled = false;
    if (player.type === "bot") setTimeout(ludoRoll, 900);
    else drawLudo();
  } else setTimeout(ludoEndTurn, 650);
}
function ludoEndTurn() {
  const game = state.ludo;
  if (state.game !== "ludo" || game.completed) return;
  game.current = (game.current + 1) % game.players.length;
  game.dice = null;
  game.rolled = false;
  const player = ludoCurrentPlayer();
  game.message = `${ludoLabels[player.color]}'s turn. Roll the dice.`;
  drawLudo();
  if (player.type === "bot") setTimeout(ludoRoll, 850);
}
function ludoBotMove(color) {
  const legal = ludoLegalMoves(color);
  if (!legal.length) { ludoEndTurn(); return; }
  const dice = state.ludo.dice;
  const choice = legal.find((piece) => piece.progress + dice === 57)
    || legal.find((piece) => {
      const next = piece.progress < 0 ? 0 : piece.progress + dice;
      if (next >= 52) return false;
      const landing = ludoGlobalPosition(color, next);
      return !ludoSafeSquares.has(landing) && state.ludo.players.some((opponent) => opponent.color !== color && state.ludo.pieces[opponent.color].some((other) => other.progress >= 0 && other.progress < 52 && ludoGlobalPosition(opponent.color, other.progress) === landing));
    })
    || legal.find((piece) => piece.progress < 0)
    || [...legal].sort((a, b) => b.progress - a.progress)[0];
  ludoMovePiece(color, choice.id);
}
function ludoCellClass(row, col) {
  const classes = ["ludo-cell"];
  const inBase = (r1, r2, c1, c2) => row >= r1 && row <= r2 && col >= c1 && col <= c2;
  if (inBase(0, 5, 0, 5)) classes.push("base", "blue-base");
  if (inBase(0, 5, 9, 14)) classes.push("base", "red-base");
  if (inBase(9, 14, 9, 14)) classes.push("base", "green-base");
  if (inBase(9, 14, 0, 5)) classes.push("base", "yellow-base");
  Object.entries(ludoYards).forEach(([color, coords]) => { if (coords.some(([r, c]) => r === row && c === col)) classes.push("yard", color); });
  ludoTrack.forEach(([r, c], index) => {
    if (r === row && c === col) {
      classes.push("track");
      if (ludoSafeSquares.has(index)) classes.push("safe");
      const startColor = Object.entries(ludoStartIndex).find(([, start]) => start === index)?.[0];
      if (startColor) classes.push("start", startColor);
    }
  });
  Object.entries(ludoHomeLanes).forEach(([color, coords]) => { if (coords.some(([r, c]) => r === row && c === col)) classes.push("home-lane", color); });
  if (row >= 6 && row <= 8 && col >= 6 && col <= 8) classes.push("center-zone");
  if (row === 7 && col === 7) classes.push("ludo-center");
  if (!classes.some((item) => ["base", "yard", "track", "home-lane", "center-zone", "ludo-center"].includes(item))) classes.push("blank");
  return classes.join(" ");
}
function drawLudo() {
  const game = state.ludo;
  const player = ludoCurrentPlayer();
  const legalIds = new Set(game.rolled ? ludoLegalMoves(player.color).map((piece) => piece.id) : []);
  board.innerHTML = `<div class="ludo-setup"><label>Mode<select data-ludo="mode"><option value="bot" ${game.mode === "bot" ? "selected" : ""}>User vs Bot</option><option value="human" ${game.mode === "human" ? "selected" : ""}>User vs User</option></select></label><label>Players<select data-ludo="players">${[2,3,4].map((count) => `<option value="${count}" ${game.playerCount === count ? "selected" : ""}>${count}</option>`).join("")}</select></label><label>Your color<select data-ludo="color">${ludoColors.map((color) => `<option value="${color}" ${game.userColor === color ? "selected" : ""}>${ludoLabels[color]}</option>`).join("")}</select></label><button class="ghost-button" data-ludo="restart">Restart</button></div><div class="ludo-status"><strong>${ludoLabels[player.color]} turn</strong><span>${player.type === "bot" ? "Bot" : "Player"}</span><span>Dice: ${game.dice || "-"}</span></div><div class="ludo-board"></div>${game.winner ? `<div class="ludo-winner ${game.winner}">${ludoLabels[game.winner]} wins! All 4 tokens reached home.</div>` : ""}<div class="ludo-controls"><button class="primary-button" data-ludo="roll" ${game.rolled || player.type === "bot" || game.completed ? "disabled" : ""}>Roll dice</button><p>${game.message}</p></div>`;
  const ludoBoard = board.querySelector(".ludo-board");
  for (let row = 0; row < 15; row += 1) {
    for (let col = 0; col < 15; col += 1) {
      const cell = document.createElement("div");
      cell.className = ludoCellClass(row, col);
      cell.dataset.row = row;
      cell.dataset.col = col;
      ludoBoard.append(cell);
    }
  }
  game.players.forEach((entry) => {
    game.pieces[entry.color].forEach((piece) => {
      const [row, col] = ludoPieceCoord(entry.color, piece);
      const token = document.createElement("button");
      token.type = "button";
      token.className = `ludo-token ${entry.color} ${entry.color === player.color && legalIds.has(piece.id) ? "movable" : ""}`;
      token.textContent = String(piece.id + 1);
      token.disabled = !(entry.color === player.color && legalIds.has(piece.id) && player.type === "human");
      token.addEventListener("click", () => ludoMovePiece(entry.color, piece.id));
      ludoBoard.querySelector(`[data-row="${row}"][data-col="${col}"]`).append(token);
    });
  });
  board.querySelector("[data-ludo='roll']")?.addEventListener("click", ludoRoll);
  board.querySelector("[data-ludo='restart']")?.addEventListener("click", () => { state.completed = false; state.ludo = createLudoState({ mode: game.mode, playerCount: game.playerCount, userColor: game.userColor }); drawLudo(); });
  board.querySelector("[data-ludo='mode']")?.addEventListener("change", (event) => { state.completed = false; state.ludo = createLudoState({ mode: event.target.value, playerCount: game.playerCount, userColor: game.userColor }); drawLudo(); });
  board.querySelector("[data-ludo='players']")?.addEventListener("change", (event) => { state.completed = false; state.ludo = createLudoState({ mode: game.mode, playerCount: Number(event.target.value), userColor: game.userColor }); drawLudo(); });
  board.querySelector("[data-ludo='color']")?.addEventListener("change", (event) => { state.completed = false; state.ludo = createLudoState({ mode: game.mode, playerCount: game.playerCount, userColor: event.target.value }); drawLudo(); });
}
