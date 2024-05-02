import {createApi , fetchBaseQuery} from '@reduxjs/toolkit/query/react'

const baseQuery=fetchBaseQuery({baseUrl:''})

export const apiSclice =createApi({
    baseQuery,
    tagTypes:['User'],
    endpoints:(builder)=>({}),
})