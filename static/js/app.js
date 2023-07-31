export default class App {
    constructor(){
        this.ctx = document.getElementById('pingChart').getContext('2d');
        this.chart;
    }

    get = () => {
        fetch('/ping_data')
        .then(response => response.json())
        .then(data => {
            this.chart.data.labels = Array.from(Array(data.length).keys());
            this.chart.data.datasets[0].data = data;
            this.chart.update();
        });
    }

    run = (Chart) => {
        this.chart = new Chart(this.ctx, {
            type: 'line',
            data: {
                labels: [],
                datasets: [{
                    label: 'Latency',
                    data: [],
                    borderColor: '#7494ec',
                    // backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    backgroundColor: '#7494ec',
                    borderWidth: 3,
                    fill: false
                }]
            },
            options: {
                scales: {
                    x: {
                        type: 'linear',
                        position: 'bottom'
                    },
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });

        this.get();
        
        setInterval(() => {
            this.get();
        }, 2000);
    }
}