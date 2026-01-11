import type { UserSession } from "../../auth/entities";

export interface UserInfoResponseDto {
  user: UserSession;
}
