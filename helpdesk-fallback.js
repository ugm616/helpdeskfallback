// Helpdesk Fallback Sheet - Standalone Version
class HelpdeskFallback {
    constructor() {
        this.staffList = [
            'Aisha Khan',
            'Alicia Ward',
            'Cheryl McKirdy',
            'Christine Siddall',
            'Janice Jones',
            'John McNamara',
            'Jules Gluyas',
            'Kelsey Stabler',
            'Lakcon Rowley',
            'Louise Wrigley',
            'Lucy Murtagh',
            'Mel Antcliffe',
            'Phil Marshalsea',
            'Rachael Jones',
            'Vanessa Creed'
        ];
        
        this.initJobNumber().then(() => {
            this.init();
        });
    }

    async initJobNumber() {
        let jobNumber = localStorage.getItem('lastJobNumber');
        
        if (!jobNumber) {
            let isValid = false;
            while (!isValid) {
                const input = prompt('Please enter the starting job reference number (0-9999999):');
                
                // Check if user cancelled
                if (input === null) {
                    jobNumber = '0';
                    break;
                }
                
                // Validate input
                const num = parseInt(input);
                if (!isNaN(num) && num >= 0 && num <= 9999999) {
                    jobNumber = num.toString();
                    isValid = true;
                } else {
                    alert('Please enter a valid number between 0 and 9999999');
                }
            }
            localStorage.setItem('lastJobNumber', jobNumber);
        }
        
        // Increment the number for this page load
        const nextNumber = (parseInt(jobNumber) + 1).toString();
        localStorage.setItem('lastJobNumber', nextNumber);
        this.currentJobNumber = nextNumber;
    }

    init() {
        // Create main container
        const container = document.createElement('div');
        container.className = 'helpdesk-fallback-form';
        document.body.appendChild(container);

        // Add header
        const header = document.createElement('h2');
        header.textContent = 'HELPDESK FALLBACK SHEET';
        container.appendChild(header);

        // Create form
        const form = document.createElement('form');
        container.appendChild(form);

        // Add all form fields
        this.createDateTimeSection(form);
        this.createField(form, 'STAFF NAME', 'text', 'staff-name');
        this.createField(form, 'STAFF EXTENSION', 'text', 'staff-extension');
        this.createCategoryDropdown(form);
        this.createField(form, 'FROM LOCATION', 'text', 'from');
        this.createField(form, 'TO LOCATION', 'text', 'to');
        this.createDescriptionField(form);
        this.createField(form, 'PASSED TO', 'text', 'passed-to');
        this.createOperatorDropdown(form);
        this.createField(form, 'JOB REFERENCE NUMBER', 'text', 'job-reference');
        this.createButtons(form);

        // Add styles
        this.addStyles();
    }

    createDateTimeSection(container) {
        const group = document.createElement('div');
        group.className = 'form-group date-time-group';

        const label = document.createElement('label');
        label.textContent = 'DATE & TIME';
        
        const dateContainer = document.createElement('div');
        dateContainer.className = 'date-time-container';

        // Get current date and time
        const now = new Date();
        
        // Create formatted date string
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear().toString().slice(-2);
        
        // Date input with formatted display
        const dateDisplay = document.createElement('div');
        dateDisplay.className = 'date-display';
        dateDisplay.innerHTML = `${day}/${month}/${year}`;
        
        // Hidden date input for form submission
        const dateInput = document.createElement('input');
        dateInput.type = 'hidden';
        dateInput.id = 'date-input';
        dateInput.value = now.toISOString().split('T')[0];

        // Time inputs
        const timeContainer = document.createElement('div');
        timeContainer.className = 'time-inputs';

        const atSpan = document.createElement('span');
        atSpan.textContent = 'at';
        
        const hourSelect = document.createElement('select');
        hourSelect.id = 'hour-select';
        for (let i = 0; i < 24; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i.toString().padStart(2, '0');
            hourSelect.appendChild(option);
        }
        hourSelect.value = now.getHours();

        const colonSpan = document.createElement('span');
        colonSpan.textContent = ':';

        const minuteSelect = document.createElement('select');
        minuteSelect.id = 'minute-select';
        for (let i = 0; i < 60; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = i.toString().padStart(2, '0');
            minuteSelect.appendChild(option);
        }
        minuteSelect.value = now.getMinutes();

        timeContainer.appendChild(atSpan);
        timeContainer.appendChild(hourSelect);
        timeContainer.appendChild(colonSpan);
        timeContainer.appendChild(minuteSelect);

        dateContainer.appendChild(dateDisplay);
        dateContainer.appendChild(dateInput);
        dateContainer.appendChild(timeContainer);

        group.appendChild(label);
        group.appendChild(dateContainer);
        container.appendChild(group);
    }

    createField(container, labelText, type, id) {
        const group = document.createElement('div');
        group.className = 'form-group';
        
        const label = document.createElement('label');
        label.textContent = labelText;
        
        const input = document.createElement('input');
        input.type = type;
        input.id = id;
        
        // If this is the job reference field, set the value
        if (id === 'job-reference') {
            input.value = this.currentJobNumber;
        }
        
        group.appendChild(label);
        group.appendChild(input);
        container.appendChild(group);
    }

    createCategoryDropdown(container) {
        const group = document.createElement('div');
        group.className = 'form-group dropdown-group';
        
        const label = document.createElement('label');
        label.textContent = 'CATEGORY';
        
        const select = document.createElement('select');
        select.id = 'category-select';
        
        // Add empty option
        const emptyOption = document.createElement('option');
        emptyOption.value = '';
        emptyOption.textContent = 'Select category';
        select.appendChild(emptyOption);
        
        // Add categories
        const categories = [
            'PORT',
            'DOM',
            'CAT',
            'MFC',
            'MFR',
            'SEC',
            'TRANS',
            'LIN',
            'WASTE'
        ];
        
        categories.forEach(category => {
            const option = document.createElement('option');
            option.value = category;
            option.textContent = category;
            select.appendChild(option);
        });
        
        group.appendChild(label);
        group.appendChild(select);
        container.appendChild(group);
    }

    createDescriptionField(container) {
        const group = document.createElement('div');
        group.className = 'form-group';
        
        const label = document.createElement('label');
        label.textContent = 'DESCRIPTION';
        
        const textarea = document.createElement('textarea');
        textarea.id = 'description';
        textarea.rows = 6;
        
        group.appendChild(label);
        group.appendChild(textarea);
        container.appendChild(group);
    }

    createOperatorDropdown(container) {
        const group = document.createElement('div');
        group.className = 'form-group dropdown-group';
        
        const label = document.createElement('label');
        label.textContent = 'HD OPERATOR';
        
        const select = document.createElement('select');
        select.id = 'operator-select';
        
        // Add default option
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = 'NAME';
        select.appendChild(defaultOption);
        
        // Add operator options
        this.staffList.forEach(staff => {
            const option = document.createElement('option');
            option.value = staff;
            option.textContent = staff;
            select.appendChild(option);
        });
        
        group.appendChild(label);
        group.appendChild(select);
        container.appendChild(group);
    }

    createButtons(container) {
        const buttonGroup = document.createElement('div');
        buttonGroup.className = 'button-group';

        // Clear Form button
        const clearBtn = document.createElement('button');
        clearBtn.type = 'button';
        clearBtn.textContent = 'Clear Form';
        clearBtn.onclick = () => this.clearForm();

        // Print Form button
        const printBtn = document.createElement('button');
        printBtn.type = 'button';
        printBtn.textContent = 'Print Form';
        printBtn.onclick = () => window.print();

        // Reset Job Numbers button
        const resetBtn = document.createElement('button');
        resetBtn.type = 'button';
        resetBtn.textContent = 'Reset Job Numbers';
        resetBtn.className = 'reset-button';
        resetBtn.onclick = () => this.resetJobNumbers();

        buttonGroup.appendChild(clearBtn);
        buttonGroup.appendChild(printBtn);
        buttonGroup.appendChild(resetBtn);
        container.appendChild(buttonGroup);
    }

    clearForm() {
        const form = document.querySelector('form');
        form.reset();

        // Update date and time to current values
        const now = new Date();
        
        // Update date display
        const day = now.getDate().toString().padStart(2, '0');
        const month = (now.getMonth() + 1).toString().padStart(2, '0');
        const year = now.getFullYear().toString().slice(-2);
        const dateDisplay = document.querySelector('.date-display');
        dateDisplay.innerHTML = `${day}/${month}/${year}`;
        
        // Update hidden date input
        const dateInput = document.getElementById('date-input');
        dateInput.value = now.toISOString().split('T')[0];
        
        // Update time selects
        const hourSelect = document.getElementById('hour-select');
        const minuteSelect = document.getElementById('minute-select');
        hourSelect.value = now.getHours();
        minuteSelect.value = now.getMinutes();

        // Increment and update job reference number
        const lastNumber = localStorage.getItem('lastJobNumber');
        const nextNumber = (parseInt(lastNumber) + 1).toString();
        localStorage.setItem('lastJobNumber', nextNumber);
        this.currentJobNumber = nextNumber;
        document.getElementById('job-reference').value = nextNumber;
    }

    async resetJobNumbers() {
        if (confirm('Are you sure you want to reset the job reference numbers? This will clear the current sequence.')) {
            localStorage.removeItem('lastJobNumber');
            await this.initJobNumber();
            document.getElementById('job-reference').value = this.currentJobNumber;
        }
    }

    addStyles() {
        const styles = `
            .helpdesk-fallback-form {
                max-width: 595px; /* A4 width in pixels */
                margin: 20px auto;
                padding: 40px;
                font-family: Arial, sans-serif;
                color: #555;
                background: #fff;
                border: 1px solid #ddd;
                box-sizing: border-box;
                position: relative;
            }

            .helpdesk-fallback-form h2 {
                margin: 0 0 30px;
                color: #333;
                font-size: 20px;
                font-weight: normal;
            }

            .form-group {
                margin-bottom: 20px;
                display: flex;
                align-items: flex-start;
            }

            .form-group label {
                width: 150px;
                font-weight: bold;
                padding-top: 5px;
                font-size: 13px;
            }

            .form-group input,
            .form-group select,
            .form-group textarea {
                width: calc(100% - 160px);
                padding: 6px 8px;
                border: 1px solid #ccc;
                border-radius: 3px;
                font-size: 13px;
                box-sizing: border-box;
            }

            .dropdown-group select {
                width: 250px;
                background-color: #f5f5f5;
            }

            .date-time-group .date-time-container {
                display: inline-flex;
                align-items: center;
                gap: 8px;
            }

            .date-display {
                padding: 6px 8px;
                border: 1px solid #ccc;
                border-radius: 3px;
                background: #fff;
                min-width: 80px;
                text-align: center;
                font-size: 13px;
            }

            .time-inputs {
                display: inline-flex;
                align-items: center;
                gap: 4px;
                margin-left: 8px;
                font-size: 13px;
            }

            .time-inputs select {
                width: 45px;
                padding: 5px;
                border: 1px solid #ccc;
                border-radius: 3px;
                background: #fff;
            }

            textarea {
                min-height: 150px;
                resize: vertical;
            }

            .button-group {
                margin-top: 30px;
                display: flex;
                gap: 10px;
            }

            .button-group button {
                padding: 6px 16px;
                background: #f5f5f5;
                border: 1px solid #ddd;
                border-radius: 3px;
                cursor: pointer;
                font-size: 13px;
            }

            .button-group .reset-button {
                margin-left: auto;
                background: #fff;
                border-color: #ccc;
            }

            .button-group button:hover {
                background: #e5e5e5;
            }

            .button-group .reset-button:hover {
                background: #f8f8f8;
                border-color: #999;
            }

            @media print {
                .helpdesk-fallback-form {
                    margin: 0;
                    padding: 20px;
                    border: none;
                }

                .button-group {
                    display: none;
                }

                @page {
                    margin: 0.5cm;
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = styles;
        document.head.appendChild(styleSheet);
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new HelpdeskFallback();
});
