
import { Column, Entity, CreateDateColumn,PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, TableInheritance, ChildEntity } from "typeorm";
import { PaymentEntity } from "./payment.entity";

@ChildEntity()
export class PaymentPixEntity extends PaymentEntity{
    
    @Column({ name:'code', nullable:false})
    code: number;

    @Column({ name:'date_payment', nullable:false})
    datePayment: Date;

    
}