"use client";
import React, { useEffect } from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { IoAlertCircleOutline } from "react-icons/io5";
import { signOutAction } from "@/actions/auth/login";
interface Props {
  count: number;
}

export const ModalAlert = ({ count }: Props) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  useEffect(() => {
    if (count <= 4) {
      onOpen();
    }
  }, []);

  const Onclose = () => {
    if (count <= 0) {
      signOutAction();
    }
    onClose();
  };

  return (
    <>
      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        hideCloseButton={true}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
        <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                Alerta
              </ModalHeader>
              <ModalBody>
                <div className="h-[180px] flex justify-center items-center flex-col gap-5">
                  <IoAlertCircleOutline size={"44px"} />
                  <p className="text-center">
                    <strong> Tu paquete está por finalizar.</strong> Por favor,
                    contacta a tu proveedor para renovarlo. Días restantes:{" "}
                    {count}
                  </p>
                  <Button onPress={Onclose} size="md" fullWidth color="primary">
                    Aceptar
                  </Button>
                </div>
              </ModalBody>
            </>
        </ModalContent>
      </Modal>
    </>
  );
};
