// Se está em diferentes agregados faz a relação com ID
// Se está no mesmo agregado faz a relação com a entidade (calsse).

// No caso o customer pertence a um outro agregado que não o agregado de Order
// Já os items da order pertence ao mesmo agregado.

import OrderItem from "./order_items";

export default class Order {

    private _id: string;
    private _customerId: string;
    private _items: OrderItem[];
    private _total: number;

    constructor(id: string, customerId: string, items: OrderItem[]){
        this._id = id;
        this._customerId = customerId;
        this._items = items;
        this._total = this.total();
        this.validate();
    }

    get id(): string {
        return this._id;
    }

    get customerId(): string {
        return this._customerId;
    }

    get items(): OrderItem[] {
        return this._items;
    }

    validate(): boolean {
        if (this._id.length === 0) {
            throw new Error("ID is required");
        }
        if (this._customerId.length === 0) {
            throw new Error("CustomerId is required");
        }
        if (this._items.length === 0) {
            throw new Error("Items must be greater the zero");
        }
        if(this._items.some(item => item.quantity <=0)) {
            throw new Error("Quantity must be greater than 0")
        }
        return true;
    }

    total(): number {
        return this._items.reduce((acc, item) => acc + item.price, 0)
    }
}