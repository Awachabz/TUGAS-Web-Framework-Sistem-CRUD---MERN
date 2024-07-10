document.addEventListener('DOMContentLoaded', () => {
    const kuotaForm = document.getElementById('kuotaForm');
    const kuotaList = document.getElementById('kuotaList');

    let kuotas = JSON.parse(localStorage.getItem('kuotas')) || [];

    const renderKuotas = () => {
        kuotaList.innerHTML = '';
        kuotas.forEach((kuota, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                ${kuota.nama} - Rp${kuota.harga} - ${kuota.jumlah}GB
                <div>
                    <button class="update" onclick="updateKuota(${index})">Update</button>
                    <button onclick="deleteKuota(${index})">Delete</button>
                </div>
            `;
            kuotaList.appendChild(li);
        });
    };

    const addKuota = (kuota) => {
        kuotas.push(kuota);
        localStorage.setItem('kuotas', JSON.stringify(kuotas));
        renderKuotas();
    };

    const updateKuota = (index) => {
        const nama = prompt('Nama baru:', kuotas[index].nama);
        const harga = prompt('Harga baru:', kuotas[index].harga);
        const jumlah = prompt('Jumlah baru (GB):', kuotas[index].jumlah);

        if (nama && harga && jumlah) {
            kuotas[index] = { nama, harga, jumlah };
            localStorage.setItem('kuotas', JSON.stringify(kuotas));
            renderKuotas();
        }
    };

    const deleteKuota = (index) => {
        kuotas.splice(index, 1);
        localStorage.setItem('kuotas', JSON.stringify(kuotas));
        renderKuotas();
    };

    window.updateKuota = updateKuota;
    window.deleteKuota = deleteKuota;

    kuotaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const nama = document.getElementById('nama').value;
        const harga = document.getElementById('harga').value;
        const jumlah = document.getElementById('jumlah').value;

        addKuota({ nama, harga, jumlah });

        kuotaForm.reset();
    });

    renderKuotas();
});
