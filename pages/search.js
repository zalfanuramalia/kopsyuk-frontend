import React, { useEffect, useState } from 'react'
import { Container, Row, Col, Tabs, Tab } from 'react-bootstrap'
import empty from '../public/images/empty-input-image.png'
import NavbarHome from '../components/NavbarHome'
import Footer from '../components/Footer'
import CardMenu from '../components/CardMenu'
import { connect } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import Button from '../components/Button'
import { FaSearch, FaChevronRight, FaChevronLeft } from 'react-icons/fa'
import http from '../helpers/http'
import Layout from '../components/Layout'
import { useRouter } from 'next/router'

const Search = () => {
    const [product, setProduct] = useState([])
    const [page, setPage] = useState({})
    // const dataa = Array.from(product)
    const [errorMsg, setErrorMsg] = useState(null)
    // const navigate = useNavigate()
    const router = useRouter()
    // let [searchParams, setSearchParams] = useSearchParams();
    useEffect(() => {
        getProductSearch(`/product?limit=6`)
    }, [])

    const getProductSearch = async (url) => {
        const { data } = await http().get(url)
        setProduct(data?.result)
        setPage(data?.pageInfo)
    }

    const getNextData = async (url, replace = false) => {
        try {
            setErrorMsg(null)
            const { data } = await http().get(url)
            if (replace) {
                if (!Array.isArray(data.results)) {
                    data.results = [data.results]
                }
                setProduct(data?.results)
            } else {
                setProduct([
                    ...data.results
                ])
            }
            setPage(data.pageInfo)
        } catch (e) {
            if (e.message.includes('404')) {
                setErrorMsg('Data not found!')
                setProduct([])
                setPage({
                    next: null
                })
            }
        }
    }
    const onSearch = async (event) => {
        event.preventDefault();
        const url = () => `/product?search=${search}&limit=6`
        const search = event.target.elements["search"].value
        await getNextData(url(search), true)
    }

    const goToDetail = (id) => {
        router.push(`product/${[id]}`)
    }
    
    return (
        <Layout>
            <section>
                <Container>
                    <Row className='mb-5'>
                        <Col sm={12}>
                            <header>
                                <div className="row">
                                    <div className="col-xl-12 d-flex for-margin-search ">
                                        <form id='search' onSubmit={onSearch} className="border-brown input-group mb-3 rounded mx-auto button-type-name ">
                                            <input name="search" type="text" className="btn-search-type form-control bg-transparent col-12 col-lg-3"
                                                placeholder="Search Name" />
                                            <button className="btn " type="submit" id="button-addon2"><FaSearch /></button>
                                        </form>
                                    </div>
                                </div>
                            </header>
                        </Col>
                        <Col sm={12} className="border-start border-end">
                            <Tabs
                                defaultActiveKey="home"
                                transition={false}
                                id="noanim-tab-example"
                                className="mb-3 bg-white text-pallet-1"
                                rounded
                            >
                                <Tab eventKey="home" title="Search">
                                    <Row class className="">
                                        {errorMsg &&
                                            <div className="alert alert-warning fade show" role="alert">
                                                <strong>{errorMsg}</strong>
                                            </div>
                                        }
                                        <Col sm={12} className=' d-flex justify-content-end'>
                                            <div >
                                                {page.prev !== null && <button onClick={() => getNextData(page.prev)} className='btn '><p><FaChevronLeft />View Prev </p></button>}
                                                {page.next !== null && <button onClick={() => getNextData(page.next)} className='btn '><p>View Next <FaChevronRight /></p></button>}
                                            </div>
                                        </Col>
                                        {product?.map((data, idx) => {
                                            return (
                                                <Col key={String(data.id)} sm={12} md={4} onClick={() => goToDetail(data.id)} style={{ cursor: 'pointer' }}>
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
                            </Tabs>
                            <div>
                                *the price has been cutted by discount appears
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
            <Footer />
        </Layout>
    )
}


export default Search