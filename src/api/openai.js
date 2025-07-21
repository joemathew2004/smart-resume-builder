// This file handles API calls to our backend serverless function for generating resume summaries
// The backend function will securely call the Groq API

/**
 * Generates a professional summary using Groq's API
 * @param {string} prompt - The prompt to send to Groq
 * @returns {Promise<string>} - The generated summary
 */
export const generateSummary = async (prompt) => {
  try {
    // Call our serverless function instead of Groq directly
    const response = await fetch('/api/generate-summary', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ prompt })
    });

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }

    const data = await response.json();
    
    // If our API returns an error, fall back to mock response
    if (data.error) {
      console.warn('API error:', data.error);
      return mockGenerateSummary(prompt);
    }
    
    let summary = data.summary;
    
    // Clean up the summary by removing common AI prefixes and explanations
    summary = cleanupSummary(summary);
    
    return summary;
  } catch (error) {
    console.error('Error calling Groq API:', error);
    
    // Fallback to mock response in case of error
    return mockGenerateSummary(prompt);
  }
};

/**
 * Provides a mock summary when API is unavailable
 * @param {string} prompt - The input prompt with user information
 * @returns {string} - A personalized professional summary
 */
const mockGenerateSummary = (prompt) => {
  // Extract keywords for personalization
  const keywords = extractKeywords(prompt);
  return generatePersonalizedSummary(keywords);
};

/**
 * Cleans up AI-generated summaries by removing common prefixes and explanations
 * @param {string} summary - The raw AI-generated summary
 * @returns {string} - The cleaned summary
 */
const cleanupSummary = (summary) => {
  // Remove common prefixes
  const prefixesToRemove = [
    "Here is a professional resume summary for the individual:",
    "Here's a professional summary for your resume:",
    "Professional Summary:",
    "Here is a concise professional summary:",
    "Here's a professional resume summary:"
  ];
  
  let cleaned = summary;
  
  // Remove prefixes
  for (const prefix of prefixesToRemove) {
    if (cleaned.startsWith(prefix)) {
      cleaned = cleaned.substring(prefix.length).trim();
    }
  }
  
  // Remove quotes if they wrap the entire summary
  if (cleaned.startsWith('"') && cleaned.endsWith('"')) {
    cleaned = cleaned.substring(1, cleaned.length - 1).trim();
  }
  
  // Remove explanations that often appear at the end
  const explanationPatterns = [
    /This summary (aims|highlights|showcases|emphasizes).*/i,
    /The above summary (highlights|showcases|emphasizes).*/i,
    /This professional summary (aims|highlights|showcases|emphasizes).*/i
  ];
  
  for (const pattern of explanationPatterns) {
    cleaned = cleaned.replace(pattern, '').trim();
  }
  
  return cleaned;
};

/**
 * Extracts relevant keywords from the prompt
 * @param {string} prompt - The input prompt with user information
 * @returns {Object} - Extracted keywords and fields
 */
const extractKeywords = (prompt) => {
  const keywords = {
    skills: [],
    industries: [],
    positions: [],
    education: []
  };
  
  // Extract skills
  if (prompt.includes('Skills:')) {
    const skillsSection = prompt.split('Skills:')[1].split('\n')[0];
    keywords.skills = skillsSection
      .split(',')
      .map(skill => skill.trim())
      .filter(skill => skill.length > 0);
  }
  
  // Extract positions
  const positionMatches = prompt.match(/- ([\w\s]+) at/g);
  if (positionMatches) {
    keywords.positions = positionMatches
      .map(match => match.replace('- ', '').replace(' at', '').trim())
      .filter(position => position.length > 0);
  }
  
  // Extract education fields
  const educationMatches = prompt.match(/in ([\w\s]+) from/g);
  if (educationMatches) {
    keywords.education = educationMatches
      .map(match => match.replace('in ', '').replace(' from', '').trim())
      .filter(field => field.length > 0);
  }
  
  return keywords;
};

/**
 * Generates a personalized summary based on extracted keywords
 * @param {Object} keywords - Extracted keywords from the prompt
 * @returns {string} - A personalized professional summary
 */
const generatePersonalizedSummary = (keywords) => {
  // Base templates
  const templates = [
    "Dedicated professional with expertise in {skills}. Brings valuable experience as a {position} with a strong educational background in {education}. Known for delivering exceptional results through analytical thinking and creative problem-solving.",
    "Results-driven {position} professional with a proven track record in {skills}. Leverages strong {education} knowledge to implement innovative solutions. Committed to excellence and continuous improvement in all professional endeavors.",
    "Versatile and analytical professional specializing in {skills}. Experienced {position} with a solid foundation in {education}. Excels at translating complex concepts into actionable strategies and driving measurable outcomes."
  ];
  
  // Select a random template
  let template = templates[Math.floor(Math.random() * templates.length)];
  
  // Fill in the template with keywords
  if (keywords.skills.length > 0) {
    const selectedSkills = keywords.skills.slice(0, 3).join(', ');
    template = template.replace('{skills}', selectedSkills);
  } else {
    template = template.replace('{skills}', 'various technical and soft skills');
  }
  
  if (keywords.positions.length > 0) {
    template = template.replace('{position}', keywords.positions[0]);
  } else {
    template = template.replace('{position}', 'experienced');
  }
  
  if (keywords.education.length > 0) {
    template = template.replace('{education}', keywords.education[0]);
  } else {
    template = template.replace('{education}', 'professional');
  }
  
  return template;
};

/**
 * For development purposes - checks if the API integration is properly configured
 * @returns {boolean} - Whether the API is available
 */
export const isOpenAIConfigured = () => {
  return true; // We're always configured since we use a serverless function
};