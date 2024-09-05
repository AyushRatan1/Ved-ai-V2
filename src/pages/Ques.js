import React, { useState, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient"; // Import the Supabase client

const Ques = () => {
  const questions = [
    "What's your email address?",
    "Okay, first: what's your name  (Ex. Hi, I'm Ayush.)",
    "What's your idea? Or if you don't have one yet, what are you curious about exploring? Just a short description, 1-2 sentences.",
    "Any specific aspect or application you're passionate about?",
  ];

  const [displayedText, setDisplayedText] = useState("");
  const [fullText, setFullText] = useState([]);
  const [answer, setAnswer] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [email, setEmail] = useState(""); // To store the email ID
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate(); // Use navigate for redirect

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const displayText = (index) => {
      if (index < questions.length) {
        let currentText = "";
        let charIndex = 0;

        const typeChar = () => {
          if (charIndex < questions[index].length) {
            currentText += questions[index][charIndex];
            setDisplayedText(currentText);
            charIndex++;
            setTimeout(typeChar, 50); // Adjust typing speed here
          } else {
            setFullText([...fullText, currentText]);
            setDisplayedText(""); // Clear displayedText for the next question
          }
        };

        typeChar();
      }
    };

    displayText(currentQuestionIndex);
  }, [currentQuestionIndex]);

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (e.key === "Enter" && answer.trim() !== "") {
      if (currentQuestionIndex === 0) {
        setEmail(answer); // Store the email
      }

      const updatedAnswers = [...answers, answer];
      setAnswers(updatedAnswers);
      setAnswer("");

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        console.log("All Answers:", updatedAnswers);

        try {
          const { data, error } = await supabase.from("answers").insert(
            updatedAnswers.map((ans, index) => ({
              email: email,
              answer: ans,
              question_number: index + 1,
              timestamp: new Date(),
            }))
          );

          if (error) throw error;

          console.log("Answers saved successfully!", data);
          // Pass email to the Socials page
          navigate("/socials", { state: { email } });
        } catch (error) {
          console.error("Error saving answers: ", error);
        }
      }
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
      {/* Mouse Glow Effect */}
      <Box
        sx={{
          position: "absolute",
          pointerEvents: "none",
          width: "100px",
          height: "100px",
          borderRadius: "30%",
          background: "rgba(255, 255, 255, 0.5)",
          filter: "blur(50px)",
          transform: "translate(-50%, -50%)",
          transition: "opacity 0.2s",
          opacity: 0.6,
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      />

      {/* Left Side: Image */}
      <Box sx={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <img
          src="/VED.png" // Replace with your image file path
          alt="Left Side"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
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
          justifyContent: "flex-start",
          position: "relative",
          zIndex: 1,
          left: "5%",
        }}
      >
        <Typography
          variant="h2"
          gutterBottom
          sx={{ fontSize: { xs: "2.2rem", sm: "2.7rem" }, color: "#ffffff" }}
        >
          Introduce yourself
        </Typography>
        <Box
          sx={{
            mt: 2,
            fontSize: { xs: "1rem", sm: "1.4rem" },
            color: "#ffffff",
            whiteSpace: "pre-wrap", // To keep formatting
            lineHeight: "1.6", // Better readability
            mb: "100px", // Space for the answer box
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            padding: "20px",
            borderRadius: "15px",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.3)",
            width: "60%",
          }}
        >
          {fullText.map((line, index) => (
            <Typography key={index} sx={{ opacity: 1 }}>
              {line}
            </Typography>
          ))}
          <Typography sx={{ opacity: 1 }}>{displayedText}</Typography>
        </Box>

        <Box
          sx={{
            position: "fixed",
            bottom: "20px",
            width: "50%",
            left: "30%",
            right: "5%",
            padding: "15px",
            borderRadius: "15px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.3)",
          }}
        >
          <TextField
            label="Your Answer"
            name="answer"
            value={answer}
            onChange={handleChange}
            onKeyDown={handleSubmit}
            fullWidth
            margin="normal"
            sx={{
              input: { color: "#ffffff", fontSize: "1.3rem" },
              label: { color: "#bbbbbb", fontSize: "1.3rem" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "#ffffff", // White border
                },
                "&:hover fieldset": {
                  borderColor: "#ffffff", // White border on hover
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#ffffff", // White border when focused
                },
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Ques;
