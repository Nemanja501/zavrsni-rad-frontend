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
}