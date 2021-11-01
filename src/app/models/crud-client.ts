export interface CrudClient {
  id: string,
  name: string,
  user: {
    id: string,
    name: string,
    email: string
  },
  groups: [
    {
      id: number,
      name: string
    }
  ],
  enabled: true,
  token: string
}

export interface CrudInsertClient {
  name: string,
  linkedUser: string,
  enabled: boolean,
  linkedGroup: string[
  ],
  refreshToken: boolean
}
