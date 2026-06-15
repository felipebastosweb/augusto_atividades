function SpaceSimulation(canvasId) {
  this.canvas = document.getElementById(canvasId);
  if (!this.canvas) return;
  this.ctx = this.canvas.getContext('2d');
  
  // Simulation state
  this.isPlaying = true;
  this.mode = 'translation'; // 'rotation' or 'translation'
  this.speed = 1; // Speed multiplier (0.5 to 3)
  
  // Time tracking variables
  this.translationAngle = 0; // Earth's position in orbit (radians)
  this.rotationAngle = 0; // Earth's rotation on its axis (radians)
  
  // Constants
  this.TILT = 23.5 * Math.PI / 180; // Earth's tilt in radians
  
  // Dimensions (will be updated on resize)
  this.centerX = 0;
  this.centerY = 0;
  this.orbitRadiusX = 0;
  this.orbitRadiusY = 0;
  this.sunRadius = 0;
  this.earthRadius = 0;
  
  // Background stars
  this.stars = [];
  this.generateStars(100);
  
  // UI elements update callback
  this.onStateUpdate = null;
  
  // Setup and bind events
  this.setupResize();
  this.initControls();
  
  // Start loop
  this.animate();
}

SpaceSimulation.prototype.generateStars = function(count) {
  this.stars = [];
  for (var i = 0; i < count; i++) {
    this.stars.push({
      x: Math.random(),
      y: Math.random(),
      size: Math.random() * 1.5 + 0.5,
      brightness: Math.random() * 0.5 + 0.5,
      speed: Math.random() * 0.02 + 0.005
    });
  }
};

SpaceSimulation.prototype.setupResize = function() {
  var self = this;
  var resize = function() {
    // Get CSS dimensions
    var rect = self.canvas.getBoundingClientRect();
    self.canvas.width = rect.width * (window.devicePixelRatio || 1);
    self.canvas.height = rect.height * (window.devicePixelRatio || 1);
    
    self.centerX = self.canvas.width / 2;
    self.centerY = self.canvas.height / 2;
    
    // Responsive radii
    self.orbitRadiusX = self.canvas.width * 0.35;
    self.orbitRadiusY = self.canvas.height * 0.25;
    self.sunRadius = Math.min(self.canvas.width, self.canvas.height) * 0.08;
    
    if (self.mode === 'rotation') {
      self.earthRadius = Math.min(self.canvas.width, self.canvas.height) * 0.22;
    } else {
      self.earthRadius = Math.min(self.canvas.width, self.canvas.height) * 0.035;
    }
  };
  
  window.addEventListener('resize', resize);
  resize();
};

SpaceSimulation.prototype.initControls = function() {
  var self = this;
  // Buttons
  var btnPlayPause = document.getElementById('btnPlayPause');
  var btnModeRotation = document.getElementById('btnModeRotation');
  var btnModeTranslation = document.getElementById('btnModeTranslation');
  var speedSlider = document.getElementById('speedSlider');
  var speedValueDisplay = document.getElementById('speedValue');
  
  if (btnPlayPause) {
    btnPlayPause.addEventListener('click', function() {
      self.isPlaying = !self.isPlaying;
      btnPlayPause.innerHTML = self.isPlaying ? '<span class="glyphicon glyphicon-pause"></span> Pausar' : '<span class="glyphicon glyphicon-play"></span> Iniciar';
      
      if (self.isPlaying) {
        btnPlayPause.className = btnPlayPause.className.replace(/\bactive\b/g, '').trim();
      } else {
        if (btnPlayPause.className.indexOf('active') === -1) {
          btnPlayPause.className += ' active';
        }
      }
    });
  }
  
  var setModeUI = function(newMode) {
    self.mode = newMode;
    
    var toggleClass = function(elem, className, force) {
      if (!elem) return;
      var currentClasses = elem.className.split(' ');
      var index = currentClasses.indexOf(className);
      if (force) {
        if (index === -1) elem.className += ' ' + className;
      } else {
        if (index !== -1) {
          currentClasses.splice(index, 1);
          elem.className = currentClasses.join(' ');
        }
      }
      elem.className = elem.className.replace(/\s+/g, ' ').trim();
    };
    
    if (btnModeRotation && btnModeTranslation) {
      toggleClass(btnModeRotation, 'active', newMode === 'rotation');
      toggleClass(btnModeTranslation, 'active', newMode === 'translation');
    }
    
    // Update Earth size and center details
    if (newMode === 'rotation') {
      self.earthRadius = Math.min(self.canvas.width, self.canvas.height) * 0.22;
    } else {
      self.earthRadius = Math.min(self.canvas.width, self.canvas.height) * 0.035;
    }
  };
  
  if (btnModeRotation) {
    btnModeRotation.addEventListener('click', function() {
      setModeUI('rotation');
    });
  }
  
  if (btnModeTranslation) {
    btnModeTranslation.addEventListener('click', function() {
      setModeUI('translation');
    });
  }
  
  if (speedSlider) {
    var updateSpeed = function(e) {
      self.speed = parseFloat(e.target.value);
      if (speedValueDisplay) {
        speedValueDisplay.textContent = self.speed.toFixed(1) + 'x';
      }
    };
    speedSlider.addEventListener('input', updateSpeed);
    speedSlider.addEventListener('change', updateSpeed);
  }
};

SpaceSimulation.prototype.update = function() {
  if (!this.isPlaying) return;
  
  var baseRotationSpeed = 0.015;
  var baseTranslationSpeed = 0.003;
  
  // Update angles based on speed
  this.rotationAngle += baseRotationSpeed * this.speed;
  this.translationAngle += baseTranslationSpeed * this.speed;
  
  // Wrap angles
  if (this.rotationAngle > Math.PI * 2) this.rotationAngle -= Math.PI * 2;
  if (this.translationAngle > Math.PI * 2) this.translationAngle -= Math.PI * 2;
  
  // Animate stars twinkling slightly
  for (var i = 0; i < this.stars.length; i++) {
    var star = this.stars[i];
    star.brightness += (Math.random() - 0.5) * star.speed;
    if (star.brightness < 0.3) star.brightness = 0.3;
    if (star.brightness > 1) star.brightness = 1;
  }
  
  // Update textual information in the DOM
  this.updateInfoText();
};

SpaceSimulation.prototype.updateInfoText = function() {
  var seasonText = document.getElementById('seasonText');
  var descText = document.getElementById('descText');
  if (!seasonText || !descText) return;
  
  if (this.mode === 'rotation') {
    seasonText.innerHTML = '<span class="text-warning">Movimento de Rotação</span>';
    descText.innerHTML = 'A Terra gira em torno de seu próprio eixo inclinado.<br>' +
      '<strong>Sentido:</strong> de Oeste para Leste (anti-horário se vista do Polo Norte).<br>' +
      '<strong>Duração:</strong> ~24 horas (1 dia).<br>' +
      '<strong>Consequência:</strong> Sucessão de dias e noites e o movimento aparente do Sol no céu.';
  } else {
    var angleDeg = (this.translationAngle * 180 / Math.PI) % 360;
    var season = "";
    var detail = "";
    
    if (angleDeg >= 315 || angleDeg < 45) {
      season = "Solstício de Dezembro (21/12)";
      detail = "<strong>Verão no Hemisfério Sul</strong> e <strong>Inverno no Hemisfério Norte</strong>. O Hemisfério Sul recebe os raios solares de forma mais direta devido à inclinação do eixo terrestre.";
    } else if (angleDeg >= 45 && angleDeg < 135) {
      season = "Equinócio de Março (20/03)";
      detail = "<strong>Outono no Hemisfério Sul</strong> e <strong>Primavera no Hemisfério Norte</strong>. Os dois hemisférios recebem luz solar de forma igualitária. Os dias e as noites têm a mesma duração.";
    } else if (angleDeg >= 135 && angleDeg < 225) {
      season = "Solstício de Junho (21/06)";
      detail = "<strong>Inverno no Hemisfério Sul</strong> e <strong>Verão no Hemisfério Norte</strong>. O Hemisfério Norte está inclinado em direção ao Sol e recebe mais radiação solar direta.";
    } else {
      season = "Equinócio de Setembro (22/09)";
      detail = "<strong>Primavera no Hemisfério Sul</strong> e <strong>Outono no Hemisfério Norte</strong>. A luz do Sol atinge o equador diretamente, distribuindo calor igualmente pelos dois hemisférios.";
    }
    
    seasonText.innerHTML = '<span class="text-info">' + season + '</span>';
    descText.innerHTML = 'A Terra realiza sua órbita elíptica ao redor do Sol.<br>' +
      '<strong>Duração:</strong> 365 dias e 6 horas (Ano Bissexto a cada 4 anos).<br>' +
      '<strong>Inclinação:</strong> O eixo terrestre permanece inclinado a ~23,5°.<br>' +
      '<strong>Consequência:</strong> As estações do ano devido à variação de iluminação nos hemisférios.<br>' +
      '<div class="mt-2 text-muted-custom small" style="margin-top: 10px;">' + detail + '</div>';
  }
};

SpaceSimulation.prototype.draw = function() {
  // Clear canvas with space color
  this.ctx.fillStyle = '#05060f';
  this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  
  // Draw stars
  this.drawStars();
  
  if (this.mode === 'rotation') {
    this.drawRotationMode();
  } else {
    this.drawTranslationMode();
  }
};

SpaceSimulation.prototype.drawStars = function() {
  this.ctx.save();
  for (var i = 0; i < this.stars.length; i++) {
    var star = this.stars[i];
    this.ctx.fillStyle = 'rgba(255, 255, 255, ' + star.brightness + ')';
    this.ctx.beginPath();
    this.ctx.arc(star.x * this.canvas.width, star.y * this.canvas.height, star.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
  this.ctx.restore();
};

SpaceSimulation.prototype.drawRotationMode = function() {
  var earthX = this.centerX;
  var earthY = this.centerY;
  var r = this.earthRadius;
  
  // 1. Draw Sun's Rays (representing solar radiation coming from the left)
  this.ctx.save();
  this.ctx.strokeStyle = 'rgba(255, 183, 3, 0.15)';
  this.ctx.lineWidth = 2;
  for (var y = earthY - r; y <= earthY + r; y += 15) {
    if (Math.abs(y - earthY) < r) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, y);
      this.ctx.lineTo(earthX - Math.sqrt(r*r - Math.pow(y-earthY, 2)), y);
      this.ctx.stroke();
    }
  }
  // Draw a sun representation on the left margin
  var sunGrad = this.ctx.createRadialGradient(0, earthY, 10, 0, earthY, 100);
  sunGrad.addColorStop(0, 'rgba(255, 230, 0, 1)');
  sunGrad.addColorStop(0.3, 'rgba(255, 183, 3, 0.8)');
  sunGrad.addColorStop(1, 'rgba(255, 183, 3, 0)');
  this.ctx.fillStyle = sunGrad;
  this.ctx.beginPath();
  this.ctx.arc(0, earthY, 100, 0, Math.PI * 2);
  this.ctx.fill();
  this.ctx.restore();
  
  // 2. Draw Tilted Axis lines (drawn first so it's behind the earth sphere)
  this.ctx.save();
  this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  this.ctx.lineWidth = 2.5;
  if (this.ctx.setLineDash) {
    this.ctx.setLineDash([6, 6]);
  }
  this.ctx.beginPath();
  // North pole line extending up
  var poleLength = r * 1.35;
  var dx = poleLength * Math.sin(this.TILT);
  var dy = poleLength * Math.cos(this.TILT);
  this.ctx.moveTo(earthX + dx, earthY - dy);
  this.ctx.lineTo(earthX - dx, earthY + dy);
  this.ctx.stroke();
  this.ctx.restore();
  
  // 3. Draw Earth Body
  this.ctx.save();
  // Translate and rotate canvas to apply axial tilt
  this.ctx.translate(earthX, earthY);
  this.ctx.rotate(this.TILT);
  
  // Base blue planet
  var earthGrad = this.ctx.createRadialGradient(0, 0, r * 0.5, 0, 0, r);
  earthGrad.addColorStop(0, '#4ea8de');
  earthGrad.addColorStop(0.7, '#0077b6');
  earthGrad.addColorStop(1, '#03045e');
  this.ctx.fillStyle = earthGrad;
  this.ctx.beginPath();
  this.ctx.arc(0, 0, r, 0, Math.PI * 2);
  this.ctx.fill();
  
  // Draw Equator Line
  this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  this.ctx.lineWidth = 1.5;
  this.ctx.beginPath();
  if (this.ctx.ellipse) {
    this.ctx.ellipse(0, 0, r, r * 0.15, 0, 0, Math.PI, false);
    this.ctx.stroke();
    this.ctx.beginPath();
    this.ctx.ellipse(0, 0, r, r * 0.15, 0, Math.PI, Math.PI * 2, false);
    if (this.ctx.setLineDash) this.ctx.setLineDash([4, 4]);
    this.ctx.stroke();
    if (this.ctx.setLineDash) this.ctx.setLineDash([]);
  } else {
    this.ctx.save();
    this.ctx.scale(1, 0.15);
    this.ctx.arc(0, 0, r, 0, Math.PI * 2);
    this.ctx.stroke();
    this.ctx.restore();
  }
  
  // Draw simplified continents rotating
  this.ctx.fillStyle = 'rgba(40, 167, 69, 0.7)';
  var offset = this.rotationAngle % (Math.PI * 2);
  
  for (var c = 0; c < 3; c++) {
    var startAngle = (c * (2 * Math.PI / 3) + offset) % (2 * Math.PI);
    if (startAngle > Math.PI * 0.5 && startAngle < Math.PI * 1.5) {
      continue;
    }
    
    var relativeAngle = startAngle > Math.PI * 1.5 ? startAngle - Math.PI * 2 : startAngle;
    var xCenter = r * Math.sin(relativeAngle);
    var w = r * 0.5 * Math.cos(relativeAngle);
    var h = r * 0.4;
    
    this.ctx.beginPath();
    if (this.ctx.ellipse) {
      this.ctx.ellipse(xCenter, -r * 0.25 + (c % 2 === 0 ? r*0.1 : -r*0.1), Math.abs(w), h, 0, 0, Math.PI * 2);
    } else {
      this.ctx.save();
      this.ctx.translate(xCenter, -r * 0.25 + (c % 2 === 0 ? r*0.1 : -r*0.1));
      this.ctx.scale(Math.abs(w) / h, 1);
      this.ctx.arc(0, 0, h, 0, Math.PI * 2);
      this.ctx.restore();
    }
    this.ctx.fill();
  }
  
  // Atmosphere glow
  var atmGrad = this.ctx.createRadialGradient(0, 0, r * 0.95, 0, 0, r * 1.05);
  atmGrad.addColorStop(0, 'rgba(0, 210, 255, 0)');
  atmGrad.addColorStop(0.5, 'rgba(0, 210, 255, 0.4)');
  atmGrad.addColorStop(1, 'rgba(0, 210, 255, 0)');
  this.ctx.fillStyle = atmGrad;
  this.ctx.beginPath();
  this.ctx.arc(0, 0, r * 1.05, 0, Math.PI * 2);
  this.ctx.fill();
  
  this.ctx.restore();
  
  // 4. Draw Day/Night Shadow overlay
  this.ctx.save();
  this.ctx.beginPath();
  this.ctx.arc(earthX, earthY, r + 0.5, 0, Math.PI * 2);
  this.ctx.clip();
  
  var shadowGrad = this.ctx.createLinearGradient(earthX - r * 0.2, earthY, earthX + r * 0.4, earthY);
  shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  shadowGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.7)');
  shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0.98)');
  
  this.ctx.fillStyle = shadowGrad;
  this.ctx.fillRect(earthX - r, earthY - r, r * 2, r * 2);
  this.ctx.restore();
  
  // 5. Draw labels for Poles and Equator
  this.ctx.save();
  this.ctx.fillStyle = '#fff';
  this.ctx.font = '12px sans-serif';
  this.ctx.textAlign = 'center';
  
  var nX = earthX + (r * 1.1) * Math.sin(this.TILT);
  var nY = earthY - (r * 1.1) * Math.cos(this.TILT);
  this.ctx.fillText("Polo Norte (Céleste)", nX, nY - 8);
  
  var sX = earthX - (r * 1.1) * Math.sin(this.TILT);
  var sY = earthY + (r * 1.1) * Math.cos(this.TILT);
  this.ctx.fillText("Polo Sul (Céleste)", sX, sY + 16);
  
  this.ctx.textAlign = 'left';
  this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  var eqLabelX = earthX + r * 1.25;
  var eqLabelY = earthY + r * 0.2;
  this.ctx.fillText("Linha do Equador (Inclinada a 23.5°)", eqLabelX, eqLabelY);
  
  this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
  this.ctx.beginPath();
  this.ctx.moveTo(eqLabelX - 5, eqLabelY - 4);
  this.ctx.lineTo(earthX + r * 0.8, earthY + (r * 0.8 * Math.sin(this.TILT)));
  this.ctx.stroke();
  
  // 6. Draw rotation direction arrow (West -> East)
  this.ctx.strokeStyle = '#00d2ff';
  this.ctx.lineWidth = 3;
  this.ctx.beginPath();
  this.ctx.arc(earthX, earthY + r * 1.25, r * 0.3, -Math.PI * 0.2, Math.PI * 1.2);
  this.ctx.stroke();
  
  this.ctx.fillStyle = '#00d2ff';
  this.ctx.beginPath();
  var arrowX = earthX + r * 0.3 * Math.cos(-Math.PI * 0.2);
  var arrowY = (earthY + r * 1.25) + r * 0.3 * Math.sin(-Math.PI * 0.2);
  this.ctx.moveTo(arrowX - 8, arrowY - 2);
  this.ctx.lineTo(arrowX + 4, arrowY + 6);
  this.ctx.lineTo(arrowX - 2, arrowY + 8);
  this.ctx.fill();
  
  this.ctx.fillStyle = '#00d2ff';
  this.ctx.font = 'bold 13px sans-serif';
  this.ctx.textAlign = 'center';
  this.ctx.fillText("Sentido de Rotação: Oeste para Leste", earthX, earthY + r * 1.7);
  this.ctx.restore();
};

SpaceSimulation.prototype.drawTranslationMode = function() {
  // 1. Draw Orbit Ellipse
  this.ctx.save();
  this.ctx.strokeStyle = 'rgba(0, 210, 255, 0.15)';
  this.ctx.lineWidth = 1.5;
  this.ctx.beginPath();
  if (this.ctx.ellipse) {
    this.ctx.ellipse(this.centerX, this.centerY, this.orbitRadiusX, this.orbitRadiusY, 0, 0, Math.PI * 2);
  } else {
    this.ctx.save();
    this.ctx.translate(this.centerX, this.centerY);
    this.ctx.scale(this.orbitRadiusX / this.orbitRadiusY, 1);
    this.ctx.arc(0, 0, this.orbitRadiusY, 0, Math.PI * 2);
    this.ctx.restore();
  }
  this.ctx.stroke();
  this.ctx.restore();
  
  // 2. Draw Sun at the Center
  this.ctx.save();
  var sunGrad = this.ctx.createRadialGradient(this.centerX, this.centerY, this.sunRadius * 0.1, this.centerX, this.centerY, this.sunRadius);
  sunGrad.addColorStop(0, '#fffcf2');
  sunGrad.addColorStop(0.2, '#ffb703');
  sunGrad.addColorStop(0.8, '#ff5400');
  sunGrad.addColorStop(1, 'rgba(255, 84, 0, 0)');
  
  this.ctx.fillStyle = sunGrad;
  this.ctx.beginPath();
  this.ctx.arc(this.centerX, this.centerY, this.sunRadius, 0, Math.PI * 2);
  this.ctx.fill();
  this.ctx.restore();
  
  // 3. Draw Orbit Season Markers
  this.drawSeasonLabels();
  
  // 4. Calculate Earth's position in orbit
  var earthX = this.centerX + this.orbitRadiusX * Math.cos(this.translationAngle);
  var earthY = this.centerY + this.orbitRadiusY * Math.sin(this.translationAngle);
  var r = this.earthRadius;
  
  // Draw Earth Axis (drawn behind earth body)
  this.ctx.save();
  this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
  this.ctx.lineWidth = 1.5;
  if (this.ctx.setLineDash) this.ctx.setLineDash([4, 4]);
  var axisLen = r * 1.5;
  var ax = axisLen * Math.sin(this.TILT);
  var ay = axisLen * Math.cos(this.TILT);
  this.ctx.beginPath();
  this.ctx.moveTo(earthX + ax, earthY - ay);
  this.ctx.lineTo(earthX - ax, earthY + ay);
  this.ctx.stroke();
  this.ctx.restore();
  
  // Draw Earth Body
  this.ctx.save();
  this.ctx.translate(earthX, earthY);
  this.ctx.rotate(this.TILT);
  
  var earthGrad = this.ctx.createRadialGradient(0, 0, r * 0.4, 0, 0, r);
  earthGrad.addColorStop(0, '#4ea8de');
  earthGrad.addColorStop(0.7, '#0077b6');
  earthGrad.addColorStop(1, '#03045e');
  this.ctx.fillStyle = earthGrad;
  this.ctx.beginPath();
  this.ctx.arc(0, 0, r, 0, Math.PI * 2);
  this.ctx.fill();
  
  // Equator Line (Tilted)
  this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
  this.ctx.lineWidth = 1;
  this.ctx.beginPath();
  if (this.ctx.ellipse) {
    this.ctx.ellipse(0, 0, r, r * 0.15, 0, 0, Math.PI * 2);
  } else {
    this.ctx.save();
    this.ctx.scale(1, 0.15);
    this.ctx.arc(0, 0, r, 0, Math.PI * 2);
    this.ctx.restore();
  }
  this.ctx.stroke();
  
  this.ctx.restore();
  
  // Draw Day/Night Shadow based on actual Sun location
  var sunAngle = Math.atan2(earthY - this.centerY, earthX - this.centerX);
  
  this.ctx.save();
  this.ctx.beginPath();
  this.ctx.arc(earthX, earthY, r + 0.3, 0, Math.PI * 2);
  this.ctx.clip();
  
  this.ctx.translate(earthX, earthY);
  this.ctx.rotate(sunAngle);
  
  var shadowGrad = this.ctx.createLinearGradient(-r * 0.2, 0, r, 0);
  shadowGrad.addColorStop(0, 'rgba(0, 0, 0, 0)');
  shadowGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.75)');
  shadowGrad.addColorStop(1, 'rgba(0, 0, 0, 0.98)');
  
  this.ctx.fillStyle = shadowGrad;
  this.ctx.fillRect(-r, -r, r * 2, r * 2);
  this.ctx.restore();
  
  // 5. Draw light ray indication from Sun to Earth
  this.ctx.save();
  this.ctx.strokeStyle = 'rgba(255, 183, 3, 0.2)';
  this.ctx.lineWidth = 1;
  this.ctx.beginPath();
  this.ctx.moveTo(this.centerX, this.centerY);
  this.ctx.lineTo(earthX, earthY);
  this.ctx.stroke();
  this.ctx.restore();
};

SpaceSimulation.prototype.drawSeasonLabels = function() {
  var seasonPoints = [
    { angle: 0, text: "Solstício (Dezembro)", align: "left", ox: 25, oy: 5 },
    { angle: Math.PI / 2, text: "Equinócio (Março)", align: "center", ox: 0, oy: 25 },
    { angle: Math.PI, text: "Solstício (Junho)", align: "right", ox: -25, oy: 5 },
    { angle: 3 * Math.PI / 2, text: "Equinócio (Setembro)", align: "center", ox: 0, oy: -20 }
  ];
  
  this.ctx.save();
  this.ctx.font = '11px sans-serif';
  this.ctx.fillStyle = 'rgba(162, 168, 211, 0.6)';
  
  for (var i = 0; i < seasonPoints.length; i++) {
    var p = seasonPoints[i];
    var px = this.centerX + this.orbitRadiusX * Math.cos(p.angle);
    var py = this.centerY + this.orbitRadiusY * Math.sin(p.angle);
    
    // Draw indicator dot
    this.ctx.fillStyle = 'rgba(0, 210, 255, 0.3)';
    this.ctx.beginPath();
    this.ctx.arc(px, py, 4, 0, Math.PI * 2);
    this.ctx.fill();
    
    // Text
    this.ctx.fillStyle = 'rgba(162, 168, 211, 0.8)';
    this.ctx.textAlign = p.align;
    this.ctx.fillText(p.text, px + p.ox, py + p.oy);
  }
  this.ctx.restore();
};

SpaceSimulation.prototype.animate = function() {
  var self = this;
  this.update();
  this.draw();
  
  var requestAnim = window.requestAnimationFrame || 
                    window.webkitRequestAnimationFrame || 
                    window.mozRequestAnimationFrame || 
                    window.oRequestAnimationFrame || 
                    window.msRequestAnimationFrame || 
                    function(callback) { window.setTimeout(callback, 1000 / 60); };
                    
  requestAnim(function() {
    self.animate();
  });
};

// Instantiate simulation when DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
  window.simulationInstance = new SpaceSimulation('simCanvas');
});
