const mongoose = require("mongoose");

async function connectDB() {
    try {
        // Remove the deprecated options
        await mongoose.connect('mongodb+srv://akash:Akashjha%402121@akash.vybfq.mongodb.net/EK_PAY');
        console.log("Database is connected");
    } catch (err) {
        console.error("Error connecting to the database:", err.message);
        process.exit(1);  // Exit the process if DB connection fails
    }
}

module.exports = connectDB;
