import ModelClient, { isUnexpected } from "@azure-rest/ai-inference";
import { AzureKeyCredential } from "@azure/core-auth";
import { Promt } from "../model/promt.model.js";

const token = process.env.GITHUB_TOKEN;
const endpoint = "https://models.github.ai/inference";
const model = "deepseek/DeepSeek-R1-0528";

export const sendPromt = async (req, res) => {
  const { content } = req.body;
  const userId = req.userId;

  if (!content || content.trim() === "") {
    return res.status(400).json({ errors: "Prompt content is required" });
  }

  try {
    // Save user prompt to database
    const userPromt = await Promt.create({
      userId,
      role: "user",
      content,
    });

    // Initialize Azure AI client
    const client = ModelClient(
      endpoint,
      new AzureKeyCredential(token),
    );

    // Send request to DeepSeek model
    const response = await client.path("/chat/completions").post({
      body: {
        messages: [
          { role: "user", content }
        ],
        max_tokens: 2048,
        model: model
      }
    });

    if (isUnexpected(response)) {
      throw response.body.error || new Error("API request failed");
    }

    const aiContent = response.body.choices[0].message.content;

    // Save AI response to database
    const aiMessage = await Promt.create({
      userId,
      role: "assistant",
      content: aiContent,
    });

    return res.status(200).json({ reply: aiContent });

  } catch (error) {
    console.error("Error:", error);
    return res.status(500).json({
      error: "AI request failed",
      details: error.message,
    });
  }
};