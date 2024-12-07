
import { ContentImagesLogin } from "./ui/ContentImagesLogin";
import { Message } from "./ui/form-message";
import { LoginForm } from "./ui/LoginForm";

export default async function Loginpage(props: { searchParams: Promise<Message> }) {
  const searchParams = await props.searchParams;
  return (
    <div className="flex h-screen w-full">
      {/* <h1 className={`text-4xl mb-5`}>Ingresar</h1> */}
      <LoginForm searchParams={searchParams} />
      <ContentImagesLogin/>
    </div>
  );
}
