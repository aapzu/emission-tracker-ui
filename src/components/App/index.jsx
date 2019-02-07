import React, { useState } from 'react'
import { Container, Row, Col } from 'react-grid-system'

import Search from '../Search'
import Graph from '../Graph'

const App = () => {
    const [country, setCountry] = useState('Finland')
    const [perCapita, setPerCapita] = useState(false)

    return (
        <Container>
            <Row>
                <Col
                    md={8}
                    lg={6}
                    offset={{
                        md: 2,
                        lg: 3,
                    }}
                >
                    <h1>CO<sup>2</sup> emissions</h1>
                </Col>
            </Row>
            <Row>
                <Col
                    md={8}
                    lg={6}
                    offset={{
                        md: 2,
                        lg: 3,
                    }}
                >
                    <Search onChange={setCountry} onPerCapitaChange={(val) => setPerCapita(val)} />
                </Col>
            </Row>
            <Row>
                <Col
                    md={8}
                    lg={6}
                    offset={{
                        md: 2,
                        lg: 3,
                    }}
                >
                    <Graph country={country} perCapita={perCapita} />
                </Col>
            </Row>
        </Container>
    )
}

export default App
