import { NextApiRequest, NextApiResponse } from "next";
import Anthropic from "@anthropic-ai/sdk";
import { GetPromptFromTone } from "../lib/prompts";
export const dynamic = "force-dynamic";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Logic for the `/api/hello` endpoint
export async function GET(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Sending our request using the Fetch API
    const createChatCompletionRes = await anthropic.messages.create({
      model: "claude-3-opus-20240229",
      max_tokens: 4096,
      messages: [
        {
          role: "user",
          content: GetPromptFromTone(req.body.tone, req.body.promptText),
        },
      ],
    });
    // Sending a successful response for our endpoint
    res
      .status(200)
      .json({ completion: createChatCompletionRes.content[0].text });
  } catch (error: any) {
    // Error handling

    // Server-side error logging
    console.error(`Thrown error: ${error.message}
Status code: ${error.statusCode}
Error: ${JSON.stringify(error.body)}
`);

    // Sending an unsuccessful response for our endpoint
    res
      .status(error.statusCode || 500)
      .json({ error: { message: "An error has occurred" } });
  }
}

export default GET;
