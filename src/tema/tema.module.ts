import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TemaService } from './services/tema.service';
import { Tema } from './entities/tema.entity';
import { TemaController } from './controllers/tema.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Tema])],
    controllers: [TemaController],
    providers: [TemaService],
    exports: [TypeOrmModule, TemaService] 
})
export class TemaModule{}
