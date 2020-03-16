const express = require('express');
const app = express();
const port = 8080;
const path = require('path');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://mongoDbNarendra:Narendra334@cluster0-cooyo.mongodb.net/test?retryWrites=true&w=majority/test');

app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

var todoSchema = new mongoose.Schema({
    name: String,
    status: Boolean
});

var Todo = mongoose.model('Todo',todoSchema);


    app.get('/',(req,res)=>{
        Todo.find({},function(err,todolist){
            if(err) console.log(err);
            else{
                res.render("index.ejs",{todolist:todolist});
            }
        })  
    });

    

    app.post('/todo',function(req,res){
        var newitem = new Todo({
            name: req.body.item,
            status: "false"
        });
        Todo.create(newitem,function(err,Todo){
            if(err) console.log(err)
            else{
                console.log("1 inserted item");
            }
        })
        res.redirect('/')    
    });

    app.post('/del/:id',(req,res)=>{
        const id = req.params.id;
        Todo.findByIdAndRemove(id,(err)=>{
            if(err) console.log(err);
            console.log("1 doc deleted");
        })
        res.redirect('/');
    })

    app.post("/update/:id", (req, res) => {
        const id = req.params.id;
        //console.log(id);
        //console.log(req.body);
    
        Todo.findOneAndUpdate(
            {_id:id},
            { $set: { status:req.body.completed}}
        )
            .then(respon => {
                console.log(`Update is succesful`);
            })
            .catch(err => {
                res.json({
                    err: `${err}`
                });
            });
    });
    
app.listen(process.env.PORT || 8080,()=>{
    console.log(`server running at http://localhost:${port}`);
})