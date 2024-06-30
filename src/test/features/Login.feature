@Login @Regression
Feature: User logins in with correct and incorrect credentials

    Background: User logs in.
        Given the user lands at the webpage.

    Scenario: User is able to login with correct credentials.
        When User goes to the website & click on login button
        And user enters correct "<USERNAME>" and "<PASSWORD>".
        And user clicks on signIn button
        Then The user is logged in.

        Examples:
        |   USERNAME                |   PASSWORD     |
        |   zoro.test@gmail.com     |   Password123! |

    Scenario: User is not able to login with incorrect credentials.
        When User goes to the website & click on login button
        And user enters incorrect "<USERNAME>" and "<PASSWORD>".
        And user clicks on signIn button
        Then The user is not logged in.

        Examples:
        |   USERNAME          |   PASSWORD    |
        |   zoro@gmail.com    |   Password    |
