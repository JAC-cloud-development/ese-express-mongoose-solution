import { expect } from 'chai';
import { describe, it, beforeEach } from 'mocha';

import { db } from './fakedb.js'

beforeEach(function () {
    db.reset();
});

describe('Fake db get', function () {
    it('should return array with default items', function () {
        expect(db.list()).to.be.an('array');
        expect(db.list()).to.be.have.lengthOf(2);
    });

    it('should return array with an additional item', function () {
        db.insert({ id: 3 });
        expect(db.list()).to.be.have.lengthOf(3);
    });

    it('should return array with an less items', function () {
        db.delete(2);
        expect(db.list()).to.be.have.lengthOf(1);
    });

    it('should update element', function () {
        db.update(2, { name: "updated" });
        expect(db.list()[1].name).to.equal("updated");
    });
})
