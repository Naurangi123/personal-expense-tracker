import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select"; 
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Healthcare'];

const BudgetForm = ({ onSave }) => {
    const [category, setCategory] = useState(categories[0]);
    const [amount, setAmount] = useState('');
    const [month, setMonth] = useState(new Date().toISOString().split('T')[0]);
    const [loading, setLoading] = useState(false);
    const router = useRouter()

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!amount || !category) {
            toast.error('Please fill in all fields');
            return;
        }

        await axios.post('/api/budgets', { category, amount, month });
        onSave();
        toast.success('Budget saved successfully');
        router.push('/budgets')
        setLoading(false);
    };

    return (
        <div>
        <ToastContainer />
        <form onSubmit={handleSubmit} className='space-y-4 p-6 mt-4 bg-gray-500 rounded-lg shadow-md max-w-md mx-auto'>
            <Label className="block text-sm font-medium text-gray-700">Category</Label>
            <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                    {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                            {cat}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Label className="block text-sm font-medium text-gray-700">Amount</Label>
            <Input className="mt-1 p-2 border border-gray-300 rounded-md w-full" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            <Input className="mt-1 p-2 border border-gray-300 rounded-md w-full" type="date" value={month} onChange={(e) => setMonth(e.target.value)} required />
            <Button type="submit" disabled={loading}>{loading ? 'Saving...' : 'Save'}</Button>
        </form>
        </div>
    );
};

export default BudgetForm;
