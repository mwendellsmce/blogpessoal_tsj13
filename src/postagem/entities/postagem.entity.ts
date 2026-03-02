import { IsNotEmpty } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";
import { Entity,  PrimaryGeneratedColumn,  Column,  UpdateDateColumn} from 'typeorm';

@Entity({name: "tb_postagens"}) //create table tb_postagem
export class Postagem{

    @PrimaryGeneratedColumn() //Prymary Key(id) AUTO INCREMENT
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // força digitação
    @Column({length: 100, nullable: false}) //VARCHAR(100) NOT NULL
    titulo: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() // força digitação
    @Column({length: 1000, nullable: false}) //VARCHAR(1000) NOT NULL
    texto: string;

    @UpdateDateColumn()
    data: Date;
}




