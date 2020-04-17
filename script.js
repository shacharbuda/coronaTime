// Global setup
moment.locale('he');
const intlNumFormat = new Intl.NumberFormat().format;

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
			const res = await axios.get(`https://covid19.soficoop.com/country/${countryCode}?after=${currentDate}`);
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
    
    writeNumItem(TOTAL_CASES_ID, items.cases);
    writeNumItem(TODAY_CASES_ID, items.todayCases);
		writeNumItem(DEATHS_ID, items.deaths);

		const reportTime = items.timestamp;

		const fromNowText = moment(reportTime).fromNow();

		$(`#${TIME_ID}`).text(fromNowText);
  }
  
  const writeNumItem = (itemHtmlId, itemNumValue) => {
    const itemStrValue = intlNumFormat(itemNumValue);

    $(`#${itemHtmlId}`).text(itemStrValue);
  }
	
