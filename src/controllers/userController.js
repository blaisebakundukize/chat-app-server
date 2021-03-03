import userModel from "../models/user";
import {
  getRequestBody,
  hashPassword,
  generateAccessToken,
  validatePassword,
  decodeToken,
} from "../helpers";

export class UserController {
  async register(req, res) {
    try {
      const body = await getRequestBody(req);
      const user = JSON.parse(body);
      console.log(user);
      // Validate body before continue
      const hashedPassword = await hashPassword(user.password);
      user.password = hashedPassword;
      const savedUser = await userModel.create(user);
      const token = generateAccessToken(savedUser.id);
      res.statusCode = 201;
      return res.end(JSON.stringify({ ...savedUser, token }));
    } catch (error) {
      res.statusCode = 500;
      return res.end(
        JSON.stringify({
          message: "Could not register user due to internal error",
        })
      );
    }
  }

  async login(req, res) {
    try {
      const body = await getRequestBody(req);
      const { username, password } = JSON.parse(body);
      const user = await userModel.findByUsername(username);
      let isPasswordValid = false;
      if (user) {
        isPasswordValid = await validatePassword(password, user.password);
      }

      if (!isPasswordValid || !user) {
        res.statusCode = 400;
        return res.end(
          JSON.stringify({
            message: "Invalid email or password.",
          })
        );
      }

      user.password = undefined;
      const token = generateAccessToken(user.id);
      return res.end(JSON.stringify({ ...user, token }));
    } catch (error) {
      res.statusCode = 500;
      return res.end(
        JSON.stringify({
          message: "Could not login user due to internal error",
        })
      );
    }
  }

  async getAuthedUser(req, res) {
    try {
      await decodeToken(req, res);
      return res.end(JSON.stringify({ ...req.currentUser }));
    } catch (error) {
      res.statusCode = 500;
      return res.end(
        JSON.stringify({
          message: "Could not get user due to internal error",
        })
      );
    }
  }
}

const userController = new UserController();

export default userController;
