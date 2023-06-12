import Address from "../../entity/address";
import EventDispatcher from "../@shared/event-dispatcher";
import CustomerChangeAddressEvent from "./customer-change-address.event";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsolelog from "./handler/envia-consolelog.handler";
import EnviaConsolelog1 from "./handler/envia-consolelog1.handler";
import EnviaConsolelog2 from "./handler/envia-consolelog2.handler";

describe("Customer Created Event Unit Test", () => {
    it("should register customer event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsolelog1();
        const eventHandler2 = new EnviaConsolelog2();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);
    });

    it("should unregister an customer created event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsolelog1();
        const eventHandler2 = new EnviaConsolelog2();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        
        eventDispatcher.unregister("CustomerCreatedEvent", eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler2);
    });

    it("should unregister all customer events handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsolelog1();
        const eventHandler2 = new EnviaConsolelog2();

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);


        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeUndefined();

    });

    it("should notify all customer created event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler1 = new EnviaConsolelog1();
        const eventHandler2 = new EnviaConsolelog2();
        const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
        const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandler1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandler2);

        const customerCreatedEvent = new CustomerCreatedEvent({
            id: '123',
            name: "Customer 1",
        });

        // Quando o notify for executado o SendEmailWhenProductIsCreateHandler.handle() deve ser executado
        eventDispatcher.notify(customerCreatedEvent);

        expect(spyEventHandler1).toHaveBeenCalled();
        expect(spyEventHandler2).toHaveBeenCalled();
    });
});

describe("Customer change address Unit test", () => {
    it("should register a customer change address event", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsolelog();

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);

        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandler);
    });

    it("should unregister an customer change address event handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsolelog();
        
        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandler);
        
        eventDispatcher.unregister("CustomerChangeAddressEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length).toBe(0);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toBeUndefined();
    });

    it("should unregister all customer change address events handler", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsolelog();
        

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);
       
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandler);
        
        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeUndefined();

    });

    it("should notify all customer change address event handlers", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new EnviaConsolelog();
        
        const spyEventHandler = jest.spyOn(eventHandler, "handle");
        
        eventDispatcher.register("CustomerChangeAddressEvent", eventHandler);
        
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandler);
        
        const customerChangeAddressEvent = new CustomerChangeAddressEvent({
            id: '123',
            name: "Customer 1",
            Address: new Address("new street", 100, '0000-000', 'Qualquer uma')
        });

        eventDispatcher.notify(customerChangeAddressEvent);

        expect(spyEventHandler).toHaveBeenCalled();
    });
});