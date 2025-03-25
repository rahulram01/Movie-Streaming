import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { checkValidData } from "../utils/validate";
import { USER_AVATAR } from "../utils/constants";
import "./Login.css";

const Login = () => {
  const [errorMessage, setErrorMessage] = useState(null);
  const [isSignInForm, setIsSignInForm] = useState(true);
  const navigate = useNavigate();

  const email = useRef(null);
  const password = useRef(null);
  const name = useRef(null); // Define name useRef

  const handleGoogleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        navigate("/home");
      })
      .catch((error) => {
        console.error("Error signing in with Google:", error);
        setErrorMessage(error.message);
      });
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    if (message) {
      setErrorMessage(message);
      return;
    }

    if (isSignInForm) {
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then(() => {
          navigate("/home");
        })
        .catch((error) => {
          console.error("Error signing in:", error);
          setErrorMessage(error.message);
        });
    } else {
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          updateProfile(userCredential.user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName, photoURL } = auth.currentUser;
              // Assuming you have a dispatch function here to add user to Redux state
              // dispatch(addUser({ uid, email, displayName, photoURL }));
              navigate("/home");
            })
            .catch((error) => {
              console.error("Error updating profile: ", error);
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          console.error("Error creating user: ", error);
          setErrorMessage(error.message);
        });
    }
  };

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
    setErrorMessage(null);
  };

  return (
    <div>
      <div className="absolute inset-0 overflow-hidden">
        <img
          className="absolute inset-0 h-full w-full object-cover"
          src="2.png"
          alt="background"
          style={{ zIndex: -1, position: "fixed" }} // Add this inline style
        />
      </div>
      <div
        onSubmit={(e) => e.preventDefault()}
        className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80"
      >
        <h1 className="font-bold text-3xl py-4">Sign In</h1>
        <input
          ref={email}
          type="text"
          placeholder="Email Address"
          className="p-4 my-4 w-full bg-gray-700"
        />
        <input
          ref={password}
          type="password"
          placeholder="Password"
          className="p-4 my-4 w-full bg-gray-700"
        />
        {!isSignInForm && (
          <input
            ref={name}
            type="text"
            placeholder="Full Name"
            className="p-4 my-4 w-full bg-gray-700"
          />
        )}
        {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        <button
          className="p-4 my-6 bg-violet-950 w-full rounded-lg"
          onClick={handleButtonClick}
        >
          {isSignInForm ? "Sign In" : "Sign Up"}
        </button>
        <button className="login-with-google-btn" onClick={handleGoogleSignIn}>
          Sign In with Google
        </button>
        <p className="py-4 cursor-pointer" onClick={toggleSignInForm}>
          {isSignInForm
            ? "New to Login? Sign Up Now"
            : "Already registered? Sign In Now."}
        </p>
      </div>
    </div>
  );
};

export default Login;
