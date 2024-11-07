const NotificationService = require('./notificationService');
const { createNFTMetadata, mintNFTOnBlockchain } = require('../utils/nftUtils'); // Utility functions for NFT creation

const NFTService = {

  // 1. Mint NFT for Agreement (Bidding Contract) - Used when consultants, validators, or other roles enter a formal agreement in the project
  mintAgreementNFT: async (userId, planId, role) => {
    try {
      const metadata = createNFTMetadata({
        type: 'Agreement',
        role,
        projectId: planId,
        description: ${role} agreement for project ${planId}.,
      });

      const nftId = await mintNFTOnBlockchain(userId, metadata);

      await NotificationService.notifyUser(userId, Agreement NFT minted for your role: ${role});
      return nftId;
    } catch (error) {
      console.error('Error minting Agreement NFT:', error.message);
      throw error;
    }
  },

  // 2. Mint NFT for Milestone Achievement - Covers 100% funding or project completion for all involved users
  mintMilestoneNFT: async (userId, planId, milestone) => {
    try {
      const description = milestone === 'Funding'
        ? '100% Project Funding Achieved'
        : 'Project Completed Successfully';

      const metadata = createNFTMetadata({
        type: milestone,
        projectId: planId,
        description: ${description} for project ${planId}.,
      });

      const nftId = await mintNFTOnBlockchain(userId, metadata);

      await NotificationService.notifyUser(userId, ${milestone} NFT minted for project ${planId});
      return nftId;
    } catch (error) {
      console.error(Error minting ${milestone} NFT:, error.message);
      throw error;
    }
  },

  // 3. Mint NFT for Task Validation Completion - Validators who complete all assigned tasks will receive this
  mintValidationCompletionNFT: async (userId, planId) => {
    try {
      const metadata = createNFTMetadata({
        type: 'Validation Completion',
        projectId: planId,
        description: NFT for completing all validations for project ${planId}.,
      });

      const nftId = await mintNFTOnBlockchain(userId, metadata);

      await NotificationService.notifyUser(userId, NFT minted for completing validations for project ${planId});
      return nftId;
    } catch (error) {
      console.error('Error minting Validation Completion NFT:', error.message);
      throw error;
    }
  },

  // 4. Mint NFT for Approved Update Request - When a business plan update is approved by the consultant
  mintUpdateApprovalNFT: async (userId, planId) => {
    try {
      const metadata = createNFTMetadata({
        type: 'Update Approval',
        projectId: planId,
        description: NFT for approved update on project ${planId}.,
      });

      const nftId = await mintNFTOnBlockchain(userId, metadata);

      await NotificationService.notifyUser(userId, NFT minted for approved update on project ${planId});
      return nftId;
    } catch (error) {
      console.error('Error minting Update Approval NFT:', error.message);
      throw error;
    }
  },
};

module.exports = NFTService;