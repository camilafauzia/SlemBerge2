/*!
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 */

(() => {
  'use strict';

  const getStoredTheme = () => localStorage.getItem('theme');
  const setStoredTheme = theme => localStorage.setItem('theme', theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  };

  const setTheme = theme => {
    if (theme === 'auto') {
      document.documentElement.setAttribute(
        'data-bs-theme',
        window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      );
    } else {
      document.documentElement.setAttribute('data-bs-theme', theme);
    }
  };

  setTheme(getPreferredTheme());

  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
    const storedTheme = getStoredTheme();
    if (storedTheme !== 'light' && storedTheme !== 'dark') {
      setTheme(getPreferredTheme());
    }
  });

  window.addEventListener('DOMContentLoaded', () => {
    const lightThemeBtn = document.getElementById('light-theme-btn');
    const darkThemeBtn = document.getElementById('dark-theme-btn');
    const autoThemeBtn = document.getElementById('auto-theme-btn');

    const applyTheme = theme => {
      setStoredTheme(theme);
      setTheme(theme);

      // Update button styles for active state
      [lightThemeBtn, darkThemeBtn, autoThemeBtn].forEach(btn => btn.classList.remove('active'));
      if (theme === 'light') {
        lightThemeBtn.classList.add('active');
      } else if (theme === 'dark') {
        darkThemeBtn.classList.add('active');
      } else if (theme === 'auto') {
        autoThemeBtn.classList.add('active');
      }
    };

    // Set initial active button based on the preferred theme
    applyTheme(getPreferredTheme());

    // Add click event listeners to buttons
    lightThemeBtn.addEventListener('click', () => applyTheme('light'));
    darkThemeBtn.addEventListener('click', () => applyTheme('dark'));
    autoThemeBtn.addEventListener('click', () => applyTheme('auto'));
  });
})();
