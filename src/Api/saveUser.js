import axios from "axios";

export const saveUser= async (user,name,role,imageUrl) =>{

    console.log("img:", imageUrl);
    if (!role) {
        role= "buyer"
    }
   
    const currentUser= {
        name,
        role,
        email: user.email,
        imageUrl
    }
    console.log("user datra:", currentUser);
    const {data}= await axios.post(`https://digi-store-sharif-server.vercel.app/users/${user.email}`, currentUser)
    return data;
}