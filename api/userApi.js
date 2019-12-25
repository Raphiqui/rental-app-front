import axios from 'axios';

let API_URL = 'http://localhost:3024/';

export default class userApi {

    signal = axios.CancelToken.source();

    componentWillUnmount() {
        this.signal.cancel('Api is being canceled');
    }

    fetchUsers = async () => {
        try{
            const users = await axios.get(API_URL  + 'users');
            return users;
        }catch (e) {
            return {message: e.message}
        }
    };

    fetchUser = async (id) => {
        try{
            const user = await axios.get(API_URL  + 'users/' + id);
            return user;
        }catch (e) {
            return {message: e.message}
        }
    };

    login = async (userInputs) => {
        try{
            const user = await axios.post(API_URL  + 'users/login', userInputs);
            return user;

        }catch (e) {
            return {error: e.message}
        }
    };

    createUser = async (userInputs) => {
        try{
            const user = await axios.post(API_URL  + 'users', userInputs);
            return user;

        }catch (e) {
            return {error: e.message}
        }
    };
}