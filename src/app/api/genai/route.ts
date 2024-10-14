import { StreamingTextResponse , GoogleGenerativeAIStream} from "ai";
import {GoogleGenerativeAI} from '@google/generative-ai'

export async function POST(request:Request) {
  
  try {
    const prompt =
    "Create a list of three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are for an anonymous social messaging platform, like Qooh.me, and should be suitable for a diverse audience. Avoid personal or sensitive topics, focusing instead on universal themes that encourage friendly interaction. For example, your output should be structured like this: 'What’s a hobby you’ve recently started?||If you could have dinner with any historical figure, who would it be?||What’s a simple thing that makes you happy?'. Ensure the questions are intriguing, foster curiosity, and contribute to a positive and welcoming conversational environment.";
  
    const genai = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!)
    const model = genai.getGenerativeModel({model: "gemini-1.5-flash"});
    const streamResponse = await model.generateContentStream(prompt)
    return new StreamingTextResponse(GoogleGenerativeAIStream(streamResponse));
  } catch (error) {
    console.error(error)
  }
}