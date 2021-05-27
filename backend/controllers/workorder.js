const db = require('../config/database');

var cache = [];

exports.workorder = async (req, res) =>{
     try{
        var selectQuery = 'select a.id, name, alpha_name from workorder a join customer c on a.customer_id = c.id ' +
        'join customer_boat d on a.customer_boat_id = d.id ' + 
        'join wf_crm e on c.wf_crm_id = e.id ' +
        'where status = ? order by id desc;'
         db.query(selectQuery, ['In Progress'], (error, results) =>{
             //in memory cache
             if(cache.length == 0 ){
                cache = results; 
             }
             res.end(JSON.stringify(cache));
         });
     }catch(error){
         console.log(error);
     }
    
}