import "dotenv/config";
import express from "express";

const port = process.env.PORT || 3000;
const app = express();
app.use(express.json());
let teas = [];
let nextId = 1;

app.post("/teas", (req, res) => {
  const { name, price } = req.body;
  const newTea = { id: nextId++, name, price };
  res.status(200).send(newTea);
  teas.push(newTea);
});

app.get("/teas", (req, res) => {
  res.status(200).send(teas);
});

app.get("/teas/:id", (req, res) => {
  const tea = teas.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    res.status(404).send(`Sorry incalid ${tea}`);
  } else {
    res.status(200).send(tea);
  }
});

app.put("/teas/:id", (req, res) => {
  const tea = teas.find((t) => t.id === parseInt(req.params.id));
  if (!tea) {
    res.status(404).send(`Sorry incalid ${tea}`);
  } else {
    const { name, price } = req.body;
    tea.name = name;
    tea.price = price;
    res.status(200).send(tea);
  }
});

app.delete("/teas/:id", (req, res) => {
  const index = teas.findIndex((t) => t.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).send(`Sorry incalid ${tea}`);
  } else {
    teas.splice(index, 1);
    return res.status(200).send("Deleted");
  }
});

app.listen(port, () => {
  console.log(`Server is running on ${port}...`);
});
