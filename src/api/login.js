import request from '@/utils/request'

export const getPicCode = () => {
  return request.get('/captcha/image')
}

export const getPhoneCode = (captchaCode, captchaKey, mobile) => {
  return request({
    url: '/captcha/sendSmsCaptcha',
    method: 'post',
    data: {
      form: {
        captchaCode,
        captchaKey,
        mobile
      }
    },
    headers: {
      platform: 'H5',
      'Content-Type': 'application/json'
    }
  })
}

export const codeLogin = (isParty, mobile, partyData, smsCode) => {
  return request({
    url: '/passport/login',
    method: 'post',
    data: {
      form: {
        isParty,
        mobile,
        partyData,
        smsCode
      }
    },
    headers: {
      platform: 'H5'
    }
  })
}
