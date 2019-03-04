import React, { useState } from 'react'
import { Container, Row, Col } from 'react-grid-system'

import Search from '../Search'
import Graph from '../Graph'

import styles from './app.pcss'
import PerCapitaCheckbox from '../PerCapitaCheckbox'

const App = () => {
    const [country, setCountry] = useState('Finland')
    const [perCapita, setPerCapita] = useState(false)

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
