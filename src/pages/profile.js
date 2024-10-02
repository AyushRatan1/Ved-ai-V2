import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  CircularProgress,
  Avatar,
  IconButton,
  Button,
  TextField,
  Snackbar,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { supabase } from "./supabaseClient";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import InstagramIcon from "@mui/icons-material/Instagram";
import { FaLinkedin, FaInstagram } from "react-icons/fa";

const Profile = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const email = state?.email;
  const redirectLink = "https://googlehack-v1.vercel.app/";

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!email) {
        console.error("No email provided");
        setLoading(false);
        return;
      }

      try {
        const { data: nameData } = await supabase
          .from("answers")
          .select("answer")
          .eq("email", email)
          .eq("question_number", 2);

        const { data: interestsData } = await supabase
          .from("answers")
          .select("answer")
          .eq("email", email)
          .eq("question_number", 3);

        setProfileData({
          name: nameData[0]?.answer || "No Name",
          interests: interestsData[0]?.answer || "No Interests",
          email,
        });
        setLoading(false);
      } catch (error) {
        console.error("Error fetching profile data: ", error);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [email]);

  const handleSetPassword = async () => {
    if (!password) {
      setSnackbarOpen(true);
      return;
    }

    try {
      await supabase
        .from("your_table_name")
        .update({ passwords: password })
        .eq("email", email);

      alert("Password set successfully!");
    } catch (error) {
      console.error("Error setting password: ", error);
    } finally {
      window.location.href = redirectLink;
    }
  };

  const handleSkip = () => {
    window.location.href = redirectLink;
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "linear-gradient(135deg, #0d0d0d 0%, #1a1a1a 100%)",
        color: "#ffffff",
        padding: "40px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <>
          <Box
            sx={{
              backgroundColor: "#101010",
              padding: "60px",
              borderRadius: "20px",
              boxShadow: "0 8px 20px rgba(0, 255, 255, 0.5)",
              textAlign: "center",
              width: "400px",
              height: "550px",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                boxShadow: "0 16px 40px rgba(0, 255, 255, 0.7)",
              },
            }}
          >
            <Avatar
              sx={{
                width: "200px",
                height: "200px",
                margin: "0 auto",
                border: "3px solid #0ff",
                transition: "transform 0.5s ease-in-out",
                animation: "pulse 1.5s infinite",
              }}
              src="./ava.jpg"
            />

            <Typography variant="h3" sx={{ mt: 2, color: "#0ff" }}>
              {profileData.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#aaa", mt: 1 }}>
              {profileData.email}
            </Typography>
            <Typography variant="body1" sx={{ mt: 3, color: "#fff" }}>
              Interests: {profileData.interests}
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              ml: 6,
              color: "#ffffff",
            }}
          >
            <Typography variant="h2" sx={{ mb: 3, fontWeight: "bold" }}>
              Let's connect your socials
            </Typography>

            <Box sx={{ display: "flex", gap: 4 }}>
              <IconButton
                href="https://www.linkedin.com"
                target="_blank"
                color="inherit"
                sx={{
                  fontSize: "60px",
                  "&:hover": {
                    transform: "scale(1.2)",
                    color: "#00ffff",
                  },
                }}
              >
                <FaLinkedin style={{ color: "#007FFF", fontSize: "3rem" }} />
              </IconButton>
              <IconButton
                href="https://github.com"
                target="_blank"
                color="inherit"
                sx={{
                  fontSize: "60px",
                  "&:hover": {
                    transform: "scale(1.2)",
                    color: "#00ffff",
                  },
                }}
              >
                <GitHubIcon />
              </IconButton>
              <IconButton
                href="https://www.instagram.com"
                target="_blank"
                color="inherit"
                sx={{
                  fontSize: "60px",
                  "&:hover": {
                    transform: "scale(1.2)",
                    color: "#00ffff",
                  },
                }}
              >
                <FaInstagram
                  style={{ color: "#E4405F", fontSize: "3rem" }}
                />
              </IconButton>
            </Box>

            <Button
              variant="contained"
              color="secondary"
              sx={{
                mt: 4,
                backgroundColor: "#FF5722",
                animation: "glow 1.5s infinite alternate",
                "&:hover": {
                  backgroundColor: "#E64A19",
                  transform: "scale(1.05)",
                },
                transition: "transform 0.2s ease, background-color 0.2s ease",
              }}
              onClick={() => setPasswordVisible(!passwordVisible)}
            >
              Set Password
            </Button>

            {passwordVisible && (
              <TextField
                variant="outlined"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{
                  mt: 2,
                  width: "250px",
                  backgroundColor: "#fff",
                  borderRadius: "8px",
                  transform: "translateX(-50px)",
                  transition: "transform 0.5s ease-in-out",
                  boxShadow: "0 4px 10px rgba(0, 255, 255, 0.3)",
                }}
              />
            )}

            {passwordVisible && (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  "&:hover": {
                    backgroundColor: "#007FFF",
                  },
                }}
                onClick={handleSetPassword}
              >
                Confirm Password
              </Button>
            )}

            <Button
              variant="text"
              sx={{
                mt: 2,
                textDecoration: "underline",
                color: "#bbb",
                "&:hover": {
                  color: "#fff",
                },
              }}
              onClick={handleSkip}
            >
              Skip for now
            </Button>
          </Box>

          <Snackbar
            open={snackbarOpen}
            message="Please enter a password"
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
          />
        </>
      )}
    </Box>
  );
};

export default Profile;
