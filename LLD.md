# AI Academy WhatsApp Chatbot - Low-Level Design (LLD)

---

## 1. Idea

A WhatsApp chatbot that answers queries about the AI Academy course using an LLM and guides users to enrollment.

**Entry requirement**

```txt
AI-Academy
```

**Response**

```txt
Thank you for reaching out to the AI Academy! How can I help you today?
```

---

## 2. Architecture

```txt
User (WhatsApp)
  ↓
Whapi (Webhook is triggered)
  ↓
Express (/webhook endpoint is called)
  ↓
Processing (entry, loop check, message validation)
  ↓
LLM (OpenAI model called)
  ↓
Whapi API (send reply to user)
```

---

## 3. Webhook Trigger

Whapi sends a POST request to (ngrok URL is used because whapi supports only production domains):

```txt
https://detection-umbrella-paddling.ngrok-free.dev/webhook
```

Sample payload:

```json
{
  "messages": [
    {
      "from": "user_number",
      "from_me": false,
      "text": { "body": "Hello" }
    }
  ]
}
```

---

## 4. Folder Structure

```txt
src/
  server.ts
  webhook.ts
  llm.ts
  whatsapp.ts
.env
package.json
LLD.md
```

---

## 5. File Responsibilities

**server.ts**

* Start Express, mount `/webhook`

**webhook.ts**

* Parse payload
* Entry control (`AI-Academy`)
* Ignore `from_me`
* Call LLM
* Send reply

**llm.ts**

* Call OpenAI with course context
* Config:

```ts
max_tokens: 120,
temperature: 0.7
```

**whatsapp.ts**

* Send messages via Whapi

---

## 6. Avoiding Number Ban

* Respond only to incoming messages
* Ignore bot messages:

```ts
if (isFromMe) return;
```

* Keep replies short (`max_tokens: 120`)
* Add small delay:

```ts
await delay(1000);
```

* No bulk/broadcast messaging
* Test with limited users

---

## 7. AI API Control

* Limit output size (`max_tokens`)
* Call LLM only for valid inputs
* Constrain responses with course context
* Handle errors with fallback message

---

## 8. User Entry Control

```ts
if (message === "AI-Academy") {
  activeUsers.add(from);
}
```

```ts
if (!activeUsers.has(from)) {
  sendMessage("Please send AI-Academy to start the conversation");
}
```

```ts
const activeUsers = new Set<string>();
```

---

## Conclusion

* Event-driven via webhook
* Safe messaging practices
* Controlled LLM usage
* Clear onboarding flow
