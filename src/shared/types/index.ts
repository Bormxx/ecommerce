// NEW

export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  availability: boolean;
  photos?: Photo[];
  characteristics?: Characteristic[];
};

export interface Photo {
  id: number;
  itemId: number;
  photoLink: string;
  isMainPhoto: boolean;
}

export type Characteristic = {
  id: number;
  itemId: number;
  frameMatherials: string;
  linzeMatherials: string;
  linzeTypes: string;
  linzeUVDefences: string;
  linzeEffects: string;
};

export type Post = {
  id: number;
  userId: number;
  itemId: number;
  rating: number;
  post: string;
};

export type ProductInfo = {
  item: Product;
  photos: Photo[];
  characteristics: Characteristic[];
  posts: Post[];
  averageRating: number;
  postsCount: number;
};

// Товары
// TODO: Можно привести ответ в более приятный вид
export type Order = {
  id: number;
  userId: number;
  address: string;
  payment: number | null;
  isCourier: boolean;
  phone: string;
  comment: string | null;
  items: {
    item: Product;
    quantity: number;
  }[];
  totalQuantity: number;
  totalPrice: number;
};

export type OrderItem = {
  id: number;
  orderId: number;
  itemId: number;
  quantity: number;
};

// Корзина

export type Basket = {
  items: BasketItem[];
  totalQuantity: number;
  totalPrice: number;
};

export type BasketItem = {
  id: number;
  userId: number;
  itemId: number;
  quantity: number;
  item: Product;
};

// USER BLOCK

export type UserCards = {
  id: number;
  userId: number;
  cardNumber: string;
  month: string;
  year: string;
  cvv: string;
};

// На первое время
export type UpdateUserSchema = {
  name?: string;
  surname?: string;
  email?: string;
  password?: string;
  avatar?: string;
};

// -------------------

// OLD

export interface Users {
  id: number;
  name: string;
  setName: (name: string) => void;
  surname: string;
  setSurname: (surname: string) => void;
  avatar: string;
  setAvatar: (avatar: string) => void;
  email: string;
  setEmail: (email: string) => void;
  password: string;
  setPassword: (password: string) => void;
}

export interface Favorite {
  id: number;
  userId: number;
  itemId: number;
}

export interface Cards {
  id: number;
  userId: number;
  cardNumber: string;
}

export interface Photos {
  id: number;
  itemId: number;
  photoLink: string;
}


export interface References {
  id: number;
  itemId: number;
  reference: string;
}