import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from "react-redux";
import { fetchProducts, updateProductsOffset, updateNbOfVisibleProductsInLazyLoadMode, updateNbOfProductsPerPage, updateSortMode } from "../../actions/productsActions";
import { fetchProductsCategories, toggleProductCategory } from "../../actions/productCategoriesActions";

import ItemsList from "../sections/ItemsList";
import FiltersList from "../sections/FiltersList";
import Pager from "../sections/Pager";
import Dropdown from "../molecules/Dropdown";
import BackToTopBtn from "../molecules/BackToTopBtn";
import MobileFullScreen from "../sections/MobileFullScreen";

import {orderAlphabeticallyAsc, orderAlphabeticallyDesc} from "../tools/SortHelpers";

import "./_products.scss";

class Products extends React.Component {

    constructor(props) {

        super(props);

        this.isLazyLoadActive = false;
        this.lazyLoadThreshold = 200;
        this.lazyLoadTriggerPosition = 0;
        this.showFilters = true;
        this.itemsContainer = null;
        this.nbOfProductsPerPageOptions = [
            {
                text: "12 items per page",
                value: 12
            },
            {
                text: "24 items per page",
                value: 24
            },
            {
                text: "48 items per page",
                value: 48
            }
        ];
        this.sortModeOptions = [
            {
                text: "Name - A-Z",
                value: "alphabetical-asc"
            },
            {
                text: "Name - Z-A",
                value: "alphabetical-desc"
            }
        ];

    }

    componentDidMount = () => {

        this.props.fetchProducts();
        this.props.fetchProductsCategories();

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


    getFilteredItems = () => {

        let filteredItems = [];

        if(this.props.activeItemsCategories.length === 0) {
            filteredItems = this.props.items;
        }
        else if(this.props.items.length > 0) {
            this.props.items.map((item) => {
                const itemCategories = item.categories;
                let itemMainCategoryId = null;
                if(itemCategories.length > 0) {
                    itemMainCategoryId = itemCategories[0].id;
                }
                if(this.props.activeItemsCategories.indexOf(itemMainCategoryId) !== -1 ) {
                    filteredItems.push(item);
                }
            })
        }

        return filteredItems;

    };

    reorderItems = (items) => {

        const currentSort = this.props.sortMode;

        if(currentSort === "alphabetical-asc") {

            orderAlphabeticallyAsc(items);
        }
        else if(currentSort === "alphabetical-desc") {

            orderAlphabeticallyDesc(items);

        }

        return items;

    };

    handleClickFilter = (filterId) => {

        this.props.toggleProductCategory(filterId);

        this.props.updateProductsOffset(0);

    };

    handleClickShowPerPageOption = (nbOfProductsPerPageOption) => {

        this.props.updateProductsOffset(0);
        this.props.updateNbOfProductsPerPage(nbOfProductsPerPageOption);

    };

    handleClickSortOption = (sortPerPageOption) => {

        this.props.updateProductsOffset(0);
        this.props.updateSortMode(sortPerPageOption);

    };

    handleScroll = () => {

        if((window.scrollY + window.innerHeight) >= this.lazyLoadTriggerPosition) {
            this.props.updateNbOfVisibleProductsInLazyLoadMode();
        }

    };

    handleClickPager = (newCurrentPage) => {

        this.props.updateProductsOffset((newCurrentPage - 1) * this.props.nbOfProductsPerPage);

        window.scrollTo(0, 0);

    };

    getCurrentPageItems = () => {

        let currentPageItems = this.getFilteredItems();
        let sliceLimit = this.props.offset;

        this.reorderItems(currentPageItems);

        sliceLimit += (this.isLazyLoadActive ? this.props.nbOfVisibleItemsLazyLoad : this.props.nbOfProductsPerPage)

        currentPageItems = currentPageItems.slice(this.props.offset, sliceLimit);

        return currentPageItems;

    };


    render() {

        const filteredItems = this.getFilteredItems();
        const nbOfFilteredItems = filteredItems.length;
        let itemsDiv = null;
        let itemsCategoriesDiv = null;

        if(this.props.areItemsFetching) {
            itemsDiv = <FormattedMessage id="products.loading-products" default="Loading products..."/>;
        }
        else if(this.props.itemsError) {
            itemsDiv = <div>{this.props.itemsError.message}</div>
        }
        else if (nbOfFilteredItems === 0) {
            itemsDiv = <FormattedMessage id="products.no-products" default="No products"/>
        }
        else {
            itemsDiv = <div className="js-items-list"><ItemsList items={this.getCurrentPageItems()} /></div>
        }

        if(this.props.areItemsCategoriesFetching) {
            itemsCategoriesDiv = <FormattedMessage id="products.loading-products-categories" default="Loading products categories..."/>;
        }
        else if (this.showFilters && this.props.itemsCategories.length > 0) {
            itemsCategoriesDiv = <FiltersList filters={this.props.itemsCategories} activeFilters={this.props.activeItemsCategories} onClick={this.handleClickFilter} title="Filters"/>
        }

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
                        {(window.innerWidth >= 768 && itemsCategoriesDiv) &&
                            <div className="products__sidebar">
                                {itemsCategoriesDiv}
                            </div>
                        }
                        <div className="products__list-container">
                            <div className="products__widgets-container">
                                {(window.innerWidth < 768 && itemsCategoriesDiv) &&
                                    <div className="products__widget-wrapper">
                                        <MobileFullScreen triggerTitle="Show filters">
                                            {itemsCategoriesDiv}
                                        </MobileFullScreen>
                                    </div>
                                }
                                {!this.isLazyLoadActive &&
                                    <div className="products__widget-wrapper">
                                        <Dropdown id="Dropdown_Products_Items_Per_Page" title="Items per Page" items={this.nbOfProductsPerPageOptions} onClickItem={this.handleClickShowPerPageOption}/>
                                    </div>
                                }
                                <div className="products__widget-wrapper">
                                    <Dropdown id="Dropdown_Products_Sort" title="Sort Order" items={this.sortModeOptions} onClickItem={this.handleClickSortOption}/>
                                </div>
                            </div>
                            {itemsDiv}
                            {(!this.isLazyLoadActive && nbOfFilteredItems > this.props.nbOfProductsPerPage) &&
                                <div className="products__pager-container">
                                    <Pager
                                        maxNbOfVisiblePagerItems={5}
                                        nbOfPagesSwitchToggle={3}
                                        currentOffset={this.props.offset}
                                        nbOfItems={nbOfFilteredItems}
                                        nbOfItemsPerPage={this.props.nbOfProductsPerPage}
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

const mapStateToProps = state => ({

    items: state.products.items,
    itemsError: state.products.error,
    areItemsFetching: state.products.areItemsFetching,
    offset: state.products.offset,
    sortMode: state.products.sortMode,
    nbOfVisibleItemsLazyLoad: state.products.nbOfVisibleItemsLazyLoad,
    nbOfProductsPerPage: state.products.nbOfProductsPerPage,
    itemsCategories: state.productsCategories.items,
    itemsCategoriesError: state.productsCategories.error,
    activeItemsCategories: state.productsCategories.activeItemsCategories,
    areItemsCategoriesFetching: state.productsCategories.areItemsFetching

});

export default connect(mapStateToProps, { fetchProducts, updateProductsOffset, fetchProductsCategories, toggleProductCategory, updateNbOfVisibleProductsInLazyLoadMode, updateNbOfProductsPerPage, updateSortMode })(Products);