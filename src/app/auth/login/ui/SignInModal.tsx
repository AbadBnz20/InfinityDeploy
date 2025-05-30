import { useState } from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  InputOtp,
} from "@nextui-org/react";
import { useForm } from "react-hook-form";
import { ContentTimer } from "./ContentTimer";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onOpen: () => void;
  onOpenChange: () => void;
  email: string;
  functionvalidate: (
    confirm: string,
    code: string
  ) => Promise<{ status: boolean; message: string }>;
}

interface State {
  code: string;
}
export const SignInModal = ({
  isOpen,
  onClose,
  onOpenChange,
  email,
  functionvalidate,
}: Props) => {
  const [loading, setLoading] = useState(false);
 const router= useRouter();
  const { register, handleSubmit } = useForm<State>();
  const t = useTranslations("ModalCode");
  const onsubmit = async (state: State) => {
    try {
      setLoading(true);
      const res = await functionvalidate(email, state.code);
      console.log("respuesta", res);
      if (!res.status) {
        onClose();
        setLoading(false);
        return toast.error(res.message, {
          position: "top-right",
        });
      }
      setLoading(false);
      router.replace("/");
      onClose();
    } catch (error) {
      setLoading(false);
      console.log(error);
      onClose();
    }
  };

  return (
    <>
      <Modal
        hideCloseButton
        isDismissable={false}
        backdrop={"blur"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          <>
            <ModalHeader className="flex flex-col gap-1">
            {t("title")}
            </ModalHeader>
            <ModalBody>
              <ContentTimer />
              <p className="text-center mb-4">  {t("description")}</p>
              <div className="flex justify-center gap-2 my-3">
                <form className="" onSubmit={handleSubmit(onsubmit)}>
                  <InputOtp
                    isRequired
                    size="lg"
                    aria-label="OTP input field"
                    length={6}
                    {...register("code")}
                    placeholder="Enter code"
                    validationBehavior="native"
                  />
                  <Button
                    className="mt-4"
                    type="submit"
                    isLoading={loading}
                    fullWidth
                    color="primary"
                  >
                    {t("button")}
                  </Button>
                </form>
              </div>
            </ModalBody>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};
