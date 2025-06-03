import { ProductController } from "../controllers/product.controller";
import { Router } from "express";
import { uploadImage } from "../middlewares/uploadImage";
import { authenticate } from "../middlewares/authenticate";

const publicRouter = Router();
const privateRouter = Router();

publicRouter.get("/", ProductController.getAll);
publicRouter.get("/:id", ProductController.getById);

privateRouter.use(authenticate);
privateRouter.post("/create", uploadImage, ProductController.create);
privateRouter.put("/update/:id", uploadImage, ProductController.update);
privateRouter.delete("/delete/:id", ProductController.delete);

const productRouter = Router();
productRouter.use(publicRouter);
productRouter.use(privateRouter);

export default productRouter;