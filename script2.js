

// Function to handle the sorting based on the selected algorithm
document.getElementById('sortButton').addEventListener('click', async () => {
    const inputArray = document.getElementById('arrayInput').value
        .split(',')
        .map(num => parseInt(num.trim()));

    const selectedAlgorithm = document.getElementById('sortType').value;

    let sortedArray;
    let swaps;

    switch (selectedAlgorithm) {
        case 'bubble':
            [sortedArray, swaps] = await bubbleSort(inputArray);
            break;
        case 'insertion':
            [sortedArray, swaps] = await insertionSort(inputArray);
            break;
        case 'selection':
            [sortedArray, swaps] = await selectionSort(inputArray);
            break;
        case 'counting':
            [sortedArray, swaps] = await countingSort(inputArray);
            break;
        case 'merge':
            [sortedArray, swaps] = await mergeSort(inputArray);
            break;
        case 'quick':
            [sortedArray, swaps] = await quickSort(inputArray);
            break;
        case 'radix':
            [sortedArray, swaps] = await radixSort(inputArray);
            break;
        case 'bucket':
            [sortedArray, swaps] = await bucketSort(inputArray);
            break;
    }

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

async function insertionSort(arr) {
    let n = arr.length;
    let swaps = 0;
    
    for (let i = 1; i < n; i++) {
        let key = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j--;
            swaps++;
            await sleep(100); // Add a delay to visualize each step
            visualizeSorting(arr);
        }
        arr[j + 1] = key;
    }

    return [arr, swaps];
}

async function selectionSort(arr) {
    let n = arr.length;
    let swaps = 0;

    for (let i = 0; i < n - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            swaps++;
            await sleep(100); // Add a delay to visualize each step
            visualizeSorting(arr);
        }
    }

    return [arr, swaps];
}

async function countingSort(arr) {
    const max = Math.max(...arr);
    const min = Math.min(...arr);
    const range = max - min + 1;
    const count = new Array(range).fill(0);
    const output = new Array(arr.length);
    let swaps = 0;

    for (let i = 0; i < arr.length; i++) {
        count[arr[i] - min]++;
    }

    for (let i = 1; i < range; i++) {
        count[i] += count[i - 1];
    }

    for (let i = arr.length - 1; i >= 0; i--) {
        output[count[arr[i] - min] - 1] = arr[i];
        count[arr[i] - min]--;
        swaps++;
    }

    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
        renderArray(arr);
        await new Promise((resolve) => setTimeout(resolve, 100)); // Add a delay to visualize each step
    }

    return [arr, swaps];
}


async function mergeSort(arr) {
    async function mergeSortRecursive(arr, l, r) {
        if (l < r) {
            const m = Math.floor((l + r) / 2);
            await mergeSortRecursive(arr, l, m);
            await mergeSortRecursive(arr, m + 1, r);
            await merge(arr, l, m, r);
        }
    }

    async function merge(arr, l, m, r) {
        const n1 = m - l + 1;
        const n2 = r - m;
        const L = new Array(n1);
        const R = new Array(n2);

        for (let i = 0; i < n1; i++) {
            L[i] = arr[l + i];
        }
        for (let j = 0; j < n2; j++) {
            R[j] = arr[m + 1 + j];
        }

        let i = 0;
        let j = 0;
        let k = l;

        while (i < n1 && j < n2) {
            if (L[i] <= R[j]) {
                arr[k] = L[i];
                i++;
            } else {
                arr[k] = R[j];
                j++;
            }
            k++;
            renderArray(arr);
            await new Promise((resolve) => setTimeout(resolve, 100)); // Add a delay to visualize each step
        }

        while (i < n1) {
            arr[k] = L[i];
            i++;
            k++;
            renderArray(arr);
            await new Promise((resolve) => setTimeout(resolve, 100)); // Add a delay to visualize each step
        }

        while (j < n2) {
            arr[k] = R[j];
            j++;
            k++;
            renderArray(arr);
            await new Promise((resolve) => setTimeout(resolve, 100)); // Add a delay to visualize each step
        }
    }

    const swaps = 0;
    await mergeSortRecursive(arr, 0, arr.length - 1);
    return [arr, swaps];
}


async function quickSort(arr) {
    async function quickSortRecursive(arr, low, high) {
        if (low < high) {
            const pi = await partition(arr, low, high);
            await quickSortRecursive(arr, low, pi - 1);
            await quickSortRecursive(arr, pi + 1, high);
        }
    }

    async function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;
        for (let j = low; j < high; j++) {
            if (arr[j] < pivot) {
                i++;
                [arr[i], arr[j]] = [arr[j], arr[i]];
            }
        }
        [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
        renderArray(arr);
        await new Promise((resolve) => setTimeout(resolve, 100)); // Add a delay to visualize each step
        return i + 1;
    }

    await quickSortRecursive(arr, 0, arr.length - 1);
    return [arr, 0]; // As swaps are not being counted in this implementation
}


async function radixSort(arr) {
    const max = Math.max(...arr);
    const maxDigitCount = Math.ceil(Math.log10(max + 1));
    const buckets = Array.from({ length: 10 }, () => []);

    let swaps = 0;
    let divisor = 1;

    for (let k = 0; k < maxDigitCount; k++) {
        for (let num of arr) {
            const digit = Math.floor(num / divisor) % 10;
            buckets[digit].push(num);
        }

        let i = 0;
        for (let j = 0; j < 10; j++) {
            while (buckets[j].length > 0) {
                arr[i] = buckets[j].shift();
                swaps++;
                renderArray(arr);
                await new Promise((resolve) => setTimeout(resolve, 100)); // Add a delay to visualize each step
                i++;
            }
        }

        divisor *= 10;
    }

    return [arr, swaps];
}


async function bucketSort(arr) {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const bucketSize = 5;

    const bucketCount = Math.floor((max - min) / bucketSize) + 1;
    const buckets = new Array(bucketCount).fill().map(() => []);

    for (let num of arr) {
        const index = Math.floor((num - min) / bucketSize);
        buckets[index].push(num);
    }

    let k = 0;
    let swaps = 0;

    for (let i = 0; i < buckets.length; i++) {
        if (buckets[i].length > 0) {
            insertSort(buckets[i]);
            for (let j = 0; j < buckets[i].length; j++) {
                arr[k] = buckets[i][j];
                swaps++;
                renderArray(arr);
                await new Promise((resolve) => setTimeout(resolve, 100)); // Add a delay to visualize each step
                k++;
            }
        }
    }

    return [arr, swaps];
}

async function insertSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let currentVal = arr[i];
        let j = i - 1;
        while (j >= 0 && arr[j] > currentVal) {
            arr[j + 1] = arr[j];
            j--;
        }
        arr[j + 1] = currentVal;
    }
}


function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// function visualizeSorting(arr) {
//     const visualizationDiv = document.getElementById('visualization');
//     visualizationDiv.innerHTML = '';
//     const maxVal = Math.max(...arr);

//     for (let i = 0; i < arr.length; i++) {
//         const bar = document.createElement('div');
//         bar.className = 'h-16 bg-blue-500';
//         bar.style.width = `${(arr[i] / maxVal) * 100}%`;
//         visualizationDiv.appendChild(bar);
//     }
// }






function visualizeSorting(arr, algorithm) {
    const visualizationDiv = document.getElementById('visualization');
    visualizationDiv.innerHTML = '';

    if (algorithm === 'bubbleSort') {
        // Visualization code for bubble sort
        // ...
    } else if (algorithm === 'insertionSort') {
        // Visualization code for insertion sort
        // ...
    } else if (algorithm === 'selectionSort') {
        // Visualization code for selection sort
        // ...
    } else if (algorithm === 'countingSort') {
        // Visualization code for counting sort
        // ...
    } else if (algorithm === 'mergeSort') {
        // Visualization code for merge sort
        // ...
    } else if (algorithm === 'quickSort') {
        // Visualization code for quick sort
        // ...
    } else if (algorithm === 'radixSort') {
        // Visualization code for radix sort
        // ...
    } else if (algorithm === 'bucketSort') {
        // Visualization code for bucket sort
        // ...
    }

    // Common visualization code for all sorting methods
    const maxVal = Math.max(...arr);

    for (let i = 0; i < arr.length; i++) {
        const bar = document.createElement('div');
        bar.className = 'h-16 bg-blue-500';
        bar.style.width = `${(arr[i] / maxVal) * 100}%`;
        visualizationDiv.appendChild(bar);
    }
}



