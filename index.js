const express = require("express")
const bodyParser = require("body-parser")
const app = express()
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"))

let household = []

app.get("/",function(req,res){
    
    let today = new Date();
    let day="";
    

    let options = {
        weekday: "long",
        day: "numeric",
        month: "long"
    }
    day = today.toLocaleDateString("en-US",options)

    
        res.render("list",{
            dayName: day,
            newDo: household,
        })
    
})

app.post("/",function (req,res) {
    let item = req.body.newItem

    household.push(item);
    res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
    console.log("Listening on port 3000!!!!")
})