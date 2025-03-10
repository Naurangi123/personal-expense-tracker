import Link from 'next/link';

const Navigation = () => (
  <nav className="bg-gray-800 p-4 space-x-8">
    <ul className="flex space-x-6">
    <li>
        <Link href="/" className="text-white hover:text-gray-400">
          Home
        </Link>
      </li>
      <li>
        <Link href="/dashboard" className="text-white hover:text-gray-400">
          Dashboard
        </Link>
      </li>
      <li>
        <Link href="/transactions" className="text-white hover:text-gray-400">
          Transactions
        </Link>
      </li>
      <li>
        <Link href="/budgets" className="text-white hover:text-gray-400">
          Budget
        </Link>
      </li>
      <li>
        <Link href="/budgetForm" className="text-white hover:text-gray-400">
          BudgetForm
        </Link>
      </li>
      <li>
        <Link href="/transactionForm" className="text-white hover:text-gray-400">
          TransactionForm
        </Link>
      </li>
    </ul>
  </nav>
);

export default Navigation;
