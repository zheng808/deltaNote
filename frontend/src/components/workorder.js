import React, {useEffect, useState} from 'react';



function WorkOrder(){ 
    useEffect(()=>{
        fetchOrders();
    }, []);
    
    const [items, setOrders] = useState([]);

    const fetchOrders = async () =>{
        const data = await fetch('/workorder');
        const items = await data.json();
        setOrders(items);
    };

    return (
        <div>
        <h1>Workorder</h1>
        </div>
        
    );

}

export default WorkOrder;