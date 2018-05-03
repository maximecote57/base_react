/*

    Options

    hideFiltersWithNoItems (boolean)
    Filters with no items in the list should be hidden

    allowMultipleFilters (boolean)
    Set to true to allow multiple filters at once


 */

import React from "react";
import { injectIntl, FormattedMessage } from 'react-intl';
import Pager from "../sections/Pager";
import Dropdown from "../sections/Dropdown"

import "./_products.scss";

class Products extends React.Component {

    constructor() {

        super();
        this.nbOfProductsPerPage = 10;
        this.isLazyLoadActive = false;
        this.lazyLoadTriggerPositionOffset = 1000;
        this.hideFiltersWithNoItems = false;
        this.allowMultipleFilters = true;
        this.sortPerPageOptions = [10,25,50];
        this.consumer_key = 'ck_d4eb559b025f8e28c9b5defc99fa7447fad93f53';
        this.consumer_password = 'cs_2c1f842b775ad46c44ced6dbebea174e3068edc7';
        this.baseApiURLProducts = 'https://adriengagnon.com/wp-json/wc/v2/products?consumer_key=' + this.consumer_key + "&consumer_secret=" + this.consumer_password;
        this.baseApiURLProductsCategories = 'https://adriengagnon.com/wp-json/wc/v2/products/categories?consumer_key=' + this.consumer_key + "&consumer_secret=" + this.consumer_password + "&per_page=100";

        this.productsContainer = null;
        this.currentOffset = 0;
        this.lazyLoadTriggerPosition = null;

        this.state = {
            products: [],
            productsCategories: [],
            activeProductsCategories: [],
            categoriesOfLoadedProducts: [],
            areProductsLoading: false,
            areProductsCategoriesLoading: false
        }

    }

    getCategoriesOfLoadedProducts = (products) => {

        let categoriesInProducts = [];

        products.map((product) => {
            if(product.categories && product.categories.length > 0) {
                categoriesInProducts.push(product.categories[0].id)
            }
        });

        return [...(new Set(categoriesInProducts))];

    };

    getProductsCategories = () => {

        this.setState({
            areProductsCategoriesLoading: true
        });

        fetch(this.baseApiURLProductsCategories)
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

        const apiURLProducts = this.baseApiURLProducts + "&offset=" + this.currentOffset + "&per_page=" + this.nbOfProductsPerPage;

        this.setState({
            areProductsLoading: true
        });

        console.log('loading products from ', this.currentOffset, ' to ', this.currentOffset + this.nbOfProductsPerPage)

        fetch(apiURLProducts)
            .then((response) => response.json())
            .then((products) => {

                    const updatedProducts = [...this.state.products, ...products];

                    if(this.isLazyLoadActive) {
                        document.addEventListener('scroll', this.handleScroll);
                    }

                    this.setState({
                        products: updatedProducts,
                        categoriesOfLoadedProducts : this.getCategoriesOfLoadedProducts(updatedProducts),
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

        if(this.isLazyLoadActive) {
            this.lazyLoadTriggerPosition = (this.productsContainer.offsetTop + this.productsContainer.offsetHeight) - this.lazyLoadTriggerPositionOffset
        }

    };

    handleScroll = (e) => {

        if(window.scrollY >= this.lazyLoadTriggerPosition) {
            document.removeEventListener('scroll', this.handleScroll);
            this.currentOffset = this.currentOffset + this.nbOfProductsPerPage;
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

    };

    handleClickPager = (newCurrentPage) => {

        this.currentOffset = (newCurrentPage - 1) * this.nbOfProductsPerPage;

        this.setState({
            products: {}
        }, () => this.getProducts());

    };

    handleClickSortPerPageOption = (sortPerPageOption) => {

        this.currentOffset = 0;
        this.nbOfProductsPerPage = sortPerPageOption;

        this.setState({
            products: []
        }, () => this.getProducts());

    };

    getFilteredProducts = () => {

        let filteredProducts = [];

        if(this.state.activeProductsCategories.length === 0) {
            filteredProducts = this.state.products;
        }
        else if(this.state.products.length > 0) {
            this.state.products.map((product) => {
                const productCategories = product.categories;
                let productMainCategoryId = null;
                if(productCategories.length > 0) {
                    productMainCategoryId = productCategories[0].id;
                }
                if(this.state.activeProductsCategories.indexOf(productMainCategoryId) !== -1 ) {
                    filteredProducts.push(product);
                }
            })
        }

        return filteredProducts;

    };

    render() {

        const products = this.state.products;
        const productsCategories = this.state.productsCategories;
        const activeProductsCategories = this.state.activeProductsCategories;
        const categoriesOfLoadedProducts = this.state.categoriesOfLoadedProducts;
        const areProductsLoading = this.state.areProductsLoading;
        const areProductsCategoriesLoading = this.state.areProductsCategoriesLoading;
        const filteredProducts = this.getFilteredProducts();
        const isLadyLoadActive = this.isLazyLoadActive;

        return (
            <div className="products component full-height">
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

                                    let showFilter = true;

                                    if(this.hideFiltersWithNoItems) {
                                        if(products.length !== 0) {
                                            if(categoriesOfLoadedProducts.length > 0) {
                                                if(categoriesOfLoadedProducts.indexOf(productsCategory.id) === -1) {
                                                    showFilter = false;
                                                }
                                            }
                                        }
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
                            <div className="products__filters-bar">
                                <div className="products__filters-bar-dropdown">
                                    <Dropdown items={this.sortPerPageOptions} title="Per page" onClickItem={this.handleClickSortPerPageOption} />
                                </div>
                            </div>
                            <div ref={(productsContainer) => this.productsContainer = productsContainer}>
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
                                </div>
                                {areProductsLoading &&
                                    <div className="products__loader">
                                        <FormattedMessage id="products.loading-products" default="Loading products..."/>
                                    </div>
                                }
                                {!areProductsLoading && filteredProducts.length === 0 &&
                                    <div>
                                        <FormattedMessage id="products.no-products" default="No products"/>
                                    </div>
                                }
                            </div>
                            <div>
                                {!isLadyLoadActive &&
                                    <Pager currentOffset={this.currentOffset} nbOfItems="100" nbOfProductsPerPage={this.nbOfProductsPerPage} onClick={this.handleClickPager}/>
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