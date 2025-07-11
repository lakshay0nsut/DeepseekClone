# 🧠 DeepSeek Chat API Integration

A Node.js backend API that integrates with **DeepSeek's AI models** via GitHub's **Azure Inference API**, enabling seamless chat functionality with user authentication and conversation history.

---

## 🚀 Features

- 💬 Chat with DeepSeek AI models
- 🔐 JWT-based user authentication
- 📝 Save user prompts & AI responses
- ⚡ Fast API responses via Azure's inference endpoint

---

## 🛠️ Tech Stack

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Azure](https://img.shields.io/badge/Azure-0089D6?style=for-the-badge&logo=microsoft-azure&logoColor=white)

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/deepseek-chat-api.git

# 2. Navigate into the project
cd deepseek-chat-api

# 3. Install dependencies
npm install


⚙️ Configuration
Create a .env file in the root directory and add the following:

env
Copy
Edit
# .env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GITHUB_TOKEN=your_github_azure_inference_token
COOKIE_DOMAIN=.yourdomain.com


📡 API Endpoints
Endpoint	Method	Description
/api/chat	POST	Submit a prompt to DeepSeek
/api/logout	POST	Clear authentication cookie


🧪 Usage Example
javascript
Copy
Edit
// Sample API request
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${jwtToken}`
  },
  body: JSON.stringify({
    content: "Explain quantum computing simply"
  })
});

const data = await response.json();
console.log(data);


📸 Screenshots
Add your screenshots to a screenshots/ folder in your repo




🧩 Configuration Options
Environment Variable	Required	Description
GITHUB_TOKEN	✅	Azure AI inference API token
COOKIE_DOMAIN	❌	Domain for auth cookies (production use)
NODE_ENV	❌	Set to "production" to enable HTTPS

🙌 Credits
DeepSeek – AI models

Azure AI Inference – Hosting infrastructure

GitHub – API gateway

📄 License
MIT © YourName 2024

📘 Notes
Replace all placeholder values like yourusername, yourdomain.com, and YourName.

Add images in the screenshots/ folder and ensure correct paths.

Customize badges as needed (shields.io).

yaml
Copy
Edit

---

Let me know if you’d like me to:
- Add a contribution guide section,
- Include Postman collection usage,
- Generate a `docs/` folder for GitHub Pages,
- Or convert this into an HTML landing page.

I'm happy to help!








Ask ChatGPT



Tools



ChatGP
