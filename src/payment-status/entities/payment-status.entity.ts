import { AddressEntity } from "../../address/entities/address.entity";
import { StateEntity } from "../../state/entities/state.entity";
import { Column, Entity, CreateDateColumn,PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'payment_status'})
export class PaymentStatusEntity {
    @PrimaryGeneratedColumn('rowid')
    id: number;

    @Column({ name:'state_id', nullable:false})
    stateId: number;

    @Column({ name:'name', nullable:false})
    name: string;

    @CreateDateColumn({ name: 'created_at'})
    createdAt: Date;

    @UpdateDateColumn({ name: 'updated_at'})
    updatedAt: Date;

   
}