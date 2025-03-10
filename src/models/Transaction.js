import mongoose from 'mongoose';

const TransactionSchema=new mongoose.Schema({
    amount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true,
        enum:['Income', 'Expense','Food', 'Entertainment','Healthcare','Utilities','Transport']
    }
})

const Transaction = mongoose.models.Transaction || mongoose.model('Transaction', TransactionSchema);

export default Transaction;