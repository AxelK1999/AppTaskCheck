//---------- SANITIZACION ---------

// Función para escapar caracteres HTML
export function escapeHTML(str) {
    return str.replace(/[&<>"'/]/g, function (char) {
        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;",
            "/": "&#x2F;"
        }[char];
    });
  }