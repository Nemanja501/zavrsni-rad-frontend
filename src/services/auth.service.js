import HttpService from "./http.service"

export default class AuthService extends HttpService{
    static register = async (data) =>{
        const response = await this.client.request({
            method: 'POST',
            url: '/register',
            data
        })

        return response.data;
    }
}