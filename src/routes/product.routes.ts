import { ProductController } from "../controllers/product.controller";
import { Router } from "express";
import { uploadImage } from "../middlewares/uploadImage";
import { authenticate } from "../middlewares/authenticate";

const productRouter = Router();

productRouter.get("/", ProductController.getAll);
productRouter.get("/category/:categoryId", ProductController.getByCategory);
productRouter.get("/:id", ProductController.getById);

productRouter.post("/create", authenticate, uploadImage, ProductController.create);
productRouter.put("/update/:id", authenticate, uploadImage, ProductController.update);
productRouter.delete("/delete/:id", authenticate, ProductController.delete);

export default productRouter;