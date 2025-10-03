import React, { useState } from 'react';
function CounterComponent(){
    const [count, setcount] = useState(0);
    const handleinc=()=>{
        if(count<10){
            setcount(count+1);
        }
    };
    const handledec=()=>{
        if(count>0){
            setcount(count-1);
        }
    }
    return(
        <div>
            <h1>Counter:{count}</h1>
            <button onClick={handledec}>Decrement</button>
            <button onClick={handleinc}>Increment</button>
            {count===10 && <p>Maximum  Limit Reach</p>}
            {count===0 && <p>Minimum Limit Reach</p>}
        </div>
    );
}
export default CounterComponent;