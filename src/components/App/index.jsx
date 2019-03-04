import React, { useState } from 'react'
import { Container, Row, Col } from 'react-grid-system'

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
        <Container>
            <Row className={styles.titleRow}>
                <Col
                    md={8}
                    lg={8}
                    offset={{
                        md: 2,
                        lg: 2,
                    }}
                >
                    <Row>
                        <Col md={8} lg={8}>
                            <h1 className={styles.title}>CO<sup>2</sup> emissions of {country}</h1>
                        </Col>
                        <Col md={8} lg={4}>
                            <Search onChange={setCountry} />
                        </Col>
                        <Col>
                            <PerCapitaCheckbox perCapita={perCapita} onChange={setPerCapita} />
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            style={{
                                padding: '15px 0 10px',
                            }}
                        >
                            <Graph country={country} perCapita={perCapita} />
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default App
