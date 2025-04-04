// budget-calculator.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the calculator
    initializeCalculator();
});

function initializeCalculator() {
    const calculateBtn = document.getElementById('calculateBtn');
    const inputs = document.querySelectorAll('input[type="number"]');
    
    // Add input event listeners for real-time validation
    inputs.forEach(input => {
        // Prevent negative values
        input.addEventListener('input', function() {
            if (this.value < 0) this.value = 0;
        });

        // Add thousand separators while typing
        input.addEventListener('blur', function() {
            if (this.value) {
                const num = parseFloat(this.value);
                this.value = num.toFixed(2);
            }
        });

        // Auto-calculate on input change (with debounce)
        input.addEventListener('input', debounce(function() {
            calculateBudget();
        }, 500));
    });

    // Calculate button click handler
    calculateBtn.addEventListener('click', function() {
        calculateBudget();
        animateResults();
    });
}

function calculateBudget() {
    // Get all input values
    const expenses = {
        rent: getInputValue('rent'),
        food: getInputValue('food'),
        utilities: getInputValue('utilities'),
        transport: getInputValue('transport'),
        internet: getInputValue('internet'),
        other: getInputValue('other')
    };

    // Calculate totals
    const totalMonthly = Object.values(expenses).reduce((a, b) => a + b, 0);
    const recommendedSavings = totalMonthly * 0.1; // 10% savings
    const dailyBudget = (totalMonthly - recommendedSavings) / 30;

    // Update the UI
    updateBudgetDisplay(totalMonthly, recommendedSavings, dailyBudget);
    
    // Create expense breakdown chart
    createExpenseChart(expenses);

    // Save to localStorage
    saveBudgetData(expenses, totalMonthly);

    // Show budget recommendations
    showBudgetRecommendations(expenses, totalMonthly);
}

function getInputValue(id) {
    const value = document.getElementById(id).value.trim();
    return value ? parseFloat(value) : 0;
}

function updateBudgetDisplay(total, savings, daily) {
    // Animate the numbers counting up
    animateNumber('totalAmount', total, '₹');
    animateNumber('savingsAmount', savings, '₹');
    animateNumber('dailyBudget', daily, '₹');
}

function animateNumber(elementId, finalValue, prefix = '') {
    const element = document.getElementById(elementId);
    const duration = 1000; // 1 second animation
    const steps = 60;
    const increment = finalValue / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
        step++;
        current += increment;
        element.textContent = `${prefix}${current.toFixed(2)}`;

        if (step >= steps) {
            clearInterval(timer);
            element.textContent = `${prefix}${finalValue.toFixed(2)}`;
        }
    }, duration / steps);
}

function createExpenseChart(expenses) {
    const chartDiv = document.getElementById('budgetChart');
    chartDiv.innerHTML = '<h3>Expense Breakdown</h3>';

    const total = Object.values(expenses).reduce((a, b) => a + b, 0);
    
    // Create and append chart bars
    Object.entries(expenses).forEach(([category, amount]) => {
        if (amount > 0) {
            const percentage = (amount / total) * 100;
            
            // Create bar container
            const barContainer = document.createElement('div');
            barContainer.className = 'chart-bar-container';
            barContainer.style.cssText = `
                margin: 10px 0;
                position: relative;
            `;

            // Create label
            const label = document.createElement('div');
            label.className = 'chart-label';
            label.textContent = `${category.charAt(0).toUpperCase() + category.slice(1)}`;
            label.style.cssText = `
                position: absolute;
                left: 0;
                width: 100px;
            `;

            // Create bar
            const bar = document.createElement('div');
            bar.className = 'chart-bar';
            bar.style.cssText = `
                margin-left: 110px;
                height: 20px;
                background: linear-gradient(to right, #2563eb, #1e40af);
                width: 0%; /* Start at 0 for animation */
                border-radius: 4px;
                transition: width 1s ease;
                position: relative;
            `;

            // Create percentage label
            const percentageLabel = document.createElement('span');
            percentageLabel.className = 'chart-percentage';
            percentageLabel.textContent = `₹${amount.toFixed(2)} (${percentage.toFixed(1)}%)`;
            percentageLabel.style.cssText = `
                position: absolute;
                right: -180px;
                top: 50%;
                transform: translateY(-50%);
                color: #666;
                font-size: 0.9rem;
            `;

            // Append elements
            barContainer.appendChild(label);
            barContainer.appendChild(bar);
            bar.appendChild(percentageLabel);
            chartDiv.appendChild(barContainer);

            // Trigger animation
            setTimeout(() => {
                bar.style.width = `${percentage}%`;
            }, 100);
        }
    });
}

function showBudgetRecommendations(expenses, total) {
    const recommendations = [];

    // Analyze expense ratios and provide recommendations
    const rentRatio = expenses.rent / total;
    const foodRatio = expenses.food / total;
    const utilitiesRatio = expenses.utilities / total;

    if (rentRatio > 0.4) {
        recommendations.push("Your rent expenses are high. Consider looking for more affordable accommodation options.");
    }

    if (foodRatio > 0.3) {
        recommendations.push("You might save on food by meal prepping and cooking at home.");
    }

    if (utilitiesRatio > 0.15) {
        recommendations.push("Your utility costs are above average. Try implementing energy-saving practices.");
    }

    // Display recommendations if they exist
    if (recommendations.length > 0) {
        showAlert(recommendations.join('\n'));
    }
}

function saveBudgetData(expenses, total) {
    const budgetData = {
        expenses,
        total,
        date: new Date().toISOString()
    };
    
    // Save to localStorage
    localStorage.setItem('lastBudget', JSON.stringify(budgetData));
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function showAlert(message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = 'alert alert-info';
    alertDiv.innerHTML = `
        <i class="fas fa-info-circle"></i>
        ${message}
        <button class="close-alert" onclick="this.parentElement.remove()">×</button>
    `;
    document.body.insertBefore(alertDiv, document.body.firstChild);
    setTimeout(() => alertDiv.remove(), 10000);
}

function animateResults() {
    const resultSection = document.querySelector('.result-section');
    resultSection.style.animation = 'none';
    resultSection.offsetHeight; // Trigger reflow
    resultSection.style.animation = 'fadeIn 0.5s ease-out';
}

// Add this CSS to your stylesheet or style tag
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    .chart-bar-container {
        opacity: 0;
        animation: fadeIn 0.5s ease-out forwards;
    }

    .chart-bar {
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .chart-bar:hover {
        filter: brightness(1.1);
    }
`;
document.head.appendChild(style);