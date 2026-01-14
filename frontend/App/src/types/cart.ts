import { Book } from './book';

export interface ICartBooks extends Book {
  id: number;
  itemQuantity: number;
  cartQuantity: number;
}

export interface CartState {
  cartItems: ICartBooks[];
}

export interface CartItem extends Book {
  itemQuantity: number;
}
