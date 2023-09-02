import axios from 'axios';

// Create new Object
const createObject = async (goalId, objectData, token) => {

    const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(`http://localhost:5000/api/goals/${goalId}/objects/`, objectData, config);
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

        const response = await axios.get(`http://localhost:5000/api/goals/${goalId}/objects/`, config)
        return response.data
    } catch (error) {
        console.error("Error fetching objects:", error);
        throw error; // Rethrow the error to be caught in the calling code
    }
};

// Delete user Object
export const deleteObject = async (object , token) => {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.delete(`http://localhost:5000/api/goals/${object.goal}/objects/${object._id}`, config);
        return response.data;
};



const objectService = {
  createObject,
  getObjects,
  deleteObject,
}

export default objectService
