import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useEnrollInfo from "../hooks/useEnrollInfo";
import PropTypes from "prop-types";

const StudentEnrollRouter = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { enrollInfo, isLoading: enrollLoading } = useEnrollInfo();
  const location = useLocation();

  if (authLoading || enrollLoading) {
    return <p>Loading...</p>;
  }

  if (user && enrollInfo.length > 0) {
    return children;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

StudentEnrollRouter.propTypes = {
  children: PropTypes.node.isRequired,
};

export default StudentEnrollRouter;
