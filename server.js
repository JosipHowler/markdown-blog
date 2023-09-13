const express = require("express")
const mongoose = require("mongoose")
const Article = require("./models/article")
const app = express()
const Router = require("./routes/articleRouter")
const methodOverride = require("method-override")

mongoose.connect('mongodb://127.0.0.1:27017/blog');

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))
app.use(methodOverride("_method"))

app.get("/", async (req, res) => {
    const articles = await Article.find().sort({ createdAt: 'desc' })
    res.render("articles/index", {articles: articles})
})

app.use("/articles", Router)

app.listen(5000)