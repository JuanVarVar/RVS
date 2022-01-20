import {useState} from 'react';

export const useForm = (initialForm,validateForm,submitProcess) =>{
    const[form,setForm] = useState(initialForm);
    const[errors,setErrors] = useState({});
    const[loading,setLoading] = useState(false);
    const[response,setResponse] = useState(null);
    const[submit,setSubmit] = useState(false);
    const[backop, setBack] = useState(initialForm);

    const handleChange = (e) => {
        const {name,value} = e.target;
        setForm({
            ...form,
            [name]:value
        })
    };
    
    const handleBlur = (e) => {
        handleChange(e)
        setErrors(validateForm(form));
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors(validateForm(form));
        if(Object.keys(errors).length === 0){
            submitProcess(form);
        }
    };

    const Reseting = () => {
        setForm(backop);
    }

    const RefreshBack = () =>{
        setBack(form);
    }

    return{
        form,
        errors,
        loading,
        backop,
        response,
        submit,
        Reseting,
        RefreshBack,
        handleChange,
        handleBlur,
        handleSubmit,
        setErrors,
        setResponse,
        setLoading,
        setSubmit
    }
}