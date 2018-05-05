import React from 'react';
import { FormattedMessage } from 'react-intl';

import ItemsList from "../sections/ItemsList";
import FiltersList from "../sections/FiltersList";
import Pager from "../sections/Pager";
import { settings } from "../../SettingsContext";
import Dropdown from "../molecules/Dropdown";
import BackToTopBtn from "../molecules/BackToTopBtn";
import MobileFullScreen from "../sections/MobileFullScreen";

import {getDiffBetweenTwoDatesInMinutes} from "../tools/DateHelpers";
import {orderAlphabeticallyAsc, orderAlphabeticallyDesc} from "../tools/SortHelpers";

import "./_products.scss";

class Products extends React.Component {

    constructor() {

        super();

        this.isLazyLoadActive = false;
        this.lazyLoadThreshold = 200;
        this.lazyLoadTriggerPosition = 0;
        this.showFilters = true;
        this.allowMultipleFilters = true;
        this.itemsContainer = null;

        this.state = {
            items: [],
            itemsCategories: [],
            currentPageItems: [],
            areItemsLoading: false,
            areItemsCategoriesLoading: false,
            activeItemsCategories: [],
            currentOffset: 0,
            isFiltersMobileMenuVisible: false,
            nbOfVisibleItemsLazyLoad: 25,
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
            ],
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
            ]
        }

    }

    componentDidMount = () => {

        this.getItems();
        this.getItemsCategories();

    };

    componentDidUpdate = () => {

        if(this.isLazyLoadActive) {
            if(!this.itemsContainer) {
                this.itemsContainer = document.querySelector('.js-items-list');
                document.addEventListener('scroll', this.handleScroll);
            }
            else {
                this.lazyLoadTriggerPosition = (this.itemsContainer.offsetTop + this.itemsContainer.offsetHeight) - this.lazyLoadThreshold;
            }
        }

    };

    getItemsFromLocalStorage = () => {

        const localStorageItemsObject = JSON.parse(localStorage.getItem('base_react_products'));
        let localStorageItems = null;

        if(localStorageItemsObject) {
            const localStorageItemsTimestamp = localStorageItemsObject.timestamp;
            if(localStorageItemsTimestamp) {
                const diffInMinutesCachedProducts = getDiffBetweenTwoDatesInMinutes(new Date(localStorageItemsTimestamp), new Date());
                if(diffInMinutesCachedProducts !== null && diffInMinutesCachedProducts < settings.cacheTimeInMinutes) {
                    localStorageItems = localStorageItemsObject.data;
                }
            }
        }

        return localStorageItems

    };

    getItemsFromAPI = () => {

        return fetch(settings.apiUrlProducts)
            .then((response) => response.json());

    }

    getItems = () => {

        let itemsFromLocalStorage = this.getItemsFromLocalStorage();

        if(itemsFromLocalStorage) {

            this.setState({
                items: itemsFromLocalStorage
            });

        }
        else {

            this.setState({
                areItemsLoading: true
            });

            this.getItemsFromAPI().then((itemsFromAPI) => {

                localStorage.setItem('base_react_products', JSON.stringify({data: [...itemsFromAPI], timestamp: new Date()}));

                this.setState({
                    items: itemsFromAPI,
                    areItemsLoading: false
                });
            })

        }

    };

    getItemsCategories = () => {

        if(localStorage.getItem('base_react_products_categories')) {
            const itemsCategoriesFromLocalStorage = JSON.parse(localStorage.getItem('base_react_products_categories'));
            this.setState({
                itemsCategories: itemsCategoriesFromLocalStorage
            })
        }
        else {

            this.setState({
                areItemsCategoriesLoading: true
            });

            fetch(this.props.itemsCategoriesUrl)
                .then(response => response.json())
                .then((itemsCategories) => {

                        localStorage.setItem('base_react_products_categories', JSON.stringify(itemsCategories));
                        this.setState({
                            itemsCategories,
                            areItemsCategoriesLoading: false
                        })
                    }
                )
        }

    };

    getFilteredItems = () => {

        let filteredItems = [];

        if(this.state.activeItemsCategories.length === 0) {
            filteredItems = this.state.items;
        }
        else if(this.state.items.length > 0) {
            this.state.items.map((item) => {
                const itemCategories = item.categories;
                let itemMainCategoryId = null;
                if(itemCategories.length > 0) {
                    itemMainCategoryId = itemCategories[0].id;
                }
                if(this.state.activeItemsCategories.indexOf(itemMainCategoryId) !== -1 ) {
                    filteredItems.push(item);
                }
            })
        }

        return filteredItems;

    };

    reorderItems = (items) => {

        const currentSort = this.state.sortPerPropertyOptions.find((option) => option.selected).value;

        if(currentSort === "alphabetical-asc") {

            orderAlphabeticallyAsc(items);
        }
        else if(currentSort === "alphabetical-desc") {

            orderAlphabeticallyDesc(items);

        }

        return items;

    };

    handleClickFilter = (filterId) => {

        let activeItemsCategories = this.state.activeItemsCategories;
        const indexOfFilterId = activeItemsCategories.indexOf(filterId);

        if(indexOfFilterId !== -1) {
            activeItemsCategories.splice(indexOfFilterId, 1);
        }
        else {
            if(!this.allowMultipleFilters) {
                activeItemsCategories = [];
            }
            activeItemsCategories.push(filterId);
        }

        this.setState({
            currentOffset: 0,
            activeItemsCategories
        });

    };

    handleClickShowPerPageOption = (showPerPageOption) => {

        let newShowPerPageOptions = this.state.showPerPageOptions;

        newShowPerPageOptions.map((newShowPerPageOption) => {

            newShowPerPageOption.selected = newShowPerPageOption.value == showPerPageOption.value;

        });

        this.setState({
            currentOffset: 0,
            showPerPageOptions: newShowPerPageOptions,
        });

    };

    handleClickSortOption = (sortPertPageOption) => {

        let newSortPerPropertyOptions = this.state.sortPerPropertyOptions;
        let items = this.getFilteredItems()

        newSortPerPropertyOptions.map((newSortPerPropertyOption) => {

            newSortPerPropertyOption.selected = newSortPerPropertyOption.value == sortPertPageOption.value;

        });

        this.setState({
            currentOffset: 0,
            sortPerPropertyOptions : newSortPerPropertyOptions,
        });

    };

    handleScroll = () => {

        if((window.scrollY + window.innerHeight) >= this.lazyLoadTriggerPosition) {
            this.setState({
                nbOfVisibleItemsLazyLoad: this.state.nbOfVisibleItemsLazyLoad + (this.state.showPerPageOptions.find((option) => option.selected).value)
            });
        }

    };

    handleClickPager = (newCurrentPage) => {

        this.setState({
            currentOffset: (newCurrentPage - 1) * (this.state.showPerPageOptions.find((option) => option.selected).value)
        });

        window.scrollTo(0, 0);

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

    getCurrentPageItems = () => {

        let currentPageItems = this.getFilteredItems();
        let sliceLimit = null;

        this.reorderItems(currentPageItems);

        if(this.isLazyLoadActive) {
            sliceLimit = this.state.currentOffset + this.state.nbOfVisibleItemsLazyLoad;
        }
        else {
            sliceLimit = this.state.currentOffset + this.state.showPerPageOptions.find((option) => option.selected).value;
        }

        currentPageItems = currentPageItems.slice(this.state.currentOffset, sliceLimit);

        return currentPageItems;

    }


    render() {

        const currentPageItems = this.getCurrentPageItems();

        return (
            <div className="products component">
                <div className="container">
                    <div className="page-title__wrapper">
                        <h1 className="page-title">
                            <FormattedMessage id="products.title" default="Products"/>
                        </h1>
                    </div>
                    <div>
                        <p>
                            <FormattedMessage id="products.description" default="Description"/>
                        </p>
                    </div>
                    <div className="products__container">
                        {(this.state.itemsCategories.length > 0 && this.showFilters && window.innerWidth >= 768) &&
                            <div className="products__sidebar">
                                <FiltersList
                                    filters={this.state.itemsCategories}
                                    activeFilters={this.state.activeItemsCategories}
                                    onClick={this.handleClickFilter}
                                    title="Filters"
                                />
                            </div>
                        }
                        <div className="products__list-container">
                            <div className="products__widgets-container">
                                {(this.state.itemsCategories.length > 0 && this.showFilters && window.innerWidth < 768) &&
                                    <div className="products__widget-wrapper">
                                        <MobileFullScreen triggerTitle="Show filters">
                                            <FiltersList
                                                filters={this.state.itemsCategories}
                                                activeFilters={this.state.activeItemsCategories}
                                                onClick={this.handleClickFilter}
                                                title="Filters"
                                            />
                                        </MobileFullScreen>
                                    </div>
                                }
                                {!this.isLazyLoadActive &&
                                    <div className="products__widget-wrapper">
                                        <Dropdown items={this.state.showPerPageOptions} onClickItem={this.handleClickShowPerPageOption}/>
                                    </div>
                                }
                                <div className="products__widget-wrapper">
                                    <Dropdown items={this.state.sortPerPropertyOptions} onClickItem={this.handleClickSortOption}/>
                                </div>
                            </div>
                            {(currentPageItems.length === 0 && !this.state.areItemsLoading) &&
                                <FormattedMessage id="products.no-products" default="No products"/>
                            }
                            {(currentPageItems.length === 0 && this.state.areItemsLoading) &&
                                <FormattedMessage id="products.loading-products" default="Loading products..."/>
                            }
                            {currentPageItems.length > 0 &&
                                <div className="js-items-list">
                                    <ItemsList items={this.getCurrentPageItems()} />
                                </div>
                            }
                            {(!this.isLazyLoadActive && this.getFilteredItems().length > this.state.showPerPageOptions.find((option) => option.selected).value) &&
                                <div className="products__pager-container">
                                    <Pager
                                        maxNbOfVisiblePagerItems={5}
                                        nbOfPagesSwitchToggle={3}
                                        currentOffset={this.state.currentOffset}
                                        nbOfItems={this.getFilteredItems().length}
                                        nbOfItemsPerPage={this.state.showPerPageOptions.find((option) => option.selected).value}
                                        onClick={this.handleClickPager}
                                    />
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <BackToTopBtn />
            </div>
        );
    }
}


export default Products;