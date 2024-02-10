import React, { useRef, LegacyRef } from "react";

interface FileUploadProps {
  setFile: Function;
  accept: string;
  children: React.ReactNode;
}

export default function FileUpload({
  setFile,
  accept,
  children,
}: FileUploadProps) {
  const ref = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  return (
    <div onClick={() => ref.current?.click()}>
      <input
        className="hidden"
        type="file"
        accept={accept}
        ref={ref as LegacyRef<HTMLInputElement>}
        onChange={handleChange}
      />
      {children}
    </div>
  );
}
