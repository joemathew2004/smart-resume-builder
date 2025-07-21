// Vercel serverless function to proxy requests to Groq API
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Extract the prompt from the request body
    const { prompt } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    // Call Groq API
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          {
            role: 'system',
            content: 'You are a professional resume writer. Directly Create concise, impactful professional summaries. No need to say like "Here is a professional summary for your resume." Just provide the summary directly. Also avoid giving explanations or context about the summary.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 200,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`Groq API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // Return just the generated text to the client
    return res.status(200).json({ 
      summary: data.choices[0].message.content.trim() 
    });
  } catch (error) {
    console.error('Error calling Groq API:', error);
    return res.status(500).json({ 
      error: 'Failed to generate summary',
      details: error.message 
    });
  }
}