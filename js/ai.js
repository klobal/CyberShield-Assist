/******************************************************************************
 * CyberShield Assist
 * AI Status & Message Engine
 * File: js/ai.js
 * Version: 1.0
 ******************************************************************************/

class AIStatusManager {

    constructor() {

        // ==========================
        // HTML ELEMENTS
        // ==========================

        this.statusPanel = document.getElementById("aiStatusPanel");
        this.statusText = document.getElementById("securityStatus");
        this.messageBox = document.getElementById("aiMessage");
        this.activityBox = document.getElementById("aiActivity");

        // ==========================
        // AI STATES
        // ==========================

        this.securityState = "Secure";

        this.messages = [

            "Initializing Recovery Intelligence...",

            "Loading Cyber Knowledge Base...",

            "Monitoring Threat Intelligence...",

            "Synchronizing Recovery Models...",

            "Protection Engine Online...",

            "Waiting for Secure Session...",

            "Ready to Assist Authorized Personnel."

        ];

        this.activities = [

            "Recovery Engine Ready",

            "Threat Intelligence Updated",

            "Knowledge Base Loaded",

            "Protection Services Active"

        ];

        this.messageIndex = 0;
        this.activityIndex = 0;

        this.messageTimer = null;
        this.activityTimer = null;

    }

    /*********************************************************
     * START ENGINE
     *********************************************************/

    start() {

        this.setSecurityStatus("Secure");

        this.showMessage(this.messages[0]);

        this.setActivity(this.activities[0]);

        this.startMessageCycle();

        this.startActivityCycle();

        console.log("AI Status Manager Started");

    }

    /*********************************************************
     * STOP ENGINE
     *********************************************************/

    stop() {

        clearInterval(this.messageTimer);
        clearInterval(this.activityTimer);

        console.log("AI Status Manager Stopped");

    }

    /*********************************************************
     * MESSAGE ROTATION
     *********************************************************/

    startMessageCycle() {

        this.messageTimer = setInterval(() => {

            this.nextMessage();

        }, 4000);

    }

    nextMessage() {

        this.messageIndex++;

        if (this.messageIndex >= this.messages.length) {

            this.messageIndex = 0;

        }

        this.showMessage(this.messages[this.messageIndex]);

    }

    showMessage(message) {

        if (!this.messageBox) return;

        this.messageBox.style.opacity = "0";

        setTimeout(() => {

            this.messageBox.innerText = message;

            this.messageBox.style.opacity = "1";

        }, 300);

    }

    /*********************************************************
     * ACTIVITY ROTATION
     *********************************************************/

    startActivityCycle() {

        this.activityTimer = setInterval(() => {

            this.activityIndex++;

            if (this.activityIndex >= this.activities.length) {

                this.activityIndex = 0;

            }

            this.setActivity(this.activities[this.activityIndex]);

        }, 6000);

    }

    setActivity(activity) {

        if (!this.activityBox) return;

        this.activityBox.innerText = activity;

    }

    /*********************************************************
     * SECURITY STATUS
     *********************************************************/

    setSecurityStatus(status) {

        this.securityState = status;

        if (!this.statusText) return;

        this.statusText.innerText = status;

    }

    /*********************************************************
     * THINKING MODE
     *********************************************************/

    showThinking() {

        this.showMessage("AI is thinking...");

    }

    hideThinking() {

        this.showMessage(this.messages[this.messageIndex]);

    }

    /*********************************************************
     * NOTIFICATIONS
     *********************************************************/

    showNotification(text) {

        const notification = document.createElement("div");

        notification.className = "ai-notification";

        notification.innerText = text;

        document.body.appendChild(notification);

        setTimeout(() => {

            notification.classList.add("show");

        }, 50);

        setTimeout(() => {

            notification.classList.remove("show");

            setTimeout(() => {

                notification.remove();

            }, 500);

        }, 3500);

    }

}

/******************************************************************************
 * CREATE AI STATUS MANAGER
 ******************************************************************************/

const AI = new AIStatusManager();

/******************************************************************************
 * APPLICATION EVENTS
 ******************************************************************************/

document.addEventListener("bootCompleted", () => {

    AI.start();

});

document.addEventListener("loginStarted", () => {

    AI.setSecurityStatus("Processing");

    AI.showMessage("Authenticating user...");

});

document.addEventListener("incidentAnalysisStarted", () => {

    AI.setSecurityStatus("Analyzing");

    AI.showMessage("Analyzing cyber incident...");

});

document.addEventListener("recoveryPlanStarted", () => {

    AI.setSecurityStatus("Generating");

    AI.showMessage("Generating personalized recovery plan...");

});

document.addEventListener("logout", () => {

    AI.stop();

});
