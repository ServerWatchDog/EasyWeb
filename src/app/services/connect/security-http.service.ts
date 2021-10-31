import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {SecurityService} from "../security.service";
import {InHttp} from "./in-http";


@Injectable({
  providedIn: 'root'
})
export class SecurityHttpService {

  constructor(
    private http: HttpClient,
    private security: SecurityService,
  ) {
  }


  post<T>(path: string, http: InHttp, data: object, result: (data: T) => void,
          error: (code: number, message: string) => void = (code, message) => {
          }
  ) {
    const sec: SecurityView = {
      type: 'RSA',
      cipher: this.security.encryptWithPublicKey(data)
    };

    http.post<T>(path, sec, result, error)
  }

  put<T>(path: string, http: InHttp, data: object, result: (data: T) => void,
         error: (code: number, message: string) => void = (code, message) => {
         }
  ) {
    const sec: SecurityView = {
      type: 'RSA',
      cipher: this.security.encryptWithPublicKey(data)
    };
    http.put<T>(path, sec, result, error)

  }
}

interface SecurityView {
  "type": string,
  "cipher": string
}
