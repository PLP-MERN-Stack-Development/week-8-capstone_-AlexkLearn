import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-6xl font-bold text-gray-700 mb-4">404</h1>
      <p className="text-lg text-gray-500 mb-6">Page not found</p>
      <Link to="/" className="btn-primary">Back to Home</Link>
    </div>
  );
};

export default NotFound;