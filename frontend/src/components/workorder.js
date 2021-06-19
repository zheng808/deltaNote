import React, {useEffect, useState} from 'react';
import { BrowserRouter, useHistory } from 'react-router-dom';

function WorkOrder(){ 
    const [items, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState ("");
    const [searchResults, setSearchResults] = useState([]);
    const [workorders, setWorkOrders] = useState([]);
    
    const history = useHistory();
    const handleRowClick = (item) => {
        history.push(`/task/${item.id}`);
    }  

    //get workorders
    useEffect(()=>{
        const fetchOrders = async () =>{
            try{
                let data = await fetch('/api/workorder');
                let items = await data.json();
                setWorkOrders(items)
                setOrders(items)
            }catch(err){
                console.log(err);
            }
            
        };
        fetchOrders();
    }, []);

    //search
    useEffect(()=>{
        const results = workorders.filter((workorder) => {
            if(workorder.id.toString() === searchTerm){
                return workorder;
            }
            return null;
        });
        setSearchResults(results);
    }, [workorders,searchTerm]);
    
    const handleChange = event =>{
        setSearchTerm(event.target.value);
    };


    return (
        <BrowserRouter>
        <div className="container">
        <div className="container-header">
        <input className="form-control" type="text" placeholder="Search WorkOrder" value={searchTerm} onChange={handleChange}/>
        </div>
        <table className="table table-hover table-bordered">
        <thead>
          <tr className="table-primary">
            <th scope="col">WorkOrder ID</th>
            <th scope="col">BoatName</th>
            <th scope="col">Customer Name</th>
          </tr>
        </thead>
        <tbody>
        {searchResults.length === 0?
        items.map(item => (
            <tr onClick={()=>handleRowClick(item)} key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.alpha_name}</td>
         </tr>
        )):
        searchResults.map(item => (
          <tr onClick={()=>handleRowClick(item)} key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.alpha_name}</td>
          </tr>
        ))}
        </tbody>
        </table>
    </div>
    </BrowserRouter>
    );

}

export default WorkOrder;