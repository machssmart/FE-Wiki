import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS aktivieren
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  // Swagger API Dokumentation
  const config = new DocumentBuilder()
    .setTitle('FE-Wiki API')
    .setDescription('API für Fockenbrock Elektrotechnik Wiki')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3001);
  console.log('🚀 FE-Wiki API läuft auf http://localhost:3001');
  console.log('📚 API Docs: http://localhost:3001/api');
}

bootstrap();