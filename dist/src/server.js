"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({ path: './.env' });
const express_1 = __importDefault(require("express"));
const webhook_ts_1 = __importDefault(require("./webhook.ts"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/webhook", webhook_ts_1.default);
app.use("/", (req, res) => {
    res.status(200).send("joe");
});
const PORT = process.env.PORT || 3000;
console.log("PORT from env:", process.env.PORT);
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
