export interface CRUDUserGroup {
  id: string,
  name: string,
  authorities: string[ ],
  users: [
    {
      id: string,
      name: string,
      email: string
    }
  ]
}

export interface CRUDGroupInsert {
  name: string,
  authorities: string[]
}
