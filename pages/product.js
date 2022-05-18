import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/Button'
import Head from 'next/head'
import { getProduct } from '../redux/actions/product'
import { Card, Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import PromoCard from '../components/PromoCard'
import CardMenu from '../components/CardMenu'
import Layout from '../components/Layout'
import empty from '../public/images/empty-input-image.png'
import { useRouter } from 'next/router'

const Product = () => {
    const { product } = useSelector (state => state)
    const router = useRouter()
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(getProduct)
    },[dispatch])

    const productDetail = (id) => {
        router.push(`product/${[id]}`)
    }

    const goToNewProduct = () => {
        router.push('new-product')
    }
    return (
        <Layout>
            <Head>
                <title>Product</title>
                <meta name="description" content="Next Coffee for You" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <section>
                <Container>
                    <Row>
                        <Col sm={12} md={4} className="my-5">
                            <Card.Text as="h3" className='text-center'>
                                Promo for you
                            </Card.Text>
                            <div className="my-5">
                                Coupons will be updated every weeks. Check them out!
                            </div>
                            <PromoCard image={empty} />
                            <div className='my-3'>Terms and Condition</div>
                            <ol>
                                <li>
                                    You can only apply 1 coupon per day
                                </li>
                                <li>
                                    It only for dine in
                                </li>
                                <li>
                                    Buy 1 get 1 only for new user
                                </li>
                                <li>
                                    Should make member card to apply coupon
                                </li>
                            </ol>
                            <div className='my-3 text-center'>
                            <Button block variant='pallet-1 py-3 my-3 mb-5 radius' version={'input-normal'}> Apply Coupon </Button>
                            </div>

                            <div className='my-3 text-center'>
                                <Button block variant='pallet-3 py-3 my-3 mb-5 radius' version={'input-normal'}> Add New Promo </Button>
                            </div>
                        </Col>
                        <Col sm={12} md={8} className="border-start border-end">

                            <Tabs
                                defaultActiveKey="home"
                                transition={false}
                                id="noanim-tab-example"
                                className="mb-3 bg-white text-pallet-1"
                                rounded
                            >
                                <Tab eventKey="home" title="Favorite And Promo">
                                    <Row class className="">
                                        {product.data?.map((data, idx) => {
                                            return (
                                                <Col key={String(data.id)} sm={12} md={4} onClick={() => productDetail(data.id)} style={{ cursor: 'pointer' }}>
                                                    <CardMenu key={idx} newClass={"mx-5 my-5"}
                                                        cardName={data?.name}
                                                        cardPrice={data?.price}
                                                        cardImage={data?.image || empty}
                                                        cardDiscount={"10%"} />
                                                </Col>
                                            )
                                        })}
                                    </Row>
                                </Tab>
                                <Tab eventKey="coffee" title="Coffeee">
                                    <Row class className="">
                                        {product.data?.map((data, idx) => (
                                            <Col key={String(data.id)} sm={12} md={4} onClick={() => productDetail(data.id)} style={{ cursor: 'pointer' }}>
                                                <CardMenu key={idx} newClass={"mx-5 my-5"}
                                                    cardName={data?.name}
                                                    cardPrice={data?.price}
                                                    cardImage={data?.image || empty}
                                                    cardDiscount={"10%"} />
                                            </Col>
                                        ))}
                                    </Row>
                                </Tab>
                                <Tab eventKey="noncoffee" title="Non Coffee">
                                    <Row class className="">
                                        {product.data?.map((data, idx) => (
                                            <Col key={String(data.id)} sm={12} md={4} onClick={() => productDetail(data.id)} style={{ cursor: 'pointer' }}>
                                                <CardMenu key={idx} newClass={"mx-5 my-5"}
                                                    cardName={data?.name}
                                                    cardPrice={data?.price}
                                                    cardImage={data?.image || empty}
                                                    cardDiscount={"10%"} />
                                            </Col>
                                        ))}
                                    </Row>
                                </Tab>
                                <Tab eventKey="foods" title="Foods">
                                    <Row class className="">
                                        {product.data?.map((data, idx) => (
                                            <Col key={String(data.id)} sm={12} md={4} onClick={() => productDetail(data.id)} style={{ cursor: 'pointer' }}>
                                                <CardMenu key={idx} newClass={"mx-5 my-5"}
                                                    cardName={data?.name}
                                                    cardPrice={data?.price}
                                                    cardImage={data?.image || empty}
                                                    cardDiscount={"10%"} />
                                            </Col>
                                        ))}
                                    </Row>
                                </Tab>
                                <Tab eventKey="addon" title="Add-On">
                                    <Row class className="">
                                        {product.data?.map((data, idx) => (
                                            <Col key={String(data.id)} sm={12} md={4} onClick={() => productDetail(data.id)} style={{ cursor: 'pointer' }}>
                                                <CardMenu key={idx} newClass={"mx-5 my-5"}
                                                    cardName={data?.name}
                                                    cardPrice={data?.price}
                                                    cardImage={data?.image || empty}
                                                    cardDiscount={"10%"} />
                                            </Col>
                                        ))}
                                    </Row>
                                </Tab>
                            </Tabs>
                            <div>
                                *the price has been cutted by discount appears
                            </div>
                            <div className='mb-5 mt-3'>
                                <Button onClick={() => goToNewProduct()} block variant='pallet-1 py-3 my-3 mb-5  radius' version={'input-normal'}> Add New Product </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </Layout>
    )
}

export default Product