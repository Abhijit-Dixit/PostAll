// What's the purpose of if (typeof window !== 'undefined')
// This can be used to detect whether code is running in a typical browser environment (e.g. an environment with a browser DOM) 
// or in some other JS environment since the window object exists in a typical browser JS, 
// but does not exist in something like node.js or even a webWorker in a browser.

export const signout=(next)=>{
    if(typeof window!==undefined)localStorage.removeItem('jwt');
    
    next();
    fetch(`http://localhost:8080/signout`,{
        method:'GET',
    })
    .then(response=>{
        console.log('signout',response);
        return response.json();
    })
    .catch(err=>console.log(err));
}

// When receiving data from a web server, the data is always a string.
// Parse the data with JSON.parse(), and the data becomes a JavaScript object.
export const hasAuthenticated=()=>{
    if(typeof window=='undefined')return false;
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    }
    else{
        return false
    }

}
// When sending data to a web server, the data has to be a string.
// Convert a JavaScript object into a string with JSON.stringify()
export const authenticate=(jwt,next)=>{
    console.log(jwt);
    if(typeof Window!==undefined){
        localStorage.setItem('jwt',JSON.stringify(jwt));
        next();
    }
}

export const signin=user=>{
    return fetch(`http://localhost:8080/signin`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            "Content-Type":'application/json'
        },
        body:JSON.stringify(user)
    })
    .then((response)=>{
        return response.json();
    })
    .catch((err)=>{
        console.log(err);
    })
}

export const signup=user=>{
    return fetch(`http://localhost:8080/signup`,{
        method:'POST',
        headers:{
            Accept:'application/json',
            "Content-Type":'application/json'
        },
        body:JSON.stringify(user)
    })
    .then((response)=>{
        return response.json();
    })
    .catch((err)=>{
        console.log(err);
    })
}