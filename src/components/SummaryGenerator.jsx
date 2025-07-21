import React, { useState } from 'react';
import { Button, TextField, Typography, Box, CircularProgress, Paper } from '@mui/material';
import { generateSummary } from '../api/openai';

const SummaryGenerator = ({ formData, onSummaryGenerated }) => {
  const [loading, setLoading] = useState(false);
  const [generatedSummary, setGeneratedSummary] = useState('');
  const [error, setError] = useState('');

  const handleGenerateSummary = async () => {
    setLoading(true);
    setError('');
    
    try {
      // Extract relevant information from formData
      const { experience, education, skills } = formData;
      
      // Create a prompt for the AI
      const prompt = `Generate a professional resume summary for a person with the following background:
      
      Experience:
      ${experience.map(exp => `- ${exp.position} at ${exp.company} (${exp.startDate} - ${exp.endDate})`).join('\\n')}
      
      Education:
      ${education.map(edu => `- ${edu.degree} in ${edu.field} from ${edu.institution}, ${edu.graduationDate}`).join('\\n')}
      
      Skills:
      ${skills}
      
      Please directly create a concise, professional summary paragraph highlighting strengths and career focus. No need to say "Here is a professional summary for your resume." Just provide the summary directly. Avoid giving explanations or context about the summary.`;
      
      // Call the OpenAI API
      const summary = await generateSummary(prompt);
      
      setGeneratedSummary(summary);
      onSummaryGenerated(summary);
    } catch (err) {
      console.error('Error generating summary:', err);
      setError('Failed to generate summary. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleManualEdit = (e) => {
    setGeneratedSummary(e.target.value);
    onSummaryGenerated(e.target.value);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, mb: 4, borderRadius: 2 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold" color="primary.main" textAlign="center">
        Professional Summary Generator
      </Typography>
      
      <Typography variant="body1" color="text.secondary" paragraph textAlign="center" sx={{ mb: 3 }}>
        Let AI help you create a compelling professional summary based on your experience and skills
      </Typography>
      
      <Box mb={4} textAlign="center">
        <Button 
          variant="contained" 
          color="secondary"
          onClick={handleGenerateSummary}
          disabled={loading}
          sx={{ px: 3, py: 1.2 }}
          size="large"
          startIcon={loading ? <CircularProgress size={20} color="inherit" /> : null}
        >
          {loading ? 'Generating...' : 'Generate AI Summary'}
        </Button>
      </Box>
      
      {error && (
        <Typography color="error" variant="body2" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      
      {(generatedSummary || loading) && (
        <Box mt={3}>
          <Typography variant="subtitle1" gutterBottom>
            Generated Summary:
          </Typography>
          <TextField
            fullWidth
            multiline
            rows={4}
            value={generatedSummary}
            onChange={handleManualEdit}
            placeholder={loading ? "Generating summary..." : "Your professional summary will appear here"}
            disabled={loading}
          />
          <Typography variant="caption" color="textSecondary" sx={{ mt: 1, display: 'block' }}>
            Feel free to edit the generated summary to better match your style and preferences.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default SummaryGenerator;