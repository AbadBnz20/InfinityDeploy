"use client";
import { useOriginaDestination } from "@/hooks/useOriginaDestination";
import { Progress, Select, SelectItem, SelectSection } from "@nextui-org/react";

interface Props{
    placeholder:string;
    setvalue:React.Dispatch<React.SetStateAction<string>>
    defaultSelectedKeys?:string
}
export const SellectOrigin = ({placeholder,setvalue,defaultSelectedKeys=""}:Props) => {
  const { loading, Items } = useOriginaDestination();

  const handleSelectionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setvalue(e.target.value);
  };

  if (loading) {
    return (
      <div className="my-4">
        <Progress
          size="sm"
          isIndeterminate
          aria-label="Loading..."
          className="w-full"
        />
      </div>
    );
  }

  return (
    <Select
      className="w-full"
      placeholder={placeholder}
      isLoading={loading}
      defaultSelectedKeys={[defaultSelectedKeys]}
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
