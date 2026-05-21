const STORAGE_KEY = "cedarGroveV2State";

const POIS = {
  school: { name: "Cedar Grove High School", short: "School", x: 485, y: 115, w: 180, h: 90, type: "rect", details: "School gym and auditorium. School-related Future Careers Assembly from 8:45-9:45 AM." },
  church: { name: "Oak Street Church", short: "Church", x: 145, y: 125, w: 120, h: 78, type: "rect", details: "Small church with morning volunteer pantry setup." },
  grocery: { name: "Fresh Basket Grocery", short: "Grocery", x: 820, y: 135, w: 145, h: 82, type: "rect", details: "Busy grocery store with checkout lines near 11:00 AM." },
  park: { name: "Founders Park", short: "Park", x: 180, y: 335, r: 58, type: "circle", details: "Outdoor park with walking path and benches." },
  clinic: { name: "Cedar Grove Clinic", short: "Clinic", x: 835, y: 335, w: 140, h: 80, type: "rect", details: "Clinic where symptomatic people are evaluated." },
  pharmacy: { name: "Pine Pharmacy", short: "Pharmacy", x: 690, y: 525, w: 125, h: 75, type: "rect", details: "Pharmacy attached to a small retail strip." },
  diner: { name: "Main Street Diner", short: "Diner", x: 360, y: 325, w: 130, h: 75, type: "rect", details: "Indoor restaurant popular after school events." },
  library: { name: "Cedar Grove Library", short: "Library", x: 515, y: 335, w: 135, h: 75, type: "rect", details: "Quiet public library with study tables." },
  cityhall: { name: "City Hall", short: "City Hall", x: 355, y: 525, w: 130, h: 75, type: "rect", details: "Municipal offices and permit desk." },
  community: { name: "Community Center", short: "Community", x: 140, y: 525, w: 155, h: 80, type: "rect", details: "Recreation rooms and meeting space." },
  office: { name: "Cedar Professional Offices", short: "Office", x: 675, y: 320, w: 140, h: 92, type: "rect", details: "Two-floor office complex. Floor 1: Bright Smiles Dental, Grove Accounting, Legal Aid Office. Floor 2: TechFix Repair, Harper Insurance." },
  homes: { name: "Maple Lane Homes", short: "Homes", x: 905, y: 520, w: 115, h: 90, type: "rect", details: "Residential area where several interview subjects live." }
};

const PEOPLE = [
  { id:"chris", name:"Chris Hall", role:"School staff", status:"confirmed", color:"#b42318", symptom:"Scratchy throat at 8:15 AM; fever later", route:["homes","school","clinic"], timeline:[
    ["8:00", "Arrived at Cedar Grove High School to set up the Future Careers Assembly."],
    ["8:45-9:45", "Worked registration table inside the auditorium. Spoke closely with many attendees."],
    ["10:25", "Reported feeling worse and visited Cedar Grove Clinic."]],
    interview:"I helped run the assembly check-in table. My throat felt a little rough before students arrived, but I thought it was allergies. I handed out programs and answered questions near the auditorium entrance.",
    clue:"Earliest symptoms plus long indoor contact at the school event." },
  { id:"alex", name:"Alex Carter", role:"Student", status:"confirmed", color:"#2563eb", symptom:"Cough by 11:20 AM", route:["homes","school","diner"], timeline:[
    ["8:45-9:45", "Attended Future Careers Assembly; waited at registration table."],
    ["10:05-10:50", "Met friends at Main Street Diner."],
    ["11:20", "Developed cough and fatigue."]], interview:"I checked in at the table, talked with Chris for a few minutes, sat near Morgan and Sam, then went to the diner.", clue:"Direct school event exposure; later diner visit creates a possible secondary contact." },
  { id:"morgan", name:"Morgan Diaz", role:"Student", status:"confirmed", color:"#7c3aed", symptom:"Headache by 11:45 AM", route:["homes","school","park"], timeline:[
    ["8:45-9:45", "Sat in auditorium row 3 next to Alex and Sam."],
    ["10:10-10:40", "Walked through Founders Park with Avery."],
    ["11:45", "Reported headache and chills."]], interview:"I remember Alex coughing once at the assembly. I also talked to Chris at check-in because my name tag was missing.", clue:"School overlap and close seating with other confirmed students." },
  { id:"sam", name:"Sam Wilson", role:"Student", status:"contact", color:"#059669", symptom:"No symptoms yet", route:["homes","school","library"], timeline:[
    ["8:45-9:45", "Attended assembly; sat beside Morgan."],
    ["10:00-11:00", "Studied at the library with Casey."],
    ["11:30", "Contacted by school nurse as possible exposure."]], interview:"I sat between Alex and Morgan during the assembly. I feel fine, but I was there the whole time.", clue:"High-risk contact because of close seating near confirmed cases." },
  { id:"jordan", name:"Jordan Patel", role:"Student aide", status:"confirmed", color:"#ea580c", symptom:"Fever by 11:10 AM", route:["homes","school","clinic"], timeline:[
    ["8:30-9:50", "Helped guide visitors at the school auditorium entrance."],
    ["10:05", "Went to clinic after feeling warm."],
    ["11:10", "Fever recorded at clinic."]], interview:"I stood near Chris and helped direct people. We shared the same small entry area for most of the event.", clue:"Prolonged close contact with Chris at the event." },
  { id:"taylor", name:"Taylor Smith", role:"Parent volunteer", status:"contact", color:"#0f766e", symptom:"No symptoms", route:["church","school","grocery"], timeline:[
    ["8:05-8:30", "Dropped donations at Oak Street Church."],
    ["8:50-9:35", "Volunteered at school assembly refreshment table."],
    ["10:45-11:15", "Stopped at Fresh Basket Grocery."]], interview:"I saw Chris at the school entrance and helped with refreshments. The church was quiet; only two people were there briefly.", clue:"School overlap more meaningful than church or grocery." },
  { id:"jamie", name:"Jamie Lee", role:"Grocery cashier", status:"unrelated", color:"#64748b", symptom:"No symptoms", route:["homes","grocery","pharmacy"], timeline:[
    ["8:00-11:30", "Worked cashier shift at Fresh Basket Grocery."],
    ["11:40", "Picked up supplies at Pine Pharmacy."],
    ["12:00", "Returned home."]], interview:"I was at the grocery store all morning. I did not attend the school event, and none of my close coworkers reported symptoms during the investigation window.", clue:"A red herring; many people visited grocery, but it does not explain earliest cases." },
  { id:"riley", name:"Riley Chen", role:"Office worker", status:"contact", color:"#9333ea", symptom:"Mild sore throat", route:["homes","office","diner"], timeline:[
    ["8:00-10:00", "Worked at Grove Accounting, Floor 1, Office B."],
    ["10:10-10:45", "Ate breakfast at Main Street Diner near Alex."],
    ["11:00", "Returned to office complex."]], interview:"I did not attend the school event. At the diner, Alex and friends sat at the table beside mine for about 25 minutes.", clue:"Possible secondary exposure at diner, not likely origin." },
  { id:"casey", name:"Casey Brown", role:"Library assistant", status:"contact", color:"#0284c7", symptom:"No symptoms", route:["homes","library","diner"], timeline:[
    ["9:00-10:50", "Worked at library desk; studied with Sam for 20 minutes."],
    ["11:00", "Picked up takeout at diner."],
    ["11:30", "Returned to library."]], interview:"Sam studied at my table after the assembly. We sat across from each other for around 20 minutes.", clue:"Contact of Sam; lower priority than direct event exposures." },
  { id:"avery", name:"Avery Green", role:"Community volunteer", status:"unrelated", color:"#16a34a", symptom:"No symptoms", route:["community","park","cityhall"], timeline:[
    ["8:15-9:15", "Set up chairs at Community Center."],
    ["10:10-10:40", "Walked at park with Morgan outdoors."],
    ["11:00", "Dropped forms at City Hall."]], interview:"Morgan and I walked outside at the park. We were not close for long, and I did not attend the school event.", clue:"Outdoor brief contact makes this less likely as origin." },
  { id:"devon", name:"Devon Brooks", role:"City clerk", status:"unrelated", color:"#475569", symptom:"No symptoms", route:["homes","cityhall","grocery"], timeline:[
    ["8:00-11:00", "Worked permit desk at City Hall."],
    ["11:20", "Visited grocery store."],
    ["11:45", "Returned to City Hall."]], interview:"I had normal short conversations at City Hall. I did not attend the school event.", clue:"Red herring location movement." },
  { id:"priya", name:"Priya Nair", role:"Pharmacy tech", status:"contact", color:"#db2777", symptom:"No symptoms", route:["homes","pharmacy","clinic"], timeline:[
    ["8:00-10:30", "Worked at Pine Pharmacy."],
    ["10:35", "Delivered medication to clinic front desk."],
    ["10:45", "Briefly spoke with Jordan in clinic waiting area." ]], interview:"Jordan looked feverish at the clinic. We were in the same waiting area for about 10 minutes, then I returned to the pharmacy.", clue:"Brief clinic contact; monitor but not origin." }
];

let state = {
  difficulty: "standard", notes: "", selectedPerson: null, selectedPoi: null,
  visibleRoutes: [], suspectedPois: [], final: {origin:"", patientZero:"", evidence:"", timeline:"", contacts:"", actions:"", cer:""}
};

function $(id){ return document.getElementById(id); }
function saveState(){ localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); }
function loadState(){ const raw=localStorage.getItem(STORAGE_KEY); if(raw){ try{ state={...state, ...JSON.parse(raw)}; }catch(e){} } }
function poiCenter(id){ const p=POIS[id]; return {x:p.x+(p.w? p.w/2:0), y:p.y+(p.h? p.h/2:0)}; }

function init(){
  loadState();
  $("difficultySelect").value = state.difficulty;
  renderPois(); renderPeople(); renderRoutes(); renderRouteLayer(); restoreInputs(); applyDifficultyText();
  $("personSearch").addEventListener("input", renderPeople);
  $("difficultySelect").addEventListener("change", e=>{ state.difficulty=e.target.value; saveState(); applyDifficultyText(); renderPeople(); if(state.selectedPoi) showPoi(state.selectedPoi); });
  $("showAllRoutesBtn").addEventListener("click", ()=>{ state.visibleRoutes=PEOPLE.map(p=>p.id); saveState(); renderRoutes(); renderRouteLayer(); });
  $("hideAllRoutesBtn").addEventListener("click", ()=>{ state.visibleRoutes=[]; saveState(); renderRoutes(); renderRouteLayer(); });
  $("saveFinalBtn").addEventListener("click", saveFinal);
  $("resetBtn").addEventListener("click", resetAll);
  $("exportReportBtn").addEventListener("click", exportReport);
  $("notes").addEventListener("input", ()=>{ state.notes=$("notes").value; saveState(); });
  ["origin","patientZero","evidence","timeline","contacts","actions","cer"].forEach(id => $(id).addEventListener("input", saveFinalSilent));
}

function applyDifficultyText(){
  const prompt = {easy:"Guided mode: look for earliest symptoms, indoor overlap, and repeated contact.", standard:"Click a location to see visitors. Toggle routes to trace movement.", hard:"Hard mode: visitor lists hide some status labels until you inspect interviews."};
  $("mapPrompt").textContent = prompt[state.difficulty];
}

function renderPois(){
  const layer=$("poiLayer"); layer.innerHTML="";
  Object.entries(POIS).forEach(([id,p])=>{
    const g=document.createElementNS("http://www.w3.org/2000/svg","g");
    g.classList.add("poi-building"); if(state.suspectedPois.includes(id)) g.classList.add("suspected");
    g.dataset.id=id; g.setAttribute("tabindex","0"); g.setAttribute("role","button"); g.setAttribute("aria-label",p.name);
    let shape;
    if(p.type==="circle") { shape=document.createElementNS("http://www.w3.org/2000/svg","circle"); shape.setAttribute("cx",p.x); shape.setAttribute("cy",p.y); shape.setAttribute("r",p.r); }
    else { shape=document.createElementNS("http://www.w3.org/2000/svg","rect"); shape.setAttribute("x",p.x); shape.setAttribute("y",p.y); shape.setAttribute("width",p.w); shape.setAttribute("height",p.h); shape.setAttribute("rx",14); }
    const text=document.createElementNS("http://www.w3.org/2000/svg","text");
    text.setAttribute("x", p.type==="circle"?p.x:p.x+p.w/2); text.setAttribute("y", p.type==="circle"?p.y+5:p.y+p.h/2+6); text.textContent=p.short;
    g.append(shape,text); g.addEventListener("click",()=>showPoi(id)); g.addEventListener("keydown",e=>{ if(e.key==="Enter") showPoi(id); }); layer.appendChild(g);
  });
}

function renderPeople(){
  const q=$("personSearch").value?.toLowerCase() || ""; const list=$("peopleList"); list.innerHTML="";
  PEOPLE.filter(p=>p.name.toLowerCase().includes(q)||p.role.toLowerCase().includes(q)).forEach(p=>{
    const btn=document.createElement("button"); btn.className="person-btn"; btn.type="button";
    const statusText = state.difficulty==="hard" ? "Interview" : p.status;
    btn.innerHTML=`<span><strong>${p.name}</strong><br><span class="person-meta">${p.role}</span></span><span class="badge ${p.status}">${statusText}</span>`;
    btn.addEventListener("click",()=>showPerson(p.id)); list.appendChild(btn);
  });
}

function renderRoutes(){
  const list=$("routeList"); list.innerHTML="";
  PEOPLE.forEach(p=>{
    const row=document.createElement("label"); row.className="route-row";
    row.innerHTML=`<span style="display:flex;align-items:center;gap:.5rem"><span class="route-color" style="background:${p.color}"></span>${p.name}</span><input type="checkbox" ${state.visibleRoutes.includes(p.id)?"checked":""}>`;
    row.querySelector("input").addEventListener("change", e=>{ state.visibleRoutes = e.target.checked ? [...new Set([...state.visibleRoutes,p.id])] : state.visibleRoutes.filter(id=>id!==p.id); saveState(); renderRouteLayer(); });
    list.appendChild(row);
  });
}

function renderRouteLayer(){
  const layer=$("routeLayer"); layer.innerHTML="";
  state.visibleRoutes.map(id=>PEOPLE.find(p=>p.id===id)).filter(Boolean).forEach((p,idx)=>{
    const pts=p.route.map(poiCenter); if(pts.length<2) return;
    const d=pts.map((pt,i)=>`${i?'L':'M'} ${pt.x} ${pt.y + (idx%5-2)*5}`).join(" ");
    const path=document.createElementNS("http://www.w3.org/2000/svg","path"); path.setAttribute("d",d); path.setAttribute("stroke",p.color); path.setAttribute("class","route-path"); path.style.color=p.color; layer.appendChild(path);
    pts.forEach((pt,i)=>{ const c=document.createElementNS("http://www.w3.org/2000/svg","circle"); c.setAttribute("cx",pt.x); c.setAttribute("cy",pt.y+(idx%5-2)*5); c.setAttribute("r",7); c.setAttribute("fill",p.color); c.setAttribute("class","route-dot"); layer.appendChild(c); });
  });
}

function showPerson(id){
  const p=PEOPLE.find(x=>x.id===id); state.selectedPerson=id; saveState();
  if(!state.visibleRoutes.includes(id)){ state.visibleRoutes.push(id); saveState(); renderRoutes(); renderRouteLayer(); }
  const hint = state.difficulty==="easy" ? `<div class="hint-box"><strong>Guided hint:</strong> ${p.clue}</div>` : "";
  $("details").innerHTML=`<h3>${p.name}</h3><p><span class="badge ${p.status}">${p.status}</span> ${p.role}</p><p><strong>Symptoms:</strong> ${p.symptom}</p><p><strong>Interview:</strong> ${p.interview}</p>${hint}<h4>Movement Timeline</h4><ol class="timeline-list">${p.timeline.map(t=>`<li><strong>${t[0]}</strong> — ${t[1]}</li>`).join("")}</ol><p><strong>Route:</strong> ${p.route.map(id=>POIS[id].short).join(" → ")}</p>`;
}

function showPoi(id){
  state.selectedPoi=id; saveState(); const poi=POIS[id];
  const visitors=PEOPLE.filter(p=>p.route.includes(id));
  const rows=visitors.map(p=>`<div class="visitor-item"><strong>${p.name}</strong> ${state.difficulty!=="hard"?`<span class="badge ${p.status}">${p.status}</span>`:""}<br><span class="person-meta">${p.timeline.filter(t=>t[1].toLowerCase().includes(poi.short.toLowerCase().split(' ')[0].toLowerCase()) || t[1].toLowerCase().includes(id)).map(t=>t[0]).join(', ') || 'See interview for time details'}</span></div>`).join("");
  const easyHint = state.difficulty==="easy" && id==="school" ? `<div class="hint-box"><strong>Guided hint:</strong> This location has the strongest overlap among early confirmed cases.</div>` : "";
  const markText = state.suspectedPois.includes(id) ? "Unmark suspected location" : "Mark suspected location";
  $("details").innerHTML=`<h3>${poi.name}</h3><p>${poi.details}</p>${easyHint}<h4>Known Visitors</h4><div class="visitor-list">${rows || 'No known visitors.'}</div><button class="mark-btn primary-btn" onclick="toggleSuspect('${id}')">${markText}</button>`;
}

function toggleSuspect(id){
  state.suspectedPois = state.suspectedPois.includes(id) ? state.suspectedPois.filter(x=>x!==id) : [...state.suspectedPois,id]; saveState(); renderPois(); showPoi(id);
}

function restoreInputs(){
  $("notes").value=state.notes||"";
  Object.entries(state.final).forEach(([k,v])=>{ if($(k)) $(k).value=v||""; });
}
function saveFinalSilent(){ ["origin","patientZero","evidence","timeline","contacts","actions","cer"].forEach(id=>state.final[id]=$(id).value); saveState(); }
function saveFinal(){ saveFinalSilent(); alert("Final response saved locally on this device."); }
function resetAll(){ if(confirm("Reset this investigation? This clears notes, routes, suspected locations, and final responses from localStorage.")){ localStorage.removeItem(STORAGE_KEY); location.reload(); } }
function esc(s){ return (s||"").replace(/[&<>]/g, ch=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[ch])); }
function exportReport(){
  saveFinalSilent();
  const suspected=state.suspectedPois.map(id=>POIS[id].name).join(", ") || "None marked";
  const routes=state.visibleRoutes.map(id=>PEOPLE.find(p=>p.id===id)?.name).filter(Boolean).join(", ") || "None shown";
  const svg = $("townMap").outerHTML;
  $("reportView").innerHTML=`<h1>Cedar Grove Contact Tracing Report</h1><p><strong>Difficulty:</strong> ${state.difficulty}</p><div class="report-section"><h2>Map Snapshot</h2>${svg}<p><strong>Suspected locations:</strong> ${esc(suspected)}</p><p><strong>Visible routes:</strong> ${esc(routes)}</p></div><div class="report-section"><h2>Final Response</h2><p><strong>Origin location:</strong> ${esc(state.final.origin)}</p><p><strong>Patient zero:</strong> ${esc(state.final.patientZero)}</p><p><strong>Evidence:</strong><br>${esc(state.final.evidence).replace(/\n/g,"<br>")}</p><p><strong>Timeline:</strong><br>${esc(state.final.timeline).replace(/\n/g,"<br>")}</p><p><strong>High-risk contacts:</strong><br>${esc(state.final.contacts).replace(/\n/g,"<br>")}</p><p><strong>Recommended actions:</strong><br>${esc(state.final.actions).replace(/\n/g,"<br>")}</p><p><strong>CER:</strong><br>${esc(state.final.cer).replace(/\n/g,"<br>")}</p></div><div class="report-section"><h2>Investigator Notes</h2><p>${esc(state.notes).replace(/\n/g,"<br>")}</p></div>`;
  window.print();
}

document.addEventListener("DOMContentLoaded", init);
