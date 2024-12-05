document.getElementById('generate-btn').addEventListener('click', generateWords);

function generateWords() {
    const word1Files = ['lists/adjektiivi.txt', 'lists/interjektio.txt'];
    const word2Files = ['lists/interjektio.txt', 'lists/substantiivi.txt'];

    const word1Promises = word1Files.map(file => fetch(file).then(response => response.text()));
    const word2Promises = word2Files.map(file => fetch(file).then(response => response.text()));

    Promise.all(word1Promises)
        .then(results => {
            let word1List = [];
            results.forEach(data => {
                word1List = word1List.concat(data.split('\n').filter(word => word.length === 4));
            });

            return word1List;
        })
        .then(word1List => {
            if (word1List.length === 0) {
                throw new Error('No 4-letter words available for word1.');
            }

            const word1 = word1List[Math.floor(Math.random() * word1List.length)];

            return Promise.all(word2Promises).then(results => {
                let word2List = [];
                results.forEach(data => {
                    word2List = word2List.concat(data.split('\n').filter(word => word.length === 4));
                });

                if (word2List.length === 0) {
                    throw new Error('No 4-letter words available for word2.');
                }

                const word2 = word2List[Math.floor(Math.random() * word2List.length)];

                document.getElementById('word-combination').innerText = `${word1} ${word2}`;
            });
        })
        .catch(error => console.error('Error fetching words:', error));
}