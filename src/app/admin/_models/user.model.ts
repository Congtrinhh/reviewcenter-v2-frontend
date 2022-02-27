export class User {
  id?: string;
  email?: string;
  displayName?: string;
  password?: string;
  provider?: string;
  avatarUrl?: string;
  enabled?: string = 'true';
  createdDate?: string;
  modifiedDate?: string;
  roleNames?: string[];
  roleIds?: string[];
}
