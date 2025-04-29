import {
  ChangeLenguaje,
  getLanguageFromCookie,
} from "@/actions/lenguaje/lenguaje";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Selection,
} from "@nextui-org/react";
import React, { useEffect, useMemo, useState } from "react";

export const SelectLenguage = () => {
  const [selectedKeys, setSelectedKeys] = useState<Selection>(new Set(["es"]));

  const selectedValue = useMemo(
    () => Array.from(selectedKeys).join(", ").replace(/_/g, ""),
    [selectedKeys]
  );

  useEffect(() => {
    const onLenguage = async () => {
      const cookieLanguage = await getLanguageFromCookie();
      if (cookieLanguage === "es" || cookieLanguage === "en") {
        setSelectedKeys(new Set([cookieLanguage]));}
    };

    onLenguage();
  }, []);
  const handleLanguageChange = async (
    e:any
  ) => {
    setSelectedKeys(new Set([e]));

    await ChangeLenguaje({ lenguaje: e });
  };
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button  className="capitalize" variant="flat">
          {selectedValue === "es" ? (
            <>
              <img
                src="/flags/es.png"
                alt="Español"
                style={{ width: "20px", marginRight: "0px" }}
              />
             <span className="text-[12px] hidden md:block"> Español</span>
            </>
          ) : (
            <>
              <img
                src="/flags/en.png"
                alt="Inglés"
                style={{ width: "20px", marginRight: "8px" }}
              />
             <span className="text-[12px] hidden md:block"> Ingles</span>
            </>
          )}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        disallowEmptySelection
        aria-label="Single selection example"
        selectedKeys={selectedKeys}
        selectionMode="single"
        variant="flat"
        // onSelectionChange={setSelectedKeys}
        onAction={handleLanguageChange}
      >
        <DropdownItem key="es">
          <div  className="flex" >
            <img
              src="/flags/es.png"
              alt="Español"
              style={{ width: "20px", marginRight: "8px" }}
            />
            Español
          </div>
        </DropdownItem>
        <DropdownItem key="en">
        <div  className="flex" >
          <img
            src="/flags/en.png"
            alt="Inglés"
            style={{ width: "20px", marginRight: "8px" }}
          />
          Inglés
        </div>
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>

    // <select
    //   value={language}
    //   onChange={handleLanguageChange}
    //   className="z-10 outline-none w-20 py-0.5 rounded-md text-tiny  dark:border-default-200 bg-transparent text-default-500"
    //   id="theme"
    //   name="Idioma"
    // >
    //   <option value="es" >Español  </option>
    //   <option value="en">Ingles</option>
    // </select>
  );
};
