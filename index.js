const express = require("express")
const bodyParser = require("body-parser")
const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))
let cat=0;
let household = []
let officework = []
app.get("/",function(req,res){
    
    let today = new Date();
    let day="";
    

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    day = today.toLocaleDateString("en-US",options)

    if(cat==0){
        res.render("list",{
            dayName: day,
            newDo: household,
            cat: cat
        })
    }
    else{
        res.render("list",{
            dayName: day,
            newDo: officework,
            cat: cat   
        })
    }
    
})

app.post("/",function (req,res) {
    let item = req.body.newItem

    if(cat==0){
        household.push(item);
    }
    else{
        officework.push(item)
    }

    res.redirect("/")
})

app.post("/ho",function(req,res){
    cat = 0;
    res.redirect("/")
})

app.post("/ow",function(req,res){
    cat = 1;
    res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Listening on port 3000!!!!")
})