import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center w-[100vw] h-[100vh] items-center">
      <SignIn />
    </div>
  );
}
