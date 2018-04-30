/*

    Options

    hideFiltersWithNoItems (boolean)
    Filters with no items in the list should be hidden

    allowMultipleFilters (boolean)
    Set to true to allow multiple filters at once


 */

import React from "react";
import { injectIntl, FormattedMessage } from 'react-intl';

import "./_products.scss";

class Products extends React.Component {

    constructor() {

        super();
        this.consumer_key = 'ck_d4eb559b025f8e28c9b5defc99fa7447fad93f53';
        this.consumer_password = 'cs_2c1f842b775ad46c44ced6dbebea174e3068edc7';
        this.hideFiltersWithNoItems = true;
        this.allowMultipleFilters = true;
        this.state = {
            products: null,
            productsCategories: null,
            activeProductsCategories: [],
            categoriesInLoadedProducts: []
        }

    }

    componentDidMount = () => {


        fetch('https://adriengagnon.com/wp-json/wc/v2/products/categories?consumer_key=' + this.consumer_key + "&consumer_secret=" + this.consumer_password + "&per_page=30")
            .then(response => response.json())
            .then((productsCategories) => {
                    this.setState({productsCategories})
                }
            )

        fetch('https://adriengagnon.com/wp-json/wc/v2/products?consumer_key=' + this.consumer_key + "&consumer_secret=" + this.consumer_password + "&per_page=30")
            .then(response => response.json())
            .then((products) => {
                    let categoriesInLoadedProducts = [];
                    products.map((product) => {
                        if(product.categories.length > 0) {
                            categoriesInLoadedProducts.push(product.categories[0].id)
                        }
                    })
                    this.setState({
                        products,
                        categoriesInLoadedProducts
                    })
                }
            )
    };

    handleClickFilter = (filterId) => {

        let activeProductsCategories = this.state.activeProductsCategories;
        const indexOfFilterId = activeProductsCategories.indexOf(filterId);

        if(indexOfFilterId !== -1) {
            activeProductsCategories.splice(indexOfFilterId, 1);
        }
        else {
            if(!this.allowMultipleFilters) {
                activeProductsCategories = [];
            }
            activeProductsCategories.push(filterId);
        }

        this.setState({activeProductsCategories})

    }

    render() {

        const products = this.state.products;
        const productsCategories = this.state.productsCategories;
        const activeProductsCategories = this.state.activeProductsCategories;
        const categoriesInLoadedProducts = this.state.categoriesInLoadedProducts;

        return (
            <div className="products component">
                <div className="container">
                    <div className="page-title">
                        <h1>
                            <FormattedMessage id="products.title" default="Products"/>
                        </h1>
                    </div>
                    <div>
                        <p>
                            <FormattedMessage id="products.description" default="Description"/>
                        </p>
                    </div>
                    <div className="products__container">
                        <div className="products__filters-container">
                            <h2 className="products__filters-title"><FormattedMessage id="generic.filters" default="Filters"/></h2>
                            {!productsCategories &&
                                <div><FormattedMessage id="products.loading-products-categories" default="Loading products categories"/></div>
                            }
                            {(productsCategories && productsCategories.length > 0) &&
                                productsCategories.map((productsCategory) => {

                                    let showFilter = false;

                                    if(!this.hideFiltersWithNoItems) {
                                        showFilter = true;
                                    }
                                    else if(!products) {
                                        showFilter = true;
                                    }
                                    else if(categoriesInLoadedProducts.indexOf(productsCategory.id) !== -1) {
                                        showFilter = true;
                                    }
                                    else if(categoriesInLoadedProducts.length === 0) {
                                        showFilter = true;
                                    }

                                    if(showFilter) {
                                        return (
                                            <div className={"products__filters-item " +  (activeProductsCategories.indexOf(productsCategory.id) !== -1 ? 'is-active' : '')} key={productsCategory.id} onClick={this.handleClickFilter.bind(this, productsCategory.id)}>
                                                <h3>{productsCategory.name}</h3>
                                            </div>
                                        )
                                    }
                                })
                            }
                        </div>
                        <div className="products__products-container">
                            <div className="products__products-row">
                                {!products &&
                                    <div><FormattedMessage id="products.loading-products" default="Loading products..."/></div>
                                }
                                {(products && products.length === 0) &&
                                    <div><FormattedMessage id="products.no-products" default="No products"/></div>
                                }
                                {(products && products.length > 0) &&
                                    products.map((product) => {
                                        const productCategories = product.categories;
                                        let productMainCategoryId = null;
                                        if(productCategories.length > 0) {
                                            productMainCategoryId = productCategories[0].id;
                                        }
                                        if(activeProductsCategories.length == 0 || activeProductsCategories.indexOf(productMainCategoryId) !== -1 ) {
                                            return (
                                                <div className="products__products-row-item" key={product.id}>
                                                    <div className="products__product-container">
                                                        <img className="products__product-img" src={product.images[0].src}/>
                                                        <h3 className="products__product-title">{product.name}</h3>
                                                    </div>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default injectIntl(Products);