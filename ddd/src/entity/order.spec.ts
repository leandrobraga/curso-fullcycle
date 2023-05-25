import Order from "./order";
import OrderItem from "./order_items";


describe("Order unit tests", () =>{
    it("should throw error when id is empty", ()=>{
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("ID is required");
    });
    it("should throw error when cusotmerId is empty", ()=>{
        expect(() => {
            let order = new Order("123", "", []);
        }).toThrowError("CustomerId is required");
    });
    it("should throw error when items is empty", ()=>{
        expect(() => {
            let order = new Order("1", "1", []);
        }).toThrowError("Items must be greater the zero");
    });
    it("should calculate total", ()=>{
        const item1 = new OrderItem("1", "Item1", 100, "p1", 2)
        const item2 = new OrderItem("2", "Item2", 200, "p2", 2)
        let order = new Order("1", "1", [item1, item2]);
        expect(order.total()).toBe(600);
    });

    it("should cthrow error when quantity less or equal then zero", ()=>{
        expect(() => {
            const item1 = new OrderItem("1", "Item1", 100, "p1", 0);
            let order = new Order("1", "1", [item1]);
        }).toThrowError("Quantity must be greater than 0");
    });
});