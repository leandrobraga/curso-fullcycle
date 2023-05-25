// A classe Addres é um objeto de valor
// Não possui um id. Não precisa nem ser único

// Quando vc se preocupa apenas com os atributos de um elemento de um modelo (entidade),
// classifique isso como um Value Object

// Se quiser trocar de endereço posso criar um novo e atribuir.
// O antigo endereço pode até ser deletado
// Claro tudo isso depende de um contexto. No caso de cadastrar vários endereços para entrega em um ecomerce
// o Address pode virar uma entidade

// O addres não pode ter funções de alteração. Pode ter outras funções auxiliares como a Tostring que não altera nada

export default class Address {
    
    _street: string;
    _number: number = 0
    _zip: string;
    _city: string;
   
    constructor( street:string, number:number, zip:string, city:string, ) {
        
        this._street = street;
        this._number = number;
        this._zip = zip;
        this._city = city;
        
        this.validate();
    }

    get street(): string {
        return this._street;
    }
    
    get number(): number {
        return this._number;
    }

    get zip(): string {
        return this._zip;
    }

    get city(): string {
        return this._city;
    }
    
    validate() {
    if (this._street.length === 0) {
        throw new Error("Street is required");
    }
    if (this._number === 0) {
        throw new Error("Number is required");
    }
    if (this._zip.length === 0) {
        throw new Error("Zip is required");
    }
    if (this._city.length === 0) {
        throw new Error("City is required");
    }
    }

    toString() {
        return `${this._street}, ${this._number}, ${this._zip} ${this._city}`;
    }
}