
import axios from 'axios';

// Set up the base URL
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Business Plan Service
const businessPlanService = {
  // 1. Submit a new business plan
  submitBusinessPlan: async (data, token) => {
    try {
      const response = await axios.post(${API_BASE_URL}/farmer/submit_plan, data, {
        headers: { Authorization: Bearer ${token} }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to submit business plan');
    }
  },

  // 2. Quote consultant charges
  quoteConsultantCharges: async (planId, charges, token) => {
    try {
      const response = await axios.post(
        ${API_BASE_URL}/consultant/quote_charges/${planId},
        { charges },
        { headers: { Authorization: Bearer ${token} } }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to quote charges');
    }
  },

  // 3. Review business plan
  reviewBusinessPlan: async (planId, feedback, token) => {
    try {
      const response = await axios.post(
        ${API_BASE_URL}/consultant/review_plan/${planId},
        { feedback },
        { headers: { Authorization: Bearer ${token} } }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to review business plan');
    }
  },

  // 4. Track progress
  trackProgress: async (planId, token) => {
    try {
      const response = await axios.get(${API_BASE_URL}/consultant/track_progress/${planId}, {
        headers: { Authorization: Bearer ${token} }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to track progress');
    }
  },

  // 5. Update business plan
  updateBusinessPlan: async (planId, data, token) => {
    try {
      const response = await axios.put(${API_BASE_URL}/farmer/update_plan/${planId}, data, {
        headers: { Authorization: Bearer ${token} }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to update business plan');
    }
  },

  // 6. Request fund release
  requestFundRelease: async (planId, token) => {
    try {
      const response = await axios.post(
        ${API_BASE_URL}/validator/request_fund_release,
        { businessPlanId: planId },
        { headers: { Authorization: Bearer ${token} } }
      );
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to request fund release');
    }
  },

  // 7. Stake cryptocurrency
  stakeCryptocurrency: async (planId, stakingAmount, token) => {
    try {
      const response = await axios.post(
        ${API_BASE_URL}/validator/stake,
        { businessPlanId: planId, stakingAmount },
        { headers: { Authorization: Bearer ${token} }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to stake cryptocurrency');
    }
  },

  // 8. Validate task
  validateTask: async (taskId, planId, token) => {
    try {
      const response = await axios.post(
        ${API_BASE_URL}/validator/validate_task,
        { taskId, businessPlanId: planId },
        { headers: { Authorization: Bearer ${token} }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to validate task');
    }
  },

  // 9. Earn bonuses and NFTs
  earnBonusesAndNFTs: async (planId, token) => {
    try {
      const response = await axios.post(
        ${API_BASE_URL}/validator/earn_bonuses_nfts,
        { businessPlanId: planId },
        { headers: { Authorization: Bearer ${token} }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to earn bonuses and NFTs');
    }
  },

// 10. Get business plan details
  getBusinessPlanDetails: async (planId, token) => {
    try {
      const response = await axios.get(${API_BASE_URL}/businessplan/${planId}, {
        headers: { Authorization: Bearer ${token} }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch business plan details');
    }
  },

  // 11. Get all business plans
  getAllBusinessPlans: async (token) => {
    try {
      const response = await axios.get(${API_BASE_URL}/businessplan/all, {
        headers: { Authorization: Bearer ${token} }
      });
      return response.data;
    } catch (error) {
      throw new Error(error.response?.data?.message || 'Failed to fetch business plans');
    }
  }
};

export default businessPlanService;