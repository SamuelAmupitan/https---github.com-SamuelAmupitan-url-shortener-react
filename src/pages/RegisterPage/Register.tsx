import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import { auth, googleProvider } from "../../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"; 

import Line from "/images/Vector 8.svg";
import GoogleIcon from "/images/logo_googleg_48dp.png";
import AppleLogo from "/images/Path.svg";
import Footer from "../../components/Footer.js";
import "./Register.css";
import Spinner from "../../components/Spinner.js";

const RegisterPage: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false); 

  // Redirect to home page if user is already logged in
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        navigate("/", { replace: true });
      }
    });
  }, [navigate]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  const registerAuthentication = async () => {
    setIsLoading(true);
    try {
      if (password !== confirmPassword) {
        setConfirmPasswordError("Passwords do not match");
        return;
      }

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await new Promise((resolve) => setTimeout(resolve, 10000));
      if (user) {
        await new Promise((resolve) => setTimeout(resolve, 5000));
        // setVerification("Account Created Successfully!");
        navigate("/login");
      }
    } catch (err: any) { 
      if (
        err.code === "auth/email-already-in-use" ||
        err.code === "auth/invalid-email"
      ) {
        setEmailError("Email is already in use");
      } else {
        setPasswordError(err.message); 
      }
    } finally {
      setIsLoading(false);
    }
  };

  const logInGoogle = async () => {
    setIsLoading(true);
    try {
      await signInWithPopup(auth, googleProvider);
      navigate("/");
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNameValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    if (/\d/.test(newName) || /[!@#$%^&*(),.?":{}|<>]/g.test(newName)) {
      setNameError("Name cannot contain numbers or special characters");
    } else {
      setNameError("");
    }
    setName(newName);
  };

  const handleEmailValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    if (!/@/.test(newEmail)) {
      setEmailError("Email must contain @ symbol");
    } else {
      setEmailError("");
    }
    setEmail(newEmail);
  };

  const handlePasswordValidation = (newPassword: string) => {
    if (/^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/g.test(newPassword)) {
      setPasswordError("");
    } else {
      setPasswordError(
        "Password must be 6 or more characters and contain at least one number, one uppercase, and one lowercase letter."
      );
    }
    setPassword(newPassword);
  };

  const handleConfirmPasswordValidation = (newConfirmPassword: string) => {
    if (newConfirmPassword === password) {
      setConfirmPasswordError("");
    } else {
      setConfirmPasswordError("Passwords do not match");
    }
    setConfirmPassword(newConfirmPassword);
  };

  return (
    <section>
      <div className="register-container">
        {isLoading && <Spinner isLoading={isLoading} />} 
        <form className="form-div" onSubmit={(e) => e.preventDefault()}>
          <p className="signup">Sign up with</p>
          <div className="buttons-container">
            <button className="google" onClick={logInGoogle}>
              <span>
                <img src={GoogleIcon} alt="Google Icon" width="20px" height="10px" />
              </span>
              Google
            </button>
            <button className="apple">
              <span>
                <img src={AppleLogo} alt="Apple Icon" width="17px" height="17px" />
              </span>
              Apple
            </button>
          </div>
          <p className="lin-container">
            <span>
              <img src={Line} alt="Line" className="w-[20em]" />
            </span>
            <span>Or</span>
            <span>
              <img src={Line} alt="Line" className="w-[20em]" />
            </span>
          </p>

          <div className="input-div">
            <div>
              <input
                name="name"
                id="name"
                type="text"
                value={name}
                placeholder="Username"
                required
                onChange={handleNameValidation}
                className="input"
              />
              {nameError && <p className="error">{nameError}</p>}
            </div>

            <div>
              <input
                name="email"
                id="email"
                type="email"
                value={email}
                placeholder="Email address"
                required
                onChange={handleEmailValidation}
                className="input"
              />
              {emailError && <p className="error">{emailError}</p>}
            </div>

            <div>
              <PasswordInput
                onChange={handlePasswordValidation}
                placeholder="Password"
              />
              {passwordError && <p className="error">{passwordError}</p>}
            </div>

            <div>
              <PasswordInput
                onChange={handleConfirmPasswordValidation}
                placeholder="Confirm Password"
              />
              {confirmPasswordError && <p className="error">{confirmPasswordError}</p>}
            </div>

            <button
              onClick={registerAuthentication}
              disabled={isLoading}
              className="sign-in-btn"
            >
              {isLoading ? "Signing up..." : "Sign up with Email"}
            </button>

            <p className="already">
              Already have an account?{" "}
              <Link to="/login" className="login-text">
                Log in
              </Link>
            </p>

            <div>
              <p>
                <span className="by">By signing in with an account you agree to</span>
                <span className="privacy-policy">
                  Scissors <strong>Terms of service</strong>,{" "}
                  <strong>Privacy Policy</strong> and{" "}
                  <strong>Acceptable Use Policy</strong>
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </section>
  );
};

export default RegisterPage;
