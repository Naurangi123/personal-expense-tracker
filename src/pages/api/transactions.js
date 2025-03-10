import connectDb from "../../lib/mongodb";
import Transaction from "../../models/Transaction";

export default async function handler(req,res){
    await connectDb();

    try {
        switch(req.method){
            case 'GET':
                const transactions = await Transaction.find().sort({ _id: -1 });
                res.status(201).json(transactions);
                break;
            case 'POST':
                const newTransaction=new Transaction(req.body);
                await newTransaction.save();
                res.status(201).json(newTransaction);
                break;
    
            case 'PUT':
                const updatedTransaction=await Transaction.findByIdAndUpdate(req.body.id,req.body,{new:true});
                if(!updatedTransaction){
                    res.status(404).json({ message: 'Transaction not found' });
                }else{
                res.status(200).json(updatedTransaction);
                }
                break;
    
            case 'DELETE':
                const deleteTransaction=await Transaction.findByIdAndDelete(id);
                if(!deleteTransaction){
                    res.status(404).json({ message: 'Transaction not found' });
                } else{
                    res.status(200).json({message:"Transaction deleted successfully"});
                }
                break;
            default:
                res.status(405).json({message:"Method not Allowed"});
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
}

