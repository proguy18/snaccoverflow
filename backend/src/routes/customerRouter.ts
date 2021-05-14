/* Import the required libraries and types */
import { json, Router } from "express";
import { customerAuth } from "../middlewares/authMiddleware";

/* Set up the router */
const customerRouter: Router = Router();
const jsonParser = json();

/* Import the customer controller */
import * as controller from "../controllers/customerController";

/* Use middlewares on the router */
customerRouter.use(jsonParser);

/* Handle customer routes at /api/customer/... */
customerRouter.get("/cart", controller.getCart);
customerRouter.patch("/cart/add/:itemId", controller.addItemToCart);
customerRouter.post("/cart/checkout", customerAuth, controller.checkoutCart);
customerRouter.patch("/cart/empty", controller.emptyCart);
customerRouter.patch("/order/:orderId/rate", customerAuth, controller.rateOrder);
customerRouter.get("/orders/active", customerAuth, controller.getActiveOrders);
customerRouter.get("/orders/past", customerAuth, controller.getPastOrders);
customerRouter.patch("/login", controller.login);
customerRouter.patch("/logout", customerAuth, controller.logout);
customerRouter.get("/profile", customerAuth, controller.getProfile);
customerRouter.post("/register", controller.register);

/* Export the router */
export default customerRouter;
