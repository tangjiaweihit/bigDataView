export function MapGameType(game) {
  switch (game) {
    case "tongshishi":
      return "同时视";
    case "rongheshi":
      return "融合视";
    case "litishi":
      return "立体视";
    case "jingxiciji":
      return "精细刺激";
    case "shijuejiqiao":
      return "视觉技巧";
    case "duibimingandu":
      return "对比敏感度";
    case "gabor":
      return "Gabor";
    case "xinxitiqu":
      return "信息提取";
    default:
      return "--";
  }
}
export function mapFixation(type) {
  switch (type) {
    case "CENTRAL_FIXATION":
      return "中心注视(0 ～ 1°)";
    case "ECCENTRIC_FIXATION":
      return "旁中心注视(1 ～ 3°)";
    case "MACULAR_GAZE":
      return "黄斑注视(3 ～ 5°)";
    case "PERIPHERAL_FIXATION":
      return "周边注视注视(>5°)";
    case "POOR_FIXATION":
      return "固视不良";
    case "GOOD":
      return "视力正常";
    case "AMETROPIC_AMBLYOPIA":
      return "屈光不正性弱视";
    case "ANISOMETROPIC_AMBLYOPIA":
      return "屈光参差性弱视";
    case "STRABISMIC_AMBLYOPIA":
      return "斜视性弱视";
    case "DEPRIVATION_AMBLYOPIA":
      return "形觉剥夺性弱视";
    default:
      return "--";
  }
}
export function mapSquint(type) {
  switch (type) {
    case "NORMOTOPIA":
      return "正位";
    case "HETEROPHORIA":
      return "隐斜视";
    case "EXOTROPIA":
      return "外斜视";
    case "ESOTROPIA":
      return "内斜视";
    case "A_V_OTROPIA":
      return "A-V型斜视";
    case "VERTICAL_ROTATION_STRABISMUS":
      return "垂直旋转性斜视";
    case "CENTRAL_PARALYTIC_STRABISMUS":
      return "中枢性麻痹性斜视";
    case "NYSTAGMUS":
      return "眼球震颤";
    default:
      return "--";
  }
}
