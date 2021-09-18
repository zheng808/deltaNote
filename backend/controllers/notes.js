const knex = require('../config/database');


exports.getNotes = async (req, res) =>{
     try{
        let taskId = req.body.task_id;
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
    try{
        knex('notes').insert({text:text_data, owner: owner_data, date_created:create_time_data, task_id: taks_id_data})
                     .then(()=>{
                        knex('notes').where('task_id',taks_id_data).orderBy('date_created', 'desc').then((response) =>{
                            res.writeHead(200, { 'Content-Type': 'application/json' });
                            res.write(JSON.stringify(response));
                            res.end();
                        });    
                     })
             
    }catch(error){
        console.log(error);
    }
}

exports.uploadImage = async(req, res) =>{
    if(req.files == null){
        return res.status(400).json({msg: "not file uploaded"});
    }
    var response = [];
    for(let i = 0; i<req.files.file.length; i++){
        const file = req.files.file[i];
        const taskID = req.body.taskID;
        const owner_data = req.body.owner;
        const fileName = taskID + '_' + file.name;
        const create_time_data = req.body.created_time;
        file.mv(`../frontend/public/uploads/${fileName}`, err => {
        if (err) {
          console.error(err);
          return res.status(500).send(err);
        }
        knex('notes').insert({text:"", owner: owner_data, date_created:create_time_data, task_id: taskID, path: `/uploads/${fileName}`}).then(()=>{
                response.push({ fileName: file.name, filePath: `/uploads/${fileName}` });
                if(i == req.files.file.length - 1){
                    res.json(response);
                }
            })

        });
    }
    
}