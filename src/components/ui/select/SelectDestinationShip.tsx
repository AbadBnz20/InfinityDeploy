import { useOriginaDestinationShip } from "@/hooks/useOriginDestinationShip";
import { Select, SelectItem } from "@nextui-org/react";
import React from "react";
interface Props {
  placeholder: string;
  setvalue: React.Dispatch<React.SetStateAction<string>>;
}
export const SelectDestinationShip = ({ placeholder, setvalue }: Props) => {
  const { loading, Items } = useOriginaDestinationShip();
  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setvalue(e.target.value);
  };
  return (
    <Select
      className="w-full"
      placeholder={placeholder}
      isLoading={loading}
      onChange={handleSelectionChange}
    >
      <>
        {Items.map((item) => (
          <SelectItem key={item.origin_destination_ship_id}>{item.name}</SelectItem>
        ))}
      </>
    </Select>
  );
};
