import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Paper, Box, Divider } from '@mui/material';

const ResumeForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    personalInfo: {
      name: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      github: '',
    },
    summary: '',
    experience: [{ 
      company: '', 
      position: '', 
      startDate: '', 
      endDate: '', 
      description: '' 
    }],
    education: [{ 
      institution: '', 
      degree: '', 
      field: '', 
      graduationDate: '' 
    }],
    skills: '',
    projects: [{
      name: '',
      description: '',
      technologies: '',
      link: ''
    }],
    achievements: [{
      description: '',
      date: ''
    }],
    certifications: [{
      name: '',
      issuer: '',
      date: '',
      link: ''
    }]
  });

  const handleChange = (section, field, value, index = null) => {
    if (index !== null) {
      // For arrays like experience and education
      setFormData(prev => ({
        ...prev,
        [section]: prev[section].map((item, i) => 
          i === index ? { ...item, [field]: value } : item
        )
      }));
    } else if (section === 'personalInfo') {
      // For nested objects like personalInfo
      setFormData(prev => ({
        ...prev,
        personalInfo: {
          ...prev.personalInfo,
          [field]: value
        }
      }));
    } else {
      // For direct fields like summary and skills
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const addItem = (section) => {
    if (section === 'experience') {
      setFormData(prev => ({
        ...prev,
        experience: [...prev.experience, { company: '', position: '', startDate: '', endDate: '', description: '' }]
      }));
    } else if (section === 'education') {
      setFormData(prev => ({
        ...prev,
        education: [...prev.education, { institution: '', degree: '', field: '', graduationDate: '' }]
      }));
    } else if (section === 'projects') {
      setFormData(prev => ({
        ...prev,
        projects: [...prev.projects, { name: '', description: '', technologies: '', link: '' }]
      }));
    } else if (section === 'achievements') {
      setFormData(prev => ({
        ...prev,
        achievements: [...prev.achievements, { description: '', date: '' }]
      }));
    } else if (section === 'certifications') {
      setFormData(prev => ({
        ...prev,
        certifications: [...prev.certifications, { name: '', issuer: '', date: '', link: '' }]
      }));
    }
  };

  const removeItem = (section, index) => {
    setFormData(prev => ({
      ...prev,
      [section]: prev[section].filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: 'auto', borderRadius: 2 }}>
      <form onSubmit={handleSubmit}>
        <Typography variant="h4" gutterBottom fontWeight="bold" color="primary.main" textAlign="center">
          Create Your Resume
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph textAlign="center" sx={{ mb: 4 }}>
          Fill in the details below to create your professional resume
        </Typography>
        
        {/* Personal Information */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="primary.main">
            Personal Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                value={formData.personalInfo.name}
                onChange={(e) => handleChange('personalInfo', 'name', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.personalInfo.email}
                onChange={(e) => handleChange('personalInfo', 'email', e.target.value)}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                value={formData.personalInfo.phone}
                onChange={(e) => handleChange('personalInfo', 'phone', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                value={formData.personalInfo.location}
                onChange={(e) => handleChange('personalInfo', 'location', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="LinkedIn"
                value={formData.personalInfo.linkedin}
                onChange={(e) => handleChange('personalInfo', 'linkedin', e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="GitHub"
                value={formData.personalInfo.github}
                onChange={(e) => handleChange('personalInfo', 'github', e.target.value)}
              />
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ my: 3 }} />
        
        {/* Professional Summary */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="primary.main">
            Professional Summary
          </Typography>
          <TextField
            fullWidth
            label="Summary"
            multiline
            rows={4}
            value={formData.summary}
            onChange={(e) => handleChange(null, 'summary', e.target.value)}
            helperText="Briefly describe your professional background and career goals"
          />
        </Box>

        <Divider sx={{ my: 3 }} />
        
        {/* Work Experience */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="primary.main">
            Work Experience
          </Typography>
          
          {formData.experience.map((exp, index) => (
            <Box key={index} mb={3} p={2} border="1px solid #e0e0e0" borderRadius={1}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Company"
                    value={exp.company}
                    onChange={(e) => handleChange('experience', 'company', e.target.value, index)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Position"
                    value={exp.position}
                    onChange={(e) => handleChange('experience', 'position', e.target.value, index)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Start Date"
                    value={exp.startDate}
                    onChange={(e) => handleChange('experience', 'startDate', e.target.value, index)}
                    placeholder="MM/YYYY"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="End Date"
                    value={exp.endDate}
                    onChange={(e) => handleChange('experience', 'endDate', e.target.value, index)}
                    placeholder="MM/YYYY or Present"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={3}
                    value={exp.description}
                    onChange={(e) => handleChange('experience', 'description', e.target.value, index)}
                    helperText="Describe your responsibilities and achievements"
                  />
                </Grid>
                {formData.experience.length > 1 && (
                  <Grid item xs={12}>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      onClick={() => removeItem('experience', index)}
                    >
                      Remove
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Box>
          ))}
          
          <Button 
            variant="outlined" 
            onClick={() => addItem('experience')}
            sx={{ mt: 1 }}
          >
            Add Experience
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />
        
        {/* Education */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="primary.main">
            Education
          </Typography>
          
          {formData.education.map((edu, index) => (
            <Box key={index} mb={3} p={2} border="1px solid #e0e0e0" borderRadius={1}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Institution"
                    value={edu.institution}
                    onChange={(e) => handleChange('education', 'institution', e.target.value, index)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Degree"
                    value={edu.degree}
                    onChange={(e) => handleChange('education', 'degree', e.target.value, index)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Field of Study"
                    value={edu.field}
                    onChange={(e) => handleChange('education', 'field', e.target.value, index)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Graduation Date"
                    value={edu.graduationDate}
                    onChange={(e) => handleChange('education', 'graduationDate', e.target.value, index)}
                    placeholder="MM/YYYY"
                  />
                </Grid>
                {formData.education.length > 1 && (
                  <Grid item xs={12}>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      onClick={() => removeItem('education', index)}
                    >
                      Remove
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Box>
          ))}
          
          <Button 
            variant="outlined" 
            onClick={() => addItem('education')}
            sx={{ mt: 1 }}
          >
            Add Education
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />
        
        {/* Skills */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="primary.main">
            Skills
          </Typography>
          <TextField
            fullWidth
            label="Skills"
            multiline
            rows={3}
            value={formData.skills}
            onChange={(e) => handleChange(null, 'skills', e.target.value)}
            helperText="List your skills separated by commas (e.g., JavaScript, React, Project Management)"
          />
        </Box>

        <Divider sx={{ my: 3 }} />
        
        {/* Projects */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="primary.main">
            Projects
          </Typography>
          
          {formData.projects.map((project, index) => (
            <Box key={index} mb={3} p={2} border="1px solid #e0e0e0" borderRadius={1}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Project Name"
                    value={project.name}
                    onChange={(e) => handleChange('projects', 'name', e.target.value, index)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Technologies Used"
                    value={project.technologies}
                    onChange={(e) => handleChange('projects', 'technologies', e.target.value, index)}
                    helperText="e.g., React, Node.js, MongoDB"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Description"
                    multiline
                    rows={2}
                    value={project.description}
                    onChange={(e) => handleChange('projects', 'description', e.target.value, index)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Project Link"
                    value={project.link}
                    onChange={(e) => handleChange('projects', 'link', e.target.value, index)}
                    helperText="GitHub repository or live demo URL"
                  />
                </Grid>
                {formData.projects.length > 1 && (
                  <Grid item xs={12}>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      onClick={() => removeItem('projects', index)}
                    >
                      Remove
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Box>
          ))}
          
          <Button 
            variant="outlined" 
            onClick={() => addItem('projects')}
            sx={{ mt: 1 }}
          >
            Add Project
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />
        
        {/* Achievements */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="primary.main">
            Achievements
          </Typography>
          
          {formData.achievements.map((achievement, index) => (
            <Box key={index} mb={3} p={2} border="1px solid #e0e0e0" borderRadius={1}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={8}>
                  <TextField
                    fullWidth
                    label="Achievement"
                    value={achievement.description}
                    onChange={(e) => handleChange('achievements', 'description', e.target.value, index)}
                    multiline
                    rows={2}
                  />
                </Grid>
                <Grid item xs={12} sm={4}>
                  <TextField
                    fullWidth
                    label="Date"
                    value={achievement.date}
                    onChange={(e) => handleChange('achievements', 'date', e.target.value, index)}
                    placeholder="MM/YYYY"
                  />
                </Grid>
                {formData.achievements.length > 1 && (
                  <Grid item xs={12}>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      onClick={() => removeItem('achievements', index)}
                    >
                      Remove
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Box>
          ))}
          
          <Button 
            variant="outlined" 
            onClick={() => addItem('achievements')}
            sx={{ mt: 1 }}
          >
            Add Achievement
          </Button>
        </Box>

        <Divider sx={{ my: 3 }} />
        
        {/* Certifications */}
        <Box mb={4}>
          <Typography variant="h5" gutterBottom fontWeight="bold" color="primary.main">
            Certifications
          </Typography>
          
          {formData.certifications.map((cert, index) => (
            <Box key={index} mb={3} p={2} border="1px solid #e0e0e0" borderRadius={1}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Certification Name"
                    value={cert.name}
                    onChange={(e) => handleChange('certifications', 'name', e.target.value, index)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Issuing Organization"
                    value={cert.issuer}
                    onChange={(e) => handleChange('certifications', 'issuer', e.target.value, index)}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Date"
                    value={cert.date}
                    onChange={(e) => handleChange('certifications', 'date', e.target.value, index)}
                    placeholder="MM/YYYY"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Certificate Link"
                    value={cert.link}
                    onChange={(e) => handleChange('certifications', 'link', e.target.value, index)}
                  />
                </Grid>
                {formData.certifications.length > 1 && (
                  <Grid item xs={12}>
                    <Button 
                      variant="outlined" 
                      color="error" 
                      onClick={() => removeItem('certifications', index)}
                    >
                      Remove
                    </Button>
                  </Grid>
                )}
              </Grid>
            </Box>
          ))}
          
          <Button 
            variant="outlined" 
            onClick={() => addItem('certifications')}
            sx={{ mt: 1 }}
          >
            Add Certification
          </Button>
        </Box>
        
        <Box textAlign="center">
          <Button 
            type="submit" 
            variant="contained" 
            color="primary" 
            size="large"
            sx={{ mt: 4, px: 4, py: 1.5, fontSize: '1.1rem' }}
          >
            Generate Resume
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default ResumeForm;