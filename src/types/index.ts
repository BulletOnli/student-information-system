import { UserRole } from "@prisma/client";

export type BasicUserInfo = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};
