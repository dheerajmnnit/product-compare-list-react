import React, { Component } from 'react';

import { CompareTable } from './Components/compare-table';

class App extends Component {
    state = {
        products: []
    }
    componentDidMount() {
        fetch('http://www.mocky.io/v2/5e86ec5531000011d8814754')
            .then(res => res.json())
            .then((data) => {
                this.setState({ products: data })
            })
            .catch(console.log)
    }
    render() {
        const { products } = this.state;
        return (
            <main>
                <div className="tables-container">
                    {products.products ? <CompareTable
                        products={products.products}
                    /> : null}
                </div>
            </main>
        );
    }
}

export default App;