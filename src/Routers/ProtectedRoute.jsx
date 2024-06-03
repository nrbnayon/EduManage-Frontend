import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import LoaderSpinner from "../Pages/Shared/LoaderSpinner/LoaderSpinner";
import useAuth from "../hooks/useAuth";
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  const location = useLocation();

  if (loading) {
    return <LoaderSpinner />;
  }

  if (user) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
export default ProtectedRoute;
