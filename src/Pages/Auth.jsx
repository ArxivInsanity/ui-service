import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = () => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    const url = window.location.href;
    sessionStorage.setItem("token", url.split("token=")[1]);
    setTimeout(() => {
      setIsUserLoggedIn(true);
    }, 1000);
  }, []);

  return (
    <>
      {isUserLoggedIn && navigate("/dashboard")}
      {navigate(0)}
    </>
  );
};

export default Auth;
