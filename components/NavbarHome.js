import Link from "next/link";
import Image from 'next/image'
import styles from '../styles/NavbarHome.module.css'
import { useRouter } from "next/router";
import { BiSearchAlt2, BiHeart, BiCartAlt } from 'react-icons/bi';
import { useDispatch, useSelector } from "react-redux";
import Button from "../components/Button"
import { useEffect, useState } from "react";
// import { logout } from "../redux/actions/auth";

const NavbarHome = () => {
  const route = useRouter();
  const dispatch = useDispatch()
  const [userToken, setUserToken] = useState()


  const searchBtn = (e) => {
    e.preventDefault()
    const input = document.getElementById('formSearch')
    if (input.style.display === 'block') {
      input.style.display = 'none'
    } else {
    input.style.display = 'block'
    }
  }

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-color1">
      <div className={`container ${styles.layout}`}>
        <Link href='/'>
          <a>
            <Image layout='intrinsic' alt='logo' src='/images/Logo.png' width={100} height={100} />
          </a>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto my-0 my-lg-auto align-items-lg-center mb-2 mb-lg-0">
            <li className="nav-item">
              <Link href='/'>
                <a className={`${route.pathname === '/' && 'active'}nav-link fw-bold fs-5`} aria-current="page">HOME</a>
              </Link>
            </li>
            <li className="nav-item dropdown ms-lg-3">
              <Link href='/'>
                <a className="nav-link dropdown-toggle fw-bold fs-5" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  PAGES
                </a>
              </Link>
              <ul className={`${styles.pages} dropdown-menu bg-color1`} aria-labelledby="navbarDropdown">
                <li>
                  <Link href='/product'>
                  <a className="">Product</a>
                  </Link>
                </li>
                <li>
                  <Link href='/contact-us'>
                  <a className="">Contact US</a>
                  </Link>
                </li>
                <li>
                  <Link href='/faq'>
                  <a className="">FAQ Page</a>
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link href='/blog'>
                <a className="fw-bold fs-5">
                  BLOG
                </a>
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li  onClick={searchBtn} className="nav-item d-flex flex-row align-items-center">
              <button className="btn" type="submit">
                <BiSearchAlt2 className="fs-2 text-white"/>
              </button>
              <form id="formSearch" className={styles.formSearch}>
                <input type='text' className="form-control bg-white text-dark text-center" />
              </form>
            </li>
            <li className="nav-item">
              <Link href='/favorite'>
              <button className="btn position-relative ms-lg-1">
                <BiHeart className="fs-2 text-white"/>
                <div className={`bg-white position-absolute text-white rounded-circle ${styles.notif}`}>0</div>
              </button>
              </Link>
            </li>
            <li className="nav-item">
            <Link href='/cart'>
              <button className="btn position-relative mx-lg-1">
                <BiCartAlt className="fs-2 text-white"/>
                <div className={`bg-white position-absolute text-white rounded-circle ${styles.notif}`}>0</div>
              </button>
              </Link>
             
            </li>
            <li className="nav-item dropdown ms-lg-3">
              <Link href='/'>
                <a className="nav-link fw-bold fs-5" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                <Image src='/images/menu.png' layout='intrinsic' alt='menu' width={25} height={25} />
                </a>
              </Link>
              {userToken !== null && 
              <ul className={`${styles.menu} dropdown-menu bg-color1`} aria-labelledby="navbarDropdown">
                <li>
                  <Link href='/profile'>
                  <a className="">Profile</a>
                  </Link>
                </li>
                <li>
                  <Link href='/chat'>
                  <a className="">Chat</a>
                  </Link>
                </li>
                <li>
                  <Link href='/notification'>
                  <a className="">Notification</a>
                  </Link>
                </li>
                {/* <li>
                  <Link href='/'>
                  <a className=""><div onClick={logoutHandler}>Logout</div></a>
                  </Link>
                </li> */}
              </ul>}
              {userToken === null && 
              <ul className={`${styles.menu} dropdown-menu bg-color1`} aria-labelledby="navbarDropdown">
                <li>
                  <Link href='/login-register'>
                  <a className="">Login</a>
                  </Link>
                </li>
                <li>
                  <Link href='/login-register'>
                  <a className="">Register</a>
                  </Link>
                </li>
                <li>
                  <Link href='/chat'>
                  <a className="">Chat</a>
                  </Link>
                </li>
                <li>
                  <Link href='/notification'>
                  <a className="">Notification</a>
                  </Link>
                </li>
              </ul>}
            </li>
          </ul>
        </div>
      </div>
    </nav>
   </>
  )
}

export default NavbarHome;
