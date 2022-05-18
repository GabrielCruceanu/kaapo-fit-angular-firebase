export class UserAuth {
  constructor(
    public id: string,
    public email: string,
    private _token: string,
    private expirationDate: Date
  ) {}

  get expireDate() {
    return this.expirationDate;
  }

  get userToken() {
    if (!this.expirationDate || this.expirationDate <= new Date()) {
      return null;
    }

    return this._token;
  }
}
