import { GetPackage } from "@/actions/package/Package";
import {  Profile } from "@/interfaces/package-response";
import {
  useRadio,
  VisuallyHidden,
  RadioProps,
  cn,
  Spinner,
  Card,
  CardHeader,
} from "@nextui-org/react";
import { useEffect, useState } from "react";

export const CustomRadio = (props: RadioProps) => {
  const {
    Component,
    children,
    description,
    getBaseProps,
    getWrapperProps,
    getInputProps,
    getLabelProps,
    getLabelWrapperProps,
    getControlProps,
  } = useRadio(props);

  return (
    <Component
      {...getBaseProps()}
      className={cn(
        "group inline-flex items-center justify-between hover:bg-content2 flex-row-reverse",
        "max-w-[300px] cursor-pointer border-2 border-default rounded-lg gap-4 p-4",
        "data-[selected=true]:border-primary"
      )}
    >
      <VisuallyHidden>
        <input {...getInputProps()} />
      </VisuallyHidden>
      <span {...getWrapperProps()}>
        <span {...getControlProps()} />
      </span>
      <div {...getLabelWrapperProps()}>
        {children && <span {...getLabelProps()}>{children}</span>}
        {description && (
          <span className="text-small text-foreground opacity-70">
            {description}
          </span>
        )}
      </div>
    </Component>
  );
};
export const ContentPackage = () => {
  const [data, setdata] = useState<Profile>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getPackage = async () => {
      setLoading(true);
      const resp = await GetPackage();
      console.log(data);
      setdata(resp);
      setLoading(false);
    };

    getPackage();
  }, []);
  if (loading) {
    return  <Spinner/>
  }

  return (
    <Card className="py-4 w-[300px] shadow-md">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
        {/* <h4 className="font-bold text-large">{data?.package.name}</h4>
        <small className="text-default-500">{data?.package.description}</small> */}
      </CardHeader>
    </Card>
  );
};
