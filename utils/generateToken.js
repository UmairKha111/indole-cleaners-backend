import jwt from "jsonwebtoken";

const generateToken = (admin) => {
  return jwt.sign(
    {
      id: admin._id,
      isAdmin: true,
    },
    process.env.JWT_SECRET,
    { expiresIn: "30d" }
  );
};

export default generateToken;
