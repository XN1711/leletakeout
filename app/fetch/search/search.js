import { get } from '../get'

export function getSearchData(page, cityName, category, keyword) {
    const keywordStr = keyword ? '/' + keyword : ''
    const result = get('../../data/search.js')
    return result
}