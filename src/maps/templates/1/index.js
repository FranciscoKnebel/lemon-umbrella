/* eslint new-cap: 0 */
const Isomer = require('isomer');
const globals = require('../../globals');
const structureConstructor = require('../structures/addStructure');

const addStructure = new structureConstructor(new Isomer(document.getElementById('canvas')));

require('./floor')(addStructure, globals);
require('./roads')(addStructure, globals);
require('./buildings')(addStructure, globals);
