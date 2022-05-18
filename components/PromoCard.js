import Image from 'next/image'
import React from 'react'
import editIcon from '../public/images/edit-icon.png'

const PromoCard = ({ isEditable = false, data, image }) => {
  return (
    <div className='shadow container promo-card bg-pallet-3 d-flex flex-column justify-content-around py-5 text-center'>
      <div className='d-flex justify-content-center'>
        <div className='position-relative promo-image-container'>
          {image &&
            <Image className='img-fluid circle-image' src={image} width={100} height={100} alt='promo' />
          }
          {!image &&
            <div className='no-image circle-image'>No Image</div>
          }
          {isEditable &&
            <div className='edit-icon-container'>
              <Image className='img-fluid edit-icon' src={data?.image || editIcon} width={100} height={100} alt='edit' />
            </div>
          }
        </div>
      </div>
      <div className='row'>
        <h1>{data?.name || "Green Tea"}</h1>
        <h1>{data?.discountValue || "20"}% OFF</h1>
      </div>
      <div className='row'>
        <p>{data?.description || "Buy 1 Green Tea and get 20% off for Black Coffee"}</p>
      </div>
      <div className='dash-line'></div>
      <div>
        <p>COUPON CODE</p>
        <h1>{data?.promoCode || "#JASFI12F21"}</h1>
      </div>
      <div>
        <p>Valid until {data?.dateEnd}</p>
      </div>
    </div>
  )
}

export default PromoCard