import express from "express";

const itensRouter = express.Router();

itensRouter.post("/itens", (req, res) => {
    res.send("Cria novo item");
});