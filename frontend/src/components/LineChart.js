import React from 'react';
import { Line } from 'react-chartjs-2';

function ExpenseLineChart({ expenseData }) {
    // Function to aggregate expenses by date
    const aggregateExpensesByDate = (data) => {
        const totalsByDate = {};

        data.forEach((expense) => {
            const date = expense.date;
            if (totalsByDate[date]) {
                totalsByDate[date] += expense.amount;
            } else {
                totalsByDate[date] = expense.amount;
            }
        });

        return Object.keys(totalsByDate).map(date => ({
            date,
            total: totalsByDate[date]
        }));
    };

    // Aggregate the expense data
    const aggregatedData = aggregateExpensesByDate(expenseData);

    // Extract dates and total amounts for the chart
    const dates = aggregatedData.map(item => item.date);
    const totals = aggregatedData.map(item => item.total);

    const data = {
        labels: dates,
        datasets: [
            {
                label: 'Total Spending by Date',
                data: totals,
                fill: false,
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Date', // Add the unit name here
                },
            },
            y: {
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Dollar ($)', // Add the unit name here
                },
            },
        },
    };

    return (
        <div>
            <h2>Spending Trend Over Time</h2>
            <Line data={data} options={options}/>
        </div>
    );
}

export default ExpenseLineChart;
