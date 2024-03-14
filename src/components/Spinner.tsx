import "../pages/LandingPage/Landing.css";

interface SpinnerProps {
  isLoading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ isLoading }) => {
  if (!isLoading) return null;

 return (
  <>
    {/* Your other components */}
    {isLoading && (
      <div className="loader-container">
        <div className="loader"></div>
      </div>
    )}
  </>
);

};

export default Spinner;