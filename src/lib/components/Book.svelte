<script>
	export let bookName;
	const book = new Map([
		['toan6cd', 'https://drive.google.com/file/d/1bJteL4PNuBhvVTJ9AaRV9vJo-3_iI3q6/preview'],
		['van6cd', 'https://drive.google.com/file/d/1jaLgQOXpZMEXr2fqYfdAVhi45xct6HSq/preview'],
		['tienganh6cd', 'https://drive.google.com/file/d/1gqASinjmDAEK4WghDjicZ0X6izSGYwNB/preview'],
		['toan6ctst', 'https://drive.google.com/file/d/1qgUmSVsDVjnHQCsOBYC4IlO9xYm8rlUS/preview'],
		['van6ctst', 'https://drive.google.com/file/d/1M1Tl3cr4pUpQFZEzWRGXsKSqAYk-8xYv/preview'],
		[
			'tienganh6friend+',
			'https://drive.google.com/file/d/1Wy8uKYDRL-vb8eiB7I0_3WUHdaYE7Jg1/preview'
		],
		['toan6kntt', 'https://drive.google.com/file/d/1jq_d3PschuMwYYN9vYwCqUY-D3wzSBbG/preview'],
		['van6kntt', 'https://drive.google.com/file/d/1s7YREGrkW2djcfisoVF_ZH2DITjXAjvo/preview'],
		['tienganh6gs', 'https://drive.google.com/file/d/1YzXBp2eeWZ6Q5mr7SfkBbJfABTzU3mNA/preview'] //global success
	]);
</script>

<iframe title="book" src={book.get(bookName)} width="500" height="700" allow="autoplay" />
