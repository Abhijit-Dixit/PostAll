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

export const hasAuthenticated=()=>{
    if(typeof window=='undefined')return false;
    if(localStorage.getItem('jwt')){
        return JSON.parse(localStorage.getItem('jwt'));
    }
    else{
        return false
    }

}

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