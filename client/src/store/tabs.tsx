import { create } from "zustand";
import { immer } from "zustand/middleware/immer";

export interface ChatTab {
  name: string;
  id: string;
  timeStamps: Date;
}

interface Tabs {
  tabs: ChatTab[];
  addTab: () => void;
  removeTab: (tab: ChatTab) => void;
  renameTab: (tab: ChatTab) => void;
}

export const useTabs = create<Tabs>()(
  immer((set) => ({
    tabs: [],
    addTab: () =>
      set((state) => {
        state.tabs.push({
          id: Date.now().toString(),
          name: "New Tab",
          timeStamps: new Date(),
        });
      }),
    removeTab: (tab) =>
      set((state) => {
        state.tabs = state.tabs.filter((t) => t.id !== tab.id);
      }),
    renameTab: (tab) =>
      set((state) => {
        state.tabs = state.tabs.map((t) => {
          if (t.id === tab.id) {
            return tab;
          }
          return t;
        });
      }),
  }))
);
