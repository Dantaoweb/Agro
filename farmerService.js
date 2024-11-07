import axios from 'axios';

export const submitBusinessPlan = async (planData) => {
    try {
        const response = await axios.post('/api/farmer/submit_plan', planData);
        return response.data;
    } catch (error) {
        console.error("Error submitting business plan", error);
        throw error;
    }
};