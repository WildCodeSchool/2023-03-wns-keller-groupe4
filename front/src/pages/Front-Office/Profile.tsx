import { useNavigate } from "react-router-dom";

import { useMutation } from "@apollo/client";
import { setIDToken } from "../../utils/jwtHandler";
import { LOGOUT } from "../../utils/mutations";

const Profile = () => {
    const navigate = useNavigate();

    const [logout] = useMutation(LOGOUT, {
        onCompleted: () => {
            setIDToken("");
            navigate("/");
        },
    });

    const handleLogout = async () => {
        await logout();
    };

    return (
        <>
            <button onClick={handleLogout}>Logout</button>
            <div>Profile</div>
        </>
    );
};

export default Profile;
