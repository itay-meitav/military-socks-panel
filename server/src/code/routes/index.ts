import express from 'express'
import pages from './pages'
import edit from './edit'
import add from './add'
import { appendFile } from 'fs'


const router = express.Router()

router.use(pages);
router.use("/edit", edit);
router.use('/add', add);

export default router 