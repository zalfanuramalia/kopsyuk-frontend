import React, { useEffect, useRef, useState } from "react"
import { useRouter } from "next/router"
import Head from "next/head"
import Layout from "../../components/Layout"
import { Container, Row, Col, Image } from 'react-bootstrap'
import Modals from '../../components/ModalsEditProduct'
import Form from 'react-bootstrap/Form'
import InputUnderline from "../../components/InputUnderline"
import Button from "../../components/Button"
import { FaRegTrashAlt } from 'react-icons/fa'
import ButtonPlusMinus from '../../components/ButtonPlusMinus'
import { useDispatch, useSelector } from "react-redux"
import { getProductDetail, updateProduct } from "../../redux/actions/product"
import empty from '../../public/images/empty-input-image.png'

const EditProduct = () => {
    const {product} = useSelector(state => state)
    const router = useRouter()
    const hiddenFileInput = useRef()
    const [modalShow, setModalShow] = React.useState(false);
    const dispatch = useDispatch()
    const [data, setData] = useState({})

    useEffect(()=> {
        getProductDetail(dispatch, router.query.id)
    }, [dispatch, router.query.id])
    
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

      const editedProduct = (e) => {
        e.preventDefault()
        const inputData = {}
        inputData.name = e.target.elements['name'].value
        inputData.price = e.target.elements['price'].value
        inputData.stock = e.target.elements['stock'].value
        inputData.image = data.image
        updateProduct(dispatch, router.query.id, inputData)
        window.scrollTo(0, 0)
      }
    return (
        <Layout>
            <Head>
                <title>Edit Product</title>
                <meta name="description" content="Next Wallet your future wallet" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <div className='bg-product bg-gray-100 h-full'>
                <div style={{ fontSize: "20px", fontFamily: "Rubik" }} className="text-justify p-auto px-5 mx-5 py-5 nav-text">
                <span >Favorite & Promo {""}</span><span className="text-yellow-800"> {">"} {product.detail?.name}</span>
                </div>
                <Container>
                <form onSubmit={(e) => editedProduct(e)}>
                    {product.errorMsg &&
                    <div className="alert alert-warning fade show" role="alert" aria-label="Close">
                        <strong>{product.errorMsg}</strong>
                    </div>
                    }
                    {
                    !product.errorMsg && 
                        <Modals show={modalShow} onHide={() => setModalShow(false)} />
                    }                          
                    <Row className='px-3 justify-content-md-between'>
                        <Col xl={6} sm={12} className="px-5 d-flex flex-column justify-content-md-center">
                            <div className='position-relative m-auto'>
                                <Image id='product-image' src={product.detail?.image} alt="product-image" className='img-fluid' style={{ width: '20em' }}></Image>
                                <div className='position-absolute top-0 end-0 px-3 py-2' ><FaRegTrashAlt  /></div>
                            </div>
                            <Button block variant='pallet-3 my-1 radius save-1' onClick={(e) =>uploadFile(e)}> Choose from Gallery </Button>
                            <input type="file"
                            ref={hiddenFileInput}
                            className='d-none'
                            name='image'
                            accept='image'
                            onChange={(e) => fileInputHandler(e)}
                            />
                            <div style={{fontSize:"24px", fontFamily:"Poppins"}} className="px-2 m-auto w-75 mt-3 text-center">
                                <p className="text-justify font-bold">Delivery only on Monday to friday at  1 - 7 pm</p>
                            </div>
                        </Col>
                        <Col xl={6} sm={12} className=" px-5 desc">
                            <Row>
                                <Col xl={12} sm={12}>
                                    <InputUnderline block version="input-underline underline-1 px-3" name='name' placeholder='input product name' defaultValue={product.detail?.name} style={{fontSize:"24px", fontFamily:"Poppins", fontWeight:"900", backgroundColor:"#FAF8F6"}}></InputUnderline>
                                </Col>
                                <Col xl={12} sm={12}>
                                    <InputUnderline block version="input-underline underline-1 px-3 py-2 " name='price' placeholder='input product price' defaultValue={product.detail?.price} style={{fontSize:"24px", fontFamily:"Poppins", fontWeight:"500", backgroundColor:"#FAF8F6"}}/>
                                </Col>
                                <Col xl={12} sm={12}>
                                    <InputUnderline block version="input-underline underline-1 px-3 py-2 " name='stock' placeholder='input product stock' defaultValue={product.detail?.stock} style={{fontSize:"24px", fontFamily:"Poppins", fontWeight:"500", backgroundColor:"#FAF8F6"}}/>
                                </Col>
                            </Row>
                            <Form.Select aria-label="Default select example" className='mt-5 form-control radius'>
                                <option>Select Size</option>
                                <option value="R">R</option>
                                <option value="L">L</option>
                                <option value="XL">XL</option>
                            </Form.Select>
                            <Form.Select aria-label="Default select example" className='mt-5 form-control radius w-100 mh-100 p-2'>
                                <option>Select Delivery Method</option>
                                <option value="1">Dine in</option>
                                <option value="2">Door Delivery</option>
                                <option value="3">Pick up</option>
                            </Form.Select>
                            <Container>
                                <Row className='text-center align-items-center my-5 ms-4'>
                                    <Col xl={6} sm={12} className='text-center'>
                                        <ButtonPlusMinus />
                                    </Col>
                                    <Col xl={6} sm={12} className='text-center'>
                                        <Button onClick={()=>setModalShow(true)} type="submit" block variant='pallet-1 radius my-5 py-3'>Save change</Button>  
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

export default EditProduct