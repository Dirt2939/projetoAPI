type UserProfileData = {
  name: string;
  email: string;
  phone: string;
  ocuppacion: 'CUSTOMER' | 'ADMIN' | 'MANAGER'; 
  status: boolean; 
  createdAt: string;
  updatedAt: string;
}

export { type UserProfileData as default };