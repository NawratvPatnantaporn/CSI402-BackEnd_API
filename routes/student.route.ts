import express, { Router } from "express"
import { studentscore } from "../controller/student.controller";

const router: Router = express.Router();

router.post("/score", studentscore)

export default router