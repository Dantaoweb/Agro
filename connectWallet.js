/ Wallet Connect Logic
document.addEventListener('DOMContentLoaded', function() {
  const connectWalletBtn = document.getElementById('connect-wallet-btn');

  // Wallet connection logic
  connectWalletBtn.addEventListener('click', async () => {
    if (window.ethereum) {
      try {
        // Request account access
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const userAccount = accounts[0];

        // Display connected account and update button text
        connectWalletBtn.textContent = Connected: ${userAccount.slice(0, 6)}...${userAccount.slice(-4)};
        connectWalletBtn.disabled = true; // Disable button after successful connection

        // Optionally, send userAccount to backend if needed for further interactions
        console.log('Wallet connected:', userAccount);

      } catch (error) {
        console.error('Connection failed:', error);
        connectWalletBtn.textContent = 'Connection Failed. Try Again.';
      }
    } else {
      // If no Ethereum provider found
      alert('Please install MetaMask or another compatible wallet extension');
    }
  });
});