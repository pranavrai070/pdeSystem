import axios from 'axios';

const API_URL = 'http://192.168.15.169:7666'; // Replace with your server URL

export const signupUser = async (user) => {
  try {
    console.log("getting user for signup",user);
    const response = await axios.post(`${API_URL}/auth/signup`, user);
    return response.data;
  } catch (error) {
    return { success: false, error };
  }
};

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data;
  } catch (error) {
    return { success: false, error };
  }
};

export const sendAlert = async (userId, location) => {
  try {
    const response = await axios.post(`${API_URL}/alerts`, { userId, location });
    return response.data;
  } catch (error) {
    return { success: false, error };
  }
};

export const acceptAlert = async (alertId,userId) => {
  try {
    const response = await axios.post(`${API_URL}/alerts/accept`, { alertId,userId:"668bcaaaae4ccc316dec6969" });
    return response.data;
  } catch (error) {
    return { success: false, error };
  }
};

export const getAlerts = async () => {
  try {
    const response = await axios.post(`${API_URL}/alerts/get`);
    return response.data;
  } catch (error) {
    return { success: false, error };
  }
};

export const getAlert = async (alertId) => {
  try {
    const response = await axios.get(`${API_URL}/alerts/get/${alertId}`);
    return response.data;
  } catch (error) {
    return { success: false, error };
  }
};

export const getDoctor = async (userId) => {
  try {
    const response = await axios.post(`${API_URL}/users/doctor`,{userId});
    return response.data;
  } catch (error) {
    return { success: false, error };
  }
};

export const getPatientPendingAlert = async (patientId) => {
  try {
    console.log("this gets hit");
    const response = await axios.post(`${API_URL}/alerts/getPatientPendingAlert`,{patientId});
    console.log("this is resposne",response);
    return response.data;
  } catch (error) {
    console.error(error);
    return { success: false, error };
  }
};

export const createAppointment = async (patientId, doctorId) => {
  try {
    const response = await axios.post(`${API_URL}/appointments`, { patientId, doctorId });
    return response.data;
  } catch (error) {
    return { success: false, error };
  }
};

export const addReview = async (appointmentId, rating, comment, toUserId) => {
  try {
    const response = await axios.post(`${API_URL}/reviews`, { appointmentId, rating, comment, toUserId });
    return response.data;
  } catch (error) {
    return { success: false, error };
  }
};
