import { IAddress } from "./address";

export interface IOrderToCreate {
    basketId: string;
    deliveryMethodId: number;
    shippingAddress: IAddress;
}


export interface IOrder {
    id: number;
    buyerEmail: string;
    orderdate: Date;
    shipToAddress: IAddress;
    deliveryMethod: string;
    shippingPrice: number;
    orderItems: IOrderItem[];
    subTotal: number;
    total: number;
    status: OrderStatus;
}

export interface IOrderItem {
    productId: number;
    productName: string;
    pictureUrl: string;
    quantity: number;
    price: number;
}

export enum OrderStatus {
    PENDING,
    PAYMENTRECEIVED,
    PAYMENTFAILED
}

