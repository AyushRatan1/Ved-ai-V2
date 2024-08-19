import React, { useState } from "react";
import Typing from "react-typing-effect";
import { Box, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for routing
import { db } from "./firebase"; // Import Firestore
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions

const Ques = () => {
  const questions = [
    "What is your Name?",
    "What is your profession?",
    "What are your hobbies?",
    "Where are you from?",
  ];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isTyping, setIsTyping] = useState(true); // New state for typing control
  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (e.key === "Enter" && answer.trim() !== "") {
      console.log("Submitted Answer:", answer);

      // Save the answer to Firestore
      try {
        await addDoc(collection(db, "answers"), {
          question: questions[currentQuestionIndex],
          answer,
          timestamp: new Date(),
        });
        console.log("Answer saved successfully!");
      } catch (error) {
        console.error("Error saving answer: ", error);
      }

      setAnswer(""); // Clear the input field
      setIsTyping(false); // Stop typing animation

      // Wait before showing the next question
      setTimeout(() => {
        setCurrentQuestionIndex((prevIndex) => {
          if (prevIndex < questions.length - 1) {
            setIsTyping(true); // Start typing animation for next question
            return prevIndex + 1;
          } else {
            // Redirect to the Quotes page after the last question
            navigate("/quotes"); // Ensure the path matches your routing configuration
            return prevIndex;
          }
        });
      }, 1000); // Delay before transitioning to the next question (1 second)
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#121212",
        color: "#ffffff",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      {/* Left Side: Video */}
      <Box sx={{ flex: 2, position: "relative", overflow: "hidden" }}>
        <video
          src="/vid.mp4" // Ensure this path is correct
          autoPlay
          loop
          muted
          playsInline
          preload="auto" // Preload the video to ensure it starts quickly
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            pointerEvents: "none", // Prevents interaction
          }}
        />
      </Box>

      {/* Right Side: Form */}
      <Box
        sx={{
          flex: 3,
          p: 4,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontSize: { xs: "2rem", sm: "2.5rem" } }}
        >
          Introduce yourself
        </Typography>
        <Box
          sx={{
            mt: 2,
            height: "20%", // Set the fixed height
            fontSize: { xs: "2rem", sm: "3.5rem" },
            color: "#ffffff",
            overflow: "hidden", // Prevent overflow
          }}
        >
          {isTyping ? (
            <Typing
              text={questions[currentQuestionIndex]}
              speed={70} // Slower speed for a smoother effect
              eraseSpeed={50}
              eraseDelay={1000}
              typingDelay={500}
              displayTextRenderer={(text) => <span>{text}</span>}
            />
          ) : (
            <span style={{ opacity: 0 }}>
              {questions[currentQuestionIndex]}
            </span>
          )}
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
              input: { color: "#ffffff", fontSize: "1.25rem" },
              label: { color: "#bbbbbb", fontSize: "1.25rem" },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Ques;
