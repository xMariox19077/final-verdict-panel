using Microsoft.AspNetCore.Mvc;
using FinalVerdictPanel.Models;
using System.Collections.Generic;
using System.Linq;

namespace FinalVerdictPanel.Controllers
{
    public class HomeController : Controller
    {
        // Örnek Veritabanı (Backend'de tutulan liste)
        private static List<TeamMember> teamMembers = new List<TeamMember>
        {
            new TeamMember { Id = 1, Name = "Muhammet", Role = "Frontend", Status = "Aktif", Description = "Arayüz geliştirmeleri ve kullanıcı deneyimi." },
            new TeamMember { Id = 2, Name = "İbrahim", Role = "Backend", Status = "Aktif", Description = "Sunucu tarafı mimarisi ve veritabanı." },
            new TeamMember { Id = 3, Name = "Burak", Role = "Tasarım", Status = "Aktif", Description = "UI/UX ve grafik tasarımları." },
            new TeamMember { Id = 4, Name = "Yağmur Karcıoğlu", Role = "Yönetim", Status = "Pasif", Description = "Proje takibi ve dokümantasyon süreci." }
        };

        // 13. Hafta: Routing (Ana Sayfa Yönlendirmesi)
        [HttpGet]
        public IActionResult Index()
        {
            return View(teamMembers);
        }

        // 13. Hafta: Form İşlemleri (Ara Katmandan gelen POST isteğini işleme)
        [HttpPost]
        public IActionResult Index(string searchInput, string roleSelect, string statusRadio)
        {
            var filteredData = teamMembers.AsQueryable();

            if (!string.IsNullOrEmpty(searchInput))
            {
                filteredData = filteredData.Where(m => m.Name.ToLower().Contains(searchInput.ToLower()));
            }

            if (!string.IsNullOrEmpty(roleSelect) && roleSelect != "Tümü")
            {
                filteredData = filteredData.Where(m => m.Role == roleSelect);
            }

            if (!string.IsNullOrEmpty(statusRadio) && statusRadio != "Tümü")
            {
                filteredData = filteredData.Where(m => m.Status == statusRadio);
            }

            return View(filteredData.ToList());
        }
    }
}