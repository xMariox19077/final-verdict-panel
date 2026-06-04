const teamData = [
    { id: 1, name: "Muhammet", role: "Frontend", status: "Aktif", desc: "Arayüz geliştirmeleri ve kullanıcı deneyimi." },
    { id: 2, name: "İbrahim", role: "Backend", status: "Aktif", desc: "Sunucu tarafı mimarisi ve veritabanı." },
    { id: 3, name: "Burak", role: "Tasarım", status: "Aktif", desc: "UI/UX ve grafik tasarımları." },
    { id: 4, name: "Yağmur Karcıoğlu", role: "Yönetim", status: "Pasif", desc: "Proje takibi ve dokümantasyon süreci." },
    { id: 5, name: "Emirhan Kutan", role: "Ses", status: "Pasif", desc: "Oyun içi ses efektleri ve müzikler." }
];

const dataContainer = document.getElementById('dataContainer');
const searchInput = document.getElementById('searchInput');
const roleSelect = document.getElementById('roleSelect');
const statusRadios = document.getElementsByName('statusRadio');
const resetBtn = document.getElementById('resetBtn');
const noDataAlert = document.getElementById('noDataAlert');

function renderCards(data) {
    dataContainer.innerHTML = ''; // İçeriği temizle

    if (data.length === 0) {
        noDataAlert.classList.remove('d-none');
        return;
    } else {
        noDataAlert.classList.add('d-none');
    }

    data.forEach(item => {
        
        const badgeColor = item.status === 'Aktif' ? 'bg-success' : 'bg-danger';

        const cardHTML = `
            <div class="col-md-6 mb-4">
                <div class="card h-100 shadow-sm">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center mb-2">
                            <h5 class="card-title mb-0">${item.name}</h5>
                            <span class="badge ${badgeColor}">${item.status}</span>
                        </div>
                        <h6 class="card-subtitle mb-2 text-muted">${item.role}</h6>
                        <p class="card-text">${item.desc}</p>
                    </div>
                    <div class="card-footer bg-transparent border-top-0">
                        <button class="btn btn-sm btn-primary w-100">Profili İncele</button>
                    </div>
                </div>
            </div>
        `;
        dataContainer.innerHTML += cardHTML;
    });
}


function filterData() {
    const searchText = searchInput.value.toLowerCase();
    const selectedRole = roleSelect.value;
    
    
    let selectedStatus = "Tümü";
    for (const radio of statusRadios) {
        if (radio.checked) {
            selectedStatus = radio.value;
            break;
        }
    }

    const filteredData = teamData.filter(item => {
        const matchName = item.name.toLowerCase().includes(searchText);
        const matchRole = selectedRole === "Tümü" || item.role === selectedRole;
        const matchStatus = selectedStatus === "Tümü" || item.status === selectedStatus;

        return matchName && matchRole && matchStatus;
    });

    renderCards(filteredData);
}


searchInput.addEventListener('input', filterData);
roleSelect.addEventListener('change', filterData);
statusRadios.forEach(radio => radio.addEventListener('change', filterData));

// Filtreleri Temizle Butonu
resetBtn.addEventListener('click', () => {
    searchInput.value = '';
    roleSelect.value = 'Tümü';
    document.getElementById('statusAll').checked = true;
    filterData(); // Sayfayı ilk haline döndür
});


renderCards(teamData);