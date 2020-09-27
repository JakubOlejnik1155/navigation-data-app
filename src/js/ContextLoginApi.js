import React from 'react';

export const LoginContext = React.createContext();


export const LoginProvider = (props) => {
    const [isLogin, setIsLogin] = React.useState({
        login: false,
        user: null
    });
    return (
        <LoginContext.Provider value={{isLogin,setIsLogin}}>
            {props.children}
        </LoginContext.Provider>
    )
}