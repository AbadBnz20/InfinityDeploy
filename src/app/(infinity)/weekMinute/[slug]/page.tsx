import { ContentMain } from "@/components/WeekMinute/ContentMain";

interface Props {
  params: {
    slug: string;
  };
}

export default async function WeekMinutePage({ params }: Props) {
  const { slug } = params;
 
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="w-full">
          <ContentMain slug={slug} />
        </div>
      </div>
    </main>
  );
}
