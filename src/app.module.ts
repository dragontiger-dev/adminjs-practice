import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from '@adminjs/nestjs';

@Module({
	imports: [
		AdminModule.createAdmin({
			adminJsOptions: {
				rootPath: '/',
				resources: [],
			},
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
