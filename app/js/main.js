let nbuCourse = 0.0;
let agreementCourse = 0.0;
let exchangeDifference = 0.0;
let lead = null;

function initializeWidget() {

	ZOHO.embeddedApp.on("PageLoad", function (data) {

		lead = data;
		ZOHO.CRM.API.getRecord({
			Entity: "Leads", approved: "both", RecordID: lead.EntityId
		}).then(function (dataLead) {
			agreementCourse = dataLead.data[0].Exchange_Rates;

			$.ajax({
				url: 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json',
				method: 'GET',
				dataType: 'json',
				success: function (ajaxData) {

					nbuCourse = parseFloat(ajaxData[0].rate.toFixed(2));
					exchangeDifference = (((nbuCourse - agreementCourse) /  + nbuCourse) * 100).toFixed(2);

					$('#NBUcourse').val(nbuCourse);
					$('#AgreementCourse').val(agreementCourse);
					$('#ExchangeDifference').val(exchangeDifference);

					if (exchangeDifference >= 5.0) {
						$("#courseButton").removeAttr("disabled");
					}
				},
				error: function (error) {
					console.error('Error:', error);
				}
			});
		});

	});

	ZOHO.embeddedApp.init();
}