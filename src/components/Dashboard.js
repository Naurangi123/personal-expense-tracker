import { useState, useEffect } from "react";
import axios from "axios";
import CategoryWiseChart from "./CategoryWiseChart";
import { Card, CardTitle, CardBody, CardText } from "./ui/card";

const Dashboard = () => {
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await axios.get("/api/transactions");
                setTransactions(response.data);
            } catch (error) {
                console.error("Error fetching transactions:", error);
                setError("Failed to load transactions");
            } finally {
                setLoading(false);
            }
        };

        fetchTransactions();
    }, []); 

    const totalExpenses = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);

    const recentTransactions = transactions.slice(0, 5);

    if (loading) {
        return <div className="text-center py-8 text-xl">Loading...</div>;
    }

    if (error) {
        return <div className="text-center py-8 text-xl text-red-500">{error}</div>;
    }

    return (
        <div className="p-4 space-y-6">
            <div className="grid grid-cols-4 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                <Card className="bg-white shadow-lg rounded-lg p-6">
                <CardBody>
                        <CardTitle className="text-xl font-semibold">Total Expenses</CardTitle>
                    </CardBody>
                    <CardBody>
                        <CardText className="text-2xl text-green-600">₹{totalExpenses.toFixed(2)}</CardText>
                    </CardBody>
                </Card>

                <Card className="bg-white shadow-lg rounded-lg p-6">
                    <CardBody>
                        <CardTitle className="text-xl font-semibold">Most Recent Transactions</CardTitle>
                    </CardBody>
                    <CardBody>
                        <ul className="space-y-1 mt-4">
                            {recentTransactions.map((transaction) => (
                                <li key={transaction._id} className="flex justify-center">
                                    <p className="text-gray-800">₹{transaction.description} | {transaction.category} | <span className="text-lg text-gray-900">₹{transaction.amount}</span></p>
                                </li>
                            ))}
                        </ul>
                    </CardBody>
                </Card>
                <Card className="bg-white shadow-lg rounded-lg">
                    <CardBody>
                    <CardTitle className="text-xl font-semibold">Category Breakdown</CardTitle>
                    </CardBody>
                    <CardBody>
                        <CategoryWiseChart transactions={transactions} />
                    </CardBody>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
