import axios from 'axios';
import useAllUser from '../../../Hooks/useAllUser';
import Swal from 'sweetalert2';
import { useQuery } from '@tanstack/react-query';
import { deleteDoc, doc } from 'firebase/firestore';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';

const AllUsers = () => {
  // const allUsers = useAllUser()
  const axiosPublic = useAxiosPublic()

  const { data: users = [], refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosPublic.get("/getAllUser");
      return res?.data;
    },
  });

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
          refetch();
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
       const res= await axiosPublic.patch(`/userUpdateToSeller/${email}`,null, {
          headers: {
              authorization : `Bearer ${token}`
          }
      })
      if (res.data.modifiedCount) {
        refetch();
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
        const res = await axiosPublic.patch(`/userUpdateToBuyer/${email}`,null, {
          headers: {
            authorization: `Bearer ${token}`
          }
        });
        if(res.data.modifiedCount)
        {
          refetch();
          Swal.fire({
            title: "Updated!",
            text: "The Member is updated to buyer now",
            icon: "success",
          })
        }
        
      }
    });
  }

  return (
    <div className="overflow-x-auto">
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
          {users?.map((item, idx) => (
            <tr key={item._id}>
              <th>{idx + 1}</th>
              <td>{item.name}</td>
              <td>{item.email}</td>
              <td>{item.role}</td>
              <td>
                {
                  item.role == "admin" ? <></> : item.role == "buyer" ? <button
                    onClick={() => handleUpdateToSeller(item.email)}
                    className='btn w-24 h-2 btn-sm text-xs btn-success'>Make Seller</button> : <button onClick={() => handleUpdateToBuyer(item.email)} className='btn w-24 h-2 btn-sm text-xs btn-accent'>Make Buyer</button>
                }

              </td>
              <td>
                {
                  item.role == "admin" ? <></> : <button
                    onClick={() => handleMemberRemove(item.email)}
                    className="btn w-24 h-2 btn-sm text-xs btn-primary"
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
  );
};

export default AllUsers;