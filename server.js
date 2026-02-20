const express = require("express");
const app = express();
const mongoose = require('mongoose');

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/test');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

const blogSchema = new mongoose.Schema({
  title: String,
  descripion: String
});

const Blog = mongoose.model('Blog', blogSchema);

app.use(express.json())

app.listen(3000,async () => {
    console.log("server is started");
    await main()
    console.log("mongo connected");
    
});

app.get("/", async(req,res) => {
    res.send("welcome")    
})

// get all blogs
app.get("/blog", async(req,res) => {
    const {id} = req.params
    console.log(id);
    
    res.send("welcome") 

})

//new blog
app.post("/blog", async(req,res) => {
        const {title,descripion} = req.body
        const blog = new Blog({title, descripion})
        await blog.save()
        console.log(title,descripion);
        res.json({
            "msg": "Success blog added!"
        })
})