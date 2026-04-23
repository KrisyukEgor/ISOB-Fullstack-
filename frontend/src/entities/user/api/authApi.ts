import { api } from "../../../shared/api/base";
import type { AccessTokenResponse, LoginDto, RegisterDto, User } from '../model/types';


export const authApi = {
  login: (data: LoginDto) =>
    api.post<AccessTokenResponse>('/login/', data).then(res => res.data),

  register: (data: RegisterDto) =>
    api.post('/register/', data).then(res => res.data),

  logout: () => api.post('/logout/'),

  getMe: () => api.get<User>('/user/me/').then(res => res.data),
};  