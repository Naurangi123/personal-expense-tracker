import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import axios from 'axios';
import { useEffect, useState } from 'react';

const MonthlyExpenseChart = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const res = await axios.get('api/transactions');
                setTransactions(res.data);
                setLoading(false); 
            } catch (err) {
                setError('Error loading transactions',err);
                setLoading(false);
            }
        };
        
        fetchTransactions();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-lg text-blue-500">Loading...</div> 
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="text-lg text-red-500">{error}</div> 
            </div>
        );
    }

    const expensesByMonth = transactions.reduce((acc, transaction) => {
        const month = new Date(transaction.date).toISOString().split('T')[0].slice(0, 7); 
        acc[month] = (acc[month] || 0) + transaction.amount;
        return acc;
    }, {});

    // Mapping the data for the BarChart
    const data = Object.keys(expensesByMonth).map((month) => ({
        name: month,
        expenses: expensesByMonth[month],
    }));

    return (
        <div className="p-4 bg-fuchsia-900 rounded-lg shadow-lg min-w-lg max-w-5xl mx-auto mt-4">
            <ResponsiveContainer width="100%" height={400}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="expenses" fill="#3584d3" />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default MonthlyExpenseChart;
