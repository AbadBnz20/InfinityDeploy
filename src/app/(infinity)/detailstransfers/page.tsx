import { GetSession } from "@/actions/auth/getuser";
import { ContentMain } from "@/components/transfers/ContentMain";


export default async function DetailTransfersPage() {
  const user = await GetSession()


  return (
    <div className="container mx-auto p-4 ">
     
      <ContentMain {...user} />
    </div>
  );
}
