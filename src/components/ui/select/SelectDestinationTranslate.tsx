'use client';
import { useOriginaDestination } from '@/hooks/useOriginaDestination';
import { SelectStore } from '@/store/TransferSelect';
import { Progress, Select, SelectItem, SelectSection } from '@nextui-org/react';
import { useLocale } from 'next-intl';
import React, { useEffect } from 'react'


interface Props{
    placeholder:string;
    setvalue:React.Dispatch<React.SetStateAction<string>>
    defaultSelectedKeys?:string
}
export const SelectDestinationTranslate = ({placeholder,setvalue,defaultSelectedKeys=""}:Props) => {
    const { loading, Items,loadItems } = useOriginaDestination();
     const {IdOrigin}=SelectStore();
     const language = useLocale();
    useEffect(() => {
        loadItems(IdOrigin);
    }, [IdOrigin])
    


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
                  
                  title={language === 'es' ? item.name : item.name_en}
                >
                  {item.origin_destination.map((obj) => (
                    <SelectItem key={obj.origindestinationId}>
                      {language === 'es' ? obj.name : obj.name_en}
                    </SelectItem>
                  ))}
                </SelectSection>
              )
          )}
        </>
      </Select>
    );
}
