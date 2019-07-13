// 频道相关模块封装
import request from '@/utils/request'

export const getUserChannels = channels => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}

// 获取所有频道列表
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
