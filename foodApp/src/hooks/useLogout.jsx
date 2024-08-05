import axiosClient from "../services/axios.jsx";
import useAuth from "./useAuth.jsx";
import {LOGOUT_URL} from "../constants/index.jsx";

const useLogout = () => {
    const {setAuth} = useAuth();
    return async () => {
        setAuth({})
        try {
            const response = await axiosClient.post(
                LOGOUT_URL,
            );
        } catch (err) {
            console.log(err);
        }
    };
}

export default useLogout;

