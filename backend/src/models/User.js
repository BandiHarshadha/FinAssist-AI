import fs from "fs";
import path from "path";

const usersFilePath = path.join(process.cwd(), "data", "users.json");

const readUsers = () => {
  if (!fs.existsSync(usersFilePath)) {
    fs.mkdirSync(path.dirname(usersFilePath), { recursive: true });
    fs.writeFileSync(usersFilePath, "[]");
  }

  const data = fs.readFileSync(usersFilePath, "utf-8");
  return JSON.parse(data || "[]");
};

const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

const removePassword = (user) => {
  const { password, ...safeUser } = user;
  return safeUser;
};

const User = {
  create(userData) {
    const users = readUsers();

    const newUser = {
      id: Date.now().toString(),
      name: userData.name,
      username: userData.username,
      email: userData.email.toLowerCase(),
      password: userData.password || null,
      googleId: userData.googleId || null,
      photo: userData.photo || "",
      provider: userData.provider || "local",
      annualIncome: 0,
      monthlyIncome: 0,
      monthlyExpenses: 0,
      emi: 0,
      savings: 0,
      goals: [],
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeUsers(users);

    return removePassword(newUser);
  },

  findByEmailOrUsername(email, username) {
    const users = readUsers();

    return users.find(
      (user) =>
        user.email === email.toLowerCase() ||
        user.username === username.toLowerCase()
    );
  },

  findByIdentifier(identifier) {
    const users = readUsers();

    return users.find(
      (user) =>
        user.email === identifier.toLowerCase() ||
        user.username === identifier.toLowerCase()
    );
  },

  findByGoogleId(googleId) {
    const users = readUsers();
    return users.find((user) => user.googleId === googleId);
  },

  findByEmail(email) {
    const users = readUsers();
    return users.find((user) => user.email === email.toLowerCase());
  },

  update(userId, updates) {
    const users = readUsers();
    const index = users.findIndex((user) => user.id === userId);

    if (index === -1) return null;

    users[index] = {
      ...users[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    writeUsers(users);

    return removePassword(users[index]);
  },
};

export default User;