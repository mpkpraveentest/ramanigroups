(function(){
  const LEADS_KEY = "ramaniLeads";
  const USERS_KEY = "ramaniUsers";

  function getLeads(){
    try { return JSON.parse(localStorage.getItem(LEADS_KEY) || "[]"); }
    catch(e){ return []; }
  }
  function saveLeads(leads){
    localStorage.setItem(LEADS_KEY, JSON.stringify(leads));
  }
  function normalizeBrand(value){
    const v = String(value || "").toLowerCase();
    if(v.includes("volkswagen") || v === "vw") return "Volkswagen";
    if(v.includes("mahindra")) return "Mahindra";
    if(v === "mg" || v.includes("mg motor")) return "MG";
    if(v.includes("kia")) return "Kia";
    return value || "";
  }
  function selectedText(el){
    if(!el || !el.options || el.selectedIndex < 0) return "";
    return el.options[el.selectedIndex].text.trim();
  }
  function getFormData(form){
    const data = {};
    form.querySelectorAll("input, select, textarea").forEach(function(el){
      const key = el.name || el.id;
      if(!key) return;
      if(el.type === "file"){
        data[key] = el.files && el.files[0] ? el.files[0].name : "";
      } else if(el.tagName === "SELECT"){
        data[key] = selectedText(el) || el.value;
      } else {
        data[key] = el.value ? el.value.trim() : "";
      }
    });
    return data;
  }
  function submitLead(lead, form, successId){
    lead.id = "RG-" + Date.now() + "-" + Math.floor(Math.random() * 9000 + 1000);
    lead.submittedAt = new Date().toLocaleString("en-IN");
    lead.status = lead.status || "New";
    lead.brand = normalizeBrand(lead.brand || "");
    lead.source = lead.source || "Website";

    const leads = getLeads();
    leads.unshift(lead);
    saveLeads(leads);

    if(form) form.reset();
    const success = successId ? document.getElementById(successId) : null;
    if(success) {
      success.style.display = "block";
      setTimeout(function(){ success.style.display = "none"; }, 5000);
    }
    alert("Thank you. Your details have been submitted successfully.");
    return Promise.resolve({ok:true, id:lead.id});
  }

  window.ramaniSubmitLead = submitLead;
  window.ramaniGetStoredLeads = getLeads;
  window.ramaniSaveStoredLeads = saveLeads;

  document.addEventListener("DOMContentLoaded", function(){
    // Make homepage popup open when available
    const popup = document.getElementById("leadPopup") || document.querySelector(".lead-popup") || document.querySelector(".popup-overlay");
    if(popup && !sessionStorage.getItem("ramaniPopupShown")){
      setTimeout(function(){
        popup.style.display = "flex";
        popup.classList.add("active", "show", "is-open");
        sessionStorage.setItem("ramaniPopupShown", "yes");
      }, 900);
    }

    // Bind common close buttons for popup
    document.querySelectorAll(".popup-close, .close-popup, [data-close-popup]").forEach(function(btn){
      btn.addEventListener("click", function(){
        const p = btn.closest(".lead-popup, .popup-overlay, #leadPopup");
        if(p){ p.style.display = "none"; p.classList.remove("active","show","is-open"); }
      });
    });

    // Homepage popup lead form
    const leadCaptureForm = document.getElementById("leadCaptureForm");
    if(leadCaptureForm && !leadCaptureForm.dataset.ramaniBound){
      leadCaptureForm.dataset.ramaniBound = "yes";
      leadCaptureForm.addEventListener("submit", function(e){
        e.preventDefault();
        const d = getFormData(leadCaptureForm);
        submitLead({
          type:"Homepage Popup",
          source:"Homepage Popup",
          name:d.name || d.fullName || "",
          mobile:d.number || d.mobile || d.phone || "",
          email:d.email || "",
          location:d.location || d.city || "",
          brand:"",
          message:"Homepage popup lead"
        }, leadCaptureForm, "leadFormSuccess").then(function(){
          const p = leadCaptureForm.closest(".lead-popup, .popup-overlay, #leadPopup");
          if(p) setTimeout(function(){ p.style.display = "none"; }, 1000);
        });
      });
    }

    // Contact form
    const contactForm = document.getElementById("contactForm");
    if(contactForm && !contactForm.dataset.ramaniBound){
      contactForm.dataset.ramaniBound = "yes";
      contactForm.addEventListener("submit", function(e){
        e.preventDefault();
        const d = getFormData(contactForm);
        submitLead({
          type:"Contact Us",
          source:"Contact Us Page",
          name:d.name || d.fullName || "",
          mobile:d.number || d.mobile || d.phone || "",
          email:d.email || "",
          location:d.location || d.city || "",
          brand:normalizeBrand(d.business || d.brand || ""),
          business:d.business || "",
          message:d.message || d.enquiry || ""
        }, contactForm, "contactFormSuccess");
      });
    }

    // Career form
    const careerForm = document.getElementById("careerForm");
    if(careerForm && !careerForm.dataset.ramaniBound){
      careerForm.dataset.ramaniBound = "yes";
      careerForm.addEventListener("submit", function(e){
        e.preventDefault();
        const d = getFormData(careerForm);
        submitLead({
          type:"Career Application",
          source:"Career Page",
          name:d.name || d.fullName || "",
          mobile:d.number || d.mobile || d.phone || "",
          email:d.email || "",
          location:d.location || d.city || "",
          position:d.position || "",
          experience:d.experience || "",
          resume:d.resume || "",
          message:d.message || ""
        }, careerForm, "careerFormSuccess");
      });
    }

    // Newsletter forms
    document.querySelectorAll("form.newsletter").forEach(function(form){
      if(form.dataset.ramaniBound) return;
      form.dataset.ramaniBound = "yes";
      form.addEventListener("submit", function(e){
        e.preventDefault();
        const emailInput = form.querySelector('input[type="email"]');
        const email = emailInput ? emailInput.value.trim() : "";
        if(!email){ alert("Please enter your email address."); return; }
        submitLead({
          type:"Newsletter",
          source:"Newsletter",
          email:email,
          message:"Newsletter subscription"
        }, form, null);
      });
    });
  });
})();

/* Appointment page submit overrides */
function ramaniGetField(form, selector) {
  const el = form.querySelector(selector);
  return el ? el.value.trim() : "";
}
function ramaniGetSelectedText(form, selector) {
  const el = form.querySelector(selector);
  if (!el || el.selectedIndex < 0) return "";
  return el.options[el.selectedIndex].text.trim();
}
function handleTestDriveSubmit(event) {
  event.preventDefault();
  const form = document.getElementById("testDriveForm");
  if(!form || !window.ramaniSubmitLead) return;
  const brand = (typeof brandNames !== "undefined" && typeof selectedBrandValue !== "undefined") ? (brandNames[selectedBrandValue] || "") : "";
  if(!brand){ alert("Please select a brand."); return; }

  const lead = {
    type: "Test Drive",
    source: "Book Test Drive Page",
    brand: brand,
    name: ramaniGetField(form, 'input[name="fullName"]'),
    email: ramaniGetField(form, 'input[name="email"]'),
    mobile: ramaniGetField(form, 'input[name="mobile"]'),
    city: ramaniGetField(form, 'input[name="city"]'),
    vehicleModel: ramaniGetSelectedText(form, 'select[name="vehicleModel"]'),
    preferredDate: ramaniGetField(form, 'input[name="preferredDate"]'),
    preferredTime: ramaniGetField(form, 'input[name="preferredTime"]'),
    notes: ramaniGetField(form, 'textarea[name="notes"]')
  };
  window.ramaniSubmitLead(lead, form, "successMessage");
}
function handleServiceSubmit(event) {
  event.preventDefault();
  const form = document.getElementById("serviceForm");
  if(!form || !window.ramaniSubmitLead) return;
  const brand = (typeof brandNames !== "undefined" && typeof selectedServiceBrandValue !== "undefined") ? (brandNames[selectedServiceBrandValue] || "") : "";
  if(!brand){ alert("Please select a brand."); return; }

  const lead = {
    type: "Service Appointment",
    source: "Book Service Appointment Page",
    brand: brand,
    name: ramaniGetField(form, 'input[name="fullName"]'),
    email: ramaniGetField(form, 'input[name="email"]'),
    mobile: ramaniGetField(form, 'input[name="mobile"]'),
    registrationNumber: ramaniGetField(form, 'input[name="registrationNumber"]'),
    vehicleModel: ramaniGetSelectedText(form, 'select[name="serviceVehicleModel"]'),
    serviceType: ramaniGetSelectedText(form, 'select[name="serviceType"]'),
    preferredDate: ramaniGetField(form, 'input[name="serviceDate"]'),
    preferredTime: ramaniGetSelectedText(form, 'select[name="timeSlot"]'),
    notes: ramaniGetField(form, 'textarea[name="serviceDescription"]')
  };
  window.ramaniSubmitLead(lead, form, "serviceSuccessMessage");
}
