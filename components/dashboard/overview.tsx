'use client';

import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartData,
    ChartOptions,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler,
);

interface OverviewProps {
    data: {
        labels: string[];
        thisYear: number[];
        lastYear: number[];
    };
}

export function Overview({ data }: OverviewProps) {
    const chartData: ChartData<'line'> = {
        labels: data.labels,
        datasets: [
            {
                label: 'This year',
                data: data.thisYear,
                borderColor: 'rgb(99, 102, 241)',
                backgroundColor: 'rgba(99, 102, 241, 0.1)',
                tension: 0.4,
                fill: true,
                pointStyle: 'circle',
            },
            {
                label: 'Last year',
                data: data.lastYear,
                borderColor: 'rgb(234, 179, 8)',
                backgroundColor: 'rgba(234, 179, 8, 0.1)',
                tension: 0.4,
                fill: true,
                pointStyle: 'circle',
            },
        ],
    };

    const options: ChartOptions<'line'> = {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
                labels: {
                    boxWidth: 8,
                    usePointStyle: true,
                    pointStyle: 'circle',
                },
            },
            title: {
                display: false,
            },
        },
        scales: {
            x: {
                grid: {
                    display: false,
                },
                border: {
                    display: false,
                },
                ticks: {
                    color: '#94a3b8',
                    font: {
                        size: 12,
                    },
                },
            },
            y: {
                border: {
                    display: false,
                    dash: [4, 4],
                },
                grid: {
                    color: '#e2e8f0',
                },
                ticks: {
                    color: '#94a3b8',
                    font: {
                        size: 12,
                    },
                    stepSize: 1,
                },
            },
        },
    };

    return (
        <div className="h-[350px] w-full">
            <Line options={options} data={chartData} />
        </div>
    );
}
