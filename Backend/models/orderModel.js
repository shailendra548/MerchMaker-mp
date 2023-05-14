const{Schema , model, Types}= require('../connection')

const mySchema=new Schema({
    merch:String,
    quantity:Number,
    price:Number,
    user:{type : Types.ObjectId, ref: 'user'},
    total: Number,
    createdat:Date,
})

module.exports=model("order",mySchema)