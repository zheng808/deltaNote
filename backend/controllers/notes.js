const knex = require('knex')({
    client: 'mysql',
    connection: {
        host     : process.env.HOST,
        user     : process.env.DATABASEUSER,
        database : process.env.DATABASE,
        password : process.env.DATABASE_PASSWORD
    },
    dateStrings: true,
    timezone: 'UTC'
});


exports.getNotes = async (req, res) =>{
     try{
        let taskId = req.body.task_id;
        console.log("getNotes " + taskId);
        knex('notes').where('task_id',taskId).orderBy('date_created', 'desc').then((response) =>{
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(response));
            res.end();
        });
     }catch(error){
         console.log(error);
     }
    
}

exports.saveNotes = async(req, res) =>{
    const text_data = req.body.text;
    const create_time_data = req.body.created_time;
    const owner_data = req.body.owner;
    const taks_id_data = req.body.task_id;
    console.log("333333");
    try{
        console.log("saveNotes");
        knex('notes').insert({text:text_data, owner: owner_data, date_created:create_time_data, task_id: taks_id_data})
                     .then((data)=>{
                        res.writeHead(200, { 'Content-Type': 'application/json' });
                        res.end(data.status);
                     })
    }catch(error){
        console.log(error);
    }
}