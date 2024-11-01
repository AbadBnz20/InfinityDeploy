'use server';

import axios from "axios";

const Strapi = axios.create({
    baseURL: 'https://exciting-bear-c6ca7f80d2.strapiapp.com/api',
    headers:{
      'Content-Type': 'application/json',
    }
})

export {Strapi};