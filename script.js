document.getElementById('sortButton').addEventListener('click', async () => {
    const inputArray = document.getElementById('arrayInput').value
        .split(',')
        .map(num => parseInt(num.trim()));

    const [sortedArray, swaps] = await bubbleSort(inputArray);
    document.getElementById('swapCount').textContent = `Swaps: ${swaps}`;
    visualizeSorting(sortedArray);
});

async function bubbleSort(arr) {
    const n = arr.length;
    let swapped, swaps = 0;
    
    do {
        swapped = false;
        for (let i = 0; i < n - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]];
                swapped = true;
                swaps++;
                await sleep(100); // Add a delay to visualize each step
                visualizeSorting(arr);
            }
        }
    } while (swapped);

    return [arr, swaps];
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function visualizeSorting(arr) {
    const visualizationDiv = document.getElementById('visualization');
    visualizationDiv.innerHTML = '';
    const maxVal = Math.max(...arr);

    for (let i = 0; i < arr.length; i++) {
        const bar = document.createElement('div');
        bar.className = 'h-16 bg-blue-500';
        bar.style.width = `${(arr[i] / maxVal) * 100}%`;
        visualizationDiv.appendChild(bar);
    }
}
