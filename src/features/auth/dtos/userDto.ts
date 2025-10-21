export interface UserDTO {
  id: string;
  username: string;
  fullName: string;
  email: string;
  type: "Admin" | "Student";
  createdAt: string;
  token?: string;
};
