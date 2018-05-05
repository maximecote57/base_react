export function orderAlphabeticallyAsc (items) {

    items.sort((a, b) => {

        if(a.name < b.name) return -1;
        if(a.name > b.name) return 1;
        return 0;

    })

}

export function orderAlphabeticallyDesc (items) {

    items.sort((a, b) => {

        if(a.name < b.name) return 1;
        if(a.name > b.name) return -1;
        return 0;

    })

}