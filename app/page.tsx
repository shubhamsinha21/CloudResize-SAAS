import Link from "next/link";

export const page = () => {
  return (
    <div className="flex justify-center items-center">
      <h1>Welcome to CloudResize</h1>
      <div className="flex justify-center items-center">
        <h3>Features</h3>
        <p>Upload and Resize your image for social media usage</p>
        <p>
          Upload your video and compress the size upto{" "}
          <span className="text-green-900">50%</span>
        </p>
        <p>Store your video here ⬇️</p>
        <Link href="/home">Begin here ..</Link>
      </div>
    </div>
  );
};
