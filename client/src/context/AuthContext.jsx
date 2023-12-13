import { createContext, useCallback, useEffect, useState } from "react";
import { baseUrl, postRequest } from "../utils/services";

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
  
    const [user, setUser] = useState(null)
    const [registerError, setRegisterError] = useState(null)
    const [IsregisterLoading, setIsregisterLoading] = useState(false)
    const [registerInfo, setRegisterInfo] = useState({
        name: "",
        email: "",
        password: "",
    })

    const [loginError, setLoginError] = useState(null)
    const [IsLoginLoading, setIsLoginLoading] = useState(false)
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        password: "",
    })



    useEffect(() => {
        const user = localStorage.getItem("User")

        setUser(JSON.parse(user))
    }, [])

    const updateRegisterInfo = useCallback((info) => {
        setRegisterInfo(info)
    }, [])

        const updateLoginInfo = useCallback((info) => {
        setLoginInfo(info)
    }, [])
    
    const registerUser = useCallback(async (e) => {
        e.preventDefault();
        
        setIsregisterLoading(true)
        setRegisterError(null)
        const response = await postRequest(`${baseUrl}/users/register`, JSON.stringify(registerInfo))
        
        setIsregisterLoading(false)

        if (response.error) {
            return setRegisterError(response)
        }


        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)
    }, [registerInfo])

    const loginUser = useCallback(async (e) => {

        e.preventDefault()
        
        setIsLoginLoading(true)
        setLoginError(null)

        const response = await postRequest(`${baseUrl}/users/login`, JSON.stringify(loginInfo))

        setIsLoginLoading(false)

        if (response.error) {
            return setLoginError(response)
        }

        localStorage.setItem("User", JSON.stringify(response))
        setUser(response)

    },[loginInfo])

    const logoutUser = useCallback(() => {
        localStorage.removeItem("User")
        setUser(null)
    }, [])

    return <AuthContext.Provider value={{
        user,
        registerInfo,
        updateRegisterInfo,
        registerUser,
        registerError,
        IsregisterLoading,
        logoutUser,
        loginUser,
        loginError,
        loginInfo,
        updateLoginInfo,
        IsLoginLoading
    }}>{children}</AuthContext.Provider>
}