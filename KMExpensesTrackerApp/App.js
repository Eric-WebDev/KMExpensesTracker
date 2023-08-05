import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AddRecipt from "./screens/AddRecipt";
import Dashboard from "./screens/Dashboard";
import AllExpenses from "./screens/AllExpenses";
import Profile from "./screens/Profile";
import NewExpense from "./screens/NewExpense";
import RecentExpense from "./screens/RecentExpense";
import { GlobalStyles } from './constants/styles';
import { Ionicons } from '@expo/vector-icons';
import IconButton from "./components/UI/IconButton";
import ManageExpense from "./screens/ManageExpense";
import ExpensesContextProvider from "./store/expensesContext";
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const BottomTabs = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
function ExpensesOverview() {
  return (
    <BottomTabs.Navigator   
     screenOptions={({ navigation }) => ({
      headerStyle: { backgroundColor: GlobalStyles.colors.primaryKM1 },
      headerTintColor: 'white',
      tabBarStyle: { backgroundColor: GlobalStyles.colors.primaryKM2 },
      tabBarActiveTintColor: GlobalStyles.colors.primaryKM1,
      tabBarInactiveTintColor:"white"
   
    })}>

      <BottomTabs.Screen name="Home" component={Dashboard}   options={{
          title: 'All Expenses',
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list" size={size} color={color} />
          ),
        }} />
      <BottomTabs.Screen name="Recent Expense" component={RecentExpense}  options={{
          title: 'Recent Expense',
          tabBarLabel: 'Recent Expense',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }} />
      <BottomTabs.Screen name="New Expense" component={ManageExpense}   options={{
          title: 'New Expense',
          tabBarLabel: 'New Expense',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="create-outline" size={size} color={color} />
          ),
        }} />
      <BottomTabs.Screen name="Profile" component={Profile}   options={{
          title: 'Profile',
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}/>
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
         <StatusBar style="light" />
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: { backgroundColor: GlobalStyles.colors.primary500 },
              headerTintColor: 'white',
            }}
          >
            <Stack.Screen
              name="ExpensesOverview"
              component={ExpensesOverview}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="ManageExpense"
              component={ManageExpense}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
