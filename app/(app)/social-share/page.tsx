"use client";
import { useState, useEffect, useRef } from "react";
import { CldImage } from "next-cloudinary";

// defining objects for social-frames
const socialFormats = {
  "Instagram Square (1:1)": {
    width: 1080,
    height: 1080,
    aspectRatio: "1:1",
  },
  "Instagram Portrait (4:5)": {
    width: 1080,
    height: 1350,
    aspectRatio: "4:5",
  },
  "Twitter Post (16:9)": {
    width: 1200,
    height: 675,
    aspectRatio: "16:9",
  },
  "Twitter Header (3:1)": {
    width: 1500,
    height: 500,
    aspectRatio: "3:1",
  },
  "Facebook Cover (205:78)": {
    width: 820,
    height: 312,
    aspectRatio: "205:78",
  },
};

// typesafety
type socialFormat = keyof typeof socialFormats;

export default function SocialShare() {
  // images uploaded or not
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  // selected format of frame
  const [selectedFormat, setSelectedFormat] = useState<socialFormat>(
    "Instagram Square (1:1)"
  );

  // upload state
  const [isUploading, setIsUploading] = useState(false);

  // transformed/ action or not
  const [isTransforming, setIsTransforming] = useState(false);

  // image references
  const imageRef = useRef<HTMLImageElement>(null);

  // effect to execute the if condition based on certain change
  useEffect(() => {
    if (uploadedImage) {
      setIsTransforming(true);
    }
  }, [selectedFormat, uploadedImage]);

  // function for file upload
  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setIsUploading(true);

    // accessing form data
    const formData = new FormData();
    // taking file from input and appending it
    formData.append("file", file);

    try {
      const response = await fetch("/api/image-upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Failed to upload image");

      const data = await response.json();
      setUploadedImage(data.publicId);

      // err
    } catch (error) {
      console.log(error);
      alert("Failed to upload image");

      // finally
    } finally {
      setIsUploading(false);
    }
  };

  // function to handle download
  const handleDownload = () => {
    // no imageRef holding currently
    if (!imageRef.current) return;
    fetch(imageRef.current.src)
      .then((response) => response.blob())
      .then((blob) => {
        // done for web scrapping using js
        // blob - is just a binary object
        //  creating url from blob
        // create object url
        const url = window.URL.createObjectURL(blob);
        // now we want to create a link to control it
        const link = document.createElement("a");
        link.href = url;
        // link.download = "image.png";
        link.download = `${selectedFormat
          .replace(/\s+/g, "_")
          .toLowerCase()}.png`;
        document.body.appendChild(link);
        link.click();

        // cleanup
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);

        document.body.removeChild(link);
      });
  };

  return (
    <div className="container mx-auto p-4 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Social Media Image Creator
      </h1>

      <div className="card">
        <div className="card-body">
          <h2 className="card-title mb-4">Upload an Image</h2>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Choose an image file</span>
            </label>
            <input
              type="file"
              onChange={handleFileUpload}
              className="file-input file-input-bordered file-input-primary w-full"
            />
          </div>

          {isUploading && (
            <div className="mt-4">
              <progress className="progress progress-primary w-full"></progress>
            </div>
          )}

          {uploadedImage && (
            <div className="mt-6">
              <h2 className="card title mb-4">Select Social Media Format</h2>
              <div className="form-control">
                <select
                  className="select select-bordered w-full"
                  value={selectedFormat}
                  onChange={(e) =>
                    setSelectedFormat(e.target.value as socialFormat)
                  }
                >
                  {Object.keys(socialFormats).map((format) => (
                    <option key={format} value={format}>
                      {format}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mt-6 relative">
                <h3 className="text-lg font-semibold mb-2">Preview:</h3>
                <div className="flex justify-center">
                  {isTransforming && (
                    <div
                      className="absolute inset-0 flex items-center justify-center 
                    bg-base-100 bg-opacity-50 z-10"
                    >
                      <span className="loading loading-spinner loading-lg"></span>
                    </div>
                  )}
                  <CldImage
                    width={socialFormats[selectedFormat].width}
                    height={socialFormats[selectedFormat].height}
                    src={uploadedImage}
                    sizes="100vw"
                    alt="transformed image"
                    crop="fill"
                    aspectRatio={socialFormats[selectedFormat].aspectRatio}
                    gravity="auto"
                    ref={imageRef}
                    onLoad={() => setIsTransforming(false)}
                  />
                </div>
              </div>

              <div className="card-actions justify-end mt-6">
                <button className="btn btn-primary" onClick={handleDownload}>
                  Download for {selectedFormat}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
