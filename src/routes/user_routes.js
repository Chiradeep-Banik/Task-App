const { Router } = require('express');
const { user } = require('./../models/user');

const router = new Router();
//GET-----------------------------------------------------------------------------------------------------
router.get('/users', async (req, res) => {
    try{
        var find_promise = await user.find({});
        if(find_promise.length != 0)
            res.status(200).send(find_promise);
        else
            res.status(404).send("Not found");
    } catch(err) {
        res.status(400).send(err);
    };
});
router.get('/users/:id', async (req,res)=>{
    try{
        var id = req.params.id;
        var find_promise = await user.find({_id: id});
        if(find_promise.length != 0)
            res.status(200).send(find_promise);
        else
            res.status(404).send("Not found");
    } catch(err){
        res.status(400).send(err);
    }
});
//GET-----------------------------------------------------------------------------------------------

//POST ----------------------------------------------------------------------------------------------
router.post('/users', async (req, res) => {
    try{
        var create_promise = await user.create(req.body);
        res.status(201).send(create_promise);
    } catch(err){
        res.status(400).send(err);
    };
});
//POST ----------------------------------------------------------------------------------------------

//DELETE-----------------------------------------------------------------------------------------------
router.delete('/users', async (req,res)=>{    
    try{
        var delete_promise = await user.deleteMany({});
        if(delete_promise.deletedCount != 0)
            res.status(200).send("Deleted all users",delete_promise);
        else
            res.status(404).send("No users found");
    } catch(err){
        res.status(400).send(err);
    }
});
router.delete('/users/:id', async (req,res)=>{
    try{
        var id = req.params.id;
        var delete_promise = await user.deleteOne({_id: id});
        if(delete_promise.deletedCount != 0)
            res.status(200).send("Deleted all users",delete_promise);
        else
            res.status(404).send("No users found");
    }catch(err){
        res.status(400).send(err);
    }
});
//DELETE-------------------------------------------------------------------------------------------------


//UPDATE-------------------------------------------------------------------------------------------------
router.put("/users/:id", async (req,res)=>{
    var data = Object.keys(req.body);
    console.log(data);
    const can_update = new Set(["email","name","password"]);
    var to_update = true;
    for(var i = 0; i < data.length; i++){
        if(!can_update.has(data[i])){
            to_update = false;
            break;
        }
    }
    if(!to_update){
        res.status(400).send("Invalid update");
    }else try {
        var id = req.params.id;
        var update_promise = await user.findOneAndUpdate({_id : id },req.body,{runValidators:true});
        res.status(204).send(update_promise);
    } catch (e) {
        res.status(400).send(e);
    }
});
//UPDATE-------------------------------------------------------------------------------------------------

module.exports = router;