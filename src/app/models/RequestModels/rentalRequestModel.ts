export interface RentalRequestModel {
  carId: number,
  fromDate: string,
  toDate: string,
  price: number,
  cardNumber: string,
  cardHolderName: string,
  expireMonth: string,
  expireYear: string,
  cvc: string,
}
