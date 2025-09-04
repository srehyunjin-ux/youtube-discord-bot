const express = require("express");
const bodyParser = require("body-parser");

// Your ngrok callback URL
const CALLBACK_URL = "https://f0366c35d33b.ngrok-free.app/youtube-webhook";

// Your Discord webhook URL
const DISCORD_WEBHOOK = "https://discordapp.com/api/webhooks/1413029323111141446/lSq1xGl8fs1PGqmyP0uqFLoj805mOwxGtMi96N6qFeP2SXVkWY9RbkKheRqtBSnOs9if";

const app = express();
const PORT = 3000;

app.use(bodyParser.text({ type: "application/atom+xml" }));

// YouTube will call this endpoint
app.post("/youtube-webhook", async (req, res) => {
  console.log("📩 Got update from YouTube!");

  // Send a message to Discord
  await fetch(DISCORD_WEBHOOK, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ content: "⚡ New YouTube notification received!" })
  });

  res.status(200).send("OK");
});

// Start the server
app.listen(PORT, () => {
  console.log("🚀 Webhook server running at http://localhost:${PORT}");
});