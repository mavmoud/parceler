import fs from "fs";
import path from "path";
import { readJsonFile, writeJsonFile } from "./fileUtil";
import { User } from "../models";

export const getUsers = async () => {
  try {
    const users = await readJsonFile("users");
    return users;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const getUserById = async (id: number) => {
  const users = await getUsers();

  const user = users.find((user: User) => user.id === id);

  return user;
};

export const getUserByEmail = async (email: string) => {
  const users = await getUsers();

  const user = users.find((user: User) => user.email === email);

  return user;
};

export const getUserByRefreshToken = async (refreshToken: string) => {
  const users = await getUsers();

  const user = users.find((user: User) => user.refreshToken === refreshToken);

  return user;
};

export const insertNewUser = async (user: User) => {
  try {
    const users: User[] = await getUsers();

    const newId = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    const newUser = new User({ ...user, id: newId });

    users.push(newUser);

    await writeJsonFile("users", users);

    return newUser;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

export const updateUser = async (updatedUser: User) => {
  try {
    const users: User[] = await getUsers();

    const userIndex = users.findIndex((user) => user.id === updatedUser.id);

    if (userIndex === -1) {
      throw new Error("User not found");
    }

    users[userIndex] = updatedUser;

    await writeJsonFile("users", users);

    return updatedUser;
  } catch (err) {
    console.error("Failed to update user:", err);
    throw err;
  }
};
