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
  
  // ✅ Chargement de la démo dans les features
  const featuresDemo = document.getElementById("features-demo-screen");
  if (featuresDemo) {
    renderFeaturesDemo();
  }

  injectFloatingBubbles();
});

// ✅ Render demo in features section
function renderFeaturesDemo() {
  const featuresContent = document.getElementById("features-demo-screen");
  if (featuresContent) {
    import("./mock/renderMock.js").then(({ renderMockView }) => {
      renderMockView(featuresContent);
    });
  }
}

// ✅ Popup stats
window.openPopup = async function (stat) {
  const popup = document.getElementById("popup-screen") || document.getElementById("features-popup-screen");
  const title = document.getElementById("popup-title") || document.getElementById("features-popup-title");
  const container = document.getElementById("popup-content") || document.getElementById("features-popup-content");

  title.textContent = `Performances – ${stat}`;
  container.innerHTML = "";

  const { lebronStats } = await import("./mock/data.js");
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

  popup.classList.remove("hidden");
};

window.closePopup = function () {
  const popup = document.getElementById("popup-screen");
  if (popup) popup.classList.add("hidden");
};

window.closeFeaturesPopup = function () {
  document.getElementById("features-popup-screen").classList.add("hidden");
};

window.closeCheckout = function () {
  const checkout = document.getElementById("checkout-view");
  if (checkout) checkout.classList.add("hidden");
};

window.closeFeaturesCheckout = function () {
  document.getElementById("features-checkout-view").classList.add("hidden");
};

// ✅ Panier
let betCart = [];
let featuresBetCart = [];

export function addToCart(oddLabel, oddValue) {
  const key = `${oddLabel}-${oddValue}`;
  
  // Determine which cart to use based on context
  const isFeatures = document.getElementById("features-demo-screen");
  const cart = isFeatures ? featuresBetCart : betCart;
  const index = cart.findIndex(b => b.key === key);

  if (index > -1) {
    cart.splice(index, 1);
  } else {
    cart.push({ key, label: oddLabel, value: parseFloat(oddValue) });
  }

  updateCartBubble(isFeatures);
}

function updateCartBubble(isFeatures = false) {
  const bubbleId = isFeatures ? "features-cart-bubble" : "cart-bubble";
  const bubble = document.getElementById(bubbleId);
  const cart = isFeatures ? featuresBetCart : betCart;
  
  if (!bubble) return;
  
  if (cart.length === 0) {
    bubble.style.display = "none";
    return;
  }

  const total = cart.reduce((acc, b) => acc * b.value, 1);
  bubble.textContent = total.toFixed(2);
  bubble.style.display = "block";
}

document.getElementById("cart-bubble")?.addEventListener("click", () => {
  showCheckout(false);
});

document.getElementById("features-cart-bubble")?.addEventListener("click", () => {
  showCheckout(true);
});

function showCheckout(isFeatures = false) {
  const viewId = isFeatures ? "features-checkout-view" : "checkout-view";
  const listId = isFeatures ? "features-checkout-list" : "checkout-list";
  const totalId = isFeatures ? "features-checkout-total" : "checkout-total";
  const cart = isFeatures ? featuresBetCart : betCart;
  
  const view = document.getElementById("checkout-view");
  const list = document.getElementById("checkout-list");
  const total = document.getElementById("checkout-total");
  
  if (!view || !list || !total) return;

  view.classList.remove("hidden");
  list.innerHTML = "";

  cart.forEach(b => {
    const div = document.createElement("div");
    div.className = "line";
    div.innerHTML = `<span>${b.label}</span><span>${b.value.toFixed(2)}</span>`;
    list.appendChild(div);
  });

  const sum = cart.reduce((acc, b) => acc * b.value, 1);
  total.innerHTML = `<strong>Cote totale : ${sum.toFixed(2)}</strong>`;
}

// ✅ Bulles aléatoires et déplaçables
function injectFloatingBubbles() {
  // Function disabled - only keeping the two bubbles in the HTML
  return;
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
