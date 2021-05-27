const db = require('../config/database');

exports.tasks = async (req, res) =>{
     try{
         var workID = req.body.workId;
         db.query('select id, label from workorder_item where workorder_id = ? and label!= ?;', [workID, ''],  (error, results) =>{
          res.end(JSON.stringify(results));
         });
     }catch(error){
         console.log(error);
     }
    
}