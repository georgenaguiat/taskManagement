const express = require('express');
const cors = require('cors');
const app = express();
const port = 8000;

require('./config/mongoose.config');

app.use(cors({
    origin: "http://localhost:3000"
}));
app.use(express.json()), express.urlencoded({urlencoded: true});

const AllMyTasks = require('./routes/taskManager.routes');
AllMyTasks(app);
    
app.listen(port, () => console.log(`Listening on port: ${port}`) );

