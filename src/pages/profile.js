import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Avatar,
  IconButton,
  Button,
  Snackbar,
  CircularProgress,
} from "@mui/material";
import { useLocation } from "react-router-dom";
import { supabase } from "./supabaseClient";
import { FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";

const Profile = () => {
  const { state } = useLocation();
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const email = state?.email;

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!email) {
        setSnackbarMessage("No email provided");
        setSnackbarOpen(true);
        setLoading(false);
        return;
      }

      try {
        // Fetch the user data based on the email
        const { data, error } = await supabase
          .from("answer")
          .select("name, interests") // Adjusted to get both name and interests
          .eq("email", email)
          .single(); // Fetching single row

        if (error) throw error;

        setProfileData({
          name: data.name || "No Name",
          interests: data.interests || "No Interests",
          email,
        });
        setLoading(false);
      } catch (error) {
        setSnackbarMessage("Error fetching profile data: " + error.message);
        setSnackbarOpen(true);
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [email]);
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#0A0A23",
        color: "#FFFFFF",
        padding: "20px",
      }}
    >
      {loading ? (
        <CircularProgress color="inherit" />
      ) : (
        <Box
          sx={{
            display: "flex",
            gap: "40px",
            maxWidth: "900px",
            width: "100%",
            alignItems: "center",
          }}
        >
          {/* Left Side Text Section */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h2"
              sx={{ fontWeight: "bold", color: "#FFFFFF", mb: 2 }}
            >
              Let’s Dive into <span style={{ color: "#8A2BE2" }}>VED</span> and
              explore the world
            </Typography>
            <Typography variant="body1" sx={{ color: "#AAAAAA", mb: 4 }}>
              Embark on a journey of discovery and innovation with{" "}
              {profileData.name}. Let's shape the future together!
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              sx={{
                mt: 4,
                backgroundColor: "#FF5722",
                "&:hover": {
                  backgroundColor: "#E64A19",
                  transform: "scale(1.05)",
                },
              }}
              onClick={() =>
                (window.location.href = "https://googlehack-v1.vercel.app/")
              } // Redirects to localhost:3000
            >
              Next
            </Button>
          </Box>

          {/* Profile Card Section */}
          <Box
            sx={{
              backgroundColor: "#1E1E30",
              padding: "30px",
              borderRadius: "15px",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.5)",
              textAlign: "center",
              width: { xs: "100%", sm: "400px" },
            }}
          >
            <Avatar
              sx={{
                width: "100px",
                height: "100px",
                margin: "0 auto",
                mb: 2,
              }}
              src="./ava.jpg"
            />
            <Typography
              variant="h5"
              sx={{ fontWeight: "bold", color: "#FFFFFF", mb: 1 }}
            >
              {profileData.name}
            </Typography>
            <Typography variant="body2" sx={{ color: "#AAAAAA", mb: 2 }}>
              Passionate developer | AI enthusiast | Open source contributor
            </Typography>

            {/* Social Icons */}
            <Box
              sx={{ display: "flex", justifyContent: "center", gap: 2, mb: 3 }}
            >
              <IconButton
                href="https://www.linkedin.com"
                target="_blank"
                sx={{
                  color: "#0077B5",
                  fontSize: "24px",
                  "&:hover": {
                    color: "#005582",
                  },
                }}
              >
                <FaLinkedin />
              </IconButton>
              <IconButton
                href="https://github.com"
                target="_blank"
                sx={{
                  color: "#FFFFFF",
                  fontSize: "24px",
                  "&:hover": {
                    color: "#888888",
                  },
                }}
              >
                <FaGithub />
              </IconButton>
              <IconButton
                href="https://www.instagram.com"
                target="_blank"
                sx={{
                  color: "#E4405F",
                  fontSize: "24px",
                  "&:hover": {
                    color: "#D0314B",
                  },
                }}
              >
                <FaInstagram />
              </IconButton>
            </Box>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#8A2BE2",
                color: "#FFFFFF",
                borderRadius: "8px",
                width: "100%",
                "&:hover": {
                  backgroundColor: "#7A1FD1",
                },
              }}
            >
              Edit Profile
            </Button>
          </Box>

          <Snackbar
            open={snackbarOpen}
            message={snackbarMessage}
            autoHideDuration={3000}
            onClose={() => setSnackbarOpen(false)}
          />
        </Box>
      )}
    </Box>
  );
};

export default Profile;
