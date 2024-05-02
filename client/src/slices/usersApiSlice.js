import { apiSclice } from "./apiSlice";

const USER_URL='/api/user';


export const userApiSlice=apiSclice.injectEndpoints({
    endpoints:(builder)=>({
        login:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/loginUser`,
                method:'POST',
                body:data
            })
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${USER_URL}/logout`,
                method:'POST',

            })
        }),
        register:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/createUser`,
                method:"POST",
                body:data
            })
        }),
        editProfile:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/updateUser`,
                method:"POST",
                body:data
            })
        }),
        updateProfile:builder.mutation({
            query:(data)=>({
                url:`${USER_URL}/updateProfile`,
                method:"POST",
                body:data
            })
        })
    })
})



export const {useLoginMutation,useLogoutMutation,useRegisterMutation,useEditProfileMutation,useUpdateProfileMutation}=userApiSlice