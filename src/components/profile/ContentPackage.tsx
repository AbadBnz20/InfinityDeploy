import { GetPackage } from "@/actions/package/Package";
import {  UpdatePackageByIDResponse } from "@/actions/package/PackageByUserClientId";
import { Datum } from "@/interfaces/package-response";
import {
  RadioGroup,
  useRadio,
  VisuallyHidden,
  RadioProps,
  cn,
  Button,
  Spinner,
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
  const [data, setdata] = useState<Datum[]>([]);
  const [byid, setbyid] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);

  useEffect(() => {
    const getPackage = async () => {
      setLoading(true);
      // const packagebyid = await GetPackageByIDResponse();

      const resp = await GetPackage();
      setbyid("");
      setdata(resp);
      setLoading(false);
    };

    getPackage();
  }, []);

  const handleChange = async () => {
    setLoading2(true);
    if (byid) {
     UpdatePackageByIDResponse(byid);
    }
    setLoading2(false);

  };

  return (
    <>
      {byid && (
        <RadioGroup value={byid} onValueChange={setbyid}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-3">
            {loading ? (
              <Spinner />
            ) : data.length > 0 ? (
              data.map((item) => (
                <CustomRadio
                  key={item.name}
                  description={item.description}
                  value={item.name}
                >
                  {item.name}
                </CustomRadio>
              ))
            ) : (
              <p>No hay elementos disponibles.</p> 
            )}
          </div>
        </RadioGroup>
      )}

      <div className="mt-6 flex justify-end">
        <Button onClick={()=>handleChange()} isLoading={loading2} >Guardar Cambios</Button>
      </div>
    </>
  );
};
