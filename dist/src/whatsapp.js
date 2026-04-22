"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = sendMessage;
const axios_1 = __importDefault(require("axios"));
async function sendMessage(to, body) {
    await axios_1.default.post("https://gate.whapi.cloud/messages/text", {
        to, body
    }, {
        headers: {
            Authorization: `Bearer ${process.env.WHAPI_TOKEN}`,
            "Content-Type": "application/json"
        }
    });
}
