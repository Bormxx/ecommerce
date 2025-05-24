import { Card, cards, User, users } from "@/api/models/user";
import { hash } from "bcrypt";
import { eq } from "drizzle-orm";
import {
  createSession,
  generateSessionToken,
} from "../../shared/utils/backend/authSessions";
import { db } from "../db";
import { hideEmail } from "@/shared/utils/backend/helpers";

// Получение всех пользователей
export async function getAllUsers(): Promise<Omit<User, "password">[]> {
  return db
    .select({
      id: users.id,
      name: users.name,
      surname: users.surname,
      avatar: users.avatar,
      email: users.email,
    })
    .from(users);
}

// Создание пользователя
export async function createUser(userData: {
  name: string;
  surname: string;
  email: string;
  password: string;
  avatar?: string;
}): Promise<{ user: Omit<User, "password">; token: string }> {
  
    const existingUser = await db.query.users.findFirst({
      where: (user, { eq }) => eq(user.email, userData.email),
    });
    if (existingUser) {
      throw new Error(
        "Пользователь с таким адресом электронной почты уже существует",
      );
    }

    const hashedPassword = await hash(userData.password, 10);

    const [newUser] = await db
      .insert(users)
      .values({
        name: userData.name,
        surname: userData.surname,
        email: userData.email,
        password: hashedPassword,
        avatar: userData.avatar || "images/avatar.png",
      })
      .returning({
        id: users.id,
        name: users.name,
        surname: users.surname,
        email: users.email,
        avatar: users.avatar,
      });
    console.log(newUser);
    const token = generateSessionToken();
    await createSession(token, newUser.id);

    return { user: { ...newUser, email: hideEmail(newUser.email)}, token };
};

// Получение данных о пользователе по ID
export async function getUserById(
  userId: number,
): Promise<Omit<User, "password"> | null> {
  const user = await db.query.users.findFirst({
    columns: {
      id: true,
      name: true,
      surname: true,
      avatar: true,
      email: true,
      password: false,
    },
    where: (user, { eq }) => eq(user.id, userId),
  });
  return user || null;
}

// Обновление данных пользователя
export async function updateUser(
  userId: number,
  userData: {
    name?: string;
    surname?: string;
    avatar?: string;
    email?: string;
    password?: string;
  },
): Promise<void> {
  const hashedPassword = userData.password
    ? await hash(userData.password, 10)
    : undefined;
  await db
    .update(users)
    .set({
      name: userData.name,
      surname: userData.surname,
      avatar: userData.avatar,
      email: userData.email,
      password: hashedPassword,
    })
    .where(eq(users.id, userId));
}

// Получение карт пользователя
export async function getUserCards(userId: number): Promise<Card[]> {
  return db.select().from(cards).where(eq(cards.userId, userId));
}

// Добавление карты пользователя
export async function createUserCard(
  userId: number,
  cardData: {
    cardNumber: string;
    month: string;
    year: string;
    cvv: string;
  },
): Promise<number> {
  const [newCard] = await db
    .insert(cards)
    .values({
      userId,
      cardNumber: cardData.cardNumber,
      month: cardData.month,
      year: cardData.year,
      cvv: cardData.cvv,
    })
    .returning({ id: cards.id });
  return newCard.id;
}
