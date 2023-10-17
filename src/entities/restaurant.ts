export class Restaurant {
  constructor(
    public idAdmin: string,
    public name: string,
    public address: string,
    public category: string,
    public isDeleted?: boolean,
    public id?: string
  ) {}
}
