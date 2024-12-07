import {  useRef, useState } from "react";
import {
    Button,
    Input,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
  } from "@nextui-org/react";

interface Props {
  isOpen: boolean;
  onOpen: () => void;
  onOpenChange: () => void;
  email: string;
  functionvalidate: (confirm:string,code:string) => void;
}

export const SignInModal = ({isOpen, onOpenChange,email,functionvalidate}:Props) => {
    const [code, setCode] = useState(Array(6).fill(""));
    const inputs = useRef<(HTMLInputElement | null)[]>([]);
   const [loading, setLoading] = useState(false)
    const handleChange = (index: number, value: string) => {
      if (/^\d?$/.test(value)) {
        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        if (value && index < code.length - 1) inputs.current[index + 1]?.focus();
      }
    };
  
    const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Backspace" && !code[index] && index > 0) {
        inputs.current[index - 1]?.focus();
      }
    };
  
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pasted = e.clipboardData.getData("text").slice(0, 6).split("").filter((ch) => /^\d$/.test(ch));
      const newCode = [...code];
      
      pasted.forEach((val, i) => {
        if (i < newCode.length) newCode[i] = val;
      });
      
      setCode(newCode);
      
      // Focus on the next input only if it exists
      const nextIndex = pasted.length < code.length ? pasted.length : code.length - 1;
      inputs.current[nextIndex]?.focus();
    };
  
  
    const onVerifyOTP = async ()=>{
        setLoading(true);
      const codeverify = code.join('');
      await functionvalidate(email,codeverify);
      setLoading(false);
      
    }
  
    return (
      <>
        <Modal backdrop={'blur'} isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">Verificar </ModalHeader>
                <ModalBody>
                  <p className="text-center mb-4">Ingrese código de 6 dígitos.</p>
                  <div className="flex justify-center gap-2 my-3">
                    {code.map((digit, i) => (
                      <Input
                        key={i}
                        type="text"
                        size="lg"
                        inputMode="numeric"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleChange(i, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(i, e)}
                        onPaste={handlePaste}
                        ref={(el) => {
                          inputs.current[i] = el ?? null;
                        }}
                        className="w-12 h-12 text-center text-2xl"
                        aria-label={`Digit ${i + 1}`}
                      />
                    ))}
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button isLoading={loading} onClick={()=>onVerifyOTP()} fullWidth color="primary" onPress={onClose}>Verificar Codigo</Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </>
    );
}
