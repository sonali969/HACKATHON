/**
 * 🤡 WHY DID WE BUILD THIS? - MAIN JAVASCRIPT ENGINE 🤡
 * Intentionally terrible, chaotic, unhelpful, and hilarious.
 * 100% technically safe: No malware, no browser locks, no infinite loops.
 * Built with 2% skill, 98% confidence at 3 AM.
 */

// ============================================================================
// 1. WEB AUDIO API SYNTHESIZER (No external audio files, Zero Autoplay)
// ============================================================================
let audioCtx = null;
let sfxEnabled = true;

function getAudioContext() {
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

const SoundFX = {
  // Cartoon Bouncy Boing
  playBoing() {
    if (!sfxEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(580, now + 0.28);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.3);
  },

  // Clown Horn (Two short beeps)
  playClownHorn() {
    if (!sfxEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    [0, 0.14].forEach((delay) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const start = ctx.currentTime + delay;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(370, start);
      osc.frequency.exponentialRampToValueAtTime(440, start + 0.1);

      gain.gain.setValueAtTime(0.2, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + 0.12);
    });
  },

  // Retro 8-Bit Error Buzzer
  playBuzzer() {
    if (!sfxEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(110, now);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.28);
  },

  // Sad Trombone (4 notes)
  playSadTrombone() {
    if (!sfxEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [293.66, 277.18, 261.63, 246.94];
    const durations = [0.25, 0.25, 0.25, 0.6];
    let startTime = ctx.currentTime;

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, startTime);

      if (i === 3) {
        osc.frequency.linearRampToValueAtTime(freq - 15, startTime + 0.6);
      }

      gain.gain.setValueAtTime(0.15, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + durations[i]);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + durations[i]);
      startTime += durations[i] * 0.85;
    });
  },

  // Happy Win Fanfare
  playFanfare() {
    if (!sfxEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [261.63, 329.63, 392.00, 523.25];
    let startTime = ctx.currentTime;

    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const dur = i === 3 ? 0.4 : 0.12;

      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + dur);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + dur);
      startTime += 0.1;
    });
  },

  // Coffee Gulp / Pour
  playGulp() {
    if (!sfxEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(200, now + 0.2);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  },

  // Computer Beep for AI
  playBeep() {
    if (!sfxEnabled) return;
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(880, now);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  }
};

// ============================================================================
// 2. TOAST NOTIFICATION SYSTEM
// ============================================================================
function showToast(message, type = 'yellow') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `chaos-toast toast-${type}`;
  toast.innerHTML = `<span>💬</span> <div>${message}</div>`;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.transition = 'opacity 0.3s, transform 0.3s';
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(60px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ============================================================================
// 3. PARTICLE EFFECTS (COFFEE RAIN & CONFETTI)
// ============================================================================
function spawnParticles(emoji = '☕', count = 25) {
  const sky = document.getElementById('particleSky');
  if (!sky) return;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'falling-particle';
    p.textContent = emoji;
    p.style.left = Math.random() * 95 + 'vw';
    p.style.fontSize = Math.floor(Math.random() * 24 + 20) + 'px';
    const duration = (Math.random() * 2 + 1.5).toFixed(2);
    p.style.animationDuration = duration + 's';
    p.style.animationDelay = (Math.random() * 0.4).toFixed(2) + 's';

    sky.appendChild(p);

    setTimeout(() => {
      p.remove();
    }, 4000);
  }
}

// Shake screen effect
function shakeScreen(duration = 500) {
  document.body.classList.add('screen-shaking');
  setTimeout(() => {
    document.body.classList.remove('screen-shaking');
  }, duration);
}

// ============================================================================
// 4. NAVBAR INTERACTION
// ============================================================================
function initNavbar() {
  const sfxBtn = document.getElementById('sfxToggle');
  const sfxIcon = document.getElementById('sfxIcon');
  const sfxText = document.getElementById('sfxText');

  if (sfxBtn) {
    sfxBtn.addEventListener('click', () => {
      sfxEnabled = !sfxEnabled;
      sfxIcon.textContent = sfxEnabled ? '🔊' : '🔇';
      sfxText.textContent = sfxEnabled ? 'SFX: ON' : 'SFX: OFF';
      if (sfxEnabled) {
        SoundFX.playBoing();
        showToast('🔊 Audio Effects Enabled! Enjoy the beep boops!', 'lime');
      } else {
        showToast('🔇 Audio Muted. Coward.', 'pink');
      }
    });
  }

  // Navbar "DO NOT CLICK"
  const doNotClickBtn = document.getElementById('navDoNotClick');
  if (doNotClickBtn) {
    doNotClickBtn.addEventListener('click', (e) => {
      e.preventDefault();
      SoundFX.playClownHorn();
      shakeScreen(400);
      showToast('🚨 HEY! We literally wrote "DO NOT CLICK" in all caps! 🤡', 'pink');
    });
  }

  // Navbar "🚨 CLICK ME 🚨"
  const navClickMeBtn = document.getElementById('navClickMeBtn');
  if (navClickMeBtn) {
    navClickMeBtn.addEventListener('click', () => {
      SoundFX.playFanfare();
      spawnParticles('🚨', 20);
      document.body.classList.add('strobe-mode');
      showToast('🚨 NAV ALARM ACTIVATED! You cannot un-click this! 🚨', 'cyan');
      setTimeout(() => {
        document.body.classList.remove('strobe-mode');
      }, 2500);
    });
  }

  // Logo Click
  const logoBox = document.getElementById('logoBox');
  if (logoBox) {
    logoBox.addEventListener('click', () => {
      SoundFX.playBoing();
      showToast('🤡 Clown approved. Honk honk!', 'yellow');
    });
  }
}

// ============================================================================
// 5. HERO SECTION INTERACTION
// ============================================================================
function initHero() {
  const btn1 = document.getElementById('heroBtn1'); // "CLICK ME"
  const btn2 = document.getElementById('heroBtn2'); // "NO, CLICK ME"
  const btn3 = document.getElementById('heroBtn3'); // "WHY ARE YOU STILL HERE?"
  const feedback = document.getElementById('heroButtonFeedback');

  // Background color combinations for Button 1
  const uglyPalettes = [
    '#ffff00', // yellow
    '#ff007f', // hot pink
    '#39ff14', // neon lime
    '#00ffff', // cyan
    '#ff5500', // orange
    '#e0aaff', // weird lavender
    '#d8f3dc'  // mint vomit
  ];
  let paletteIdx = 0;
  let clickCount1 = 0;

  if (btn1) {
    btn1.addEventListener('click', () => {
      clickCount1++;
      paletteIdx = (paletteIdx + 1) % uglyPalettes.length;
      document.body.style.backgroundColor = uglyPalettes[paletteIdx];
      SoundFX.playBoing();
      feedback.textContent = `💥 You clicked Button 1! Chaos color changed! (Total clicks: ${clickCount1})`;
      showToast(`🎨 Background set to an even worse color!`, 'lime');
    });
  }

  // Button 2: Runaway dodging button
  let dodgeCount = 0;
  if (btn2) {
    const dodge = () => {
      dodgeCount++;
      const randomX = (Math.random() * 200 - 100).toFixed(0);
      const randomY = (Math.random() * 120 - 60).toFixed(0);
      const rot = (Math.random() * 30 - 15).toFixed(0);
      btn2.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${rot}deg)`;
      feedback.textContent = `🏃‍♂️ Button 2 dodged your cursor! Dodges: ${dodgeCount}`;
    };

    btn2.addEventListener('mouseenter', () => {
      if (dodgeCount < 6) {
        dodge();
        SoundFX.playBoing();
      }
    });

    btn2.addEventListener('click', () => {
      SoundFX.playFanfare();
      spawnParticles('🏆', 20);
      feedback.textContent = `🎉 UNBELIEVABLE! You actually caught Button 2 after ${dodgeCount} dodges!`;
      showToast('🏆 Achievement Unlocked: Cat-like Reflexes!', 'yellow');
      btn2.style.transform = 'translate(0, 0) rotate(0deg)';
      dodgeCount = 0;
    });
  }

  // Button 3: "WHY ARE YOU STILL HERE?"
  const existentialQuestions = [
    "Seriously, do you not have an assignment due tomorrow? 😭",
    "Your session was supposed to expire 47 minutes ago.",
    "Did you come here looking for answers? You will only find regret.",
    "Error 200: You are still here and we don't know what to do with you.",
    "Hackathon judges: Please pretend this button was revolutionary AI."
  ];

  if (btn3) {
    btn3.addEventListener('click', () => {
      SoundFX.playSadTrombone();
      const quote = existentialQuestions[Math.floor(Math.random() * existentialQuestions.length)];
      feedback.textContent = `🤨 ${quote}`;
      showToast(quote, 'pink');
    });
  }

  // Jiggle visual illustration button
  const jiggleBtn = document.getElementById('btnJiggleVisual');
  const chaosImg = document.getElementById('heroChaosImg');
  if (jiggleBtn && chaosImg) {
    jiggleBtn.addEventListener('click', () => {
      chaosImg.classList.toggle('jiggling');
      SoundFX.playBoing();
      if (chaosImg.classList.contains('jiggling')) {
        jiggleBtn.textContent = 'Stop Image Vibration 🛑';
        showToast('📳 Maximum hackathon vibration enabled!', 'cyan');
      } else {
        jiggleBtn.textContent = 'Make Image Vibrate 📳';
      }
    });
  }

  // Floating stickers bounce
  document.querySelectorAll('.chaos-sticker').forEach(sticker => {
    sticker.addEventListener('click', () => {
      SoundFX.playBoing();
      sticker.style.transform = `scale(1.3) rotate(${Math.floor(Math.random() * 40 - 20)}deg)`;
      setTimeout(() => {
        sticker.style.transform = '';
      }, 400);
    });
  });
}

// ============================================================================
// 6. SECTION 1: WHAT DOES THIS WEBSITE DO? (3 CARDS)
// ============================================================================
function initWhatSection() {
  // Card 1: AI Check
  const btnAI = document.getElementById('btnCheckAI');
  const outAI = document.getElementById('outCheckAI');
  const aiPulses = [
    "Pulse: 180 BPM (Terrified of deadline)",
    "Status: 99% hallucinating, 1% awake",
    "AI says: 'I think, therefore I crash'",
    "Neural weights: Weightless and confused",
    "Current state: Dreaming of electric sheep"
  ];
  if (btnAI && outAI) {
    btnAI.addEventListener('click', () => {
      SoundFX.playBeep();
      const pick = aiPulses[Math.floor(Math.random() * aiPulses.length)];
      outAI.textContent = `💓 ${pick}`;
    });
  }

  // Card 2: Blockchain Mining
  const btnMine = document.getElementById('btnMineChaos');
  const outMine = document.getElementById('outMineChaos');
  const blockchainMessages = [
    "Hash: 0xDEADBEEF404 • Lost in sofa cushions",
    "Mined: 0.0000001 ChaosCoin (Value: -$4.20)",
    "Gas fee: $14,000,000. Transaction rejected.",
    "Smart Contract: Neither smart nor contractual.",
    "Decentralization achieved: Server unplugged."
  ];
  if (btnMine && outMine) {
    btnMine.addEventListener('click', () => {
      SoundFX.playBuzzer();
      const pick = blockchainMessages[Math.floor(Math.random() * blockchainMessages.length)];
      outMine.textContent = `🪙 ${pick}`;
    });
  }

  // Card 3: Quantum Computing
  const btnQuantum = document.getElementById('btnObserveQuantum');
  const outQuantum = document.getElementById('outObserveQuantum');
  const quantumStates = [
    "State: |0⟩ (Defunct qubit)",
    "State: |1⟩ (Highly suspicious)",
    "State: Schrödinger's Potato 🥔",
    "Entanglement: Entangled with bad decisions",
    "Superposition: Code works AND fails at same time"
  ];
  if (btnQuantum && outQuantum) {
    btnQuantum.addEventListener('click', () => {
      SoundFX.playBoing();
      const pick = quantumStates[Math.floor(Math.random() * quantumStates.length)];
      outQuantum.textContent = `🔬 ${pick}`;
    });
  }
}

// ============================================================================
// 7. SECTION 2: OUR SUPER ADVANCED AI (FAKE AI CHAT BOX)
// ============================================================================
function initAIService() {
  const chatForm = document.getElementById('aiChatForm');
  const userInput = document.getElementById('aiUserInput');
  const chatHistory = document.getElementById('aiChatHistory');
  const btnGenIntel = document.getElementById('btnGenIntelligence');
  const readout = document.getElementById('intelligenceReadout');

  // Spec-required responses
  const aiResponses = [
    "Please try again.",
    "Interesting...",
    "Have you tried turning it off and on?",
    "I am currently thinking. Please wait 47 business days.",
    "Error 404: Intelligence not found.",
    // Additional hilarious answers
    "As an artificial non-intelligence, I recommend taking a nap.",
    "I consulted 50 billion parameters and they all said 'idk lol'.",
    "According to our neural network: 🍕 > 🥗.",
    "Have you tried writing bug-free code instead?",
    "Calculating response... [CPU Fan Screaming in agony]",
    "Beep boop. I am legally not allowed to answer that.",
    "42. The answer is 42. Don't ask what the question was.",
    "I forwarded your query to our head pigeon. Expect a letter in 3 weeks."
  ];

  function appendMessage(sender, text, isAi = false) {
    const msg = document.createElement('div');
    msg.className = `chat-msg ${isAi ? 'msg-ai' : 'msg-user'}`;
    msg.innerHTML = `
      <div class="chat-avatar">${isAi ? '🤖' : '🧑‍💻'}</div>
      <div class="chat-bubble font-comic">
        <strong>${sender}:</strong> ${text}
      </div>
    `;
    chatHistory.appendChild(msg);
    chatHistory.scrollTop = chatHistory.scrollHeight;
  }

  function handleSend(text) {
    const query = text.trim();
    if (!query) return;

    appendMessage('You', query, false);
    SoundFX.playBeep();

    // AI thinking simulation
    setTimeout(() => {
      let reply;
      if (query.toLowerCase() === 'hello') {
        reply = "Hello! Please try again. Or don't. I'm a neural network, not a police officer.";
      } else {
        reply = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      }

      appendMessage('Super Advanced AI', reply, true);
      SoundFX.playBoing();
    }, 450);
  }

  if (chatForm && userInput) {
    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleSend(userInput.value);
      userInput.value = '';
    });
  }

  // Quick Chips
  document.querySelectorAll('.quick-chip').forEach(chip => {
    chip.addEventListener('click', () => {
      const text = chip.getAttribute('data-text');
      if (text) {
        handleSend(text);
      }
    });
  });

  // SPEC REQUIREMENT: "GENERATE INTELLIGENCE 🧠" BUTTON
  const deepThoughts = [
    "Deep Thought: If a bug exists and nobody runs the code, is it still a bug?",
    "Deep Thought: A semicolon a day keeps the compiler away... wait, no it doesn't.",
    "Deep Thought: 99 little bugs in the code, fix 1 bug, 127 little bugs in the code.",
    "Deep Thought: Why optimize code when hardware gets faster every year?",
    "Deep Thought: Artificial Intelligence is no match for Natural Stupidity.",
    "Deep Thought: There is no cloud, it's just someone else's broken computer.",
    "Deep Thought: It's not a bug, it's an undocumented surprise mechanic.",
    "Deep Thought: A program that does nothing has a 0% error rate. Perfection."
  ];

  if (btnGenIntel && readout) {
    btnGenIntel.addEventListener('click', () => {
      SoundFX.playBeep();
      const quote = deepThoughts[Math.floor(Math.random() * deepThoughts.length)];
      readout.textContent = quote;
      readout.style.backgroundColor = '#39ff14';
      setTimeout(() => {
        readout.style.backgroundColor = '#ffff00';
      }, 300);
      showToast('🧠 1 Unit of Synthetic Intelligence Generated!', 'lime');
    });
  }
}

// ============================================================================
// 8. SECTION 3: VERY IMPORTANT STATISTICS (ANIMATED COUNTERS)
// ============================================================================
function initStats() {
  const statElements = [
    { id: 'statConfusing', target: 73, suffix: '%' },
    { id: 'statAIModels', target: 12, suffix: '' },
    { id: 'statProblemsSolved', target: 0, suffix: '' },
    { id: 'statCoffee', target: 999, suffix: '' },
    { id: 'statSleep', target: 3, suffix: 'h' },
    { id: 'statBrainCells', target: 0.5, suffix: '', isFloat: true }
  ];

  function animateCounters() {
    statElements.forEach(item => {
      const el = document.getElementById(item.id);
      if (!el) return;

      let current = 0;
      const target = item.target;
      const duration = 1200;
      const steps = 30;
      const stepTime = duration / steps;
      const increment = target / steps;

      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(timer);
        }
        if (item.isFloat) {
          el.textContent = current.toFixed(1) + item.suffix;
        } else {
          el.textContent = Math.floor(current) + item.suffix;
        }
      }, stepTime);
    });
  }

  // Trigger counters on load and via reroll
  animateCounters();

  const rerollBtn = document.getElementById('btnRerollStats');
  if (rerollBtn) {
    rerollBtn.addEventListener('click', () => {
      SoundFX.playBoing();
      // Randomize targets slightly for fun
      const confusingEl = document.getElementById('statConfusing');
      const coffeeEl = document.getElementById('statCoffee');
      const sleepEl = document.getElementById('statSleep');
      const brainEl = document.getElementById('statBrainCells');

      if (confusingEl) confusingEl.textContent = Math.floor(Math.random() * 30 + 70) + '%';
      if (coffeeEl) coffeeEl.textContent = Math.floor(Math.random() * 500 + 800);
      if (sleepEl) sleepEl.textContent = (Math.random() * 2).toFixed(1) + 'h';
      if (brainEl) brainEl.textContent = (Math.random() * 0.4 + 0.1).toFixed(1);

      showToast('📊 Metrics re-fabricated with 100% inaccuracy!', 'yellow');
    });
  }
}

// ============================================================================
// 9. SECTION 4: MEET OUR TEAM INTERACTION
// ============================================================================
function initTeam() {
  const teamCards = [
    { id: 'teamCEO', quote: 'CEO: "I had the idea, which is 99% of the work. Now who is fixing this bug?"' },
    { id: 'teamCTO', quote: 'CTO: "I opened VS Code and customized the theme. My job here is done."' },
    { id: 'teamDesigner', quote: 'Designer: "Needs more purple. If it hurts your eyes, that means it is working."' },
    { id: 'teamDev', quote: 'Developer: "It works on my machine. Therefore, any bugs are a user issue."' },
    { id: 'teamNobody', quote: 'Nobody (PM): "*silence... a tumbleweed rolls by in the empty meeting room*"' }
  ];

  teamCards.forEach(member => {
    const card = document.getElementById(member.id);
    if (card) {
      card.addEventListener('click', () => {
        SoundFX.playBoing();
        showToast(member.quote, 'lime');
      });
    }
  });
}

// ============================================================================
// 10. SECTION 5: OUR FEATURES (UNNECESSARY INNOVATIONS)
// ============================================================================
function initFeatures() {
  // Feature 1: AI That Says Hello
  const btnHello = document.getElementById('featBtnHello');
  const statusHello = document.getElementById('featHelloStatus');
  if (btnHello && statusHello) {
    btnHello.addEventListener('click', () => {
      SoundFX.playFanfare();
      statusHello.textContent = 'AI: "HELLO! 👋 That is literally all I do."';
      showToast('🤖 AI: "Hello! That concludes my entire feature set."', 'cyan');
    });
  }

  // Feature 2: Button That Does Nothing
  const btnNothing = document.getElementById('featBtnNothing');
  const countNothing = document.getElementById('featNothingCount');
  let nothingClicks = 0;
  if (btnNothing && countNothing) {
    btnNothing.addEventListener('click', () => {
      nothingClicks++;
      SoundFX.playBoing();
      countNothing.textContent = `Times you achieved nothing: ${nothingClicks}`;
      if (nothingClicks === 5) {
        showToast('🎖️ Milestone: You have accomplished nothing 5 times!', 'yellow');
      }
    });
  }

  // Feature 3: Dark Mode That Is Already Dark
  const btnDark = document.getElementById('featBtnDarkMode');
  const statusDark = document.getElementById('featDarkStatus');
  if (btnDark && statusDark) {
    btnDark.addEventListener('click', () => {
      document.body.classList.toggle('super-dark-mode');
      const isDark = document.body.classList.contains('super-dark-mode');
      SoundFX.playBoing();
      statusDark.textContent = isDark ? 'Current darkness: 999% Pitch Black' : 'Current darkness: Normal Clashing Yellow';
      showToast(isDark ? '🕶️ Dark mode activated. Now with extra neon pain!' : '☀️ Returned to blinding yellow mode!', 'pink');
    });
  }

  // Feature 4: Very Advanced Calculator
  const calcScreen = document.getElementById('calcScreen');
  const calcEqual = document.getElementById('calcEqualBtn');
  const calcNote = document.getElementById('calcResultNote');
  let calcExpr = '';

  document.querySelectorAll('.calc-btn').forEach(btn => {
    if (btn.id === 'calcEqualBtn') return;
    btn.addEventListener('click', () => {
      SoundFX.playBeep();
      calcExpr += btn.getAttribute('data-val');
      if (calcScreen) calcScreen.textContent = calcExpr;
    });
  });

  const absurdAnswers = [
    "73.00000001 (ish)",
    "42 (The Universal Answer)",
    "NaN (Not a Number, Not your fault)",
    "Potato 🥔",
    "Why do math at 3 AM?",
    "Result: 1,337,420",
    "Syntax Error: Calculator needs coffee"
  ];

  if (calcEqual && calcScreen && calcNote) {
    calcEqual.addEventListener('click', () => {
      SoundFX.playBuzzer();
      const ans = absurdAnswers[Math.floor(Math.random() * absurdAnswers.length)];
      calcScreen.textContent = `Ans: ${ans}`;
      calcNote.textContent = `Calculated with 0% precision: ${ans}`;
      calcExpr = '';
    });
  }

  // Feature 5: Random Number Generator
  const btnRNG = document.getElementById('featBtnRNG');
  const rngDisplay = document.getElementById('featRNGDisplay');
  const funnyNumbers = [
    "4 (Fair roll of dice)",
    "73 (The Sheldon Prime)",
    "420.69",
    "9,999,999",
    "√-1 (Imaginary number)",
    "3.14159265... and so on",
    "-0 (Negative zero)"
  ];
  if (btnRNG && rngDisplay) {
    btnRNG.addEventListener('click', () => {
      SoundFX.playBoing();
      const pick = funnyNumbers[Math.floor(Math.random() * funnyNumbers.length)];
      rngDisplay.textContent = `Number: ${pick}`;
    });
  }

  // Feature 6: Emotionally Supportive Loading Screen
  const btnLoading = document.getElementById('featBtnLoadingScreen');
  const loadingModal = document.getElementById('loadingModal');
  const supportFill = document.getElementById('supportFill');
  const supportText = document.getElementById('supportProgressText');
  const supportQuote = document.getElementById('supportQuote');
  const btnCloseSupport = document.getElementById('btnCloseSupportModal');

  const supportiveQuotes = [
    '"Your code may not compile, but you are a wonderful human being."',
    '"Even if the website is terrible, your confidence is inspiring."',
    '"No Git conflict is too large for a hug (or git push --force)."',
    '"3 AM is a perfectly reasonable time to reinvent the wheel."'
  ];

  if (btnLoading && loadingModal) {
    btnLoading.addEventListener('click', () => {
      loadingModal.style.display = 'flex';
      SoundFX.playBoing();
      let progress = 10;
      if (supportFill) supportFill.style.width = '10%';
      if (supportText) supportText.textContent = 'Calibrating empathy engines... 10%';
      if (supportQuote) supportQuote.textContent = supportiveQuotes[Math.floor(Math.random() * supportiveQuotes.length)];

      const interval = setInterval(() => {
        progress += 25;
        if (progress > 100) progress = 100;
        if (supportFill) supportFill.style.width = progress + '%';
        if (supportText) supportText.textContent = `Transmitting validation... ${progress}%`;
        if (progress >= 100) {
          clearInterval(interval);
          if (supportText) supportText.textContent = 'Support 100% Loaded! You are doing great.';
          SoundFX.playFanfare();
        }
      }, 400);
    });
  }

  if (btnCloseSupport && loadingModal) {
    btnCloseSupport.addEventListener('click', () => {
      loadingModal.style.display = 'none';
      SoundFX.playBoing();
    });
  }

  // Feature 7: Emergency Coffee Button ☕
  const btnCoffee = document.getElementById('featBtnCoffee');
  const statusCoffee = document.getElementById('featCoffeeStatus');
  let coffeeLevel = 100;
  if (btnCoffee && statusCoffee) {
    btnCoffee.addEventListener('click', () => {
      SoundFX.playGulp();
      shakeScreen(400);
      spawnParticles('☕', 30);
      coffeeLevel += 999;
      statusCoffee.textContent = `Caffeine level: ${coffeeLevel}% (Overloaded!)`;
      showToast('☕ COFFEE SUMMONED! Heart rate increasing!', 'yellow');
    });
  }

  // Feature 8: Definitely Real AI
  const btnRealAI = document.getElementById('featBtnRealAI');
  const statusOracle = document.getElementById('featOracleStatus');
  const oraclePredictions = [
    "Oracle: Within 10 minutes, you will click another useless button.",
    "Oracle: The hackathon judges will be bewildered and amused.",
    "Oracle: Your next bug will be solved by adding a missing curly bracket.",
    "Oracle: You are destined for great things. This website is not one of them."
  ];
  if (btnRealAI && statusOracle) {
    btnRealAI.addEventListener('click', () => {
      SoundFX.playFanfare();
      const quote = oraclePredictions[Math.floor(Math.random() * oraclePredictions.length)];
      statusOracle.textContent = quote;
      showToast('🔮 Synthetic Oracle has spoken!', 'cyan');
    });
  }
}

// ============================================================================
// 11. EMERGENCY BUTTON: "🚨 DO NOT PRESS 🚨" & DRAMATIC MODAL
// ============================================================================
function initEmergencyButton() {
  const giantBtn = document.getElementById('giantDoNotPressBtn');
  const modal = document.getElementById('emergencyModal');
  const btnLearnNothing = document.getElementById('btnModalLearnNothing');
  const btnDismiss = document.getElementById('btnModalDismiss');
  const tinyBtn = document.getElementById('tinyButton');
  const modalTitle = document.getElementById('modalTitleText');
  const modalBody = document.getElementById('modalBodyText');
  const modalEmoji = document.getElementById('modalEmoji');
  const modalExtra = document.getElementById('modalExtraText');

  let pressCount = 0;

  if (giantBtn && modal) {
    giantBtn.addEventListener('click', () => {
      pressCount++;
      SoundFX.playBuzzer();
      shakeScreen(600);
      modal.style.display = 'flex';
      
      // Reset modal text to spec default
      if (modalTitle) modalTitle.textContent = "YOU PRESSED IT.";
      if (modalBody) modalBody.textContent = "Congratulations. Nothing happened.";
      if (modalEmoji) modalEmoji.textContent = "🤡";
      if (modalExtra) modalExtra.textContent = "The universe remains completely unchanged. You have achieved precisely 0.000 Joules of digital progress.";
    });
  }

  // SPEC REQUIREMENT: "Press Again Because You Clearly Learned Nothing"
  if (btnLearnNothing) {
    btnLearnNothing.addEventListener('click', () => {
      pressCount++;
      SoundFX.playClownHorn();
      shakeScreen(500);

      if (pressCount === 2) {
        if (modalTitle) modalTitle.textContent = "YOU PRESSED IT AGAIN.";
        if (modalBody) modalBody.textContent = "Still nothing happened. Did you expect a miracle?";
        if (modalEmoji) modalEmoji.textContent = "💀";
        if (modalExtra) modalExtra.textContent = "We admire your dedication to absolute futility.";
      } else if (pressCount === 3) {
        if (modalTitle) modalTitle.textContent = "A THIRD TIME?!";
        if (modalBody) modalBody.textContent = "Now the screen is officially disappointed in you.";
        if (modalEmoji) modalEmoji.textContent = "😭";
        if (modalExtra) modalExtra.textContent = "Achievement Unlocked: Master of Wasted Time 🏆";
        spawnParticles('🎉', 25);
      } else {
        if (modalTitle) modalTitle.textContent = `PRESS #${pressCount} COMPLETED.`;
        if (modalBody) modalBody.textContent = "We can do this all day. Can your mouse?";
        if (modalEmoji) modalEmoji.textContent = "🔥";
      }
    });
  }

  if (btnDismiss && modal) {
    btnDismiss.addEventListener('click', () => {
      modal.style.display = 'none';
      SoundFX.playBoing();
      showToast('👋 Modal dismissed. Wisdom was not acquired.', 'yellow');
    });
  }

  // Tiny button right next to it
  if (tinyBtn) {
    tinyBtn.addEventListener('click', () => {
      SoundFX.playBoing();
      showToast('🔍 Wow, your aim is legendary! You clicked the tiny 10px button!', 'lime');
    });
  }
}

// ============================================================================
// 12. INITIALIZATION ON DOM READY
// ============================================================================
document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initHero();
  initWhatSection();
  initAIService();
  initStats();
  initTeam();
  initFeatures();
  initEmergencyButton();

  // Welcome Toast
  setTimeout(() => {
    showToast('🤡 WELCOME TO THE WORST WEBSITE ON EARTH! Enjoy your stay.', 'yellow');
  }, 600);
});
