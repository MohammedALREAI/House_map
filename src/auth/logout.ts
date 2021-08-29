import firebase from "firebase/app";
import "firebase/auth";

     export const logout = (router:NextRouter) => {
          firebase
               .auth()
               .signOut()
               .then(() => {
                    router.push("/");
               })
               .catch((e) => {
                    console.error(e);
               });
     };

