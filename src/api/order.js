import request from '@/utils/request'

export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 10,
      // shopId: 0,
      couponId: 0,
      isUsePoints: 0,
      ...obj
    }
  })
}

export const submitOrder = (mode, obj) => {
  return request({
    url: '/checkout/submit',
    method: 'post',
    data: {
      mode,
      delivery: 10,
      couponId: 0,
      isUsePoints: 0,
      payType: 10,
      ...obj
    }
  })
}

// 订单列表
export const getMyOrderList = (dataType, page) => {
  return request.get('/order/list', {
    params: {
      dataType,
      page
    }
  })
}
