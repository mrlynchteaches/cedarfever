// Cedar Grove Contact Tracing V4.1 Stable Progressive Core
const POIS = {"school": {"name": "Cedar Grove High School", "short": "School", "x": 470, "y": 105, "w": 175, "h": 86, "type": "rect", "details": "Campus with auditorium, cafeteria, gym, and staff workrooms. A school-related Career Pathways Expo occurs during the investigation."}, "church": {"name": "Oak Street Church", "short": "Church", "x": 130, "y": 110, "w": 125, "h": 74, "type": "rect", "details": "Church with choir rehearsal and volunteer pantry prep."}, "grocery": {"name": "Fresh Basket Grocery", "short": "Grocery", "x": 810, "y": 116, "w": 150, "h": 78, "type": "rect", "details": "Busy grocery store with short public interactions."}, "park": {"name": "Founders Park", "short": "Park", "x": 180, "y": 315, "r": 58, "type": "circle", "details": "Outdoor park with walking path."}, "clinic": {"name": "Cedar Grove Clinic", "short": "Clinic", "x": 830, "y": 325, "w": 142, "h": 78, "type": "rect", "details": "Clinic where people seek evaluation."}, "pharmacy": {"name": "Pine Pharmacy", "short": "Pharmacy", "x": 685, "y": 510, "w": 128, "h": 74, "type": "rect", "details": "Pharmacy and retail counter near the clinic."}, "diner": {"name": "Main Street Diner", "short": "Diner", "x": 350, "y": 310, "w": 136, "h": 74, "type": "rect", "details": "Indoor diner that may create secondary exposure possibilities."}, "library": {"name": "Cedar Grove Library", "short": "Library", "x": 520, "y": 318, "w": 135, "h": 74, "type": "rect", "details": "Public library with study tables and a small meeting room."}, "cityhall": {"name": "City Hall", "short": "City Hall", "x": 350, "y": 505, "w": 132, "h": 76, "type": "rect", "details": "Municipal offices and permit desk."}, "community": {"name": "Community Center", "short": "Community", "x": 125, "y": 505, "w": 165, "h": 80, "type": "rect", "details": "Meeting rooms and recreation space. Hosts a fundraiser during the investigation."}, "office": {"name": "Cedar Professional Offices", "short": "Office", "x": 675, "y": 305, "w": 150, "h": 92, "type": "rect", "details": "Two-floor office complex. Floor 1: Bright Smiles Dental, Grove Accounting, Legal Aid Office. Floor 2: TechFix Repair, Harper Insurance."}, "neighborhood": {"name": "Maple Lane Neighborhood", "short": "Neighborhood", "x": 885, "y": 505, "w": 120, "h": 88, "type": "rect", "details": "Residential neighborhood."}};
const PEOPLE = [{"id": "alex", "name": "Alex Carter", "role": "Student", "color": "#2563eb", "summary": "Student who attends school events and later visits public locations.", "days": {"1": {"route": ["neighborhood", "park", "library"], "time": "5:00-6:00 PM", "interview": "I studied at the library after walking through the park. I did not attend the church rehearsal."}, "2": {"route": ["neighborhood", "school", "diner"], "time": "8:50-10:20 AM", "interview": "I attended the Career Pathways Expo. I checked in at the auditorium table, sat near Morgan and Sam, then went to the diner with friends."}, "3": {"route": ["neighborhood", "clinic"], "time": "9:30 AM", "interview": "I went to the clinic after coughing through first period. They asked me to trace back to recent locations."}, "4": {"route": ["neighborhood", "school"], "time": "9:00 AM", "interview": "The school nurse asked who I sat near at the expo. I remember Morgan and Sam nearby."}, "5": {"route": ["neighborhood", "clinic"], "time": "10:15 AM", "interview": "I confirmed that I spoke with Chris at check-in for a few minutes."}}}, {"id": "avery", "name": "Avery Green", "role": "Community volunteer", "color": "#16a34a", "summary": "Volunteer connected to community-center activity.", "days": {"1": {"route": ["community", "park", "neighborhood"], "time": "6:15-7:00 PM", "interview": "Morgan helped me move chairs at the community center. We were mostly spread out."}, "2": {"route": ["community", "park", "cityhall"], "time": "6:00-7:30 PM", "interview": "I helped at the community center fundraiser. Taylor attended for a short time."}, "3": {"route": ["neighborhood", "community"], "time": "9:45 AM", "interview": "I was contacted because Morgan and I walked together. I have no symptoms."}, "4": {"route": ["community", "neighborhood"], "time": "2:00 PM", "interview": "I checked the community center sign-in sheet. It does not include Alex, Jordan, or Chris."}, "5": {"route": ["neighborhood"], "time": "9:30 AM", "interview": "No symptoms. The community center was less crowded than people assume."}}}, {"id": "casey", "name": "Casey Brown", "role": "Library assistant", "color": "#0284c7", "summary": "Library assistant with library and diner contacts.", "days": {"1": {"route": ["neighborhood", "library"], "time": "9:00 AM-5:00 PM", "interview": "I worked at the library and helped Alex find sources in the evening."}, "2": {"route": ["library", "diner", "neighborhood"], "time": "10:15-10:45 AM", "interview": "Sam studied at my table after the expo. I then picked up takeout from the diner."}, "3": {"route": ["library", "clinic"], "time": "11:15 AM", "interview": "I delivered library materials to the clinic front desk. I feel fine."}, "4": {"route": ["library", "neighborhood"], "time": "1:00 PM", "interview": "I reviewed library seating. Sam sat across from me for about 20 minutes."}, "5": {"route": ["library"], "time": "10:00 AM", "interview": "No symptoms. I was mostly at the library this week."}}}, {"id": "chris", "name": "Chris Hall", "role": "School staff", "color": "#b42318", "summary": "School staff member with repeated event responsibilities.", "days": {"1": {"route": ["neighborhood", "grocery", "church"], "time": "4:30-5:10 PM", "interview": "I picked up refreshments at Fresh Basket Grocery and dropped extra forms at Oak Street Church. I had a scratchy throat but thought it was allergies."}, "2": {"route": ["neighborhood", "school", "diner"], "time": "7:30 AM-12:15 PM", "interview": "I set up expo materials in the staff workroom, worked the auditorium check-in table, and spoke closely with visitors who had registration questions. After cleanup, I ate briefly at the diner."}, "3": {"route": ["neighborhood", "clinic"], "time": "8:15 AM", "interview": "I woke up with a fever and went to Cedar Grove Clinic. The nurse asked me to list recent locations."}, "4": {"route": ["neighborhood", "clinic"], "time": "10:30 AM", "interview": "A follow-up call asked whether I shared the prep table with Jordan. Yes, we were in the same small entry area most of the morning."}, "5": {"route": ["neighborhood"], "time": "9:00 AM", "interview": "I confirmed I had symptoms before the expo began, but I did not realize I might be contagious."}}}, {"id": "devon", "name": "Devon Brooks", "role": "City clerk", "color": "#475569", "summary": "City Hall clerk with several public-location crossings.", "days": {"1": {"route": ["neighborhood", "cityhall", "office"], "time": "2:00 PM", "interview": "Riley dropped a form at City Hall. It was a quick counter interaction."}, "2": {"route": ["cityhall", "grocery"], "time": "8:00 AM-12:00 PM", "interview": "I worked the permit desk, then stopped at the grocery store."}, "3": {"route": ["cityhall", "pharmacy"], "time": "11:30 AM", "interview": "I bought cough drops for a family member at the pharmacy. I do not have symptoms."}, "4": {"route": ["cityhall"], "time": "10:00 AM", "interview": "City Hall logs show short interactions only. No long indoor meeting with the school group."}, "5": {"route": ["neighborhood"], "time": "9:00 AM", "interview": "No symptoms. I was included because my route crossed several public locations."}}}, {"id": "jamie", "name": "Jamie Lee", "role": "Grocery cashier", "color": "#64748b", "summary": "Grocery worker who sees many short contacts.", "days": {"1": {"route": ["neighborhood", "grocery"], "time": "3:00-8:00 PM", "interview": "I worked at the grocery store. Chris and Jordan passed through separately, but checkout interactions were brief."}, "2": {"route": ["grocery", "pharmacy"], "time": "8:00 AM-12:00 PM", "interview": "I worked checkout, then picked up items at the pharmacy."}, "3": {"route": ["grocery", "neighborhood"], "time": "12:00 PM", "interview": "I was interviewed because several people visited the grocery store. I have no symptoms."}, "4": {"route": ["grocery"], "time": "4:00 PM", "interview": "Receipts show Chris and Jordan were not at the grocery at the same time for more than a few minutes."}, "5": {"route": ["neighborhood"], "time": "9:15 AM", "interview": "No symptoms reported. Grocery contacts still look brief."}}}, {"id": "jordan", "name": "Jordan Patel", "role": "Student aide", "color": "#ea580c", "summary": "Student aide assigned near the school entrance and auditorium.", "days": {"1": {"route": ["neighborhood", "school", "grocery"], "time": "3:45-4:30 PM", "interview": "I helped move display boards at school, then stopped at the grocery store. I saw Chris briefly near refreshments."}, "2": {"route": ["neighborhood", "school", "clinic"], "time": "7:45-10:30 AM", "interview": "I stood near Chris at the auditorium entrance, helped direct visitors, and shared a small prep table with him. I felt warm by late morning and went to the clinic."}, "3": {"route": ["neighborhood", "clinic"], "time": "8:45 AM", "interview": "I returned to the clinic because my fever continued."}, "4": {"route": ["neighborhood", "clinic"], "time": "11:00 AM", "interview": "The health department asked about the prep table. Chris and I were close for much longer than 15 minutes."}, "5": {"route": ["neighborhood"], "time": "8:45 AM", "interview": "I confirmed my strongest close contact was Chris during expo setup and check-in."}}}, {"id": "morgan", "name": "Morgan Diaz", "role": "Student", "color": "#7c3aed", "summary": "Student with school and community-center movement.", "days": {"1": {"route": ["neighborhood", "community", "park"], "time": "6:15-7:00 PM", "interview": "I helped Avery move chairs at the community center, then went home."}, "2": {"route": ["neighborhood", "school", "park"], "time": "8:45-10:00 AM", "interview": "I attended the Career Pathways Expo. My name tag was missing, so I stood near check-in for several minutes. Later I walked outside at the park with Avery."}, "3": {"route": ["neighborhood", "clinic"], "time": "10:10 AM", "interview": "I reported headache and chills and was sent to the clinic."}, "4": {"route": ["neighborhood", "school"], "time": "9:45 AM", "interview": "I remembered that Chris helped me with the missing name tag before I sat near Alex and Sam."}, "5": {"route": ["neighborhood"], "time": "10:30 AM", "interview": "I did not attend the church rehearsal or community fundraiser. My main indoor overlap was the school expo."}}}, {"id": "priya", "name": "Priya Nair", "role": "Pharmacy tech", "color": "#db2777", "summary": "Pharmacy tech with clinic/pharmacy contact after symptoms begin.", "days": {"1": {"route": ["neighborhood", "pharmacy"], "time": "8:00 AM-5:00 PM", "interview": "I worked at Pine Pharmacy. No school event."}, "2": {"route": ["pharmacy", "clinic"], "time": "11:00 AM", "interview": "I was at the pharmacy counter when Taylor stopped by. I also dropped a package at the clinic."}, "3": {"route": ["pharmacy", "clinic"], "time": "10:20 AM", "interview": "I delivered supplies to the clinic and saw Jordan in the waiting area."}, "4": {"route": ["pharmacy"], "time": "3:00 PM", "interview": "No symptoms. My clinic contact happened after people were already seeking care."}, "5": {"route": ["pharmacy"], "time": "9:00 AM", "interview": "No symptoms. Pharmacy contacts seem later in the chain."}}}, {"id": "riley", "name": "Riley Chen", "role": "Office worker", "color": "#9333ea", "summary": "Office worker with diner overlap.", "days": {"1": {"route": ["neighborhood", "office", "cityhall"], "time": "8:00 AM-4:30 PM", "interview": "I worked at Grove Accounting and dropped a form at City Hall."}, "2": {"route": ["neighborhood", "office", "diner"], "time": "10:30-11:15 AM", "interview": "I ate at Main Street Diner. Alex and friends were at the next table for about 25 minutes."}, "3": {"route": ["neighborhood", "office"], "time": "10:00 AM", "interview": "I had a mild sore throat but stayed at the office. I reported my diner visit when called."}, "4": {"route": ["neighborhood", "clinic"], "time": "8:30 AM", "interview": "I went to the clinic for a mild sore throat. I did not attend the school event."}, "5": {"route": ["neighborhood"], "time": "11:00 AM", "interview": "My only meaningful overlap appears to be the diner after the expo."}}}, {"id": "sam", "name": "Sam Wilson", "role": "Student", "color": "#059669", "summary": "Student with school-event seating exposure.", "days": {"1": {"route": ["neighborhood", "library"], "time": "4:00-5:00 PM", "interview": "I studied at the library. I did not attend the church event."}, "2": {"route": ["neighborhood", "school", "library"], "time": "8:45-9:55 AM", "interview": "I sat between Alex and Morgan during the expo presentation and later studied with Casey at the library."}, "3": {"route": ["neighborhood", "school"], "time": "9:00 AM", "interview": "The school nurse told me I may have been exposed. I do not have symptoms yet."}, "4": {"route": ["neighborhood", "clinic"], "time": "2:00 PM", "interview": "I went to the clinic for a screening after developing a mild cough."}, "5": {"route": ["neighborhood"], "time": "9:30 AM", "interview": "I remember Alex and Morgan sitting very close during the expo."}}}, {"id": "taylor", "name": "Taylor Smith", "role": "Parent volunteer", "color": "#0f766e", "summary": "Volunteer who overlaps with school and red herring events.", "days": {"1": {"route": ["church", "grocery", "neighborhood"], "time": "5:00-6:30 PM", "interview": "I was at Oak Street Church choir rehearsal. Several people were in a small room, so I wondered if that was the problem."}, "2": {"route": ["neighborhood", "school", "community"], "time": "8:30-10:15 AM", "interview": "I volunteered at the school refreshment table, then attended a community center fundraiser that evening."}, "3": {"route": ["neighborhood", "pharmacy"], "time": "11:00 AM", "interview": "I picked up supplies at the pharmacy and answered a contact tracer call. I felt fine then."}, "4": {"route": ["neighborhood", "clinic"], "time": "12:15 PM", "interview": "I visited the clinic after feeling tired. They asked me to separate church, school, and community center contacts."}, "5": {"route": ["neighborhood"], "time": "10:00 AM", "interview": "The school volunteer shift was longer and more crowded than the church drop-off and community fundraiser contacts."}}}];
const UPDATES = {"1": "Public health update: No official Cedar Fever cases have been announced. Several community events took place. Record locations carefully on paper.", "2": "Public health update: A school-related Career Pathways Expo occurs during the morning. No final case labels are available. Look for close indoor contacts.", "3": "Public health update: Cedar Grove Clinic reports multiple people with Cedar Fever-like symptoms. Begin tracing recent contacts backward.", "4": "Public health update: Follow-up interviews suggest some exposures may be secondary. Compare timing, duration, and indoor/outdoor setting.", "5": "Public health update: Final review stage. Use handwritten notes to submit a conclusion. The final response form is now unlocked."};
const STORAGE_KEY = "cedarGroveV41Stable";
const MAX_DAY = 5;

const state = {
  day: 1,
  activePeople: [],
  selectedPerson: null,
  selectedPoi: null,
  final: { origin: "", patientZero: "", evidence: "" }
};

function byId(id) { return document.getElementById(id); }

function setStatus(message) {
  const el = byId("appStatus");
  if (el) el.textContent = message;
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function loadState() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return;
  try {
    const saved = JSON.parse(raw);
    state.day = Number(saved.day) || 1;
    state.activePeople = Array.isArray(saved.activePeople) ? saved.activePeople : [];
    state.selectedPerson = saved.selectedPerson || null;
    state.selectedPoi = saved.selectedPoi || null;
    state.final = Object.assign(state.final, saved.final || {});
    if (state.day < 1) state.day = 1;
    if (state.day > MAX_DAY) state.day = MAX_DAY;
  } catch (error) {
    console.error("Could not load saved investigation state", error);
  }
}

function getCurrentDayData(person) {
  return person.days[String(state.day)];
}

function getPoiCenter(id) {
  const p = POIS[id];
  if (!p) return { x: 0, y: 0 };
  if (p.type === "circle") return { x: p.x, y: p.y };
  return { x: p.x + p.w / 2, y: p.y + p.h / 2 };
}

function clearElement(el) {
  while (el.firstChild) el.removeChild(el.firstChild);
}

function renderApp() {
  renderDayInfo();
  renderPois();
  renderPeople();
  renderActiveRoutes();
  renderRoutes();
  renderFinalPanel();
  restoreFinalInputs();
}

function renderDayInfo() {
  byId("dayBadge").textContent = "Current Stage: Day " + state.day;
  byId("dailyUpdate").textContent = UPDATES[String(state.day)] || "No update available.";
  const progressBtn = byId("progressBtn");
  progressBtn.disabled = state.day >= MAX_DAY;
  progressBtn.textContent = state.day >= MAX_DAY ? "Final Stage Reached" : "Progress Investigation";
}

function renderPois() {
  const layer = byId("poiLayer");
  clearElement(layer);
  Object.keys(POIS).forEach(id => {
    const p = POIS[id];
    const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    g.classList.add("poi");
    g.setAttribute("role", "button");
    g.setAttribute("tabindex", "0");

    let shape;
    if (p.type === "circle") {
      shape = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      shape.setAttribute("cx", p.x);
      shape.setAttribute("cy", p.y);
      shape.setAttribute("r", p.r);
    } else {
      shape = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      shape.setAttribute("x", p.x);
      shape.setAttribute("y", p.y);
      shape.setAttribute("width", p.w);
      shape.setAttribute("height", p.h);
      shape.setAttribute("rx", 14);
    }

    const label = document.createElementNS("http://www.w3.org/2000/svg", "text");
    const center = getPoiCenter(id);
    label.setAttribute("x", center.x);
    label.setAttribute("y", center.y + 5);
    label.textContent = p.short;

    g.appendChild(shape);
    g.appendChild(label);
    g.addEventListener("click", () => showPoi(id));
    g.addEventListener("keydown", event => { if (event.key === "Enter") showPoi(id); });
    layer.appendChild(g);
  });
}

function renderPeople() {
  const list = byId("peopleList");
  clearElement(list);
  const query = (byId("personSearch").value || "").toLowerCase();
  PEOPLE
    .filter(person => person.name.toLowerCase().includes(query) || person.role.toLowerCase().includes(query))
    .forEach(person => {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "person-btn" + (state.activePeople.includes(person.id) ? " active" : "");

      const left = document.createElement("span");
      const strong = document.createElement("strong");
      strong.textContent = person.name;
      const meta = document.createElement("span");
      meta.className = "meta";
      meta.textContent = person.role;
      left.appendChild(strong);
      left.appendChild(document.createElement("br"));
      left.appendChild(meta);

      const badge = document.createElement("span");
      badge.className = "badge";
      badge.textContent = "Interview";

      btn.appendChild(left);
      btn.appendChild(badge);
      btn.addEventListener("click", () => togglePerson(person.id));
      list.appendChild(btn);
    });
}

function togglePerson(id) {
  const index = state.activePeople.indexOf(id);
  if (index >= 0) {
    state.activePeople.splice(index, 1);
    if (state.selectedPerson === id) {
      state.selectedPerson = null;
      byId("details").textContent = "Interview closed. Select another person or location.";
    }
  } else {
    state.activePeople.push(id);
    state.selectedPerson = id;
    showPerson(id);
  }
  saveState();
  renderPeople();
  renderActiveRoutes();
  renderRoutes();
}

function renderActiveRoutes() {
  const box = byId("activeRoutes");
  clearElement(box);
  if (state.activePeople.length === 0) {
    box.textContent = "No active routes.";
    return;
  }
  state.activePeople.forEach(id => {
    const person = PEOPLE.find(p => p.id === id);
    if (!person) return;
    const row = document.createElement("div");
    row.className = "route-pill";
    const label = document.createElement("span");
    const swatch = document.createElement("span");
    swatch.className = "swatch";
    swatch.style.background = person.color;
    label.appendChild(swatch);
    label.appendChild(document.createTextNode(person.name));
    const close = document.createElement("button");
    close.type = "button";
    close.textContent = "×";
    close.addEventListener("click", () => togglePerson(id));
    row.appendChild(label);
    row.appendChild(close);
    box.appendChild(row);
  });
}

function renderRoutes() {
  const layer = byId("routeLayer");
  clearElement(layer);
  state.activePeople.forEach((id, routeIndex) => {
    const person = PEOPLE.find(p => p.id === id);
    if (!person) return;
    const dayData = getCurrentDayData(person);
    if (!dayData || !Array.isArray(dayData.route) || dayData.route.length < 2) return;
    const offset = (routeIndex % 7 - 3) * 5;
    const points = dayData.route.map(getPoiCenter);
    const d = points.map((pt, i) => (i === 0 ? "M" : "L") + " " + (pt.x + offset) + " " + (pt.y + offset)).join(" ");
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", d);
    path.setAttribute("class", "route");
    layer.appendChild(path);
    points.forEach(pt => {
      const dot = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      dot.setAttribute("cx", pt.x + offset);
      dot.setAttribute("cy", pt.y + offset);
      dot.setAttribute("r", 6);
      dot.setAttribute("class", "route-dot");
      layer.appendChild(dot);
    });
  });
}

function showPerson(id) {
  const person = PEOPLE.find(p => p.id === id);
  if (!person) return;
  const dayData = getCurrentDayData(person);
  const details = byId("details");
  clearElement(details);

  const title = document.createElement("h3");
  title.textContent = person.name;
  details.appendChild(title);

  const role = document.createElement("p");
  role.innerHTML = '<span class="badge">Interview</span> ' + person.role;
  details.appendChild(role);

  const summary = document.createElement("p");
  summary.textContent = person.summary;
  details.appendChild(summary);

  const section = document.createElement("div");
  section.className = "day-section";
  const heading = document.createElement("strong");
  heading.textContent = "Current-stage interview";
  section.appendChild(heading);

  const list = document.createElement("ol");
  const item = document.createElement("li");
  item.innerHTML = '<strong>' + dayData.time + '</strong> — ' + dayData.interview;
  list.appendChild(item);
  section.appendChild(list);

  const route = document.createElement("p");
  route.innerHTML = '<strong>Current route:</strong> ' + dayData.route.map(pid => POIS[pid].short).join(" → ");
  section.appendChild(route);
  details.appendChild(section);
}

function showPoi(id) {
  const poi = POIS[id];
  if (!poi) return;
  state.selectedPoi = id;
  saveState();
  const details = byId("details");
  clearElement(details);

  const title = document.createElement("h3");
  title.textContent = poi.name;
  details.appendChild(title);

  const info = document.createElement("p");
  info.textContent = poi.details;
  details.appendChild(info);

  const heading = document.createElement("h4");
  heading.textContent = "Known visitors in the current stage only";
  details.appendChild(heading);

  const visitors = PEOPLE.filter(person => {
    const dayData = getCurrentDayData(person);
    return dayData && dayData.route.includes(id);
  });

  if (visitors.length === 0) {
    const none = document.createElement("div");
    none.className = "visitor";
    none.textContent = "No known visitors in this stage.";
    details.appendChild(none);
  } else {
    visitors.forEach(person => {
      const row = document.createElement("div");
      row.className = "visitor";
      row.innerHTML = '<strong>' + person.name + '</strong><br><span class="meta">' + person.role + '</span>';
      details.appendChild(row);
    });
  }
}

function progressDay() {
  if (state.day >= MAX_DAY) return;
  const ok = confirm("Progress to the next investigation stage? Current interviews and routes will disappear. Only handwritten notes remain.");
  if (!ok) return;
  state.day += 1;
  state.activePeople = [];
  state.selectedPerson = null;
  state.selectedPoi = null;
  saveState();
  byId("personSearch").value = "";
  byId("details").textContent = "New investigation stage opened. Select a person or location.";
  renderApp();
}

function resetInvestigation() {
  const ok = confirm("Reset the investigation? This clears progress and final response fields on this device.");
  if (!ok) return;
  localStorage.removeItem(STORAGE_KEY);
  location.reload();
}

function renderFinalPanel() {
  const panel = byId("finalPanel");
  const msg = byId("lockMsg");
  if (state.day < MAX_DAY) {
    panel.classList.add("locked");
    msg.textContent = "Final response unlocks at the final stage.";
  } else {
    panel.classList.remove("locked");
    msg.textContent = "Use your handwritten notes to complete the final response.";
  }
}

function restoreFinalInputs() {
  byId("origin").value = state.final.origin || "";
  byId("patientZero").value = state.final.patientZero || "";
  byId("evidence").value = state.final.evidence || "";
}

function saveFinalInputs() {
  state.final.origin = byId("origin").value;
  state.final.patientZero = byId("patientZero").value;
  state.final.evidence = byId("evidence").value;
  saveState();
}

function escapeHtml(text) {
  return (text || "").replace(/[&<>]/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;"}[ch]));
}

function printFinalResponse() {
  saveFinalInputs();
  const report = byId("reportView");
  report.innerHTML = '<h1>Cedar Grove Contact Tracing Final Response</h1>' +
    '<div class="report-section"><p><strong>Origin location:</strong> ' + escapeHtml(state.final.origin) + '</p>' +
    '<p><strong>Most likely patient zero:</strong> ' + escapeHtml(state.final.patientZero) + '</p>' +
    '<p><strong>Evidence / CER:</strong><br>' + escapeHtml(state.final.evidence).replace(/\n/g, '<br>') + '</p></div>' +
    '<div class="report-section"><p><strong>Reminder:</strong> Attach handwritten notes to this report.</p></div>';
  window.print();
}

function attachEvents() {
  byId("progressBtn").addEventListener("click", progressDay);
  byId("resetBtn").addEventListener("click", resetInvestigation);
  byId("clearRoutesBtn").addEventListener("click", () => {
    state.activePeople = [];
    state.selectedPerson = null;
    saveState();
    byId("details").textContent = "Routes cleared. Select a person or location.";
    renderPeople();
    renderActiveRoutes();
    renderRoutes();
  });
  byId("personSearch").addEventListener("input", renderPeople);
  ["origin", "patientZero", "evidence"].forEach(id => byId(id).addEventListener("input", saveFinalInputs));
  byId("printFinalBtn").addEventListener("click", printFinalResponse);
}

function init() {
  try {
    loadState();
    attachEvents();
    renderApp();
    setStatus("Investigation loaded successfully. Current stage: Day " + state.day + ".");
  } catch (error) {
    console.error(error);
    setStatus("A loading error occurred. Please tell your teacher and reload the page.");
  }
}

document.addEventListener("DOMContentLoaded", init);
