const knex = require('../config/database');

exports.tasks = async (req, res) =>{
     try{
         var workID = req.body.workId;
         knex.select('id', 'label').from('workorder_item').where('workorder_id', workID).andWhere('label', '!=', '').then((response)=>{
            res.end(JSON.stringify(response));
         });
     }catch(error){
         console.log(error);
     }
    
}