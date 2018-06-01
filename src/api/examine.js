import fetch from '@/utils/fetch'
import qs from 'qs'

import store from '@/store/index'
import router from '@/router/index'
import { Dialog } from 'cube-ui'

const HTTP = 'http://192.168.199.98:8086'
// const HTTP = 'http://192.168.30.177:8086'

export function permission() {
  if (store.getters.user.value) {
    return store.getters.user.value
  } else {
    return false
  }
}
// 跑到home页面
export function toHome() {
  Dialog.$create({
    type: 'confirm',
    icon: 'cubeic-alert',
    content: '用户会话过期，请重新登录',
    confirmBtn: {
      text: '确定按钮',
      active: true,
      disabled: false
    },
    cancelBtn: {
      text: '取消按钮',
      active: false,
      disabled: false
    },
    onConfirm: () => {
      router.push({path: '/home'})
    },
    onCancel: () => {
    }
  }).show()
}
// 请假列表
export function sendoutleave (dataType) {
  let id = permission()
  if (!id) {
    toHome()
  }
  let data = {
    id,
    type: dataType.type,
    taskType: dataType.taskType,
    pageNum: dataType.pageNum,
    pageSize: dataType.pageSize
  }
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/process/task/leaveList`,
    method: 'post',
    data
  })
}
// 请假详情
// 任务状态（1：发起申请，2审批通过，3：审批拒绝，4：已失效，5：审批中，6：待审批，7：已撤销，8：当前审批人审批通过，9：当前审批人审批拒绝，10：会签时其他人已拒绝）
// taskState
export function leaveContent (contentdata) {
  let data = {
    id: contentdata.id,
    type: contentdata.type
  }
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/process/task/leaveDetail`,
    method: 'post',
    data
  })
}
// 审批时分类计数
export function leavenumber () {
  let userLogicId = permission()
  if (!userLogicId) {
    toHome()
  }
  let data = {
    userLogicId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/process/task/typeCount`,
    method: 'post',
    data
  })
}
// 审批 1同意或 2拒绝
export function opinion (opiniondata) {
  let data = {
    taskLogicId: opiniondata.taskLogicId,
    type: opiniondata.type,
    opinion: opiniondata.opinion
  }
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/process/task/examinationAndApproval`,
    method: 'post',
    data
  })
}
// 撤销
export function Revoke (revoke) {
  let data = {
    taskLogicId: revoke.taskLogicId
  }
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/process/task/revoke`,
    method: 'post',
    data
  })
}
// 根据当前点击的请假内容，页数获取当前的请假列表
export function getRecordsByType (id, taskType, type, pageNum, pageSize) {
  let data = {
    id,
    taskType,
    type: type,
    pageNum,
    pageSize
  }
  data = qs.stringify(data)
  return fetch({
    url: `${HTTP}/process/task/leaveList`,
    method: 'post',
    data
  })
}
