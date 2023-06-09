import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () =>{
    it("should throw error when id is empty", ()=>{
        
        expect(() => {
            let customer = new Customer("", "Leandro");
        }).toThrowError("ID is required");
    });

    it("should throw error when name is empty", ()=>{
        
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required");
    });

    it("should change name", ()=>{
        let customer = new Customer("123", "Leandro");
        customer.changeName("Leandro 123")
        expect(customer.name).toBe("Leandro 123");
    });

    it("should activated customer", ()=>{
        let customer = new Customer("123", "Leandro");
        const address = new Address("Rua tal", 10, "345567-09", "Moc");
        customer.Address = address;
        customer.activate()
        expect(customer.isActive()).toBe(true);
    });

    it("should deactivated customer", ()=>{
        let customer = new Customer("123", "Leandro");
        customer.deactivate()
        expect(customer.isActive()).toBe(false);
    });

    it("should throw error when address is undefined", ()=>{
        expect(() => {
            let customer = new Customer("123", "Leandro");
            customer.activate()
        }).toThrowError("Address is mandatory to activate a customer");
    });

    it("should add reward points", () => {
        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);
        
        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(20);
    });
});