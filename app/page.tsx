import Link from "next/link";

const HomePage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1>Welcome to CloudResize</h1>
      <div className="flex flex-col justify-center items-center">
        <h3>Features</h3>
        <p>Upload and Resize your image for social media usage</p>
        <p>
          Upload your video and compress the size up to{" "}
          <span className="text-green-900">50%</span>
        </p>
        <p>Store your video here ⬇️</p>
        <Link href="/home">Begin here ..</Link>
      </div>
    </div>
  );
};

export default HomePage;
