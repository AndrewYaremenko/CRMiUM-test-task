$(document).ready(function () {
    const form = document.getElementById("courseForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let config = {
            Entity: "Leads",
            APIData: {
                "id": lead.EntityId,
                "Exchange_Rates": nbuCourse,
            },
            Trigger: ["workflow"]
        }
        ZOHO.CRM.API.updateRecord(config);

        $("#courseButton").attr("disabled", true);

    });
});
