
const PAGE_BRAND = window.RAMANI_PAGE_BRAND || "all";
const PAGE_TITLE = window.RAMANI_PAGE_TITLE || "Ramani Groups";

const DEFAULT_USERS = [
  {id:"u_super",name:"Creator Super Admin",username:"superadmin",password:"Creator@2026",role:"super_admin",brand:"all",active:true},
  {id:"u_main_admin",name:"Ramani Main Admin",username:"ramaniadmin",password:"Ramani@2026",role:"admin",brand:"all",active:true},
  {id:"u_vw_admin",name:"Volkswagen Brand Manager",username:"vwmanager",password:"VW@2026",role:"admin",brand:"Volkswagen",active:true},
  {id:"u_mahindra_admin",name:"Mahindra Brand Manager",username:"mahindramanager",password:"Mahindra@2026",role:"admin",brand:"Mahindra",active:true},
  {id:"u_mg_admin",name:"MG Brand Manager",username:"mgmanager",password:"MG@2026",role:"admin",brand:"MG",active:true},
  {id:"u_kia_admin",name:"Kia Brand Manager",username:"kiamanager",password:"Kia@2026",role:"admin",brand:"Kia",active:true}
];

let ALL_LEADS = [];
let USERS = [];
let CURRENT_USER = null;
let editingUserId = "";

function $(id){ return document.getElementById(id); }
function esc(v){ return String(v ?? "").replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m])); }
function togglePassword(id){ const el=$(id); if(el) el.type = el.type === "password" ? "text" : "password"; }

function getUsers(){
  try{
    const saved = JSON.parse(localStorage.getItem("ramaniUsers") || "null");
    if(Array.isArray(saved) && saved.length) return saved;
  }catch(e){}
  localStorage.setItem("ramaniUsers", JSON.stringify(DEFAULT_USERS));
  return DEFAULT_USERS.slice();
}
function saveUsers(users){ localStorage.setItem("ramaniUsers", JSON.stringify(users)); }
function getAllStoredLeads(){
  try { return JSON.parse(localStorage.getItem("ramaniLeads") || "[]"); }
  catch(e){ return []; }
}
function saveAllStoredLeads(leads){ localStorage.setItem("ramaniLeads", JSON.stringify(leads)); }
function canAccessBrand(user, brand){
  if(!user) return false;
  if(user.role === "super_admin") return true;
  if(user.brand === "all") return true;
  return String(user.brand || "").toLowerCase() === String(brand || "").toLowerCase();
}
function login(){
  const username = $("loginUser").value.trim();
  const password = $("loginPass").value.trim();
  USERS = getUsers();
  const user = USERS.find(u => u.active !== false && u.username === username && u.password === password);
  if(!user){ $("loginError").innerText = "Invalid login ID or password"; return; }
  if(PAGE_BRAND !== "all" && !canAccessBrand(user, PAGE_BRAND)){
    $("loginError").innerText = "This user is not allowed for this brand dashboard";
    return;
  }
  CURRENT_USER = user;
  sessionStorage.setItem("ramaniCurrentUser", JSON.stringify(user));
  showDashboard();
}
function logout(){ sessionStorage.removeItem("ramaniCurrentUser"); location.reload(); }
function checkSession(){
  try{
    const user = JSON.parse(sessionStorage.getItem("ramaniCurrentUser") || "null");
    if(user && (PAGE_BRAND === "all" || canAccessBrand(user, PAGE_BRAND))){
      CURRENT_USER = user;
      showDashboard();
    }
  }catch(e){}
}
function showDashboard(){
  $("loginScreen").style.display="none";
  $("dashboard").style.display="block";
  $("userInfo").innerText = `${CURRENT_USER.name} (${String(CURRENT_USER.role).replace("_"," ")})`;
  loadLeads();
  loadUsers();
}
function showSheet(type){
  document.querySelectorAll(".sheet").forEach(s=>s.classList.remove("active"));
  document.querySelectorAll(".tab-btn").forEach(b=>b.classList.remove("active"));
  $(`${type}Sheet`).classList.add("active");
  $(`${type}Tab`).classList.add("active");
}
function toggleFilter(id){ $(id).classList.toggle("show"); }
function loadLeads(){
  const all = getAllStoredLeads();
  ALL_LEADS = all.filter(function(lead){
    const brand = lead.brand || "";
    if(PAGE_BRAND !== "all" && String(brand).toLowerCase() !== PAGE_BRAND.toLowerCase()) return false;
    return canAccessBrand(CURRENT_USER, brand || PAGE_BRAND);
  });
  renderAll();
}
function getVal(id){ return $(id) ? $(id).value.toLowerCase().trim() : ""; }
function matchesCommon(l, prefix){
  const q=getVal(prefix+"Search");
  const status=getVal(prefix+"Status");
  const brand=getVal(prefix+"Brand");
  const from=getVal(prefix+"From");
  const to=getVal(prefix+"To");
  const text=JSON.stringify(l).toLowerCase();
  if(q && !text.includes(q)) return false;
  if(status && String(l.status||"").toLowerCase() !== status) return false;
  if(brand && brand !== "all" && String(l.brand||"").toLowerCase() !== brand) return false;
  const d=String(l.submittedAt||"");
  if(from && d.slice(0,10) < from) return false;
  if(to && d.slice(0,10) > to) return false;
  return true;
}
function renderAll(){
  const tests=ALL_LEADS.filter(l=>l.type==="Test Drive");
  const services=ALL_LEADS.filter(l=>l.type==="Service Appointment");
  const contacts=ALL_LEADS.filter(l=>["Contact Us","Homepage Popup"].includes(l.type));
  const careers=ALL_LEADS.filter(l=>l.type==="Career Application");
  const newsletters=ALL_LEADS.filter(l=>l.type==="Newsletter");

  $("totalCount").innerText=ALL_LEADS.length;
  $("testDriveCount").innerText=tests.length;
  $("serviceCount").innerText=services.length;
  $("otherCount").innerText=contacts.length+careers.length+newsletters.length;

  renderRows("test", tests.filter(l=>matchesCommon(l,"test")), ["submittedAt","name","mobile","email","brand","vehicleModel","preferredDate","preferredTime","city"]);
  renderRows("service", services.filter(l=>matchesCommon(l,"service")), ["submittedAt","name","mobile","email","brand","vehicleModel","registrationNumber","serviceType","preferredDate","preferredTime"]);
  renderRows("contact", contacts.filter(l=>matchesCommon(l,"contact")), ["submittedAt","type","name","mobile","email","brand","location","business","message"]);
  renderRows("career", careers.filter(l=>matchesCommon(l,"career")), ["submittedAt","name","mobile","email","location","position","experience","resume","message"]);
  renderRows("newsletter", newsletters.filter(l=>matchesCommon(l,"newsletter")), ["submittedAt","email","source","message"]);
}
function renderRows(prefix, rows, fields){
  const tbody=$(prefix+"Rows");
  const empty=$(prefix+"Empty");
  if(!tbody) return;
  tbody.innerHTML = rows.map(l=>{
    return `<tr>${fields.map(f=>`<td>${esc(l[f])}</td>`).join("")}<td><span class="badge">${esc(l.status||"New")}</span></td><td><button class="small-btn btn-navy" onclick='openDetails(${JSON.stringify(l.id)})'>👁 Details</button><select onchange='updateStatus(${JSON.stringify(l.id)},this.value)'><option ${l.status==="New"?"selected":""}>New</option><option ${l.status==="Contacted"?"selected":""}>Contacted</option><option ${l.status==="Follow Up"?"selected":""}>Follow Up</option><option ${l.status==="Closed"?"selected":""}>Closed</option></select></td></tr>`;
  }).join("");
  empty.style.display = rows.length ? "none" : "block";
}
function updateStatus(id,status){
  const all = getAllStoredLeads();
  const lead = all.find(l => l.id === id);
  if(lead && canAccessBrand(CURRENT_USER, lead.brand || PAGE_BRAND)){
    lead.status = status;
    saveAllStoredLeads(all);
    loadLeads();
  }
}
function openDetails(id){
  const l=ALL_LEADS.find(x=>x.id===id);
  if(!l) return;
  $("modalTitle").innerText = `${l.type || "Lead"} Details`;
  $("modalBody").innerHTML = Object.keys(l).map(k=>`<strong>${esc(k)}</strong><div>${esc(l[k])}</div>`).join("");
  $("modalBackdrop").style.display="flex";
}
function closeDetails(){ $("modalBackdrop").style.display="none"; }
function exportCSV(type){
  let rows=ALL_LEADS;
  if(type==="test") rows=rows.filter(l=>l.type==="Test Drive");
  if(type==="service") rows=rows.filter(l=>l.type==="Service Appointment");
  if(type==="other") rows=rows.filter(l=>!["Test Drive","Service Appointment"].includes(l.type));
  if(!rows.length){ alert("No leads to export."); return; }
  const headers=[...new Set(rows.flatMap(o=>Object.keys(o)))];
  const csv=[headers].concat(rows.map(r=>headers.map(h=>r[h]||""))).map(row=>row.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
  const blob=new Blob([csv],{type:"text/csv"});
  const url=URL.createObjectURL(blob);
  const a=document.createElement("a"); a.href=url; a.download=`${PAGE_BRAND}-leads.csv`; a.click(); URL.revokeObjectURL(url);
}
function loadUsers(){
  USERS = getUsers();
  if(CURRENT_USER.role !== "super_admin" && CURRENT_USER.role !== "admin"){
    const msg = $("userAccessMsg"); if(msg) msg.innerText = "No user management access";
    USERS = [];
    renderUsers();
    return;
  }
  if(CURRENT_USER.role !== "super_admin"){
    USERS = USERS.filter(u => String(u.brand).toLowerCase() === String(CURRENT_USER.brand).toLowerCase());
  } else if(PAGE_BRAND !== "all") {
    USERS = USERS.filter(u => u.role === "super_admin" || String(u.brand).toLowerCase() === PAGE_BRAND.toLowerCase());
  }
  renderUsers();
}
function renderUsers(){
  const tbody=$("userRows"); if(!tbody) return;
  tbody.innerHTML = USERS.map(u=>`<tr><td>${esc(u.name)}</td><td>${esc(u.username)}</td><td>${esc(u.password)}</td><td>${esc(u.role)}</td><td>${esc(u.brand)}</td><td><button class="small-btn btn-navy" onclick='editUser(${JSON.stringify(u.id)})'>Edit</button><button class="small-btn btn-danger" onclick='deleteUser(${JSON.stringify(u.id)})'>Delete</button></td></tr>`).join("");
}
function editUser(id){
  const all = getUsers();
  const u=all.find(x=>x.id===id); if(!u) return;
  editingUserId=u.id;
  $("newName").value=u.name; $("newUsername").value=u.username; $("newPassword").value=u.password; $("newRole").value=u.role; $("newBrand").value=u.brand;
  $("saveUserBtn").innerText="Save Changes";
  showSheet("users");
}
function resetUserForm(){
  editingUserId="";
  ["newName","newUsername","newPassword"].forEach(id=>$(id).value="");
  $("newRole").value="user"; $("newBrand").value=PAGE_BRAND==="all" ? "all" : PAGE_BRAND;
  $("saveUserBtn").innerText="Add User";
}
function saveUser(){
  if(CURRENT_USER.role !== "super_admin" && CURRENT_USER.role !== "admin"){ alert("No user management access"); return; }
  const all = getUsers();
  const user={id:editingUserId || ("u_"+Date.now()),name:$("newName").value.trim(),username:$("newUsername").value.trim(),password:$("newPassword").value.trim(),role:$("newRole").value,brand:$("newBrand").value,active:true};
  if(!user.name || !user.username || !user.password){ alert("Name, login ID and password are required."); return; }
  if(CURRENT_USER.role !== "super_admin"){
    user.role = user.role === "super_admin" ? "user" : user.role;
    user.brand = CURRENT_USER.brand;
  }
  if(all.some(u=>u.username===user.username && u.id!==user.id)){ alert("Username already exists."); return; }
  const idx = all.findIndex(u=>u.id===user.id);
  if(idx >= 0) all[idx]=user; else all.push(user);
  saveUsers(all);
  resetUserForm(); loadUsers();
}
function deleteUser(id){
  if(!confirm("Delete this user?")) return;
  const all = getUsers();
  const u = all.find(x=>x.id===id);
  if(!u) return;
  if(u.role === "super_admin"){ alert("Super admin cannot be deleted."); return; }
  if(CURRENT_USER.role !== "super_admin" && String(u.brand).toLowerCase() !== String(CURRENT_USER.brand).toLowerCase()){
    alert("No access."); return;
  }
  saveUsers(all.filter(x=>x.id!==id));
  loadUsers();
}
function addDemoLead(){
  const all = getAllStoredLeads();
  all.unshift({id:"DEMO-"+Date.now(),submittedAt:new Date().toLocaleString("en-IN"),type:"Test Drive",source:"Demo",brand:PAGE_BRAND==="all"?"Volkswagen":PAGE_BRAND,name:"Demo Customer",mobile:"9876543210",email:"demo@example.com",vehicleModel:"Demo Model",preferredDate:"2026-06-22",preferredTime:"10:00",city:"Coimbatore",status:"New"});
  saveAllStoredLeads(all); loadLeads();
}
document.addEventListener("keydown",e=>{ if(e.key==="Enter" && $("loginScreen").style.display!=="none") login(); });
checkSession();
