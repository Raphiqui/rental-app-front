import axios from 'axios';

let API_URL = 'http://localhost:3024/';

export default class rentalApi {

    fetchRental = async (id) => {
        try{
            const rental = await axios.get(API_URL  + 'rentals/' + id);
            return rental;
        }catch (e) {
            return {message: e.message}
        }
    };

    fetchRentalImg = async (id) => {
        try{
            const rentalImage = await axios.get(API_URL  + 'rentals/image/' + id);
            return rentalImage;
        }catch (e) {
            return {message: e.message}
        }
    };

    // fetchRentalImgs = async (id) => {
    //     try{
    //         const rentalPictures = await axios.get(API_URL  + 'rentals/images/' + id);
    //         return rentalPictures;
    //     }catch (e) {
    //         return {message: e.message}
    //     }
    // };

    fetchRentals = async () => {
        try{
            const rentals = await axios.get(API_URL  + 'rentals');
            return rentals;
        }catch (e) {
            return {message: e.message}
        }
    };

    fetchRentalsAggregate = async (token) => {
        try{
            const rentals = await axios.get(API_URL  + 'rentals/aggregate/' + token);
            return rentals;
        }catch (e) {
            return {message: e.message}
        }
    };
}