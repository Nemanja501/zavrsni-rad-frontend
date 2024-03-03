import HttpService from "./http.service";

export default class GalleriesService extends HttpService{
    static getAll = async (page = 1) =>{
        const response = await this.client.request({
            method: 'GET',
            url: '/',
            params: {
                page
            },
        });

        return response.data;
    }
}