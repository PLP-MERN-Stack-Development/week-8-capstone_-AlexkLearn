export const isAdmin = () => localStorage.getItem('role') === 'admin';
export const isProvider = () => localStorage.getItem('role') === 'provider';
export const isUser = () => localStorage.getItem('role') === 'user';