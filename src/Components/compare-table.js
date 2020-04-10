import React from 'react';

import './compare-table.scss';

export class CompareTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            productKeys: [],
            activeProduct: null,
            isFeatureDifferent: false
        };
    }

    componentDidMount = () => {
        if (this.props.products) {
            let keys = this.getproductKeys(this.props.products.compareSummary.titles);
            this.setState({ productKeys: keys });
            this.titelOptions(this.props.products.compareSummary.titles, keys)
        }

    }

    getproductKeys = (data) => {
        let productKeys = [];
        for (var a in data) {
            productKeys.push(a);
        }

        return productKeys;
    }
    printImage = (data, key) => {
        if (key) {
            return <div className="image-block">
                <img className="img" src={data[key]} alt="" />
            </div>
        }
    }
    printTitel = (data, key) => {
        if (key) {
            return <div className="product-name">
                {data[key].title}
            </div>
        }

    }
    printPrice = (data, key) => {
        if (key) {
            return <div className="product-price">
                {data[key].finalPrice}
                <strike className="">{data[key].price}</strike>
            </div>
        }
    }

    titelOptions = (data, keys) => {
        if (keys) {
            var select = document.getElementById("custom-select");
            select.options[select.options.length] = new Option("Choose a product", "");
            keys.forEach((key) => {
                select.options[select.options.length] = new Option(data[key].title, key);
            })
        }
    }

    handelClick = () => {
        var select = document.getElementById("custom-select");
        console.log("Text: " + select.options[select.selectedIndex].text + "\nValue: " + select.options[select.selectedIndex].value);
        this.setState({ activeProduct: select.options[select.selectedIndex].value })
    }

    render() {
        const products = this.props;
        const { productKeys, activeProduct, isFeatureDifferent } = this.state;

        return (
            products.products ?
                <div className="product-compare-wrapper">
                    <div className="upper-block">
                        <div className="heading-section">
                            <div className="heading-text-block">
                                <span className="heading">Compare</span>
                                <span className="sub-heading">1 item selected</span>
                            </div>
                            <div>
                                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike" onClick={(e) => this.setState({ isFeatureDifferent: e.target.checked })} />
                                <label >Show only differences</label>
                            </div>
                        </div>
                        <div className="product-section">
                            {
                                this.printImage(products.products.compareSummary.images, productKeys[0])
                            }
                            <div className="name-price">
                                {
                                    this.printTitel(products.products.compareSummary.titles, productKeys[0])
                                }
                                {
                                    this.printPrice(products.products.compareSummary.productPricingSummary, productKeys[0])
                                }
                            </div>
                        </div>
                        {
                            activeProduct ?
                                <div className="product-section">
                                    {
                                        this.printImage(products.products.compareSummary.images, activeProduct)
                                    }
                                    {
                                        this.printTitel(products.products.compareSummary.titles, activeProduct)
                                    }
                                    {
                                        this.printPrice(products.products.compareSummary.productPricingSummary, activeProduct)
                                    }
                                </div>
                                :
                                <div className="product-add-section">
                                    <div className="product-blank-image"></div>
                                    <div>Add a product</div>
                                    <select className="custom-select" id="custom-select" onChange={this.handelClick}></select>
                                </div>
                        }
                    </div>
                    <div className="lower-block">
                        {
                            products.products.featuresList.map((data, key) => {
                                return <table>
                                    <tr>
                                        <th>{data.title}</th>
                                        <th></th>
                                        <th></th>
                                    </tr>
                                    {data.features.map((feature) => {

                                        if (isFeatureDifferent) {
                                            if (feature.values[productKeys[0]] !== feature.values[activeProduct]) {
                                                return <tr>
                                                    <td>{feature.featureName}</td>
                                                    <td>{feature.values[productKeys[0]]}</td>
                                                    <td>{activeProduct ? feature.values[activeProduct] : ""}</td>
                                                </tr>
                                            }
                                        } else {
                                            return <tr>
                                                <td>{feature.featureName}</td>
                                                <td>{feature.values[productKeys[0]]}</td>
                                                <td>{activeProduct ? feature.values[activeProduct] : ""}</td>
                                            </tr>
                                        }


                                    })
                                    }

                                </table>
                            })
                        }
                    </div>
                </div>
                :
                null
        );
    }
}