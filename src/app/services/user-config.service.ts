import {Injectable} from '@angular/core';
import {SessionHttpService} from "./connect/session-http.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {SecurityHttpService} from "./connect/security-http.service";

@Injectable({
  providedIn: 'root'
})
export class UserConfigService {

  data: Array<UserItem> = []
  pageIndex: number = 0
  pageCount: number = 0
  size: number = 0


  constructor(
    private sHttp: SessionHttpService,
    private securityHttp: SecurityHttpService
  ) {
  }

  select(index: number, count: number, call: () => void) {
    this.sHttp.get<Users>("/admin/user?index=" + index + "&size=" + count, res => {
      this.data = res.data
      this.pageCount = res.pageCount
      this.size = res.size
      this.pageIndex = res.pageIndex
      call()
    })
  }


  insert(data: UserInsert, success: () => void, msg: (msg: string) => void) {
    this.securityHttp.post<UserItem>("/admin/user", this.sHttp, data, res => {
      success()
    }, (code, message) => {
      msg(message)
    })
  }

  update(id: string, data: UserInsert, success: () => void, msg: (msg: string) => void) {
    this.securityHttp.put<UserItem>("/admin/user/" + id, this.sHttp, data, res => {
      success()
    }, (code, message) => {
      msg(message)
    })
  }

  delete(id: string, success: () => void, msg: (msg: string) => void) {
    this.sHttp.delete("/admin/user/" + id, success, ((code, message) => msg(message)))
  }
}

export interface Users {
  "data": Array<UserItem>,
  "pageIndex": number,
  "pageCount": number,
  "size": number
}

export interface UserItem {
  "id": string,
  "name": string,
  "email": string,
  "password": string,
  "registerDate": string,
  "groupName": string
}

export interface UserInsert {
  "name": string,
  "email": string,
  "password": string,
  "group": string
}
