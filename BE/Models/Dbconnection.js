const db = require('mongoose')


db.connect("mongodb://127.0.0.1:27017/Task").then(()=>{ 
    console.log("conection done")
})
.catch((err)=>{ 
    console.log(err)
})
