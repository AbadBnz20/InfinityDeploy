import { GetSession } from "@/actions/auth/getuser";
import { PackageById } from "@/actions/yachts/PackageById";
import { ContentMain } from "@/components/Yachts/ContentMain";
import { notFound } from "next/navigation";
interface Props {
  params: {
    id: string;
  };
}
export default async function YachtsBySlugPage({ params }: Props) {
  const { id } = params;
  const [packageyacht, user] = await Promise.all([
    PackageById(id),
    GetSession(),
  ]);
  if (!packageyacht) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <ContentMain user={user} packageYach={packageyacht} />
    </div>
  );
}
