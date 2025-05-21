import { ProductController } from "../controllers/product.controller";
import { Router } from "express";
import { uploadImage } from "../middlewares/uploadImage";

const publicRouter = Router();
// const privateRouter = Router();

publicRouter.get("/", ProductController.getAll);
publicRouter.get("/:id", ProductController.getById);
publicRouter.post("/create", uploadImage, ProductController.create);
publicRouter.put("/update/:id", uploadImage, ProductController.update);
publicRouter.delete("/delete/:id", ProductController.delete);

const productRouter = Router();
productRouter.use(publicRouter);

export default productRouter;