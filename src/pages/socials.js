import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { FaLinkedin, FaGithub, FaTwitter, FaInstagram } from "react-icons/fa";
import { useLocation } from "react-router-dom";
import { supabase } from "./supabaseClient"; // Import the Supabase client
import { keyframes } from "@mui/system";

// Animation for social media buttons
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
`;

const Socials = () => {
  const { state } = useLocation();
  const [name, setName] = useState("");
  const email = state?.email; // Get the email passed from Ques page

  useEffect(() => {
    const fetchName = async () => {
      if (!email) {
        console.error("No email provided");
        return;
      }

      try {
        // Fetch the user's name based on the email ID
        const { data, error } = await supabase
          .from("answers")
          .select("answer")
          .eq("email", email)
          .eq("question_number", 2); // Change this to fetch the name from the second question

        if (error) throw error;

        if (data.length > 0) {
          const fullAnswer = data[0].answer;
          // Assuming the format is "Hi, I'm [Name]. I'm from [City, Country]"
          const nameMatch = fullAnswer.match(/(\w+)/);
          if (nameMatch) {
            setName(nameMatch[1]);
          } else {
            console.error("Name extraction did not match expected format.");
          }
        }
      } catch (error) {
        console.error("Error fetching name: ", error);
      }
    };

    fetchName();
  }, [email]);

  return (
    <Box
      sx={{
        position: "relative",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "#ffffff",
        padding: "20px",
      }}
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        src="./socials.mp4" // Replace with your video URL
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
        }}
      />
      <Box
        sx={{
          textAlign: "center",
          zIndex: 1,
        }}
      >
        <Typography variant="h2" gutterBottom>
          Hey, {name}! Let's connect your socials
        </Typography>
        <Box
          sx={{ mt: 4, display: "flex", gap: "20px", justifyContent: "center" }}
        >
          <IconButton
            sx={{
              color: "#0B0BFF", // LinkedIn color
              fontSize: "3rem", // Increased size
              animation: `${pulse} 2s infinite`,
              "&:hover": {
                color: "#1A91DA",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Add a shadow effect
              },
            }}
            // Add login functionality here
          >
            <FaLinkedin />
          </IconButton>
          <IconButton
            sx={{
              color: "#FFFFFF", // GitHub color
              fontSize: "3rem", // Increased size
              animation: `${pulse} 2s infinite`,
              "&:hover": {
                color: "#FFFFFF",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Add a shadow effect
              },
            }}
            // Add login functionality here
          >
            <FaGithub />
          </IconButton>
          <IconButton
            sx={{
              color: "#1DA1F2", // Twitter color
              fontSize: "3rem", // Increased size
              animation: `${pulse} 2s infinite`,
              "&:hover": {
                color: "#1A91DA",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Add a shadow effect
              },
            }}
            // Add login functionality here
          >
            <FaTwitter />
          </IconButton>
          <IconButton
            sx={{
              color: "#E4405F", // Instagram color
              fontSize: "3rem", // Increased size
              animation: `${pulse} 2s infinite`,
              "&:hover": {
                color: "#C13584",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)", // Add a shadow effect
              },
            }}
            // Add login functionality here
          >
            <FaInstagram />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
};

export default Socials;
