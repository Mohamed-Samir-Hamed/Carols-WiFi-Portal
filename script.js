document.addEventListener('DOMContentLoaded', () => {
    const introScreen = document.getElementById('intro-screen');
    const authScreen = document.getElementById('auth-screen');
    const waitBtn = document.getElementById('wait-btn');
    const skipBtn = document.getElementById('skip-btn');
    
    const voucherView = document.getElementById('voucher-view');
    const accountView = document.getElementById('account-view');
    const btnShowAccount = document.getElementById('show-account-view');
    const btnShowVoucher = document.getElementById('show-voucher-view');
    const mainTitle = document.getElementById('main-title');
    const mainSubtitle = document.getElementById('main-subtitle');

    const voucherForm = document.getElementById('voucher-form');
    const accountForm = document.getElementById('account-form');
    const togglePasswordBtn = document.getElementById('toggle-password');
    const passwordInput = document.getElementById('account-password');
    
    const globalError = document.getElementById('global-error');
    const tcModal = document.getElementById('tc-modal');
    const successState = document.getElementById('success-state');
    const loginState = document.getElementById('login-state');

    let count = 10;
    let autoSkipTimeout;
    
    const countdownInterval = setInterval(() => {
        count--;
        const displayCount = count < 10 ? `0${count}` : count;
        
        waitBtn.textContent = `Wait... (${displayCount})`;
        
        if (count <= 0) {
            clearInterval(countdownInterval);
            waitBtn.classList.add('d-none');
            
            autoSkipTimeout = setTimeout(() => {
                if(!introScreen.classList.contains('fade-out')) {
                    transitionToAuth();
                }
            }, 10000);
        }
    }, 1000);

    const transitionToAuth = () => {
        clearInterval(countdownInterval);
        clearTimeout(autoSkipTimeout);
        
        introScreen.classList.add('fade-out');
        setTimeout(() => {
            introScreen.style.display = 'none';
            authScreen.classList.remove('hidden');
        }, 1200); 
    };

    skipBtn.addEventListener('click', transitionToAuth);

    btnShowAccount.addEventListener('click', () => {
        voucherView.classList.add('d-none');
        accountView.classList.remove('d-none');
        
        mainTitle.textContent = "Account Login";
        mainSubtitle.innerHTML = "Connect using your hotel <br><strong>account details.</strong>";
        
        clearError(); 
    });

    btnShowVoucher.addEventListener('click', () => {
        accountView.classList.add('d-none');
        voucherView.classList.remove('d-none');
        
        mainTitle.textContent = "Welcome";
        mainSubtitle.innerHTML = "Enjoy seamless connectivity throughout <br><strong>your stay.</strong>";
        
        clearError(); 
    });

    window.openModal = () => {
        tcModal.classList.remove('hidden');
        document.body.classList.add('modal-open');
        tcModal.setAttribute('aria-hidden', 'false');
    };

    window.closeModal = () => {
        tcModal.classList.add('hidden');
        document.body.classList.remove('modal-open');
        tcModal.setAttribute('aria-hidden', 'true');
    };

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !tcModal.classList.contains('hidden')) {
            closeModal();
        }
    });

    tcModal.addEventListener('click', (e) => {
        if (e.target === tcModal) closeModal();
    });

    togglePasswordBtn.addEventListener('click', () => {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);
        
        if (type === 'text') {
            togglePasswordBtn.innerHTML = `<svg class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path></svg>`;
        } else {
            togglePasswordBtn.innerHTML = `<svg class="eye-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`;
        }
    });

    const showError = (msg) => {
        globalError.textContent = msg;
        globalError.style.display = 'block';
    };

    const clearError = () => {
        globalError.style.display = 'none';
        globalError.textContent = '';
    };

    const setButtonLoading = (btn, isLoading) => {
        const textElement = btn.querySelector('.btn-text');
        const loader = btn.querySelector('.loader');
        
        if (isLoading) {
            textElement.classList.add('hidden');
            loader.classList.remove('hidden');
            btn.disabled = true;
        } else {
            textElement.classList.remove('hidden');
            loader.classList.add('hidden');
            btn.disabled = false;
        }
    };

    voucherForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearError();
        
        const voucherCode = document.getElementById('voucher-code').value.trim();
        const tcChecked = document.getElementById('tc-voucher').checked;
        const btn = document.getElementById('btn-voucher');

        if (!voucherCode) {
            showError("Please enter your voucher code.");
            return;
        }
        if (!tcChecked) {
            showError("Please accept the Terms & Conditions to continue.");
            return;
        }

        setButtonLoading(btn, true);
        
        authenticateVoucher(voucherCode)
            .then(() => showSuccess())
            .catch(error => showError(error.message))
            .finally(() => setButtonLoading(btn, false));
    });

    accountForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearError();
        
        const accountId = document.getElementById('account-id').value.trim();
        const accountPass = document.getElementById('account-password').value;
        const tcChecked = document.getElementById('tc-account').checked;
        const btn = document.getElementById('btn-account');

        if (!accountId || !accountPass) {
            showError("Please enter both account and password.");
            return;
        }
        if (!tcChecked) {
            showError("Please accept the Terms & Conditions to continue.");
            return;
        }

        setButtonLoading(btn, true);

        authenticateAccount(accountId, accountPass)
            .then(() => showSuccess())
            .catch(error => showError(error.message))
            .finally(() => setButtonLoading(btn, false));
    });

    function authenticateVoucher(code) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (code !== 'VIP123') {
                    reject(new Error("The voucher code is invalid or has expired."));
                } else {
                    resolve(); 
                }
            }, 1000);
        });
    }

    function authenticateAccount(account, password) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (account !== 'guest' || password !== 'hotel2026') {
                    reject(new Error("The account details could not be verified."));
                } else {
                    resolve();
                }
            }, 1000);
        });
    }

    function showSuccess() {
        loginState.classList.add('d-none');
        successState.classList.remove('d-none');
    }
});
