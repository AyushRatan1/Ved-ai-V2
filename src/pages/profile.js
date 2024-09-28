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
import { supabase } from "./supabaseClient"; // Import Supabase client
import LinkedInIcon from "@mui/icons-material/LinkedIn"; // LinkedIn icon
import GitHubIcon from "@mui/icons-material/GitHub"; // GitHub icon
import InstagramIcon from "@mui/icons-material/Instagram"; // Instagram icon
import { FaLinkedin, FaInstagram } from "react-icons/fa"; // Optional: For animated icons

const Profile = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(true); // For preloader
  const [profileData, setProfileData] = useState(null);
  const [password, setPassword] = useState(""); // State for password
  const [passwordVisible, setPasswordVisible] = useState(false); // State for text box visibility
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  const email = state?.email; // Get the email passed from the Socials page

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!email) {
        console.error("No email provided");
        setLoading(false);
        return;
      }

      try {
        // Fetch the user's name and interests based on the email
        const { data: nameData, error: nameError } = await supabase
          .from("answers")
          .select("answer")
          .eq("email", email)
          .eq("question_number", 2); // Fetching name from question 2

        const { data: interestsData, error: interestsError } = await supabase
          .from("answers")
          .select("answer")
          .eq("email", email)
          .eq("question_number", 3); // Fetching interests from question 3

        if (nameError || interestsError) throw nameError || interestsError;

        // Extract data and set profile data
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

  // Function to handle setting the password
  const handleSetPassword = async () => {
    if (!password) {
      setSnackbarOpen(true); // Show snackbar if password is empty
      return;
    }

    const { error } = await supabase
      .from("your_table_name") // Replace with your actual table name
      .update({ passwords: password }) // Ensure the column name is correct
      .eq("email", email); // Assuming email is the unique identifier

    if (error) {
      console.error("Error setting password: ", error);
      return;
    }

    setPassword(""); // Clear password input
    setPasswordVisible(false); // Hide password input box
    alert("Password set successfully!"); // Optional success alert
    window.location.href = "http://localhost:3000"; // Redirect after setting password
  };

  // Function to handle skip action
  const handleSkip = () => {
    if (!password) {
      alert("Please set a password before skipping."); // Alert if password is not set
    } else {
      window.location.href = "http://localhost:3000"; // Redirect on skip
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "#121212",
        color: "#ffffff",
        padding: "40px",
        overflow: "hidden",
        position: "relative",
      }}
    >
      {loading ? (
        <CircularProgress color="inherit" /> // Preloader animation
      ) : (
        <>
          {/* Profile Card */}
          <Box
            sx={{
              backgroundColor: "#1F1F1F",
              padding: "60px", // Increased padding for a larger card
              borderRadius: "20px",
              boxShadow: "0 8px 20px rgba(255, 255, 255, 0.5)", // Softer shadow
              textAlign: "center",
              width: "350px", // Width remains the same
              height: "500px", // Increased height
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)", // Scale on hover
                boxShadow: "0 16px 40px rgba(255, 255, 255, 0.3)", // Increase shadow on hover
              },
            }}
          >
            {/* Standard Profile Image */}
            <Avatar
              sx={{
                width: "200px",
                height: "200px",
                margin: "0 auto",
                border: "2px solid #fff", // Add border to avatar
                transition: "transform 0.3s ease",
              }}
              src="./ava.jpg" // Update with your image path in the public folder
            />

            {/* User Details */}
            <Typography variant="h3" sx={{ mt: 2 }}>
              {profileData.name}
            </Typography>
            <Typography variant="subtitle1" sx={{ color: "#bbb", mt: 1 }}>
              {profileData.email}
            </Typography>
            <Typography variant="body1" sx={{ mt: 3 }}>
              Interests: {profileData.interests}
            </Typography>
          </Box>

          {/* Right Side Content */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "center",
              ml: 6, // Increased margin to the left for better spacing
              color: "#ffffff",
            }}
          >
            <Typography variant="h2" sx={{ mb: 3, fontWeight: "bold" }}>
              Let's connect your socials
            </Typography>

            {/* Social Media Options */}
            <Box sx={{ display: "flex", gap: 4 }}>
              <IconButton
                href="https://www.linkedin.com"
                target="_blank"
                color="inherit"
                sx={{
                  fontSize: "60px",
                  animation: "pulse 2s infinite ease-in-out", // Optional: Add pulse effect
                  "&:hover": {
                    transform: "scale(1.2)", // Scale on hover
                  },
                }}
              >
                <FaLinkedin style={{ color: "#007FFF", fontSize: "2.5rem" }} />
              </IconButton>
              <IconButton
                href="https://github.com"
                target="_blank"
                color="inherit"
                sx={{
                  fontSize: "60px",
                  animation: "pulse 2s infinite ease-in-out", // Optional: Add pulse effect
                  "&:hover": {
                    transform: "scale(1.2)", // Scale on hover
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
                  animation: "pulse 2s infinite ease-in-out", // Optional: Add pulse effect
                  "&:hover": {
                    transform: "scale(1.2)", // Scale on hover
                  },
                }}
              >
                <FaInstagram style={{ color: "#E4405F", fontSize: "2.5rem" }} />
              </IconButton>
            </Box>

            {/* Set Password Button */}
            <Button
              variant="contained"
              color="secondary"
              sx={{
                mt: 4,
                backgroundColor: "#FF5722", // Custom color for Set Password button
                "&:hover": {
                  backgroundColor: "#E64A19",
                  transform: "scale(1.05)",
                },
                "&:active": { transform: "scale(0.95)" }, // Scale down on click
                transition: "transform 0.2s ease, background-color 0.2s ease", // Smooth transition for background color and scaling
              }}
              onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
            >
              Set Password
            </Button>

            {/* Password Input Field */}
            {passwordVisible && (
              <TextField
                variant="outlined"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)} // Update password state
                sx={{
                  mt: 2,
                  width: "250px", // Set the width for the input field
                  backgroundColor: "#fff", // White background for better visibility
                }}
              />
            )}

            {/* Confirm Password Button */}
            {passwordVisible && (
              <Button
                variant="contained"
                color="primary"
                sx={{
                  mt: 2,
                  "&:hover": {
                    backgroundColor: "#3700b3",
                    transform: "scale(1.05)",
                  },
                  "&:active": { transform: "scale(0.95)" },
                  transition: "transform 0.2s ease, background-color 0.2s ease",
                }}
                onClick={handleSetPassword} // Set password
              >
                Confirm Password
              </Button>
            )}

            {/* Skip Button */}
            <Button
              variant="outlined"
              color="inherit"
              sx={{
                mt: 4,
                borderColor: "#ffffff",
                "&:hover": {
                  backgroundColor: "#ffffff",
                  color: "#000000",
                  transform: "scale(1.05)",
                },
                "&:active": { transform: "scale(0.95)" },
                transition: "transform 0.2s ease",
              }}
              onClick={handleSkip} // Skip action
            >
              Skip for now
            </Button>
          </Box>
        </>
      )}

      {/* Snackbar for error messages */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Please set a password."
      />
    </Box>
  );
};

export default Profile;
