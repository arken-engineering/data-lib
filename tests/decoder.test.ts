import { expect } from 'chai';
import { decodeItem, Runeword } from '../src/runeword';
import { decodeItem as olderDI } from "./older/decodeItem";
import allNFTs from "./runewords/allNFTs.json";
import { badRunewords } from './runewords/badRunewords';

const nfts = allNFTs as {name: string; itemId: string}[]
describe('Decode Item', () => { 
// for only one item
 /* const name = "Fury"
    const itemId = "1003000030520010002005003200710000000000000000000000000000000000000000000784"
    //Fury#10010000210061038103120041
    it(`should decode ${name}#${itemId}`, () => {
        const item = decodeItem(itemId)
        const expected = olderDI(itemId) as Runeword
        console.log("expected: ", JSON.stringify(expected, null, 2), "\n")
        console.log("actual: ", JSON.stringify(item, null, 2))
        
        
        expect(expected).to.deep.equal(item, "diffs found"); 
    })*/
        nfts.filter(n => badRunewords.indexOf(n.itemId) === -1).forEach(({name, itemId}) => {
        const item = decodeItem(itemId)
        
            it(`should decode ${name}#${itemId}`, () => {
                const item = decodeItem(itemId)
                const expected = olderDI(itemId) as Runeword
                //console.log("expected: ", JSON.stringify(expected, null, 2))
                //console.log("actual: ", JSON.stringify(item, null, 2))
                
                expect(expected).to.deep.equal(item); 
            })
       
    })
});