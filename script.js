(() => {
  const localStorageKey = 'relworxLocalData-applicant: Moise';
  const getLocalStorage = () => JSON.parse(localStorage.getItem(localStorageKey));
  const setLocalStorage = (value) => {
    try {
      localStorage.setItem(localStorageKey, JSON.stringify(value, null, 2));
    } catch (e) {
      alert('unable to set localStorage, please clear your cookies ... what is the actual chrome browser setting?');
    }
  };

  const defaultUserData = {
    username: '', password: '', name: '', balance: 100, payments: [],
  };
  const defaultData = {
    myUsername: '',
    loggedInUsername: '',
    users: [
      {
        ...defaultUserData, name: 'Gertrude', username: 'gertrude', password: 'abc',
      },
      {
        ...defaultUserData, name: 'Hortencia', username: 'hortencia', password: 'abc',
      },
      {
        ...defaultUserData, name: 'Bernard', username: 'bernard', password: 'abc',
      },
      {
        ...defaultUserData, name: 'Admin', username: 'admin', password: 'abc', balance: Infinity,
      },
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

  //  transactions
  const allTransactions = document.getElementById('all-transactions');
  const toAllTransactions = document.getElementById('to-all-transactions');
  const toViewBalance = document.getElementById('to-view-balance');
  const transactionsSection = document.getElementById('transactions-section');
  const transactionsHistory = document.getElementById('transactions-history');

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
    } else {
      alert('password or username is incorrect');
    }
  });

  // handle SIGN UP
  signupButton.addEventListener('click', (e) => {
    e.preventDefault();

    const name = document.getElementById('signupName').value;
    const username = document.getElementById('signupUsername').value;
    const password = document.getElementById('signupPassword').value;
    const user = {
      name, password, username, balance: 100,
    };
    localData.data.users.push({
      ...defaultUserData, name, password, username,
    });
    localData.data = { ...localData.data, loggedInUsername: user.username };
    loginPassword.value = '';
  });

  // handle LOGOUT
  logoutButton.addEventListener('click', () => {
    console.log('clicked logout button');
    localData.data = { ...localData.data, loggedInUsername: undefined };
  });

  // Handle links to other pages
  toSignUpLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginContainer.style.display = 'none';
    signUpContainer.style.display = 'block';
    viewBalanceContainer.style.display = 'none';
  });

  toSignInLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginContainer.style.display = 'block';
    signUpContainer.style.display = 'none';
    viewBalanceContainer.style.display = 'none';
  });

  toAllTransactions.addEventListener('click', (e) => {
    e.preventDefault();
    const { loggedInUsername } = localData.data;
    const user = localData.data.users.find((u) => u.username === loggedInUsername);
    user.payments.forEach((payment) => {
      const paymentCol = document.createElement('div');
      const paymentHis = document.createElement('li');
      paymentCol.className = 'transaction-block';
      paymentCol.style.height = `${payment.amount}px`;
      paymentCol.title = `${payment.amount}$ sent to ${payment.payeeUsername}`;
      paymentHis.innerHTML = `${payment.amount}$ sent to ${payment.payeeUsername}`;
      transactionsSection.appendChild(paymentCol);
      transactionsHistory.appendChild(paymentHis);
      console.log(payment);
    });
    loginContainer.style.display = 'none';
    signUpContainer.style.display = 'none';
    viewBalanceContainer.style.display = 'none';
    allTransactions.style.display = 'block';
  });

  toViewBalance.addEventListener('click', (e) => {
    e.preventDefault();
    loginContainer.style.display = 'none';
    signUpContainer.style.display = 'none';
    viewBalanceContainer.style.display = 'block';
    allTransactions.style.display = 'none';
  });

  // build pay other users element
  function buildPayOtherUsersDropdown(data) {
    while (selectUserDropdown.options.length) selectUserDropdown.remove(0);
    data.users
      .filter((u) => !['admin', data.loggedInUsername].includes(u.username))
      .forEach((user) => {
        const option = document.createElement('option');
        option.value = user.username;
        option.text = user.name;
        selectUserDropdown.appendChild(option);
      });
  }
  buildPayOtherUsersDropdown(localData.data);

  payButton.addEventListener('click', (e) => {
    e.preventDefault();

    console.log('clicked pay button');
    const { users } = localData.data;
    const { loggedInUsername } = localData.data;
    const payeeUsername = selectUserDropdown.options[selectUserDropdown.selectedIndex].value;
    const amount = Number(payAmount.value) || 0;

    const sender = users.find((u) => u.username === loggedInUsername);
    const receiver = users.find((u) => u.username === payeeUsername);

    if (sender.balance < amount) return;

    sender.balance -= amount;
    receiver.balance += amount;
    payAmount.value = '';
    alert(`${sender.name} paid ${receiver.name} $${amount}`);
    sender.payments.push({ payeeUsername, amount });
    setLocalStorage(localData.data);
    window.location.reload();
  });
})();