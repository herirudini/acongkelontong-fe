export interface Receipt {
  _id: string;
  items: [
    {
      product: string;
      quantity: number;
      price: number;
      totalPrice: number;
    }
  ];
  totalTax: number;
  subtotal: number;
  date: any;
}
