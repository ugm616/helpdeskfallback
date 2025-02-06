# Helpdesk Fallback Form

A simple, standalone form for logging helpdesk tasks. This form automatically manages job reference numbers and allows for easy task logging without any external dependencies.

## Features

- Automatic date and time tracking
- Sequential job reference numbering
- Staff selection from predefined list
- Category classification
- Print-friendly layout
- Data persistence for job numbers

## How to Use

1. **Opening the Form**

   - Open `index.html` in any modern web browser
   - On first use, you'll be prompted to enter a starting job reference number

2. **Form Fields**

   - **Date & Time**: Automatically populated with current date/time
   - **Staff Name**: Enter the staff member's name
   - **Staff Extension**: Enter the staff extension number
   - **Category**: Select from predefined categories (PORT, DOM, CAT, etc.)
   - **From Location**: Enter the source location
   - **To Location**: Enter the destination location
   - **Description**: Detailed description of the task
   - **Passed To**: Enter who the task was passed to
   - **HD Operator**: Select the helpdesk operator from the dropdown
   - **Job Reference Number**: Automatically increments for each new form

3. **Buttons**
   - **Clear Form**: Clears all fields and updates to current date/time with next job number
   - **Print Form**: Opens browser print dialog to print the form
   - **Reset Job Numbers**: Allows you to reset the job number sequence

## Job Reference Numbers

- Numbers automatically increment when:
  - The page is loaded
  - The "Clear Form" button is clicked
- Numbers persist between browser sessions
- Can be manually changed if needed
- Can be reset using the "Reset Job Numbers" button

## Notes

- All form fields are editable
- The form is designed to be printer-friendly
- No internet connection required
- No data is sent externally - all information remains local
