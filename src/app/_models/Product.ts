export interface Product {
    _id: string;
    status: string;
    suplier_name: string;
    brand_name: string;
    product_name: string;
    image: any;
    uom: string;
    stock: number;
    buyPrice: number;
    sellPrice: number;
    isAfterTax: string;
    barcode: string;
}