import { GetSession } from "@/actions/auth/getuser";
import { ContentMain } from "@/components/Yachts/ContentMain";

export default async function YachtsPage() {
    const user = await GetSession()
  return (
    <div className="container mx-auto px-4 py-8">
     <ContentMain user={user}/>
    </div>
  );
}