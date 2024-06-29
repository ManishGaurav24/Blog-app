const express = require("express");
const cors = require("cors");
const {connectDb} = require("./connection");
const BlogPost = require("./models/BlogPost");
const app = express();
const port = 5000;

//connect DB
connectDb();

//middlewires
app.use(express.json());
app.use(cors());

//route 1 : Post the blog
app.post("/post-blog", async(req,res) => {
    let blog = new BlogPost({
        title: req.body.title,
        description:req.body.description,
    });

    await blog.save();
    res.json({message:"Blog Post saved successfully",blog});
});

//Route 2 : Get all blogs
app.get("/get-blogs", async(req,res) => {
    let blogs = await BlogPost.find();
    if(!blogs){
        return res.status(404).json({message:"No blogs found"});
    }
    res.json({blogs});
    
});

//Route 3 : Delete a blog
app.delete("/delete-blog/:id", async(req,res) => {
    let blog = await BlogPost.findByIdAndDelete(req.params.id);
    if(!blog){
        res.status(404).json({message:"No blog found"});
    }
    res.status(200).json({message:"Blog deleted successfully"});
});

//Route 4 : Update a blog
app.put("/update-blog/:id", async(req,res) => {
    let blog = await BlogPost.findByIdAndUpdate(req.params.id);
    if(!blog){
        res.status(404).json({message:"No blog found"});
    }
    if(!req.body.title && !req.body.description){
        return res.json({message:"Please provide title or description"});  
    }else if(!req.body.title){
        blog.description = req.body.description;
    }else if(!req.body.description){
        blog.title = req.body.title;
    }else{
        blog.title = req.body.title;
        blog.description = req.body.description;
    }
    await blog.save();
    res.status(200).json({message:"Blog updated successfully",blog});
});

//listen server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});