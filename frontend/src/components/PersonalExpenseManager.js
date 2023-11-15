import React, { useState, useEffect } from 'react';
import ExpenseForm from './ExpenseForm';
import ExpenseList from './ExpenseList';
import Header from './Header';
import EditIcon from '@mui/icons-material/Edit';

function PersonalExpenseManager() {
    const initialExpenses = JSON.parse(localStorage.getItem('expenses')) || [];
    const initialBudget = JSON.parse(localStorage.getItem('budget')) || 1000;

    const [expenses, setExpenses] = useState(initialExpenses);
    const [totalSpent, setTotalSpent] = useState(
        initialExpenses.reduce((sum, expense) => sum + expense.cost, 0)
    );
    const [editingExpense, setEditingExpense] = useState(null);
    const [budget, setBudget] = useState(initialBudget); 
    const [tempBudget, setTempBudget] = useState(budget);

    useEffect(() => {
        localStorage.setItem('expenses', JSON.stringify(expenses));
        setTotalSpent(expenses.reduce((sum, expense) => sum + expense.cost, 0));
    }, [expenses]);

    useEffect(() => {
        localStorage.setItem('budget', JSON.stringify(budget));
    }, [budget]);

    const updateBudget = () => {
        setBudget(parseFloat(tempBudget));
    };

    const addExpense = async (expense) => {
      const token = localStorage.getItem('token'); // Retrieve the JWT token from local storage
      if (!token) {
          // Handle the case where the token is not available
          console.error("User not authenticated");
          return;
      }
  
      try {
          const response = await fetch('/api/expenses/add', { // Replace with your Flask API's URL
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': token  // Include the JWT token in the request header
              },
              body: JSON.stringify(expense)
          });
  
          const data = await response.json();
          if (response.ok) {
              // Update the local state to reflect the new expense
              setExpenses([...expenses, { ...expense, id: Date.now() }]);
              setTotalSpent(totalSpent + expense.cost);
          } else {
              // Handle any errors returned from the server
              console.error(data.message);
          }
      } catch (error) {
          console.error("Error adding expense:", error);
      }
  };

  const deleteExpense = (id) => {
    const updatedExpenses = expenses.filter(expense => expense.id !== id);
    const expenseToDelete = expenses.find(expense => expense.id === id);
    setTotalSpent(totalSpent - expenseToDelete.cost);
    setExpenses(updatedExpenses);
  };

  const startEditExpense = (id) => {
    setEditingExpense(expenses.find(expense => expense.id === id));
  };

  const editExpense = (id, updatedExpense) => {
    const expenseIndex = expenses.findIndex(expense => expense.id === id);
    const updatedExpenses = [...expenses];
    setTotalSpent(totalSpent - expenses[expenseIndex].cost + updatedExpense.cost);
    updatedExpenses[expenseIndex] = updatedExpense;
    setExpenses(updatedExpenses);
    setEditingExpense(null);
  };

  return (
    <div className="app-container">
      <Header username="Kavya" productName="Personal Expense Manager" />
      <div className="section budget-section">
        <h3>Your Budget Overview</h3>

        <div className="budget-display">
          <h3 className="label">Spent: <span>${totalSpent.toFixed(2)}</span></h3>
          <h3 className="label">Remaining: <span>${(budget - totalSpent).toFixed(2)}</span></h3>
          <h3 className="label">Budget: <span>${budget.toFixed(2)}</span></h3>

              <div className="budget-update">
                  <input 
                      type="number"
                      value={tempBudget}
                      onChange={e => setTempBudget(e.target.value)}
                      placeholder="Set Budget"
                      style={{height: '26px'}}
                  />
                  <button className='edit-budget-btn' onClick={updateBudget}>
                  <EditIcon className='edit-budget-icon' fontSize='small'/>
                  </button>
              </div>
          </div>              
      </div>

      <div className="section expense-form-section">
        <h3>Add or Edit Expenses</h3>
        <ExpenseForm className='expense-form'
            addExpense={addExpense} 
            editingExpense={editingExpense} 
            editExpense={editExpense} 
        />
      </div>

      <div className="section expense-list-section">
        <h3>Your Expenses</h3>
        <ExpenseList 
            expenses={expenses} 
            startEditExpense={startEditExpense}
            deleteExpense={deleteExpense} 
        />
      </div>
    </div>
);
}


export default PersonalExpenseManager;