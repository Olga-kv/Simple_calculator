import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { ResultModule } from './calculator/result/result.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  app.useStaticAssets(join(__dirname, '..', 'dist/public'));
  app.setBaseViewsDir([join(__dirname, '..', 'dist/public/views'),join(__dirname, '..', 'dist/public/views/stylesheets')]);
  app.setViewEngine('hbs');

  const options = new DocumentBuilder()
  .setTitle('Calcualtor swagger')
  .setDescription('Calculator API description')
  .setVersion('1.0')
  .addTag('calculator')
  .build();
  const document = SwaggerModule.createDocument(app, options,{
    include: [ResultModule],
  });
  SwaggerModule.setup('api/calculator', app, document);

  await app.listen(3000);
}
bootstrap();
