import { ProductController } from "../controllers/product.controller";
import { Router } from "express";
import { uploadImage } from "../middlewares/uploadImage";

const publicRouter = Router();
// const privateRouter = Router();

publicRouter.get("/", ProductController.getAll);
publicRouter.get("/:id", ProductController.getById);
publicRouter.post("/create", uploadImage.single('image'), ProductController.create);

const productRouter = Router();
productRouter.use(publicRouter);

export default productRouter;