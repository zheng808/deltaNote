import React, {useEffect, useState} from 'react';
import { Link, Switch, Route, BrowserRouter } from 'react-router-dom';

var workorders = [{}];

function WorkOrder(){ 
    const [items, setOrders] = useState([]);
    const [searchTerm, setSearchTerm] = useState ("");
    const [searchResults, setSearchResults] = useState([]);
    
    //get workorders
    useEffect(()=>{
        fetchOrders();
    }, []);

    const fetchOrders = async () =>{
        try{

            let data = await fetch('/api/workorder');
            let items = await data.json();
            workorders = items;
            console.log(items);
            setOrders(items)
        }catch(err){
            console.log(err);
        }
        
    };

    useEffect(()=>{
        const results = workorders.filter((workorder) => {
            if(workorder.id == searchTerm){
                return workorder;
            }
        });
        setSearchResults(results);
    }, [searchTerm]);
    
    const handleChange = event =>{
        setSearchTerm(event.target.value);
    };


    return (
        <BrowserRouter forceRefresh={true}>
        <div className="container">
        <div className="workorder-header">
        <input className="form-control" type="text" placeholder="Search WorkOrder" value={searchTerm} onChange={handleChange}/>
        </div>
        <table className="table table-dark table-hover">
        <thead>
          <tr>
            <th scope="col">Name</th>
            <th scope="col">BoatName</th>
            <th scope="col">Customer Name</th>
          </tr>
        </thead>
        <tbody>
        {searchResults.length == 0?
        items.map(item => (
            <tr key={item.id}>
            <td><Link to={`/task/${item.id}`}>{item.id}</Link></td>
            <td>{item.name}</td>
            <td>{item.alpha_name}</td>
         </tr>
        )):
        searchResults.map(item => (
          <tr key={item.id}>
          <td><Link to={`/task/${item.id}`}>{item.id}</Link></td>
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