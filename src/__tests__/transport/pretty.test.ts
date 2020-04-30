import { pretty } from '../../transport/transform';
import { Readable } from 'stream';
import { Arg1 } from 'tsargs';

test('pretty', () => {
  const result = pretty(<Arg1<typeof pretty>>{ colorize: true, withLabel: true, debug: true });
  const stream = new Readable();
  stream.push('{ "msg": "Test message", "time": 1514074545477, "level": 40, "label": "TestStream" }');
  stream.push(null);
  stream.pipe(result).pipe(process.stdout);  
});

test('pretty no label', () => {
  const result = pretty(<Arg1<typeof pretty>>{ colorize: true, withLabel: false, debug: true });
  const stream = new Readable();
  stream.push('{ "msg": "Test message", "time": 1514074545477, "level": 40, "label": "TestStream" }');
  stream.push(null);
  stream.pipe(result).pipe(process.stdout);  
});

test('pretty debug', () => {
  const result = pretty(<Arg1<typeof pretty>>{ colorize: true, withLabel: true, debug: true });
  const stream = new Readable();
  stream.push('{ "msg": "Test message", "time": 1514074545477, "level": 20, "label": "TestStream" }');
  stream.push(null);
  stream.pipe(result).pipe(process.stdout);  
});

test('pretty no debug', () => {
  const result = pretty(<Arg1<typeof pretty>>{ colorize: true, withLabel: true, debug: false });
  const stream = new Readable();
  stream.push('{ "msg": "Test message", "time": 1514074545477, "level": 20, "label": "TestStream" }');
  stream.push(null);
  stream.pipe(result).pipe(process.stdout);  
});

test('pretty no label/debug', () => {
  const result = pretty(<Arg1<typeof pretty>>{ colorize: true, withLabel: false, debug: false });
  const stream = new Readable();
  stream.push('{ "msg": "Test message", "time": 1514074545477, "level": 20, "label": "TestStream" }');
  stream.push(null);
  stream.pipe(result).pipe(process.stdout);  
});

test('pretty no color/label/debug', () => {
  const result = pretty(<Arg1<typeof pretty>>{ colorize: false, withLabel: false, debug: false });
  const stream = new Readable();
  stream.push('{ "msg": "Test message", "time": 1514074545477, "level": 20, "label": "TestStream" }');
  stream.push(null);
  stream.pipe(result).pipe(process.stdout);  
});

test('pretty invalid json', () => {
  const result = pretty(<Arg1<typeof pretty>>{ colorize: true, withLabel: true, debug: true });
  const stream = new Readable();
  stream.push('{ "msg": Test message", "time": 1514074545477, "level": 40, "label": "TestStream" }');
  stream.push(null);
  stream.pipe(result).pipe(process.stdout);  
});
