let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction() {

    const description = document.getElementById("description").value;
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;

    // Validation
    if (description === "" || amount <= 0) {
        alert("Please enter valid details!");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type
    };

    transactions.push(transaction);

    saveData();

    displayTransactions();

    // Clear inputs
    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

function displayTransactions() {

    const list = document.getElementById("transactionList");

    list.innerHTML = "";

    transactions.forEach(function(transaction) {

        const li = document.createElement("li");

        if (transaction.type === "income") {
            li.classList.add("income-item");
        } else {
            li.classList.add("expense-item");
        }

        const sign = transaction.type === "income" ? "+" : "-";

        li.innerHTML = `
            <div class="transaction-info">
                <strong>${transaction.description}</strong>
                <span>${sign} ₹${transaction.amount}</span>
            </div>

            <button 
                class="delete-btn"
                onclick="deleteTransaction(${transaction.id})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });

    updateSummary();
}

function updateSummary() {

    let totalIncome = 0;
    let totalExpense = 0;

    transactions.forEach(function(transaction) {

        if (transaction.type === "income") {
            totalIncome += transaction.amount;
        } else {
            totalExpense += transaction.amount;
        }

    });

    const balance = totalIncome - totalExpense;

    document.getElementById("income").innerText =
        "₹" + totalIncome;

    document.getElementById("expense").innerText =
        "₹" + totalExpense;

    document.getElementById("balance").innerText =
        "₹" + balance;
}

function deleteTransaction(id) {

    transactions = transactions.filter(function(transaction) {
        return transaction.id !== id;
    });

    saveData();

    displayTransactions();
}

function saveData() {

    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

// Display saved transactions when page loads
displayTransactions();