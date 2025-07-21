import React, { useState } from 'react';
import { 
  Container, Typography, Box, Paper, Stepper, Step, StepLabel, Button,
  Card, CardContent, Grid, useTheme
} from '@mui/material';
import ResumeForm from '../components/ResumeForm';
import SummaryGenerator from '../components/SummaryGenerator';
import { useNavigate } from 'react-router-dom';

const steps = ['Fill Resume Details', 'Generate Summary', 'Preview & Export'];

const Home = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();

  const handleFormSubmit = (data) => {
    setFormData(data);
    setActiveStep(1);
  };

  const handleSummaryGenerated = (summary) => {
    setFormData(prev => ({
      ...prev,
      summary
    }));
  };

  const handleNext = () => {
    if (activeStep === 2) {
      navigate('/resume', { state: { formData } });
    } else {
      setActiveStep(prevStep => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep(prevStep => prevStep - 1);
  };

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Box 
          sx={{ 
            textAlign: 'center', 
            mb: 6,
            background: 'linear-gradient(45deg, #3f51b5 30%, #536dfe 90%)',
            py: 6,
            px: 2,
            borderRadius: 2,
            color: 'white',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
            Smart Resume Builder
          </Typography>
          <Typography variant="h5" sx={{ opacity: 0.9, maxWidth: 700, mx: 'auto', mb: 4 }}>
            Create a professional resume in minutes with AI assistance
          </Typography>
          
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 4 }}>
            {steps.map((step, index) => (
              <Grid item xs={12} sm={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    bgcolor: 'rgba(255, 255, 255, 0.9)',
                    color: theme.palette.text.primary,
                    transition: 'transform 0.3s',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                    }
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, textAlign: 'center', py: 3 }}>
                    <Typography variant="h1" sx={{ fontSize: 36, mb: 2, color: theme.palette.primary.main }}>
                      {index + 1}
                    </Typography>
                    <Typography variant="h6" component="h2" gutterBottom>
                      {step}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {index === 0 && "Enter your personal details, work experience, education, and skills."}
                      {index === 1 && "Get AI assistance to create a professional summary."}
                      {index === 2 && "Preview your resume and download it as a PDF."}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Paper 
          elevation={3} 
          sx={{ 
            mt: 4, 
            p: 4, 
            borderRadius: 2,
            bgcolor: 'background.paper',
          }}
        >
          <Stepper 
            activeStep={activeStep} 
            alternativeLabel 
            sx={{ 
              mb: 5,
              '& .MuiStepLabel-root .Mui-active': {
                color: theme.palette.primary.main,
              },
              '& .MuiStepLabel-root .Mui-completed': {
                color: theme.palette.primary.main,
              },
            }}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {activeStep === 0 && (
            <ResumeForm onSubmit={handleFormSubmit} />
          )}

          {activeStep === 1 && formData && (
            <>
              <SummaryGenerator 
                formData={formData} 
                onSummaryGenerated={handleSummaryGenerated} 
              />
              <Box display="flex" justifyContent="space-between" mt={4}>
                <Button 
                  onClick={handleBack}
                  variant="outlined"
                  size="large"
                  sx={{ px: 4 }}
                >
                  Back
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleNext}
                  disabled={!formData.summary}
                  size="large"
                  sx={{ px: 4 }}
                >
                  Continue to Preview
                </Button>
              </Box>
            </>
          )}

          {activeStep === 2 && formData && (
            <Box textAlign="center" py={6}>
              <Typography variant="h1" sx={{ fontSize: 64, color: 'primary.main', mb: 3 }}>
                ✓
              </Typography>
              <Typography variant="h4" gutterBottom fontWeight="bold">
                Ready to Generate Your Resume!
              </Typography>
              <Typography variant="body1" paragraph sx={{ maxWidth: 600, mx: 'auto', mb: 4 }}>
                You've completed all the necessary information. Click below to preview and download your professional resume.
              </Typography>
              <Box display="flex" justifyContent="center" gap={3} mt={4}>
                <Button 
                  onClick={handleBack}
                  variant="outlined"
                  size="large"
                  sx={{ px: 4 }}
                >
                  Back
                </Button>
                <Button 
                  variant="contained" 
                  color="primary" 
                  onClick={handleNext}
                  size="large"
                  sx={{ px: 4 }}
                >
                  Preview Resume
                </Button>
              </Box>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default Home;