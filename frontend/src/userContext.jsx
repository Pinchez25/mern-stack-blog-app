import {createContext, useState} from "react";

const UserContext = createContext({});

// eslint-disable-next-line react/prop-types
export const UserContextProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState({});
    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext;