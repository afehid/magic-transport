import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { serverConfig } from './config/config';

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

  await app.listen(serverConfig.port);
  console.log(`app listen on port http://localhost:${serverConfig.port}/api`);

}
bootstrap();
