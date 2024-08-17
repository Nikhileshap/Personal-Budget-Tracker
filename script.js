document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('transaction-form');
    const transactionList = document.getElementById('transaction-list');
    const totalIncomeEl = document.getElementById('total-income');
    const totalExpensesEl = document.getElementById('total-expenses');
    const netBalanceEl = document.getElementById('net-balance');

    let transactions = [];
    let totalIncome = 0;
    let totalExpenses = 0;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const type = document.getElementById('type').value;
        const amount = parseFloat(document.getElementById('amount').value);
        const description = document.getElementById('description').value;

        if (isNaN(amount) || amount <= 0) {
            alert('Please enter a valid amount.');
            return;
        }

        const transaction = { type, amount, description };
        transactions.push(transaction);
        updateSummary();
        renderTransactions();
        form.reset();
    });

    function updateSummary() {
        // Calculate total income and expenses
        totalIncome = transactions
            .filter(t => t.type === 'income')
            .reduce((acc, t) => acc + t.amount, 0);

        totalExpenses = transactions
            .filter(t => t.type === 'expense')
            .reduce((acc, t) => acc + t.amount, 0);

        // Format and update the HTML elements with the calculated totals
        totalIncomeEl.textContent = formatCurrency(totalIncome);
        totalExpensesEl.textContent = formatCurrency(totalExpenses);
        netBalanceEl.textContent = formatCurrency(totalIncome - totalExpenses);
    }

    function formatCurrency(value) {
        return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(value);
    }

    function renderTransactions() {
        transactionList.innerHTML = '';
        transactions.forEach((t, index) => {
            const li = document.createElement('li');
            li.textContent = `${t.description}: ${formatCurrency(t.amount)} (${t.type})`;
            transactionList.appendChild(li);
        });
    }
});
