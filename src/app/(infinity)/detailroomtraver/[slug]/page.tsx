import { hotelInformation } from "@/actions/WeekMinute/DetailRoomtraver";
import { ContentMain } from "@/components/DetailRoomTraver/ContentMain";

interface Props {
  params: {
    slug: string;
  };
}

export default async function DetailRoomTraverPage({ params }: Props) {
  const { slug } = params;

   const room = await hotelInformation(slug);
  return (
    <div className="container mx-auto p-4">
      <ContentMain room={room} />
    </div>
  );
}
