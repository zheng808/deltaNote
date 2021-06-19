const knex = require('../config/database');

var cache = [];

exports.workorder = async (req, res) =>{
     try{
        knex('workorder As a').
                          join('customer As c', 'a.customer_id', 'c.id')
                         .join('customer_boat As d', 'a.customer_boat_id', 'd.id')
                         .join('wf_crm As e', 'c.wf_crm_id', 'e.id')
                         .select('a.id', 'name', 'alpha_name')
                         .where('status', 'In Progress')
                         .orderBy('id', 'desc').then((response) =>{
                            if(cache.length == 0 ){
                                cache = response;
                            }
                            res.end(JSON.stringify(cache));
        });
     }catch(error){
         console.log(error);
     }
    
}