// import userModel from "../models/user";

// // Simple name validator
// export const nameValidator = (name) => {
//   if (!String(name).trim()) {
//     return Promise.resolve("Name is required");
//   }
//   if (name.trim().length < 2) {
//     return "Name should be at least 2 characters";
//   }
//   return null;
// };

// // Simple username Validator
// export const usernameValidator = async (username) => {
//   if (!String(username).trim()) {
//     return "Username is required";
//   }
//   // if (validator.matches(/\s/)) {
//   //   return "Username should not contain empty space";
//   // }
//   if (username.length < 2 || username.length > 30) {
//     return "Username should be between 2 and 30 characters";
//   }

//   // const user = await userModel.findByUsername(username);

//   // if (user) {
//   //   return "Username already exists";
//   // }

//   return null;
// };

// // Simple password validator
// export const passwordValidator = (password) => {
//   if (!String(password).trim()) {
//     return "Password is required";
//   }
//   if (password.length < 6) {
//     return "Password should be at least 6 characters";
//   }
//   return null;
// };

// // Simple registration rules
// export async function registrationRules(body) {
//   const errors = {};
//   const errorName = nameValidator(body.name);
//   const errorUsername = usernameValidator(body.username);
//   const errorPassword = passwordValidator(body.password);

//   console.log(errorUsername);
//   if (errorName) {
//     errors.name = errorName;
//   }
//   if (errorUsername) {
//     errors.username = errorUsername;
//   }
//   if (errorPassword) {
//     errors.password = errorPassword;
//   }
//   return errors;
// }
