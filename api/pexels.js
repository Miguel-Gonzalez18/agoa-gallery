import axios from "axios";
// 563492ad6f91700001000001d477c30622a44c64b85f2b32cf9f8488
export const getImage = async (searchTerm = 'people') => 
    await axios.get(`https://api.pexels.com/v1/search?query=${searchTerm}`, {
        headers: {
            Authorization: '563492ad6f91700001000001d477c30622a44c64b85f2b32cf9f8488',
        },
    })