import request from '@/utils/request'

export function getTestData (id) {
  return request.get(`https://easy-mock.com/mock/5a5215d2d408383e0e385e64/test/city`)
}
