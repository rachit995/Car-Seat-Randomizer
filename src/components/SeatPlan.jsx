import React from 'react'
import './SeatPlan.scss'
import steeringWheel from '../assets/images/car-steering-wheel.svg'

function Text({ children }) {
  return <p key={children} className='fade'>{children}</p>
}

function SeatPlan({
  seater,
  driver,
  passengers,
  car
}) {
  let seat1 = '',
    seat2 = '',
    seat3 = '',
    seat4 = ''
  switch (seater) {
    case "5":
      seat1 = passengers?.[0]?.name
      seat2 = passengers?.[1]?.name
      seat3 = passengers?.[2]?.name
      seat4 = passengers?.[3]?.name
      return (
        <div className='seatPlan__car'>
          <h4 className='seatPlan__carName'>
            {car?.name}
          </h4>
          <div className='seatPlan__row'>
            <div className={`seatPlan__seat frontLeft ${seat1 ? null : 'empty'}`}>
              <Text>
                {seat1}
              </Text>
            </div>
            <div className='seatPlan__spacer'>
              <img src={car?.image} alt='steering wheel' className='seatPlan__carLogo' />
            </div>
            <div className='seatPlan__seat frontRight driver'>
              <div>
                <img src={steeringWheel} alt='steering wheel' className='seatPlan__steeringWheel' />
                <br />
                {driver?.name}
              </div>
            </div>
          </div>
          <div className='seatPlan__row'>
            <div className={`seatPlan__seat rearLeft ${seat2 ? null : 'empty'}`}>
              <Text>
                {seat2}
              </Text>
            </div>
            <div className={`seatPlan__seat rearCenter ${seat3 ? null : 'empty'}`}>
              <Text>
                {seat3}
              </Text>
            </div>
            <div className={`seatPlan__seat rearRight ${seat4 ? null : 'empty'}`}>
              <Text>
                {seat4}
              </Text>
            </div>
          </div>
        </div>
      )
    default: return ('')
  }
}

export default SeatPlan
