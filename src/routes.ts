import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import apiSpec from '../openapi.json';

import v1 from './v1';
import config from './config/config';

const swaggerUiOptions = {
  customCss: '.swagger-ui .topbar { display: none }',
};

const router = Router();

// V1 routes
router.use('/v1', v1);

// Dev routes
if (config.isDevelopment) {
  router.use('/dev/api-docs', swaggerUi.serve);
  router.get('/dev/api-docs', swaggerUi.setup(apiSpec, swaggerUiOptions));
}

export default router;
