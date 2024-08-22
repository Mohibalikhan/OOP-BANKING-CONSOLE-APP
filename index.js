#! /usr/bin/env node
import inquirer from "inquirer";
//Create a class of bank Account
class BankAccount {
    accountNumber;
    balance;
    constructor(accountNumber, balance) {
        this.accountNumber = accountNumber;
        this.balance = balance;
    }
    //Withdraw or debit method
    withdraw(amount) {
        if (amount > this.balance) {
            console.log("Insufficient funds");
        }
        else {
            this.balance -= amount;
            console.log(`Withdrawn $${amount}. Remaining balance is $${this.balance}`);
        }
    }
    //Deposit or credit method
    deposit(amount) {
        if (amount > 100) {
            console.log("You have charged $1 for depositing more than $100 ");
            amount -= 1; //$1 fee charged if more than 100$ deposit
        }
        this.balance += amount;
        console.log(`Deposit of $${amount} successful.Current Balance:$${this.balance}`);
    }
    //Check Balance method
    checkBalance() {
        console.log(`Account Balance is $${this.balance}`);
    }
}
//Create a class of customer
class Customer {
    firstName;
    lastName;
    age;
    gender;
    contactNumber;
    account;
    constructor(firstName, lastName, age, gender, contactNumber, account) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.gender = gender;
        this.contactNumber = contactNumber;
        this.account = account;
    }
}
//Create bank account
const accounts = [
    new BankAccount(123, 1000),
    new BankAccount(456, 100),
    new BankAccount(789, 1000)
];
//Create clients
const clients = [
    new Customer("Mohib", "Khan", 21, "Male", 3173808380, accounts[0]),
    new Customer("Arham", "Khan", 18, "Female", 9876543210, accounts[1]),
    new Customer("Ayesha", "Khan", 22, "female", 5555555555, accounts[2])
];
//function to interact with bank account
async function service() {
    do {
        const accountNumberInput = await inquirer.prompt({
            name: "accountNumber",
            type: "number",
            message: "Enter your Account number:"
        });
        const client = clients.find((client) => client.account.accountNumber === accountNumberInput.accountNumber); //client find karne ka tareka
        if (client) {
            console.log(`Welcome, ${client.firstName} ${client.lastName}`);
            const action = await inquirer.prompt([
                {
                    name: "Select",
                    type: "list",
                    message: "Select an option",
                    choices: ["Check Balance", "Deposit", "Withdraw", "Exit"]
                }
            ]);
            if (action.Select === "Check Balance") {
                client.account.checkBalance();
            }
            else if (action.Select === "Deposit") {
                const amount = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to deposit"
                });
                client.account.deposit(amount.amount);
            }
            else if (action.Select === "Withdraw") {
                const amount = await inquirer.prompt({
                    name: "amount",
                    type: "number",
                    message: "Enter the amount to withdraw"
                });
                client.account.withdraw(amount.amount);
            }
            else if (action.Select === "Exit") {
                console.log("Exiting the Program...");
                console.log("Thank You For using our Services");
                return;
            }
        }
        else {
            console.log("Invalid account number.Please Enter Correct Number.");
        }
    } while (true);
}
service();
