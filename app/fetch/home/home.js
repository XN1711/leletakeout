import { get } from '../get'

export function getAdData() {
    const result = get('../../data/ad.js')
    return result
    
}

export function getListData(city, page) {
    const result = get('../../data/home.js')
    return result
    
}