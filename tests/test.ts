import { expect } from 'chai';
import { decodeItem } from '../src/runeword';

describe('Decode Item', () => { 
    it('should decode items', () => { // the single test    
        const item = decodeItem("100300001012001008200200120030010000000000000000000000000000000000000000000")
        /* fps limit */
        expect(item).to.equal(30); // As I said 3 lines above

    });
});