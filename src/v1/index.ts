import { Router } from 'express';
import * as BookController from './controllers/book';

const router = Router();

router.post('/book/add', BookController.add);
router.get('/book/all', BookController.all);
router.get('/book/search', BookController.search);

export default router;
