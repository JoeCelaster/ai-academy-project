"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const whatsapp_1 = require("./whatsapp");
const llm_1 = require("./llm");
const router = express_1.default.Router();
// 🧠 track users who activated bot
const activeUsers = new Set();
router.post("/", async (req, res) => {
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
            await (0, whatsapp_1.sendMessage)(from, "Thank you for reaching out to the AI Academy! How can I help you today?");
            return res.sendStatus(200);
        }
        // 🚫 block users who didn't start properly
        if (!activeUsers.has(from)) {
            // Do nothing, just ignore
            return res.sendStatus(200);
        }
        // 🤖 AI response
        const reply = await (0, llm_1.askLLM)(message);
        await (0, whatsapp_1.sendMessage)(from, reply);
        return res.sendStatus(200);
    }
    catch (error) {
        console.error(error);
        return res.sendStatus(500);
    }
});
exports.default = router;
