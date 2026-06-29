/******************************************************************************
 * CyberShield Assist
 * Dashboard Manager
 * File: js/dashboard.js
 * Version: 1.0
 ******************************************************************************/

class DashboardManager {

    constructor() {

        // ==========================================
        // Dashboard Elements
        // ==========================================

        this.welcome =
            document.getElementById("welcomeUser");

        this.currentTime =
            document.getElementById("currentTime");

        this.currentDate =
            document.getElementById("currentDate");

        this.totalSessions =
            document.getElementById("totalSessions");

        this.activeCases =
            document.getElementById("activeCases");

        this.highRiskCases =
            document.getElementById("highRiskCases");

        this.completedSessions =
            document.getElementById("completedSessions");

        this.recentSessions =
            document.getElementById("recentSessions");

    }

    /******************************************************
     * Initialize Dashboard
     ******************************************************/

    init() {

        this.loadUser();

        this.startClock();

        this.loadStatistics();

        this.loadRecentSessions();

        console.log("Dashboard Ready.");

    }

    /******************************************************
     * Load Logged In User
     ******************************************************/

    loadUser() {

        const username =
            sessionStorage.getItem("username");

        if(this.welcome){

            this.welcome.innerHTML =
                "Welcome, <strong>" +
                (username || "User") +
                "</strong>";

        }

    }

    /******************************************************
     * Live Clock
     ******************************************************/

    startClock() {

        this.updateClock();

        setInterval(() => {

            this.updateClock();

        },1000);

    }

    updateClock(){

        const now = new Date();

        if(this.currentTime){

            this.currentTime.innerText =
                now.toLocaleTimeString();

        }

        if(this.currentDate){

            this.currentDate.innerText =
                now.toDateString();

        }

    }

    /******************************************************
     * Dashboard Statistics
     ******************************************************/

    loadStatistics(){

        /*
         * Temporary Data
         * Replace with Google Sheets later.
         */

        if(this.totalSessions)
            this.totalSessions.innerText = "0";

        if(this.activeCases)
            this.activeCases.innerText = "0";

        if(this.highRiskCases)
            this.highRiskCases.innerText = "0";

        if(this.completedSessions)
            this.completedSessions.innerText = "0";

    }

    /******************************************************
     * Recent Sessions
     ******************************************************/

    loadRecentSessions(){

        if(!this.recentSessions)
            return;

        this.recentSessions.innerHTML = `

            <div class="empty-state">

                No assistance sessions available.

            </div>

        `;

    }

    /******************************************************
     * Refresh Dashboard
     ******************************************************/

    refresh(){

        this.loadStatistics();

        this.loadRecentSessions();

    }

}

/******************************************************************************
 * Create Dashboard
 ******************************************************************************/

const Dashboard = new DashboardManager();

/******************************************************************************
 * Start Dashboard
 ******************************************************************************/

window.addEventListener("DOMContentLoaded",()=>{

    Dashboard.init();

});
