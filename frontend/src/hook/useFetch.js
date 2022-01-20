import {useState} from 'react';

export const useFetch = (initialdata) =>{
    const[data,setData] = useState(initialdata);
    const[loading,setLoading] = useState(false);
    const[response,setResponse] = useState(null);
    const[submit,setSubmit] = useState(false);
    const[backop, setBack] = useState(initialdata);

    const handleChange = (e) => {
        const {name,value} = e.target;
        setData({
            ...data,
            [name]:value
        })
    };
    
    const handleBlur = (e) => {
        handleChange(e)
    };

    const Reseting = () => {
        setData(backop);
    }

    const RefreshBack = () =>{
        setBack(data);
    }

    return{
        data,
        loading,
        backop,
        response,
        submit,
        Reseting,
        RefreshBack,
        handleChange,
        handleBlur,
        setResponse,
        setLoading,
        setSubmit,
        setData
    }
}