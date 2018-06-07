import { get } from '../get'

export function getInfoData(id) {
   const result = get('../../data/detail.js')
   return result
}

export function getCommentData(page, id) {
    const result = get('../../data/comment.js')
    return result
}