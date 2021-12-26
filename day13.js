/**
 * https://adventjs.dev/challenges/13
 */
export default function wrapGifts(gifts) {
    let giftWraplength = 0;
    const wrapGifts = [];
    gifts.forEach(gift => {
        if (giftWraplength < gift.length) {
            giftWraplength = gift.length;
        }
    })
    wrapGifts.push('*'.repeat(giftWraplength + 2))
    gifts.forEach(gift => {
        wrapGifts.push(`*${gift}*`)
    })
    wrapGifts.push('*'.repeat(giftWraplength + 2))
    return wrapGifts;
}