import React from "react";

const consumer_key = 'ck_d4eb559b025f8e28c9b5defc99fa7447fad93f53';
const consumer_password = 'cs_2c1f842b775ad46c44ced6dbebea174e3068edc7';

export const settings = {
    viewportWidth: window.innerWidth,
    mobileMenuBreakpoint: 991,
    availableLangs: ["en", "fr"],
    apiUrlProducts: 'https://adriengagnon.com/wp-json/wc/v2/products?per_page=100&consumer_key=' + consumer_key + '&consumer_secret=' + consumer_password,
    apiUrlProductsCategories: 'https://adriengagnon.com/wp-json/wc/v2/products/categories?consumer_key=' + consumer_key + '&consumer_secret=' + consumer_password + '&per_page=100',
    cacheTimeInMinutes: 60
};

export const SettingsContext = React.createContext(
    settings.dark // default value
);
