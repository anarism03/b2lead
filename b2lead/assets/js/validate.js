// validate.js

function isValidEmail(email) {
  // E-posta doğrulama regex'i (daha güçlü bir regex kullanabilirsiniz)
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function isValidPhoneNumber(phoneNumber) {
  // Telefon numarası doğrulama regex'i (ülke koduna göre özelleştirebilirsiniz)
  const phoneRegex = /^\d{10}$/; // Örnek: 10 haneli telefon numarası
  return phoneRegex.test(phoneNumber);
}