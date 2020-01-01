import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';

import config from '../config/config';

import * as BookController from './controllers/book';
import apiSpec from './openapi.json';

const router = Router();

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
};

router.post('/book/add', BookController.add);
router.get('/book/all', BookController.all);
router.get('/book/search', BookController.search);

// Dev routes
if (config.isDevelopment) {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
