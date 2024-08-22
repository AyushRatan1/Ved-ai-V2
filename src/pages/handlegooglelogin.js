const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
  
    if (error) {
      alert(error.message);
    } else {
      // Check if user is logged in
      supabase.auth.onAuthStateChange((event, session) => {
        if (event === 'SIGNED_IN') {
          setUserEmail(session.user.email);
          setIsLoggedIn(true);
        }
      });
    }
  };
  