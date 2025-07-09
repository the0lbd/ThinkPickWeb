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
        Lakers<br/><span style="font-weight: normal;">Los Angeles</span>
      </div>
      <div style="font-size: 1.2rem;">02:30</div>
      <div style="text-align: right;">
        Celtics<br/><span style="font-weight: normal;">Boston</span>
      </div>
    </div>
    <hr style="margin: 1rem 0; border: 0; border-top: 1px dotted #555;" />
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
    arrow.textContent = "➤";
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
      <div>Plus de ${bet.over.value}</div>
      <div class="odds">Cote : ${formatOdds(bet.over.odds)}</div>
    `;
    overBlock.onclick = () =>
      toggleBet(overBlock, `${playerLabel} – Plus de ${bet.over.value}`, bet.over.odds);

    const underBlock = document.createElement("div");
    underBlock.className = "block";
    underBlock.innerHTML = `
      <div>Moins de ${bet.under.value}</div>
      <div class="odds">Cote : ${formatOdds(bet.under.odds)}</div>
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
          <div>${opt.label}</div>
          <div class="odds">Cote : ${formatOdds(opt.odds)}</div>
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
        <div>Plus de ${bet.over.value}</div>
        <div class="odds">Cote : ${formatOdds(bet.over.odds)}</div>
      `;
      over.onclick = () =>
        toggleBet(over, `${teamLabel} – Plus de ${bet.over.value}`, bet.over.odds);

      const under = document.createElement("div");
      under.className = "block";
      under.innerHTML = `
        <div>Moins de ${bet.under.value}</div>
        <div class="odds">Cote : ${formatOdds(bet.under.odds)}</div>
      `;
      under.onclick = () =>
        toggleBet(under, `${teamLabel} – Moins de ${bet.under.value}`, bet.under.odds);

      row.appendChild(over);
      row.appendChild(under);
    }

    content.appendChild(row);
  });
}
