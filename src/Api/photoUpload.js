

const photoUpload = async (data) => {
  
   data.append("upload_preset", import.meta.env.VITE_upload_preset)
    data.append("cloud_name", import.meta.env.VITE_cloud_name)
    const res= await fetch( `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_cloud_name}/image/upload`, {
      method: "POST",
      body: data
    })
    const uploadImageURL= await res.json()
    console.log(uploadImageURL?.secure_url);
    return uploadImageURL?.secure_url;
};

export default photoUpload;