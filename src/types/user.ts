export type UserType = "Admin" | "User";

export type User = {
  id: string;
  username: string;
  fullName: string;
  email: string;
  type: UserType;
  createdAt: Date;
  token?: string;
};
