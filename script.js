	$(document).ready(async () => {
		let data;
		try {
			data = await getDataByCountry('il');
		} catch(e) {
			return;
		} finally {
			$('.spinner-container').fadeOut();
		}

		$('.data').fadeIn();

		const { snapshots } = data
		const sortedByTime = _.orderBy(snapshots, s => s.timestamp, ['desc'])
		const latest = _.first(sortedByTime);

		writeItems(latest);
	})

	const getDataByCountry = async (countryCode) => {
		try {
			const currentDate = moment().format('YYYY-MM-DD');
			const res = await axios.get(`http://covid19.soficoop.com/country/${countryCode}?after=${currentDate}`);
			return res.data;
		} catch(e) {
			alert("שגיאה");
			console.error('e ?', e);
			throw e;
		}
	}

	const writeItems = (items) => {

		const TOTAL_CASES_ID = "total";
		const TODAY_CASES_ID = "today";
		const DEATHS_ID = "deaths";
		const TIME_ID = "time-since-report";
		
		$(`#${TOTAL_CASES_ID}`).text(items.cases);

		$(`#${TODAY_CASES_ID}`).text(items.todayCases);
		
		$(`#${DEATHS_ID}`).text(items.deaths);

		const reportTime = items.timestamp;

		moment.locale('he');
		const fromNowText = moment(reportTime).fromNow();

		$(`#${TIME_ID}`).text(fromNowText);
	}
	
