import { LoginResponse } from "@/components/model/login";
import { Role } from "@/components/model/role";

export type UserInfo = LoginResponse;

export class Storage {
  key = "info";

  setUserInfo(info: UserInfo): void {
    localStorage.setItem(this.key, JSON.stringify(info));
  }

  deleteUserInfo(): void {
    localStorage.removeItem(this.key);
  }

  get userInfo(): UserInfo {
    try {
      return JSON.parse(localStorage.getItem(this.key)) as UserInfo;
    } catch (error) {
      return null;
    }
  }

  get token(): string | null {
    return this.userInfo?.token;
  }

  get role(): Role {
    return this.userInfo?.role;
  }

  get userId(): number {
    return this.userInfo?.userId;
  }
}
export const storage = new Storage();

export default storage;
