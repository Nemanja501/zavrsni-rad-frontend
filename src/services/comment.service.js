import HttpService from "./http.service";

export default class CommentService extends HttpService{
    static addComment = async(data)=>{
        const response = await this.client.request({
            method: 'POST',
            url: '/add-comment',
            data,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        console.log('create comment', response);
        return response.data;
    }

    static deleteComment = async(id)=>{
        const response = await this.client.request({
            method: 'DELETE',
            url: `/delete-comment/${id}`,
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });

        console.log('delete comment', response);
        return response;
    }
}