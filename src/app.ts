import express, { Request, Response } from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import router from "../routes/student.route";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the API")
})

app.use("/student", router)

const PORT = process.env.PORT || 51100; 
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});