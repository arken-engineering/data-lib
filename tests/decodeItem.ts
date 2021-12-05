import { expect } from 'chai';
import { decodeItem } from '../src/runeword';
import steel from "./runewords/steel.json";

describe('Decode Item', () => { 
    it('should decode steel', () => { // the single test    
        const item = decodeItem("100300001012001008200200120030010000000000000000000000000000000000000000000")
        /* fps limit */
        console.log(JSON.stringify(item, null, 2))
        expect(item).to.deep.equal(steel); // As I said 3 lines above

    });
});