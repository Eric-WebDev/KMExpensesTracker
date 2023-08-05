// import { createContext, useReducer } from 'react';

// const DUMMY_EXPENSES = [
//   {
//     id: 'e1',
//     categoryExpense: 'Fuel',
//     amount: 59.99,
//     date: new Date('2023-08-02')
//   },
//   {
//     id: 'e2',
//     categoryExpense: 'Food',
//     amount: 89.29,
//     date: new Date('2023-08-02')
//   }
// ];

// export const ExpensesContext = createContext({
//   expenses: [DUMMY_EXPENSES],
//   addExpense: ({ categoryExpense, amount, date }) => {},
//   deleteExpense: (id) => {},
//   updateExpense: (id, { categoryExpense, amount, date }) => {},
// });

// function expensesReducer(state, action) {
//   switch (action.type) {
//     case 'ADD':
//       const id = new Date().toString() + Math.random().toString();
//       return [{ ...action.payload, id: id }, ...state];
//     case 'UPDATE':
//       const updatableExpenseIndex = state.findIndex(
//         (expense) => expense.id === action.payload.id
//       );
//       const updatableExpense = state[updatableExpenseIndex];
//       const updatedItem = { ...updatableExpense, ...action.payload.data };
//       const updatedExpenses = [...state];
//       updatedExpenses[updatableExpenseIndex] = updatedItem;
//       return updatedExpenses;
//     case 'DELETE':
//       return state.filter((expense) => expense.id !== action.payload);
//     default:
//       return state;
//   }
// }

// function ExpensesContextProvider({ children }) {
//   const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

//   function addExpense(expenseData) {
//     dispatch({ type: 'ADD', payload: expenseData });
//   }

//   function deleteExpense(id) {
//     dispatch({ type: 'DELETE', payload: id });
//   }

//   function updateExpense(id, expenseData) {
//     dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData } });
//   }

//   const value = {
//     expenses: expensesState,
//     addExpense: addExpense,
//     deleteExpense: deleteExpense,
//     updateExpense: updateExpense,
//   };

//   return (
//     <ExpensesContext.Provider value={value}>
//       {children}
//     </ExpensesContext.Provider>
//   );
// }

// export default ExpensesContextProvider;

import { createContext, useReducer } from 'react';

const DUMMY_TRIPS = [
  {
    id: 't1',
    name: 'John Doe',
    title: 'Business Trip',
    jobNo: 'J12345',
    submissionDate: new Date('2023-08-02'),
    status: 'Pending',
    expenses: [
      {
        id: 'e1',
        categoryExpense: 'Fuel',
        amount: 59.99,
        date: new Date('2023-08-02')
      },
      {
        id: 'e2',
        categoryExpense: 'Food',
        amount: 89.29,
        date: new Date('2023-08-02')
      }
    ]
  }
];

export const ExpensesContext = createContext({
  trips: [DUMMY_TRIPS],
  addTrip: (tripData) => {},
  updateTrip: (tripId, tripData) => {},
  deleteTrip: (tripId) => {},
  addExpenseToTrip: (tripId, expenseData) => {},
  updateExpenseInTrip: (tripId, expenseId, expenseData) => {},
  deleteExpenseFromTrip: (tripId, expenseId) => {},
});

function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD_TRIP':
      const tripId = new Date().toString() + Math.random().toString();
      return [
        ...state,
        {
          ...action.payload,
          id: tripId,
          expenses: [],
        },
      ];
    case 'UPDATE_TRIP':
      return state.map((trip) =>
        trip.id === action.payload.tripId ? { ...trip, ...action.payload.tripData } : trip
      );
    case 'DELETE_TRIP':
      return state.filter((trip) => trip.id !== action.payload.tripId);
    case 'ADD_EXPENSE_TO_TRIP':
      return state.map((trip) =>
        trip.id === action.payload.tripId
          ? { ...trip, expenses: [...trip.expenses, action.payload.expenseData] }
          : trip
      );
    case 'UPDATE_EXPENSE_IN_TRIP':
      return state.map((trip) =>
        trip.id === action.payload.tripId
          ? {
              ...trip,
              expenses: trip.expenses.map((expense) =>
                expense.id === action.payload.expenseId
                  ? { ...expense, ...action.payload.expenseData }
                  : expense
              ),
            }
          : trip
      );
    case 'DELETE_EXPENSE_FROM_TRIP':
      return state.map((trip) =>
        trip.id === action.payload.tripId
          ? {
              ...trip,
              expenses: trip.expenses.filter((expense) => expense.id !== action.payload.expenseId),
            }
          : trip
      );
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_TRIPS);

  function addTrip(tripData) {
    dispatch({ type: 'ADD_TRIP', payload: tripData });
  }

  function updateTrip(tripId, tripData) {
    dispatch({ type: 'UPDATE_TRIP', payload: { tripId, tripData } });
  }

  function deleteTrip(tripId) {
    dispatch({ type: 'DELETE_TRIP', payload: { tripId } });
  }

  function addExpenseToTrip(tripId, expenseData) {
    dispatch({ type: 'ADD_EXPENSE_TO_TRIP', payload: { tripId, expenseData } });
  }

  function updateExpenseInTrip(tripId, expenseId, expenseData) {
    dispatch({ type: 'UPDATE_EXPENSE_IN_TRIP', payload: { tripId, expenseId, expenseData } });
  }

  function deleteExpenseFromTrip(tripId, expenseId) {
    dispatch({ type: 'DELETE_EXPENSE_FROM_TRIP', payload: { tripId, expenseId } });
  }

  const value = {
    trips: expensesState,
    addTrip: addTrip,
    updateTrip: updateTrip,
    deleteTrip: deleteTrip,
    addExpenseToTrip: addExpenseToTrip,
    updateExpenseInTrip: updateExpenseInTrip,
    deleteExpenseFromTrip: deleteExpenseFromTrip,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
