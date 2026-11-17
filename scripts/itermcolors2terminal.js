// Converts an iTerm2 .itermcolors file into a Terminal.app .terminal profile.
// Usage: osascript -l JavaScript itermcolors2terminal.js <in.itermcolors> <out.terminal> <name> <fontPSName> <size>
ObjC.import('Cocoa');

function run(argv) {
  const [inPath, outPath, name, fontName, fontSize] = argv;
  const src = $.NSDictionary.dictionaryWithContentsOfFile(inPath);
  if (!src || src.isNil()) throw new Error('Cannot read ' + inPath);

  const ansiNames = ['Black', 'Red', 'Green', 'Yellow', 'Blue', 'Magenta', 'Cyan', 'White'];
  const map = {
    'Background Color': 'BackgroundColor',
    'Foreground Color': 'TextColor',
    'Bold Color': 'TextBoldColor',
    'Cursor Color': 'CursorColor',
    'Selection Color': 'SelectionColor',
  };
  for (let i = 0; i < 8; i++) {
    map[`Ansi ${i} Color`] = `ANSI${ansiNames[i]}Color`;
    map[`Ansi ${i + 8} Color`] = `ANSIBright${ansiNames[i]}Color`;
  }

  const archive = (obj) =>
    $.NSKeyedArchiver.archivedDataWithRootObjectRequiringSecureCodingError(obj, false, null);

  const out = $.NSMutableDictionary.dictionary;
  for (const [itermKey, termKey] of Object.entries(map)) {
    const c = src.objectForKey(itermKey);
    if (!c || c.isNil()) continue;
    const comp = (k) => { const v = c.objectForKey(k); return v.isNil() ? 1 : v.doubleValue; };
    const color = $.NSColor.colorWithSRGBRedGreenBlueAlpha(
      comp('Red Component'), comp('Green Component'), comp('Blue Component'), comp('Alpha Component'));
    out.setObjectForKey(archive(color), termKey);
  }

  const font = $.NSFont.fontWithNameSize(fontName, parseFloat(fontSize));
  if (font.isNil()) throw new Error('Font not found: ' + fontName);
  out.setObjectForKey(archive(font), 'Font');

  out.setObjectForKey(name, 'name');
  out.setObjectForKey('Window Settings', 'type');
  out.setObjectForKey('2.07', 'ProfileCurrentVersion');
  out.setObjectForKey($.NSNumber.numberWithBool(true), 'UseBrightBold');
  out.setObjectForKey('xterm-256color', 'TerminalType');

  if (!out.writeToFileAtomically(outPath, true)) throw new Error('Cannot write ' + outPath);
  return 'Wrote ' + outPath;
}
