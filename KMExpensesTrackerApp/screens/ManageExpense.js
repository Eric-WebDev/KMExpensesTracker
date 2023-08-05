// import { useContext, useLayoutEffect } from 'react';
// import { StyleSheet, TextInput, View } from 'react-native';
// import Button from '../components/UI/Button';
// import IconButton from '../components/UI/IconButton';
// import { GlobalStyles } from '../constants/styles';
// import ExpenseForm from '../manageExpense/ExpenseForm';
// import { ExpensesContext } from '../store/expensesContext';

// function ManageExpense({ route, navigation }) {
//   const expensesCtx = useContext(ExpensesContext);

//   const editedExpenseId = route.params?.expenseId;
//   const isEditing = !!editedExpenseId;

//   const selectedExpense = expensesCtx.expenses.find(
//     (expense) => expense.id === editedExpenseId
//   );

//   useLayoutEffect(() => {
//     navigation.setOptions({
//       title: isEditing ? 'Edit Expense' : 'Add Expense',
//     });
//   }, [navigation, isEditing]);

//   function deleteExpenseHandler() {
//     expensesCtx.deleteExpense(editedExpenseId);
//     navigation.goBack();
//   }

//   function cancelHandler() {
//     navigation.goBack();
//   }

//   function confirmHandler(expenseData) {
//     if (isEditing) {
//       expensesCtx.updateExpense(editedExpenseId, expenseData);
//     } else {
//       expensesCtx.addExpense(expenseData);
//     }
//     navigation.goBack();
//   }

//   return (
//     <View style={styles.container}>
//       <ExpenseForm
//         submitButtonLabel={isEditing ? 'Update' : 'Add'}
//         onSubmit={confirmHandler}
//         onCancel={cancelHandler}
//         defaultValues={selectedExpense}
//       />
//       {isEditing && (
//         <View style={styles.deleteContainer}>
//           <IconButton
//             icon="trash"
//             color={GlobalStyles.colors.error500}
//             size={36}
//             onPress={deleteExpenseHandler}
//           />
//         </View>
//       )}
//     </View>
//   );
// }

// export default ManageExpense;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     // backgroundColor: GlobalStyles.colors.primary80,
//   },
//   deleteContainer: {
//     marginTop: 16,
//     paddingTop: 8,
//     borderTopWidth: 2,
//     borderTopColor: GlobalStyles.colors.primary200,
//     alignItems: 'center',
//   },
// });

import React, { useContext, useLayoutEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import IconButton from '../components/UI/IconButton';
import { GlobalStyles } from '../constants/styles';
import ExpenseForm from '../manageExpense/ExpenseForm';
import { ExpensesContext } from '../store/expensesContext';

function ManageExpense({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  const { tripId, expenseId } = route.params || {};
  const isEditing = !!expenseId;

  const selectedTrip = expensesCtx.trips.find((trip) => trip.id === tripId);
  const selectedExpense = selectedTrip?.expenses.find((expense) => expense.id === expenseId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Edit Expense' : 'Add Expense',
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpenseFromTrip(tripId, expenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler(expenseData) {
    if (isEditing) {
      expensesCtx.updateExpenseInTrip(tripId, expenseId, expenseData);
    } else {
      expensesCtx.addExpenseToTrip(tripId, expenseData);
    }
    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        submitButtonLabel={isEditing ? 'Update' : 'Add'}
        onSubmit={confirmHandler}
        onCancel={cancelHandler}
        defaultValues={selectedExpense}
      />
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.error500}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    // backgroundColor: GlobalStyles.colors.primary80,
  },
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: 'center',
  },
});
