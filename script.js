import { renderMockView } from "./mock/renderMock.js";

// ✅ Apparition fluide des sections
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
    } else {
      entry.target.classList.remove("in-view");
    }
  });
}, { threshold: 0.2 });
sections.forEach((section) => observer.observe(section));

// ✅ Chargement de la démo si sur demo.html
window.addEventListener("DOMContentLoaded", () => {
  const demo = document.getElementById("demo");
  if (demo) {
    renderMockView();
  }

  injectFloatingBubbles();
});

// ✅ Popup stats
window.openPopup = function (stat) {
  const popup = document.getElementById("popup-screen");
  const title = document.getElementById("popup-title");
  const container = document.getElementById("popup-content");

  title.textContent = `Performances – ${stat}`;
  container.innerHTML = "";

  import("./mock/data.js").then(({ lebronStats }) => {
    lebronStats.forEach(match => {
      const div = document.createElement("div");
      div.className = "match-stat";
      const vs = match.home ? `Lakers vs ${match.opponent}` : `${match.opponent} vs Lakers`;
      div.innerHTML = `
        <strong>${match.date}</strong><br/>
        ${vs}<br/>
        ${stat} : <span>${match.lebronStats[stat]}</span>
      `;
      container.appendChild(div);
    });
  });

  popup.classList.remove("hidden");
};

window.closePopup = function () {
  document.getElementById("popup-screen").classList.add("hidden");
};

window.closeCheckout = function () {
  document.getElementById("checkout-view").classList.add("hidden");
};

// ✅ Panier
let betCart = [];

export function addToCart(oddLabel, oddValue) {
  const key = `${oddLabel}-${oddValue}`;
  const index = betCart.findIndex(b => b.key === key);

  if (index > -1) {
    betCart.splice(index, 1);
  } else {
    betCart.push({ key, label: oddLabel, value: parseFloat(oddValue) });
  }

  updateCartBubble();
}

function updateCartBubble() {
  const bubble = document.getElementById("cart-bubble");
  if (betCart.length === 0) {
    bubble.style.display = "none";
    return;
  }

  const total = betCart.reduce((acc, b) => acc * b.value, 1);
  bubble.textContent = total.toFixed(2);
  bubble.style.display = "block";
}

document.getElementById("cart-bubble")?.addEventListener("click", () => {
  const view = document.getElementById("checkout-view");
  const list = document.getElementById("checkout-list");
  const total = document.getElementById("checkout-total");

  view.classList.remove("hidden");
  list.innerHTML = "";

  betCart.forEach(b => {
    const div = document.createElement("div");
    div.className = "line";
    div.innerHTML = `<span>${b.label}</span><span>${b.value.toFixed(2)}</span>`;
    list.appendChild(div);
  });

  const sum = betCart.reduce((acc, b) => acc * b.value, 1);
  total.innerHTML = `<strong>Cote totale : ${sum.toFixed(2)}</strong>`;
});

// ✅ Bulles aléatoires et déplaçables
function injectFloatingBubbles() {
  const phrases = [
    "🎯 L'intelligence artificielle au service de vos paris",
    "📊 73% de précision sur nos prédictions",
    "⚡ Analyse en temps réel de 50+ variables",
    "🧠 Algorithmes d'apprentissage automatique",
    "💎 Optimisation automatique des cotes",
    "🔍 Détection d'opportunités d'arbitrage",
    "📈 Gestion intelligente du bankroll",
    "🎲 Simulation Monte Carlo intégrée",
    "🔐 Données chiffrées end-to-end",
    "⭐ ROI garanti ou remboursement"
  ];

  const positions = [
    { top: 200, left: 50 },
    { top: 400, left: window.innerWidth - 360 },
    { top: 900, left: 60 },
    { top: 1300, left: window.innerWidth - 340 },
    { top: 1600, left: 80 }
  ];

  // Sélection aléatoire sans doublons
  const used = new Set();
  while (used.size < positions.length) {
    const i = Math.floor(Math.random() * phrases.length);
    used.add(i);
  }

  const selectedPhrases = Array.from(used).map(i => phrases[i]);

  selectedPhrases.forEach((text, i) => {
    const bubble = document.createElement("div");
    bubble.className = "sticky-bubble";
    bubble.innerHTML = `
      <div class="bubble-text">${text}</div>
      <div class="drag-icon-container">
        <i class="fas fa-arrows-alt drag-icon"></i>
      </div>
    `;
    bubble.style.top = `${positions[i].top}px`;
    bubble.style.left = `${positions[i].left}px`;
    document.body.appendChild(bubble);

    bubble.classList.add("in-view");
    makeDraggable(bubble);
  });
}

// ✨ Rend les bulles déplaçables par l’utilisateur
function makeDraggable(el) {
  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  el.style.cursor = "grab";

  el.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - el.offsetLeft;
    offsetY = e.clientY - el.offsetTop;
    el.style.cursor = "grabbing";
    el.style.zIndex = 9999;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDragging) return;
    el.style.left = `${e.clientX - offsetX}px`;
    el.style.top = `${e.clientY - offsetY}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
    el.style.cursor = "grab";
  });
}

// ✅ Envoi vers Google Sheets via Apps Script
document.getElementById("contact-form")?.addEventListener("submit", function(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData();
  formData.append("name", form.name.value);
  formData.append("email", form.email.value);
  formData.append("message", form.message.value);

  fetch("https://script.google.com/macros/s/AKfycbyFNs1G9a6CTJS7Hh72jcAHQezdBXaH5PugsT1PW3jBA7f4uglU0YIfBmbVcS_y6ebUOg/exec", {
    method: "POST",
    body: formData
  })
  .then(res => res.json())
  .then(response => {
    alert("Message envoyé !");
    form.reset();
  })
  .catch(err => alert("Erreur : " + err));
});
