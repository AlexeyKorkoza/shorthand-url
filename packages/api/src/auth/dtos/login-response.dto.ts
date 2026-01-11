import type { UserEntity } from "../../user/entities";

export interface LoginResponseDto {
  user: Omit<UserEntity, "password" | "updatedAt">;
}
