import {PieChart,Pie,Cell,Tooltip,ResponsiveContainer} from 'recharts'; 
import axios from 'axios';
import { useState,useEffect } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Healthcare'];


const CategoryWiseChart=()=>{
    const [transactions,setTransactions]=useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get('/api/transactions');
                setTransactions(response.data);
            } catch (error) {
                console.error('Error fetching transactions:', error);
                toast.error('Error fetching transactions');
            }
        };
    
        fetchTransactions();
    }, []);
    

    const categoryTotals=categories.map((category)=>{
        const total=transactions
        .filter((transaction)=>transaction.category===category)
        .reduce((sum,transaction)=>sum+transaction.amount,0);
        return {name: category, value: total};
    })

    const COLORS = ['#FF8042', '#FFBB28', '#00C49F', '#0088FE', '#FF0000'];

    return(
        <div className='w-full'>
        <ResponsiveContainer width="100%" height={400}>
            <PieChart>
                <Pie data={categoryTotals} dataKey="value" nameKey='name' cx="50%" cy="50%" outerRadius={150} fill="#8884d8" label>
                    {categoryTotals.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
            </PieChart>
        </ResponsiveContainer>
        <ToastContainer/>
        </div>
    )
}

export default CategoryWiseChart;