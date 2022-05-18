import http from '../../helpers/http'

export const getProduct = async (dispatch) => {
    try {
        dispatch({type: 'TOGGLE_LOADING_TRUE'})        
        const {data} = await http().get('/product')
        dispatch({type: 'GET_PRODUCT', payload: data.results})
        dispatch({type: 'TOGGLE_LOADING_FALSE'})   
    } catch (e){
        console.log(e)
    }
}

export const getProductDetail = async (dispatch, id) => {
    try {
      console.log('a')
      dispatch({ type: 'TOGGLE_LOADING' })
      const { data } = await http().get(`/product/${id}`)
      console.log(data)
      dispatch({
        type: 'GET_PRODUCT_DETAIL',
        payload: data.results
      })
      dispatch({ type: 'TOGGLE_LOADING' })
    } catch (e) {
      console.log(e)
    }
  }

  export const deleteProduct = (id) => {
    return async (dispatch) => {
        try {
            dispatch({type: 'TOGGLE_LOADING'})
            const {data} = await http().delete(`/product/${id}`)
            dispatch({type: 'DELETE_PRODUCT', payload: data.results})
            dispatch({type: 'TOGGLE_LOADING'})
        } catch (e){
            console.log(e)
        }
    }
}

export const updateProduct = async (dispatch, id, data) => {
  try {
    dispatch({type: 'TOGGLE_LOADING'})
    const params = new FormData()
    params.append('name', data.name)
    params.append('price', data.price)
    params.append('stock', data.stock)
    params.append('image', data.image)
    const {data: datas} = await http().patch(`product/${id}`, params)
    dispatch({
      type: 'UPDATE_PRODUCT',
      payload: datas.results
    })
    dispatch({type: 'TOGGLE_LOADING'})
  } catch (e) {
    console.log(e)
  }
}

export const addProduct = async (dispatch, data) => {
  try {
    dispatch({type: 'TOGGLE_LOADING'})
    const inputData = new FormData()
    for (const key in data) {
      inputData.append(key, data[key]);
    }
    const {data: datas} = await http().post('/product', inputData)
    dispatch({
      type: 'ADD_PRODUCT',
      payload: datas.results
    })
    dispatch({type: 'TOGGLE_LOADING'})
  } catch (e) {
    console.log(e)
  }
}