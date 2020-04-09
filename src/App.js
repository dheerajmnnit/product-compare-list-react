
import React, { Component } from 'react';

import { Header } from './header';
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
    return (
      <main>
        <Header />
        <div className="tables-container">
          <CompareTable
            products={this.state.products}
          />
        </div>
      </main>
    );
  }
}

export default App;