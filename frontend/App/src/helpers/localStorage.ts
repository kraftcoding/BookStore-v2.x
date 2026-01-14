import { CartItem, ICartBooks } from '../types/cart';
import { Book } from '../types/book';

const CART_LOCAL_STORAGE_KEY = 'cartItems';
const FAVORITE_LOCAL_STORAGE_KEY = 'favoriteItems';

export const saveCartToLocalStorage = (cartItems: CartItem[]) => {
  const cartBooks: ICartBooks[] = cartItems.map((item) => ({
    ...item,
    cartQuantity: item.itemQuantity,
  }));
  localStorage.setItem(CART_LOCAL_STORAGE_KEY, JSON.stringify(cartBooks));
};

export const loadCartFromLocalStorage = (): ICartBooks[] => {
  // implementation to retrieve cart items from local storage
  const cartItemsJSON = localStorage.getItem('cartItems');
  if (cartItemsJSON) {
    return JSON.parse(cartItemsJSON) as ICartBooks[];
  } else {
    return [];
  }
};

export const saveFavoriteToLocalStorage = (favoriteItems: Book[]) => {
  const favoriteBooks: Book[] = favoriteItems.map((item) => ({
    ...item,
  }));
  localStorage.setItem(
    FAVORITE_LOCAL_STORAGE_KEY,
    JSON.stringify(favoriteBooks)
  );
};

export const loadFavoriteFromLocalStorage = (): Book[] => {
  // implementation to retrieve cart items from local storage
  const favoriteItemsJSON = localStorage.getItem('favoriteItems');
  if (favoriteItemsJSON) {
    return JSON.parse(favoriteItemsJSON) as Book[];
  } else {
    return [];
  }
};
