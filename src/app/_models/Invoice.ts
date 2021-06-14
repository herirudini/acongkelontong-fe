import { Time } from "@angular/common";
import { Timestamp } from "rxjs/internal/operators/timestamp";

export interface Invoice {
    _id: object,
    status: string,
    suplier_name: string,
    orders: [
        {   
            _id: string;
            status: string;
            discount: string;
            arrived: string;
            isAfterTax: string;
            product_name: string;
            brand_name: string;
            product_id: string;
            uom: string;
            buyPrice: number;
            quantity: number;
            subTotal: number;
        }
    ],
    bill: number,
    updatedAt: Date
}