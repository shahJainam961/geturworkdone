exports.getDate = function(){
 
    return new Date().toLocaleDateString("en-US",{
        weekday: "long",
        day: "numeric",
        month: "long"
    })
}

exports.getDay = function(){
 
    return new Date().toLocaleDateString("en-US",{
        weekday: "long"
    })
}


// module.exports = getDate

// function getDate(){
//     let today = new Date();
//     let day="";

//     let options = {
//         weekday: "long",
//         day: "numeric",
//         month: "long"
//     }
//     day = today.toLocaleDateString("en-US",options)

//     return day;
// }