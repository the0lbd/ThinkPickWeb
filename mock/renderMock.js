import { lebronBets, lakersBets } from './data.js';
import { addToCart } from '../script.js';

const content = document.getElementById("main-screen");

// Fonction pour gérer l'ajout/retrait de sélection
function toggleBet(element, label, value) {
  element.classList.toggle("selected");
  addToCart(label, value);
}

// Format arrondi en x.xx
const formatOdds = (value) => parseFloat(value).toFixed(2);

export function renderMockView() {
  content.innerHTML = "";

  // HEADER MATCH
  const matchHeader = document.createElement("div");
  matchHeader.className = "mock-match";
  matchHeader.innerHTML = `
    <div style="display: flex; justify-content: space-between; font-weight: bold;">
      <div style="text-align: left;">
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <div style="width: 32px; height: 32px; background: #552583; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: #FDB927; font-weight: bold; font-size: 0.8rem;">LAL</div>
          <div>Lakers<br/><span style="font-weight: normal; color: #a0a0a0;">Los Angeles</span></div>
        </div>
      </div>
      <div style="font-size: 1.2rem; color: #00d4aa; font-weight: 600;">
        <div style="font-size: 1.2rem; color: #abcf65; font-weight: 600;">
        <div style="font-size: 0.8rem; color: #a0a0a0;">Aujourd'hui</div>
        02:30
      </div>
      <div style="text-align: right;">
        <div style="display: flex; align-items: center; gap: 0.5rem; flex-direction: row-reverse;">
          <div style="width: 32px; height: 32px; background: #007A33; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 0.8rem;">BOS</div>
          <div>Celtics<br/><span style="font-weight: normal; color: #a0a0a0;">Boston</span></div>
        </div>
      </div>
    </div>
    <div style="margin: 1rem 0; height: 1px; background: linear-gradient(90deg, transparent, #00d4aa, transparent);"></div>
    <div style="margin: 1rem 0; height: 1px; background: linear-gradient(90deg, transparent, #abcf65, transparent);"></div>
  `;
  content.appendChild(matchHeader);

  // BLOCS LEBRON (Points, Assists, Rebounds)
  ["Points", "Assists", "Rebounds"].forEach(stat => {
    const bet = lebronBets.find(b => b.stat === stat);
    if (!bet) return;

    const playerLabel = `LeBron James ${stat}`;

    // Titre
    const title = document.createElement("div");
    title.className = "odds-title";

    const spanTitle = document.createElement("span");
    spanTitle.textContent = playerLabel;
    spanTitle.style.fontSize = "0.95rem";

    const arrow = document.createElement("span");
    arrow.className = "arrow-right";
    arrow.innerHTML = '<i class="fas fa-chart-line"></i>';
    arrow.onclick = () => openPopup(stat);

    title.appendChild(spanTitle);
    title.appendChild(arrow);
    content.appendChild(title);

    // Blocs de cotes
    const row = document.createElement("div");
    row.className = "mock-odds";

    const overBlock = document.createElement("div");
    overBlock.className = "block";
    overBlock.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
        <i class="fas fa-arrow-up" style="color: #abcf65;"></i>
        <span>Plus de ${bet.over.value}</span>
      </div>
      <div class="odds">${formatOdds(bet.over.odds)}</div>
    `;
    overBlock.onclick = () =>
      toggleBet(overBlock, `${playerLabel} – Plus de ${bet.over.value}`, bet.over.odds);

    const underBlock = document.createElement("div");
    underBlock.className = "block";
    underBlock.innerHTML = `
      <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
        <i class="fas fa-arrow-down" style="color: #e74c3c;"></i>
        <span>Moins de ${bet.under.value}</span>
      </div>
      <div class="odds">${formatOdds(bet.under.odds)}</div>
    `;
    underBlock.onclick = () =>
      toggleBet(underBlock, `${playerLabel} – Moins de ${bet.under.value}`, bet.under.odds);

    row.appendChild(overBlock);
    row.appendChild(underBlock);
    content.appendChild(row);
  });

  // SÉPARATION
  const sep = document.createElement("div");
  sep.style.margin = "2rem 0 1rem";
  content.appendChild(sep);

  // BLOCS ÉQUIPE (Victoire, Total Points)
  lakersBets.forEach(bet => {
    const teamLabel = `Lakers ${bet.stat}`;

    // Titre
    const title = document.createElement("div");
    title.className = "odds-title";
    const spanTitle = document.createElement("span");
    spanTitle.textContent = teamLabel;
    spanTitle.style.fontSize = "0.95rem";
    title.appendChild(spanTitle);
    content.appendChild(title);

    const row = document.createElement("div");
    row.className = "mock-odds";

    if (bet.options) {
      // Cotes type "Victoire"
      bet.options.forEach(opt => {
        const block = document.createElement("div");
        block.className = "block";
        block.innerHTML = `
          <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
            <i class="fas fa-trophy" style="color: #f39c12;"></i>
            <span>${opt.label}</span>
          </div>
          <div class="odds">${formatOdds(opt.odds)}</div>
        `;
        block.onclick = () =>
          toggleBet(block, `${teamLabel} – ${opt.label}`, opt.odds);
        row.appendChild(block);
      });
    } else {
      // Cotes type over/under équipe
      const over = document.createElement("div");
      over.className = "block";
      over.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          <i class="fas fa-arrow-up" style="color: #abcf65;"></i>
          <span>Plus de ${bet.over.value}</span>
        </div>
        <div class="odds">${formatOdds(bet.over.odds)}</div>
      `;
      over.onclick = () =>
        toggleBet(over, `${teamLabel} – Plus de ${bet.over.value}`, bet.over.odds);

      const under = document.createElement("div");
      under.className = "block";
      under.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
          <i class="fas fa-arrow-down" style="color: #e74c3c;"></i>
          <span>Moins de ${bet.under.value}</span>
        </div>
        <div class="odds">${formatOdds(bet.under.odds)}</div>
      `;
      under.onclick = () =>
        toggleBet(under, `${teamLabel} – Moins de ${bet.under.value}`, bet.under.odds);

      row.appendChild(over);
      row.appendChild(under);
    }

    content.appendChild(row);
  });
}
