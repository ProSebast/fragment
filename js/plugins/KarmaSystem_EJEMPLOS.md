# KarmaSystem - Ejemplos de Uso en Eventos

## 📋 PASO A PASO: Crear una Escena con Elecciones y Karma

### Ejemplo 1: Dilema Moral Simple

**Situación**: Un NPC acusado de algo. El jugador decide qué hacer.

#### Pasos en el Event Editor:

1. **Mostrar mensaje** (Message > Show Text):
   ```
   NPC: "¿Me crees culpable?"
   ```

2. **Agregar avanzado** (Control > Script):
   ```javascript
   // Configurar el efecto de cada opción ANTES de mostrar elecciones
   $gameSystem.setChoiceKarmaEffect(0, 0, 5);   // "Observar" → +5 El Observador
   $gameSystem.setChoiceKarmaEffect(1, 1, 3);   // "Culpar" → +3 El Culpable
   $gameSystem.setChoiceKarmaEffect(2, 2, -2);  // "Defender" → -2 El Oprimido (paradoja)
   $gameSystem.setChoiceKarmaEffect(3, 3, 4);   // "Ignorar" → +4 El Privilegiado
   ```

3. **Show Choices**:
   - Option A: Observar y analizar la situación
   - Option B: Culparlo directamente
   - Option C: Defenderlo sin dudar
   - Option D: Seguir tu camino

4. **[When A]**: 
   ```
   Message: "Esperas y observas..."
   ```

5. **[When B]**:
   ```
   Message: "Lo acusas sin piedad..."
   ```

6. **[When C]**:
   ```
   Message: "Lo defiendes valientemente..."
   ```

7. **[When D]**:
   ```
   Message: "Prefieres no involucrarte..."
   ```

✅ **Resultado**: Los karmas se modifican automáticamente según la opción elegida

---

### Ejemplo 2: Branching Avanzado basado en Karma

**Situación**: El NPC recuerda tu opción anterior y reacciona según tus karmas.

```javascript
// Control > Conditional Branch
if ($gameSystem.getKarma(0) >= 50) {
    // Si El Observador es alto, el NPC te comenta algo que solo vería alguien atento
    Message: "Noto que observas mucho... *con desconfianza*"
}

if ($gameSystem.getKarma(1) >= 30) {
    // Si El Culpable es alto, el NPC teme que lo acuses
    Message: "Espero que no pienses acusarme..."
}

if ($gameSystem.getKarma(2) <= 20) {
    // Si El Oprimido es bajo, eres menos empático
    Message: "Tu indiferencia me ofende..."
}

if ($gameSystem.getKarma(3) >= 70) {
    // Si El Privilegiado es muy alto, eres alguien importante
    Message: "¡Tu presencia nos honra, noble personaje!"
}
```

---

## 📊 Tabla Rápida de Indices

| Índice | Karma | Color |
|--------|-------|-------|
| 0 | El Observador | 🔵 Azul |
| 1 | El Culpable | 🔴 Rojo |
| 2 | El Oprimido | 🟡 Amarillo |
| 3 | El Privilegiado | 🟢 Verde |

---

## 🎯 Ejemplo 3: Evento Completo - "La Prueba del Carácter"

```javascript
// ========== PÁGINA 1: DIÁLOGO INICIAL ==========

// Message
"Un mendigo te pide dinero.\n¿Qué haces?"

// Script (ANTES de elecciones)
$gameSystem.setChoiceKarmaEffect(0, 0, 2);  // Analizar → Observador +2
$gameSystem.setChoiceKarmaEffect(1, 3, 5);  // Ignorar → Privilegiado +5
$gameSystem.setChoiceKarmaEffect(2, 2, 4);  // Ayudar → Oprimido +4

// Show Choices (Dialogue Branch)
A: Observas el situación
B: Ignoras al mendigo
C: Le das dinero

// ========== CUANDO A (Observador) ==========
"Notas que usa un disfraz. Es un acróbata vagabundo..."
Message: "+2 El Observador"

// ========== CUANDO B (Privilegiado) ==========
"Pasas de largo. Es su problema."
Message: "+5 El Privilegiado"

// ========== CUANDO C (Oprimido) ==========
"Le das 50 monedas. Su sonrisa es genuina."
Message: "+4 El Oprimido"

// ========== DESPUÉS DE ELECCIONES ==========

// Condicional: Si Observador >= 5
if ($gameSystem.getKarma(0) >= 5) {
    Message: "Luego lo ves actuando en la plaza..."
    // Continúa trama especial
}

// Condicional: Si Oprimido >= 5
if ($gameSystem.getKarma(2) >= 5) {
    Message: "Ese acto de compasión te define..."
    // Reputación aumenta
}
```

---

## 💡 Tips Útiles

### Tip 1: Mostrar valores de Karma en eventos
```javascript
var obs = $gameSystem.getKarma(0);
var culp = $gameSystem.getKarma(1);
var opri = $gameSystem.getKarma(2);
var priv = $gameSystem.getKarma(3);

$gameVariables.setValue(1, obs);    // Variable 1 = Valor de El Observador
$gameVariables.setValue(2, culp);   // Variable 2 = Valor de El Culpable
$gameVariables.setValue(3, opri);   // Variable 3 = Valor de El Oprimido
$gameVariables.setValue(4, priv);   // Variable 4 = Valor de El Privilegiado
```

Luego puedes mostrar en mensajes:
```
Tu Karma Observador: \v[1]
Tu Karma Culpable: \v[2]
```

### Tip 2: Debug - Ver todos los karmas
```javascript
console.log("El Observador:", $gameSystem.getKarma(0));
console.log("El Culpable:", $gameSystem.getKarma(1));
console.log("El Oprimido:", $gameSystem.getKarma(2));
console.log("El Privilegiado:", $gameSystem.getKarma(3));
```

### Tip 3: Cambios sin elecciones
```javascript
// Simplemente cambiar un karma en cualquier momento
$gameSystem.changeKarma(0, 10);  // El Observador +10
```

### Tip 4: Resetter karmas
```javascript
// Si quieres empezar de cero en una escena nueva
$gameSystem.resetAllKarmas();
```

---

## ⚠️ Recordatorios

1. **SIEMPRE** configura los efectos ANTES de mostrar elecciones
2. Los karmas se limitan a 0-100 automáticamente
3. Presiona **Av Pág** en juego para ver los karmas en tiempo real
4. Los valores persisten durante toda la partida (hasta que resetees)
5. Puedes crear múltiples caminos en un evento basado en karmas previos
