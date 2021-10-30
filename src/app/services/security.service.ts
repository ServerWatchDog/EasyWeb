import {Injectable} from '@angular/core';
import * as Forge from 'node-forge';
import {GlobalService} from "./global.service";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private globalService: GlobalService) {
  }

  encryptWithPublicKey(valueToEncrypt: string): string {
    const rsa = Forge.pki.publicKeyFromPem("-----BEGIN PUBLIC KEY-----\r\n"
      + this.globalService.publicKey +
      "\r\n-----END PUBLIC KEY-----");
    return window.btoa(rsa.encrypt(valueToEncrypt.toString()));
  }
}
