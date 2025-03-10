import { useEffect, useState } from 'react';
import axios from 'axios';
import { Button } from './ui/button';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentTransaction, setCurrentTransaction] = useState(null);

    // Fetch transactions when the component mounts
    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/api/transactions');
                setTransactions(response.data);
            } catch (e) {
                console.error(e);
                toast.error('Failed to load transactions.');
            }
        };

        fetchTransactions();
    }, []);

    // Delete transaction
    const deleteTransaction = async (id) => {
        try {
            await axios.delete(`/api/transactions/${id}`); 
            setTransactions(transactions.filter((transaction) => transaction._id !== id));
            toast.success('Transaction deleted successfully!');
        } catch (e) {
            console.error(e);
            toast.error('Failed to delete transaction.');
        }
    };

    // Update transaction
    const updateTransaction = async (id, updatedData) => {
        try {
            await axios.put(`/api/transactions/${id}`, updatedData); 
            setTransactions(transactions.map(transaction =>
                transaction._id === id ? { ...transaction, ...updatedData } : transaction
            ));
            toast.success('Transaction updated successfully!');
            setIsEditing(false);
        } catch (e) {
            console.error(e);
            toast.error('Failed to update transaction.');
        }
    };

    const handleEdit = (transaction) => {
        setIsEditing(true);
        setCurrentTransaction(transaction);
    };

    const handleSave = () => {
        const { _id, amount, description } = currentTransaction;
        const updatedData = { amount, description };
        updateTransaction(_id, updatedData);
    };

    return (
        <div className="max-w-3xl mx-auto p-6 mt-4 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Transaction List</h2>
            <ul className="space-y-4">
                {transactions.map((transaction) => (
                    <li
                        key={transaction._id}
                        className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm hover:bg-gray-100 transition duration-300"
                    >
                        <span className="text-lg text-gray-700">
                            ₹{transaction.amount} - {transaction.description} - {new Date(transaction.date).toLocaleDateString()}
                        </span>
                        <div className="flex space-x-2">
                            <Button
                                className="bg-blue-600 text-white py-1 px-3 rounded-md hover:bg-blue-700 transition cursor-pointer"
                                onClick={() => handleEdit(transaction)}
                            >
                                Edit
                            </Button>
                            <Button
                                className="bg-red-600 text-white py-1 px-3 rounded-md hover:bg-red-700 transition cursor-pointer"
                                onClick={() => deleteTransaction(transaction._id)} 
                            >
                                Delete
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>

            {isEditing && currentTransaction && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md">
                    <h3 className="text-xl text-blue-500 font-semibold">Edit Transaction</h3>
                    <div className="mt-4">
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Amount
                        </label>
                        <input
                            id="amount"
                            type="number"
                            value={currentTransaction.amount}
                            onChange={(e) => setCurrentTransaction({ ...currentTransaction, amount: e.target.value })}
                            className="mt-1 block w-full p-2 border text-black rounded-md"
                        />
                    </div>
                    <div className="mt-4">
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <input
                            id="description"
                            type="text"
                            value={currentTransaction.description}
                            onChange={(e) => setCurrentTransaction({ ...currentTransaction, description: e.target.value })}
                            className="mt-1 block w-full p-2 border rounded-md text-black"
                        />
                    </div>
                    <div className="mt-6 flex space-x-4">
                        <Button
                            className="bg-green-600 text-white py-1 px-3 rounded-md hover:bg-green-700 transition cursor-pointer"
                            onClick={handleSave}
                        >
                            Save
                        </Button>
                        <Button
                            className="bg-gray-600 text-white py-1 px-3 rounded-md hover:bg-gray-700 transition cursor-pointer"
                            onClick={() => setIsEditing(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )}

            <ToastContainer />
        </div>
    );
};

export default TransactionList;
