import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, ILike, DeleteResult } from "typeorm";
import { Tema } from "../entities/tema.entity";

@Injectable()
export class TemaService{
   
    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>,
    ){}

    async findAll (): Promise<Tema[]>{
        // SELECT * FROM tb_temas
        return this.temaRepository.find({
            relations: {
                postagem: true
            }
        });
    }

    async findById(id: number): Promise<Tema>{
        // SELECT * FROM tb_temas WHERE id = ?
        const tema = await this.temaRepository.findOne({
            where:{
                id
            },
            relations: {
                postagem: true
            }
        })
        if (!tema)
            throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND);

        return tema;
    }

    async findAllByDescricao(descricao: string): Promise<Tema[]>{
        return this.temaRepository.find({
            where:{
                descricao: ILike(`%${descricao}%`)
            },
            relations: {
                postagem: true
            }
        })
    }

    async create(tema: Tema): Promise<Tema>{
        // INSERT INTO tb_temas (descricao) VALUES (?)
        return await this.temaRepository.save(tema);
    }

    async update(tema: Tema): Promise<Tema>{
        await this.findById(tema.id);
        // UPDATE tb_temas SET descricao = ? WHERE ID = ?
        return this.temaRepository.save(tema);
    }

    async delete(id: number): Promise<DeleteResult>{
        await this.findById(id);

        //DELETE tb_temas FROM id = ?
        return this.temaRepository.delete(id);
    }
}
