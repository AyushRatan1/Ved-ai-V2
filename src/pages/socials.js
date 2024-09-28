import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton, Button } from "@mui/material";
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import { supabase } from "./supabaseClient"; // Import Supabase client
import { keyframes } from "@mui/system";

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

const fadeSlideIn = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

const Socials = () => {
  const { state } = useLocation();
  const [name, setName] = useState("");
  const [githubConnected, setGithubConnected] = useState(false);
  const email = state?.email; // Safely get the email

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchName = async () => {
      if (!email) {
        console.error("No email provided");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("answers")
          .select("answer")
          .eq("email", email)
          .eq("question_number", 2); // Fetching the name from the second question

        if (error) throw error;

        if (data.length > 0) {
          const userName = data[0].answer; // Get the name answer
          setName(userName || ""); // Default to an empty string if no name
        }
      } catch (error) {
        console.error("Error fetching name: ", error);
      }
    };

    fetchName();
  }, [email]);

  const handleGithubConnect = async () => {
    const { user, session, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) {
      console.error("GitHub login error:", error);
      return;
    }

    if (session && user) {
      try {
        const { data, error: saveError } = await supabase
          .from("github_accounts")
          .upsert({
            email: email,
            github_id: user.user_metadata.user_id,
            github_username: user.user_metadata.user_name,
            github_avatar: user.user_metadata.avatar_url,
          });

        if (saveError) throw saveError;

        setGithubConnected(true);
      } catch (error) {
        console.error("Error saving GitHub data:", error);
      }
    }
  };

  const handleSkip = () => {
    navigate("/profile", { state: { email } });
  };

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
        <Typography
          variant="h2"
          gutterBottom
          sx={{
            animation: `${fadeSlideIn} 1.5s ease-out forwards`,
            display: "inline-block",
            fontSize: "2.5rem",
            opacity: 0,
            "@media (min-width: 600px)": {
              fontSize: "3.5rem",
            },
          }}
        >
          {name
            ? `Hey, ${name}! Let's connect your socials`
            : "Hey, let's connect your socials"}
        </Typography>

        <Box
          sx={{ mt: 4, display: "flex", gap: "20px", justifyContent: "center" }}
        >
          {/* GitHub Connect Button */}
          {!githubConnected ? (
            <IconButton
              sx={{
                color: "#FFFFFF",
                fontSize: "2.5rem",
                animation: `${pulse} 2s infinite ease-in-out`,
                "&:hover": {
                  color: "#FFFFFF",
                  boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
                },
              }}
              onClick={handleGithubConnect}
            >
              <FaGithub />
            </IconButton>
          ) : (
            <Typography variant="h6" sx={{ color: "#333", mt: 2 }}>
              GitHub Connected!
            </Typography>
          )}

          {/* Other Social Media Logos */}
          <IconButton
            sx={{
              color: "#007FFF", // LinkedIn color
              fontSize: "2.5rem",
              animation: `${pulse} 2s infinite ease-in-out`,
              "&:hover": {
                color: "#007FFF",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            <FaLinkedin />
          </IconButton>
          <IconButton
            sx={{
              color: "#1DA1F2", // Twitter color
              fontSize: "2.5rem",
              animation: `${pulse} 2s infinite ease-in-out`,
              "&:hover": {
                color: "#1A91DA",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            <FaTwitter />
          </IconButton>
          <IconButton
            sx={{
              color: "#E4405F", // Instagram color
              fontSize: "2.5rem",
              animation: `${pulse} 2s infinite ease-in-out`,
              "&:hover": {
                color: "#C13584",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              },
            }}
          >
            <FaInstagram />
          </IconButton>
        </Box>

        {/* Skip Button */}
        <Button
          variant="contained"
          onClick={handleSkip}
          sx={{
            mt: 4,
            backgroundColor: "#ffffff",
            color: "#121212",
            fontSize: "1.2rem",
            padding: "10px 20px",
            borderRadius: "50px",
            animation: `${fadeSlideIn} 2s ease-out`,
            "&:hover": {
              backgroundColor: "#ddd",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
            },
          }}
        >
          Skip for now
        </Button>
      </Box>
    </Box>
  );
};

export default Socials;
