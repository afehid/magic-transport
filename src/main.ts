import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle('Magic-Mover')
  .setDescription('The Magic-Mover API description')
  .setVersion('1.0')
  .addTag('transport')
  .build();
  const document = SwaggerModule.createDocument(app,config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
  console.log(`app listen on port http://localhost:3000/api`);

}
bootstrap();
