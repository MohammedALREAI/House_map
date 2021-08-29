import { useRef, useState } from "react";
import Link from "next/link";
import { Image } from "cloudinary-react";
import ReactMapGL, { Marker, Popup, ViewState } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useLocalState } from "src/utils/useLocalState";
import { HousesQuery_houses } from "src/generated/HousesQuery";
import { SearchBox } from "./searchBox";
import { GetServerSideProps, NextApiRequest, NextApiResponse } from "next";
import { loadIdToken } from "@/auth/firebaseAdmin";

interface IProps {
  setDataBounds: (bounds: string) => void;
  houses: HousesQuery_houses[];
  highlightedId: string | null;
}

interface IState{
  width: number,
  height: number,
  latitude: number,
  zoom: number
  longitude: number,
}

export default function Map({ setDataBounds, houses, highlightedId }: IProps) {
  const mapRef= useRef<typeof ReactMapGL|null>(null)
  const [viewport, setViewport] = useState<IState>({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });
  const mapApiKey=process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN as string | ''
  return (
    <div className="relative text-black">
 <ReactMapGL
      {...viewport}
      width="100%"
      height="calc(100vh-64px)"
      mapboxApiAccessToken={mapApiKey}
      onViewportChange={(nextViewport:IState) => setViewport(nextViewport)}
      ref={(instance)=>mapRef.current!=instance}
      minZoom={5}
      maxZoom={15}
    />

    </div>
  
    
  );
}


export async function getServerSideProps({req,res}:{req:NextApiRequest,res:NextApiResponse}):GetServerSideProps {

const uuid=await loadIdToken(req);
if(!uuid){
  res.setHeader('location','/')
  res.statusCode=302
  res.end()
}

  return { props : {} }
  
};