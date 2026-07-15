/* ============================================================
   i am — live lyric video engine
   Reads the audio clock every frame and renders the cue sheet
   (CUES) + background track (BG) from cues.js as live DOM.
   ============================================================ */
(function () {
  "use strict";

  const stage    = document.getElementById("stage");
  const cueLayer = document.getElementById("cueLayer");
  const audio    = document.getElementById("song");
  const landing  = document.getElementById("landing");
  const chrome    = document.getElementById("chrome");
  const endcard   = document.getElementById("endcard");
  const playBtn   = document.getElementById("playBtn");
  const replayBtn = document.getElementById("replayBtn");
  const scrub     = document.getElementById("scrub");
  const scrubFill = document.getElementById("scrubFill");
  const timecode  = document.getElementById("timecode");
  const topbar    = document.getElementById("topbar");
  const fsBtn     = document.getElementById("fsBtn");
  const toastEl   = document.getElementById("toast");
  const invDisc   = document.getElementById("invDisc");
  const eggLayer  = document.getElementById("eggLayer");
  const scareTint = document.getElementById("scareTint");
  const uiLayer   = document.getElementById("uiLayer");
  const whyBox    = document.getElementById("whyBox");
  const whyInput  = document.getElementById("whyInput");
  const whySubmit = document.getElementById("whySubmit");
  const btnEls    = {};                              // cueIdx -> lyric-button element
  let whyDone = false, hauntEl = null, hauntNext = 0; // "why didn't you care?" answer haunting the bg
  let whyEggNext = 0;                                 // sporadic hidden "(why?)" eggs after the first (why)

  const ROLE_CLASS = {
    sans: "r-sans", impact: "r-impact", cond: "r-cond",
    serif: "r-serif", serifIt: "r-serifIt", mono: "r-mono", hook: "r-hook",
  };
  const ANCHOR_XY = {
    c:  [-50, -50], t:  [-50, 0],   b:  [-50, -100],
    l:  [0,   -50], r:  [-100, -50],
    tl: [0,    0],  tr: [-100, 0],  bl: [0, -100], br: [-100, -100],
  };
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  let reduceFlash = prefersReduced;         // start reduced if the OS asks for it
  let running = false;
  let clockOverride = null;                 // debug: render a fixed timestamp
  // visual-vs-audio sync nudge (seconds). MP3 adds ~20ms of encoder padding, so the
  // heard audio lags the clock slightly; render a touch behind to match. Tunable with [ ].
  let syncOffset = parseFloat(localStorage.getItem("iam_sync") || "-0.02");
  // mouse interaction state
  const dragState = {};                              // idx -> {dx,dy} while a word is dragged
  const mouse = { x: 0, y: 0, inside: false };
  let dragIdx = null, dragBase = { x: 0, y: 0 }, dragFrom = { x: 0, y: 0 };
  const KILL_DIST = 160;                             // drag this far (px) → the word dissolves
  let scare = 0;                                     // escalating red/scary level (button clicks)
  const mounted = new Map();                // cueIndex -> element

  /* ---------- colour helpers ---------- */
  function lum(hex) {
    const h = hex.replace("#", "");
    const n = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
    const r = parseInt(n.slice(0, 2), 16) / 255;
    const g = parseInt(n.slice(2, 4), 16) / 255;
    const b = parseInt(n.slice(4, 6), 16) / 255;
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  }
  function mix(a, b, t) {
    const pa = a.replace("#", ""), pb = b.replace("#", "");
    const A = [0, 2, 4].map((i) => parseInt(pa.slice(i, i + 2), 16));
    const B = [0, 2, 4].map((i) => parseInt(pb.slice(i, i + 2), 16));
    const C = A.map((v, i) => Math.round(v + (B[i] - v) * t));
    return "#" + C.map((v) => v.toString(16).padStart(2, "0")).join("");
  }

  /* ---------- background (exact cut keyframes: [t, color]) ---------- */
  function bgAt(t) {
    const track = (reduceFlash && typeof BG_CALM !== "undefined") ? BG_CALM : BG;
    let color = track[0][1];
    for (let i = 0; i < track.length; i++) {
      if (track[i][0] <= t) color = track[i][1];
      else break;
    }
    return color;
  }

  /* ---------- fit-to-fill: set the REAL font-size (crisp — no transform scaling) ----------
     Text scaled with transform:scale() rasterises small then upsamples → blurry.
     Instead we measure the glyphs once at a 100px reference, then set the exact
     px font-size that fills the target, so the browser renders it natively sharp. */
  const FIT_REF = 100;
  function ensureNat(el) {
    if (el.dataset.natW) return true;               // measured once (glyph metrics are viewport-independent)
    const prev = el.style.fontSize;
    el.style.fontSize = FIT_REF + "px";
    const nw = el.offsetWidth, nh = el.offsetHeight;
    if (nw && nh) { el.dataset.natW = nw; el.dataset.natH = nh; return true; }
    el.style.fontSize = prev;                        // viewport not laid out yet — try again later
    return false;
  }
  function applyFit(el, cue) {
    if (!ensureNat(el)) return;
    const W = stage.clientWidth, H = stage.clientHeight;
    if (!W || !H) return;
    const natW = +el.dataset.natW, natH = +el.dataset.natH;
    const vertical = Math.abs(((cue.rot || 0) % 180)) > 45; // ~90deg → text runs vertically
    let fs;
    if (vertical) {
      fs = Math.min(FIT_REF * (cue.fit * H) / natW, FIT_REF * ((cue.fitW || 0.96) * W) / natH);
    } else {
      fs = Math.min(FIT_REF * (cue.fit * W) / natW, FIT_REF * ((cue.fitH || 0.96) * H) / natH);
    }
    el.style.fontSize = fs + "px";
  }

  /* ---------- mount / update ---------- */
  function mount(idx, cue) {
    const el = document.createElement("div");
    el.className = "cue " + (ROLE_CLASS[cue.role] || "r-sans");
    el.dataset.idx = idx;
    el.textContent = cue.text;
    el.style.left = (cue.x != null ? cue.x : 50) + "%";
    el.style.top  = (cue.y != null ? cue.y : 50) + "%";
    el.style.textAlign = cue.align || "center";
    if (cue.weight) el.style.fontWeight = cue.weight;
    if (cue.font) el.style.fontFamily = cue.font;
    if (cue.track != null) el.style.letterSpacing = cue.track + "em";
    if (cue.lh != null) el.style.lineHeight = cue.lh;
    if (cue.case === "upper") el.style.textTransform = "uppercase";
    if (cue.case === "lower") el.style.textTransform = "lowercase";
    if (cue.color) el.style.color = cue.color;
    if (cue.skew) el.dataset.skew = cue.skew;

    if (cue.fit) {
      el.style.whiteSpace = "pre";      // keep multi-line blocks tight for measuring
      applyFit(el, cue);                // sets a crisp px font-size
    } else {
      // size is % of viewport height (matches the vertical source's measured proportions)
      el.style.fontSize = (cue.size || 8) + "vh";
    }
    if (cue.fx === "melt") el.classList.add("is-melt");
    if (cue.fx === "drip") el.classList.add("is-drip");

    cueLayer.appendChild(el);
    if (cue.fit) applyFit(el, cue);     // re-fit now it's in the DOM
    if (cue.btn) makeButton(idx, cue);  // interactive lyric button, shown with the line
    mounted.set(idx, el);
    return el;
  }

  function envelope(cue, localT, life) {
    // opacity from enter/exit transitions — HARD CUT is the default (matches the source)
    const dur = cue.dur != null ? cue.dur : 0.12;
    let o = cue.opacity != null ? cue.opacity : 1;
    const fadeIn = cue.enter && cue.enter !== "cut";        // fade / scale / rise fade in
    if (fadeIn && localT < dur) o *= localT / dur;
    if (cue.exit === "fade" && localT > life - dur) o *= Math.max(0, (life - localT) / dur);
    return o;
  }

  function update(idx, cue, t) {
    const el = mounted.get(idx) || mount(idx, cue);
    const life = cue.e - cue.s;
    const localT = t - cue.s;
    const k = Math.min(1, Math.max(0, localT / life));
    const dur = cue.dur != null ? cue.dur : 0.12;

    // opacity — dragging a word fades it out; drag far enough and it's gone
    let op = envelope(cue, localT, life);
    const ds = dragState[idx];
    if (ds && dragIdx === idx) op *= Math.max(0.25, 1 - Math.hypot(ds.dx, ds.dy) / (KILL_DIST * 1.5));  // faint only while actively dragging
    if (el.dataset.dead) { op = 0; el.style.pointerEvents = "none"; }  // gone → don't hold the grab cursor
    el.style.opacity = op;

    // fit cues set a crisp px font-size (recomputed live so it tracks the viewport);
    // any scaling below is only a transient grow/pop, never the base size.
    if (cue.fit) applyFit(el, cue);
    let scale = 1;
    if (cue.grow) scale *= cue.grow[0] + (cue.grow[1] - cue.grow[0]) * k;
    if (cue.enter === "scale" && localT < dur) {
      const e = localT / dur;
      scale *= 0.72 + 0.28 * e;
    }
    // drip cues gently stretch downward over their life (word stays legible)
    let extraY = "";
    if (cue.fx === "drip" && !reduceFlash && !prefersReduced) {
      const sy = 1 + 0.55 * k;
      extraY = " scaleY(" + sy.toFixed(3) + ")";
    }

    const [ax, ay] = ANCHOR_XY[cue.anchor || "c"];
    let rise = "";
    if (cue.enter === "rise" && localT < dur) {
      rise = " translateY(" + ((1 - localT / dur) * 6).toFixed(2) + "vh)";
    }
    const skew = cue.skew ? " skewX(" + cue.skew + "deg)" : "";
    const dragT = ds ? "translate(" + ds.dx + "px," + ds.dy + "px) " : "";
    el.style.transform =
      dragT +
      "translate(" + ax + "%," + ay + "%)" + rise +
      " rotate(" + (cue.rot || 0) + "deg)" +
      " scale(" + scale.toFixed(4) + ")" + extraY + skew;
  }

  function unmount(idx) {
    const el = mounted.get(idx);
    if (el) { el.remove(); mounted.delete(idx); }
    if (btnEls[idx]) { btnEls[idx].remove(); delete btnEls[idx]; }   // button vanishes with the edit
    delete dragState[idx];
    if (dragIdx === idx) dragIdx = null;
  }
  function makeButton(idx, cue) {
    if (btnEls[idx]) return;
    const b = document.createElement("button");
    b.className = "lyric-btn" + (cue.btnRun ? " is-runaway" : "");
    b.type = "button";
    b.textContent = cue.btn;
    b.style.left = (18 + Math.random() * 64) + "vw";     // pop up anywhere
    b.style.top  = (26 + Math.random() * 48) + "vh";
    b.addEventListener("pointerdown", function (e) { e.stopPropagation(); });   // don't start a word-drag
    b.addEventListener("click", function (e) { e.stopPropagation(); hitButton(b); });
    uiLayer.appendChild(b);
    btnEls[idx] = b;
  }
  function hitButton(b) {
    bumpScare();
    b.classList.remove("is-hit"); void b.offsetWidth; b.classList.add("is-hit");
    document.body.classList.add("is-jolt");
    clearTimeout(hitButton._t);
    hitButton._t = setTimeout(function () { document.body.classList.remove("is-jolt"); }, 340);
  }
  // the "say it" button flees the cursor (only that one)
  function dodge(x, y) {
    const rb = uiLayer.querySelector(".lyric-btn.is-runaway");
    if (!rb) return;
    const r = rb.getBoundingClientRect();
    const bx = r.left + r.width / 2, by = r.top + r.height / 2;
    let dx = bx - x, dy = by - y, d = Math.hypot(dx, dy) || 1;
    if (d < 160) {
      let nx = bx + (dx / d) * (160 - d) * 1.6;
      let ny = by + (dy / d) * (160 - d) * 1.6;
      nx = Math.max(70, Math.min(window.innerWidth - 70, nx));
      ny = Math.max(80, Math.min(window.innerHeight - 90, ny));
      rb.style.left = nx + "px"; rb.style.top = ny + "px";
    }
  }

  /* ---------- keep the browser chrome (iOS status bar / toolbar) matching the show ----------
     Direct open: live-update our own theme-color meta (honored because it exists at load).
     Embedded: postMessage the color; the WordPress block paints the parent page to match,
     so the white/black cuts strobe the phone's status bar + toolbar too. */
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  let lastBcast = null;
  function broadcastBg(color) {
    if (color === lastBcast) return;
    lastBcast = color;
    if (themeMeta) themeMeta.setAttribute("content", color);
    if (window.parent !== window) {
      try { window.parent.postMessage({ iam: "bg", color: color }, "*"); } catch (e) {}
    }
  }

  /* ---------- render one timestamp (rAF-independent) ---------- */
  let lastT = 0;
  function renderAt(t) {
    lastT = t;
    // background + auto-contrast foreground
    const bg = bgAt(t);
    stage.style.setProperty("--bg", bg);
    stage.style.setProperty("--fg", lum(bg) > 0.5 ? "#000" : "#fff");
    broadcastBg(bg);

    // cues
    for (let i = 0; i < CUES.length; i++) {
      const c = CUES[i];
      const active = t >= c.s && t < c.e;
      if (active) update(i, c, t);
      else if (mounted.has(i)) unmount(i);
    }

    // chrome
    const dur = audio.duration || 200;
    scrubFill.style.width = (100 * t / dur) + "%";
    timecode.textContent = fmt(t);

    updateEggs(t);   // reveal/hide the hidden easter-egg lyrics for this moment
    updateWhy(t);    // the "why didn't you care?" prompt + its haunting answer
    if (t > 88 && t >= whyEggNext) {   // after the first (why): rarely hide a "(why?)" to find
      whyEggNext = t + 10 + Math.random() * 18;
      if (eggLayer.querySelectorAll(".why-egg").length < 3) spawnWhyEgg();
    }
    if (scare > 0) { scare = Math.max(0, scare - 0.012); applyScare(); }   // slowly calm down
  }
  function spawnWhyEgg() {
    const roles = ["r-sans", "r-impact", "r-cond", "r-serif", "r-serifIt", "r-mono", "r-hook"];
    const el = document.createElement("div");
    el.className = "egg why-egg " + roles[(Math.random() * roles.length) | 0];
    el.textContent = "(why?)";
    el.style.left = (12 + Math.random() * 76) + "%";
    el.style.top  = (14 + Math.random() * 72) + "%";
    el.style.fontSize = (2.4 + Math.random() * 3.4) + "vh";
    el.style.transform = "translate(-50%,-50%) rotate(" + ((Math.random() - 0.5) * 20 | 0) + "deg)";
    eggLayer.appendChild(el);
    setTimeout(function () { if (el.parentNode) el.remove(); }, 13000);  // don't linger forever
  }

  function updateWhy(t) {
    const inWindow = t >= 48.5 && t < 95;      // the you-don't-care / do-you / not-like stretch
    if (!whyDone && inWindow) { if (whyBox.hidden) whyBox.hidden = false; }
    else if (!whyBox.hidden) whyBox.hidden = true;
    if (hauntEl && t >= hauntNext) {           // the answer drifts + resizes through the dark
      hauntNext = t + 2 + Math.random() * 2.5;
      hauntEl.style.left = (12 + Math.random() * 76) + "%";
      hauntEl.style.top  = (16 + Math.random() * 68) + "%";
      hauntEl.style.fontSize = (2 + Math.random() * 3.6) + "vh";
      hauntEl.style.transform = "translate(-50%,-50%) rotate(" + ((Math.random() - 0.5) * 16).toFixed(1) + "deg)";
    }
  }
  function submitWhy() {
    const v = (whyInput.value || "").trim();
    whyDone = true;
    whyBox.hidden = true;
    if (v && !hauntEl) {
      hauntEl = document.createElement("div");
      hauntEl.className = "egg r-serifIt";
      hauntEl.textContent = v;
      hauntEl.style.left = "50%"; hauntEl.style.top = "42%";
      hauntEl.style.fontSize = "3vh";
      hauntEl.style.transform = "translate(-50%,-50%)";
      eggLayer.appendChild(hauntEl);
      hauntNext = 0;
    }
  }

  /* ---------- main loop ---------- */
  function frame() {
    if (!running) return;
    const t = clockOverride != null ? clockOverride : Math.max(0, audio.currentTime + syncOffset);
    renderAt(t);
    requestAnimationFrame(frame);
  }

  function fmt(s) {
    s = Math.max(0, Math.floor(s));
    return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
  }

  /* ---------- resize: re-render so fit-scaled cues track the viewport ---------- */
  window.addEventListener("resize", function () {
    if (running) renderAt(lastT);
  });
  // fires when the stage gains real dimensions (e.g. a screenshot activates the tab)
  if (window.ResizeObserver) {
    new ResizeObserver(function () {
      if (running && stage.clientWidth) renderAt(lastT);
    }).observe(stage);
  }
  // web fonts load async — re-measure fit cues once the real glyphs are ready
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      mounted.forEach(function (el) { delete el.dataset.natW; delete el.dataset.natH; });
      if (running) renderAt(lastT);
    });
  }

  /* ---------- flow ---------- */
  function start() {
    landing.classList.add("is-gone");
    setTimeout(function () { landing.hidden = true; }, 500);
    stage.classList.add("is-live");
    stage.setAttribute("aria-hidden", "false");
    document.body.classList.add("playing");    // hide the arrow — spotlight is the cursor
    broadcastBg("#000000");   // black out the browser chrome; renderAt keeps it matched to every cut from here
    chrome.hidden = false;
    topbar.hidden = false;
    running = true;
    scare = 0; applyScare();
    whyDone = false; whyBox.hidden = true; whyEggNext = 0;
    if (hauntEl) { hauntEl.remove(); hauntEl = null; }
    eggLayer.querySelectorAll(".why-egg").forEach(function (el) { el.remove(); });
    audio.currentTime = 0;
    const p = audio.play();
    if (p && p.catch) p.catch(function (e) { console.warn("play blocked:", e); });
    requestAnimationFrame(frame);
    poke();
  }

  playBtn.addEventListener("click", start);

  // (mouse interaction to be chosen — see options; start/stop is the spacebar)

  // scrub
  function seekFromEvent(e) {
    const r = scrub.getBoundingClientRect();
    const x = ((e.clientX != null ? e.clientX : e.touches[0].clientX) - r.left) / r.width;
    audio.currentTime = Math.min(audio.duration || 200, Math.max(0, x)) * (audio.duration || 200);
  }
  scrub.addEventListener("click", seekFromEvent);

  // end of song
  audio.addEventListener("ended", function () {
    running = false;
    stage.classList.remove("is-live");
    document.body.classList.remove("playing");
    chrome.classList.remove("is-visible");
    endcard.hidden = false;
    requestAnimationFrame(function () { endcard.classList.add("is-visible"); });
  });
  replayBtn.addEventListener("click", function () {
    endcard.classList.remove("is-visible");
    setTimeout(function () { endcard.hidden = true; }, 400);
    stage.classList.add("is-live");
    document.body.classList.add("playing");
    running = true;
    scare = 0; applyScare();
    whyDone = false; whyBox.hidden = true; whyEggNext = 0;
    if (hauntEl) { hauntEl.remove(); hauntEl = null; }
    eggLayer.querySelectorAll(".why-egg").forEach(function (el) { el.remove(); });
    for (const k in dragState) delete dragState[k];
    audio.load();                 // reliably rewinds to 0 even where seeking is blocked
    const p = audio.play();
    if (p && p.catch) p.catch(function () {});
    requestAnimationFrame(frame);
  });

  // auto-hiding controls + cursor
  let hideT;
  function poke() {
    document.body.classList.remove("is-idle");
    chrome.classList.add("is-visible");
    topbar.classList.add("is-visible");
    clearTimeout(hideT);
    hideT = setTimeout(function () {
      chrome.classList.remove("is-visible");
      topbar.classList.remove("is-visible");
    }, 5000);   // move the mouse → controls come back for 5s (cursor always stays)
  }
  window.addEventListener("pointermove", function () { if (running) poke(); });
  window.addEventListener("touchstart", function () { if (running) poke(); }, { passive: true });

  // fullscreen
  function toggleFullscreen() {
    if (document.fullscreenElement) {
      (document.exitFullscreen || document.webkitExitFullscreen || function () {}).call(document);
    } else {
      const el = document.documentElement;
      (el.requestFullscreen || el.webkitRequestFullscreen || function () {}).call(el);
    }
  }
  fsBtn.addEventListener("click", function (e) { e.stopPropagation(); toggleFullscreen(); });
  document.addEventListener("fullscreenchange", function () {
    fsBtn.classList.toggle("is-on", !!document.fullscreenElement);
  });

  // small transient readout (used by the sync nudge)
  let toastT;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("is-on");
    clearTimeout(toastT);
    toastT = setTimeout(function () { toastEl.classList.remove("is-on"); }, 1100);
  }

  // keyboard: space = play/advance-flow, [ ] = nudge audio sync
  window.addEventListener("keydown", function (e) {
    const isSpace = e.code === "Space" || e.key === " ";
    const isEnter = e.key === "Enter";
    if (isSpace || isEnter) {
      if (!landing.classList.contains("is-gone")) { e.preventDefault(); start(); }
      else if (!endcard.hidden) { e.preventDefault(); replayBtn.click(); }          // replay
      else if (running && isSpace) { e.preventDefault(); if (audio.paused) audio.play(); else audio.pause(); poke(); }
    } else if (e.key === "[" || e.key === "]") {
      syncOffset += (e.key === "]" ? 0.01 : -0.01);
      localStorage.setItem("iam_sync", syncOffset.toFixed(3));
      toast("audio sync " + (syncOffset >= 0 ? "+" : "") + syncOffset.toFixed(2) + "s");
    } else if (e.key.toLowerCase() === "f") {
      toggleFullscreen();
    }
  });

  /* ---------- mouse interaction: inversion disc (spotlight) + drag-to-dissolve ---------- */
  function moveDisc() {
    invDisc.style.left = mouse.x + "px";
    invDisc.style.top  = mouse.y + "px";
    spotAt(mouse.x, mouse.y);                 // reveal any hidden easter-egg text near the cursor
  }
  window.addEventListener("pointermove", function (e) {
    mouse.x = e.clientX; mouse.y = e.clientY; mouse.inside = true;
    if (running) { moveDisc(); invDisc.classList.add("is-on"); dodge(e.clientX, e.clientY); }
    if (dragIdx != null) {
      dragState[dragIdx] = { dx: dragBase.x + (e.clientX - dragFrom.x), dy: dragBase.y + (e.clientY - dragFrom.y) };
    }
  });
  window.addEventListener("mouseout", function (e) {
    if (!e.relatedTarget) { mouse.inside = false; invDisc.classList.remove("is-on"); }
  });
  /* ---------- easter eggs revealed by the spotlight ---------- */
  function initEggs() {
    EGGS.forEach(function (egg) {
      const el = document.createElement("div");
      if (egg.cover) {
        el.className = "egg egg-cover";
        el.innerHTML = '<div class="cover-art"><span class="cover-am">I AM</span><span class="cover-by">clay and kelsy</span></div>';
      } else {
        el.className = "egg " + (ROLE_CLASS[egg.role] || "r-serifIt");
        el.textContent = egg.text;
        el.style.left = (egg.x != null ? egg.x : 50) + "%";
        el.style.top  = (egg.y != null ? egg.y : 50) + "%";
        el.style.fontSize = (egg.size || 3) + "vh";
      }
      el.style.visibility = "hidden";
      egg._el = el;
      eggLayer.appendChild(el);
    });
  }
  function updateEggs(t) {
    for (let i = 0; i < EGGS.length; i++) {
      const eg = EGGS[i];
      if (eg._el) eg._el.style.visibility = (t >= eg.s && t < eg.e) ? "visible" : "hidden";
    }
  }
  function spotAt(x, y) {
    eggLayer.style.setProperty("--sx", x + "px");
    eggLayer.style.setProperty("--sy", y + "px");
  }

  /* ---------- escalating red / scary level (lyric buttons) ---------- */
  function applyScare() {
    const s = Math.min(1, scare / 6);
    stage.style.setProperty("--scare", s.toFixed(3));
    const jit = (Math.random() - 0.5) * s * 3;
    cueLayer.style.transform = "scale(" + (1 + s * 0.18).toFixed(3) + ") skewX(" + jit.toFixed(2) + "deg)";
  }
  function bumpScare() { scare = Math.min(8, scare + 1.2); applyScare(); }

  /* ---------- grab a word and drag it; fling it far and it dissolves ---------- */
  stage.addEventListener("pointerdown", function (e) {
    if (!running) return;
    // click a hidden "(why?)" you found with the spotlight → it disappears
    const wes = eggLayer.querySelectorAll(".why-egg");
    for (let i = 0; i < wes.length; i++) {
      const r = wes[i].getBoundingClientRect();
      if (e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom) {
        wes[i].remove(); e.preventDefault(); return;
      }
    }
    if (!e.target.closest) return;
    const cel = e.target.closest(".cue");
    if (!cel || cel.dataset.idx == null) return;
    dragIdx = +cel.dataset.idx;
    dragFrom = { x: e.clientX, y: e.clientY };
    const cur = dragState[dragIdx];
    dragBase = cur ? { x: cur.dx, y: cur.dy } : { x: 0, y: 0 };
    document.body.classList.add("is-dragging");
    e.preventDefault();
  });
  window.addEventListener("pointerup", function () {
    if (dragIdx == null) return;
    const ds = dragState[dragIdx], el = mounted.get(dragIdx);
    if (ds && Math.hypot(ds.dx, ds.dy) > KILL_DIST) {
      if (el) { el.dataset.dead = "1"; el.style.pointerEvents = "none"; }  // flung far → dissolve, cursor blank
    }
    // otherwise keep dragState → the word STAYS exactly where you dropped it (no snap-back)
    dragIdx = null;
    document.body.classList.remove("is-dragging");
  });
  // touch drag interrupted by a system gesture → don't leave a word stuck to the finger
  window.addEventListener("pointercancel", function () {
    dragIdx = null;
    document.body.classList.remove("is-dragging");
  });

  whySubmit.addEventListener("click", submitWhy);
  whyInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") { e.preventDefault(); submitWhy(); }
    e.stopPropagation();                         // type freely (spacebar won't pause)
  });
  whyInput.addEventListener("pointerdown", function (e) { e.stopPropagation(); });

  initEggs();

  // expose a tiny hook for automated verification / debugging
  window.__iam = {
    seek: function (t) { audio.currentTime = t; },
    startAt: function (t) { if (!running) start(); audio.currentTime = t || 0; },
    setReduce: function (v) { reduceFlash = !!v; },
    setOffset: function (v) { syncOffset = +v; localStorage.setItem("iam_sync", syncOffset.toFixed(3)); },
    get offset() { return syncOffset; },
    // debug clock — render an exact timestamp without needing audio to seek
    // (renders synchronously so it works even where rAF is throttled)
    freeze: function (t) {
      clockOverride = t;
      landing.classList.add("is-gone"); landing.hidden = true;
      endcard.hidden = true;
      stage.classList.add("is-live"); stage.setAttribute("aria-hidden", "false");
      running = true;
      renderAt(t);
      requestAnimationFrame(frame);
    },
    unfreeze: function () { clockOverride = null; },
    get time() { return clockOverride != null ? clockOverride : audio.currentTime; },
    get mounted() { return Array.from(mounted.values()).map((e) => e.textContent); },
  };
})();
