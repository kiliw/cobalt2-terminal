// Prints the colors and font stored in a Terminal.app .terminal profile.
// Usage: osascript -l JavaScript inspect-terminal.js <file.terminal>
ObjC.import('Cocoa');
function run(argv){
  const d=$.NSDictionary.dictionaryWithContentsOfFile(argv[0]); const keys=d.allKeys.js.map(k=>k.js).sort(); const out=[];
  for(const k of keys){ const v=d.objectForKey(k);
    if(v.isKindOfClass($.NSData)){ const o=$.NSKeyedUnarchiver.unarchiveObjectWithData(v);
      if(o.isKindOfClass($.NSColor)){ const c=o.colorUsingColorSpace($.NSColorSpace.sRGBColorSpace);
        out.push(k+': #'+[c.redComponent,c.greenComponent,c.blueComponent].map(x=>Math.round(x*255).toString(16).padStart(2,'0')).join(''));}
      else out.push(k+': '+o.fontName.js+' '+o.pointSize);
    } else out.push(k+': '+ObjC.unwrap(v)); }
  return out.join('\n'); }
