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

    static getById = async (id)=>{
        const response = await this.client.request({
            method: 'GET',
            url: `/galleries/${id}`
        });
        
        return response.data;
    }

    static getAuthorGalleries = async (authorId, page = 1 ,filter = '')=>{
        const response = await this.client.request({
            method: 'GET',
            url: `/authors/${authorId}`,
            params: {
                page,
                filter
            }
        });

        console.log('get author galleries', response);
        return response.data;
    }

    static delete = async (id)=>{
        const response = await this.client.request({
            method: 'DELETE',
            url: `/delete-gallery/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        console.log('delete gallery', response);
        return response;
    }

    static update = async (data, id)=>{
        const response = await this.client.request({
            method: 'POST',
            url: `/edit-gallery/${id}`,
            data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        console.log('update gallery', response);
        return response.data;
    }

}