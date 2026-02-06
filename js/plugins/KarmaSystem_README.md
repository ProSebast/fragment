# KarmaSystem - Guía Completa de Uso

## Inicialización
El sistema de karma inicia con todos los valores en **0**. Los 4 karmas son:
1. **El Observador** (Azul)
2. **El Culpable** (Rojo)
3. **El Oprimido** (Amarillo)
4. **El Privilegiado** (Verde)

---

## 🎮 CÓMO USARLO EN EL EDITOR DE EVENTOS (RPG MAKER) - PASO A PASO

### PASO 1: Abre el Event Editor
1. En tu proyecto RPG Maker MV, abre un mapa
2. Haz doble clic en un evento para abrirlo
3. Verás la ventana "Event Editor"

### PASO 2: Agrega un Mensaje (Diálogo)
1. En la lista de comandos, haz clic en **"Message"** (Mostrar Mensaje)
2. Escribe el diálogo que quieres mostrar
   ```
   Ejemplo: "¿Qué haces ante esta situación?"
   ```
3. Haz clic en **OK**

### PASO 3: ⚠️ AGREGA EL SCRIPT DE KARMA (MUY IMPORTANTE - ANTES de las elecciones)
1. En la lista de comandos, haz clic en **Control > Advanced > Script** (Tab 3)
2. Verás una ventana de entrada de código
3. **COPIA Y PEGA** tu configuración de karma:

```javascript
$gameSystem.setChoiceKarmaEffect(0, 0, 5);
$gameSystem.setChoiceKarmaEffect(1, 1, 3);
$gameSystem.setChoiceKarmaEffect(2, 2, -2);
$gameSystem.setChoiceKarmaEffect(3, 3, 4);
```

4. Haz clic en **OK**

**EXPLICACIÓN DE CADA LÍNEA:**
```
$gameSystem.setChoiceKarmaEffect(ÍNDICE_OPCIÓN, ÍNDICE_KARMA, CANTIDAD);
```

**EJEMPLO DESGLOSADO:**
```javascript
$gameSystem.setChoiceKarmaEffect(0, 0, 5);
// ├─ Opción 0 (primera opción)
// ├─ Karma 0 (El Observador)
// └─ Cantidad +5 puntos
```

**TABLA DE KARMAS (índices 0-3):**
| Índice | Karma | Color |
|--------|-------|-------|
| 0 | El Observador | 🔵 Azul |
| 1 | El Culpable | 🔴 Rojo |
| 2 | El Oprimido | 🟡 Amarillo |
| 3 | El Privilegiado | 🟢 Verde |

### PASO 4: Muestra las Elecciones
1. En la lista de comandos, haz clic en **"Message > Show Choices"** (Tab 1)
2. Agrega tus opciones:
   - A: "Opción 1"
   - B: "Opción 2"
   - C: "Opción 3"
   - D: "Opción 4" (opcional)
3. Haz clic en **OK**

### PASO 5: Agrega respuestas por cada opción
Dentro de cada rama que se crea automáticamente:

1. **[When A]**: Agrega un mensaje o acciones para la opción 1
2. **[When B]**: Agrega un mensaje o acciones para la opción 2
3. **[When C]**: Agrega un mensaje o acciones para la opción 3
4. **[When D]**: Agrega un mensaje o acciones para la opción 4

---

## 📋 EJEMPLO PRÁCTICO COMPLETO

### Situación: Un NPC pide ayuda

**Evento Order:**
```
[1] --- Message ---
    NPC: "Alguien viene corriendo hacia ti"
    "¿Qué haces?"

[2] --- Control > Advanced > Script ---
    $gameSystem.setChoiceKarmaEffect(0, 0, 5);
    $gameSystem.setChoiceKarmaEffect(1, 1, 4);
    $gameSystem.setChoiceKarmaEffect(2, 2, 3);
    $gameSystem.setChoiceKarmaEffect(3, 3, -2);

[3] --- Message > Show Choices ---
    A: Observas detalladamente su expresión
    B: Lo acusas de algo
    C: Le ofreces ayuda inmediata
    D: Ignoras y sigues tu camino

    [When A]:
    [3a] --- Message ---
         "Observas sus gestos cuidadosamente..."
         (El Observador +5)

    [When B]:
    [3b] --- Message ---
         "Lo señalas con desconfianza..."
         (El Culpable +4)

    [When C]:
    [3c] --- Message ---
         "Le ofreces tu mano sin dudar..."
         (El Oprimido +3)

    [When D]:
    [3d] --- Message ---
         "Prefieres no involucrarte..."
         (El Privilegiado -2)
```

---

## 📸 VISUALIZACIÓN EN EL EVENT EDITOR

Cuando abras el evento, debería verse así en la interfaz:

```
├─ Message: "NPC: Alguien viene corriendo..."
├─ Script: $gameSystem.setChoiceKarmaEffect(...)
├─ Show Choices:
│  ├─ [A] Observas detalladamente...
│  │  └─ Message: "Observas sus gestos..."
│  ├─ [B] Lo acusas de algo...
│  │  └─ Message: "Lo señalas con desconfianza..."
│  ├─ [C] Le ofreces ayuda...
│  │  └─ Message: "Le ofreces tu mano..."
│  └─ [D] Ignoras y sigues...
│     └─ Message: "Prefieres no involucrarte..."
└─ ◆ (fin del evento)
```

---

## 🔧 EJEMPLOS DE CONFIGURACIÓN

### Ejemplo 1: Dilema Simple (2 karmas)
```javascript
$gameSystem.setChoiceKarmaEffect(0, 0, 5);   // Opción A → Observador +5
$gameSystem.setChoiceKarmaEffect(1, 1, 5);   // Opción B → Culpable +5
```

### Ejemplo 2: Diferencias Extremas
```javascript
$gameSystem.setChoiceKarmaEffect(0, 2, 10);   // Opción A → Oprimido +10
$gameSystem.setChoiceKarmaEffect(1, 3, -10);  // Opción B → Privilegiado -10
```

### Ejemplo 3: Con Penalizaciones
```javascript
$gameSystem.setChoiceKarmaEffect(0, 0, -5);   // Opción A → Observador -5
$gameSystem.setChoiceKarmaEffect(1, 1, -3);   // Opción B → Culpable -3
$gameSystem.setChoiceKarmaEffect(2, 2, 5);    // Opción C → Oprimido +5
```

### Ejemplo 4: Una opción sin cambios
```javascript
$gameSystem.setChoiceKarmaEffect(0, 0, 0);   // Opción A → Sin cambios (0 puntos)
$gameSystem.setChoiceKarmaEffect(1, 1, 5);   // Opción B → Culpable +5
```

---

## 💡 OTRAS FUNCIONES EN SCRIPT AVANZADO

### Ver el Karma en el Juego
1. Presiona **Av Pág** (Page Down) durante el juego
2. Se abre la pantalla de Karma
3. Presiona **ESC** para cerrar
4. Los valores se actualizan en tiempo real

### Cambiar karma directamente desde eventos
```javascript
// En Script (Control > Advanced > Script)
$gameSystem.changeKarma(0, 10);    // Aumenta El Observador en 10
$gameSystem.changeKarma(1, -5);    // Disminuye El Culpable en 5
```

### Obtener valor actual de karma
```javascript
var valor = $gameSystem.getKarma(0);  // Obtiene El Observador (0-100)
```

### Usar karma en condiciones del evento
Usa **Control > Conditional Branch** (Tab 3 > Advanced):

```javascript
// Ejemplo: Si El Observador >= 50, hacer algo
if ($gameSystem.getKarma(0) >= 50) {
    // Ejecuta código aquí si se cumple
}
```

### Setear karma a un valor exacto
```javascript
$gameSystem.setKarma(0, 75);  // El Observador = 75 (reemplaza el valor actual)
```

### Resetear todos los karmas a 0
```javascript
$gameSystem.resetAllKarmas();  // Todo vuelve a 0
```

---

## ⚡ REFERENCIA RÁPIDA DE SCRIPT CALLS

| Acción | Script |
|--------|--------|
| **Configurar karma por opción** | `$gameSystem.setChoiceKarmaEffect(opción, karma, cantidad);` |
| **Cambiar karma después** | `$gameSystem.changeKarma(karma, cantidad);` |
| **Obtener valor de karma** | `$gameSystem.getKarma(karma);` |
| **Setear valor exacto** | `$gameSystem.setKarma(karma, valor);` |
| **Resetear todo a 0** | `$gameSystem.resetAllKarmas();` |

**Índices válidos:**
- Opción: 0, 1, 2, 3 (según número de elecciones)
- Karma: 0-3 (El Observador, El Culpable, El Oprimido, El Privilegiado)
- Cantidad: cualquier número (positivo = aumenta, negativo = disminuye)

---

## ✅ CHECKLIST ANTES DE USAR

Asegúrate que:
- [ ] El plugin **KarmaSystem.js** está en `js/plugins/`
- [ ] El plugin está **activado** en Plugin Manager
- [ ] Has agregado el **Script ANTES** de Show Choices (IMPORTANTE)
- [ ] Los índices de karma son **0-3**
- [ ] Los índices de opción coinciden con tu número de elecciones
- [ ] No hay errores en la consola del navegador (F12)

---

## 📝 NOTAS IMPORTANTES

- Los valores de karma están limitados entre **0 y 100**
- Si intentas subir arriba de 100 o bajar de 0, se clampeará automáticamente
- Los efectos de karma se limpian después de cada elección
- Puedes usar condiciones en eventos para diferentes ramas según los valores de karma
- Los karmas persisten durante toda la partida (hasta que resetees)
- El sistema se guarda automáticamente en las saves
