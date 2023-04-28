const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const productRouter = require('./router/productRouter')
const userRouter = require('./router/userRouter')

const app = express()

app.use(express.json())

app.use(bodyParser.json())

app.use(cors())
app.use('/products', productRouter)
app.use('/users', userRouter)



app.listen(3000, () => {
    console.log('Server is running on port 3000')
})
