/* global $ */

import { templates, select, classNames } from '../settings.js';
import { utils } from '../utils.js';

export class MainPage {
  constructor(mainPageContainer) {
    const thisMainPage = this;

    thisMainPage.render(mainPageContainer);
    thisMainPage.clickBoxes();
    thisMainPage.initPlugin();
  }

  render(mainPageContainer) {
    const thisMainPage = this;

    const generatedHTML = templates.mainPageWidget();
    thisMainPage.dom = {};
    thisMainPage.dom.wrapper = mainPageContainer;
    const generatedDom = utils.createDOMFromHTML(generatedHTML);
    thisMainPage.dom.wrapper.appendChild(generatedDom);
  }

  clickBoxes() {
    const orderLink = document.getElementById('order-link');
    const orderLinkId = orderLink.getAttribute('href').replace('#', '');

    const pages = Array.from(document.querySelector(select.containerOf.pages).children);

    orderLink.addEventListener('click', () => {
      for (let page of pages) {
        if (page.id === orderLinkId) {
          page.classList.add(classNames.pages.active);
        } else {
          page.classList.remove(classNames.pages.active);
        }
      }
    });

    const bookingLink = document.getElementById('booking-link');
    const bookingLinkId = bookingLink.getAttribute('href').replace('#', '');

    bookingLink.addEventListener('click', () => {
      for (let page of pages) {
        if (page.id === bookingLinkId) {
          page.classList.add(classNames.pages.active);
        } else {
          page.classList.remove(classNames.pages.active);
        }
      }
    });
  }

  initPlugin() {
    $(document).ready(function() {
      $('.owl-carousel').owlCarousel();
    });
  
    var owl = $('.owl-carousel');
    owl.owlCarousel( {
      items:1,
      loop:true,
      margin:10,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true
    });
  }
}