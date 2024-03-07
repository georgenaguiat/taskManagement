const mongoose = require("mongoose");

const dbName = "taskManager";
mongoose.connect(`mongodb://localhost:27017/${dbName}`, {
})
    .then(() => console.log(`Connected to ${dbName} database!`))
    .catch((err) => console.log(err));
