/* Import the required libraries and types */
import {hashSync} from "bcrypt";
import {sign} from "jsonwebtoken";
import {model, Schema} from "mongoose";

/* Define helper schemas */
const tokenSchema: Schema = Schema({
    token: {
        type: String,
        required: true
    }
});

/* Define the customer schema */
const customerSchema: Schema = Schema({
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
    tokens: [tokenSchema]
});

/* Hash password on change */
customerSchema.pre("save", function(next) {
    if (this.isModified("password"))
        this.password: String = hashSync(this.password, 8); // probably should remove that magic number
    next();
});

/* Generate auth tokens for the user */
customerSchema.methods.generateAuthToken = async function() {
    const newToken = sign({_id: this._id}, "secret key"); // also need to put the secret key inside some secrets.ts
    
    this.tokens = this.tokens.concat({newToken});
    await this.save();

    return newToken;
};

/* Export the customer model */
const Customer = model("Customer", customerSchema);
module.exports = Customer;
