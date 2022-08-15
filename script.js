(() => {
    const localStorageKey = 'relworxLocalData-applicant: Moise'; // unique - reviewer has other localStorage keys set
    const getLocalStorage = () => JSON.parse(localStorage.getItem(localStorageKey));
    const setLocalStorage = (value) => {
      try {
        localStorage.setItem(localStorageKey, JSON.stringify(value, null, 2));
      } catch (e) {
        alert('unable to set localStorage, please clear your cookies ... what is the actual chrome browser setting?');
      }
    };

    const defaultUserData = { username: '', password: '', name: '', balance: 100, payments: [] };
  const defaultData = {
    // set property values in the next 2 lines to undefined when you code the sign-up functionality
    myUsername: 'bernard',
    loggedInUsername: 'bernard',
    users: [
      { ...defaultUserData, name: 'Gertrude', username: 'gertrude', password: 'abc' },
      { ...defaultUserData, name: 'Hortencia', username: 'hortencia', password: 'abc' },
      { ...defaultUserData, name: 'Bernard', username: 'bernard', password: 'abc' },
      { ...defaultUserData, name: 'Admin', username: 'admin', password: 'abc', balance: Infinity },
    ],
  };

  // get DOM elements for each "page"

  // login
  const loginContainer = document.getElementById('login-container');
  const loginUsername = document.getElementById('loginUsername');
  const loginPassword = document.getElementById('loginPassword');
  const loginButton = document.getElementById('loginButton');
  const toSignInLink = document.getElementById('to-sign-in');

  // sign up
  const signUpContainer = document.getElementById('sign-up-container');
  const signupName = document.getElementById('signupName');
  const signupUsername = document.getElementById('signupUsername');
  const signupPassword = document.getElementById('signupPassword');
  const signupButton = document.getElementById('signupButton');
  const toSignUpLink = document.getElementById('to-sign-up');

   // account
   const viewBalanceContainer = document.getElementById('view-balance-container');
   const nameContainer = document.getElementById('name-container');
   const balanceContainer = document.getElementById('balance-container');
   const selectUserDropdown = document.getElementById('select-user');
   const payAmount = document.getElementById('pay-amount');
   const payButton = document.getElementById('payButton');
   const logoutButton = document.getElementById('logoutButton');
 


})();