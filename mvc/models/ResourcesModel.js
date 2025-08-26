// /**
//  * Resources Model - Manages calendar resources data
//  */
// class ResourcesModel {
// 	constructor() {
// 		this.resources = [];
// 		this.observers = [];
// 	}

// 	setResources(resources) {
// 		this.resources = Array.isArray(resources) ? resources : [];
// 		this.notify();
// 	}

// 	getResources() {
// 		return Array.isArray(this.resources) ? this.resources : [];
// 	}

// 	updateResource(predicate, updater) {
// 		this.resources = this.resources.map(r => (predicate(r) ? updater(r) : r));
// 		this.notify();
// 	}

// 	addResource(resource) {
// 		this.resources = [...this.resources, resource];
// 		this.notify();
// 	}

// 	removeResource(predicate) {
// 		this.resources = this.resources.filter(r => !predicate(r));
// 		this.notify();
// 	}

// 	subscribe(callback) {
// 		this.observers.push(callback);
// 	}

// 	unsubscribe(callback) {
// 		this.observers = this.observers.filter(obs => obs !== callback);
// 	}

// 	notify() {
// 		this.observers.forEach(cb => {
// 			try { cb(this.getResources()); } catch (e) { console.error('ResourcesModel observer error', e); }
// 		});
// 	}
// }

// if (typeof module !== 'undefined' && module.exports) {
// 	module.exports = ResourcesModel;
// } else {
// 	window.ResourcesModel = ResourcesModel;
// }




/**
 * Resources Model - Manages calendar resources data
 */
/**
 * Resources Model - Manages calendar resources data
 */
class ResourcesModel {
	constructor() {
		this.resources = [{ id: "loading", title: "Loading..." }];
		this.observers = [];
		this.isLoading = false;
		this.isError = false;
	}

	async fetchResources(options = {}) {
		const { simulateFailure = false, delayMs = 5000 } = options;
		this.isLoading = true;
		this.isError = false;
		this.resources = [{ id: "loading", title: "Loading..." }];
		console.log('Setting loading state:', this.resources); // Add this
		this.notify();

		try {
			const response = await new Promise((resolve, reject) => {
				setTimeout(() => {
					if (simulateFailure) {
						reject(new Error('Failed to fetch resources'));
						return;
					}
					resolve({
						"@odata.context": "https://aahdevelopment.crm6.dynamics.com/api/data/v9.1/$metadata#bookableresources(name,resourcetype,UserId(photourl))",
						"value": [
							{
								"@odata.etag": "W/\"566454569\"",
								"bookableresourceid": "b3141cf1-91e1-ee11-904c-000d3aca6924",
								"name": "Jamie Higgins",
								"resourcetype": 3,
								"UserId": {
									"ownerid": "cc428a1d-ac0b-ed11-b83d-00224891bbb1",
									"systemuserid": "cc428a1d-ac0b-ed11-b83d-00224891bbb1",
									"photourl": null
								}
							},
							// ... other resources ...
						]
					});
				}, delayMs);
			});

			const mappedResources = response.value.map((r) => ({
				id: r.bookableresourceid,
				title: r.name,
				extendedProps: {
					imgUrl: r.UserId?.photourl ?? "/Assets/profiles/R2.jpg",
					name: r.name,
					totalTime: r.resourcetype
				}
			}));

			console.log('Mapped Resources:', mappedResources);

			this.isLoading = false;
			this.isError = false;
			this.resources = mappedResources;
			this.notify();
			return mappedResources;
		} catch (error) {
			console.error("Error fetching resources:", error);
			this.isLoading = false;
			this.isError = true;
			this.resources = [{ id: "error", title: "Error loading resources" }];
			console.log('Setting error state:', this.resources); // Add this
			this.notify();
			return [];
		}
	}

	setResources(resources) {
		this.resources = Array.isArray(resources) ? resources : [];
		this.notify();
	}

	getResources() {
		return Array.isArray(this.resources) ? this.resources : [];
	}

	updateResource(predicate, updater) {
		this.resources = this.resources.map(r => (predicate(r) ? updater(r) : r));
		this.notify();
	}

	addResource(resource) {
		this.resources = [...this.resources, resource];
		this.notify();
	}

	removeResource(predicate) {
		this.resources = this.resources.filter(r => !predicate(r));
		this.notify();
	}

	subscribe(callback) {
		this.observers.push(callback);
	}

	unsubscribe(callback) {
		this.observers = this.observers.filter(obs => obs !== callback);
	}

	notify() {
		console.log('Notifying observers with resources:', this.resources, 'isLoading:', this.isLoading, 'isError:', this.isError); // Add this
		this.observers.forEach(cb => {
			try { cb(this.getResources(), { isLoading: this.isLoading, isError: this.isError }); } catch (e) { console.error('ResourcesModel observer error', e); }
		});
	}
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = ResourcesModel;
} else {
	window.ResourcesModel = ResourcesModel;
}

