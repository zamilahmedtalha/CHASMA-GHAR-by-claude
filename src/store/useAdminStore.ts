import { create } from 'zustand';

interface AdminState {
  adminMode: boolean;
  tapCount: number;
  incrementTap: () => void;
  lockAdmin: () => void;
}

export const useAdminStore = create<AdminState>((set) => ({
  adminMode: typeof window !== 'undefined' ? sessionStorage.getItem('adminMode') === 'true' : false,
  tapCount: 0,
  incrementTap: () => set((state) => {
    const newCount = state.tapCount + 1;
    if (newCount >= 15) {
      sessionStorage.setItem('adminMode', 'true');
      const token = crypto.randomUUID();
      sessionStorage.setItem('adminToken', token);
      return { tapCount: 0, adminMode: true };
    }
    return { tapCount: newCount };
  }),
  lockAdmin: () => {
    sessionStorage.removeItem('adminMode');
    sessionStorage.removeItem('adminToken');
    set({ adminMode: false, tapCount: 0 });
  }
}));
