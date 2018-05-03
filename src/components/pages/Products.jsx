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
        this.isLazyLoadActive = false;
        this.lazyLoadTriggerPositionOffset = 1000;
        this.hideFiltersWithNoItems = false;
        this.allowMultipleFilters = true;
        this.sortPerPageOptions = [10,25,50];
        this.consumer_key = 'ck_d4eb559b025f8e28c9b5defc99fa7447fad93f53';
        this.consumer_password = 'cs_2c1f842b775ad46c44ced6dbebea174e3068edc7';
        this.baseApiURLProducts = 'https://adriengagnon.com/wp-json/wc/v2/products?per_page=100&consumer_key=' + this.consumer_key + "&consumer_secret=" + this.consumer_password;
        this.baseApiURLProductsCategories = 'https://adriengagnon.com/wp-json/wc/v2/products/categories?consumer_key=' + this.consumer_key + "&consumer_secret=" + this.consumer_password + "&per_page=100";

        this.productsContainer = null;
        this.lazyLoadTriggerPosition = null;

        this.state = {
            products: [],
            productsCategories: [],
            activeProductsCategories: [],
            categoriesOfLoadedProducts: [],
            areProductsLoading: false,
            areProductsCategoriesLoading: false,
            currentOffset: 0,
            nbOfProductsPerPage: 10
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

        if(localStorage.getItem('base_react_products_categories')) {
            const productsFromLocalStorage = JSON.parse(localStorage.getItem('base_react_products_categories'));
            this.setState({
                productsCategories: productsFromLocalStorage
            })
        }
        else {

            this.setState({
                areProductsCategoriesLoading: true
            });

            fetch(this.baseApiURLProductsCategories)
                .then(response => response.json())
                .then((productsCategories) => {

                    localStorage.setItem('base_react_products_categories', JSON.stringify(productsCategories));
                    this.setState({
                        productsCategories,
                        areProductsCategoriesLoading: false
                    })
                }
                )
        }

    };

    getProducts = () => {

        if(localStorage.getItem('base_react_products')) {
            const productsFromLocalStorage = JSON.parse(localStorage.getItem('base_react_products'));
            this.setState({
                products: productsFromLocalStorage,
                categoriesOfLoadedProducts : this.getCategoriesOfLoadedProducts(productsFromLocalStorage)
            });
        }
        else {

            this.setState({
                areProductsLoading: true
            });

            fetch(this.baseApiURLProducts)
                .then((response) => response.json())
                .then((products) => {

                        if(this.isLazyLoadActive) {
                            document.addEventListener('scroll', this.handleScroll);
                        }

                        localStorage.setItem('base_react_products', JSON.stringify(products));

                        this.setState({
                            products: products,
                            categoriesOfLoadedProducts : this.getCategoriesOfLoadedProducts(products),
                            areProductsLoading: false
                        })

                    }
                )
        }

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
            this.setState({
                currentOffset: this.currentOffset + this.state.nbOfProductsPerPage
            });
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

        this.setState({
            activeProductsCategories,
            currentOffset: 0
        })

    };

    handleClickPager = (newCurrentPage) => {

        this.setState({
            currentOffset: (newCurrentPage - 1) * this.state.nbOfProductsPerPage
        });

        window.scrollTo(0, 0);

    };

    handleClickSortPerPageOption = (sortPerPageOption) => {

        this.setState({
            currentOffset: 0,
            nbOfProductsPerPage: sortPerPageOption
        });

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

        const productsCategories = this.state.productsCategories;
        const activeProductsCategories = this.state.activeProductsCategories;
        const categoriesOfLoadedProducts = this.state.categoriesOfLoadedProducts;
        const areProductsLoading = this.state.areProductsLoading;
        const areProductsCategoriesLoading = this.state.areProductsCategoriesLoading;
        const filteredProducts = this.getFilteredProducts();
        const isLadyLoadActive = this.isLazyLoadActive;
        const currentPageProducts = filteredProducts.slice(this.state.currentOffset, this.state.currentOffset + this.state.nbOfProductsPerPage);

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
                                        if(currentPageProducts.length !== 0) {
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
                                    {(currentPageProducts.length > 0) &&
                                        currentPageProducts.map((product) => {
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
                                {!areProductsLoading && currentPageProducts.length === 0 &&
                                    <div>
                                        <FormattedMessage id="products.no-products" default="No products"/>
                                    </div>
                                }
                            </div>
                            <div>
                                {(!isLadyLoadActive && currentPageProducts.length > 0 ) &&
                                    <Pager currentOffset={this.state.currentOffset} nbOfItems={filteredProducts.length} nbOfProductsPerPage={this.state.nbOfProductsPerPage} onClick={this.handleClickPager}/>
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