
var Tools = function (){

  this.getScaledFontSize = function(textConfig){
  
    var maxHeight = (textConfig.maxHeight instanceof Function) ? textConfig.maxHeight.call(this) : textConfig.maxHeight;
    var fontRatio,
    fontBase,
    fontSize;
    //check if it exceeds max height

    if(textConfig.currentHeight && maxHeight !== null) {
      
      if(textConfig.currentHeight > maxHeight) {
        fontRatio = maxHeight / textConfig.currentHeight;
       
        fontBase = fontRatio * textConfig.currentFontSize;
        fontSize = fontBase > textConfig.maxFont ? textConfig.maxFont : fontBase < textConfig.minFont ? textConfig.minFont : fontBase;
      }
    } else {
      fontRatio = textConfig.maxWidth / textConfig.currentWidth,
      fontBase = fontRatio * textConfig.currentFontSize,
      fontSize = fontBase > textConfig.maxFont ? textConfig.maxFont : fontBase < textConfig.minFont ? textConfig.minFont : fontBase;
    }

    return fontSize;
  }

  this.getMaxNumberInArray = function(arrNumbers){

    return Math.max.apply( Math, arrNumbers );

  }

  this.getRandomNumber = function(maxValue, onlyPositive, minValue) {
    
    var isPositive = Math.round(Math.random());

    if (onlyPositive != undefined && onlyPositive) isPositive = true;

    var nb = Math.round(Math.random() * maxValue);

    if (minValue != undefined && nb < minValue)
      nb = minValue;

    if (isPositive) return nb;
    return -nb;
  }
  
}

module.exports = new Tools();