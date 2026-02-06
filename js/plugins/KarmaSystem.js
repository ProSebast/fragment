//=============================================================================
// KarmaSystem.js
//=============================================================================

/*:
 * @plugindesc Sistema visual de Karma para RPG Maker MV con elecciones integradas.
 * @author Plugin Creator
 * 
 * @param KarmaName1
 * @desc Nombre del primer karma
 * @default El Observador
 * 
 * @param KarmaColor1
 * @desc Color del primer karma (hex)
 * @default #00BFFF
 * 
 * @param KarmaName2
 * @desc Nombre del segundo karma
 * @default El Culpable
 * 
 * @param KarmaColor2
 * @desc Color del segundo karma (hex)
 * @default #FF6B6B
 * 
 * @param KarmaName3
 * @desc Nombre del tercer karma
 * @default El Oprimido
 * 
 * @param KarmaColor3
 * @desc Color del tercer karma (hex)
 * @default #FFD93D
 * 
 * @param KarmaName4
 * @desc Nombre del cuarto karma
 * @default El Privilegiado
 * 
 * @param KarmaColor4
 * @desc Color del cuarto karma (hex)
 * @default #6BCB77
 * 
 * @help
 * ============================================================================
 * INSTRUCCIONES
 * ============================================================================
 * 1. Coloca este archivo en: js/plugins/
 * 2. En el Plugin Manager, añade KarmaSystem.js
 * 3. Presiona Av Pág (PageDown) durante el juego para abrir/cerrar Karma
 * 4. Presiona ESC para cerrar
 * 
 * ============================================================================
 * SCRIPT CALLS - USO EN EVENTOS
 * ============================================================================
 * 
 * Para cambiar karma en una elección:
 *   $gameSystem.setChoiceKarmaEffect(optionIndex, karmaIndex, amount);
 *   Ejemplo: $gameSystem.setChoiceKarmaEffect(0, 0, 5);
 *            (La opción 0 aumenta El Observador en 5 puntos)
 * 
 * Para cambiar karma directamente:
 *   $gameSystem.changeKarma(karmaIndex, amount);
 *   Ejemplo: $gameSystem.changeKarma(0, 10);
 *            (Aumenta El Observador en 10 puntos)
 * 
 * Para obtener valor de karma:
 *   $gameSystem.getKarma(karmaIndex);
 * 
 * Para resetear karmas a 0:
 *   $gameSystem.resetAllKarmas();
 */

//=============================================================================
// CONFIGURACIÓN DEL PLUGIN
//=============================================================================

var KarmaIdentities = [
    { name: "El Observador", value: 0, color: "#00BFFF" },
    { name: "El Culpable", value: 0, color: "#FF6B6B" },
    { name: "El Oprimido", value: 0, color: "#FFD93D" },
    { name: "El Privilegiado", value: 0, color: "#6BCB77" }
];

var KarmaConfig = {
    windowWidth: 600,
    windowHeight: 400,
    barWidth: 200,
    barHeight: 30,
    padding: 20,
    backgroundColor: "rgba(20, 20, 30, 0.95)",
    textColor: "#FFFFFF",
    titleColor: "#FFD700",
    borderColor: "#444444"
};

//=============================================================================
// Game_System - Extensión para manejar Karma
//=============================================================================

var _KarmaSystem_Game_System_initialize = Game_System.prototype.initialize;
Game_System.prototype.initialize = function() {
    _KarmaSystem_Game_System_initialize.call(this);
    this.initKarmaSystem();
};

Game_System.prototype.initKarmaSystem = function() {
    this._karmas = [0, 0, 0, 0]; // Inicializar los 4 karmas en 0
    this._choiceKarmaEffects = {}; // Almacenar efectos de karma por opción
};

Game_System.prototype.getKarma = function(karmaIndex) {
    if (!this._karmas) this.initKarmaSystem();
    return this._karmas[karmaIndex] || 0;
};

Game_System.prototype.setKarma = function(karmaIndex, value) {
    if (!this._karmas) this.initKarmaSystem();
    if (karmaIndex >= 0 && karmaIndex < 4) {
        this._karmas[karmaIndex] = Math.max(0, Math.min(100, value));
        this.updateKarmaDisplay();
    }
};

Game_System.prototype.changeKarma = function(karmaIndex, amount) {
    if (!this._karmas) this.initKarmaSystem();
    if (karmaIndex >= 0 && karmaIndex < 4) {
        var newValue = this._karmas[karmaIndex] + amount;
        this._karmas[karmaIndex] = Math.max(0, Math.min(100, newValue));
        this.updateKarmaDisplay();
    }
};

Game_System.prototype.resetAllKarmas = function() {
    this._karmas = [0, 0, 0, 0];
    this.updateKarmaDisplay();
};

Game_System.prototype.updateKarmaDisplay = function() {
    if (KarmaIdentities) {
        for (var i = 0; i < KarmaIdentities.length; i++) {
            KarmaIdentities[i].value = this._karmas[i] || 0;
        }
    }
};

Game_System.prototype.setChoiceKarmaEffect = function(optionIndex, karmaIndex, amount) {
    var key = "choice_" + optionIndex;
    this._choiceKarmaEffects[key] = {
        karmaIndex: karmaIndex,
        amount: amount
    };
};

Game_System.prototype.getChoiceKarmaEffect = function(optionIndex) {
    var key = "choice_" + optionIndex;
    return this._choiceKarmaEffects[key] || null;
};

Game_System.prototype.clearChoiceKarmaEffects = function() {
    this._choiceKarmaEffects = {};
};

//=============================================================================
// Karma Display usando Canvas (más compatible)
//=============================================================================

//=============================================================================
// Scene_Karma - Escena para mostrar la ventana de Karma
//=============================================================================

function Scene_Karma() {
    this.initialize.apply(this, arguments);
}

Scene_Karma.prototype = Object.create(Scene_Base.prototype);
Scene_Karma.prototype.constructor = Scene_Karma;

Scene_Karma.prototype.initialize = function() {
    Scene_Base.prototype.initialize.call(this);
};

Scene_Karma.prototype.create = function() {
    Scene_Base.prototype.create.call(this);
    this.createBackground();
    this.createKarmaDisplay();
};

Scene_Karma.prototype.createBackground = function() {
    this._backgroundSprite = new Sprite();
    this._backgroundSprite.bitmap = new Bitmap(Graphics.width, Graphics.height);
    this._backgroundSprite.bitmap.fillRect(0, 0, Graphics.width, Graphics.height, "rgba(0, 0, 0, 0.5)");
    this.addChild(this._backgroundSprite);
};

Scene_Karma.prototype.createKarmaDisplay = function() {
    var x = (Graphics.width - KarmaConfig.windowWidth) / 2;
    var y = (Graphics.height - KarmaConfig.windowHeight) / 2;
    
    this._karmaSprite = new Sprite();
    this._karmaSprite.bitmap = new Bitmap(KarmaConfig.windowWidth, KarmaConfig.windowHeight);
    this._karmaSprite.x = x;
    this._karmaSprite.y = y;
    
    this.drawKarmaContent();
    this.addChild(this._karmaSprite);
};

Scene_Karma.prototype.drawKarmaContent = function() {
    var bitmap = this._karmaSprite.bitmap;
    var ctx = bitmap.context;
    
    // Fondo
    ctx.fillStyle = "rgba(20, 20, 30, 0.95)";
    ctx.fillRect(0, 0, KarmaConfig.windowWidth, KarmaConfig.windowHeight);
    
    // Título
    ctx.fillStyle = "#FFD700";
    ctx.font = "bold 32px Arial";
    ctx.textAlign = "center";
    ctx.fillText("KARMA", KarmaConfig.windowWidth / 2, 40);
    
    // Identidades - Obtener valores desde $gameSystem
    var yPos = 80;
    for (var i = 0; i < KarmaIdentities.length; i++) {
        var identity = {
            name: KarmaIdentities[i].name,
            value: $gameSystem.getKarma(i),
            color: KarmaIdentities[i].color
        };
        this.drawIdentity(ctx, identity, yPos);
        yPos += 80;
    }
    
    // Instrucciones
    ctx.fillStyle = "#888888";
    ctx.font = "14px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Presiona Av Pág o ESC para cerrar", KarmaConfig.windowWidth / 2, KarmaConfig.windowHeight - 20);
    
    bitmap._baseTexture.update();
};

Scene_Karma.prototype.drawIdentity = function(ctx, identity, yPos) {
    var padding = KarmaConfig.padding;
    var barWidth = KarmaConfig.barWidth;
    var barHeight = KarmaConfig.barHeight;
    
    // Nombre
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "left";
    ctx.fillText(identity.name, padding, yPos);
    
    // Valor
    ctx.fillStyle = "#AAAAAA";
    ctx.font = "16px Arial";
    ctx.fillText(identity.value + "/100", padding + barWidth + 30, yPos - 5);
    
    // Barra fondo
    ctx.fillStyle = "#333333";
    ctx.fillRect(padding, yPos + 10, barWidth, barHeight);
    
    // Barra progreso
    var filledWidth = (barWidth * identity.value) / 100;
    ctx.fillStyle = identity.color;
    ctx.fillRect(padding, yPos + 10, filledWidth, barHeight);
    
    // Borde
    ctx.strokeStyle = "#555555";
    ctx.lineWidth = 1;
    ctx.strokeRect(padding, yPos + 10, barWidth, barHeight);
};

Scene_Karma.prototype.update = function() {
    Scene_Base.prototype.update.call(this);
    if (Input.isTriggered('pagedown') || Input.isTriggered('cancel')) {
        this.popScene();
    }
};

Scene_Karma.prototype.popScene = function() {
    SceneManager.pop();
};

//=============================================================================
// ALIASING DE FUNCIONES EXISTENTES
//=============================================================================

// Hook en Window_ChoiceList para aplicar efectos de karma
var _KarmaSystem_Window_ChoiceList_callOkHandler = Window_ChoiceList.prototype.callOkHandler;
Window_ChoiceList.prototype.callOkHandler = function() {
    var effect = $gameSystem.getChoiceKarmaEffect(this._index);
    if (effect) {
        $gameSystem.changeKarma(effect.karmaIndex, effect.amount);
    }
    _KarmaSystem_Window_ChoiceList_callOkHandler.call(this);
};

// Hook en Window_ChoiceList para limpiar efectos cuando se muestra
var _KarmaSystem_Window_ChoiceList_initialize = Window_ChoiceList.prototype.initialize;
Window_ChoiceList.prototype.initialize = function(messageWindow) {
    $gameSystem.clearChoiceKarmaEffects();
    _KarmaSystem_Window_ChoiceList_initialize.call(this, messageWindow);
};

// Guardar update original de Scene_Map
var _Scene_Map_update_karma = Scene_Map.prototype.update;
Scene_Map.prototype.update = function() {
    _Scene_Map_update_karma.call(this);
    
    // Detectar si se presiona Av Pág (pagedown) para abrir Karma
    if (Input.isTriggered('pagedown') && !$gameParty.inBattle()) {
        SceneManager.push(Scene_Karma);
    }
};

//=============================================================================
// FIN DEL PLUGIN
//=============================================================================
