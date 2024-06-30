import { LaunchOptions } from '@playwright/test';

export const config:LaunchOptions = {
  
    timeout: 600000,
    headless: false,
    args:['--start-maximized'],
    slowMo: 600,
  

};