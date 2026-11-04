import "dotenv/config";

const getOpenAIAPIResponse = async (message) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GEMINI_API_KEY}`,
    },
    body: JSON.stringify({
      model: "gemini-3.8-flash",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
    }),
  };

  try {
    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/openai/chat/completions",
      options
    );
    const data = await response.json();
    console.log("Status:", response.status);
    console.log("API Response:", data);
    console.log("API Key Loaded:", !!process.env.GEMINI_API_KEY);
    // return data.choices[0].message.content; //reply
    if (!response.ok) {
      throw new Error(data.error?.message || JSON.stringify(data));
    }

    return data.choices?.[0]?.message?.content;
  } catch (err) {
    console.log(err);
  }
};

export default getOpenAIAPIResponse;
