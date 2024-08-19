import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import WorkIcon from "@mui/icons-material/Work";
import ExtensionIcon from "@mui/icons-material/Extension";
import { Link } from "react-router-dom";

const Insights = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#1a1a1a", // Slightly lighter shade for contrast
        color: "#ffffff",
        padding: "60px 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          marginBottom: "40px",
          textAlign: "center",
          textTransform: "uppercase",
          letterSpacing: "2px",
        }}
      >
        AI Insights
      </Typography>

      <Grid container spacing={6} justifyContent="center">
        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "#2d2d2d",
              padding: "40px 20px",
              borderRadius: "12px",
              textAlign: "center",
              transition: "transform 0.3s ease, background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#444",
                transform: "scale(1.05)",
              },
            }}
            component={Link}
            to="https://googlehack-v1.vercel.app/"
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <LightbulbIcon fontSize="large" sx={{ color: "#ffd700" }} />
              <Typography
                variant="h5"
                sx={{ marginTop: "15px", fontWeight: "bold" }}
              >
                Explore AI
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginTop: "10px",
                  color: "#cccccc",
                  textAlign: "center",
                }}
              >
                Dive deep into AI's latest trends and developments.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  marginTop: "25px",
                  color: "#ffd700",
                  borderColor: "#ffd700",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#ffffff",
                    color: "#ffffff",
                  },
                }}
                component={Link}
                to="https://googlehack-v1.vercel.app/"
              >
                Explore AI
              </Button>
            </Box>
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "#2d2d2d",
              padding: "40px 20px",
              borderRadius: "12px",
              textAlign: "center",
              transition: "transform 0.3s ease, background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#444",
                transform: "scale(1.05)",
              },
            }}
            component={Link}
            to="/ai-applications"
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <ExtensionIcon fontSize="large" sx={{ color: "#00c853" }} />
              <Typography
                variant="h5"
                sx={{ marginTop: "15px", fontWeight: "bold" }}
              >
                AI Applications
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginTop: "10px",
                  color: "#cccccc",
                  textAlign: "center",
                }}
              >
                See how AI is used in real-world applications.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  marginTop: "25px",
                  color: "#00c853",
                  borderColor: "#00c853",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#ffffff",
                    color: "#ffffff",
                  },
                }}
                component={Link}
                to="/ai-applications"
              >
                Applications
              </Button>
            </Box>
          </Button>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Button
            variant="contained"
            sx={{
              width: "100%",
              backgroundColor: "#2d2d2d",
              padding: "40px 20px",
              borderRadius: "12px",
              textAlign: "center",
              transition: "transform 0.3s ease, background-color 0.3s ease",
              "&:hover": {
                backgroundColor: "#444",
                transform: "scale(1.05)",
              },
            }}
            component={Link}
            to="/ai-business"
          >
            <Box display="flex" flexDirection="column" alignItems="center">
              <WorkIcon fontSize="large" sx={{ color: "#1e88e5" }} />
              <Typography
                variant="h5"
                sx={{ marginTop: "15px", fontWeight: "bold" }}
              >
                AI in Business
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginTop: "10px",
                  color: "#cccccc",
                  textAlign: "center",
                }}
              >
                Learn how AI is transforming business processes.
              </Typography>
              <Button
                variant="outlined"
                sx={{
                  marginTop: "25px",
                  color: "#1e88e5",
                  borderColor: "#1e88e5",
                  textTransform: "none",
                  "&:hover": {
                    borderColor: "#ffffff",
                    color: "#ffffff",
                  },
                }}
                component={Link}
                to="/ai-business"
              >
                Explore
              </Button>
            </Box>
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Insights;
