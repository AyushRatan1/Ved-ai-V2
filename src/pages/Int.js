import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Int = () => {
  const [showText, setShowText] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowText(true);
    }, 7000); // Time to wait before showing the text (adjust as needed)

    const redirectTimer = setTimeout(() => {
      navigate("/ques"); // Redirect to Ques page
    }, 10000); // Time to show the text before redirecting (adjust as needed)

    return () => {
      clearTimeout(timer);
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div style={styles.container}>
      <video
        src="/1.mp4" // Replace with your video URL
        autoPlay
        muted
        loop
        playsInline
        controls={false} // Ensure controls are disabled to help with autoplay
        style={styles.video}
      />
      {showText && <div style={styles.text}>VED AI</div>}
      <style>
        {`
          @keyframes fadeInScale {
            0% {
              opacity: 0;
              transform: scale(0.8);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }
        `}
      </style>
    </div>
  );
};

// Define styles as a JavaScript object
const styles = {
  container: {
    position: "relative",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#000",
    overflow: "hidden",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    pointerEvents: "none", // Prevents any interaction with the video
    WebkitOverflowScrolling: "touch", // WebKit-specific style for better touch handling
  },
  text: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "#fff", // Adjust color for visibility on your video
    fontSize: "3rem", // Set a professional font size
    textShadow: "2px 2px 8px rgba(0, 0, 0, 0.7)", // Subtle shadow for depth
    textAlign: "center",
    letterSpacing: "1px",
    lineHeight: "1.2",
    animation: "fadeInScale 2s ease-in-out forwards", // Apply the formal animation
    fontFamily: '"Roboto", sans-serif',
  },
};

export default Int;
