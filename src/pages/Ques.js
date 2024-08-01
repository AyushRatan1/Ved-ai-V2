import React, { useState } from 'react';
import Typing from 'react-typing-effect';
import { Box, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

const Ques = () => {
  const questions = [
    'What is your Name?',
    'What is your profession?',
    'What are your hobbies?',
    'Where are you from?'
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e.key === 'Enter') {
      console.log('Submitted Answer:', answer);
      setAnswer(''); // Clear the input field
      setCurrentQuestionIndex(prevIndex => {
        if (prevIndex < questions.length - 1) {
          return prevIndex + 1;
        } else {
          // Redirect to the Quotes page after the last question
          navigate('/quotes'); // Ensure the path matches your routing configuration
          return prevIndex;
        }
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', height: '100vh', backgroundColor: '#121212', color: '#ffffff' }}>
      {/* Left Side: Video */}
      <Box sx={{ flex: 2, position: 'relative' }}>
        <video
          src="/vid.mp4" // Correct path
          autoPlay
          loop
          muted
          playsInline
          style={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover', 
            pointerEvents: 'none' // Prevents interaction
          }}
        />
      </Box>

      {/* Right Side: Form */}
      <Box sx={{ flex: 3, p: 4, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <Typography variant="h2" gutterBottom sx={{ fontSize: '2.5rem' }}>
          Introduce yourself
        </Typography>
        <Box sx={{ mt: 2, fontSize: '3.5rem', color: '#ffffff' }}>
          <Typing
            text={questions[currentQuestionIndex]}
            speed={100}
            eraseSpeed={50}
            eraseDelay={1000}
            typingDelay={500}
            displayTextRenderer={(text) => <span>{text}</span>}
          />
        </Box>
        <Box sx={{ mt: 4 }}>
          <TextField
            label={questions[currentQuestionIndex]}
            name="answer"
            value={answer}
            onChange={handleChange}
            onKeyDown={handleSubmit}
            fullWidth
            margin="normal"
            sx={{ 
              input: { color: '#ffffff', fontSize: '1.25rem' }, 
              label: { color: '#bbbbbb', fontSize: '1.25rem' } 
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Ques;
