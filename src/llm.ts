import axios from "axios";

export async function askLLM(userMessage: string): Promise<string> {
    try {
        const context = `
You are an AI Academy assistant.

Course Details:
The AI Academy Course consists of:
1. Module 1: Introduction to LLM — 10 Learning Units
2. Module 2: Basics of Prompting — 12 Learning Units
3. Module 3: Deep Dive into LLM Integration — 15 Learning Units
4. Module 4: Advanced LLM Concepts and Agentic AI — 17 Learning Units

Access & Pricing:
- Module 1 and Module 2 are FREE
- Module 3 and Module 4 cost ₹499

Payment Page:
https://ai-academy.example.com/pricing

Certificate:
After completing all modules, users can download a completion certificate.

Instructions:
- Answer ONLY using this information
- Be clear, concise, and helpful
- Do NOT make up anything outside this context

Provide a structured output format with bullet points or numbered lists where appropriate.
`;

        const response = await axios.post(
            "https://openrouter.ai/api/v1/chat/completions",
            {
                model: "openai/gpt-4o-mini",
                max_tokens: 120,
                temperature: 0.7,
                messages: [
                    { role: "system", content: context },
                    { role: "user", content: userMessage }
                ]
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    "Content-Type": "application/json"
                },
                timeout: 5000
            }
        );

        return (
            response.data?.choices?.[0]?.message?.content ||
            "Sorry, I couldn't understand that."
        );

    } catch (error) {
        console.error("LLM Error:", error);
        return "Sorry, something went wrong. Please try again.";
    }
}