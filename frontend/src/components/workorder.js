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
        {
            items.map(item =>{
                <div>
                    <p>{item.id}</p>
                    <p>{item.name}</p>
                </div>
            })
        }
        </div>
        
    );

}

export default WorkOrder;