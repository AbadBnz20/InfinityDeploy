import {  Package, } from "@/interfaces/package-response";
import {
  Card,
  CardHeader,
} from "@nextui-org/react";


interface Props{
  data: Package
}
export const ContentPackage = ({data}:Props) => {
  return (
    <Card className="py-4 w-[300px] shadow-md">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        <h4 className="font-bold text-large">{data.name}</h4>
        <small className="text-default-500">{data.description}</small>
      </CardHeader>
    </Card>
  );
};
