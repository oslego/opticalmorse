// TESTING -----------------------------------

console.group('testing')

// CONVERTORS
console.assert("A"  == server.morseToChar('.-'), "Morse to Char");
console.assert(".-" == server.charToMorse('A'), "Char to Morse");

// DARK
console.assert("OP_BREAK"      == server.decode(server.modes.DARK, server.times.break), "OP_BREAK");
server.buffer.push('.-'); // A
console.assert("OP_CHAR_BREAK" == server.decode(server.modes.DARK, server.times.charBreak), "OP_CHAR_BREAK");
server.buffer.push('.-'); // A
console.assert("OP_WORD_BREAK" == server.decode(server.modes.DARK, server.times.wordBreak), "OP_WORD_BREAK");

// LIGHT
server.buffer.length = 0;
console.assert("OP_DOT"  == server.decode(server.modes.LIGHT, server.times.dot), "OP_DOT");
console.assert("."  == server.buffer.join(''), "BUFFER_DOT");
console.assert("OP_DOT"  == server.decode(server.modes.LIGHT, server.times.dot * 0.75), "OP_DOT lenient");
console.assert(".."  == server.buffer.join(''), "BUFFER_DOT_DOUBLE");

server.buffer.length = 0;
console.assert("OP_DASH"  == server.decode(server.modes.LIGHT, server.times.dash), "OP_DASH");
console.assert("-"  == server.buffer.join(''), "BUFFER_DASH");
console.assert("OP_DASH"  == server.decode(server.modes.LIGHT, server.times.dash * 0.75), "OP_DASH lenient");
console.assert("--"  == server.buffer.join(''), "BUFFER_DASH_DOUBLE");

console.groupEnd('')
