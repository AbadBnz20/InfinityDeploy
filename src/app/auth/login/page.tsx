
import { ContentImagesLogin } from "./ui/ContentImagesLogin";
import { LoginForm } from "./ui/LoginForm";

export default function Loginpage() {
  return (
    <div className="flex h-screen w-full">
      {/* <h1 className={`text-4xl mb-5`}>Ingresar</h1> */}
      <LoginForm />
      <ContentImagesLogin/>
    </div>
  );
}
