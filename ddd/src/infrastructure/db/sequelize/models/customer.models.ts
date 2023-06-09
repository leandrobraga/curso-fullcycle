// No domínio o endereço é um objeto de valor
// Na infra (tabela de banco) não leva em conta objeto de valor
// A modelagem do banco deve ser feita por agregagados
// Cada agregado gera um único model.
// Não se pode modelar o domínio pensando em banco. Deve ser o contrário. 
// Modelar o banco de dados eventualmente pensando no domínio

import {
    Table,
    Model,
    PrimaryKey,
    Column
  } from "sequelize-typescript";

  @Table({
    tableName: "customers",
    timestamps: false,
  })
  export default class CustomerModel extends Model {
    @PrimaryKey
    @Column
    declare id: string;
  
    @Column({ allowNull: false })
    declare name: string;
  
    @Column({ allowNull: false })
    declare street: string;
  
    @Column({ allowNull: false })
    declare number: number;
  
    @Column({ allowNull: false })
    declare zipcode: string;
  
    @Column({ allowNull: false })
    declare city: string;
  
    @Column({ allowNull: false })
    declare active: boolean;
  
    @Column({ allowNull: false })
    declare rewardPoints: number;
  }