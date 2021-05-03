/* Import required libraries and types */
import { compareSync } from "bcrypt";
import { Request, Response } from "express";

/* Import required models */
import { Customer, ICustomer, IItemOrder, ItemOrder } from "../models";

/* Adds the given snack, in the given quantity, to the customer's cart */
async function addSnackToCart(req: Request & {
    params: { itemId: string },
    body: { customerId: string, quantity: number }
}, res: Response): Promise<void> {
    try {
        /* Cast the ObjectIds */
        var castedItemId: undefined = (req.params.itemId as unknown) as undefined;
        var castedCustomerId: undefined = (req.body.customerId as unknown) as undefined;
    
        /* Create an item order */
        var itemOrder: IItemOrder = new ItemOrder(
            {
                itemId: castedItemId,
                quantity: req.body.quantity
            }
        );
        
        /* Append the item order to the customer's cart */
        const qResult = await Customer.updateOne(
            {
                _id: castedCustomerId
            },
            {
                $push: {
                    cart: itemOrder
                }
            });

        /* Check if the query has successfully executed */
        if (qResult.ok == 1) {
            if (qResult.n > 0 && qResult.nModified > 0 && qResult.n == qResult.nModified) {
                res.status(200).send("OK");
            }
            else
                res.status(404).send("Not Found");
        }
        else
            res.status(500).send("Internal Server Error");
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Logs a customer in */
async function login(req: Request & {
    body: { email: String, password: String }
}, res: Response) {
    try {
        /* Check if a customer with the given email exists */
        const customer = await Customer.findOne(
            {
                email: req.body.email.toLowerCase()
            }
        );

        /* Verify the customer's credentials */
        if (!(customer && compareSync(req.body.password, customer.password)))
            res.status(400).send("Incorrect email/password!");
        else {
            /* Update the session data */
            req.session.userId = customer._id;
            req.session.cart = customer.cart;
            
            /* Send a response */
            res.status(200).send("OK");
        }
    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Logs a customer out */
async function logout(req: Request, res: Response) {
    req.session.userId = undefined;
    res.status(200).send("OK");
}

/* Registers a new customer */
async function register(req: Request & {
    body: { email: String, givenName: String, familyName: String, password: String }
}, res: Response) {
    try {
        /* Check if the email is already used by an existing customer */
        const existingCustomer = await Customer.findOne(
            {
                email: req.body.email.toLowerCase()
            }
        );

        if (!existingCustomer) {
            /* Insert a new customer into the database's collection */
            const newCustomer: ICustomer = new Customer(
                {
                    email: req.body.email.toLowerCase(),
                    givenName: req.body.givenName,
                    familyName: req.body.familyName,
                    password: req.body.password
                }
            );
            await newCustomer.save();

            /* Update the session data */
            req.session.userId = newCustomer._id;
            req.session.cart = newCustomer.cart;

            /* Send a response */
            res.status(201).send("Created");
        }
        else
            res.status(403).send("Forbidden");

    }
    catch (e) {
        res.status(500).send(`Internal Server Error: ${e.message}`);
    }
}

/* Export controller functions */
export {
    addSnackToCart,
    login,
    logout,
    register
}
