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

    static login = async (data) =>{
        const response = await this.client.request({
            method: 'POST',
            url: '/login',
            data
        });

        return response.data;
    }

    static logout = async () =>{
        const response = await this.client.request({
            method: 'GET',
            url: '/logout',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        console.log(response);
        return response;
    }
}