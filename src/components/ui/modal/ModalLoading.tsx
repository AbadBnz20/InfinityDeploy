"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";

interface Props {
    loading: boolean;
}

export const ModalLoading = ({loading}:Props) => {
  return (
    <>
      <Modal backdrop={"blur"} isOpen={loading}  hideCloseButton={true}  >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
              Buscando...
            </ModalHeader>
            <ModalBody>
              <div className="h-[160px] flex justify-center items-center flex-col gap-5">
                <p className="text-center">
                  Buscando los mejores resultados para la region.
                </p>
                <Spinner />
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
