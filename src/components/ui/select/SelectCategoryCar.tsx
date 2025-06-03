import { GetSelectCategoryCar } from "@/actions/categorycar/GetCategoryCar";
import { CategoryCar } from "@/interfaces/CategoryCar-response";
import { Select, SelectItem } from "@nextui-org/react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

interface Props {
  carData: string;
  state: boolean;
  handleCarsChange: (value: string) => void;
}

export const SelectCategoryCar = ({
  carData,
  state,
  handleCarsChange,
}: Props) => {
  const [data, setdata] = useState<CategoryCar[]>([]);
  const [loading, setLoading] = useState(false);
 const language = useLocale()
  useEffect(() => {
    const GetCateogryCar = async () => {
      setLoading(true);
      const resp = await GetSelectCategoryCar();
      setdata(resp);
      setLoading(false);
    };

    GetCateogryCar();
  }, []);

  return (
    <Select
      value={carData}
      items={data}
      variant="bordered"
      placeholder="Seleccione tipo"
      defaultSelectedKeys={["Economico"]}
      isDisabled={!state}
      isLoading={loading}
      onChange={(e) => handleCarsChange(e.target.value)}
    >
      {(item) => <SelectItem key={item.name}>{language == 'es' ? item.name : item.name_en}</SelectItem>}
    </Select>
  );
};
