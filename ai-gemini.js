// node --version # Should be >= 18
// npm install @google/generative-ai
const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const MODEL_NAME = "gemini-1.5-pro-latest";
const API_KEY = ""; // Ganti dengan API key Anda

async function runChat() {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME });

  const generationConfig = {
    temperature: 1,
    topK: 0,
    topP: 0.95,
    maxOutputTokens: 8192,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
  });

  const chat = model.startChat({
    generationConfig,
    safetySettings,
  });

  const sendMessage = async (userInput) => {
    const result = await chat.sendMessage(userInput);
    const response = result.response;
    console.log("AI:", response.text());
  }

  const askQuestion = () => {
    readline.question("You: ", async (userInput) => {
      if (userInput.toLowerCase() === 'exit') {
        readline.close();
        return;
      }
      await sendMessage(userInput);
      askQuestion();
    });
  }

  askQuestion();
}

runChat();
    
