import { CiCamera } from "react-icons/ci";
import useUserData from "../../Hooks/useUserData";
import BuyerStats from "../Dashboard/Buyer/Stats/BuyerStats"
import SellerStats from "../Dashboard/Seller/Stats/SellerStats"
import { Tooltip } from "react-tooltip";
import { useState } from "react";
import photoUpload from "../../Api/photoUpload";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { FaCamera, FaIdCard } from "react-icons/fa6";
import { MdPeople } from "react-icons/md";
import { IoMdMail } from "react-icons/io";


const Profile = () => {
    const [loadingImageUpload, setLoadingImageUpload] = useState(false);
    const [imageUrl, setImageUrl] = useState("");
    const [user, userLoading, refetch] = useUserData()

    const axiosPublic = useAxiosPublic()

    const userEmail = user?.email


    const handleFileUpload = async (event) => {
        setLoadingImageUpload(true)
        const file = event.target.files[0];
        if (!file) return;
        const data = new FormData()
        data.append("file", file)
        const UploadedImgUrl = await photoUpload(data)
        setImageUrl(UploadedImgUrl);
        setLoadingImageUpload(false)
    }

    const saveUploadedPhoto = async () => {
        const photoUpdate = { imageUrl, userEmail }
        await axiosPublic.patch("/photo-change", photoUpdate)
        refetch()
    }

    return (
        <div>
            <div className="mt-2 md:mt-4 flex flex-col justify-center items-center ">
                <div className="avatar ">
                    <div className="ring-primary ring-offset-base-100 w-40 rounded-full ring-2 ring-offset-2 ">
                        <img src={user?.imageUrl} alt={user?.name} className="relative" />
                        <button className="absolute bottom-3 right-8" onClick={() => document.getElementById('my_modal_3').showModal()}>
                            <FaCamera className="text-2xl text-pink-600" data-tooltip-id="my-tooltip" data-tooltip-content="Change Photo" />
                        </button>
                        <dialog id="my_modal_3" className="modal">
                            <div className="modal-box">
                                <form method="dialog">
                                    {/* if there is a button in form, it will close the modal */}
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                                </form>
                                <div className=" ">
                                    <label htmlFor='image' className='block mb-2 text-sm'>
                                        Select Image:
                                    </label>
                                    {
                                        loadingImageUpload ? "Uploading image..." : ""
                                    }
                                    <div className="flex items-center justify-center">

                                        <input
                                            className=" file-input file-input-bordered file-input-info w-2/3 max-w-x border-gray-300 focus:outline-info bg-gray-200 text-gray-900"
                                            required
                                            type='file'
                                            id='image'
                                            name='image'
                                            accept='image/*'
                                            onChange={handleFileUpload}
                                        />

                                        <div className="modal-action">
                                            <form method="dialog">
                                                {/* if there is a button, it will close the modal */}
                                                <button onClick={saveUploadedPhoto} disabled={loadingImageUpload} className="btn mb-6 btn-md   ml-2 hover:bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 hover:text-slate-100 ">submit</button>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </dialog>
                    </div>

                </div>
                <div className="flex flex-col justify-center mt-4 text-lg font-extralight">
                    <div className="flex justify-center">
                        <p className="text-xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent" >{user?.name}</p>
                    </div>
                    <div className="flex justify-center">
                        <p className="flex items-center gap-1 md:gap-2"> <MdPeople></MdPeople> {user?.role}</p>
                    </div>
                    <div className="flex justify-center">
                        <p className="flex items-center gap-1 md:gap-2"><FaIdCard /> {user?._id}</p>
                    </div>
                   
                    <div className="flex justify-center">
                        <p className="flex items-center gap-1 md:gap-2"> <IoMdMail /> {user?.email}</p>
                    </div>
                </div>


            </div>


            <div className="mx-2 md:mx-0">
                {
                    user?.role === "buyer" && <BuyerStats></BuyerStats>
                }
                {
                    user?.role === "seller" && <SellerStats></SellerStats>
                }
            </div>
            <Tooltip id="my-tooltip" />
        </div>
    );
};

export default Profile;