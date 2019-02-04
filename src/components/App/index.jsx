// @flow

import React, { useState } from 'react'
import { Container, Row, Col } from 'react-grid-system'
import Search from '../Search'

const App = () => {
    const [country, setCountry] = useState(null)

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
                    <Search onChange={setCountry} />
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
                    <div>{country}</div>
                </Col>
            </Row>
        </Container>
    )
}

export default App
