import axios from 'axios'

async function run(mode,find = '', id = -1){

    const data = JSON.stringify({search: find,id: id})

    switch(parseInt(mode)) {
        case 0:
            return await api_search(data);
        case 1:
            return await bd_search(data);
        case 2:
            return await resources_search(data);
        default:
            return false
    }
}

async function bd_search(data,id = -1){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'JWT fefege...'
    }
    return await axios.post(`/data/bd`,data, {headers: headers})
      .then(res => {
        return res.data;
    }).catch(function (error) {
        if (error.response) {
            return false
        }
    });
}


async function api_search(data,id = -1){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'JWT fefege...'
    }
    return await axios.post(`/data/api`,data, {headers: headers})
      .then(res => {
          console.log(res.data.hits)
        return res.data.hits;
    }).catch(function (error) {
        if (error.response) {
            return false
        }
    });
}

async function resources_search(data,id = -1){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'JWT fefege...'
    }
      
    return await axios.post(`/data/test`, data, {headers: headers})
      .then(res => {
        return res.data;
    }).catch(function (error) {
        if (error.response) {
            return false
        }
    });
}

async function testing_db(){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'JWT fefege...'
    }
      
    return await axios.post(`/data/bd_test`, [], {headers: headers})
      .then(res => {
        return res.data;
    }).catch(function (error) {
        if (error.response) {
            console.log(error.response)
            return error.response
        }
    });
}

async function create_db(){
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'JWT fefege...'
    }
      
    return await axios.post(`/data/bd_create`, [], {headers: headers})
      .then(res => {
        return res.data;
    }).catch(function (error) {
        if (error.response) {
            console.log(error.response)
            return error.response
        }
    });
}

export default{run,testing_db,create_db}
