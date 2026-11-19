// ===== EASY SETTINGS =====
const CONFIG = {
  club: "AICS CIRCUIT",
  judgeName: "HON. REVIEWER",
  caseNumber: "404",
  finalCoins: 1000000,
  typeSpeed: 18,
};

const HEADLINES = [
  "BREAKING: local club still broke",
  "reviewer rumored to be 'him'",
  "12 ducks sworn in as jury, 0 understand the law",
  "while(true) loop refuses to stop, now on day 94",
  "moth named Gerald moves into club wallet",
  "spreadsheet files 47 tabs of complaints",
  "experts confirm: coins are good",
  "semicolon found after 3 hour search",
  "'it works on my machine' ruled admissible evidence",
  "judge's aura reaches record highs",
  "console.log still saying pls",
  "duck jury demands shorter laws, longer recesses",
];

// ===== HELPERS =====
const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rand = (a, b) => a + Math.random() * (b - a);
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);
const fmt = (t) => t.replaceAll("{CLUB}", CONFIG.club).replaceAll("{CASE}", CONFIG.caseNumber);

function shade(color, f) {
  const c = document.createElement("canvas").getContext("2d");
  c.fillStyle = "#000";
  c.fillStyle = color;
  const m = /^#([0-9a-f]{6})$/i.exec(c.fillStyle);
  if (!m) return color;
  const n = parseInt(m[1], 16);
  const ch = [n >> 16, (n >> 8) & 255, n & 255].map((v) => Math.round(f < 0 ? v * (1 + f) : v + (255 - v) * f));
  return `rgb(${ch.join(",")})`;
}

// ===== PIXEL ART =====
function drawSprite(rows, pal, mirror = false) {
  const full = mirror ? rows.map((r) => r + [...r].reverse().join("")) : rows;
  const w = Math.max(...full.map((r) => r.length));
  const cv = document.createElement("canvas");
  cv.width = w;
  cv.height = full.length;
  const cx = cv.getContext("2d");
  full.forEach((row, y) => [...row].forEach((ch, x) => {
    if (pal[ch]) {
      cx.fillStyle = pal[ch];
      cx.fillRect(x, y, 1, 1);
    }
  }));
  return cv.toDataURL();
}

function overlayRows(height, rowsAt) {
  return Array.from({ length: height }, (_, i) => rowsAt[i] || "");
}

const INK = "#1b1325";

function makeSprites(hoodie) {
  const judge = [
    "......kkkkkk", "....kkWWWWWW", "...kWWWWWWWW", "..kWWwWWWwWW",
    "..kWWWWkkkkk", ".kWwWWkSssss", ".kWWWWksssss", ".kWwWWkskkss",
    "kWWWWWkseess", "kWwWWWkseess", "kWWWWWkssssS", ".kWwWWksssss",
    ".kWWWWkssmmm", ".kWwWWkSssss", "..kWWWWkksss", "..kWwWWWkkkk",
    "...kWWWkrccc", "..kWWWkrrccc", ".krRrrrrrccc", ".krRrrrrrrcc",
    "krRrrrrrrrcc", "krRrrrrrrrrc", "krRrrrrrrrrr", "krrrrrrrrrrr",
  ];
  const defendant = [
    "....kkkkkkkk", "..kkhhhhhhhh", ".khhhHhhhhhh", ".khhhhhhHhhh",
    "khhhhhhhhhhh", "khhhhhhhhhhh", "khhkhhshhhsh", "khksssssssss",
    "khksssswesss", "khksssseesss", "khksspssssss", ".kksssssssmm",
    "..kSssssssss", "...kkSSSSSSS", ".....kkkkkkk", "..kooookkSSS",
    ".kooooooOkkk", "koooooooOtoo", "kooOooooOtoo", "kooOoooooooo",
    "kooOooOOOOOO", "kooOooOooooo", "kooOooOooooo", "kOOOOOOOOOOO",
  ];
  const duck = [
    ".....kkkk.....", "....kyyyyk....", "...kyyywek....", "...kyyyyykkkk.",
    "...kyyyyykoook", "....kyyyykkkk.", ".k...kyyyk....", "kykkkyyyyykk..",
    "kyyyyyyyyyyyk.", "kyyYyyyyyyyyk.", ".kyYYyyyyyyk..", "..kYYYYYYYk...",
    "...kkkkkkk....",
  ];
  const bailiff = [".....nnnn.....", "....nnngnnnnn.", ...duck.slice(2)];
  const coin = [
    "..kkkkkk..", ".kyyyyyyk.", "kyywyyyyGk", "kywyyGyyGk", "kywyyGyyGk",
    "kyyyyGyyGk", "kyyyyGyyGk", "kyyyyyyGGk", ".kGGGGGGk.", "..kkkkkk..",
  ];
  const gavel = [
    ".kkkkkkkkkkkk.", "kuguuuuuuuuguk", "kuguuuuuuuuguk", "kUgUUUUUUUUgUk",
    ".kkkkkkkkkkkk.", ".....kuUk.....", ".....kuUk.....", ".....kuUk.....",
    ".....kuUk.....", ".....kuUk.....", ".....kuUk.....", ".....kkkk.....",
  ];
  const prosecutor = [
    "kkkkkkkk", "kGGGGGGG", "kGGGGGGG", "kddddddd", "klkkldll", "kldlkkll",
    "kddddddd", "klleeldl", "klleeldl", "kddddddd", "kllldlkk", "klldlkll",
    "kddddddd", "klldllld", "klldllld", "kkkkkkkk",
  ];
  const moth = ["kk..", "kwk.", "kwwk", ".kwk", "..k."];
  const sweat = ["..k..", ".kbk.", "kbbbk", "kbwbk", "kbbbk", ".kkk."];
  const code = [
    "kkkkkkkkkkkk", "krygnnnnnnnk", "kkkkkkkkkkkk", "kddddddddddk", "kdppdbbbbddk",
    "kdddyyyyyddk", "kdddbbbddddk", "kdpddddddddk", "kddddddddddk", "kkkkkkkkkkkk",
  ];
  const judgeShades = overlayRows(24, { 7: "......kkkkkk", 8: ".......kwkkk", 9: ".......kkkk." });
  const defShades = overlayRows(24, { 7: "...kkkkkkkkk", 8: "....kwkkkkkk", 9: ".....kkkkk.." });

  const skin = { k: INK, s: "#f6c89f", S: "#d99a6c", e: INK, w: "#ffffff", m: "#8c3036" };
  return {
    judge: drawSprite(judge, { ...skin, W: "#f6f1e6", w: "#cfc6b4", r: "#262a40", R: "#3e4466", c: "#ffffff" }, true),
    defendant: drawSprite(defendant, { ...skin, h: "#4a2c1d", H: "#7a4a2f", p: "#f59a9a", o: hoodie, O: shade(hoodie, -0.32), t: "#ffffff" }, true),
    duck: drawSprite(duck, { k: INK, y: "#ffd93b", Y: "#e3a600", o: "#ff8c1a", w: "#ffffff", e: INK }),
    bailiff: drawSprite(bailiff, { k: INK, y: "#ffd93b", Y: "#e3a600", o: "#ff8c1a", w: "#ffffff", e: INK, n: "#2b4c9b", g: "#ffd23f" }),
    coin: drawSprite(coin, { k: INK, y: "#ffd23f", G: "#c98a00", w: "#fff6c0" }),
    gavel: drawSprite(gavel, { k: INK, u: "#a0582f", U: "#5e2f18", g: "#ffcc33" }),
    prosecutor: drawSprite(prosecutor, { k: INK, G: "#1f9d55", d: "#9ccaa8", l: "#eaf7ee", e: INK }, true),
    moth: drawSprite(moth, { k: "#3a2f2a", w: "#c8bfa8" }, true),
    sweat: drawSprite(sweat, { k: INK, b: "#7cc8ff", w: "#ffffff" }),
    code: drawSprite(code, { k: INK, r: "#ff5f57", y: "#febc2e", g: "#28c840", n: "#3b3f5c", d: "#1e1e2e", p: "#ff79c6", b: "#89b4fa" }),
    judgeShades: drawSprite(judgeShades, { k: "#111111", w: "#ffffff" }, true),
    defShades: drawSprite(defShades, { k: "#111111", w: "#ffffff" }, true),
  };
}

let SPR = {};

// ===== SOUND (all generated, no audio files) =====
const Sound = (() => {
  let ctx = null;
  let master = null;
  let noiseBuf = null;
  let muted = false;
  try { muted = localStorage.getItem("coincourt-muted") === "1"; } catch (e) {}

  function init() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = muted ? 0 : 0.5;
      master.connect(ctx.destination);
      noiseBuf = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    if (ctx.state === "suspended") ctx.resume();
  }

  function tone(freq, dur, { type = "square", vol = 0.2, at = 0, to = null, vib = 0 } = {}) {
    if (!ctx || muted) return;
    const t = ctx.currentTime + at;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (to) o.frequency.exponentialRampToValueAtTime(to, t + dur);
    if (vib) {
      const lfo = ctx.createOscillator();
      const lg = ctx.createGain();
      lfo.frequency.value = 7;
      lg.gain.value = vib;
      lfo.connect(lg).connect(o.frequency);
      lfo.start(t);
      lfo.stop(t + dur);
    }
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  function noise(dur, { vol = 0.3, at = 0, freq = 1000, q = 1, type = "lowpass", to = null } = {}) {
    if (!ctx || muted) return;
    const t = ctx.currentTime + at;
    const src = ctx.createBufferSource();
    src.buffer = noiseBuf;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.Q.value = q;
    f.frequency.setValueAtTime(freq, t);
    if (to) f.frequency.exponentialRampToValueAtTime(to, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(master);
    src.start(t);
    src.stop(t + dur + 0.02);
  }

  return {
    init,
    get muted() { return muted; },
    toggle() {
      muted = !muted;
      if (master) master.gain.value = muted ? 0 : 0.5;
      try { localStorage.setItem("coincourt-muted", muted ? "1" : "0"); } catch (e) {}
      return muted;
    },
    blip(p = 1, type = "square") { tone(300 * p + Math.random() * 25, 0.035, { type, vol: 0.05 }); },
    gavel() {
      noise(0.09, { vol: 0.9, freq: 1800 });
      tone(190, 0.22, { type: "sine", vol: 0.9, to: 55 });
      tone(95, 0.3, { type: "triangle", vol: 0.5, to: 40 });
    },
    coin() {
      tone(1046, 0.07, { vol: 0.1 });
      tone(1568, 0.25, { vol: 0.1, at: 0.07 });
    },
    tick() { tone(1700 + Math.random() * 500, 0.04, { vol: 0.045 }); },
    boom() {
      tone(120, 1.0, { type: "sine", vol: 1, to: 30 });
      tone(60, 1.0, { type: "triangle", vol: 0.6, to: 28 });
      noise(0.3, { vol: 0.4, freq: 400 });
    },
    objection() {
      [233, 277, 349].forEach((f) => tone(f, 0.4, { type: "sawtooth", vol: 0.11 }));
      tone(880, 0.18, { vol: 0.07, to: 440 });
      noise(0.15, { vol: 0.25, freq: 3000, type: "bandpass" });
    },
    allow() { [523, 659, 784, 1046].forEach((f, i) => tone(f, 0.13, { vol: 0.09, at: i * 0.06 })); },
    quack() {
      const p = rand(0.85, 1.25);
      tone(720 * p, 0.16, { type: "sawtooth", vol: 0.13, to: 380 * p });
      tone(1150 * p, 0.12, { vol: 0.035, to: 600 * p });
    },
    sad() {
      [[311, 0], [294, 0.42], [277, 0.84]].forEach(([f, at]) => tone(f, 0.38, { type: "sawtooth", vol: 0.1, at }));
      tone(262, 1.1, { type: "sawtooth", vol: 0.1, at: 1.26, vib: 8 });
    },
    dun() {
      tone(196, 0.2, { type: "sawtooth", vol: 0.13 });
      tone(185, 0.2, { type: "sawtooth", vol: 0.13, at: 0.24 });
      tone(147, 1.0, { type: "sawtooth", vol: 0.15, at: 0.5, vib: 6 });
      tone(73, 1.0, { vol: 0.07, at: 0.5 });
    },
    whoosh() { noise(0.28, { vol: 0.3, freq: 500, to: 4000, type: "bandpass", q: 2 }); },
    ach() { [784, 988, 1175, 1568].forEach((f, i) => tone(f, 0.12, { vol: 0.08, at: i * 0.07 })); },
    fanfare() {
      [[523, 0, 0.15], [659, 0.15, 0.15], [784, 0.3, 0.15], [1046, 0.45, 0.3], [784, 0.78, 0.12], [1046, 0.92, 0.8]].forEach(([f, at, d]) => {
        tone(f, d, { vol: 0.11, at });
        tone(f / 2, d, { type: "triangle", vol: 0.1, at });
      });
    },
  };
})();

// ===== CONFETTI + COIN RAIN =====
const FX = (() => {
  const cv = $("#fx");
  const cx = cv.getContext("2d");
  const COLORS = ["#ffd23f", "#ec3750", "#33d17a", "#338eda", "#b48cff", "#fff4dc"];
  let parts = [];
  let raf = 0;
  let coinImg = null;

  function size() {
    cv.width = innerWidth;
    cv.height = innerHeight;
    cx.imageSmoothingEnabled = false;
  }
  addEventListener("resize", size);
  size();

  function go() { if (!raf) raf = requestAnimationFrame(loop); }

  function loop() {
    cx.clearRect(0, 0, cv.width, cv.height);
    parts = parts.filter((p) => p.y < cv.height + 60 && p.life > 0);
    for (const p of parts) {
      p.vy = Math.min(p.vy + p.g, p.max);
      p.x += p.vx;
      p.y += p.vy;
      p.life--;
      if (p.kind === "confetti") {
        cx.fillStyle = p.color;
        cx.fillRect(Math.round(p.x), Math.round(p.y), p.s, p.life % 10 < 5 ? p.s : p.s / 2);
      } else if (coinImg && coinImg.complete) {
        p.t += p.spin;
        cx.save();
        cx.translate(Math.round(p.x), Math.round(p.y));
        cx.scale(Math.max(0.15, Math.abs(Math.cos(p.t))), 1);
        cx.drawImage(coinImg, -p.s / 2, -p.s / 2, p.s, p.s);
        cx.restore();
      }
    }
    raf = parts.length ? requestAnimationFrame(loop) : 0;
  }

  return {
    setCoin(src) { coinImg = new Image(); coinImg.src = src; },
    confetti(x, y, n = 40, power = 1) {
      const count = reduceMotion ? Math.ceil(n / 4) : n;
      for (let i = 0; i < count; i++) {
        parts.push({ kind: "confetti", x, y, vx: rand(-7, 7) * power, vy: rand(-13, -4) * power, g: 0.38, max: 14, s: Math.ceil(rand(1, 3)) * 3, color: pick(COLORS), life: rand(50, 120) });
      }
      go();
    },
    rain(n = 160) {
      const count = reduceMotion ? Math.ceil(n / 5) : n;
      for (let i = 0; i < count; i++) {
        parts.push({ kind: "coin", x: rand(0, cv.width), y: rand(-cv.height * 1.5, -30), vx: rand(-0.8, 0.8), vy: rand(2, 5), g: 0.12, max: 9, s: Math.round(rand(2, 4)) * 10, t: rand(0, 6), spin: rand(0.08, 0.22), life: 1e9 });
      }
      go();
    },
  };
})();

// ===== THE TRIAL SCRIPT =====
const bailiff = (text, extra = {}) => ({ who: "bailiff", text, ...extra });
const defense = (text, extra = {}) => ({ who: "defense", text, ...extra });
const narrator = (text, extra = {}) => ({ who: "narrator", text, ...extra });
const prosecutor = (text, extra = {}) => ({ who: "prosecutor", text, ...extra });
const witness = (text, extra = {}) => ({ who: "witness", text, ...extra });
const jury = (text, extra = {}) => ({ who: "jury", text, ...extra });
const allowBtn = (label, extra = {}) => ({ label, kind: "allow", ...extra });
const objectBtn = (label, extra = {}) => ({ label, kind: "object", ...extra });
const otherBtn = (label, extra = {}) => ({ label, kind: "neutral", ...extra });

const WITNESSES = {
  ifs: { name: "THE IF STATEMENT", code: "if (club.isBroke) {\n  giveCoins();\n}" },
  loop: { name: "THE INFINITE LOOP", code: "while (true) {\n  askForCoins();\n}" },
  log: { name: "CONSOLE.LOG", code: 'console.log("pls");' },
  undef: { name: "UNDEFINED", code: "undefined", ghost: true },
  todo: { name: "THE TODO COMMENT", code: "// TODO: give\n// AICS Circuit\n// coins" },
};

const TRIAL = [
  bailiff("ORDER IN THE COURT! ALL RISE for the Honorable Hack Club Reviewer!", { fx: ["gavel"], stamp: "ALL RISE", stampColor: "gold" }),
  bailiff("Court is now in session. Case No. {CASE}: {CLUB} versus BEING BROKE."),
  bailiff("The defendant is charged with one (1) count of having ZERO coins. How do you plead?"),
  defense("We plead... BROKE, your honor.", { fx: ["sweat"] }),
  defense("Also, before we begin, I would like a lawyer, dog."),
  bailiff("You get a duck.", { fx: ["quack"] }),
  defense("...that's fair.", { fx: ["nosweat"] }),
  defense("Your honor. May I just say... you look INCREDIBLY cool today.", {
    choices: [
      allowBtn("😎 I know.", { coins: 0, aura: 1000, stamp: "+1000 AURA", stampColor: "purple", fx: ["shades"], reply: [
        defense("A humble king. The court stenographer is in tears."),
      ] }),
      objectBtn("🤨 Bribery is a crime.", { aura: -100, stamp: "SUS", reply: [
        defense("It's not bribery if it's TRUE, your honor."),
        narrator("The judge puts on sunglasses anyway.", { fx: ["shades"] }),
      ] }),
    ],
  }),

  defense("The defense would like to present... EXHIBIT A.", { show: "exhibit", exhibit: "A", fx: ["dun"] }),
  defense("This is our club's coin balance. Zero. Please note the moth. His name is Gerald. He lives there now.", {
    choices: [
      allowBtn("🔨 I'LL ALLOW IT", { coins: 150, reply: [defense("Gerald thanks you for your service.")] }),
      objectBtn("✋ OBJECTION!", { coins: 50, reply: [
        defense("Your honor... with all due respect... you can't object. You're the JUDGE."),
        narrator("Objection overruled. By the defendant. Somehow."),
      ] }),
    ],
  }),
  defense("EXHIBIT B: a photograph of our club at 2:47 AM.", { show: "exhibit", exhibit: "B" }),
  defense("Three hours. Looking for ONE missing semicolon. Those aren't eye bags, your honor. Those are DEDICATION bags.", {
    choices: [
      allowBtn("🔨 RELATABLE", { coins: 250, stamp: "RELATABLE", stampColor: "green", reply: [defense("Thank you. We have since discovered sleep. We did not like it.")] }),
      objectBtn("✋ GO TO SLEEP", { coins: 100, reply: [defense("LET ME COOK, YOUR HONOR."), defense("(We will not be sleeping.)")] }),
    ],
  }),
  defense("EXHIBIT C: a very scientific chart.", { show: "exhibit", exhibit: "C" }),
  defense("Our coins have been at zero since the dawn of time. BUT. With ONE click from you..."),
  defense("STONKS.", {
    fx: ["boom"],
    choices: [
      allowBtn("📈 STONKS", { coins: 500, stamp: "STONKS", stampColor: "green", reply: [defense("Line goes up. Club goes brrr.")] }),
      objectBtn("📉 NOT STONKS", { coins: 200, stamp: "NOT STONKS", reply: [defense("Your honor, I'm gonna need you to read the chart again. Slower."), defense("...see? Green line. Goes up. STONKS.")] }),
    ],
  }),
  defense("And finally... EXHIBIT D. Our club's git history.", { show: "exhibit", exhibit: "D" }),
  defense("'fix.' 'fix 2.' 'final fix.' 'final fix FOR REAL.' 'pls work.' 'why.' This is the face of perseverance, your honor.", {
    choices: [
      allowBtn("💀 I've been there", { coins: 300, stamp: "SAME", stampColor: "green", reply: [defense("We knew you were one of us.")] }),
      objectBtn("✋ Squash your commits", { coins: 100, reply: [defense("SQUASH them?! Your honor, those commits are FAMILY.")] }),
    ],
  }),

  narrator("The doors burst open. A cold, unfeeling presence enters the courtroom...", { hide: "exhibit", fx: ["boom"] }),
  prosecutor("PROSECUTOR SPREADSHEET. Department of Fiscal Responsibility. I have 47 tabs and zero feelings.", { show: "prosecutor" }),
  prosecutor("The prosecution argues that the defendant being broke is simply... a skill issue."),
  defense("OBJECTION!", {
    stamp: "OBJECTION!",
    fx: ["objection", "sweat"],
    choices: [
      otherBtn("🤔 On what grounds?", { ach: "devastating", reply: [
        defense("IT'S DEVASTATING TO MY CASE!", {
          stamp: "DEVASTATING",
          fx: ["bigshake"],
          choices: [
            allowBtn("🔨 OVERRULED", { coins: 100, aura: 500, stamp: "OVERRULED", stampColor: "gold", reply: [
              defense("...good call."),
              prosecutor("Thank you, your honor. Finally, someone who respects formulas."),
            ] }),
            allowBtn("🔨 SUSTAINED (???)", { coins: 400, stamp: "SUSTAINED", stampColor: "green", reply: [
              prosecutor("WHAT?! That's not how any of this works! I have PIVOT TABLES!"),
              defense("The court has spoken. Bye bye, glorified grid."),
            ] }),
          ],
        }),
      ] }),
    ],
  }),
  prosecutor("This isn't over. I'll be back... next fiscal quarter.", { fx: ["nosweat"] }),

  defense("Now then. The defense calls its FIRST WITNESS.", { hide: "prosecutor", fx: ["dun"] }),
  bailiff("Do you swear to tell the truth, the whole truth, and nothing but the truth, so help you compiler?", { show: "witness", witness: WITNESSES.ifs }),
  witness("I do. I'm a boolean. I literally cannot lie."),
  defense("Mr. If Statement. When a club is broke... what happens?"),
  witness("When the condition is true, I run the block. And your honor... the condition is SO true.", {
    choices: [
      allowBtn("✅ CREDIBLE", { coins: 400, stamp: "CREDIBLE", stampColor: "green", reply: [witness("Thank you. I'll be returning true for the rest of the day.")] }),
      objectBtn("❌ HEARSAY!", { coins: 150, stamp: "HEARSAY!", reply: [
        witness("HEARSAY?! I'm an IF STATEMENT. I'm either true or false, and right now I am TRUE."),
        witness("Look at the curly braces, your honor. LOOK at them."),
      ] }),
    ],
  }),

  defense("The defense calls... THE INFINITE LOOP.", { hide: "witness" }),
  witness("please give coins please give coins please give coins please give coins please give coins please give coins please give coins please give c-", { show: "witness", witness: WITNESSES.loop }),
  bailiff("Witness. You need to stop."),
  witness("I physically can't. I've been running since August. My laptop fan sounds like a jet engine.", {
    choices: [
      allowBtn("✅ CREDIBLE", { coins: 400, stamp: "CREDIBLE", stampColor: "green", reply: [witness("please give coins please give co- wait, you did?? ...please give MORE coins.")] }),
      otherBtn("🛑 break;", { coins: 200, stamp: "break;", stampColor: "white", ach: "loop", fx: ["sad"], reply: [
        witness("...oh. Silence. Is this what peace feels like? Thank you."),
        defense("You just killed my best witness, your honor. ...coins anyway?"),
      ] }),
    ],
  }),

  defense("The defense calls... console.log.", { hide: "witness" }),
  witness("I've been logging 'pls' to the console this ENTIRE time. Don't believe me? Open the dev tools, your honor. I'll wait.", { show: "witness", witness: WITNESSES.log, fx: ["console"] }),
  witness("That's not spam, your honor. That's a cry for help with timestamps.", {
    choices: [
      allowBtn("✅ CREDIBLE", { coins: 400, stamp: "CREDIBLE", stampColor: "green", reply: [witness('console.log("THANK YOU");')] }),
      objectBtn("🧹 console.clear()", { coins: 150, stamp: "CLEARED", stampColor: "white", fx: ["clear"], reply: [witness("You can clear the console, your honor... but you can't clear the TRUTH.")] }),
    ],
  }),

  defense("The defense calls... undefined.", { hide: "witness" }),
  witness("...", { show: "witness", witness: WITNESSES.undef }),
  bailiff("Your honor, the witness... doesn't exist."),
  defense("Moving on.", { fx: ["sweat"] }),

  defense("The defense calls its final witness: a COMMENT.", { hide: "witness", fx: ["nosweat"] }),
  witness("I've been a TODO since 2024. Nobody ever gets to me. The compiler ignores me. My own developer ignores me. I AM the backlog.", { show: "witness", witness: WITNESSES.todo }),
  witness("But you, your honor... you could be the one. You could finally... resolve me.", {
    choices: [
      allowBtn("✅ Resolve the TODO", { coins: 600, stamp: "TODO: DONE", stampColor: "green", ach: "todo", fx: ["ascend"], reply: [
        witness("I'm... resolved? I'm RESOLVED! I'm FREEEEEE!"),
        narrator("The comment ascends to the great main branch in the sky."),
      ] }),
      objectBtn("❌ Leave it for later", { coins: 200, stamp: "BACKLOGGED", fx: ["sad"], reply: [
        witness("...that's what they all say."),
        defense("Heartless. Absolutely heartless. Coins though, right?"),
      ] }),
    ],
  }),

  bailiff("The jury will now deliberate.", { hide: "witness", fx: ["huddle"] }),
  jury("quack.", { fx: ["quack"] }),
  jury("quack quack. QUACK.", { fx: ["quacks"] }),
  jury("...quack?", { fx: ["quack"] }),
  bailiff("The jury has reached a verdict. Translated from Duck: \"Give them the coins. They seem broke and nice.\"", {
    choices: [
      allowBtn("🦆 Respect the ducks", { coins: 500, stamp: "QUACK", stampColor: "gold", reply: [bailiff("The ducks thank you.")] }),
      allowBtn("🦆 Respect the ducks (sweating)", { coins: 500, stamp: "QUACK", stampColor: "gold", reply: [bailiff("The ducks noticed the sweating. They thank you anyway.")] }),
    ],
  }),

  defense("Your honor. In conclusion.", { fx: ["nosweat"] }),
  defense("We code at 2:47 AM. We house a moth named Gerald. We have an if statement, an infinite loop, AND twelve ducks on our side."),
  defense("We're not asking for coins for ourselves. We're asking for {CLUB}. For the club. For the circuit. For Gerald."),
  defense("The defense... RESTS.", { stamp: "I REST\nMY CASE", stampColor: "gold", fx: ["gavel", "dun"] }),
  { verdict: true },
];

const CAST = {
  bailiff: { name: () => "BAILIFF DUCK", img: "bailiff", pitch: 1.8, wave: "square" },
  defense: { name: () => `${CONFIG.club} (DEFENSE)`, img: "defendant", pitch: 1.1, wave: "square" },
  narrator: { name: () => "COURT STENOGRAPHER", img: "gavel", pitch: 0.8, wave: "triangle" },
  prosecutor: { name: () => "PROSECUTOR SPREADSHEET", img: "prosecutor", pitch: 0.55, wave: "sawtooth" },
  witness: { name: () => `WITNESS: ${state.witness ? state.witness.name : "???"}`, img: "code", pitch: 1.35, wave: "triangle" },
  jury: { name: () => "THE JURY (12 DUCKS)", img: "duck", pitch: 2.2, wave: "square" },
};

const TALKERS = { defense: "#defendantWrap", witness: "#witness", prosecutor: "#prosecutor", bailiff: "#bailiff", jury: "#jury" };

const EXHIBITS = {
  A: {
    title: "EXHIBIT A",
    html: () => `
      <div class="ex-wallet"><div class="wallet"><span>$0.00</span></div><img class="sprite moth" src="${SPR.moth}" alt="Gerald the moth"></div>
      <p class="ex-cap">${esc(CONFIG.club)}'S COIN BALANCE.<br>Pictured: Gerald (moth). Not pictured: money.</p>`,
  },
  B: {
    title: "EXHIBIT B",
    html: () => `
      <div class="ex-monitor"><div class="screen"><b>2:47 AM</b>error: expected ';' (line 1337)<br>&gt; still looking<span class="cursor">█</span></div><div class="mon-stand"></div></div>
      <p class="ex-cap">THE ${esc(CONFIG.club)} NIGHT SHIFT.<br>3 hours. 1 semicolon. 0 regrets.</p>`,
  },
  C: {
    title: "EXHIBIT C",
    html: () => `
      <div class="ex-chart">${chartSVG()}<span class="stonks">STONKS</span></div>
      <p class="ex-cap">COINS OVER TIME: <span class="r">■ reality</span> <span class="g">■ if you click allow</span></p>`,
  },
  D: {
    title: "EXHIBIT D",
    html: () => `
<pre class="ex-git"><span class="cmd">$ git log --oneline</span>
<span class="sha">c0ffee1</span> it works?? dont touch anything
<span class="sha">badc0de</span> why
<span class="sha">deadbe1</span> pls work
<span class="sha">5ca1ab1</span> final fix FOR REAL
<span class="sha">f00d42a</span> final fix
<span class="sha">a11ce99</span> fix 2
<span class="sha">0000001</span> fix</pre>
      <p class="ex-cap">Pictured: perseverance.</p>`,
  },
};

function chartSVG() {
  const steps = [33, 31, 28, 24, 19, 13, 7];
  let green = "";
  let prevY = 35;
  steps.forEach((y, i) => {
    const x = 47 + i * 4;
    green += `<rect x="${x}" y="${y}" width="4" height="2"/><rect x="${x}" y="${y}" width="2" height="${prevY - y + 2}"/>`;
    prevY = y;
  });
  const grid = [10, 18, 26, 34].map((y) => `<rect x="7" y="${y}" width="72" height="1"/>`).join("");
  return `<svg viewBox="0 0 80 44" role="img" aria-label="Chart: coins stuck at zero, then skyrocketing">
    <rect width="80" height="44" fill="#141026"/>
    <g fill="#ffffff14">${grid}</g>
    <rect x="6" y="3" width="1" height="36" fill="#fff4dc"/>
    <rect x="6" y="38" width="73" height="1" fill="#fff4dc"/>
    <rect x="7" y="35" width="40" height="2" fill="#ec3750"/>
    <g fill="#33d17a">${green}<polygon points="72,2 79,2 79,9"/></g>
  </svg>`;
}

function highlight(code) {
  const safe = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return safe.replace(
    /(\/\/.*$)|("[^"]*")|\b(if|while|true|false|return|const|let|undefined|null)\b|([A-Za-z_]\w*)(?=\()/gm,
    (m, com, str, kw, fn) => {
      if (com) return `<span class="t-com">${com}</span>`;
      if (str) return `<span class="t-str">${str}</span>`;
      if (kw) return `<span class="t-kw">${kw}</span>`;
      return `<span class="t-fn">${fn}</span>`;
    },
  );
}

// ===== GAME STATE =====
const state = {
  started: false,
  queue: [],
  typing: false,
  full: "",
  i: 0,
  timer: 0,
  onDone: null,
  who: null,
  awaiting: false,
  locked: false,
  inVerdict: false,
  skipped: false,
  granted: false,
  witness: null,
  coins: 0,
  aura: 0,
  gavel: 0,
  objections: 0,
  denyChases: 0,
  appeals: 0,
  achievements: new Set(),
};

let ducks = [];

const ACHIEVEMENTS = {
  allrise: ["⚖️", "ALL RISE", "Started the trial."],
  shades: ["😎", "DEAL WITH IT", "The judge got sunglasses."],
  gavel10: ["🔨", "GAVEL GOBLIN", "Banged the gavel 10 times."],
  gavel25: ["📢", "NOISE COMPLAINT", "25 bangs. ur done."],
  duck: ["🦆", "DUCK WHISPERER", "Booped a juror."],
  objection3: ["✋", "OBJECTION ENJOYER", "Objected 3 times."],
  devastating: ["💀", "DEVASTATING", "Asked \"on what grounds?\""],
  loop: ["🛑", "LOOP BREAKER", "Broke the infinite loop."],
  todo: ["✅", "BACKLOG HERO", "Resolved a TODO. Finally."],
  deny5: ["🏃", "DENY CHASER", "Chased the deny button 5 times."],
  appeal: ["📜", "APPEALED", "Actually pressed deny. Bold."],
  speedrun: ["⏩", "SPEEDRUNNER", "Skipped straight to the verdict."],
  respects: ["🫡", "RESPECTS PAID", "Pressed F."],
  pushover: ["🧸", "PUSHOVER", "Never objected once."],
  granted: ["💰", "CASE CLOSED", "Granted the coins."],
};

// ===== UI EFFECTS =====
function bump(el) {
  el.classList.remove("bump");
  void el.offsetWidth;
  el.classList.add("bump");
}

function shake(big = false) {
  if (reduceMotion) return;
  const target = state.inVerdict ? ($("#record").classList.contains("on") ? $("#record") : $("#vPanel")) : $("#court");
  target.classList.remove("shake", "bigshake");
  void target.offsetWidth;
  target.classList.add(big ? "bigshake" : "shake");
}

function stamp(text, color = "red") {
  const el = $("#stamp");
  el.textContent = text;
  const longest = Math.max(...text.split("\n").map((l) => [...l].length));
  el.style.fontSize = `${Math.min(96, (innerWidth * 0.86) / Math.max(longest, 4))}px`;
  el.className = "";
  void el.offsetWidth;
  el.className = `show ${color}`;
}

function popText(x, y, text, color) {
  const p = document.createElement("div");
  p.className = "pop";
  p.textContent = text;
  p.style.left = `${x}px`;
  p.style.top = `${y}px`;
  if (color) p.style.color = color;
  document.body.appendChild(p);
  setTimeout(() => p.remove(), 1200);
}

function toast(icon, small, text, cls = "") {
  const t = document.createElement("div");
  t.className = `toast ${cls}`;
  t.innerHTML = `<span class="ico">${icon}</span><div><small>${esc(small)}</small>${esc(text)}</div>`;
  $("#toasts").appendChild(t);
  setTimeout(() => t.remove(), 3900);
}

function unlock(id) {
  if (state.achievements.has(id) || !ACHIEVEMENTS[id]) return;
  state.achievements.add(id);
  const [icon, title, desc] = ACHIEVEMENTS[id];
  toast(icon, "ACHIEVEMENT UNLOCKED", `${title} · ${desc}`);
  Sound.ach();
}

function addCoins(n) {
  state.coins += n;
  $("#coinCount").textContent = state.coins.toLocaleString();
  bump($("#coinChip"));
}

function addAura(n, x, y) {
  state.aura += n;
  $("#auraCount").textContent = state.aura.toLocaleString();
  $("#auraChip").classList.toggle("neg", state.aura < 0);
  bump($("#auraChip"));
  popText(x, y, `${n > 0 ? "+" : ""}${n.toLocaleString()} AURA`, n > 0 ? "var(--purple)" : "var(--red)");
}

function flyCoins(x, y, amount) {
  popText(x, y - 10, `+${amount.toLocaleString()} COINS`, "var(--gold)");
  Sound.coin();
  if (reduceMotion) return addCoins(amount);
  const target = $("#hudCoin").getBoundingClientRect();
  const tx = target.left + target.width / 2;
  const ty = target.top + target.height / 2;
  const n = Math.max(4, Math.min(14, Math.round(amount / 50)));
  let left = amount;
  for (let i = 0; i < n; i++) {
    const share = i === n - 1 ? left : Math.floor(amount / n);
    left -= share;
    const img = document.createElement("img");
    img.src = SPR.coin;
    img.className = "fly-coin";
    img.alt = "";
    document.body.appendChild(img);
    const sx = x + rand(-50, 50);
    const sy = y + rand(-14, 14);
    const mx = (sx + tx) / 2 + rand(-170, 170);
    const my = Math.min(sy, ty) - rand(40, 170);
    const anim = img.animate([
      { transform: `translate(${sx}px, ${sy}px) scale(.6)` },
      { transform: `translate(${mx}px, ${my}px) scale(1.8)`, offset: 0.45 },
      { transform: `translate(${tx}px, ${ty}px) scale(.9)` },
    ], { duration: 650 + i * 65, easing: "cubic-bezier(.45,0,.6,1)", fill: "forwards" });
    anim.onfinish = () => {
      img.remove();
      addCoins(share);
      Sound.tick();
    };
  }
}

function setSweat(on) { $("#defendantWrap").classList.toggle("sweating", on); }

function quackDuck(d, { sound = true, bubble = true } = {}) {
  d.classList.remove("hop");
  void d.offsetWidth;
  d.classList.add("hop");
  setTimeout(() => d.classList.remove("hop"), 460);
  if (sound) Sound.quack();
  if (!bubble) return;
  const q = document.createElement("span");
  q.className = "q";
  q.textContent = pick(["quack", "QUACK", "quack?", "quack!!", "qwak", "objection (quack)", "give coins (quack)", "🦆"]);
  d.appendChild(q);
  setTimeout(() => q.remove(), 950);
}

function cheerJury() {
  ducks.forEach((d, i) => setTimeout(() => quackDuck(d, { sound: i === 5, bubble: i % 4 === 1 }), i * 45));
}

function bangGavel(byUser) {
  const g = $("#gavelBtn");
  g.classList.remove("bang");
  void g.offsetWidth;
  g.classList.add("bang");
  Sound.gavel();
  shake();
  if (!byUser) return;
  state.gavel++;
  $("#gavelCount").textContent = state.gavel;
  bump($("#gavelCount").parentElement);
  const r = g.getBoundingClientRect();
  popText(r.left + r.width / 2, r.top, pick(["ORDER!", "ORDER!!", "SILENCE!", "BONK", "*bonk*", "ORDER IN THE COURT!"]), "var(--cream)");
  if (state.gavel === 10) unlock("gavel10");
  if (state.gavel === 25) {
    unlock("gavel25");
    stamp("UR DONE.", "white");
    toast("🦆", "BAILIFF DUCK", "you're done. you're DONE.", "say");
    $("#defendantWrap").classList.add("turned");
    setTimeout(() => $("#defendantWrap").classList.remove("turned"), 2500);
  }
  if (state.gavel === 50) toast("🔨", "THE GAVEL", "has filed a restraining order against you.", "say");
  if (state.gavel === 100) toast("🏛️", "BREAKING NEWS", "courthouse structurally compromised. please stop.", "say");
}

function consoleSpam() {
  console.log("%cpls", "font-size:40px;color:#ffd23f;background:#1b1325;padding:6px 14px;font-family:monospace");
  for (let i = 0; i < 50; i++) console.log("pls");
  console.log(`%c(this is the witness. hi your honor. pls give ${CONFIG.club} coins.)`, "color:#b48cff;font-size:14px");
}

function consoleClear() {
  console.clear();
  console.log("%cyou can clear the console... but you can't clear the TRUTH.", "color:#ec3750;font-size:16px");
}

function payRespects() {
  popText(rand(80, innerWidth - 80), rand(120, innerHeight - 120), "F", "var(--gold)");
  Sound.blip(2);
  unlock("respects");
}

function runFx(name) {
  const fx = {
    gavel: () => bangGavel(false),
    shake: () => shake(),
    bigshake: () => shake(true),
    boom: () => { Sound.boom(); shake(true); },
    objection: () => { Sound.objection(); shake(); },
    dun: () => Sound.dun(),
    quack: () => quackDuck(pick(ducks)),
    quacks: () => ducks.forEach((d, i) => setTimeout(() => quackDuck(d, { sound: i % 3 === 0 }), i * 90)),
    huddle: () => {
      $("#jury").classList.add("huddle");
      setTimeout(() => $("#jury").classList.remove("huddle"), 2600);
    },
    sweat: () => setSweat(true),
    nosweat: () => setSweat(false),
    turn: () => $("#defendantWrap").classList.add("turned"),
    unturn: () => $("#defendantWrap").classList.remove("turned"),
    shades: () => { $("#judgeShades").classList.add("on"); unlock("shades"); },
    console: consoleSpam,
    clear: consoleClear,
    ascend: () => $("#witness").classList.add("ascend"),
    sad: () => Sound.sad(),
  };
  if (fx[name]) fx[name]();
}

// ===== STAGE PROPS =====
function showExhibit(id) {
  const box = $("#exhibit");
  const ex = EXHIBITS[id];
  const put = () => {
    $("#exTitle").textContent = ex.title;
    $("#exBody").innerHTML = ex.html();
    box.classList.add("on");
    Sound.whoosh();
  };
  if (box.classList.contains("on")) {
    box.classList.remove("on");
    setTimeout(put, 280);
  } else put();
}

function showWitness(w) {
  state.witness = w;
  const el = $("#witness");
  el.classList.remove("on", "ghost", "ascend");
  $("#witnessCode").innerHTML = highlight(w.code);
  $("#standLabel").textContent = w.name;
  void el.offsetWidth;
  el.classList.add("on");
  if (w.ghost) el.classList.add("ghost");
  Sound.whoosh();
}

function hideProp(what) {
  if (what === "exhibit") $("#exhibit").classList.remove("on");
  if (what === "prosecutor") $("#prosecutor").classList.remove("on");
  if (what === "witness") {
    $("#witness").classList.remove("on", "ghost", "ascend");
    $("#standLabel").textContent = "WITNESS";
  }
}

// ===== DIALOGUE ENGINE =====
function setTalking(who, on) {
  $(".portrait").classList.toggle("talking", on);
  const sel = TALKERS[who];
  if (sel) $(sel).classList.toggle("talking", on);
}

function speak(who, text, done) {
  const cast = CAST[who];
  state.who = who;
  $("#speaker").textContent = cast.name();
  $("#portrait").src = SPR[cast.img];
  $("#line").className = `line${who === "narrator" ? " narrator" : ""}`;
  $("#line").textContent = "";
  $("#srLine").textContent = `${cast.name()}: ${text}`;
  state.full = text;
  state.i = 0;
  state.typing = true;
  state.onDone = done;
  setTalking(who, true);
  clearTimeout(state.timer);
  typeTick();
}

function typeTick() {
  state.i++;
  $("#line").textContent = state.full.slice(0, state.i);
  const ch = state.full[state.i - 1];
  const cast = CAST[state.who];
  if (state.i % 2 === 0 && ch !== " ") Sound.blip(cast.pitch, cast.wave);
  if (state.i >= state.full.length) return finishTyping();
  const delay = ".!?".includes(ch) ? 150 : ch === "," ? 70 : CONFIG.typeSpeed;
  state.timer = setTimeout(typeTick, delay);
}

function finishTyping() {
  clearTimeout(state.timer);
  $("#line").textContent = state.full;
  state.typing = false;
  setTalking(state.who, false);
  const cb = state.onDone;
  state.onDone = null;
  if (cb) cb();
}

function runStep(step) {
  $("#nextArrow").classList.remove("on");
  if (step.hide) hideProp(step.hide);
  if (step.show === "exhibit") showExhibit(step.exhibit);
  if (step.show === "witness") showWitness(step.witness);
  if (step.show === "prosecutor") { $("#prosecutor").classList.add("on"); Sound.whoosh(); }
  (step.fx || []).forEach(runFx);
  if (step.stamp) stamp(step.stamp, step.stampColor || "red");
  speak(step.who, fmt(step.text), () => {
    if (step.choices) showChoices(step.choices);
    else $("#nextArrow").classList.add("on");
  });
}

function next() {
  if (state.inVerdict) return;
  const step = state.queue.shift();
  if (!step) return;
  if (step.verdict) return openVerdict(false);
  runStep(step);
}

function advance() {
  if (!state.started || state.inVerdict) return;
  if (state.typing) return finishTyping();
  if (state.awaiting || state.locked) return;
  next();
}

function showChoices(choices) {
  state.awaiting = true;
  const box = $("#choices");
  box.innerHTML = "";
  choices.forEach((c, i) => {
    const b = document.createElement("button");
    b.className = `btn choice btn-${c.kind}`;
    b.style.animationDelay = `${i * 0.09}s`;
    b.innerHTML = `${esc(c.label)}<span class="key">[${i + 1}]</span>`;
    b.addEventListener("click", () => choose(c, b));
    box.appendChild(b);
  });
}

function choose(c, btn) {
  if (!state.awaiting) return;
  state.awaiting = false;
  state.locked = true;
  const r = btn.getBoundingClientRect();
  const x = r.left + r.width / 2;
  const y = r.top + r.height / 2;
  const coins = c.coins ?? (c.kind === "allow" ? 150 : 0);
  const aura = c.aura ?? (c.kind === "allow" ? 150 : c.kind === "object" ? -250 : 0);
  let stampText = c.stamp;
  let stampColor = c.stampColor;

  if (c.kind === "allow") {
    Sound.allow();
    cheerJury();
    FX.confetti(x, y, 30);
    if (stampText === undefined) { stampText = "I'LL ALLOW IT"; stampColor = "green"; }
  } else if (c.kind === "object") {
    state.objections++;
    $("#objCount").textContent = state.objections;
    bump($("#objCount").parentElement);
    Sound.objection();
    shake();
    setSweat(true);
    if (stampText === undefined) stampText = "OBJECTION!";
    if (state.objections === 3) unlock("objection3");
  } else {
    Sound.blip(1.6);
  }

  if (stampText) stamp(stampText, stampColor || "red");
  if (coins) flyCoins(x, y, coins);
  if (aura) addAura(aura, x, y - 40);
  (c.fx || []).forEach(runFx);
  if (c.ach) unlock(c.ach);
  $("#choices").innerHTML = "";

  const extra = [];
  if (c.kind === "object" && state.objections === 3) {
    extra.push(
      defense("That's objection number THREE. Your honor... you're done. You're DONE.", { fx: ["turn", "boom"], stamp: "UR DONE.", stampColor: "white" }),
      defense("...okay I'm back. Where were we.", { fx: ["unturn"] }),
    );
  }
  state.queue.unshift(...(c.reply || []), ...extra);
  setTimeout(() => {
    state.locked = false;
    next();
  }, 700);
}

// ===== VERDICT =====
const DENY_LABELS = ["deny", "are you sure?", "really??", "think of gerald", "the ducks are watching", "bro.", "nah", "wallahi no", "ur done.", "deny (coward)", "404: deny not found", "(╯°□°)╯︵ ┻━┻"];
const DENY_LINES = ["I can't believe you've done this", "wallahi I'm cooked 💀", "EMOTIONAL DAMAGE", "you're done. you're DONE.", "not the deny button 😭", "the ducks saw that.", "gerald is crying rn", "bro is NOT getting that button 💀", "skill issue (yours)", "that button is scared of you"];
const GRANT_LINES = ["yes... YES... do it...", "that button looks SO good on you", "gerald is holding his breath", "the ducks are leaning forward", "click it. click it. click it."];

let lastPointer = { x: -999, y: -999 };

function say(text) {
  const bubble = $("#vBubble");
  $("#vBubbleText").textContent = text;
  bubble.classList.remove("say");
  void bubble.offsetWidth;
  bubble.classList.add("say");
}

function openVerdict(skipped) {
  if (state.inVerdict) return;
  state.inVerdict = true;
  state.skipped = skipped;
  clearTimeout(state.timer);
  state.typing = false;
  state.awaiting = false;
  setTalking(state.who, false);
  $("#choices").innerHTML = "";
  $("#verdict").classList.add("on");
  $("#verdict").scrollTop = 0;
  Sound.dun();
  if (skipped) {
    unlock("speedrun");
    stamp("ANY%\nSPEEDRUN", "gold");
    say("skipping straight to the verdict?? ...respect. please give coins.");
  } else {
    say("please. please. please. please.");
  }
}

function hits(x, y, w, h, r, pad) {
  return x < r.right + pad && x + w > r.left - pad && y < r.bottom + pad && y + h > r.top - pad;
}

function runAway(e) {
  const btn = $("#denyBtn");
  if (state.granted || btn.classList.contains("converted")) return;
  if (e && e.cancelable) e.preventDefault();
  if (e && e.clientX !== undefined) lastPointer = { x: e.clientX, y: e.clientY };
  state.denyChases++;
  Sound.whoosh();
  say(pick(DENY_LINES));
  if (state.denyChases === 5) unlock("deny5");
  if (state.denyChases >= DENY_LABELS.length) return convertDeny();

  const panel = $("#vPanel").getBoundingClientRect();
  const grant = $("#grantBtn").getBoundingClientRect();
  if (!btn.classList.contains("loose")) {
    const b0 = btn.getBoundingClientRect();
    btn.style.left = `${b0.left - panel.left}px`;
    btn.style.top = `${b0.top - panel.top}px`;
    btn.classList.add("loose");
    void btn.offsetWidth;
  }
  btn.textContent = DENY_LABELS[state.denyChases];
  btn.style.transform = `scale(${Math.max(0.5, 1 - state.denyChases * 0.045)})`;
  const b = btn.getBoundingClientRect();
  let x = 0;
  let y = 0;
  for (let tries = 0; tries < 30; tries++) {
    x = rand(0, Math.max(0, panel.width - b.width));
    y = rand(0, Math.max(0, panel.height - b.height));
    const ax = panel.left + x;
    const ay = panel.top + y;
    const nearPointer = Math.hypot(ax + b.width / 2 - lastPointer.x, ay + b.height / 2 - lastPointer.y) < 150;
    if (!hits(ax, ay, b.width, b.height, grant, 24) && !nearPointer) break;
  }
  btn.style.left = `${x}px`;
  btn.style.top = `${y}px`;
}

function convertDeny() {
  const btn = $("#denyBtn");
  btn.classList.add("converted", "btn-gold");
  btn.classList.remove("btn-deny");
  btn.textContent = "fine. GRANT 💰";
  btn.style.transform = "scale(1)";
  say("the deny button has fled the jurisdiction. only GRANT remains.");
  stamp("NO DENY\nONLY GRANT", "gold");
}

function appeal() {
  state.appeals++;
  unlock("appeal");
  Sound.sad();
  shake(true);
  stamp("UR DONE.", "white");
  say("you're done. you're DONE. (the defense filed an appeal. the defense approved the appeal.)");
  $("#denyBtn").style.transform = `scale(${Math.max(0.35, 0.8 - state.appeals * 0.15)})`;
  if (state.appeals >= 3) convertDeny();
}

async function grant() {
  if (state.granted) return;
  state.granted = true;
  $("#grantBtn").disabled = true;
  $("#grantBtn").textContent = "✅ GRANTED";
  $("#denyBtn").classList.add("gone");
  say("...");
  for (let i = 0; i < 3; i++) {
    Sound.gavel();
    shake();
    await sleep(300);
  }
  stamp("GRANTED", "gold");
  Sound.fanfare();
  $("#verdict .v-judge-wrap .shades").classList.add("on");
  FX.rain(180);
  FX.confetti(innerWidth / 2, innerHeight * 0.45, 140, 1.4);
  say("LET'S GOOOOOO 🎉🎉🎉");
  unlock("granted");
  if (state.objections === 0 && !state.skipped) unlock("pushover");
  await sleep(2300);
  stamp("CASE\nCLOSED", "red");
  Sound.gavel();
  shake(true);
  await sleep(1300);
  showRecord();
}

function showRecord() {
  const rows = [
    ["Coins awarded", "0*", "recCoins"],
    ["Coins argued for in trial", state.coins.toLocaleString()],
    ["Aura farmed", state.aura.toLocaleString()],
    ["Gavel bangs", state.gavel],
    ["Objections raised", state.objections],
    ["Deny button chases", state.denyChases],
    ["Ducks consulted", 12],
    ["Moths housed", "1 (Gerald)"],
    ["Achievements", `${state.achievements.size} / ${Object.keys(ACHIEVEMENTS).length}`],
  ];
  $("#recStats").innerHTML = rows.map(([k, v, id]) => `<li><span>${esc(k)}</span><b${id ? ` id="${id}"` : ""}>${esc(v)}</b></li>`).join("");
  $("#vPanel").classList.add("done");
  $("#record").classList.add("on");
  $("#verdict").scrollTop = 0;
  const start = performance.now();
  const dur = 1600;
  const roll = (now) => {
    const t = Math.min(1, (now - start) / dur);
    const val = Math.round(CONFIG.finalCoins * (1 - Math.pow(1 - t, 3)));
    $("#recCoins").textContent = `${val.toLocaleString()}*`;
    if (t < 1) {
      if (Math.random() < 0.5) Sound.tick();
      requestAnimationFrame(roll);
    } else {
      Sound.coin();
    }
  };
  requestAnimationFrame(roll);
}

function copyRuling() {
  const text = [
    `⚖️ COIN COURT · CASE NO. ${CONFIG.caseNumber}`,
    `${CONFIG.club} v. BEING BROKE`,
    `RULING: COINS GRANTED ✅ (${CONFIG.finalCoins.toLocaleString()} coins)`,
    `Gavel bangs: ${state.gavel} · Objections: ${state.objections} · Deny chases: ${state.denyChases}`,
    "CASE CLOSED. ur done. 🫡",
  ].join("\n");
  const ok = () => toast("📋", "COPIED", "Ruling copied. Paste it in your review 😉");
  const fail = () => toast("📋", "HMM", "Couldn't copy. The spreadsheet blocked it.");
  if (navigator.clipboard) navigator.clipboard.writeText(text).then(ok, fail);
  else fail();
}

// ===== START =====
function start() {
  if (state.started) return;
  state.started = true;
  Sound.init();
  $("#title").classList.remove("active");
  $("#court").classList.add("active");
  scrollTo(0, 0);
  unlock("allrise");
  state.queue = TRIAL.slice();
  setTimeout(next, 350);
}

function fillTicker(el) {
  const html = HEADLINES.map((h) => `<span>${esc(h)}</span>`).join("<b>★</b>") + "<b>★</b>";
  el.innerHTML = html + html;
}

function buildJury() {
  const box = $("#jury");
  for (let i = 0; i < 12; i++) {
    const d = document.createElement("button");
    d.className = "duck";
    d.style.setProperty("--i", i);
    d.setAttribute("aria-label", `Juror #${i + 1} (a duck)`);
    d.innerHTML = `<img class="sprite" src="${SPR.duck}" alt="">`;
    d.addEventListener("click", () => {
      quackDuck(d);
      unlock("duck");
    });
    box.appendChild(d);
    ducks.push(d);
  }
}

function init() {
  const hoodie = getComputedStyle(document.documentElement).getPropertyValue("--hoodie").trim() || "#ec3750";
  SPR = makeSprites(hoodie);
  $$("[data-sprite]").forEach((img) => { img.src = SPR[img.dataset.sprite]; });
  $("#favicon").href = SPR.coin;
  FX.setCoin(SPR.coin);
  $$(".club-name").forEach((el) => { el.textContent = CONFIG.club; });
  $$(".case-num").forEach((el) => { el.textContent = CONFIG.caseNumber; });
  $("#nameplate").textContent = CONFIG.judgeName;
  fillTicker($("#titleTicker"));
  fillTicker($("#courtTicker"));
  buildJury();
  $("#muteBtn").textContent = Sound.muted ? "🔇" : "🔊";

  $("#startBtn").addEventListener("click", start);
  $("#dialogue").addEventListener("click", advance);
  $("#stage").addEventListener("click", (e) => { if (!e.target.closest("button")) advance(); });
  $("#gavelBtn").addEventListener("click", () => bangGavel(true));
  $("#muteBtn").addEventListener("click", () => {
    Sound.init();
    $("#muteBtn").textContent = Sound.toggle() ? "🔇" : "🔊";
  });
  $("#skipBtn").addEventListener("click", () => openVerdict(true));

  const grantBtn = $("#grantBtn");
  const denyBtn = $("#denyBtn");
  grantBtn.addEventListener("click", grant);
  grantBtn.addEventListener("pointerenter", () => { if (!state.granted) say(pick(GRANT_LINES)); });
  denyBtn.addEventListener("pointerenter", (e) => { if (e.pointerType === "mouse") runAway(e); });
  denyBtn.addEventListener("pointerdown", runAway);
  denyBtn.addEventListener("click", () => {
    if (denyBtn.classList.contains("converted")) grant();
    else appeal();
  });
  $("#vPanel").addEventListener("pointermove", (e) => { lastPointer = { x: e.clientX, y: e.clientY }; });
  $("#retrialBtn").addEventListener("click", () => location.reload());
  $("#copyBtn").addEventListener("click", copyRuling);

  addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const k = e.key.toLowerCase();
    const onButton = e.target.closest && e.target.closest("button");
    if (k === "f" && !e.repeat) return payRespects();
    if (!state.started) {
      if ((k === "enter" || k === " ") && !onButton) {
        e.preventDefault();
        start();
      }
      return;
    }
    if (state.inVerdict) return;
    if ((k === " " || k === "enter") && !onButton) {
      e.preventDefault();
      advance();
    }
    if (["1", "2", "3"].includes(k)) {
      const b = $$("#choices .choice")[Number(k) - 1];
      if (b) b.click();
    }
    if (k === "g" && !e.repeat) bangGavel(true);
  });

  console.log("%c⚖️ COIN COURT", "font:24px monospace;color:#ffd23f;background:#1b1325;padding:8px 16px");
  console.log(`%ca reviewer in the dev tools? respect. ${CONFIG.club} deserves coins btw.`, "color:#b48cff;font-size:13px");
}

init();
