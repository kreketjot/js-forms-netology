/* eslint-disable no-param-reassign */
import '../css/popover.css';

// simple example
const popover = document.querySelector('.popover');

// hide and clear or show and update data in popover
const setPopover = (popoverEl, title, content) => {
  if (popoverEl.hidden === undefined || popoverEl.querySelector === undefined) {
    return;
  }
  popoverEl.hidden = !(title || content);
  popoverEl.querySelector('.popover__title').textContent = title;
  popoverEl.querySelector('.popover__content').textContent = content;
};

// close popover on click
popover.addEventListener('click', () => setPopover(popover));

// show popover listener
const getElementListener = (popoverEl) => (evt) => {
  evt.preventDefault();
  // update popover data
  const element = evt.currentTarget;
  const { popoverTitle, popoverContent } = element.dataset;
  setPopover(popoverEl, popoverTitle, popoverContent);
  // update popover position
  const { top, left } = element.getBoundingClientRect();
  const popoverHeight = popoverEl.offsetHeight;
  const popoverWidth = popoverEl.offsetWidth;
  const elementWidth = element.offsetWidth;
  popoverEl.style.top = `${window.scrollY + top - popoverHeight - 15}px`;
  popoverEl.style.left = `${window.scrollX + left + elementWidth / 2 - popoverWidth / 2}px`;
};

[...document.querySelectorAll('[data-popover]')]
  .forEach((el) => el.addEventListener('click', getElementListener(popover)));
