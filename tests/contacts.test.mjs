import test from 'node:test';
import assert from 'node:assert/strict';
import {contactConfig,contactHref} from '../src/contacts.mjs';

test('unconfirmed contacts never create call or email links',()=>{
  assert.equal(contactHref('phone',contactConfig.phone),null);
  assert.equal(contactHref('email',contactConfig.email),null);
  assert.equal(contactHref('phone',{confirmed:false,value:'+74852587654'}),null);
});
test('confirmed valid contacts produce direct links; invalid values stay inactive',()=>{
  assert.equal(contactHref('phone',{confirmed:true,value:'+74852587654'}),'tel:+74852587654');
  assert.equal(contactHref('email',{confirmed:true,value:'sales@example.com'}),'mailto:sales@example.com');
  assert.equal(contactHref('phone',{confirmed:true,value:'123'}),null);
  assert.equal(contactHref('email',{confirmed:true,value:'wrong@'}),null);
});
