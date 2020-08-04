import { templates, select, classNames } from '../settings.js';
import { utils } from '../utils.js';

export class MainPage {
  constructor(mainPageContainer) {
    const thisMainPage = this;

    thisMainPage.render(mainPageContainer);
    thisMainPage.clickBoxes();
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

    const pages = document.querySelector(select.containerOf.pages).children;

    orderLink.addEventListener('click', function() {
      for (let page of pages) {
        if (page.id === orderLinkId) {
          page.classList.add(classNames.pages.active);
        } else {
          page.classList.remove(classNames.page.active);
        }
      }
    });
  }
}