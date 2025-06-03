import { CategoryController } from "../controllers/category.controller";
import { Router } from "express";
import { authenticate } from "../middlewares/authenticate";

const publicRouter = Router();
const privateRouter = Router();

publicRouter.get("/", CategoryController.getAll);
publicRouter.get("/:id", CategoryController.getById);

privateRouter.use(authenticate);
privateRouter.post("/create", CategoryController.create);
privateRouter.put("/update/:id", CategoryController.update);
privateRouter.delete("/delete/:id", CategoryController.delete);

const categoryRouter = Router();
categoryRouter.use(publicRouter);
categoryRouter.use(privateRouter);

export default categoryRouter;