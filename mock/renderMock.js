import { lebronBets, lakersBets } from './data.js';
import { addToCart } from '../script.js';

// Fonction pour gérer l'ajout/retrait de sélection
function toggleBet(element, label, value) {
  element.classList.toggle("selected");
  addToCart(label, value);
}

// Format arrondi en x.xx
const formatOdds = (value) => parseFloat(value).toFixed(2);

export function renderMockView(targetElement = null) {
  const content = targetElement || document.getElementById("main-screen");
  
  if (!content) {
    console.error("Target element not found for renderMockView");
    return;
  }
  
  content.innerHTML = "";

  // HEADER MATCH
  const matchHeader = document.createElement("div");
  matchHeader.className = "mock-match";
  matchHeader.innerHTML = `
    <div class="match-header-compact">
      <div class="match-date-hour">
        <span class="match-date">Aujourd'hui</span>
        <span class="match-hour">02:30</span>
      </div>
      <div class="match-teams-row">
        <div class="team team-left">
          <div class="team-badge" style="background:#552583; color:#FDB927;">LAL</div>
          <div class="team-info">
            <div class="team-name">Lakers</div>
            <div class="team-city">Los Angeles</div>
          </div>
        </div>
        <div class="vs-separator">vs</div>
        <div class="team team-right">
          <div class="team-badge" style="background:#007A33; color:#fff;">BOS</div>
          <div class="team-info">
            <div class="team-name">Celtics</div>
            <div class="team-city">Boston</div>
          </div>
        </div>
      </div>
    </div>
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
