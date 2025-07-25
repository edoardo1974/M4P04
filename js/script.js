var imagens = [];


async function loadImages() {
            const resposta = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=20');
            imagens = await resposta.json();

            const container = document.getElementById('todoTableBody');

            imagens.forEach(imagem => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${imagem.id}</td>
                    <td>${imagem.title}</td>
                    <td><img src="${imagem.thumbnailUrl}" alt="${imagem.title}" style="max-width: 100px; max-height: 100px; object-fit: cover;"></td>
                    <td><button onclick="apagarLinha(this)">Apagar</button></td>
                `;
                container.appendChild(row);
            });
        }
        
        loadImages();
    
/*function apagarTabela() {
    const container = document.getElementById('todoTableBody');
    container.innerHTML = '';
}*/



async function apagarLinha(button) {
    const row = button.closest('tr'); // Trova la riga padre
    const imageId = row.querySelector('td:first-child').textContent; // Ottieni l'ID dalla prima cella
    
    
        // Richiesta DELETE all'API
        const response = await fetch(`https://jsonplaceholder.typicode.com/photos/${imageId}`, {
            method: 'DELETE'
        });
        
        // Controlla se la richiesta è andata a buon fine
        if (response.ok) {
            console.log(`Album con ID ${imageId} eliminato con successo dall'API`);
            console.log('Codice di risposta:', response.status);

            // Rimuovi l'oggetto dall'array imagens
        imagens = imagens.filter(imagem => imagem.id != imageId);
            
            // Rimuovi la riga dalla vista solo se l'eliminazione API è riuscita
            row.remove();
        } else {
            console.error(`Errore nell'eliminazione dell'album ${imageId}`);
            console.error('Codice di risposta:', response.status);
        }
     
}

async function stampaAPI() {
    imagens.forEach(imagem => {
        console.log(`ID: ${imagem.id}, Title: ${imagem.title}, URL: ${imagem.url}`);
            });
}


async function aggiungiAlbum() {
    const nuovoAlbum = {
        albumId: 1,
        title: "Edoardo Mozzato",
        url: "https://cursos.com/wp-content/uploads/2021/04/academia-tokio-school.jpg",
        thumbnailUrl: null
    };
    
    try {
        // Richiesta POST all'API
        const response = await fetch('https://jsonplaceholder.typicode.com/photos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(nuovoAlbum)
        });
        
        if (response.ok) {
            const albumCreato = await response.json();
            console.log('Album aggiunto con successo all\'API:');
            console.log('Dati inviati:', nuovoAlbum);
            console.log('Risposta API:', albumCreato);
            console.log('Codice di risposta:', response.status);
            
            // OPZIONALE: Aggiungere anche all'array locale
            // imagens.push(albumCreato);
            
        } else {
            console.error('Errore nell\'aggiunta dell\'album');
            console.error('Codice di risposta:', response.status);
        }
    } catch (error) {
        console.error('Errore nella richiesta:', error);
    }
}
