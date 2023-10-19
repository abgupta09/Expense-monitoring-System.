import React, { useState, useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/AddCircleOutline';
import '../styles/ExpenseForm.css';

function ExpenseForm({ addExpense, editingExpense, editExpense }) {
    const [name, setName] = useState(editingExpense ? editingExpense.name : '');
    const [cost, setCost] = useState(editingExpense ? editingExpense.cost : '');
    const [date, setDate] = useState(editingExpense ? editingExpense.date : '');

    const handleSubmit = (e) => {
        e.preventDefault();
    
        let currentDate = date;
    
        if (!currentDate) {
            currentDate = new Date().toISOString().split('T')[0];  // Format as YYYY-MM-DD
        }
    
        const currentExpense = { name, cost: parseFloat(cost), date: currentDate };
    
        if (editingExpense) {
            editExpense(editingExpense.id, currentExpense);
        } else {
            addExpense(currentExpense);
        }
    
        setName('');
        setCost(0);
        setDate('');
    };

    useEffect(() => {
        if (editingExpense) {
            setName(editingExpense.name);
            setCost(editingExpense.cost);
            setDate(editingExpense.date);
        }
    }, [editingExpense]);

    return (
        <form className='expense-form-fields' onSubmit={handleSubmit}>
            <div className="form-content">
                <input 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="Expense Name"
                    required
                />
                <input 
                    type="number" 
                    value={cost} 
                    onChange={e => setCost(e.target.value)} 
                    placeholder="Amount"
                    required
                />
                <input 
                    type="date" 
                    value={date} 
                    onChange={e => setDate(e.target.value)} 
                />
                <button type="submit">
                    {editingExpense ? <><EditIcon /></> : <><AddIcon /></>}
                </button>
            </div>
        </form>

    );
}

export default ExpenseForm;
