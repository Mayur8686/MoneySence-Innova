import pandas as pd

COLUMN_MAPPING = {
    "date": ["Date", "Txn Date", "Transaction Date", "Value Date"],
    "amount": ["Amount", "Transaction Amount"],
    "merchant": ["Merchant", "Description", "Narration", "Particulars"],
    "payment": ["Payment Type", "Mode"],
    "type": ["Type"]
}


def find_column(columns, aliases):
    for alias in aliases:
        for col in columns:
            if alias.lower() == col.lower():
                return col
    return None


def parse_csv(filepath):

    df = pd.read_csv(filepath)

    date_col = find_column(df.columns, COLUMN_MAPPING["date"])
    amount_col = find_column(df.columns, COLUMN_MAPPING["amount"])
    merchant_col = find_column(df.columns, COLUMN_MAPPING["merchant"])
    payment_col = find_column(df.columns, COLUMN_MAPPING["payment"])
    type_col = find_column(df.columns, COLUMN_MAPPING["type"])

    transactions = []

    for _, row in df.iterrows():

        amount = float(row[amount_col])

        tx_type = "Debit"

        if type_col:
            tx_type = str(row[type_col]).strip().title()

        transactions.append({
            "date": str(row[date_col]),
            "amount": amount,
            "merchant": str(row[merchant_col]),
            "paymentType": str(row[payment_col]) if payment_col else "Unknown",
            "type": tx_type
        })

    return transactions