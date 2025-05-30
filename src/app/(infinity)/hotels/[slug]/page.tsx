import { getDetailBySlug } from "@/actions/hotels/getDetailBySlug";
import {  ContentImage } from "@/components";
import { ContentInformation } from "@/components/details/ContentInformation";
import { ContentTaps } from "@/components/details/ContentTaps";
import { SizeImage } from "@/helpers/SizeImage";
import { Metadata } from "next";
interface Props {
  params: {
    slug: string;
  };
}
export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
  // read route params
  const slug = params.slug;

  // fetch data
  const hotel = await getDetailBySlug(slug);
  return {
    title: hotel?.name ?? "hotel no encontrado",
    description: hotel?.description_struct[0]?.paragraphs[0] ?? "",
    openGraph: {
      title: hotel?.name ?? "hotel no encontrado",
      description: hotel?.description_struct[0]?.paragraphs[0] ?? "",
      images: [SizeImage(hotel.images[0], "x500")],
    },
  };
}

export default async function DetailsPage({ params }: Props) {
  const { slug } = params;
  const hotel = await getDetailBySlug(slug);
  
  return (
    <div className="container mx-auto p-4">
      <div className="  items-center mb-4">
        <h1 className="text-4xl font-bold ">{hotel.name}</h1>
        <p className="text-md font-normal text-gray-400">{hotel.address}</p>
      </div>
      <ContentInformation/>
      {hotel.images.length > 0 && <ContentImage images={hotel.images} />}
        <ContentTaps hotel={hotel} slug={slug}/>

    
    </div>
  );
}
