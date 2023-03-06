import { useAuthContext } from "@/context/AuthProvider";
import { MUTATION_REGISTER } from "@/services/registerService";
import { useMutation } from "@apollo/client";
import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const useAuth = useAuthContext();
  const navigate = useNavigate();
  const [register, { data }] = useMutation(MUTATION_REGISTER);
  console.log("🚀 ~ file: index.tsx:15 ~ Login ~ data:", data);

  const handleLoginWithGoogle = async () => {
    const auth = getAuth();
    const provider = new GoogleAuthProvider();
    const {
      user: { uid, displayName },
    } = await signInWithPopup(auth, provider);
    register({
      variables: {
        uid,
        name: displayName,
      },
    });
  };

  useEffect(() => {
    console.log(useAuth.user);

    if (useAuth.user && useAuth.user.uid) {
      navigate("/");
    }
  }, [navigate, useAuth.user]);

  return (
    <>
      <Typography variant="h5" mb={1}>
        Welcome to Note App
      </Typography>
      <Button variant="outlined" onClick={handleLoginWithGoogle}>
        Login with Google
      </Button>
    </>
  );
};

export default Login;
