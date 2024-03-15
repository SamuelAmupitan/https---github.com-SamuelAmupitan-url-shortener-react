import { useNavigate } from "react-router-dom";
import './NotFound.css'

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="not-found">
        <div className="inner-div">
            <h2 className="font-bold text-4xl mb-4">Not Found.</h2>
            <h4
                onClick={handleGoBack}
                className="cursor-pointer underline hover:text-primaryBlue"
            >
                Back To Homepage
            </h4>
        </div>
    </div>
  );
};

export default NotFound;