import { useRouter } from "next/router";
import Footer from "./Footer";
import styles from '../styles/NavbarHome.module.css';
import { useSelector } from "react-redux";
import { useEffect } from "react";
import NavbarHome from "./NavbarHome";

const Layout = ({children, fullFooter}) => {
  const {isLoading} = useSelector(state => state.pages)
  const route = useRouter();

  useEffect(()=>{
    const body = document.getElementsByTagName('body')
    if(isLoading){
      body.className = 'position-relative overflow-hidden'
    } else {
      body.className = ''
    }
  }, [isLoading])

  return (
    <div>
      <NavbarHome/>
      <div className={styles.contain}>
        {children}      
      </div>
      <Footer fullFooter={fullFooter}/>
    </div>
  )
}

export default Layout;
