"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useCreateForm } from "./CreateFormContext";

export function MediaDropzone() {
  const { form, addMedia, removeMedia } = useCreateForm();

  const onDrop = useCallback(
    (accepted: File[]) => {
      addMedia(accepted);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

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

      {form.media.length > 0 && (
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {form.media.map(({ file, previewUrl }) => (
            <li
              key={previewUrl}
              className="group relative aspect-square overflow-hidden rounded-lg bg-black/5 dark:bg-white/5"
            >
              {file.type.startsWith("video") ? (
                <video src={previewUrl} className="h-full w-full object-cover" muted />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={previewUrl} alt={file.name} className="h-full w-full object-cover" />
              )}
              <button
                type="button"
                onClick={() => removeMedia(previewUrl)}
                className="absolute top-1 right-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100"
                aria-label="Remove"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
