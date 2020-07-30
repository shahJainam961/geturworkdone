
const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname+"/date.js")
const mongoose = require("mongoose")
const _ = require("lodash")

const app = express()


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

mongoose.connect("mongodb+srv://murph961:Murph@961@todolist.xhzxu.mongodb.net/todolistDB",{ useNewUrlParser:true,useUnifiedTopology:true })
const Schema ={
    category: {
        type: String,
        require: [true,"Add Content Please"]
    },
    name: {
        type: String,
        require: [true,"Add Content Please"]
    }
}

const Item = mongoose.model("Item",Schema)

app.get("/",function(req,res){  
    // const day = date.getDate() 

    Item.find({category: "HomeList"},function(err,items){
        // console.log(items);

        if(err){console.log(err);}
        else{
            res.render("list",{
                listTitle: "HomeList",
                newDo: items
            })
        }
  
    })    
})

app.post("/",function (req,res) {
    const item = new Item(
        {
            category: req.body.list,
            name: req.body.newItem
        }
    )
    item.save()
    if(req.body.list == 'WorkList'){
        res.redirect("/work")
    }
    else if(req.body.list == 'HomeList'){
        res.redirect("/")
    }
    else{
        res.redirect("/"+req.body.list)
    }
    
})

app.post("/delete",function(req,res){
    const checkedid = req.body.checkbox

    Item.findById(checkedid,function(err,founditem){
        if(err){console.log(err);}
        else{
            const listName = founditem.category
            Item.deleteOne({_id:checkedid},function(err){
                if(err){console.log(err);}
                else{
                    if(listName == 'WorkList'){
                        res.redirect("/work")
                    }
                    else if(listName == 'HomeList'){
                        res.redirect("/")
                    }
                    else{
                        res.redirect("/"+listName)
                    }
                }
            })
        }
    })

})

app.get("/work",function(req,res){
    Item.find({category:"WorkList"},function(err,items){
        // console.log(items);

        res.render("list",{
            listTitle: "WorkList",
            newDo: items
        })
  
    })  
})
app.get("/:customName",function(req,res){
    Item.find({category:_.capitalize(req.params.customName)},function(err,items){
        // console.log(items);

        res.render("list",{
            listTitle: _.capitalize(req.params.customName),
            newDo: items
        })
  
    })  
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Listening on port 3000!!!!")
})