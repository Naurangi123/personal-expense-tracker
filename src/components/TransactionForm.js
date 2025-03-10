import { useState } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";  // Ensure SelectContent is imported from ShadCN

const categories = ['Food', 'Transport', 'Utilities', 'Entertainment', 'Healthcare'];

const TransactionForm = ({ transaction = {}, onSave }) => {
    const [amount, setAmount] = useState(transaction.amount || '');
    const [date, setDate] = useState(transaction.date ? formatDate(transaction.date) : '');
    const [description, setDescription] = useState(transaction.description || '');
    const [category, setCategory] = useState(transaction.category || '');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const router = useRouter();

    const formatDate = (date) => {
        const d = new Date(date);
        return d.toISOString().split('T')[0]; // "2025-03-10"
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!amount || !date || !description || !category) {
            alert('Please fill in all required fields');
            return;
        }

        const payload = { amount, date, description, category };
        setLoading(true);
        setError('');

        try {
            if (transaction._id) {
                await axios.put(`/api/transactions/${transaction._id}`, payload);
            } else {
                await axios.post('/api/transactions', payload);
            }
            onSave(); 
            setAmount('');
            setDate('');
            setDescription('');
            setCategory('');
            router.push('/transactions');
        } catch (err) {
            setError('An error occurred while saving the transaction');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 p-6 mt-4 bg-gray-500 rounded-lg shadow-md max-w-md mx-auto">
            {error && <div className="text-red-500 text-sm">{error}</div>}
            
            <div>
                <Label className="block text-sm font-medium text-gray-700">Amount</Label>
                <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>
            
            <div>
                <Label className="block text-sm font-medium text-gray-700">Date</Label>
                <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>
            
            <div>
                <Label className="block text-sm font-medium text-gray-700">Description</Label>
                <Input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                    className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                />
            </div>
            
            <div>
                <Label className="block text-sm font-medium text-gray-700">Category</Label>
                <Select value={category} onValueChange={setCategory} required className="mt-1 w-full">
                    <SelectTrigger className="p-2 border border-gray-300 rounded-md">
                        <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="border border-gray-300 rounded-md">
                        {categories.map((cat) => (
                            <SelectItem key={cat} value={cat} className="p-2 hover:bg-gray-100">
                                {cat}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            
            <Button 
                type="submit" 
                className="w-full py-2 bg-amber-600 text-white font-semibold rounded-md hover:bg-amber-700 transition disabled:bg-gray-400" 
                disabled={loading}
            >
                {loading ? 'Saving...' : 'Save'}
            </Button>
        </form>
    );
};

export default TransactionForm;
