import jwt from "jsonwebtoken";
const secret = process.env.JWT_SECRET;

const generateWebToken = (payload) => {
  const { email, userId } = payload;

  const token = jwt.sign(
    {
      email,
      userId,
    },
    secret,
    {
      expiresIn: "1d",
    },
  );
  return token;
};

const decodeWebToken = (token) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};

export { generateWebToken, decodeWebToken };
