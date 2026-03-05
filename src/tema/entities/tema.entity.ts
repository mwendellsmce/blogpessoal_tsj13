import { IsNotEmpty, Length } from "class-validator";
import { Transform, TransformFnParams } from "class-transformer";
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Postagem } from '../../postagem/entities/postagem.entity'; 

@Entity({name: "tb_temas"}) //create table tb_temas
export class Tema{

    @PrimaryGeneratedColumn() //Prymary Key(id) AUTO INCREMENT
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty({ message: 'A Descrição é Obrigatória' }) // força digitação
    @Length(5, 255, { message: 'A Descrição deve ter entre 5 e 255 caracteres' })
    @Column({length: 255, nullable: false}) //VARCHAR(255) NOT NULL
    descricao: string;

    @OneToMany(() => Postagem, (postagem) => postagem.tema)
    postagem: Postagem[];
}