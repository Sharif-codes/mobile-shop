import axios from "axios";

export const saveUser= async (user,name,role) =>{

    if (!role) {
        role= "buyer"
    }
    const currentUser= {
        name,
        role,
        email: user.email
    }
    const {data}= await axios.post(`http://localhost:4000/users/${user.email}`, currentUser)
    return data;
}