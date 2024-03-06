import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  app.useGlobalPipes(new ValidationPipe());
  const options = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Pyramid game backend')
    .setDescription('Swagger for backend')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  //Swagger path: http://localhost:3200/api/docs
  SwaggerModule.setup(`/docs`, app, document);
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
