const visited = new Set();
const achievements = [];

let starsFound = 0;

const viewer = document.getElementById("viewer");
const achievementsBox = document.getElementById("achievements");
const randomBtn = document.getElementById("randomBtn");
const randomText = document.getElementById("randomText");
const countdown = document.getElementById("countdown");
const loveLetter = document.getElementById("loveLetter");
const finalChapter = document.getElementById("finalChapter");
const reasons = document.getElementById("reasons");
const musicBtn = document.getElementById("musicBtn");
const chatBox = document.getElementById("chatBox");
const messageInput = document.getElementById("message");
const sendBtn = document.getElementById("send");

/* ---------------- MUSIC ---------------- */

const bgMusic = new Audio("audio/music.mp3");
bgMusic.loop = true;

musicBtn.addEventListener("click", async () => {
    try {
        await bgMusic.play();
        musicBtn.textContent = "🎵 Music Playing";
    } catch (err) {
        console.error(err);
    }
});

/* ---------------- ACHIEVEMENTS ---------------- */

function unlock(name) {

    if (visited.has(name)) return;

    visited.add(name);

    achievements.push(`📚 Explored: ${name}`);

    renderAchievements();
    checkFinal();
}

function renderAchievements() {

    achievementsBox.innerHTML = achievements
        .map(a => `<div>${a}</div>`)
        .join("");
}

function checkFinal() {

    const required = [
        "First Adventure",
        "Best Day Ever",
        "Secret Book",
        "Star Hunter"
    ];

    const complete = required.every(item =>
        visited.has(item)
    );

    if (complete) {
        finalChapter.classList.remove("hidden");
    }
}

/* ---------------- MEMORY BOOKS ---------------- */

document.querySelectorAll(".memory").forEach(book => {

    book.addEventListener("click", () => {

        const photo = book.dataset.photo;
        const audio = book.dataset.audio;
        const name = book.dataset.name;

        viewer.innerHTML =
            `<img src="${photo}" alt="${name}">`;

        if (audio) {
            new Audio(audio).play().catch(console.error);
        }

        unlock(name);
    });
});

/* ---------------- SECRET BOOK ---------------- */

const secretBook = document.querySelector(".secret");

secretBook.addEventListener("click", () => {

    const answer = prompt("Password?");

    if (answer === "pineapple") {

        unlock("Secret Book");

        alert("Unlocked ❤️");

    } else {

        alert("Wrong password");
    }
});

/* ---------------- RANDOM MESSAGES ---------------- */

const messages = [
    "I still laugh about that day.",
    "You looked amazing that night.",
    "One of my favorite memories.",
    "You're my favorite person."
];

randomBtn.addEventListener("click", () => {

    const random =
        messages[Math.floor(Math.random() * messages.length)];

    randomText.textContent = random;
});

/* ---------------- COUNTDOWN ---------------- */

const targetDate = new Date("2027-04-10");

function updateCountdown() {

    const now = new Date();

    const diff = targetDate - now;

    if (diff <= 0) {
        countdown.textContent = "Today ❤️";
        return;
    }

    const days =
        Math.floor(diff / (1000 * 60 * 60 * 24));

    countdown.textContent = `${days} days`;
}

updateCountdown();

setInterval(updateCountdown, 60000);

/* ---------------- STAR HUNT ---------------- */

for (let i = 0; i < 5; i++) {

    const star = document.createElement("div");

    star.className = "star";
    star.textContent = "⭐";

    star.style.left =
        Math.random() * 90 + "%";

    star.style.top =
        Math.random() * 90 + "%";

    document.body.appendChild(star);

    star.addEventListener("click", () => {

        star.remove();

        starsFound++;

        if (starsFound === 5) {

            loveLetter.classList.remove("hidden");

            unlock("Star Hunter");
        }
    });
}

/* ---------------- REASONS ---------------- */

const reasonsList = Array.from(
    { length: 100 },
    (_, i) =>
        `Reason #${i + 1}: You make life better.`
);

for (let i = 0; i < 100; i++) {

    const book = document.createElement("div");

    book.className = "reason";
    book.textContent = `Book ${i + 1}`;

    book.addEventListener("click", () => {
        alert(reasonsList[i]);
    });

    reasons.appendChild(book);
}

/* ---------------- CHAT ---------------- */

function addMessage(sender, text) {

    const div = document.createElement("div");

    div.innerHTML =
        `<strong>${sender}:</strong> ${text}`;

    chatBox.appendChild(div);

    chatBox.scrollTop =
        chatBox.scrollHeight;
}

sendBtn.addEventListener("click", () => {

    const text =
        messageInput.value.trim();

    if (!text) return;

    addMessage("You", text);

    messageInput.value = "";

    setTimeout(() => {

        addMessage(
            "Future Us",
            "I love remembering our adventures ❤️"
        );

    }, 500);
});

messageInput.addEventListener("keydown", e => {

    if (e.key === "Enter") {
        sendBtn.click();
    }
});