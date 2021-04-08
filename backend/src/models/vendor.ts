/* Import the required libraries and types */
import { hashSync } from "bcrypt";
import { sign } from "jsonwebtoken";
import { Document, model, Model, Schema } from "mongoose";

/* Define helper interfaces */
interface IToken extends Document {
    token: String
}

/* Define helper schemas */
const tokenSchema: Schema = new Schema({
    token: {
        type: String,
        required: true
    }
});

/* Define the vendor interface */
interface IVendor extends Document {
    email: String;
    password: String;
    locationDescription: String;
    isOpen: Boolean;
    geoLocation: Array<Number>;
    tokens: Array<IToken>;
}

/* Define the vendor schema */
const vendorSchema: Schema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    locationDescription: {
        type: String
    },
    isOpen: {
        type: Boolean,
        required: true
    },
    geoLocation: {
        type: [Number],
        default: undefined
    },
    tokens: [tokenSchema]
});

/* Hash password on change */
vendorSchema.pre<IVendor>("save", function(next: Function) {
    if (this.isModified("password"))
        this.password = hashSync(this.password, 8); // probably should remove that magic number
    next();
});

/* Generate auth tokens for the user */
//vendorSchema.methods.generateAuthToken = async function(this: IVendor) {
    //const newToken = sign({ _id: this._id }, "secret key"); // also need to put the secret key inside some secrets.ts
    
    //this.tokens = this.tokens.concat({ newToken });
    //await this.save();

    //return newToken;
//};

/* Export the customer model */
export default model<IVendor>("Vendor", vendorSchema);
