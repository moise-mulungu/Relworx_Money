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

   // anytime you assign a value to localData.data the set() function below will run
   const proxyTargetObj = {};
   const localData = new Proxy(proxyTargetObj, {
     set(target, key, value) {
       console.log(`Proxy handler: ${key} set to ${JSON.stringify(value, null, 2)}`);
       target[key] = value;
       setLocalStorage(value);
       showActiveContent();
 
       // now, here you can "react" to changes in state by setting values to DOM elements
 
       if (value.loggedInUsername) {
         const user = localData.data.users.find((u) => u.username === value.loggedInUsername);
         if (user) {
           nameContainer.innerHTML = user.name;
           balanceContainer.innerHTML = user.balance;
         }
       }
 
       buildPayOtherUsersDropdown(value);
 
       return true;
     },
   });

   localData.data = getLocalStorage() || defaultData;

  // align container visibility to localData
  function showActiveContent() {
    const { myUsername, loggedInUsername } = localData.data;
    const anyUserIsLoggedIn = loggedInUsername;
    const userHasNoAccount = myUsername === undefined && loggedInUsername === undefined;
    loginContainer.style.display = anyUserIsLoggedIn ? 'none' : 'block';
    signUpContainer.style.display = userHasNoAccount ? 'block' : 'none';
    viewBalanceContainer.style.display = anyUserIsLoggedIn ? 'block' : 'none';
  }
  showActiveContent();

  // handle LOGIN
  loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    const username = loginUsername.value;
    const password = loginPassword.value;
    const user = localData.data.users.find((u) => u.username === username && u.password === password);
    if (user) {
      localData.data = { ...localData.data, loggedInUsername: user.username };
      loginPassword.value = '';
      // window.location.reload(); // not needed. see the comments above the Proxy object above
    } else {
      alert('password or username is incorrect');
    }
  });


})();