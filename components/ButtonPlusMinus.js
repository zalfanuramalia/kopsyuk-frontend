
import React, { useEffect } from 'react'
import Button from './Button'
import { increment, decrement } from '../redux/actions/button'
import { useDispatch, useSelector } from 'react-redux'
import { getProductDetail } from '../redux/actions/product'
import { useRouter } from 'next/router'

const ButtonPlusMinus = () => {
    const button = useSelector(state=>state.button)
    const dispatch = useDispatch()
    const router = useRouter()

    useEffect(()=>{
        getProductDetail(router.query.id)
    }, [router.query.id])

    useEffect(()=>{
        console.log(button);
    }, [button])
    
    const onIncrement = (e)=>{
        e.preventDefault()
        dispatch(increment())
      }
    
      const onDecrement = (e)=>{
        e.preventDefault()
        dispatch(decrement())
      }
	return (
		<div className='w-75 h-75 py-3 border border-primary border-2 radius d-flex align-items-center justify-content-around'>
			<Button onClick={onDecrement} variant=' fs-3 bg-none fw-bold'>-</Button>
			<div className='fs-3 fw-bold pps'>{button.value}</div>
			<Button onClick={onIncrement} variant=' fs-3 bg-none fw-bold'>+</Button>
		</div>
	)
}

export default ButtonPlusMinus