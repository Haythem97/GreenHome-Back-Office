import axios from 'axios';

const API_URL = '/api/goals/'


// Create new Object
const createObject = async (goalId, objectData, token) => {
    const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(`/api/goals/${goalId}/objects/`, objectData, config);
        return response.data;
    };


// Get user objects
export const getObjects = async (goalId, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };

        const response = await axios.get(`/api/goals/${goalId}/objects/`, config)
        return response.data
    } catch (error) {
        console.error("Error fetching objects:", error);
        throw error; // Rethrow the error to be caught in the calling code
    }
};

// Delete user Object
export const deleteObject = async (goalId , token) => {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.delete(`/api/goals/${goalId}/objects/}`, config);

        return response.data;
};



const objectService = {
  createObject,
  getObjects,
  deleteObject,
}

export default objectService
