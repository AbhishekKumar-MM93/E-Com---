import bcrypt from "bcrypt";

const users = [
  {
    name: "Admin User",
    eamil: "admin@admin.com",
    password: bcrypt.hashSync("123456", 10), // pasword be generate in bcrypt form//
    isAdmin: true,
  },
  {
    name: " User1",
    eamil: " user@user1.com",
    password: bcrypt.hashSync("123456", 10), // pasword be generate in bcrypt form//
  },

  {
    name: " User2",
    eamil: "user@user2.com",
    password: bcrypt.hashSync("123456", 10), // pasword be generate in bcrypt form//
  },
  {
    name: " User3",
    eamil: " user@user3.com",
    password: bcrypt.hashSync("123456", 10), // pasword be generate in bcrypt form//
  },
];
export default users;
