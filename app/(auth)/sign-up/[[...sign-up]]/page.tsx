// this is the catch all routes where all routes are being catched
//  related to sign up process

import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center w-[100vw] h-[100vh] items-center">
      <SignUp />
    </div>
  );
}
