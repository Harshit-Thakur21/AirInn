// UserContext.jsx
import axios from "axios";
import { useEffect } from "react";
import { createContext, useState } from "react";

export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false); // because useEffect was taking more time when it was mounted,
                                            // so it was sending user as null, TW i used useState for check

  useEffect(() => {
    if(!user) {
        axios.get('/user/profile').then(({data}) => {
            setUser(data);
            setReady(true);
        });
    }
  }, [])

  return (
    <UserContext.Provider value={{ user, setUser, ready }}>
      {children}
    </UserContext.Provider>
  );
}
