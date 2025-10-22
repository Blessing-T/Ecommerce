"use client";

import Image from "next/image";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

import { uploadToCloudinary } from "@/shared/lib/cloudinary";

interface ImageUploadProps {
  onChange: (url: string) => void;
  value: string;
  disabled?: boolean;
}

const ImageUpload = ({ onChange, value, disabled }: ImageUploadProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      try {
        setIsLoading(true);
        const file = acceptedFiles[0];
        const imageUrl = await uploadToCloudinary(file);
        onChange(imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    },
    disabled: disabled || isLoading,
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-4 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600"
    >
      <input {...getInputProps()} />
      {value ? (
        <div className="relative w-full h-[200px]">
          <Image fill style={{ objectFit: "cover" }} src={value} alt="Uploaded" />
        </div>
      ) : (
        <div className="text-center">
          {isDragActive ? (
            <p>Drop the image here ...</p>
          ) : (
            <p>{isLoading ? "Uploading..." : "Click to upload or drag and drop"}</p>
          )}
          <p className="text-xs mt-2">PNG, JPG, JPEG up to 10MB</p>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;