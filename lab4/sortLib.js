const SortLib = {

exchange(arr, asc = true){
    let comp = 0;
    let swaps = 0;

    for(let i = 0; i < arr.length-1; i++){
        for(let j = i+1; j < arr.length; j++){

            if(arr[i] === undefined || arr[j] === undefined){
                console.log("Undefined element detected");
                continue;
            }

            comp++;

            if((asc && arr[i] > arr[j]) || (!asc && arr[i] < arr[j])){
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                swaps++;
            }
        }
    }

    console.log("Exchange sort result:", arr);
    console.log("Comparisons:", comp);
    console.log("Swaps:", swaps);
},

selection(arr, asc = true){
    let comp = 0;
    let swaps = 0;

    for(let i = 0; i < arr.length-1; i++){
        let min = i;

        for(let j = i+1; j < arr.length; j++){

            if(arr[j] === undefined){
                console.log("Undefined element detected");
                continue;
            }

            comp++;

            if((asc && arr[j] < arr[min]) || (!asc && arr[j] > arr[min])){
                min = j;
            }
        }

        if(min !== i){
            let temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
            swaps++;
        }
    }

    console.log("Selection sort result:", arr);
    console.log("Comparisons:", comp);
    console.log("Swaps:", swaps);
},

insertion(arr, asc = true){
    let comp = 0;
    let moves = 0;

    for(let i = 1; i < arr.length; i++){
        let key = arr[i];
        let j = i - 1;

        while(j >= 0 && arr[j] !== undefined &&
            ((asc && arr[j] > key) || (!asc && arr[j] < key))){
            comp++;
            arr[j+1] = arr[j];
            j--;
            moves++;
        }

        arr[j+1] = key;
    }

    console.log("Insertion sort result:", arr);
    console.log("Comparisons:", comp);
    console.log("Moves:", moves);
},

shell(arr, asc = true){
    let comp = 0;
    let moves = 0;

    for(let gap = Math.floor(arr.length/2); gap > 0; gap = Math.floor(gap/2)){
        for(let i = gap; i < arr.length; i++){
            let temp = arr[i];
            let j = i;

            while(j >= gap &&
                ((asc && arr[j-gap] > temp) || (!asc && arr[j-gap] < temp))){
                comp++;
                arr[j] = arr[j-gap];
                j -= gap;
                moves++;
            }

            arr[j] = temp;
        }
    }

    console.log("Shell sort result:", arr);
    console.log("Comparisons:", comp);
    console.log("Moves:", moves);
},

quick(arr, asc = true){

    function quickSort(a, left, right){
        if(left >= right) return;

        let pivot = a[Math.floor((left+right)/2)];
        let i = left;
        let j = right;

        while(i <= j){

            while((asc && a[i] < pivot) || (!asc && a[i] > pivot)) i++;
            while((asc && a[j] > pivot) || (!asc && a[j] < pivot)) j--;

            if(i <= j){
                let temp = a[i];
                a[i] = a[j];
                a[j] = temp;
                i++;
                j--;
            }
        }

        quickSort(a, left, j);
        quickSort(a, i, right);
    }

    quickSort(arr,0,arr.length-1);

    console.log("Quick sort result:", arr);
}

}