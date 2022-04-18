import { defineStore } from 'pinia';

export const useAppStore = defineStore('app', {
  state: () => {
    return {
      version: 1,
    };
  },
  actions: {
    setVersion(res) {
      this.version = res;
    },
  },
});
