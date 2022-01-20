import React,{useState, useEffect} from 'react';
import Card from './cardRecipe.jsx';

function Gallery(array) {

    const [offset, setOffset] = useState(0);
    const [Page, setPage] = useState(1);
    const [data, setData] = useState([]);
    const [perPage] = useState(10);
    const [pageCount, setPageCount] = useState(0)
   

    const getData = async() => {
        const data=array.elements;
        const slice = data.slice(offset, offset + perPage)
        const postData = slice.map((item,index) =>
            <Card element={item.recipe} key={index} classExt="col-xxl col-lx-3 col-md-6 col-sm-12 col-12"/>
        )
        setData(postData)
        setPageCount(Math.ceil(data.length / perPage))
    }

    const Select = (e) => {
        const {value} = e.target;
        if(value <= pageCount && value >= 1){
            setPage(value)
            setOffset(perPage * (value-1))
        }
    }
  
   useEffect(() => {
     getData()
   }, [offset])
  
    return (
        <div className="text-center p-0 px-5 m-2 col-12">
            {pageCount >= 2 &&
            <div className="row paginate align-items-baseline justify-content-center p-0 m-0 pb-3 mb-3">
                <button className="bi bi-caret-left-fill mx-2 btn btn-primary col-1" value={parseInt(Page) - 1} onClick={Select}></button>
                <input className="form-control me-2 text-center" type="number" min="1" value={Page} onChange={Select}/> 
                 de {pageCount}
                <button className="bi bi-caret-right-fill mx-2 btn btn-primary col-1" value={parseInt(Page) + 1} onClick={Select}></button>
            </div>
            }
            
            <div className="row p-0 m-0 pb-3 mb-3 align-content-center justify-content-center">
                {data}
            </div>

            {pageCount >= 2 &&
            <div className="row paginate align-items-baseline justify-content-center p-0 m-0 pb-3 mb-3">
                <button className="bi bi-caret-left-fill mx-2 btn btn-primary col-1" value={parseInt(Page) - 1} onClick={Select}></button>
                <input className="form-control me-2 text-center" type="number" min="1" value={Page} onChange={Select}/> 
                 de {pageCount}
                <button className="bi bi-caret-right-fill mx-2 btn btn-primary col-1" value={parseInt(Page) + 1} onClick={Select}></button>
            </div>
            }
        </div>
    )
}

export default Gallery