def settle_expenses(expenses):
    # Initialization
    balances = {}
    for expense in expenses:
        payer = expense["payer"]
        amount = expense["amount"]
        shares = expense["shares"]
        
        if payer not in balances:
            balances[payer] = 0
        balances[payer] -= amount
        
        for person, percentage in shares.items():
            if person not in balances:
                balances[person] = 0
            share_amount = (percentage / 100) * amount
            balances[person] += share_amount

    # Calculation
    debtors = sorted([(person, amount) for person, amount in balances.items() if amount < 0], key=lambda x: x[1])
    creditors = sorted([(person, amount) for person, amount in balances.items() if amount > 0], key=lambda x: -x[1])

    # Settlement
    settlements = []
    while debtors and creditors:
        debtor, debt_amount = debtors[0]
        creditor, credit_amount = creditors[0]
        
        # Determine the settlement amount
        settle_amount = min(-debt_amount, credit_amount)
        
        # Change here: swap the positions of debtor and creditor
        settlements.append((creditor, debtor, settle_amount))
        
        # Update the debt and credit amounts
        if -debt_amount > credit_amount:
            debt_amount += settle_amount
            creditors.pop(0)
        elif -debt_amount < credit_amount:
            credit_amount -= settle_amount
            debtors.pop(0)
        else:
            debtors.pop(0)
            creditors.pop(0)

    return settlements

# Example:
expenses = [{'payer': '65605508cce4c379f2491909', 'amount': 30.0, 'shares': {'65616d9909d69e11fc878852': 50, '65605508cce4c379f2491909': 50}}, {'payer': '65616d9909d69e11fc878852', 'amount': 60.0, 'shares': {'65616d9909d69e11fc878852': 50, '65605508cce4c379f2491909': 50}}, {'payer': '65605508cce4c379f2491909', 'amount': 15.0, 'shares': {'65616d9909d69e11fc878852': 100}}, {'payer': '65605508cce4c379f2491909', 'amount': 100.0, 'shares': {'65605508cce4c379f2491909': 60, '65616d9909d69e11fc878852': 40}}]
print(settle_expenses(expenses))
