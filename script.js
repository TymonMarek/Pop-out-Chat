// Constants
const chatButton = document.querySelector("#chatOpen");
const chatWindow = document.querySelector("#chatWindow");
const chatForm = chatWindow.querySelector("#chatForm");
const chatClose = chatWindow.querySelector("#chatClose");
const chatInput = chatWindow.querySelector("#chatInput");
const chatSend = chatWindow.querySelector("#chatSend");
const chatMessages = chatWindow.querySelector("#chatMessages");

const recipientMessageTemplate = document.querySelector("template#recipientMessage");
const senderMessageTemplate = document.querySelector("template#senderMessage");
const infoMessageTemplate = document.querySelector("template#infoMessage");
const typingIndicatorTemplate = document.querySelector("template#typingIndicator");

const replies = [
  "I'm not a real person..",
  "I am just a bunch of 1's & 0's.",
  "I wish I could understand you.",
  "I tried to implement ChatGPT but got lazy... 🫠",
  "Hello, world!",
  "I am a chatbot.",
  "Beep boop. 🤖",
  "I forgot to add a 'no' response.",
  "Let's talk about something else.",
  "Ah, I see.",
  "Oh, really?",
  "How interesting.",
];

// Variables
let messageDebouce = true;

// Functions
function createRecipientMessage(message) {
  let recipientMessage = recipientMessageTemplate.content.cloneNode(true);
  recipientMessage.querySelector("#messageText").textContent = message;
  recipientMessage.querySelector("#messageTime").textContent = new Date().toLocaleTimeString();
  chatMessages.appendChild(recipientMessage);
}

function createSenderMessage(message) {
  let senderMessage = senderMessageTemplate.content.cloneNode(true);
  senderMessage.querySelector("#messageText").textContent = message;
  senderMessage.querySelector("#messageTime").textContent = new Date().toLocaleTimeString();
  chatMessages.appendChild(senderMessage);
}

function createInfoMessage(message) {
  let infoMessage = infoMessageTemplate.content.cloneNode(true);
  infoMessage.querySelector("#infoText").textContent = message;
  chatMessages.appendChild(infoMessage);
}

function createTypingIndicator() {
  let typingIndicator = document.createElement("div");
  typingIndicator.innerHTML = recipientMessageTemplate.innerHTML;
  typingIndicator.querySelector("#messageText").textContent = "...";
  typingIndicator.querySelector("#messageTime").textContent = new Date().toLocaleTimeString();
  typingIndicator.classList.add("typing-indicator");
  chatMessages.appendChild(typingIndicator);
}

// Events
chatButton.addEventListener("click", function () {
  let chatBox = document.querySelector("#chatWindow");
  chatBox.classList.toggle("hidden");
  chatButton.classList.toggle("hidden");
});

chatForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (messageDebouce) return;

  let message = chatInput.value;

  if (message != "" && message != null) {
    chatSend.classList.toggle("clicked");

    createSenderMessage(message);
    chatInput.value = "";
    messageDebouce = true;

    let reply = replies[Math.floor(Math.random() * replies.length)];
    let thinkingDuration = reply.length * 50 + 1000;

    createTypingIndicator();

    setTimeout(function () {
      chatMessages.querySelector(".typing-indicator").remove();
      createRecipientMessage(reply);
      messageDebouce = false;
    }, thinkingDuration);
  } else {
    return;
  }
});

chatClose.addEventListener("click", function () {
  chatWindow.classList.toggle("hidden");
  chatButton.classList.toggle("hidden");
});

// Init
createInfoMessage("You are now connected to the chat.");
createInfoMessage("Say something to get started!");
messageDebouce = false;
