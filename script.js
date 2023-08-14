let is24HourFormat = false;  // Variable global para llevar un registro del formato actual

// Función para obtener el nombre del día de la semana
function getDayName(dayIndex) {
    const days = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"];
    return days[dayIndex];
}

// Función para formatear números menores a 10 con un 0 al inicio
function formatNumber(number) {
    return number < 10 ? `0${number}` : `${number}`;
}

// Función para actualizar la hora en la página
function updateClock() {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.toLocaleString("en-US", { month: "long" }).toUpperCase();
    const day = now.getDate();
    const dayName = getDayName(now.getDay());

    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const session = hours >= 12 ? "PM" : "AM";

    document.getElementById("date").textContent = `${month} ${day}, ${year}`;
    document.getElementById("day").textContent = dayName;

    // Modificar el formato de horas basado en is24HourFormat
    if (is24HourFormat) {
        document.getElementById("hours").textContent = formatNumber(hours);
    } else {
        const formattedHours = hours % 12 === 0 ? 12 : hours % 12;
        document.getElementById("hours").textContent = formatNumber(formattedHours);
    }

    document.getElementById("minutes").textContent = formatNumber(minutes);
    document.getElementById("seconds").textContent = formatNumber(seconds);
    document.getElementById("session").textContent = session;
}

// Función para alternar el formato de hora (12-hr / 24-hr)
function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat; // Alternar el formato

    const sessionElement = document.getElementById("session");
    sessionElement.style.display = is24HourFormat ? 'none' : 'block'; // Ocultar/mostrar AM/PM

    updateClock();  // Actualizar el reloj inmediatamente para reflejar el cambio de formato
}

// Actualizar el reloj cada segundo
setInterval(updateClock, 1000);

// Agregar el evento de clic al botón para alternar el formato de hora
const toggleButton = document.getElementById("toggle-btn");
toggleButton.addEventListener("click", toggleTimeFormat);

// Llamar a updateClock inicialmente para establecer la hora correcta desde el inicio
updateClock();
