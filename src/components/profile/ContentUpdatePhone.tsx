import { ChangeNumber, VerifyNumber } from "@/actions/phone/Phone";
import { Button, InputOtp } from "@nextui-org/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

interface Props {
  phone: string;
}
interface State {
  code: string;
}
export const ContentUpdatePhone = ({ phone }: Props) => {
  const [Status, setStatus] = useState(false);
  const { register, handleSubmit } = useForm<State>();
  const [loading, setloading] = useState(false);
  const onsubmit = async (state: State) => {
    console.log(state);
    setloading(true);
    const resp = await VerifyNumber(phone, state.code);
    if (!resp.status) {
        setloading(false);
        return toast.error(resp.message, {
          position: "top-right",
        });
      }
      toast.success(resp.message, {
        position: "top-right",
      });
      setloading(false);
      setStatus(false);
  };

  const onChangeNumber = async () => {
    const resp = await ChangeNumber(phone);
    if (!resp.status) {
      return toast.error(resp.message, {
        position: "top-right",
      });
    }
    toast.success(resp.message, {
      position: "top-right",
    });
    setStatus(true);
  };
  return (
    <>
      {Status ? (
        <div className="mt-2">
          <p className="text-center mb-4 text-sm">
            Ingrese código de 6 dígitos.
          </p>
          <div className="flex justify-center gap-2 my-3">
            <form className="" onSubmit={handleSubmit(onsubmit)}>
              <InputOtp
                isRequired
                size="sm"
                aria-label="OTP input field"
                length={6}
                {...register("code")}
                placeholder="Enter code"
                validationBehavior="native"
              />
              <Button
                className="mt-4"
                size="sm"
                type="submit"
                isLoading={loading}
                fullWidth
                color="primary"
              >
                Verificar Codigo
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <Button
          onPress={() => onChangeNumber()}
          className="col-span-full my-2"
          color="primary"
          size="sm"
        >
          Guardar
        </Button>
      )}
    </>
  );
};
