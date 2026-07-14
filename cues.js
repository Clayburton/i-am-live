/* ============================================================
   i am — cue sheet (the timeline)
   Reconstructed from frame-by-frame analysis of the source video:
     - BG / BG_CALM  : exact white/black CUT keyframes [t, color]
                       (auto-generated from per-frame luminance)
     - CUES          : text events with times taken from the real
                       cut boundaries; positions/sizes measured by OCR.
   Transitions default to a HARD CUT (the source cuts on the flip);
   `size` is % of viewport height (vh) to match the vertical original.
   ============================================================ */

/* ---------- EXACT BACKGROUND CUT TRACK (auto-generated) ---------- */
const BG = [[0,'#fff'], [1.335,'#000'], [9.71,'#fff'], [13.046,'#000'], [14.147,'#fff'], [17.484,'#000'], [18.585,'#fff'], [21.889,'#000'], [23.023,'#fff'], [27.494,'#000'], [30.831,'#fff'], [31.865,'#000'], [36.336,'#fff'], [39.706,'#000'], [40.774,'#fff'], [44.144,'#000'], [44.211,'#5b5b5b'], [44.244,'#000'], [44.711,'#fff'], [44.778,'#989898'], [44.811,'#858585'], [44.845,'#9a9a9a'], [45.045,'#979797'], [45.212,'#fff'], [45.245,'#000'], [49.683,'#fff'], [51.885,'#000'], [54.154,'#fff'], [58.625,'#000'], [60.761,'#fff'], [63.03,'#000'], [66.333,'#fff'], [67.534,'#000'], [69.67,'#fff'], [71.905,'#000'], [75.242,'#fff'], [76.343,'#000'], [78.579,'#fff'], [80.847,'#000'], [84.184,'#fff'], [85.252,'#000'], [88.588,'#494949'], [89.69,'#fff'], [91.892,'#000'], [93.026,'#fff'], [94.127,'#000'], [98.532,'#fff'], [105.272,'#000'], [106.373,'#fff'], [107.474,'#000'], [112.312,'#4a4a4a'], [112.346,'#707070'], [112.379,'#525252'], [112.412,'#000'], [113.614,'#4a4a4a'], [113.68,'#000'], [116.55,'#fff'], [116.583,'#767676'], [116.617,'#000'], [116.717,'#838383'], [116.75,'#fff'], [116.817,'#000'], [116.883,'#fff'], [116.984,'#858585'], [117.017,'#000'], [117.05,'#4d4d4d'], [117.084,'#929292'], [117.117,'#000'], [117.351,'#505050'], [117.417,'#000'], [118.085,'#fff'], [118.118,'#000'], [118.385,'#fff'], [118.418,'#000'], [118.518,'#9a9a9a'], [118.552,'#000'], [118.585,'#595959'], [118.618,'#000'], [118.885,'#676767'], [118.986,'#000'], [119.553,'#585858'], [119.586,'#000'], [119.653,'#484848'], [119.686,'#898989'], [119.72,'#000'], [120.354,'#464646'], [120.42,'#000'], [120.787,'#fff'], [120.821,'#000'], [121.221,'#696969'], [121.254,'#525252'], [121.288,'#000'], [125.392,'#575757'], [125.425,'#656565'], [125.459,'#858585'], [125.492,'#484848'], [125.525,'#5d5d5d'], [125.559,'#757575'], [125.626,'#8d8d8d'], [125.692,'#fff'], [125.726,'#929292'], [125.759,'#7c7c7c'], [125.792,'#545454'], [125.926,'#767676'], [125.993,'#696969'], [126.226,'#8c8c8c'], [126.293,'#7b7b7b'], [126.326,'#8a8a8a'], [126.36,'#7d7d7d'], [126.46,'#909090'], [126.493,'#7b7b7b'], [126.593,'#888888'], [126.627,'#fff'], [126.693,'#9f9f9f'], [126.727,'#fff'], [126.827,'#959595'], [126.893,'#868686'], [126.927,'#757575'], [126.96,'#969696'], [127.027,'#787878'], [127.06,'#999999'], [127.094,'#fff'], [127.127,'#939393'], [127.194,'#7d7d7d'], [127.26,'#6c6c6c'], [127.294,'#838383'], [127.327,'#6b6b6b'], [127.361,'#808080'], [127.561,'#646464'], [127.594,'#9a9a9a'], [127.627,'#818181'], [127.661,'#9a9a9a'], [127.694,'#7a7a7a'], [127.728,'#686868'], [127.861,'#7a7a7a'], [127.928,'#606060'], [127.995,'#717171'], [128.061,'#616161'], [128.095,'#000'], [128.128,'#545454'], [128.161,'#000'], [128.228,'#838383'], [128.295,'#494949'], [128.328,'#818181'], [128.362,'#000'], [128.495,'#787878'], [128.528,'#000'], [128.595,'#5d5d5d'], [128.629,'#9b9b9b'], [128.662,'#494949'], [128.695,'#000'], [128.762,'#515151'], [128.795,'#000'], [128.829,'#9f9f9f'], [128.895,'#000'], [129.296,'#585858'], [129.329,'#000'], [129.563,'#5b5b5b'], [129.596,'#000'], [130.063,'#4d4d4d'], [130.097,'#000'], [130.163,'#6e6e6e'], [130.197,'#fff'], [130.23,'#000'], [130.297,'#626262'], [130.364,'#7b7b7b'], [130.397,'#939393'], [130.43,'#818181'], [130.464,'#606060'], [130.53,'#a0a0a0'], [130.597,'#6d6d6d'], [130.631,'#939393'], [130.664,'#686868'], [130.697,'#5b5b5b'], [130.731,'#000'], [137.537,'#505050'], [137.604,'#000'], [137.637,'#fff'], [137.671,'#000'], [137.871,'#5a5a5a'], [137.904,'#929292'], [137.938,'#5b5b5b'], [137.971,'#4a4a4a'], [138.105,'#000'], [138.338,'#4c4c4c'], [138.405,'#606060'], [138.472,'#000'], [138.572,'#535353'], [138.605,'#6e6e6e'], [138.638,'#929292'], [138.739,'#6c6c6c'], [138.872,'#9e9e9e'], [138.905,'#7a7a7a'], [139.306,'#5a5a5a'], [139.339,'#000'], [139.373,'#616161'], [139.406,'#000'], [139.506,'#494949'], [139.539,'#000'], [139.706,'#4d4d4d'], [139.74,'#000'], [140.54,'#fff'], [140.607,'#000'], [140.774,'#898989'], [140.807,'#fff'], [140.841,'#979797'], [140.874,'#000'], [141.041,'#686868'], [141.074,'#4d4d4d'], [141.108,'#000'], [141.141,'#5b5b5b'], [141.208,'#000'], [141.375,'#4b4b4b'], [141.408,'#000'], [141.642,'#9b9b9b'], [141.675,'#000'], [141.842,'#767676'], [141.875,'#fff'], [141.908,'#6b6b6b'], [141.942,'#fff'], [141.975,'#000'], [142.009,'#848484'], [142.075,'#000'], [142.142,'#4c4c4c'], [142.175,'#616161'], [142.209,'#000'], [142.576,'#545454'], [142.609,'#000'], [142.676,'#9f9f9f'], [142.709,'#000'], [142.809,'#fff'], [142.843,'#000'], [142.876,'#9d9d9d'], [142.909,'#fff'], [142.976,'#000'], [143.043,'#fff'], [143.11,'#616161'], [143.176,'#000'], [143.443,'#5b5b5b'], [143.477,'#8b8b8b'], [143.51,'#494949'], [143.577,'#000'], [143.944,'#fff'], [143.977,'#000'], [144.344,'#727272'], [144.411,'#4d4d4d'], [144.444,'#000'], [146.98,'#747474'], [147.014,'#000'], [147.214,'#5f5f5f'], [147.28,'#000'], [152.486,'#505050'], [152.519,'#000'], [152.552,'#535353'], [152.619,'#000'], [152.686,'#525252'], [152.719,'#000'], [152.786,'#4f4f4f'], [152.853,'#000'], [153.053,'#666666'], [153.086,'#4d4d4d'], [153.12,'#000'], [153.387,'#565656'], [153.42,'#6e6e6e'], [153.553,'#5a5a5a'], [153.587,'#000'], [154.454,'#4d4d4d'], [154.588,'#646464'], [154.721,'#6c6c6c'], [154.788,'#787878'], [154.955,'#000'], [155.122,'#6f6f6f'], [155.155,'#000'], [163.997,'#656565'], [164.097,'#000'], [165.932,'#5f5f5f'], [165.966,'#4f4f4f'], [165.999,'#000'], [166.466,'#4f4f4f'], [166.5,'#474747'], [166.566,'#6b6b6b'], [166.667,'#000'], [166.833,'#929292'], [166.9,'#4d4d4d'], [166.933,'#646464'], [166.967,'#000'], [167,'#6e6e6e'], [167.034,'#000'], [167.167,'#6e6e6e'], [167.234,'#fff'], [167.267,'#000'], [167.3,'#6b6b6b'], [167.367,'#4d4d4d'], [167.401,'#626262'], [167.434,'#7a7a7a'], [167.501,'#4b4b4b'], [167.601,'#5a5a5a'], [167.734,'#000'], [167.901,'#606060'], [167.968,'#727272'], [168.035,'#848484'], [168.068,'#666666'], [168.101,'#989898'], [168.168,'#7e7e7e'], [168.201,'#a1a1a1'], [168.235,'#828282'], [168.268,'#000'], [168.668,'#636363'], [168.735,'#868686'], [168.835,'#585858'], [168.902,'#666666'], [168.969,'#4b4b4b'], [169.002,'#000'], [169.569,'#555555'], [169.636,'#000'], [174.174,'#515151'], [174.274,'#000'], [174.574,'#686868'], [174.674,'#000'], [174.775,'#696969'], [174.841,'#000'], [174.875,'#585858'], [175.008,'#5b5b5b'], [175.042,'#000'], [175.342,'#545454'], [175.375,'#000'], [175.509,'#5d5d5d'], [175.542,'#000'], [175.642,'#616161'], [175.709,'#4b4b4b'], [175.742,'#000'], [176.043,'#565656'], [176.076,'#000'], [176.209,'#4f4f4f'], [176.276,'#686868'], [176.309,'#000'], [176.543,'#656565'], [176.576,'#747474'], [176.677,'#565656'], [176.743,'#000'], [176.777,'#6f6f6f'], [176.81,'#5f5f5f'], [176.877,'#4d4d4d'], [176.91,'#000'], [176.943,'#939393'], [176.977,'#6d6d6d'], [177.01,'#848484'], [177.044,'#6a6a6a'], [177.11,'#7b7b7b'], [177.177,'#000'], [177.411,'#656565'], [177.444,'#4a4a4a'], [177.477,'#000'], [177.644,'#505050'], [177.678,'#000']];

/* calm version for reduce-flashing: bursts collapsed, only the slow flips kept */
const BG_CALM = [[0,'#fff'], [1.335,'#000'], [9.71,'#fff'], [13.046,'#000'], [14.147,'#fff'], [17.484,'#000'], [18.585,'#fff'], [21.889,'#000'], [23.023,'#fff'], [27.494,'#000'], [30.831,'#fff'], [31.865,'#000'], [36.336,'#fff'], [39.706,'#000'], [40.774,'#fff'], [45.312,'#000'], [49.683,'#fff'], [51.885,'#000'], [54.154,'#fff'], [58.625,'#000'], [60.761,'#fff'], [63.03,'#000'], [66.333,'#fff'], [67.534,'#000'], [70.103,'#fff'], [71.905,'#000'], [75.242,'#fff'], [76.343,'#000'], [78.579,'#fff'], [80.847,'#000'], [84.184,'#fff'], [85.252,'#000'], [88.588,'#494949'], [89.69,'#fff'], [91.892,'#000'], [93.026,'#fff'], [94.127,'#000'], [98.532,'#fff'], [105.272,'#000'], [106.373,'#fff'], [107.474,'#000'], [138.905,'#7a7a7a'], [144.478,'#000']];

/* ---------- TEXT CUES (every time/position taken from the real frames) ---------- */
const CUES = [
  /* INTRO — white title card, left-aligned */
  { s: 0.0,   e: 0.834,   text: "i am",            role: "sans", size: 11,  x: 6.5, y: 41, anchor: "l", align: "left", case: "lower" },
  { s: 0.0,   e: 0.834,   text: "clay and kelsy",  role: "sans", size: 3.4, x: 7,   y: 50, anchor: "l", align: "left" },
  { s: 0.834,   e: 1.335,  text: "made by clay",    role: "sans", size: 4,   y: 43 },
  { s: 1.335, e: 9.710,  text: "there are flashing\nlights\nin this video", role: "mono", size: 3.4, y: 44, track: .08, lh: 1.9, case: "lower", enter: "fade", exit: "fade", dur: .3 },
  /* 9.71–13.05 blank white */

  /* "mmm" / "oh" motif — regular then heavier, bg flips underneath */
  { s: 13.046, e: 17.484, text: "mmm", role: "serifIt", fit: .40, y: 45 },
  { s: 17.484, e: 21.889, text: "mmm", role: "serifIt", fit: .48, y: 45, weight: 900 },
  { s: 21.889, e: 24.992, text: "oh",  role: "serif",   size: 10, y: 43 },

  /* verse — note the left / right placements */
  { s: 30.831, e: 34.134, text: "look at you now", role: "serif",   fit: .52, x: 7,  y: 50, anchor: "l", align: "left" },
  { s: 39.706, e: 40.774, text: "so gone",         role: "serif",   fit: .42, y: 47 },
  { s: 40.774, e: 44.144, text: "i could cry",     role: "serifIt", fit: .5,  x: 94, y: 47, anchor: "r", align: "right" },
  /* 44.14–45.31 flash burst → BG */
  { s: 48.582, e: 51.885, text: "you don't care about it\nyou don't care about it\nyou don't care about it", role: "serif", size: 3.2, x: 6, y: 44, anchor: "l", align: "left", lh: 1.5 },
  { s: 53.020, e: 55.289, text: "do you?",        role: "serifIt", fit: .5,  y: 46, weight: 700, font: "Georgia, 'Times New Roman', serif", btn: "i do" },
  { s: 57.090, e: 57.691, text: "not like",       role: "serif",   fit: .42, y: 45 },
  { s: 57.691, e: 60.360, text: "you ever did",   role: "serif",   fit: .55, y: 46 },
  { s: 60.360, e: 60.761, text: "like i",         role: "serifIt", fit: .28, y: 45 },
  { s: 60.761, e: 62.760, text: "wanted you too", role: "serifIt", fit: .6,  x: 93, y: 46, anchor: "r", align: "right", btn: "did you" },

  /* "i dare you to say / i'm lying" build */
  { s: 66.333, e: 67.534, text: "idareyoutosayimlying", role: "mono", size: 1.8, y: 46 },
  { s: 69.469, e: 71.905, text: "i dare you to say", role: "impact", fit: .9, y: 44, case: "lower" },
  { s: 70.537, e: 75.242, text: "i'm lying",       role: "sans", fit: .5, y: 45 },
  { s: 75.242, e: 78.579, text: "I DARE YOU TO SAY IT", role: "cond", fit: .86, fitW: .5, rot: -90, case: "upper" },

  /* chorus shouts */
  { s: 84.184, e: 87.521, text: "YOU DON'T\nCARE ABOUT IT", role: "impact", fit: .9, lh: .9, y: 42, case: "upper" },
  { s: 87.521, e: 88.588, text: "(why)", role: "serif", size: 3.4, x: 26, y: 47, weight: 700 },
  { s: 88.588, e: 91.892, text: "DO YOU", role: "cond", fit: .82, fitW: .5, rot: -90, case: "upper" },
  { s: 91.892, e: 92.826, text: "(why)", role: "serif", size: 3.4, x: 74, y: 47, weight: 700 },
  { s: 92.826, e: 94.995, text: "NOT LIKE\nYOU\nEVER DID", role: "serif", fit: .9, fitH: .82, lh: 1.05, y: 44, case: "upper" },
  { s: 96.096, e: 100.634, text: "I\nWANTED\nYOU\nTOO", role: "cond", fit: .5, fitH: .92, lh: .98, case: "upper" },
  { s: 96.096, e: 100.634, text: "i wanted you", role: "serifIt", size: 3.6, x: 18, y: 86, anchor: "l", align: "left" },

  /* "I DARE YOU / TO SAY" → "I'M LYING" wall → diagonal "I DARE YOU" → huge "TO SAY IT" */
  { s: 101.635, e: 103.103, text: "I DARE YOU\nTO SAY", role: "impact", fit: .78, fitH: .5, lh: .95, case: "upper" },
  { s: 103.103, e: 104.605, text: "I'M LYING\nI'M LYING\nI'M LYING\nI'M LYING\nI'M LYING\nI'M LYING", role: "impact", fit: .72, fitH: .94, lh: 1.0, case: "upper", skew: -6 },
  { s: 106.373, e: 106.974, text: "I DARE YOU", role: "impact", size: 7, rot: -12, y: 32, case: "upper", skew: -8 },
  { s: 106.974, e: 108.642, text: "TO SAY IT", role: "cond", fit: .96, fitH: .96, case: "upper", skew: -6 },

  /* countdown drop — "3" alone, then "2"/"1" framed by I DARE YOU / TO SAY IT */
  { s: 109.309, e: 112.312, text: "i dare you\nto say\ni'm lying", role: "sans", size: 6, y: 42, lh: 1.25, btn: "say it", btnRun: true },
  { s: 112.312, e: 113.614, text: "flashing lights\nin", role: "mono", fit: .6, fitH: .3, y: 44, lh: 1.5 },
  { s: 113.680, e: 114.481, text: "3", role: "mono", size: 26, weight: 700, y: 44 },
  { s: 114.481, e: 115.716, text: "I DARE YOU", role: "mono", size: 4.5, y: 30, case: "upper", track: .04 },
  { s: 114.481, e: 115.716, text: "2", role: "mono", size: 26, weight: 700, y: 46 },
  { s: 114.481, e: 115.716, text: "TO SAY IT", role: "mono", size: 4.5, y: 62, case: "upper", track: .04 },
  { s: 115.882, e: 116.516, text: "I DARE YOU", role: "mono", size: 4.5, y: 30, case: "upper", track: .04 },
  { s: 115.882, e: 116.516, text: "1", role: "mono", size: 26, weight: 700, y: 46 },
  { s: 115.882, e: 116.516, text: "TO SAY IT", role: "mono", size: 4.5, y: 62, case: "upper", track: .04 },
  /* 116.5–143 gray strobe breakdown → BG only */

  /* "I AM" climax */
  { s: 143.176, e: 144.177, text: "cause", role: "serif", size: 4, y: 45 },
  /* each "I AM" is a different face/size/angle — the self, restless */
  { s: 144.478, e: 145.812, text: "I AM",       role: "impact",  fit: .55, y: 44, case: "upper" },
  { s: 147.614, e: 150.817, text: "i am",       role: "serifIt", fit: .5,  y: 45, weight: 700 },
  { s: 150.817, e: 152.085, text: "i am",       role: "mono",    size: 6,  y: 45, case: "lower", track: .12 },
  { s: 153.587, e: 155.122, text: "I AM I AM",  role: "hook",    fit: .8,  y: 44, case: "upper" },
  { s: 157.457, e: 159.326, text: "I A M",      role: "cond",    fit: .82, fitW: .5, rot: -90, case: "upper" },
  { s: 159.326, e: 159.960, text: "I A M I A M", role: "impact", fit: .94, track: .02, y: 44, case: "upper" },
  { s: 160.861, e: 163.163, text: "i am i am",  role: "serifIt", fit: .66, y: 44, case: "lower", skew: -10 },
  { s: 163.163, e: 163.663, text: "I AM",       role: "cond",    size: 30, y: 44, case: "upper" },
  { s: 168.568, e: 169.500, text: "I AM",       role: "serif",   fit: .5,  y: 44, case: "upper", weight: 900 },
  { s: 169.803, e: 174.574, text: "I AM",       role: "hook",    fit: .74, y: 43, case: "upper" },

  /* --- a swarm of little "I AM"s around the big ones, filling the finale so it comes alive --- */
  { s: 145.9, e: 148.0, text: "i am", role: "serif",   size: 3.2, x: 14, y: 20, case: "lower", enter: "fade", dur: .25 },
  { s: 148.4, e: 151.0, text: "I AM", role: "cond",    size: 4.2, x: 86, y: 78, case: "upper", rot: 8 },
  { s: 151.0, e: 153.6, text: "i am", role: "serifIt", size: 3.6, x: 80, y: 22, enter: "fade", dur: .25 },
  { s: 153.8, e: 156.2, text: "I AM", role: "impact",  size: 3.2, x: 12, y: 82, case: "upper" },
  { s: 155.5, e: 157.6, text: "i am", role: "mono",    size: 3.0, x: 50, y: 13, case: "lower", track: .1 },
  { s: 157.6, e: 159.5, text: "I AM", role: "sans",    size: 2.8, x: 88, y: 46, case: "upper", track: .22 },
  { s: 159.5, e: 161.8, text: "i am", role: "serif",   size: 4.2, x: 16, y: 30, case: "lower", enter: "fade", dur: .2 },
  { s: 160.5, e: 163.0, text: "I AM", role: "cond",    size: 5.0, x: 82, y: 86, case: "upper", rot: -10 },
  { s: 162.5, e: 165.0, text: "i am", role: "serifIt", size: 3.4, x: 30, y: 78, skew: -10 },
  { s: 164.0, e: 166.6, text: "I AM", role: "impact",  size: 3.6, x: 70, y: 15, case: "upper" },
  { s: 165.5, e: 168.2, text: "i am", role: "hook",    size: 4.4, x: 10, y: 50, case: "lower" },
  { s: 167.5, e: 170.0, text: "I AM", role: "serif",   size: 3.2, x: 90, y: 68, case: "upper", weight: 900 },
  { s: 169.0, e: 171.8, text: "i am", role: "mono",    size: 3.0, x: 24, y: 88, case: "lower" },
  { s: 170.5, e: 173.2, text: "I AM", role: "cond",    size: 4.8, x: 84, y: 24, case: "upper", rot: 6 },
  { s: 172.0, e: 174.6, text: "i am", role: "serifIt", size: 3.8, x: 14, y: 70, enter: "fade", dur: .2 },
  { s: 173.5, e: 176.2, text: "I AM", role: "impact",  size: 3.4, x: 78, y: 82, case: "upper" },
  { s: 175.0, e: 178.2, text: "i am", role: "serif",   size: 3.2, x: 20, y: 14, case: "lower" },
  { s: 176.5, e: 179.2, text: "I AM", role: "hook",    size: 4.2, x: 82, y: 52, case: "upper", enter: "fade", dur: .2 },

  /* "moving on" → drips (center-right, per the frames) */
  { s: 175.208, e: 178.500, text: "moving on", role: "serifIt", fit: .62, x: 62, y: 45, fx: "drip", btn: "moving on" },

  /* outro — small serif blinking on black */
  { s: 181.848, e: 185.218, text: "mmm", role: "serifIt", size: 4,   y: 47 },
  { s: 186.353, e: 189.189, text: "mmm", role: "serifIt", size: 4,   y: 47 },
  { s: 190.390, e: 195.228, text: "oh",  role: "serif",   size: 5.7, y: 46 },
];

/* ---------- EASTER EGGS: hidden in the dark, found only with the spotlight ----------
   Lyrics/echoes tucked into blank black holds; they vanish with the edits.
   `cover:true` = the album cover, hidden behind the final black. */
const EGGS = [
  { s: 27.7,  e: 30.6,  text: "look at you now", role: "serif",   size: 2.6, x: 24, y: 74 },
  { s: 45.8,  e: 49.5,  text: "so gone",     role: "serifIt", size: 3.2, x: 74, y: 30 },
  { s: 63.4,  e: 66.2,  text: "i'm lying",   role: "serif",   size: 3.0, x: 24, y: 24 },
  { s: 79.0,  e: 83.8,  text: "you ever did", role: "serif",   size: 2.8, x: 76, y: 26 },
  { s: 96.3,  e: 100.5, text: "do you",      role: "serifIt", size: 2.8, x: 80, y: 82 },
  { s: 109.4, e: 112.2, text: "i'm lying",   role: "serif",   size: 2.6, x: 18, y: 84 },
  { s: 122.0, e: 130.0, text: "i am",        role: "serifIt", size: 3.4, x: 70, y: 30 },
  { s: 131.0, e: 138.0, text: "wanted you too", role: "serifIt", size: 2.8, x: 28, y: 80 },
  { s: 165.9, e: 169.4, text: "i could cry", role: "serifIt", size: 3.2, x: 68, y: 72 },
  { s: 177.5, e: 199.9, cover: true },
];
