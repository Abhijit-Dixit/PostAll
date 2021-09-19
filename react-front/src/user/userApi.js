export const read=(userId,token)=>{
    return fetch(`http://localhost:8080/users/${userId}`,{
        method:'GET',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
}
export const update=(userId,token,user)=>{
    console.log('tera user');
    console.log(user);
    return fetch(`http://localhost:8080/users/${userId}`,{
        method:'PUT',
        headers:{
            Accept:"application/json",
            //"Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body: user
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
}

export const localUpdate=(user,next)=>{
    //console.log(user.name);
    if(typeof window !== "undefined"){
        if(localStorage.getItem('jwt')){
            let auth = JSON.parse(localStorage.getItem('jwt'));
            auth.User=user;
            localStorage.setItem('jwt',JSON.stringify(auth));
            next();
        }
    }
}
export const remove=(userId,token)=>{
    return fetch(`http://localhost:8080/users/${userId}`,{
        method:'DELETE',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    })
    .then(response=>{
        return response.json();
    })
    .catch(err=>{
        console.log(err);
    })
}