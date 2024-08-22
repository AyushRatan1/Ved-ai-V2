import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Int = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      navigate("/ques"); // Redirect to Ques page after 8 minutes
    }, 8000); // 8 minutes in milliseconds

    return () => {
      clearTimeout(redirectTimer);
    };
  }, [navigate]);

  return (
    <div style={styles.container}>
      <video
        src="/VE.mp4" // Replace with your video URL
        autoPlay
        muted
        loop
        playsInline
        controls={false} // Ensure controls are disabled to help with autoplay
        style={styles.video}
      />

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
  },
};

export default Int;
