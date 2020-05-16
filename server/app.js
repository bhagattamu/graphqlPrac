const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schemas/schema');
const mongoose = require('mongoose');
const cors = require('cors');
const PORT = "4000";
const app = express();

// to accept cross-origin
app.use(cors());

// Mongodb connection
mongoose.connect('mongodb://localhost:27017/gql-bhagat',{ useNewUrlParser: true,useUnifiedTopology: true });
mongoose.connection.once('open',() => {
    console.log('Connected to database')
})

// graph ql
app.use('/graphql',graphqlHTTP({
    schema,
    graphiql: true
}))

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
})