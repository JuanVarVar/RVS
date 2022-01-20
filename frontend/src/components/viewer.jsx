import React, {useState,useEffect} from 'react'
import time from '../resources/interface/wall-clock.png'

function timeText(value){
    var tempValue=value;
    var seconds = 0;
    var minuts = 0;
    var hours = 0;
    while (tempValue > 0){
        seconds +=1;
        if(seconds == 60) {seconds = 0; minuts += 1;}
        if(minuts == 60) {minuts = 0; hours += 1;}
        tempValue --
    }
    var text = seconds+' Segundos';
    if(minuts > 0 && hours == 0) text = minuts+' Minutos';
    if(hours > 0) text = hours+' Horas';
    if(minuts > 0 && hours > 0) text = hours+' Horas con '+minuts+' Minutos';

    return text;
}

function ingredents(elements){
    const list = elements.map((item,index) =>
        <div className="shadow-sm col bg-white form-check my-2 h6" key={index}>
            <input className="form-check-input" type="checkbox" id={"ingrident"+index}/>
            <label className="form-check-label" htmlFor={"ingrident"+index}>
                {item}
            </label>
        </div>
    );
    return list;

}

export default function viewer(data){

    return(
        <div className="m-0 p-0 row">
            <div className="d-flex justify-content-center col-lg-6 col-md-12 p-0 m-0">
                <img
                    className="col-12 viewer_img m-0 mb-5 border border-secondary rounded shadow-sm"
                    src={data.array.image}
                />
            </div>
            <div className="col-lg-6 col-md-12 p-2 ingredent_list">
                <h5>Ingredientes:</h5>
                <div className="overflow-auto border-top p-0 m-0">
                    {ingredents(data.array.ingredientLines)}
                </div>
            </div>
        </div>
    )
}
