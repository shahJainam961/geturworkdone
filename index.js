const express = require("express")
const bodyParser = require("body-parser")
const date = require(__dirname+"/date.js")

const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

const household = []
const workItems = []

app.get("/",function(req,res){  
    const day = date.getDate() 
    res.render("list",{
        listTitle: day,
        newDo: household,
    })
    
})

app.post("/",function (req,res) {
    
    const item = req.body.newItem
    if(req.body.list == 'WorkList'){
        workItems.push(item);
        res.redirect("/work")
    }
    else{
        household.push(item);
        res.redirect("/")
    }
    
})

app.get("/work",function(req,res){
    res.render("list",{
        listTitle: "WorkList",
        newDo: workItems
    })
})

app.post("/work",function (req,res) {
    const item = req.body.newItem

    workItems.push(item);
    res.redirect("/work")
})


app.get("/about",function(req,res){
    res.render("about")
})

app.listen(3000,function(){
    console.log("Listening on port 3000!!!!")
})