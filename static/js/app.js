export default class App {
    constructor(){
        this.ctx = document.getElementById('pingChart').getContext('2d');
        this.container = document.getElementById('container');
        this.pingText = document.getElementById('pingText');
        this.chart;
    }

    onLatestPing = (data, cb) => {
        const num = data.length - 1;
        const ping = data[num];

        cb(ping);
    }

    get = () => {
        fetch('/ping_data')
        .then(response => response.json())
        .then(data => {
            this.chart.data.labels = Array.from(Array(data.length).keys());
            this.chart.data.datasets[0].data = data;
            this.chart.update();

            this.onLatestPing(data, (ping) => {
                this.pingText.innerHTML = ping;
            });
        });
    }

    onFullScreen = (cb) => {
        document.addEventListener('keydown', cb);
    }

    FullScreen = (document) => {
        if (document.requestFullscreen) {
            document.requestFullscreen();
        } else if (document.webkitRequestFullscreen) { /* Safari */
            document.webkitRequestFullscreen();
        } else if (document.msRequestFullscreen) { /* IE11 */
            document.msRequestFullscreen();
        }
    }

    run = (Chart) => {
        this.onFullScreen((e) => {
            if(e.key === 'f'){
                this.FullScreen(this.container);
            }
        });

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