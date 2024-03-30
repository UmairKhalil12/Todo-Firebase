import create from 'zustand';

const appStore = create((set) => ({
  user: null, 
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
}));

export default appStore;
