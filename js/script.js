var imagens = [];


/**
 * Asynchronously fetches a list of album images from a local server,dynamically 
 * populates a table body with the image data and a delete button for each row.
 */
async function loadImages() {
            const db = await fetch('http://localhost:3000/albums?_limit=20');
            imagens = await db.json();

            const container = document.getElementById('todoTableBody');

            imagens.forEach(imagem => {
                const row = document.createElement('tr');
                if (imagem.title !== 'Edoardo Mozzato') {
                    row.innerHTML = `
                        <td>${imagem.id}</td>
                        <td>${imagem.title}</td>
                        <td><img src="${imagem.thumbnailUrl}" alt="${imagem.title}" style="max-width: 100px; max-height: 100px; object-fit: cover;"></td>
                        <td><button onclick="apagarLinha(this)">Apagar</button></td>
                    `;
                    container.appendChild(row);
                    }
            });
        }
        
        loadImages();

/**
 * Asynchronously deletes a table row and its corresponding album from the API.
 */
async function apagarLinha(button) {
    const row = button.closest('tr'); 
    const imageId = row.querySelector('td:first-child').textContent; 
        const response = await fetch(`http://localhost:3000/albums/${imageId}`, {
            method: 'DELETE'
        });
        if (response.ok) {
            console.log(`Album com ID ${imageId} eliminado com sucesso do API`);
            console.log('Código de resposta:', response.status);

            imagens = imagens.filter(imagem => imagem.id != imageId);
            row.remove();
        
        } else {
            console.error(`Erro ao eliminar álbum ${imageId}`);
            console.error('Código de resposta:', response.status);
        } 
}


/**
 * Asynchronously sends a POST request to add a new album to the API.
 * Logs the request and response details to the console.
 * Handles both successful and error responses.
 */
async function loadImageswithbutton() {
    const novoAlbum = {
        albumId: 1,
        title: "Edoardo Mozzato",
        url: "https://cursos.com/wp-content/uploads/2021/04/academia-tokio-school.jpg",
        thumbnailUrl: null
    };
    
        const response = await fetch('http://localhost:3000/albums', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(novoAlbum)
        });
        
        if (response.ok) {
            const albumcriado = await response.json();
            console.log('Álbum adicionado com sucesso à API:');
            console.log('Dados enviados:', novoAlbum);
            console.log('Resposta API:', albumcriado);
            console.log('Código de resposta:', response.status);
            
        } else {
            console.error('Errore nell\'aggiunta dell\'album');
            console.error('Codice di risposta:', response.status);
        }
}
