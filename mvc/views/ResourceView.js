/**
 * Resource View - Handles rendering of resources in the calendar
 */
class ResourceView {
    constructor(calendarElementId) {
        this.calendarElement = document.querySelector(calendarElementId);
        if (!window.ecCalendar) {
            console.warn('FullCalendar instance (ecCalendar) not found during ResourceView init');
        }
    }

    renderResources(resources, { isLoading, isError }) {
        if (!window.ecCalendar) {
            console.warn('Cannot render resources: ecCalendar not initialized');
            return;
        }

        try {
            console.log('Setting resources in FullCalendar:', resources);
            window.ecCalendar.setOption('resources', resources);
            console.log('Resources set in FullCalendar, count:', resources.length);

            if (typeof window.refreshCalendarUI === 'function') {
                window.refreshCalendarUI();
            }
        } catch (error) {
            console.error('Error rendering resources:', error);
        }
    }

    renderResourceLabel(info) {
       
        const resource = info?.resource;
        const props = resource?.extendedProps;

        // Handle loading state
        if (resource?.id === "loading") {
            console.log('Rendering loading state'); // Debug log
            return {
                html: `<div class="person-details">
                        <div class="person-info">
                            <h5>Loading...</h5>
                        </div>
                    </div>`
            };
        }

        // Handle error state
        if (resource?.id === "error") {
            console.log('Rendering error state'); // Debug log
            return {
                html: `<div class="person-details">
                        <div class="person-info">
                            <h5 style="color:red;">Error loading resources</h5>
                        </div>
                    </div>`
            };
        }

        // Handle normal resource
        if (!props || !props.imgUrl || !props.name || !props.totalTime) {
            console.log('Rendering no content due to missing props:', props); // Debug log
            return {
                html: `<div class="person-details">No Content</div>`
            };
        }

        console.log('Rendering resource:', props.name); // Debug log
        return {
            html: `<div class="person-details">
                    <div class="profile-img">
                        <img src="${props.imgUrl}" alt="">
                    </div>
                    <div class="person-info">   
                        <h5>${props.name}</h5>
                    </div>
                </div>`
        };
    }

    init() {
        if (window.ecCalendar) {
            window.ecCalendar.setOption('resourceLabelContent', (info) => {
                console.log('Setting resourceLabelContent callback');
                return this.renderResourceLabel(info);
            });
            window.ecCalendar.setOption('resourceRender', (info) => {
                console.log('Setting resourceRender callback');
                return this.renderResourceLabel(info);
            });
            console.log('ResourceView initialized with resource callbacks');
        } else {
            console.warn('Cannot initialize ResourceView: ecCalendar not found');
        }
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = ResourceView;
} else {
    window.ResourceView = ResourceView;
}