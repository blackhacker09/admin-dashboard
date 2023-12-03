const API_ENDPOINT =
    "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";

const ApiService = {
    getUsers: async () => {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        return data;
    },
};

export default ApiService;
