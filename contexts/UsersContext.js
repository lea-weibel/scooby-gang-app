// import { useState, createContext, useEffect } from "react";

// //const UserContext = createContext(null);
// export const UserContext = createContext({
//     loggedUser: {firstname: '', lastname: '', email: '', avatar: ''},
//     setLoggedUser: () => {}
// });

// export function UserProvider({children}) {
//     const [loggedUser, setLoggedUser] = useState({firstname: '', lastname: '', email: '', avatar: ''});

//     useEffect(() => {
//         console.log('logged user context', loggedUser);
//     }, [loggedUser])

//     return (
//         <UserContext.Provider value={{loggedUser, setLoggedUser}}>
//             {children}
//         </UserContext.Provider>
//     )
// }

// export default UserContext;

import { createContext, useContext, useEffect, useState } from 'react';

const UserContext = createContext({
    loggedUser: { firstname: '', lastname: '', email: '', avatar: '' },
    setLoggedUser: () => { }
});

export const UseAppContext = () => {
    return useContext(UserContext);
};

export const UserProvider = (props) => {
    const [loggedUser, setLoggedUser] = useState({ firstname: '', lastname: '', email: '', avatar: '' });

    useEffect(() => {
        console.log('logged user context', loggedUser);
    }, [loggedUser])

    return (
        <UserContext.Provider value={{ loggedUser, setLoggedUser }}>
            {props.children}
        </UserContext.Provider>
    );
};