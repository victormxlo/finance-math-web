export interface User {
  id: string;
  username: string;
  fullName: string;
  email: string;
  type: "Admin" | "Student";
  createdAt: string;
  token?: string;
};
