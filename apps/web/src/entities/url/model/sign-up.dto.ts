import { type UserModel } from "@/entities/url/model/user.model.ts";

export type SignUpDto = Pick<UserModel, "email"> & {
  password: string;
};
