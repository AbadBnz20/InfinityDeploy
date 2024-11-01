'use server';
import axios from "axios";

const HotelsApi = axios.create({
    baseURL: 'https://api.worldota.net/api/b2b/v3',
    headers: {
      'Content-Type': 'application/json',
     
    },
  });

HotelsApi.interceptors.request.use(async config => {
    config.headers['Authorization'] = `Basic ${Buffer.from(`${process.env.user}:${process.env.password}`).toString('base64')} `;
    return config;
  });


export {HotelsApi};