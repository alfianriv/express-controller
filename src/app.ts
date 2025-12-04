import { configDotenv } from 'dotenv';
configDotenv();
import 'reflect-metadata';
import { useExpressServer } from 'routing-controllers';
import { Controllers } from './controllers';
import { GlobalErrorHandler } from './middlewares/global-error.middleware';
import express from 'express';
import bodyParser from 'body-parser';
import { ResponseMappingMiddleware } from './middlewares/response-mapping.middleware';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

useExpressServer(app, {
  routePrefix: '/api',
  controllers: Controllers,
  validation: true,
  classTransformer: true,
  interceptors: [ResponseMappingMiddleware],
  middlewares: [GlobalErrorHandler],
  defaultErrorHandler: false,
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
