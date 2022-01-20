import React,{useState} from 'react'
import {useForm} from '../hook/useForm.js'
import cookie from '../hook/cookie.js'
import mode from '../hook/mode_use.js'
import {Redirect} from "react-router-dom";

const initialForm = {
    mode: 0,
}

export default function ini(){

    const[bd,bdSet] = useState(true);

    const validationsForm = (form) => {
        let error={};

        if(parseInt(form.mode) >= 0 && parseInt(form.mode) <= 2 && !Number.isInteger(parseInt(form.mode))){
            error.mode = 'No se escogio el modo adecuadamente';
        }
        if (Object.keys(error).length === 0) {
            cookie.destroy('mode__exampleRCPV');
            cookie.set('mode__exampleRCPV',form.mode,1);
        }
        
        return error
    }
    
    const submitProcess = (form) => {
        if(submit == true) return
        let errors={};
        setLoading(true);
        switch (form.mode) {
            case 2:
                setResponse(true);
            break;
            default:
                setResponse(true);
            break;
        }
        if(Object.keys(errors).length === 0){
            setSubmit(true);
        }else{
            setErrors(errors);
            setLoading(false)
        }
    }

    const {
        form,
        errors,
        loading,
        response,
        submit,
        handleSubmit,
        handleChange,
        setErrors,
        setResponse,
        setLoading,
        setSubmit
    } = useForm(initialForm,validationsForm,submitProcess)

    if(submit == true){
        window.location.href = "/list";
    }

    return(
        <div className="m-0 p-0 pt-5 d-flex min-vh-100 align-items-center justify-content-center">
            {submit && <Redirect push from="/" to="/list" />}
            <div className="card bg-light m-0 my-5 p-3 config">
                <div className=" p-3 border border-secondary rounded text-center">
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="customRange" className="form-label h3">Modo de Uso</label>
                        <input type="range" 
                        name="mode"
                        className="form-range" 
                        min="0" max="2"  
                        onChange={handleChange} 
                        id="customRange" 
                        value={form.mode}
                        required/>
                        <hr />
                        {form.mode == 0 &&
                        <div className="m-0 my-3 p-0 row"> 
                            <h4 className="m-0 p-0 row text-center text-primary" >API</h4>
                            <p className="m-0 p-0 text-justify">
                            La aplicación se conectara a una API pre definida para mostrar las Recetas.
                            </p>
                        </div>
                        }
                        {form.mode == 1 &&
                        <div className="m-0 my-3 p-0 row"> 
                            <h4 className="m-0 p-0 row text-center text-primary" >Base de Datos</h4>
                            <p className="m-0 p-0 text-justify">
                            La aplicación se conectara a una Base de Datos pre definida en el archivo config.js para mostrar las Recetas.
                            </p>
                            <p className="m-0 p-0 text-justify">
                            <br />
                            Si no existen las tablas necesarias se crearan en el primer uso, aumentando el tiempo de carga.
                            </p>
                        </div>
                        }
                        {form.mode == 2 &&
                        <div className="m-0 my-3 p-0 row"> 
                            <h4 className="m-0 p-0 row text-center text-primary" >Precargados</h4>
                            <p className="m-0 p-0 text-justify">
                            La aplicación utilizara un conjuto de recetas pre definidas para mostrar las Recetas.
                            </p>
                        </div>
                        }
                        <hr />
                        {errors.mode && <div className="text-danger">{errors.mode}</div>}
                        <button className={loading ? "btn btn-lg btn-primary disabled" : "btn btn-lg btn-primary"} type="submit" >Iniciar</button>
                    </form>
                </div>
            </div>
        </div>

    )
}