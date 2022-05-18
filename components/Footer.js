import Image from 'next/image';
import { Row, Col } from 'react-bootstrap';
import styles from '../styles/Footer.module.css';
import { FaFacebookF, FaTwitter, FaYoutube, FaDribbble } from 'react-icons/fa';
import Link from 'next/link';
import { FiMail } from 'react-icons/fi';
import { BsTelephonePlus } from 'react-icons/bs';
import { RiTimer2Line } from 'react-icons/ri';

const Footer = ({fullFooter}) => {
  const company = [
    {name: 'ABOUT US', route: '/about-us'},
    {name: 'HELP CENTER', route: '/help-center'},
    {name: 'LICENCES', route: '/license'},
    {name: 'MARKET API', route: '/market'},
    {name: 'SITE-MAP', route: '/site-map'}
  ]
  const userfull = [
    {name: 'THE COLLECTIONS', route: '/collection'},
    {name: 'SIZE GUIDE', route: '/size-guide'},
    {name: 'LOOKBOOK', route: '/lookbook'},
    {name: 'INSTAGRAM SHOP', route: '/instagram-shop'}
  ]
  const contactUs = [
    {name: 'info@kopsyuk.com', route: '/', icon: FiMail},
    {name: '+6281245786512', route: '/', icon: BsTelephonePlus},
    {name: '9:00 am - 19:00 pm', route: '/', icon:RiTimer2Line},
  ]

  return (
    <footer className="bg-color1">
      <div className="container py-5 text-white">
        {fullFooter && 
        <>
        <p className={`text-center fs-4 mx-auto ${styles.font}`}>
          Gave 5 stars for excellent customer service. I had a couple of questions which they replied quickly to answer. 
          If I could give multiple reasons for my rating it would also be for the design quality and customization to go 
          along with the great service. The theme is excellent, keep up the great work.
        </p>
        <hr className='w-25 mx-auto my-5' />
        <div className='text-center fw-bold'>Trevor Rivera - CEO IKEA</div>
        <div className='row d-flex flex-row justify-content-between mt-5 mx-lg-5'>
          {[...Array(4)].map((data, idx) => {
            return (
              <div key={idx} className='col-6 col-lg-3 mt-5 mt-lg-1 text-center'>
                <Image src={`/images/Bitmap${idx + 1}.png`} width={110} height={90} alt='Partner' />
              </div>
            )
          })}
        </div>
        </>
        }
        <Row className='mt-5'>
          <Col xs={12} lg={4}>
            <Link href='/'>
              <a>
            <Image layout='intrinsic' alt='logo' src='/images/logo.png' width={80} height={80} />
            </a>
            </Link>
            <p className='mt-4'>Kopsyuk is an application for ordering drinks online.</p>
            <div className='d-flex flex-row'>
              <div className='border border-white rounded-pill px-2  text-center'>
                <FaFacebookF />
              </div>
              <div className='border border-white rounded-pill ms-lg-3 px-2 pb-1 text-center'>
                <FaTwitter/>
              </div>
              <div className='border border-white rounded-pill mx-lg-3 px-2 pb-1 text-center'>
                <FaYoutube/>
              </div>
              <div className='border border-white rounded-pill px-2 pb-1 text-center'>
                <FaDribbble/>
              </div>
            </div>
          </Col>
          <Col xs={12} lg={8}>
            <Row>
              <Col xs={12} lg={4} className='mt-4'>
                <h4>COMPANY</h4>
                <ul className='list-group'>
                  {company.map((data, index) => {
                    return(
                      <li key={index} className={`my-2 ${styles.list}`}>
                        <Link href={data.route}>
                          <a className='text-decoration-none text-white'>{data.name}</a>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </Col>
              <Col xs={12} lg={4} className='mt-4'>
                <h4>USERFUL</h4>
                <ul className='list-group'>
                  {userfull.map((data, index) => {
                    return(
                      <li key={index} className={`my-2 ${styles.list}`}>
                        <Link href={data.route}>
                          <a className='text-decoration-none text-white'>{data.name}</a>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </Col>
              <Col xs={12} lg={4} className='mt-4'>
                <h4>CONTACT US</h4>
                <ul className='list-group'>
                  {contactUs.map((data, index) => {
                    return(
                      <li key={index} className={`my-2 ${styles.list}`}>
                        <Link href={data.route}>
                          <a className='text-decoration-none text-white'><data.icon className='fs-4' /> {data.name}</a>
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </Col>
            </Row>
          </Col>
        </Row>
        <div className='text-center mt-5'>© 2022 Kopsyuk All rights reserved</div>
      </div>
    </footer>
  )
}

export default Footer;
