export class Product {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public category: string,
    public restaurantId: string,
    public isDeleted?: boolean,
    public id?: string
  ) {}
}
