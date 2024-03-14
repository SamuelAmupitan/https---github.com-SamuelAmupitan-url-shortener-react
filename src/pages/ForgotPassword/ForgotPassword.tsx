import { auth } from "../../config/firebase.js";
import { sendPasswordResetEmail } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../../components/Spinner";
import Footer from "../../components/Footer";

const ForgotPassword: React.FC = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPasswordSubmit = async (
    e: React.ChangeEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset email sent successfully. Please check your email");
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("Error sending password reset email");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="forgot-container">
      <form onSubmit={handleResetPasswordSubmit} className="form-center">
        <h2 className="font-bold py-[2em] text-3xl">Forgot Password...</h2>
        <p className="mb-[1em] text-primaryPink font-medium">
          Enter your email to reset your password
        </p>
        <input
          type="email"
          placeholder="Email"
          className="input"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {isLoading ? (
          <Spinner isLoading={isLoading}/>
        ) : (
          <>
            {message && <p>{message}</p>}
            {error && <p>{error}</p>}
            <button
              type="submit"
              className="mt-[2em] border-2 border-primaryBlue  p-1 rounded-md font-medium btn-blue px-6 py-3"
            >
              Reset Password
            </button>
          </>
        )}
      </form>
      <Footer />
    </section>
  );
};

export default ForgotPassword;
