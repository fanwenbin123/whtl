const flowInfo = {
    patrolInNetwork: {
        type: '巡道防胀',
        groupTitle: '入网照片',
        imgInfo: [
            {
                text: '①派工单',
                fileImageList: []
            },
            {
                text: '②班前会（安全技术交底）',
                fileImageList: []
            },
            {
                text: '③工机具级备品清点照片',
                fileImageList: []
            }
        ]
    },
    patrolOutNetwork: {
        type: '巡道防胀',
        groupTitle: '出网照片',
        imgInfo: [
            {
                text: '①轨温',
                fileImageList: []
            },
            {
                text: '②网口封闭',
                fileImageList: []
            },
            {
                text: '③人员、备品、工机具清点',
                fileImageList: []
            }
        ]
    },
    lineInNetwork: {
        groupTitle: '线路调查',
        groupTitle: '入网照片',
        imgInfo: [
            {
                text: '①派工单',
                fileImageList: []
            },
            {
                text: '②班前会（安全技术交底）照片',
                fileImageList: []
            },
            {
                text: '③工机具及备品清点',
                fileImageList: []
            }
        ]
    },
    lineOutNetwork: {
        type: '线路调查',
        groupTitle: '出网照片',
        imgInfo: [
            {
                text: '①网口封闭',
                fileImageList: []
            },
            {
                text: '②人员、备品、工机具清点',
                fileImageList: []
            }
        ]
    },
    troubleshootInNetwork: {
        type: '排障',
        groupTitle: '入网照片',
        imgInfo: [
            {
                text: '①班前会（安全技术交底）照片',
                fileImageList: []
            }
        ]
    },
    troubleshootOutNetwork: {
        type: '排障',
        groupTitle: '出网照片',
        imgInfo: [
            {
                text: '①作业完成时间，开通命令号',
                fileImageList: []
            }
        ]
    },
    unloadingLongTrackInNetwork: {
        type: '卸长轨',
        groupTitle: '入网照片',
        imgInfo: [
            {
                text: '①班前会照片',
                fileImageList: []
            },
            {
                text: '②安全技术交底签认单',
                fileImageList: []
            }
        ]
    },
    unloadingLongTrackOutNetwork: {
        type: '卸长轨',
        groupTitle: '出网照片',
        imgInfo: [
            {
                text: '①网口封闭',
                fileImageList: []
            },
            {
                text: '②人员、备品、工机具清点',
                fileImageList: []
            }
        ]
    },
    changeTrackInNetwork: {
        type: '换轨',
        groupTitle: '入网照片',
        imgInfo: [
            {
                text: '①班前会（安全技术交底）照片',
                fileImageList: []
            }
        ]
    },
    changeTrackOutNetwork: {
        type: '换轨',
        groupTitle: '出网照片',
        imgInfo: [
            {
                text: '①作业完成时间，开通命令号',
                fileImageList: []
            }
        ]
    },
    vehicleTransportationIn: {
        type: '车辆运输',
        groupTitle: '动车前申请准运号照片',
        imgInfo: [
            {
                text: '①作业完成时间，开通命令号',
                fileImageList: []
            },
            {
                text: '②铁鞋撤除照片',
                fileImageList: []
            },
            {
                text: '③手制动机松开照片',
                fileImageList: []
            },
            {
                text: '④路料装载情况照片（仅限于施工车辆转场）',
                fileImageList: []
            },
            {
                text: '⑤班前点名会照片（仅限于施工车辆转场）',
                fileImageList: []
            },
            {
                text: '⑥添乘干部到岗',
                fileImageList: []
            },
            {
                text: '⑦其他（酒测和指纹签到）',
                fileImageList: []
            },
        ]
    },
    vehicleTransportationOut: {
        type: '车辆运输',
        groupTitle: '车辆入库及站区过夜停留照片',
        imgInfo: [
            {
                text: '①设置防溜铁鞋照片',
                fileImageList: []
            },
            {
                text: '②拧紧手制动照片',
                fileImageList: []
            },
            {
                text: '③设置红牌或红灯照片',
                fileImageList: []
            },
            {
                text: '④其他（指纹签退）',
                fileImageList: []
            }
        ]
    },
    stationMarshallingIn: {
        type: '驻地编组',
        groupTitle: '动车前申请准调号照片',
        imgInfo: [
            {
                text: '①调车计划单（站场示意图）',
                fileImageList: []
            },
            {
                text: '②铁鞋撤除照片',
                fileImageList: []
            },
            {
                text: '③手制动机松开照片',
                fileImageList: []
            },
            {
                text: '④添乘干部到岗',
                fileImageList: []
            },
            {
                text: '④添乘干部到岗',
                fileImageList: []
            },
            {
                text: '⑤其他（酒测和指纹签到）',
                fileImageList: []
            }
        ]
    },
    stationMarshallingOut: {
        type: '驻地编组',
        groupTitle: '车辆编组完毕后照片',
        imgInfo: [
            {
                text: '①设置防溜铁鞋照片',
                fileImageList: []
            },
            {
                text: '②拧紧手制动照片',
                fileImageList: []
            },
            {
                text: '③设置红牌或红灯照片',
                fileImageList: []
            },
            {
                text: '④其他（指纹签退）',
                fileImageList: []
            }
        ]
    },
    baseOrganizationIn: {
        type: '基地编组',
        groupTitle: '动车前申请准调号照片',
        imgInfo: [
            {
                text: '①调车计划单（站场示意图）',
                fileImageList: []
            },
            {
                text: '②铁鞋撤除照片',
                fileImageList: []
            },
            {
                text: '③手制动机松开照片',
                fileImageList: []
            },
            {
                text: '④添乘干部到岗',
                fileImageList: []
            },
            {
                text: '⑤其他（酒测和指纹签到）',
                fileImageList: []
            }
        ]
    },
    baseOrganizationOut: {
        type: '基地编组',
        groupTitle: '车辆编组完毕后照片',
        imgInfo: [
            {
                text: '①设置防溜铁鞋照片',
                fileImageList: []
            },
            {
                text: '②拧紧手制动照片',
                fileImageList: []
            },
            {
                text: '③设置红牌或红灯照片',
                fileImageList: []
            },
            {
                text: '④其他（指纹签退）',
                fileImageList: []
            }
        ]
    },
}

export default flowInfo