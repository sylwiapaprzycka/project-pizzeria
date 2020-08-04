import { Product } from './components/Product.js';
import { Cart } from './components/Cart.js';
import { Booking } from './components/Booking.js';
import { MainPage } from './components/MainPage.js';
import { select, settings, classNames } from './settings.js';

const app = {
  initMenu: function() {
    const thisApp = this;
    // console.log('thisApp.data:', thisApp.data);
    for (let productData in thisApp.data.products) {
      // new Product(productData, thisApp.data.products[productData]); /before json/
      new Product(thisApp.data.products[productData].id, thisApp.data.products[productData]);

    }
  },

  initPages: function() {
    const thisApp = this;
    thisApp.pages = Array.from(document.querySelector(select.containerOf.pages).children);
    thisApp.navLinks = Array.from(document.querySelectorAll(select.nav.links));
    for (let link of thisApp.navLinks) {
      link.addEventListener('click', function(event) {
        const clickedElement = this;
        event.preventDefault();
        const id = clickedElement.getAttribute('href').replace('#', '');
        thisApp.activatePage(id);
      });
    }

    let pagesMatchingHash = [];
    if (window.location.hash.length > 2) {
      const idFormHash = window.location.hash.replace('#/', '');
      pagesMatchingHash = thisApp.pages.filter (function(page) {
        return page.id == idFormHash;
      });
    }
    thisApp.activatePage(pagesMatchingHash.length ? pagesMatchingHash[0].id : thisApp.pages[0].id);
  },

  activatePage: function(pageId) {
    const thisApp = this;

    for (let page of thisApp.pages) {
      page.classList.toggle(classNames.pages.active, page.id ==  pageId);
    }
    for (let link of thisApp.navLinks) {
      link.classList.toggle(classNames.nav.active, link.getAttribute('href') == '#' + pageId);
    }

    window.location.hash = '#/' + pageId;
  },

  initData: function() {
    const thisApp = this;

    // thisApp.data = dataSource; /before jason/
    thisApp.data = {};
    const url = settings.db.url + '/' + settings.db.product;
    fetch(url)
      .then(function(rawResponse) {
        return rawResponse.json();
      })
      .then(function(parsedResponse) {
        // console.log('parsedResponse', parsedResponse);
        //save parsedResponse as thisApp.data.products
        thisApp.data.products = parsedResponse;
        //execute initMenu method
        thisApp.initMenu();
        
      });
    console.log('thisApp.data',JSON.stringify(thisApp.data));

  },

  initCart: function() {
    const thisApp = this;
    const cartElem = document.querySelector(select.containerOf.cart);
    thisApp.cart = new Cart(cartElem);
    thisApp.productList = document.querySelector(select.containerOf.menu);
    thisApp.productList.addEventListener('add-to-cart', function(event) {
      app.cart.add(event.detail.product);
    });
  },

  initBooking: function() {
    const thisApp = this;
    thisApp.bookingWidgetContainer = document.querySelector(select.containerOf.booking);
    thisApp.booking = new Booking(thisApp.bookingWidgetContainer);
  },

  initMainPage: function() {
    const thisApp = this;
    thisApp.mainPageContainer = document.querySelector(select.containerOf.mainPageWidget);
    thisApp.mainPage = new MainPage(thisApp.mainPageContainer);
  },

  init: function() {
    const thisApp = this;
    // console.log('*** App starting ***');
    // console.log('thisApp:', thisApp);
    // console.log('classNames:', classNames);
    // console.log('settings:', settings);
    // console.log('templates:', templates);
    thisApp.initPages();
    thisApp.initData();
    // thisApp.initMenu(); /before json/
    thisApp.initCart();
    thisApp.initBooking();
    thisApp.initMainPage();
  },
};

app.init();

