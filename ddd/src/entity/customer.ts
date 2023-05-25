// Expresividade semantica da entidade. Não tem um seter do activate com false e true. 
// Tem uma função de ativar e uma de desativar para representar semanticamente o que deseja fazer.

// Uma Entidade por padrão ela deve SEMPRE se auto validar

// Esta entidade é focada em NEGÓCIO
// Deve existir uma outra "entidade" (um model) focada em peristência. Essa sim vai ser pensada com o ORM (tabela de banco, etc)
// NÂO CRIAR UMA SÓ ENTIDADE PARA AS DUAS COISAS. A entidade de persistencia deve ser chamada de MODEL

// Exemplo de estrutura de pastas
// Domain
// -Entity
//     -- customer.ts (regra de negócio)

// infra   (fala com o mundo externo)
// -Entity / Model
//     -- customer.ts (geters, seters)

import Address from './address';

export default class Customer {
    _id: string;
    _name: string;
    _address!: Address;
    _activate: boolean = false;

    constructor(id: string, name: string ) {
        this._id = id;
        this._name = name;
        this.validate();
    }

    get name():string {
        return this._name;
    }

    validate() {
        if (this._name.length === 0) {
            throw new Error("Name is required")
        }
        if (this._id.length === 0) {
            throw new Error("ID is required")
        }
        
    }

    // get id(): string {
    //     return this._id
    // }

    // get name(): string {
    //     return this._name
    // }

    // get address(): string {
    //     return this._address
    // }

    // set id(id: string) {
    //     this._id = id
    // }

    // set name(name: string) {
    //     this._name = name
    // }

    // set address(address: string) {
    //     this._address = address
    // }

    changeName(name: string) {
        this.validate();
        this._name = name;
    }

    isActive(): boolean {
        return this._activate;
    }

    activate() {
        if (this._address === undefined) {
            throw new Error("Address is mandatory to activate a customer")
        }
        this._activate = true;
    }

    deactivate() {
        this._activate = false;
    }

    set Address(address: Address) {
        this._address = address;
    }

}