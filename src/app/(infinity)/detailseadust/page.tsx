import { GetSession } from "@/actions/auth/getuser";
import { ContentMainSeadust } from "@/components/detailsseadust/ContentMainSeadust";
import React from "react";


export default async function DetailSeadustPage() {
    const user = await GetSession();
  return (
    <div className="container mx-auto p-4 ">
   
    <ContentMainSeadust {...user}/>
  </div>
  );
}