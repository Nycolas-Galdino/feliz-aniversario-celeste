// Altere apenas esta data caso o ano de início da amizade seja outro.
// O fuso -03:00 mantém 12:50 no horário de Brasília também no GitHub Pages.
const FRIENDSHIP_STARTED_AT = new Date("2026-09-19T12:50:00-03:00");

const timeElements = {
  days: document.querySelector("#days"),
  hours: document.querySelector("#hours"),
  minutes: document.querySelector("#minutes"),
  seconds: document.querySelector("#seconds"),
};

function updateCounter() {
  const elapsed = Math.max(0, Date.now() - FRIENDSHIP_STARTED_AT.getTime());
  const totalSeconds = Math.floor(elapsed / 1000);

  const days = Math.floor(totalSeconds / 86_400);
  const hours = Math.floor((totalSeconds % 86_400) / 3_600);
  const minutes = Math.floor((totalSeconds % 3_600) / 60);
  const seconds = totalSeconds % 60;

  timeElements.days.textContent = String(days).padStart(3, "0");
  timeElements.hours.textContent = String(hours).padStart(2, "0");
  timeElements.minutes.textContent = String(minutes).padStart(2, "0");
  timeElements.seconds.textContent = String(seconds).padStart(2, "0");
}

updateCounter();
setInterval(updateCounter, 1_000);

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 },
);

document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));

const candleButton = document.querySelector("#blow-candles");
const cake = document.querySelector("#cake");
const wishMessage = document.querySelector("#wish-message");

candleButton.addEventListener("click", () => {
  const candlesAreOut = cake.classList.toggle("blown");
  candleButton.textContent = candlesAreOut ? "acender novamente ✦" : "apagar as velinhas ✦";
  wishMessage.textContent = candlesAreOut ? "Pedido feito. Que ele encontre o caminho até você. ♡" : "";

  if (candlesAreOut) {
    createHeartBurst(candleButton);
  }
});

function createHeartBurst(origin) {
  const rect = origin.getBoundingClientRect();
  const symbols = ["♥", "♡", "✦", "✧"];

  for (let index = 0; index < 14; index += 1) {
    const heart = document.createElement("span");
    heart.className = "floating-heart";
    heart.textContent = symbols[index % symbols.length];
    heart.style.left = `${rect.left + rect.width / 2 + (Math.random() - 0.5) * 160}px`;
    // O coração usa position: fixed; por isso, a posição deve ser relativa à viewport.
    heart.style.top = `${rect.top + (Math.random() - 0.5) * 30}px`;
    heart.style.color = index % 2 ? "#f7a8bd" : "#fff8f1";
    heart.style.animationDelay = `${Math.random() * 0.25}s`;
    heart.style.fontSize = `${14 + Math.random() * 18}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 3_000);
  }
}
