/******************************************************************************
 * CyberShield Assist
 * API Manager
 * File: js/api.js
 * Version: 1.0
 ******************************************************************************/

class APIManager {

    constructor() {

        /**************************************************************
         * Google Apps Script Web App URL
         *
         * Replace after deployment.
         **************************************************************/

        this.baseURL = "";

        /**************************************************************
         * Request Timeout
         **************************************************************/

        this.timeout = 30000;

    }

    /**************************************************************
     * Set API URL
     **************************************************************/

    setBaseURL(url) {

        this.baseURL = url;

    }

    /**************************************************************
     * Generic POST Request
     **************************************************************/

    async post(action, data = {}) {

        if (!this.baseURL) {

            console.error("API URL not configured.");

            return {

                success: false,

                message: "API URL not configured."

            };

        }

        try {

            const controller = new AbortController();

            const timer = setTimeout(() => {

                controller.abort();

            }, this.timeout);

            const response = await fetch(this.baseURL, {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify({

                    action,

                    data

                }),

                signal: controller.signal

            });

            clearTimeout(timer);

            return await response.json();

        }

        catch(error){

            console.error(error);

            return {

                success:false,

                message:error.message

            };

        }

    }

    /**************************************************************
     * Save Assistance Session
     **************************************************************/

    async saveSession(session){

        return await this.post(

            "saveSession",

            session

        );

    }

    /**************************************************************
     * Load Dashboard Statistics
     **************************************************************/

    async getDashboardStatistics(){

        return await this.post(

            "dashboardStatistics"

        );

    }

    /**************************************************************
     * Load Recent Sessions
     **************************************************************/

    async getRecentSessions(){

        return await this.post(

            "recentSessions"

        );

    }

    /**************************************************************
     * Analyze Incident
     **************************************************************/

    async analyzeIncident(session){

        document.dispatchEvent(

            new CustomEvent(

                "incidentAnalysisStarted"

            )

        );

        return await this.post(

            "analyzeIncident",

            session

        );

    }

    /**************************************************************
     * Generate Recovery Plan
     **************************************************************/

    async generateRecoveryPlan(session){

        document.dispatchEvent(

            new CustomEvent(

                "recoveryPlanStarted"

            )

        );

        return await this.post(

            "generateRecoveryPlan",

            session

        );

    }

    /**************************************************************
     * AI Guided Interview
     **************************************************************/

    async guidedInterview(data){

        return await this.post(

            "guidedInterview",

            data

        );

    }

    /**************************************************************
     * Generate Report
     **************************************************************/

    async generateReport(data){

        return await this.post(

            "generateReport",

            data

        );

    }

    /**************************************************************
     * Follow Up
     **************************************************************/

    async saveFollowUp(data){

        return await this.post(

            "saveFollowUp",

            data

        );

    }

}

/******************************************************************************
 * Create API Manager
 ******************************************************************************/

const API = new APIManager();

/******************************************************************************
 * Example:
 *
 * API.setBaseURL(
 * "https://script.google.com/macros/s/XXXXXXXX/exec"
 * );
 *
 ******************************************************************************/
