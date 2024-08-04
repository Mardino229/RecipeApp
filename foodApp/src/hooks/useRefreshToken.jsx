import axiosClient from "../services/axios.jsx";
import useAuth from "./useAuth.jsx";
import {useNavigate, useLocation} from "react-router-dom";
import {REFRESH_URL} from "../constants/index.jsx";

const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const { auth } = useAuth();

    return async () => {

        const response = await axiosClient.post(
            REFRESH_URL,
            JSON.stringify({refreshToken: auth.refreshToken}),
        );
        setAuth(prev => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return {...prev, accessToken: response.data.accessToken, refreshToken: response.data.refreshToken };
        });
        return response.data.accessToken;
    };
};

export default useRefreshToken;