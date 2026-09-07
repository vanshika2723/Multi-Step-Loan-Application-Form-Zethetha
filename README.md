# 🏦 Multi-Step Loan Application Form

A responsive and interactive **Multi-Step Loan Application Form** built using React.js. The application provides a smooth loan application experience with form validation, conditional fields, document uploads, e-signature, auto-save, EMI calculation, and Cypress E2E testing.

## 🚀 Features

* 📝 8-step loan application form
* 👤 Personal details collection
* 💰 Loan type, amount, and tenure selection
* 🪪 PAN and Aadhaar validation
* 🏠 Address details with validation
* 💼 Employment and income information
* 👥 Conditional co-applicant fields
* 📄 Document upload using drag & drop
* ✍️ Electronic signature capture
* 💾 Automatic form data saving using LocalStorage
* 👀 Complete application review before submission
* 🧮 EMI calculation
* ✅ Conditional form validation using Zod
* 🧪 End-to-End testing using Cypress
* 📱 Responsive design for different screen sizes

## 🛠️ Tech Stack

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3

### Libraries & Tools

* React Hook Form
* Zod
* React Dropzone
* React Signature Canvas
* Cypress
* Vite
* Git & GitHub

## 📂 Project Structure

```text
loan-application/
│
├── cypress/
│   └── e2e/
│       └── loan_application.cy.js
│
├── src/
│   ├── components/
│   │   ├── FormInput.jsx
│   │   ├── FormSelect.jsx
│   │   ├── NavigationButtons.jsx
│   │   └── ProgressBar.jsx
│   │
│   ├── pages/
│   │   ├── Step1Personal.jsx
│   │   ├── Step2Loan.jsx
│   │   ├── Step3KYC.jsx
│   │   ├── Step4Address.jsx
│   │   ├── Step5Employment.jsx
│   │   ├── Step6CoApplicant.jsx
│   │   ├── Step7Documents.jsx
│   │   └── Step8Review.jsx
│   │
│   ├── schemas/
│   │   └── loanSchema.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── index.html
└── README.md
```

## ⚙️ Installation & Setup

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Navigate to the project directory:

```bash
cd loan-application
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open the application in your browser using the URL shown in the terminal.

## 🧪 Running Cypress Tests

Start the application first:

```bash
npm run dev
```

Then open Cypress:

```bash
npx cypress open
```

Select:

```text
E2E Testing
→ Chrome
→ loan_application.cy.js
```

The Cypress tests cover:

* Application loading
* Required field validation
* Valid personal details
* Multi-step navigation
* KYC validation
* Address validation
* Employment details
* Conditional co-applicant validation

## 💾 Auto-Save

The application automatically saves entered form data in the browser's **LocalStorage**, helping users retain their information while navigating between steps.

## 🧮 EMI Calculation

The review page calculates the estimated monthly EMI based on:

* Loan amount
* Loan tenure
* Annual interest rate

The current application uses a **10% annual interest rate** for the EMI calculation.

## 🔐 Validation

Form validation is implemented using:

* React Hook Form
* Zod
* Conditional validation
* Indian PAN format validation
* Aadhaar number validation
* Indian phone number validation
* Indian PIN code validation
* Loan amount and tenure limits

## 📱 Responsive Design

The application is designed to provide a user-friendly experience across:

* 💻 Desktop
* 💻 Laptop
* 📱 Tablet
* 📱 Mobile

## 👩‍💻 Author

**Vanshika Khandelwal**

Full Stack Developer | MERN Stack Developer

## 📌 Project Status

✅ Completed

The project includes a complete multi-step loan application workflow with validation, document upload, e-signature, EMI calculation, auto-save, review functionality, and Cypress E2E testing.
