import mongoose from "mongoose";

const username = process.env.USERNAMEDB;
const password = process.env.PASSWORDDB;
let url = process.env.DBURL;
url = url.replace("username", encodeURIComponent(username));
url = url.replace("password", encodeURIComponent(password));

let options = {
    useNewUrlParser: true
};

mongoose.connect(url, options);

let db = mongoose.connection;

export default db;