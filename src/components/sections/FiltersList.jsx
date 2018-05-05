/*

 Options

 hideFiltersWithNoItems (boolean)
 Filters with no items in the list should be hidden

 allowMultipleFilters (boolean)
 Set to true to allow multiple filters at once


 */

import React from "react";
import { injectIntl, FormattedMessage } from 'react-intl';

import "./_filters-list.scss";

const FiltersList = (props) => {

    return (
        <div className="filters-list">
            <h2 className="filters-list__title">{props.title}</h2>
            { props.filters.map((filter) => {
                return (
                    <div className={"filters-list__item " + (props.activeFilters.indexOf(filter.id) !== -1 ? 'is-active' : '')} key={"filter-" + filter.id} onClick={props.onClick.bind(this, filter.id)}>
                        <h3>{filter.name}</h3>
                    </div>
                )
            })
            }
        </div>
    )

}

export default injectIntl(FiltersList);