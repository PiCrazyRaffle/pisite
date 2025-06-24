// Sayfanın tüm HTML içeriği yüklendikten sonra çalışmaya başla
document.addEventListener('DOMContentLoaded', () => {

    // --- AYARLAR ---
    // 1. Yönlendirilecek uygulamanın adresi (BAŞINDA https:// OLMADAN!)
    const piAppUrl = 'picrazyraffle.pythonanywhere.com';
    
    // 2. Pi Browser'a gönderilecek olan, yukarıdaki adresten oluşturulan özel link
    const deepLinkUrl = `pi://browser.pi/${piAppUrl}`;


    // --- AÇILIR PENCERE (POPUP) MANTIĞI ---
    const popup = document.getElementById('popup-overlay');
    const closeButton = document.getElementById('close-popup');

    if (popup && closeButton) {
        // 10 saniye sonra popup'ı göster
        setTimeout(() => {
            popup.classList.remove('hidden');
        }, 10000);

        // Kapatma butonuna basıldığında popup'ı gizle
        closeButton.addEventListener('click', () => {
            popup.classList.add('hidden');
        });
    }


    // --- YÖNLENDİRME (DEEP LINK) MANTIĞI ---
    // .deep-link class'ına sahip tüm linkleri ve butonları seç
    const allDeepLinks = document.querySelectorAll('.deep-link');

    allDeepLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            // Linkin normal davranışını (sayfanın başına gitme gibi) engelle
            event.preventDefault(); 
            
            // Eğer kullanıcı mobil bir cihazdaysa, Pi Browser'a yönlendir
            if (/Android|webOS|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
                window.location.href = deepLinkUrl;
            } else {
                // Eğer masaüstündeyse, bir uyarı göster
                alert("Lütfen uygulamayı açmak için telefonunuzdaki Pi Browser'ı kullanın ve adres çubuğuna '" + piAppUrl + "' yazın.");
            }
        });
    });
});