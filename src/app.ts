import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import * as dotenv from 'dotenv';

export default class App {

	public server: INestApplication;

	private static _instance: App = new App();

	private envConfig: object;

    private constructor() {

		if (typeof App._instance === 'object') {
			return App._instance;
		}

		App._instance = this;
	}

	public static getInstance() {
		return App._instance;
	}

	public async bootstrap() {

		try {
			this.envConfig = this._getAppConfig();
			this.server = await NestFactory.create(ApplicationModule);
			await this.server.listen(process.env.APP_LISTEN_PORT);
		} catch (error) {
			return error;
		}
	}

	private _getAppConfig(): object {
		const result = dotenv.config();

		if (result.error) {
			throw result.error;
		}

		return result;
	}

	public async shutDown() {
		await this.server.close();
	}
}
