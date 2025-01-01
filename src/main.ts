import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    // logger: WinstonModule.createLogger(winstonConfig),
  });

  // app.use(cookieParser());
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders:
      'Origin,X-Requested-With,Content-Type,Accept,Authorization,authorization,X-Forwarded-for,External_Network,external_network',
    credentials: true,
  });
  const logger = new Logger();

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('E-commerce')
    .setDescription('Here is the API for E-commerce backend')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(8080);
  console.log(`Server is running on port 8080...`);
}
bootstrap();
