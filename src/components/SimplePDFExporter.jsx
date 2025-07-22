import React, { useState } from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import { pdf } from '@react-pdf/renderer';
import { Document, Page, Text, View, StyleSheet, Font, Link } from '@react-pdf/renderer';

// Register fonts with explicit weights
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxP.ttf', fontWeight: 400 },
    { src: 'https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmWUlfBBc9.ttf', fontWeight: 700 },
    { src: 'https://fonts.gstatic.com/s/robotocondensed/v19/ieVl2ZhZI2eCN5jzbjEETS9weq8-19K7CA.ttf', fontWeight: 900 }
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 25,
    lineHeight: 1.4,
    fontFamily: 'Roboto',
  },
  section: {
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
    textAlign: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 900,
    marginBottom: 5,
    textAlign: 'center',
    fontFamily: 'Roboto',
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 3,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    paddingBottom: 2,
    fontFamily: 'Roboto',
  },
  summary: {
    fontSize: 9,
    marginBottom: 8,
  },
  experienceItem: {
    marginBottom: 10,
  },
  companyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  companyName: {
    fontSize: 12,
    fontWeight: 700,
    fontFamily: 'Roboto',
  },
  dates: {
    fontSize: 9,
  },
  position: {
    fontSize: 11,
    fontWeight: 700,
    marginBottom: 3,
    fontFamily: 'Roboto',
  },
  description: {
    fontSize: 9,
  },
  educationItem: {
    marginBottom: 8,
  },
  institution: {
    fontSize: 12,
    fontWeight: 700,
    fontFamily: 'Roboto',
  },
  degree: {
    fontSize: 9,
    marginBottom: 1,
  },
  contentContainer: {
    marginLeft: 8,
  },
  contentText: {
    fontSize: 9,
    marginBottom: 1,
  },
  bullet: {
    marginRight: 4,
    fontSize: 9,
  },
  bulletRow: {
    flexDirection: 'row',
    marginBottom: 3,
    alignItems: 'flex-start',
  },
  projectItem: {
    marginBottom: 8,
  },
  projectName: {
    fontSize: 9,
    fontFamily: 'Roboto',
  },
  projectDescription: {
    fontSize: 9,
    marginBottom: 1,
  },
  certificationItem: {
    marginBottom: 5,
  },
  certName: {
    fontSize: 9,
    fontFamily: 'Roboto',
  },
  certDetails: {
    fontSize: 9,
  },
  labelBold: {
    fontWeight: 700,
    fontFamily: 'Roboto',
  },
  link: {
    color: '#1976d2',
    textDecoration: 'none',
  },
  achievementRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  achievementText: {
    fontSize: 9,
    flex: 1,
  },
  achievementDate: {
    fontSize: 9,
    marginLeft: 5,
  },
});

// Helper function to check if a string is a valid URL
const isValidUrl = (string) => {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
};

// Helper function to ensure URL has protocol
const ensureHttps = (url) => {
  if (!url) return url;
  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }
  return `https://${url}`;
};

// Resume Document component
const ResumeDocument = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header / Contact Information */}
      <View style={styles.header}>
        <Text style={styles.name}>{formData.personalInfo.name.toUpperCase()}</Text>
        <Text style={styles.contactInfo}>
          Email: <Link src={`mailto:${formData.personalInfo.email}`} style={styles.link}>{formData.personalInfo.email}</Link> | 
          Phone: {formData.personalInfo.phone} | 
          Location: {formData.personalInfo.location}
        </Text>
        {(formData.personalInfo.linkedin || formData.personalInfo.github) && (
          <Text style={styles.contactInfo}>
            {formData.personalInfo.linkedin && (
              <>LinkedIn: <Link src={ensureHttps(formData.personalInfo.linkedin)} style={styles.link}>{formData.personalInfo.linkedin}</Link></>
            )} 
            {formData.personalInfo.linkedin && formData.personalInfo.github && ' | '} 
            {formData.personalInfo.github && (
              <>GitHub: <Link src={ensureHttps(formData.personalInfo.github)} style={styles.link}>{formData.personalInfo.github}</Link></>
            )}
          </Text>
        )}
      </View>

      {/* Summary Section */}
      {formData.summary && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.summary}>{formData.summary}</Text>
        </View>
      )}

      {/* Experience Section */}
      {formData.experience.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Experience</Text>
          {formData.experience.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <View style={styles.companyHeader}>
                <Text style={styles.companyName}>{exp.company} | {exp.position}</Text>
                <Text style={styles.dates}>{exp.startDate} - {exp.endDate}</Text>
              </View>
              <Text style={styles.description}>{exp.description}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Education Section */}
      {formData.education.length > 0 && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {formData.education.map((edu, index) => (
            <View key={index} style={styles.educationItem}>
              <View style={styles.companyHeader}>
                <Text style={styles.institution}>{edu.institution}</Text>
                <Text style={styles.dates}>{edu.graduationDate}</Text>
              </View>
              <Text style={styles.degree}>{edu.degree} in {edu.field}</Text>
            </View>
          ))}
        </View>
      )}

      {/* Skills Section */}
      {formData.skills && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills</Text>
          <View style={styles.contentContainer}>
            {formData.skills.split('\n').filter(skill => skill.trim()).map((skill, index) => (
              <View key={index} style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <Text style={styles.contentText}>{skill.trim()}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Projects Section */}
      {formData.projects && formData.projects.length > 0 && formData.projects[0].name && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Projects</Text>
          <View style={styles.contentContainer}>
            {formData.projects.map((project, index) => (
              <View key={index} style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <View style={{flex: 1}}>
                  <Text style={styles.contentText}>
                    {project.name}{project.description ? `: ${project.description}` : ''}
                  </Text>
                  {project.technologies && (
                    <Text style={styles.contentText}>Technologies: {project.technologies}</Text>
                  )}
                  {project.link && isValidUrl(ensureHttps(project.link)) && (
                    <Text style={styles.contentText}>
                      Link: <Link src={ensureHttps(project.link)} style={styles.link}>{project.link}</Link>
                    </Text>
                  )}
                  {project.link && !isValidUrl(ensureHttps(project.link)) && (
                    <Text style={styles.contentText}>Link: {project.link}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Achievements Section */}
      {formData.achievements && formData.achievements.length > 0 && formData.achievements[0].description && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.contentContainer}>
            {formData.achievements.map((achievement, index) => (
              <View key={index} style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <View style={{flex: 1}}>
                  <View style={styles.companyHeader}>
                    <Text style={styles.contentText}>{achievement.description}</Text>
                    {achievement.date && (
                      <Text style={styles.dates}>{achievement.date}</Text>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>
      )}

      {/* Certifications Section */}
      {formData.certifications && formData.certifications.length > 0 && formData.certifications[0].name && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Certifications</Text>
          <View style={styles.contentContainer}>
            {formData.certifications.map((cert, index) => (
              <View key={index} style={styles.bulletRow}>
                <Text style={styles.bullet}>•</Text>
                <View style={{flex: 1}}>
                  <View style={styles.companyHeader}>
                    <Text style={styles.certName}>{cert.name}</Text>
                    {cert.date && <Text style={styles.dates}>{cert.date}</Text>}
                  </View>
                  <Text style={styles.contentText}>Issuer: {cert.issuer}</Text>
                  {cert.link && isValidUrl(ensureHttps(cert.link)) && (
                    <Text style={styles.contentText}>
                      Link: <Link src={ensureHttps(cert.link)} style={styles.link}>{cert.link}</Link>
                    </Text>
                  )}
                  {cert.link && !isValidUrl(ensureHttps(cert.link)) && (
                    <Text style={styles.contentText}>Link: {cert.link}</Text>
                  )}
                </View>
              </View>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);

const SimplePDFExporter = ({ formData }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const generatePDF = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Create the PDF document
      const blob = await pdf(<ResumeDocument formData={formData} />).toBlob();
      
      // Create a URL for the blob
      const url = URL.createObjectURL(blob);
      
      // Create a link element and trigger download
      const link = document.createElement('a');
      link.href = url;
      link.download = `${formData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
      document.body.appendChild(link);
      link.click();
      
      // Clean up
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setLoading(false);
    } catch (err) {
      console.error('Error generating PDF:', err);
      setError(err.message || 'Failed to generate PDF');
      setLoading(false);
    }
  };

  return (
    <Box 
      mt={5} 
      textAlign="center" 
      sx={{
        p: 4,
        borderRadius: 2,
        bgcolor: 'rgba(63, 81, 181, 0.05)',
        border: '1px solid rgba(63, 81, 181, 0.1)',
        maxWidth: 600,
        mx: 'auto'
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Download Your Resume
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        Your resume is ready! Click the button below to download it as a PDF.
      </Typography>
      
      <Button 
        variant="contained" 
        color={error ? "error" : "primary"} 
        onClick={generatePDF}
        disabled={loading}
        size="large"
        sx={{ 
          px: 4, 
          py: 1.5,
          fontSize: '1.1rem',
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        {loading ? (
          <>
            <CircularProgress size={24} sx={{ mr: 1, color: 'white' }} />
            Generating PDF...
          </>
        ) : error ? (
          'Error - Try Again'
        ) : (
          'Download PDF Resume'
        )}
      </Button>
      
      {error && (
        <Typography variant="body2" color="error" sx={{ mt: 2, p: 2, bgcolor: 'rgba(244, 67, 54, 0.1)', borderRadius: 1 }}>
          {error}
        </Typography>
      )}
      
      <Typography variant="body2" color="text.secondary" sx={{ mt: 3 }}>
        Your resume will be downloaded as a professional PDF document.
      </Typography>
    </Box>
  );
};

export default SimplePDFExporter;