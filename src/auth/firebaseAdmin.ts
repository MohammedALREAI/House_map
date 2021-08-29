import * as admin from "firebase-admin";
import { NextApiRequest } from "next";

const verifyIdToken = (token: string) => {
const firebasePrivateKey=process.env.FIREBASE_PRIVATE_KEY as string ?? '';

if(!admin.app.length){
  admin.initializeApp({
    credential:admin.credential.cert({
      projectId:process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
      clientEmail:process.env.FIREBASE_CLIENT_EMAIL,
      privateKey:firebasePrivateKey.replace(/\\n/g,"\n")

    })
  })
}

return  admin.auth().verifyIdToken(token).catch(e=>console.log(e))

}
export async function loadIdToken(req:NextApiRequest):Promise<string | null> {
/// this no user login 
if(!req.cookies.token) return null;
/// this is user login 

const decoded =await verifyIdToken(req.cookies.token)

if(!decoded) return null

return decoded.uid

}