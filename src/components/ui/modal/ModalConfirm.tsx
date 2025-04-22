import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@nextui-org/react";
import { IoCheckmarkCircleOutline } from "react-icons/io5";
import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onOpenChange: () => void;
}

export const ModalConfirm = ({ isOpen, onOpenChange }: Props) => {
  const t = useTranslations("ModalConfirm");
  const router = useRouter();
  return (
    <>
      <Modal
        backdrop={"blur"}
        isOpen={isOpen}
        hideCloseButton={true}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center">
                {t("title")}
              </ModalHeader>
              <ModalBody>
                <div className=" flex justify-center items-center flex-col gap-5">
                  <IoCheckmarkCircleOutline size={"44px"} />
                  <p className="text-center">
                    <strong>{t("strong")} </strong> {t("description")}
                  </p>
                  <Button
                    onPress={() => {
                      onClose();
                      router.push("/");
                    }}
                    size="md"
                    fullWidth
                    color="primary"
                  >
                    {t("button")}
                  </Button>
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
