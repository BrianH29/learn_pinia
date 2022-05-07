import { defineStore } from "pinia";

type Transactions = {
  id: number;
  type : 'charge' | 'refund' | 'payment';
  amount : number;
  status: 'pending' | 'processed';
}

type BankDetails = {
  balance: number;
  transactions : Transactions[];
}

// state: () => {
//   return {
//     balance : 0,
//     transactions: [],
//   } as BankDetails;
// }
export const useBankAccountStore = defineStore('bankAccount', {
  state: () => ({
    balance : 0,
    transactions: [],
  }) as BankDetails,

  actions: {
    charge(amount : number) {
      const id = Date.now();
      this.transactions.push({
        id,
        type: 'charge',
        amount,
        status : 'pending',
      });
      return id;
    },
    pay(amount:number){
      const id = Date.now();
      this.transactions.push({
        id, 
        type: 'payment',
        amount: -amount,
        status: 'pending',
      });
      return id; 
    },
    reconcile(){
      this.balance = this.runningBalance;
      this.transactions = [];
    },
    processTransation(transactionId: number){
      setTimeout(() => {
        this.transactions = this.transactions.map((t) => {
          if(t.id === transactionId) {
            return {...t, status: 'processed'}
          }
          return t;
        }, 500)
      })
  }
  },

  getters: {
      processedTransactions: (state) => 
        state.transactions.filter((t) => t.status === 'processed'),
        
      pendingTransactions: (state) => 
        state.transactions.filter((t) => t.status === 'pending'),

      runningBalance(state) : number {
        return (
          this.balance + 
          this.processedTransactions.map((t) => t.amount).reduce((acc, curr) => acc + curr, 0)
        );
      },
  } 
})