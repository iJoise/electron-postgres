export type RolesType = 'super-admin' | 'admin' | 'user'
export interface User {
  id: number
  login: string
  full_name: string
  role: RolesType
  password: string
}
