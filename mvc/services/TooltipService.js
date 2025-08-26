/**
 * TooltipService - Initializes and disposes Bootstrap tooltips
 */
class TooltipService {
	static disposeAll() {
		const tooltipElements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
		tooltipElements.forEach(el => {
			const instance = window.bootstrap?.Tooltip?.getInstance?.(el);
			if (instance) instance.dispose();
		});
	}

	static init(containerSelector = '.ec-body') {
		this.disposeAll();
		const elements = document.querySelectorAll('[data-bs-toggle="tooltip"]');
		elements.forEach(el => {
			const existing = window.bootstrap?.Tooltip?.getInstance?.(el);
			if (existing) existing.dispose();
			if (window.bootstrap?.Tooltip) {
				new window.bootstrap.Tooltip(el, {
					container: containerSelector,
					boundary: 'clippingParents',
					fallbackPlacements: ['top', 'bottom', 'left', 'right']
				});
			}
		});
	}
}

if (typeof module !== 'undefined' && module.exports) {
	module.exports = TooltipService;
} else {
	window.TooltipService = TooltipService;
}
