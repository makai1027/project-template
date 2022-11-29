/**
 * @description 添加水印
 */
function dateFormat(fmt: string, date: Date) {
  let ret
  const opt: Record<string, string> = {
    'Y+': date.getFullYear().toString(), // 年
    'm+': (date.getMonth() + 1).toString(), // 月
    'd+': date.getDate().toString(), // 日
    'H+': date.getHours().toString(), // 时
    'M+': date.getMinutes().toString(), // 分
    'S+': date.getSeconds().toString() // 秒
    // 有其他格式化字符需求可以继续添加，必须转化成字符串
  }
  for (const k in opt) {
    ret = new RegExp('(' + k + ')').exec(fmt)
    if (ret) {
      fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'))
    }
  }
  return fmt
}

/**
 * @description 添加水印
 */
export function addWaterMarker(name: string, needTime = true): void {
  const str = `${name || '水印'} ${needTime ? dateFormat('YYYY/mm/dd HH:MM:SS', new Date()) : ''}`
  const can = document.createElement('canvas') as HTMLCanvasElement
  const div = document.createElement('div') as HTMLElement
  const cans = can.getContext('2d')
  div.style.position = 'fixed'
  div.style.top = '0px'
  div.style.left = '0px'
  div.style.bottom = '0px'
  div.style.right = '0px'
  div.style.margin = '0 auto'
  div.style.zIndex = '9999'
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  div.style['pointer-events'] = 'none'
  can.width = 400
  can.height = 200
  can.style.display = 'none'
  if (cans) {
    cans.rotate((-30 * Math.PI) / 180)
    cans.font = '12px sans-serif'
    cans.fillStyle = 'rgba(180, 180, 180, 0.2)'
    cans.textAlign = 'center'
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    cans.textBaseline = 'Middle'
    cans.fillText(str, can.width / 6, can.height / 2)
  }

  div.style.backgroundImage = 'url(' + can.toDataURL('image/png') + ')'
  document.body.appendChild(div)
}
