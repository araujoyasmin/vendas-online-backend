
import { Column, Entity, CreateDateColumn,PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, TableInheritance, ChildEntity } from "typeorm";
import { PaymentEntity } from "./payment.entity";

@ChildEntity()
export class PaymentCreditCardEntity extends PaymentEntity{
    
    @Column({ name:'amount_payments', nullable:false})
    amountPayments: number;


    
}