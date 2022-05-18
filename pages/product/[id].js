import { useRouter } from "next/router";
import React, { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Button from "../../components/Button";
// import Image from "next/image";
import { Card, Container, Row, Col, Image } from 'react-bootstrap'
import NumberFormat from 'react-number-format'
import SizeCard from '../../components/SizeCard'
import InputUnderline from "../../components/InputUnderline";
import { useDispatch, useSelector } from "react-redux";
import empty from '../../public/images/empty-input-image.png'
import { increment, decrement } from "../../redux/actions/button";
import { getProductDetail, deleteProduct } from "../../redux/actions/product";
import Layout from '../../components/Layout'
import Modals from '../../components/ModalsDelete'

const ProductDetail = () => {
    const {product, button} = useSelector(state => state)
    const router = useRouter()
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = React.useState(false);

    const onIncrement = (e) => {
        e.preventDefault()
        dispatch(increment())
    }

    const onDecrement = (e) => {
        e.preventDefault()
        dispatch(decrement())
    }

    useEffect(()=> {
        getProductDetail(dispatch, router.query.id)
    }, [dispatch, router.query.id])

    useEffect(()=> {
        console.log(router.query)
    }, [router.query])

    const goEdit = () => {
        router.push(`/edit-product/${router.query.id}`)
    }

    const goBack = () => {
        window.history.back()
    }

    const handleDelete = () => {
        dispatch(deleteProduct(router.query.id))
        setModalShow(true)
        window.scrollTo(0, 0)
    }
    return (
       <Layout>
            <Head>
                <title>Product Detail</title>
                <meta name="description" content="Next Wallet your future wallet" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
           
            <div className='bg-product bg-gray-100 h-full'>
                <Container>
                    <div onClick={goBack} style={{ fontSize: "20px", fontFamily: "Rubik" }} className="p-10 ml-20 mx-5 py-5 nav-text">
                        <span>Favorite & Promo {""}</span><span className="text-yellow-800"> {">"} {product.detail?.name}</span>
                    </div>
                    <Row className='px-3 justify-content-md-between'>
                        <Col xl={5} sm={12} className="px-5 d-flex flex-column justify-content-center">
                            <div className="text-center">
                                <Image src={product.detail?.image} alt="product-image"  className='img-fluid' />
                            </div>
                            <div style={{ fontSize: "48px", fontFamily: "Poppins" }} className="mt-5 ml-20">
                                <p className="text-center text-4xl font-bold">{product.detail?.name}</p>
                                <p className="text-center text-xl font-medium"><NumberFormat value={product.detail?.price} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'IDR '} ></NumberFormat></p>
                            </div>
                            <div className="text-center">
                                <Button block variant='pallet-2 radius'> Add to Cart </Button>
                                <Button onClick={goEdit} block variant='pallet-3 my-2 radius'> Edit Product </Button>
                                <Button onClick={handleDelete} block variant='pallet-1 radius'> Delete Menu </Button>
                                <Modals show={modalShow} onHide={() => setModalShow(false)} />
                                {product.data?.success === true && <Link href='/product' />}
                            </div>
                        </Col>
                        <Col xl={7} sm={12} className="px-5 d-flex flex-column justify-content-center">
                            <Container>
                                <Card style={{ fontSize: "24px", fontFamily: "Poppins" }} className='text-center position-relative shadow-lg border border-top-0 border-start-0 border-end-0 border-5 border-bottom mx-5 px-5 radius'>
                                    <Card.Text className='mt-5'>
                                        Delivery only on Monday to friday at 7 am - 10 pm
                                    </Card.Text>
                                    <br />
                                    <Card.Text>
                                        Cold brewing is a method of brewing that combines ground coffee and cool water and uses time instead of heat to extract the flavor. It is brewed in small batches and steeped for as long as 48 hours.
                                    </Card.Text>
                                    <br />
                                </Card>
                                <div className="mt-10 space-y-8">
                                    <p className="text-center font-bold text-lg mt-4">Choose Delivery Methods</p>
                                    <div className="d-flex flex-row justify-content-md-center py-3 ml-20 mt-10 space-y-5">
                                        <Button variant='pallet-2'  >
                                            Dine in
                                        </Button>
                                        <Button variant='pallet-3 mx-5' >
                                            Door Delivery
                                        </Button>
                                        <Button variant='pallet-1'>
                                            Pickup
                                        </Button>
                                    </div>
                                </div>
                                <div className="d-flex justify-content-md-center align-items-left">
                                    <p className='mt-3'>Set Time: </p>
                                    <InputUnderline block version="input-underline underline px-3" placeholder='Enter the Time you arrived'></InputUnderline>
                                </div>
                            </Container>
                        </Col>
                    </Row>
                </Container>
                <Container fluid className='mt-5 d-flex justify-content-center column'>
                    <Card xl={6} className=' shadow px-5 mx-5 mb-5 radius'>
                        <Row xs={1} md={2} className="text-left">
                            <Col xl={3} md={12} className='text-justify mt-3 mb-3 px-3' >
                                <Image src={product.detail?.image} alt="product-image"  className='img-fluid'  />
                            </Col>
                            <Col xl={5} md={12} className='d-flex align-items-center'>
                                <Card.Body className='mx-4 md-auto'>
                                    <Card.Title className='mt-2'>{product.detail?.name}</Card.Title>
                                    <Card.Text className='mt-3'>
                                        x1 (Large) <br /> x1 (Regular)
                                    </Card.Text>
                                </Card.Body>
                            </Col>
                            <Col xl={4} md={12} className='d-flex flex-row justify-content-center align-items-center py-4'>
                                <Button onClick={onDecrement} variant='pallet-3  radius mt-5'>
                                    -
                                </Button>
                                <div className="flex-grow text-black font-medium text-md rounded-lg mx-5 w-32 align-items-center radius">
                                    {button.value}
                                </div>
                                <Button onClick={onIncrement} variant='pallet-3  radius mt-5' >
                                    +
                                </Button>
                            </Col>
                        </Row>
                    </Card>
                </Container>
            </div>
       </Layout>
    )
}

export default ProductDetail