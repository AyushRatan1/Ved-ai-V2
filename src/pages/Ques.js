import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Button, Chip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";

const Ques = () => {
  const questions = [
    "Okay, first: What's your email address?",
    "And what's your name (Ex: Ace)",
  ];

  const interests = [
    "Java",
    "Python",
    "Web Development",
    "AI",
    "Machine Learning",
    "Data Science",
    "Blockchain",
    "Cloud Computing",
    "Cybersecurity",
  ];

  const relatedInterests = {
    Java: ["Spring", "JavaFX", "Android Development"],
    Python: ["Data Science", "Machine Learning", "Django"],
    WebDevelopment: ["React", "Node.js", "CSS"],
    // Add more related interests here
  };

  const [displayedText, setDisplayedText] = useState("");
  const [answer, setAnswer] = useState("");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [email, setEmail] = useState("");
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [suggestedInterests, setSuggestedInterests] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (questions[currentQuestionIndex]) {
      let currentText = "";
      let charIndex = 0;

      const typeChar = () => {
        if (charIndex < questions[currentQuestionIndex].length) {
          currentText += questions[currentQuestionIndex][charIndex];
          setDisplayedText(currentText);
          charIndex++;
          setTimeout(typeChar, 50);
        }
      };

      typeChar();
    }
  }, [currentQuestionIndex]);

  const handleAnswerSubmit = async () => {
    if (answer.trim() !== "") {
      if (currentQuestionIndex === 0) setEmail(answer);

      const updatedAnswers = [...answers, answer];
      setAnswers(updatedAnswers);
      setAnswer("");

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        setCurrentQuestionIndex(-1); // Move to interest selection screen
      }
    }
  };

  const handleInterestClick = (interest) => {
    if (!selectedInterests.includes(interest)) {
      setSelectedInterests([...selectedInterests, interest]);
      setSuggestedInterests(relatedInterests[interest] || []);
    }
  };

  const handleRemoveInterest = (interest) => {
    setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    if (relatedInterests[interest]) setSuggestedInterests([]);
  };

  const handleSubmitAll = async () => {
    try {
      const { data, error } = await supabase.from("answer").insert([
        {
          email,
          name: answers[1],
          interests: selectedInterests.join(", "),
          created_at: new Date(),
        },
      ]);

      if (error) throw error;

      // Add a slight delay before navigating to the profile page
      setTimeout(() => {
        navigate("/profile", { state: { email }, replace: true });
      }, 500); // 500ms delay for soft transition
    } catch (error) {
      console.error("Error saving answers: ", error);
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
        position: "relative",
        top: 0,
        left: 0,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      {/* Left Side: Image */}
      <Box
        sx={{
          flex: 1,
          position: "relative",
          overflow: "hidden",
          display: { xs: "none", sm: "block" },
        }}
      >
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
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          zIndex: 1,
          textAlign: "center",
        }}
      >
        {currentQuestionIndex >= 0 && (
          <>
            <Typography
              variant="h2"
              sx={{ fontSize: { xs: "1.8rem", sm: "2.7rem" }, marginBottom: 3 }}
            >
              {displayedText}
            </Typography>
            <Box
              sx={{
                backgroundColor: "rgba(0 0 0 / 17%)",
                backdropFilter: "blur(10px)",
                borderRadius: "15px",
                boxShadow: "0px 4px 20px rgba(14 0 134)",
                padding: "20px",
                width: "100%",
                maxWidth: "500px",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 6px 30px rgba(255, 255, 255, 0.3)",
                },
              }}
            >
              <TextField
                label="Your Answer"
                name="answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleAnswerSubmit()}
                fullWidth
                margin="normal"
                sx={{
                  input: { color: "#ffffff", fontSize: "1.3rem" },
                  label: { color: "#bbbbbb", fontSize: "1.3rem" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": { borderColor: "rgba(255, 255, 255, 0.5)" },
                    "&:hover fieldset": { borderColor: "#ffffff" },
                    "&.Mui-focused fieldset": { borderColor: "#ffffff" },
                  },
                }}
              />
            </Box>
          </>
        )}

        {currentQuestionIndex === -1 && (
          <Box>
            <Typography variant="h2" sx={{ marginBottom: 3 }}>
              Select Your Interests
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
                gap: 2,
                marginBottom: 3,
              }}
            >
              {interests.map((interest) => (
                <Chip
                  key={interest}
                  label={interest}
                  onClick={() => handleInterestClick(interest)}
                  sx={{
                    background: selectedInterests.includes(interest)
                      ? "linear-gradient(45deg, #ff8a00, #e52e71)"
                      : "linear-gradient(45deg, #333, #444)",
                    color: "#ffffff",
                    fontSize: "1rem",
                    padding: "10px",
                    cursor: "pointer",
                    transition: "all 0.3s ease-in-out",
                    boxShadow: selectedInterests.includes(interest)
                      ? "0px 4px 10px rgba(255, 255, 255, 0.3)"
                      : "0px 4px 8px rgba(0, 0, 0, 0.3)",
                    "&:hover": {
                      boxShadow: "0px 6px 15px rgba(255, 255, 255, 0.4)",
                    },
                  }}
                />
              ))}
            </Box>

            <Button
              variant="contained"
              color="primary"
              sx={{
                marginTop: 4,
                padding: "10px 20px",
                background: "linear-gradient(45deg, #ff6b6b, #f06595)",
                boxShadow: "0px 4px 20px rgba(240, 101, 149, 0.4)",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 6px 30px rgba(240, 101, 149, 0.6)",
                  background: "linear-gradient(45deg, #f06595, #ff6b6b)",
                },
              }}
              onClick={handleSubmitAll}
            >
              Submit
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Ques;
