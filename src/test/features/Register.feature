@Register 
Feature: User registers with correct details

  Background: 
    Given the user lands at the webpage

  Scenario: User registers with correct details
    When the user goes to the website and clicks on the login button
    And the user clicks on "Create Account"
    And the user selects "I am buying for myself" from radio buttons and presses continue
    And the user fills in registration details:
      | Title          | Mr                        |
      | First Name     | Rushikesh                 |
      | Last Name      | Wadhe                     |
      | Email Address  | rushikeshwadhe71@gmail.com|
      | Mobile Number  | 9730075660                |
    And the user clicks on the continue button
    Then registration is successful
