export interface LoginResultView {
  "status": LoginResultViewStatus,
  "token": string
}

export enum LoginResultViewStatus {
  SUCCESS, NEED_2FA, NEED_EMAIL, NEED_SMS
}
