

const baseUrl = 'http://localhost:3000/';

export const apiEndpoints = {

    login: `${baseUrl}/api/auth/login`,              // Validate credentials, return auth token
    register: `${baseUrl}/api/auth/register`,            //-- registering the user 
    getUsers: `${baseUrl}/api/users`,                   // Get all users (supports filter &amp; search)
    getUserStats: `${baseUrl}/api/users/stats`,
    getUserId: `${baseUrl}/api/users/:id`,         // Get single user by ID
    createUser: `${baseUrl}/api/users`,           /// Create new user
    updateUser: `${baseUrl}/api/users/:id`,      //Update existing user
    deleteUser: `${baseUrl}/api/users/:id`     /// Delete user


};