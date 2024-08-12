import axiosClient from "../services/axios.jsx";
import useAuth from "./useAuth.jsx";
import {REFRESH_URL} from "../constants/index.jsx";

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    return async () => {

        try {
            const response = await axiosClient.post(
                REFRESH_URL,
                {},
                {withCredentials: true}
            );
            setAuth(prev => {
                console.log(JSON.stringify(prev));
                console.log(response.data.accessToken);
                return {...prev,
                    roles: response.data.roles,
                    accessToken: response.data.accessToken,};
            });
            return response.data.accessToken;
        }catch (err){
            console.log(err);
            if (err.response?.status === 403) {
                console.log('Requête annulée :', err.response.data.detail);
            }
        }

    };
};

export default useRefreshToken;