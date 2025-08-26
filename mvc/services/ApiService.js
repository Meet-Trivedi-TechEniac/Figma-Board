/**
 * ApiService - Simulated API calls (replace with real HTTP later)
 */
class ApiService {
	/**
	 * Fetch filter options (regions, work types)
	 * @param {{simulateFailure?: boolean, delayMs?: number}} options
	 * @returns {Promise<{regions: string[], workTypes: string[]}>}
	 */
	static fetchFilterOptions(options = {}) {
		const { simulateFailure = false, delayMs = 5000 } = options;
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				if (simulateFailure) {
					reject(new Error('Failed to fetch filter options'));
					return;
				}
				resolve({
					regions: [
						'Bankstown',
						'Beacon - Blacktown',
						'Bowral',
						'Cityeast',
						'Dural',
						'Hawkesbury',
					],
					workTypes: [
						'Care Worker',
						'Domestic Assistance Worker',
						'Village Care Worker',
					],
				});
			}, delayMs);
		});
	}
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = ApiService;
} else {
	window.ApiService = ApiService;
}
