
import { GoogleGenAI } from "@google/genai";

export const generateLoveLetter = async (params: {
  mood: string;
  event: string;
  recipient: string;
  messageType: string;
}) => {
  // Khởi tạo client mỗi lần gọi để đảm bảo lấy đúng API_KEY từ env
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const systemInstruction = `Bạn là một nhà văn lãng mạn và tinh tế, chuyên viết những lời nhắn yêu thương, lời chúc và những đoạn nhật ký cho các cặp đôi. 
  Ngôn ngữ sử dụng phải chân thành, ngọt ngào, có chút thơ mộng nhưng vẫn hiện đại. Hãy viết bằng tiếng Việt.`;

  const userPrompt = `Hãy viết một ${params.messageType} gửi cho ${params.recipient}. 
  Bối cảnh: ${params.event}. 
  Tâm trạng: ${params.mood}. 
  Yêu cầu: Viết khoảng 3-4 câu ngắn gọn, súc tích nhưng chứa đựng nhiều tình cảm. Thêm một vài biểu tượng cảm xúc phù hợp.`;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction,
        temperature: 0.9,
      },
    });

    return response.text?.trim() || 'Không thể tạo được nội dung vào lúc này.';
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
};
