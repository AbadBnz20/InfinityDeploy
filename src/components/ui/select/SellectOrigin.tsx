"use client";
import { useOriginaDestination } from "@/hooks/useOriginaDestination";
import { Select, SelectItem, SelectSection } from "@nextui-org/react";
import React from "react";

interface Props{
    placeholder:string;
    setvalue:React.Dispatch<React.SetStateAction<string>>
}
export const SellectOrigin = ({placeholder,setvalue}:Props) => {
  const { loading, Items } = useOriginaDestination();
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
        {Items.map(
          (item) =>
            item.origin_destination.length > 0 && (
              <SelectSection
                key={item.categoryId}
                
                title={item.name}
              >
                {item.origin_destination.map((obj) => (
                  <SelectItem key={obj.origindestinationId}>
                    {obj.name}
                  </SelectItem>
                ))}
              </SelectSection>
            )
        )}
      </>
    </Select>
  );
};
