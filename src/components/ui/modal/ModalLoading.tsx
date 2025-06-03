"use client";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Spinner,
} from "@nextui-org/react";
import { useLocale } from "next-intl";

interface Props {
    loading: boolean;
}

export const ModalLoading = ({loading}:Props) => {
  console.log(loading)
  const language = useLocale()
  return (
    <>
      <Modal backdrop={"blur"} isOpen={true}  hideCloseButton={true}  >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1 text-center">
             {
              language === 'es'? ' Buscando...' : ' Searching...'
             }
            </ModalHeader>
            <ModalBody>
              <div className="h-[160px] flex justify-center items-center flex-col gap-5">
                <p className="text-center">
                  {language === 'es' ? 'Por favor, espere mientras buscamos los datos.' : 'Please wait while we search for the data.'}
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
