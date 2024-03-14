import "../pages/LandingPage/Landing.css";

interface SpinnerProps {
  isLoading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ isLoading }) => {
  if (!isLoading) return <div></div>;

  return (
    <div className="loader-container">
      <div className="loader"></div>
    </div>
  );
};

export default Spinner;
