# Plantilla web restaurante

## Estructura del proyecto

```
restaurante/
├── index.html          ← página principal (todo en una página)
├── css/
│   └── style.css       ← estilos propios
├── js/
│   └── main.js         ← lógica: carga carta, tabs, formulario
├── content/
│   └── menu.json       ← aquí se edita toda la carta
├── img/                ← carpeta de imágenes
│   └── (pon aquí las fotos de los platos)
└── admin/              ← carpeta reservada para Decap CMS (más adelante)
```

---

## Cómo editar la carta

Abre `content/menu.json`. La estructura es:

```json
{
  "categorias": [
    {
      "id": "para-comer",        ← identificador único (sin espacios)
      "nombre": "Para comer",    ← nombre que aparece en el tab
      "icono": "🍽️",
      "items": [
        {
          "nombre": "Croquetas de jamón",
          "descripcion": "Descripción del plato.",
          "precio": "8.50",
          "foto": "img/croquetas.jpg"   ← ruta a la imagen
        }
      ]
    }
  ]
}
```

Para añadir un plato: copia un bloque `{ }` dentro de `items` y rellena los campos.
Para añadir una categoría: copia un bloque de categoría completo y cambia el `id`.

---

## Imágenes

- Pon las fotos en la carpeta `img/`
- Tamaño recomendado: 600×400px o mayor, formato JPG o WebP
- Si no hay foto, se muestra el icono de la categoría automáticamente

---

## Subir a Netlify (paso a paso)

1. Crea cuenta en github.com y sube esta carpeta como repositorio
2. Crea cuenta en netlify.com
3. "Add new site → Import from GitHub" → selecciona el repositorio
4. Deja la configuración por defecto y pulsa "Deploy"
5. Netlify te da una URL tipo `turestaurante.netlify.app`

Cada vez que hagas cambios y los subas a GitHub, Netlify actualiza la web solo.

---

## Cambiar el dominio de Netlify

Por defecto la URL es aleatoria (ej: `jolly-fox-123.netlify.app`).
Para cambiarla a algo como `elrincondecasa.netlify.app`:
→ Netlify → Site settings → General → Site name → cambia el nombre

Para usar un dominio propio (elrincondecasa.com):
→ Netlify → Domain management → Add custom domain

---

## Personalizar el contenido

Busca y reemplaza en `index.html`:
- `El Rincón de Casa` → nombre del restaurante
- `Calle Mayor 14` → dirección real
- `965 00 12 34` → teléfono real
- `hola@elrincondecasa.es` → email real
- El texto de "Sobre nosotros" → historia real del restaurante

En `css/style.css` puedes cambiar:
- `--acento: #b5490a` → color principal (prueba otros en coolors.co)
- Las fuentes en el @import de Google Fonts

---

## Próximo paso: panel de administración (Decap CMS)

Cuando quieras que el dueño pueda editar sin tocar código,
el siguiente paso es añadir Decap CMS. Te genera un panel en /admin
donde el dueño puede editar la carta visualmente.
