import { GetDiscountByUser } from "@/actions/package/PackageByUserClientId";
import { ContentMain } from "@/components";

export default async  function HotelsPage() {
  const discount = await GetDiscountByUser()

  return (
    <div>
      <ContentMain discount={discount}/>
    </div>
  );
}
