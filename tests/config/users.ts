import fs from 'fs';
import path from 'path';

interface User {
  username: string;
  password: string;
  role: string;
}

interface UsersData {
  users: User[];
  invalidCredentials: {
    username: string;
    password: string;
  };
}

/**
 * Cargar los usuarios desde el archivo users.json
 */
export function loadUsers(): UsersData {
  const usersPath = path.resolve(__dirname, '../fixtures/users.json');
  const usersData = fs.readFileSync(usersPath, 'utf-8');
  return JSON.parse(usersData);
}

/**
 * Obtener un usuario específico por nombre de usuario
 */
export function getUser(username: string): User | undefined {
  const users = loadUsers();
  return users.users.find(user => user.username === username);
}

/**
 * Obtener todos los usuarios
 */
export function getAllUsers(): User[] {
  const users = loadUsers();
  return users.users;
}

/**
 * Obtener credenciales inválidas
 */
export function getInvalidCredentials() {
  const users = loadUsers();
  return users.invalidCredentials;
}

/**
 * Obtener usuarios por rol
 */
export function getUsersByRole(role: string): User[] {
  const users = loadUsers();
  return users.users.filter(user => user.role === role);
}

export default {
  loadUsers,
  getUser,
  getAllUsers,
  getInvalidCredentials,
  getUsersByRole,
};
