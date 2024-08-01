import React, { useState } from 'react';
import Typing from 'react-typing-effect';
import { Tabs, Tab, Typography, Box } from '@mui/material';
import { keyframes } from '@emotion/react';
import SearchIcon from '@mui/icons-material/Search';
import SummarizeIcon from '@mui/icons-material/Summarize';
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';

// Keyframes for text and tab animations
const fadeInOut = keyframes`
  0% { opacity: 0; transform: translateY(-30px); }
  50% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(30px); }
`;

const hoverEffect = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const Quotes = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ position: 'relative', height: '100vh', overflow: 'hidden', color: '#e0e0e0' }}>
      {/* Video Background */}
      <video
        src="/vid3.mp4" // Replace with your video path
        autoPlay
        loop
        muted
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: -1
        }}
      />
      {/* Overlay for better text visibility */}
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(0, 0, 0, 0.4)', // Dark overlay
          zIndex: 0
        }}
      />
      
      {/* Main Content */}
      <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh', zIndex: 1 }}>
        {/* Top Animation */}
        <Box
          sx={{
            padding: '40px',
            textAlign: 'center',
            animation: `${fadeInOut} 6s ease-in-out infinite`,
            background: 'linear-gradient(135deg, #4a90e2, #50e3c2)',
            borderRadius: '0 0 50% 50%',
            color: '#ffffff',
            position: 'relative',
            zIndex: 1
          }}
        >
          <Typography variant="h2" component="div" sx={{ fontSize: '2.5rem', fontWeight: 'bold' }}>
            <Typing
              text={['"Artificial intelligence is the future."', '"Innovation drives progress."', '"The best way to predict the future is to invent it."']}
              speed={100}
              eraseSpeed={50}
              eraseDelay={1000}
              typingDelay={500}
            />
          </Typography>
        </Box>

        {/* Tabs Section */}
        <Box sx={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="tabs example"
            sx={{ 
              borderRadius: '12px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
              '.MuiTab-root': {
                margin: '10px',
                padding: '20px',
                borderRadius: '12px',
                transition: 'background-color 0.3s, transform 0.3s, box-shadow 0.3s',
                cursor: 'pointer',
                backdropFilter: 'blur(10px)', // Glassy effect
                '&:hover': {
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  transform: 'scale(1.05)',
                  boxShadow: '0 6px 15px rgba(0,0,0,0.4)'
                }
              }
            }}
          >
            <Tab
              label="General Search"
              icon={<SearchIcon />}
              iconPosition="start"
              component="a"
              href="https://googlehack-v1.vercel.app/"
              sx={{
                color: '#000',
                backgroundColor: 'rgba(255, 255, 204, 0.8)', // Light yellow
                fontSize: '1.25rem',
                fontWeight: 'bold',
              }}
            />
            <Tab
              label="Summarize Content"
              icon={<SummarizeIcon />}
              iconPosition="start"
              component="a"
              href="/summarize-content"
              sx={{
                color: '#000',
                backgroundColor: 'rgba(173, 216, 230, 0.8)', // Light blue
                fontSize: '1.25rem',
                fontWeight: 'bold',
              }}
            />
            <Tab
              label="Explore with Questions"
              icon={<QuestionAnswerIcon />}
              iconPosition="start"
              component="a"
              href="/explore-with-questions"
              sx={{
                color: '#000',
                backgroundColor: 'rgba(255, 182, 193, 0.8)', // Light pink
                fontSize: '1.25rem',
                fontWeight: 'bold',
              }}
            />
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default Quotes;
