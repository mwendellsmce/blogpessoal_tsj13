import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { TypeOrmModule } from '@nestjs/typeorm';


describe('Testes dos Modulos Usuario e Auth (e2e)', () => {

  let app: INestApplication;

  let usuarioid: any;

  let token: any;

  beforeAll(async () => {

    const moduleFixture: TestingModule = await Test.createTestingModule({

      imports: [

        TypeOrmModule.forRoot({

          type: 'sqlite',

          database: ':memory:', // Correção: adicionado o ':' no final

          autoLoadEntities: true, // Isso substitui a linha do __dirname e evita erros de caminho

          synchronize: true,

          dropSchema: true,

        }),

        AppModule,

      ],

    }).compile();


    app = moduleFixture.createNestApplication();

    app.useGlobalPipes(new ValidationPipe())

    await app.init();

  });


  afterAll(async () => {

    await app.close(); // Sempre feche a aplicação após os testes para não travar o terminal

  });


  it("01 - Deve Cadastrar um novo usuario", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com.br',
        senha: 'rootroot',
        foto: '-',
      })
      .expect(201);

    usuarioid = resposta.body.id;

  })
  it("02 - Nao deve Cadastrar um usuario já existente", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/cadastrar')
      .send({
        nome: 'Root',
        usuario: 'root@root.com.br',
        senha: 'rootroot',
        foto: '-',
      })
      .expect(400);

    //usuarioid = resposta.body.id;
  })

  it("03 - Deve autenticar um usuario cadastrado", async () => {
    const resposta = await request(app.getHttpServer())
      .post('/usuarios/logar')
      .send({
        usuario: 'root@root.com.br',
        senha: 'rootroot',
      })
      .expect(200);

    token = resposta.body.token;
  })

  it("04 - Deve listar os usuarios cadastrados", async () => {
    const resposta = await request(app.getHttpServer())
      .get('/usuarios/all')
      .set('Authorization', `${token}`)
      .expect(200)
  })

  it("05 - Deve atualizar os dados de um usuario existente", async () => {
    const resposta = await request(app.getHttpServer())
      .put('/usuarios/atualizar')
      .set('Authorization', `${token}`)
      .send({
        id: usuarioid,
        nome: 'Root Atualizado',
        usuario: 'root@root.com.br',
        senha: 'rootroot',
        foto: '-'
      })

      .expect(200)
  });

  it("06 - Deve buscar um usuário pelo id", async () => {
    const resposta = await request(app.getHttpServer())
      .get(`/usuarios/${usuarioid}`)
      .set("Authorization", `${token}`);

    expect(resposta.status).toBe(200);
    expect(resposta.body.id).toBe(usuarioid);
  });
});

