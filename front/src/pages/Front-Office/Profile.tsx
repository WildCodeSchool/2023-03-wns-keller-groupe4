import { useNavigate } from "react-router-dom";

import AuthService from "../../utils/authService";

const Profile = () => {
    const navigate = useNavigate();

    const logout = () => {
        AuthService.logout();
        navigate("/");
    };

    return (
        <>
            <button onClick={logout}>Logout</button>
            <div>Profile</div>
        </>
    );
};

export default Profile;
