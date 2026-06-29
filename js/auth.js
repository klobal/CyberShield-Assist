/******************************************************************************
 * CyberShield Assist
 * Authentication Engine
 * File: js/auth.js
 * Version: 1.0
 ******************************************************************************/

class AuthenticationManager {

    constructor() {

        // Login Form
        this.loginForm =
            document.getElementById("loginForm");

        this.username =
            document.getElementById("username");

        this.password =
            document.getElementById("password");

        this.loginButton =
            document.getElementById("loginButton");

        this.initializeButton =
            document.getElementById("initializeSession");

        this.loginPanel =
            document.getElementById("loginPanel");

        this.aiCore =
            document.getElementById("aiCore");

    }

    /**********************************************************
     * INITIALIZE AUTHENTICATION
     **********************************************************/

    init() {

        // Wait until user clicks Initialize Secure Session

        if (this.initializeButton) {

            this.initializeButton.addEventListener(
                "click",
                () => {

                    this.openLoginPanel();

                }
            );

        }

        // Login Form

        if (this.loginForm) {

            this.loginForm.addEventListener(
                "submit",
                (event) => {

                    event.preventDefault();

                    this.login();

                }
            );

        }

    }

    /**********************************************************
     * OPEN LOGIN PANEL
     **********************************************************/

    openLoginPanel() {

        document.dispatchEvent(
            new CustomEvent("loginStarted")
        );

        // Expand AI Core

        if (this.aiCore) {

            this.aiCore.classList.add("expand");

        }

        // Reveal Login Panel

        if (this.loginPanel) {

            setTimeout(() => {

                this.loginPanel.classList.add("show");

            }, 700);

        }

    }

    /**********************************************************
     * LOGIN
     **********************************************************/

    login() {

        const username =
            this.username.value.trim();

        const password =
            this.password.value.trim();

        if (username === "" || password === "") {

            alert("Please enter username and password.");

            return;

        }

        /******************************************************
         * TEMPORARY AUTHENTICATION
         *
         * Replace later with Google Apps Script.
         ******************************************************/

        if (
            username === "admin" &&
            password === "admin123"
        ) {

            sessionStorage.setItem(
                "authenticated",
                "true"
            );

            sessionStorage.setItem(
                "username",
                username
            );

            this.success();

        }

        else {

            this.failed();

        }

    }

    /**********************************************************
     * LOGIN SUCCESS
     **********************************************************/

    success() {

        if (typeof AI !== "undefined") {

            AI.setSecurityStatus("Secure");

            AI.showNotification(
                "Authentication Successful"
            );

        }

        if (this.aiCore) {

            this.aiCore.classList.remove("expand");

            this.aiCore.classList.add("shrink");

        }

        setTimeout(() => {

            window.location.href =
                "dashboard.html";

        }, 1500);

    }

    /**********************************************************
     * LOGIN FAILED
     **********************************************************/

    failed() {

        if (typeof AI !== "undefined") {

            AI.setSecurityStatus("Offline");

            AI.showNotification(
                "Authentication Failed"
            );

        }

        alert("Invalid username or password.");

    }

    /**********************************************************
     * LOGOUT
     **********************************************************/

    logout() {

        sessionStorage.clear();

        document.dispatchEvent(
            new CustomEvent("logout")
        );

        window.location.href =
            "login.html";

    }

    /**********************************************************
     * ROUTE PROTECTION
     **********************************************************/

    protect() {

        const authenticated =
            sessionStorage.getItem(
                "authenticated"
            );

        if (authenticated !== "true") {

            window.location.href =
                "login.html";

        }

    }

}

/******************************************************************************
 * CREATE AUTH MANAGER
 ******************************************************************************/

const Auth =
    new AuthenticationManager();

/******************************************************************************
 * START AUTH SYSTEM
 ******************************************************************************/

window.addEventListener(
    "DOMContentLoaded",
    () => {

        Auth.init();

    }
);
