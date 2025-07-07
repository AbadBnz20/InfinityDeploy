import { GetSession } from "@/actions/auth/getuser";
import ContentInfoRoom from "@/components/DetailRoomTraver/ContentInfoRoom";


interface Props {
  params: {
    slug: string;
  };
}

export default async function DetailRoomTraverPage({ params }: Props) {
  const { slug } = params;
 
   const user = await GetSession()
 
  return (
    <div className="container mx-auto p-4">
     <ContentInfoRoom slug={slug} user={user}/>
    </div>
  );
}
