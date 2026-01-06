import type {
  SignInDto,
  SignUpDto,
  UpdateProfileDto,
  UserModel,
} from "@/entities/url/model";
import { httpClient } from "@/shared/api";

const BASE_SHORT_API_URL = "auth";

export const signUp = (body: SignUpDto): Promise<string> => {
  return httpClient.post(`${BASE_SHORT_API_URL}/signup`, {
    body: JSON.stringify(body),
  });
};

export const signIn = (body: SignInDto): Promise<string> => {
  return httpClient.post(`${BASE_SHORT_API_URL}/signup`, {
    body: JSON.stringify(body),
  });
};

export const getUserProfile = (userId: string): Promise<UserModel> => {
  return httpClient.get(`${BASE_SHORT_API_URL}/profile/${userId}`);
};

export const updateUserProfile = (
  userId: string,
  data: UpdateProfileDto,
): Promise<UserModel> => {
  return httpClient.put(`${BASE_SHORT_API_URL}/profile/${userId}`, {
    body: JSON.stringify(data),
  });
};
