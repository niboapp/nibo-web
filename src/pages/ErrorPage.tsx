
import Button  from '../components/ui/Button';
import { useNavigate } from 'react-router-dom';

const ErrorPage = ({ errorCode = 404, errorMessage = 'Oops, something went wrong!' }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md p-8 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-red-500">{errorCode}</h1>
          <p className="text-2xl font-medium text-gray-700 mt-4">{errorMessage}</p>
          <p className="text-gray-500 mt-2">
            Sorry, the page you are looking for could not be found or is temporarily unavailable.
          </p>
        </div>
        <div className="mt-6 text-center">
          <Button onClick={() => navigate('/')}>
            Go to Home
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorPage;