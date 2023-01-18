const express = require("express")
const config = require("config")
const mongoose = require("mongoose")


const app = express();

app.use(express.json({extended: true}))

app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/order", require("./routes/order.routes"))

const PORT = config.get('PORT') || 5000;

async function start (){
    try {
        mongoose.set("strictQuery", false);
        await mongoose.connect(config.get("mongoUri"), {useUnifiedTopology: true, useNewUrlParser: true});
        app.listen(PORT, () => console.log(`app has been started on port: ${PORT}`))
    } catch (e) {
        console.log("Server Error", e.message)
        process.exit(1)
    }
}

start();