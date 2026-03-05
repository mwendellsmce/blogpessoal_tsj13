import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostagemService } from './services/postagem.service';
import { Postagem } from './entities/postagem.entity';
import { PostagemController } from './controllers/postagem.controller';

@Module({
    imports:[TypeOrmModule.forFeature([Postagem])],
    controllers: [PostagemController],
    providers:[PostagemService],
    exports: [TypeOrmModule]
})
export class PostagemModule{}
