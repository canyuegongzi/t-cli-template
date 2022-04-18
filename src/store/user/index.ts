import { defineStore } from 'pinia';

type RootState = {
  token: string | null;
};

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      token: 'sdgsg',
    } as RootState;
  },
  actions: {
    setToken(res) {
      this.token = res;
    },
  },
});
