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

import Entity from '../../@shared/entity/entity.abstract';
import NotificationError from '../../@shared/notification/notification.error';
import CustomerValidatorFactory from '../factory/customer.factory.validator';
import Address from '../value-object/address';

export default class Customer extends Entity {
    
    private _name: string;
    private _address!: Address;
    private _activate: boolean = false;
    private _rewardPoints: number = 0;

    constructor(id: string, name: string ) {
        super();
        this._id = id;
        this._name = name;
        this.validate();

        if (this.notification.hasErrors()) {
            throw new NotificationError(this.notification.getErrors())
        }
    }

    get name():string {
        return this._name;
    }

    get rewardPoints(): number {
        return this._rewardPoints;
    }

    validate() {
        // if (this._name.length === 0) {
        //     this.notification.addError({
        //         context: "customer",
        //         message: "Name is required"
        //     });
        // }
        // if (this.id.length === 0) {
        //     this.notification.addError({
        //         context: "customer",
        //         message: "Id is required"
        //     });
        // }

        // this is a Customer object
        CustomerValidatorFactory.create().validate(this);
    }

    changeName(name: string) {
        this.validate();
        this._name = name;
    }

    changeAddress(address: Address) {
        this._address = address;
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

    addRewardPoints(points: number) {
        this._rewardPoints += points;
    }

    get Address(): Address {
        return this._address;
    }

    set Address(address: Address) {
        this._address = address;
    }

}