import cors from "cors";
import express from "express";
import { apiController } from "./controller/api.Controller";
import { userController } from "./controller/user.Controller";
import { tokenValidator } from "./middlewares/auth.handler";

import { ExceptionsHandler } from "./middlewares/exceptions.handler";
import { UnknownRoutesHandler } from "./middlewares/unknownRoutes.handler";
const app = express();
const PORT = process.env.API_PORT
app.use(express.json());


app.use(cors());
app.get("/", (req, res) => res.json("🏠"));




app.use('/api', apiController)

app.use(tokenValidator)

app.use('/api/users', userController)





/**
 * Pour toutes les autres routes non définies, on retourne une erreur
 */
app.all("*", UnknownRoutesHandler);
app.use(ExceptionsHandler);

app.listen(PORT, () => console.log(`http://localhost:${PORT}`));
