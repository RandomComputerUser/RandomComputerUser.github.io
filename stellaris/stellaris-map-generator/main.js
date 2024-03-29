// The code in here is of questionable quality

DEBUG = false;

BACKGROUND_IMAGE = new Image();
BACKGROUND_IMAGE.src = document.getElementById('backgroundImage').src;

document.getElementById('galaxyName').value = "The Milky Way";

function updatePaintScaleNumberDisplay(value) {
    document.getElementById('paintScaleNumberDisplay').innerHTML = ''+(document.getElementById('paintScale').value);
}

function updatePopScaleNumberDisplay(value) {
    document.getElementById('popScaleNumberDisplay').innerHTML = ''+(document.getElementById('popScale').value);
}

// https://stackoverflow.com/a/47593316

function xmur3(str) {
    for(var i = 0, h = 1779033703 ^ str.length; i < str.length; i++) {
        h = Math.imul(h ^ str.charCodeAt(i), 3432918353);
        h = h << 13 | h >>> 19;
    } return function() {
        h = Math.imul(h ^ (h >>> 16), 2246822507);
        h = Math.imul(h ^ (h >>> 13), 3266489909);
        return (h ^= h >>> 16) >>> 0;
    }
}

___seed = xmur3('RandomComputerUser');

INITIAL_PRNG_STATE = [___seed(), ___seed(), ___seed(), ___seed()];

// Pseudorandom number generator by Bob Jenkins
function jsf32(a, b, c, d) {
    return function() {
        a |= 0; b |= 0; c |= 0; d |= 0;
        var t = a - (b << 27 | b >>> 5) | 0;
        a = b ^ (c << 17 | c >>> 15);
        b = c + d | 0;
        c = d + t | 0;
        d = a + t | 0;
        return (d >>> 0) / 4294967296;
    }
}

COLORS = {
    dark_brown:         {flag: [58, 38, 23],    map: [107, 68, 40],     ship: [255, 228, 136]},
    brown:              {flag: [101, 66, 40],   map: [156, 91, 45],     ship: [255, 228, 136]},
    beige:              {flag: [150, 126, 90],  map: [150, 126, 90],    ship: [255, 228, 136]},
    khaki_brown:        {flag: [174, 121, 83],  map: [174, 121, 83],    ship: [255, 228, 136]},
    ochre_brown:        {flag: [224, 197, 106], map: [224, 197, 106],   ship: [255, 228, 136]},
    desert_yellow:      {flag: [237, 231, 116], map: [237, 231, 116],   ship: [255, 228, 136]},
    dark_orange:        {flag: [167, 57, 0],    map: [167, 57, 0],      ship: [255, 133, 24]},
    intense_orange:     {flag: [255, 86, 0],    map: [255, 86, 0],      ship: [255, 133, 24]},
    orange:             {flag: [215, 100, 35],  map: [237, 118, 25],    ship: [255, 133, 24]},
    light_orange:       {flag: [244, 139, 15],  map: [244, 139, 15],    ship: [245, 232, 2]},
    yellow:             {flag: [204, 148, 41],  map: [204, 148, 41],    ship: [245, 232, 2]},
    bright_yellow:      {flag: [224, 214, 46],  map: [224, 214, 46],    ship: [245, 232, 2]},
    dark_red:           {flag: [103, 25, 39],   map: [103, 25, 39],     ship: [255, 57, 36]},
    red:                {flag: [158, 22, 22],   map: [151, 14, 18],     ship: [255, 57, 36]},
    red_orange:         {flag: [215, 74, 65],   map: [224, 64, 64],     ship: [255, 57, 36]},
    intense_red:        {flag: [241, 37, 15],   map: [241, 37, 15],     ship: [255, 57, 36]},
    cerise_red:         {flag: [245, 102, 102], map: [245, 102, 102],   ship: [255, 57, 36]},
    pink_red:           {flag: [237, 131, 131], map: [237, 131, 131],   ship: [255, 57, 36]},
    burgundy:           {flag: [89, 18, 39],    map: [89, 18, 39],      ship: [232, 40, 130]},
    satin_burgundy:     {flag: [149, 20, 72],   map: [116, 31, 65],     ship: [232, 40, 130]},
    intense_burgundy:   {flag: [179, 37, 94],   map: [149, 20, 72],     ship: [232, 40, 130]},
    pink:               {flag: [130, 50, 105],  map: [151, 15, 100],    ship: [232, 40, 130]},
    intense_pink:       {flag: [176, 49, 128],  map: [190, 40, 134],    ship: [232, 40, 130]},
    light_pink:         {flag: [208, 49, 149],  map: [222, 64, 163],    ship: [232, 40, 130]},
    shadow_purple:      {flag: [81, 15, 113],   map: [63, 9, 89],       ship: [199, 81, 252]},
    dark_purple:        {flag: [98, 20, 135],   map: [81, 15, 113],     ship: [199, 81, 252]},
    purple:             {flag: [100, 54, 158],  map: [109, 24, 150],    ship: [199, 81, 252]},
    intense_purple:     {flag: [139, 39, 184],  map: [139, 39, 184],    ship: [199, 81, 252]},
    cloud_purple:       {flag: [167, 58, 217],  map: [167, 58, 217],    ship: [199, 81, 252]},
    bright_purple:      {flag: [194, 125, 227], map: [194, 125, 227],   ship: [199, 81, 252]},
    shadow_blue:        {flag: [15, 17, 91],    map: [15, 17, 91],      ship: [102, 82, 255]},
    indigo:             {flag: [47, 19, 127],   map: [36, 21, 156],     ship: [102, 82, 255]},
    light_indigo:       {flag: [96, 82, 207],   map: [96, 82, 207],     ship: [102, 82, 255]},
    wave_blue:          {flag: [139, 126, 242], map: [159, 151, 224],   ship: [102, 82, 255]},
    faded_blue:         {flag: [183, 173, 255], map: [191, 187, 224],   ship: [102, 82, 255]},
    pink_purple:        {flag: [221, 216, 254], map: [221, 216, 254],   ship: [102, 82, 255]},
    dark_blue:          {flag: [51, 22, 132],   map: [45, 61, 116],     ship: [90, 202, 255]},
    blue:               {flag: [46, 63, 152],   map: [46, 63, 153],     ship: [90, 202, 255]},
    light_blue:         {flag: [71, 113, 177],  map: [71, 114, 178],    ship: [90, 202, 255]},
    intense_blue:       {flag: [30, 159, 220],  map: [30, 159, 220],    ship: [90, 202, 255]},
    sky_blue:           {flag: [88, 188, 235],  map: [88, 188, 235],    ship: [90, 202, 255]},
    mist_blue:          {flag: [137, 221, 246], map: [137, 221, 246],   ship: [90, 202, 255]},
    shadow_teal:        {flag: [9, 57, 57],     map: [9, 57, 57],       ship: [0, 255, 253]},
    light_turquoise:    {flag: [23, 98, 98],    map: [23, 98, 98],      ship: [0, 255, 253]},
    turquoise:          {flag: [61, 153, 147],  map: [61, 153, 147],    ship: [0, 255, 253]},
    intense_turquoise:  {flag: [55, 178, 170],  map: [55, 178, 170],    ship: [0, 255, 253]},
    ocean_turquoise:    {flag: [49, 208, 198],  map: [49, 208, 198],    ship: [0, 255, 253]},
    ice_turquoise:      {flag: [137, 237, 236], map: [137, 237, 236],   ship: [0, 255, 253]},
    shadow_green:       {flag: [32, 55, 41],    map: [32, 55, 41],      ship: [57, 255, 88]},
    dark_green:         {flag: [28, 69, 28],    map: [27, 66, 26],      ship: [57, 255, 88]},
    green:              {flag: [46, 102, 41],   map: [46, 102, 41],     ship: [57, 255, 88]},
    dark_teal:          {flag: [51, 127, 91],   map: [51, 127, 91],     ship: [57, 255, 88]},
    teal:               {flag: [76, 153, 84],   map: [76, 153, 84],     ship: [57, 255, 88]},
    light_green:        {flag: [160, 222, 141], map: [160, 222, 141],   ship: [57, 255, 88]},
    swamp_green:        {flag: [57, 74, 12],    map: [88, 107, 39],     ship: [201, 255, 60]},
    moss_green:         {flag: [80, 99, 28],    map: [112, 142, 35],    ship: [201, 255, 60]},
    sick_green:         {flag: [112, 142, 35],  map: [157, 175, 35],    ship: [201, 255, 60]},
    toxic_green:        {flag: [157, 175, 35],  map: [168, 218, 39],    ship: [201, 255, 60]},
    frog_green:         {flag: [168, 218, 39],  map: [209, 241, 126],   ship: [201, 255, 60]},
    sun_green:          {flag: [230, 244, 147], map: [230, 244, 147],   ship: [201, 255, 60]}, 
    shadow_steel:       {flag: [51, 60, 65],    map: [51, 60, 65],      ship: [196, 216, 222]},
    dark_steel:         {flag: [76, 90, 98],    map: [76, 90, 98],      ship: [196, 216, 222]},
    medium_steel:       {flag: [101, 119, 128], map: [101, 119, 128],   ship: [196, 216, 222]},
    ship_steel:         {flag: [131, 150, 156], map: [131, 150, 156],   ship: [196, 216, 222]},
    hard_steel:         {flag: [152, 168, 173], map: [152, 168, 173],   ship: [196, 216, 222]},
    silver_steel:       {flag: [208, 225, 230], map: [208, 225, 230],   ship: [196, 216, 222]},
    black:              {flag: [27, 27, 27],    map: [27, 27, 27],      ship: [243, 243, 243]},
    dark_grey:          {flag: [62, 62, 62],    map: [62, 62, 62],      ship: [243, 243, 243]},
    grey:               {flag: [128, 128, 128], map: [128, 128, 128],   ship: [243, 243, 243]},
    light_grey:         {flag: [191, 191, 191], map: [191, 191, 191],   ship: [243, 243, 243]},
    off_white:          {flag: [239, 239, 239], map: [239, 239, 239],   ship: [243, 243, 243]},
    white:              {flag: [255, 255, 255], map: [255, 255, 255],   ship: [243, 243, 243]}
};

EMPIRE_NAME_FORMATS_ENGLISH = {
    "format.imp_mil.1": [{type: "namelist_value", value: "imperial_mil"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.imp_mil.2": [{type: "namelist_value", value: "imperial_mil"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.imp_mil.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_mil"}],
    "format.imp_mil.4": [{type: "namelist_value", value: "imperial_mil_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_mil"}],
    "format.imp_mil.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_mil_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_mil"}],
    "format.imp_spi.1": [{type: "namelist_value", value: "imperial_spi"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.imp_spi.2": [{type: "namelist_value", value: "imperial_spi"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.imp_spi.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_spi"}],
    "format.imp_spi.4": [{type: "namelist_value", value: "imperial_spi_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_spi"}],
    "format.imp_spi.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_spi_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_spi"}],
    "format.imp_cult.1": [{type: "namelist_value", value: "imperial_imperial_cult"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.imp_cult.2": [{type: "namelist_value", value: "imperial_imperial_cult"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.imp_cult.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_imperial_cult"}],
    "format.imp_cult.4": [{type: "namelist_value", value: "imperial_spi_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_imperial_cult"}],
    "format.imp_cult.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_spi_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_imperial_cult"}],
    "format.imp_mat.1": [{type: "namelist_value", value: "imperial_mat"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.imp_mat.2": [{type: "namelist_value", value: "imperial_mat"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.imp_mat.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_mat"}],
    "format.imp_mat.4": [{type: "namelist_value", value: "imperial_mat_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_mat"}],
    "format.imp_mat.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_mat_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_mat"}],
    "format.imp_tech.1": [{type: "namelist_value", value: "imperial_tech"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.imp_tech.2": [{type: "namelist_value", value: "imperial_tech"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.imp_tech.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_tech"}],
    "format.imp_tech.4": [{type: "namelist_value", value: "imperial_mat_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_tech"}],
    "format.imp_tech.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_mat_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_tech"}],
    "format.imp_pac.1": [{type: "namelist_value", value: "imperial_pac"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.imp_pac.2": [{type: "namelist_value", value: "imperial_pac"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.imp_pac.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_pac"}],
    "format.imp_pac.4": [{type: "namelist_value", value: "imperial_pac_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_pac"}],
    "format.imp_pac.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_pac_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_pac"}],
    "format.imp_cel.1": [{type: "namelist_value", value: "imperial_celestial"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.imp_cel.2": [{type: "namelist_value", value: "imperial_celestial"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.imp_cel.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_celestial"}],
    "format.imp_cel.4": [{type: "namelist_value", value: "imperial_pac_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_celestial"}],
    "format.imp_cel.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_pac_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_celestial"}],
    "format.imp_enl.1": [{type: "namelist_value", value: "imperial_enlightened"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.imp_enl.2": [{type: "namelist_value", value: "imperial_enlightened"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.imp_enl.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_enlightened"}],
    "format.imp_gen.1": [{type: "namelist_value", value: "imperial_gen"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.imp_gen.2": [{type: "namelist_value", value: "imperial_gen"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.imp_gen.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_gen"}],
    "format.imp_gen.4": [{type: "namelist_value", value: "imperial_gen_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_gen"}],
    "format.imp_gen.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_gen_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "imperial_gen"}],
    "format.dict_mil.1": [{type: "namelist_value", value: "dictatorial_mil"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.dict_mil.2": [{type: "namelist_value", value: "dictatorial_mil"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.dict_mil.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_mil"}],
    "format.dict_mil.4": [{type: "namelist_value", value: "dictatorial_mil_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_mil"}],
    "format.dict_mil.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_mil_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_mil"}],
    "format.dict_spi.1": [{type: "namelist_value", value: "dictatorial_spi"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.dict_spi.2": [{type: "namelist_value", value: "dictatorial_spi"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.dict_spi.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_spi"}],
    "format.dict_spi.4": [{type: "namelist_value", value: "dictatorial_spi_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_spi"}],
    "format.dict_spi.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_spi_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_spi"}],
    "format.dict_mat.1": [{type: "namelist_value", value: "dictatorial_mat"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.dict_mat.2": [{type: "namelist_value", value: "dictatorial_mat"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.dict_mat.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_mat"}],
    "format.dict_mat.4": [{type: "namelist_value", value: "dictatorial_mat_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_mat"}],
    "format.dict_mat.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_mat_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_mat"}],
    "format.dict_tech.1": [{type: "namelist_value", value: "dictatorial_tech"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.dict_tech.2": [{type: "namelist_value", value: "dictatorial_tech"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.dict_tech.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_tech"}],
    "format.dict_tech.4": [{type: "namelist_value", value: "dictatorial_mat_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_tech"}],
    "format.dict_tech.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_mat_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_tech"}],
    "format.dict_pac.1": [{type: "namelist_value", value: "dictatorial_pac"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.dict_pac.2": [{type: "namelist_value", value: "dictatorial_pac"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.dict_pac.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_pac"}],
    "format.dict_pac.4": [{type: "namelist_value", value: "dictatorial_pac_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_pac"}],
    "format.dict_pac.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_pac_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_pac"}],
    "format.dict_gen.1": [{type: "namelist_value", value: "dictatorial_gen"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.dict_gen.2": [{type: "namelist_value", value: "dictatorial_gen"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.dict_gen.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_gen"}],
    "format.dict_gen.4": [{type: "namelist_value", value: "dictatorial_gen_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_gen"}],
    "format.dict_gen.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_gen_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "dictatorial_gen"}],
    "format.olig_mil.1": [{type: "namelist_value", value: "oligarchic_mil"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.olig_mil.2": [{type: "namelist_value", value: "oligarchic_mil"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.olig_mil.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_mil"}],
    "format.olig_mil.4": [{type: "namelist_value", value: "oligarchic_mil_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_mil"}],
    "format.olig_mil.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_mil_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_mil"}],
    "format.olig_serv.1": [{type: "namelist_value", value: "oligarchic_service"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.olig_serv.2": [{type: "namelist_value", value: "oligarchic_service"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.olig_serv.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_service"}],
    "format.olig_spi.1": [{type: "namelist_value", value: "oligarchic_spi"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.olig_spi.2": [{type: "namelist_value", value: "oligarchic_spi"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.olig_spi.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_spi"}],
    "format.olig_spi.4": [{type: "namelist_value", value: "oligarchic_spi_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_spi"}],
    "format.olig_spi.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_spi_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_spi"}],
    "format.olig_trib.1": [{type: "namelist_value", value: "oligarchic_holy_tribunal"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.olig_trib.2": [{type: "namelist_value", value: "oligarchic_holy_tribunal"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.olig_trib.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_holy_tribunal"}],
    "format.olig_trib.4": [{type: "namelist_value", value: "oligarchic_spi_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_holy_tribunal"}],
    "format.olig_trib.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_spi_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_holy_tribunal"}],
    "format.olig_mat.1": [{type: "namelist_value", value: "oligarchic_mat"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.olig_mat.2": [{type: "namelist_value", value: "oligarchic_mat"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.olig_mat.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_mat"}],
    "format.olig_mat.4": [{type: "namelist_value", value: "oligarchic_mat_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_mat"}],
    "format.olig_mat.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_mat_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_mat"}],
    "format.olig_tech.1": [{type: "namelist_value", value: "oligarchic_tech"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.olig_tech.2": [{type: "namelist_value", value: "oligarchic_tech"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.olig_tech.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_tech"}],
    "format.olig_tech.4": [{type: "namelist_value", value: "oligarchic_mat_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_tech"}],
    "format.olig_tech.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_mat_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_tech"}],
    "format.olig_pac.1": [{type: "namelist_value", value: "oligarchic_pac"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.olig_pac.2": [{type: "namelist_value", value: "oligarchic_pac"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.olig_pac.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_pac"}],
    "format.olig_pac.4": [{type: "namelist_value", value: "oligarchic_pac_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_pac"}],
    "format.olig_pac.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_pac_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_pac"}],
    "format.olig_gen.1": [{type: "namelist_value", value: "oligarchic_gen"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.olig_gen.2": [{type: "namelist_value", value: "oligarchic_gen"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.olig_gen.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_gen"}],
    "format.olig_gen.4": [{type: "namelist_value", value: "oligarchic_gen_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_gen"}],
    "format.olig_gen.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_gen_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_gen"}],
    "format.dem_mil.1": [{type: "namelist_value", value: "democratic_mil"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.dem_mil.2": [{type: "namelist_value", value: "democratic_mil"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.dem_mil.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_mil"}],
    "format.dem_mil.4": [{type: "namelist_value", value: "democratic_mil_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_mil"}],
    "format.dem_mil.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_mil_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_mil"}],
    "format.dem_war_cul.1": [{type: "namelist_value", value: "democratic_war_cul"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.dem_war_cul.2": [{type: "namelist_value", value: "democratic_war_cul"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.dem_war_cul.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_war_cul"}],
    "format.dem_war_cul.4": [{type: "namelist_value", value: "democratic_mil_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_war_cul"}],
    "format.dem_serv.1": [{type: "namelist_value", value: "democratic_service"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.dem_serv.2": [{type: "namelist_value", value: "democratic_service"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.dem_serv.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_service"}],
    "format.dem_spi.1": [{type: "namelist_value", value: "democratic_spi"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.dem_spi.2": [{type: "namelist_value", value: "democratic_spi"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.dem_spi.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_spi"}],
    "format.dem_spi.4": [{type: "namelist_value", value: "democratic_spi_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_spi"}],
    "format.dem_spi.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_spi_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_spi"}],
    "format.dem_mat.1": [{type: "namelist_value", value: "democratic_mat"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.dem_mat.2": [{type: "namelist_value", value: "democratic_mat"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.dem_mat.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_mat"}],
    "format.dem_mat.4": [{type: "namelist_value", value: "democratic_mat_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_mat"}],
    "format.dem_mat.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_mat_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_mat"}],
    "format.dem_tech.1": [{type: "namelist_value", value: "democratic_tech"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.dem_tech.2": [{type: "namelist_value", value: "democratic_tech"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.dem_tech.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_tech"}],
    "format.dem_tech.4": [{type: "namelist_value", value: "democratic_mat_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_tech"}],
    "format.dem_tech.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_mat_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_tech"}],
    "format.dem_pac.1": [{type: "namelist_value", value: "democratic_pac"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.dem_pac.2": [{type: "namelist_value", value: "democratic_pac"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.dem_pac.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_pac"}],
    "format.dem_pac.4": [{type: "namelist_value", value: "democratic_pac_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_pac"}],
    "format.dem_pac.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_pac_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_pac"}],
    "format.dem_gen.1": [{type: "namelist_value", value: "democratic_gen"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.dem_gen.2": [{type: "namelist_value", value: "democratic_gen"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.dem_gen.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_gen"}],
    "format.dem_gen.4": [{type: "namelist_value", value: "democratic_gen_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_gen"}],
    "format.dem_gen.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_gen_mid_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "democratic_gen"}],
    "format.gen_imp.1": [{type: "namelist_value", value: "generic_aut_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "generic_states"}],
    "format.gen_imp.2": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "generic_aut_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "generic_states"}],
    "format.gen_olig.1": [{type: "namelist_value", value: "generic_oli_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "generic_states"}],
    "format.gen_olig.2": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "generic_oli_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "generic_states"}],
    "format.gen_dem.1": [{type: "namelist_value", value: "generic_dem_desc"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "generic_states"}],
    "format.gen_dem.2": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "generic_dem_desc"}, {type: "string", value: " "}, {type: "namelist_value", value: "generic_states"}],
    "format.hive_mind.1": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "hive_mind"}],
    "format.devouring_swarm.1": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "devouring_swarm"}],
    "format.olig_corp.1": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_corp"}],
    "format.olig_megachurch.1": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "oligarchic_megachurch"}],
    "format.trade_league.1": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "trade_league"}],
    "format.bandit_kingdom.1": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "bandit_kingdom"}],
    "format.purifier.1": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "purifiers"}],
    "format.primitive.1": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "primitive_names"}],
    "format.marauder.1": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "marauder_names"}],
    "format.awakened_marauder.1": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "awakened_marauder_names"}],
    "format.pirate.1": [{type: "namelist_value", value: "pirate_names"}],
    "format.fallen.1": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "fallen_empire_names_1"}],
    "format.fallen.2": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "fallen_empire_names_2"}],
    "format.fallen.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "fallen_empire_names_3"}],
    "format.fallen.4": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "fallen_empire_names_4"}],
    "format.fallen.machine": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "fallen_empire_names_machine"}],
    "format.awakened.1": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "awakened_fallen_empire_names_1"}],
    "format.awakened.2": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "awakened_fallen_empire_names_2"}],
    "format.awakened.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "awakened_fallen_empire_names_3"}],
    "format.awakened.4": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "awakened_fallen_empire_names_4"}],
    "format.awakened.machine.1": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "awakened_fallen_empire_names_machine_1"}],
    "format.awakened.machine.2": [{type: "namelist_value", value: "awakened_fallen_empire_names_machine_2"}],
    "format.rad_cult.1": [{type: "namelist_value", value: "radical_cult_names"}],
    "format.ai.1": [{type: "namelist_value", value: "ai_names"}],
    "format.trader.1": [{type: "namelist_value", value: "trader_names"}],
    "format.curator.1": [{type: "namelist_value", value: "curator_names"}],
    "format.artist.1": [{type: "namelist_value", value: "artist_names"}],
    "format.machine.1": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "machine_empire_names_1"}],
    "format.machine.2": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "machine_empire_names_2"}],
    "format.machine.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "machine_empire_names_3"}],
    "format.machine.4": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "machine_empire_names_4"}],
    "format.machine.5": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "machine_empire_names_5"}],
    "format.machine.6": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "machine_empire_names_6"}],
    "format.diadochi.1": [{type: "namelist_value", value: "diadochi_names_1_1"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "diadochi_names_1_2"}],
    "format.diadochi.2": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "diadochi_names_2_1"}],
    "format.diadochi.3": [{type: "namelist_value", value: "diadochi_names_3_1"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "diadochi_names_3_2"}],
    "format.diadochi.4": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "diadochi_names_4_1"}, {type: "string", value: " "}, {type: "namelist_value", value: "diadochi_names_4_2"}],
    "format.new_khanate": [{type: "namelist_value", value: "new_khanate_names_1_1"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "new_khanate_names_1_2"}],
    "format.free_khanate": [{type: "namelist_value", value: "free_khanate_names_1_1"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "free_khanate_names_1_2"}],
    "format.drone_pirate.1": [{type: "namelist_value", value: "drone_pirate_names"}],
    "format.machine_pirate.1": [{type: "namelist_value", value: "machine_pirate_names"}],
    "format.communal_parity.1": [{type: "namelist_value", value: "communal_parity"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.communal_parity.2": [{type: "namelist_value", value: "communal_parity"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.communal_parity.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "communal_parity"}],
    "format.monopolistic_syndicate.1": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "monopolistic_syndicate"}],
    "format.subversive_cult.1": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "subversive_cult_1"}],
    "format.subversive_cult.2": [{type: "namelist_value", value: "subversive_cult_2"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.necrophage.1": [{type: "namelist_value", value: "necrophagers"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.System.GetName"}],
    "format.necrophage.2": [{type: "namelist_value", value: "necrophagers"}, {type: "string", value: " of "}, {type: "variable_value", value: "This.Capital.GetName"}],
    "format.necrophage.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "necrophagers"}],
    "format.necrophage.4": [{type: "namelist_value", value: "necrophagers_start"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "necrophagers"}],
    "format.imp_dom.1": [{type: "namelist_value", value: "imperial_domain_names"}],
    "format.imp_dom.2": [{type: "namelist_value", value: "imperial_domain_names_2"}],
    "format.imp_dom.3": [{type: "namelist_value", value: "imperial_domain_names_3"}],
    "format.imp_dom.4": [{type: "namelist_value", value: "imperial_domain_names_4"}],
    "format.necrophage_hive_mind.1": [{type: "namelist_value", value: "necrophagers_start"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "hive_mind"}],
    "format.necrophage_devouring_swarm.1": [{type: "namelist_value", value: "necrophagers_start"}, {type: "string", value: " "}, {type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "devouring_swarm"}],
    "format.mercenary.1": [{type: "namelist_value", value: "mercenary_names"}, {type: "string", value: " "}, {type: "namelist_value", value: "mercenary_groups"}],
    "format.mercenary.2": [{type: "namelist_value", value: "mercenary_names"}, {type: "string", value: " "}, {type: "namelist_value", value: "mercenary_companies"}],
    "format.mercenary.3": [{type: "variable_value", value: "This.GetSpeciesName"}, {type: "string", value: " "}, {type: "namelist_value", value: "mercenary_groups"}],
    "format.salvager.1": [{type: "namelist_value", value: "salvager_groups_prefix"}, {type: "string", value: " "}, {type: "namelist_value", value: "salvager_names"}],
    "format.shroudwalker.1": [{type: "namelist_value", value: "shroudwalker_groups"}, {type: "string", value: " "}, {type: "namelist_value", value: "shroudwalker_suffixes"}],
    "format.shroudwalker.2": [{type: "namelist_value", value: "shroudwalker_names"}]
};

PRESCRIPTED_EMPIRE_NAMES_ENGLISH = {
    EMPIRE_DESIGN_humans1: "United Nations of Earth",
    EMPIRE_DESIGN_humans2: "Commonwealth of Man",
    EMPIRE_DESIGN_humans1_1: "United Nations of Earth",
    EMPIRE_DESIGN_humans2_1: "Commonwealth of Man",
    EMPIRE_DESIGN_tzynn: "Tzynn Empire",
    EMPIRE_DESIGN_yondar: "Kingdom of Yondarim",
    EMPIRE_DESIGN_ixidar: "Ix'Idar Star Collective",
    EMPIRE_DESIGN_chinorr: "Chinorr Combine",
    EMPIRE_DESIGN_jehetma: "Jehetma Dominion",
    EMPIRE_DESIGN_scyldari: "Scyldari Confederacy",
    EMPIRE_DESIGN_blorg: "Blorg Commonality",
    EMPIRE_DESIGN_kel_azaan: "Kel-Azaan Republic",
    EMPIRE_DESIGN_iferyx: "Iferyx Amalgamated Fleets",
    EMPIRE_DESIGN_paridni: "Paridni Mercantile Republic",
    EMPIRE_DESIGN_ai_race: "AI",
    EMPIRE_DESIGN_xanid: "Xanid Suzerainty",
    EMPIRE_DESIGN_custodianship: "Earth Custodianship",
    EMPIRE_DESIGN_tebrid: "Tebrid Homolog",
    EMPIRE_DESIGN_xt489: "XT-489 Eliminator",
    EMPIRE_DESIGN_lokken: "Lokken Mechanists",
    EMPIRE_DESIGN_maweer: "Maweer Caretakers",
    EMPIRE_DESIGN_VOOR: "Voor Technocracy",
    EMPIRE_DESIGN_kilik: "Kilik Cooperative",
    EMPIRE_DESIGN_orbis: "Orbis Customer Synergies",
    EMPIRE_DESIGN_glebsig: "Glebsig Foundation",
    EMPIRE_DESIGN_hazbuzan: "Hazbuzan Syndicate",
    EMPIRE_DESIGN_khennet: "Keepers of Ave'brenn",
    EMPIRE_DESIGN_pasharti: "Pasharti Absorbers",
    EMPIRE_DESIGN_sathyrel: "Sathyrelian Bliss"
};

ENTRIES_KEY = '___entries';
UNOWNED_ID = -1000000000;

CANVAS_SCALE = 2;

GREATER_DESATURATION = false;

POPS_PER_SYMBOL = 5;
POP_SYMBOL_FILL = 'rgb(5,250,5)';

MAP_FONT = '"Barlow Semi Condensed"';
MAP_NAME_FILL = 'rgb(15,15,15)';
MAP_NAME_STROKE = 'rgba(235,235,235)';
MAP_NAME_ALPHA = 0.51;
MAP_NAME_STROKE_WIDTH = 0.25 * CANVAS_SCALE / 2;
MIN_MAP_NAME_SIZE = 10;

MAP_FONT_ALT = '"Barlow"';

MAX_MAP_NAME_SIZE = 110;

MAP_MIDDLE_FONT = '"Barlow Semi Condensed"';
MAP_MIDDLE_TEXT_COLOR = 'rgba(250,250,250,0.9)';

MISSING_COLOR = 'rgb(64,64,64)';

MAP_WIDTH = CANVAS_SCALE * 1920;
MAP_HEIGHT = CANVAS_SCALE * 1920;
UNOWNED_VALUE = 20;
UNOWNED_RADIUS = 110;
UNOWNED_HYPERLANE_RADIUS = 95;
SYSTEM_RADIUS = UNOWNED_RADIUS + UNOWNED_VALUE - 6;
HYPERLANE_RADIUS = UNOWNED_HYPERLANE_RADIUS + UNOWNED_VALUE - 6;

NEAR_RADIUS = 20;
NEAR_BOOST = 100;

SMOOTHING_RADIUS = 4;

PAINT_SCALE_FACTOR = 1.65;

PADDING = CANVAS_SCALE * 50;
INNER_PADDING = CANVAS_SCALE * 10;

INNER_CIRCLE_COLOR = 'rgba(0,0,0,0.6)';

RES_X = 384 + 1;
RES_Y = 384 + 1;

STAR_RADIUS = CANVAS_SCALE * 3;
STAR_PADDING = CANVAS_SCALE * 6;
UPGRADED_RADIUS = CANVAS_SCALE * 5;
CAPITAL_OUTER_RADIUS = CANVAS_SCALE * 9;
CAPITAL_INNER_RADIUS = CANVAS_SCALE * 7;
CAPITAL_STAR_RADIUS = CANVAS_SCALE * 7;

HYPERLANE_WIDTH = CANVAS_SCALE * 3;
HYPERLANE_HYPER_RELAY_WIDTH = CANVAS_SCALE * 5;

BORDERS = [
    {color: 'rgba(225,225,225,0.4)', width: CANVAS_SCALE * 10, light: false, regular: true},
    {color: 'rgb(235,235,235)', width: CANVAS_SCALE * 2, light: true, regular: true}
];
EDGE_BORDERS = [
    {color: 'rgba(5,5,5,0.5)', width: CANVAS_SCALE * 14, light: false, regular: true},
    {color: 'rgba(5,5,5,0.5)', width: CANVAS_SCALE * 7, light: true, regular: false}
];

BACKGROUND_FILTER = 'saturate(0%)';
SUBSTITUTE_BACKGROUND = 'rgb(2,2,2)'; // If no Hubble
BACKGROUND_COLOR = 'rgba(5,5,5,0.7)';
BACKGROUND_COLOR_OPAQUE = 'rgb(5,5,5)';
HYPERLANE_COLOR = 'rgba(245,245,245,0.18)';
HYPERLANE_HYPER_RELAY_COLOR = 'rgba(245,245,245,0.36)';
STAR_COLOR = 'rgb(245,245,245)';
POPULATED_COLOR = 'rgb(250,245,10)';

function setPopulatedColor(mapMode) {
    if (mapMode === 'popDensity') {
        POPULATED_COLOR = 'rgb(10,10,250)';
    } else {
        POPULATED_COLOR = 'rgb(250,245,10)';
    }
}

USE_FLAG_COLORS = false;
DRAW_MAP_NAMES = true;
ALT_NAME_STYLE = false;
LIMIT_MAP_NAME_SIZE = false;
DRAW_MAP_MIDDLE = true;
USE_HUBBLE = true;
LIGHT_BORDERS = false;
SMOOTH_BORDERS = true;

lock = false;
saveGame = null;

function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function sleepUntilTrue(func) {
    return new Promise(async function(resolve) {
        await sleep(100 + 50 * Math.random());
        while (!func()) {
            await sleep(100 + 50 * Math.random());
        }
        resolve();
    });
}

function parseDataToObject(data) {

    function isWhitespace(c) {
        switch (c) {
            case ' ':
            case '\t':
            case '\n':
                return true;
            default:
                return false;
        }
    }

    function parseValue(data, i) {

        if (i == null) i = 0;
        while (i < data.length && isWhitespace(data[i])) {
            i++;
        }

        if (i >= data.length) {
            return [null, i];
        }

        let c = data[i];
        if (c === '"') {
            let value = "\"";
            i++;
            while (i < data.length) {
                if (data[i] === '"') {
                    break;
                } else if (data[i] === '\\') {
                    value += data[i + 1];
                    i += 2;
                } else {
                    value += data[i];
                }
                i++;
            }
            value += "\"";
            i++;
            return [value, i];
        } else if (c === '{') {

            i++;
            let isArray = false;
            let value = new Object();
            let originalEntries = [];
            let multikeys = new Object();
            while (i < data.length) {

                while (i < data.length && isWhitespace(data[i])) {
                    i++;
                }

                if (i >= data.length) {
                    return [value, i];
                }

                if (data[i] === '}') {
                    i++;
                    break;
                }

                if (data[i] === '{') {
                    if (!isArray) {
                        isArray = true;
                        value = [];
                    }
                }

                if (isArray) {

                    let [val, j] = parseValue(data, i);
                    i = j;
                    value.push(val);

                } else {
                    
                    let key = "";

                    if (data[i] === '"') {
                        key += "\"";
                        i++;
                        while (i < data.length) {
                            if (data[i] === '"') {
                                break;
                            } else if (data[i] === '\\') {
                                key += data[i + 1];
                                i += 2;
                            } else {
                                key += data[i];
                            }
                            i++;
                        }
                        key += "\"";
                        i++;
                    } else {
                        while (i < data.length && !isWhitespace(data[i]) && data[i] !== '=') {
                            key += data[i];
                            i++;
                        }
                    }

                    /*
                    if (key === 'true' || key === 'yes') {
                        key = true;
                    } else if (key === 'false' || key === 'no') {
                        key = false;
                    } else if (key === 'null' || key === 'none') {
                        key = null;
                    } else*/ if (key == +key) {
                        key = +key;
                    }

                    if (i + 1 < data.length && data[i + 1] === '=') {
                        i++;
                    }

                    if (data[i] === '=') {

                        i++;
                        let [val, j] = parseValue(data, i);
                        i = j;

                        originalEntries.push([key, val]);

                        if (multikeys.hasOwnProperty(key)) {
                            multikeys[key].push(val);
                        } else if (value.hasOwnProperty(key)) {
                            multikeys[key] = [value[key]];
                            multikeys[key].push(val);
                        } else {    
                            value[key] = val;
                        }


                    } else {
                        isArray = true;
                        value = [];
                        value.push(key);
                    }
                    i++;

                }
            
                if (i >= data.length) return [value, i];

            }

            if (!isArray) {
                for (key in multikeys) {
                    if (multikeys.hasOwnProperty(key)) value[key] = multikeys[key];
                }     
                value[ENTRIES_KEY] = originalEntries;
            }

            return [value, i];

        } else {
            let value = "";
            while (i < data.length && !isWhitespace(data[i])) {
                value += data[i];
                i++;
            }
            /*
            if (value === 'true' || value === 'yes') {
                value = true;
            } else if (value === 'false' || value === 'no') {
                value = false;
            } else if (value === 'null' || value === 'none') {
                value = null;
            } else*/ if (value == +value){
                value = +value;
            }
            return [value, i];
        }
    }

    return parseValue("{\n" + data + "\n}\n")[0];

}

function serializeObjectToData(obj) {

    function serializePrimitive(val) {
        if (typeof val === 'number') {
            return ''+val;
        } else if (typeof val === 'string') {
            return val;
        }
    }

    // Use list & join because Chrome/Edge performance is bad otherwise

    function serialize(obj, indent, out) {

        let outer = (indent == null);

        if (typeof obj === 'number') {
            out.push(''+obj);
            out.push('\n');
        } else if (typeof obj === 'string') {
            out.push(obj);
            out.push('\n');

        } else if (Array.isArray(obj)) {

            let primitive = true;

            for (let val of obj) {
                if (typeof val === 'string') {
                    if (val.length > 0 && val[0] === '"') {
                        primitive = false;
                        break;
                    }
                }
                if (typeof val === 'object') {
                    primitive = false;
                    break;
                }
            }

            let nextIndent = indent;
            if (outer) {
                nextIndent = '';
            } else {
                nextIndent += '\t';
            }

            if (!outer) out.push('{\n');

            if (primitive) {

                out.push(nextIndent);

                obj.forEach((val) => {
                    out.push(serializePrimitive(val));
                    out.push(' ');
                });

                if (out[out.length - 1] === ' ') {
                    out.pop();
                }

                out.push('\n');
                if (!outer) out.push(indent + '}');
                out.push('\n');

            } else {

                for (let val of obj) {
                    out.push(nextIndent);
                    serialize(val, nextIndent, out);
                }

                if (!outer) out.push(indent + '}');
                out.push('\n');

            }
            
        } else {

            let nextIndent = indent;
            if (outer) {
                nextIndent = '';
            } else {
                nextIndent += '\t';
            }
            if (!outer) out.push('{\n');

            for (let entry of obj[ENTRIES_KEY]) {

                let key = entry[0];
                let val = entry[1];
                
                out.push(nextIndent);
                serialize(key, nextIndent, out);
                if (out[out.length - 1] === '\n') out.pop();
                out.push('=');
                serialize(val, nextIndent, out);
                
            }

            if (!outer) out.push(indent + '}');
            out.push('\n');

        }

        return out;

    }

    return serialize(obj, null, []).join('');

}

class SaveState {

    constructor(file) {

        let fileName = file.name;
        let zip = new JSZip();

        sleepUntilTrue(() => (!lock)).then(() => {

            lock = true;

            zip.loadAsync(file).then((save) => {

                this.saveFile = save;

                this.saveFile.file("gamestate").async("string").then((content) => {

                    this.gamestate = parseDataToObject(content);
                    cepheus_getStarbaseOwners(this.gamestate);

                    this.saveFile.file("meta").async("string").then((content) => {

                        this.meta = parseDataToObject(content);

                        if (DEBUG) {
                            console.log(this.gamestate);
                            console.log(this.meta);
                        }
                        
                        document.getElementById('fileStatus').innerHTML = 'Save file loaded.'

                        lock = false;
        
                    });

                });

            }).catch(function(e) {
                lock = false;
                console.log(e);
            });
        });

    }

}

function getSave(e) {

    try {

        if (e.target.files == null || e.target.files[0] == null) {
            throw new Error("No file was given");
        }

        const display = document.getElementById('fileInputDisplay');
        display.innerHTML = '';
        display.appendChild(document.createTextNode(e.target.files[0].name));
        document.getElementById('fileStatus').innerHTML = 'Loading save file...';
        saveGame = new SaveState(e.target.files[0]);

    } catch (e) {
        console.log(e);
        alert(e.message);
        document.getElementById('fileStatus').innerHTML = 'Save file failed to load.';
        return;
    }

}

function createEntries(obj) {

    obj[ENTRIES_KEY] = Object.entries(obj);

}

// Modifies gamestate object
function cepheus_getStarbaseOwners(gamestate) {

    if (gamestate.country == null) return;
    if (gamestate.fleet == null) return;
    if (gamestate.starbase_mgr == null) return;
    if (gamestate.starbase_mgr.starbases == null) return;

    let stations = new Map();

    for (let [id, starbase] of Object.entries(gamestate.starbase_mgr.starbases)) {
        if (starbase.station == null) continue;
        stations.set(starbase.station, id);
    }

    for (let [countryId, country] of Object.entries(gamestate.country)) {

        if (country.fleets_manager == null) continue;
        if (country.fleets_manager.owned_fleets == null) continue;

        for (let fleet of country.fleets_manager.owned_fleets) {
            if (fleet.fleet == null) continue;
            fleet = gamestate.fleet[fleet.fleet];
            if (fleet == null) continue;
            if (fleet.name == null) continue;
            let name = fleet.name;
            if (typeof name !== 'string') {
                if (typeof name.key === 'string') {
                    name = name.key;
                } else {
                    continue;
                }
            }

            if (!Array.isArray(fleet.ships)) continue;
            if (fleet.ships.length <= 0) continue;

            if (name === '"Starbase"' || name === '"shipclass_starbase_name"') {
                let starbaseId = stations.get(fleet.ships[0]);
                if (starbaseId == null) continue;
                starbaseId = +starbaseId;
                if (gamestate.starbase_mgr.starbases[starbaseId] != null) {
                    gamestate.starbase_mgr.starbases[starbaseId].owner = +countryId;
                }
            }
        }
    }

}

function getColorsAndCapitalSystems(gamestate, mapMode, colorVariant, starbaseCount, stars, federations) {

    function rgbToHsv(r, g, b, count, raw=false) {

        let highest = Math.max(r, g, b);
        
        let s = 1 - Math.min(r, g, b) / Math.max(highest, 1);
        let v = highest / 255.0;

        let h = 0;
        if (v === 0 || s === 0) {
            h = 0;
        } else {

            r /= v;
            g /= v;
            b /= v;

            r -= (1 - s) * (255 - r);
            g -= (1 - s) * (255 - g);
            b -= (1 - s) * (255 - b);

            highest = Math.max(r, g, b);

            if (highest === r) {
                if (b > g) {
                    h = 6/6 - b / r / 6;
                } else {
                    h = g / r / 6;
                }
            } else if (highest === g) {
                if (r > b) {
                    h = 2/6 - r / g / 6;
                } else {
                    h = 2/6 + b / g / 6;
                }
            } else {
                if (g > r) {
                    h = 4/6 - g / b / 6;
                } else {
                    h = 4/6 + r / b / 6;
                }
            }
        }

        return hsv(h, s, v, count, raw);
    }

    function hsv(h, s, v, count, raw=false) {

        // v = Math.max(0, Math.min(1, v + 0.25 * (Math.random() - 0.75)));
        // s = Math.max(0, Math.min(1, s + 0.25 * (Math.random() - 0.6)));

        count = +(count || 0);
        if (!raw) {
            v = Math.min(1.0, Math.max(0.2, 0.9 * v * (0.85 ** count) + 0.05));
            s = 0.65 * s;
            if (GREATER_DESATURATION) {
                s *= 0.75;
                v *= 0.9;
            }
        }

        let r = 0.0;
        let g = 0.0;
        let b = 0.0;

        if (h < 1/6) {
            r = 1.0;
            g = 6 * h;
        } else if (h < 2/6) {
            r = 6 * (2/6 - h);
            g = 1.0;
        } else if (h < 3/6) {
            g = 1.0;
            b = 6 * (h - 2/6);
        } else if (h < 4/6) {
            g = 6 * (4/6 - h);
            b = 1.0;
        } else if (h < 5/6) {
            b = 1.0;
            r = 6 * (h - 4/6);
        } else {
            b = 6 * (6/6 - h);
            r = 1.0;
        }

        r = s * r + (1 - s) * 1.0;
        g = s * g + (1 - s) * 1.0;
        b = s * b + (1 - s) * 1.0;

        r *= v;
        g *= v;
        b *= v;

        r = Math.max(0, Math.min(255, Math.floor(255 * r)));
        g = Math.max(0, Math.min(255, Math.floor(255 * g)));
        b = Math.max(0, Math.min(255, Math.floor(255 * b)));

        return `rgb(${r},${g},${b})`;

    }

    function randomColor() {
        return hsv(Math.random(), 0.4 * Math.random() + 0.4, 0.3 * Math.random() + 0.45, 0, false);
    }

    let colors = {};

    let colorCount = {};

    for (let [id, country] of Object.entries(gamestate.country)) {
        if (id == ENTRIES_KEY) continue;

        if (country.capital != null && starbaseCount[id] != null && starbaseCount[id] > 0) {

            let capital = +(country.capital);

            if (gamestate.planets != null && gamestate.planets.planet != null) {
                let planet = gamestate.planets.planet[capital];

                if (planet != null && planet.coordinate != null) {
                    let system = +(planet.coordinate.origin);
                    if (stars[system] != null) {
                        stars[system].capital = true;
                    }
                }
            }

        }

        let countryData = getCountryData(country, id, mapMode);
        if (countryData.level != null) {
            colors[id] = hsv(0.65, 0.7 - 0.38 * Math.max(0, 0.65 - countryData.level), 1.0 - 0.8 / 0.35 * Math.max(0, countryData.level - 0.65), 0, true);
            continue;
        }

        if (country.flag != null && Array.isArray(country.flag.colors) && country.flag.colors.length > 2) {

            let color = (''+country.flag.colors[2]).replaceAll('"', '');
            if (color == 'black' || color == 'null') color = (''+country.flag.colors[1]).replaceAll('"', '');
            if (color == 'black' || color == 'null') color = (''+country.flag.colors[0]).replaceAll('"', '');

            if (USE_FLAG_COLORS) {
                color = (''+country.flag.colors[0]).replaceAll('"', '');
                if (color == 'black' || color == 'null') color = (''+country.flag.colors[1]).replaceAll('"', '');
                if (color == 'black' || color == 'null') color = (''+country.flag.colors[2]).replaceAll('"', '');
            }

            if (colorCount[color] == null) {
                colorCount[color] = 0;
            } else {
                colorCount[color]++;
            }

            let count = colorCount[color];

            if (COLORS.hasOwnProperty(color)) {
                colors[id] = rgbToHsv(...(COLORS[color][colorVariant]), count, false);
                colorCount[color]++;
                continue;
            }
        } 

        colors[id] = randomColor();
    }

    if (federations && gamestate.federation != null) {

        for (let [id, country] of Object.entries(gamestate.country)) {

            if (colors[id] == null) continue;
            if (!Array.isArray(country.subjects)) continue;

            for (let subjectId of country.subjects) {
                colors[subjectId] = colors[id];
            }

        }

        for (let [id, federation] of Object.entries(gamestate.federation)) {

            if (typeof federation !== 'object' || federation == null) continue;
            if (!Array.isArray(federation.members)) continue;

            let color = randomColor();

            for (let id of federation.members) {
                if (colors[id] != null) {
                    color = colors[id];
                    break;
                }
            }

            for (let id of federation.members) {
                if (colors[id] != null) colors[id] = color;
            }

        }

    }

    colors[UNOWNED_ID] = BACKGROUND_COLOR;

    return [colors, colorCount];

}

function getMap(stars, hyperlanes, scaleFactor, sizeX, sizeY) {

    let map = [];

    for (let i = 0; i < RES_X; i++) {
        let column = [];
        for (let j = 0; j < RES_Y; j++) {

            let obj = {};
            obj[UNOWNED_ID] = scaleFactor * UNOWNED_VALUE;
            column.push(obj);

        }
        map.push(column);
    }

    for (let [id, star] of Object.entries(stars)) {

        let baseRadius = SYSTEM_RADIUS;

        let owner = star.owner;
        if (owner == null) {
            owner = UNOWNED_ID;
            baseRadius = UNOWNED_RADIUS;
        } else {
            owner = +owner;
        }

        baseRadius *= scaleFactor;

        let imin = Math.max(0, Math.floor((star.x - baseRadius) / sizeX));
        let imax = Math.min(RES_X, Math.floor((star.x + baseRadius) / sizeX));
        let jmin = Math.max(0, Math.floor((star.y - baseRadius) / sizeY));
        let jmax = Math.min(RES_Y, Math.floor((star.y + baseRadius) / sizeY));

        for (let i = imin; i < imax; i++) {
            column = map[i];
            for (let j = jmin; j < jmax; j++) {

                let x = sizeX * i;
                let y = sizeY * j;

                let distance = Math.hypot(star.x - x, star.y - y);
                let value = baseRadius - distance;

                if (distance < NEAR_RADIUS * scaleFactor) {
                    value -= baseRadius - NEAR_RADIUS * scaleFactor;
                    value *= NEAR_BOOST;
                    value += baseRadius - NEAR_RADIUS * scaleFactor;
                }

                value = Math.max(0, value);

                if (column[j][owner] == null) column[j][owner] = 0;
                // column[j][owner] += value;
                column[j][owner] = Math.max(column[j][owner], value);

            }
        }

    }

    for (let [key, hyperlane] of Object.entries(hyperlanes)) {

        if (stars[hyperlane.from].owner != stars[hyperlane.to].owner) continue;
        
        let baseRadius = HYPERLANE_RADIUS;

        let owner = stars[hyperlane.from].owner;
        if (owner == null) {
            owner = UNOWNED_ID;
            baseRadius = UNOWNED_HYPERLANE_RADIUS;
        } else {
            owner = +owner;
        }

        baseRadius *= scaleFactor;

        let x1 = stars[hyperlane.from].x;
        let y1 = stars[hyperlane.from].y;
        let x2 = stars[hyperlane.to].x;
        let y2 = stars[hyperlane.to].y;

        // ax + by = c

        let a = y1 - y2;
        let b = x2 - x1;
        let c = a * x1 + b * y1;

        let x3 = x1 - (y2 - y1);
        let y3 = y1 + (x2 - x1);

        let distanceFactor = Math.hypot(x3 - x1, y3 - y1) / Math.abs(a * x3 + b * y3 - c);

        // normal

        let a2 = b;
        let b2 = -a;
        let c2 = a2 * ((x1 + x2) / 2) + b2 * ((y1 + y2) / 2);

        // let normalFactor = Math.hypot((x2 - x1) / 2, (y2 - y1) / 2) / Math.abs(a2 * x2 + b2 * y2 - c2);
        let halfLength = Math.abs(a2 * x1 + b2 * y1 - c2);

        let imin = Math.max(0, Math.floor((Math.min(x1, x2) - baseRadius) / sizeX));
        let imax = Math.min(RES_X, Math.floor((Math.max(x1, x2) + baseRadius) / sizeX));
        let jmin = Math.max(0, Math.floor((Math.min(y1, y2) - baseRadius) / sizeY));
        let jmax = Math.min(RES_Y, Math.floor((Math.max(y1, y2) + baseRadius) / sizeY));

        for (let i = imin; i < imax; i++) {
            column = map[i];
            for (let j = jmin; j < jmax; j++) {

                let x = sizeX * i;
                let y = sizeY * j;

                let distance = Math.min(Math.hypot(x - x1, y - y1), Math.hypot(x - x2, y - y2));

                if (Math.abs(a2 * x + b2 * y - c2) <= halfLength) {
                    distance = Math.min(distance, distanceFactor * Math.abs(a * x + b * y - c));
                }

                let value = baseRadius - distance;

                if (distance < NEAR_RADIUS / 2  * scaleFactor) {
                    value -= baseRadius - NEAR_RADIUS / 2 * scaleFactor;
                    value *= NEAR_BOOST / 2;
                    value += baseRadius - NEAR_RADIUS / 2 * scaleFactor;
                }

                value = Math.max(0, value);

                if (!Number.isFinite(value)) continue;

                if (column[j][owner] == null) column[j][owner] = 0;
                // column[j][owner] += value;
                column[j][owner] = Math.max(column[j][owner], value);

            }
        }

    }

    return map;

}

function smoothMap(map) {

    let map2 = [];
    for (let i = 0; i < RES_X; i++) {
        let column = [];
        for (let j = 0; j < RES_Y; j++) {
            column.push({});
        }
        map2.push(column);
    }

    for (let j = 0; j < RES_Y; j++) {
        for (let i = 0; i < RES_X; i++) {

            let entries = Object.entries(map[i][j]);

            for (let dy = -SMOOTHING_RADIUS; dy <= SMOOTHING_RADIUS; dy++) {

                let y = j + dy;
                if (y < 0 || y >= RES_Y) continue;

                for (let dx = -SMOOTHING_RADIUS; dx <= SMOOTHING_RADIUS; dx++) {

                    let x = i + dx;
                    if (x < 0 || x >= RES_X) continue;

                    const factor = 1 - Math.hypot(dx, dy) / (SMOOTHING_RADIUS + 1);
                    if (factor <= 0) continue;
                    for (let [id, value] of entries) {
                        if (map2[x][y][id] == null) {
                            map2[x][y][id] = factor * value;
                        } else {
                            map2[x][y][id] += factor * value;
                        }
                    }

                }

            }
        }
    }

    return map2;

}

function getBlocksAndMapNames(ctx, gamestate, mapMode, values, createMapNames, sizeX, sizeY) {

    let blocks = [];
    let blockRun = [];
    let blockOwner = {};
    let blockSize = {};
    let blockMaximalRectangle = {};
    let blockCount = 0;

    for (let i = 0; i < RES_X - 1; i++) {
        let column = [];
        let column2 = [];
        for (let j = 0; j < RES_Y - 1; j++) {
            column.push(-1);
            column2.push(null);
        }
        blocks.push(column);
        blockRun.push(column2);
    }

    function spreadBlock(i, j, owner, block, stack) {
        if (i < 0 || i + 1 >= RES_X) return;
        if (j < 0 || j + 1 >= RES_Y) return;

        if (blocks[i][j] == block) return;
        
        let a = values[i][j].id;
        let b = values[i + 1][j].id;
        let c = values[i][j + 1].id;
        let d = values[i + 1][j + 1].id;

        if (a != owner) return;
        if (!(a == b && b == c && c == d)) return;

        blocks[i][j] = block;
        blockSize[block]++;

        stack.push([i - 1, j - 1]);
        stack.push([i, j - 1]);
        stack.push([i + 1, j - 1]);
        stack.push([i - 1, j]);
        stack.push([i + 1, j]);
        stack.push([i - 1, j + 1]);
        stack.push([i, j + 1]);
        stack.push([i + 1, j + 1]);

    }

    let stack = [];

    for (let j = 0; j + 1 < RES_Y; j++) {
        for (let i = 0; i + 1 < RES_X; i++) {

            if (blocks[i][j] != -1) continue;

            let a = values[i][j].id;
            let b = values[i + 1][j].id;
            let c = values[i][j + 1].id;
            let d = values[i + 1][j + 1].id;

            if (a == UNOWNED_ID) continue;
            if (a == b && b == c && c == d) {
                blockOwner[blockCount] = a;
                blockSize[blockCount] = 0;
                blockMaximalRectangle[blockCount] = null;

                stack.splice(0);
                stack.push([i, j]);

                for (let k = 0; k < stack.length; k++) {
                    spreadBlock(stack[k][0], stack[k][1], a, blockCount, stack);
                }

                blockCount++;
            }
        }
    }

    stack.splice(0);

    for (let j = 0; j < RES_Y - 1; j++) {

        let currentRun = {block: -1e100};

        for (let i = 0; i < RES_X - 1; i++) {

            if (blocks[i][j] == currentRun.block) {
                blockRun[i][j] = currentRun;
                continue;
            }

            currentRun.right = i;
            currentRun = {block: blocks[i][j], left: i};
            blockRun[i][j] = currentRun;

        }

        currentRun.right = RES_X - 1;

    }

    if (createMapNames) {
    
        ctx.font = `${(ALT_NAME_STYLE) ? '600' : '500'} 30px ${(ALT_NAME_STYLE) ? MAP_FONT_ALT : MAP_FONT}`;
    
        for (let block of Object.keys(blockMaximalRectangle)) {
    
            let owner = blockOwner[block];
    
            if (gamestate.country[owner] == null) continue;
            if (gamestate.country[owner].name == null) continue;
    
            let name = ''+(getCountryData(gamestate.country[owner], owner, mapMode).data);
    
            if (name.length < 1) continue;
    
            let text = ctx.measureText(name);
    
            let idealRatio = (sizeY / sizeX) * (text.width + 20) / (30 + 16);
    
            let best = {x: -1, y: -1, size: 0, width: 0};
    
            for (let j = 0; j < RES_Y - 1; j++) {
    
                let i = 0;
                while (i < RES_X - 1) {
                    
                    let size = 0;
                    let k = j;
                    let run = blockRun[i][j];
                    let minWidth = run.right - i;
    
                    while (true) {
    
                        if (k >= RES_Y - 1) break;
                        if (blocks[i][k] != block) break;
                        run = blockRun[i][k];
                        minWidth = Math.min(minWidth, run.right - i);
                        
                        size++;
                        if (idealRatio * size > minWidth) break;
    
                        if (size > best.size || (size == best.size && minWidth > best.width)) {
                            best.x = i + (minWidth - idealRatio * size) / 2;
                            best.y = j;
                            best.size = size;
                            best.width = minWidth
                        }
    
                        k++;
    
                    }
    
                    i += 1; // minWidth;
    
                }
    
            }
    
            if (best.size > 0) {
                let fontSize = (sizeY * best.size) / (30 + 16) * 30;
                if (LIMIT_MAP_NAME_SIZE) {
                    fontSize = Math.min(MAX_MAP_NAME_SIZE, fontSize);
                }
    
                blockMaximalRectangle[block] = {
                    x: sizeX * (best.x + idealRatio * best.size / 2) - fontSize / 30 * text.width / 2,
                    y: sizeY * (best.y + best.size / 2) + fontSize / 30 * Math.abs(text.actualBoundingBoxAscent) / 2,
                    fontSize: fontSize,
                    text: name,
                    owner: owner
                };
            }
    
        }

    }

    return [blocks, blockRun, blockOwner, blockSize, blockMaximalRectangle, blockCount];

}

function getPopGrid(starsObj, blocks, blockOwner, sizeX, sizeY) {

    let stars = [];
    for (let [id, star] of Object.entries(starsObj)) {
        stars.push(star);
    }

    stars.sort((a, b) => (a.id - b.id));

    stars.sort((a, b) => (b.population - a.population)); // Sorts from highest to lowest population

    let popGrid = [];

    for (let i = 0; i < RES_X - 1; i++) {
        let column = [];
        for (let j = 0; j < RES_Y - 1; j++) {
            column.push(false);
        }
        popGrid.push(column);
    }

    let overflow = {};

    let squareSize = Math.sqrt(sizeX * sizeY);

    let random = jsf32(INITIAL_PRNG_STATE[0], INITIAL_PRNG_STATE[1], INITIAL_PRNG_STATE[2], INITIAL_PRNG_STATE[3]);

    for (let system of stars) {

        if (system.population < 1) continue;

        let owner = system.owner;

        if (owner == UNOWNED_ID || owner == null) continue;

        let x = system.x;
        let y = system.y;

        let i = Math.floor(x / sizeX);
        let j = Math.floor(y / sizeY);

        if (i < 0 || i >= RES_X - 1 || j < 0 || j > RES_Y - 1) continue;
        if (blocks[i][j] == -1) continue;
        if (blockOwner[blocks[i][j]] != owner) continue;

        let block = blocks[i][j];

        if (overflow[owner] == null) {
            overflow[owner] = system.population;
        } else {
            overflow[owner] += system.population;
        }

        let pops = overflow[owner];
        let extraRadius = 0;
        let fails = 0;

        while (pops >= POPS_PER_SYMBOL && fails < 250 && extraRadius < 150) {

            let radius = squareSize * (Math.sqrt(pops / POPS_PER_SYMBOL) / 0.75 + extraRadius) * (random() ** 2);
            let angle = 2 * Math.PI * random();

            let i = Math.floor((x + radius * Math.cos(angle)) / sizeX);
            let j = Math.floor((y + radius * Math.sin(angle)) / sizeY);

            if (i < 0 || i >= RES_X - 1 || j < 0 || j >= RES_Y - 1 || blocks[i][j] != block || popGrid[i][j]) {
                fails += 1;
                if (fails >= 25) {
                    fails = 0;
                    extraRadius += 2;
                }
                continue;
            }

            popGrid[i][j] = true;
            pops -= POPS_PER_SYMBOL;

        }

        overflow[owner] = pops;

    }

    return popGrid;

}

function lerp(p0, p1, a0, b0, a1, b1) {

    a0 = a0 || 0;
    b0 = b0 || 0;
    a1 = a1 || 0;
    b1 = b1 || 0;

    a0 -= b0;
    a1 -= b1;

    if (a0 == a1) return 0.5 * p0 + 0.5 * p1;

    let t = (0 - a0) / (a1 - a0);
    if (!Number.isFinite(t)) t = 0.5;

    return (1 - t) * p0 + t * p1;

}

function drawCountryFill(ctx, colors, map, values, sizeX, sizeY) {
    
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1.0;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeWidth = 1.0;

    for (let currentId in colors) {

        if (!colors.hasOwnProperty(currentId)) continue;

        if (currentId == UNOWNED_ID) continue;

        ctx.fillStyle = colors[currentId] || MISSING_COLOR;
        ctx.strokeStyle = colors[currentId] || MISSING_COLOR;

        ctx.beginPath();

        for (let j = 0; j + 1 < RES_Y; j++) {

            for (let i = 0; i + 1 < RES_X; i++) {

                let value_UL = values[i][j];
                let value_UR = values[i + 1][j];
                let value_BL = values[i][j + 1];
                let value_BR = values[i + 1][j + 1];
                
                if (value_UL.id != currentId && value_UR.id != currentId && value_BL.id != currentId && value_BR.id != currentId) continue;
                
                let xmin = sizeX * i;
                let xmax = xmin + sizeX;
                let ymin = sizeY * j;
                let ymax = ymin + sizeY;

                let UL = map[i][j];
                let UR = map[i + 1][j];
                let BL = map[i][j + 1];
                let BR = map[i + 1][j + 1];

                if (value_UL.id == value_UR.id && value_UR.id == value_BL.id && value_BL.id == value_BR.id) {
                    if (value_UL.id != currentId) continue; // for some reason this breaks if I use a triple equals

                    ctx.rect(xmin, ymin, sizeX, sizeY);

                    continue;
                }

                if (value_UL.id == value_BR.id && value_UR.id == value_BL.id) {

                    let a = value_UL.id;
                    let b = value_UR.id;

                    let mida = 0;
                    let midb = 0;

                    if ((UR[a] || 0) == 0 || (BL[a] || 0) == 0) {
                        mida = 0.5 * value_UL.value + 0.5 * value_BR.value;
                    } else {
                        mida = 0.5 * (0.5 * value_UL.value + 0.5 * UR[a]) + 0.5 * (0.5 * value_BR.value + 0.5 * BL[a]);
                    }

                    if ((UL[b] || 0) == 0 || (BR[b] || 0) == 0) {
                        midb = 0.5 * value_UR.value + 0.5 * value_BL.value;
                    } else {
                        midb = 0.5 * (0.5 * value_UR.value + 0.5 * UL[b]) + 0.5 * (0.5 * value_BL.value + 0.5 * BR[b]);
                    }

                    let topMid = lerp(xmin, xmax, value_UL.value, (UL[b] || 0), (UR[a] || 0), value_UR.value);
                    let bottomMid = lerp(xmin, xmax, (BL[a] || 0), value_BL.value, value_BR.value, (BR[b] || 0));

                    let leftMid = lerp(ymin, ymax, value_UL.value, (UL[b] || 0), (BL[a] || 0), value_BL.value);
                    let rightMid = lerp(ymin, ymax, (UR[a] || 0), value_UR.value, value_BR.value, (BR[b] || 0));

                    if (midb > mida) {

                        if (value_UL.id == currentId) {
                            ctx.moveTo(xmin, ymin);
                            ctx.lineTo(topMid, ymin);
                            ctx.lineTo(xmin, leftMid);
                            ctx.closePath();

                            ctx.moveTo(xmax, ymax);
                            ctx.lineTo(bottomMid, ymax);
                            ctx.lineTo(xmax, rightMid);
                            ctx.closePath();
                        }
                        
                        if (value_UR.id == currentId) {
                            ctx.moveTo(xmax, ymin);
                            ctx.lineTo(xmax, rightMid);
                            ctx.lineTo(bottomMid, ymax);
                            ctx.lineTo(xmin, ymax);
                            ctx.lineTo(xmin, leftMid);
                            ctx.lineTo(topMid, ymin);
                        }

                    } else {

                        if (value_UL.id == currentId) {
                            ctx.moveTo(xmin, ymin);
                            ctx.lineTo(topMid, ymin);
                            ctx.lineTo(xmax, rightMid);
                            ctx.lineTo(xmax, ymax);
                            ctx.lineTo(bottomMid, ymax);
                            ctx.lineTo(xmin, leftMid);
                            ctx.closePath();
                        }

                        if (value_UR.id == currentId) {
                            ctx.moveTo(xmax, ymin);
                            ctx.lineTo(xmax, rightMid);
                            ctx.lineTo(topMid, ymin);
                            ctx.closePath();
    
                            ctx.moveTo(xmin, ymax);
                            ctx.lineTo(xmin, leftMid);
                            ctx.lineTo(bottomMid, ymax);
                            ctx.closePath();
                        }

                    }

                    continue;

                }

                let a = value_UL.id;
                let b = value_UR.id;
                let c = value_BR.id;
                let d = value_BL.id;

                let topMid = lerp(xmin, xmax, value_UL.value, (UL[b] || 0), (UR[a] || 0), value_UR.value);
                let bottomMid = lerp(xmax, xmin, value_BR.value, (BR[d] || 0), (BL[c] || 0), value_BL.value);

                let rightMid = lerp(ymin, ymax, value_UR.value, (UR[c] || 0), (BR[b] || 0), value_BR.value);
                let leftMid = lerp(ymax, ymin, value_BL.value, (BL[a] || 0), (UL[d] || 0), value_UL.value);

                if (a == currentId) {

                    ctx.moveTo(xmin, ymin);
                    ctx.lineTo(topMid, ymin);

                    if (a == b) {
                        b = UNOWNED_ID;
                        ctx.lineTo(topMid, ymin);
                        ctx.lineTo(xmax, ymin);
                        ctx.lineTo(xmax, rightMid);
                    }

                    if (a == c) {
                        c = UNOWNED_ID;
                        ctx.lineTo(xmax, rightMid);
                        ctx.lineTo(xmax, ymax);
                        ctx.lineTo(bottomMid, ymax);
                    }

                    if (a == d) {
                        d = UNOWNED_ID;
                        ctx.lineTo(bottomMid, ymax);
                        ctx.lineTo(xmin, ymax);
                        ctx.lineTo(xmin, leftMid);
                    }
                    
                    ctx.lineTo(xmin, leftMid);

                    ctx.closePath();

                }

                if (b == currentId) {

                    ctx.moveTo(xmax, ymin);
                    ctx.lineTo(xmax, rightMid);

                    if (b == c) {
                        c = UNOWNED_ID;
                        ctx.lineTo(xmax, rightMid);
                        ctx.lineTo(xmax, ymax);
                        ctx.lineTo(bottomMid, ymax);
                    }

                    if (b == d) {
                        d = UNOWNED_ID;
                        ctx.lineTo(bottomMid, ymax);
                        ctx.lineTo(xmin, ymax);
                        ctx.lineTo(xmin, leftMid);
                    }
                    
                    ctx.lineTo(topMid, ymin);

                    ctx.closePath();

                }

                if (c == currentId) {

                    ctx.moveTo(xmax, ymax);
                    ctx.lineTo(bottomMid, ymax);

                    if (c == d) {
                        d = UNOWNED_ID;
                        ctx.lineTo(bottomMid, ymax);
                        ctx.lineTo(xmin, ymax);
                        ctx.lineTo(xmin, leftMid);
                    }
                    
                    ctx.lineTo(xmax, rightMid);

                    ctx.closePath();

                }

                if (d == currentId) {

                    ctx.moveTo(xmin, ymax);
                    ctx.lineTo(xmin, leftMid);
                    ctx.lineTo(bottomMid, ymax);

                    ctx.closePath();

                }

            }

        }

        ctx.fill();
        ctx.stroke();

    }

}

function drawEdgeBorders(ctx, map, values, sizeX, sizeY) {

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = 'source-atop';
    ctx.globalAlpha = 1.0;

    for (let border of EDGE_BORDERS) {

        if (LIGHT_BORDERS) {
            if (!(border.light)) continue;
        } else {
            if (!(border.regular)) continue;
        }

        ctx.strokeStyle = border.color;
        ctx.lineWidth = border.width;
        ctx.beginPath();

        for (let j = 0; j + 1 < RES_Y; j++) {

            for (let i = 0; i + 1 < RES_X; i++) {

                let value_UL = values[i][j];
                let value_UR = values[i + 1][j];
                let value_BL = values[i][j + 1];
                let value_BR = values[i + 1][j + 1];
                
                let xmin = sizeX * i;
                let xmax = xmin + sizeX;
                let ymin = sizeY * j;
                let ymax = ymin + sizeY;

                let UL = map[i][j];
                let UR = map[i + 1][j];
                let BL = map[i][j + 1];
                let BR = map[i + 1][j + 1];

                if (value_UL.id == value_UR.id && value_UR.id == value_BL.id && value_BL.id == value_BR.id) {
                    continue;
                }

                if (value_UL.id == value_BR.id && value_UR.id == value_BL.id) {

                    let a = value_UL.id;
                    let b = value_UR.id;
                    
                    if (a == null) a == UNOWNED_ID;
                    if (b == null) b == UNOWNED_ID;

                    if (a != UNOWNED_ID && b != UNOWNED_ID) continue;

                    let mida = 0;
                    let midb = 0;

                    if ((UR[a] || 0) == 0 || (BL[a] || 0) == 0) {
                        mida = 0.5 * value_UL.value + 0.5 * value_BR.value;
                    } else {
                        mida = 0.5 * (0.5 * value_UL.value + 0.5 * UR[a]) + 0.5 * (0.5 * value_BR.value + 0.5 * BL[a]);
                    }

                    if ((UL[b] || 0) == 0 || (BR[b] || 0) == 0) {
                        midb = 0.5 * value_UR.value + 0.5 * value_BL.value;
                    } else {
                        midb = 0.5 * (0.5 * value_UR.value + 0.5 * UL[b]) + 0.5 * (0.5 * value_BL.value + 0.5 * BR[b]);
                    }

                    let topMid = lerp(xmin, xmax, value_UL.value, (UL[b] || 0), (UR[a] || 0), value_UR.value);
                    let bottomMid = lerp(xmin, xmax, (BL[a] || 0), value_BL.value, value_BR.value, (BR[b] || 0));

                    let leftMid = lerp(ymin, ymax, value_UL.value, (UL[b] || 0), (BL[a] || 0), value_BL.value);
                    let rightMid = lerp(ymin, ymax, (UR[a] || 0), value_UR.value, value_BR.value, (BR[b] || 0));

                    if (midb > mida) {

                        ctx.moveTo(topMid, ymin);
                        ctx.lineTo(xmin, leftMid);

                        ctx.moveTo(xmax, rightMid);
                        ctx.lineTo(bottomMid, ymax);

                    } else {

                        ctx.moveTo(topMid, ymin);
                        ctx.lineTo(xmax, rightMid);

                        ctx.moveTo(xmin, leftMid);
                        ctx.lineTo(bottomMid, ymax);

                    }

                    continue;

                }

                let a = value_UL.id;
                let b = value_UR.id;
                let c = value_BR.id;
                let d = value_BL.id;

                if (a == null) a == UNOWNED_ID;
                if (b == null) b == UNOWNED_ID;
                if (c == null) c == UNOWNED_ID;
                if (d == null) d == UNOWNED_ID;

                let topMid = lerp(xmin, xmax, value_UL.value, (UL[b] || 0), (UR[a] || 0), value_UR.value);
                let bottomMid = lerp(xmax, xmin, value_BR.value, (BR[d] || 0), (BL[c] || 0), value_BL.value);

                let rightMid = lerp(ymin, ymax, value_UR.value, (UR[c] || 0), (BR[b] || 0), value_BR.value);
                let leftMid = lerp(ymax, ymin, value_BL.value, (BL[a] || 0), (UL[d] || 0), value_UL.value);

                if (a != d && a != b && (a == UNOWNED_ID || d == UNOWNED_ID || b == UNOWNED_ID)) {
                    ctx.moveTo(xmin, leftMid);
                    ctx.lineTo(topMid, ymin);
                }

                if (b != a && b != c && (b == UNOWNED_ID || a == UNOWNED_ID || c == UNOWNED_ID)) {
                    ctx.moveTo(topMid, ymin);
                    ctx.lineTo(xmax, rightMid);
                }

                if (c != b && c != d && (c == UNOWNED_ID || b == UNOWNED_ID || d == UNOWNED_ID)) {
                    ctx.moveTo(xmax, rightMid);
                    ctx.lineTo(bottomMid, ymax);
                }

                if (d != c && d != a && (d == UNOWNED_ID || c == UNOWNED_ID || a == UNOWNED_ID)) {
                    ctx.moveTo(bottomMid, ymax);
                    ctx.lineTo(xmin, leftMid);
                }

                if ((a == b) && !(a == d || b == c) && (d == UNOWNED_ID || c == UNOWNED_ID)) {
                    ctx.moveTo(xmin, leftMid);
                    ctx.lineTo(xmax, rightMid);
                } else if ((c == d) && !(c == b || d == a) && (b == UNOWNED_ID || a == UNOWNED_ID)) {
                    ctx.moveTo(xmin, leftMid);
                    ctx.lineTo(xmax, rightMid);
                }

                if ((b == c) && !(b == a || c == d) && (a == UNOWNED_ID || d == UNOWNED_ID)) {
                    ctx.moveTo(topMid, ymin);
                    ctx.lineTo(bottomMid, ymax);
                } else if ((d == a) && !(d == c || a == b) && (c == UNOWNED_ID || b == UNOWNED_ID)) {
                    ctx.moveTo(topMid, ymin);
                    ctx.lineTo(bottomMid, ymax);
                }

            }

        }

        ctx.stroke();

    }

}

function drawCountryBorders(ctx, map, values, sizeX, sizeY) {

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1.0;

    for (let border of BORDERS) {
        
        if (LIGHT_BORDERS) {
            if (!(border.light)) continue;
        } else {
            if (!(border.regular)) continue;
        }
    
        ctx.strokeStyle = border.color;
        ctx.lineWidth = border.width;
        ctx.beginPath();

        for (let j = 0; j + 1 < RES_Y; j++) {

            for (let i = 0; i + 1 < RES_X; i++) {

                let value_UL = values[i][j];
                let value_UR = values[i + 1][j];
                let value_BL = values[i][j + 1];
                let value_BR = values[i + 1][j + 1];
                
                let xmin = sizeX * i;
                let xmax = xmin + sizeX;
                let ymin = sizeY * j;
                let ymax = ymin + sizeY;

                let UL = map[i][j];
                let UR = map[i + 1][j];
                let BL = map[i][j + 1];
                let BR = map[i + 1][j + 1];

                if (value_UL.id == value_UR.id && value_UR.id == value_BL.id && value_BL.id == value_BR.id) {
                    continue;
                }

                if (value_UL.id == value_BR.id && value_UR.id == value_BL.id) {

                    let a = value_UL.id;
                    let b = value_UR.id;
                    
                    if (a == null) a == UNOWNED_ID;
                    if (b == null) b == UNOWNED_ID;

                    if (a == UNOWNED_ID || b == UNOWNED_ID) continue;

                    let mida = 0;
                    let midb = 0;

                    if ((UR[a] || 0) == 0 || (BL[a] || 0) == 0) {
                        mida = 0.5 * value_UL.value + 0.5 * value_BR.value;
                    } else {
                        mida = 0.5 * (0.5 * value_UL.value + 0.5 * UR[a]) + 0.5 * (0.5 * value_BR.value + 0.5 * BL[a]);
                    }

                    if ((UL[b] || 0) == 0 || (BR[b] || 0) == 0) {
                        midb = 0.5 * value_UR.value + 0.5 * value_BL.value;
                    } else {
                        midb = 0.5 * (0.5 * value_UR.value + 0.5 * UL[b]) + 0.5 * (0.5 * value_BL.value + 0.5 * BR[b]);
                    }

                    let topMid = lerp(xmin, xmax, value_UL.value, (UL[b] || 0), (UR[a] || 0), value_UR.value);
                    let bottomMid = lerp(xmin, xmax, (BL[a] || 0), value_BL.value, value_BR.value, (BR[b] || 0));

                    let leftMid = lerp(ymin, ymax, value_UL.value, (UL[b] || 0), (BL[a] || 0), value_BL.value);
                    let rightMid = lerp(ymin, ymax, (UR[a] || 0), value_UR.value, value_BR.value, (BR[b] || 0));

                    if (midb > mida) {

                        ctx.moveTo(topMid, ymin);
                        ctx.lineTo(xmin, leftMid);

                        ctx.moveTo(xmax, rightMid);
                        ctx.lineTo(bottomMid, ymax);

                    } else {

                        ctx.moveTo(topMid, ymin);
                        ctx.lineTo(xmax, rightMid);

                        ctx.moveTo(xmin, leftMid);
                        ctx.lineTo(bottomMid, ymax);

                    }

                    continue;

                }

                let a = value_UL.id;
                let b = value_UR.id;
                let c = value_BR.id;
                let d = value_BL.id;

                if (a == null) a == UNOWNED_ID;
                if (b == null) b == UNOWNED_ID;
                if (c == null) c == UNOWNED_ID;
                if (d == null) d == UNOWNED_ID;

                let topMid = lerp(xmin, xmax, value_UL.value, (UL[b] || 0), (UR[a] || 0), value_UR.value);
                let bottomMid = lerp(xmax, xmin, value_BR.value, (BR[d] || 0), (BL[c] || 0), value_BL.value);

                let rightMid = lerp(ymin, ymax, value_UR.value, (UR[c] || 0), (BR[b] || 0), value_BR.value);
                let leftMid = lerp(ymax, ymin, value_BL.value, (BL[a] || 0), (UL[d] || 0), value_UL.value);

                if (a != d && a != b && !(a == UNOWNED_ID || d == UNOWNED_ID || b == UNOWNED_ID)) {
                    ctx.moveTo(xmin, leftMid);
                    ctx.lineTo(topMid, ymin);
                }

                if (b != a && b != c && !(b == UNOWNED_ID || a == UNOWNED_ID || c == UNOWNED_ID)) {
                    ctx.moveTo(topMid, ymin);
                    ctx.lineTo(xmax, rightMid);
                }

                if (c != b && c != d && !(c == UNOWNED_ID || b == UNOWNED_ID || d == UNOWNED_ID)) {
                    ctx.moveTo(xmax, rightMid);
                    ctx.lineTo(bottomMid, ymax);
                }

                if (d != c && d != a && !(d == UNOWNED_ID || c == UNOWNED_ID || a == UNOWNED_ID)) {
                    ctx.moveTo(bottomMid, ymax);
                    ctx.lineTo(xmin, leftMid);
                }

                if (a == UNOWNED_ID || b == UNOWNED_ID || c == UNOWNED_ID || d == UNOWNED_ID) continue;

                if ((a == b) && !(a == d || b == c)) {
                    ctx.moveTo(xmin, leftMid);
                    ctx.lineTo(xmax, rightMid);
                } else if ((c == d) && !(c == b || d == a)) {
                    ctx.moveTo(xmin, leftMid);
                    ctx.lineTo(xmax, rightMid);
                }

                if ((b == c) && !(b == a || c == d)) {
                    ctx.moveTo(topMid, ymin);
                    ctx.lineTo(bottomMid, ymax);
                } else if ((d == a) && !(d == c || a == b)) {
                    ctx.moveTo(topMid, ymin);
                    ctx.lineTo(bottomMid, ymax);
                }

            }

        }

        ctx.stroke();

    }
    
    ctx.fillStyle = BORDERS[BORDERS.length - 1].color;
    ctx.beginPath();

    let points = [[0, 0], [0, 0], [0, 0], [0, 0]];

    for (let j = 0; j + 1 < RES_Y; j++) {

        for (let i = 0; i + 1 < RES_X; i++) {

            let value_UL = values[i][j];
            let value_UR = values[i + 1][j];
            let value_BL = values[i][j + 1];
            let value_BR = values[i + 1][j + 1];
            
            let xmin = sizeX * i;
            let xmax = xmin + sizeX;
            let ymin = sizeY * j;
            let ymax = ymin + sizeY;

            let UL = map[i][j];
            let UR = map[i + 1][j];
            let BL = map[i][j + 1];
            let BR = map[i + 1][j + 1];

            if (value_UL.id == value_UR.id && value_UR.id == value_BL.id && value_BL.id == value_BR.id) {
                continue;
            }

            if (value_UL.id == value_BR.id && value_UR.id == value_BL.id) {
                continue;
            }

            let a = value_UL.id;
            let b = value_UR.id;
            let c = value_BR.id;
            let d = value_BL.id;

            if (a == null) a == UNOWNED_ID;
            if (b == null) b == UNOWNED_ID;
            if (c == null) c == UNOWNED_ID;
            if (d == null) d == UNOWNED_ID;

            let topMid = lerp(xmin, xmax, value_UL.value, (UL[b] || 0), (UR[a] || 0), value_UR.value);
            let bottomMid = lerp(xmax, xmin, value_BR.value, (BR[d] || 0), (BL[c] || 0), value_BL.value);

            let rightMid = lerp(ymin, ymax, value_UR.value, (UR[c] || 0), (BR[b] || 0), value_BR.value);
            let leftMid = lerp(ymax, ymin, value_BL.value, (BL[a] || 0), (UL[d] || 0), value_UL.value);

            let numPoints = 0;

            if ((a != b) && !(a == UNOWNED_ID || b == UNOWNED_ID)) {
                points[numPoints][0] = topMid;
                points[numPoints++][1] = ymin;
            }

            if ((b != c) && !(b == UNOWNED_ID || c == UNOWNED_ID)) {
                points[numPoints][0] = xmax;
                points[numPoints++][1] = rightMid;
            }

            if ((c != d) && !(c == UNOWNED_ID || d == UNOWNED_ID)) {
                points[numPoints][0] = bottomMid;
                points[numPoints++][1] = ymax;
            }

            if ((d != a) && !(d == UNOWNED_ID || a == UNOWNED_ID)) {
                points[numPoints][0] = xmin;
                points[numPoints++][1] = leftMid;
            }

            if (numPoints < 3) continue;

            ctx.moveTo(points[0][0], points[0][1]);
            for (let i = 1; i < numPoints; i++) {
                ctx.lineTo(points[i][0], points[i][1]);
            }
            ctx.closePath();

        }

    }

    ctx.fill();

}

function fillStar(ctx, x, y, radius) {

    function starPoint(n) {
        ctx.lineTo(
            x + radius * Math.cos((n/5 + 1/2) * Math.PI),
            y - radius * Math.sin((n/5 + 1/2) * Math.PI)
        );
    }

    ctx.beginPath();
    ctx.moveTo(x, y - radius);
    starPoint(4);
    starPoint(8);
    starPoint(2);
    starPoint(6);
    ctx.closePath();
    ctx.fill('nonzero');

}

function drawGatewayMarker(ctx, x, y, size) {
    let radius = 1.05 * size;
    ctx.lineWidth = 0.65 * Math.min(size, (CAPITAL_OUTER_RADIUS + UPGRADED_RADIUS) / 2);
    ctx.beginPath();

    ctx.moveTo(x - radius, y - radius);
    ctx.lineTo(x + radius, y + radius);

    ctx.moveTo(x + radius, y - radius);
    ctx.lineTo(x - radius, y + radius);

    ctx.strokeStyle = ctx.fillStyle;
    ctx.lineCap = 'round';
    ctx.stroke();
}

function drawPopMarker(ctx, x, y, sizeX, sizeY, center=false) {

    if (center) {
        x -= sizeX / 2;
        y -= sizeY / 2;
    }

    ctx.moveTo(x + 0.1 * sizeX, y + 0.1 * sizeY);
    ctx.lineTo(x + 0.9 * sizeX, y + 0.1 * sizeY);
    ctx.lineTo(x + 0.9 * sizeX, y + 0.9 * sizeY);
    ctx.lineTo(x + 0.1 * sizeX, y + 0.9 * sizeY);
    ctx.closePath();

}

function drawGeography(ctx, colors, stars, hyperlanes) {

    ctx.lineJoin = 'round';
    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1.0;

    ctx.strokeStyle = HYPERLANE_COLOR;
    ctx.lineWidth = HYPERLANE_WIDTH;
    ctx.beginPath();

    for (let [key, hyperlane] of Object.entries(hyperlanes)) {

        if (stars[hyperlane.from].hyperRelay && stars[hyperlane.to].hyperRelay) continue;

        let x1 = stars[hyperlane.from].x;
        let y1 = stars[hyperlane.from].y;
        let x2 = stars[hyperlane.to].x;
        let y2 = stars[hyperlane.to].y;

        let length = Math.hypot(x2 - x1, y2 - y1);
        if (length <= 0) continue;

        dx = (x2 - x1) / length;
        dy = (y2 - y1) / length;

        if (stars[hyperlane.from].upgraded) { 
            ctx.moveTo(x1, y1);
        } else {
            ctx.moveTo(x1 + dx * Math.min(STAR_PADDING, length / 2), y1 + dy * Math.min(STAR_PADDING, length / 2));   
        }

        if (stars[hyperlane.to].upgraded) { 
            ctx.lineTo(x2, y2);
        } else {
            ctx.lineTo(x2 - dx * Math.min(STAR_PADDING, length / 2), y2 - dy * Math.min(STAR_PADDING, length / 2));   
        }

    }
    
    ctx.lineCap = 'butt';
    ctx.stroke();

    ctx.beginPath();
    ctx.lineWidth = HYPERLANE_HYPER_RELAY_WIDTH;
    ctx.strokeStyle = HYPERLANE_HYPER_RELAY_COLOR;
    for (let [key, hyperlane] of Object.entries(hyperlanes)) {

        if (!stars[hyperlane.from].hyperRelay || !stars[hyperlane.to].hyperRelay) continue;

        let x1 = stars[hyperlane.from].x;
        let y1 = stars[hyperlane.from].y;
        let x2 = stars[hyperlane.to].x;
        let y2 = stars[hyperlane.to].y;

        let length = Math.hypot(x2 - x1, y2 - y1);
        if (length <= 0) continue;

        dx = (x2 - x1) / length;
        dy = (y2 - y1) / length;

        if (stars[hyperlane.from].upgraded) { 
            ctx.moveTo(x1, y1);
        } else {
            ctx.moveTo(x1 + dx * Math.min(STAR_PADDING, length / 2), y1 + dy * Math.min(STAR_PADDING, length / 2));   
        }

        if (stars[hyperlane.to].upgraded) { 
            ctx.lineTo(x2, y2);
        } else {
            ctx.lineTo(x2 - dx * Math.min(STAR_PADDING, length / 2), y2 - dy * Math.min(STAR_PADDING, length / 2));   
        }
        
    }
    ctx.stroke();

    ctx.lineCap = 'round';

    for (let [id, star] of Object.entries(stars)) {

        if (star.capital) {
            continue;
        }

        if (star.upgraded) {
            continue;
        }

        ctx.fillStyle = (star.population > 0) ? POPULATED_COLOR : STAR_COLOR;
        if (star.gateway) drawGatewayMarker(ctx, star.x, star.y, STAR_RADIUS);

        ctx.beginPath();
        ctx.arc(star.x, star.y, STAR_RADIUS, 0, 2 * Math.PI);
        ctx.fill();

        if (star.gateway) drawGatewayMarker(ctx, star.x, star.y, STAR_RADIUS);

    }
    
    for (let [id, star] of Object.entries(stars)) {

        if (star.capital) {
            continue;
        }

        if (star.upgraded) {
            
            ctx.fillStyle = (star.population > 0) ? POPULATED_COLOR : STAR_COLOR;
            if (star.gateway) drawGatewayMarker(ctx, star.x, star.y, UPGRADED_RADIUS);

            ctx.beginPath();
            ctx.arc(star.x, star.y, UPGRADED_RADIUS, 0, 2 * Math.PI);
            ctx.fill();

            if (star.gateway) drawGatewayMarker(ctx, star.x, star.y, UPGRADED_RADIUS);

        }

    }
    
    for (let [id, star] of Object.entries(stars)) {

        if (star.capital) {

            ctx.fillStyle = POPULATED_COLOR;
            if (star.gateway) drawGatewayMarker(ctx, star.x, star.y, (CAPITAL_OUTER_RADIUS + CAPITAL_INNER_RADIUS) / 2);

            ctx.beginPath();
            ctx.arc(star.x, star.y, CAPITAL_OUTER_RADIUS, 0, 2 * Math.PI);
            ctx.fill();

            let owner = star.owner;
            if (owner == null) owner = UNOWNED_ID;

            ctx.fillStyle = (colors[owner] || MISSING_COLOR);
            ctx.beginPath();
            ctx.arc(star.x, star.y, CAPITAL_INNER_RADIUS, 0, 2 * Math.PI);
            ctx.fill();
            
            ctx.fillStyle = POPULATED_COLOR;
            fillStar(ctx, star.x, star.y, CAPITAL_STAR_RADIUS);

        }

    }

}

function drawMapNames(ctx, blockMaximalRectangle) {

    let canvas2 = document.getElementById('helperCanvas');
    let ctx2 = canvas2.getContext('2d');

    ctx2.lineJoin = 'round';
    ctx2.lineCap = 'round';
    ctx2.globalCompositeOperation = 'copy';

    canvas2.width = MAP_WIDTH;
    canvas2.height = MAP_HEIGHT;

    ctx2.fillStyle = 'rgba(0,0,0,0)';
    ctx2.beginPath();
    ctx2.rect(0, 0, MAP_WIDTH, MAP_HEIGHT);
    ctx2.fill();

    ctx2.strokeStyle = MAP_NAME_STROKE;
    ctx2.fillStyle = MAP_NAME_FILL;

    for (let [block, rect] of Object.entries(blockMaximalRectangle)) {
        if (rect == null || rect.fontSize < MIN_MAP_NAME_SIZE) continue;

        ctx2.font = `${(ALT_NAME_STYLE) ? 'bold' : '500'} ${rect.fontSize}px ${(ALT_NAME_STYLE) ? MAP_FONT_ALT : MAP_FONT}`;
        ctx2.lineWidth = MAP_NAME_STROKE_WIDTH * rect.fontSize;
        ctx2.strokeText(rect.text, rect.x, rect.y);
    }

    for (let [block, rect] of Object.entries(blockMaximalRectangle)) {
        if (rect == null || rect.fontSize < MIN_MAP_NAME_SIZE) continue;

        ctx2.font = `${(ALT_NAME_STYLE) ? 'bold' : '500'} ${rect.fontSize}px ${(ALT_NAME_STYLE) ? MAP_FONT_ALT : MAP_FONT}`;
        ctx2.lineWidth = MAP_NAME_STROKE_WIDTH * rect.fontSize;
        ctx2.fillText(rect.text, rect.x, rect.y);
    }

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = MAP_NAME_ALPHA;
    ctx.drawImage(canvas2, 0, 0);
    ctx.globalAlpha = 1.0;

}

function drawPopGrid(ctx, popGrid, sizeX, sizeY) {

    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = POP_SYMBOL_FILL;

    ctx.beginPath();

    for (let i = 0; i < RES_X - 1; i++) {

        let column = popGrid[i];

        for (let j = 0; j < RES_Y - 1; j++) {

            if (column[j]) {
                drawPopMarker(ctx, sizeX * i, sizeY * j, sizeX, sizeY);
            }

        }

    }

    ctx.fill();

}

function drawMapMiddle(ctx, gamestate, innerRadius) {

    ctx.globalCompositeOperation = 'source-over';
    ctx.globalAlpha = 1.0;

    ctx.fillStyle = INNER_CIRCLE_COLOR;

    ctx.beginPath();
    ctx.arc(MAP_WIDTH / 2, MAP_HEIGHT / 2, innerRadius, 0, 2 * Math.PI);
    ctx.fill();

    ctx.font = `bold 30px ${MAP_MIDDLE_FONT}`;
    let galaxyName = document.getElementById('galaxyName').value;
    let text = ctx.measureText(galaxyName);
    let fontSize = 30 * 0.75 * 2 * innerRadius / Math.max(60, text.width);

    ctx.font = `bold ${fontSize}px ${MAP_MIDDLE_FONT}`;
    ctx.fillStyle = MAP_MIDDLE_TEXT_COLOR;

    ctx.fillText(galaxyName, MAP_WIDTH / 2 - fontSize / 30 * text.width / 2, MAP_HEIGHT / 2 - 0.35 * innerRadius); // for some reason center align is buggy

    let dateText = (''+(gamestate.date)).replaceAll('"', '');

    ctx.font = `bold 30px ${MAP_MIDDLE_FONT}`;
    text = ctx.measureText(dateText);
    fontSize = 0.18 * innerRadius;
    ctx.font = `bold ${fontSize}px ${MAP_MIDDLE_FONT}`;
    ctx.fillText(dateText, MAP_WIDTH / 2 - fontSize / 30 * text.width / 2, MAP_HEIGHT / 2 - 0.1 * innerRadius);

    fontSize = 0.08 * innerRadius;
    ctx.font = `${fontSize}px ${MAP_MIDDLE_FONT}`;

    let x = MAP_WIDTH / 2 - 0.56 * innerRadius;
    let heights = [0.05, 0.2, 0.35, 0.51, 0.68];

    ctx.lineJoin = 'round';
    ctx.lineCap = 'butt';
    ctx.strokeStyle = HYPERLANE_COLOR;
    ctx.lineWidth = HYPERLANE_WIDTH;
    ctx.beginPath();
    ctx.moveTo(x, MAP_HEIGHT / 2 - 0.02 * innerRadius);
    ctx.lineTo(x, MAP_HEIGHT / 2 + heights[0] * innerRadius - STAR_PADDING);
    ctx.moveTo(x, MAP_HEIGHT / 2 + heights[0] * innerRadius + STAR_PADDING);
    ctx.lineTo(x, MAP_HEIGHT / 2 + heights[1] * innerRadius - STAR_PADDING);
    ctx.moveTo(x, MAP_HEIGHT / 2 + heights[1] * innerRadius + STAR_PADDING);
    ctx.lineTo(x, MAP_HEIGHT / 2 + heights[2] * innerRadius - STAR_PADDING);
    ctx.moveTo(x, MAP_HEIGHT / 2 + heights[2] * innerRadius + STAR_PADDING);
    ctx.lineTo(x, MAP_HEIGHT / 2 + heights[4] * innerRadius - (CAPITAL_OUTER_RADIUS + CAPITAL_INNER_RADIUS) / 2);
    ctx.moveTo(x, MAP_HEIGHT / 2 + heights[4] * innerRadius + (CAPITAL_OUTER_RADIUS + CAPITAL_INNER_RADIUS) / 2);
    ctx.lineTo(x, MAP_HEIGHT / 2 + 0.77 * innerRadius);
    ctx.stroke();

    let y = MAP_HEIGHT / 2 + heights[0] * innerRadius;

    ctx.fillStyle = STAR_COLOR;
    ctx.beginPath();
    ctx.arc(x, y, STAR_RADIUS, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = MAP_MIDDLE_TEXT_COLOR;
    ctx.fillText('System', x + 0.11 * innerRadius, y + 0.03 * innerRadius);

    y = MAP_HEIGHT / 2 + heights[1] * innerRadius;

    ctx.fillStyle = POPULATED_COLOR;
    ctx.beginPath();
    ctx.arc(x, y, STAR_RADIUS, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = MAP_MIDDLE_TEXT_COLOR;
    ctx.fillText('Populated System', x + 0.11 * innerRadius, y + 0.03 * innerRadius);

    y = MAP_HEIGHT / 2 + heights[2] * innerRadius;

    ctx.fillStyle = STAR_COLOR;
    drawGatewayMarker(ctx, x, y, STAR_RADIUS);
    ctx.beginPath();
    ctx.arc(x, y, STAR_RADIUS, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = MAP_MIDDLE_TEXT_COLOR;
    ctx.fillText('System with Gateway', x + 0.11 * innerRadius, y + 0.03 * innerRadius);

    y = MAP_HEIGHT / 2 + heights[3] * innerRadius;

    ctx.fillStyle = STAR_COLOR;
    ctx.beginPath();
    ctx.arc(x, y, UPGRADED_RADIUS, 0, 2 * Math.PI);
    ctx.fill();

    ctx.fillStyle = MAP_MIDDLE_TEXT_COLOR;
    ctx.fillText('System with Upgraded Starbase', x + 0.11 * innerRadius, y + 0.03 * innerRadius);

    y = MAP_HEIGHT / 2 + heights[4] * innerRadius;

    ctx.fillStyle = POPULATED_COLOR;
    ctx.beginPath();
    ctx.arc(x, y, (CAPITAL_OUTER_RADIUS + CAPITAL_INNER_RADIUS) / 2, 0, 2 * Math.PI);
    ctx.strokeWidth = CAPITAL_OUTER_RADIUS - CAPITAL_INNER_RADIUS;
    ctx.strokeStyle = POPULATED_COLOR;
    ctx.stroke();

    ctx.fillStyle = POPULATED_COLOR;
    fillStar(ctx, x, y, CAPITAL_STAR_RADIUS);

    ctx.fillStyle = MAP_MIDDLE_TEXT_COLOR;
    ctx.fillText('Capital System', x + 0.11 * innerRadius, y + 0.03 * innerRadius);
    
}

function getCountryData(country, countryId, mapMode) {

    function logScale(value, min, max) {

        value = Math.max(min, value);
        value = Math.min(max, value);

        let scaled = Math.log(value / min);
        scaled /= Math.log(max / min);

        scaled = Math.max(0, Math.min(1, scaled));

        return scaled ** 0.5;

    }

    let pops = +(country.employable_pops || 0);
    let military = +(country.military_power || 0);
    let economy = +(country.economy_power || 0);
    let technology = +(country.tech_power || 0);

    let countryName = ''+(() => {

        if (country.hasOwnProperty('name')) {
            if (typeof country.name === 'string') return country.name;
            let formatKey = country.name.key.replaceAll('"', '');
            if (EMPIRE_NAME_FORMATS_ENGLISH.hasOwnProperty(formatKey)) {
                let variables = new Map();
                for (let variable of country.name.variables) {
                    variables.set(variable.key, variable.value.key);
                }

                let format = EMPIRE_NAME_FORMATS_ENGLISH[formatKey];

                let name = '';

                for (let part of format) {
                    if (part.type === 'string') {
                        name += part.value;
                        continue;
                    } 

                    let value = variables.get(`"${part.value}"`);
                    if (value == null) {
                        name += '???';
                    } else {
                        name += value;
                    }

                }

                name = name.replaceAll('SPEC_', '');
                name = name.replaceAll('_planet', '');
                name = name.replaceAll('NAME_', '');
                name = name.replaceAll('_', ' ');

                return name;
            }
            if (PRESCRIPTED_EMPIRE_NAMES_ENGLISH.hasOwnProperty(formatKey)) {
                return PRESCRIPTED_EMPIRE_NAMES_ENGLISH[formatKey];
            }
            return country.name.key;
        }

        return `Unidentified Empire #${countryId}`;

    })();
    countryName = countryName.replaceAll('"', '');
    if (ALT_NAME_STYLE) countryName = (countryName.toLocaleUpperCase()).split('').join(' ');

    switch (mapMode) {
        case 'pops':
            return {
                data: Math.round(pops),
                level: logScale(pops, 10, 10000)
            }
        case 'military':
            return {
                data: Math.round(military),
                level: logScale(military, 100, 1e7)
            }
        case 'economy':
            return {
                data: Math.round(economy),
                level: logScale(economy, 200, 200000)
            }
        case 'technology':
            return {
                data: Math.round(technology),
                level: logScale(technology, 240, 240000)
            }
        case 'normal':
        default:
            return {
                data: countryName,
                level: null
            };
    }

}

function generateMap() {

    // Get settings, canvas, save file data

    USE_FLAG_COLORS = document.getElementById('useFlagColors').checked;
    GREATER_DESATURATION = document.getElementById('greaterDesaturation').checked;
    USE_FEDERATION_COLORS = document.getElementById('useFederationColors').checked;
    DRAW_MAP_NAMES = document.getElementById('drawMapNames').checked;
    ALT_NAME_STYLE = document.getElementById('altNameStyle').checked;
    LIMIT_MAP_NAME_SIZE = document.getElementById('limitMapNameSize').checked;
    DRAW_MAP_MIDDLE = document.getElementById('drawMapMiddle').checked;
    USE_HUBBLE = document.getElementById('useHubble').checked;
    LIGHT_BORDERS = document.getElementById('lightBorders').checked;
    SMOOTH_BORDERS = document.getElementById('smoothBorders').checked;
    PAINT_SCALE_FACTOR = document.getElementById('paintScale').value / 100;
    POPS_PER_SYMBOL = Math.round(+(document.getElementById('popScale').value));

    let mapMode = 'normal';
    if (document.getElementById('popMapMode').checked) mapMode = 'pops';
    else if (document.getElementById('militaryMapMode').checked) mapMode = 'military';
    else if (document.getElementById('economyMapMode').checked) mapMode = 'economy';
    else if (document.getElementById('technologyMapMode').checked) mapMode = 'technology';
    else if (document.getElementById('popDensityMapMode').checked) mapMode = 'popDensity';

    let colorVariant = 'map';
    if (document.getElementById('flagColorVariant').checked) colorVariant = 'flag';
    else if (document.getElementById('shipColorVariant').checked) colorVariant = 'ship';

    setPopulatedColor(mapMode);

    const canvas = document.getElementById('galaxyMap');
    const ctx = canvas.getContext('2d');

    const gamestate = saveGame.gamestate;
    const meta = saveGame.meta;

    // Get map data

    let stars = {};
    let hyperlanes = {};

    let xmin = Infinity;
    let xmax = -Infinity;
    let ymin = Infinity;
    let ymax = -Infinity;

    let innerRadius = Infinity;

    let starbaseCount = {};

    for (let [id, star] of Object.entries(gamestate.galactic_object)) {

        if (id == ENTRIES_KEY) continue;

        id = Math.round(+id);

        if (star.coordinate == null) continue;

        xmin = Math.min(xmin, +star.coordinate.x);
        xmax = Math.max(xmax, +star.coordinate.x);
        ymin = Math.min(ymin, +star.coordinate.y);
        ymax = Math.max(ymax, +star.coordinate.y);

        innerRadius = Math.min(innerRadius, Math.hypot(+star.coordinate.x, +star.coordinate.y));

        stars[id] = {
            x: +star.coordinate.x,
            y: +star.coordinate.y,
            owner: null,
            hyperlanes: !(star.hyperlane == null || star.hyperlane.length === 0),
            capital: false,
            population: 0,
            gateway: false,
            hyperRelay: false,
            id: id
        };

        if (star.hyperlane != null) {
            for (let hyperlane of star.hyperlane) {
                let from = id;
                let to = Math.round(+hyperlane.to);
    
                if (from > to) {
                    let tmp = from;
                    from = to;
                    to = tmp;
                }
    
                let key = `${from},${to}`;
    
                hyperlanes[key] = {
                    from: from,
                    to: to
                };
            }
        }

        let starbase = star.starbase;
        if (starbase == null && Array.isArray(star.starbases) && star.starbases.length > 0) {
            starbase = star.starbases[0];
        }

        if (starbase != null) {
            if (gamestate.starbase_mgr.starbases[starbase] == null) continue;
            if (gamestate.starbase_mgr.starbases[starbase].owner == null) continue;

            let owner = gamestate.starbase_mgr.starbases[starbase].owner;
            stars[id].owner = owner;
            if (starbaseCount[owner] == null) starbaseCount[owner] = 0;
            starbaseCount[owner]++;

            stars[id].upgraded = (gamestate.starbase_mgr.starbases[starbase].level != '"starbase_level_outpost"');
        }

        if (star.bypasses != null && gamestate.bypasses != null) {
            for (let bypass of star.bypasses) {
                if (gamestate.bypasses[bypass] != null && gamestate.bypasses[bypass].type == '"gateway"') {
                    stars[id].gateway = true;
                    continue;
                }
            }
        }

    }

    if (gamestate.megastructures != null)
    for (let [id, megastructure] of Object.entries(gamestate.megastructures)) {
        if (megastructure.coordinate == null || !Number.isFinite(megastructure.coordinate.origin)) continue;
        if (stars[megastructure.coordinate.origin] == null) continue;

        if (megastructure.type == '"gateway"' || megastructure.type == '"gateway_restored"') {
            stars[megastructure.coordinate.origin].gateway = true;
        } else if (megastructure.type == '"hyper_relay"' || megastructure.type == '"hyper_relay_restored"') {
            stars[megastructure.coordinate.origin].hyperRelay = true;
        }
    }

    if (gamestate.planets != null && gamestate.planets.planet != null) {
        for (let [id, planet] of Object.entries(gamestate.planets.planet)) {
            if (id === ENTRIES_KEY) continue;

            if (!Array.isArray(planet.pop)) continue;
            if (planet.pop.length < 1) continue;

            if (planet.coordinate == null) continue;
            if (planet.coordinate.origin == null) continue;

            let system = +(planet.coordinate.origin);
            if (stars[system] == null) continue;
            if (starbaseCount[planet.owner] == null) continue;
            if (starbaseCount[planet.owner] < 1) continue;
            stars[system].population += planet.pop.length;
        }
    }

    let [colors, colorCount] = getColorsAndCapitalSystems(gamestate, mapMode, colorVariant, starbaseCount, stars, USE_FEDERATION_COLORS);

    // Generate map

    const sizeX = MAP_WIDTH / (RES_X - 1);
    const sizeY = MAP_HEIGHT / (RES_Y - 1);

    let scale = Math.min(
        (MAP_WIDTH / 2 - (SYSTEM_RADIUS - UNOWNED_VALUE) - PADDING) / Math.max(Math.abs(xmax), Math.abs(xmin)),
        (MAP_HEIGHT / 2 - (SYSTEM_RADIUS - UNOWNED_VALUE) - PADDING) / Math.max(Math.abs(ymax), Math.abs(ymin))
    );

    innerRadius = Math.max(0, Math.min(MAP_WIDTH, MAP_HEIGHT, scale * innerRadius - INNER_PADDING));

    let scaleFactor = scale / PAINT_SCALE_FACTOR;

    let ax = MAP_WIDTH / 2;
    let ay = MAP_HEIGHT / 2;

    for (let [id, star] of Object.entries(stars)) {
        star.x = -scale * star.x + ax;
        star.y = scale * star.y + ay
    }

    let map = getMap(stars, hyperlanes, scaleFactor, sizeX, sizeY);

    if (SMOOTH_BORDERS) map = smoothMap(map);

    let values = [];
    for (let i = 0; i < RES_X; i++) {
        let column = [];
        for (let j = 0; j < RES_Y; j++) {

            let value = {id: UNOWNED_ID, value: 0};
            for (let [id, val] of Object.entries(map[i][j])) {
                if (val > value.value) {
                    value.id = id;
                    value.value = val;
                }
            }

            column.push(value);
        }
        values.push(column);
    }

    let [
        blocks,
        blockRun,
        blockOwner,
        blockSize,
        blockMaximalRectangle,
        blockCount
    ] = getBlocksAndMapNames(ctx, gamestate, mapMode, values, DRAW_MAP_NAMES, sizeX, sizeY);

    let popGrid = [];
    if (mapMode === 'popDensity') popGrid = getPopGrid(stars, blocks, blockOwner, sizeX, sizeY);

    // Draw map

    canvas.width = MAP_WIDTH;
    canvas.height = MAP_HEIGHT;

    // canvas.style.width = 'min(200vw, 1024px)';
    // canvas.style.height = 'min(200vw, 1024px)';

    ctx.filter = 'none';

    ctx.fillStyle = 'rgba(0,0,0,0)';
    ctx.globalCompositeOperation = 'copy';
    ctx.beginPath();
    ctx.rect(0, 0, MAP_WIDTH, MAP_HEIGHT);
    ctx.fill();

    drawCountryFill(ctx, colors, map, values, sizeX, sizeY);

    drawEdgeBorders(ctx, map, values, sizeX, sizeY);

    drawCountryBorders(ctx, map, values, sizeX, sizeY);

    drawGeography(ctx, colors, stars, hyperlanes);

    if (DRAW_MAP_NAMES) drawMapNames(ctx, blockMaximalRectangle);

    if (mapMode === 'popDensity') drawPopGrid(ctx, popGrid, sizeX, sizeY);
    
    innerRadius -= scaleFactor * (SYSTEM_RADIUS - UNOWNED_VALUE / 2) / 1.5;
    innerRadius = Math.max(100, innerRadius);

    if (DRAW_MAP_MIDDLE) drawMapMiddle(ctx, gamestate, innerRadius);

    ctx.globalCompositeOperation = 'destination-over';

    if (USE_HUBBLE) {
        ctx.fillStyle = BACKGROUND_COLOR;
        ctx.beginPath();
        ctx.rect(0, 0, MAP_WIDTH, MAP_HEIGHT);
        ctx.fill();

        ctx.filter = BACKGROUND_FILTER;
        ctx.drawImage(BACKGROUND_IMAGE, 0, 0, MAP_WIDTH, MAP_HEIGHT);
        ctx.filter = 'none';
    } else {
        /*
        ctx.fillStyle = SUBSTITUTE_BACKGROUND;
        ctx.beginPath();
        ctx.rect(0, 0, MAP_WIDTH, MAP_HEIGHT);
        ctx.fill();
        */
    }

}

function drawMap(e) {

    document.getElementById('mapStatus').innerHTML = 'Working...';
    sleepUntilTrue(() => (saveGame != null && !lock)).then(() => {

        lock = true;

        try {

            generateMap();
            document.getElementById('mapStatus').innerHTML = '';

        } catch (e) {
            lock = false;
            console.log(e);
            document.getElementById('mapStatus').innerHTML = 'Map failed to generate.';
        }


        lock = false;

    });

}
