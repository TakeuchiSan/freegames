// DOM Elements
const loadingScreen = document.querySelector('.loading-screen');
const hamburger = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelectorAll('.nav-link');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
const filterButtons = document.querySelectorAll('.filter-btn');
const redeemTabs = document.querySelectorAll('.redeem-tab');
const accountsContainer = document.getElementById('accounts-container');
const loadMoreBtn = document.getElementById('load-more-accounts');
const mlCodesContainer = document.getElementById('ml-codes');
const ffCodesContainer = document.getElementById('ff-codes');

// Global Variables
let accountsData = [];
let filteredAccounts = [];
let visibleAccounts = 6;
let adClickCount = {};
let menuClickCount = {};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    // Simulate loading data
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 1000);
    
    // Load data from JSON files
    loadData();
    
    // Initialize event listeners
    initMenuEventListeners();
    initOtherEventListeners();
    
    // Handle scroll for header effect
    window.addEventListener('scroll', handleScroll);
    
    // Check for pending menu after returning from ad
    checkPendingMenu();
});

// Initialize menu event listeners with ad click tracking
function initMenuEventListeners() {
    // Track clicks for desktop nav links
    navLinks.forEach(link => {
        const target = link.getAttribute('data-target');
        menuClickCount[target] = 0;
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            handleMenuClick(target, this);
        });
    });
    
    // Track clicks for mobile nav links
    mobileNavLinks.forEach(link => {
        const target = link.getAttribute('data-target');
        menuClickCount[target] = 0;
        
        link.addEventListener('click', function(e) {
            e.preventDefault();
            handleMenuClick(target, this);
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
}

function handleMenuClick(target, clickedElement) {
    menuClickCount[target]++;
    
    // First click - redirect to ad
    if (menuClickCount[target] === 1) {
        // Add visual feedback
        clickedElement.classList.add('pending-click');
        
        // Store the target in sessionStorage
        sessionStorage.setItem('pendingMenuTarget', target);
        
        // Redirect to ad page (replace with your actual ad URL)
        window.location.href = 'https://www.profitableratecpm.com/zwjztqiq?key=ed53ff225c2c8859fd761958738f8460';
        
        // Reset count if user doesn't return within 10 seconds
        setTimeout(() => {
            if (menuClickCount[target] === 1) {
                menuClickCount[target] = 0;
                clickedElement.classList.remove('pending-click');
                sessionStorage.removeItem('pendingMenuTarget');
            }
        }, 10000);
    }
    // Second click - go to actual section
    else if (menuClickCount[target] >= 2) {
        menuClickCount[target] = 0;
        clickedElement.classList.remove('pending-click');
        navigateToSection(target);
    }
}

function checkPendingMenu() {
    const pendingTarget = sessionStorage.getItem('pendingMenuTarget');
    if (pendingTarget) {
        sessionStorage.removeItem('pendingMenuTarget');
        
        // Find and click the menu item again to trigger the second click
        const menuItem = document.querySelector(`[data-target="${pendingTarget}"]`);
        if (menuItem) {
            menuItem.click();
        }
    }
}

function initOtherEventListeners() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const game = this.getAttribute('data-game');
            filterAccounts(game);
        });
    });
    
    // Redeem tabs
    redeemTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            redeemTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const game = this.getAttribute('data-game');
            switchRedeemTab(game);
        });
    });
    
    // Load more accounts
    loadMoreBtn.addEventListener('click', function() {
        visibleAccounts += 6;
        displayAccounts();
    });
}
// Load data from JSON files
function loadData() {
    // In a real implementation, you would fetch these from actual JSON files
    // For this example, we'll use mock data
    
    // Mock accounts data
    accountsData = [
        {
            id: 1,
            game: 'Mobile Legends',
            username: 'OwSaul',
            email: 'adityaryan407@gmail.com',
            level: 85,
            heroes: 132,
            skins: 192,
            status: 'new',
            date: '2025-04-29'
        },
        {
            id: 2,
            game: 'Mobile Legends',
            username: 'Err? Yes Sirr',
            email: 'erwindimas977@gmail.com',
            level: 123,
            heroes: 128,
            skins: 329,
            status: 'verified',
            date: '2025-04-29'
        },
        {
            id: 3,
            game: 'Free Fire',
            username: 'Galihhhhh.',
            email: 'galihilham90@gmail.com',
            level: 62,
            characters: 48,
            skins: 486,
            status: 'verified',
            date: '2025-04-29'
        },
        {
            id: 4,
            game: 'Free Fire',
            username: 'RifkiJago™',
            email: 'rifkidewanta78gmail.com',
            level: 74,
            characters: 50,
            skins: 523,
            status: 'new',
            date: '2025-04-29'
        },
        {
            id: 5,
            game: 'Mobile Legends',
            username: 'Ferdi Good',
            email: 'ferdiganteng89@gmail.com',
            level: 120,
            heroes: 128,
            skins: 122,
            status: 'verified',
            date: '2025-04-29'
        },
        {
            id: 6,
            game: 'Free Fire',
            username: 'Yuuuu?',
            email: 'bayudika982@gmail.com',
            level: 79,
            characters: 50,
            skins: 598,
            status: 'verified',
            date: '2025-04-29'
        },
        {
            id: 7,
            game: 'Mobile Legends',
            username: 'Skyyyy,
            email: 'tankmain456@gmail.com',
            level: 28,
            heroes: 42,
            skins: 22,
            status: 'new',
            date: '2025-04-29'
        },
        {
            id: 8,
            game: 'Free Fire',
            username: 'Dikii•√',
            email: 'dikigaming982@gmail.com',
            level: 45,
            characters: 10,
            skins: 25,
            status: 'verified',
            date: '2025-04-29'
        },
        {
            id: 8,
            game: 'Free Fire',
            username: 'Budi02gaming',
            email: 'sniper1234@gmail.com',
            level: 52,
            characters: 40,
            skins: 259,
            status: 'verified',
            date: '2025-04-29'
        },
        {
            id: 1,
            game: 'Mobile Legends',
            username: 'SkuJIkakSuka,
            email: 'adityaryan407@gmail.com',
            level: 85,
            heroes: 132,
            skins: 192,
            status: 'new',
            date: '2025-04-29'
        },
        {
            id: 1,
            game: 'Mobile Legends',
            username: 'Gαα.,
            email: 'adityaryan407@gmail.com',
            level: 85,
            heroes: 132,
            skins: 192,
            status: 'new',
            date: '2025-04-29'
        },
    ];
    
    // Mock redeem codes data
    const mlCodes = [
        { code: 'HOLAMLBB', reward: 'Random Box', expiry: '2025-06-30' },
        { code: 'aw6ijgpvo', reward: 'Special Skin', expiry: '2025-07-15' },
        { code: 'MLBBGETAPS', reward: '100 Tickets', expiry: '2025-06-25' },
        { code: 'ML2025VIP', reward: 'Starlight Pass', expiry: '2025-07-01' }
    ];
    
    const ffCodes = [
        { code: 'FREEFIRE99', reward: '100 Diamonds', expiry: '2025-06-28' },
        { code: 'FFANNIV23', reward: 'Special Bundle', expiry: '2025-07-10' },
        { code: 'GARENAXYZ', reward: 'Character Token', expiry: '2025-06-20' },
        { code: 'FFSEASONS', reward: 'Weapon Skin', expiry: '2025-07-05' }
    ];
    
    // Display initial accounts
    filterAccounts('all');
    
    // Display redeem codes
    displayRedeemCodes(mlCodes, mlCodesContainer);
    displayRedeemCodes(ffCodes, ffCodesContainer);
}

// Initialize event listeners
function initEventListeners() {
    // Hamburger menu toggle
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        mobileMenu.classList.toggle('active');
    });
    
    // Mobile menu links
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            navigateToSection(target);
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
        });
    });
    
    // Desktop nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('data-target');
            navigateToSection(target);
        });
    });
    
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const game = this.getAttribute('data-game');
            filterAccounts(game);
        });
    });
    
    // Redeem tabs
    redeemTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            redeemTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            const game = this.getAttribute('data-game');
            switchRedeemTab(game);
        });
    });
    
    // Load more accounts
    loadMoreBtn.addEventListener('click', function() {
        visibleAccounts += 6;
        displayAccounts();
    });
}

// Handle scroll for header effect
function handleScroll() {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

// Filter accounts by game
function filterAccounts(game) {
    if (game === 'all') {
        filteredAccounts = [...accountsData];
    } else {
        filteredAccounts = accountsData.filter(account => account.game === game);
    }
    visibleAccounts = 6;
    displayAccounts();
}

// Display accounts
function displayAccounts() {
    accountsContainer.innerHTML = '';
    const accountsToShow = filteredAccounts.slice(0, visibleAccounts);
    
    accountsToShow.forEach(account => {
        const accountCard = createAccountCard(account);
        accountsContainer.appendChild(accountCard);
    });
    
    // Show or hide load more button
    if (visibleAccounts >= filteredAccounts.length) {
        loadMoreBtn.style.display = 'none';
    } else {
        loadMoreBtn.style.display = 'block';
    }
}

// Create account card HTML
function createAccountCard(account) {
    const card = document.createElement('div');
    card.className = 'account-card';
    
    let statusText = '';
    let statusClass = '';
    if (account.status === 'new') {
        statusText = 'NEW';
        statusClass = 'new';
    } else if (account.status === 'verified') {
        statusText = 'VERIFIED';
        statusClass = 'verified';
    }
    
    let detailsHTML = '';
    if (account.game === 'Mobile Legends') {
        detailsHTML = `
            <div class="account-detail">
                <span class="account-label">Heroes:</span>
                <span class="account-value">${account.heroes}</span>
            </div>
            <div class="account-detail">
                <span class="account-label">Skins:</span>
                <span class="account-value">${account.skins}</span>
            </div>
        `;
    } else if (account.game === 'Free Fire') {
        detailsHTML = `
            <div class="account-detail">
                <span class="account-label">Characters:</span>
                <span class="account-value">${account.characters}</span>
            </div>
            <div class="account-detail">
                <span class="account-label">Skins:</span>
                <span class="account-value">${account.skins}</span>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="account-header">
            <span class="account-game">${account.game.toUpperCase()}</span>
            <span class="account-badge ${statusClass}">${statusText}</span>
        </div>
        <div class="account-body">
            <div class="account-detail">
                <span class="account-label">Username:</span>
                <span class="account-value">${account.username}</span>
            </div>
            <div class="account-detail">
                <span class="account-label">Email:</span>
                <span class="account-value">${account.email}</span>
            </div>
            <div class="account-detail">
                <span class="account-label">Level:</span>
                <span class="account-value">${account.level}</span>
            </div>
            ${detailsHTML}
        </div>
        <div class="account-footer">
            <span class="account-date">Added: ${account.date}</span>
            <button class="account-claim">Claim</button>
        </div>
    `;
    
    // Add click handler for claim button with ad redirect logic
    const claimBtn = card.querySelector('.account-claim');
    claimBtn.addEventListener('click', function(e) {
        e.preventDefault();
        handleAdRedirect('account_claim', `claim_account_${account.id}`);
    });
    
    return card;
}

// Display redeem codes
function displayRedeemCodes(codes, container) {
    container.innerHTML = '';
    
    codes.forEach(code => {
        const codeItem = document.createElement('div');
        codeItem.className = 'code-item';
        
        codeItem.innerHTML = `
            <div>
                <div class="account-detail">
                    <span class="account-label">Code:</span>
                    <span class="code-value">${code.code}</span>
                </div>
                <div class="account-detail">
                    <span class="account-label">Reward:</span>
                    <span class="account-value">${code.reward}</span>
                </div>
                <div class="account-detail">
                    <span class="account-label">Expires:</span>
                    <span class="account-value">${code.expiry}</span>
                </div>
            </div>
            <button class="code-copy">Copy</button>
        `;
        
        // Add click handler for copy button with ad redirect logic
        const copyBtn = codeItem.querySelector('.code-copy');
        copyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            handleAdRedirect('code_copy', `copy_code_${code.code}`);
        });
        
        container.appendChild(codeItem);
    });
}

// Switch between redeem code tabs
function switchRedeemTab(game) {
    const mlCodes = document.getElementById('ml-codes');
    const ffCodes = document.getElementById('ff-codes');
    
    mlCodes.classList.remove('active');
    ffCodes.classList.remove('active');
    
    if (game === 'ml') {
        mlCodes.classList.add('active');
    } else if (game === 'ff') {
        ffCodes.classList.add('active');
    }
}

// Navigate to section
function navigateToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({
            behavior: 'smooth'
        });
    }
}

// Handle ad redirect logic
function handleAdRedirect(actionType, elementId) {
    // Initialize click count if not exists
    if (!adClickCount[elementId]) {
        adClickCount[elementId] = 0;
    }
    
    adClickCount[elementId]++;
    
    // On first click, show ad (in real implementation, redirect to ad URL)
    if (adClickCount[elementId] === 1) {
        alert('Please watch this ad to continue...');
        window.location.href = 'https://www.profitableratecpm.com/zwjztqiq?key=ed53ff225c2c8859fd761958738f8460';
    } 
    // On second click, perform the action
    else if (adClickCount[elementId] === 2) {
        if (actionType === 'account_claim') {
            alert('Account claimed! Details have been copied to clipboard.');
            // In real implementation, copy account details to clipboard
        } else if (actionType === 'code_copy') {
            alert('Code copied to clipboard!');
            // In real implementation, copy code to clipboard
        }
        
        // Reset click count after action is performed
        adClickCount[elementId] = 0;
    }
}
