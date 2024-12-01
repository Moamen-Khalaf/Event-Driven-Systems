import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

interface UploadedAssets {
  file: File | null;
  setFile: (file: File) => void;
  clearFile: () => void;
}

export const useTabs = create<UploadedAssets>()(
  immer((set) => ({
    file: null,
    setFile: (file) =>
      set((state) => {
        state.file = file;
      }),
    clearFile: () =>
      set(() => ({
        file: null,
      })),
  }))
);
