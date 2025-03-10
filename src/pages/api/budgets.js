import connectDb from '../../lib/mongodb';
import Budget from '../../models/Budget';


export default async function handler(req, res) {
  try {
    await connectDb();

    switch (req.method) {
      case 'POST':
        if (!req.body) {
          return res.status(400).json({ message: 'Request body is required' });
        }

        const newBudget = new Budget(req.body);
        await newBudget.save();
        return res.status(201).json(newBudget);

      case 'GET':
        const budgets = await Budget.find();
        if (budgets.length === 0) {
          return res.status(404).json({ message: 'No budgets found' });
        }
        return res.status(200).json(budgets);

      default:
        return res.status(405).json({ message: 'Method Not Allowed' });
    }
  } catch (error) {
    console.error('Error in handler:', error);
    return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
}
