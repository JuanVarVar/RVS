import React,{useState} from 'react'
import time from '../resources/interface/wall-clock.png'
import back from '../resources/interface/card_texture.png'
import VIEW from './viewer.jsx';
import {Modal,Button} from "react-bootstrap-v5";

let template1 = {
    backgroundImage: 'url(' + back + ')',
    backgroundSize: 'cover',                 
    backgroundRepeat: 'no-repeat',
    backgroundPosition:  'center center'
}


function textCard(value){
    if(value.length > 38) value = value.substring(0,35)+'...';
    return value;
}

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
    var text = seconds+' S.';
    if(minuts > 0 && hours == 0) text = minuts+' M.';
    if(hours > 0) text = hours+' H.';
    if(minuts > 0 && hours > 0) text = hours+':'+minuts+' H.';
    
    return text;
}

function cardImage(data) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <div className={"text-decoration-none m-0 my-3 p-0 recipe__card d-flex align-content-center justify-content-center "+data.classExt}>
            <div onClick={handleShow} className="base_card m-0 p-0">
                <img
                    className="img_card"
                    src={data.element.image}
                />
                <div className="align-items-center p-3 my-0 footer_card" style={template1}>
                    <p title={data.element.label} className="title_card max_area py-0 m-0 col-12 d-flex align-items-center">
                        {textCard(data.element.label)}
                    </p>
                    <div className="m-0 max_area d-flex align-items-center">
                        <img
                            className="img_card"
                            src={time}
                        />
                        <span className="title_card mx-2" title="H = Horas, M = minutos, S = segundos">{timeText(data.element.totalTime)}</span>
                    </div>
                </div>
            </div>
            <Modal  size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered 
            show={show} onHide={handleClose}>
                <Modal.Header>
                <Modal.Title> 
                    <h5> {data.element.label} </h5>
                    <img
                    className="img_card"
                    src={time}
                    />
                    <span className="title_card mx-2 h6" title="H = Horas, M = minutos, S = segundos">{timeText(data.element.totalTime)}</span>
                </Modal.Title>
                </Modal.Header>
                <Modal.Body><VIEW array={data.element}/></Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default cardImage