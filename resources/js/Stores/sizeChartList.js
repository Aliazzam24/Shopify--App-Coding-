import { defineStore } from 'pinia';


export const useSizeChartListStore = defineStore({
    id: 'sizechartlist',
    state: () => ({
        size_chart: [],
        processing: false,

        //modal
        active: false,
        modalDuplicate: false,
        modalTitle: '',
        modalContent: '',
        primaryAction: { content: '', onAction: () => {} },
        secondaryActions: []

    }),

    actions: {

        setInitData(data) {
            this.size_chart = data;

        },
        setSizeChartData(data) {
            Object.assign(this.$state, data);
        },


        // Quick Action table
        deleteSizeChart(id, selectedResources) {
            this.processing = true;
            axios.delete(`/delete/size_chart/${id}`)
                .then(() => {
                    // Remove the deleted chart from the list
                    this.size_chart = this.size_chart.filter((chart) => chart.id !== id);
                    // Reset selected resources after deletion
                    selectedResources.length = 0;
                    this.processing = false;
                })
                .catch(error => {
                    console.error(error);
                    this.processing = false;
                })
        },
        showDeleteModal(chartId) {
            this.primaryAction = {
                content: 'Delete',
                destructive: true,
                onAction: () => {
                    this.deleteSizeChart(chartId);
                    this.active = false;
                },
            };
            this.secondaryActions = [{ content: 'Cancel', onAction: () => (this.active = false) }];
            this.modalTitle = 'Delete this size chart';
            this.modalContent = 'Please be careful before deleting, this action cannot be undone!'
            this.active = true;
        },
        DuplicateSizeChart(id,selectedResources) {
            this.processing = true;
            axios.post(`/duplicate/size_chart/${id}`)
                .then(response => {
                    if (response.status === 200) {
                        this.size_chart.unshift(response.data);
                        this.processing = false;
                        selectedResources.length = 0;
                    }
                })
                .catch(error => {
                    console.error(error);
                    this.processing = false;
                })

        },
        showDuplicateModal(chartId, selectedResources) {
            this.primaryAction = {
                content: 'Duplicate',
                onAction: () => {
                    this.DuplicateSizeChart(chartId, selectedResources);
                    this.active = false;
                },
            };
            this.secondaryActions = [{ content: 'Cancel', onAction: () => (this.active = false) }];
            this.modalTitle = 'Duplicate size chart?';
            this.modalContent = 'This may take times, please wait...'
            this.active = true;
        },


        // bulkActions
        deleteSelectedSizeCharts(selectedResources) {
            this.processing = true;
            axios.delete('/delete/selected_size_charts', { data: { ids: selectedResources } })
                .then(() => {
                    this.size_chart = this.size_chart.filter(chart => !selectedResources.includes(chart.id));
                    this.processing = false;
                    selectedResources.length = 0;
                })
                .catch(() => {
                    alert('Error deleting selected size charts.');
                })
        },
        deactivateSelectedSizeCharts(selectedResources) {
            this.processing = true;
            axios.post('/deactivate/selected_size_charts', { ids: selectedResources })
                .then(response => {
                    this.size_chart = this.size_chart.map(chart =>
                        selectedResources.includes(chart.id)
                            ? { ...chart, status: 0 } // Change the status to inactive
                            : chart
                    );
                    selectedResources.length = 0;
                    this.processing = false;
                })
                .catch(() => {
                    alert('Error deactivating selected size charts.');
                })
        },

        //updated_at
        updateTime() {
            setInterval(() => {
                this.now = new Date();
            }, 1000);
        },
        timeDifference(previous) {
            const msPerMinute = 60 * 1000;
            const msPerHour = msPerMinute * 60;
            const msPerDay = msPerHour * 24;
            const msPerMonth = msPerDay * 30;

            const elapsed = new Date(this.now).getTime() - previous.getTime();

            if (elapsed < msPerMinute) {
                return Math.round(elapsed / 1000) == 1 ? 'a second ago' : Math.round(elapsed / 1000) + ' seconds ago';
            }
            else if (elapsed < msPerHour) {
                return Math.round(elapsed / msPerMinute) == 1 ? 'a minute ago' : Math.round(elapsed / msPerMinute) + ' minutes ago';
            }
            else if (elapsed < msPerDay) {
                return Math.round(elapsed / msPerHour) == 1 ? 'an hour ago' : Math.round(elapsed / msPerHour) + ' hours ago';
            }
            else if (elapsed < msPerMonth) {
                return Math.round(elapsed / msPerDay) == 1 ? 'a day ago' : Math.round(elapsed / msPerDay) + ' days ago';
            }
        },

    },
});
