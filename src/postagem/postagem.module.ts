import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemService } from './services/postagem.service';
import { Postagem } from './entities/postagem.entity';

@Module({
    imports:[TypeOrmModule.forFeature([Postagem])],
    controllers: [],
    providers:[PostagemService],
    exports: []
})
export class PostagemModule{}
