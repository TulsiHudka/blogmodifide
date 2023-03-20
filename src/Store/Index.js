import { configureStore } from '@reduxjs/toolkit' 
import { createSlice } from '@reduxjs/toolkit'

// const blogSlice = createSlice({
//     name: 'blog',
//     initialState: {
//         checkLogin: false,
//         checkRole :false
//     },
  
//     reducers:{
//         checkLoginTrue(state){
//             state.checkLogin = true
//         },
//         checkRoleTrue(state){
//             state.checkRole = true
//         },
//         checkLoginFalse(state){
//             state.checkLogin = false
//         },
//         checkRoleFalse(state){
//             state.checkRole = false
//         },
//     }

// })
const blogSlice = createSlice({
    name: 'blog',
    initialState: {
        checkLogin: false,
        checkRole :false
    },
  
    reducers:{
        setRowData(state){
            // state.setRowData = true
            fetch()
        },
    }

})
// let dispatch =useDispatch()



export const store = configureStore({reducer : blogSlice.reducer})
export const blogActions = blogSlice.actions    
