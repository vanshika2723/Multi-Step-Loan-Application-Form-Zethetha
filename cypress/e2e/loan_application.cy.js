describe("Loan Application - Complete Flow", () => {

// ==========================================
// BEFORE EACH TEST
// ==========================================

beforeEach(() => {
cy.visit("http://localhost:5173", {
onBeforeLoad(win) {
win.localStorage.clear();
},
});
});

// ==========================================
// TEST 1: Application should load
// ==========================================

it("should display the loan application", () => {
cy.contains("Loan Application").should("be.visible");
cy.contains("Step 1").should("be.visible");
cy.contains("Personal Details").should("be.visible");
});

// ==========================================
// TEST 2: Empty form validation
// ==========================================

it("should validate empty personal details", () => {
cy.contains("Next").click();

cy.contains(
  "Full name must be at least 3 characters"
).should("be.visible");

});

// ==========================================
// TEST 3: Step 1 - Personal Details
// ==========================================

it("should move to Step 2 with valid personal details", () => {

cy.get('input[name="fullName"]')
  .type("Vanshika Khandelwal");

cy.get('input[name="email"]')
  .type("vanshika@example.com");

cy.get('input[name="phone"]')
  .type("9876543210");

cy.get('input[name="dateOfBirth"]')
  .type("2004-11-27");

cy.contains("Next").click();

cy.contains("Step 2").should("be.visible");
cy.contains("Loan Details").should("be.visible");

});

// ==========================================
// TEST 4: Step 2 - Loan Details
// ==========================================

it("should validate and move through loan details", () => {

// Step 1
cy.get('input[name="fullName"]')
  .type("Vanshika Khandelwal");

cy.get('input[name="email"]')
  .type("vanshika@example.com");

cy.get('input[name="phone"]')
  .type("9876543210");

cy.get('input[name="dateOfBirth"]')
  .type("2004-11-27");

cy.contains("Next").click();

// Step 2
cy.get('select[name="loanType"]')
  .select("Personal Loan");

cy.get('input[name="loanAmount"]')
  .type("500000");

cy.get('input[name="loanTenure"]')
  .type("5");

cy.contains("Next").click();

cy.contains("Step 3").should("be.visible");
cy.contains("KYC").should("be.visible");

});

// ==========================================
// TEST 5: Step 3 - KYC
// ==========================================

it("should validate KYC details", () => {

// Step 1
cy.get('input[name="fullName"]')
  .type("Vanshika Khandelwal");

cy.get('input[name="email"]')
  .type("vanshika@example.com");

cy.get('input[name="phone"]')
  .type("9876543210");

cy.get('input[name="dateOfBirth"]')
  .type("2004-11-27");

cy.contains("Next").click();

// Step 2
cy.get('select[name="loanType"]')
  .select("Personal Loan");

cy.get('input[name="loanAmount"]')
  .type("500000");

cy.get('input[name="loanTenure"]')
  .type("5");

cy.contains("Next").click();

// Step 3
cy.get('input[name="panNumber"]')
  .type("ABCDE1234F");

cy.get('input[name="aadhaarNumber"]')
  .type("123456789012");

cy.contains("Next").click();

cy.contains("Step 4").should("be.visible");
cy.contains("Address Details").should("be.visible");

});

// ==========================================
// TEST 6: Step 4 - Address
// ==========================================

it("should validate address details", () => {

// Step 1
cy.get('input[name="fullName"]')
  .type("Vanshika Khandelwal");

cy.get('input[name="email"]')
  .type("vanshika@example.com");

cy.get('input[name="phone"]')
  .type("9876543210");

cy.get('input[name="dateOfBirth"]')
  .type("2004-11-27");

cy.contains("Next").click();

// Step 2
cy.get('select[name="loanType"]')
  .select("Personal Loan");

cy.get('input[name="loanAmount"]')
  .type("500000");

cy.get('input[name="loanTenure"]')
  .type("5");

cy.contains("Next").click();

// Step 3
cy.get('input[name="panNumber"]')
  .type("ABCDE1234F");

cy.get('input[name="aadhaarNumber"]')
  .type("123456789012");

cy.contains("Next").click();

// Step 4
cy.get('input[name="address"]')
  .type("123 Main Street");

cy.get('input[name="city"]')
  .type("Alwar");

cy.get('select[name="state"]')
  .select("Rajasthan");

cy.get('input[name="pincode"]')
  .type("301001");

cy.contains("Next").click();

cy.contains("Step 5").should("be.visible");
cy.contains("Employment Details").should("be.visible");

});

// ==========================================
// TEST 7: Step 5 - Employment
// ==========================================

it("should validate employment details", () => {

// Step 1
cy.get('input[name="fullName"]')
  .type("Vanshika Khandelwal");

cy.get('input[name="email"]')
  .type("vanshika@example.com");

cy.get('input[name="phone"]')
  .type("9876543210");

cy.get('input[name="dateOfBirth"]')
  .type("2004-11-27");

cy.contains("Next").click();

// Step 2
cy.get('select[name="loanType"]')
  .select("Personal Loan");

cy.get('input[name="loanAmount"]')
  .type("500000");

cy.get('input[name="loanTenure"]')
  .type("5");

cy.contains("Next").click();

// Step 3
cy.get('input[name="panNumber"]')
  .type("ABCDE1234F");

cy.get('input[name="aadhaarNumber"]')
  .type("123456789012");

cy.contains("Next").click();

// Step 4
cy.get('input[name="address"]')
  .type("123 Main Street");

cy.get('input[name="city"]')
  .type("Alwar");

cy.get('select[name="state"]')
  .select("Rajasthan");

cy.get('input[name="pincode"]')
  .type("301001");

cy.contains("Next").click();

// Step 5
cy.get('select[name="employmentType"]')
  .select("Salaried");

cy.get('input[name="monthlyIncome"]')
  .type("50000");

cy.get('input[name="companyName"]')
  .type("ABC Technologies");

cy.contains("Next").click();

cy.contains("Step 6").should("be.visible");
cy.contains("Co-Applicant Details").should("be.visible");

});

// ==========================================
// TEST 8: Step 6 - Co Applicant Validation
// ==========================================

it("should validate co-applicant details conditionally", () => {

// Step 1
cy.get('input[name="fullName"]')
  .type("Vanshika Khandelwal");

cy.get('input[name="email"]')
  .type("vanshika@example.com");

cy.get('input[name="phone"]')
  .type("9876543210");

cy.get('input[name="dateOfBirth"]')
  .type("2004-11-27");

cy.contains("Next").click();

// Step 2
cy.get('select[name="loanType"]')
  .select("Personal Loan");

cy.get('input[name="loanAmount"]')
  .type("500000");

cy.get('input[name="loanTenure"]')
  .type("5");

cy.contains("Next").click();

// Step 3
cy.get('input[name="panNumber"]')
  .type("ABCDE1234F");

cy.get('input[name="aadhaarNumber"]')
  .type("123456789012");

cy.contains("Next").click();

// Step 4
cy.get('input[name="address"]')
  .type("123 Main Street");

cy.get('input[name="city"]')
  .type("Alwar");

cy.get('select[name="state"]')
  .select("Rajasthan");

cy.get('input[name="pincode"]')
  .type("301001");

cy.contains("Next").click();

// Step 5
cy.get('select[name="employmentType"]')
  .select("Salaried");

cy.get('input[name="monthlyIncome"]')
  .type("50000");

cy.get('input[name="companyName"]')
  .type("ABC Technologies");

cy.contains("Next").click();

// Step 6
cy.get('select[name="hasCoApplicant"]')
  .select("true");

// Conditional fields
cy.get('input[name="coApplicantName"]')
  .should("be.visible");

cy.get('input[name="coApplicantPhone"]')
  .should("be.visible");

// Next without filling fields
cy.contains("Next").click();

// Validation
cy.contains(
  "Co-applicant name is required"
).should("be.visible");

cy.contains(
  "Co-applicant phone is required"
).should("be.visible");

});

// ==========================================
// TEST 9: No Co Applicant
// ==========================================

it("should continue without co-applicant", () => {

// Step 1
cy.get('input[name="fullName"]')
  .type("Vanshika Khandelwal");

cy.get('input[name="email"]')
  .type("vanshika@example.com");

cy.get('input[name="phone"]')
  .type("9876543210");

cy.get('input[name="dateOfBirth"]')
  .type("2004-11-27");

cy.contains("Next").click();

// Step 2
cy.get('select[name="loanType"]')
  .select("Personal Loan");

cy.get('input[name="loanAmount"]')
  .type("500000");

cy.get('input[name="loanTenure"]')
  .type("5");

cy.contains("Next").click();

// Step 3
cy.get('input[name="panNumber"]')
  .type("ABCDE1234F");

cy.get('input[name="aadhaarNumber"]')
  .type("123456789012");

cy.contains("Next").click();

// Step 4
cy.get('input[name="address"]')
  .type("123 Main Street");

cy.get('input[name="city"]')
  .type("Alwar");

cy.get('select[name="state"]')
  .select("Rajasthan");

cy.get('input[name="pincode"]')
  .type("301001");

cy.contains("Next").click();

// Step 5
cy.get('select[name="employmentType"]')
  .select("Salaried");

cy.get('input[name="monthlyIncome"]')
  .type("50000");

cy.get('input[name="companyName"]')
  .type("ABC Technologies");

cy.contains("Next").click();

// Step 6
cy.get('select[name="hasCoApplicant"]')
  .select("false");

cy.contains("Next").click();

// Step 7
cy.contains("Step 7").should("be.visible");
cy.contains("Documents").should("be.visible");

});

// ==========================================
// TEST 10: Step 7 - Documents Page
// ==========================================

it("should display documents and signature section", () => {

// Step 1
cy.get('input[name="fullName"]')
  .type("Vanshika Khandelwal");

cy.get('input[name="email"]')
  .type("vanshika@example.com");

cy.get('input[name="phone"]')
  .type("9876543210");

cy.get('input[name="dateOfBirth"]')
  .type("2004-11-27");

cy.contains("Next").click();

// Step 2
cy.get('select[name="loanType"]')
  .select("Personal Loan");

cy.get('input[name="loanAmount"]')
  .type("500000");

cy.get('input[name="loanTenure"]')
  .type("5");

cy.contains("Next").click();

// Step 3
cy.get('input[name="panNumber"]')
  .type("ABCDE1234F");

cy.get('input[name="aadhaarNumber"]')
  .type("123456789012");

cy.contains("Next").click();

// Step 4
cy.get('input[name="address"]')
  .type("123 Main Street");

cy.get('input[name="city"]')
  .type("Alwar");

cy.get('select[name="state"]')
  .select("Rajasthan");

cy.get('input[name="pincode"]')
  .type("301001");

cy.contains("Next").click();

// Step 5
cy.get('select[name="employmentType"]')
  .select("Salaried");

cy.get('input[name="monthlyIncome"]')
  .type("50000");

cy.get('input[name="companyName"]')
  .type("ABC Technologies");

cy.contains("Next").click();

// Step 6
cy.get('select[name="hasCoApplicant"]')
  .select("false");

cy.contains("Next").click();

// Step 7
cy.contains("Step 7").should("be.visible");

cy.contains("Documents").should("be.visible");
cy.contains("Identity").should("be.visible");
cy.contains("Income").should("be.visible");
cy.contains("Signature").should("be.visible");

});

// ==========================================
// TEST 11: Step 7 → Step 8
// ==========================================

it("should move from Step 7 to Step 8", () => {

// Step 1
cy.get('input[name="fullName"]')
  .type("Vanshika Khandelwal");

cy.get('input[name="email"]')
  .type("vanshika@example.com");

cy.get('input[name="phone"]')
  .type("9876543210");

cy.get('input[name="dateOfBirth"]')
  .type("2004-11-27");

cy.contains("Next").click();

// Step 2
cy.get('select[name="loanType"]')
  .select("Personal Loan");

cy.get('input[name="loanAmount"]')
  .type("500000");

cy.get('input[name="loanTenure"]')
  .type("5");

cy.contains("Next").click();

// Step 3
cy.get('input[name="panNumber"]')
  .type("ABCDE1234F");

cy.get('input[name="aadhaarNumber"]')
  .type("123456789012");

cy.contains("Next").click();

// Step 4
cy.get('input[name="address"]')
  .type("123 Main Street");

cy.get('input[name="city"]')
  .type("Alwar");

cy.get('select[name="state"]')
  .select("Rajasthan");

cy.get('input[name="pincode"]')
  .type("301001");

cy.contains("Next").click();

// Step 5
cy.get('select[name="employmentType"]')
  .select("Salaried");

cy.get('input[name="monthlyIncome"]')
  .type("50000");

cy.get('input[name="companyName"]')
  .type("ABC Technologies");

cy.contains("Next").click();

// Step 6
cy.get('select[name="hasCoApplicant"]')
  .select("false");

cy.contains("Next").click();

// Step 7
cy.contains("Step 7").should("be.visible");

// Step 7 does not use RHF fields
cy.contains("Next").click();

// Step 8
cy.contains("Step 8").should("be.visible");
cy.contains("Review").should("be.visible");

});

// ==========================================
// TEST 12: Step 8 - Review Page
// ==========================================

it("should display submitted information on review page", () => {

// Step 1
cy.get('input[name="fullName"]')
  .type("Vanshika Khandelwal");

cy.get('input[name="email"]')
  .type("vanshika@example.com");

cy.get('input[name="phone"]')
  .type("9876543210");

cy.get('input[name="dateOfBirth"]')
  .type("2004-11-27");

cy.contains("Next").click();

// Step 2
cy.get('select[name="loanType"]')
  .select("Personal Loan");

cy.get('input[name="loanAmount"]')
  .type("500000");

cy.get('input[name="loanTenure"]')
  .type("5");

cy.contains("Next").click();

// Step 3
cy.get('input[name="panNumber"]')
  .type("ABCDE1234F");

cy.get('input[name="aadhaarNumber"]')
  .type("123456789012");

cy.contains("Next").click();

// Step 4
cy.get('input[name="address"]')
  .type("123 Main Street");

cy.get('input[name="city"]')
  .type("Alwar");

cy.get('select[name="state"]')
  .select("Rajasthan");

cy.get('input[name="pincode"]')
  .type("301001");

cy.contains("Next").click();

// Step 5
cy.get('select[name="employmentType"]')
  .select("Salaried");

cy.get('input[name="monthlyIncome"]')
  .type("50000");

cy.get('input[name="companyName"]')
  .type("ABC Technologies");

cy.contains("Next").click();

// Step 6
cy.get('select[name="hasCoApplicant"]')
  .select("false");

cy.contains("Next").click();

// Step 7
cy.contains("Step 7").should("be.visible");
cy.contains("Next").click();

// Step 8
cy.contains("Step 8").should("be.visible");

// Review data
cy.contains("Vanshika Khandelwal")
  .should("be.visible");

cy.contains("vanshika@example.com")
  .should("be.visible");

cy.contains("500000")
  .should("be.visible");

cy.contains("Personal Loan")
  .should("be.visible");

cy.contains("Rajasthan")
  .should("be.visible");

cy.contains("ABC Technologies")
  .should("be.visible");

cy.contains("Estimated EMI")
  .should("be.visible");

});

// ==========================================
// TEST 13: Previous Button
// ==========================================

it("should navigate back to previous step", () => {

cy.get('input[name="fullName"]')
  .type("Vanshika Khandelwal");

cy.get('input[name="email"]')
  .type("vanshika@example.com");

cy.get('input[name="phone"]')
  .type("9876543210");

cy.get('input[name="dateOfBirth"]')
  .type("2004-11-27");

cy.contains("Next").click();

cy.contains("Step 2")
  .should("be.visible");

cy.contains("Previous").click();

cy.contains("Step 1")
  .should("be.visible");

// Data should still exist
cy.get('input[name="fullName"]')
  .should("have.value", "Vanshika Khandelwal");

});

// ==========================================
// TEST 14: Submit without documents
// ==========================================

it("should prevent submission without required documents", () => {

// Step 1
cy.get('input[name="fullName"]')
  .type("Vanshika Khandelwal");

cy.get('input[name="email"]')
  .type("vanshika@example.com");

cy.get('input[name="phone"]')
  .type("9876543210");

cy.get('input[name="dateOfBirth"]')
  .type("2004-11-27");

cy.contains("Next").click();

// Step 2
cy.get('select[name="loanType"]')
  .select("Personal Loan");

cy.get('input[name="loanAmount"]')
  .type("500000");

cy.get('input[name="loanTenure"]')
  .type("5");

cy.contains("Next").click();

// Step 3
cy.get('input[name="panNumber"]')
  .type("ABCDE1234F");

cy.get('input[name="aadhaarNumber"]')
  .type("123456789012");

cy.contains("Next").click();

// Step 4
cy.get('input[name="address"]')
  .type("123 Main Street");

cy.get('input[name="city"]')
  .type("Alwar");

cy.get('select[name="state"]')
  .select("Rajasthan");

cy.get('input[name="pincode"]')
  .type("301001");

cy.contains("Next").click();

// Step 5
cy.get('select[name="employmentType"]')
  .select("Salaried");

cy.get('input[name="monthlyIncome"]')
  .type("50000");

cy.get('input[name="companyName"]')
  .type("ABC Technologies");

cy.contains("Next").click();

// Step 6
cy.get('select[name="hasCoApplicant"]')
  .select("false");

cy.contains("Next").click();

// Step 7 → Step 8
cy.contains("Step 7")
  .should("be.visible");

cy.contains("Next").click();

cy.contains("Step 8")
  .should("be.visible");

// Register alert handler BEFORE clicking Submit
cy.on("window:alert", (text) => {
  expect(text).to.contain(
    "Please upload your identity document"
  );
});

// Submit
cy.contains("Submit Application")
  .click();


});

});
