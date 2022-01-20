import React,{useEffect,useState} from 'react'
import {useForm} from '../hook/useForm.js'
import cookie from '../hook/cookie.js'
import Gallery from '../components/galleryRecipe.jsx'
import mode from '../hook/mode_use'
import load_icon from "../resources/interface/loading.gif"

const initialForm = {
    search: '',
}

export default function list(){

    const[render,setData] = useState();
    const[reload,setReload] = useState(false);
    const[loading,setLoading] = useState(true);
    const[response,setResponse] = useState(null);
    const[search,setSearch] = useState('');

    useEffect(async () => {
        setLoading(true)
            if(cookie.get('mode__exampleRCPV') == 1){
                let testDB=await mode.testing_db();
                if(testDB){
                    let create=await mode.create_db()
                    setResponse(create)
                }
            }
            setData(null)
            let postData=await mode.run(cookie.get('mode__exampleRCPV'),search);
            if(postData !== false){
                setData(<Gallery elements={postData}/>)
                setResponse(postData)
            }else{
                setResponse(false)
            }
        setLoading(false)
    },[reload]);

    const reset = () => {
        cookie.destroy('mode__exampleRCPV')
        window.location.href = "/";

    }

    const searchData = () => {
        if(reload === false && loading == false){
            setReload(true)
        }else{
            setReload(false)
        }
    }

    window.scrollTo(0, 0)
    return(
        <div className="m-0 p-0 pt-5 d-flex min-vh-100 align-items-center justify-content-center">
            <div className="bg-light m-0 my-5 p-3 col-sm-11 col-12">
                <div className=" p-5 border border-secondary rounded col-12">
                    <div className="m-0 p-0 row mh-100 justify-content-center text-center">
                        <div className="mb-5 d-flex col-12 justify-content-star text-right"> <button onClick={reset} className="btn btn-primary">Elejir otro Metodo de Datos </button> </div>
                        <div className="mb-5 col-6 form-inline">
                            <div className="d-flex">
                                <input value={search} onChange={e => setSearch(e.target.value)} className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                                <button className="btn btn-primary my-2 my-sm-0" onClick={e => searchData()}>Search</button>
                            </div>
                        </div>
                        <h3>Recetas Encotnradas:</h3>
                        {response === false && 
                            <h3 className="alert-danger"> 
                                Ha ocurrido un error, por favor intentelo más tarde.
                            </h3>
                        }
                        {Array.isArray(response) &&  Object.keys(response).length == 0 && !loading?
                            <h3 className="alert-secondary"> 
                                No se encontro información
                            </h3>:
                            ''
                        }
                        {loading &&
                            <div className="base_card m-0 p-0">
                                 <img src={load_icon} className="img_card"/>
                            </div>
                        }
                        {render}
                     </div>
                </div>
            </div>
        </div>
    )
}