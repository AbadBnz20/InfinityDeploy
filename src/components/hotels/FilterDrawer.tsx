"use client";
import React from "react";
import { IoCaretDownOutline } from "react-icons/io5";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { ContentFilter } from "./ContentFilter";
import { StartFilter } from "./StartFilter";
import { SerpFilter } from "./SerpFilter";
export const FilterDrawer = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  return (
    <>
      <Button
        onPress={onOpen}
        fullWidth
        color="default"
        variant="bordered"
        startContent={<IoCaretDownOutline />}
      >
        Filtros
      </Button>
      <Drawer isOpen={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          {(onClose) => (
            <>
              <DrawerHeader className="flex flex-col gap-1">
                Filtros de busqueda
              </DrawerHeader>
              <DrawerBody>
                <ContentFilter />
                <StartFilter />
                <SerpFilter />
              </DrawerBody>
              <DrawerFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Cerrar
                </Button>
              </DrawerFooter>
            </>
          )}
        </DrawerContent>
      </Drawer>
    </>
  );
};
