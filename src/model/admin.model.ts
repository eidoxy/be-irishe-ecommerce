import { Admin } from "@prisma/client";

export type AdminResponse = {
  username: string;
  name: string;
  email: string;
}

export type AdminCreateRequest = {
  username: string;
  name: string;
  email: string;
  password: string;
}

export function toAdminResponse(admin: Admin) : AdminResponse {
  return {
    username: admin.username,
    name: admin.name,
    email: admin.email
  }
}