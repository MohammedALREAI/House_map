import { useState } from "react";
import { useQuery, gql } from "@apollo/client";
import { useDebounce } from "use-debounce";
import Layout from "src/components/layout";
import Map from "src/components/map";
import HouseList from "src/components/houseList";
import { useLastData } from "src/utils/useLastData";
import { useLocalState } from "src/utils/useLocalState";
import { HousesQuery, HousesQueryVariables } from "src/generated/HousesQuery";
import { HOUSES_QUERY} from "src/graphql/housesQuery";




export default function Home() {
  return(
      <div className="flex space-x-2 justify-between items-center overflow-x-scroll" style={{maxWidth:'calc(100vh-64px)'}}>
            <div className="w-1/2">HouseList</div>
            <div className="w-1/2"><Map/></div>

      </div>

  )
    
}
