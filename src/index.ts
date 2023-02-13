import cors from "cors";
import express from "express";
import { ApiController } from "./controller/Api.Controller";
import { UserController } from "./controller/user.Controller";
import { TokenValidator } from "./middlewares/auth.handler";

import { ExceptionsHandler } from "./middlewares/exceptions.handler";
import { UnknownRoutesHandler } from "./middlewares/unknownRoutes.handler";
const app = express();
const PORT = process.env.API_PORT
app.use(express.json());


app.use(cors());
app.get("/", (req, res) => res.send("🏠"));




app.use('/api', ApiController)

app.use(TokenValidator)

app.use('/api/users', UserController)





/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
app.all("*", UnknownRoutesHandler);
app.use(ExceptionsHandler);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
