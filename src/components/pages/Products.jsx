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

import {getDiffBetweenTwoDatesInMinutes} from "../tools/DateHelpers";

import "./_products.scss";

class Products extends React.Component {

    constructor() {

        super();

        this.isLazyLoadActive = false;
        this.showFilters = true;
        this.LazyLoadTriggerBottomOffset = 250;
        this.hideFiltersWithNoItems = false;
        this.allowMultipleFilters = true;
        this.cacheTimeInMinutes = 60;
        this.consumer_key = 'ck_d4eb559b025f8e28c9b5defc99fa7447fad93f53';
        this.consumer_password = 'cs_2c1f842b775ad46c44ced6dbebea174e3068edc7';
        this.baseApiURLProducts = 'https://adriengagnon.com/wp-json/wc/v2/products?per_page=100&consumer_key=' + this.consumer_key + "&consumer_secret=" + this.consumer_password;
        this.baseApiURLProductsCategories = 'https://adriengagnon.com/wp-json/wc/v2/products/categories?consumer_key=' + this.consumer_key + "&consumer_secret=" + this.consumer_password + "&per_page=100";

        this.productsContainer = null;
        this.lazyLoadTriggerPosition = null;

        this.state = {
            products: [],
            filteredProducts: [],
            productsCategories: [],
            activeProductsCategories: [],
            categoriesOfLoadedProducts: [],
            areProductsLoading: false,
            areProductsCategoriesLoading: false,
            isFiltersMobileMenuVisible: false,
            currentOffset: 0,
            nbOfVisibleProductsLazyLoad: 20,
            nbOfProductsPerPage: 12,
            sortPerPropertyOptions: [
                {
                    text: "Name - A-Z",
                    value: "alphabetical-asc",
                    selected: true
                },
                {
                    text: "Name - Z-A",
                    value: "alphabetical-desc",
                    selected: false
                }
            ],
            showPerPageOptions: [
                {
                    text: "12 items per page",
                    value: 12,
                    selected: true
                },
                {
                    text: "24 items per page",
                    value: 24,
                    selected: false
                },
                {
                    text: "48 items per page",
                    value: 48,
                    selected: false
                }

            ]
        }

    }

    componentDidMount = () => {

        this.getProducts();
        this.getProductsCategories();

    };

    componentDidUpdate = () => {

        if(this.isLazyLoadActive) {
            this.lazyLoadTriggerPosition = (this.productsContainer.offsetTop + this.productsContainer.offsetHeight) - this.LazyLoadTriggerBottomOffset;
        }

    };

    handleScroll = (e) => {

        if((window.scrollY + window.innerHeight) >= this.lazyLoadTriggerPosition) {
            this.setState({
                nbOfVisibleProductsLazyLoad: this.state.nbOfVisibleProductsLazyLoad + (this.state.showPerPageOptions.find((option) => option.selected).value)
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

        let filteredProducts = this.getFilteredProducts(activeProductsCategories);

        this.reorderProducts(filteredProducts);

        this.setState({
            activeProductsCategories,
            currentOffset: 0,
            filteredProducts
        })

    };

    handleClickPager = (newCurrentPage) => {

        this.setState({
            currentOffset: (newCurrentPage - 1) * (this.state.showPerPageOptions.find((option) => option.selected).value)
        });

        window.scrollTo(0, 0);

    };

    handleClickShowPerPageOption = (showPerPageOption) => {

        let newShowPerPageOptions = this.state.showPerPageOptions;

        newShowPerPageOptions.map((newShowPerPageOption) => {

            newShowPerPageOption.selected = newShowPerPageOption.value == showPerPageOption.value;

        });

        this.setState({
            currentOffset: 0,
            showPerPageOptions: newShowPerPageOptions
        });

    };

    handleClickSortOption = (sortPertPageOption) => {

        let newSortPerPropertyOptions = this.state.sortPerPropertyOptions;
        let products = [...this.state.filteredProducts];

        newSortPerPropertyOptions.map((newSortPerPropertyOption) => {

            newSortPerPropertyOption.selected = newSortPerPropertyOption.value == sortPertPageOption.value;

        });

        this.reorderProducts(products);

        this.setState({
            currentOffset: 0,
            sortPerPropertyOptions : newSortPerPropertyOptions,
            filteredProducts: products
        })

    };

    handleClickCloseFilters = () => {

        this.setState({
            isFiltersMobileMenuVisible: false
        });

    };

    handleClickOpenFilters = () => {

        this.setState({
            isFiltersMobileMenuVisible: true
        });

    };

    reorderProducts = (products) => {

        const currentSort = this.state.sortPerPropertyOptions.find((option) => option.selected).value;
        let compareFunction = null;

        if(currentSort === "alphabetical-asc") {

            compareFunction = (a, b) => {

                if(a.name < b.name) return -1;
                if(a.name > b.name) return 1;
                return 0;

            }
        }
        else if(currentSort === "alphabetical-desc") {

            compareFunction = (a, b) => {

                if(a.name < b.name) return 1;
                if(a.name > b.name) return -1;
                return 0;

            }

        }

        products.sort(compareFunction);

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
            const productsCategoriesFromLocalStorage = JSON.parse(localStorage.getItem('base_react_products_categories'));
            this.setState({
                productsCategories: productsCategoriesFromLocalStorage
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

        let localStorageProductsObject = JSON.parse(localStorage.getItem('base_react_products'));
        let localStorageProducts = null;
        let localStorageProductsTimestamp = null;
        let diffInMinutesCachedProducts = null;

        if(localStorageProductsObject) {
            localStorageProducts = localStorageProductsObject.data;
            localStorageProductsTimestamp = localStorageProductsObject.timestamp;
            if(localStorageProductsTimestamp) {
                diffInMinutesCachedProducts = getDiffBetweenTwoDatesInMinutes(new Date(localStorageProductsTimestamp), new Date());
            }
        }
        if(diffInMinutesCachedProducts !== null && diffInMinutesCachedProducts < this.cacheTimeInMinutes) {

            if(this.isLazyLoadActive) {
                document.addEventListener('scroll', this.handleScroll);
            }

            this.reorderProducts(localStorageProducts);

            this.setState({
                products: localStorageProducts,
                filteredProducts: localStorageProducts,
                categoriesOfLoadedProducts : this.getCategoriesOfLoadedProducts(localStorageProducts)
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

                        localStorage.setItem('base_react_products', JSON.stringify({data: [...products], timestamp: new Date()}));

                        this.reorderProducts(products);

                        this.setState({
                            products: products,
                            filteredProducts: products,
                            categoriesOfLoadedProducts : this.getCategoriesOfLoadedProducts(products),
                            areProductsLoading: false
                        })

                    }
                )
        }

    };

    getFilteredProducts = (activeProductsCategories) => {

        let filteredProducts = [];

        if(activeProductsCategories.length === 0) {
            filteredProducts = this.state.products;
        }
        else if(this.state.products.length > 0) {
            this.state.products.map((product) => {
                const productCategories = product.categories;
                let productMainCategoryId = null;
                if(productCategories.length > 0) {
                    productMainCategoryId = productCategories[0].id;
                }
                if(activeProductsCategories.indexOf(productMainCategoryId) !== -1 ) {
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
        const filteredProducts = this.state.filteredProducts;
        const isLadyLoadActive = this.isLazyLoadActive;
        const nbOfProductsPerPage = this.state.showPerPageOptions.find((option) => option.selected).value;
        let currentPageProducts = null;

        if(this.isLazyLoadActive) {
            currentPageProducts = filteredProducts.slice(0, this.state.nbOfVisibleProductsLazyLoad);
        }
        else {
            currentPageProducts = filteredProducts.slice(this.state.currentOffset, this.state.currentOffset + nbOfProductsPerPage);
        }

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
                        {(this.showFilters && (window.innerWidth < 768 ? this.state.isFiltersMobileMenuVisible : true)) &&
                            <div className="products__filters-container">
                                <div className="products__filters-close-btn" onClick={this.handleClickCloseFilters}>
                                    <i className="fas fa-times"></i>
                                </div>
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

                                        if (this.hideFiltersWithNoItems) {
                                            if (currentPageProducts.length !== 0) {
                                                if (categoriesOfLoadedProducts.length > 0) {
                                                    if (categoriesOfLoadedProducts.indexOf(productsCategory.id) === -1) {
                                                        showFilter = false;
                                                    }
                                                }
                                            }
                                        }

                                        if (showFilter) {
                                            return (
                                                <div className={"products__filters-item " + (activeProductsCategories.indexOf(productsCategory.id) !== -1 ? 'is-active' : '')} key={productsCategory.id} onClick={this.handleClickFilter.bind(this, productsCategory.id)}>
                                                    <h3>{productsCategory.name}</h3>
                                                </div>
                                            )
                                        }
                                    })
                                }
                            </div>
                        }
                        <div className="products__products-container">
                            <div className="products__filters-bar">
                                {window.innerWidth < 768 &&
                                <div className="products__filters-bar-link">
                                    <a href="javascript:void(0)" onClick={this.handleClickOpenFilters}>View Filters</a>
                                </div>
                                }
                                {!this.isLazyLoadActive &&
                                    <div className="products__filters-bar-dropdown">
                                        <Dropdown items={this.state.showPerPageOptions} onClickItem={this.handleClickShowPerPageOption}/>
                                    </div>
                                }
                                <div className="products__filters-bar-dropdown">
                                    <Dropdown items={this.state.sortPerPropertyOptions} onClickItem={this.handleClickSortOption}/>
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
                                {(!isLadyLoadActive && currentPageProducts.length > 0 && Math.round(filteredProducts.length / nbOfProductsPerPage) > 1) &&
                                    <Pager currentOffset={this.state.currentOffset} nbOfItems={filteredProducts.length} nbOfProductsPerPage={nbOfProductsPerPage} onClick={this.handleClickPager}/>
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