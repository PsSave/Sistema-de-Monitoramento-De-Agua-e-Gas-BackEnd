import express from "express";
import router from "./routes/routes";
import bodyParses from "body-parser";

const app = express();

app.use(bodyParses.json({ limit: "50mb" }));  
app.use(bodyParses.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/", router);

export default app;
