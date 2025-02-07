import request from '@/utils/request'
// 加入购物车
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request({
    url: '/cart/add',
    method: 'post',
    data: {
      goodsId,
      goodsNum,
      goodsSkuId
    }
  })
}

// 获取购物车列表
export const getCartList = () => {
  return request({
    url: '/cart/list',
    method: 'get'
  })
}

export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsId,
    goodsNum,
    goodsSkuId
  })
}

// 删除购物车
export const delSelect = (cartIds) => {
  return request({
    url: '/cart/clear',
    method: 'post',
    data: {
      cartIds
    }
  })
}
