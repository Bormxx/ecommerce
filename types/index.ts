export interface Items {
  id: number;
  title: string;
  price: number;
  description: string;
  availability: boolean;
}

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

export interface Favorites {
  id: number;
  userId: number;
  itemId: number;
}

export interface Cards {
  id: number;
  userId: number;
  cardNumber: string;
}

export interface Basket {
  id: number;
  userId: number;
  itemId: number;
  quantity: number;
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

export interface Basket {
  id: number;
  userId: number;
  itemId: number;
  rating: number;
  post: string;
}

export interface Orders {
  id: number;
  userId: number;
  comment: string;
  address: string;
  courier: boolean;
  payCash: boolean;
}

export interface Orders {
  id: number;
  orderId: number;
  itemId: number;
  quantity: number;
}