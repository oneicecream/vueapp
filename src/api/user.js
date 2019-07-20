// 用户相关接口封装模块
// 最佳实践：建议将所有请求都封装成一个一个小函数，在需要的时候直接调用
// 好处 1.好维护，统一管理 2.好重用
// 遵循一个原则:不要直接在组件中发请求，都封装成函数进行调用

import request from '@/utils/request'

export const login = ({ mobile, code }) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: {
      mobile,
      code
    }
  })
}

// 拉黑用户 (添加黑名单)
export const addBlacklist = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/blacklists',
    data: {
      target: userId
    }
  })
}
// 关注用户
export const followUser = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

// 取消关注用户
export const unFollowUser = userId => {
  return request({
    method: 'DELETE',
    url: `/app/v1_0/user/followings/${userId}`
  })
}

// 获取用户自己信息
export const getMyInfo = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user`
  })
}

// 获取用于编辑的用户信息
export const getUserProfile = () => {
  return request({
    method: 'GET',
    url: `/app/v1_0/user/profile`
  })
}

// 编辑用户个人资料
export const updateUserProfile = ({
  name = null,
  photo = null,
  gender = null,
  birthday = null,
  realName = null,
  idNumber = null,
  idCardFront = null,
  idCardBack = null,
  idCardHandheld = null,
  intro = null
}) => {
  return request({
    method: 'PATCH',
    url: `/app/v1_0/user/profile`,
    data: {
      name,
      photo,
      gender,
      birthday,
      real_name: realName,
      id_number: idNumber,
      id_card_front: idCardFront,
      id_card_back: idCardBack,
      id_card_handheld: idCardHandheld,
      intro
    }
  })
}
