import { Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../../firebase"; 

const PrivateRoute = ({ children }) => {
    const [user, loading] = useAuthState(auth);

    if (loading) {
        return <div>Loading...</div>; 
    }

    return user ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
