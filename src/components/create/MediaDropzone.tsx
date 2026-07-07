"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

interface PickedFile {
  file: File;
  previewUrl: string;
}

export function MediaDropzone() {
  const [files, setFiles] = useState<PickedFile[]>([]);

  const onDrop = useCallback((accepted: File[]) => {
    setFiles((current) => [
      ...current,
      ...accepted.map((file) => ({ file, previewUrl: URL.createObjectURL(file) })),
    ]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [], "video/*": [] },
  });

  return (
    <div className="flex flex-col gap-4">
      <div
        {...getRootProps()}
        className={`cursor-pointer rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          isDragActive ? "border-foreground bg-black/5 dark:bg-white/5" : "border-black/15 dark:border-white/20"
        }`}
      >
        <input {...getInputProps()} />
        <p className="text-sm text-foreground/70">
          Drag photos or videos here, or click to browse.
        </p>
      </div>

      {files.length > 0 && (
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {files.map(({ file, previewUrl }) => (
            <li key={previewUrl} className="aspect-square overflow-hidden rounded-lg bg-black/5 dark:bg-white/5">
              {file.type.startsWith("video") ? (
                <video src={previewUrl} className="h-full w-full object-cover" muted />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt={file.name} className="h-full w-full object-cover" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
