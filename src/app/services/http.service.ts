import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(
    private http: HttpClient
  ) {
  }

  get<T>(path: string, result: (data: T) => void,
         error: (code: number, message: string) => void = (code, message) => {
         }) {
    this.http.get<T>(environment.api + path)
      .subscribe(status => result(status), fail => {
        error(fail.error.code, fail.error.message)
      })
  }

  post<T>(path: string, data: object, result: (data: T) => void,
          error: (code: number, message: string) => void = (code, message) => {
          }
  ) {
    this.http.post<T>(environment.api + path, data)
      .subscribe(status => result(status), fail => {
        error(fail.error.code, fail.error.message)
      })
  }

  put<T>(path: string, data: object, result: (data: T) => void,
         error: (code: number, message: string) => void = (code, message) => {
         }
  ) {
    this.http.put<T>(environment.api + path, data)
      .subscribe(status => result(status), fail => {
        error(fail.error.code, fail.error.message)
      })
  }

  delete<T>(path: string, result: (data: T) => void,
            error: (code: number, message: string) => void = (code, message) => {
            }) {
    this.http.delete<T>(environment.api + path).subscribe(status => result(status), fail => {
      error(fail.error.code, fail.error.message)
    })
  }
}
