# SOHO GROUP — Nexo Central (`www.sohog.org`)

Portal corporativo raíz (**Entregable CR2 · Versión 1.3**) del holding empresarial **SOHO GROUP**, diseñado bajo dirección de arte editorial en **Fondo Blanco (`#FFFFFF` / `#FAFAFA`)** con selector interactivo de **Modo Noche (`#0A0A0A` / `#141414`)**.

## Ecosistema Operativo Dual
- **Nexo Central (Holding)**: [https://www.sohog.org](https://www.sohog.org)
- **SOHO STRATEGIES (Crecimiento & Disrupción)**: [https://www.strategies.sohog.org](https://www.strategies.sohog.org)
- **SOHO SOLUTIONS (Protección & Blindaje)**: [https://www.solutions.sohog.org](https://www.solutions.sohog.org)

## Arquitectura de Archivos
- `index.html`: Maquetación HTML5 semántica, metadatos SEO/Open Graph, JSON-LD y modales corporativos accesibles.
- `styles.css`: Sistema de diseño CSS precompilado (Zero-FOUC) con soporte completo para Modo Día (`data-theme="light"`) y Modo Noche (`data-theme="dark"`).
- `app.js`: Controlador ligero de tema (Día/Noche con persistencia en `localStorage`) y modales institucionales.
- `assets/`: Logotipos oficiales de `SOHO | GROUP`, `SOHO STRATEGIES` y `SOHO SOLUTIONS` (`.png` y `.svg`).
- `.htaccess` / `_headers`: Configuración de cabeceras de seguridad HTTP (`CSP`, `HSTS`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`) y compresión.
