import { CategoryController } from "../controllers/category.controller";
import { Router } from "express";

const publicRouter = Router();
// const privateRouter = Router();

publicRouter.get("/", CategoryController.getAll);
publicRouter.get("/:id", CategoryController.getById);
publicRouter.post("/create", CategoryController.create);
publicRouter.put("/update/:id", CategoryController.update);
publicRouter.delete("/delete/:id", CategoryController.delete);

const categoryRouter = Router();
categoryRouter.use(publicRouter);

export default categoryRouter;