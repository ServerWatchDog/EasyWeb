import {Injectable} from '@angular/core';
import {HttpService} from "./connect/http.service";
import {ServerInfo} from "../models/server-info";
import {Router} from "@angular/router";
import {SessionHttpService} from "./connect/session-http.service";

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  publicKey: string = '';

  _init = false;

  constructor(private http: HttpService,
              private sessionHttp: SessionHttpService) {
  }
  globalInit(finish: (message: InitStatus) => void) {
    if (this._init) {
      return
    }
    this.http.get<ServerInfo>("/info", res => {
      if (res.installed) {
        this.publicKey = res.encrypt.publicKey
        this.getLoginInfo(() => {
            finish(InitStatus.SUCCESS)
          }, () => {
            finish(InitStatus.NOT_LOGIN)
          }
        )
      } else {
        finish(InitStatus.NOT_INSTALL)
      }
    }, () => {
      finish(InitStatus.NETWORK_ERROR)
    })
  }

  getLoginInfo(success: (info: LoginInfo) => void, error: () => void = () => {
  }) {
    this.sessionHttp.get<LoginInfo>('/view/user/info', data => {
      success(data)
    }, () => {
      error()
    })
  }
}

export enum InitStatus {
  NETWORK_ERROR,
  NOT_INSTALL,
  NOT_LOGIN,
  SUCCESS
}

export interface LoginInfo {
  "name": string,
  "url": string,
  "groupName": string
}

export function emptyLoginInfo(): LoginInfo {
  return {
    "name": '',
    "url": '',
    "groupName": ''
  }
}
