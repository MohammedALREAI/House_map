import {
     useEffect,
     useState,
     useContext,
     createContext,
     FunctionComponent,
} from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/auth";
import initFirebase from "./initFirebase";
import { TokenOperation } from "./tokenCookies";
import {logout} from './logout'
initFirebase();

interface IAuthContext {
     user: firebase.User | null;
     logout: () => void;
     authenticated: boolean;
}

const AuthContext = createContext < IAuthContext > ({
     user: null,
     logout: () => ``,
     authenticated: false,
});

export const AuthProvider: FunctionComponent = ({ children }) => {
     const [user, setUser] = useState <firebase.User | null > (null);
     const router = useRouter();
     const logoutAction=()=>logout(router);


     useEffect(() => {
          const cancelAuthListener = firebase
               .auth()
               .onIdTokenChanged(async (user) => {
                    if (user) {
                         const token = await user.getIdToken();
                         TokenOperation.setCookie(token);
                         setUser(user);
                    } else {
                         TokenOperation.removeCookie();
                         setUser(null);
                         router.push('/login')
                    }
               });

          return () => {
               cancelAuthListener();
          };
     }, []);

     return (
          <AuthContext.Provider value={{ user,logout:logoutAction
               , authenticated: !!user }}>
               {children}
          </AuthContext.Provider>
     );
};

export function useAuth() {
     return useContext(AuthContext);
}
