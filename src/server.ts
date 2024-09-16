import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
// import config from "./config";

async function main() {
    try {

        // await mongoose.connect(process.env.DB_URL);
        await mongoose.connect(config.db_url as string);

        app.listen(process.env.port, () => {
            // console.log(`Example app listening on port ${process.env.port}`)
            console.log(`Example app listening on port ${config.port}`)
        })
    } catch (err) {
        console.log(err);
    }

}

main();

