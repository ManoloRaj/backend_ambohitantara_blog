const fs = require('fs');

let filePath = './src/database/user.json';

class User {
  static getAll() {
    try {
      const jsonData = fs.readFileSync(filePath, 'utf8');
      return JSON.parse(jsonData);
    } catch (error) {
      console.error('Erreur lors de la lecture du fichier JSON :', error);
      return [];
    }
  }

  static getById(userId) {
    const users = User.getAll();
    return users.find(u => u.id_user === userId) || null;
  }

  static add(user) {
    const users = User.getAll();
    const maxId = users.length > 0 ? Math.max(...users.map(u => u.id_user)) : 0;
    const userId = maxId + 1;
    user.id = userId;
    users.push(user);
    User.saveUsers(users);
    return userId;
  }

  static update(userId, updatedUser) {
    const users = User.getAll();
    const userIndex = users.findIndex(u => u.id_user === userId);
    if (userIndex !== -1) {
      users[userIndex] = { id: userId, ...updatedUser };
      User.saveUsers(users);
      return true;
    } else {
      return false;
    }
  }

  static remove(userId) {
    const users = User.getAll();
    const userIndex = users.findIndex(u => u.id_user === userId);
    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      User.saveUsers(users);
      return true;
    } else {
      return false;
    }
  }

  static saveUsers(users) {
    try {
      const jsonData = JSON.stringify(users, null, 2);
      fs.writeFileSync(filePath, jsonData, 'utf8');
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement des utilisateurs :', error);
    }
  }
}

module.exports = User;
