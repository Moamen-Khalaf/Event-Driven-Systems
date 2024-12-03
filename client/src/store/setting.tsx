import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { createJSONStorage, persist } from "zustand/middleware";

interface Settings {
  token: string;
  endpoint: string;
  modelName: string;
  theme: "light" | "dark";
  notification: {
    type: "error" | "success" | null;
    message: string;
  };
  loading: boolean;
  toggleTheme: () => void;
  setSetting: (token?: string, endpoint?: string, modelName?: string) => void;
}
const defaultTheme =
  (localStorage.getItem("theme") as "light" | "dark") || "light";
export const useSetting = create<Settings>()(
  persist(
    immer((set) => ({
      token: "",
      endpoint: "",
      modelName: "",
      notification: {
        type: null,
        message: "",
      },
      loading: false,
      theme: defaultTheme,
      toggleTheme: () =>
        set((state) => {
          state.theme = state.theme === "light" ? "dark" : "light";
          document.documentElement.classList.toggle("dark");
          localStorage.setItem("theme", state.theme);
        }),
      setSetting: (token, endpoint, modelName) =>
        set((state) => {
          if (!token || !endpoint || !modelName) {
            state.notification = {
              type: "error",
              message: "Please fill all the fields.",
            };
            return;
          }
          if (!isValidUrl(endpoint)) {
            state.notification = {
              type: "error",
              message: "Please enter a valid URL.",
            };
            return;
          }
          state.token = token;
          state.endpoint = endpoint;
          state.modelName = modelName;
          state.notification = {
            type: "success",
            message: "Settings saved.",
          };
        }),
    })),
    {
      name: "settings",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

const isValidUrl = (urlString: string) => {
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
};
