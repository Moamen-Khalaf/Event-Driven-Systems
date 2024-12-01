import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";

interface Settings {
  token: string;
  endpoint: string;
  modelName: string;
  theme: "light" | "dark";
  error: string | null;
  loading: boolean;
  setError: (error: string) => void;
  toggleTheme: () => void;
  setSetting: (token: string, endpoint: string, modelName: string) => void;
}
const defaultTheme =
  (localStorage.getItem("theme") as "light" | "dark") || "light";
export const useSetting = create<Settings>()(
  persist(
    immer((set) => ({
      token: "",
      endpoint: "",
      modelName: "",
      error: null,
      loading: false,
      theme: defaultTheme,
      setError: (error) =>
        set((state) => {
          state.error = error;
        }),
      toggleTheme: () =>
        set((state) => {
          state.theme = state.theme === "light" ? "dark" : "light";
          document.documentElement.classList.toggle("dark");
          localStorage.setItem("theme", state.theme);
        }),
      setSetting: (token, endpoint, modelName) =>
        set((state) => {
          state.token = token;
          state.endpoint = endpoint;
          state.modelName = modelName;
        }),
    })),
    {
      name: "settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
