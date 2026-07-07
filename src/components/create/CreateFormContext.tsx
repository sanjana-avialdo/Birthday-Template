"use client";

import { createContext, useContext, useState } from "react";

export interface PickedMedia {
  file: File;
  previewUrl: string;
}

export interface CreateFormState {
  recipientName: string;
  senderName: string;
  pin: string;
  pinHint: string;
  message: string;
  musicUrl: string;
  media: PickedMedia[];
}

interface CreateFormContextValue {
  form: CreateFormState;
  update: (patch: Partial<CreateFormState>) => void;
  addMedia: (files: File[]) => void;
  removeMedia: (previewUrl: string) => void;
}

const initialState: CreateFormState = {
  recipientName: "",
  senderName: "",
  pin: "",
  pinHint: "",
  message: "",
  musicUrl: "",
  media: [],
};

const CreateFormContext = createContext<CreateFormContextValue | null>(null);

export function CreateFormProvider({ children }: { children: React.ReactNode }) {
  const [form, setForm] = useState<CreateFormState>(initialState);

  function update(patch: Partial<CreateFormState>) {
    setForm((current) => ({ ...current, ...patch }));
  }

  function addMedia(files: File[]) {
    setForm((current) => ({
      ...current,
      media: [...current.media, ...files.map((file) => ({ file, previewUrl: URL.createObjectURL(file) }))],
    }));
  }

  function removeMedia(previewUrl: string) {
    setForm((current) => ({
      ...current,
      media: current.media.filter((item) => item.previewUrl !== previewUrl),
    }));
  }

  return (
    <CreateFormContext.Provider value={{ form, update, addMedia, removeMedia }}>
      {children}
    </CreateFormContext.Provider>
  );
}

export function useCreateForm() {
  const context = useContext(CreateFormContext);
  if (!context) {
    throw new Error("useCreateForm must be used within a CreateFormProvider");
  }
  return context;
}
