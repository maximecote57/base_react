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
        this.productsContainer = null;
        this.lazyLoadTriggerPosition = null;
        this.consumer_key = 'ck_d4eb559b025f8e28c9b5defc99fa7447fad93f53';
        this.consumer_password = 'cs_2c1f842b775ad46c44ced6dbebea174e3068edc7';
        this.hideFiltersWithNoItems = true;
        this.allowMultipleFilters = true;
        this.lazyLoadCurrentOffset = 0;
        this.maxNbOfProducts = 30;
        this.lazyLoadConfig = {
            isActive: false,
            nbOfItemsPerLoad: 30
        };
        this.state = {
            products: [],
            productsCategories: [],
            activeProductsCategories: [],
            categoriesOfLoadedProducts: [],
            areProductsLoading: false,
            areProductsCategoriesLoading: false
        }

    }

    getCategoriesInProducts = (products) => {

        let categoriesInProducts = [];

        products.map((product) => {
            if(product.categories.length > 0) {
                categoriesInProducts.push(product.categories[0].id)
            }
        });

        return categoriesInProducts;

    };

    getProductsCategories = () => {

        this.setState({
            areProductsCategoriesLoading: true
        });

        fetch('https://adriengagnon.com/wp-json/wc/v2/products/categories?consumer_key=' + this.consumer_key + "&consumer_secret=" + this.consumer_password)
            .then(response => response.json())
            .then((productsCategories) => {
                    this.setState({
                        productsCategories,
                        areProductsCategoriesLoading: false
                    })
                }
            )

    };

    getProducts = () => {

        const lazyLoadConfig = this.lazyLoadConfig;

        this.setState({
            areProductsLoading: true
        });

        let fetchUrl = 'https://adriengagnon.com/wp-json/wc/v2/products?consumer_key=' + this.consumer_key + "&consumer_secret=" + this.consumer_password;

        if(lazyLoadConfig.isActive) {
            fetchUrl = fetchUrl + "&per_page=" + this.lazyLoadConfig.nbOfItemsPerLoad + "&offset=" + this.lazyLoadCurrentOffset
        }
        else {
            fetchUrl = fetchUrl + "&per_page=" + this.maxNbOfProducts;
        }

        fetch(fetchUrl)
            .then(response => response.json())
            .then((products) => {

                    const newProducts = [...this.state.products, ...products];

                    if(lazyLoadConfig.isActive) {
                        this.lazyLoadCurrentOffset = this.lazyLoadCurrentOffset + this.lazyLoadConfig.nbOfItemsPerLoad;
                        document.addEventListener('scroll', this.handleScroll);
                    }

                    this.setState({
                        products: newProducts,
                        categoriesOfLoadedProducts : this.getCategoriesInProducts(newProducts),
                        areProductsLoading: false
                    })

                }
            )

    };


    componentDidMount = () => {

        this.getProducts();
        this.getProductsCategories();

    };

    componentDidUpdate = () => {

        if(this.lazyLoadConfig.isActive) {
            this.lazyLoadTriggerPosition = (this.productsContainer.offsetTop + this.productsContainer.offsetHeight) * 0.75
        }

    };

    handleScroll = (e) => {

        if(window.scrollY >= this.lazyLoadTriggerPosition) {
            document.removeEventListener('scroll', this.handleScroll);
            this.getProducts();
        }

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

    getFilteredProducts = () => {

        let filteredProducts = [];

        this.state.products.map((product) => {
            const productCategories = product.categories;
            let productMainCategoryId = null;
            if(productCategories.length > 0) {
                productMainCategoryId = productCategories[0].id;
            }
            if(this.state.activeProductsCategories.length == 0 || this.state.activeProductsCategories.indexOf(productMainCategoryId) !== -1 ) {
                filteredProducts.push(product);
            }
        })

        return filteredProducts;

    }

    render() {

        const products = this.state.products;
        const productsCategories = this.state.productsCategories;
        const activeProductsCategories = this.state.activeProductsCategories;
        const categoriesOfLoadedProducts = this.state.categoriesOfLoadedProducts;
        const areProductsLoading = this.state.areProductsLoading;
        const areProductsCategoriesLoading = this.state.areProductsCategoriesLoading;
        const filteredProducts = this.getFilteredProducts();

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
                            {(productsCategories.length === 0 && areProductsCategoriesLoading) &&
                                <div><FormattedMessage id="products.loading-products-categories" default="Loading products categories"/></div>
                            }
                            {(productsCategories.length === 0 && !areProductsCategoriesLoading) &&
                                <div><FormattedMessage id="products.no-products-categories" default="No products categories."/></div>
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
                                    else if(categoriesOfLoadedProducts.indexOf(productsCategory.id) !== -1) {
                                        showFilter = true;
                                    }
                                    else if(categoriesOfLoadedProducts.length === 0) {
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
                        <div className="products__products-container" ref={(productsContainer) => this.productsContainer = productsContainer}>
                            <div className="products__products-row">
                                {(filteredProducts.length > 0) &&
                                    filteredProducts.map((product) => {
                                        return (
                                            <div className="products__products-row-item" key={product.id}>
                                                <div className="products__product-container">
                                                    <img className="products__product-img" src={product.images[0].src}/>
                                                    <h3 className="products__product-title">{product.name}</h3>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                {areProductsLoading &&
                                    <div><FormattedMessage id="products.loading-products" default="Loading products..."/></div>
                                }
                                {!areProductsLoading && filteredProducts.length === 0 &&
                                    <div><FormattedMessage id="products.no-products" default="No products"/></div>
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