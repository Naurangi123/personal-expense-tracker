import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Healthcare'];

const BudgetVsActualChart = () => {
    const [transactions, setTransactions] = useState([]);
    const [budgets, setBudgets] = useState([]);

    useEffect(() => {
        // Fetch transactions
        axios.get('/api/transactions')
            .then((response) => setTransactions(response.data))
            .catch((error) => {
                toast.error("Failed to fetch transactions.");
                console.error(error);
            });

        // Fetch budgets
        axios.get('/api/budgets')
            .then((response) => setBudgets(response.data))
            .catch((error) => {
                toast.error("Failed to fetch budgets.");
                console.error(error);
            });
    }, []);

    const data = categories.map((category) => {
        const actual = transactions
            .filter((transaction) => transaction.category === category)
            .reduce((sum, transaction) => sum + transaction.amount, 0);

        const budget = budgets.find((b) => b.category === category)?.amount || 0;

        return { name: category, budget, actual };
    });

    return (
        <div className='bg-gray-600 mx-auto w-4xl p-4 mt-4 rounded-md text-white'>
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="budget" fill="#82da9d" />
                    <Bar dataKey="actual" fill="#2284a3" />
                </BarChart>
            </ResponsiveContainer>
            <ToastContainer />
        </div>
    );
}

export default BudgetVsActualChart;
