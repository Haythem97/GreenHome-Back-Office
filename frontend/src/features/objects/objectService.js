import axios from 'axios';

// Create new Object
const createObject = async (objectData, token) => {
    const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.post(`https://greenhomeapi.onrender.com/api/objects/`, objectData, config);
        return response.data;
    };


// Get user objects
export const getObjects = async (chambreId, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(`https://greenhomeapi.onrender.com/api/objects/${chambreId}`, config)
        return response.data
    } catch (error) {
        console.error("Error fetching objects:", error);
        throw error; // Rethrow the error to be caught in the calling code
    }
};

export const getObjectsByUser = async (userId, token) => {
    try {
        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };
        const response = await axios.get(`https://greenhomeapi.onrender.com/api/${userId}/objects/`, config)
        return response.data
    } catch (error) {
        console.error("Error fetching objects:", error);
        throw error; // Rethrow the error to be caught in the calling code
    }
};

// Delete user Object
export const deleteObject = async (object , token) => {
        console.log(object._id);
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.delete(`https://greenhomeapi.onrender.com/api/objects/${object._id}`, config);
        return response.data;
};



const objectService = {
  createObject,
  getObjects,
  getObjectsByUser,
  deleteObject,
}

export default objectService
