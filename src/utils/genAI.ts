import { GoogleGenerativeAI  } from "@google/generative-ai";

import * as dotenv from "dotenv";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export { genAI };