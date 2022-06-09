import { request } from 'umi';
// get list-A
export function getMettingListA(params) {
  return request('/mock/meeting-a/list', {
    params,
  });
}
// get list-B
export function getMettingListB(params) {
  return request('/mock/meeting-b/list', {
    params,
  });
}