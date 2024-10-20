import express, { Express, Request, Response } from "express";
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port: string | number = process.env.PORT || 3500;


app.get('/', (req: Request, resp: Response) => {
    resp.json({ msg: 'Hello' })
});

app.listen(port, () => {
    console.log(`Server is listening on port: ${port}`);
});
