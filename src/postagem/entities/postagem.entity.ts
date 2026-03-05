import { IsNotEmpty, Length } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, ManyToOne } from 'typeorm';
import { Tema } from '../../tema/entities/tema.entity'; 

@Entity({name: "tb_postagens"}) //create table tb_postagem
export class Postagem{

    @PrimaryGeneratedColumn() //Prymary Key(id) AUTO INCREMENT
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: 'O Título é Obrigatório' }) // força digitação
    @Length(5, 100, { message: 'O Título deve ter entre 5 e 100 caracteres' })
    @Column({length: 100, nullable: false}) //VARCHAR(100) NOT NULL
    titulo: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: 'O Texto é Obrigatório' }) // força digitação
    @Length(10, 1000, { message: 'O Texto deve ter entre 10 e 1000 caracteres' })
    @Column({length: 1000, nullable: false}) //VARCHAR(1000) NOT NULL
    texto: string;

    @UpdateDateColumn()
    data: Date;

    @ManyToOne( () => Tema, (tema) => tema.postagem,{
        onDelete: "CASCADE"
    })
    tema: Tema;
}