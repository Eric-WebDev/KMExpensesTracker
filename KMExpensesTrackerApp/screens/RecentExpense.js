// import { useContext } from 'react';

// import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
// import { ExpensesContext} from '../store/expensesContext';
// import { getDateMinusDays } from '../util/date';

// function RecentExpenses() {
//   const expensesCtx = useContext(ExpensesContext);

//   const recentExpenses = expensesCtx.expenses.filter((expense) => {
//     const today = new Date();
//     const date7DaysAgo = getDateMinusDays(today, 30);

//     return expense.date >= date7DaysAgo && expense.date <= today;
//   });

//   return (
    
//     <ExpensesOutput
//       expenses={recentExpenses}
//       expensesPeriod="Last 7 Days"
//       fallbackText="No expenses registered for the last 7 days."
//     />
//   );
// }

// export default RecentExpenses;
import React, { useContext } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expensesContext';
import { getDateMinusDays } from '../util/date';

function RecentExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  const recentExpenses = expensesCtx.trips.flatMap((trip) =>
    trip.expenses.filter((expense) => {
      const today = new Date();
      const date30DaysAgo = getDateMinusDays(today, 30);

      return expense.date >= date30DaysAgo && expense.date <= today;
    })
  );

  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 30 Days" // Changed to "Last 30 Days" for consistency with date filter
      fallbackText="No expenses registered for the last 30 days."
    />
  );
}

export default RecentExpenses;
