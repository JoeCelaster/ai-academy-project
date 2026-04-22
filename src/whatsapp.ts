declare const process: any;

import axios from 'axios';

export async function sendMessage(to:string, body:string): Promise<void>  {
    await axios.post("https://gate.whapi.cloud/messages/text",
        {
            to,body 
        },
        {
            headers:{
                Authorization:`Bearer ${process.env.WHAPI_TOKEN}`,
                "Content-Type": "application/json"
            }
        }
    )   
}