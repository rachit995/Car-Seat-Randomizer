import React, { useState, useEffect } from 'react'
import _ from 'lodash';
import './App.scss';
import { SHEET_ID } from './constants';
import { fetchData, shuffleArray, chunkify } from './helper';
import { FaRandom } from 'react-icons/fa'
import SeatPlan from './components/SeatPlan';
import { CircularProgress, Snackbar, Switch } from '@material-ui/core';
const SHEETS = {
  PASSENGER: 1,
  CAR: 2,
}
function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [passengers, setPassengers] = useState([])
  const [drivers, setDrivers] = useState([])
  const [uniform, setUniform] = useState(true)
  const [open, setOpen] = useState(false)
  const snackBarText = uniform ? "Switched to uniform distribution" : "Switched to random distribution"
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
      setIsLoading(false)
    })()
  }, [])
  const [shuffledPeople, setShuffledPeople] = useState([])
  useEffect(() => {
    setShuffledPeople(shuffleArray(chunkify(passengers, cars?.length, uniform)))
  }, [passengers, cars?.length, uniform])
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={snackBarText}
      />
      <div className='app__header'>
        <h1>
          Car Seat Randomizer
        </h1>
      </div>
      <center>
        <button
          type="primary"
          onClick={() => {
            setShuffledPeople(shuffleArray(chunkify(shuffleArray(passengers), cars?.length, uniform)))
          }}
          className="app__randomButton fadeInUp"
        >
          <FaRandom /> Randomize
        </button>
      </center>
      <div className='app__content'>
        <div className='app__row'>
          {
            isLoading ?
              <div className="app__col">
                <CircularProgress color="default" />
              </div>
              : cars?.map((car, index) => {
                const driver = _.find(drivers, { car: car?.car })
                return (
                  <div
                    key={car?.car}
                    className="app__col fadeInUp"
                    style={{ animationDelay: `${0.3 + index * 0.1}s` }}
                  >
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
      <div className='app__uniformSwitch'>
        <Switch
          checked={uniform}
          color='secondary'
          onChange={() => {
            setOpen(true)
            setUniform(!uniform)
          }}
        />
      </div>
    </div>
  );
}

export default App;
