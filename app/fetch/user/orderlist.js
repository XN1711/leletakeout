import { get } from '../get'
import { post } from '../post'

export function getOrderListData(username) {
    const result = get('../../data/orderList.js')
    return result
}

export function postComment(id, comment, star) {
    const result = post('../../data/submitComment.js')
    return result
}