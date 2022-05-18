const dataProduct = {
    data: [],
    detail: [],
    updateData: [],
    addData: [],
    success: false,
    errorMsg: ''
}

const product = (state = dataProduct, action) => {
    switch (action.type) {        
        case 'GET_PRODUCT': {
            const data = action.payload
            console.log(data)
            state.data = data
            if(!Array.isArray(data)){
                state.data = [data]
            }
            return {...state }
        }
        case 'GET_PRODUCT_DETAIL': {
            const data = action.payload
            state.detail = data
            return { ...state }
        }
        case 'DELETE_PRODUCT': {
            const data = action.payload
            state.data = data
            state.success = true
            return {...state }
        }
        case 'UPDATE_PRODUCT': {
            const data = action.payload
            state.updateData = data
            state.errorMsg = data.message
            return {...state }
        }
        case 'ADD_PRODUCT': {
            const data = action.payload
            state.addData = data
            return {...state }
        }
        default: {
            return {...state }
        }
    }
}

export default product