import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import { PropTypes } from "prop-types";

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { isAdminLoading, isAdmin } = useAdmin();

  const location = useLocation();

  if (loading || isAdminLoading) {
    return <p>Loading...</p>;
  }

  if (user && isAdmin) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AdminRoute;
