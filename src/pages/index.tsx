import MonthlyExpenseChart from '../components/MonthlyExpansesChart';
import { ToastContainer } from 'react-toastify';
export default function App() {
  return (
    <>
    <div>
      <ToastContainer />
    </div>
    <div>
      <MonthlyExpenseChart/>
    </div>
    </>
  )
}
