import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Assuming you use react-router for navigation

const Int = () => {
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 7000); // Time to wait before showing the text (adjust as needed)

    const redirectTimer = setTimeout(() => {
      navigate('/ques'); // Redirect to Ques page
    }, 10000); // Time to show the text before redirecting (adjust as needed)

    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div style={styles.container}>
      <video
        src="/videoplayback.mp4" // Replace with your video URL
        autoPlay
        muted
        loop
        style={styles.video}
      />
      {showText && (
        <div style={styles.text}>
          VED AI
        </div>
      )}
      <style>
        {`
          @keyframes flash {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

// Define styles as a JavaScript object
const styles = {
  container: {
    position: 'relative',
    height: '100vh',
    width: '100vw',
    backgroundColor: '#000',
    overflow: 'hidden',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  text: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    color: 'black', // White color for better visibility on dark background
    fontSize: '2rem', // Larger font size

    textShadow: '5px 5px 8px rgba(0, 0, 0, 0.9)', // Enhanced shadow for depth
    textAlign: 'center', // Center align text
    letterSpacing: '2px', // Slightly increased letter spacing for readability
    lineHeight: '1.2', // Adjust line height for better spacing
    animation: 'flash 1s ease-out', // Flash animation
    fontFamily: '"Roboto", sans-serif', // Stylish font from Google Fonts
  }
};

export default Int;
