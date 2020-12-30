import React, { useState, useEffect } from 'react'
import _ from 'lodash';
import './App.scss';
import { SHEET_ID } from './constants';
import { fetchData, shuffleArray, chunkify } from './helper';
import { FaRandom } from 'react-icons/fa'
import SeatPlan from './components/SeatPlan';
const SHEETS = {
  PASSENGER: 1,
  CAR: 2,
}
function App() {
  const [passengers, setPassengers] = useState([])
  const [drivers, setDrivers] = useState([])
  const [cars, setCars] = useState([])
  useEffect(() => {
    ; (async () => {
      const db = await fetchData({
        sheet: SHEET_ID,
        tabs: SHEETS,
      })
      const tempPassengers = _.filter(db?.PASSENGER, { type: 'passenger' })
      const tempDrivers = _.filter(db?.PASSENGER, { type: 'driver' })
      const tempCars = db?.CAR
      setPassengers(tempPassengers)
      setDrivers(tempDrivers)
      setCars(tempCars)
    })()
  }, [])
  const [shuffledPeople, setShuffledPeople] = useState([])
  useEffect(() => {
    setShuffledPeople(shuffleArray(chunkify(passengers, cars?.length, true)))
  }, [passengers, cars?.length])
  return (
    <div>
      <div className='app__header'>
        <h1>
          Car Seat Randomizer
        </h1>
      </div>
      <center>
        <button
          type="primary"
          onClick={() => {
            setShuffledPeople(shuffleArray(chunkify(shuffleArray(passengers), cars?.length, true)))
          }}
          className="app__randomButton"
        >
          <FaRandom /> Randomize
        </button>
      </center>
      <div className='app__content'>
        <div className='app__row'>
          {
            cars?.map((car, index) => {
              const driver = _.find(drivers, { car: car?.car })
              return (
                <div span={12} key={car?.car} className="app__col">
                  <SeatPlan
                    seater={car?.seater}
                    car={car}
                    driver={driver}
                    passengers={shuffledPeople[index]}
                  />
                </div>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}

export default App;
