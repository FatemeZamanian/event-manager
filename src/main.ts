import { NestFactory } from "@nestjs/core";
import { AppModule } from "./@core/app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle("Event Manager API")
    .setDescription("API documentation for the Event Manager project")
    .setVersion("1.0")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api-docs", app, document);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
