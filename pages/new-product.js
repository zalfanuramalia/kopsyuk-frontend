import React, { useRef, useState } from 'react'
import Image from 'next/image'
import Head from 'next/head'
import Layout from "../components/Layout"
import { Container, Row, Col, Form } from 'react-bootstrap'
import Button from "../components/Button"
import EmptyInputImage from "../public/images/empty-input-image.png"
import InputUnderline from "../components/InputUnderline"
import { useDispatch, useSelector } from 'react-redux'
import { addProduct } from '../redux/actions/product'
import Modals from '../components/ModalsAdd'
import Link from 'next/link'
import styles from '../styles/new-product.module.scss'

const NewProduct = () => {
    const {product} = useSelector(state=>state)
    const [data, setData] = useState({})
    const [img, setImg] = useState();
    const hiddenFileInput = useRef(null)
    const dispatch = useDispatch()
    const [modalShow, setModalShow] = useState(false)

    const fileInputHandler = (e) => {
        const reader = new FileReader();
        const image = e.target.files[0];
    
        const productImage = document.querySelector('#product-image');
        reader.readAsDataURL(image);
    
        reader.onload = (e) => {
          productImage.src = e.target.result;
          productImage.className += ' rounded-circle'
        };
    
    
        setData({
          image: e.target.files[0]
        });
    };
    
    const uploadFile = (e) => {
        e.preventDefault()
        hiddenFileInput.current.click()
    }

    const addDataProduct = async (e) => {
        e.preventDefault()
        const inputData = {}
        inputData.name = e.target.elements['name'].value
        inputData.price = e.target.elements['price'].value
        inputData.stock = e.target.elements['stock'].value
        inputData.image = data.image
        addProduct(dispatch, inputData)
        window.scrollTo(0, 0)
    }
    return (
        <Layout>
            <Head>
                <title>New Product</title>
                <meta name="description" content="Next Coffee for You" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='bg-product bg-gray-100 h-full'>
                <div style={{ fontSize: "20px", fontFamily: "Rubik" }} className="text-justify p-auto px-5 mx-5 py-3 nav-text">
                <span >Favorite & Promo {""}</span><span className="text-yellow-800"> {">"} New Product</span>
                </div>
                <Container>
                <form onSubmit={(e) => addDataProduct(e)}>
                    {
                    !product.errorMsg && 
                        <Modals show={modalShow} onHide={() => setModalShow(false)} />
                    } 
                    <Row className='py-3'>
                    <Col xl={6} className="px-5 d-flex flex-column justify-content-center">
                        <div className="d-flex flex-column align-items-center">
                            <Image id='product-image' src={EmptyInputImage} alt="product" className='img-fluid' width={200} height={200} />
                        </div>
                        <div className='my-2  d-flex flex-row align-items-center justify-content-center '>
                            <Button block variant='pallet-2 radius save-1'> Take a Picture </Button>
                        </div>
                        <div className='my-2 d-flex flex-row align-items-center justify-content-center'>
                            <Button block variant='pallet-3 radius save-1' onClick={(e) => uploadFile(e)}> Choose from Gallery </Button>
                        </div>
                        <input type="file"
                        ref={hiddenFileInput}
                        className='d-none'
                        name='picture'
                        accept='image'
                        onChange={fileInputHandler}
                        />
                    </Col>
                    <Col xl={6}>
                        <Container className='h-100'>
                        <Row className='h-100 d-flex flex-column justify-content-between px-3'>
                            <Col xl={12} >
                                <InputUnderline label="Name :" name='name' placeholder="Type product name min. 50 characters" block version="input-underline px-3 py-4 underline" ></InputUnderline>
                            </Col>
                            <Col xl={12} className="mt-3">
                                <InputUnderline label="Price :" name='price' placeholder="Type the price" block version="input-underline px-3 py-4 underline" ></InputUnderline>
                            </Col>
                            <Col xl={12} className="mt-3 ">
                                <InputUnderline label="Stock :" name='stock' placeholder="Stock product" block version="input-underline px-3 py-4 underline" ></InputUnderline>
                            </Col>
                            <Col xl={12} className="ml-20 mt-10 space-y-5 d-flex flex-row justify-content-center align-items-center mx-3">
                                <div className='mx-3 my-3'>
                                    <Button onClick={()=>setModalShow(true)} type='submit' block variant='pallet-2 my-4 radius save-1'> Save Product </Button>
                                </div>
                                <div className='mx-3 my-3'>
                                    <Button block variant='pallet-3 my-2 mx-5 radius save-1'> <Link href="/product"><a className={`${styles.cancel}`}>Cancel</a></Link> </Button>
                                </div>
                            </Col>
                        </Row>
                        </Container>
                    </Col>
                    </Row>
                </form>
                </Container>
            </div>
        </Layout>
    )
}

export default NewProduct