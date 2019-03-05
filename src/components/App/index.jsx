import React, { useState } from 'react'
import classnames from 'classnames'
import MediaQuery from 'react-responsive'

import Search from '../Search'
import Graph from '../Graph'

import styles from './app.pcss'
import PerCapitaCheckbox from '../PerCapitaCheckbox'

const { CACHE_KEY } = process.env

let cache = {}
if (typeof window.localStorage !== 'undefined') {
    cache = JSON.parse(window.localStorage.getItem(CACHE_KEY))
}
const setToCache = (country, perCapita) => {
    if (typeof window.localStorage !== 'undefined') {
        window.localStorage.setItem(CACHE_KEY, JSON.stringify({
            country,
            perCapita,
        }))
    }
}

const App = () => {
    const [country, setCountryToState] = useState((cache && cache.country) || 'Finland')
    const [perCapita, setPerCapitaToState] = useState((cache && cache.perCapita) || false)

    const setCountry = (c) => {
        setCountryToState(c)
        setToCache(c, perCapita)
    }

    const setPerCapita = (p) => {
        setPerCapitaToState(p)
        setToCache(country, p)
    }

    return (
        <div className="container">
            <div className={classnames('row', styles.app)}>
                <div className="col-md-10 offset-md-1">
                    <div className="row">
                        <MediaQuery maxWidth={575}>
                            <div className="col-12">
                                <Search onChange={setCountry} />
                            </div>
                        </MediaQuery>
                        <div className="col-md-8">
                            <h1 className={styles.title}>CO<sup>2</sup> emissions of {country}</h1>
                        </div>
                        <MediaQuery minWidth={576}>
                            <div className="col-md-4">
                                <Search onChange={setCountry} />
                            </div>
                        </MediaQuery>
                        <div className="col-12">
                            <PerCapitaCheckbox perCapita={perCapita} onChange={setPerCapita} />
                        </div>
                    </div>
                    <div className="row">
                        <div
                            className="col-12"
                            style={{
                                padding: '15px 0 10px',
                            }}
                        >
                            <Graph country={country} perCapita={perCapita} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App
