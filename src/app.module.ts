import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminModule } from '@adminjs/nestjs';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';
import { DMMFClass } from '@prisma/client/runtime';
import AdminJS from 'adminjs';
import { Database, Resource } from '@adminjs/prisma';

AdminJS.registerAdapter({ Resource, Database });

@Module({
	imports: [
		PrismaModule,
		AdminModule.createAdminAsync({
			imports: [PrismaModule],
			inject: [PrismaService],
			useFactory: async (prisma: PrismaService) => {
				const dmmf = (prisma as any)._dmmf as DMMFClass;
				return {
					adminJsOptions: {
						rootPath: '/',
						resources: [
							{
								resource: {
									model: dmmf.modelMap.users,
									client: prisma,
								},
								options: {},
							},
						],
					},
				};
			},
		}),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
