import express from "express";
import type { Request, Response } from "express";
import { sendMessage } from "./whatsapp";
import { askLLM } from "./llm";

const router = express.Router();

// 🧠 track users who activated bot
const activeUsers = new Set<string>();

router.post("/", async (req: Request, res: Response) => {
  try {
    const msg = req.body?.messages?.[0];

    const message = msg?.text?.body;
    const from = msg?.from;
    const isFromMe = msg?.from_me;

    // ignore bot messages
    if (isFromMe) {
      return res.sendStatus(200);
    }

    if (!message || !from) {
      return res.sendStatus(200);
    }

    console.log("User message:", message);

    // ENTRY POINT
    if (message === "AI-Academy") {
      activeUsers.add(from);

      await sendMessage(
        from,
        "Thank you for reaching out to the AI Academy! How can I help you today?"
      );

      return res.sendStatus(200);
    }

    // 🚫 block users who didn't start properly
    if (!activeUsers.has(from)) {
      // Do nothing, just ignore
      return res.sendStatus(200);
    }

    // 🤖 AI response
    const reply = await askLLM(message);
    await sendMessage(from, reply);

    return res.sendStatus(200);

  } catch (error) {
    console.error(error);
    return res.sendStatus(500);
  }
});

export default router;