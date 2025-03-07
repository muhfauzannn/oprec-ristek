import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { userData } from "./interface";

const useUserLogged = () => {
  const [isLogged, setIsLogged] = useState<userData>({ isLogin: false, uuid: "", userName: "" });

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setIsLogged({ isLogin: true, uuid: "ijifejaifjeiajfiaejfinaeifn", userName: "Fauzan" });
    } else {
      setIsLogged({ isLogin: false, uuid: "", userName: "" });
    }
  }, []);

  return isLogged;
};

export default useUserLogged;
