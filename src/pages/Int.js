import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Int = () => {
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(false);
  const [isHoveringSignIn, setIsHoveringSignIn] = useState(false);
  const [isHoveringSignUp, setIsHoveringSignUp] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowOverlay(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  // Handlers for opening and closing the Sign In modal
  const handleSignIn = () => {
    setShowSignInModal(true);
  };

  const closeSignInModal = () => {
    setShowSignInModal(false);
  };

  // Function to handle form submission (for Sign In)
  const handleSignInSubmit = (e) => {
    e.preventDefault();
    console.log("Sign In form submitted");
  };

  return (
    <div style={styles.container}>
      <video
        src="/VED2.mp4" // Replace with your video URL
        autoPlay
        muted
        loop
        playsInline
        controls={false}
        style={styles.video}
      />

      {showOverlay && (
        <div style={styles.overlay}>
          <div style={styles.textContainer}>
            <p style={styles.subtitle}>Let's dive in</p>
            <div style={styles.buttonContainer}>
              <button
                style={
                  isHoveringSignIn
                    ? { ...styles.button, ...styles.buttonHover }
                    : styles.button
                }
                onMouseEnter={() => setIsHoveringSignIn(true)}
                onMouseLeave={() => setIsHoveringSignIn(false)}
                onClick={handleSignIn}
              >
                Sign In
              </button>
              <button
                style={
                  isHoveringSignUp
                    ? { ...styles.button, ...styles.buttonHover }
                    : styles.button
                }
                onMouseEnter={() => setIsHoveringSignUp(true)}
                onMouseLeave={() => setIsHoveringSignUp(false)}
                onClick={() => navigate("/ques")}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Sign In Modal */}
      {showSignInModal && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalTitle}>Sign In</h2>
            <form onSubmit={handleSignInSubmit}>
              <input
                type="email"
                placeholder="Email"
                required
                style={styles.inputField}
              />
              <input
                type="password"
                placeholder="Password"
                required
                style={styles.inputField}
              />
              <button type="submit" style={styles.submitButton}>
                Sign In
              </button>
              <button
                type="button"
                style={styles.closeButton}
                onClick={closeSignInModal}
              >
                Close
              </button>
            </form>
          </div>
        </div>
      )}

      <style>
        {`
          @keyframes fadeInOverlay {
            0% {
              opacity: 0;
            }
            100% {
              opacity: 1;
            }
          }

          @keyframes fadeInScale {
            0% {
              opacity: 0;
              transform: scale(0.9);
            }
            50% {
              opacity: 1;
              transform: scale(1.05);
            }
            100% {
              opacity: 1;
              transform: scale(1);
            }
          }

          @keyframes slideUp {
            from {
              opacity: 0;
              transform: translateY(50px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

const styles = {
  container: {
    position: "relative",
    height: "100vh",
    width: "100vw",
    backgroundColor: "#000",
    overflow: "hidden",
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    pointerEvents: "none",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "fadeInOverlay 2s ease-in-out",
  },
  textContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    animation: "fadeInScale 2s ease-in-out",
  },
  subtitle: {
    fontSize: "28px",
    color: "#fff",
    marginBottom: "30px",
    fontWeight: "400",
    letterSpacing: "1px",
    textAlign: "center",
  },
  buttonContainer: {
    display: "flex",
    gap: "20px",
  },
  button: {
    backgroundColor: "transparent",
    color: "#fff",
    padding: "10px 20px",
    fontSize: "16px",
    border: "1px solid #fff",
    borderRadius: "25px",
    cursor: "pointer",
    transition: "background-color 0.3s ease, transform 0.3s ease",
  },
  buttonHover: {
    backgroundColor: "#fff",
    color: "#000",
    transform: "scale(1.05)",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    backgroundColor: "rgba(0, 0, 0, 0.8)", // More transparent for a smooth effect
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    animation: "fadeInOverlay 0.5s ease-in-out",
  },
  modalContent: {
    backgroundColor: "rgba(255, 255, 255, 0.95)", // Slight transparency
    padding: "40px",
    borderRadius: "15px", // Softer border-radius
    boxShadow: "0px 8px 30px rgba(0, 0, 0, 0.2)", // Stronger shadow for depth
    animation: "slideUp 0.5s ease-in-out", // Slide-up effect for opening
    textAlign: "center",
    width: "400px",
  },
  modalTitle: {
    fontSize: "24px",
    marginBottom: "20px",
    color: "#333",
    animation: "fadeInOverlay 0.5s ease-in-out", // Smooth title fade-in
  },
  inputField: {
    width: "100%",
    padding: "12px",
    margin: "12px 0",
    borderRadius: "8px", // Softer corners for input
    border: "1px solid #ccc",
    fontSize: "16px",
  },
  submitButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#ff4757",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "10px",
    transition: "background-color 0.3s ease",
  },
  closeButton: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#ccc",
    color: "#333",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Int;
