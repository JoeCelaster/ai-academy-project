import dotenv from 'dotenv';
dotenv.config({ path: './.env' });

import express from 'express';
import webhookRouter from './webhook';


const app = express()
app.use(express.json())
app.use("/webhook", webhookRouter);

app.use("/", (req, res)=>{
    res.status(200).send("joe")
})
const PORT = process.env.PORT || 3000;
console.log("PORT from env:", process.env.PORT);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});