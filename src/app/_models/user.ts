import { Role } from './role';

export class User {
  id: number;
  firstName = '';
  lastName = '';
  username: string;
  role: Role;
  token?: string;
  password?: string;

  constructor(username: string, password: string, role: Role) {
    this.username = username;
    this.password = password;
    this.role = role;
    this.id = this.getId();
  }

  private getId(): number {
    const currentUsers: User[] =
      JSON.parse(localStorage.getItem('users')) || [];
    const lastId = currentUsers.length
      ? currentUsers[currentUsers.length - 1].id
      : 0;
    return lastId + 1;
  }
}
