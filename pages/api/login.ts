import comment from "../comments.json";
export default (req, res) => {
  res.statusCode = 200;
  res.json({ name: "John Doe" });
};
