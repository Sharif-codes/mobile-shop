import axios from 'axios';
import useAllUser from '../../../../Hooks/useAllUser';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { deleteDoc, doc } from 'firebase/firestore';
import useAxiosPublic from '../../../../Hooks/useAxiosPublic';
import Searchbar from '../../../../components/Searchbar';
import { useEffect, useState } from 'react';
import { GrPowerReset } from 'react-icons/gr';
import Spinner from '../../../../components/spinner/spinner';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa6';

const AllUsers = () => {
  // const allUsers = useAllUser()
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState("")
  const [search, setSearch] = useState("")
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);



  const axiosPublic = useAxiosPublic()



  // const { data: fetchedData = [], refetch } = useQuery({
  //   queryKey: ["users"],
  //   queryFn: async () => {

  //     return data;
  //   },
  // });
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      try {
        const { data } = await axiosPublic.get(`/getAllUser?name=${search}&role=${role}&limit=${15}&page=${page}`);

        setUsers(data.users)
        setTotalPages(Math.ceil(data.totalUsers / 15))
      } catch (error) {

        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetch()
  }, [axiosPublic, page, search, role])




  const handleMemberRemove = (email) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove User",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosPublic.delete(`/userRemove/${email}`);
          console.log(res.data);
          // refetch()
          window.location.reload()
        } catch (error) {
          console.error(error);
        }

        Swal.fire({
          title: "Removed!",
          text: "The Member is deleted to user now",
          icon: "success",
        });
      }
    });
  };

  const token = localStorage.getItem('access-token')
  const handleUpdateToSeller = (email) => {
    Swal.fire({
      title: "Are you sure you ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update to seller",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.patch(`/userUpdateToSeller/${email}`, null, {
          headers: {
            authorization: `Bearer ${token}`
          }
        })
        if (res.data.modifiedCount) {
          // refetch();
          window.location.reload()
          Swal.fire({
            title: "Updated!",
            text: "The Member is updated to seller now",
            icon: "success",
          })
        }
      }
    });

  }
  const handleUpdateToBuyer = (email) => {
    Swal.fire({
      title: "Are you sure you ?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Update to buyer",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await axiosPublic.patch(`/userUpdateToBuyer/${email}`, null, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        if (res.data.modifiedCount) {
          // refetch();
          window.location.reload()
          Swal.fire({
            title: "Updated!",
            text: "The Member is updated to buyer now",
            icon: "success",
          })
        }

      }
    });
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setSearch(e.target.search.value)
    e.target.search.value = "";
  }

  const handleReset = () => {
    setSearch("")
    setRole("")
    // window.location.reload()
  }

  const handlePageChange = (newPage) => {
    if (newPage > 0 && newPage <= totalPages) {
      setPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  return (
    <div className='lex flex-col mt-1 lg:mt-2 md:mt-0'>
      <div className=' h-12 md:h-16  mx-2 px-2 md:px-4 bg-slate-100 rounded-t-lg text-sm md:text-lg font-semibold flex justify-between items-center'>

        <div>
          <p className='text-sm md:text-lg lg:text-2xl font-semibold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent'>All User</p>
        </div>
        <div className='flex gap-1 md:gap-4 items-center justify-center'>

          <Searchbar handleSearch={handleSearch}></Searchbar>
          <div>


            <select className='p-1 md:p-[11px] w-20 md:w-24 h-[33px] md:h-12  rounded-md text-xs' name="" id="" onChange={(e) => setRole(e.target.value)} >
              <option value="" disabled selected>user type</option>
              <option value="seller">seller</option>
              <option value="buyer">buyer</option>
            </select>

          </div>
          <button type="button" onClick={handleReset} className="flex items-center">
            <GrPowerReset className="text-xl" /> <p></p>
          </button>
        </div>
      </div>

      <div>
        {
          loading ? (
            <Spinner></Spinner>
          ) : (
            <div>
              {
                users?.length <= 0 && <div className="w-full h-[calc(100vh-120px)] md:h-[calc(100vh-130px)] lg:h-[calc(100vh-100px)] flex items-center justify-center">
                  <p className="text-3xl font-bold">No user found!</p>
                </div>
              }
              {
                users?.length > 0 && 
                 <div className="overflow-x-auto h-[calc(100vh-175px)] md:h-[calc(100vh-185px)] lg:h-[calc(100vh-150px)] ">
                <table className="table table-xs table-pin-rows table-pin-cols">
                  <thead>
                    <tr>
                      <th>#</th>
                      <td>Name</td>
                      <td>Email</td>
                      <td>Role</td>
                      <td>Update Role</td>
                      <td>Action</td>

                    </tr>
                  </thead>
                  <tbody>

                    {
                    users?.map((item, idx) => (
                      <tr key={item._id}>
                        <th>{idx + 1}</th>
                        <td>{item.name}</td>
                        <td>{item.email}</td>
                        <td>{item.role}</td>
                        <td>
                          {
                            item.role == "admin" ? <></> : item.role == "buyer" ? <button
                              onClick={() => handleUpdateToSeller(item.email)}
                              className='btn w-24 h-2 btn-sm text-xs hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-slate-100'>Make Seller</button> : <button onClick={() => handleUpdateToBuyer(item.email)} className='btn w-24 h-2 btn-sm text-xs hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-slate-100'>Make Buyer</button>
                          }

                        </td>
                        <td>
                          {
                            item.role == "admin" ? <></> : <button
                              onClick={() => handleMemberRemove(item.email)}
                              className="btn w-24 h-2 btn-sm text-xs hover:bg-gradient-to-r from-purple-500 to-pink-500 hover:text-slate-100"
                            >
                              Delete
                            </button>
                          }

                        </td>
                      </tr>
                    ))}

                  </tbody>
                </table>
               
              </div>
              }

             
            </div>

          )}
      </div>

      {users?.length === 0 ? "" : <div className="flex justify-center items-center gap-2 my-1">
        <button className="btn  p-[15px] border rounded-full border-black" onClick={() => handlePageChange(page - 1)}
          disabled={page === 1}>
          <FaArrowLeft  ></FaArrowLeft>
        </button>
        <p>Page {page} of {totalPages}</p>
        <button className="btn p-[15px] border rounded-full border-black" onClick={() => handlePageChange(page + 1)}
          disabled={page === totalPages}>
          <FaArrowRight className="" ></FaArrowRight>
        </button>
      </div>}


    </div>

  );
};

export default AllUsers;