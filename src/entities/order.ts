export class Order {
  constructor(
    public userId: string,
    public restaurantId: string,
    public products: { productId: string; quantity: number }[],
    public total: number,
    public id?: string
  ) {}
}
