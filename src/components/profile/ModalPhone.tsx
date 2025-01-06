'use client';
import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
  } from "@nextui-org/react";

interface Props{
  children: React.ReactNode;
}

export const ModalPhone = ({children}:Props) => {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

  return (
    <>
      <Button className="bg-black text-white dark:bg-white dark:text-black" onPress={onOpen}>Ver lista de numeros</Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"></ModalHeader>
              <ModalBody>
                {children}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
}
