'use strict';
/* ---------- data ---------- */
const DAILY = 5;
const CPS = [
  {date:'2026-10-04', cf:'1st rated contest done \u00b7 ~55 solved', cfN:null, solvedN:55, z:'25', zN:25, p:'Blitzstein ch. 1', m:'Python OOP primer, 3B1B linear algebra, ask placement cell about quant-drive eligibility'},
  {date:'2026-10-18', cf:'900 \u00b7 ~110 solved', cfN:900, solvedN:110, z:'30', zN:30, p:'Blitzstein ch. 2', m:'3B1B calculus, NumPy linear regression with loss curve'},
  {date:'2026-11-01', cf:'1000 \u00b7 ~165 solved', cfN:1000, solvedN:165, z:'35', zN:35, p:'Blitzstein ch. 3', m:'Gradient descent and k-fold CV from scratch'},
  {date:'2026-11-15', cf:'1100 \u00b7 ~220 solved', cfN:1100, solvedN:220, z:'38', zN:38, p:'Blitzstein ch. 4', m:'ISLR ch. 1-3 (regression)'},
  {date:'2026-11-29', gate:'A', cf:'1200 \u00b7 ~275 solved', cfN:1200, solvedN:275, z:'40', zN:40, p:'Blitzstein ch. 5, plus 50 problems done', m:'ISLR ch. 4-5, logistic regression from scratch'},
  {date:'2026-12-27', cf:'1280', cfN:1280, z:'45', zN:45, p:'Blitzstein ch. 6-7, Heard on the Street ~20 puzzles', m:'ISLR ch. 6, derive ridge, trees and random forest'},
  {date:'2027-01-24', cf:'1340, on C++', cfN:1340, z:'48', zN:48, p:'Blitzstein ch. 8-9, Heard on the Street ~45 puzzles', m:'XGBoost/LightGBM, leakage demo write-up, BRAIN account'},
  {date:'2027-02-28', gate:'B', cf:'1400', cfN:1400, z:'50', zN:50, p:'Blitzstein ch. 10-11, Heard on the Street ~75 puzzles', m:'PyTorch NN, derive ridge unaided'},
  {date:'2027-03-28', cf:'1480', cfN:1480, z:'53', zN:53, p:'Green Book ~30 problems', m:'Parquet ingestion, walk-forward splitter, leakage tests passing'},
  {date:'2027-04-25', cf:'1550', cfN:1550, z:'55', zN:55, p:'Green Book ~60 problems', m:'Signal model and backtest with costs, first BRAIN alphas submitted'},
  {date:'2027-05-31', gate:'C', cf:'1600', cfN:1600, z:'58-60', zN:58, p:'Green Book ~90 problems', m:'Latency (p50/p99) and memory profile, repo public with write-up'},
  {date:'2027-06-28', cf:'1650', cfN:1650, z:'60', zN:60, p:'5 mock interviews', m:'Project deep-dive rehearsed, C++ STL fluent'},
  {date:'2027-07-31', gate:'D', cf:'1700', cfN:1700, z:'60+', zN:60, p:'10 mocks, unseen puzzles solved cold', m:'Resume final, referral list and application tracker ready'}
];
const METRICS = [['cf','CF','cf'],['z','Zetamac','z'],['p','Probability','p'],['m','ML / build','m']];
const SETUP = [
  'Create a Codeforces account',
  'Solve your first 5 easy problems',
  'Do a 20-30 min Python OOP primer (class, __init__, self)',
  'Ask your placement cell if quant/HFT drives are open to ECE students'
];
const PHASES = [
  {id:'A', name:'Foundations', when:'Sep 21 \u2013 Nov 29', tags:[['cf','CF'],['p','Probability'],['m','ML']],
   items:['CF: 5 a day. Sorting, hash maps, binary search, greedy, prefix sums.',
          'Blitzstein & Hwang ch. 1-5. Your Probability & Random Processes course overlaps, so don\u2019t study it twice.',
          'Zetamac 10 min daily.',
          '3B1B linear algebra and calculus, then linear regression from scratch in NumPy.'],
   gate:'Gate A: CF 1200 and Zetamac 40+'},
  {id:'B', name:'Core skills', when:'Nov 30 \u2013 Feb 28', tags:[['cf','CF'],['p','Probability'],['m','ML']],
   items:['CF target 1400. Add DP, graphs (BFS/DFS/Dijkstra), basic number theory. Switch to C++ in January.',
          'Blitzstein ch. 6-11 (joint distributions, conditional expectation, LLN/CLT, Markov chains) and Heard on the Street at 1 puzzle a day.',
          'ISLR, then selected ESL chapters. Derive OLS and ridge by hand; build logistic regression and a small NN.',
          'Time-series leakage and lookahead bias from day one. Start BRAIN exploration.',
          'Exam weeks: floor only (2 problems plus 20 min of probability).'],
   gate:'Gate B: CF 1400, Zetamac 50+, derive ridge unaided'},
  {id:'C', name:'Flagship build', when:'Mar 1 \u2013 May 31', tags:[['m','Build'],['cf','CF'],['p','Probability']],
   items:['Real market data as partitioned Parquet, walk-forward and purged/embargoed CV (Lopez de Prado, AFML), transaction costs modeled.',
          'Tests that fail on leakage or lookahead. Report p50/p99 inference latency and a memory profile.',
          'CF target 1600. Submit real BRAIN alphas.',
          'Green Book puzzles; Zetamac 55-60.'],
   gate:'Gate C: reproducible repo, honest results, CF 1600'},
  {id:'D', name:'Summer all-in', when:'Jun 1 \u2013 Jul 31', tags:[['p','Interview'],['cf','CF']],
   items:['CF toward 1700.',
          'Timed mocks: probability, mental math, market-making games like Figgie. C++ fluency.',
          'A project deep-dive you can defend unscripted.',
          'Resume, referral outreach, application tracking.'],
   gate:'Gate D: unseen probability puzzles solved cold, every backtest split explained'},
  {id:'E', name:'Applications', when:'Aug 2027 onward', tags:[['p','Apply']],
   items:['Verify each firm\u2019s actual dates. Apply early.',
          'Keep contests going. Treat rejections as feedback for the 2028 attempt.',
          'Long-term ceiling: Candidate Master (1900+) is a 2028 target, not a 2027 one.'],
   gate:null}
];
const BOOKS = [
  'Blitzstein & Hwang, Introduction to Probability',
  'Crack, Heard on the Street',
  'Zhou, A Practical Guide to Quantitative Finance Interviews (the Green Book)',
  'James et al., ISLR, then Hastie et al., ESL',
  'Lopez de Prado, Advances in Financial Machine Learning',
  'Kleppmann, Designing Data-Intensive Applications'
];
const MON = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const MONL = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const WDL = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const SPARK = '<svg class="spark" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 1.5c.9 6.6 3.9 9.6 10.5 10.5-6.6.9-9.6 3.9-10.5 10.5C11.1 16.5 8.1 13.5 1.5 12 8.1 11.1 11.1 8.1 12 1.5z" fill="currentColor"/></svg>';
const ICONS = {
  home:'<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>',
  log:'<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 12l3 3 5-6"/>',
  cps:'<path d="M5 21V4"/><path d="M5 4h11l-2 4 2 4H5"/>',
  cal:'<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M3 10h18M8 3v4M16 3v4"/>',
  road:'<circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h6a3 3 0 000-6h-4a3 3 0 010-6h6"/>'
};
const NAV = [['home','Home'],['log','Log'],['cps','Checks'],['cal','Calendar'],['road','Roadmap']];
const ICON_SUN = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
const ICON_MOON = '<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1111.2 3a7 7 0 009.8 9.8z"/></svg>';
const TITLES = {home:'Home', log:'Daily log', cps:'Checkpoints', cal:'Calendar', road:'Roadmap'};

/* ---------- date helpers (local time, not UTC) ---------- */
const pad = n => String(n).padStart(2,'0');
const ymd = d => d.getFullYear() + '-' + pad(d.getMonth()+1) + '-' + pad(d.getDate());
const todayStr = () => ymd(new Date());
const parseD = s => { const p = s.split('-').map(Number); return new Date(p[0], p[1]-1, p[2], 12); };
const dayDiff = (a,b) => Math.round((parseD(b) - parseD(a)) / 864e5);
const fmtShort = s => { const d = parseD(s); return MON[d.getMonth()] + ' ' + d.getDate(); };
const fmtLong = s => { const d = parseD(s); return WDL[d.getDay()] + ', ' + MONL[d.getMonth()] + ' ' + d.getDate(); };
const rel = n => n === 0 ? 'today' : n > 0 ? 'in ' + n + (n === 1 ? ' day' : ' days') : (-n) + (n === -1 ? ' day' : ' days') + ' ago';

/* ---------- state ---------- */
function normalize(s){
  s = s || {};
  const st = s.stats || {};
  return {
    tasks: s.tasks || {},
    checks: s.checks || {},
    ts: s.ts || 0,
    floor: {total: (s.floor && s.floor.total) || 0},
    log: s.log || {},
    stats: {cf: st.cf != null ? st.cf : null, z: st.z != null ? st.z : null, at: st.at || null}
  };
}
const INITIAL = {tasks:{'p0-0':true,'p0-3':true}};
function loadLocal(){
  try { const s = localStorage.getItem('hft_state'); if (s) return normalize(JSON.parse(s)); } catch (e) {}
  return normalize(INITIAL);
}
let state = loadLocal();

let ui = {page:'home', calY:2026, calM:8, sel:null, y:0};
try {
  const u = JSON.parse(sessionStorage.getItem('hft_ui') || 'null');
  if (u && u.page) ui = Object.assign(ui, u);
} catch (e) {}
function getTheme(){ try { return localStorage.getItem('hft_theme') === 'dark' ? 'dark' : 'light'; } catch (e) { return 'light'; } }
function applyTheme(){ document.documentElement.setAttribute('data-theme', getTheme()); }
function saveUi(){ try { sessionStorage.setItem('hft_ui', JSON.stringify(ui)); } catch (e) {} }

function initCal(){
  const t = todayStr();
  const min = '2026-09-01', max = '2027-08-31';
  if (!ui.sel) ui.sel = (t >= min && t <= max) ? t : CPS[0].date;
  if (!ui.calInit){
    const d = parseD(ui.sel);
    ui.calY = d.getFullYear(); ui.calM = d.getMonth(); ui.calInit = true;
  }
}

/* ---------- derived ---------- */
function streakOf(){
  const d = new Date(); d.setHours(12,0,0,0);
  if (!(state.log[ymd(d)] > 0)) d.setDate(d.getDate() - 1);
  let s = 0;
  while (state.log[ymd(d)] > 0){ s++; d.setDate(d.getDate() - 1); }
  return s;
}
function nextIdx(){
  const t = todayStr();
  for (let i = 0; i < CPS.length; i++) if (CPS[i].date >= t) return i;
  return CPS.length - 1;
}
function nextGateIdx(){
  const t = todayStr();
  for (let i = 0; i < CPS.length; i++) if (CPS[i].gate && CPS[i].date >= t) return i;
  return -1;
}
function cpTicks(i){ return METRICS.filter(m => state.checks['c' + i + '-' + m[0]]).length; }
function cpStatus(i){
  const t = cpTicks(i);
  if (t === 4) return 'G';
  if (todayStr() > CPS[i].date) return (4 - t) >= 3 ? 'R' : 'A';
  return null;
}
function pivotFlags(){
  const f = [], t = todayStr(), cf = state.stats.cf;
  [['2026-11-29',1200,'A'],['2027-02-28',1400,'B']].forEach(g => {
    if (t > g[0] && cf != null && cf < g[1]) f.push('Gate ' + g[2] + ' has passed and your CF rating is ' + cf + ' (needed ' + g[1] + ').');
  });
  let prevA = null;
  const reds = [];
  CPS.forEach((c,i) => {
    const s = cpStatus(i);
    if (s === 'R') reds.push(fmtShort(c.date));
    if (s === 'A' && prevA !== null) f.push('Two amber checkpoints in a row (' + fmtShort(CPS[prevA].date) + ' and ' + fmtShort(c.date) + ').');
    prevA = s === 'A' ? i : null;
  });
  if (reds.length) f.push((reds.length === 1 ? 'Red checkpoint: ' : 'Red checkpoints: ') + reds.join(', ') + '.');
  return f;
}

/* ---------- actions ---------- */
function logFloor(n){
  const k = todayStr();
  const before = state.log[k] || 0;
  const after = Math.max(0, before + n);
  const delta = after - before;
  if (after === 0) delete state.log[k]; else state.log[k] = after;
  state.floor.total = Math.max(0, state.floor.total + delta);
}

/* ---------- views ---------- */
function alertHtml(){
  const f = pivotFlags();
  if (!f.length) return '';
  return '<div class="alert"><div class="stripe"></div><div class="body"><b>Pivot review</b><ul>' +
    f.map(x => '<li>' + x + '</li>').join('') +
    '</ul><p class="dim" style="margin:8px 0 0">Keep the prep, shift weight toward probability, ML and the tier below HFT. Re-weighting, not quitting.</p></div></div>';
}
function metricRow(i, m){
  const key = 'c' + i + '-' + m[0];
  const on = !!state.checks[key];
  return '<label class="mrow"><input type="checkbox" class="chk" data-check="' + key + '"' + (on ? ' checked' : '') + '>' +
    '<span class="pill ' + m[2] + '">' + m[1] + '</span><span class="mtxt' + (on ? ' done' : '') + '">' + CPS[i][m[0]] + '</span></label>';
}
function gradeBoxes(i){
  const s = cpStatus(i);
  return '<div class="grade" title="Status">' +
    '<span class="gb r' + (s === 'R' ? ' on' : '') + '">R</span>' +
    '<span class="gb a' + (s === 'A' ? ' on' : '') + '">A</span>' +
    '<span class="gb g' + (s === 'G' ? ' on' : '') + '">G</span></div>';
}
function bar(label, val, target, suffix){
  const pct = Math.max(0, Math.min(100, Math.round(val / target * 100)));
  return '<div class="bl"><span>' + label + '</span><b class="mono">' + val + ' / ' + target + (suffix || '') + '</b></div>' +
    '<div class="bar"><i style="width:' + pct + '%"></i></div>';
}
function floorCard(compact){
  const k = todayStr(), n = state.log[k] || 0, st = streakOf();
  return '<div class="card"><div class="rowb"><h2>Today\u2019s floor</h2><span class="pill lime">' + st + (st === 1 ? ' day' : ' days') + ' streak</span></div>' +
    '<p class="dim">Log something even on your worst day.</p>' +
    bar('Today', n, DAILY, ' problems') +
    '<div class="stats3"><div class="stat"><b>' + n + '</b><span>today</span></div><div class="stat"><b>' + state.floor.total + '</b><span>total solved</span></div><div class="stat"><b>' + st + '</b><span>day streak</span></div></div>' +
    '<div class="btnrow"><button class="btn" data-log="1">+1 solved</button><button class="btn" data-log="5">+5 solved</button><button class="btn ghost" data-log="-1">\u22121</button></div>' +
    (compact ? '' : '<div class="btnrow" style="align-items:center"><input class="inline-in" id="in-total" type="number" min="0" inputmode="numeric" placeholder="Set total solved" style="max-width:190px"><button class="btn ghost" data-set-total="1">Set total</button></div>') +
    '</div>';
}
function pageHome(){
  const t = todayStr(), gi = nextGateIdx(), last = CPS[CPS.length - 1], ni = nextIdx();
  const sub = gi >= 0
    ? 'Next gate <b>' + CPS[gi].gate + '</b> on ' + fmtShort(CPS[gi].date) + ', ' + rel(dayDiff(t, CPS[gi].date)) + '.'
    : 'All four gates are behind you. Application season.';
  const fd = dayDiff(t, last.date);
  const nx = CPS[ni];
  const tapeTxt = '<span>5 a day</span><span>\u2733</span><span>2 rated contests a week</span><span>\u2733</span><span>upsolve within 24h</span><span>\u2733</span><span>5 a day</span><span>\u2733</span><span>2 rated contests a week</span><span>\u2733</span>';
  let h = '<div class="tape-wrap"><div class="tape">' + tapeTxt + '</div></div>';
  h += alertHtml();
  h += '<div class="hero">' + SPARK + '<h2>Sushant\u2019s<br>HFT build</h2><p>' + sub + '</p><p class="dim">Application-ready by ' + fmtShort(last.date) + (fd > 0 ? ' (' + fd + ' days left).' : '.') + '</p></div>';
  h += floorCard(true);
  // next checkpoint
  h += '<div class="card' + (nx.gate ? ' gate-card' : '') + '"><div class="rowb"><h2>Next checkpoint</h2><span class="pill lime">' + fmtShort(nx.date) + '</span></div>' +
    '<p class="dim">' + (nx.gate ? 'Gate ' + nx.gate + ' \u00b7 ' : '') + rel(dayDiff(t, nx.date)) + '</p>' +
    METRICS.map(m => metricRow(ni, m)).join('') +
    '<div class="btnrow"><button class="btn ghost" data-nav="cps">All checkpoints</button></div></div>';
  // progress vs target
  let pg = '';
  if (state.stats.cf != null && nx.cfN) pg += bar('CF rating', state.stats.cf, nx.cfN);
  if (state.stats.z != null && nx.zN) pg += bar('Zetamac best', state.stats.z, nx.zN);
  if (nx.solvedN) pg += bar('Problems solved', state.floor.total, nx.solvedN);
  h += '<div class="card"><h2>Progress to ' + fmtShort(nx.date) + '</h2>' +
    (pg || '<p class="dim">Add your rating and Zetamac score on the Log page to see progress here.</p>') +
    ((state.stats.cf == null || state.stats.z == null) ? '<button class="btn ghost" data-nav="log">Add scores</button>' : '') + '</div>';
  // week-0 setup
  const done = SETUP.filter((_, i) => state.tasks['p0-' + i]).length;
  if (done < SETUP.length){
    h += '<div class="card"><div class="rowb"><h2>Setup</h2><span class="pill plain">' + done + '/' + SETUP.length + '</span></div>' +
      SETUP.map((s, i) => {
        const on = !!state.tasks['p0-' + i];
        return '<label class="mrow"><input type="checkbox" class="chk" data-task="p0-' + i + '"' + (on ? ' checked' : '') + '><span class="mtxt' + (on ? ' done' : '') + '">' + s + '</span></label>';
      }).join('') + '</div>';
  }
  return h;
}
function pageLog(){
  const k = todayStr();
  let h = floorCard(false);
  // last 14 days
  const days = [];
  for (let i = 13; i >= 0; i--){ const d = new Date(); d.setHours(12,0,0,0); d.setDate(d.getDate() - i); days.push(d); }
  const vals = days.map(d => state.log[ymd(d)] || 0);
  const mx = Math.max(DAILY, ...vals);
  h += '<div class="card"><h2>Last 14 days</h2><div class="bars14">' +
    days.map((d, i) => '<div class="cb' + (ymd(d) === k ? ' today' : '') + (vals[i] === 0 ? ' zero' : '') + '" style="height:' + Math.max(4, Math.round(vals[i] / mx * 90)) + 'px" title="' + fmtShort(ymd(d)) + ': ' + vals[i] + '"></div>').join('') +
    '</div><div class="lab14">' + days.map(d => '<span>' + d.getDate() + '</span>').join('') + '</div></div>';
  // stats
  h += '<div class="card"><h2>Your scores</h2><p class="dim">Update after each rated contest or Zetamac session.</p>' +
    '<div class="btnrow" style="margin-top:6px"><div class="field"><label for="in-cf">Codeforces rating</label><input id="in-cf" type="number" min="0" inputmode="numeric" placeholder="' + (state.stats.cf != null ? state.stats.cf : 'e.g. 900') + '"></div>' +
    '<div class="field"><label for="in-z">Zetamac best (120 s)</label><input id="in-z" type="number" min="0" inputmode="numeric" placeholder="' + (state.stats.z != null ? state.stats.z : 'e.g. 30') + '"></div></div>' +
    '<div class="btnrow" style="align-items:center"><button class="btn" data-save-stats="1">Save scores</button>' +
    '<span class="dim" style="font-size:12.5px">' + (state.stats.at ? 'Updated ' + fmtShort(state.stats.at) + ': CF ' + (state.stats.cf != null ? state.stats.cf : '\u2013') + ', Zetamac ' + (state.stats.z != null ? state.stats.z : '\u2013') : 'Nothing saved yet') + '</span></div></div>';
  h += syncCard();
  // rules
  h += '<div class="card hz"><div class="stripe"></div><h2>Rules that move the rating</h2><ul class="rules">' +
    '<li>2 rated contests a week. Upsolve within 24 hours.</li>' +
    '<li>Pick problems at your rating +100 to +200. Volume at a comfortable level plateaus.</li>' +
    '<li>Exam weeks: floor only (2 problems plus 20 min of probability).</li>' +
    '<li>Tick a checkpoint metric only when it is really met.</li></ul></div>';
  return h;
}
function pageCps(){
  const ni = nextIdx();
  let h = '<div class="card"><h2>How a checkpoint is scored</h2>' +
    '<div class="rowb" style="margin-bottom:8px"><div class="grade"><span class="gb g on">G</span><span class="gb a on">A</span><span class="gb r on">R</span></div></div>' +
    '<ul class="rules"><li><b>Green:</b> all 4 metrics on target.</li><li><b>Amber:</b> 1-2 missed. Extend that block a week and cut non-essentials.</li><li><b>Red:</b> 3+ missed. Two ambers in a row also triggers a pivot review.</li></ul></div>';
  h += alertHtml();
  CPS.forEach((c, i) => {
    const t = todayStr();
    h += '<div class="card' + (c.gate ? ' gate-card hz' : '') + '" id="' + (i === ni ? 'cp-next' : 'cp-' + i) + '">' +
      (c.gate ? '<div class="stripe"></div>' : '') +
      '<div class="rowb" style="margin-bottom:4px"><div><span class="pill lime">' + fmtShort(c.date) + '</span> ' +
      (c.gate ? '<span class="pill tape">Gate ' + c.gate + '</span> ' : '') +
      (i === ni ? '<span class="pill plain">Next</span>' : '') + '</div>' + gradeBoxes(i) + '</div>' +
      '<p class="dim" style="margin:0 0 4px;font-size:12.5px">' + rel(dayDiff(t, c.date)) + ' \u00b7 ' + cpTicks(i) + '/4 metrics met</p>' +
      METRICS.map(m => metricRow(i, m)).join('') + '</div>';
  });
  return h;
}
function pageCal(){
  initCal();
  const y = ui.calY, m = ui.calM, t = todayStr();
  const off = (new Date(y, m, 1, 12).getDay() + 6) % 7;
  const dim = new Date(y, m + 1, 0, 12).getDate();
  const cpBy = {}; CPS.forEach((c, i) => cpBy[c.date] = i);
  const idx = y * 12 + m, minI = 2026 * 12 + 8, maxI = 2027 * 12 + 7;
  let cells = '';
  ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'].forEach(d => cells += '<div class="dow">' + d + '</div>');
  for (let i = 0; i < off; i++) cells += '<div class="day blank"></div>';
  for (let d = 1; d <= dim; d++){
    const ds = y + '-' + pad(m + 1) + '-' + pad(d), ci = cpBy[ds];
    const cls = ['day'];
    if (ci != null){ cls.push('cp'); if (CPS[ci].gate) cls.push('gate'); }
    if (ds === t) cls.push('today');
    if (ds === ui.sel) cls.push('sel');
    cells += '<button class="' + cls.join(' ') + '" data-day="' + ds + '" aria-label="' + fmtLong(ds) + '">' + d + (state.log[ds] > 0 ? '<i class="dot"></i>' : '') + '</button>';
  }
  let h = '<div class="calctl"><button class="sq" data-cal="-1" aria-label="Previous month"' + (idx <= minI ? ' disabled' : '') + '>\u2039</button>' +
    '<span class="pill lime">' + MONL[m] + ' ' + y + '</span>' +
    '<button class="sq" data-cal="1" aria-label="Next month"' + (idx >= maxI ? ' disabled' : '') + '>\u203a</button></div>';
  h += '<div class="cal">' + cells + '</div>';
  h += '<div class="legend"><span><i class="c"></i>Checkpoint</span><span><i class="g"></i>Gate</span><span><i class="d"></i>Problems logged</span><span><i class="t"></i>Today</span></div>';
  // detail
  const sel = ui.sel, si = cpBy[sel], n = state.log[sel] || 0;
  h += '<div class="card' + (si != null && CPS[si].gate ? ' gate-card' : '') + '"><div class="rowb"><h2>' + fmtLong(sel) + '</h2>' +
    (si != null ? '<span class="pill ' + (CPS[si].gate ? 'tape' : 'lime') + '">' + (CPS[si].gate ? 'Gate ' + CPS[si].gate : 'Checkpoint') + '</span>' : '') + '</div>' +
    '<p class="dim">' + rel(dayDiff(t, sel)) + ' \u00b7 ' + n + (n === 1 ? ' problem' : ' problems') + ' logged</p>' +
    (si != null ? METRICS.map(mm => metricRow(si, mm)).join('') : '<p>No checkpoint on this date.</p>') + '</div>';
  return h;
}
function pageRoad(){
  let h = '';
  PHASES.forEach(p => {
    h += '<div class="card ph"><div class="rowb"><h2>' + p.id + ' \u00b7 ' + p.name + '</h2><span class="pill lime">' + p.when + '</span></div>' +
      '<div>' + p.tags.map(t => '<span class="pill ' + t[0] + '">' + t[1] + '</span>').join(' ') + '</div>' +
      '<ul>' + p.items.map(x => '<li>' + x + '</li>').join('') + '</ul>' +
      (p.gate ? '<div class="gaterow">' + p.gate + '</div>' : '') + '</div>';
  });
  h += '<div class="card hz"><div class="stripe"></div><h2>Pivot rule</h2><p>Under CF 1200 on Nov 29, or under 1400 on Feb 28: top-HFT odds this cycle are slim. Keep the prep, shift weight to probability and ML and to the tier below HFT. That is re-weighting, not quitting.</p>' +
    '<p class="dim">These are targets, not promises. For ML research roles, CF rating is a filter signal and probability, statistics, mental math and project depth carry equal weight.</p></div>';
  h += '<div class="card"><h2>Reading anchors</h2><ul class="books">' + BOOKS.map(b => '<li>' + b + '</li>').join('') + '</ul></div>';
  return h;
}
function navHtml(){
  return '<nav class="nav" aria-label="Pages"><div class="nav-in">' + NAV.map(n =>
    '<button data-nav="' + n[0] + '"' + (ui.page === n[0] ? ' class="on" aria-current="page"' : '') + '><svg viewBox="0 0 24 24" aria-hidden="true">' + ICONS[n[0]] + '</svg>' + n[1] + '</button>').join('') + '</div></nav>';
}

function render(toTop){
  const y = window.scrollY;
  let body = '';
  if (ui.page === 'home') body = pageHome();
  else if (ui.page === 'log') body = pageLog();
  else if (ui.page === 'cps') body = pageCps();
  else if (ui.page === 'cal') body = pageCal();
  else body = pageRoad();
  document.getElementById('app').innerHTML =
    '<header class="top"><button class="sq" data-theme-toggle="1" aria-label="' + (getTheme() === 'dark' ? 'Switch to light theme' : 'Switch to dark theme') + '">' + (getTheme() === 'dark' ? ICON_SUN : ICON_MOON) + '</button><h1>' + TITLES[ui.page] + '</h1><button id="sync" class="sync ' + syncCls + '" data-goto-sync="1">' + syncTxt + '</button></header>' +
    '<main class="page">' + body + '</main>' + navHtml();
  if (toTop) window.scrollTo(0, 0); else window.scrollTo(0, y);
}


/* ---------- local persistence ---------- */
const CFG = window.HFT_CONFIG || {};
const SYNC_ON = !!(CFG.SUPABASE_URL && CFG.SUPABASE_KEY);
let session = null;
try { session = JSON.parse(localStorage.getItem('hft_session') || 'null'); } catch (e) {}
let meta = {baseRev: 0, dirty: false, lastSync: null};
try { Object.assign(meta, JSON.parse(localStorage.getItem('hft_meta') || '{}')); } catch (e) {}
let localVer = 0;
function saveLocal(){
  try {
    localStorage.setItem('hft_state', JSON.stringify(state));
    localStorage.setItem('hft_meta', JSON.stringify(meta));
  } catch (e) {}
}
function setSession(s){
  session = s;
  try { if (s) localStorage.setItem('hft_session', JSON.stringify(s)); else localStorage.removeItem('hft_session'); } catch (e) {}
}
function touch(){ state.ts = Date.now(); meta.dirty = true; localVer++; saveLocal(); }
function changed(){ touch(); render(false); scheduleSync(); }

/* ---------- status pill ---------- */
let syncTxt = '', syncCls = '', syncDetail = '';
function idleStatus(){
  if (!SYNC_ON) return ['Local only', ''];
  if (!session) return ['Sign in to sync', ''];
  return [navigator.onLine === false ? 'Offline' : 'Synced', navigator.onLine === false ? '' : 'ok'];
}
function setStatus(t, c, detail){
  syncTxt = t; syncCls = c || '';
  if (detail !== undefined) syncDetail = detail;
  const el = document.getElementById('sync');
  if (el){ el.textContent = t; el.className = 'sync ' + syncCls; }
  const de = document.getElementById('sync-detail');
  if (de) de.textContent = syncDetail;
}
function lastSyncText(){
  if (!meta.lastSync) return 'Not synced yet.';
  const d = new Date(meta.lastSync);
  return 'Last synced ' + pad(d.getHours()) + ':' + pad(d.getMinutes()) + '.';
}

/* ---------- Supabase client (plain fetch, no SDK) ---------- */
const isNetErr = e => !!e && (e.name === 'TypeError' || /failed to fetch|networkerror|load failed/i.test(e.message || ''));
function toSession(j, prev){
  return {
    access_token: j.access_token,
    refresh_token: j.refresh_token,
    expires_at: j.expires_at || (Math.floor(Date.now() / 1000) + (j.expires_in || 3600)),
    email: (j.user && j.user.email) || (prev && prev.email) || ''
  };
}
async function signIn(email, password){
  const r = await fetch(CFG.SUPABASE_URL + '/auth/v1/token?grant_type=password', {
    method: 'POST', headers: {apikey: CFG.SUPABASE_KEY, 'Content-Type': 'application/json'},
    body: JSON.stringify({email: email, password: password})
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error_description || j.msg || j.message || 'Sign-in failed.');
  setSession(toSession(j));
}
async function ensureToken(){
  if (!session) throw new Error('signed-out');
  if (session.expires_at - 60 > Date.now() / 1000) return session.access_token;
  const r = await fetch(CFG.SUPABASE_URL + '/auth/v1/token?grant_type=refresh_token', {
    method: 'POST', headers: {apikey: CFG.SUPABASE_KEY, 'Content-Type': 'application/json'},
    body: JSON.stringify({refresh_token: session.refresh_token})
  });
  const j = await r.json().catch(() => ({}));
  if (!r.ok){
    if (r.status >= 400 && r.status < 500){ setSession(null); throw new Error('signed-out'); }
    throw new TypeError('refresh failed');
  }
  const s = toSession(j, session);
  setSession(s);
  return s.access_token;
}
async function rest(method, query, body, extra){
  const tok = await ensureToken();
  const r = await fetch(CFG.SUPABASE_URL + '/rest/v1/tracker_state' + query, {
    method: method,
    headers: Object.assign({apikey: CFG.SUPABASE_KEY, Authorization: 'Bearer ' + tok, 'Content-Type': 'application/json'}, extra || {}),
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await r.text();
  let json = null;
  try { json = text ? JSON.parse(text) : null; } catch (e) {}
  return {status: r.status, ok: r.ok, json: json};
}
function httpErr(res){
  const m = res.json && (res.json.message || res.json.hint || res.json.error);
  return new Error('Server said ' + res.status + (m ? ': ' + m : '') + (res.status === 404 ? ' (did you run supabase-setup.sql?)' : ''));
}

/* ---------- merge (only used when both devices changed since the last sync) ---------- */
const sumLog = l => Object.keys(l).reduce((s, k) => s + l[k], 0);
function mergeStates(a, b){
  const newer = a.ts >= b.ts ? a : b, older = newer === a ? b : a;
  const log = {};
  Object.keys(a.log).concat(Object.keys(b.log)).forEach(d => {
    const v = Math.max(a.log[d] || 0, b.log[d] || 0);
    if (v > 0) log[d] = v;
  });
  return normalize({
    tasks: Object.assign({}, older.tasks, newer.tasks),
    checks: Object.assign({}, older.checks, newer.checks),
    log: log,
    floor: {total: newer.floor.total + Math.max(0, sumLog(log) - sumLog(newer.log))},
    stats: (a.stats.at || '') >= (b.stats.at || '') ? a.stats : b.stats,
    ts: Date.now()
  });
}

/* ---------- sync engine ---------- */
let syncing = false, again = false, timer = null, pendingRender = false;
function scheduleSync(delay){
  if (!SYNC_ON || !session) return;
  clearTimeout(timer);
  timer = setTimeout(syncNow, delay === undefined ? 1500 : delay);
}
function safeRender(){
  const a = document.activeElement;
  if (a && a.tagName === 'INPUT' && a.type !== 'checkbox'){ pendingRender = true; return; }
  render(false);
}
async function syncNow(){
  if (!SYNC_ON || !session) return;
  if (syncing){ again = true; return; }
  syncing = true;
  setStatus('Syncing\u2026', 'saving');
  let applied = false;
  try {
    for (let attempt = 0; attempt < 4; attempt++){
      const g = await rest('GET', '?select=data,rev&limit=1');
      if (!g.ok) throw httpErr(g);
      const row = g.json && g.json[0];
      if (!row){
        const v = localVer;
        const p = await rest('POST', '', {data: state, rev: 1}, {Prefer: 'return=representation'});
        if (p.status === 409) continue;
        if (!p.ok) throw httpErr(p);
        meta.baseRev = 1;
        meta.dirty = (localVer !== v);
        break;
      }
      if (row.rev > meta.baseRev){
        const remote = normalize(row.data);
        state = meta.dirty ? mergeStates(state, remote) : remote;
        meta.baseRev = row.rev;
        applied = true;
      }
      if (meta.dirty){
        const v = localVer;
        const u = await rest('PATCH', '?rev=eq.' + meta.baseRev, {data: state, rev: meta.baseRev + 1}, {Prefer: 'return=representation'});
        if (!u.ok) throw httpErr(u);
        if (!(u.json && u.json.length)) continue;          // someone else pushed first: pull and retry
        meta.baseRev = u.json[0].rev;
        meta.dirty = (localVer !== v);
      }
      break;
    }
    meta.lastSync = Date.now();
    saveLocal();
    setStatus('Synced', 'ok', lastSyncText());
    if (applied) safeRender();
  } catch (e){
    if (e && e.message === 'signed-out'){ setStatus('Sign in to sync', '', 'Your session expired. Sign in again.'); render(false); }
    else if (isNetErr(e)){ setStatus('Offline', '', 'No connection. Changes are saved on this device and will sync when you are back online.'); }
    else { setStatus('Sync error', 'err', e.message); }
  } finally {
    syncing = false;
    if (again || meta.dirty && syncCls === 'ok'){ again = false; scheduleSync(); }
  }
}

/* ---------- sign-in / out, backup ---------- */
function syncCard(){
  const backup = '<div class="btnrow"><button class="btn ghost sm" data-export="1">Export backup</button>' +
    '<label class="btn ghost sm" style="display:inline-block">Import backup<input id="imp" type="file" accept="application/json,.json" hidden></label></div>';
  if (!SYNC_ON){
    return '<div class="card" id="sync-card"><h2>Sync &amp; backup</h2><p class="dim">Sync is off, so data stays on this device. Add your Supabase URL and key to config.js to turn it on (steps are in the README).</p>' + backup + '</div>';
  }
  if (!session){
    return '<div class="card" id="sync-card"><h2>Sync &amp; backup</h2><p class="dim">Sign in to keep this device in step with your others. The app works fully offline without it.</p>' +
      '<div class="btnrow" style="margin-top:6px"><div class="field"><label for="in-email">Email</label><input id="in-email" type="email" autocomplete="username" inputmode="email"></div>' +
      '<div class="field"><label for="in-pass">Password</label><input id="in-pass" type="password" autocomplete="current-password"></div></div>' +
      '<div class="btnrow" style="align-items:center"><button class="btn" data-signin="1">Sign in</button></div>' +
      '<p class="err" id="sync-err" role="alert"></p>' + backup + '</div>';
  }
  return '<div class="card" id="sync-card"><div class="rowb"><h2>Sync &amp; backup</h2><span class="pill lime">Signed in</span></div>' +
    '<p class="dim" style="margin-bottom:2px">' + (session.email || 'Your account') + '</p>' +
    '<p class="dim" id="sync-detail" style="font-size:12.5px">' + (syncDetail || lastSyncText()) + '</p>' +
    '<div class="btnrow"><button class="btn sm" data-sync-now="1">Sync now</button><button class="btn ghost sm" data-signout="1">Sign out</button></div>' + backup + '</div>';
}
async function doSignIn(){
  const em = document.getElementById('in-email'), pw = document.getElementById('in-pass'), err = document.getElementById('sync-err');
  if (!em || !pw) return;
  if (!em.value.trim() || !pw.value){ err.textContent = 'Enter your email and password.'; return; }
  err.textContent = 'Signing in\u2026';
  try {
    await signIn(em.value.trim(), pw.value);
  } catch (e){
    err.textContent = isNetErr(e) ? 'Could not reach the server. Check your connection.' : e.message;
    return;
  }
  render(false);
  syncNow();
}
async function doSignOut(){
  try {
    if (session) await fetch(CFG.SUPABASE_URL + '/auth/v1/logout', {method: 'POST', headers: {apikey: CFG.SUPABASE_KEY, Authorization: 'Bearer ' + session.access_token}});
  } catch (e) {}
  setSession(null);
  meta.baseRev = 0; meta.dirty = true; saveLocal();
  setStatus('Sign in to sync', '', '');
  render(false);
}
function exportJson(){
  const blob = new Blob([JSON.stringify(state, null, 2)], {type: 'application/json'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'hft-tracker-backup-' + todayStr() + '.json';
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(a.href), 1000);
}
function importJson(file){
  if (!file) return;
  const rd = new FileReader();
  rd.onload = () => {
    try {
      const s = normalize(JSON.parse(rd.result));
      if (!confirm('Replace the data on this device with this backup?')) return;
      state = s; changed();
    } catch (e) { alert('That file is not a valid backup.'); }
  };
  rd.readAsText(file);
}

/* ---------- events ---------- */
document.addEventListener('click', e => {
  const t = e.target.closest('[data-nav],[data-log],[data-cal],[data-day],[data-save-stats],[data-set-total],[data-theme-toggle],[data-goto-sync],[data-signin],[data-signout],[data-sync-now],[data-export]');
  if (!t) return;
  const d = t.dataset;
  if (d.themeToggle){ try { localStorage.setItem('hft_theme', getTheme() === 'dark' ? 'light' : 'dark'); } catch (x) {} applyTheme(); render(false); return; }
  if (d.gotoSync){
    ui.page = 'log'; ui.y = 0; saveUi(); render(true);
    const el = document.getElementById('sync-card');
    if (el && el.scrollIntoView) setTimeout(() => el.scrollIntoView({block: 'start'}), 0);
    return;
  }
  if (d.signin){ doSignIn(); return; }
  if (d.signout){ doSignOut(); return; }
  if (d.syncNow){ syncNow(); return; }
  if (d.export){ exportJson(); return; }
  if (d.nav){
    ui.page = d.nav; ui.y = 0; saveUi(); render(true);
    if (d.nav === 'cps'){ const el = document.getElementById('cp-next'); if (el && el.scrollIntoView) setTimeout(() => el.scrollIntoView({block: 'start'}), 0); }
    return;
  }
  if (d.log){ logFloor(parseInt(d.log, 10)); changed(); return; }
  if (d.cal){
    const idx = Math.max(2026 * 12 + 8, Math.min(2027 * 12 + 7, ui.calY * 12 + ui.calM + parseInt(d.cal, 10)));
    ui.calY = Math.floor(idx / 12); ui.calM = idx % 12; saveUi(); render(false); return;
  }
  if (d.day){ ui.sel = d.day; saveUi(); render(false); return; }
  if (d.saveStats){
    const cf = parseInt(document.getElementById('in-cf').value, 10);
    const z = parseInt(document.getElementById('in-z').value, 10);
    if (isNaN(cf) && isNaN(z)) return;
    if (!isNaN(cf) && cf >= 0) state.stats.cf = cf;
    if (!isNaN(z) && z >= 0) state.stats.z = z;
    state.stats.at = todayStr();
    changed(); return;
  }
  if (d.setTotal){
    const v = parseInt(document.getElementById('in-total').value, 10);
    if (!isNaN(v) && v >= 0){ state.floor.total = v; changed(); }
    return;
  }
});
document.addEventListener('change', e => {
  const c = e.target;
  if (!c) return;
  if (c.id === 'imp'){ importJson(c.files && c.files[0]); c.value = ''; return; }
  if (!c.dataset) return;
  if (c.dataset.check){ state.checks[c.dataset.check] = c.checked; changed(); }
  else if (c.dataset.task){ state.tasks[c.dataset.task] = c.checked; changed(); }
});
document.addEventListener('keydown', e => { if (e.key === 'Enter' && e.target && e.target.id === 'in-pass') doSignIn(); });
document.addEventListener('focusout', () => {
  if (!pendingRender) return;
  setTimeout(() => {
    const a = document.activeElement;
    if (pendingRender && !(a && a.tagName === 'INPUT')){ pendingRender = false; render(false); }
  }, 600);
});
let scrollT = null;
window.addEventListener('scroll', () => {
  clearTimeout(scrollT);
  scrollT = setTimeout(() => { ui.y = window.scrollY; saveUi(); }, 150);
}, {passive: true});

/* ---------- boot ---------- */
applyTheme();
{ const s = idleStatus(); syncTxt = s[0]; syncCls = s[1]; syncDetail = lastSyncText(); if (SYNC_ON && session){ syncTxt = 'Syncing\u2026'; syncCls = 'saving'; } }
render(false);
if (ui.y) window.scrollTo(0, ui.y);
if (SYNC_ON && session) syncNow();
document.addEventListener('visibilitychange', () => { if (!document.hidden) scheduleSync(300); });
window.addEventListener('online', () => scheduleSync(300));
window.addEventListener('offline', () => setStatus('Offline', '', 'No connection. Changes are saved on this device.'));
setInterval(() => { if (!document.hidden) scheduleSync(0); }, 60000);
if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol)) navigator.serviceWorker.register('./sw.js').catch(() => {});
