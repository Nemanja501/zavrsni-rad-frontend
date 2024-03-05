import HttpService from "./http.service";

export default class GalleriesService extends HttpService{
    static getAll = async (page = 1, filter = '') =>{
        const response = await this.client.request({
            method: 'GET',
            url: '/',
            params: {
                page,
                filter
            },
        });

        return response.data;
    }

    static myGalleries = async (page = 1, filter = '') =>{
        const response = await this.client.request({
            method: 'GET',
            url: '/my-galleries',
            params: {
                page,
                filter
            },
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        console.log('my galleries service', response);
        return response.data;
    }

    static create = async (data) =>{
        const response = await this.client.request({
            method: 'POST',
            url: '/create',
            data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        return response.data;
    }


}