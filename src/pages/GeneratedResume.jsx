import React, { useEffect, useState, useRef } from 'react';
import { Container, Typography, Box, Paper, Button, Grid, Divider, Link as MuiLink, Alert } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import SimplePDFExporter from '../components/SimplePDFExporter';

const GeneratedResume = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData } = location.state || {};
  const [showMultiPageWarning, setShowMultiPageWarning] = useState(false);
  const paperRef = useRef(null);

  useEffect(() => {
    // Redirect to home if no form data is available
    if (!formData) {
      navigate('/');
    }
  }, [formData, navigate]);
  
  // Simple check for content that might span multiple pages
  useEffect(() => {
    if (paperRef.current && formData) {
      // Check if content is likely to span multiple pages based on height
      const contentHeight = paperRef.current.clientHeight;
      // A4 page height in pixels (approximately) minus margins
      const pageHeight = 1000;
      setShowMultiPageWarning(contentHeight > pageHeight);
    }
  }, [formData]);

  if (!formData) {
    return null;
  }

  // Helper function to ensure URL has protocol
  const ensureHttps = (url) => {
    if (!url) return url;
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return url;
    }
    return `https://${url}`;
  };

  return (
    <Container maxWidth="lg">
      <Box py={4}>
        <Box 
          sx={{ 
            textAlign: 'center', 
            mb: 5,
            background: 'linear-gradient(45deg, #3f51b5 30%, #536dfe 90%)',
            py: 4,
            px: 2,
            borderRadius: 2,
            color: 'white',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Typography variant="h3" component="h1" gutterBottom fontWeight="bold">
            Your Generated Resume
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9, maxWidth: 700, mx: 'auto', mb: 3 }}>
            Preview your professional resume and download it as a PDF
          </Typography>
          
          <Button 
            variant="contained" 
            onClick={() => navigate('/')}
            sx={{ 
              mt: 2, 
              bgcolor: 'rgba(255, 255, 255, 0.2)', 
              color: 'white',
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.3)',
              }
            }}
            size="large"
          >
            Back to Editor
          </Button>
        </Box>

        {showMultiPageWarning && (
          <Alert severity="info" sx={{ mb: 2, maxWidth: 800, mx: 'auto' }}>
            Your resume may span multiple pages when PDF is generated.
          </Alert>
        )}
        
        {/* Resume Preview */}
        <Paper 
          elevation={3} 
          sx={{ p: 4, mb: 4, maxWidth: 800, mx: 'auto' }}
          ref={paperRef}
        >
          {/* Header / Contact Information */}
          <Box mb={3} textAlign="center">
            <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ textTransform: 'uppercase' }}>
              {formData.personalInfo.name}
            </Typography>
            <Typography variant="body2">
              Email: <MuiLink href={`mailto:${formData.personalInfo.email}`}>{formData.personalInfo.email}</MuiLink> | 
              Phone: {formData.personalInfo.phone} | 
              Location: {formData.personalInfo.location}
            </Typography>
            {(formData.personalInfo.linkedin || formData.personalInfo.github) && (
              <Typography variant="body2">
                {formData.personalInfo.linkedin && (
                  <>LinkedIn: <MuiLink href={ensureHttps(formData.personalInfo.linkedin)} target="_blank">{formData.personalInfo.linkedin}</MuiLink></>
                )} 
                {formData.personalInfo.linkedin && formData.personalInfo.github && ' | '} 
                {formData.personalInfo.github && (
                  <>GitHub: <MuiLink href={ensureHttps(formData.personalInfo.github)} target="_blank">{formData.personalInfo.github}</MuiLink></>
                )}
              </Typography>
            )}
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Summary Section */}
          {formData.summary && (
            <Box mb={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Professional Summary
              </Typography>
              <Typography variant="body2">
                {formData.summary}
              </Typography>
            </Box>
          )}

          <Divider sx={{ mb: 3 }} />

          {/* Experience Section */}
          {formData.experience.length > 0 && (
            <Box mb={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Work Experience
              </Typography>
              {formData.experience.map((exp, index) => (
                <Box key={index} mb={2}>
                  <Grid container justifyContent="space-between" alignItems="baseline">
                    <Grid item>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {exp.company} | {exp.position}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">
                        {exp.startDate} - {exp.endDate}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="body2">
                    {exp.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          <Divider sx={{ mb: 3 }} />

          {/* Education Section */}
          {formData.education.length > 0 && (
            <Box mb={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Education
              </Typography>
              {formData.education.map((edu, index) => (
                <Box key={index} mb={2}>
                  <Grid container justifyContent="space-between" alignItems="baseline">
                    <Grid item>
                      <Typography variant="subtitle1" fontWeight="bold">
                        {edu.institution}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant="body2">
                        {edu.graduationDate}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Typography variant="body2">
                    {edu.degree} in {edu.field}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}

          <Divider sx={{ mb: 3 }} />

          {/* Skills Section */}
          {formData.skills && (
            <Box mb={3}>
              <Typography variant="h6" fontWeight="bold" gutterBottom>
                Skills
              </Typography>
              <Box sx={{ pl: 2 }}>
                {formData.skills.split('\n').filter(skill => skill.trim()).map((skill, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Typography variant="body2" sx={{ mr: 1 }}>•</Typography>
                    <Typography variant="body2">{skill.trim()}</Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )}

          {/* Projects Section */}
          {formData.projects && formData.projects.length > 0 && formData.projects[0].name && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box mb={3}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Projects
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {formData.projects.map((project, index) => (
                    <Box key={index} sx={{ mb: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>•</Typography>
                        <Box>
                          <Typography variant="body2">
                            {project.name}{project.description ? `: ${project.description}` : ''}
                          </Typography>
                          {project.technologies && (
                            <Typography variant="body2">
                              Technologies: {project.technologies}
                            </Typography>
                          )}
                          {project.link && (
                            <Typography variant="body2">
                              Link: <MuiLink href={ensureHttps(project.link)} target="_blank">{project.link}</MuiLink>
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {/* Achievements Section */}
          {formData.achievements && formData.achievements.length > 0 && formData.achievements[0].description && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box mb={3}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Achievements
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {formData.achievements.map((achievement, index) => (
                    <Box key={index} sx={{ mb: 0.5 }}>
                      <Grid container>
                        <Grid item xs={1} sx={{ pr: 1 }}>
                          <Typography variant="body2">•</Typography>
                        </Grid>
                        <Grid item xs={9}>
                          <Typography variant="body2">{achievement.description}</Typography>
                        </Grid>
                        <Grid item xs={2} sx={{ textAlign: 'right' }}>
                          {achievement.date && (
                            <Typography variant="body2">{achievement.date}</Typography>
                          )}
                        </Grid>
                      </Grid>
                    </Box>
                  ))}
                </Box>
              </Box>
            </>
          )}

          {/* Certifications Section */}
          {formData.certifications && formData.certifications.length > 0 && formData.certifications[0].name && (
            <>
              <Divider sx={{ mb: 3 }} />
              <Box mb={3}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Certifications
                </Typography>
                <Box sx={{ pl: 2 }}>
                  {formData.certifications.map((cert, index) => (
                    <Box key={index} sx={{ mb: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>•</Typography>
                        <Box sx={{ flexGrow: 1 }}>
                          <Grid container justifyContent="space-between" alignItems="baseline">
                            <Grid item>
                              <Typography variant="body2">{cert.name}</Typography>
                            </Grid>
                            <Grid item>
                              {cert.date && <Typography variant="body2">{cert.date}</Typography>}
                            </Grid>
                          </Grid>
                          <Typography variant="body2">Issuer: {cert.issuer}</Typography>
                          {cert.link && (
                            <Typography variant="body2">
                              Link: <MuiLink href={ensureHttps(cert.link)} target="_blank">{cert.link}</MuiLink>
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>
              </Box>
            </>
          )}
          

        </Paper>

        {/* PDF Export */}
        <SimplePDFExporter formData={formData} />
      </Box>
    </Container>
  );
};

export default GeneratedResume;