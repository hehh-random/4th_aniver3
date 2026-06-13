const visited = new Set();
const achievements = [];

let starsFound = 0;

// ---------------------
// DOM ELEMENTS
// ---------------------

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

// ---------------------
// BACKGROUND MUSIC
// ---------------------

const bgMusic = new Audio("audio/music.mp3");
bgMusic.loop = true;

musicBtn.addEventListener("click", async () => {
try {
await bgMusic.play();
musicBtn.innerText = "🎵 Music Playing";
} catch (err) {
console.error(err);
}
});

// ---------------------
// MEMORY BOOKS
// ---------------------

const memories = document.querySelectorAll(".memory");

memories.forEach(book => {
book.addEventListener("click", () => {

```
    const photo = book.dataset.photo;
    const audio = book.dataset.audio;

    viewer.innerHTML = `
        <img src="${photo}" alt="${book.innerText}">
    `;

    try {
        new Audio(audio).play();
    } catch (err) {
        console.error(err);
    }

    unlock(book.innerText.trim());
});
```

});

// ---------------------
// ACHIEVEMENTS
// ---------------------

function unlock(name) {

```
if (visited.has(name)) return;

visited.add(name);

achievements.push(`📚 Explored: ${name}`);

renderAchievements();
checkFinal();
```

}

function renderAchievements() {

```
achievementsBox.innerHTML =
    achievements
        .map(item => `<div>${item}</div>`)
        .join("");
```

}

function checkFinal() {

```
const required = [
    "First Adventure",
    "Best Day Ever",
    "Secret Book",
    "Star Hunter"
];

const complete =
    required.every(item => visited.has(item));

if (complete) {
    finalChapter.classList.remove("hidden");
}
```

}

// ---------------------
// RANDOM MEMORY MESSAGES
// ---------------------

const messages = [
"I still laugh about that day.",
"You looked amazing that night.",
"One of my favorite memories.",
"You're my favorite person."
];

randomBtn.addEventListener("click", () => {

```
const random =
    messages[Math.floor(Math.random() * messages.length)];

randomText.innerText = random;
```

});

// ---------------------
// SECRET BOOK
// ---------------------

const secretBook = document.querySelector(".secret");

if (secretBook) {

```
secretBook.addEventListener("click", () => {

    const answer = prompt("Password?");

    if (answer === "pineapple") {

        unlock("Secret Book");

        alert("Unlocked ❤️");

    } else {

        alert("Wrong password.");
    }
});
```

}

// ---------------------
// COUNTDOWN
// ---------------------

const targetDate = new Date("2027-04-10T00:00:00");

function updateCountdown() {

```
const now = new Date();
const diff = targetDate - now;

if (diff <= 0) {

    countdown.innerText = "Today ❤️";
    return;
}

const days =
    Math.floor(diff / (1000 * 60 * 60 * 24));

countdown.innerText = `${days} days`;
```

}

updateCountdown();
setInterval(updateCountdown, 1000);

// ---------------------
// STAR HUNT GAME
// ---------------------

for (let i = 0; i < 5; i++) {

```
const star = document.createElement("div");

star.className = "star";
star.innerHTML = "⭐";

star.style.left = Math.random() * 90 + "%";
star.style.top = Math.random() * 90 + "%";

document.body.appendChild(star);

star.addEventListener("click", () => {

    star.remove();

    starsFound++;

    if (starsFound === 5) {

        loveLetter.classList.remove("hidden");

        unlock("Star Hunter");
    }
});
```

}

// ---------------------
// 100 REASONS
// ---------------------

const reasonsList = Array.from(
{ length: 100 },
(_, i) => `Reason #${i + 1}: You make life better.`
);

for (let i = 1; i <= 100; i++) {

```
const book = document.createElement("div");

book.className = "reason";
book.innerText = `Book ${i}`;

book.addEventListener("click", () => {
    alert(reasonsList[i - 1]);
});

reasons.appendChild(book);
```

}

// ---------------------
// AI CHAT
// ---------------------

async function askAI(message) {

```
try {

    const res = await fetch("/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            message
        })
    });

    const data = await res.json();

    return data.reply;

} catch (err) {

    console.error(err);

    return "Sorry, I couldn't respond right now.";
}
```

}

sendBtn.addEventListener("click", async () => {

```
const text = messageInput.value.trim();

if (!text) return;

chatBox.innerHTML += `
    <div><strong>You:</strong> ${text}</div>
`;

messageInput.value = "";

const reply = await askAI(text);

chatBox.innerHTML += `
    <div><strong>Future Us:</strong> ${reply}</div>
`;

chatBox.scrollTop = chatBox.scrollHeight;
```

});

messageInput.addEventListener("keydown", async (e) => {

```
if (e.key === "Enter") {
    sendBtn.click();
}
```

});
