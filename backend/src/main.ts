import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const cluster = require('cluster');
const os = require('os');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
if (cluster.isPrimary) {
  const numCPUs = os.cpus().length;
  console.log(`Master ${process.pid} is running`);
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  } 

  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died`);
  });
 } else {
  bootstrap();
  console.log(`Worker ${process.pid} started`);
  }