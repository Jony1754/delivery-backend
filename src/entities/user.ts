export class User {
  constructor(
    public name: string,
    public email: string,
    public password: string,
    public role: string,
    public address: string,
    public isDeleted?: boolean,
    public id?: string
  ) {}
}
