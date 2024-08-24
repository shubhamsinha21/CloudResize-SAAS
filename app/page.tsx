import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="flex flex-col items-center gap-10 font-serif">
        <h1 className="max-sm:text-xl text-3xl text-white font-bold border border-white/20 rounded-lg p-4">
          Welcome to CloudResize
        </h1>
        <div className="flex flex-col justify-center gap-6 tracking-wide">
          <h3 className="text-left max-sm:text-md text-xl font-semibold">
            Features
          </h3>
          <p>- Upload and Resize your image for social media usage</p>
          <p>
            - Upload your video and compress the size up to{" "}
            <span className="font-bold tracking-wider">50%</span>
          </p>
          <p>- Store your video here</p>
          <Link href="/home">
            <button className="border p-3 rounded-lg w-fit hover:bg-white hover:text-black">
              Lets start ➡️
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
