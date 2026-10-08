import test from 'node:test';
import assert from 'node:assert/strict';
import { validateRequest, demoTransport } from '../src/forms.mjs';
test('requires a company and a task or attachment for a production request', () => {
  assert.deepEqual(Object.keys(validateRequest({contact:'buyer@example.com', mode:'production'})), ['company','task']);
});
test('accepts either a valid email or phone', () => {
  for (const contact of ['buyer@example.com', '+7 (4852) 58-76-54']) assert.deepEqual(validateRequest({company:'Завод',task:'Краска для ворот',contact}),{});
  for (const contact of ['', 'wrong@', '123', 'some text 1234567890']) assert.ok(validateRequest({company:'Завод',task:'Краска',contact}).contact);
});

test('production accepts a description without a file', () => {
  assert.deepEqual(validateRequest({mode:'production',company:'Завод',contact:'buyer@example.com',task:'Подобрать краску по детали'}),{});
});

test('production accepts a nonempty selected file without a description', () => {
  assert.deepEqual(validateRequest({mode:'production',company:'Завод',contact:'buyer@example.com',task:'  ',attachment:new File(['Техническое задание'],'task.txt')}),{});
});

test('production rejects absent or empty attachments without a description', () => {
  for (const attachment of [undefined,new File([],''),new File([],'task.pdf'),{name:'task.pdf',size:20},'task.pdf']) {
    const errors=validateRequest({mode:'production',company:'Завод',contact:'buyer@example.com',task:' ',attachment});
    assert.match(errors.task,/Опишите задачу или приложите непустой файл/);
  }
});

test('an attachment does not replace company or valid contact', () => {
  assert.deepEqual(Object.keys(validateRequest({mode:'production',attachment:new File(['ТЗ'],'task.txt')})),['company','contact']);
});
test('TDS does not require a production task but requires a material', () => {
  assert.deepEqual(validateRequest({mode:'tds',company:'Завод',contact:'buyer@example.com',material:'Акриловые'}),{});
  assert.ok(validateRequest({mode:'tds',company:'Завод',contact:'buyer@example.com'}).material);
});
test('demo transport never reports a sent request and makes no network call', async () => {
  const result = await demoTransport({company:'Завод'});
  assert.equal(result.sent,false);
  assert.equal(result.status,'demo');
});
