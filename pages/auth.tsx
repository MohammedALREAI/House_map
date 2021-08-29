import Layout from "src/components/layout";
import FirebaseAuth from "src/components/firebaseAuth";
import { GetServerSideProps, NextApiRequest,NextApiResponse } from "next";
import { loadIdToken } from "src/auth/firebaseAdmin";

export default function Auth() {
  return <Layout main={<FirebaseAuth />} />;
}

export async function getServerSideProps( {req,res}:{req:NextApiRequest,res:NextApiResponse}){


  const userId=await loadIdToken(req);
  if(!userId) {
    res.setHeader('location','/');
    res.statusCode=302
  res.end()
  }
  return{
    props:{
      token:userId
    }
  }

}