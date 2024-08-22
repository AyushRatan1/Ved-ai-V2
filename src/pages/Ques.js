import React, { useState, useEffect } from "react";
import { Box, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient"; // Import the Supabase client

const Ques = () => {
  const greeting =
    "Hello friend. I'm excited to help you find interesting ways to learn.";
  const introduction =
    "Let's start your journey here — all you gotta do is make a profile. It'll take 60-seconds max, promise.";
  const question =
    "Okay, first: what's your name & where are you based? Drop your city + country. (Ex. Hi, I'm Ayush. I'm from Bangalore, India)";

  const [displayedText, setDisplayedText] = useState("");
  const [fullText, setFullText] = useState([]);
  const [answer, setAnswer] = useState("");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const navigate = useNavigate();

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
    const textArray = [greeting, introduction, question];
    let accumulatedText = [];

    const typeLine = (line, callback) => {
      let currentText = "";
      let charIndex = 0;

      const typeChar = () => {
        if (charIndex < line.length) {
          currentText += line[charIndex];
          setDisplayedText(currentText);
          charIndex++;
          setTimeout(typeChar, 50); // Adjust typing speed here
        } else {
          accumulatedText.push(currentText);
          setFullText([...accumulatedText]);
          setDisplayedText(""); // Clear displayedText for the next line
          if (callback) callback();
        }
      };

      typeChar();
    };

    const displayText = (index) => {
      if (index < textArray.length) {
        typeLine(textArray[index], () => displayText(index + 1));
      }
    };

    displayText(0);
  }, []);

  const handleChange = (e) => {
    setAnswer(e.target.value);
  };

  const handleSubmit = async (e) => {
    if (e.key === "Enter" && answer.trim() !== "") {
      console.log("Submitted Answer:", answer);
      try {
        // Insert the answer into the Supabase database
        const { data, error } = await supabase
          .from("answers")
          .insert([{ answer, timestamp: new Date() }]);

        if (error) throw error;

        console.log("Answer saved successfully!", data);
      } catch (error) {
        console.error("Error saving answer: ", error);
      }

      setAnswer("");
      // Redirect to the external URL
      setTimeout(() => {
        window.location.href = "https://ved-ai-original-production.up.railway.app/";
      }, 1000);
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
