import { EditBookmarkDto } from './../src/bookmark/dto/edit-bookmark.dto';
import { CreateBookmarkDto } from './../src/bookmark/dto/create-bookmark.dto';
import { EditUserDto } from './../src/user/dto/edit-user.dto';
import { AuthDTO } from './../src/auth/dto/auth.dto';
import { PrismaService } from '../src/prisma/prisma.service';
import { AppModule } from './../src/app.module';
import { Test } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as pactum from 'pactum';

describe('App e2e', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    // Creates testing modules for entire app
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

    // Initialize app
    await app.init();
    await app.listen(3333);

    prisma = app.get(PrismaService);
    await prisma.cleanDb();
    pactum.request.setBaseUrl('http://localhost:3333');
  });
  afterAll(() => {
    app.close();
  });

  it.todo('Should pass');

  describe('Auth', () => {
    const dto: AuthDTO = {
      email: 'randomuser@mail.com',
      password: '123',
    };
    describe('Signup', () => {
      it('Should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('Should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('Should throw if no body', () => {
        return pactum.spec().post('/auth/signup').expectStatus(400);
      });
      it('Should signup', () => {
        // pactum sends post req and tests '/auth/signup' route
        return pactum
          .spec()
          .post('/auth/signup')
          .withBody(dto)
          .expectStatus(201);
      });
    });
    describe('Signin', () => {
      it('Should throw if email empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            password: dto.password,
          })
          .expectStatus(400);
      });
      it('Should throw if password empty', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody({
            email: dto.email,
          })
          .expectStatus(400);
      });
      it('Should throw if no body', () => {
        return pactum.spec().post('/auth/signin').expectStatus(400);
      });
      it('Should signin', () => {
        return pactum
          .spec()
          .post('/auth/signin')
          .withBody(dto)
          .expectStatus(200)
          .stores('userAt', 'access_token');
      });
    });
  });

  describe('User', () => {
    describe('Get me', () => {
      it('Should get user', () => {
        return pactum
          .spec()
          .get('/users/me')
          .withHeaders({
            Authorization: `Bearer $S{userAt}`,
          })
          .expectStatus(200);
      });
    });
    describe('Edit user', () => {
      it('Should edit user', () => {
        const dto: EditUserDto = {
          firstName: 'Vlad',
          email: 'vlad@gmail.com',
        };
        return pactum
          .spec()
          .patch('/users')
          .withHeaders({
            Authorization: `Bearer $S{userAt}`,
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.firstName)
          .expectBodyContains(dto.email);
      });
    });
  });

  describe('Bookmarks', () => {
    const bookmarkDto: CreateBookmarkDto = {
      link: 'https://google.com',
      title: 'Google',
      description: 'Search engine',
    };
    describe('Get empty bookmarks', () => {
      it('Should get empty bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: `Bearer $S{userAt}`,
          })
          .expectStatus(200)
          .expectBody([]);
      });
    });
    describe('Create bookmark', () => {
      it('Should create a bookmark', () => {
        return pactum
          .spec()
          .post('/bookmarks')
          .withHeaders({
            Authorization: `Bearer $S{userAt}`,
          })
          .withBody(bookmarkDto)
          .expectStatus(201)
          .stores('bookmarkId', 'id');
      });
    });
    describe('Get bookmarks', () => {
      it('Should get bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: `Bearer $S{userAt}`,
          })
          .expectStatus(200)
          .inspect();
      });
    });
    describe('Get bookmark by id', () => {
      it('Should get bookmark by id', () => {
        return pactum
          .spec()
          .get('/bookmarks/{id}')
          .withPathParams('id', `$S{bookmarkId}`)
          .withHeaders({
            Authorization: `Bearer $S{userAt}`,
          })
          .expectStatus(200)
          .inspect();
      });
    });
    describe('Edit bookmark by id', () => {
      it('Should edit a bookmark by id', () => {
        const dto: EditBookmarkDto = {
          title: 'Updated Title',
          description: 'Updated Description',
        };
        return pactum
          .spec()
          .patch('/bookmarks/{id}')
          .withPathParams('id', `$S{bookmarkId}`)
          .withHeaders({
            Authorization: `Bearer $S{userAt}`,
          })
          .withBody(dto)
          .expectStatus(200)
          .expectBodyContains(dto.title)
          .expectBodyContains(dto.description)
          .inspect();
      });
    });
    describe('Delete bookmark by id', () => {
      it('Should delete a bookmark', () => {
        return pactum
          .spec()
          .delete('/bookmarks/{id}')
          .withPathParams('id', `$S{bookmarkId}`)
          .withHeaders({
            Authorization: `Bearer $S{userAt}`,
          })
          .expectStatus(204)
          .inspect();
      });
    });
    describe('Get empty bookmarks', () => {
      it('Should get empty bookmarks', () => {
        return pactum
          .spec()
          .get('/bookmarks')
          .withHeaders({
            Authorization: `Bearer $S{userAt}`,
          })
          .expectStatus(200)
          .expectJsonLength(0);
      });
    });
  });
});
