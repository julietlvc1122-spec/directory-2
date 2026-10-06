import express from "express";
import router from "./routes/employee.js";

const app = express();
app.use(express.json());
app.use("/employees", router);
export default app;

app.get("/", (req, res) => {
  res.send("Hello employees!");
});
