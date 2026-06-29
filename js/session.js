/******************************************************************************
 * CyberShield Assist
 * Session Manager
 * File: js/session.js
 * Version: 1.0
 ******************************************************************************/

class SessionManager {

    constructor() {

        // ==========================================================
        // SESSION INFORMATION
        // ==========================================================

        this.currentSession = {

            sessionId: null,

            complaintType: "",

            caseReference: "",

            complainantName: "",

            summary: "",

            notes: "",

            status: "New",

            startedAt: null

        };

        // ==========================================================
        // HTML ELEMENTS
        // ==========================================================

        this.complaintType =
            document.getElementById("complaintType");

        this.caseReference =
            document.getElementById("caseReference");

        this.complainantName =
            document.getElementById("complainantName");

        this.summary =
            document.getElementById("summary");

        this.notes =
            document.getElementById("notes");

        this.startButton =
            document.getElementById("startSession");

        this.saveButton =
            document.getElementById("saveSession");

        this.finishButton =
            document.getElementById("finishSession");

        this.sessionStatus =
            document.getElementById("sessionStatus");

    }

    /**************************************************************
     * INITIALIZE
     **************************************************************/

    init() {

        if (this.startButton) {

            this.startButton.addEventListener("click", () => {

                this.startSession();

            });

        }

        if (this.saveButton) {

            this.saveButton.addEventListener("click", () => {

                this.saveSession();

            });

        }

        if (this.finishButton) {

            this.finishButton.addEventListener("click", () => {

                this.finishSession();

            });

        }

        console.log("Session Manager Ready");

    }

    /**************************************************************
     * START SESSION
     **************************************************************/

    startSession() {

        this.currentSession.sessionId =
            "CSA-" + Date.now();

        this.currentSession.startedAt =
            new Date().toISOString();

        this.currentSession.status =
            "Active";

        this.readForm();

        this.updateStatus();

        document.dispatchEvent(

            new CustomEvent("sessionStarted", {

                detail: this.currentSession

            })

        );

        console.log(this.currentSession);

    }

    /**************************************************************
     * READ FORM
     **************************************************************/

    readForm() {

        this.currentSession.complaintType =
            this.complaintType?.value || "";

        this.currentSession.caseReference =
            this.caseReference?.value || "";

        this.currentSession.complainantName =
            this.complainantName?.value || "";

        this.currentSession.summary =
            this.summary?.value || "";

        this.currentSession.notes =
            this.notes?.value || "";

    }

    /**************************************************************
     * SAVE SESSION
     **************************************************************/

    saveSession() {

        this.readForm();

        sessionStorage.setItem(

            "currentSession",

            JSON.stringify(this.currentSession)

        );

        alert("Session saved successfully.");

    }

    /**************************************************************
     * LOAD SESSION
     **************************************************************/

    loadSession() {

        const data =
            sessionStorage.getItem("currentSession");

        if (!data)
            return;

        this.currentSession =
            JSON.parse(data);

        if (this.complaintType)
            this.complaintType.value =
                this.currentSession.complaintType;

        if (this.caseReference)
            this.caseReference.value =
                this.currentSession.caseReference;

        if (this.complainantName)
            this.complainantName.value =
                this.currentSession.complainantName;

        if (this.summary)
            this.summary.value =
                this.currentSession.summary;

        if (this.notes)
            this.notes.value =
                this.currentSession.notes;

        this.updateStatus();

    }

    /**************************************************************
     * FINISH SESSION
     **************************************************************/

    finishSession() {

        this.currentSession.status =
            "Completed";

        this.updateStatus();

        sessionStorage.removeItem(
            "currentSession"
        );

        alert("Assistance session completed.");

    }

    /**************************************************************
     * UPDATE STATUS
     **************************************************************/

    updateStatus() {

        if (!this.sessionStatus)
            return;

        this.sessionStatus.innerText =
            this.currentSession.status;

    }

}

/******************************************************************************
 * CREATE SESSION MANAGER
 ******************************************************************************/

const Session = new SessionManager();

/******************************************************************************
 * START SESSION MANAGER
 ******************************************************************************/

window.addEventListener("DOMContentLoaded", () => {

    Session.init();

    Session.loadSession();

});
