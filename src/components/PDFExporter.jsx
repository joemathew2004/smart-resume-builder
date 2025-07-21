import React from 'react';
import { Button, Box, Typography } from '@mui/material';
import { PDFDownloadLink, Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

// Register fonts - using local fonts to avoid CORS issues
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/roboto/v29/KFOmCnqEu92Fr1Mu4mxP.ttf', fontWeight: 'normal' },
    { src: 'https://fonts.gstatic.com/s/roboto/v29/KFOlCnqEu92Fr1MmWUlfBBc9.ttf', fontWeight: 'bold' },
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    fontFamily: 'Roboto',
    padding: 30,
    lineHeight: 1.5,
  },
  section: {
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#999',
    paddingBottom: 2,
  },
  summary: {
    fontSize: 11,
    marginBottom: 10,
    textAlign: 'justify',
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
    fontWeight: 'bold',
  },
  dates: {
    fontSize: 10,
  },
  position: {
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 3,
  },
  description: {
    fontSize: 10,
    textAlign: 'justify',
  },
  educationItem: {
    marginBottom: 8,
  },
  institution: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  degree: {
    fontSize: 11,
    marginBottom: 2,
  },
  skills: {
    fontSize: 11,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skill: {
    fontSize: 10,
    backgroundColor: '#f0f0f0',
    padding: '3 6',
    borderRadius: 3,
    margin: 2,
  },
});

// Resume Document component
const ResumeDocument = ({ formData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header / Contact Information */}
      <View style={styles.header}>
        <Text style={styles.name}>{formData.personalInfo.name}</Text>
        <Text style={styles.contactInfo}>
          {formData.personalInfo.email} | {formData.personalInfo.phone} | {formData.personalInfo.location}
        </Text>
        {(formData.personalInfo.linkedin || formData.personalInfo.github) && (
          <Text style={styles.contactInfo}>
            {formData.personalInfo.linkedin && `LinkedIn: ${formData.personalInfo.linkedin}`} 
            {formData.personalInfo.linkedin && formData.personalInfo.github && ' | '} 
            {formData.personalInfo.github && `GitHub: ${formData.personalInfo.github}`}
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
                <Text style={styles.companyName}>{exp.company}</Text>
                <Text style={styles.dates}>{exp.startDate} - {exp.endDate}</Text>
              </View>
              <Text style={styles.position}>{exp.position}</Text>
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
          <View style={styles.skills}>
            {formData.skills.split(',').map((skill, index) => (
              <Text key={index} style={styles.skill}>{skill.trim()}</Text>
            ))}
          </View>
        </View>
      )}
    </Page>
  </Document>
);

const PDFExporter = ({ formData }) => {
  const [isClient, setIsClient] = React.useState(false);

  // This ensures the component only renders PDFDownloadLink on the client side
  React.useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <Box mt={4} textAlign="center">
      <Typography variant="h6" gutterBottom>
        Download Your Resume
      </Typography>
      
      {isClient ? (
        <PDFDownloadLink 
          document={<ResumeDocument formData={formData} />} 
          fileName={`${formData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`}
          style={{
            textDecoration: 'none',
          }}
        >
          {({ blob, url, loading, error }) => {
            if (error) {
              console.error('PDF generation error:', error);
              return (
                <Button 
                  variant="contained" 
                  color="error" 
                  size="large"
                >
                  Error generating PDF
                </Button>
              );
            }
            
            return (
              <Button 
                variant="contained" 
                color="primary" 
                disabled={loading}
                size="large"
              >
                {loading ? 'Generating PDF...' : 'Download PDF Resume'}
              </Button>
            );
          }}
        </PDFDownloadLink>
      ) : (
        <Button 
          variant="contained" 
          color="primary" 
          disabled
          size="large"
        >
          Preparing PDF...
        </Button>
      )}
      
      <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
        Your resume will be downloaded as a professional PDF document.
      </Typography>
    </Box>
  );
};

export default PDFExporter;