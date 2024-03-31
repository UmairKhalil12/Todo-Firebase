import create from 'zustand';

const appStore = create((set) => ({
  user: null, 
  userInfo : null,
  setUser: (user) => set({ user }),
  setUserInfo : (userInfo) => set({userInfo}),
}));

export default appStore;
