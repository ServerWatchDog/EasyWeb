import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {
  publicKey: string = '';

  constructor() {
  }

}
