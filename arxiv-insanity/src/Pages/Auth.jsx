import { useCallback, useEffect, useState } from "react"
import { Navigate } from "react-router-dom";

const Auth = () => {
    const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
    useEffect(() => {
        const url = window.location.href;
        sessionStorage.setItem("token", url.split("token=")[1]);
        setTimeout(() => {setIsUserLoggedIn(true) }, 1000);
    }, []);

    return <>
        {isUserLoggedIn &&  <Navigate to="/dashboard" />}
    </>
}

export default Auth;