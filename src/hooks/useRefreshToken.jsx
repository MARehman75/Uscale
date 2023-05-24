import axios from '../api/axios'
import useAuth from './useAuth';
import Cookies from "universal-cookie";
const cookies = new Cookies();
const useRefreshToken = () => {
    const { setAuth } = useAuth();
    const body = {
        refresh_token: cookies.get('refresh'),
        grant_type: "refresh_token",
        client_id: "d6QxhSFZ3IP9lBTtJNIHpbBOS9hvkPOadeqnzlTO",
        client_secret: "nW5ZRtidKnqGmtiWBZFQW5edDcFatmPj96hgNf8P9upBw7RJAxu4AM8kK15MvVajRl3F6323WRqX7mCsNF9SWDjrsDqa4P6RIs7aEPpqj8L4vJv7pp2KVaXm1dVlOSbu"
    }
    const refresh = async () => {
        const response = await axios.post("account/token/", body,
            {
                headers: {
                    'Content-Type': 'application/json',
                },
                withCredentials: true
            }
        ).catch(err => {
            if (err) {
                window.localStorage.setItem("isLoggedIn", "false");
            }
        })
        cookies.set('access', await response?.data?.access_token)
        cookies.set('refresh', await response?.data?.refresh_token)
        setAuth(prev => {
            return { ...prev, accessToken: response?.data?.access_token }
        });
        return response?.data?.access_token;
    }
    return refresh;
};

export default useRefreshToken;